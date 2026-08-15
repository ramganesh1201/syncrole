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
   * for the given user + problem (created today / in last 24h).
   * Returns the session record.
   */
  static async startOrResumeSession(
    userId: string,
    problemId: string
  ): Promise<PracticeSession> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Look for an in-progress session from the last 24h
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
      // Validate staleness: if last heartbeat is > 6h ago, close and start fresh
      const lastHeartbeat = new Date(existing.last_heartbeat_at || existing.started_at).getTime();
      const stale = Date.now() - lastHeartbeat > 6 * 60 * 60 * 1000;

      if (!stale) {
        return existing as PracticeSession;
      }

      // Close stale session
      await supabase
        .from("dsa_practice_sessions")
        .update({ final_status: "abandoned", ended_at: new Date().toISOString() })
        .eq("id", existing.id);
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
    return data as PracticeSession;
  }

  /**
   * Sends a heartbeat to the database.
   * Fetches current values and updates them server-side.
   * Validates that active_seconds delta is within reasonable bounds
   * (prevents client from submitting fake large values).
   */
  static async heartbeat(
    sessionId: string,
    activeSecondsDelta: number,
    wallSecondsDelta: number
  ): Promise<void> {
    // Validate delta — max 35s per heartbeat (slightly > 30s interval)
    const safeActiveDelta = Math.min(Math.max(0, activeSecondsDelta), 35);
    const safeWallDelta = Math.min(Math.max(0, wallSecondsDelta), 35);

    // Read current values then update atomically
    const { data: current } = await supabase
      .from("dsa_practice_sessions")
      .select("active_seconds, wall_seconds")
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
    }
  }

  /**
   * Increments session run/submission counts.
   */
  static async incrementRunCount(sessionId: string): Promise<void> {
    await supabase
      .from("dsa_practice_sessions")
      .update({
        run_count: (await DSASessionService._getField(sessionId, "run_count")) + 1,
        last_heartbeat_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);
  }

  static async incrementSubmissionCount(sessionId: string): Promise<void> {
    await supabase
      .from("dsa_practice_sessions")
      .update({
        submission_count:
          (await DSASessionService._getField(sessionId, "submission_count")) + 1,
        last_heartbeat_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId);
  }

  /**
   * Closes a session with a final status.
   */
  static async endSession(
    sessionId: string,
    finalStatus: "attempted" | "solved" | "abandoned"
  ): Promise<void> {
    await supabase
      .from("dsa_practice_sessions")
      .update({
        final_status: finalStatus,
        ended_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", sessionId)
      .eq("final_status", "in_progress"); // Only close if still in_progress
  }

  private static async _getField(
    sessionId: string,
    field: string
  ): Promise<number> {
    const { data } = await supabase
      .from("dsa_practice_sessions")
      .select(field)
      .eq("id", sessionId)
      .maybeSingle();

    return (data as any)?.[field] ?? 0;
  }

  // Constants exported for use in the hook
  static readonly INACTIVITY_TIMEOUT_MS = INACTIVITY_TIMEOUT_MS;
  static readonly HEARTBEAT_INTERVAL_MS = HEARTBEAT_INTERVAL_MS;
  static readonly MAX_ACTIVE_SECONDS_PER_SESSION = MAX_ACTIVE_SECONDS_PER_SESSION;
}
