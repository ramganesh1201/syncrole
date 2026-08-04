import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Flame, TrendingUp, Award, Target, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { UserCareerContext, CompanyReadinessResult, careerEngine } from "@/lib/career-intelligence";

interface AICoachHeroProps {
  userContext: UserCareerContext;
  userName: string;
  totalXp: number;
  levelName: string;
  currentStreak: number;
  scores: any[];
}

export function AICoachHero({
  userContext,
  userName,
  totalXp,
  levelName,
  currentStreak,
  scores,
}: AICoachHeroProps) {
  const selectedCompanyId = userContext.dream_companies?.[0] || "google";
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );

  const prevScore = scores[1]?.total_score ?? readiness.readinessScore;
  const growthDelta = readiness.readinessScore - prevScore;

  // Dynamic context-aware AI Coach message
  const mentorMessage = useMemo(() => {
    const timeOfDay = new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening";
    const firstName = userName ? userName.split(" ")[0] : "Engineer";

    if (growthDelta > 0) {
      return `Good ${timeOfDay}, ${firstName}! 🚀 You've gained +${growthDelta}% readiness toward ${readiness.companyName} since your last milestone. Keep this momentum going!`;
    }
    if (readiness.readinessScore >= 75) {
      return `Good ${timeOfDay}, ${firstName}! 🏆 You're in the top tier readiness (${readiness.readinessScore}%) for ${readiness.companyName} ${readiness.roleTitle}. Focus on live mock interviews today.`;
    }
    return `Good ${timeOfDay}, ${firstName}! 🎯 You've mastered ${readiness.matchedSkills.length} of ${
      readiness.matchedSkills.length + readiness.missingSkills.length
    } required skills for ${readiness.companyName} ${readiness.roleTitle}. Let's complete today's top task to reach your next milestone!`;
  }, [userName, growthDelta, readiness]);

  return (
    <div className="relative rounded-3xl p-px overflow-hidden mb-6">
      <div className="absolute inset-0 rounded-3xl bg-aurora opacity-30 blur-xl pointer-events-none" />

      <div className="relative rounded-[23px] glass-strong p-6 md:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Living AI Career Coach
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
              {mentorMessage}
            </h1>
          </div>

          {/* Streak & XP Quick Badges */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="glass rounded-2xl px-4 py-3 border border-white/10 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Flame className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-muted-foreground font-semibold">Streak</div>
                <div className="text-sm font-bold text-white">{currentStreak} Days</div>
              </div>
            </div>

            <div className="glass rounded-2xl px-4 py-3 border border-white/10 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-aurora/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-aurora" />
              </div>
              <div>
                <div className="text-[10px] uppercase text-muted-foreground font-semibold">{levelName}</div>
                <div className="text-sm font-bold text-white">{totalXp} XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Questions Quick Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-white/10">
          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">1. Target Goal</div>
            <div className="text-xs font-bold text-white truncate">{readiness.companyName} • {readiness.roleTitle}</div>
          </div>

          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">2. Readiness Status</div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>{readiness.readinessScore}%</span>
              <span className="text-[10px] text-white/70 font-normal">({readiness.status})</span>
            </div>
          </div>

          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">3. Skills Mastered</div>
            <div className="text-xs font-bold text-white">
              {readiness.matchedSkills.length} / {readiness.matchedSkills.length + readiness.missingSkills.length} Core
            </div>
          </div>

          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">4. Today's Gain</div>
            <div className="text-xs font-bold text-accent">+3.5% Readiness + XP</div>
          </div>
        </div>
      </div>
    </div>
  );
}
