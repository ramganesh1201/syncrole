import { motion } from "framer-motion";
import { Trophy, ChevronRight, Lock } from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

interface AchievementsSectionProps {
  onViewAllClick: () => void;
}

export function AchievementsSection({ onViewAllClick }: AchievementsSectionProps) {
  // We mock a few achievements for presentation. The user requested premium badge cards, 
  // locked vs unlocked styling, progress indicators, etc.
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Achievements</h2>
          <p className="text-sm text-muted-foreground">Badges earned through career progress.</p>
        </div>
        <button onClick={onViewAllClick} className="text-xs text-indigo-400 font-bold flex items-center gap-1 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-3 py-1.5 rounded-lg">
          View All <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previewAchs.map((a) => {
          return (
            <div 
              key={a.id} 
              className={`group relative glass rounded-3xl p-5 flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden h-[180px] border ${
                a.unlocked 
                  ? "bg-slate-900/60 border-indigo-500/30 hover:border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]" 
                  : "bg-slate-900/30 border-white/5 opacity-70 grayscale hover:grayscale-0"
              }`}
            >
              {!a.unlocked && (
                <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full border border-white/10 z-20">
                  <Lock className="w-3 h-3 text-slate-400" />
                </div>
              )}
              
              <div className={`mb-4 transition-transform duration-500 group-hover:scale-110 relative z-10 ${a.unlocked ? "text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "text-slate-500"}`}>
                <Trophy className="h-10 w-10 mx-auto" strokeWidth={1.5} />
              </div>
              <div className={`text-sm font-bold leading-tight relative z-10 font-display ${a.unlocked ? "text-white" : "text-slate-400"}`}>
                {a.name}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1.5 font-medium px-2">
                {a.desc}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                <div className={`h-full ${a.unlocked ? "bg-indigo-500" : "bg-transparent"}`} style={{ width: `${a.progress}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
