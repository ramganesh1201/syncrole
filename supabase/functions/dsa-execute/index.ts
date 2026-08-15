import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getExecutionProvider } from "./providers/index.ts";

// ================================================================
// DSA Execute Edge Function — Supabase Deno Runtime
//
// SECURITY MODEL:
// - Authenticates via JWT before any operation
// - Loads test cases server-side (hidden tests NEVER sent to browser)
// - Routes execution through external untrusted provider (Piston)
// - Judges and updates submission via service role only
// - verify_dsa_solve / record_dsa_attempt called server-side
// ================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_SOURCE_SIZE_BYTES = 64 * 1024;   // 64 KB
const EXECUTION_TIMEOUT_MS  = 4000;        // 4s timeout

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  try {
    let body: any;
    try {
      body = await req.json();
    } catch (_) {
      return jsonError("Invalid JSON request body", 400);
    }

    const { submission_id, is_run_only } = body || {};

    if (!submission_id || typeof submission_id !== "string") {
      return jsonError("Missing submission_id", 400);
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return jsonError("Unauthorized", 401);
    }
    const token = authHeader.replace("Bearer ", "");

    const supabaseUrl   = Deno.env.get("SUPABASE_URL");
    const anonKey       = Deno.env.get("SUPABASE_ANON_KEY");
    const serviceKey    = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !anonKey || !serviceKey) {
      console.error("[dsa-execute] Missing required Supabase environment variables");
      return jsonError("Server configuration error", 500);
    }

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

    if (subErr || !submission) {
      return jsonError("Submission not found or access denied", 404);
    }

    // Ensure single execution per submission
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

    // Load test cases via service role (hidden tests included only for Submit)
    let tcQuery = serviceClient
      .from("dsa_test_cases")
      .select("id, input, expected_output, is_hidden, ordering")
      .eq("problem_id", submission.problem_id)
      .order("ordering");

    if (is_run_only) {
      tcQuery = tcQuery.eq("is_sample", true);
    }

    const { data: testCases, error: tcErr } = await tcQuery;
    if (tcErr || !testCases?.length) {
      await markSysError(serviceClient, submission_id, "No test cases found");
      return jsonError("No test cases available", 404);
    }

    // Mark running
    await updateSub(serviceClient, submission_id, { status: "running" });

    const timeLimitMs = Math.min(problem.time_limit_ms ?? 2000, EXECUTION_TIMEOUT_MS);

    // Execute via Provider Abstraction (Piston API)
    const provider = getExecutionProvider();
    const execResult = await provider.execute({
      language: submission.language,
      code: submission.source_code,
      testCases: testCases.map((tc) => ({
        input: tc.input,
        expectedOutput: tc.expected_output,
      })),
      timeLimitMs,
    });

    const finalStatus = execResult.type;
    const passedCount = execResult.passedCount ?? 0;
    const totalCount = testCases.length;

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
      // system_error → no user penalty, no XP, no attempt record
    } else {
      if (finalStatus !== "system_error") {
        await serviceClient.rpc("record_dsa_attempt", {
          _user: user.id,
          _problem_id: submission.problem_id,
          _is_run_only: true,
        });
      }
    }

    return jsonResponse({
      status: finalStatus,
      passed_tests: passedCount,
      total_tests: totalCount,
    });
  } catch (err: unknown) {
    console.error("[dsa-execute] Unhandled error:", err instanceof Error ? err.message : err);
    return jsonError("Internal server error", 500);
  }
});

// ================================================================
// Helpers
// ================================================================

async function updateSub(
  client: any,
  id: string,
  data: Record<string, unknown>
) {
  await client.from("dsa_submissions").update(data).eq("id", id);
}

async function markSysError(
  client: any,
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
        !l.includes("deno:") &&
        !l.includes("/piston/")
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
