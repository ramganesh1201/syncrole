import {
  CodeExecutionProvider,
  ExecResult,
  ExecutionTestCase,
  TestCaseResult,
} from "./types.ts";

const DEFAULT_JUDGE0_ENDPOINT = "https://ce.judge0.com/submissions?wait=true";

export class Judge0ExecutionProvider implements CodeExecutionProvider {
  name = "judge0";

  async execute(params: {
    language: string;
    code: string;
    testCases: ExecutionTestCase[];
    timeLimitMs: number;
  }): Promise<ExecResult> {
    const { language, code, testCases, timeLimitMs } = params;

    const endpoint =
      Deno.env.get("JUDGE0_API_URL") || DEFAULT_JUDGE0_ENDPOINT;

    const harness = buildJudge0Harness(code, testCases);

    const payload = {
      language_id: mapJudge0LanguageId(language),
      source_code: harness,
      cpu_time_limit: Math.max(1, Math.ceil(timeLimitMs / 1000)),
    };

    const startTime = Date.now();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        timeLimitMs + 3000
      );

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const apiKey = Deno.env.get("JUDGE0_API_KEY");
      if (apiKey) {
        headers["X-RapidAPI-Key"] = apiKey;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(
          "[judge0-provider] HTTP error:",
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

      return parseJudge0Output(data, testCases.length, elapsed);
    } catch (err: unknown) {
      console.error(
        "[judge0-provider] Execution failed:",
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

function mapJudge0LanguageId(lang: string): number {
  switch (lang.toLowerCase()) {
    case "javascript":
    case "js":
      return 63; // JavaScript (Node.js 12.14.0)
    case "typescript":
    case "ts":
      return 74; // TypeScript (3.7.4)
    case "python":
    case "py":
      return 71; // Python (3.8.1)
    default:
      return 63;
  }
}

function buildJudge0Harness(
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

function parseJudge0Output(
  data: any,
  expectedTestCount: number,
  elapsedMs: number
): ExecResult {
  const statusId = data?.status?.id;

  // Status ID 5 = Time Limit Exceeded
  if (statusId === 5) {
    return {
      type: "time_limit",
      executionTimeMs: elapsedMs,
      errorMessage: "Time limit exceeded.",
    };
  }

  // Status ID 6 = Compilation Error
  if (statusId === 6 || data?.compile_output) {
    return {
      type: "compile_error",
      errorMessage: sanitizeJudge0Output(data.compile_output || data.stderr || "Compilation failed."),
    };
  }

  // Status ID 7..12 = Runtime Error / Memory Limit / Internal Error
  if (statusId >= 7 && statusId !== 3) {
    return {
      type: "runtime_error",
      errorMessage: sanitizeJudge0Output(data.stderr || data.message || "Runtime error occurred."),
    };
  }

  const stdout = (data?.stdout || "").trim();
  if (!stdout) {
    if (data?.stderr) {
      return {
        type: "runtime_error",
        errorMessage: sanitizeJudge0Output(data.stderr),
      };
    }
    return {
      type: "system_error",
      errorMessage: "No output received from execution engine.",
    };
  }

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
      errorMessage: sanitizeJudge0Output(stdout.slice(0, 500)),
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
      executionTimeMs: Math.round(parseFloat(data.time || "0") * 1000) || elapsedMs,
    };
  }

  return {
    type: "system_error",
    errorMessage: "Unexpected output format from execution engine.",
  };
}

function sanitizeJudge0Output(text: string): string {
  if (!text) return "";
  return text
    .split("\n")
    .filter((l) => !l.includes("judge0") && !l.includes("/tmp/"))
    .join("\n")
    .trim()
    .slice(0, 500);
}
