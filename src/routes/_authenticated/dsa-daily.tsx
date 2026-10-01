import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Zap,
  CheckCircle2,
  Clock,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Award,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dsa-daily")({
  component: DSADailyPage,
  head: () => ({ meta: [{ title: "Daily Challenges — SyncRole" }] }),
});

type DailyProblem = {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard" | string;
  topic_id: string;
  topic_name: string;
  leetcode_url: string | null;
  companies: string[] | null;
  xp_reward: number;
};

type DailyChallenge = {
  id: string;
  challenge_date: string;
  problem_id: string;
  xp_reward: number;
  problem: DailyProblem | null;
};

type DailyProgressStatus = "not_started" | "in_progress" | "completed" | "claimed";

type UserDailyProgress = {
  id: string;
  user_id: string;
  challenge_id: string;
  completed: boolean;
  xp_earned: number;
  completed_at: string | null;
  created_at: string;
  claimed: boolean;
  claimed_at: string | null;
  started_at?: string | null;
  status?: DailyProgressStatus;
};

const SELECT_USER_PROGRESS = "id, user_id, challenge_id, completed, completed_at, claimed, claimed_at, xp_earned, created_at";

type PastDayHistory = {
  dateStr: string;
  formattedDate: string;
  challenge: DailyChallenge | null;
  status: "completed" | "in_progress" | "missed" | "not_started";
  isToday: boolean;
};

// Canonical date string helper (YYYY-MM-DD)
function getTodayChallengeDate(offsetDays: number = 0): string {
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Deterministic string hash for date-to-problem rotation
function hashDateStr(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Deterministically resolve or persist daily challenge for any date YYYY-MM-DD
async function resolveDailyChallengeForDate(dateStr: string): Promise<DailyChallenge | null> {
  try {
    // 1. Check existing persisted daily challenge record for dateStr
    const challengeRes = await supabase
      .from("dsa_daily_challenges")
      .select("id, challenge_date, problem_id, xp_reward")
      .eq("challenge_date", dateStr)
      .maybeSingle();

    if (!challengeRes.error && challengeRes.data) {
      const ch = challengeRes.data;
      const probRes = await supabase
        .from("dsa_problems")
        .select("id, title, difficulty, topic_id, leetcode_url, companies, xp_reward")
        .eq("id", ch.problem_id)
        .maybeSingle();

      if (probRes.data) {
        const topicRes = await supabase
          .from("dsa_topics")
          .select("name")
          .eq("id", probRes.data.topic_id)
          .maybeSingle();

        const problem: DailyProblem = {
          ...probRes.data,
          topic_name: topicRes.data?.name ?? "Algorithm",
          xp_reward: probRes.data.xp_reward ?? ch.xp_reward ?? 50,
        };

        return { ...ch, problem };
      }
    }

    // 2. If no persisted record exists, deterministically select problem from eligible dsa_problems
    const problemsRes = await supabase
      .from("dsa_problems")
      .select("id, title, difficulty, topic_id, leetcode_url, companies, xp_reward")
      .order("id", { ascending: true });

    if (problemsRes.error || !problemsRes.data || problemsRes.data.length === 0) {
      return null;
    }

    const eligible = problemsRes.data;
    const index = hashDateStr(dateStr) % eligible.length;
    const selectedProblem = eligible[index];

    // Fetch topic name
    const topicRes = await supabase
      .from("dsa_topics")
      .select("name")
      .eq("id", selectedProblem.topic_id)
      .maybeSingle();

    const problem: DailyProblem = {
      ...selectedProblem,
      topic_name: topicRes.data?.name ?? "Algorithm",
      xp_reward: selectedProblem.xp_reward ?? 50,
    };

    // 3. Persist new daily challenge record
    const insertRes = await supabase
      .from("dsa_daily_challenges")
      .insert({
        challenge_date: dateStr,
        problem_id: selectedProblem.id,
        xp_reward: problem.xp_reward,
      })
      .select("id, challenge_date, problem_id, xp_reward")
      .maybeSingle();

    if (insertRes.data) {
      return { ...insertRes.data, problem };
    }

    // In case insert failed due to concurrent creation, re-fetch
    const reFetch = await supabase
      .from("dsa_daily_challenges")
      .select("id, challenge_date, problem_id, xp_reward")
      .eq("challenge_date", dateStr)
      .maybeSingle();

    if (reFetch.data) {
      return { ...reFetch.data, problem };
    }

    // Fallback: construct valid in-memory challenge object
    return {
      id: selectedProblem.id,
      challenge_date: dateStr,
      problem_id: selectedProblem.id,
      xp_reward: problem.xp_reward,
      problem,
    };
  } catch (err) {
    console.error("resolveDailyChallengeForDate error:", err);
    return null;
  }
}

function estimateTime(difficulty: DailyProblem["difficulty"]) {
  const d = difficulty?.toLowerCase();
  if (d === "easy") return "~15 min";
  if (d === "medium") return "~25 min";
  if (d === "hard") return "~45 min";
  return "~20 min";
}

function formatHistoryDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", weekday: "short" });
}

function DSADailyPage() {
  const navigate = useNavigate();
  const [today, setToday] = useState<DailyChallenge | null>(null);
  const [progress, setProgress] = useState<UserDailyProgress | null>(null);
  const [canonicalSolved, setCanonicalSolved] = useState<boolean>(false);
  const [history, setHistory] = useState<PastDayHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<boolean>(false);

  const todayStr = useMemo(() => getTodayChallengeDate(), []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        setError("User authentication required.");
        setLoading(false);
        return;
      }
      const uid = auth.user.id;

      // 1. Resolve today's challenge
      const challenge = await resolveDailyChallengeForDate(todayStr);
      if (!challenge || !challenge.problem) {
        setError("No eligible DSA problems are currently available.");
        setLoading(false);
        return;
      }

      setToday(challenge);

      // 2. Check canonical user_problem_progress for solved status
      const canonRes = await supabase
        .from("user_problem_progress")
        .select("solved, status")
        .eq("user_id", uid)
        .eq("problem_id", challenge.problem.id)
        .maybeSingle();

      const isSolvedCanonically = Boolean(
        canonRes.data?.solved === true || canonRes.data?.status === "solved"
      );
      setCanonicalSolved(isSolvedCanonically);

      // 3. Query user_daily_challenge_progress
      let userProgRow: UserDailyProgress | null = null;
      if (challenge.id) {
        const progRes = await supabase
          .from("user_daily_challenge_progress")
          .select(SELECT_USER_PROGRESS)
          .eq("user_id", uid)
          .eq("challenge_id", challenge.id)
          .maybeSingle();

        userProgRow = progRes.data as UserDailyProgress | null;
      }

      // 4. Synchronize canonical solve to user_daily_challenge_progress
      if (isSolvedCanonically && challenge.id) {
        if (!userProgRow?.completed) {
          const nowIso = new Date().toISOString();
          const syncRes = await supabase
            .from("user_daily_challenge_progress")
            .upsert(
              {
                user_id: uid,
                challenge_id: challenge.id,
                completed: true,
                completed_at: userProgRow?.completed_at ?? nowIso,
              },
              { onConflict: "user_id,challenge_id" }
            )
            .select(SELECT_USER_PROGRESS)
            .maybeSingle();

          if (syncRes.data) {
            userProgRow = syncRes.data as UserDailyProgress;
          }
        }
      }

      setProgress(userProgRow);

      // 5. Load Past 7 Days History (Optimized Batch Fetching)
      const historyDates = Array.from({ length: 7 }, (_, i) => getTodayChallengeDate(-i));
      const pastChallenges = await Promise.all(
        historyDates.map((dStr, idx) => (idx === 0 ? Promise.resolve(challenge) : resolveDailyChallengeForDate(dStr)))
      );

      const challengeIds = pastChallenges.map((c) => c?.id).filter((id): id is string => Boolean(id));
      const problemIds = pastChallenges.map((c) => c?.problem?.id).filter((id): id is string => Boolean(id));

      const [allProblemProgRes, allChallengeProgRes] = await Promise.all([
        problemIds.length > 0
          ? supabase.from("user_problem_progress").select("problem_id, solved, status").eq("user_id", uid).in("problem_id", problemIds)
          : Promise.resolve({ data: [] }),
        challengeIds.length > 0
          ? supabase.from("user_daily_challenge_progress").select(SELECT_USER_PROGRESS).eq("user_id", uid).in("challenge_id", challengeIds)
          : Promise.resolve({ data: [] }),
      ]);

      const problemProgMap = new Map((allProblemProgRes.data || []).map((p: any) => [p.problem_id, p]));
      const challengeProgMap = new Map((allChallengeProgRes.data || []).map((c: any) => [c.challenge_id, c]));

      const historyList: PastDayHistory[] = pastChallenges.map((pastCh, offset) => {
        const dStr = historyDates[offset];
        let pStatus: "completed" | "in_progress" | "missed" | "not_started" = "not_started";

        if (pastCh?.problem) {
          const pastCanon = problemProgMap.get(pastCh.problem.id);
          const isPastSol = Boolean(pastCanon?.solved === true || pastCanon?.status === "solved");

          if (isPastSol) {
            pStatus = "completed";
          } else if (pastCh.id) {
            const pastProg = challengeProgMap.get(pastCh.id);
            if (pastProg?.completed || pastProg?.claimed) {
              pStatus = "completed";
            } else if (pastProg) {
              pStatus = "in_progress";
            } else if (offset > 0) {
              pStatus = "missed";
            }
          } else if (offset > 0) {
            pStatus = "missed";
          }
        }

        return {
          dateStr: dStr,
          formattedDate: formatHistoryDate(dStr),
          challenge: pastCh,
          status: pStatus,
          isToday: offset === 0,
        };
      });

      setHistory(historyList);
    } catch (err: any) {
      console.error("DSADailyPage load error:", err);
      setError("Unable to load today's challenge.");
      toast.error("Failed to load daily challenge.");
    } finally {
      setLoading(false);
    }
  }, [todayStr]);

  useEffect(() => {
    void load();
  }, [load]);

  // Combined status evaluation
  const status: DailyProgressStatus = useMemo(() => {
    if (progress?.claimed || progress?.status === "claimed") return "claimed";
    if (canonicalSolved || progress?.completed || progress?.status === "completed") return "completed";
    if (progress?.status === "in_progress" || progress) return "in_progress";
    return "not_started";
  }, [progress, canonicalSolved]);

  async function openDailyWorkspace() {
    if (!today?.problem?.id) {
      toast.error("Daily challenge problem is unavailable.");
      return;
    }

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    if (!progress && today.id) {
      setBusy(true);
      try {
        const insertRes = await supabase
          .from("user_daily_challenge_progress")
          .upsert(
            {
              user_id: auth.user.id,
              challenge_id: today.id,
              completed: false,
              xp_earned: 0,
              claimed: false,
            },
            { onConflict: "user_id,challenge_id" }
          )
          .select(SELECT_USER_PROGRESS)
          .maybeSingle();

        if (insertRes.data) {
          setProgress(insertRes.data as UserDailyProgress);
        }
      } catch (e) {
        console.error("openDailyWorkspace error:", e);
      } finally {
        setBusy(false);
      }
    }

    navigate({
      to: "/dsa-workspace/$problemId",
      params: { problemId: today.problem.id },
    });
  }

  async function claimBonusXP() {
    if (!today?.id || !today.problem) return;
    if (status === "not_started" || status === "in_progress") {
      toast.error("Complete the challenge problem first.");
      return;
    }

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    if (progress?.claimed) {
      toast.info("Bonus XP already claimed.");
      return;
    }

    setBusy(true);
    try {
      const nowIso = new Date().toISOString();
      const xpAmount = today.xp_reward ?? 50;

      const upsertRes = await supabase
        .from("user_daily_challenge_progress")
        .upsert(
          {
            user_id: auth.user.id,
            challenge_id: today.id,
            claimed: true,
            claimed_at: nowIso,
            completed: true,
            completed_at: progress?.completed_at ?? nowIso,
            xp_earned: xpAmount,
          },
          { onConflict: "user_id,challenge_id" }
        )
        .select(SELECT_USER_PROGRESS)
        .maybeSingle();

      if (upsertRes.data) {
        setProgress(upsertRes.data as UserDailyProgress);
      }

      if (upsertRes.data) {
        setProgress(upsertRes.data as UserDailyProgress);
      }

      // Award XP idempotently
      await supabase.rpc("award_xp", {
        _user: auth.user.id,
        _type: "daily_challenge",
        _xp: xpAmount,
        _meta: { challenge_id: today.id },
      });

      await supabase.from("notifications").insert({
        user_id: auth.user.id,
        title: "Daily Challenge Bonus XP 🏆",
        body: `+${xpAmount} XP for completing ${today.problem.title}`,
        type: "achievement",
      });

      toast.success(`+${xpAmount} Bonus XP Claimed!`);
      await load();
    } catch (e: any) {
      console.error("claimBonusXP error:", e);
      toast.error("Failed to claim bonus XP.");
    } finally {
      setBusy(false);
    }
  }

  // Render Skeleton Loading
  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-6">
        <div className="h-5 w-40 glass rounded animate-pulse" />
        <div className="h-10 w-64 glass rounded animate-pulse" />
        <div className="h-72 glass-strong rounded-3xl animate-pulse" />
        <div className="h-44 glass-strong rounded-3xl animate-pulse" />
      </main>
    );
  }

  // Render Error State with Retry
  if (error || !today?.problem) {
    return (
      <main className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-6">
        <Link
          to="/dashboard/dsa"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to DSA Command Center
        </Link>
        <div className="glass-strong rounded-3xl p-8 text-center space-y-4 border border-white/10 max-w-xl mx-auto my-12">
          <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto" />
          <div className="space-y-1">
            <h2 className="font-display font-bold text-xl text-white">
              Unable to load today's challenge
            </h2>
            <p className="text-xs text-muted-foreground">
              {error ?? "Check your network connection and try again."}
            </p>
          </div>
          <button
            onClick={() => void load()}
            className="glass rounded-full px-6 py-2.5 text-xs font-semibold text-aurora hover:bg-white/10 transition-colors border border-aurora/30 inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retry Loading</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 py-8 space-y-8 bg-[#F8FAFC]">
      {/* Back Link */}
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to DSA Command Center
      </Link>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-xs">
            <Calendar className="w-3 h-3 text-purple-600" /> DAILY CHALLENGE
          </span>
          <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full font-semibold shadow-xs">
            {todayStr}
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
          Today's Challenge
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Solve today's featured problem to maintain your streak and earn bonus XP.
        </p>
      </div>

      {/* Main Today Challenge Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-3xl p-6 md:p-8 border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded font-mono font-bold ${
                    today.problem.difficulty?.toLowerCase() === "easy"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : today.problem.difficulty?.toLowerCase() === "medium"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {today.problem.difficulty}
                </span>
                <span className="text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded font-semibold">
                  {today.problem.topic_name}
                </span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                {today.problem.title}
              </h2>
            </div>

            <div className="bg-purple-50/80 rounded-2xl p-3 border border-purple-200 text-center shrink-0 min-w-28 shadow-xs">
              <div className="font-display text-2xl font-bold text-purple-700">
                +{today.xp_reward}
              </div>
              <div className="text-[10px] text-slate-500 font-mono font-semibold">
                XP Bonus
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/80 space-y-0.5">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-semibold">
                Estimated Time
              </div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>{estimateTime(today.problem.difficulty)}</span>
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/80 space-y-0.5">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-semibold">
                Topic Area
              </div>
              <div className="text-xs font-bold text-slate-900 truncate">
                {today.problem.topic_name}
              </div>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200/80 space-y-0.5 col-span-2 md:col-span-1">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono font-semibold">
                Challenge Status
              </div>
              <div className="text-xs font-bold">
                {status === "claimed" ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bonus Claimed
                  </span>
                ) : status === "completed" ? (
                  <span className="text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Solved & Verified
                  </span>
                ) : status === "in_progress" ? (
                  <span className="text-purple-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-purple-600" /> In Progress
                  </span>
                ) : (
                  <span className="text-slate-500 font-normal">
                    Not Started
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              {status === "claimed"
                ? "You have completed today's challenge and claimed your XP!"
                : status === "completed"
                ? "You solved today's problem! Claim your bonus XP below."
                : status === "in_progress"
                ? "Challenge is active. Submit an accepted solution in the workspace to complete."
                : "Solve today's featured problem to mark this challenge complete."}
            </div>

            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              {status === "completed" && !progress?.claimed && (
                <button
                  onClick={() => void claimBonusXP()}
                  disabled={busy}
                  className="w-full sm:w-auto bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 rounded-xl px-5 py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>{busy ? "Claiming..." : "Claim +50 Bonus XP"}</span>
                </button>
              )}

              <button
                onClick={() => void openDailyWorkspace()}
                disabled={busy}
                className="w-full sm:w-auto bg-purple-600 text-white hover:bg-purple-700 rounded-xl px-6 py-2.5 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>{status === "not_started" ? "Start Challenge →" : "Open Workspace →"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Past 7 Days History Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">Past 7 Days History</h3>
            <p className="text-xs text-slate-500 font-medium">
              Your recent daily challenge activity and completion record.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            7 Days Record
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {history.map((item) => (
            <div
              key={item.dateStr}
              className={`rounded-2xl p-3 border text-left space-y-2 transition-all ${
                item.isToday
                  ? "border-purple-300 bg-purple-50/40 shadow-xs"
                  : "bg-slate-50/60 border-slate-200/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 font-semibold">
                  {item.formattedDate}
                </span>
                {item.isToday && (
                  <span className="text-[9px] font-mono bg-purple-100 text-purple-700 border border-purple-200 px-1.5 py-0.2 rounded font-bold">
                    Today
                  </span>
                )}
              </div>

              <div className="font-display font-bold text-xs text-slate-900 truncate">
                {item.challenge?.problem?.title ?? "Daily Challenge"}
              </div>

              <div className="flex items-center justify-between pt-1">
                {item.status === "completed" ? (
                  <span className="text-[10px] text-emerald-700 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Solved
                  </span>
                ) : item.status === "in_progress" ? (
                  <span className="text-[10px] text-purple-700 font-mono font-bold">
                    Active
                  </span>
                ) : item.isToday ? (
                  <span className="text-[10px] text-slate-500 font-mono">
                    Pending
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono">
                    Missed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
