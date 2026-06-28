import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles, Brain, TrendingUp, Target, Code2, FileText,
  Github, Activity, ChevronRight, Zap, Lock, Star,
  CheckCircle, AlertCircle,
} from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

/* ─── Demo data ─────────────────────────────────────────────── */

const DEMO = {
  rank: "Growth Seeker",
  score: 72,
  resumeScore: 68,
  dsa: 48,
  streak: 12,
  xp: 1240,
  strengths: ["React & TypeScript", "API Design", "Problem Solving"],
  weaknesses: ["System Design", "Testing Practices", "DevOps"],
  growthAreas: ["Advanced DSA", "System Architecture", "Cloud Technologies"],
  todayMission: "Solve 3 medium DSA problems",
  memory: [
    "Uploaded resume v2 — ATS score improved by 12 points",
    "Completed 5-day DSA streak",
    "Mock interview: scored 74/100 on technical round",
  ],
  syncPilotSummary:
    "Based on your recent activity, your strongest signal is consistent DSA practice. Your main gap is system design — I recommend 2 architecture projects in the next 30 days to unlock Product Company tier.",
};

/* ─── Orbit ring decoration ─────────────────────────────────── */

function OrbitRings() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[1, 2, 3].map((r) => (
        <motion.div
          key={r}
          className="absolute inset-0 rounded-full border border-white/10"
          style={{ scale: 1 + r * 0.28, top: "50%", left: "50%", transform: `translate(-50%, -50%) scale(${1 + r * 0.28})` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + r * 10, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
            style={{ background: ["oklch(0.75 0.2 200)", "oklch(0.72 0.22 295)", "oklch(0.72 0.22 330)"][r - 1] }}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Strength / Weakness list ───────────────────────────────── */

function InsightList({
  items,
  type,
}: {
  items: string[];
  type: "strength" | "weakness" | "growth";
}) {
  const colors = {
    strength: "oklch(0.88 0.18 145)",
    weakness: "oklch(0.72 0.22 330)",
    growth: "oklch(0.75 0.2 200)",
  };
  const icons = { strength: CheckCircle, weakness: AlertCircle, growth: TrendingUp };
  const Icon = icons[type];
  const color = colors[type];

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3 glass rounded-xl px-4 py-2.5 text-sm">
          <Icon className="h-4 w-4 shrink-0" style={{ color }} />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */

export default function AICareerTwinSection({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const isAuthed = !!data?.profile;

  const xp = data?.xp?.total_xp || 0;
  const lvlName = data?.xp?.level_name || DEMO.rank;
  const score = data?.scores?.[0]?.total_score || 0;
  const rScore = data?.resume?.total_score || 0;
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const streak = data?.streak?.current_streak || 0;
  const bdScore = data?.scores?.[0] || {};

  // Compute strengths / weaknesses from real data
  const signalMap: Record<string, number> = {
    "Resume Writing": rScore || 0,
    "GitHub Activity": bdScore.github_score || 0,
    "DSA / Problem Solving": bdScore.dsa_score || 0,
    "Project Building": bdScore.projects_score || 0,
    "Communication": bdScore.communication_score || 0,
    "Consistency": Math.min(100, streak * 5 + 20),
  };

  const sorted = Object.entries(signalMap).sort(([, a], [, b]) => b - a);
  const strengths = sorted.slice(0, 3).map(([k]) => k);
  const weaknesses = sorted.slice(-2).map(([k]) => k);
  const growthAreas = ["Advanced DSA", "System Design", "Cloud & DevOps"].filter(
    (g) => !strengths.includes(g),
  );

  // Today's mission
  const todayMission =
    data?.missions?.find((m: any) => !m.completed)?.title ||
    DEMO.todayMission;

  // Career memory from activity logs
  const memory: string[] = isAuthed
    ? (data?.activityLogs || [])
        .slice(0, 3)
        .map((l: any) => {
          if (l.type === "resume_upload") return `Uploaded resume — ATS analysis complete`;
          if (l.type === "dsa_solve") return `Solved DSA problems · +${l.xp_delta} XP`;
          if (l.type === "mock_interview") return `Completed mock interview round`;
          if (l.type === "achievement") return `Unlocked achievement: ${ACHIEVEMENT_CATALOG[(l.meta as any)?.code || ""]?.name || "Badge"}`;
          return `Activity recorded · +${l.xp_delta} XP`;
        })
    : DEMO.memory;

  // SyncPilot summary
  const syncPilotSummary = isAuthed
    ? `Based on your recent activity, ${
        strengths[0] ? `your strongest signal is ${strengths[0].toLowerCase()}.` : "you're building momentum."
      } ${
        weaknesses[0]
          ? `Your main gap is ${weaknesses[0].toLowerCase()} — I recommend focused practice over the next 30 days.`
          : "Keep up the consistency!"
      }`
    : DEMO.syncPilotSummary;

  const d = isAuthed
    ? { rank: lvlName, score, resumeScore: rScore, dsa: problems, streak, xp, strengths, weaknesses, growthAreas, todayMission, memory, syncPilotSummary }
    : DEMO;

  return (
    <section id="twin" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[oklch(0.72_0.22_295)]/8 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="uppercase tracking-widest">AI Career Twin</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                <Lock className="h-3 w-3" /> Demo Preview
              </div>
            )}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Your digital <span className="text-aurora">career twin.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A living simulation of you — continuously updated from resume, GitHub, DSA, XP, and interview history.
          </p>
        </div>

        {/* Main card */}
        <div className="relative p-px rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] opacity-40 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] animate-spin-slow opacity-25" />

          <div className="relative glass-strong rounded-[23px] p-8 md:p-12 z-10 bg-card/90 backdrop-blur-3xl grid md:grid-cols-3 gap-10">

            {/* Column 1: Digital Twin avatar */}
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="relative h-52 w-52">
                <OrbitRings />
                {/* Glow */}
                <div className="absolute inset-4 rounded-full bg-aurora blur-3xl opacity-20" />
                {/* Avatar */}
                <motion.div
                  className="relative h-full w-full rounded-full glass-strong border-2 border-white/20 grid place-items-center pulse-ring"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <div className="h-32 w-32 rounded-full bg-aurora grid place-items-center">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                </motion.div>
              </div>

              <div className="text-center">
                <div className="font-display text-2xl font-bold text-aurora">{d.rank}</div>
                <div className="text-sm text-muted-foreground mt-1">Current Level</div>
              </div>

              {/* Signal bars */}
              <div className="w-full space-y-2">
                {[
                  { label: "DSA", value: Math.min(100, d.dsa * 2), icon: Code2 },
                  { label: "Resume", value: d.resumeScore, icon: FileText },
                  { label: "Streak", value: Math.min(100, d.streak * 4), icon: Activity },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full bg-aurora"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${s.value}%` } : {}}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                      />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-8 text-right">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Strengths / Weaknesses / Growth */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-4 w-4 text-[oklch(0.88_0.18_145)]" />
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Strengths</div>
                </div>
                <InsightList items={d.strengths} type="strength" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-[oklch(0.72_0.22_330)]" />
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Weaknesses</div>
                </div>
                <InsightList items={d.weaknesses} type="weakness" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-[oklch(0.75_0.2_200)]" />
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Growth Areas</div>
                </div>
                <InsightList items={d.growthAreas.slice(0, 3)} type="growth" />
              </div>
            </div>

            {/* Column 3: Today's mission + Career memory + SyncPilot */}
            <div className="space-y-5">
              {/* Today's mission */}
              <div className="glass rounded-2xl p-5 border border-[oklch(0.85_0.18_70)]/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-lg bg-[oklch(0.85_0.18_70)]/20 grid place-items-center">
                    <Target className="h-3.5 w-3.5 text-[oklch(0.85_0.18_70)]" />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Today's Mission</div>
                </div>
                <p className="text-sm font-medium">{d.todayMission}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-[oklch(0.85_0.18_70)]">
                  <Zap className="h-3 w-3" /> +30 XP on completion
                </div>
              </div>

              {/* Career memory */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-accent" />
                  <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Career Memory</div>
                </div>
                <div className="space-y-2">
                  {d.memory.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="h-3 w-3 text-accent mt-0.5 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                  {d.memory.length === 0 && (
                    <div className="text-xs text-muted-foreground/60 italic">No activity yet — start your journey!</div>
                  )}
                </div>
              </div>

              {/* SyncPilot summary */}
              <div className="glass-strong rounded-2xl p-5 border border-[oklch(0.72_0.22_295)]/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-xl bg-aurora grid place-items-center shrink-0">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold">SyncPilot Summary</div>
                    <div className="text-[10px] text-muted-foreground">Updated from your activity</div>
                  </div>
                  <div className="ml-auto">
                    <div className="h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)] feed-dot" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.syncPilotSummary}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
