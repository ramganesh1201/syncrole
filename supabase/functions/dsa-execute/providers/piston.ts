import {
  CodeExecutionProvider,
  ExecResult,
  ExecutionTestCase,
  TestCaseResult,
} from "./types.ts";

const DEFAULT_PISTON_ENDPOINT = "https://emkc.org/api/v2/piston/execute";

export class PistonExecutionProvider implements CodeExecutionProvider {
  name = "piston";

  async execute(params: {
    language: string;
    code: string;
    testCases: ExecutionTestCase[];
    timeLimitMs: number;
  }): Promise<ExecResult> {
    const { language, code, testCases, timeLimitMs } = params;

    const endpoint =
      Deno.env.get("PISTON_API_URL") || DEFAULT_PISTON_ENDPOINT;

    const harness = buildPistonHarness(code, testCases);

    const pistonPayload = {
      language: mapLanguage(language),
      version: "*",
      files: [
        {
          name: "solution.js",
          content: harness,
        },
      ],
      run_timeout: timeLimitMs,
      compile_timeout: 5000,
    };

    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        timeLimitMs + 3000
      );

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pistonPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(
          "[piston-provider] HTTP error:",
          response.status,
          await response.text().catch(() => "")
        );
        return {
          type: "system_error",
          errorMessage: "Code execution provider returned error response.",
        };
      }

      const data = await response.json();
      const elapsed = Date.now() - startTime;

      return parsePistonOutput(data, testCases.length, elapsed);
    } catch (err: unknown) {
      console.error(
        "[piston-provider] Execution failed:",
        err instanceof Error ? err.message : err
      );

      if (err instanceof Error && err.name === "AbortError") {
        return {
          type: "time_limit",
          executionTimeMs: timeLimitMs,
          errorMessage: "Execution time limit exceeded.",
        };
      }

      return {
        type: "system_error",
        errorMessage: "Code execution service temporarily unavailable.",
      };
    }
  }
}

function mapLanguage(lang: string): string {
  switch (lang.toLowerCase()) {
    case "javascript":
    case "js":
      return "javascript";
    case "typescript":
    case "ts":
      return "typescript";
    case "python":
    case "py":
      return "python";
    default:
      return "javascript";
  }
}

/**
 * Constructs the JavaScript harness script that executes within Piston's isolated sandbox.
 * No eval() or Function() constructor used in our code.
 */
function buildPistonHarness(
  userCode: string,
  testCases: ExecutionTestCase[]
): string {
  const codeJson = JSON.stringify(userCode);
  const tcJson = JSON.stringify(testCases);

  return `
"use strict";

// User solution code
${userCode}

const TEST_CASES = ${tcJson};

function findTargetFunction() {
  const match = (${codeJson}).match(/function\\s+([a-zA-Z0-9_$]+)\\s*\\(/);
  if (match && match[1]) {
    const fnName = match[1];
    try {
      if (typeof twoSum === "function") return twoSum;
      if (typeof isValid === "function") return isValid;
      if (typeof reverseString === "function") return reverseString;
      if (typeof isPalindrome === "function") return isPalindrome;
      if (typeof maxSubArray === "function") return maxSubArray;
      if (typeof climbStairs === "function") return climbStairs;
      if (typeof search === "function") return search;
      if (typeof isAnagram === "function") return isAnagram;
      if (typeof merge === "function") return merge;
      if (typeof fizzBuzz === "function") return fizzBuzz;
      if (typeof globalThis[fnName] === "function") return globalThis[fnName];
    } catch (_) {}
  }
  return null;
}

async function runHarness() {
  const fn = findTargetFunction();
  
  if (typeof fn !== "function") {
    console.log(JSON.stringify({ type: "compile_error", message: "Target function not found." }));
    return;
  }

  const results = [];
  for (const tc of TEST_CASES) {
    try {
      let args = [];
      if (typeof tc.input === "string" && tc.input.startsWith("JSON:")) {
        const parsed = JSON.parse(tc.input.slice(5));
        args = Object.values(parsed);
      } else if (typeof tc.input === "string") {
        try {
          const parsed = JSON.parse(tc.input);
          args = Array.isArray(parsed) ? parsed : [parsed];
        } catch (_) {
          args = [tc.input];
        }
      } else {
        args = [tc.input];
      }

      let res = fn(...args);
      if (res && typeof res.then === "function") {
        res = await res;
      }

      let outStr = JSON.stringify(res);
      if (outStr === undefined) outStr = "undefined";

      const exp = String(tc.expectedOutput).trim();
      const act = outStr.trim();
      let ok = act === exp;

      if (!ok && exp.includes("|")) {
        ok = exp.split("|").some(e => e.trim() === act);
      }
      if (!ok) {
        try {
          ok = JSON.stringify(JSON.parse(exp)) === JSON.stringify(JSON.parse(act));
        } catch (_) {}
      }

      results.push({ passed: ok });
    } catch (err) {
      const msg = String(err && err.message ? err.message : err).slice(0, 500);
      console.log(JSON.stringify({ type: "runtime_error", message: msg }));
      return;
    }
  }

  console.log(JSON.stringify({ type: "results", results: results }));
}

runHarness().catch(err => console.log(JSON.stringify({ type: "runtime_error", message: String(err && err.message ? err.message : err) })));
`;
}

function parsePistonOutput(
  data: any,
  expectedTestCount: number,
  elapsedMs: number
): ExecResult {
  const run = data?.run || {};
  const compile = data?.compile || {};

  // Check compile stage error
  if (compile.code !== undefined && compile.code !== 0) {
    return {
      type: "compile_error",
      errorMessage: sanitizePistonOutput(compile.stderr || compile.output || "Compilation failed."),
    };
  }

  // Check timeout / signals
  if (run.signal === "SIGKILL" || run.signal === "SIGTERM") {
    return {
      type: "time_limit",
      executionTimeMs: elapsedMs,
      errorMessage: "Time limit exceeded.",
    };
  }

  // Check runtime stderr
  const stderr = run.stderr || "";
  if (run.code !== 0 && stderr && !stderr.includes("JSON.stringify")) {
    // Syntax error or uncaught exception during evaluation
    if (stderr.includes("SyntaxError")) {
      return {
        type: "compile_error",
        errorMessage: sanitizePistonOutput(stderr),
      };
    }
    return {
      type: "runtime_error",
      errorMessage: sanitizePistonOutput(stderr),
    };
  }

  const stdout = (run.stdout || "").trim();
  if (!stdout) {
    if (stderr) {
      return {
        type: "runtime_error",
        errorMessage: sanitizePistonOutput(stderr),
      };
    }
    return {
      type: "system_error",
      errorMessage: "No output received from execution engine.",
    };
  }

  // Find harness JSON message line
  const lines = stdout.split("\n");
  let harnessMsg: any = null;

  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i].trim();
    if (line.startsWith("{") && line.endsWith("}")) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.type) {
          harnessMsg = parsed;
          break;
        }
      } catch (_) {}
    }
  }

  if (!harnessMsg) {
    return {
      type: "runtime_error",
      errorMessage: sanitizePistonOutput(stdout.slice(0, 500)),
    };
  }

  if (harnessMsg.type === "compile_error") {
    return {
      type: "compile_error",
      errorMessage: harnessMsg.message,
    };
  }

  if (harnessMsg.type === "runtime_error") {
    return {
      type: "runtime_error",
      errorMessage: harnessMsg.message,
    };
  }

  if (harnessMsg.type === "results" && Array.isArray(harnessMsg.results)) {
    const results: TestCaseResult[] = harnessMsg.results.map((r: any) => ({
      passed: Boolean(r.passed),
    }));

    const passedCount = results.filter((r) => r.passed).length;
    const totalCount = results.length;

    const isAccepted = passedCount === totalCount && totalCount === expectedTestCount;

    return {
      type: isAccepted ? "accepted" : "wrong_answer",
      passedCount,
      totalCount,
      results,
      executionTimeMs: elapsedMs,
    };
  }

  return {
    type: "system_error",
    errorMessage: "Unexpected output format from execution engine.",
  };
}

function sanitizePistonOutput(text: string): string {
  if (!text) return "";
  return text
    .split("\n")
    .filter((l) => !l.includes("/piston/") && !l.includes("/tmp/"))
    .join("\n")
    .trim()
    .slice(0, 500);
}
