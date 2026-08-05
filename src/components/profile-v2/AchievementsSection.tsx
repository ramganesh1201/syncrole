import { motion } from "framer-motion";
import { Trophy, ChevronRight } from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

interface AchievementsSectionProps {
  onViewAllClick: () => void;
}

export function AchievementsSection({ onViewAllClick }: AchievementsSectionProps) {
  // Since we don't have unlocked codes passed yet (as per strict "no new API calls" rule),
  // we will show a beautiful preview of the Achievement Vault.
  const previewAchs = [
    { id: "first_login", ...ACHIEVEMENT_CATALOG["first_login"] },
    { id: "profile_completed", ...ACHIEVEMENT_CATALOG["profile_completed"] },
    { id: "streak_3", ...ACHIEVEMENT_CATALOG["streak_3"] },
    { id: "resume_uploaded", ...ACHIEVEMENT_CATALOG["resume_uploaded"] },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      id="achievements"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Achievement Showcase</h3>
        <button onClick={onViewAllClick} className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300 transition-colors">
          View All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewAchs.map((a) => {
            return (
              <div 
                key={a.id} 
                className="group relative glass rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden min-h-[120px] bg-white/5 border border-white/5 hover:bg-white/10"
              >
                <div className="mb-3 text-white/40 group-hover:text-white transition-colors duration-500">
                  <Trophy className="h-8 w-8 mx-auto" strokeWidth={1.5} />
                </div>
                <div className="text-xs font-bold leading-tight text-white/90 relative z-10 font-display">
                  {a.name}
                </div>
                <div className="text-[10px] text-white/50 mt-1">
                  {a.desc}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 flex justify-center">
          <button onClick={onViewAllClick} className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 border border-white/10">
            Open Achievement Modal
          </button>
        </div>
      </div>
    </motion.div>
  );
}
