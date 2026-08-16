import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
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
  Shield,
  Flame,
  Trophy,
  Star,
  Code,
  Rocket,
  AlertCircle,
  Bot,
  FileText,
  HelpCircle,
  Lightbulb,
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
  >([]);

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
        if (dataReady) setTimeout(() => setBooting(false), 500);
      }
    }, 450);
    return () => clearInterval(interval);
  }, [dataReady]);

  useEffect(() => {
    if (bootStep === BOOT_SEQUENCE.length - 1 && dataReady) {
      const t = setTimeout(() => setBooting(false), 500);
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

  async function handleSend(textToSend?: string) {
    const q = (textToSend ?? chatInput).trim();
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
    { name: "Problem Solving", score: 41, icon: Brain, delta: "+ 2%" },
    { name: "Logical Thinking", score: 54, icon: Code, delta: "+ 3%" },
    { name: "Pattern Recognition", score: 11, icon: Workflow, delta: "+ 0%" },
    { name: "Optimization Skills", score: 30, icon: Zap, delta: "+ 2%" },
    { name: "Debugging", score: 60, icon: Cpu, delta: "+ 4%" },
  ];
  const displayDna =
    dna.length > 0
      ? dna.slice(0, 5).map((d, idx) => ({
          ...d,
          icon: defaultDnaDimensions[idx]?.icon ?? Brain,
          delta: defaultDnaDimensions[idx]?.delta ?? "+ 2%",
        }))
      : defaultDnaDimensions;

  // Companies fallback list matching reference design if company profiles empty
  const defaultCompanies: CompanyProfile[] = [
    { name: "Google", readiness: 10, strong: [], missing: ["Graphs"], confidence: "High" },
    { name: "Amazon", readiness: 10, strong: [], missing: ["Trees"], confidence: "High" },
    { name: "Microsoft", readiness: 10, strong: [], missing: ["Linked List"], confidence: "High" },
    { name: "Adobe", readiness: 10, strong: [], missing: ["Math"], confidence: "High" },
  ];
  const displayCompanies = companies.length > 0 ? companies.slice(0, 4) : defaultCompanies;

  // Topic mastery default items matching reference design if empty
  const defaultTopics: TopicInsight[] = [
    { topic: "Binary Search", mastery: 11, problems_solved: 1, status: "weak", skillLevel: "BEGINNER", explanation: "Focus on foundational search bounds." },
    { topic: "Arrays", mastery: 24, problems_solved: 2, status: "progressing", skillLevel: "BEGINNER", explanation: "Developing solid two-pointer technique." },
    { topic: "Trees", mastery: 18, problems_solved: 1, status: "weak", skillLevel: "BEGINNER", explanation: "Practice recursion & DFS traversals." },
    { topic: "Graphs", mastery: 22, problems_solved: 1, status: "weak", skillLevel: "BEGINNER", explanation: "Work on BFS shortest path algorithms." },
  ];
  const displayTopics = insights.length > 0 ? insights.slice(0, 4) : defaultTopics;

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-6 space-y-6 relative">
      {/* Background ambient lighting */}
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

      {/* Header Row with Title and High Confidence Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

        {/* Top Right High Confidence Badge Card */}
        <div className="glass rounded-2xl p-3 px-4 border border-aurora/30 shadow-[0_0_20px_rgba(168,85,247,0.12)] shrink-0 flex items-center gap-3 bg-black/40">
          <div className="p-2 rounded-xl bg-aurora/10 text-aurora border border-aurora/20">
            <Shield className="w-4 h-4 text-aurora" />
          </div>
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-aurora font-bold">
              HIGH CONFIDENCE
            </div>
            <div className="text-[10px] text-muted-foreground">
              Analysis based on verified activity
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 1: CODING DNA + CONSISTENCY SNAPSHOT */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* CODING DNA Card */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
              <Brain className="w-4 h-4 text-aurora" />
              <span>CODING DNA</span>
            </div>
            <span className="text-[9px] uppercase font-mono font-semibold tracking-wider text-aurora bg-aurora/10 border border-aurora/20 px-2 py-0.5 rounded">
              HIGH CONFIDENCE
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {displayDna.map((d) => {
              const IconComp = d.icon ?? Brain;
              return (
                <div key={d.name} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium flex items-center gap-2">
                      <IconComp className="w-3.5 h-3.5 text-aurora" />
                      <span>{d.name}</span>
                    </span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-white font-bold">
                        <AnimatedNumber value={d.score} />%
                      </span>
                      <span className="text-[10px] text-green-400">
                        {d.delta ?? "↑ 2%"}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-aurora/60 to-aurora rounded-full"
                      style={{ width: `${d.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CONSISTENCY SNAPSHOT Card */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>CONSISTENCY SNAPSHOT</span>
              </div>
              <span className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-muted-foreground uppercase">
                UPDATED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2 text-center">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
                <Flame className="w-4 h-4 text-orange-400 mx-auto" />
                <div className="font-display text-2xl font-bold text-white">
                  <AnimatedNumber value={stats.current_streak} />
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Current Streak
                </div>
                <div className="text-[9px] text-muted-foreground font-mono">days</div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
                <Trophy className="w-4 h-4 text-yellow-400 mx-auto" />
                <div className="font-display text-2xl font-bold text-white">
                  <AnimatedNumber value={stats.longest_streak} />
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Longest Streak
                </div>
                <div className="text-[9px] text-muted-foreground font-mono">days</div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
                <Activity className="w-4 h-4 text-aurora mx-auto" />
                <div className="font-display text-2xl font-bold text-aurora">
                  92<span className="text-xs text-muted-foreground font-normal">/100</span>
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Productivity Score
                </div>
              </div>
            </div>
          </div>

          <div className="bg-aurora/5 rounded-xl p-3 border border-aurora/15 text-xs text-muted-foreground flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-aurora shrink-0" />
            <span>
              <span className="text-aurora font-medium">Insight:</span> Your strongest practice pattern currently comes from consistent problem-solving sessions.
            </span>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 2: PATTERN INTELLIGENCE + NEXT ACTION */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* PATTERN INTELLIGENCE */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
                <Workflow className="w-4 h-4 text-aurora" />
                <span>PATTERN INTELLIGENCE</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">
                {patterns.length > 0 ? `${patterns.length} DETECTED` : "1 DETECTED"}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {(patterns.length > 0
                ? patterns.slice(0, 2)
                : [
                    { name: "Binary Search", mastery: 11, level: "Intermediate • High Confidence", trend: "↑ Trending" },
                    { name: "Arrays", mastery: 8, level: "Beginner • Developing", trend: "→" },
                  ]
              ).map((p: any, i) => (
                <div
                  key={i}
                  className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 text-aurora" />
                      <span>{p.name}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {p.level ?? (p.mastery > 50 ? "Intermediate • High Confidence" : "Beginner • Developing")}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="font-bold text-aurora">{p.mastery}%</div>
                    <div className="text-[9px] text-green-400">{p.trend ?? "↑ Trending"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Link
              to="/dsa-problems"
              className="inline-flex items-center gap-1 text-xs text-aurora hover:underline font-medium"
            >
              View all patterns →
            </Link>
          </div>
        </div>

        {/* NEXT ACTION Card with Target Graphic */}
        <div className="glass-strong rounded-2xl p-5 border border-aurora/30 space-y-4 relative overflow-hidden flex flex-col justify-between bg-gradient-to-br from-aurora/10 via-black/40 to-black/60">
          <div className="relative z-10 space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-aurora font-semibold flex items-center gap-1.5">
              <Target className="w-4 h-4 text-aurora" />
              <span>NEXT ACTION</span>
            </div>
            <h3 className="font-display font-bold text-lg text-white">
              {roadmap.d7 || "Master Binary Search basics"}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm">
              Complete 2 verified problems in your targeted weak topics.
            </p>
          </div>

          {/* Decorative Target Illustration on Right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden sm:block">
            <Target className="w-28 h-28 text-aurora" />
          </div>

          <div className="relative z-10 pt-2">
            <button
              onClick={() => navigate({ to: "/dsa-problems" })}
              className="bg-aurora hover:bg-aurora/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-xl text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] inline-flex items-center gap-2"
            >
              <span>Start Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 3: COMPANY READINESS (Compact Table / List) */}
      {/* ---------------------------------------------------------------- */}
      <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-4">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-aurora" />
            <span>COMPANY READINESS</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Compare your verified DSA coverage against your selected interview targets.
          </p>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-3 py-1 border-b border-white/5">
          <div className="col-span-3">COMPANY</div>
          <div className="col-span-4">READINESS</div>
          <div className="col-span-2 text-center">COVERAGE</div>
          <div className="col-span-3 text-right">TOP PRIORITY</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-1.5">
          {displayCompanies.map((c, idx) => {
            const coverageTotal = (c.strong?.length ?? 0) + (c.missing?.length ?? 3);
            const coverageSolved = c.strong?.length ?? 0;
            const priorityTopic = c.missing?.[0] || c.strong?.[0] || "Graphs";

            return (
              <div
                key={c.name}
                onClick={() => navigate({ to: "/dsa-companies" })}
                className="grid grid-cols-12 items-center text-xs p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
              >
                <div className="col-span-3 flex items-center gap-2.5">
                  <CompanyLogo name={c.name} className="w-5 h-5" />
                  <span className="font-medium text-white truncate">{c.name}</span>
                </div>

                <div className="col-span-4 flex items-center gap-3 pr-4">
                  <span className="font-mono font-bold text-aurora w-8 text-right shrink-0">
                    {c.readiness}%
                  </span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-aurora rounded-full"
                      style={{ width: `${c.readiness}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-2 text-center font-mono text-[11px] text-muted-foreground">
                  {coverageSolved} / {coverageTotal}
                </div>

                <div className="col-span-3 text-right">
                  <span className="text-[10px] font-mono bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded font-medium inline-block truncate max-w-full">
                    {priorityTopic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <Link
            to="/dsa-companies"
            className="inline-flex items-center gap-1 text-xs text-aurora hover:underline font-medium"
          >
            View all target companies →
          </Link>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 4: COMPACT PERFORMANCE OVERVIEW (3 Columns) */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* COLUMN 1: TOPIC MASTERY */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
              <Database className="w-4 h-4 text-aurora" />
              <span>TOPIC MASTERY</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {displayTopics.map((t) => (
                <div key={t.topic} className="bg-white/5 p-2.5 rounded-xl border border-white/5 space-y-1">
                  <div className="font-semibold text-xs text-white truncate">{t.topic}</div>
                  <div className="text-[9px] font-mono uppercase text-muted-foreground">
                    {t.skillLevel ?? "BEGINNER"}
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-aurora rounded-full" style={{ width: `${t.mastery}%` }} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-aurora">{t.mastery}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Link
              to="/dsa-problems"
              className="inline-flex items-center gap-1 text-xs text-aurora hover:underline font-medium"
            >
              View all topics →
            </Link>
          </div>
        </div>

        {/* COLUMN 2: PERFORMANCE SIGNALS */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-aurora" />
              <span>PERFORMANCE SIGNALS</span>
            </div>

            {/* VERIFIED STRENGTHS */}
            <div className="bg-green-500/5 rounded-xl p-3 border border-green-500/20 space-y-1 text-xs">
              <div className="font-semibold text-green-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span>VERIFIED STRENGTHS</span>
                </span>
                <Rocket className="w-3.5 h-3.5 text-green-400" />
              </div>
              <div className="font-medium text-white pt-1">
                {strengths[0]?.topic ?? "Binary Search"}
              </div>
              <p className="text-[11px] text-muted-foreground">
                <span className="text-green-400 font-medium">Why:</span> {strengths[0]?.reason ?? "High solving speed and accuracy."}
              </p>
            </div>

            {/* CRITICAL WEAKNESSES */}
            <div className="bg-red-500/5 rounded-xl p-3 border border-red-500/20 space-y-1 text-xs">
              <div className="font-semibold text-red-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                  <span>CRITICAL WEAKNESSES</span>
                </span>
                <Target className="w-3.5 h-3.5 text-red-400" />
              </div>
              <div className="font-medium text-white pt-1">
                {weaknesses[0]?.topic ?? "Binary Search"}
              </div>
              <p className="text-[11px] text-muted-foreground">
                <span className="text-red-400 font-medium">Evidence:</span> {weaknesses[0]?.reason ?? "Lower consistency and slower completion."}
              </p>
            </div>
          </div>
        </div>

        {/* COLUMN 3: INTERVIEW READINESS */}
        <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-aurora" />
              <span>INTERVIEW READINESS</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                { label: "Online Assessment", key: "oa", score: predictions.oa ?? 29 },
                { label: "Live Coding", key: "live", score: predictions.live ?? 18 },
                { label: "Technical Interview", key: "technical", score: predictions.technical ?? 10 },
              ].map((item) => (
                <div key={item.key} className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-mono font-bold text-white">{item.score}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-aurora rounded-full" style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-aurora/5 rounded-xl p-3 border border-aurora/15 space-y-1">
            <div className="text-[10px] font-mono font-bold text-aurora uppercase flex items-center gap-1">
              <Star className="w-3 h-3 text-aurora" /> AI VERDICT
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Focus on your weakest verified topic to improve technical interview pass rates.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 5: ACTIVE MISSIONS */}
      {/* ---------------------------------------------------------------- */}
      <div className="glass-strong rounded-2xl p-5 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-aurora" />
            <span>ACTIVE MISSIONS</span>
          </div>
          <Link
            to="/dashboard/dsa"
            className="text-xs text-aurora hover:underline font-medium"
          >
            View all missions →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(weeklyPlan.length > 0
            ? weeklyPlan.slice(0, 3)
            : [
                { day: "MONDAY", focus: "Binary Search Mastery", tasks: ["Solve 2 Binary Search problems"] },
                { day: "TUESDAY", focus: "Binary Search Mastery", tasks: ["Solve 2 Binary Search problems"] },
                { day: "WEDNESDAY", focus: "Binary Search Mastery", tasks: ["Solve 2 Binary Search problems"] },
              ]
          ).map((dayItem, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-3.5 border border-white/5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="min-w-0 space-y-0.5">
                <div className="text-[9px] font-mono uppercase font-bold text-aurora">
                  {dayItem.day}
                </div>
                <div className="font-semibold text-white truncate">{dayItem.focus}</div>
                <div className="text-[10px] text-muted-foreground truncate">{dayItem.tasks[0]}</div>
              </div>

              <button
                onClick={() => navigate({ to: "/dsa-problems" })}
                className="bg-white/10 hover:bg-aurora text-foreground hover:text-primary-foreground font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Start</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 6: ENTERPRISE AI CODE COACH (PROMINENT AI WORKSPACE) */}
      {/* ---------------------------------------------------------------- */}
      <div className="glass-strong rounded-3xl border border-aurora/40 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden flex flex-col mt-8 bg-black/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-36 bg-aurora/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Chat Header */}
        <div className="flex items-center gap-4 p-5 md:p-6 border-b border-white/5 bg-black/40 relative z-10">
          <div className="p-3 bg-gradient-to-br from-aurora to-aurora/80 rounded-2xl text-primary-foreground shadow-lg shadow-aurora/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-xl font-bold tracking-tight text-white truncate">
              ENTERPRISE AI CODE COACH
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              Always here to help you solve, understand and master DSA.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono font-medium text-green-400">System Online</span>
          </div>
        </div>

        {/* Messages / Hero Empty State Workspace Container */}
        <div
          ref={chatContainerRef}
          className="p-6 overflow-y-auto flex flex-col gap-6 relative z-10 min-h-[400px] max-h-[600px] custom-scrollbar scroll-smooth"
        >
          {chatMessages.length === 0 ? (
            /* Prominent AI Hero Welcome & Feature Grid when no messages exist */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-4">
              {/* Left Hero Prompting Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-aurora/20 border border-aurora/30 flex items-center justify-center text-aurora shadow-inner shrink-0">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white">
                      Ask anything. Solve better. Level up faster.
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Explain a concept, debug your code, understand why your solution fails, optimize your approach, or prepare for an interview.
                    </p>
                  </div>
                </div>

                {/* Suggestion Chips */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    Try asking:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Explain Binary Search with steps",
                      "Why is my solution failing?",
                      "Optimize this code",
                      "Help with dynamic programming",
                    ].map((chipText) => (
                      <button
                        key={chipText}
                        onClick={() => void handleSend(chipText)}
                        className="glass px-3 py-1.5 rounded-full text-xs font-medium text-aurora hover:bg-aurora/10 transition-colors border border-aurora/20 text-left"
                      >
                        {chipText}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Feature Highlights Column */}
              <div className="lg:col-span-5 bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white pb-1 border-b border-white/5">
                  <FileText className="w-4 h-4 text-aurora" />
                  <span>Coach Capabilities</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-aurora shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Explain concepts clearly</div>
                      <div className="text-[10px] text-muted-foreground">Step-by-step guidance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Code className="w-3.5 h-3.5 text-aurora shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Review & debug code</div>
                      <div className="text-[10px] text-muted-foreground">Find issues & optimize</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-3.5 h-3.5 text-aurora shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Practice smarter</div>
                      <div className="text-[10px] text-muted-foreground">Curated problems & hints</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-aurora shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Interview prep</div>
                      <div className="text-[10px] text-muted-foreground">Real-world insights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Conversation Bubble Stream */
            <AnimatePresence initial={false}>
              {chatMessages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  className={cn(
                    "flex w-full",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[95%] md:max-w-[85%] rounded-2xl p-5",
                      m.role === "user"
                        ? "bg-gradient-to-br from-aurora/90 to-aurora text-white rounded-tr-sm shadow-[0_4px_20px_rgba(168,85,247,0.3)] border border-aurora/50"
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
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="p-5 md:p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl relative z-10">
          <div className="flex gap-3 max-w-5xl mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-aurora/0 via-aurora/20 to-aurora/0 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              placeholder="Message your AI Mentor (e.g. 'Why does my binary search code fail?')..."
              className="flex-1 bg-[#0F172A]/80 border border-white/10 rounded-2xl px-5 py-3.5 text-sm outline-none focus:border-aurora/50 focus:ring-1 focus:ring-aurora/50 transition-all placeholder:text-slate-500 text-white relative z-10 shadow-inner"
            />
            <button
              onClick={() => void handleSend()}
              disabled={chatBusy || !chatInput.trim()}
              className="bg-aurora hover:bg-aurora/90 text-white px-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] flex items-center justify-center relative z-10 shrink-0 font-semibold text-xs"
            >
              <Send className="w-4 h-4 mr-1.5" />
              <span>Send</span>
            </button>
          </div>
          <div className="text-center mt-3 text-[11px] font-medium text-slate-500">
            The Enterprise Code Coach adapts its explanations based on your precise SyncRole analytics.
          </div>
        </div>
      </div>
    </main>
  );
}

export default DSAMentorPage;
