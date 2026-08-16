import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
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
  Clock,
  Compass,
  Database,
  Workflow,
  Cpu,
  Loader2,
  CheckCircle2,
  ShieldCheck,
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
  Layers,
  Bug,
  Grid,
  BookOpen,
  MessageSquareCode,
  Search,
  GitBranch,
  Network,
  Hash,
  Copy,
  Check,
  CheckCheck,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Lock,
  ArrowLeftRight,
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

// Company Logo Component with Initial Avatar Fallback
function CompanyLogo({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = COMPANY_LOGOS[name];
  const initial = name ? name.charAt(0).toUpperCase() : "C";

  if (!logoUrl || failed) {
    return (
      <div
        className={`${className} rounded-md bg-aurora/20 border border-aurora/30 flex items-center justify-center font-display font-bold text-aurora text-[11px] shrink-0 select-none`}
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

// Semantic Icon Resolver for DSA Topics & Patterns
function getTopicPatternIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("binary") || n.includes("search")) return Search;
  if (n.includes("array") || n.includes("matrix") || n.includes("grid")) return Grid;
  if (n.includes("tree")) return GitBranch;
  if (n.includes("graph") || n.includes("network")) return Network;
  if (n.includes("dynamic") || n.includes("dp")) return Cpu;
  if (n.includes("hash") || n.includes("map") || n.includes("set")) return Hash;
  if (n.includes("string")) return FileText;
  return Star;
}

function DSAMentorPage() {
  const navigate = useNavigate();

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
    Array<{ role: "user" | "assistant"; content: string; id: string; timestamp?: string }>
  >([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, "like" | "dislike">>({});

  const handleCopy = (id: string, content: string) => {
    void navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFeedback = (id: string, type: "like" | "dislike") => {
    setFeedbackMap((prev) => ({
      ...prev,
      [id]: prev[id] === type ? (undefined as any) : type,
    }));
  };

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
        }
      } catch (err) {
        console.error("Error loading DSA Mentor data:", err);
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
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatInput("");
    setChatMessages((m) => [...m, { role: "user", content: q, id: Date.now().toString(), timestamp: timeStr }]);
    setChatBusy(true);

    try {
      const { reply } = await OpenRouterService.invokeChat(q, fullAnalytics);
      const replyTimeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setChatMessages((m) => [
        ...m,
        { role: "assistant", content: reply, id: (Date.now() + 1).toString(), timestamp: replyTimeStr },
      ]);
    } catch (err) {
      console.error(err);
      const errTimeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setChatMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I encountered an error connecting to my neural core. Please try again.",
          id: Date.now().toString(),
          timestamp: errTimeStr,
        },
      ]);
    } finally {
      setChatBusy(false);
    }
  }

  // Pre-formatted DNA dimensions fallback matching reference image
  const defaultDnaDimensions = [
    { name: "Problem Solving", score: 41, icon: Brain, delta: "↑ 2%" },
    { name: "Logical Thinking", score: 54, icon: Code2, delta: "↑ 3%" },
    { name: "Pattern Recognition", score: 11, icon: Layers, delta: "↑ 0%" },
    { name: "Optimization Skills", score: 30, icon: Zap, delta: "↑ 2%" },
    { name: "Debugging", score: 60, icon: Bug, delta: "↑ 4%" },
  ];
  const displayDna =
    dna.length > 0
      ? dna.slice(0, 5).map((d, idx) => ({
          ...d,
          icon: defaultDnaDimensions[idx]?.icon ?? Brain,
          delta: defaultDnaDimensions[idx]?.delta ?? "↑ 2%",
        }))
      : defaultDnaDimensions;

  // Companies fallback list matching reference design
  const defaultCompanies: CompanyProfile[] = [
    { name: "Google", readiness: 10, strong: [], missing: ["Graphs"], confidence: "High" },
    { name: "Amazon", readiness: 10, strong: [], missing: ["Trees"], confidence: "High" },
    { name: "Microsoft", readiness: 10, strong: [], missing: ["Linked List"], confidence: "High" },
    { name: "Adobe", readiness: 10, strong: [], missing: ["Math"], confidence: "High" },
  ];
  const displayCompanies = companies.length > 0 ? companies.slice(0, 4) : defaultCompanies;

  // Topic mastery default items matching reference design
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

      {/* Hero Header & High Confidence Card */}
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

        {/* Top Right High Confidence Shield Card matching Reference */}
        <div className="glass rounded-2xl p-3.5 px-4 border border-aurora/40 shadow-[0_0_25px_rgba(168,85,247,0.15)] shrink-0 flex items-center gap-3 bg-black/40 select-none">
          <div className="p-2.5 rounded-xl bg-aurora/15 text-aurora border border-aurora/30 shadow-inner">
            <ShieldCheck className="w-5 h-5 text-aurora" />
          </div>
          <div className="space-y-0.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-white font-bold">
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

          <div className="space-y-3.5 pt-1">
            {displayDna.map((d) => {
              const IconComp = d.icon ?? Brain;
              const numericValue = typeof d.score === "number" ? d.score : 0;
              const barWidthPercent = Math.min(Math.max(numericValue, 0), 100);

              return (
                <div key={d.name} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium flex items-center gap-2">
                      <div className="p-1 rounded bg-aurora/10 border border-aurora/20 shrink-0 text-aurora">
                        <IconComp className="w-3.5 h-3.5 text-aurora" />
                      </div>
                      <span>{d.name}</span>
                    </span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-white font-bold">
                        <AnimatedNumber value={numericValue} />%
                      </span>
                      {d.delta && (
                        <span className="text-[10px] text-green-400 font-semibold">
                          {d.delta}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 via-aurora to-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.4)] transition-all duration-500"
                      style={{ width: `${barWidthPercent}%` }}
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
                <Flame className="w-5 h-5 text-orange-400 mx-auto" />
                <div className="font-display text-2xl font-bold text-white">
                  <AnimatedNumber value={stats.current_streak} />
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Current Streak
                </div>
                <div className="text-[9px] text-muted-foreground font-mono">days</div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
                <Trophy className="w-5 h-5 text-yellow-400 mx-auto" />
                <div className="font-display text-2xl font-bold text-white">
                  <AnimatedNumber value={stats.longest_streak} />
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Longest Streak
                </div>
                <div className="text-[9px] text-muted-foreground font-mono">days</div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/5 space-y-1">
                <TrendingUp className="w-5 h-5 text-cyan-400 mx-auto" />
                <div className="font-display text-2xl font-bold text-white">
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
              ).map((p: any, i) => {
                const PatternIconComp = getTopicPatternIcon(p.name);
                return (
                  <div
                    key={i}
                    className="bg-white/5 p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <div className="p-1 rounded bg-aurora/10 text-aurora">
                          <PatternIconComp className="w-3.5 h-3.5 text-aurora" />
                        </div>
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
                );
              })}
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

          {/* Target Illustration on Right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none hidden sm:block">
            <Target className="w-28 h-28 text-aurora" />
          </div>

          <div className="relative z-10 pt-2">
            <button
              onClick={() => navigate({ to: "/dsa-problems" })}
              className="bg-gradient-to-r from-aurora to-blue-500 hover:from-aurora/90 hover:to-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] inline-flex items-center gap-2"
            >
              <span>Start Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* SECTION 3: COMPANY READINESS (Wide Table Format) */}
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
          {displayCompanies.map((c) => {
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
                  <span className="font-mono font-bold text-white w-8 text-right shrink-0">
                    {c.readiness}%
                  </span>
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-aurora to-cyan-400 rounded-full"
                      style={{ width: `${Math.min(Math.max(c.readiness, 0), 100)}%` }}
                    />
                  </div>
                </div>

                <div className="col-span-2 text-center font-mono text-[11px] text-muted-foreground">
                  {coverageSolved} / {coverageTotal}
                </div>

                <div className="col-span-3 text-right">
                  <span className="text-[10px] font-mono bg-aurora/15 text-aurora border border-aurora/30 px-2.5 py-0.5 rounded font-medium inline-block truncate max-w-full">
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
                      <div className="h-full bg-aurora rounded-full" style={{ width: `${Math.min(Math.max(t.mastery, 0), 100)}%` }} />
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
            <div className="bg-green-950/30 rounded-xl p-3 border border-green-500/30 space-y-1 text-xs">
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
            <div className="bg-red-950/30 rounded-xl p-3 border border-red-500/30 space-y-1 text-xs">
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
                    <div className="h-full bg-gradient-to-r from-aurora to-purple-500 rounded-full" style={{ width: `${Math.min(Math.max(item.score, 0), 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-aurora/10 rounded-xl p-3 border border-aurora/20 space-y-1">
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
                <div className="text-[9px] font-mono uppercase font-bold text-aurora flex items-center gap-1">
                  <CalendarDays className="w-3 h-3 text-aurora" />
                  <span>{dayItem.day}</span>
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
      {/* SECTION 6: AI CODE COACH WORKSPACE */}
      {/* ---------------------------------------------------------------- */}
      <div className="rounded-2xl border border-[#1e202e] bg-[#0b0c10] shadow-2xl relative overflow-hidden flex flex-col mt-8 text-slate-100">
        {/* Subtle top glow accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-[#1a1c29] bg-[#0b0c10]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#171527] border border-[#2a2444] flex items-center justify-center text-purple-400 shrink-0">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <div className="space-y-0.5">
              <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>AI Code Coach</span>
              </h2>
              <p className="text-xs text-slate-400">
                Always here to help you solve, understand and master DSA.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-medium">System Online</span>
          </div>
        </div>

        {/* Messages / Hero Empty State Workspace Container */}
        <div
          ref={chatContainerRef}
          className="p-4 md:p-6 overflow-y-auto flex flex-col gap-5 min-h-[360px] max-h-[580px] custom-scrollbar scroll-smooth"
        >
          {chatMessages.length === 0 ? (
            /* Prominent AI Hero Welcome & Feature Grid when no messages exist */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center py-4">
              {/* Left Hero Prompting Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#171527] border border-[#2a2444] flex items-center justify-center text-purple-400 shrink-0">
                    <Bot className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-lg md:text-xl text-white">
                      Ask anything. Solve better. Level up faster.
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                      Explain a concept, debug your code, understand why your solution fails, optimize your approach, or prepare for an interview.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Feature Highlights Column */}
              <div className="lg:col-span-5 bg-[#12131c] rounded-xl p-4 border border-[#20222f] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-white pb-2 border-b border-white/5 font-mono">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Coach Capabilities</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Explain concepts clearly</div>
                      <div className="text-[10px] text-slate-400">Step-by-step guidance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Bug className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Review & debug code</div>
                      <div className="text-[10px] text-slate-400">Find issues & optimize</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Practice smarter</div>
                      <div className="text-[10px] text-slate-400">Curated problems & hints</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquareCode className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">Interview prep</div>
                      <div className="text-[10px] text-slate-400">Real-world insights</div>
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "flex w-full",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {m.role === "user" ? (
                    /* User Message Bubble */
                    <div className="max-w-[85%] md:max-w-[70%] bg-[#1c162e] border border-[#30254c] text-white rounded-2xl rounded-tr-xs p-4 shadow-sm space-y-1.5">
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {m.content}
                      </div>
                      <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-400 font-mono">
                        <span>{m.timestamp || "11:47 AM"}</span>
                        <CheckCheck className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                    </div>
                  ) : (
                    /* Assistant Message Bubble */
                    <div className="flex items-start gap-3 max-w-[95%] md:max-w-[85%]">
                      <div className="w-9 h-9 rounded-xl bg-[#171527] border border-[#2a2444] flex items-center justify-center text-purple-400 shrink-0 mt-1">
                        <Bot className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="bg-[#12131c] border border-[#20222f] text-slate-200 rounded-2xl rounded-tl-xs p-4 md:p-5 space-y-3 shadow-sm flex-1 min-w-0">
                        <MarkdownRenderer content={m.content} />
                        <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-slate-400 font-mono">
                          <span>{m.timestamp || "11:47 AM"}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCopy(m.id, m.content)}
                              title="Copy response"
                              className="p-1.5 hover:bg-white/5 rounded-md hover:text-white transition-colors"
                            >
                              {copiedId === m.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleFeedback(m.id, "like")}
                              title="Helpful"
                              className={cn(
                                "p-1.5 hover:bg-white/5 rounded-md hover:text-white transition-colors",
                                feedbackMap[m.id] === "like" && "text-purple-400"
                              )}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleFeedback(m.id, "dislike")}
                              title="Not helpful"
                              className={cn(
                                "p-1.5 hover:bg-white/5 rounded-md hover:text-white transition-colors",
                                feedbackMap[m.id] === "dislike" && "text-red-400"
                              )}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {chatBusy && (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="flex items-start gap-3 max-w-[85%]"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#171527] border border-[#2a2444] flex items-center justify-center text-purple-400 shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
                  </div>
                  <div className="bg-[#12131c] border border-[#20222f] text-slate-300 rounded-2xl rounded-tl-xs p-4 flex items-center gap-3 shadow-sm">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={thinkingMessageIndex}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs font-medium text-purple-300"
                      >
                        {THINKING_MESSAGES[thinkingMessageIndex]}
                      </motion.div>
                    </AnimatePresence>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce" />
                      <div
                        className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Try asking: Quick Prompts Row */}
        <div className="px-4 md:px-6 pt-3 pb-2 border-t border-[#1a1c29] bg-[#0b0c10] space-y-2">
          <div className="text-[11px] font-mono text-slate-400 font-medium">
            Try asking:
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                text: "Explain DP with an example",
                icon: Lightbulb,
                iconColor: "text-amber-400",
              },
              {
                text: "Solve 0/1 Knapsack",
                icon: Lock,
                iconColor: "text-amber-400",
              },
              {
                text: "Why does my DP code fail?",
                icon: HelpCircle,
                iconColor: "text-purple-400",
              },
              {
                text: "Memoization vs Tabulation",
                icon: ArrowLeftRight,
                iconColor: "text-cyan-400",
              },
              {
                text: "Optimize this DP solution",
                icon: Zap,
                iconColor: "text-purple-400",
              },
            ].map((qp) => {
              const IconComponent = qp.icon;
              return (
                <button
                  key={qp.text}
                  onClick={() => void handleSend(qp.text)}
                  disabled={chatBusy}
                  className="bg-[#12131c] hover:bg-[#1c1d2c] disabled:opacity-50 text-slate-300 hover:text-white border border-[#222436] px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer flex items-center gap-2"
                >
                  <IconComponent className={cn("w-3.5 h-3.5 shrink-0", qp.iconColor)} />
                  <span>{qp.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 md:p-5 border-t border-[#1a1c29] bg-[#0b0c10]">
          <div className="flex items-center gap-2 bg-[#0e0f17] border border-[#20222e] rounded-full p-1.5 pl-4 focus-within:border-purple-500/40 transition-colors">
            <Paperclip className="w-4 h-4 text-slate-400 shrink-0 cursor-pointer hover:text-white transition-colors" />
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void handleSend();
                }
              }}
              placeholder="Ask your AI Coding Coach anything — paste code, explain an error, or ask about DSA..."
              className="flex-1 bg-transparent border-none text-xs md:text-sm text-white placeholder:text-slate-500 focus:outline-none px-2"
            />
            <button
              onClick={() => void handleSend()}
              disabled={chatBusy || !chatInput.trim()}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-40 text-white px-5 py-2 rounded-full font-medium text-xs flex items-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
          <div className="text-center mt-3 text-[11px] font-medium text-slate-500 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-slate-400" />
            <span>The AI Code Coach adapts its explanations based on your precise SyncRole analytics.</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DSAMentorPage;

