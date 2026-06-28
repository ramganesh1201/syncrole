import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp, CheckCircle, Target, Rocket, Clock,
  ChevronRight, Sparkles, MapPin, Flag, Lock,
} from "lucide-react";

/* ─── Demo data ─────────────────────────────────────────────── */

const DEMO_TIMELINE = {
  current: {
    score: 72,
    dsa: 48,
    streak: 12,
    level: "Growth Seeker",
    status: "Active Learner",
  },
  nextMilestone: {
    title: "Interview Ready",
    dsa: 75,
    score: 80,
    eta: "6 weeks",
    actions: ["Solve 27 more DSA", "Complete 3 mock interviews", "Push 2 real projects to GitHub"],
  },
  targetRole: "SDE @ Product Company",
  targetCompany: "Flipkart / Swiggy / Razorpay",
  simulations: [
    { label: "30 Days", score: 77, dsa: 62, level: "Placement Ready", milestone: "Resume Polished" },
    { label: "90 Days", score: 84, dsa: 90, level: "Interview Pro", milestone: "Mock Interview Ace" },
    { label: "180 Days", score: 91, dsa: 120, level: "Offer Hunter", milestone: "Dream Offer Stage" },
  ],
};

/* ─── Phase node ─────────────────────────────────────────────── */

function PhaseNode({
  phase,
  label,
  sub,
  active,
  done,
  index,
}: {
  phase: "past" | "present" | "future";
  label: string;
  sub: string;
  active?: boolean;
  done?: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const colors: Record<string, string> = {
    past: "oklch(0.88 0.18 145)",
    present: "oklch(0.72 0.22 295)",
    future: "oklch(0.75 0.2 200)",
  };
  const color = colors[phase];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex flex-col items-center ${active ? "z-10" : ""}`}
    >
      {/* Node circle */}
      <div
        className={`relative h-16 w-16 rounded-full border-2 grid place-items-center transition-all duration-500 ${
          active ? "scale-125 shadow-glow" : done ? "" : "opacity-70"
        }`}
        style={{
          borderColor: color,
          background: done || active ? `${color}20` : "transparent",
          boxShadow: active ? `0 0 30px ${color}60` : undefined,
        }}
      >
        {done ? (
          <CheckCircle className="h-7 w-7" style={{ color }} />
        ) : active ? (
          <div className="h-4 w-4 rounded-full ai-pulse" style={{ background: color }} />
        ) : (
          <div className="h-3 w-3 rounded-full opacity-40" style={{ background: color }} />
        )}
        {active && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ border: `2px solid ${color}` }}
          />
        )}
      </div>

      {/* Label */}
      <div className="mt-4 text-center">
        <div className="font-display text-sm font-semibold" style={active ? { color } : undefined}>
          {label}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{sub}</div>
      </div>
    </motion.div>
  );
}

/* ─── Simulation card ────────────────────────────────────────── */

function SimCard({ sim, index }: { sim: (typeof DEMO_TIMELINE.simulations)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass-strong rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 border border-white/5 transition-all duration-300"
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[oklch(0.72_0.22_295)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="glass rounded-full px-3 py-1 text-xs font-mono font-semibold text-muted-foreground">
            {sim.label}
          </div>
          <div className="text-xs text-[oklch(0.88_0.18_145)] font-medium">{sim.milestone}</div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Readiness</span>
              <span className="font-display font-semibold text-aurora">{sim.score}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-aurora"
                initial={{ width: 0 }}
                animate={inView ? { width: `${sim.score}%` } : {}}
                transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">DSA Solved</div>
            <div className="font-display font-semibold text-sm" style={{ color: "oklch(0.85 0.18 70)" }}>
              {sim.dsa} problems
            </div>
          </div>

          <div className="glass rounded-xl px-3 py-2 text-center">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Level</div>
            <div className="text-sm font-semibold mt-0.5">{sim.level}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main component ────────────────────────────────────────── */

export default function CareerJourneyTimeline({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const score = data?.scores?.[0]?.total_score || 0;
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const streak = data?.streak?.current_streak || 0;
  const lvlName = data?.xp?.level_name || "Career Explorer";
  const goal = data?.profile?.career_goal || "Land a Dream Job";
  const github = data?.profile?.github_username;

  // Next milestone calculation from real data
  const diff80 = Math.max(0, 80 - score);
  const estWeeks = Math.max(1, Math.round(diff80 / 5));

  const nextActions: string[] = [];
  if (problems < 50) nextActions.push(`Solve ${50 - problems} more DSA problems`);
  if ((data?.scores?.[0]?.resume_score || 0) < 75) nextActions.push("Improve resume score to 75+");
  if (!github) nextActions.push("Connect your GitHub account");
  if (streak < 7) nextActions.push("Build a 7-day activity streak");
  if (nextActions.length === 0) nextActions.push("Take 3 mock interviews with SyncPilot");

  const simulations = [
    {
      label: "30 Days",
      score: Math.min(100, score + 8),
      dsa: problems + 20,
      level: "Placement Ready",
      milestone: "Consistent Streak",
    },
    {
      label: "90 Days",
      score: Math.min(100, score + 18),
      dsa: problems + 55,
      level: "Interview Pro",
      milestone: "Mock Interview Ace",
    },
    {
      label: "180 Days",
      score: Math.min(100, score + 30),
      dsa: problems + 90,
      level: "Offer Hunter",
      milestone: "Dream Offer Stage",
    },
  ];

  const d = isAuthed
    ? {
        current: { score, dsa: problems, streak, level: lvlName, status: "Active Learner" },
        nextMilestone: { title: "Interview Ready", dsa: 75, score: 80, eta: `${estWeeks} weeks`, actions: nextActions },
        targetRole: goal,
        targetCompany: data?.profile?.dream_company || "Top Product Company",
        simulations,
      }
    : DEMO_TIMELINE;

  return (
    <section id="journey" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              <span className="uppercase tracking-widest">Career Journey + Future Prediction</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                <Lock className="h-3 w-3" /> Demo Preview
              </div>
            )}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Where you are. <span className="text-aurora">Where you'll be.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            An intelligent timeline that maps your past, present, and future — recalculated daily from your activity.
          </p>
        </div>

        {/* Timeline track */}
        <div className="relative mb-20">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-white/5 z-0">
            <motion.div
              className="h-full timeline-line origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <PhaseNode phase="past" label="Started" sub="Profile Created" done={true} index={0} />
            <PhaseNode phase="present" label="Current" sub={`${d.current.level}`} active={true} index={1} />
            <PhaseNode phase="future" label={d.nextMilestone.title} sub={`Est. ${d.nextMilestone.eta}`} index={2} />
            <PhaseNode phase="future" label="Target Role" sub={d.targetRole} index={3} />
          </div>
        </div>

        {/* Current + Next milestone panels */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Current state */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[oklch(0.75_0.20_200)]/20 grid place-items-center">
                <MapPin className="h-5 w-5 text-[oklch(0.75_0.20_200)]" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Current State</div>
                <div className="font-display text-lg font-semibold">{d.current.status}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Readiness", value: `${d.current.score}%` },
                { label: "DSA Solved", value: d.current.dsa.toString() },
                { label: "Day Streak", value: d.current.streak.toString() },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <div className="font-display text-2xl font-bold text-aurora">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Next milestone */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-3xl p-8 border border-[oklch(0.72_0.22_295)]/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-[oklch(0.72_0.22_295)]/20 grid place-items-center">
                <Target className="h-5 w-5 text-[oklch(0.72_0.22_295)]" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Next Milestone</div>
                <div className="font-display text-lg font-semibold">{d.nextMilestone.title}</div>
              </div>
              <div className="ml-auto glass rounded-full px-3 py-1 text-xs font-mono text-[oklch(0.88_0.18_145)]">
                <Clock className="inline h-3 w-3 mr-1" />{d.nextMilestone.eta}
              </div>
            </div>
            <div className="space-y-2">
              {d.nextMilestone.actions.slice(0, 3).map((a, i) => (
                <div key={i} className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm">
                  <ChevronRight className="h-4 w-4 text-accent shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Target */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-5 mb-16 flex flex-wrap items-center gap-4"
        >
          <div className="h-10 w-10 rounded-xl bg-[oklch(0.85_0.18_70)]/20 grid place-items-center shrink-0">
            <Flag className="h-5 w-5 text-[oklch(0.85_0.18_70)]" />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Target Role & Company</div>
            <div className="font-display text-xl font-semibold">{d.targetRole}</div>
            <div className="text-sm text-muted-foreground">{d.targetCompany}</div>
          </div>
          <div className="glass rounded-2xl px-5 py-3 text-center">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Required Score</div>
            <div className="font-display text-2xl font-bold text-aurora">88%</div>
          </div>
        </motion.div>

        {/* Future Simulation */}
        <div className="mb-8 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-accent" />
          <h3 className="font-display text-2xl font-semibold">Future Simulation</h3>
          <div className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            {isAuthed ? "Recalculates from your live data" : "Based on demo progress"}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {d.simulations.map((sim, i) => (
            <SimCard key={sim.label} sim={sim} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
