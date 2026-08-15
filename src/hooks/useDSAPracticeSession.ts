import { useCallback, useEffect, useRef, useState } from "react";
import { DSASessionService } from "@/lib/services/dsa-session.service";

interface UsePracticeSessionOptions {
  userId: string | null;
  problemId: string;
}

interface SessionState {
  sessionId: string | null;
  activeSeconds: number;
  isIdle: boolean;
  runCount: number;
  submissionCount: number;
  isResumed: boolean;
  error: string | null;
}

/**
 * Manages an automatic DSA practice session with active-time tracking.
 *
 * Active time = time during which the user is actually interacting with the page.
 * Wall time = total elapsed time since session start.
 *
 * Uses visibilitychange + focus/blur to detect idle state.
 * Writes to DB every 30 seconds via a debounced heartbeat.
 * Active time is capped server-side at 35s per heartbeat to prevent abuse.
 *
 * IMPORTANT: Active time is NOT a perfect measure of thinking time.
 * It measures: time the tab was visible and the user had recently interacted.
 */
export function useDSAPracticeSession({
  userId,
  problemId,
}: UsePracticeSessionOptions): SessionState & {
  onRunCode: () => void;
  onSubmit: () => void;
} {
  const [state, setState] = useState<SessionState>({
    sessionId: null,
    activeSeconds: 0,
    isIdle: false,
    runCount: 0,
    submissionCount: 0,
    isResumed: false,
    error: null,
  });

  // Track time in refs so intervals always have fresh values without re-renders
  const sessionIdRef = useRef<string | null>(null);
  const activeSecondsRef = useRef(0);
  const wallSecondsRef = useRef(0);
  const isIdleRef = useRef(false);
  const lastActivityRef = useRef<number>(Date.now());
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runCountRef = useRef(0);
  const submissionCountRef = useRef(0);

  // --- Activity detection ---
  const markActive = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (isIdleRef.current) {
      isIdleRef.current = false;
      setState((s) => ({ ...s, isIdle: false }));
    }
    // Reset inactivity timer
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      setState((s) => ({ ...s, isIdle: true }));
    }, DSASessionService.INACTIVITY_TIMEOUT_MS);
  }, []);

  // --- Heartbeat: ticks every second for local counter, flushes to DB every 30s ---
  const heartbeatFlushRef = useRef(0);

  const tick = useCallback(() => {
    wallSecondsRef.current += 1;

    const isVisible = typeof document !== "undefined"
      ? document.visibilityState === "visible"
      : true;

    if (isVisible && !isIdleRef.current) {
      activeSecondsRef.current += 1;
    }

    heartbeatFlushRef.current += 1;

    // Update UI every second
    setState((s) => ({
      ...s,
      activeSeconds: activeSecondsRef.current,
      isIdle: isIdleRef.current,
    }));

    // Flush to DB every 30 seconds
    if (
      heartbeatFlushRef.current >= 30 &&
      sessionIdRef.current
    ) {
      heartbeatFlushRef.current = 0;
      DSASessionService.heartbeat(
        sessionIdRef.current,
        Math.min(activeSecondsRef.current, DSASessionService.MAX_ACTIVE_SECONDS_PER_SESSION),
        wallSecondsRef.current
      ).catch(() => {
        // non-fatal
      });
    }
  }, []);

  // --- Initialize session ---
  useEffect(() => {
    if (!userId || !problemId) return;

    let cancelled = false;

    async function initSession() {
      try {
        const session = await DSASessionService.startOrResumeSession(
          userId!,
          problemId
        );

        if (cancelled) return;

        sessionIdRef.current = session.id;
        // Restore from existing session values
        activeSecondsRef.current = session.active_seconds ?? 0;
        wallSecondsRef.current = session.wall_seconds ?? 0;
        runCountRef.current = session.run_count ?? 0;
        submissionCountRef.current = session.submission_count ?? 0;

        const isResumed = session.active_seconds > 0;

        setState((s) => ({
          ...s,
          sessionId: session.id,
          activeSeconds: session.active_seconds ?? 0,
          runCount: session.run_count ?? 0,
          submissionCount: session.submission_count ?? 0,
          isResumed,
          error: null,
        }));
      } catch (err: any) {
        if (!cancelled) {
          setState((s) => ({ ...s, error: err.message ?? "Session init failed" }));
        }
      }
    }

    initSession();
    return () => { cancelled = true; };
  }, [userId, problemId]);

  // --- Start tick interval once session is initialized ---
  useEffect(() => {
    if (!state.sessionId) return;

    // Start ticking every second
    heartbeatIntervalRef.current = setInterval(tick, 1000);

    // Start initial inactivity timer
    markActive();

    // Visibility change handler
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        markActive();
      }
    }

    // Activity event handlers
    function handleActivity() { markActive(); }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleActivity, { passive: true });
    document.addEventListener("click", handleActivity, { passive: true });
    document.addEventListener("mousemove", handleActivity, { passive: true });

    return () => {
      if (heartbeatIntervalRef.current) clearInterval(heartbeatIntervalRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleActivity);
      document.removeEventListener("click", handleActivity);
      document.removeEventListener("mousemove", handleActivity);

      // Final heartbeat flush on unmount
      if (sessionIdRef.current) {
        DSASessionService.heartbeat(
          sessionIdRef.current,
          activeSecondsRef.current,
          wallSecondsRef.current
        ).catch(() => {});
      }
    };
  }, [state.sessionId, tick, markActive]);

  // --- Expose action callbacks ---
  const onRunCode = useCallback(() => {
    runCountRef.current += 1;
    setState((s) => ({ ...s, runCount: runCountRef.current }));
    markActive();

    if (sessionIdRef.current) {
      DSASessionService.incrementRunCount(sessionIdRef.current).catch(() => {});
    }
  }, [markActive]);

  const onSubmit = useCallback(() => {
    submissionCountRef.current += 1;
    setState((s) => ({ ...s, submissionCount: submissionCountRef.current }));
    markActive();

    if (sessionIdRef.current) {
      DSASessionService.incrementSubmissionCount(sessionIdRef.current).catch(() => {});
    }
  }, [markActive]);

  return {
    ...state,
    sessionId: sessionIdRef.current,
    onRunCode,
    onSubmit,
  };
}
