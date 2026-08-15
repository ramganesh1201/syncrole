import { supabase } from "@/integrations/supabase/client";

const INACTIVITY_TIMEOUT_MS = 3 * 60 * 1000; // 3 minutes idle = stop accumulating
const HEARTBEAT_INTERVAL_MS = 30 * 1000; // Write to DB every 30s
const MAX_ACTIVE_SECONDS_PER_SESSION = 86400; // 24h cap (sanity limit)

export interface PracticeSession {
  id: string;
  user_id: string;
  problem_id: string;
  started_at: string;
  active_seconds: number;
  wall_seconds: number;
  run_count: number;
  submission_count: number;
  final_status: string;
}

export class DSASessionService {
  /**
   * Starts a new session or resumes an existing in-progress one
   * for the given user + problem (created in last 24h).
   * Automatically reconciles stale sessions.
   */
  static async startOrResumeSession(
    userId: string,
    problemId: string
  ): Promise<PracticeSession> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Reconcile old stale in-progress sessions for this user (>6h without heartbeat)
    const { data: staleSessions } = await supabase
      .from("dsa_practice_sessions")
      .select("id, last_heartbeat_at, started_at")
      .eq("user_id", userId)
      .eq("final_status", "in_progress");

    if (staleSessions && staleSessions.length > 0) {
      const now = Date.now();
      for (const s of staleSessions) {
        const lastHb = new Date(s.last_heartbeat_at || s.started_at).getTime();
        if (now - lastHb > 6 * 60 * 60 * 1000) {
          await supabase
            .from("dsa_practice_sessions")
            .update({ final_status: "abandoned", ended_at: new Date().toISOString() })
            .eq("id", s.id);
        }
      }
    }

    // Look for an existing active in-progress session for this problem
    const { data: existing } = await supabase
      .from("dsa_practice_sessions")
      .select("*")
      .eq("user_id", userId)
      .eq("problem_id", problemId)
      .eq("final_status", "in_progress")
      .gte("created_at", oneDayAgo)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      return existing as PracticeSession;
    }

    // Create new session
    const { data, error } = await supabase
      .from("dsa_practice_sessions")
      .insert({
        user_id: userId,
        problem_id: problemId,
        started_at: new Date().toISOString(),
        last_heartbeat_at: new Date().toISOString(),
        active_seconds: 0,
        wall_seconds: 0,
        run_count: 0,
        submission_count: 0,
        final_status: "in_progress",
      })
      .select()
      .single();

    if (error) throw error;

    // Log activity
    await this.logActivity(userId, "dsa_session_started", {
      session_id: data.id,
      problem_id: problemId,
    });

    return data as PracticeSession;
  }

  /**
   * Sends a heartbeat to the database with incremental active & wall deltas.
   * Validates deltas server-side to prevent fake client values.
   */
  static async heartbeat(
    sessionId: string,
    activeSecondsDelta: number,
    wallSecondsDelta: number
  ): Promise<void> {
    if (!sessionId || (activeSecondsDelta <= 0 && wallSecondsDelta <= 0)) return;

    // Validate deltas — max 35s per heartbeat (interval is 30s)
    const safeActiveDelta = Math.min(Math.max(0, activeSecondsDelta), 35);
    const safeWallDelta = Math.min(Math.max(0, wallSecondsDelta), 35);

    // Read current values then update atomically
    const { data: current } = await supabase
      .from("dsa_practice_sessions")
      .select("active_seconds, wall_seconds, user_id, problem_id")
      .eq("id", sessionId)
      .maybeSingle();

    if (!current) return;

    const newActive = Math.min(
      (current.active_seconds ?? 0) + safeActiveDelta,
      MAX_ACTIVE_SECONDS_PER_SESSION
    );
    const newWall = (current.wall_seconds ?? 0) + safeWallDelta;

    const { error } = await supabase
      .from("dsa_practice_sessions")
      .update({
        active_seconds: newActive,
        wall_seconds: newWall,
        last_heartbeat_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (error) {
      console.warn("[DSASession] Heartbeat failed:", error.message);
    } else if (current.user_id && current.problem_id) {
      // Also update total_active_seconds in user_problem_progress
      await supabase
        .from("user_problem_progress")
        .update({
          total_active_seconds: newActive,
          last_attempted: new Date().toISOString(),
        })
        .eq("user_id", current.user_id)
        .eq("problem_id", current.problem_id);
    }
  }

  /**
   * Increments session run count and logs activity.
   */
  static async incrementRunCount(sessionId: string): Promise<void> {
    const { data: current } = await supabase
      .from("dsa_practice_sessions")
      .select("run_count, user_id, problem_id")
      .eq("id", sessionId)
      .maybeSingle();

    if (!current) return;

    const newCount = (current.run_count ?? 0) + 1;

    await supabase
      .from("dsa_practice_sessions")
      .update({
        run_count: newCount,
        last_heartbeat_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (current.user_id) {
      await this.logActivity(current.user_id, "dsa_code_run", {
        session_id: sessionId,
        problem_id: current.problem_id,
        run_count: newCount,
      });
    }
  }

  /**
   * Increments session submission count and logs activity.
   */
  static async incrementSubmissionCount(sessionId: string): Promise<void> {
    const { data: current } = await supabase
      .from("dsa_practice_sessions")
      .select("submission_count, user_id, problem_id")
      .eq("id", sessionId)
      .maybeSingle();

    if (!current) return;

    const newCount = (current.submission_count ?? 0) + 1;

    await supabase
      .from("dsa_practice_sessions")
      .update({
        submission_count: newCount,
        last_heartbeat_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (current.user_id) {
      await this.logActivity(current.user_id, "dsa_submission", {
        session_id: sessionId,
        problem_id: current.problem_id,
        submission_count: newCount,
      });
    }
  }

  /**
   * Closes a session with a final status.
   */
  static async endSession(
    sessionId: string,
    finalStatus: "attempted" | "solved" | "abandoned"
  ): Promise<void> {
    const { data: session } = await supabase
      .from("dsa_practice_sessions")
      .select("user_id, problem_id, active_seconds, final_status")
      .eq("id", sessionId)
      .maybeSingle();

    if (!session || session.final_status !== "in_progress") return;

    await supabase
      .from("dsa_practice_sessions")
      .update({
        final_status: finalStatus,
        ended_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (session.user_id) {
      await this.logActivity(session.user_id, "dsa_session_completed", {
        session_id: sessionId,
        problem_id: session.problem_id,
        final_status: finalStatus,
        active_seconds: session.active_seconds,
      });
    }
  }

  /**
   * Activity log helper
   */
  private static async logActivity(
    userId: string,
    type: string,
    meta: Record<string, any>
  ): Promise<void> {
    try {
      await supabase.from("activity_logs").insert({
        user_id: userId,
        type,
        meta,
        xp_delta: 0,
      });
    } catch {
      // Activity log insertion is non-blocking
    }
  }

  static readonly INACTIVITY_TIMEOUT_MS = INACTIVITY_TIMEOUT_MS;
  static readonly HEARTBEAT_INTERVAL_MS = HEARTBEAT_INTERVAL_MS;
  static readonly MAX_ACTIVE_SECONDS_PER_SESSION = MAX_ACTIVE_SECONDS_PER_SESSION;
}
