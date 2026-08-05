import { ArrowRight, Sparkles, Flame, Target } from "lucide-react";
import { UserCareerContext, CompanyReadinessResult, DashboardOrchestrationResult, careerEngine } from "@/lib/career-intelligence";

interface DashboardHeroProps {
  userContext: UserCareerContext;
  userName: string;
  orchestration: DashboardOrchestrationResult;
  onContinueJourney: () => void;
  xp: { total_xp: number; level: number; level_name: string };
  streak: { current_streak: number; longest_streak: number };
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

  // XP Progress calculation (Assuming next level is level * 1000 for display, or use existing logic)
  const currentLevel = xp.level || 1;
  const nextLevel = currentLevel + 1;
  const xpNeeded = currentLevel * 1000;
  const xpToNextLevel = Math.max(0, xpNeeded - (xp.total_xp || 0));

  return (
    <div className="relative rounded-3xl p-px overflow-hidden mb-8">
      {/* Background Gradient & Effects */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-3xl" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none rounded-r-3xl" />
      
      <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side: Greeting & Stats */}
        <div className="space-y-6 flex-1 w-full">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-2 flex items-center gap-2">
              {greetingTime}, {firstName}! 👋
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              You're on track to achieve your dream.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white mb-4">
            {/* Simple colored circle for company logo placeholder */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-red-500" />
            <span className="capitalize">{readiness.companyName}</span>
            <span className="text-muted-foreground mx-1">•</span>
            <span className="text-muted-foreground">{readiness.roleTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Placement Readiness</div>
              <div className="text-2xl font-bold text-white">{readiness.readinessScore}%</div>
              <div className="text-xs text-emerald-400 font-medium">↑ 3.6% this week</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">XP</div>
              <div className="text-2xl font-bold text-white">{xp.total_xp.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground font-medium">Level {currentLevel} • {xpToNextLevel} XP to Lv. {nextLevel}</div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Current Streak</div>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                {streak.current_streak} Days
              </div>
              <div className="text-xs text-orange-400 font-medium">Keep it going!</div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Coach Card */}
        <div className="w-full md:w-80 shrink-0 relative">
          <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
            
            <div className="relative space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
                <Sparkles className="w-4 h-4" /> AI Coach
              </div>
              
              <p className="text-sm text-white/90 leading-relaxed font-medium">
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
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25"
              >
                {orchestration?.primaryRoutingTarget?.label || "Continue Today's Journey"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
