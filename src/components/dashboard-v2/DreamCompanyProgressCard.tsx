import { useState } from "react";
import { ArrowRight, Target, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { UserCareerContext, CompanyReadinessResult, careerEngine } from "@/lib/career-intelligence";

interface DreamCompanyProgressCardProps {
  userContext: UserCareerContext;
}

export function DreamCompanyProgressCard({ userContext }: DreamCompanyProgressCardProps) {
  const userCompanies = userContext?.dream_companies || [];
  const [activeCompanyId, setActiveCompanyId] = useState<string>(
    userCompanies.length > 0 ? userCompanies[0] : ""
  );

  const currentCompanyId = activeCompanyId || userCompanies[0] || "";
  const hasTarget = Boolean(currentCompanyId);

  // NO DREAM TARGET STATE
  if (!hasTarget) {
    return (
      <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
              DREAM PATH
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="text-xl font-display font-bold text-white leading-snug">
              WHERE DO YOU WANT TO GO?
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Set the company and role you're aiming for. SyncRole will compare your current readiness with that target and build your next steps.
            </p>
          </div>

          <div className="glass rounded-2xl p-4 border border-white/5 space-y-2 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Target className="w-4 h-4 text-accent" />
              <span>Goal → Gap → Next Move</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Define your goal to unlock personalized readiness scoring and targeted practice recommendations.
            </p>
          </div>
        </div>

        <Link
          to="/career-identity"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 text-white rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
        >
          Set My Dream Target
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  // TARGET CONFIGURED STATE
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    currentCompanyId
  );

  const score = readiness.readinessScore;
  const gapPoints = Math.max(0, 100 - score);

  // Determine biggest gap dimension
  const dimensionGaps = [...(readiness.dimensionBreakdowns || [])].sort((a, b) => {
    const gapA = a.targetWeight - (a.weightedScore / (a.targetWeight || 1)) * a.targetWeight;
    const gapB = b.targetWeight - (b.weightedScore / (b.targetWeight || 1)) * b.targetWeight;
    return (a.score - b.score);
  });
  const biggestGap = dimensionGaps[0];

  // Map action link for biggest gap
  let gapRoute = "/career-identity";
  let gapActionLabel = "Improve Target Profile";
  if (biggestGap?.dimension?.toLowerCase().includes("dsa")) {
    gapRoute = "/dashboard/dsa";
    gapActionLabel = "Start DSA Practice";
  } else if (biggestGap?.dimension?.toLowerCase().includes("resume")) {
    gapRoute = "/resume-intelligence";
    gapActionLabel = "Improve Resume";
  } else if (biggestGap?.dimension?.toLowerCase().includes("github") || biggestGap?.dimension?.toLowerCase().includes("project")) {
    gapRoute = "/profile";
    gapActionLabel = "Update Projects";
  }

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-3 h-3 text-purple-400" />
            ACTIVE TARGET
          </span>
          {userCompanies.length > 1 && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">Switch:</span>
              {userCompanies.map((comp) => {
                const compProfile = careerEngine.getCompany(comp);
                const isSelected = comp.toLowerCase() === currentCompanyId.toLowerCase();
                return (
                  <button
                    key={comp}
                    onClick={() => setActiveCompanyId(comp)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                      isSelected
                        ? "bg-purple-600/30 border-purple-500/50 text-white"
                        : "bg-white/5 border-white/10 text-muted-foreground hover:text-white"
                    }`}
                  >
                    {compProfile.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Company & Role Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/15 flex items-center justify-center text-sm font-bold text-white shrink-0">
            <Building2 className="w-5 h-5 text-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-bold text-xl leading-tight truncate">
              {readiness.companyName}
            </h4>
            <p className="text-muted-foreground text-xs font-medium truncate mt-0.5">
              {readiness.roleTitle}
            </p>
          </div>
        </div>

        {/* Target Readiness Score */}
        <div className="glass rounded-2xl p-4 border border-white/5 flex items-center justify-between mb-5">
          <div>
            <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-1">
              TARGET READINESS
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white">{score}</span>
              <span className="text-xs text-muted-foreground font-semibold">/ 100</span>
            </div>
            <div className="text-[11px] font-semibold text-purple-400 mt-1">
              {gapPoints > 0 ? `${gapPoints} points to close` : "Application ready territory"}
            </div>
          </div>

          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-white/10 fill-none"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-purple-500 fill-none"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xs font-bold text-white">{score}%</span>
          </div>
        </div>

        {/* Biggest Gap Highlight */}
        {biggestGap && (
          <div className="mb-6 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-medium">Biggest Gap</span>
              <span className="text-amber-400 font-bold">{biggestGap.dimension} ({biggestGap.score}/100)</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full"
                style={{ width: `${biggestGap.score}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <Link
        to={gapRoute}
        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <span>{gapActionLabel}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
