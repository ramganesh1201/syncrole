import { supabase } from "@/integrations/supabase/client";

/**
 * WorkspaceProblem — enriched problem data for the DSA workspace.
 * Supports both execution-enabled problems and practice-only problems.
 */
export interface WorkspaceProblem {
  id: string;
  title: string;
  difficulty: string;
  topic_id: string;
  topic_name?: string;
  slug: string | null;
  description_md: string | null;
  constraints_md: string | null;
  examples_json: Array<{
    input: string;
    output: string;
    explanation?: string;
  }> | null;
  starter_code_js: string | null;
  supported_languages: string[];
  time_limit_ms: number;
  memory_limit_mb: number;
  has_internal_engine: boolean;
  execution_status: "enabled" | "unavailable";
  leetcode_url: string | null;
  xp_reward: number;
  tags: string[] | null;
}

export interface SampleTestCase {
  id: string;
  input: string;
  expected_output: string;
  ordering: number;
}

export interface CodeDraft {
  code: string;
  language: string;
  updated_at: string;
}

export class DSAWorkspaceService {
  /**
   * Fetches a workspace problem by ID, with topic name.
   * Handles left join on dsa_topics and provides sensible fallback starter code.
   */
  static async getWorkspaceProblem(
    problemId: string
  ): Promise<WorkspaceProblem | null> {
    const { data, error } = await supabase
      .from("dsa_problems")
      .select(
        `
        id, title, difficulty, topic_id, slug,
        description_md, constraints_md, examples_json,
        starter_code_js, supported_languages,
        time_limit_ms, memory_limit_mb, has_internal_engine,
        leetcode_url, xp_reward, tags,
        dsa_topics(name)
      `
      )
      .eq("id", problemId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const hasInternalEngine = Boolean(data.has_internal_engine);
    
    // Check if test cases exist for this problem
    let executionStatus: "enabled" | "unavailable" = "unavailable";
    if (hasInternalEngine) {
      const { count } = await supabase
        .from("dsa_test_cases")
        .select("id", { count: "exact", head: true })
        .eq("problem_id", problemId);
      
      if (count && count > 0) {
        executionStatus = "enabled";
      }
    }

    const defaultStarter = `/**
 * Problem: ${data.title}
 * Language: JavaScript
 */

function solution() {
  // Write your solution here
}
`;

    return {
      ...data,
      topic_name: (data as any).dsa_topics?.name ?? undefined,
      starter_code_js: data.starter_code_js || defaultStarter,
      supported_languages: data.supported_languages ?? ["javascript"],
      time_limit_ms: data.time_limit_ms ?? 2000,
      memory_limit_mb: data.memory_limit_mb ?? 128,
      has_internal_engine: hasInternalEngine,
      execution_status: executionStatus,
    } as WorkspaceProblem;
  }

  /**
   * Fetches ONLY sample (non-hidden) test cases for display in the UI.
   * RLS on dsa_test_cases ensures hidden tests are never returned here.
   */
  static async getSampleTests(problemId: string): Promise<SampleTestCase[]> {
    const { data, error } = await supabase
      .from("dsa_test_cases")
      .select("id, input, expected_output, ordering")
      .eq("problem_id", problemId)
      .eq("is_sample", true)
      .order("ordering");

    if (error) throw error;
    return (data ?? []) as SampleTestCase[];
  }

  /**
   * Gets the user's current progress for a specific problem.
   */
  static async getUserProblemProgress(userId: string, problemId: string) {
    const { data } = await supabase
      .from("user_problem_progress")
      .select(
        "id, solved, status, attempt_count, submission_count, run_count, " +
          "first_started_at, first_solved_at, last_attempted, best_execution_time_ms, " +
          "best_memory_kb, total_active_seconds, confidence, notes"
      )
      .eq("user_id", userId)
      .eq("problem_id", problemId)
      .maybeSingle();

    return data;
  }

  /**
   * Updates problem progress status (e.g. from not_started to in_progress or attempted).
   */
  static async updateProblemStatus(
    userId: string,
    problemId: string,
    status: "in_progress" | "attempted" | "solved",
    extraFields: Record<string, any> = {}
  ): Promise<void> {
    const existing = await this.getUserProblemProgress(userId, problemId);
    
    // Solved status should never regress
    if (existing?.solved && status !== "solved") {
      return;
    }

    const payload: Record<string, any> = {
      user_id: userId,
      problem_id: problemId,
      status: existing?.solved ? "solved" : status,
      last_attempted: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...extraFields,
    };

    if (!existing) {
      payload.first_started_at = new Date().toISOString();
    }

    await supabase
      .from("user_problem_progress")
      .upsert(payload, { onConflict: "user_id, problem_id" });
  }

  /**
   * Loads the saved code draft for a user/problem/language combination.
   * Returns null if no draft exists.
   */
  static async getCodeDraft(
    userId: string,
    problemId: string,
    language: string
  ): Promise<CodeDraft | null> {
    const { data } = await supabase
      .from("dsa_code_drafts")
      .select("code, language, updated_at")
      .eq("user_id", userId)
      .eq("problem_id", problemId)
      .eq("language", language)
      .maybeSingle();

    return data as CodeDraft | null;
  }

  /**
   * Saves the code draft to the database (debounced at call site).
   * Uses upsert to avoid duplicates.
   */
  static async saveCodeDraft(
    userId: string,
    problemId: string,
    language: string,
    code: string
  ): Promise<void> {
    const { error } = await supabase.from("dsa_code_drafts").upsert(
      {
        user_id: userId,
        problem_id: problemId,
        language,
        code,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id, problem_id, language" }
    );

    if (error) {
      console.warn("[DSAWorkspace] Failed to save server draft:", error.message);
    }
  }
}
