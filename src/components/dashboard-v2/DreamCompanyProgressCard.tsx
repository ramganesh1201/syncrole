import { ArrowRight } from "lucide-react";
import { UserCareerContext, CompanyReadinessResult, careerEngine } from "@/lib/career-intelligence";

interface DreamCompanyProgressCardProps {
  userContext: UserCareerContext;
}

export function DreamCompanyProgressCard({ userContext }: DreamCompanyProgressCardProps) {
  const selectedCompanyId = userContext?.dream_companies?.[0] || "google";
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );

  const matchedSkillsCount = readiness.matchedSkills?.length || 0;
  const totalSkills = matchedSkillsCount + (readiness.missingSkills?.length || 0) || 12; // fallback to 12 if 0
  const skillsProgress = (matchedSkillsCount / totalSkills) * 100;
  
  const score = readiness.readinessScore;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl">
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-6">Dream Company Progress</h3>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-black overflow-hidden">
            {/* Realistically, an image would go here. Using a colored circle for now. */}
            <div className="w-full h-full bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg capitalize leading-none">{readiness.companyName}</h4>
            <p className="text-muted-foreground text-xs">{readiness.roleTitle}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-4xl font-bold text-white mb-1">{score}%</div>
            <div className="text-xs text-muted-foreground">Overall Match Score</div>
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-white/10 fill-none"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-indigo-500 fill-none"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Matched Skills</span>
            <span className="text-white font-bold">{matchedSkillsCount} / {totalSkills}</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${skillsProgress}%` }} />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-1">Next Requirement</div>
          <div className="text-sm font-bold text-white">
            {readiness.missingSkills?.[0] || "Dynamic Programming"}
          </div>
        </div>
      </div>

      <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 text-sm font-semibold transition-all flex items-center justify-center gap-2">
        View Requirements
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
