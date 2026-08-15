export interface ExecutionTestCase {
  input: string;
  expectedOutput: string;
}

export interface TestCaseResult {
  passed: boolean;
  actualOutput?: string;
  expectedOutput?: string;
  error?: string;
}

export type ExecType =
  | "accepted"
  | "wrong_answer"
  | "compile_error"
  | "runtime_error"
  | "time_limit"
  | "system_error";

export interface ExecResult {
  type: ExecType;
  passedCount?: number;
  totalCount?: number;
  results?: TestCaseResult[];
  executionTimeMs?: number;
  errorMessage?: string;
}

export interface CodeExecutionProvider {
  name: string;
  execute(params: {
    language: string;
    code: string;
    testCases: ExecutionTestCase[];
    timeLimitMs: number;
  }): Promise<ExecResult>;
}
