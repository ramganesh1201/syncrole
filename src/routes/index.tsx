import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, useMemo } from "react";
import logo from "@/assets/logo.png";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Sparkles,
  Github,
  FileText,
  Trophy,
  Flame,
  Brain,
  Target,
  Rocket,
  ArrowRight,
  Play,
  Zap,
  TrendingUp,
  Award,
  CheckCircle,
  Upload,
  Building2,
  ChevronRight,
  Star,
  Activity,
  Lock,
  Code2,
} from "lucide-react";
import AuroraBackground from "../components/AuroraBackground";
import SyncFooter from "../components/SyncFooter";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { levelProgress, ACHIEVEMENT_CATALOG } from "@/lib/syncrole";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

// ── New homepage section components ────────────────────────────
import HeroSection from "@/components/home/HeroSection";
import CareerJourneyTimeline from "@/components/home/CareerJourneyTimeline";
import AICareerTwinSection from "@/components/home/AICareerTwinSection";
import RecruiterToggleSection from "@/components/home/RecruiterToggleSection";
import AIIntelligenceCenter from "@/components/home/AIIntelligenceCenter";
import DreamCompanySection from "@/components/home/DreamCompanySection";
import CareerProgressFeed from "@/components/home/CareerProgressFeed";
import CareerTransformationsSection from "@/components/home/CareerTransformationsSection";
import FinalCTA from "@/components/home/FinalCTA";

const CareerSphere = lazy(() => import("../components/CareerSphere"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SyncRole — Stop Guessing. Start Getting Hired." },
      {
        name: "description",
        content:
          "AI-powered career intelligence platform. Analyze your resume, GitHub, and skills. Get a personalized roadmap to internships and dream jobs.",
      },
      { property: "og:title", content: "SyncRole — The Career Operating System" },
      {
        property: "og:description",
        content:
          "AI that analyzes your skills, projects, resume, and interview readiness — and builds your path to getting hired.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

/* ---------- shared bits ---------- */

function GradientBorder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl p-px ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-aurora opacity-60" />
      <div className="relative rounded-[15px] bg-card/80 backdrop-blur-xl">{children}</div>
    </div>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMove(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-shadow";
  const styles =
    variant === "primary"
      ? "text-primary-foreground shadow-glow"
      : "glass-strong text-foreground hover:bg-white/10";

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {variant === "primary" && <span className="absolute inset-0 rounded-full bg-aurora" />}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-accent" />
      <span className="uppercase tracking-widest">{children}</span>
    </div>
  );
}
function DemoBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
      <Lock className="h-3 w-3" /> Demo Preview
    </div>
  );
}

function GetStartedCTA({
  children,
  variant = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const { user } = useAuth();
  const nav = useNavigate();
  return (
    <MagneticButton
      variant={variant}
      className={className}
      onClick={() => nav({ to: user ? "/dashboard" : "/auth" })}
    >
      {children ?? (
        <>
          {user ? "Open Dashboard" : "Get Started"} <ArrowRight className="h-4 w-4" />
        </>
      )}
    </MagneticButton>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- HOOKS ---------- */

function useHomeData(user: any) {
  const [data, setData] = useState<any>({
    profile: null,
    xp: null,
    streak: null,
    scores: [],
    dsaLogs: [],
    achs: [],
    missions: [],
    resume: null,
    loading: true
  });

  useEffect(() => {
    if (!user) {
      setData((prev: any) => ({ ...prev, loading: false }));
      return;
    }
    
    let alive = true;
    async function load() {
      const uid = user.id;
      const today = new Date().toISOString().slice(0, 10);
      const [pRes, xRes, sRes, scRes, dRes, aRes, mRes, rRes, alRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
        supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
        supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle(),
        supabase.from("placement_scores").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(30),
        supabase.from("dsa_progress").select("*").eq("user_id", uid).order("log_date", { ascending: false }).limit(60),
        supabase.from("achievements").select("*").eq("user_id", uid),
        supabase.from("daily_missions").select("*").eq("user_id", uid).eq("mission_date", today),
        // Extended: fetch all resume versions (limit 10) for version history
        supabase.from("resume_analysis").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(10),
        // New: activity logs for career progress feed
        supabase.from("activity_logs").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(20),
      ]);

      if (alive) {
        const resumeVersions = rRes.data || [];
        setData({
          profile: pRes.data,
          xp: xRes.data,
          streak: sRes.data,
          scores: scRes.data || [],
          dsaLogs: dRes.data || [],
          achs: aRes.data || [],
          missions: mRes.data || [],
          // Backward compat: resume = latest single record
          resume: resumeVersions[0] || null,
          // New: all versions for version history
          resumeVersions,
          // New: activity logs for career progress feed
          activityLogs: alRes.data || [],
          loading: false
        });
      }
    }
    load();
    return () => { alive = false; };
  }, [user]);

  return data;
}

/* ---------- NAV ---------- */

function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 24)), [scrollY]);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className={`mx-auto max-w-7xl px-6 transition-all ${scrolled ? "" : ""}`}>
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all ${scrolled ? "glass-strong" : ""}`}
        >
          <a href="#" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-lg bg-aurora animate-float" />
              <div className="absolute inset-[3px] rounded-md bg-background grid place-items-center">
                <Sparkles className="h-3.5 w-3.5 text-aurora" />
              </div>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">SyncRole</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#journey" className="hover:text-foreground transition">
              Journey
            </a>
            <a href="#twin" className="hover:text-foreground transition">
              Career Twin
            </a>
            <a href="#ai-center" className="hover:text-foreground transition">
              AI Center
            </a>
            <a href="#target-company" className="hover:text-foreground transition">
              Target Company
            </a>
            <a href="#progress" className="hover:text-foreground transition">
              Progress
            </a>
            <a href="#success" className="hover:text-foreground transition">
              Success
            </a>
          </div>
          <GetStartedCTA className="!px-5 !py-2 !text-xs" />
        </div>
      </div>
    </motion.nav>
  );
}

/* ---------- HERO (MARKETING) ---------- */

function MarketingHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden pt-28">
      <AuroraBackground />

      {/* 3D scene */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-24 w-24 rounded-full bg-aurora blur-3xl opacity-50" />
            </div>
          }
        >
          <CareerSphere />
        </Suspense>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-32 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-muted-foreground">AI Career Intelligence · Now in Beta</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-8 font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight"
        >
          <span className="block text-foreground">Stop Guessing.</span>
          <span className="block text-aurora">Start Getting Hired.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mx-auto mt-7 max-w-2xl text-base md:text-lg text-muted-foreground"
        >
          SyncRole uses AI to analyze your skills, projects, resume, and interview readiness — and
          builds a personalized path toward internships and dream job offers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <GetStartedCTA>
            <Target className="h-4 w-4" />
            Login to Generate Your Placement Score
            <ArrowRight className="h-4 w-4" />
          </GetStartedCTA>
          <MagneticButton variant="ghost">
            <Play className="h-4 w-4" /> Watch Live Demo
          </MagneticButton>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { v: 50_000, s: "+", l: "Students Empowered" },
            { v: 100_000, s: "+", l: "Interviews Simulated" },
            { v: 1_000_000, s: "+", l: "Skills Analyzed" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl px-6 py-5 text-left">
              <div className="font-display text-3xl font-semibold text-aurora">
                <Counter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-xs uppercase tracking-widest text-muted-foreground/60"
      >
        Scroll to explore
      </motion.div>
    </section>
  );
}

/* ---------- PERSONALIZED HERO ---------- */

function PersonalizedHero({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const name = data?.profile?.full_name?.split(" ")[0] || "there";
  const xp = data?.xp?.total_xp || 0;
  const lvlName = data?.xp?.level_name || "Career Explorer";
  const lvl = data?.xp?.level || 1;
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const streak = data?.streak?.current_streak || 0;
  
  const score = data?.scores?.[0]?.total_score || 0;

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden pt-28">
      <AuroraBackground />

      {/* 3D scene restored */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="absolute inset-0 grid place-items-center">
              <div className="h-24 w-24 rounded-full bg-aurora blur-3xl opacity-50" />
            </div>
          }
        >
          <CareerSphere />
        </Suspense>
      </div>

      {/* Vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs mb-8 border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="text-muted-foreground tracking-wide">Personalized Career OS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-[clamp(2.6rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight"
        >
          <span className="block text-foreground">Welcome back,</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-aurora to-accent">{name}.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-strong rounded-3xl p-6 relative overflow-hidden group cursor-default border border-white/5 hover:border-aurora/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-aurora/20 blur-3xl group-hover:bg-aurora/40 transition-colors duration-500" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center group-hover:bg-aurora/20 transition-colors">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Placement</div>
            </div>
            <div className="font-display text-4xl font-bold relative z-10"><Counter to={score} suffix="%" /></div>
            <div className="mt-3 h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
              <motion.div className="h-full bg-aurora" initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1.5, delay: 0.8 }} />
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-strong rounded-3xl p-6 relative overflow-hidden group cursor-default border border-white/5 hover:border-[oklch(0.72_0.22_295)]/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.72_0.22_295)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[oklch(0.72_0.22_295)]/20 blur-3xl group-hover:bg-[oklch(0.72_0.22_295)]/40 transition-colors duration-500" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
               <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center group-hover:bg-[oklch(0.72_0.22_295)]/20 transition-colors">
                 <Zap className="h-5 w-5 text-[oklch(0.72_0.22_295)]" />
               </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">XP & Level</div>
            </div>
            <div className="font-display text-4xl font-bold relative z-10"><Counter to={xp} /></div>
            <div className="text-sm font-medium text-[oklch(0.72_0.22_295)] mt-2 relative z-10">Lvl {lvl} · {lvlName}</div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-strong rounded-3xl p-6 relative overflow-hidden group cursor-default border border-white/5 hover:border-[oklch(0.85_0.18_70)]/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.85_0.18_70)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[oklch(0.85_0.18_70)]/20 blur-3xl group-hover:bg-[oklch(0.85_0.18_70)]/40 transition-colors duration-500" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center group-hover:bg-[oklch(0.85_0.18_70)]/20 transition-colors">
                <Code2 className="h-5 w-5 text-[oklch(0.85_0.18_70)]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">DSA Solved</div>
            </div>
            <div className="font-display text-4xl font-bold relative z-10"><Counter to={problems} /></div>
            <div className="text-sm text-muted-foreground mt-2 relative z-10">Problems Conquered</div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-strong rounded-3xl p-6 relative overflow-hidden group cursor-default border border-white/5 hover:border-[oklch(0.75_0.22_40)]/30 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.75_0.22_40)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[oklch(0.75_0.22_40)]/20 blur-3xl group-hover:bg-[oklch(0.75_0.22_40)]/40 transition-colors duration-500" />
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="h-10 w-10 rounded-xl bg-white/5 grid place-items-center group-hover:bg-[oklch(0.75_0.22_40)]/20 transition-colors">
                <Flame className="h-5 w-5 text-[oklch(0.75_0.22_40)]" />
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Streak</div>
            </div>
            <div className="font-display text-4xl font-bold relative z-10"><Counter to={streak} /></div>
            <div className="text-sm text-muted-foreground mt-2 relative z-10">Day Active Streak</div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex gap-4"
        >
          <GetStartedCTA />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- CAREER JOURNEY TIMELINE ---------- */

function CareerJourney({ data }: { data: any }) {
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const score = data?.scores?.[0]?.total_score || 0;
  const achs = data?.achs?.map((a:any) => a.code) || [];

  const milestones = [
    { label: "Profile Created", done: !!data?.profile, icon: UserIcon },
    { label: "Resume Built", done: !!data?.resume, icon: FileText },
    { label: "First DSA Problem", done: problems > 0, icon: Code2 },
    { label: "10 Problems Solved", done: problems >= 10, icon: Target },
    { label: "GitHub Connected", done: achs.includes("github_connected"), icon: Github },
    { label: "Mock Interview", done: achs.includes("mock_interview") || false, icon: Brain }, // assuming mock_interview ach exists
    { label: "Placement Ready", done: score >= 80, icon: Rocket },
  ];

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="inline-flex items-center gap-2 mb-12">
          <SectionLabel icon={TrendingUp}>Career Journey</SectionLabel>
        </div>
        
        <div className="relative border-l-2 border-white/10 ml-6 space-y-12 pb-8">
          {milestones.map((m, i) => {
            const ref = useRef<HTMLDivElement>(null);
            const inView = useInView(ref, { once: true, amount: 0.8 });
            
            return (
              <motion.div 
                ref={ref}
                key={m.label} 
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8"
              >
                <motion.div 
                  className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full border-4 border-background grid place-items-center transition-colors duration-700 ${m.done ? 'bg-aurora' : 'bg-white/10'}`}
                >
                   {m.done ? <CheckCircle className="h-4 w-4 text-white" /> : <div className="h-2 w-2 rounded-full bg-white/30" />}
                </motion.div>
                
                <div className={`glass-strong rounded-2xl p-5 inline-block ${m.done ? '' : 'opacity-60 grayscale'}`}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl glass grid place-items-center">
                      <m.icon className={`h-5 w-5 ${m.done ? 'text-accent' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="font-medium text-lg">{m.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
          
          <motion.div 
            className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-aurora origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: milestones.filter(m => m.done).length / milestones.length }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
}

// Helper icon
function UserIcon(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}


/* ---------- PLACEMENT SCORE ---------- */

function PlacementScore({ data }: { data?: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  const isAuthed = !!data?.profile;
  const targetScore = isAuthed ? (data?.scores?.[0]?.total_score || 0) : 82;
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setScore(Math.round(targetScore * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, targetScore]);

  const bdScore = data?.scores?.[0] || { resume_score: 88, projects_score: 80, github_score: 74, dsa_score: 70, communication_score: 91 };
  
  const breakdown = [
    { label: "Resume", value: isAuthed ? bdScore.resume_score : 88, icon: FileText },
    { label: "Projects", value: isAuthed ? bdScore.projects_score : 80, icon: Rocket },
    { label: "GitHub", value: isAuthed ? bdScore.github_score : 74, icon: Github },
    { label: "DSA", value: isAuthed ? bdScore.dsa_score : 70, icon: Brain },
    { label: "Communication", value: isAuthed ? bdScore.communication_score : 91, icon: Activity },
  ];

  const circ = 2 * Math.PI * 90;

  return (
    <section id="score" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <SectionLabel icon={Target}>Placement Readiness</SectionLabel>
            {!isAuthed && <DemoBadge />}
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Your hireability,
            <br />
            <span className="text-aurora">quantified.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            One unified score. Real signals from your resume, code, communication, and craft.
          </p>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Circular score */}
          <GradientBorder>
            <div className="p-10 flex flex-col items-center">
              <div className="relative h-80 w-80">
                <svg viewBox="0 0 200 200" className="-rotate-90 h-full w-full">
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="oklch(0.75 0.20 200)" />
                      <stop offset="50%" stopColor="oklch(0.70 0.22 295)" />
                      <stop offset="100%" stopColor="oklch(0.72 0.22 330)" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="oklch(1 0 0 / 0.06)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="url(#scoreGrad)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={inView ? { strokeDashoffset: circ - (circ * targetScore) / 100 } : {}}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="font-display text-7xl font-bold text-aurora">{score}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                      / 100
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-6 rounded-full bg-aurora opacity-10 blur-3xl -z-10" />
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-accent">
                <TrendingUp className="h-4 w-4" /> {isAuthed && data?.scores?.length > 1 ? `+${targetScore - data.scores[1].total_score} points` : '+12 points'} this month
              </div>
            </div>
          </GradientBorder>

          {/* Breakdown */}
          <div className="space-y-3">
            {breakdown.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="glass rounded-2xl p-5 flex items-center gap-5 hover:bg-white/[0.06] transition"
              >
                <div className="h-11 w-11 rounded-xl glass-strong grid place-items-center">
                  <b.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{b.label}</span>
                    <span className="font-display font-semibold text-aurora">{b.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-aurora"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${b.value}%` } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CAREER TWIN (DEMO) ---------- */

function CareerTwin() {
  const stages = ["Beginner", "Intermediate", "Placement Ready", "Hired"];
  const [stage, setStage] = useState(2);

  useEffect(() => {
    const i = setInterval(() => setStage((s) => (s + 1) % stages.length), 2400);
    return () => clearInterval(i);
  }, []);

  const chances = [
    { label: "Internship", val: 78, color: "oklch(0.88 0.18 145)" },
    { label: "Startup Job", val: 73, color: "oklch(0.75 0.20 200)" },
    { label: "Product Company", val: 42, color: "oklch(0.72 0.22 330)" },
  ];

  return (
    <section id="twin" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <SectionLabel icon={Sparkles}>Career Digital Twin</SectionLabel>
            <DemoBadge />
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Watch your future <span className="text-aurora">evolve.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A living simulation of you — updated daily as you learn, build, and improve.
          </p>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Avatar evolution */}
          <div className="relative h-[480px] glass-strong rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-aurora opacity-20" />
            <div className="absolute inset-0 grid-bg" />

            {/* Glowing avatar */}
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                className="relative"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div className="h-56 w-56 rounded-full bg-aurora blur-3xl opacity-60 absolute inset-0" />
                <div className="relative h-56 w-56 rounded-full glass-strong border-2 border-white/20 grid place-items-center pulse-ring">
                  <div className="h-40 w-40 rounded-full bg-gradient-to-br from-aurora-1 to-aurora-2 grid place-items-center">
                    <Sparkles className="h-16 w-16 text-white" />
                  </div>
                </div>
                {/* Orbit rings */}
                {[1, 2, 3].map((r) => (
                  <motion.div
                    key={r}
                    className="absolute inset-0 rounded-full border border-white/10"
                    style={{ scale: 1 + r * 0.35 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20 + r * 10, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent shadow-glow-cyan" />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Stage indicator */}
            <div className="absolute bottom-6 inset-x-6">
              <div className="flex justify-between text-xs mb-3">
                {stages.map((s, i) => (
                  <span
                    key={s}
                    className={`transition ${i <= stage ? "text-foreground font-medium" : "text-muted-foreground/50"}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full bg-aurora"
                  animate={{ width: `${((stage + 1) / stages.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Chances */}
          <div>
            <h3 className="font-display text-2xl font-semibold mb-6">Current chances</h3>
            <div className="space-y-4">
              {chances.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium">{c.label}</span>
                    <span className="font-display text-3xl font-bold" style={{ color: c.color }}>
                      {c.val}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: c.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.val}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 glass-strong rounded-2xl p-5 flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-aurora grid place-items-center shrink-0">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium">AI Recommendation</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Ship 2 system-design projects and lift your DSA streak to 30 days to unlock{" "}
                  <span className="text-foreground">Product Company tier</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- AI CAREER TWIN (REAL) ---------- */

function AICareerTwin({ data }: { data: any }) {
  const xp = data?.xp?.total_xp || 0;
  const lp = levelProgress(xp);
  const curRank = lp.cur.name;
  const nextRank = lp.next?.name || "Max Level Reached";
  const toNext = lp.toNext || 0;
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const score = data?.scores?.[0]?.total_score || 0;
  const rScore = data?.resume?.total_score || 0;
  
  return (
    <section id="twin" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2">
            <SectionLabel icon={Sparkles}>AI Career Twin</SectionLabel>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold tracking-tight">
            Your Career Evolution
          </h2>
        </div>

        <div className="relative p-[1px] rounded-3xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-aurora-1 via-accent to-aurora-2 opacity-50 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-aurora-1 via-accent to-aurora-2 animate-spin-slow opacity-30" />
          
          <div className="relative glass-strong rounded-[23px] p-8 md:p-12 z-10 bg-card/90 backdrop-blur-3xl flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Current Rank</div>
                <div className="font-display text-4xl font-bold text-aurora">{curRank}</div>
              </div>
              
              <div className="h-px bg-white/10 w-full" />
              
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Next Rank</div>
                <div className="font-display text-2xl font-semibold">{nextRank}</div>
              </div>
              
              {lp.next && (
                <div className="space-y-3 mt-6">
                  <div className="text-sm font-medium">Requirements to advance:</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2 items-center"><ChevronRight className="h-4 w-4 text-accent" /> +{Math.ceil(toNext/10)} DSA Problems</li>
                    {rScore < 80 && <li className="flex gap-2 items-center"><ChevronRight className="h-4 w-4 text-accent" /> Resume Score 80+ (Currently {rScore})</li>}
                    <li className="flex gap-2 items-center"><ChevronRight className="h-4 w-4 text-accent" /> +{toNext} XP</li>
                  </ul>
                </div>
              )}
            </div>
            
            <div className="w-full md:w-64 shrink-0 flex flex-col items-center justify-center">
               <div className="relative h-48 w-48">
                 <div className="absolute inset-0 bg-aurora rounded-full blur-3xl opacity-20" />
                 <div className="relative h-full w-full rounded-full border border-white/20 grid place-items-center bg-background/50">
                   <div className="font-display text-5xl font-bold">{Math.round(lp.pct)}%</div>
                   <div className="absolute bottom-10 text-xs text-muted-foreground uppercase tracking-widest">Progress</div>
                 </div>
                 <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="oklch(1 0 0 / 0.1)" strokeWidth="2" />
                    <motion.circle 
                      cx="50" cy="50" r="48" fill="none" stroke="oklch(0.88 0.18 145)" strokeWidth="2"
                      strokeDasharray={2 * Math.PI * 48}
                      initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                      whileInView={{ strokeDashoffset: (2 * Math.PI * 48) * (1 - lp.pct/100) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                    />
                 </svg>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ---------- RECRUITER VIEW TOGGLE ---------- */

function RecruiterViewToggle({ data }: { data: any }) {
  const [view, setView] = useState<'student'|'recruiter'>('student');
  const dsa = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const score = data?.scores?.[0]?.total_score || 0;
  const bdScore = data?.scores?.[0] || { resume_score: 0, projects_score: 0, github_score: 0, dsa_score: 0, communication_score: 0 };
  const rScore = data?.resume?.total_score || 0;
  const streak = data?.streak?.current_streak || 0;

  const recruiterStats = [
    { label: "Technical Skills", val: Math.min(100, Math.round(bdScore.projects_score * 0.5 + bdScore.github_score * 0.5 + 20)) },
    { label: "Problem Solving", val: Math.min(100, Math.round(dsa * 1.5 + bdScore.dsa_score * 0.5)) },
    { label: "Consistency", val: Math.min(100, streak * 5 + 30) },
    { label: "Learning Velocity", val: Math.min(100, Math.round((data?.xp?.total_xp || 0)/100 + 40)) },
    { label: "Resume Strength", val: rScore || 60 },
    { label: "Interview Readiness", val: score },
  ];

  const radarData = recruiterStats.map(s => ({
    subject: s.label,
    A: s.val,
    fullMark: 100,
  }));

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
         <div className="flex justify-center mb-10">
           <div className="glass rounded-full p-1 inline-flex">
             <button 
               onClick={() => setView('student')}
               className={`px-6 py-2 rounded-full text-sm font-medium transition ${view === 'student' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
             >
               Student View
             </button>
             <button 
               onClick={() => setView('recruiter')}
               className={`px-6 py-2 rounded-full text-sm font-medium transition ${view === 'recruiter' ? 'bg-white/10 text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
             >
               Recruiter View
             </button>
           </div>
         </div>

         <AnimatePresence mode="wait">
           {view === 'student' ? (
             <motion.div 
               key="student"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="glass-strong rounded-3xl p-8 md:p-12 text-center"
             >
                <Rocket className="h-12 w-12 text-accent mx-auto mb-6" />
                <h3 className="font-display text-3xl font-bold mb-4">You're doing great!</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">Keep solving problems and building your streak. Every small step compounds into massive career growth.</p>
             </motion.div>
           ) : (
             <motion.div 
               key="recruiter"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="glass-strong rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center"
             >
                <div>
                  <h3 className="font-display text-3xl font-bold mb-6">Candidate Profile</h3>
                  <div className="space-y-4">
                    {recruiterStats.map(s => (
                      <div key={s.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">{s.label}</span>
                          <span className="font-mono">{s.val}/100</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div 
                            className="h-full bg-aurora"
                            initial={{ width: 0 }}
                            animate={{ width: `${s.val}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.1)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Candidate" dataKey="A" stroke="oklch(0.72 0.22 295)" fill="oklch(0.72 0.22 295)" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- LIVE ACTIVITY FEED ---------- */

function LiveActivityFeed({ data }: { data: any }) {
  // Combine logs, achievements, missions into a unified timeline
  const events: any[] = [];
  data?.dsaLogs?.forEach((l:any) => events.push({ type: 'dsa', date: new Date(l.created_at).getTime(), label: `Solved ${l.easy+l.medium+l.hard} DSA Problems`, icon: Code2 }));
  data?.achs?.forEach((a:any) => events.push({ type: 'ach', date: new Date(a.created_at).getTime(), label: `Unlocked Achievement: ${ACHIEVEMENT_CATALOG[a.code]?.name || a.code}`, icon: Award }));
  data?.missions?.filter((m:any) => m.completed).forEach((m:any) => events.push({ type: 'mission', date: new Date(m.completed_at).getTime(), label: `Completed Mission: ${m.title}`, icon: CheckCircle }));
  
  events.sort((a,b) => b.date - a.date);
  const topEvents = events.slice(0, 5);

  const timeAgo = (ts: number) => {
    const diff = Math.floor((Date.now() - ts) / 60000); // mins
    if (diff < 60) return `${diff} mins ago`;
    const hrs = Math.floor(diff/60);
    if (hrs < 24) return `${hrs} hrs ago`;
    return `${Math.floor(hrs/24)} days ago`;
  }

  if (topEvents.length === 0) return null;

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 mb-10">
          <SectionLabel icon={Activity}>Recent Activity</SectionLabel>
        </div>
        <div className="space-y-4">
          {topEvents.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-full bg-white/5 grid place-items-center">
                <e.icon className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1 font-medium text-sm">{e.label}</div>
              <div className="text-xs text-muted-foreground font-mono">{timeAgo(e.date)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WEEKLY GROWTH ---------- */

function WeeklyGrowth({ data }: { data: any }) {
  // Mock weekly data based on user totals to show growth visually
  const dsa = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const xp = data?.xp?.total_xp || 0;

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="inline-flex items-center gap-2 mb-10">
          <SectionLabel icon={TrendingUp}>This Week</SectionLabel>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-strong rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">XP Earned</div>
            <div className="font-display text-4xl font-bold">{Math.round(xp * 0.2)}</div>
            <div className="mt-2 text-sm text-[oklch(0.88_0.18_145)] flex items-center gap-1">
               <TrendingUp className="h-3 w-3" /> +15% vs last week
            </div>
          </div>
          <div className="glass-strong rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Problems Solved</div>
            <div className="font-display text-4xl font-bold">{Math.round(dsa * 0.3)}</div>
            <div className="mt-2 text-sm text-[oklch(0.88_0.18_145)] flex items-center gap-1">
               <TrendingUp className="h-3 w-3" /> +5% vs last week
            </div>
          </div>
          <div className="glass-strong rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Placement Growth</div>
            <div className="font-display text-4xl font-bold">+2.4%</div>
            <div className="mt-2 text-sm text-[oklch(0.88_0.18_145)] flex items-center gap-1">
               <TrendingUp className="h-3 w-3" /> Trending up
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FUTURE SELF PREDICTION ---------- */

function FutureSelfPrediction({ data }: { data: any }) {
  const score = data?.scores?.[0]?.total_score || 0;
  if (score >= 88) return null; // Already reached!

  const diff = 88 - score;
  const estMonths = Math.max(1, Math.round(diff / 5)); // rough estimate: 5 points a month

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <GradientBorder>
           <div className="p-10 md:p-16 text-center">
             <SectionLabel icon={Sparkles}>Future You Prediction</SectionLabel>
             <h3 className="font-display text-3xl md:text-5xl font-bold mt-8 mb-4">Placement Readiness: <span className="text-aurora">88%</span></h3>
             <div className="text-xl text-muted-foreground mb-8">Estimated Timeline: {estMonths} Months</div>
             
             <div className="max-w-md mx-auto glass rounded-2xl p-6 text-left">
               <div className="text-sm font-medium mb-4 flex items-center gap-2"><Target className="h-4 w-4 text-accent" /> Suggested Focus Areas</div>
               <div className="space-y-3">
                 <div className="glass px-4 py-2 rounded-lg text-sm flex justify-between"><span>Advanced DSA</span> <span className="text-aurora font-medium">High Impact</span></div>
                 <div className="glass px-4 py-2 rounded-lg text-sm flex justify-between"><span>Mock Interviews</span> <span className="text-aurora font-medium">High Impact</span></div>
                 <div className="glass px-4 py-2 rounded-lg text-sm flex justify-between"><span>System Design</span> <span className="text-muted-foreground">Medium Impact</span></div>
               </div>
             </div>
           </div>
        </GradientBorder>
      </div>
    </section>
  );
}


/* ---------- ANALYZERS (GitHub + Resume) ---------- */

function Analyzers() {
  return (
    <section id="analyzers" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <SectionLabel icon={Zap}>AI Analyzers</SectionLabel>
            <DemoBadge />
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Every file. Every commit.
            <br />
            <span className="text-aurora">Decoded.</span>
          </h2>
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-8">
          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-aurora opacity-30 blur-3xl" />
            <div className="flex items-center gap-3 relative">
              <div className="h-11 w-11 rounded-xl glass grid place-items-center">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  GitHub Analyzer
                </div>
                <div className="font-display text-xl font-semibold">14 repositories scanned</div>
              </div>
            </div>

            {/* Flying repos */}
            <div className="mt-8 grid grid-cols-3 gap-2 relative">
              {[
                "dsa-tracker",
                "portfolio-v3",
                "ml-classifier",
                "chat-app",
                "redux-store",
                "next-blog",
              ].map((r, i) => (
                <motion.div
                  key={r}
                  initial={{ opacity: 0, y: 30, rotate: -5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-lg px-3 py-2 text-xs font-mono truncate"
                >
                  <span className="text-accent">→</span> {r}
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
              <div className="glass rounded-xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Strengths
                </div>
                <div className="mt-2 font-medium text-[oklch(0.88_0.18_145)]">React · TS</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Weak</div>
                <div className="mt-2 font-medium text-[oklch(0.85_0.18_70)]">Testing</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Missing
                </div>
                <div className="mt-2 font-medium text-[oklch(0.72_0.22_330)]">DevOps</div>
              </div>
            </div>
          </motion.div>

          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-accent opacity-20 blur-3xl" />
            <div className="flex items-center gap-3 relative">
              <div className="h-11 w-11 rounded-xl glass grid place-items-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Resume Analyzer
                </div>
                <div className="font-display text-xl font-semibold">resume_v4.pdf</div>
              </div>
            </div>

            {/* Drop zone */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-8 border-2 border-dashed border-white/15 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <motion.div
                animate={{ y: [-100, 100] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              />
              <Upload className="h-8 w-8 mx-auto text-accent" />
              <div className="mt-3 text-sm font-medium">AI scanning your resume...</div>
              <div className="text-xs text-muted-foreground mt-1">ATS · Keywords · Format</div>
            </motion.div>

            <div className="mt-6 space-y-2">
              {[
                { l: "ATS Score", v: 92 },
                { l: "Keyword Match", v: 78 },
                { l: "Formatting", v: 95 },
              ].map((m, i) => (
                <div key={m.l} className="flex items-center gap-4">
                  <div className="text-xs text-muted-foreground w-32">{m.l}</div>
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-aurora"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.v}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.15 }}
                    />
                  </div>
                  <div className="text-sm font-display font-semibold w-10 text-right">{m.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------- MISSIONS ---------- */

function Missions() {
  const missions = [
    { label: "Solve 3 DSA Problems", done: true },
    { label: "Improve Resume", done: true },
    { label: "Complete Mock Interview", done: false },
  ];
  return (
    <section id="missions" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2">
            <SectionLabel icon={Flame}>Daily Missions</SectionLabel>
            <DemoBadge />
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Show up daily.
            <br />
            <span className="text-aurora">Stay unstoppable.</span>
          </h2>
          <p className="mt-5 text-muted-foreground max-w-md">
            Gamified routines, XP rewards, and streaks that compound — designed by behavioural
            scientists.
          </p>
          <div className="mt-8 inline-flex items-center gap-3 glass-strong rounded-full px-5 py-3">
            <Flame className="h-5 w-5 text-[oklch(0.75_0.22_40)]" />
            <span className="font-display text-xl font-bold">27</span>
            <span className="text-sm text-muted-foreground">Day Streak</span>
          </div>
        </div>

        <GradientBorder>
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Today</div>
              <div className="glass rounded-full px-3 py-1 text-xs font-mono">
                <span className="text-[oklch(0.88_0.18_145)]">+250</span> XP
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {missions.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-4 rounded-2xl p-4 transition ${m.done ? "glass bg-white/[0.04]" : "glass-strong"}`}
                >
                  <div
                    className={`h-8 w-8 rounded-full grid place-items-center ${m.done ? "bg-aurora" : "border border-white/20"}`}
                  >
                    {m.done && <CheckCircle className="h-5 w-5 text-white" />}
                  </div>
                  <span className={`flex-1 ${m.done ? "line-through text-muted-foreground" : ""}`}>
                    {m.label}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    +{m.done ? 50 : 150} XP
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </GradientBorder>
      </div>
    </section>
  );
}

/* ---------- ACHIEVEMENTS ---------- */

function Achievements({ data }: { data?: any }) {
  const isAuthed = !!data?.profile;
  const userAchs = data?.achs?.map((a:any) => a.code) || [];

  const defaultBadges = [
    { name: "Frontend Explorer", icon: Sparkles, c: "oklch(0.75 0.20 200)", code: 'demo1' },
    { name: "GitHub Warrior", icon: Github, c: "oklch(0.72 0.22 295)", code: 'github_connected' },
    { name: "Interview Master", icon: Trophy, c: "oklch(0.85 0.18 70)", code: 'demo2' },
    { name: "Resume Pro", icon: FileText, c: "oklch(0.88 0.18 145)", code: 'resume_uploaded' },
    { name: "Placement Champion", icon: Award, c: "oklch(0.72 0.22 330)", code: 'placement_80' },
  ];

  let displayBadges = defaultBadges;
  
  if (isAuthed) {
    displayBadges = Object.entries(ACHIEVEMENT_CATALOG).slice(0, 5).map(([code, ach]: [string, any], i) => {
      const icons = [Sparkles, Github, Trophy, FileText, Award];
      const colors = ["oklch(0.75 0.20 200)", "oklch(0.72 0.22 295)", "oklch(0.85 0.18 70)", "oklch(0.88 0.18 145)", "oklch(0.72 0.22 330)"];
      return {
         name: ach.name,
         icon: icons[i % icons.length],
         c: colors[i % colors.length],
         code: code
      };
    });
  }

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl text-center">
        <div className="inline-flex items-center gap-2">
          <SectionLabel icon={Trophy}>Achievements</SectionLabel>
          {!isAuthed && <DemoBadge />}
        </div>
        <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight">
          Unlock badges. <span className="text-aurora">Flex progress.</span>
        </h2>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-5">
          {displayBadges.map((b, i) => {
            const unlocked = isAuthed ? userAchs.includes(b.code) : true;
            return (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 150 }}
                whileHover={unlocked ? { y: -8, scale: 1.05 } : {}}
                className={`glass-strong rounded-2xl p-6 group ${unlocked ? 'cursor-pointer' : 'opacity-50 grayscale'}`}
              >
                <div className="relative h-20 w-20 mx-auto">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition"
                    style={{ background: b.c }}
                  />
                  <div
                    className="relative h-full w-full rounded-full grid place-items-center"
                    style={{ background: `linear-gradient(135deg, ${b.c}, oklch(0.30 0.05 270))` }}
                  >
                    <b.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="mt-4 text-sm font-medium">{b.name}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- DREAM COMPANY ---------- */

function DreamCompany() {
  const companies = ["Google", "Microsoft", "Amazon", "Netflix"];
  const [active, setActive] = useState(0);
  const data: Record<string, { req: number; cur: number; gap: string[] }> = {
    Google: { req: 92, cur: 68, gap: ["System Design", "Advanced DSA", "Distributed Systems"] },
    Microsoft: { req: 88, cur: 71, gap: ["Azure Fundamentals", "C# Proficiency"] },
    Amazon: { req: 90, cur: 65, gap: ["Leadership Principles", "OOP Design"] },
    Netflix: { req: 95, cur: 58, gap: ["Backend Scaling", "Streaming Architecture"] },
  };
  const d = data[companies[active]];

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <SectionLabel icon={Building2}>Dream Company Analyzer</SectionLabel>
            <DemoBadge />
          </div>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Aim higher. <span className="text-aurora">Train smarter.</span>
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {companies.map((c, i) => (
            <button
              key={c}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm transition ${active === i ? "bg-aurora text-white shadow-glow" : "glass hover:bg-white/10"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid md:grid-cols-3 gap-5"
          >
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Your Score
              </div>
              <div className="mt-3 font-display text-5xl font-bold text-aurora">{d.cur}</div>
              <div className="mt-2 text-sm text-muted-foreground">Out of 100</div>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Required Score
              </div>
              <div className="mt-3 font-display text-5xl font-bold">{d.req}</div>
              <div className="mt-2 text-sm" style={{ color: "oklch(0.85 0.18 70)" }}>
                Gap: {d.req - d.cur} pts
              </div>
            </div>
            <div className="glass-strong rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Skill Gap
              </div>
              <div className="mt-3 space-y-2">
                {d.gap.map((g) => (
                  <div key={g} className="flex items-center gap-2 text-sm">
                    <ChevronRight className="h-4 w-4 text-accent" /> {g}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- STORIES ---------- */

function Stories() {
  const items = [
    {
      name: "Aarav S.",
      role: "SWE @ Razorpay",
      quote: "Went from 4 LPA offers to 12 LPA in 90 days. SyncRole identified my exact gaps.",
      stat: "4 → 12 LPA",
    },
    {
      name: "Priya K.",
      role: "Intern @ Atlassian",
      quote: "Landed my first internship in 45 days. The mock interviews changed everything.",
      stat: "45 days",
    },
    {
      name: "Rohit M.",
      role: "SDE-1 @ Flipkart",
      quote: "The Career Twin showed me exactly what to ship. Got the product company offer.",
      stat: "Product Co.",
    },
    {
      name: "Sneha T.",
      role: "Frontend @ Swiggy",
      quote: "GitHub analyzer made me ship real projects. Recruiters started reaching out.",
      stat: "5 offers",
    },
  ];
  return (
    <section id="stories" className="relative py-32 px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel icon={Star}>Success Stories</SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight">
            Real students. <span className="text-aurora">Real offers.</span>
          </h2>
        </div>
      </div>

      <div className="mt-16 relative">
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((s, i) => (
            <div key={i} className="w-[380px] shrink-0 glass-strong rounded-3xl p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-aurora grid place-items-center font-display font-bold">
                    {s.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.role}</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-[oklch(0.88_0.18_145)] glass rounded-full px-3 py-1">
                  {s.stat}
                </div>
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">"{s.quote}"</p>
              <div className="mt-5 flex gap-1">
                {[...Array(5)].map((_, k) => (
                  <Star
                    key={k}
                    className="h-3.5 w-3.5 fill-[oklch(0.85_0.18_70)] text-[oklch(0.85_0.18_70)]"
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <GradientBorder className="overflow-hidden">
          <div className="relative p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-aurora opacity-40 blur-3xl" />
            <h2 className="relative font-display text-4xl md:text-6xl font-bold tracking-tight">
              The future of your career
              <br />
              <span className="text-aurora">starts today.</span>
            </h2>
            <p className="relative mt-6 text-muted-foreground max-w-xl mx-auto">
              Join 50,000+ students using SyncRole to land internships, ace interviews, and get
              hired faster.
            </p>
            <div className="relative mt-10 flex flex-wrap justify-center gap-4">
              <GetStartedCTA>
                <Rocket className="h-4 w-4" /> Start Free — No Card
              </GetStartedCTA>
              <MagneticButton variant="ghost">Talk to Sales</MagneticButton>
            </div>
          </div>
        </GradientBorder>
      </div>
    </section>
  );
}

/* ---------- CURSOR SPOTLIGHT ---------- */

function CursorSpotlight() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      className="pointer-events-none fixed -inset-px z-[60] hidden md:block"
      style={{
        background: useTransform(
          [x, y] as any,
          ([cx, cy]: any) =>
            `radial-gradient(600px circle at ${cx}px ${cy}px, oklch(0.72 0.22 295 / 0.08), transparent 40%)`,
        ),
      }}
    />
  );
}

/* ---------- PAGE ---------- */

function Landing() {
  const { user } = useAuth();
  const homeData = useHomeData(user);

  if (user && homeData.loading) {
    return (
       <div className="min-h-screen bg-background grid place-items-center">
         <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
       </div>
    );
  }

  return (
    <main className="relative min-h-screen">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <CursorSpotlight />
      <Nav />

      {/* SECTION 1 — Hero (globe preserved) */}
      <HeroSection data={homeData} isAuthed={!!user} />

      {/* SECTION 2 — Career Journey + Future Prediction (merged) */}
      <CareerJourneyTimeline data={homeData} />

      {/* SECTION 3 — AI Career Twin (centerpiece) */}
      <AICareerTwinSection data={homeData} />

      {/* SECTION 4 — Student ↔ Recruiter Toggle */}
      <RecruiterToggleSection data={homeData} />

      {/* SECTION 5 — AI Intelligence Center (Resume + GitHub + Placement) */}
      <AIIntelligenceCenter data={homeData} />

      {/* SECTION 6 — Dream Company Analyzer (9 companies) */}
      <DreamCompanySection data={homeData} />

      {/* SECTION 7 — Career Progress Feed (Activity + Weekly + Achievements) */}
      <CareerProgressFeed data={homeData} />

      {/* SECTION 8 — Career Transformations (renamed Stories + submission) */}
      <CareerTransformationsSection data={homeData} />

      {/* SECTION 9 — Final CTA */}
      <FinalCTA />

      <SyncFooter />
    </main>
  );
}
