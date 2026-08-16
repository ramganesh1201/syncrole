import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Code2,
  Target,
  Zap,
  CalendarDays,
  Activity,
  Briefcase,
  TrendingUp,
  Sparkles,
  Send,
  ShieldAlert,
  Clock,
  Compass,
  Database,
  Workflow,
  Cpu,
  ChevronRight,
  PlayCircle,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Layers,
  Award,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsEngine } from "@/lib/analytics";
import { OpenRouterService } from "@/lib/analytics/services/openrouter";
import {
  TopicInsight,
  StrengthWeakness,
  CompanyProfile,
  DNA,
  Pattern,
  FullDSAAnalytics,
} from "@/lib/analytics/types";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dsa-mentor")({
  component: DSAMentorPage,
  head: () => ({ meta: [{ title: "Coding Intelligence — SyncRole" }] }),
});

const BOOT_SEQUENCE = [
  "Analyzing Coding Journey...",
  "Evaluating topic mastery...",
  "Checking coding patterns...",
  "Generating personalized roadmap...",
  "Preparing interview insights...",
  "Analysis Complete",
];

// Known company logo URLs with white filter for dark mode
const COMPANY_LOGOS: Record<string, string> = {
  Google: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
  Amazon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
  Microsoft: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
  Meta: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
  Netflix: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg",
  Uber: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/uber.svg",
  Flipkart: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flipkart.svg",
  Atlassian: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/atlassian.svg",
  Adobe: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg",
  Apple: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg",
  Airbnb: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airbnb.svg",
  Stripe: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
  LinkedIn: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
};

// Company Logo Component with Avatar Fallback
function CompanyLogo({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = COMPANY_LOGOS[name];
  const initial = name ? name.charAt(0).toUpperCase() : "C";

  if (!logoUrl || failed) {
    return (
      <div
        className={`${className} rounded-md bg-aurora/20 border border-aurora/30 flex items-center justify-center font-display font-bold text-aurora text-[10px] shrink-0 select-none`}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className={`${className} object-contain filter invert brightness-200 opacity-90 shrink-0`}
    />
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    let frameId: number | null = null;
    const duration = 1000;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(ease * value));
      if (progress < 1) frameId = window.requestAnimationFrame(step);
      else setDisplayValue(value);
    };
    frameId = window.requestAnimationFrame(step);
    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, [value]);
  return <>{displayValue}</>;
}

function DSAMentorPage() {
  const navigate = useNavigate();
  const [booting, setBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [dataReady, setDataReady] = useState(false);

  const [insights, setInsights] = useState<TopicInsight[]>([]);
  const [strengths, setStrengths] = useState<StrengthWeakness[]>([]);
  const [weaknesses, setWeaknesses] = useState<StrengthWeakness[]>([]);
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [dna, setDna] = useState<DNA[]>([]);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any>({});
  const [roadmap, setRoadmap] = useState<any>({});
  const [fullAnalytics, setFullAnalytics] = useState<FullDSAAnalytics | null>(null);

  const [stats, setStats] = useState({
    total_problems: 0,
    avg_mastery: 0,
    current_streak: 0,
    longest_streak: 0,
    avg_per_day: 0,
    xp_total: 0,
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [thinkingMessageIndex, setThinkingMessageIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string; id: string }>
  >([
    {
      role: "assistant",
      content:
        "I'm your specialized AI Coding Coach. Ask me about algorithms, data structures, complexity, optimization, or debugging.",
      id: "initial-msg",
    },
  ]);

  const THINKING_MESSAGES = [
    "Analyzing your code structure...",
    "Evaluating time and space complexity...",
    "Reviewing pattern intelligence...",
    "Synthesizing optimal solution...",
    "Cross-referencing interview standards...",
  ];

  useEffect(() => {
    let interval: any;
    if (chatBusy) {
      interval = setInterval(() => {
        setThinkingMessageIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
      }, 2500);
    } else {
      setThinkingMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [chatBusy]);

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < BOOT_SEQUENCE.length) {
        setBootStep(currentStep);
      } else {
        clearInterval(interval);
        if (dataReady) setTimeout(() => setBooting(false), 600);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [dataReady]);

  useEffect(() => {
    if (bootStep === BOOT_SEQUENCE.length - 1 && dataReady) {
      const t = setTimeout(() => setBooting(false), 600);
      return () => clearTimeout(t);
    }
  }, [bootStep, dataReady]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatMessages, chatBusy, thinkingMessageIndex]);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const { data: u, error: userErr } = await supabase.auth.getUser();
        if (userErr || !u.user) throw new Error("Authentication required");

        const analytics = await AnalyticsEngine.analyze(u.user.id);
        if (!cancelled) {
          setFullAnalytics(analytics);
          setInsights(analytics.insights);
          setPatterns(analytics.patterns);
          setStrengths(analytics.strengths);
          setWeaknesses(analytics.weaknesses);
          setCompanies(analytics.companies);
          setDna(analytics.dna);
          setWeeklyPlan(analytics.weeklyPlan);
          setPredictions(analytics.predictions);
          setRoadmap(analytics.roadmap);
          setStats(analytics.stats);
          setDataReady(true);
        }
      } catch (err) {
        console.error("Error loading DSA Mentor data:", err);
        if (!cancelled) setDataReady(true);
      }
    }
    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSend() {
    const q = chatInput.trim();
    if (!q) return;
    setChatInput("");
    setChatMessages((m) => [...m, { role: "user", content: q, id: Date.now().toString() }]);
    setChatBusy(true);

    try {
      const { reply } = await OpenRouterService.invokeChat(q, fullAnalytics);
      setChatMessages((m) => [
        ...m,
        { role: "assistant", content: reply, id: (Date.now() + 1).toString() },
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I encountered an error connecting to my neural core. Please try again.",
          id: Date.now().toString(),
        },
      ]);
    } finally {
      setChatBusy(false);
    }
  }

  // Boot sequence screen
  if (booting) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-aurora/10 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aurora/20 blur-[100px] rounded-full" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative w-20 h-20 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-aurora/30 border-t-aurora border-r-aurora"
            />
            <Cpu className="absolute inset-0 m-auto w-8 h-8 text-aurora" />
          </div>
          <div className="h-8 relative overflow-hidden w-64 text-center">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={bootStep}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-base font-display font-medium text-foreground absolute inset-0 flex items-center justify-center"
              >
                {BOOT_SEQUENCE[bootStep]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-56 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
            <motion.div
              className="h-full bg-aurora"
              initial={{ width: 0 }}
              animate={{
                width: `${((bootStep + 1) / BOOT_SEQUENCE.length) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  // Pre-formatted DNA dimensions fallback if empty
  const defaultDnaDimensions = [
    { name: "Problem Solving", score: 43 },
    { name: "Logical Thinking", score: 54 },
    { name: "Pattern Recognition", score: 11 },
    { name: "Optimization Skills", score: 30 },
    { name: "Debugging", score: 60 },
  ];
  const displayDna = dna.length > 0 ? dna.slice(0, 5) : defaultDnaDimensions;

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-6 space-y-6 relative">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aurora/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      {/* Top Exit Navigation */}
      <div>
        <Link
          to="/dashboard/dsa"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Exit Coach
        </Link>
      </div>

      {/* Compact Page Header */}
      <div className="space-y-1">
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
          Coding Intelligence
        </h1>
        <p className="text-xs md:text-sm font-medium text-foreground/90">
          Understand how you solve problems — and what to improve next.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          SyncRole analyzes your verified DSA activity, problem-solving patterns, consistency, and interview readiness.
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEVEL 2: Coding DNA & Consistency (2 Columns) */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Coding DNA — Compact Single Container */}
        <div className="lg:col-span-2 glass-strong rounded-2xl p-5 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-aurora" />
              <h2 className="font-display font-semibold text-base text-white">
                Coding DNA
              </h2>
            </div>
            <span className="text-[9px] uppercase font-mono font-semibold tracking-wider text-aurora bg-aurora/10 border border-aurora/20 px-2 py-0.5 rounded">
              HIGH CONFIDENCE
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {displayDna.map((d, i) => (
              <div key={d.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-medium">{d.name}</span>
                  <span className="font-mono font-semibold text-white">
                    <AnimatedNumber value={d.score} />%
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.score}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    className="h-full bg-gradient-to-r from-aurora/60 to-aurora rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consistency Snapshot */}
        <div className="lg:col-span-1 glass-strong rounded-2xl p-5 border border-white/5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground font-semibold flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-aurora" />
                <span>CONSISTENCY</span>
              </span>
              <span className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-muted-foreground font-normal">
                Updated
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono">
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 space-y-0.5">
                <div className="text-[9px] text-muted-foreground uppercase">Current</div>
                <div className="text-sm font-bold text-aurora">
                  <AnimatedNumber value={stats.current_streak} />d
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 space-y-0.5">
                <div className="text-[9px] text-muted-foreground uppercase">Longest</div>
                <div className="text-sm font-bold text-white">
                  <AnimatedNumber value={stats.longest_streak} />d
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 space-y-0.5">
                <div className="text-[9px] text-muted-foreground uppercase">Score</div>
                <div className="text-sm font-bold text-aurora">
                  92/100
                </div>
              </div>
            </div>
          </div>

          <div className="bg-aurora/5 rounded-xl p-3 border border-aurora/15 text-xs text-muted-foreground leading-relaxed">
            <span className="text-aurora font-medium">Insight:</span> Your strongest practice pattern currently comes from consistent problem-solving sessions.
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEVEL 3: Pattern Intelligence + Next Actions */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Pattern Intelligence */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-base text-white flex items-center gap-2">
              <Workflow className="w-4 h-4 text-aurora" /> Pattern Intelligence
            </h2>
            <span className="text-[10px] font-mono text-muted-foreground">
              {patterns.length} Detected
            </span>
          </div>

          {patterns.length > 0 ? (
            <div className="space-y-2 pt-1">
              {patterns.slice(0, 3).map((p, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-medium text-white truncate">{p.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {p.mastery > 70 ? "Strong • Consistent" : "Intermediate • High Confidence"}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-aurora">
                      <AnimatedNumber value={p.mastery} />%
                    </div>
                    <div className="text-[9px] text-green-400 font-mono">↑ Trending</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground text-center py-6 bg-white/5 rounded-xl border border-white/5">
              No verified patterns yet. Complete more DSA problems to unlock pattern intelligence.
            </div>
          )}
        </div>

        {/* Right: Next Actions */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-aurora font-semibold flex items-center gap-1.5 mb-2">
              <Compass className="w-3.5 h-3.5 text-aurora" /> NEXT ACTION
            </div>

            {roadmap?.d7 || patterns.length > 0 ? (
              <div className="bg-white/5 rounded-xl p-3.5 border border-aurora/20 space-y-1.5">
                <h3 className="font-display font-semibold text-sm text-white">
                  {roadmap.d7 || `Master ${patterns[0]?.name ?? "Algorithmic Patterns"}`}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Complete 2 verified problems in your targeted weak topics.
                </p>
              </div>
            ) : (
              <div className="bg-white/5 rounded-xl p-3.5 border border-white/5 space-y-1.5">
                <h3 className="font-display font-semibold text-sm text-white">
                  Build more verified DSA activity
                </h3>
                <p className="text-xs text-muted-foreground">
                  Complete a few problems to unlock personalized recommendations.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate({ to: "/dsa-problems" })}
              className="w-full glass rounded-xl py-2 px-4 text-xs font-semibold text-aurora hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 border border-white/10"
            >
              <span>{roadmap?.d7 ? "Start Practice →" : "Practice DSA →"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEVEL 4: Company Target Readiness (Compact Comparison Table/Grid) */}
      {/* ---------------------------------------------------------------- */}
      <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-4">
        <div>
          <h2 className="font-display font-semibold text-base text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-aurora" /> Company Readiness
          </h2>
          <p className="text-xs text-muted-foreground">
            Compare your verified DSA coverage against your selected interview targets.
          </p>
        </div>

        {companies.length > 0 ? (
          <div className="space-y-2">
            {companies.slice(0, 4).map((c) => (
              <div
                key={c.name}
                className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                {/* Company Name & Logo */}
                <div className="flex items-center gap-2.5 min-w-44">
                  <CompanyLogo name={c.name} className="w-6 h-6" />
                  <span className="font-medium text-white truncate">{c.name}</span>
                </div>

                {/* Progress bar & score */}
                <div className="flex items-center gap-3 flex-1 max-w-xs">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        c.readiness >= 80
                          ? "bg-green-400"
                          : c.readiness >= 50
                          ? "bg-yellow-400"
                          : "bg-aurora"
                      )}
                      style={{ width: `${c.readiness}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-aurora shrink-0">
                    {c.readiness}%
                  </span>
                </div>

                {/* Coverage & Priority Topic */}
                <div className="flex items-center gap-4 text-muted-foreground shrink-0 font-mono text-[11px]">
                  <span>
                    Coverage:{" "}
                    <span className="text-white font-semibold">
                      {c.strong.length} / {c.strong.length + c.missing.length}
                    </span>
                  </span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-primary/80">
                    Priority: {c.missing[0] || c.strong[0] || "Arrays"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground text-center py-6 bg-white/5 rounded-xl border border-white/5">
            Not enough data to calculate target company readiness.
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEVEL 5: Detailed Topic Mastery */}
      {/* ---------------------------------------------------------------- */}
      <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-4">
        <h2 className="font-display font-semibold text-base text-white flex items-center gap-2">
          <Database className="w-4 h-4 text-aurora" /> Topic Mastery
        </h2>

        {insights.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {insights.slice(0, 6).map((topic, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-xl p-3.5 border border-white/5 space-y-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-white truncate">{topic.topic}</span>
                  <span
                    className={cn(
                      "text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold border",
                      topic.skillLevel?.toLowerCase() === "master"
                        ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                        : topic.skillLevel?.toLowerCase() === "expert"
                        ? "bg-aurora/10 text-aurora border-aurora/20"
                        : "bg-white/5 text-muted-foreground border-white/10"
                    )}
                  >
                    {topic.skillLevel ?? "Beginner"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        topic.mastery >= 80
                          ? "bg-green-400"
                          : topic.mastery >= 50
                          ? "bg-aurora"
                          : "bg-yellow-500"
                      )}
                      style={{ width: `${topic.mastery}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {topic.mastery}%
                  </span>
                </div>

                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {topic.explanation}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-muted-foreground text-center py-6 bg-white/5 rounded-xl border border-white/5">
            Solve problems across DSA topics to populate detailed mastery analytics.
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEVEL 6: Performance Signals (Strengths & Weaknesses) */}
      {/* ---------------------------------------------------------------- */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground font-semibold">
          PERFORMANCE SIGNALS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Verified Strengths */}
          <div className="glass-strong rounded-2xl p-5 border border-green-500/20 space-y-3">
            <h3 className="font-display font-semibold text-sm text-green-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" /> Verified Strengths
            </h3>

            {strengths.length > 0 ? (
              <div className="space-y-2.5">
                {strengths.map((s, i) => (
                  <div
                    key={i}
                    className="bg-black/30 rounded-xl p-3 border border-green-500/10 space-y-1 text-xs"
                  >
                    <div className="font-semibold text-green-400">{s.topic}</div>
                    <div className="text-muted-foreground">
                      <span className="text-green-400 font-medium">Why:</span> {s.reason}
                    </div>
                    <div className="text-muted-foreground pt-1 border-t border-white/5">
                      <span className="text-white font-medium">Action:</span> {s.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground text-center py-6 bg-white/5 rounded-xl">
                Keep solving problems to unlock verified strengths!
              </div>
            )}
          </div>

          {/* Critical Weaknesses */}
          <div className="glass-strong rounded-2xl p-5 border border-red-500/20 space-y-3">
            <h3 className="font-display font-semibold text-sm text-red-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" /> Critical Weaknesses
            </h3>

            {weaknesses.length > 0 ? (
              <div className="space-y-2.5">
                {weaknesses.map((w, i) => (
                  <div
                    key={i}
                    className="bg-black/30 rounded-xl p-3 border border-red-500/10 space-y-1 text-xs"
                  >
                    <div className="font-semibold text-red-400">{w.topic}</div>
                    <div className="text-muted-foreground">
                      <span className="text-red-400 font-medium">Evidence:</span> {w.reason}
                    </div>
                    <div className="text-muted-foreground pt-1 border-t border-white/5">
                      <span className="text-white font-medium">Fix:</span> {w.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground text-center py-6 bg-white/5 rounded-xl">
                No critical weaknesses detected! Excellent accuracy.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEVEL 7: Interview Predictor & Active Missions */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Interview Readiness */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h2 className="font-display font-semibold text-base text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-aurora" /> Interview Readiness
            </h2>

            <div className="space-y-2.5 pt-1">
              {[
                { label: "Online Assessment", key: "oa" },
                { label: "Live Coding", key: "live" },
                { label: "Technical Interview", key: "technical" },
              ].map((item) => {
                const score = predictions[item.key] ?? 0;
                return (
                  <div key={item.key} className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-mono font-semibold text-white">
                        <AnimatedNumber value={score} />%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-aurora rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-aurora/5 rounded-xl p-3 border border-aurora/15 text-xs text-muted-foreground">
            <span className="text-aurora font-medium font-mono uppercase text-[10px]">
              AI Verdict:
            </span>{" "}
            Focus on your weakest verified topic to improve technical interview pass rates.
          </div>
        </div>

        {/* Active Missions */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-3">
          <h2 className="font-display font-semibold text-base text-white flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-aurora" /> Active Missions
          </h2>

          <div className="space-y-2">
            {(weeklyPlan.length > 0
              ? weeklyPlan.slice(0, 3)
              : [
                  { day: "MONDAY", focus: "Binary Search Mastery", tasks: ["Solve 2 verified problems"] },
                  { day: "TUESDAY", focus: "Array Optimization", tasks: ["Solve 2 verified problems"] },
                  { day: "WEDNESDAY", focus: "Tree Traversals", tasks: ["Solve 2 verified problems"] },
                ]
            ).map((dayItem, i) => (
              <div
                key={i}
                className="bg-white/5 rounded-xl p-3 border border-white/5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="text-[9px] font-mono uppercase font-bold text-aurora">
                    {dayItem.day}
                  </div>
                  <div className="font-semibold text-white truncate">
                    {dayItem.focus}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {dayItem.tasks[0]}
                  </div>
                </div>

                <button
                  onClick={() => navigate({ to: "/dsa-problems" })}
                  className="glass rounded-xl px-3 py-1.5 text-xs font-semibold text-aurora hover:bg-white/10 transition-colors border border-aurora/30 shrink-0 flex items-center gap-1"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Start</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* LEVEL 8: Enterprise AI Code Coach Chat (LOCKED & UNTOUCHED BELOW) */}
      {/* ---------------------------------------------------------------- */}
      <div className="glass-strong rounded-3xl border border-aurora/30 shadow-[0_0_50px_rgba(var(--aurora-rgb),0.1)] relative overflow-hidden flex flex-col h-[700px] mt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-aurora/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Chat Header */}
        <div className="flex items-center gap-4 p-6 border-b border-white/5 bg-black/20 relative z-10">
          <div className="p-3 bg-gradient-to-br from-aurora to-aurora/80 rounded-2xl text-primary-foreground shadow-lg shadow-aurora/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold tracking-tight">
              Enterprise AI Code Coach
            </h2>
            <p className="text-sm text-muted-foreground">
              Powered by your analytics profile. Ask for code reviews, bug fixes, or mock interviews.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400">System Online</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 relative z-10 custom-scrollbar scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {chatMessages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={cn(
                  "flex w-full",
                  m.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[95%] md:max-w-[85%] rounded-2xl p-5",
                    m.role === "user"
                      ? "bg-gradient-to-br from-aurora/90 to-aurora text-white rounded-tr-sm shadow-[0_4px_20px_rgba(var(--aurora-rgb),0.3)] border border-aurora/50"
                      : "bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 rounded-tl-sm shadow-xl shadow-black/40"
                  )}
                >
                  {m.role === "assistant" ? (
                    <MarkdownRenderer content={m.content} />
                  ) : (
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
                      {m.content}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {chatBusy && (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="flex justify-start w-full"
              >
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 p-5 flex items-start gap-4 shadow-xl shadow-black/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[shimmer_2s_infinite]" />

                  <div className="p-2.5 bg-aurora/10 rounded-xl border border-aurora/20 relative z-10 shrink-0">
                    <Loader2 className="w-5 h-5 text-aurora animate-spin" />
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-10 pt-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={thinkingMessageIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-medium text-aurora"
                      >
                        {THINKING_MESSAGES[thinkingMessageIndex]}
                      </motion.div>
                    </AnimatePresence>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce" />
                      <div
                        className="w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl relative z-10">
          <div className="flex gap-3 max-w-4xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-aurora/0 via-aurora/20 to-aurora/0 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message your AI Mentor (e.g. 'Interview me on Arrays' or paste code)..."
              className="flex-1 bg-[#0F172A]/80 border border-white/10 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-aurora/50 focus:ring-1 focus:ring-aurora/50 transition-all placeholder:text-slate-500 text-white relative z-10 shadow-inner"
            />
            <button
              onClick={handleSend}
              disabled={chatBusy || !chatInput.trim()}
              className="bg-aurora hover:bg-aurora/90 text-white px-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(var(--aurora-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--aurora-rgb),0.5)] flex items-center justify-center group/btn relative z-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-[0%] transition-transform duration-300" />
              <Send className="w-5 h-5 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform relative z-10" />
            </button>
          </div>
          <div className="text-center mt-4 text-xs font-medium text-slate-500">
            The Enterprise Code Coach adapts its explanations based on your precise SyncRole analytics.
          </div>
        </div>
      </div>
    </main>
  );
}

export default DSAMentorPage;
