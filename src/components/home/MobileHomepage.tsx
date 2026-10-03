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
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans pb-24 relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-xs pt-[env(safe-area-inset-top)]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl bg-slate-100/90 border border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 active:scale-95 transition min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <BrandLogo size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => nav({ to: isAuthed ? "/dashboard" : "/auth" })}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-all cursor-pointer active:scale-95"
          >
            {isAuthed ? "Dashboard" : "Sign In"}
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] h-[100dvh] w-[min(85vw,320px)] bg-white border-r border-slate-200/90 p-4 flex flex-col justify-between transition-transform duration-200 ease-out shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <BrandLogo size="md" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center cursor-pointer"
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
                className={`min-h-[42px] px-3 py-2 rounded-xl flex items-center justify-between transition text-xs font-medium ${
                  isItemActive
                    ? "bg-purple-50 border border-purple-200/80 text-purple-700 font-semibold shadow-xs"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`h-4 w-4 flex-shrink-0 ${isItemActive ? "text-purple-600" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`h-3.5 w-3.5 ${isItemActive ? "text-purple-600" : "text-slate-400"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="pt-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] border-t border-slate-100">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              nav({ to: isAuthed ? "/dashboard" : "/auth" });
            }}
            className="w-full min-h-[42px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs transition cursor-pointer active:scale-95"
          >
            <span>{isAuthed ? "Go to Dashboard" : "Get Started Now"}</span>
          </button>
        </div>
      </div>

      <main className="px-4 pt-4 space-y-4">
        {/* Hero Card */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[11px] font-bold">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>AI Career OS</span>
            </div>

            {onOpenDemo && (
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full hover:bg-amber-100 transition cursor-pointer"
              >
                <Play className="h-3 w-3 fill-amber-600 text-amber-600" />
                <span>Try Demo</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Welcome, {firstName}</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Your digital <span className="text-purple-600">career twin.</span>
            </h1>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            A continuous simulation of your readiness — built from resume analysis, GitHub contributions, DSA progress, and skill gaps.
          </p>

          <button
            onClick={() => nav({ to: isAuthed ? "/dashboard" : "/auth" })}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white transition shadow-xs cursor-pointer active:scale-95"
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
              className="bg-white rounded-xl border border-slate-200/90 p-2.5 text-center flex flex-col items-center hover:bg-slate-50 active:scale-95 transition cursor-pointer shadow-2xs"
            >
              <div className="h-7 w-7 rounded-lg bg-purple-50 border border-purple-200/80 flex items-center justify-center mb-1 text-purple-600">
                <action.icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[11px] font-bold text-slate-900 line-clamp-1">{action.title}</span>
              <span className="text-[9px] font-medium text-slate-500 line-clamp-1">{action.desc}</span>
            </button>
          ))}
        </section>

        {/* Metrics Banner */}
        <section className="bg-white rounded-xl border border-slate-200/90 p-3 grid grid-cols-4 gap-2 text-center divide-x divide-slate-100 shadow-2xs">
          <div className="px-1">
            <div className="text-sm font-bold text-purple-600">{score}%</div>
            <div className="text-[9px] font-semibold text-slate-500">Readiness</div>
          </div>
          <div className="px-1">
            <div className="text-sm font-bold text-blue-600">{codingScore}</div>
            <div className="text-[9px] font-semibold text-slate-500">Coding</div>
          </div>
          <div className="px-1">
            <div className="text-sm font-bold text-emerald-600">{dsaScore}</div>
            <div className="text-[9px] font-semibold text-slate-500">DSA</div>
          </div>
          <div className="px-1">
            <div className="text-sm font-bold text-slate-800">{consistencyScore}</div>
            <div className="text-[9px] font-semibold text-slate-500">Rhythm</div>
          </div>
        </section>

        {/* Skill Builder Card */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-extrabold text-xs">
                L{level}
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600">Level {level}</div>
                <div className="text-sm font-bold text-slate-900">Career Growth Index</div>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              Active
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Career Readiness</span>
              <span className="text-purple-600">{score}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, score))}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-amber-800">{streakDays} Day Practice Streak</span>
            </div>
            <Award className="h-4 w-4 text-slate-400" />
          </div>
        </section>

        {/* Today's Mission & Tabs */}
        <section className="space-y-3">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
              <Target className="h-3.5 w-3.5 text-purple-600" />
              <span>Today&apos;s Priority Mission</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {activeMission?.title || "Complete Resume Review"}
                </h3>
                <p className="text-xs text-purple-600 font-semibold mt-0.5">
                  +{activeMission?.xp || activeMission?.xp_reward || 30} XP reward
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-blue-600">
                  {activeMission?.progress || 75}%
                </span>
              </div>
            </div>

            <button
              onClick={() => nav({ to: isAuthed ? "/dsa-daily" : "/auth" })}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
            >
              <span>Continue Mission</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs">
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200/60">
              <button
                onClick={() => setActiveTab("strengths")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === "strengths"
                    ? "bg-white text-emerald-700 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Strengths
              </button>
              <button
                onClick={() => setActiveTab("weaknesses")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === "weaknesses"
                    ? "bg-white text-purple-700 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Gaps
              </button>
              <button
                onClick={() => setActiveTab("growth")}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === "growth"
                    ? "bg-white text-blue-700 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Growth
              </button>
            </div>

            <div className="space-y-1.5 pt-1">
              {activeTab === "strengths" &&
                realStrengths.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}

              {activeTab === "weaknesses" &&
                realWeaknesses.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                    <AlertCircle className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}

              {activeTab === "growth" &&
                realGrowth.map((item) => (
                  <div key={item} className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-800">
                    <TrendingUp className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Career Memory */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
              <Layers className="h-3.5 w-3.5 text-purple-600" />
              <span>Career Activity Log</span>
            </div>
            <button
              onClick={() => nav({ to: "/career-identity" })}
              className="text-[11px] text-purple-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-2">
            {realMemory.map((mem: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2 pr-2">
                  <Activity className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                  <span className="text-slate-800 font-medium line-clamp-1">{mem.text}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{mem.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sync Summary */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
              <Zap className="h-3.5 w-3.5 text-purple-600" />
              <span>Career Synthesis</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
            &ldquo;{syncSummary}&rdquo;
          </p>
        </section>

        {/* Footer */}
        <footer className="pt-4 pb-2 border-t border-slate-200/80 space-y-3 text-center">
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>
          <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
            Your intelligent career operating system.
          </p>
          <div className="flex justify-center gap-4 text-xs font-semibold text-slate-600">
            <Link to="/help" className="hover:text-purple-600">Help</Link>
            <Link to="/career-transformations" className="hover:text-purple-600">Stories</Link>
            <Link to="/auth" className="hover:text-purple-600">Account</Link>
          </div>
          <div className="text-[10px] text-slate-400">
            © {new Date().getFullYear()} SyncRole. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Standard Approved Mobile Bottom Navigation */}
      <GlobalHomepageBottomNav pathname={pathname} />
    </div>
  );
}

function GlobalHomepageBottomNav({ pathname }: { pathname: string }) {
  const { openSyncPilot, panelState } = useSyncPilot();
  const isSyncPilotOpen = panelState !== "closed";

  const tabs = [
    { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
    { label: "Workspace", href: "/dashboard/workspace", icon: Clock },
    { label: "SyncPilot", action: openSyncPilot, icon: Sparkles, isCenter: true },
    { label: "GATE Hub", href: "/gate", icon: GraduationCap },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-lg px-3 py-1.5 flex items-center justify-around pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden h-[64px] box-content">
      {tabs.map((tab) => {
        if (tab.isCenter) {
          return (
            <button
              key={tab.label}
              onClick={() => tab.action?.()}
              className={`relative -top-2.5 h-11 w-11 rounded-full grid place-items-center shadow-md transition active:scale-95 ${
                isSyncPilotOpen
                  ? "bg-slate-900 text-purple-300 ring-2 ring-purple-500/40"
                  : "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white hover:brightness-110"
              }`}
              aria-label="Open SyncPilot AI Assistant"
            >
              <tab.icon className="h-5 w-5" />
            </button>
          );
        }

        const isActive =
          tab.href === "/dashboard"
            ? pathname === "/dashboard" || pathname === "/dashboard/" || pathname === "/"
            : pathname.startsWith(tab.href!);

        const Icon = tab.icon;

        return (
          <Link
            key={tab.label}
            to={tab.href!}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition py-1 px-2.5 rounded-xl min-w-[44px] min-h-[44px] justify-center ${
              isActive ? "text-purple-700 font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon className={`h-4 w-4 transition-transform ${isActive ? "text-purple-600 scale-110" : "text-slate-400"}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
