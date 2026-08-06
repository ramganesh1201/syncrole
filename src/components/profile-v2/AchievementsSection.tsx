import React from "react";
import { motion } from "framer-motion";
import { Trophy, ChevronRight, Lock, Star } from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

interface AchievementsSectionProps {
  onViewAllClick: () => void;
}

export const AchievementsSection = React.memo(function AchievementsSection({ onViewAllClick }: AchievementsSectionProps) {
  // Use existing data, mocked for presentation of locked/unlocked states per request
  const previewAchs = [
    { id: "first_login", ...ACHIEVEMENT_CATALOG["first_login"], unlocked: true, progress: 100 },
    { id: "profile_completed", ...ACHIEVEMENT_CATALOG["profile_completed"], unlocked: true, progress: 100 },
    { id: "streak_3", ...ACHIEVEMENT_CATALOG["streak_3"], unlocked: true, progress: 100 },
    { id: "resume_uploaded", ...ACHIEVEMENT_CATALOG["resume_uploaded"], unlocked: false, progress: 0 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="achievements"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Career Achievements</h2>
          <p className="text-sm text-muted-foreground font-medium">Milestones reached throughout your professional journey.</p>
        </div>
        <button onClick={onViewAllClick} className="h-10 px-5 bg-transparent border-2 border-white/10 hover:border-white/30 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 self-start md:self-auto">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {previewAchs.map((a, idx) => {
          const isFeatured = idx === 0 && a.unlocked; // Make the first unlocked one "featured"

          return (
            <div 
              key={a.id} 
              className={`group relative glass rounded-[32px] p-6 flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden h-[200px] border shadow-lg ${
                a.unlocked 
                  ? "bg-slate-900/60 border-indigo-500/30 hover:border-indigo-500/50 hover:bg-slate-800/80" 
                  : "bg-slate-900/30 border-white/5 opacity-80 hover:opacity-100 grayscale hover:grayscale-0"
              }`}
            >
              {!a.unlocked && (
                <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full border border-white/10 z-20 backdrop-blur-md">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
              )}

              {isFeatured && (
                <div className="absolute top-4 left-4 bg-amber-500/20 text-amber-400 p-1.5 rounded-full border border-amber-500/30 z-20">
                  <Star className="w-3 h-3" />
                </div>
              )}
              
              <div className={`mb-5 transition-transform duration-500 group-hover:scale-110 relative z-10 ${a.unlocked ? "text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]" : "text-slate-500"}`}>
                <Trophy className="h-12 w-12 mx-auto" strokeWidth={1.5} />
              </div>
              <div className={`text-sm font-bold leading-tight relative z-10 font-display mb-1.5 ${a.unlocked ? "text-white group-hover:text-indigo-200 transition-colors" : "text-slate-400"}`}>
                {a.name}
              </div>
              <div className="text-[10px] text-muted-foreground font-medium px-2 leading-relaxed">
                {a.desc}
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/5">
                <div className={`h-full transition-all duration-1000 ${a.unlocked ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-slate-700"}`} style={{ width: `${a.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
