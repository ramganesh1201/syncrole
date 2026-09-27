import { useRef, useState, useEffect } from "react";
import { motion, animate, AnimatePresence } from "framer-motion";
import {
  Target, Zap, Code2, Flame, ArrowRight,
  Play, Brain, TrendingUp, Clock, CheckCircle2, ChevronRight, ShieldCheck,
  Briefcase, BarChart3, Layers, Sparkles
} from "lucide-react";
import AuroraBackground from "@/components/AuroraBackground";
import { useNavigate } from "@tanstack/react-router";

/* ─── Target Role Benchmarks ────────────────────────────────── */

const TARGET_ROLES = [
  {
    id: "fullstack",
    title: "Fullstack SDE",
    score: 72,
    statusLabel: "Good Foundation",
    color: "text-cyan-400",
    bgGradient: "from-violet-500 to-cyan-400",
    primaryGap: "DSA Consistency (27 problems to target)",
    topSkills: ["React / Next.js", "Node.js", "DSA", "System Design"],
    nextAction: "Complete 2 LeetCode Mediums + 1 System Architecture diagram",
    breakdown: { resume: 78, github: 82, dsa: 62, projects: 85 }
  },
  {
    id: "backend",
    title: "Backend Specialist",
    score: 79,
    statusLabel: "Near Placement Ready",
    color: "text-emerald-400",
    bgGradient: "from-cyan-500 to-emerald-400",
    primaryGap: "Microservices & Distributed Caching",
    topSkills: ["Go / Java / Python", "PostgreSQL", "Kafka", "System Design"],
    nextAction: "Design scalable API rate limiter with Redis",
    breakdown: { resume: 84, github: 88, dsa: 76, projects: 80 }
  },
  {
    id: "aiml",
    title: "AI / ML Engineer",
    score: 66,
    statusLabel: "Building Momentum",
    color: "text-violet-400",
    bgGradient: "from-purple-500 to-pink-400",
    primaryGap: "Model Fine-Tuning & Quantization",
    topSkills: ["PyTorch", "LangChain", "Vector DBs", "Python"],
    nextAction: "Build a RAG pipeline benchmark with Supabase Vector",
    breakdown: { resume: 70, github: 75, dsa: 58, projects: 72 }
  },
  {
    id: "systems",
    title: "Systems & Cloud",
    score: 75,
    statusLabel: "Interview Ready",
    color: "text-amber-400",
    bgGradient: "from-amber-500 to-cyan-400",
    primaryGap: "Kubernetes Orchestration & CI/CD",
    topSkills: ["Docker", "Kubernetes", "C++ / Rust", "Linux Kernel"],
    nextAction: "Deploy high-throughput proxy containerized cluster",
    breakdown: { resume: 80, github: 79, dsa: 72, projects: 78 }
  }
];

/* ─── Interactive Readiness Indicator ────────────────────────────── */

function ReadinessCard({ score, isDemo }: { score: number; isDemo?: boolean }) {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = TARGET_ROLES[activeRoleIndex];

  const pct = isDemo ? activeRole.score : Math.max(0, Math.min(100, score));
  const statusLabel = isDemo
    ? activeRole.statusLabel
    : pct >= 80 ? "Top-Tier Ready" : pct >= 65 ? "Good Foundation" : "Building Momentum";

  const color = isDemo
    ? activeRole.color
    : pct >= 80 ? "text-emerald-400" : pct >= 65 ? "text-cyan-400" : "text-violet-400";

  return (
    <div className="surface-primary rounded-2xl p-5 sm:p-6 border border-white/10 max-w-xl mx-auto shadow-2xl transition-all duration-300">
      {/* Role Target Selector Tabs */}
      {isDemo && (
        <div className="mb-5 border-b border-white/5 pb-3">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-violet-400" /> Target Role Benchmark
            </span>
            <span className="text-violet-400 font-medium text-[10px]">Click role to simulate</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TARGET_ROLES.map((role, idx) => {
              const isSelected = idx === activeRoleIndex;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveRoleIndex(idx)}
                  className={`relative rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    isSelected
                      ? "bg-violet-600/30 text-white border border-violet-500/50 shadow-sm"
                      : "bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/5"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeRoleTab"
                      className="absolute inset-0 bg-violet-600/40 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{role.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Readiness Header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isDemo ? activeRole.id : "user-score"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Career Readiness Index
              </div>
              <div className="text-lg font-bold text-foreground flex items-center gap-2 mt-0.5">
                <span>{statusLabel}</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-extrabold ${color}`}>
                {pct} <span className="text-xs font-normal text-muted-foreground">/ 100</span>
              </div>
              {isDemo && (
                <span className="text-[10px] font-medium text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-md border border-cyan-400/20">
                  Target: {activeRole.title}
                </span>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden mb-4 p-0.5 border border-white/5">
            <motion.div
              className={`h-full bg-gradient-to-r ${isDemo ? activeRole.bgGradient : "from-violet-500 to-cyan-400"} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* Breakdown Mini Grid */}
          {isDemo && (
            <div className="grid grid-cols-4 gap-2 mb-4 bg-white/3 rounded-xl p-2.5 border border-white/5 text-center">
              <div>
                <div className="text-[10px] text-muted-foreground">Resume</div>
                <div className="text-xs font-bold text-violet-300">{activeRole.breakdown.resume}%</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground">GitHub</div>
                <div className="text-xs font-bold text-cyan-300">{activeRole.breakdown.github}%</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground">DSA</div>
                <div className="text-xs font-bold text-emerald-300">{activeRole.breakdown.dsa}%</div>
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground">Projects</div>
                <div className="text-xs font-bold text-amber-300">{activeRole.breakdown.projects}%</div>
              </div>
            </div>
          )}

          {/* Primary Action Insight */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-foreground font-medium text-[11px]">
                {isDemo ? `Gap: ${activeRole.primaryGap}` : "Target: SDE Role (Top Product Cos)"}
              </span>
            </div>
            <span className="text-cyan-400 font-medium text-[11px] flex items-center gap-1 cursor-pointer hover:underline">
              {isDemo ? "View Action Plan" : "Updated Live"} <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="surface-primary rounded-xl p-4 border border-white/8 hover:border-violet-500/30 hover:-translate-y-0.5 transition-all cursor-default shadow-md group"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center text-violet-400 border border-white/10 group-hover:bg-violet-600/20 group-hover:text-violet-300 transition-colors">
          <Icon className="h-3.5 w-3.5" />
        </div>
        <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</div>
      </div>
      <div className="text-2xl font-extrabold text-foreground tracking-tight">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1 font-medium">{sub}</div>}
    </motion.div>
  );
}

/* ─── DEMO constants ────────────────────────────────────────── */

const DEMO = {
  score: 72,
  level: 3,
  levelName: "Growth Seeker",
  xp: 1240,
  problems: 48,
  streak: 12,
};

/* ─── Animated Counter ──────────────────────────────────────── */

function AnimatedCount({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration: 1.8,
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

function GuestHero({ onOpenDemo }: { onOpenDemo?: () => void }) {
  const nav = useNavigate();

  return (
    <section id="career-os" className="relative min-h-[90vh] w-full pt-28 pb-16 flex flex-col justify-center">
      <AuroraBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1 text-xs font-medium border border-white/10 text-muted-foreground mb-6"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
            <span>AI Career Operating System · Built for Engineers</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6"
          >
            Your Career. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Quantified.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            SyncRole continuously analyzes your journey toward employability — resume, GitHub activity, DSA proficiency, interview readiness, and skill gaps — in one unified dashboard.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <button
              onClick={() => nav({ to: "/auth" })}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 py-3 text-sm transition-all shadow-lg hover:shadow-violet-600/25 active:scale-98 cursor-pointer"
            >
              <Target className="h-4 w-4" /> Generate Placement Score <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onOpenDemo}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-semibold px-5 py-3 text-sm border border-white/10 transition active:scale-98 cursor-pointer"
            >
              <Play className="h-4 w-4 text-violet-400" /> Watch Live Demo
            </button>
          </motion.div>
        </div>

        {/* Readiness Card Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mb-10"
        >
          <ReadinessCard score={DEMO.score} isDemo />
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
          <StatCard icon={Target} label="Placement Score" value={`${DEMO.score}%`} sub="Career Readiness" delay={0.6} />
          <StatCard icon={Zap} label="XP & Level" value={DEMO.xp.toLocaleString()} sub={`Lvl ${DEMO.level} · ${DEMO.levelName}`} delay={0.65} />
          <StatCard icon={Code2} label="DSA Solved" value={DEMO.problems} sub="Conquered Problems" delay={0.7} />
          <StatCard icon={Flame} label="Streak" value={`${DEMO.streak} Days`} sub="Active Practice" delay={0.75} />
        </div>

        {/* Metric proof bar */}
        <div className="surface-primary rounded-2xl p-4 border border-white/8 flex flex-wrap items-center justify-around gap-6 text-center max-w-3xl mx-auto">
          {[
            { to: 50000, suffix: "+", l: "Students Active" },
            { to: 1, suffix: "M+", l: "Skills Analyzed" },
            { to: 100000, suffix: "+", l: "Mock Interviews" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-xl font-bold text-foreground">
                <AnimatedCount to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-xs text-muted-foreground font-medium mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Auth Hero ─────────────────────────────────────────────── */

function AuthHero({ data }: { data: any }) {
  const nav = useNavigate();

  const name = data?.profile?.full_name?.split(" ")[0] || "there";
  const score = data?.scores?.[0]?.total_score || 0;
  const xp = data?.xp?.total_xp || 0;
  const lvl = data?.xp?.level || 1;
  const lvlName = data?.xp?.level_name || "Career Explorer";
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const streak = data?.streak?.current_streak || 0;
  const goal = data?.profile?.career_goal || "Land a SDE Role";
  const skills = (data?.profile?.skills || []) as string[];

  const bdScore = data?.scores?.[0] || {};
  const skillScores: Record<string, number> = {
    "Resume": bdScore.resume_score || 0,
    "GitHub": bdScore.github_score || 0,
    "DSA": bdScore.dsa_score || 0,
    "Projects": bdScore.projects_score || 0,
    "Communication": bdScore.communication_score || 0,
  };
  const skillGap = Object.entries(skillScores).sort(([, a], [, b]) => a - b)[0]?.[0] || "System Design";

  const hiringTimeline =
    score >= 85 ? "< 1 month" :
    score >= 70 ? "2 – 3 months" :
    score >= 55 ? "4 – 6 months" : "6 – 12 months";

  const fastestPath =
    (bdScore.dsa_score || 0) < 60
      ? "Boost DSA streak + build 1 production project"
      : "Optimize resume impact statements & mock interviews";

  return (
    <section id="career-os" className="relative min-h-[85vh] w-full pt-28 pb-16 flex flex-col justify-center">
      <AuroraBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-400 px-3 py-1 text-xs font-medium border border-emerald-500/20 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live Personalized Dashboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Welcome back, <span className="text-violet-400">{name}</span>.
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left: Readiness & Next Action */}
          <div className="space-y-4">
            <ReadinessCard score={score} />

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Target, label: "Career Goal", value: goal },
                { icon: Brain, label: "Primary Skill Gap", value: skillGap },
                { icon: TrendingUp, label: "Priority Action", value: fastestPath },
                { icon: Clock, label: "Est. Timeline", value: hiringTimeline },
              ].map((item) => (
                <div key={item.label} className="surface-primary rounded-xl p-3.5 border border-white/8 hover:border-violet-500/30 transition-all">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    <item.icon className="h-3.5 w-3.5 text-violet-400" />
                    <span>{item.label}</span>
                  </div>
                  <div className="text-sm font-semibold text-foreground">{item.value}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => nav({ to: "/dashboard" })}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold px-5 py-3 text-sm transition-all shadow-md active:scale-98 cursor-pointer"
            >
              Open Dashboard Workspace <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right: Stat Grid & Skills */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard icon={Target} label="Placement Score" value={`${score}%`} sub="Overall Readiness" />
              <StatCard icon={Zap} label="XP & Level" value={xp.toLocaleString()} sub={`Lvl ${lvl} · ${lvlName}`} />
              <StatCard icon={Code2} label="DSA Solved" value={problems} sub="Conquered Problems" />
              <StatCard icon={Flame} label="Streak" value={`${streak} Days`} sub="Active Rhythm" />
            </div>

            {skills.length > 0 && (
              <div className="surface-primary rounded-xl p-4 border border-white/8">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Verified Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.slice(0, 8).map((s: string) => (
                    <span key={s} className="bg-white/5 rounded-md px-2.5 py-1 text-xs font-medium text-foreground border border-white/5">
                      {s}
                    </span>
                  ))}
                  {skills.length > 8 && (
                    <span className="bg-white/5 rounded-md px-2.5 py-1 text-xs text-muted-foreground">
                      +{skills.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSection({ data, isAuthed, onOpenDemo }: { data: any; isAuthed: boolean; onOpenDemo?: () => void }) {
  return isAuthed ? <AuthHero data={data} /> : <GuestHero onOpenDemo={onOpenDemo} />;
}

