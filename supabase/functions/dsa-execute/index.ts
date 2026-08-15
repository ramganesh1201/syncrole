import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ================================================================
// DSA Execute Edge Function — Supabase Deno Runtime
//
// SECURITY MODEL:
// - Authenticates via JWT before any operation
// - Loads test cases server-side (hidden tests NEVER sent to browser)
// - Executes user code in a restricted Deno Worker
// - Judges and updates submission via service role only
// - verify_dsa_solve / record_dsa_attempt called server-side
//
// EXECUTION ENVIRONMENT (honest limitations):
// - Deno Worker with no net/read/write/env/run/ffi permissions
// - Hard timeout via setTimeout + Worker.terminate()
// - Does NOT provide Linux cgroup memory isolation
// - For V1 (10 curated problems, JS only), acceptable trade-off
// - Future: route through Judge0 or nsjail container for scale
// ================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_SOURCE_SIZE_BYTES = 64 * 1024;   // 64 KB
const MAX_OUTPUT_SIZE_BYTES = 1024 * 1024; // 1 MB
const EXECUTION_TIMEOUT_MS  = 4000;        // 4s hard worker kill

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    const body = await req.json();
    const { submission_id, is_run_only } = body;

    if (!submission_id || typeof submission_id !== "string") {
      return jsonError("Missing submission_id", 400);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonError("Unauthorized", 401);
    }
    const token = authHeader.replace("Bearer ", "");

    const supabaseUrl   = Deno.env.get("SUPABASE_URL")!;
    const anonKey       = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey    = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const serviceClient = createClient(supabaseUrl, serviceKey);

    // Verify user
    const { data: { user }, error: authErr } = await userClient.auth.getUser();
    if (authErr || !user) return jsonError("Unauthorized", 401);

    // Load submission (RLS enforces ownership)
    const { data: submission, error: subErr } = await userClient
      .from("dsa_submissions")
      .select("id, user_id, problem_id, language, source_code, status, attempt_number")
      .eq("id", submission_id)
      .eq("user_id", user.id)
      .single();

    if (subErr || !submission) return jsonError("Submission not found or access denied", 404);
    if (submission.status !== "queued") {
      return jsonResponse({ message: "Already processed", status: submission.status });
    }

    // Validate source size
    const sourceBytes = new TextEncoder().encode(submission.source_code).length;
    if (sourceBytes > MAX_SOURCE_SIZE_BYTES) {
      await updateSub(serviceClient, submission_id, {
        status: "compile_error",
        error_type: "size_limit",
        error_message: "Source code exceeds the 64 KB limit.",
      });
      return jsonResponse({ status: "compile_error" });
    }

    // Load problem via service role
    const { data: problem, error: probErr } = await serviceClient
      .from("dsa_problems")
      .select("id, title, difficulty, has_internal_engine, time_limit_ms, memory_limit_mb")
      .eq("id", submission.problem_id)
      .single();

    if (probErr || !problem) {
      await markSysError(serviceClient, submission_id, "Problem not found");
      return jsonError("Problem not found", 404);
    }
    if (!problem.has_internal_engine) {
      await markSysError(serviceClient, submission_id, "Problem does not support internal execution");
      return jsonError("Problem does not support internal execution", 422);
    }

    // Load test cases via service role (hidden tests included here for Submit)
    let tcQuery = serviceClient
      .from("dsa_test_cases")
      .select("id, input, expected_output, is_hidden, ordering")
      .eq("problem_id", submission.problem_id)
      .order("ordering");

    if (is_run_only) tcQuery = tcQuery.eq("is_sample", true);

    const { data: testCases, error: tcErr } = await tcQuery;
    if (tcErr || !testCases?.length) {
      await markSysError(serviceClient, submission_id, "No test cases found");
      return jsonError("No test cases available", 404);
    }

    // Mark running
    await updateSub(serviceClient, submission_id, { status: "running" });

    const timeLimitMs = Math.min(problem.time_limit_ms ?? 2000, EXECUTION_TIMEOUT_MS);

    // Execute
    const execResult = await executeCode({
      code: submission.source_code,
      testCases: testCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expected_output,
      })),
      timeLimitMs,
    });

    // Judge
    let finalStatus: string;
    let passedCount = 0;
    const totalCount = testCases.length;

    if (execResult.type === "compile_error") {
      finalStatus = "compile_error";
    } else if (execResult.type === "runtime_error") {
      finalStatus = "runtime_error";
    } else if (execResult.type === "time_limit") {
      finalStatus = "time_limit";
    } else if (execResult.type === "system_error") {
      finalStatus = "system_error";
    } else {
      passedCount = execResult.results!.filter((r) => r.passed).length;
      finalStatus = passedCount === totalCount ? "accepted" : "wrong_answer";
    }

    // Safe error message — never reveal hidden test content
    const safeErrMsg =
      finalStatus === "wrong_answer"
        ? null
        : sanitizeErr(execResult.errorMessage ?? null);

    await updateSub(serviceClient, submission_id, {
      status: finalStatus,
      passed_tests: passedCount,
      total_tests: totalCount,
      execution_time_ms: execResult.executionTimeMs ?? null,
      error_type: ["compile_error", "runtime_error", "time_limit", "system_error"].includes(
        finalStatus
      )
        ? finalStatus
        : null,
      error_message: safeErrMsg,
    });

    // Post-judge server-side operations
    if (!is_run_only) {
      if (finalStatus === "accepted") {
        await serviceClient.rpc("verify_dsa_solve", {
          _user: user.id,
          _problem_id: submission.problem_id,
          _submission_id: submission_id,
          _execution_time_ms: execResult.executionTimeMs ?? null,
          _memory_kb: null,
        });
      } else if (finalStatus !== "system_error") {
        await serviceClient.rpc("record_dsa_attempt", {
          _user: user.id,
          _problem_id: submission.problem_id,
          _is_run_only: false,
        });
      }
      // system_error → no user penalty
    } else {
      await serviceClient.rpc("record_dsa_attempt", {
        _user: user.id,
        _problem_id: submission.problem_id,
        _is_run_only: true,
      });
    }

    return jsonResponse({ status: finalStatus, passed_tests: passedCount, total_tests: totalCount });
  } catch (err: unknown) {
    console.error("[dsa-execute]", err instanceof Error ? err.message : err);
    return jsonError("Internal server error", 500);
  }
});

// ================================================================
// Execution Engine
// ================================================================

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface TestResult {
  passed: boolean;
}

type ExecType = "compile_error" | "runtime_error" | "time_limit" | "system_error" | "success";

interface ExecResult {
  type: ExecType;
  results?: TestResult[];
  executionTimeMs?: number;
  errorMessage?: string;
}

async function executeCode(opts: {
  code: string;
  testCases: TestCase[];
  timeLimitMs: number;
}): Promise<ExecResult> {
  const { code, testCases, timeLimitMs } = opts;
  const startTime = Date.now();
  const workerSrc = buildHarness(code, testCases);

  return new Promise<ExecResult>((resolve) => {
    let worker: Worker | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function cleanup() {
      if (timer) clearTimeout(timer);
      try { worker?.terminate(); } catch {}
    }

    try {
      const blob = new Blob([workerSrc], { type: "application/javascript" });
      const url  = URL.createObjectURL(blob);

      worker = new Worker(url, {
        type: "module",
        // @ts-ignore — Deno-specific option
        deno: {
          permissions: {
            net:    false,
            read:   false,
            write:  false,
            env:    false,
            run:    false,
            ffi:    false,
            hrtime: false,
          },
        },
      });

      URL.revokeObjectURL(url);

      timer = setTimeout(() => {
        cleanup();
        resolve({ type: "time_limit", executionTimeMs: timeLimitMs, errorMessage: "Time limit exceeded" });
      }, timeLimitMs + 500);

      worker.onmessage = (e: MessageEvent) => {
        const elapsed = Date.now() - startTime;
        cleanup();
        const msg = e.data;
        if (msg.type === "compile_error") {
          resolve({ type: "compile_error", errorMessage: msg.message });
        } else if (msg.type === "runtime_error") {
          resolve({ type: "runtime_error", errorMessage: msg.message });
        } else if (msg.type === "results") {
          resolve({ type: "success", results: msg.results, executionTimeMs: elapsed });
        } else {
          resolve({ type: "system_error", errorMessage: "Unknown worker message" });
        }
      };

      worker.onerror = (e: ErrorEvent) => {
        cleanup();
        resolve({ type: "runtime_error", errorMessage: e.message ?? "Worker error" });
      };
    } catch (err: unknown) {
      cleanup();
      resolve({
        type: "system_error",
        errorMessage: err instanceof Error ? err.message : "Worker init failed",
      });
    }
  });
}

/**
 * Builds the sandboxed worker script.
 * User code is JSON-encoded to safely embed without escaping issues.
 * The worker uses new Function() to eval the user code — this runs
 * inside the Worker context which has no net/fs/env access.
 */
function buildHarness(userCode: string, testCases: TestCase[]): string {
  const codeJson  = JSON.stringify(userCode);
  const tcJson    = JSON.stringify(testCases);
  const maxOutput = MAX_OUTPUT_SIZE_BYTES;

  const lines = [
    '"use strict";',
    "const MAX_OUT = " + maxOutput + ";",
    "const TC = " + tcJson + ";",
    "const CODE = " + codeJson + ";",
    "",
    "async function run() {",
    "  let fn;",
    "  try {",
    "    const m = CODE.match(/function\\s+(\\w+)\\s*\\(/);",
    '    if (!m) throw new Error("No function definition found.");',
    "    const name = m[1];",
    "    const wrap = new Function(CODE + '\\n' + 'return typeof ' + name + ' !== \"undefined\" ? ' + name + ' : null;');",
    "    fn = wrap();",
    '    if (typeof fn !== "function") throw new Error("Function \\"" + name + "\\" not found.");',
    "  } catch (e) {",
    '    self.postMessage({ type: "compile_error", message: String(e && e.message ? e.message : e) });',
    "    return;",
    "  }",
    "  const results = [];",
    "  for (const tc of TC) {",
    "    try {",
    "      let args = [];",
    '      if (typeof tc.input === "string" && tc.input.startsWith("JSON:")) {',
    "        const p = JSON.parse(tc.input.slice(5));",
    "        args = Object.values(p);",
    "      }",
    "      let r = fn(...args);",
    "      if (r && typeof r.then === 'function') r = await r;",
    "      let out = JSON.stringify(r);",
    '      if (out === undefined) out = "undefined";',
    "      if (new TextEncoder().encode(out).length > MAX_OUT) {",
    '        self.postMessage({ type: "runtime_error", message: "Output exceeds size limit" });',
    "        return;",
    "      }",
    "      const exp = tc.expectedOutput.trim();",
    "      const act = out.trim();",
    "      let ok = act === exp;",
    '      if (!ok && exp.includes("|")) {',
    '        ok = exp.split("|").some(function(e) { return e.trim() === act; });',
    "      }",
    "      if (!ok) {",
    "        try {",
    "          ok = JSON.stringify(JSON.parse(exp)) === JSON.stringify(JSON.parse(act));",
    "        } catch(_) {}",
    "      }",
    "      results.push({ passed: ok });",
    "    } catch (e) {",
    "      const msg = String(e && e.message ? e.message : e).slice(0, 500);",
    '      self.postMessage({ type: "runtime_error", message: msg });',
    "      return;",
    "    }",
    "  }",
    '  self.postMessage({ type: "results", results: results });',
    "}",
    "run().catch(function(e) {",
    '  self.postMessage({ type: "runtime_error", message: String(e && e.message ? e.message : e) });',
    "});",
  ];

  return lines.join("\n");
}

// ================================================================
// Helpers
// ================================================================

async function updateSub(
  client: ReturnType<typeof createClient>,
  id: string,
  data: Record<string, unknown>
) {
  await client.from("dsa_submissions").update(data).eq("id", id);
}

async function markSysError(
  client: ReturnType<typeof createClient>,
  id: string,
  msg: string
) {
  await updateSub(client, id, {
    status: "system_error",
    error_type: "system_error",
    error_message: msg,
  });
}

function sanitizeErr(msg: string | null): string | null {
  if (!msg) return null;
  return msg
    .split("\n")
    .filter(
      (l) =>
        !l.includes("/home/") &&
        !l.includes("/usr/") &&
        !l.includes("deno:")
    )
    .join("\n")
    .trim()
    .slice(0, 500) || null;
}

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
