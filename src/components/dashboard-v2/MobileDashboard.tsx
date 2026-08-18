import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Flame,
  Trophy,
  Target,
  Github,
  FileText,
  Brain,
  Zap,
  ArrowRight,
  Code2,
  CheckCircle,
  Award,
  MapPin,
  Star,
  Activity,
  ChevronRight,
  Clock,
  Briefcase,
  Users,
  Layers,
  Menu,
  X,
  Home,
  Bell,
  Check,
  Building2,
  FolderDot,
  Compass,
  BarChart3,
  BookOpen,
  User,
  Settings
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { useSyncPilot } from "@/hooks/useSyncPilot";
import {
  UserCareerContext,
  CompanyReadinessResult,
  DashboardOrchestrationResult,
  careerEngine,
} from "@/lib/career-intelligence";

interface MobileDashboardProps {
  userContext: UserCareerContext;
  profile: any;
  userName: string;
  orchestration: DashboardOrchestrationResult;
  onContinueJourney: () => void;
  xp: { total_xp: number; level: number; level_name: string };
  streak: { current_streak: number; longest_streak: number };
  missions: any[];
  onCompleteMission: (m: any) => void;
  latestScore: any;
}

export function MobileDashboard({
  userContext,
  profile,
  userName,
  orchestration,
  onContinueJourney,
  xp,
  streak,
  missions,
  onCompleteMission,
  latestScore,
}: MobileDashboardProps) {
  const nav = useNavigate();
  const { openSyncPilot, isOpen: isSyncPilotOpen } = useSyncPilot();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Evaluate dream company readiness
  const selectedCompanyId = userContext?.dream_companies?.[0] || "google";
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );

  const greetingTime =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";
  const firstName = userName?.split(" ")[0] || "Engineer";

  // XP Progress calculation
  const currentLevel = xp.level || 1;
  const nextLevel = currentLevel + 1;
  const xpNeeded = currentLevel * 1000;
  const xpToNextLevel = Math.max(0, xpNeeded - (xp.total_xp || 0));

  // Workspace task fallbacks matching reference
  const defaultTasks = [
    {
      id: "skills_update",
      number: 1,
      title: "Update Your Skills",
      description: "Update your skill profile",
      duration: "15 min",
      readiness: "+15 Readiness",
      xp: 20,
      icon: Code2,
      color: "bg-purple-600 text-white",
      btnColor: "bg-purple-600 hover:bg-purple-500 text-white",
      path: "/profile",
    },
    {
      id: "mock_interview",
      number: 2,
      title: "Complete Mock Interview",
      description: "Practice with AI SynC HR",
      duration: "20 min",
      readiness: "+10 Readiness",
      xp: 30,
      icon: Users,
      color: "bg-blue-600 text-white",
      btnColor: "bg-blue-600 hover:bg-blue-500 text-white",
      path: "/dsa-daily",
    },
    {
      id: "resume_review",
      number: 3,
      title: "Complete Resume Review",
      description: "Get AI review & feedback",
      duration: "10 min",
      readiness: "+12% Readiness",
      xp: 25,
      icon: FileText,
      color: "bg-emerald-600 text-white",
      btnColor: "bg-emerald-600 hover:bg-emerald-500 text-white",
      path: "/resume-intelligence",
    },
  ];

  const tasksToShow =
    missions && missions.length > 0
      ? missions.slice(0, 3).map((m, idx) => {
          const fallback = defaultTasks[idx] || defaultTasks[0];
          return {
            ...m,
            number: idx + 1,
            title: m.title || fallback.title,
            description: m.description || fallback.description,
            duration: fallback.duration,
            readiness: fallback.readiness,
            xp: m.xp_reward || fallback.xp,
            icon: fallback.icon,
            color: fallback.color,
            btnColor: fallback.btnColor,
            path: fallback.path,
          };
        })
      : defaultTasks;

  // Dream company matched skills
  const matchedSkillsCount = readiness.matchedSkills?.length || 8;
  const totalSkills = matchedSkillsCount + (readiness.missingSkills?.length || 8);
  const skillsProgress = (matchedSkillsCount / totalSkills) * 100;
  const matchScore = readiness.readinessScore || 50;

  // Career Journey Stepper Nodes
  const currentScore = userContext.placementScore || 50;
  const journeySteps = [
    { id: "current", label: "Current", score: "50%", icon: Home, active: true },
    { id: "foundation", label: "Foundation", score: "75%", icon: BookOpen, active: currentScore >= 50 },
    { id: "internship", label: "Internship", score: "25%", icon: Briefcase, active: currentScore >= 70 },
    { id: "product", label: "Product", score: "0%", icon: Layers, active: currentScore >= 90 },
    { id: "dream", label: "Dream Offer", score: "0%", icon: Trophy, active: currentScore >= 100 },
  ];

  // Career Health items
  const healthItems = [
    { label: "Resume", score: latestScore.resume_score || 82, icon: FileText, color: "bg-emerald-400" },
    { label: "GitHub", score: latestScore.github_score || 62, icon: Github, color: "bg-blue-500" },
    { label: "DSA", score: latestScore.dsa_score || 37, icon: Code2, color: "bg-purple-500" },
    { label: "Projects", score: latestScore.projects_score || 38, icon: FolderDot, color: "bg-amber-400" },
    { label: "Skills", score: latestScore.skill_score || 24, icon: Sparkles, color: "bg-cyan-400" },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans pb-28 relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Ambient background glow */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent pointer-events-none blur-3xl" />

      {/* ── 1. MOBILE HEADER ── */}
      <header className="sticky top-0 z-40 bg-[#07090e]/90 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white active:scale-95 transition"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <BrandLogo size="sm" />
        </div>

        <div className="flex items-center gap-2">
          <NotificationCenter>
            <button className="relative p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white active:scale-95 transition">
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            </button>
          </NotificationCenter>

          <button
            onClick={() => nav({ to: "/profile" })}
            className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 p-px overflow-hidden shadow-sm"
          >
            <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center text-xs font-bold text-purple-300">
              {firstName.charAt(0)}
            </div>
          </button>
        </div>
      </header>

      {/* ── HAMBURGER DRAWER ── */}
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
                  { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
                  { label: "DSA Command Center", href: "/dashboard/dsa", icon: Code2 },
                  { label: "Today Workspace", href: "/dashboard/workspace", icon: Clock },
                  { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileText },
                  { label: "Role Explorer", href: "/role-explorer", icon: Compass },
                  { label: "Profile & Settings", href: "/profile", icon: User },
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

            <button
              onClick={() => {
                setIsMenuOpen(false);
                nav({ to: "/profile" });
              }}
              className="w-full py-3.5 rounded-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm shadow-lg shadow-purple-500/20 active:scale-98 transition"
            >
              View My Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="px-4 pt-4 space-y-4">
        {/* ── 2. GREETING / HERO SECTION ── */}
        <section className="space-y-3">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {greetingTime}, {firstName}! 👋
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              You&apos;re on track to achieve your dreams.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200">
              <Building2 className="h-3.5 w-3.5 text-blue-400" />
              <span className="capitalize">{readiness.companyName}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs font-semibold text-slate-200">
              <Smartphone className="h-3.5 w-3.5 text-purple-400" />
              <span>{readiness.roleTitle}</span>
            </div>
          </div>
        </section>

        {/* ── 3. PLACEMENT READINESS + XP + STREAK CARD ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-2 gap-4">
            {/* Left: Readiness */}
            <div className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                PLACEMENT READINESS
              </div>
              <div className="text-3xl font-black text-white">
                {readiness.readinessScore}%
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(5, readiness.readinessScore))}%` }}
                />
              </div>
              <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>↑ 8% this week</span>
              </div>
            </div>

            {/* Right: XP */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  XP
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-600/30 border border-purple-500/40 grid place-items-center text-purple-300 shadow-md">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">
                {xp.total_xp || 285}
              </div>
              <div className="text-[10px] font-semibold text-slate-400">
                Level {currentLevel} • {xpToNextLevel || 115} XP to Lvl {nextLevel}
              </div>
            </div>
          </div>

          {/* Current Streak Strip */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                CURRENT STREAK
              </div>
              <div className="text-sm font-black text-white flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-orange-500 animate-bounce" />
                <span>{streak.current_streak || 2} Days</span>
              </div>
            </div>

            <span className="text-xs font-bold text-orange-400">Keep it going!</span>
          </div>
        </section>

        {/* ── 4. AI COACH CARD ── */}
        <section className="rounded-3xl bg-gradient-to-br from-purple-950/40 via-[#0e111a] to-blue-950/40 border border-purple-500/30 p-5 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="uppercase tracking-wider text-[11px]">AI COACH</span>
            </div>

            {/* Target Graphic Icon matching reference image */}
            <div className="relative h-12 w-12 shrink-0 grid place-items-center">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 animate-pulse" />
              <div className="h-8 w-8 rounded-full bg-purple-600/30 border border-purple-400 grid place-items-center text-purple-300">
                <Target className="h-4 w-4" />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            {orchestration?.coachMessage ||
              `You are on the Need Focus path for ${readiness.companyName} ${readiness.roleTitle}. Complete today's workspace tasks to gain +12% readiness.`}
          </p>

          <button
            onClick={() => {
              const target = orchestration?.primaryRoutingTarget;
              if (target?.actionType === "navigate" && target.route !== "/dashboard") {
                nav({ to: target.route });
              } else {
                onContinueJourney();
              }
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold shadow-lg shadow-purple-500/25 hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2"
          >
            <span>
              Start Task: {orchestration?.primaryRoutingTarget?.label || "Update Your Skills"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>

        {/* ── 5. TODAY'S WORKSPACE ── */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">
                TODAY&apos;S WORKSPACE
              </h2>
              <p className="text-[10px] text-slate-400">
                Complete these {tasksToShow.length} tasks to maximize your progress
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              <Clock className="h-3 w-3 text-purple-400" />
              <span>Estimated time ~ 45 min</span>
            </div>
          </div>

          <div className="space-y-2.5">
            {tasksToShow.map((task: any, index: number) => {
              const Icon = task.icon || Code2;
              return (
                <div
                  key={task.id || index}
                  className="rounded-2xl bg-[#0e111a] border border-white/10 p-3.5 space-y-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {/* Number Badge */}
                      <div className="h-7 w-7 rounded-xl bg-purple-600 text-white font-extrabold text-xs grid place-items-center shrink-0">
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div className="h-7 w-7 rounded-xl bg-slate-900 border border-white/10 grid place-items-center text-purple-400 shrink-0">
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-white leading-tight">
                          {task.title}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.duration || "15 min"}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {task.readiness || "+15 Readiness"}
                      </span>
                      <span className="text-purple-400 font-bold flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-purple-400" />
                        +{task.xp || task.xp_reward || 20} XP
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (task.completed) return;
                        if (task.fake) {
                          onCompleteMission(task);
                        } else {
                          onCompleteMission(task);
                        }
                      }}
                      disabled={task.completed}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition active:scale-95 flex items-center gap-1 ${
                        task.completed
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm"
                      }`}
                    >
                      <span>{task.completed ? "Completed" : "Continue"}</span>
                      {!task.completed && <ArrowRight className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── 6. DREAM COMPANY PROGRESS ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="text-xs font-extrabold text-white uppercase tracking-wider">
            DREAM COMPANY PROGRESS
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Company Logo Icon */}
              <div className="h-10 w-10 rounded-2xl bg-white p-1.5 shadow-md grid place-items-center">
                <div className="h-full w-full rounded-xl bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 grid place-items-center text-white font-extrabold text-xs">
                  {readiness.companyName?.charAt(0) || "G"}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white capitalize leading-tight">
                  {readiness.companyName}
                </h3>
                <p className="text-[10px] text-slate-400">{readiness.roleTitle}</p>
              </div>
            </div>

            {/* Radial Match Score Ring */}
            <div className="relative h-16 w-16 shrink-0 grid place-items-center">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-purple-400"
                  strokeDasharray={`${matchScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-black text-white">
                {matchScore}%
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black text-white">{matchScore}%</div>
            <div className="text-[10px] text-slate-400">Overall Match Score</div>
          </div>

          {/* Matched Skills Bar */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-400">Matched Skills</span>
              <span className="text-white font-bold">
                {matchedSkillsCount} / {totalSkills}
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                style={{ width: `${skillsProgress}%` }}
              />
            </div>
          </div>

          {/* Tech Requirements */}
          <div className="space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold">Tech Requirements</div>
            <div className="text-xs font-bold text-white">
              JavaScript, React, Node.js
            </div>
          </div>

          <button
            onClick={() => nav({ to: "/career-identity" })}
            className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:bg-white/10 flex items-center justify-center gap-2 transition"
          >
            <span>View Requirements</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </section>

        {/* ── 7. CAREER JOURNEY ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="text-xs font-extrabold text-white uppercase tracking-wider">
            CAREER JOURNEY
          </div>

          {/* Horizontal Stepper */}
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center min-w-[340px] justify-between relative px-2">
              <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-800 z-0" />

              {journeySteps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="relative z-10 flex flex-col items-center gap-1.5">
                    <div
                      className={`h-9 w-9 rounded-full grid place-items-center border-2 transition-all ${
                        step.id === "current"
                          ? "bg-purple-950 border-purple-400 text-purple-300 shadow-lg shadow-purple-500/30"
                          : step.active
                          ? "bg-purple-600 border-purple-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-500"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-white whitespace-nowrap">
                        {step.label}
                      </div>
                      <div className="text-[9px] text-slate-400">{step.score}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => nav({ to: "/role-explorer" })}
            className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:bg-white/10 flex items-center justify-center gap-2 transition"
          >
            <span>View Full Journey</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </section>

        {/* ── 8. CAREER HEALTH ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider">
              CAREER HEALTH
            </h2>
            <button
              onClick={() => nav({ to: "/profile" })}
              className="text-xs text-purple-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {healthItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-slate-900 border border-white/10 grid place-items-center text-purple-400">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-bold text-white">{item.label}</span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {item.score} / 100
                    </span>
                  </div>

                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${Math.min(100, Math.max(4, item.score))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ── 9. FIXED MOBILE BOTTOM NAVIGATION BAR ── */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#07090e]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around pb-safe">
        {[
          { label: "Dashboard", href: "/dashboard", icon: TrendingUp, isActive: true },
          { label: "Workspace", href: "/dashboard/workspace", icon: Clock },
          { label: "AI SyncPilot", action: openSyncPilot, icon: Sparkles, isCenter: true },
          { label: "Analytics", href: "/resume-intelligence", icon: BarChart3 },
          { label: "Profile", href: "/profile", icon: User },
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
                <div
                  className={`h-full w-full rounded-full grid place-items-center transition ${
                    isSyncPilotOpen ? "bg-purple-950 text-cyan-300" : "bg-slate-950 text-purple-300"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                </div>
              </button>
            );
          }

          return (
            <Link
              key={tab.label}
              to={tab.href}
              className={`flex flex-col items-center gap-0.5 transition px-3 py-1 ${
                tab.isActive
                  ? "text-purple-400 font-bold"
                  : "text-slate-400 hover:text-purple-400"
              }`}
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

function Smartphone(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
