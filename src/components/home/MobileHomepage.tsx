import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Target,
  Flame,
  Brain,
  Code2,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Rocket,
  Menu,
  X,
  Home,
  User,
  FileText,
  ChevronRight,
  Activity,
  Award,
  Zap,
  BarChart3,
  Layers,
  Compass,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import { useSyncPilot } from "@/hooks/useSyncPilot";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

interface MobileHomepageProps {
  data: any;
  onOpenDemo?: () => void;
}

// Fallback demo dataset for guest users matching reference design values
const GUEST_DEMO = {
  name: "Ram",
  level: 78,
  levelName: "Level 78",
  overallProgress: 78,
  codingScore: 82,
  problemSolvingScore: 78,
  consistencyScore: 88,
  streak: 12,
  mission: {
    title: "Complete Resume Review",
    progress: 75,
    xp: 30,
  },
  strengths: ["Project Building", "Resume Writing", "GitHub Activity"],
  weaknesses: ["Consistency", "DSA / Problem Solving"],
  growthAreas: ["System Design", "Cloud & DevOps", "Advanced DSA"],
  memory: [
    { text: "Pushed 3 commits to portfolio-website", time: "2h ago", icon: "commit" },
    { text: "Solved 5 DSA problems on LeetCode", time: "5h ago", icon: "dsa" },
    { text: "Resume updated v2.1", time: "1d ago", icon: "resume" },
  ],
  syncSummary:
    "Based on your recent activity, your strongest signal is project building. Your main gap is consistency.",
};

export default function MobileHomepage({ data, onOpenDemo }: MobileHomepageProps) {
  const { user } = useAuth();
  const nav = useNavigate();
  const { openSyncPilot, isOpen: isSyncPilotOpen } = useSyncPilot();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"strengths" | "weaknesses" | "growth">("strengths");

  // Real data extraction with graceful fallbacks
  const isAuthed = !!user && !!data?.profile;
  const firstName = isAuthed
    ? data?.profile?.full_name?.split(" ")[0] || "User"
    : GUEST_DEMO.name;

  const score = data?.scores?.[0]?.total_score ?? (isAuthed ? 0 : GUEST_DEMO.overallProgress);
  const bdScore = data?.scores?.[0] || {};
  const codingScore = bdScore.coding_score ?? bdScore.projects_score ?? (isAuthed ? 0 : GUEST_DEMO.codingScore);
  const dsaScore = bdScore.dsa_score ?? bdScore.problem_solving_score ?? (isAuthed ? 0 : GUEST_DEMO.problemSolvingScore);
  const streakDays = data?.streak?.current_streak ?? (isAuthed ? 0 : GUEST_DEMO.streak);
  const consistencyScore = Math.min(100, streakDays * 5 + 28) || (isAuthed ? 0 : GUEST_DEMO.consistencyScore);
  const level = data?.xp?.level ?? (isAuthed ? 1 : GUEST_DEMO.level);

  // Daily Mission calculation
  const activeMission = data?.missions?.find((m: any) => !m.completed) || (
    isAuthed ? null : GUEST_DEMO.mission
  );

  // Strengths & Weaknesses calculation
  const signalMap: Record<string, number> = {
    "Project Building": bdScore.projects_score || 70,
    "Resume Writing": data?.resume?.total_score || 68,
    "GitHub Activity": bdScore.github_score || 72,
    "DSA / Problem Solving": bdScore.dsa_score || 60,
    "Consistency": consistencyScore,
  };

  const sortedSignals = Object.entries(signalMap).sort(([, a], [, b]) => b - a);
  const realStrengths = isAuthed
    ? sortedSignals.slice(0, 3).map(([k]) => k)
    : GUEST_DEMO.strengths;
  const realWeaknesses = isAuthed
    ? sortedSignals.slice(-2).map(([k]) => k)
    : GUEST_DEMO.weaknesses;
  const realGrowth = isAuthed
    ? ["System Design", "Cloud & DevOps", "Advanced DSA"]
    : GUEST_DEMO.growthAreas;

  // Recent Activity / Career Memory
  const realMemory = isAuthed && data?.activityLogs?.length > 0
    ? data.activityLogs.slice(0, 3).map((log: any) => {
        let text = "Activity logged";
        if (log.type === "resume_upload") text = "Uploaded resume — ATS analysis complete";
        else if (log.type === "dsa_solve") text = `Solved DSA problem · +${log.xp_delta || 10} XP`;
        else if (log.type === "mock_interview") text = "Completed mock interview session";
        else if (log.type === "achievement") {
          const achName = ACHIEVEMENT_CATALOG[(log.meta as any)?.code || ""]?.name || "Achievement";
          text = `Unlocked badge: ${achName}`;
        } else if (log.description) text = log.description;

        const date = new Date(log.created_at || Date.now());
        const diffHours = Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60));
        const timeAgo = diffHours < 1 ? "Just now" : diffHours < 24 ? `${diffHours}h ago` : `${Math.floor(diffHours / 24)}d ago`;

        return { text, time: timeAgo, icon: log.type || "activity" };
      })
    : GUEST_DEMO.memory;

  // AI Sync Summary
  const syncSummary = isAuthed
    ? `Based on your recent activity, your strongest signal is ${realStrengths[0]?.toLowerCase() || "learning"}. Your primary focus area is ${realWeaknesses[0]?.toLowerCase() || "consistency"}.`
    : GUEST_DEMO.syncSummary;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans pb-28 relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background ambient lighting */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent pointer-events-none blur-3xl" />

      {/* ── MOBILE HEADER ── */}
      <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <BrandLogo size="sm" />

        <div className="flex items-center gap-2">
          <button
            onClick={() => nav({ to: isAuthed ? "/dashboard" : "/auth" })}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm hover:brightness-110 active:scale-95 transition-all"
          >
            {isAuthed ? "Dashboard" : "Get Started"}
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white active:scale-95 transition-all"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ── HAMBURGER NAVIGATION DRAWER ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <BrandLogo size="md" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 space-y-3">
                {[
                  { label: "Home", href: "/", icon: Home },
                  { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
                  { label: "DSA Mentor & Daily", href: "/dsa-daily", icon: Code2 },
                  { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileText },
                  { label: "Role Explorer", href: "/role-explorer", icon: Compass },
                  { label: "Profile & Identity", href: "/career-identity", icon: User },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-slate-200 text-sm font-medium hover:bg-slate-800 transition"
                  >
                    <item.icon className="h-4 w-4 text-purple-400" />
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto text-slate-600" />
                  </Link>
                ))}
              </nav>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  nav({ to: isAuthed ? "/dashboard" : "/auth" });
                }}
                className="w-full py-3.5 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm shadow-lg shadow-purple-500/20 active:scale-98 transition"
              >
                {isAuthed ? "Go to Dashboard" : "Get Started Now"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-4 pt-4 space-y-5">
        {/* ── HERO SECTION ── */}
        <section className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/80 border border-white/10 p-5 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-medium">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span>AI-Powered Career Companion</span>
            </div>

            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="text-[10px] uppercase font-semibold tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full"
              >
                Demo Preview
              </button>
            )}
          </div>

          <div className="mt-4 flex items-start justify-between">
            <div className="space-y-1 max-w-[65%]">
              <p className="text-sm font-medium text-slate-300">
                Good morning, {firstName}! 👋
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Your digital <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300">
                  career twin.
                </span>
              </h1>
            </div>

            {/* Orbit graphic illustration matching reference design */}
            <div className="relative h-20 w-20 shrink-0 grid place-items-center">
              <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-spin-slow opacity-60" />
              <div className="absolute inset-2 rounded-full border border-cyan-500/30 opacity-40" />
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-700 to-blue-600 p-px shadow-lg shadow-purple-500/30 grid place-items-center">
                <div className="h-full w-full rounded-[15px] bg-slate-950 grid place-items-center">
                  <BrandLogo size="sm" showText={false} />
                </div>
              </div>
              <div className="absolute top-0 right-1 h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              <div className="absolute bottom-1 left-0 h-2 w-2 rounded-full bg-cyan-400" />
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-xs">
            A living simulation of you — updated from resume, GitHub, DSA, XP, and interviews.
          </p>

          <div className="mt-5">
            <button
              onClick={() => nav({ to: isAuthed ? "/dashboard" : "/auth" })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-98 transition"
            >
              <span>{isAuthed ? "Explore Dashboard" : "Get Started Free"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* ── QUICK ACTIONS ROW (Horizontal / 4 Cards Grid) ── */}
        <section className="grid grid-cols-4 gap-2">
          {[
            { title: "Track Progress", desc: "Visualize growth", icon: Code2, color: "text-purple-400", href: "/dashboard" },
            { title: "Smart Missions", desc: "Daily goals", icon: Target, color: "text-emerald-400", href: "/dsa-daily" },
            { title: "Data Insights", desc: "Know stats", icon: BarChart3, color: "text-blue-400", href: "/resume-intelligence" },
            { title: "Career Memory", desc: "All in one", icon: Layers, color: "text-amber-400", href: "/career-identity" },
          ].map((action) => (
            <button
              key={action.title}
              onClick={() => nav({ to: action.href })}
              className="rounded-2xl bg-slate-900/70 border border-white/5 p-2.5 text-center flex flex-col items-center hover:bg-slate-800/80 active:scale-95 transition"
            >
              <div className={`h-8 w-8 rounded-xl bg-slate-800/90 grid place-items-center mb-1.5 ${action.color}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold text-slate-200 line-clamp-1 leading-tight">{action.title}</span>
              <span className="text-[9px] text-slate-500 line-clamp-1 mt-0.5">{action.desc}</span>
            </button>
          ))}
        </section>

        {/* ── METRICS OVERVIEW BANNER ── */}
        <section className="rounded-2xl bg-slate-900/80 border border-white/10 p-3.5 grid grid-cols-4 gap-2 text-center divide-x divide-white/5">
          <div className="px-1">
            <div className="text-base font-extrabold text-purple-300">{score}%</div>
            <div className="text-[9px] font-medium text-slate-400 mt-0.5">Overall Progress</div>
            <div className="mt-1.5 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.min(100, score)}%` }} />
            </div>
          </div>

          <div className="px-1">
            <div className="text-base font-extrabold text-blue-400">{codingScore}</div>
            <div className="text-[9px] font-medium text-slate-400 mt-0.5">Coding Score</div>
          </div>

          <div className="px-1">
            <div className="text-base font-extrabold text-emerald-400">{dsaScore}</div>
            <div className="text-[9px] font-medium text-slate-400 mt-0.5">Problem Solving</div>
          </div>

          <div className="px-1">
            <div className="text-base font-extrabold text-purple-400">{consistencyScore}</div>
            <div className="text-[9px] font-medium text-slate-400 mt-0.5">Consistency</div>
          </div>
        </section>

        {/* ── SKILL BUILDER — PRIMARY MOBILE CARD ── */}
        <section className="rounded-3xl bg-slate-900/90 border border-purple-500/20 p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 p-px">
                <div className="h-full w-full rounded-[14px] bg-slate-950 grid place-items-center">
                  <BrandLogo size="sm" showText={false} />
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-purple-400">SKILL BUILDER</div>
                <div className="text-xl font-extrabold text-white leading-tight">Level {level}</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>

          <p className="text-xs text-slate-400">Keep building. You&apos;re leveling up!</p>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Overall Progress</span>
              <span className="text-purple-400">{score}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/50 border border-white/5">
              <Code2 className="h-4 w-4 text-blue-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">{codingScore}</div>
                <div className="text-[9px] text-slate-400">Coding</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/50 border border-white/5">
              <Brain className="h-4 w-4 text-purple-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">{dsaScore}</div>
                <div className="text-[9px] text-slate-400 text-ellipsis overflow-hidden whitespace-nowrap">Problem Solving</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/50 border border-white/5">
              <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">{consistencyScore}</div>
                <div className="text-[9px] text-slate-400">Consistency</div>
              </div>
            </div>
          </div>

          {/* Streak strip */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-xs">
            <div className="flex items-center gap-2.5">
              <Flame className="h-5 w-5 text-amber-400 shrink-0 animate-bounce" />
              <div>
                <div className="font-bold text-amber-300">{streakDays} Day Streak</div>
                <div className="text-[10px] text-amber-400/80">Keep the momentum going!</div>
              </div>
            </div>
            <Award className="h-5 w-5 text-amber-400 opacity-80" />
          </div>
        </section>

        {/* ── TODAY'S MISSION & STRENGTHS/WEAKNESSES GRID ── */}
        <section className="space-y-3">
          {/* Mission Card */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-5 space-y-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5" />
              <span>TODAY&apos;S MISSION</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">
                  {activeMission?.title || "Complete Resume Review"}
                </h3>
                <p className="text-xs text-amber-400 font-medium mt-1">
                  ⚡ +{activeMission?.xp || activeMission?.xp_reward || 30} XP on completion
                </p>
              </div>

              {/* Radial gauge */}
              <div className="relative h-14 w-14 shrink-0 grid place-items-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-amber-400"
                    strokeDasharray={`${activeMission?.progress || 75}, 100`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-amber-300">
                  {activeMission?.progress || 75}%
                </span>
              </div>
            </div>

            <button
              onClick={() => nav({ to: isAuthed ? "/dsa-daily" : "/auth" })}
              className="w-full py-2.5 rounded-xl bg-slate-800 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-slate-700 flex items-center justify-center gap-2 active:scale-98 transition"
            >
              <span>Continue Mission</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Interactive Strengths / Weaknesses Tabs */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-4 space-y-3">
            <div className="flex rounded-xl bg-slate-950 p-1 border border-white/5">
              <button
                onClick={() => setActiveTab("strengths")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "strengths"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Strengths ({realStrengths.length})
              </button>
              <button
                onClick={() => setActiveTab("weaknesses")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "weaknesses"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Weaknesses ({realWeaknesses.length})
              </button>
              <button
                onClick={() => setActiveTab("growth")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "growth"
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Growth ({realGrowth.length})
              </button>
            </div>

            <div className="space-y-2 pt-1">
              {activeTab === "strengths" &&
                realStrengths.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-200">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}

              {activeTab === "weaknesses" &&
                realWeaknesses.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-200">
                    <AlertCircle className="h-4 w-4 text-purple-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}

              {activeTab === "growth" &&
                realGrowth.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-200">
                    <TrendingUp className="h-4 w-4 text-blue-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ── CAREER MEMORY CARD ── */}
        <section className="rounded-3xl bg-slate-900/80 border border-white/10 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>CAREER MEMORY</span>
            </div>
            <button
              onClick={() => nav({ to: "/career-identity" })}
              className="text-[11px] text-blue-400 font-semibold flex items-center gap-1 hover:underline"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {realMemory.map((mem: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-xs">
                <div className="flex items-center gap-2.5 pr-2">
                  <Activity className="h-4 w-4 text-purple-400 shrink-0" />
                  <span className="text-slate-300 font-medium line-clamp-1">{mem.text}</span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{mem.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYNC SUMMARY / AI INSIGHT CARD ── */}
        <section className="rounded-3xl bg-gradient-to-r from-purple-900/30 via-slate-900 to-blue-900/30 border border-purple-500/30 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-widest text-purple-300 flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-purple-400" />
              <span>SYNC SUMMARY</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;{syncSummary}&rdquo;
          </p>
        </section>

        {/* ── LEVEL UP CALLOUT BANNER ── */}
        <section className="rounded-3xl bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 p-5 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Level up your career</h3>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Track, improve and achieve your goals with SyncRole.
            </p>
          </div>

          <button
            onClick={() => nav({ to: isAuthed ? "/dashboard" : "/auth" })}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold shadow-md shrink-0 active:scale-95 transition"
          >
            {isAuthed ? "Dashboard" : "Get Started"}
          </button>
        </section>

        {/* ── MOBILE FOOTER ── */}
        <footer className="pt-6 pb-4 border-t border-white/10 space-y-4 text-center">
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your AI-powered career companion that grows with you.
          </p>
          <div className="flex justify-center gap-4 text-xs text-slate-400">
            <Link to="/help" className="hover:text-white">Help</Link>
            <Link to="/career-transformations" className="hover:text-white">Stories</Link>
            <Link to="/auth" className="hover:text-white">Account</Link>
          </div>
          <div className="text-[10px] text-slate-600">
            © {new Date().getFullYear()} SyncRole. All rights reserved.
          </div>
        </footer>
      </main>

      {/* ── FIXED MOBILE BOTTOM NAVIGATION BAR ── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#07090e]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around pb-safe">
        {[
          { label: "Home", href: "/", icon: Home },
          { label: "Progress", href: "/dashboard", icon: TrendingUp },
          { label: "AI SyncPilot", action: openSyncPilot, icon: Sparkles, isCenter: true },
          { label: "Insights", href: "/resume-intelligence", icon: FileText },
          { label: "Profile", href: "/career-identity", icon: User },
        ].map((tab) => {
          if (tab.isCenter) {
            return (
              <button
                key={tab.label}
                onClick={() => tab.action?.()}
                className={`relative -top-3 h-12 w-12 rounded-full p-px shadow-lg transition active:scale-95 ${
                  isSyncPilotOpen
                    ? "bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-purple-500/60 ring-2 ring-purple-400/60"
                    : "bg-gradient-to-tr from-purple-600 to-blue-600 shadow-purple-500/40 hover:brightness-110"
                }`}
                aria-label="Open SyncPilot AI Assistant"
              >
                <div className={`h-full w-full rounded-full grid place-items-center transition ${
                  isSyncPilotOpen ? "bg-purple-950 text-cyan-300" : "bg-slate-950 text-purple-300"
                }`}>
                  <tab.icon className="h-5 w-5" />
                </div>
              </button>
            );
          }

          return (
            <Link
              key={tab.label}
              to={tab.href}
              className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-purple-400 active:scale-95 transition px-3 py-1"
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
