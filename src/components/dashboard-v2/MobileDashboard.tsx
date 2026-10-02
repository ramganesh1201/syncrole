import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Sparkles,
  TrendingUp,
  Flame,
  Trophy,
  Target,
  Github,
  FileText,
  ArrowRight,
  Code2,
  Clock,
  Briefcase,
  Layers,
  Home,
  Building2,
  FolderDot,
  BookOpen,
  Star,
  GraduationCap,
  ChevronRight,
  Activity,
  CheckCircle2,
  Award,
} from "lucide-react";
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

function MobileCompanyLogo({ companyId }: { companyId: string }) {
  const normalized = companyId?.toLowerCase() || "";
  if (normalized.includes("google")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" aria-label="Google Logo">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
  }
  if (normalized.includes("github")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-slate-900" aria-label="GitHub Logo">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    );
  }
  return <Building2 className="w-4 h-4 text-blue-600 shrink-0" />;
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
  const selectedCompanyId = userContext?.dream_companies?.[0] || "google";
  const hasTarget = Boolean(selectedCompanyId);
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );

  const hours = new Date().getHours();
  const greetingTime =
    hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
  const firstName = userName?.split(" ")[0] || "Engineer";

  const currentLevel = xp?.level || 1;
  const nextLevel = currentLevel + 1;
  const xpNeeded = currentLevel * 1000;
  const xpToNextLevel = Math.max(0, xpNeeded - (xp?.total_xp || 0));

  const defaultTasks = [
    {
      id: "skills_update",
      number: 1,
      title: "Update Your Skills",
      description: "Add a new skill to profile",
      duration: "15 min",
      readiness: "+1.4% readiness",
      xp: 20,
      icon: Code2,
      path: "/profile",
    },
    {
      id: "dsa_practice",
      number: 2,
      title: "Practice DSA Problems",
      description: "Arrays & Linked Lists focus",
      duration: "20 min",
      readiness: "+2.1% readiness",
      xp: 30,
      icon: Code2,
      path: "/dashboard/dsa",
    },
    {
      id: "resume_review",
      number: 3,
      title: "Complete Resume Review",
      description: "AI ATS check & suggestions",
      duration: "10 min",
      readiness: "+1.8% readiness",
      xp: 25,
      icon: FileText,
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
            path: fallback.path,
          };
        })
      : defaultTasks;

  const currentScore = userContext?.placementScore || 50;
  const journeySteps = [
    { label: "Foundation", score: 50, active: currentScore >= 50, current: currentScore < 70 },
    { label: "Internship", score: 70, active: currentScore >= 70, current: currentScore >= 70 && currentScore < 90 },
    { label: "Product", score: 90, active: currentScore >= 90, current: currentScore >= 90 && currentScore < 100 },
    { label: "Dream Offer", score: 100, active: currentScore >= 100, current: currentScore >= 100 },
  ];

  const healthItems = [
    { label: "Resume", score: latestScore?.resume_score || 78, icon: FileText, color: "bg-emerald-500" },
    { label: "GitHub", score: latestScore?.github_score || 62, icon: Github, color: "bg-blue-600" },
    { label: "DSA", score: latestScore?.dsa_score || 37, icon: Code2, color: "bg-indigo-600" },
    { label: "Projects", score: latestScore?.projects_score || 100, icon: FolderDot, color: "bg-amber-500" },
    { label: "Skills", score: latestScore?.skill_score || 24, icon: Sparkles, color: "bg-purple-600" },
  ];

  const achievementsList = [
    { title: "Week Warrior", desc: "+100 XP", icon: Trophy, color: "text-amber-500 bg-amber-50 border-amber-200" },
    { title: "Code Consistent", desc: "+75 XP", icon: Code2, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
    { title: "ATS Master", desc: "+50 XP", icon: FileText, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { title: "Target Locked", desc: "+50 XP", icon: Target, color: "text-purple-600 bg-purple-50 border-purple-200" },
  ];

  const recentActivities = [
    { title: "Resume ATS improved to 85%", change: "+5 points", time: "2h ago", icon: FileText },
    { title: "Completed Arrays & Strings practice", change: "+20 XP", time: "5h ago", icon: Code2 },
    { title: "Target set to Google Mobile App Dev", change: "Updated", time: "1d ago", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans pb-28 px-4 pt-4 space-y-4">
      {/* 1. GREETING & ACTIVE TARGET */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {greetingTime}, {firstName}! 👋
          </h1>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          You're on track to achieve your dream career goals.
        </p>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          {hasTarget ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs">
              <MobileCompanyLogo companyId={selectedCompanyId} />
              <span className="capitalize">{readiness.companyName}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 font-normal">{readiness.roleTitle}</span>
            </div>
          ) : (
            <Link
              to="/career-identity"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700"
            >
              <Target className="h-3.5 w-3.5 text-indigo-600" />
              <span>Set your dream target</span>
            </Link>
          )}
        </div>
      </section>

      {/* 2. READINESS + XP + STREAK CARD */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              PLACEMENT READINESS
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {readiness.readinessScore}%
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, readiness.readinessScore))}%` }}
              />
            </div>
            <div className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>↑ 3.6% this week</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              XP & LEVEL
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {xp?.total_xp || 285}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Level {currentLevel} • {xpToNextLevel || 115} XP to Lv. {nextLevel}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
            <span>{streak?.current_streak || 2} Days Streak</span>
          </div>
          <span className="text-xs font-semibold text-orange-600">Keep it going! 🔥</span>
        </div>
      </section>

      {/* 3. AI COACH GUIDANCE CARD */}
      <section className="bg-gradient-to-br from-indigo-50/90 to-blue-50/60 border border-indigo-100/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>AI Coach Guidance</span>
          </div>
          <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
            Recommended
          </span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {orchestration?.coachMessage ||
            `You are on the Needs Focus path for ${readiness.companyName} ${readiness.roleTitle}. Complete today's task to gain +3.5% readiness.`}
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
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-xs flex items-center justify-center gap-2 transition active:scale-[0.99]"
        >
          <span>
            {orchestration?.primaryRoutingTarget?.label || "Start Task: Update Your Skills"}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* 4. TODAY'S WORKSPACE */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              TODAY'S WORKSPACE
            </h2>
            <p className="text-[11px] text-slate-500">Complete these 3 tasks to maximize readiness</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-2xs">
            <Clock className="h-3 w-3 text-blue-600" />
            <span>~45 min</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {tasksToShow.map((task: any, index: number) => {
            const isDone = Boolean(task?.completed);
            return (
              <div
                key={task?.id || index}
                className={`bg-white border rounded-2xl p-4 space-y-3 shadow-xs transition ${
                  isDone ? "border-slate-200 bg-slate-50/50" : "border-slate-200/90"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-7 w-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                      isDone
                        ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                  </div>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 leading-tight truncate">
                      {task?.title || "Update Skill Profile"}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      {task?.description || "Improve career profile"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <span>{task?.duration || "15 min"}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{task?.readiness || "+1.4% readiness"}</span>
                    <span>•</span>
                    <span className="text-indigo-700 font-bold flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-indigo-600 text-indigo-600" />
                      +{task?.xp || task?.xp_reward || 20} XP
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (!isDone) {
                        onCompleteMission(task);
                      }
                    }}
                    disabled={isDone}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition ${
                      isDone
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs hover:brightness-105 active:scale-95"
                    }`}
                  >
                    <span>{isDone ? "Done" : "Continue"}</span>
                    {!isDone && <ArrowRight className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ACTIVE TARGET DETAILS CARD */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          ACTIVE TARGET
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
              <MobileCompanyLogo companyId={selectedCompanyId} />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 capitalize leading-tight truncate">
                {readiness.companyName}
              </h3>
              <p className="text-[11px] text-slate-500 truncate">{readiness.roleTitle}</p>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="text-xl font-extrabold text-slate-900">{readiness.readinessScore} / 100</div>
            <div className="text-[10px] text-slate-400 font-mono">
              {Math.max(0, 100 - readiness.readinessScore)} pts to close
            </div>
          </div>
        </div>

        <button
          onClick={() => nav({ to: "/career-identity" })}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center justify-center gap-2 transition active:scale-[0.99]"
        >
          <span>Improve Target Profile</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* 6. CAREER HEALTH */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            CAREER HEALTH
          </h2>
          <button
            onClick={() => nav({ to: "/profile" })}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
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
                    <Icon className="h-3.5 w-3.5 text-slate-700" />
                    <span className="font-bold text-slate-900">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    {item.score} / 100
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${Math.min(100, Math.max(4, item.score))}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CAREER JOURNEY */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              CAREER JOURNEY
            </h2>
            <p className="text-[11px] text-slate-600 font-medium mt-0.5">
              Current: <span className="font-bold text-blue-600">Foundation ({currentScore}%)</span>
            </p>
          </div>
          <button
            onClick={() => nav({ to: "/role-explorer" })}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Full Journey</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Path Stepper */}
        <div className="flex items-center justify-between relative pt-2 px-1">
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-200 -translate-y-1/2 -z-0" />

          {journeySteps.map((step, idx) => (
            <div key={step.label} className="relative z-10 flex flex-col items-center gap-1 text-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 text-[10px] font-bold transition ${
                  step.active
                    ? "bg-blue-600 border-blue-600 text-white shadow-2xs"
                    : "bg-white border-slate-300 text-slate-400"
                }`}
              >
                {step.active ? <CheckCircle2 className="h-4 w-4 text-white" /> : idx + 1}
              </div>
              <span
                className={`text-[10px] font-semibold transition ${
                  step.active ? "text-slate-900 font-bold" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. GATE HUB QUICK ACCESS */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 space-y-3 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white/10 text-indigo-300">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">GATE 2027 Information Hub</h3>
            <p className="text-[11px] text-slate-300">Exam schedule, syllabus & study strategy</p>
          </div>
        </div>

        <button
          onClick={() => nav({ to: "/gate" })}
          className="w-full py-2 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
        >
          <span>Explore GATE Hub</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* 9. RECENT ACTIVITY */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          RECENT ACTIVITY
        </h2>

        <div className="space-y-3 pt-1">
          {recentActivities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700 shrink-0">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{act.title}</p>
                    <p className="text-[10px] text-slate-400">{act.time}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                  {act.change}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. ACHIEVEMENTS CAROUSEL */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            ACHIEVEMENTS
          </h2>
          <button
            onClick={() => nav({ to: "/profile" })}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1 -mx-4 px-4">
          {achievementsList.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.title}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 min-w-[150px] space-y-2 shadow-xs shrink-0"
              >
                <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${ach.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">{ach.title}</h3>
                  <p className="text-[10px] font-bold text-indigo-600 mt-0.5">{ach.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
