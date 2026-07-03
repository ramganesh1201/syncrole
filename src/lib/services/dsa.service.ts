import { supabase } from "@/integrations/supabase/client";

export interface ProblemFilterState {
  sortBy: "default" | "difficulty" | "popularity" | "acceptance" | "newest";
  topic: string;
  difficulty: string;
  list: "all" | "blind75" | "neetcode150";
  solvedStatus: "all" | "solved" | "unsolved" | "attempted";
  bookmark: "all" | "bookmarked" | "favorite";
}

export class DSAService {
  /**
   * Fetches all topics ordered by display_order
   */
  static async getTopics() {
    const { data, error } = await supabase
      .from("dsa_topics")
      .select("id, name")
      .order("display_order");
    if (error) throw error;
    return data;
  }

  /**
   * Dynamically fetches problems with server-side pagination, searching, and filtering.
   * This is architected to easily support 1000+ problems.
   */
  static async getProblems(
    filters: ProblemFilterState,
    searchTerm: string,
    page: number,
    itemsPerPage: number,
    userId?: string
  ) {
    let query = supabase.from("dsa_problems").select("*", { count: "exact" });

    if (filters.topic) query = query.eq("topic_id", filters.topic);
    if (filters.difficulty) query = query.ilike("difficulty", filters.difficulty);

    if (searchTerm.trim()) {
      const term = `%${searchTerm.trim()}%`;
      query = query.or(`title.ilike.${term},problem_pattern.ilike.${term}`);
    }

    if (filters.list === "blind75") query = query.eq("blind75", true);
    if (filters.list === "neetcode150") query = query.eq("neetcode150", true);

    if (userId && (filters.solvedStatus !== "all" || filters.bookmark !== "all")) {
      const { data: pData } = await supabase
        .from("user_problem_progress")
        .select("problem_id, solved, is_bookmarked, is_favorite")
        .eq("user_id", userId);
      
      if (pData) {
        let matches = pData;
        if (filters.solvedStatus === "solved") matches = matches.filter((p: any) => p.solved);
        if (filters.solvedStatus === "unsolved") {
          const solvedIds = pData.filter((p: any) => p.solved).map((p: any) => p.problem_id);
          if (solvedIds.length > 0) query = query.not("id", "in", `(${solvedIds.join(",")})`);
        }
        if (filters.bookmark === "bookmarked") matches = matches.filter((p: any) => p.is_bookmarked);
        if (filters.bookmark === "favorite") matches = matches.filter((p: any) => p.is_favorite);

        if (filters.solvedStatus !== "unsolved" && (filters.solvedStatus !== "all" || filters.bookmark !== "all")) {
          const filterIds = matches.map((p: any) => p.problem_id);
          if (filterIds.length === 0) {
            return { data: [], count: 0 };
          }
          query = query.in("id", filterIds);
        }
      }
    }

    // Sorting
    if (filters.sortBy === "popularity") {
      query = query.order("frequency", { ascending: false, nullsFirst: false });
    } else if (filters.sortBy === "acceptance") {
      query = query.order("acceptance_rate", { ascending: false, nullsFirst: false });
    } else if (filters.sortBy === "newest") {
      query = query.order("recommended_order", { ascending: true, nullsFirst: false });
    } else {
      query = query.order("xp_reward", { ascending: true });
    }

    // Pagination
    query = query.range(page * itemsPerPage, (page + 1) * itemsPerPage - 1);

    const { data, count, error } = await query;
    if (error) throw error;

    return { data, count: count || 0 };
  }

  /**
   * Fetches user progress for a specific set of problems (used to populate the current page view).
   */
  static async getUserProgress(userId: string, problemIds: string[]) {
    if (!problemIds || problemIds.length === 0) return new Map();
    const { data, error } = await supabase
      .from("user_problem_progress")
      .select("*")
      .eq("user_id", userId)
      .in("problem_id", problemIds);

    if (error) throw error;
    
    const progressMap = new Map();
    data.forEach((p: any) => progressMap.set(p.problem_id, p));
    return progressMap;
  }

  /**
   * Fetches only solved problem details for analytics.
   * Excludes any manual logs; this is the strict source of truth.
   */
  static async getSolvedAnalytics(userId: string) {
    const { data, error } = await supabase
      .from("user_problem_progress")
      .select(`
        id, last_solved_at, updated_at,
        dsa_problems!inner(difficulty)
      `)
      .eq("user_id", userId)
      .eq("solved", true);
      
    if (error) throw error;
    return data || [];
  }

  /**
   * Updates or inserts progress for a problem, automatically triggering XP/achievements
   * if marked as solved.
   */
  static async updateProblemProgress(userId: string, problemId: string, updates: any, existingProgress: any, problemMeta: any) {
    const now = new Date().toISOString();
    
    const payload = {
      user_id: userId,
      problem_id: problemId,
      ...existingProgress,
      ...updates,
      last_attempted: now,
    } as any;
    
    if (updates.solved === true) payload.status = "solved";

    let resultId;
    if (existingProgress) {
      const { error } = await supabase.from("user_problem_progress").update(payload).eq("id", existingProgress.id);
      if (error) throw error;
      resultId = existingProgress.id;
    } else {
      const { data, error } = await supabase.from("user_problem_progress").insert(payload).select().single();
      if (error || !data) throw error || new Error("Failed to insert progress");
      resultId = data.id;
      payload.id = resultId;
    }

    if (updates.solved !== undefined && problemMeta) {
      await this.handleTopicProgress(userId, problemMeta.topic_id, now);
      
      if (updates.solved && !existingProgress?.solved) {
        await this.handleXPAndAchievements(userId, problemMeta);
      }
    }

    return payload;
  }

  private static async handleTopicProgress(userId: string, topicId: string, timestamp: string) {
    const [{ count: topicTotal }, { count: topicSolved }] = await Promise.all([
      supabase.from("dsa_problems").select("*", { count: "exact", head: true }).eq("topic_id", topicId),
      supabase.from("user_problem_progress")
              .select("id, dsa_problems!inner(topic_id)", { count: "exact", head: true })
              .eq("user_id", userId)
              .eq("solved", true)
              .eq("dsa_problems.topic_id", topicId)
    ]);
    const completedPercent = topicTotal ? Math.round(((topicSolved || 0) / topicTotal) * 100) : 0;
    
    await supabase.from("user_topic_progress").upsert({
      user_id: userId,
      topic_id: topicId,
      completed_percent: completedPercent,
      mastery_score: completedPercent,
      last_activity: timestamp,
    }, { onConflict: "user_id, topic_id" });
  }

  private static async handleXPAndAchievements(userId: string, problemMeta: any) {
    const { count: totalSolvedCount } = await supabase.from("user_problem_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("solved", true);
      
    const xp = problemMeta.xp_reward || 10;
    
    await supabase.rpc("award_xp", {
      _user: userId,
      _type: "dsa_solved",
      _xp: xp,
      _meta: { problem_id: problemMeta.id, title: problemMeta.title, difficulty: problemMeta.difficulty },
    });

    const totalSolved = totalSolvedCount || 1;
    for (const [code, n] of [
      ["dsa_10", 10],
      ["dsa_50", 50],
      ["dsa_100", 100],
    ] as const) {
      if (totalSolved >= n) {
        await supabase.from("achievements").insert({ user_id: userId, code }).then(() => {});
      }
    }

    await supabase.rpc("recompute_placement", { _user: userId });
    await supabase.from("notifications").insert({
      user_id: userId,
      title: "Problem Solved 🧠",
      body: `+${xp} XP for solving ${problemMeta.title}`,
      type: "dsa",
    });
  }
}
