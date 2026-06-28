import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Zap, CheckCircle2, Clock, ArrowLeft, ExternalLink } from "lucide-react";
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
  started_at: string | null;
  status: DailyProgressStatus;
};

async function getOrCreateTodayChallenge(params: {
  todayStr: string;
}): Promise<DailyChallenge | null> {
  const { todayStr } = params;

  const challengeRes = await supabase
    .from("dsa_daily_challenges")
    .select("id, challenge_date, problem_id, xp_reward")
    .eq("challenge_date", todayStr)
    .maybeSingle();

  if (!challengeRes.error && challengeRes.data) {
    const challenge = challengeRes.data;

    const problemRes = await supabase
      .from("dsa_problems")
      .select("id, title, difficulty, topic_id, leetcode_url, companies, xp_reward")
      .eq("id", challenge.problem_id)
      .single();

    if (problemRes.error || !problemRes.data) return null;

    const topicRes = await supabase
      .from("dsa_topics")
      .select("name")
      .eq("id", problemRes.data.topic_id)
      .single();

    const problem: DailyProblem = {
      ...problemRes.data,
      topic_name: topicRes.data?.name ?? "Unknown",
    };

    return { ...challenge, problem };
  }

  // Create missing daily challenge (real UUID)
  const topicRes = await supabase.from("dsa_topics").select("id, name").limit(1).single();
  if (topicRes.error || !topicRes.data) return null;

  const problemRes = await supabase
    .from("dsa_problems")
    .select("id, title, difficulty, topic_id, leetcode_url, companies, xp_reward")
    .eq("topic_id", topicRes.data.id)
    .limit(1)
    .single();

  if (problemRes.error || !problemRes.data) return null;

  const problem: DailyProblem = {
    ...problemRes.data,
    topic_name: topicRes.data.name ?? "Unknown",
  };

  const insertRes = await supabase
    .from("dsa_daily_challenges")
    .insert({
      challenge_date: todayStr,
      problem_id: problem.id,
      xp_reward: problem.xp_reward ?? 50,
    })
    .select("id, challenge_date, problem_id, xp_reward")
    .single();

  if (insertRes.error || !insertRes.data) return null;

  return { ...insertRes.data, problem };
}

function getStatusFromRow(p: Partial<UserDailyProgress> | null | undefined): DailyProgressStatus {
  if (!p) return "not_started";
  if (p.status) return p.status as DailyProgressStatus;
  if (p.claimed) return "claimed";
  if (p.completed) return "completed";
  if (p.started_at) return "in_progress";
  return "not_started";
}

function isUuid(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

function estimateTime(difficulty: DailyProblem["difficulty"]) {
  if (difficulty === "easy") return "15 min";
  if (difficulty === "medium") return "25 min";
  if (difficulty === "hard") return "45 min";
  return "30 min";
}

function recruiterSignalForDifficulty(difficulty: DailyProblem["difficulty"]) {
  if (difficulty === "easy") return 1;
  if (difficulty === "medium") return 2;
  if (difficulty === "hard") return 3;
  return 1;
}

function recruiterConsistencyCopy(status: DailyProgressStatus) {
  if (status === "claimed") return { consistency: 84, growth: "Trending Up" };
  if (status === "completed") return { consistency: 78, growth: "Improving" };
  if (status === "in_progress") return { consistency: 62, growth: "Warming Up" };
  return { consistency: 0, growth: "Start to unlock signals" };
}

function DSADailyPage() {
  const [today, setToday] = useState<DailyChallenge | null>(null);
  const [progress, setProgress] = useState<UserDailyProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function load() {
    setLoading(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) {
        setToday(null);
        setProgress(null);
        return;
      }

      const challenge = await getOrCreateTodayChallenge({ todayStr });
      if (!challenge?.id || !challenge.problem) {
        setToday(null);
        setProgress(null);
        return;
      }

      if (!isUuid(challenge.id)) {
        // safety: only accept DB-backed UUIDs
        setToday(null);
        setProgress(null);
        return;
      }

      const progressRes = await supabase
        .from("user_daily_challenge_progress")
        .select(
          "id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status",
        )
        .eq("user_id", auth.user.id)
        .eq("challenge_id", challenge.id)
        .maybeSingle();

      const row = progressRes.data as unknown as UserDailyProgress | null;

      console.log("challenge", challenge);
      console.log("problem", challenge.problem);
      console.log("progress", row);

      setToday(challenge);
      setProgress(row);
    } catch (err) {
      console.error("DSADailyPage.load error", err);
      toast.error("Failed to load today challenge.");
      setToday(null);
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayStr]);

  const status = getStatusFromRow(progress);

  async function openLeetCode() {
    if (!today?.problem?.leetcode_url) {
      toast.error("No external link available for this challenge.");
      return;
    }

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    // If NOT_STARTED, create progress row as IN_PROGRESS.
    if (!progress) {
      setBusy(true);
      try {
        const nowIso = new Date().toISOString();
        const insertRes = await supabase
          .from("user_daily_challenge_progress")
          .upsert(
            {
              user_id: auth.user.id,
              challenge_id: today.id,
              status: "in_progress",
              started_at: nowIso,
              completed: false,
              xp_earned: 0,
              claimed: false,
              claimed_at: null,
              completed_at: null,
            },
            { onConflict: "user_id,challenge_id" },
          )
          .select(
            "id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status",
          )
          .single();

        if (insertRes.error) throw insertRes.error;
        setProgress(insertRes.data as unknown as UserDailyProgress);
        window.open(today.problem.leetcode_url, "_blank", "noopener,noreferrer");
      } catch (e) {
        console.error(e);
        toast.error("Failed to start daily challenge.");
      } finally {
        setBusy(false);
      }

      return;
    }

    // Already started/completed/claimed: just open link.
    window.open(today.problem.leetcode_url, "_blank", "noopener,noreferrer");
  }

  async function markCompleted() {
    if (!today?.id) return;
    if (status === "claimed") return;

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    setBusy(true);
    try {
      const nowIso = new Date().toISOString();
      const upsertRes = await supabase
        .from("user_daily_challenge_progress")
        .upsert(
          {
            user_id: auth.user.id,
            challenge_id: today.id,
            status: "completed",
            completed: true,
            completed_at: nowIso,
            claimed: false,
            claimed_at: null,
            started_at: progress?.started_at ?? nowIso,
          },
          { onConflict: "user_id,challenge_id" },
        )
        .select(
          "id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status",
        )
        .single();

      if (upsertRes.error) throw upsertRes.error;
      setProgress(upsertRes.data as unknown as UserDailyProgress);
      toast.success("Marked as solved. Claim reward when ready.");
    } catch (e) {
      console.error(e);
      toast.error("Failed to mark completion.");
    } finally {
      setBusy(false);
    }
  }

  async function claimReward() {
    if (!today?.id || !today.problem) return;
    if (status !== "completed") return;

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    setBusy(true);
    try {
      const existing = await supabase
        .from("user_daily_challenge_progress")
        .select("id,claimed")
        .eq("user_id", auth.user.id)
        .eq("challenge_id", today.id)
        .maybeSingle();

      if (existing.data?.claimed) {
        toast.success("Reward already claimed.");
        await load();
        return;
      }

      const nowIso = new Date().toISOString();

      const upsertRes = await supabase
        .from("user_daily_challenge_progress")
        .upsert(
          {
            user_id: auth.user.id,
            challenge_id: today.id,
            status: "claimed",
            claimed: true,
            claimed_at: nowIso,
            completed: true,
            completed_at: progress?.completed_at ?? nowIso,
            xp_earned: today.xp_reward,
          },
          { onConflict: "user_id,challenge_id" },
        )
        .select(
          "id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status",
        )
        .single();

      if (upsertRes.error) throw upsertRes.error;

      // Now award XP + recompute placement + notification
      const awardRes = await supabase.rpc("award_xp", {
        _user: auth.user.id,
        _type: "daily_challenge",
        _xp: today.xp_reward,
        _meta: { challenge_id: today.id },
      });
      if (awardRes.error) throw awardRes.error;

      const recomputeRes = await supabase.rpc("recompute_placement", {
        _user: auth.user.id,
      });
      if (recomputeRes.error) throw recomputeRes.error;

      const notifRes = await supabase.from("notifications").insert({
        user_id: auth.user.id,
        title: "Daily Challenge Claimed 🏆",
        body: `+${today.xp_reward} XP for ${today.problem.difficulty} ${today.problem.topic_name} challenge`,
        type: "achievement",
      });
      if (notifRes.error) throw notifRes.error;

      toast.success("Reward claimed! Great work.");
      await load();
    } catch (e) {
      console.error(e);
      toast.error("Failed to claim reward.");
    } finally {
      setBusy(false);
    }
  }

  const recruiterImpact = recruiterConsistencyCopy(status);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8">
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back to DSA Command Center
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Today's Challenge</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Complete the daily challenge to earn bonus XP and maintain your streak.
        </p>
      </div>

      {today?.problem ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative glass-strong rounded-3xl p-8 border border-aurora/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-aurora/5 to-transparent" />
          <div className="relative z-10 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-5 w-5 text-aurora" />
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Today's Challenge
                  </span>
                </div>
                <h2 className="font-display text-3xl font-bold">{today.problem.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Topic: {today.problem.topic_name} · Difficulty: {today.problem.difficulty}
                </p>
              </div>
              <div className="text-right">
                <div className="font-display text-4xl font-bold text-aurora">+{today.xp_reward}</div>
                <div className="text-xs text-muted-foreground">XP Reward</div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Difficulty</div>
                <div
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{
                    background:
                      today.problem.difficulty === "easy"
                        ? "oklch(0.88 0.18 145 / 0.2)"
                        : today.problem.difficulty === "medium"
                          ? "oklch(0.85 0.18 70 / 0.2)"
                          : "oklch(0.72 0.22 330 / 0.2)",
                  }}
                >
                  {today.problem.difficulty === "easy"
                    ? "🟢"
                    : today.problem.difficulty === "medium"
                      ? "🟡"
                      : "🔴"}{" "}
                  {today.problem.difficulty}
                </div>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Estimated Time</div>
                <div className="mt-2 font-medium">{estimateTime(today.problem.difficulty)}</div>
              </div>

              <div className="glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Recruiter Value</div>
                <div className="mt-2 font-medium">
                  Recruiter Signal +{recruiterSignalForDifficulty(today.problem.difficulty)}
                </div>
              </div>
            </div>

            {/* Recruiter Impact */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Recruiter Signal Score</div>
                <div className="mt-2 font-medium">
                  +{recruiterSignalForDifficulty(today.problem.difficulty)}
                </div>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Consistency Score</div>
                <div className="mt-2 font-medium">{recruiterImpact.consistency ? `${recruiterImpact.consistency}%` : "—"}</div>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Technical Growth</div>
                <div className="mt-2 font-medium">{recruiterImpact.growth}</div>
              </div>
            </div>

            {status === "not_started" && (
              <button
                onClick={() => void openLeetCode()}
                disabled={busy}
                className="relative w-full rounded-2xl py-4 text-base font-semibold text-primary-foreground overflow-hidden transition disabled:opacity-50"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-aurora to-aurora/80" />
                <span className="relative inline-flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5" /> {busy ? "Starting..." : "Solve Challenge"}
                </span>
              </button>
            )}

            {status === "in_progress" && (
              <div className="glass-strong rounded-2xl p-6 border border-aurora/20 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">In Progress</div>
                    <div className="text-sm text-muted-foreground">Open the link, solve it, then confirm below.</div>
                  </div>
                  <button
                    onClick={() => void openLeetCode()}
                    disabled={busy}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <button
                    onClick={() => void markCompleted()}
                    disabled={busy}
                    className="rounded-2xl py-4 text-base font-semibold text-primary-foreground bg-green-500/20 border border-green-500/30 hover:bg-green-500/25 transition"
                  >
                    Yes, I Solved It
                  </button>
                  <button
                    onClick={() => toast.message("Come back when you’ve solved it.")}
                    disabled={busy}
                    className="rounded-2xl py-4 text-base font-semibold text-foreground bg-white/5 border border-white/10 hover:bg-white/10 transition"
                  >
                    Not Yet
                  </button>
                </div>
              </div>
            )}

            {status === "completed" && (
              <div className="glass-strong rounded-2xl p-6 border border-green-500/30 space-y-4">
                <motion.div
                  initial={{ scale: 0.98 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-7 w-7 text-green-400" />
                  <div>
                    <div className="font-display text-2xl font-bold">Challenge Completed 🎉</div>
                    <div className="text-sm text-muted-foreground">
                      Skills Demonstrated: Problem Solving · DSA Fundamentals · Algorithmic Thinking
                    </div>
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/5 p-4 border border-white/10">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Recruiter Signals</div>
                    <div className="mt-2 text-sm text-foreground">Consistency</div>
                    <div className="text-sm text-foreground">Discipline</div>
                    <div className="text-sm text-foreground">Technical Growth</div>
                  </div>

                  <div className="rounded-xl bg-white/5 p-4 border border-white/10 md:col-span-2">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">XP Available</div>
                    <div className="mt-2 font-display text-4xl font-bold text-aurora">+{today.xp_reward} XP</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      AI Mentor update: your consistency improved through validated daily completion.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => void claimReward()}
                  disabled={busy}
                  className="relative w-full rounded-2xl py-4 text-base font-semibold text-primary-foreground overflow-hidden transition disabled:opacity-50"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-aurora to-aurora/80" />
                  <span className="relative inline-flex items-center justify-center gap-2">
                    <Zap className="h-5 w-5" /> {busy ? "Claiming..." : "Claim Reward"}
                  </span>
                </button>
              </div>
            )}

            {status === "claimed" && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="rounded-2xl bg-green-500/10 border border-green-500/30 p-6 flex items-center gap-4"
              >
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <div>
                  <div className="font-medium text-green-400">Reward Claimed</div>
                  <div className="text-sm text-muted-foreground">
                    Claimed at {new Date(progress?.claimed_at ?? "").toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="glass-strong rounded-2xl p-8 text-center space-y-4">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <div className="font-medium">No Challenge Today</div>
            <p className="text-sm text-muted-foreground">Check back tomorrow for a new daily challenge!</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="font-display font-bold mb-4">Past 7 Days</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Challenge history will appear here once you complete more daily challenges.</p>
        </div>
      </div>
    </main>
  );
}

export default DSADailyPage;

