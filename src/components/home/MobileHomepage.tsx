import { useState, useEffect } from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
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
  Settings,
  HelpCircle,
  Building2,
  LayoutDashboard,
  Play,
  Calendar,
  Fingerprint,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import { useSyncPilot } from "@/hooks/useSyncPilot";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

import CurrentlyRelevantGateSection from "@/components/home/CurrentlyRelevantGateSection";

interface MobileHomepageProps {
  data: any;
  onOpenDemo?: () => void;
}

const GUEST_DEMO = {
  name: "Alex",
  level: 3,
  levelName: "Growth Seeker",
  overallProgress: 72,
  codingScore: 75,
  problemSolvingScore: 68,
  consistencyScore: 80,
  streak: 12,
  mission: {
    title: "Complete Resume Review",
    progress: 75,
    xp: 30,
  },
  strengths: ["Project Building", "Resume Fundamentals", "GitHub Rhythm"],
  weaknesses: ["Consistency", "DSA Problem Solving"],
  growthAreas: ["System Design", "Cloud Architecture", "Advanced DSA"],
  memory: [
    { text: "Pushed 3 commits to portfolio project", time: "2h ago" },
    { text: "Solved 3 DSA problems on LeetCode", time: "5h ago" },
    { text: "Updated resume to v2.1", time: "1d ago" },
  ],
  syncSummary:
    "Based on your recent activity, your strongest signal is project building. Main focus area is DSA consistency.",
};

export default function MobileHomepage({ data, onOpenDemo }: MobileHomepageProps) {
  const { user } = useAuth();
  const nav = useNavigate();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const { openSyncPilot, isOpen: isSyncPilotOpen } = useSyncPilot();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"strengths" | "weaknesses" | "growth">("strengths");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

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

  const activeMission = data?.missions?.find((m: any) => !m.completed) || (
    isAuthed ? null : GUEST_DEMO.mission
  );

  const signalMap: Record<string, number> = {
    "Project Building": bdScore.projects_score || 70,
    "Resume Writing": data?.resume?.total_score || 68,
    "GitHub Rhythm": bdScore.github_score || 72,
    "DSA Problem Solving": bdScore.dsa_score || 60,
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
    ? ["System Design", "Cloud Architecture", "Advanced DSA"]
    : GUEST_DEMO.growthAreas;

  const realMemory = isAuthed && data?.activityLogs?.length > 0
    ? data.activityLogs.slice(0, 3).map((log: any) => {
        let text = "Activity logged";
        if (log.type === "resume_upload") text = "Uploaded resume — analysis complete";
        else if (log.type === "dsa_solve") text = `Solved DSA problem · +${log.xp_delta || 10} XP`;
        else if (log.type === "mock_interview") text = "Completed mock interview session";
        else if (log.type === "achievement") {
          const achName = ACHIEVEMENT_CATALOG[(log.meta as any)?.code || ""]?.name || "Achievement";
          text = `Unlocked badge: ${achName}`;
        } else if (log.description) text = log.description;

        const date = new Date(log.created_at || Date.now());
        const diffHours = Math.round((Date.now() - date.getTime()) / (1000 * 60 * 60));
        const timeAgo = diffHours < 1 ? "Just now" : diffHours < 24 ? `${diffHours}h ago` : `${Math.floor(diffHours / 24)}d ago`;

        return { text, time: timeAgo };
      })
    : GUEST_DEMO.memory;

  const syncSummary = isAuthed
    ? `Based on your recent activity, your strongest signal is ${realStrengths[0]?.toLowerCase() || "learning"}. Focus area: ${realWeaknesses[0]?.toLowerCase() || "consistency"}.`
    : GUEST_DEMO.syncSummary;

  return (
    <div className="min-h-screen bg-[#0e1217] text-foreground font-sans pb-24 relative overflow-x-hidden selection:bg-violet-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0e1217]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-foreground hover:bg-white/10 active:scale-95 transition min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <BrandLogo size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => nav({ to: isAuthed ? "/dashboard" : "/auth" })}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white shadow-sm transition-all cursor-pointer"
          >
            {isAuthed ? "Dashboard" : "Sign In"}
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-xs transition-opacity duration-200 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] h-[100dvh] w-[min(85vw,320px)] bg-[#161b22] border-r border-white/10 p-4 flex flex-col justify-between transition-transform duration-200 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <BrandLogo size="md" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-foreground transition active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto min-h-0 py-3 space-y-1">
          {[
            { label: "Home", href: "/", icon: Home },
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "DSA Command Center", href: "/dashboard/dsa", icon: Code2 },
            { label: "Today Workspace", href: "/dashboard/workspace", icon: Calendar },
            { label: "Target Companies", href: "/dsa-companies", icon: Building2 },
            { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileText },
            { label: "Role Explorer", href: "/role-explorer", icon: Target },
            { label: "Career Identity", href: "/career-identity", icon: Fingerprint },
            { label: "My Profile", href: "/profile", icon: User },
            { label: "Settings", href: "/settings", icon: Settings },
            { label: "Help & Support", href: "/help", icon: HelpCircle },
          ].map((item) => {
            const isItemActive =
              item.href === "/"
                ? pathname === "/"
                : item.href === "/dashboard"
                ? pathname === "/dashboard" || pathname === "/dashboard/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`min-h-[40px] px-3 py-2 rounded-lg border flex items-center justify-between transition text-xs font-medium ${
                  isItemActive
                    ? "bg-violet-600/20 border-violet-500/40 text-violet-300 font-semibold"
                    : "bg-white/5 border-transparent text-muted-foreground hover:text-foreground hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className="h-3.5 w-3.5 flex-shrink-0 text-violet-400" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 opacity-50" />
              </Link>
            );
          })}
        </nav>

        <div className="pt-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] border-t border-white/10">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              nav({ to: isAuthed ? "/dashboard" : "/auth" });
            }}
            className="w-full min-h-[40px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs shadow-md transition cursor-pointer"
          >
            <span>{isAuthed ? "Go to Dashboard" : "Get Started Now"}</span>
          </button>
        </div>
      </div>

      <main className="px-4 pt-4 space-y-4">
        {/* Hero Card */}
        <section className="surface-primary rounded-2xl border border-white/10 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-semibold">
              <Sparkles className="h-3 w-3" />
              <span>AI Career OS</span>
            </div>

            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded-md hover:bg-amber-400/20 transition cursor-pointer"
              >
                <Play className="h-3 w-3 fill-amber-400" />
                <span>Try Demo</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Welcome, {firstName}</p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Your digital <span className="text-cyan-400">career twin.</span>
            </h1>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            A continuous simulation of your readiness — built from resume analysis, GitHub contributions, DSA progress, and skill gaps.
          </p>

          <button
            onClick={() => nav({ to: isAuthed ? "/dashboard" : "/auth" })}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition shadow-sm cursor-pointer"
          >
            <span>{isAuthed ? "Explore Workspace" : "Get Started Free"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </section>

        {/* GATE Highlight */}
        <CurrentlyRelevantGateSection />

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-4 gap-2">
          {[
            { title: "Progress", desc: "Track growth", icon: Code2, href: "/dashboard" },
            { title: "Missions", desc: "Daily goals", icon: Target, href: "/dsa-daily" },
            { title: "Insights", desc: "View stats", icon: BarChart3, href: "/resume-intelligence" },
            { title: "Memory", desc: "Activities", icon: Layers, href: "/career-identity" },
          ].map((action) => (
            <button
              key={action.title}
              onClick={() => nav({ to: action.href })}
              className="surface-primary rounded-xl border border-white/8 p-2.5 text-center flex flex-col items-center hover:bg-white/10 active:scale-95 transition cursor-pointer"
            >
              <div className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-1 text-violet-400">
                <action.icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] font-semibold text-foreground line-clamp-1">{action.title}</span>
              <span className="text-[9px] text-muted-foreground line-clamp-1">{action.desc}</span>
            </button>
          ))}
        </section>

        {/* Metrics Banner */}
        <section className="surface-primary rounded-xl border border-white/10 p-3 grid grid-cols-4 gap-2 text-center divide-x divide-white/10">
          <div className="px-1">
            <div className="text-sm font-bold text-violet-400">{score}%</div>
            <div className="text-[9px] text-muted-foreground">Readiness</div>
          </div>
          <div className="px-1">
            <div className="text-sm font-bold text-cyan-400">{codingScore}</div>
            <div className="text-[9px] text-muted-foreground">Coding</div>
          </div>
          <div className="px-1">
            <div className="text-sm font-bold text-emerald-400">{dsaScore}</div>
            <div className="text-[9px] text-muted-foreground">DSA</div>
          </div>
          <div className="px-1">
            <div className="text-sm font-bold text-foreground">{consistencyScore}</div>
            <div className="text-[9px] text-muted-foreground">Rhythm</div>
          </div>
        </section>

        {/* Skill Builder Card */}
        <section className="surface-primary rounded-2xl border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center font-bold text-xs">
                L{level}
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Level {level}</div>
                <div className="text-sm font-bold text-foreground">Career Growth Index</div>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-md bg-emerald-400/10 text-emerald-400 text-[10px] font-semibold border border-emerald-400/20">
              Active
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Career Readiness</span>
              <span className="text-violet-400">{score}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/8 text-xs">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <span className="font-semibold text-amber-400">{streakDays} Day Practice Streak</span>
            </div>
            <Award className="h-4 w-4 text-muted-foreground" />
          </div>
        </section>

        {/* Today's Mission & Tabs */}
        <section className="space-y-3">
          <div className="surface-primary rounded-2xl border border-white/10 p-4 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-violet-400" />
              <span>Today&apos;s Priority Mission</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">
                  {activeMission?.title || "Complete Resume Review"}
                </h3>
                <p className="text-xs text-violet-400 font-medium mt-0.5">
                  +{activeMission?.xp || activeMission?.xp_reward || 30} XP reward
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-cyan-400">
                  {activeMission?.progress || 75}%
                </span>
              </div>
            </div>

            <button
              onClick={() => nav({ to: isAuthed ? "/dsa-daily" : "/auth" })}
              className="w-full py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-foreground hover:bg-white/10 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <span>Continue Mission</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="surface-primary rounded-2xl border border-white/10 p-4 space-y-3">
            <div className="flex rounded-lg bg-white/5 p-1 border border-white/5">
              <button
                onClick={() => setActiveTab("strengths")}
                className={`flex-1 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === "strengths"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Strengths
              </button>
              <button
                onClick={() => setActiveTab("weaknesses")}
                className={`flex-1 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === "weaknesses"
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Gaps
              </button>
              <button
                onClick={() => setActiveTab("growth")}
                className={`flex-1 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                  activeTab === "growth"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Growth
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {activeTab === "strengths" &&
                realStrengths.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-xs text-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}

              {activeTab === "weaknesses" &&
                realWeaknesses.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-xs text-foreground">
                    <AlertCircle className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}

              {activeTab === "growth" &&
                realGrowth.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-xs text-foreground">
                    <TrendingUp className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Career Memory */}
        <section className="surface-primary rounded-2xl border border-white/10 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-violet-400" />
              <span>Career Activity Log</span>
            </div>
            <button
              onClick={() => nav({ to: "/career-identity" })}
              className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-2">
            {realMemory.map((mem: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 text-xs">
                <div className="flex items-center gap-2 pr-2">
                  <Activity className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                  <span className="text-foreground font-medium line-clamp-1">{mem.text}</span>
                </div>
                <span className="text-[10px] text-muted-foreground shrink-0">{mem.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sync Summary */}
        <section className="surface-primary rounded-2xl border border-white/10 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-violet-400" />
              <span>Career Synthesis</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed italic">
            &ldquo;{syncSummary}&rdquo;
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-4 pb-2 border-t border-white/10 space-y-3 text-center">
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto">
            Your intelligent career operating system.
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <Link to="/help" className="hover:text-foreground">Help</Link>
            <Link to="/career-transformations" className="hover:text-foreground">Stories</Link>
            <Link to="/auth" className="hover:text-foreground">Account</Link>
          </div>
          <div className="text-[10px] text-muted-foreground/60">
            © {new Date().getFullYear()} SyncRole. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#0e1217]/95 backdrop-blur-md border-t border-white/10 px-2 py-2 flex items-center justify-around pb-safe">
        {[
          { label: "Home", href: "/", icon: Home },
          { label: "Progress", href: "/dashboard", icon: TrendingUp },
          { label: "SyncPilot", action: openSyncPilot, icon: Sparkles, isCenter: true },
          { label: "Insights", href: "/resume-intelligence", icon: FileText },
          { label: "Profile", href: "/profile", icon: User },
        ].map((tab) => {
          if (tab.isCenter) {
            return (
              <button
                key={tab.label}
                onClick={() => tab.action?.()}
                className="surface-primary hover:bg-white/10 text-foreground border border-white/15 rounded-full p-2.5 shadow-md flex items-center justify-center cursor-pointer -top-2 relative"
                aria-label="Open SyncPilot AI Assistant"
              >
                <tab.icon className="h-4 w-4 text-violet-400" />
              </button>
            );
          }

          return (
            <Link
              key={tab.label}
              to={tab.href}
              className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-foreground active:scale-95 transition px-3 py-1"
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
