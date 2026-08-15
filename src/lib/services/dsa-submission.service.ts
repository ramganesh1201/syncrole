import { supabase } from "@/integrations/supabase/client";

// Maximum source code size: 64 KB
const MAX_SOURCE_SIZE_BYTES = 64 * 1024;
// Poll interval for submission result
const POLL_INTERVAL_MS = 1500;
// Maximum polls before giving up (45s total)
const MAX_POLLS = 30;

export type SubmissionStatus =
  | "queued"
  | "running"
  | "accepted"
  | "wrong_answer"
  | "compile_error"
  | "runtime_error"
  | "time_limit"
  | "memory_limit"
  | "system_error";

export interface SubmissionResult {
  id: string;
  status: SubmissionStatus;
  passed_tests: number;
  total_tests: number;
  execution_time_ms: number | null;
  memory_kb: number | null;
  error_type: string | null;
  error_message: string | null;
  attempt_number: number;
  is_run_only: boolean;
  created_at: string;
}

export interface SubmissionCreateParams {
  userId: string;
  problemId: string;
  sessionId: string | null;
  language: string;
  sourceCode: string;
  isRunOnly: boolean;
  attemptNumber: number;
}

/**
 * Validates source code size before submission.
 * Returns an error string if invalid, null if valid.
 */
export function validateSourceCode(sourceCode: string): string | null {
  if (!sourceCode || !sourceCode.trim()) {
    return "Code cannot be empty.";
  }
  const sizeBytes = new TextEncoder().encode(sourceCode).length;
  if (sizeBytes > MAX_SOURCE_SIZE_BYTES) {
    return `Source code exceeds the 64 KB limit (${Math.round(sizeBytes / 1024)} KB).`;
  }
  return null;
}

export class DSASubmissionService {
  /**
   * Creates a submission record in the database and triggers execution
   * via the Supabase Edge Function.
   *
   * IMPORTANT: The edge function does the actual execution and judging.
   * This method only creates the queued record and calls the function.
   * Results are polled via pollSubmissionResult.
   */
  static async createAndExecute(
    params: SubmissionCreateParams
  ): Promise<{ submissionId: string; error?: string }> {
    const {
      userId,
      problemId,
      sessionId,
      language,
      sourceCode,
      isRunOnly,
      attemptNumber,
    } = params;

    // Client-side validation
    const validationError = validateSourceCode(sourceCode);
    if (validationError) {
      return { submissionId: "", error: validationError };
    }

    // Create submission record (status = queued)
    const { data: submission, error: insertError } = await supabase
      .from("dsa_submissions")
      .insert({
        user_id: userId,
        problem_id: problemId,
        practice_session_id: sessionId,
        language,
        source_code: sourceCode,
        status: "queued",
        is_run_only: isRunOnly,
        attempt_number: attemptNumber,
        passed_tests: 0,
        total_tests: 0,
      })
      .select("id")
      .single();

    if (insertError || !submission) {
      return {
        submissionId: "",
        error: insertError?.message ?? "Failed to create submission.",
      };
    }

    // Trigger execution via Edge Function
    // The edge function loads test cases server-side, executes, judges,
    // then updates the submission row. It uses service_role to access hidden tests.
    const { error: fnError } = await supabase.functions.invoke(
      "dsa-execute",
      {
        body: {
          submission_id: submission.id,
          is_run_only: isRunOnly,
        },
      }
    );

    if (fnError) {
      // If the function invocation fails, mark the submission as system_error
      await supabase
        .from("dsa_submissions")
        .update({
          status: "system_error",
          error_type: "system_error",
          error_message: "Execution service temporarily unavailable.",
        })
        .eq("id", submission.id);

      return {
        submissionId: submission.id,
        error:
          "Execution service temporarily unavailable. Your submission was not counted as a failed attempt.",
      };
    }

    return { submissionId: submission.id };
  }

  /**
   * Polls for a submission result until it moves from queued/running state.
   * Returns the final result or throws after timeout.
   *
   * This is safe to call because the submission is user-owned (RLS enforces this).
   * The response NEVER includes hidden test case content — only status + counts.
   */
  static async pollSubmissionResult(
    submissionId: string,
    onStatusUpdate?: (status: SubmissionStatus) => void
  ): Promise<SubmissionResult> {
    for (let i = 0; i < MAX_POLLS; i++) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

      const { data, error } = await supabase
        .from("dsa_submissions")
        .select(
          "id, status, passed_tests, total_tests, execution_time_ms, " +
            "memory_kb, error_type, error_message, attempt_number, " +
            "is_run_only, created_at"
        )
        .eq("id", submissionId)
        .single();

      if (error) {
        throw new Error(`Failed to poll submission: ${error.message}`);
      }

      const result = data as SubmissionResult;
      onStatusUpdate?.(result.status);

      // If no longer in queued/running state, we have a final result
      if (result.status !== "queued" && result.status !== "running") {
        return result;
      }
    }

    // Timed out waiting for result
    throw new Error(
      "Submission is taking longer than expected. Please check back later."
    );
  }

  /**
   * Fetches all submissions for a user/problem (for submission history).
   * Source code is excluded for non-own submissions (RLS handles this).
   */
  static async getSubmissionHistory(
    userId: string,
    problemId: string,
    limit = 20
  ): Promise<SubmissionResult[]> {
    const { data, error } = await supabase
      .from("dsa_submissions")
      .select(
        "id, status, passed_tests, total_tests, execution_time_ms, " +
          "memory_kb, error_type, error_message, attempt_number, " +
          "is_run_only, created_at"
      )
      .eq("user_id", userId)
      .eq("problem_id", problemId)
      .eq("is_run_only", false)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []) as SubmissionResult[];
  }
}
