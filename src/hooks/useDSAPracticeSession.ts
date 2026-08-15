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
 * Active time = time during which the tab is visible and the user is actively interacting.
 * Wall time = total elapsed seconds since session start.
 *
 * Flushes incremental deltas to DB every 30 seconds via heartbeat.
 * Handles page refresh (restores existing active session) and tab close.
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

  const sessionIdRef = useRef<string | null>(null);
  const activeSecondsRef = useRef(0);
  const wallSecondsRef = useRef(0);
  
  // Track last flushed values to send exact incremental deltas in heartbeats
  const lastFlushedActiveRef = useRef(0);
  const lastFlushedWallRef = useRef(0);

  const isIdleRef = useRef(false);
  const lastActivityRef = useRef<number>(Date.now());
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runCountRef = useRef(0);
  const submissionCountRef = useRef(0);
  const heartbeatFlushCounterRef = useRef(0);

  // Activity detection
  const markActive = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (isIdleRef.current) {
      isIdleRef.current = false;
      setState((s) => ({ ...s, isIdle: false }));
    }
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      setState((s) => ({ ...s, isIdle: true }));
    }, DSASessionService.INACTIVITY_TIMEOUT_MS);
  }, []);

  // Tick function running every second
  const tick = useCallback(() => {
    wallSecondsRef.current += 1;

    const isVisible = typeof document !== "undefined"
      ? document.visibilityState === "visible"
      : true;

    if (isVisible && !isIdleRef.current) {
      activeSecondsRef.current += 1;
    }

    heartbeatFlushCounterRef.current += 1;

    // Update local UI state every second
    setState((s) => ({
      ...s,
      activeSeconds: activeSecondsRef.current,
      isIdle: isIdleRef.current,
    }));

    // Flush incremental deltas to DB every 30 seconds
    if (heartbeatFlushCounterRef.current >= 30 && sessionIdRef.current) {
      heartbeatFlushCounterRef.current = 0;

      const activeDelta = activeSecondsRef.current - lastFlushedActiveRef.current;
      const wallDelta = wallSecondsRef.current - lastFlushedWallRef.current;

      lastFlushedActiveRef.current = activeSecondsRef.current;
      lastFlushedWallRef.current = wallSecondsRef.current;

      if (activeDelta > 0 || wallDelta > 0) {
        DSASessionService.heartbeat(
          sessionIdRef.current,
          activeDelta,
          wallDelta
        ).catch(() => {});
      }
    }
  }, []);

  // Initialize session
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
        activeSecondsRef.current = session.active_seconds ?? 0;
        wallSecondsRef.current = session.wall_seconds ?? 0;
        lastFlushedActiveRef.current = session.active_seconds ?? 0;
        lastFlushedWallRef.current = session.wall_seconds ?? 0;
        runCountRef.current = session.run_count ?? 0;
        submissionCountRef.current = session.submission_count ?? 0;

        const isResumed = (session.active_seconds ?? 0) > 0;

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

  // Start tick interval once session is ready
  useEffect(() => {
    if (!state.sessionId) return;

    heartbeatIntervalRef.current = setInterval(tick, 1000);
    markActive();

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        markActive();
      }
    }

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

      // Flush final heartbeat on unmount
      if (sessionIdRef.current) {
        const activeDelta = activeSecondsRef.current - lastFlushedActiveRef.current;
        const wallDelta = wallSecondsRef.current - lastFlushedWallRef.current;
        if (activeDelta > 0 || wallDelta > 0) {
          DSASessionService.heartbeat(
            sessionIdRef.current,
            activeDelta,
            wallDelta
          ).catch(() => {});
        }
      }
    };
  }, [state.sessionId, tick, markActive]);

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

  const isFinalizedRef = useRef(false);

  const finalizeSession = useCallback((finalStatus: "solved" | "attempted" | "abandoned" = "solved") => {
    if (isFinalizedRef.current) return;
    isFinalizedRef.current = true;

    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    if (sessionIdRef.current) {
      const activeDelta = activeSecondsRef.current - lastFlushedActiveRef.current;
      const wallDelta = wallSecondsRef.current - lastFlushedWallRef.current;
      if (activeDelta > 0 || wallDelta > 0) {
        DSASessionService.heartbeat(sessionIdRef.current, activeDelta, wallDelta).catch(() => {});
      }
      DSASessionService.endSession(sessionIdRef.current, finalStatus).catch(() => {});
    }

    setState((s) => ({ ...s, isIdle: true }));
  }, []);

  return {
    ...state,
    sessionId: sessionIdRef.current,
    onRunCode,
    onSubmit,
    finalizeSession,
  };
}
