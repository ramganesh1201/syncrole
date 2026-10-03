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
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      id="achievements"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Career Achievements</h2>
          <p className="text-xs text-slate-500 font-medium">Milestones reached throughout your professional journey.</p>
        </div>
        <button onClick={onViewAllClick} className="h-8 px-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 self-start md:self-auto cursor-pointer shadow-xs">
          View All <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previewAchs.map((a, idx) => {
          const isFeatured = idx === 0 && a.unlocked;

          return (
            <div 
              key={a.id} 
              className={`group relative rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden h-[160px] border shadow-xs ${
                a.unlocked 
                  ? "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md" 
                  : "bg-slate-50/60 border-slate-200/60 opacity-70"
              }`}
            >
              {!a.unlocked && (
                <div className="absolute top-3 right-3 bg-slate-200/80 p-1.5 rounded-full z-20">
                  <Lock className="w-3 h-3 text-slate-500" />
                </div>
              )}

              {isFeatured && (
                <div className="absolute top-3 left-3 bg-amber-50 text-amber-700 p-1 rounded-full border border-amber-200 z-20">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                </div>
              )}
              
              <div className={`mb-3 transition-transform duration-300 group-hover:scale-105 relative z-10 ${a.unlocked ? "text-blue-600" : "text-slate-400"}`}>
                <Trophy className="h-9 w-9 mx-auto" strokeWidth={1.75} />
              </div>
              <div className={`text-xs font-bold leading-tight relative z-10 font-display mb-1 ${a.unlocked ? "text-slate-900" : "text-slate-500"}`}>
                {a.name}
              </div>
              <div className="text-[10px] text-slate-500 font-medium px-1 leading-relaxed line-clamp-2">
                {a.desc}
              </div>
              
              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
                <div className={`h-full transition-all duration-500 ${a.unlocked ? "bg-blue-600" : "bg-slate-300"}`} style={{ width: `${a.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
