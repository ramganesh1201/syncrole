import { useState } from "react";
import { ArrowRight, Target, Building2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { UserCareerContext, CompanyReadinessResult, careerEngine } from "@/lib/career-intelligence";

interface DreamCompanyProgressCardProps {
  userContext: UserCareerContext;
}

function CompanyBrandMark({ companyId, className = "w-6 h-6" }: { companyId: string; className?: string }) {
  const normalized = companyId?.toLowerCase() || "";
  if (normalized.includes("google")) {
    return (
      <svg viewBox="0 0 24 24" className={className}>
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    );
  }
  if (normalized.includes("github")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} text-slate-900`}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    );
  }
  return <Building2 className={`${className} text-blue-600`} />;
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
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
              DREAM PATH
            </span>
          </div>

          <div className="space-y-2 mb-5">
            <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
              WHERE DO YOU WANT TO GO?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Set the company and role you're aiming for. SyncRole will compare your current readiness with that target and build your next steps.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-1.5 mb-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>Goal → Gap → Next Move</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Define your goal to unlock personalized readiness scoring and targeted practice recommendations.
            </p>
          </div>
        </div>

        <Link
          to="/career-identity"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-2.5 text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
        >
          <span>Set My Dream Target</span>
          <ArrowRight className="w-3.5 h-3.5" />
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

  const dimensionGaps = [...(readiness.dimensionBreakdowns || [])].sort((a, b) => {
    return (a.score - b.score);
  });
  const biggestGap = dimensionGaps[0];

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
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <Target className="w-3 h-3 text-indigo-600" />
            ACTIVE TARGET
          </span>
          {userCompanies.length > 1 && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-400">Switch:</span>
              {userCompanies.map((comp) => {
                const compProfile = careerEngine.getCompany(comp);
                const isSelected = comp.toLowerCase() === currentCompanyId.toLowerCase();
                return (
                  <button
                    key={comp}
                    onClick={() => setActiveCompanyId(comp)}
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {compProfile.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Company & Role Header with Official SVG Logo */}
        <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
            <CompanyBrandMark companyId={currentCompanyId} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-slate-900 font-extrabold text-base leading-tight truncate">
              {readiness.companyName}
            </h3>
            <p className="text-slate-500 text-xs font-medium truncate mt-0.5">
              {readiness.roleTitle}
            </p>
          </div>
        </div>

        {/* Target Readiness Score Ring */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between mb-5">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5 font-mono">
              TARGET READINESS
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900">{score}</span>
              <span className="text-xs text-slate-400 font-bold">/ 100</span>
            </div>
            <div className="text-[11px] font-semibold text-indigo-700 mt-0.5">
              {gapPoints > 0 ? `${gapPoints} points to close` : "Application ready territory"}
            </div>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-200 fill-none"
                strokeWidth="7"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-indigo-600 fill-none"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-xs font-bold text-slate-900">{score}%</span>
          </div>
        </div>

        {/* Biggest Gap Highlight */}
        {biggestGap && (
          <div className="mb-5 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-medium">Biggest Gap</span>
              <span className="text-amber-700 font-bold">{biggestGap.dimension} ({biggestGap.score}/100)</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${biggestGap.score}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <Link
        to={gapRoute}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs"
      >
        <span>{gapActionLabel}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
