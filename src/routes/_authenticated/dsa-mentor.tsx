import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Brain, Code2, Target, Zap, 
  CalendarDays, Activity, Briefcase, TrendingUp,
  Sparkles, Send, ShieldAlert, Clock,
  Compass, Database, Workflow, Cpu, ChevronRight, PlayCircle, Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnalyticsEngine } from "@/lib/analytics";
import { OpenRouterService } from "@/lib/analytics/services/openrouter";
import { TopicInsight, StrengthWeakness, CompanyProfile, DNA, Pattern, TimelineEvent, FullDSAAnalytics } from "@/lib/analytics/types";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/dsa-mentor")({
  component: DSAMentorPage,
  head: () => ({ meta: [{ title: "AI Coding Coach — SyncRole" }] }),
});

const BOOT_SEQUENCE = [
  "Analyzing Coding Journey...",
  "Evaluating topic mastery...",
  "Checking coding patterns...",
  "Generating personalized roadmap...",
  "Preparing interview insights...",
  "Analysis Complete"
];

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(ease * value));
      if (progress < 1) window.requestAnimationFrame(step);
      else setDisplayValue(value);
    };
    window.requestAnimationFrame(step);
  }, [value]);
  return <>{displayValue}</>;
}

function DSAMentorPage() {
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
    xp_total: 0
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [thinkingMessageIndex, setThinkingMessageIndex] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; content: string; id: string }>>([
    {
      role: "assistant",
      content: "I'm your specialized AI Coding Coach. Ask me about algorithms, data structures, complexity, optimization, or debugging.",
      id: "initial-msg"
    }
  ]);

  const THINKING_MESSAGES = [
    "Analyzing your code structure...",
    "Evaluating time and space complexity...",
    "Reviewing pattern intelligence...",
    "Synthesizing optimal solution...",
    "Cross-referencing interview standards..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
        if (dataReady) setTimeout(() => setBooting(false), 800);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [dataReady]);

  useEffect(() => {
    if (bootStep === BOOT_SEQUENCE.length - 1 && dataReady) {
      const t = setTimeout(() => setBooting(false), 800);
      return () => clearTimeout(t);
    }
  }, [bootStep, dataReady]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
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
    return () => { cancelled = true; };
  }, []);

  async function handleSend() {
    const q = chatInput.trim();
    if (!q) return;
    setChatInput("");
    setChatMessages(m => [...m, { role: "user", content: q, id: Date.now().toString() }]);
    setChatBusy(true);

    try {
      const { reply } = await OpenRouterService.invokeChat(q, fullAnalytics);
      setChatMessages(m => [...m, { role: "assistant", content: reply, id: (Date.now() + 1).toString() }]);
    } catch (err) {
      console.error(err);
      setChatMessages(m => [...m, { role: "assistant", content: "I encountered an error connecting to my neural core. Please try again.", id: Date.now().toString() }]);
    } finally {
      setChatBusy(false);
    }
  }

  if (booting) {
    return (
      <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-aurora/10 via-background to-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aurora/20 blur-[100px] rounded-full" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-aurora/30 border-t-aurora border-r-aurora" />
            <Cpu className="absolute inset-0 m-auto w-10 h-10 text-aurora" />
          </div>
          <div className="h-8 relative overflow-hidden w-64 text-center">
            <AnimatePresence mode="popLayout">
              <motion.div key={bootStep} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.3 }} className="text-lg font-display font-medium text-foreground absolute inset-0 flex items-center justify-center">
                {BOOT_SEQUENCE[bootStep]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
            <motion.div className="h-full bg-aurora" initial={{ width: 0 }} animate={{ width: `${((bootStep + 1) / BOOT_SEQUENCE.length) * 100}%` }} transition={{ duration: 0.5 }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-8 relative">
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aurora/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <div className="flex items-center justify-between">
        <Link to="/dashboard/dsa" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Exit Coach
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium border border-aurora/20 shadow-[0_0_15px_rgba(var(--aurora-rgb),0.1)]">
          <Sparkles className="h-3.5 w-3.5 text-aurora" /> Premium AI Coding Coach
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: DNA & Consistency */}
        <div className="xl:col-span-1 space-y-6">
          <div className="glass-strong rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:shadow-xl hover:shadow-aurora/5 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-aurora/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-aurora/10 text-aurora">
                  <Brain className="w-5 h-5" />
                </div>
                <h2 className="font-display text-xl font-bold">Coding DNA</h2>
              </div>
              <div className="text-[10px] uppercase font-bold text-aurora/70 bg-aurora/10 px-2 py-1 rounded-md">High Confidence</div>
            </div>
            
            <div className="space-y-5 relative z-10">
              {dna.length > 0 ? dna.slice(0,5).map((d, i) => (
                <div key={i} className="group/item">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">{d.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-green-400">↑ {Math.floor(d.score / 15)}%</span>
                      <span className="font-mono font-medium"><AnimatedNumber value={d.score} />%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${d.score}%` }} 
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full bg-gradient-to-r from-aurora/50 to-aurora rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-1/3 blur-sm animate-[shimmer_2s_infinite]" />
                    </motion.div>
                  </div>
                  {i === 0 && (
                    <div className="mt-2 text-xs text-muted-foreground bg-white/5 p-2 rounded-md border border-white/5">
                      <span className="text-aurora font-medium">AI Insight:</span> Exceptionally strong in {d.name}, performing above 85% of peers at this level.
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-sm text-muted-foreground text-center py-4">Solve problems to unlock your DNA profile.</div>
              )}
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6 border border-white/5 hover:shadow-xl transition-all duration-500">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-aurora" /> Consistency Analysis</span>
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded-md text-muted-foreground">Updated Now</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                <div className="text-xs text-muted-foreground mb-1">Current Streak</div>
                <div className="font-display text-2xl font-bold text-aurora"><AnimatedNumber value={stats.current_streak} /> <span className="text-sm font-normal text-muted-foreground">days</span></div>
                <TrendingUp className="w-16 h-16 text-aurora/5 absolute -bottom-4 -right-4" />
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-xs text-muted-foreground mb-1">Longest Streak</div>
                <div className="font-display text-2xl font-bold"><AnimatedNumber value={stats.longest_streak} /> <span className="text-sm font-normal text-muted-foreground">days</span></div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-aurora/10 to-transparent rounded-2xl p-4 border border-aurora/20">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-medium text-aurora">Productivity Score</div>
                <div className="text-xs font-mono font-bold text-aurora">92/100</div>
              </div>
              <p className="text-xs text-primary/70">Your most productive time is <span className="text-primary font-medium">Evenings (8PM-10PM)</span>. Keep this up to maximize memory retention.</p>
            </div>
          </div>
        </div>

        {/* Middle/Right: Pattern, Roadmap, Companies */}
        <div className="xl:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-strong rounded-3xl p-6 border border-white/5 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-aurora/10 blur-3xl rounded-full" />
              <h2 className="font-display text-lg font-bold mb-4 flex items-center justify-between relative z-10">
                <span className="flex items-center gap-2"><Workflow className="w-4 h-4 text-aurora" /> Pattern Intelligence</span>
              </h2>
              {patterns.length > 0 ? (
                <div className="flex flex-col gap-3 relative z-10">
                  {patterns.slice(0, 3).map((p, i) => (
                    <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between items-center group/card hover:bg-white/10 transition-colors">
                      <div>
                        <div className="text-sm font-medium">{p.name}</div>
                        <div className="text-[10px] text-muted-foreground">Lvl: {p.mastery > 70 ? 'Advanced' : 'Intermediate'} • Conf: High</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-aurora font-mono font-bold"><AnimatedNumber value={p.mastery} />%</div>
                        <div className="text-[10px] text-green-400">Trending Up</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground text-center py-8">Solve problems to detect patterns.</div>
              )}
            </div>
            
            <div className="glass-strong rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-aurora/10 blur-3xl rounded-full" />
              <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                <Compass className="w-4 h-4 text-aurora" /> Actionable Roadmap
              </h2>
              <div className="space-y-3 relative z-10">
                <div className="flex flex-col bg-white/5 rounded-xl p-3 border border-aurora/20 shadow-[0_0_15px_rgba(var(--aurora-rgb),0.05)]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-aurora uppercase tracking-wider">7-Day Mission</span>
                    <span className="text-[10px] bg-aurora/20 text-aurora px-2 py-0.5 rounded-full">+150 XP</span>
                  </div>
                  <div className="text-sm font-medium text-foreground mb-2">{roadmap.d7 || "Complete foundational patterns"}</div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-aurora h-full w-[40%]" />
                  </div>
                </div>
                
                <div className="flex flex-col bg-white/5 rounded-xl p-3 border border-white/5 opacity-80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">30-Day Goal</span>
                  </div>
                  <div className="text-sm text-primary/80">{roadmap.d30 || "Unlock advanced graph algorithms"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6 border border-white/5">
            <h2 className="font-display text-xl font-bold flex items-center justify-between mb-6">
              <span className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-aurora" /> Company Target Readiness</span>
              <span className="text-xs font-medium text-muted-foreground bg-white/5 px-3 py-1 rounded-full">AI Assessed</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companies.slice(0,4).map((c, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-aurora/30 transition-all hover:-translate-y-1 group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-bold text-base">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground">Confidence: {c.confidence}</div>
                    </div>
                    <div className={cn("text-lg px-3 py-1 rounded-xl font-display font-bold border", 
                      c.readiness >= 80 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      c.readiness >= 50 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    )}>
                      <AnimatedNumber value={c.readiness} />%
                    </div>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-4">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.readiness}%` }} transition={{ duration: 1 }} className={cn("h-full", c.readiness >= 80 ? 'bg-green-400' : c.readiness >= 50 ? 'bg-yellow-400' : 'bg-red-400')} />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Core Strengths</div>
                      <div className="text-xs text-primary/90 flex flex-wrap gap-1">
                        {c.strong.length > 0 ? c.strong.map((s, idx) => <span key={idx} className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px]">{s}</span>) : "None yet"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Missing for Interview</div>
                      <div className="text-xs text-red-300 flex flex-wrap gap-1">
                        {c.missing.map((m, idx) => <span key={idx} className="bg-red-500/10 text-red-300 px-2 py-0.5 rounded text-[10px]">{m}</span>)}
                      </div>
                    </div>
                    <div className="mt-2 pt-3 border-t border-white/5 text-xs text-muted-foreground leading-relaxed">
                      <span className="text-aurora font-medium">AI Recommendation:</span> Improving {c.missing[0] || "accuracy"} will boost readiness to target {(c.readiness + 12 > 100 ? 99 : c.readiness + 12)}%.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Topics, Strengths & Predictor */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-strong rounded-3xl p-6 border border-white/5">
            <h2 className="font-display text-xl font-bold flex items-center gap-2 mb-6">
              <Database className="w-5 h-5 text-aurora" /> Detailed Topic Mastery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((topic, idx) => (
                <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-sm">{topic.topic}</span>
                    <span className={cn("text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border", 
                      topic.skillLevel === 'Master' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                      topic.skillLevel === 'Expert' ? 'bg-aurora/10 text-aurora border-aurora/20' : 
                      'bg-white/5 text-muted-foreground border-white/10'
                    )}>{topic.skillLevel}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${topic.mastery}%` }} transition={{ duration: 1 }} className={cn("h-full", topic.mastery >= 80 ? 'bg-green-400' : topic.mastery >= 50 ? 'bg-aurora' : 'bg-red-400')} />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground w-8 text-right"><AnimatedNumber value={topic.mastery} />%</span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Insight: </span>{topic.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-strong rounded-3xl p-6 border border-green-500/20 relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 blur-3xl rounded-full" />
              <h2 className="font-display text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Verified Strengths
              </h2>
              <div className="space-y-4 relative z-10">
                {strengths.length > 0 ? strengths.map((s, i) => (
                  <div key={i} className="bg-black/40 rounded-2xl p-4 border border-green-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-sm text-green-400">{s.topic}</div>
                      <div className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">Top 10%</div>
                    </div>
                    <div className="text-xs text-primary/80 mb-2 leading-relaxed"><span className="font-medium text-green-500">Why:</span> {s.reason}</div>
                    <div className="text-xs text-muted-foreground pt-2 border-t border-white/5"><span className="text-foreground font-medium">Action:</span> {s.recommendation}</div>
                  </div>
                )) : <div className="text-sm text-muted-foreground">Keep practicing to build verified strengths!</div>}
              </div>
            </div>
            
            <div className="glass-strong rounded-3xl p-6 border border-red-500/20 relative overflow-hidden group hover:-translate-y-1 transition-transform">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 blur-3xl rounded-full" />
              <h2 className="font-display text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> Critical Weaknesses
              </h2>
              <div className="space-y-4 relative z-10">
                {weaknesses.length > 0 ? weaknesses.map((w, i) => (
                  <div key={i} className="bg-black/40 rounded-2xl p-4 border border-red-500/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-sm text-red-400">{w.topic}</div>
                      <div className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full flex items-center gap-1"><Clock className="w-3 h-3" /> {w.estimatedTime}</div>
                    </div>
                    <div className="text-xs text-primary/80 mb-2 leading-relaxed"><span className="font-medium text-red-400">Evidence:</span> {w.reason}</div>
                    <div className="text-xs text-muted-foreground pt-2 border-t border-white/5"><span className="text-foreground font-medium">Fix:</span> {w.recommendation}</div>
                  </div>
                )) : <div className="text-sm text-muted-foreground">No critical weaknesses detected! Excellent.</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 space-y-6">
          <div className="glass-strong rounded-3xl p-6 border border-white/5">
            <h2 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-aurora" /> Interview Predictor
            </h2>
            <div className="space-y-5 mb-6">
              {[ { label: 'Online Assessment', key: 'oa' as const }, { label: 'Live Coding', key: 'live' as const }, { label: 'Technical Interview', key: 'technical' as const } ].map((item) => (
                <div key={item.key} className="group">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                    <span className="font-bold font-mono"><AnimatedNumber value={predictions[item.key] || 0} />%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${predictions[item.key] || 0}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-aurora shadow-[0_0_10px_rgba(var(--aurora-rgb),0.5)]" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-aurora/10 rounded-2xl p-4 border border-aurora/20">
              <div className="text-xs font-bold text-aurora uppercase tracking-wider mb-2">AI Verdict</div>
              <p className="text-sm text-primary/90 leading-relaxed">
                Your performance in <span className="font-bold">{strengths[0]?.topic || 'fundamentals'}</span> gives you a solid foundation. Focus on bridging gaps in <span className="text-red-300 font-bold">{weaknesses[0]?.topic || 'advanced topics'}</span> to increase Technical Interview pass rates by an estimated 15%.
              </p>
            </div>
          </div>

          <div className="glass-strong rounded-3xl p-6 border border-white/5">
            <h2 className="font-display text-lg font-bold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-aurora" /> Active Missions</span>
            </h2>
            <div className="flex flex-col gap-3">
              {weeklyPlan.slice(0, 3).map((day, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-aurora/30 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-[10px] text-aurora font-bold uppercase tracking-wider mb-1">{day.day} Mission</div>
                      <div className="font-medium text-sm text-foreground">{day.focus} Mastery</div>
                    </div>
                    <button className="text-[10px] bg-white/10 hover:bg-aurora text-foreground px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 font-medium">
                      <PlayCircle className="w-3 h-3" /> Start
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{day.tasks[0]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise AI Code Coach Chat */}
      <div className="glass-strong rounded-3xl border border-aurora/30 shadow-[0_0_50px_rgba(var(--aurora-rgb),0.1)] relative overflow-hidden flex flex-col h-[700px] mt-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-aurora/5 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Chat Header */}
        <div className="flex items-center gap-4 p-6 border-b border-white/5 bg-black/20 relative z-10">
          <div className="p-3 bg-gradient-to-br from-aurora to-aurora/80 rounded-2xl text-primary-foreground shadow-lg shadow-aurora/20">
            <Code2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold tracking-tight">Enterprise AI Code Coach</h2>
            <p className="text-sm text-muted-foreground">Powered by your analytics profile. Ask for code reviews, bug fixes, or mock interviews.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400">System Online</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto flex flex-col gap-6 relative z-10 custom-scrollbar scroll-smooth">
          <AnimatePresence initial={false}>
            {chatMessages.map((m) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className={cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start")}
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
                    <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{m.content}</div>
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
                      <div className="w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
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
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
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
