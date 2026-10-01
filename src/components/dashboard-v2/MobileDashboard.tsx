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
  CheckCircle2,
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
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
  }
  if (normalized.includes("github")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0 text-slate-900">
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

  const greetingTime =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";
  const firstName = userName?.split(" ")[0] || "Engineer";

  const currentLevel = xp.level || 1;
  const nextLevel = currentLevel + 1;
  const xpNeeded = currentLevel * 1000;
  const xpToNextLevel = Math.max(0, xpNeeded - (xp.total_xp || 0));

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
      path: "/profile",
    },
    {
      id: "dsa_practice",
      number: 2,
      title: "Practice DSA Problems",
      description: "Graphs & Arrays",
      duration: "20 min",
      readiness: "+10 Readiness",
      xp: 30,
      icon: Code2,
      path: "/dashboard/dsa",
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

  const currentScore = userContext.placementScore || 50;
  const journeySteps = [
    { id: "current", label: "Current", score: `${currentScore}%`, icon: Home, active: true },
    { id: "foundation", label: "Foundation", score: "50%", icon: BookOpen, active: currentScore >= 50 },
    { id: "internship", label: "Internship", score: "70%", icon: Briefcase, active: currentScore >= 70 },
    { id: "product", label: "Product", score: "90%", icon: Layers, active: currentScore >= 90 },
    { id: "dream", label: "Dream Offer", score: "100%", icon: Trophy, active: currentScore >= 100 },
  ];

  const healthItems = [
    { label: "Resume", score: latestScore.resume_score || 82, icon: FileText, color: "bg-emerald-500" },
    { label: "GitHub", score: latestScore.github_score || 62, icon: Github, color: "bg-blue-600" },
    { label: "DSA", score: latestScore.dsa_score || 37, icon: Code2, color: "bg-indigo-600" },
    { label: "Projects", score: latestScore.projects_score || 38, icon: FolderDot, color: "bg-amber-500" },
    { label: "Skills", score: latestScore.skill_score || 24, icon: Sparkles, color: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans pb-24 px-4 pt-4 space-y-4">
      {/* Greeting */}
      <section className="space-y-2">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {greetingTime}, {firstName}! 👋
        </h1>
        <p className="text-xs text-slate-600">
          You're on track to achieve your dream career goals.
        </p>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          {hasTarget ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs">
              <MobileCompanyLogo companyId={selectedCompanyId} />
              <span className="capitalize">{readiness.companyName}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">{readiness.roleTitle}</span>
            </div>
          ) : (
            <Link
              to="/career-identity"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700"
            >
              <Target className="h-3.5 w-3.5 text-indigo-600" />
              <span>Set your dream target</span>
            </Link>
          )}
        </div>
      </section>

      {/* Readiness + XP + Streak Card */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              READINESS
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {readiness.readinessScore}%
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, Math.max(5, readiness.readinessScore))}%` }}
              />
            </div>
            <div className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>↑ 3.6% this week</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              XP & LEVEL
            </div>
            <div className="text-2xl font-extrabold text-slate-900">
              {xp.total_xp || 285}
            </div>
            <div className="text-[10px] text-slate-500 font-medium">
              Level {currentLevel} • {xpToNextLevel || 115} XP to Lvl {nextLevel}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
            <span>{streak.current_streak || 2} Days Streak</span>
          </div>
          <span className="text-xs font-semibold text-orange-600">Keep it going!</span>
        </div>
      </section>

      {/* AI Coach Card */}
      <section className="bg-white border border-indigo-100 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>AI Coach Guidance</span>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {orchestration?.coachMessage ||
            `Focus on high impact tasks today to improve your ${readiness.companyName} readiness by 3-5%.`}
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
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2"
        >
          <span>
            {orchestration?.primaryRoutingTarget?.label || "Continue Today's Journey"}
          </span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* Today's Workspace */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              TODAY'S WORKSPACE
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
            <Clock className="h-3 w-3 text-blue-600" />
            <span>~45 min</span>
          </div>
        </div>

        <div className="space-y-2">
          {tasksToShow.map((task: any, index: number) => {
            const Icon = task.icon || Code2;
            return (
              <div key={task.id || index} className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-xs font-bold text-slate-900 leading-tight">
                      {task.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <span>{task.duration || "15 min"}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{task.readiness || "+15 Readiness"}</span>
                    <span>•</span>
                    <span className="text-indigo-700 font-bold flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-indigo-600 text-indigo-600" />
                      +{task.xp || task.xp_reward || 20} XP
                    </span>
                  </div>

                  <button
                    onClick={() => onCompleteMission(task)}
                    disabled={task.completed}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 ${
                      task.completed
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    }`}
                  >
                    <span>{task.completed ? "Done" : "Continue"}</span>
                    {!task.completed && <ArrowRight className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Dream Company Progress */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          DREAM TARGET
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
              <MobileCompanyLogo companyId={selectedCompanyId} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 capitalize leading-tight">
                {readiness.companyName}
              </h3>
              <p className="text-[11px] text-slate-500">{readiness.roleTitle}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-extrabold text-slate-900">{readiness.readinessScore}%</div>
            <div className="text-[10px] text-slate-400 font-mono">Match Score</div>
          </div>
        </div>

        <button
          onClick={() => nav({ to: "/career-identity" })}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center justify-center gap-2 transition"
        >
          <span>View Target Requirements</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* Career Health */}
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
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
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
    </div>
  );
}
