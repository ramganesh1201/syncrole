import { motion } from "framer-motion";
import { Trophy, Flame, Sparkles, Award, Star, ArrowRight } from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

interface AchievementMotivationProps {
  unlockedCodes: string[];
  currentStreak: number;
}

export function AchievementMotivation({
  unlockedCodes,
  currentStreak,
}: AchievementMotivationProps) {
  const safeCodes = Array.isArray(unlockedCodes) ? unlockedCodes : [];
  const latestCode = safeCodes.length > 0 ? safeCodes[safeCodes.length - 1] : null;
  const latestAchievement =
    (latestCode ? ACHIEVEMENT_CATALOG[latestCode] : null) ??
    ACHIEVEMENT_CATALOG["first_login"] ?? {
      name: "First Steps",
      desc: "Started your career journey",
      rarity: "Common",
    };

  const unlockedCount = safeCodes.length;
  const totalCount = Object.keys(ACHIEVEMENT_CATALOG).length;

  return (
    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-accent" /> Win of the Day & Milestone Progress
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            Daily Momentum & Badges
          </h3>
        </div>

        <div className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {unlockedCount} / {totalCount} Badges Unlocked
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Latest Unlocked Badge Card */}
        <div className="glass rounded-2xl p-4 border border-white/5 flex items-center gap-4 bg-aurora/5">
          <div className="w-12 h-12 rounded-2xl bg-aurora/10 border border-aurora/30 grid place-items-center shrink-0">
            <Award className="w-6 h-6 text-aurora" />
          </div>
          <div className="space-y-0.5 min-w-0">
            <div className="text-[10px] uppercase font-bold tracking-wider text-accent">
              Latest Unlocked • {latestAchievement.rarity}
            </div>
            <div className="font-semibold text-white text-sm truncate">{latestAchievement.name}</div>
            <div className="text-xs text-muted-foreground truncate">{latestAchievement.desc}</div>
          </div>
        </div>

        {/* Streak & Weekly Highlight Card */}
        <div className="glass rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 grid place-items-center shrink-0">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{currentStreak} Day Activity Streak</div>
              <div className="text-xs text-muted-foreground">Keep logging in daily to maintain momentum</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-emerald-400">+100 XP</div>
            <div className="text-[10px] text-white/50">Next Bonus</div>
          </div>
        </div>
      </div>
    </div>
  );
}
