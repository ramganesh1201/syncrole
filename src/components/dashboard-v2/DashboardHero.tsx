import { ArrowRight, Sparkles, Flame, Building2 } from "lucide-react";
import { UserCareerContext, CompanyReadinessResult, DashboardOrchestrationResult, careerEngine } from "@/lib/career-intelligence";

interface DashboardHeroProps {
  userContext: UserCareerContext;
  userName: string;
  orchestration: DashboardOrchestrationResult;
  onContinueJourney: () => void;
  xp: { total_xp: number; level: number; level_name: string };
  streak: { current_streak: number; longest_streak: number };
}

function CompanyBrandLogo({ companyId }: { companyId: string }) {
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

export function DashboardHero({
  userContext,
  userName,
  orchestration,
  onContinueJourney,
  xp,
  streak,
}: DashboardHeroProps) {
  const selectedCompanyId = userContext?.dream_companies?.[0] || "google";
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );

  const greetingTime = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";
  const firstName = userName?.split(" ")[0] || "Engineer";

  const currentLevel = xp.level || 1;
  const nextLevel = currentLevel + 1;
  const xpNeeded = currentLevel * 1000;
  const xpToNextLevel = Math.max(0, xpNeeded - (xp.total_xp || 0));

  return (
    <div className="bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 border border-slate-200/90 rounded-3xl p-6 md:p-8 mb-8 shadow-xs">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Greeting & Stats */}
        <div className="space-y-5 flex-1 w-full">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-1 flex items-center gap-2">
              {greetingTime}, {firstName}! 👋
            </h1>
            <p className="text-slate-600 text-sm md:text-base font-normal">
              You're on track to achieve your dream career goals.
            </p>
          </div>

          {/* Company Target Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs">
            <CompanyBrandLogo companyId={selectedCompanyId} />
            <span className="capitalize">{readiness.companyName}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">{readiness.roleTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs space-y-0.5">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Placement Readiness</div>
              <div className="text-2xl font-extrabold text-slate-900">{readiness.readinessScore}%</div>
              <div className="text-xs text-emerald-600 font-semibold">↑ 3.6% this week</div>
            </div>
            
            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs space-y-0.5">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold font-mono">XP & Level</div>
              <div className="text-2xl font-extrabold text-slate-900">{xp.total_xp.toLocaleString()}</div>
              <div className="text-xs text-slate-500 font-medium">Level {currentLevel} • {xpToNextLevel} XP to Lv. {nextLevel}</div>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-xs space-y-0.5">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Current Streak</div>
              <div className="text-2xl font-extrabold text-slate-900 flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                {streak.current_streak} Days
              </div>
              <div className="text-xs text-orange-600 font-semibold">Keep it going!</div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Coach Card */}
        <div className="w-full md:w-80 shrink-0">
          <div className="bg-white border border-indigo-100 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" /> AI Coach Guidance
            </div>
            
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {orchestration?.coachMessage || `Focus on high impact tasks today to improve your ${readiness.companyName} readiness by 3-5%.`}
            </p>

            <button
              onClick={() => {
                const target = orchestration?.primaryRoutingTarget;
                if (target?.actionType === "navigate" && target.route !== "/dashboard") {
                  window.location.href = target.route;
                } else {
                  onContinueJourney();
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 font-semibold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <span>{orchestration?.primaryRoutingTarget?.label || "Continue Today's Journey"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
