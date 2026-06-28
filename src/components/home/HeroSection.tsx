import { lazy, Suspense, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import {
  Sparkles, Target, Zap, Code2, Flame, ArrowRight,
  Play, Brain, Lock, TrendingUp, Clock,
} from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

const CareerSphere = lazy(() => import("@/components/CareerSphere"));

/* ─── Shared subcomponents ──────────────────────────────────── */

function ReadinessOrb({ score, isDemo }: { score: number; isDemo?: boolean }) {
  const circ = 2 * Math.PI * 54;
  const pct = Math.max(0, Math.min(100, score));

  const color =
    pct >= 80
      ? "oklch(0.88 0.18 145)"
      : pct >= 60
      ? "oklch(0.75 0.2 200)"
      : "oklch(0.72 0.22 295)";

  return (
    <div className="relative h-44 w-44 mx-auto">
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-30 readiness-orb"
        style={{ background: color }}
      />
      {/* SVG ring */}
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r="54" fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r="54"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (circ * pct) / 100 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.5 }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-4xl font-bold" style={{ color }}>
            {pct}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
            Readiness
          </div>
          {isDemo && (
            <div className="mt-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-widest text-amber-400">
              <Lock className="h-2.5 w-2.5" /> Demo
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-strong rounded-3xl p-5 relative overflow-hidden group cursor-default border border-white/5 hover:border-white/15 transition-all duration-300"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ background: `radial-gradient(circle at 80% 20%, ${color}18, transparent 60%)` }} />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-xl glass grid place-items-center" style={{ border: `1px solid ${color}30` }}>
            <span style={{ color }}><Icon className="h-4 w-4" /></span>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
        </div>
        <div className="font-display text-3xl font-bold" style={{ color }}>{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1.5">{sub}</div>}
      </div>
    </motion.div>
  );
}

/* ─── DEMO constants ────────────────────────────────────────── */

const DEMO = {
  name: "Alex",
  score: 72,
  level: 3,
  levelName: "Growth Seeker",
  xp: 1240,
  problems: 48,
  streak: 12,
  goal: "SDE @ Product Company",
  skillGap: "System Design",
  fastestPath: "Ship 2 real projects + lift DSA streak",
  timeline: "4 – 6 months",
};

/* ─── Animated Counter ──────────────────────────────────────── */

function AnimatedCount({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        setCount(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [to]);

  return <>{count.toLocaleString()}{suffix}</>;
}

/* ─── Guest Hero ────────────────────────────────────────────── */

function GuestHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const nav = useNavigate();

  return (
    <section id="career-os" ref={ref} className="relative min-h-screen w-full overflow-hidden pt-28">
      <AuroraBackground />
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 grid place-items-center"><div className="h-24 w-24 rounded-full bg-aurora blur-3xl opacity-50" /></div>}>
          <CareerSphere />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" />

      <motion.div style={{ y, opacity }} className="relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs border border-white/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-muted-foreground tracking-wide">AI Career Operating System · Now in Beta</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight mb-6">
            <span className="block text-foreground">Your Career.</span>
            <span className="block text-aurora">Quantified.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
            className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground mb-10">
            An AI Career Operating System that continuously analyzes your journey toward employability — resume, GitHub, DSA, interviews, and everything in between.
          </motion.p>

          {/* Demo readiness orb */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-12">
            <ReadinessOrb score={DEMO.score} isDemo />
            <div className="mt-4 text-sm text-muted-foreground">
              Sample Career Readiness Score — <span className="text-accent">yours updates live</span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-20">
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => nav({ to: "/auth" })}
              className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <span className="absolute inset-0 rounded-full bg-aurora" />
              <span className="relative z-10 flex items-center gap-2">
                <Target className="h-4 w-4" /> Generate My Placement Score <ArrowRight className="h-4 w-4" />
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-sm font-semibold hover:bg-white/10 transition"
            >
              <Play className="h-4 w-4" /> Watch Live Demo
            </motion.button>
          </motion.div>

          {/* Demo stats row */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <StatCard icon={Target} label="Placement" value={`${DEMO.score}%`} sub="Career Readiness" color="oklch(0.75 0.20 200)" delay={0} />
            <StatCard icon={Zap} label="XP & Level" value={DEMO.xp.toLocaleString()} sub={`Lvl ${DEMO.level} · ${DEMO.levelName}`} color="oklch(0.72 0.22 295)" delay={0.05} />
            <StatCard icon={Code2} label="DSA Solved" value={DEMO.problems} sub="Problems Conquered" color="oklch(0.85 0.18 70)" delay={0.1} />
            <StatCard icon={Flame} label="Streak" value={DEMO.streak} sub="Day Active Streak" color="oklch(0.75 0.22 40)" delay={0.15} />
          </motion.div>
          {/* Trust stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
            className="mt-12 mx-auto max-w-3xl glass-strong rounded-3xl p-6 border border-white/5 flex flex-wrap items-center justify-center gap-12 md:gap-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 50%, oklch(0.72 0.22 295 / 0.1), transparent 70%)` }} />
            {[
              { to: 50000, suffix: "+", l: "Students" },
              { to: 1, suffix: "M+", l: "Skills Analyzed" },
              { to: 100000, suffix: "+", l: "Interviews" },
            ].map((s) => (
              <div key={s.l} className="relative z-10">
                <div className="font-display text-2xl md:text-3xl font-bold text-aurora mb-1">
                  <AnimatedCount to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Auth Hero ─────────────────────────────────────────────── */

function AuthHero({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const nav = useNavigate();

  const name = data?.profile?.full_name?.split(" ")[0] || "there";
  const score = data?.scores?.[0]?.total_score || 0;
  const xp = data?.xp?.total_xp || 0;
  const lvl = data?.xp?.level || 1;
  const lvlName = data?.xp?.level_name || "Career Explorer";
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const streak = data?.streak?.current_streak || 0;
  const goal = data?.profile?.career_goal || "Land a Dream Job";
  const skills = (data?.profile?.skills || []) as string[];
  const resumeScore = data?.resume?.total_score || 0;

  // Compute biggest skill gap from scores
  const bdScore = data?.scores?.[0] || {};
  const skillScores: Record<string, number> = {
    "Resume": bdScore.resume_score || 0,
    "GitHub": bdScore.github_score || 0,
    "DSA": bdScore.dsa_score || 0,
    "Projects": bdScore.projects_score || 0,
    "Communication": bdScore.communication_score || 0,
  };
  const skillGap = Object.entries(skillScores).sort(([, a], [, b]) => a - b)[0]?.[0] || "System Design";

  // Estimated hiring timeline (rough heuristic)
  const hiringTimeline =
    score >= 85 ? "< 1 month" :
    score >= 70 ? "2 – 3 months" :
    score >= 55 ? "4 – 6 months" : "6 – 12 months";

  // Fastest path
  const fastestPath =
    (bdScore.dsa_score || 0) < 60
      ? "Boost DSA + build 1 real project"
      : resumeScore < 70
      ? "Improve resume + GitHub contributions"
      : "Complete mock interviews + system design";

  return (
    <section id="career-os" ref={ref} className="relative min-h-screen w-full overflow-hidden pt-28">
      <AuroraBackground />
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 grid place-items-center"><div className="h-24 w-24 rounded-full bg-aurora blur-3xl opacity-50" /></div>}>
          <CareerSphere />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" />

      <motion.div style={{ y, opacity }} className="relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-32">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs border border-white/10 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.88_0.18_145)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)]" />
          </span>
          <span className="text-muted-foreground tracking-wide">Personalized Career OS · Live Data</span>
        </motion.div>

        {/* Name + headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-10">
          <span className="block text-foreground">Welcome back,</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.7_0.22_295)] to-[oklch(0.75_0.2_200)]">{name}.</span>
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Readiness orb + AI meta */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="space-y-6">
            <ReadinessOrb score={score} />

            {/* AI insights row */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Target, label: "Career Goal", value: goal, color: "oklch(0.75 0.20 200)" },
                { icon: Brain, label: "Skill Gap", value: skillGap, color: "oklch(0.72 0.22 330)" },
                { icon: TrendingUp, label: "Fastest Path", value: fastestPath, color: "oklch(0.88 0.18 145)" },
                { icon: Clock, label: "Est. Timeline", value: hiringTimeline, color: "oklch(0.85 0.18 70)" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-2xl p-4 border border-white/5 hover:border-white/15 transition">
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="h-3.5 w-3.5" style={{ color: item.color }} />
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{item.label}</span>
                  </div>
                  <div className="text-sm font-medium leading-tight">{item.value}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => nav({ to: "/dashboard" })}
              className="relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <span className="absolute inset-0 rounded-full bg-aurora" />
              <span className="relative z-10 flex items-center gap-2">
                Open Dashboard <ArrowRight className="h-4 w-4" />
              </span>
            </motion.button>
          </motion.div>

          {/* Right: Stat cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}
            className="grid grid-cols-2 gap-4">
            <StatCard icon={Target} label="Placement" value={`${score}%`} sub="Career Readiness" color="oklch(0.75 0.20 200)" />
            <StatCard icon={Zap} label="XP & Level" value={xp.toLocaleString()} sub={`Lvl ${lvl} · ${lvlName}`} color="oklch(0.72 0.22 295)" />
            <StatCard icon={Code2} label="DSA Solved" value={problems} sub="Problems Conquered" color="oklch(0.85 0.18 70)" />
            <StatCard icon={Flame} label="Streak" value={streak} sub="Day Active Streak" color="oklch(0.75 0.22 40)" />
            {skills.length > 0 && (
              <div className="col-span-2 glass rounded-3xl p-5 border border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Your Skills</div>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 6).map((s: string) => (
                    <span key={s} className="glass rounded-full px-3 py-1 text-xs font-medium">{s}</span>
                  ))}
                  {skills.length > 6 && (
                    <span className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">+{skills.length - 6} more</span>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Export ────────────────────────────────────────────────── */

export default function HeroSection({ data, isAuthed }: { data: any; isAuthed: boolean }) {
  return isAuthed ? <AuthHero data={data} /> : <GuestHero />;
}
