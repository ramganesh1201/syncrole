import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "@tanstack/react-router";
import {
  Clock,
  Play,
  Send,
  CheckCircle2,
  FlaskConical,
  Activity,
} from "lucide-react";

interface TodayStats {
  activePracticeSeconds: number;
  problemsAttempted: number;
  problemsSolved: number;
  runCount: number;
  submissionCount: number;
  recentSessions: Array<{
    id: string;
    problem_id: string;
    problem_title: string | null;
    active_seconds: number;
    final_status: string;
    created_at: string;
  }>;
}

interface Props {
  /** Optional extra notes and confidence the user can still enter manually */
  onNotesChange?: (notes: string, confidence: number) => void;
}

/**
 * TodayPracticePanel — replaces the manual "Log Practice Session" form.
 *
 * Shows auto-tracked stats from dsa_practice_sessions and dsa_submissions for today.
 * Users can still add optional subjective notes and confidence (not XP-bearing).
 */
export function TodayPracticePanel({ onNotesChange }: Props) {
  const [stats, setStats] = useState<TodayStats>({
    activePracticeSeconds: 0,
    problemsAttempted: 0,
    problemsSolved: 0,
    runCount: 0,
    submissionCount: 0,
    recentSessions: [],
  });
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");
  const [confidence, setConfidence] = useState(3);

  useEffect(() => {
    async function loadToday() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayStr = todayStart.toISOString();

      const [sessionsRes, submissionsRes, solvedRes] = await Promise.all([
        // Today's practice sessions
        supabase
          .from("dsa_practice_sessions")
          .select("id, problem_id, active_seconds, run_count, submission_count, final_status, created_at")
          .eq("user_id", user.id)
          .gte("created_at", todayStr)
          .order("created_at", { ascending: false })
          .limit(5),

        // Today's submissions (for run and submission counts)
        supabase
          .from("dsa_submissions")
          .select("id, status, is_run_only")
          .eq("user_id", user.id)
          .gte("created_at", todayStr),

        // Problems solved today
        supabase
          .from("user_problem_progress")
          .select("problem_id, first_solved_at")
          .eq("user_id", user.id)
          .eq("solved", true)
          .gte("first_solved_at", todayStr),
      ]);

      const sessions = sessionsRes.data ?? [];
      const submissions = submissionsRes.data ?? [];

      const totalActiveSeconds = sessions.reduce(
        (sum, s) => sum + (s.active_seconds ?? 0),
        0
      );
      const runCount = submissions.filter((s) => s.is_run_only).length;
      const submissionCount = submissions.filter((s) => !s.is_run_only).length;
      const problemsAttempted = new Set(
        sessions.map((s) => s.problem_id)
      ).size;
      const problemsSolved = (solvedRes.data ?? []).length;

      // Enrich sessions with problem titles (best effort)
      const problemIds = [...new Set(sessions.map((s) => s.problem_id))];
      let titleMap: Record<string, string> = {};
      if (problemIds.length > 0) {
        const { data: probs } = await supabase
          .from("dsa_problems")
          .select("id, title")
          .in("id", problemIds);
        (probs ?? []).forEach((p) => { titleMap[p.id] = p.title; });
      }

      setStats({
        activePracticeSeconds: totalActiveSeconds,
        problemsAttempted,
        problemsSolved,
        runCount,
        submissionCount,
        recentSessions: sessions.slice(0, 3).map((s) => ({
          ...s,
          problem_title: titleMap[s.problem_id] ?? null,
        })),
      });
      setLoading(false);
    }

    loadToday();
  }, []);

  // Bubble notes/confidence up for parent to save if desired
  useEffect(() => {
    onNotesChange?.(notes, confidence);
  }, [notes, confidence, onNotesChange]);

  function formatTime(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h}h ${m % 60}m`;
    return `${m}m`;
  }

  const statusColor: Record<string, string> = {
    solved: "text-neon",
    attempted: "text-yellow-400",
    in_progress: "text-aurora",
    abandoned: "text-muted-foreground",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
          <Activity className="h-3 w-3 text-accent" />
          <span className="uppercase tracking-widest">Today's Practice</span>
        </div>
        <Link
          to="/dsa-problems"
          className="text-[10px] text-aurora hover:underline"
        >
          Go Practice →
        </Link>
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-white/5 rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {/* KPI row */}
          <div className="grid grid-cols-3 gap-2">
            <MiniStat
              icon={Clock}
              label="Active Time"
              value={formatTime(stats.activePracticeSeconds)}
              color="text-aurora"
            />
            <MiniStat
              icon={CheckCircle2}
              label="Solved"
              value={String(stats.problemsSolved)}
              color="text-neon"
            />
            <MiniStat
              icon={FlaskConical}
              label="Runs"
              value={String(stats.runCount)}
              color="text-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <MiniStat
              icon={Send}
              label="Submissions"
              value={String(stats.submissionCount)}
              color="text-primary"
            />
            <MiniStat
              icon={Play}
              label="Problems"
              value={String(stats.problemsAttempted)}
              color="text-muted-foreground"
            />
          </div>

          {/* Recent practice history */}
          {stats.recentSessions.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                Recent Practice Activity
              </div>
              {stats.recentSessions.map((s) => (
                <Link
                  key={s.id}
                  to="/dsa-workspace/$problemId"
                  params={{ problemId: s.problem_id }}
                  className="flex items-center justify-between glass rounded-xl px-3 py-2 text-xs hover:bg-white/5 transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-foreground/90 group-hover:text-foreground font-medium transition-colors">
                      {s.problem_title ?? "DSA Problem"}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      {formatTime(s.active_seconds)} active
                    </div>
                  </div>
                  <span
                    className={`flex-none ml-3 text-[11px] ${
                      statusColor[s.final_status] ?? "text-muted-foreground"
                    } font-semibold capitalize bg-white/5 px-2 py-0.5 rounded border border-white/5`}
                  >
                    {s.final_status === "in_progress"
                      ? "In progress"
                      : s.final_status}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {stats.activePracticeSeconds === 0 && stats.problemsAttempted === 0 && (
            <div className="text-center py-4 text-sm text-muted-foreground glass rounded-xl border border-white/5">
              No practice recorded yet today.{" "}
              <Link to="/dsa-problems" className="text-aurora hover:underline">
                Start a problem →
              </Link>
            </div>
          )}

          {/* Optional subjective fields — no XP awarded */}
          <div className="pt-2 border-t border-white/5 space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Personal Journal (Optional)
            </div>
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground flex justify-between">
                <span>Confidence Today</span>
                <span>{confidence}/5</span>
              </span>
              <input
                type="range"
                min="1"
                max="5"
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                className="mt-2 w-full accent-aurora"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Notes
              </span>
              <textarea
                placeholder="What did you learn today?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 w-full glass rounded-xl px-3 py-2 text-sm resize-none h-16"
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

function MiniStat({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="glass rounded-xl px-3 py-2 text-center">
      <div className={`font-display text-xl font-bold ${color ?? ""}`}>{value}</div>
      <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
        <Icon className="h-2.5 w-2.5" />
        {label}
      </div>
    </div>
  );
}
