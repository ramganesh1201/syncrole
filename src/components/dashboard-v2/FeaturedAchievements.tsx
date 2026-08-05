import { ArrowRight, Hexagon, Code2, FileText, Flame, Trophy, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface FeaturedAchievementsProps {
  unlockedCodes: string[];
}

export function FeaturedAchievements({ unlockedCodes }: FeaturedAchievementsProps) {
  // Using featured achievements as per requirements (5-8 max).
  const featured = [
    {
      id: "week_warrior",
      title: "Week Warrior",
      description: "Maintain 7-day streak",
      xp: "+100 XP",
      icon: Hexagon,
      color: "text-purple-400 border-purple-500/50 bg-purple-500/10",
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      id: "code_consistent",
      title: "Code Consistent",
      description: "10 GitHub commits",
      xp: "+75 XP",
      icon: Code2,
      color: "text-emerald-400 border-emerald-500/50 bg-emerald-500/10",
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      id: "resume_booster",
      title: "Resume Booster",
      description: "Improve ATS to 80+",
      xp: "+75 XP",
      icon: FileText,
      color: "text-blue-400 border-blue-500/50 bg-blue-500/10",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      id: "dsa_performer",
      title: "DSA Performer",
      description: "Solve 50 problems",
      xp: "+100 XP",
      icon: Flame,
      color: "text-orange-400 border-orange-500/50 bg-orange-500/10",
      gradient: "from-orange-500 to-red-600",
    },
    {
      id: "mission_master",
      title: "Mission Master",
      description: "Complete 20 missions",
      xp: "+150 XP",
      icon: Trophy,
      color: "text-pink-400 border-pink-500/50 bg-pink-500/10",
      gradient: "from-pink-500 to-purple-600",
    },
    {
      id: "rising_star",
      title: "Rising Star",
      description: "Reach 30% readiness",
      xp: "+100 XP",
      icon: Star,
      color: "text-cyan-400 border-cyan-500/50 bg-cyan-500/10",
      gradient: "from-cyan-500 to-blue-600",
    }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Achievements</h3>
        <button className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300 transition-colors">
          View All Achievements <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
        {featured.map((ach) => {
          const Icon = ach.icon;
          return (
            <div key={ach.id} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center min-w-[160px] snap-center hover:bg-slate-800/80 hover:border-white/20 transition-all cursor-pointer backdrop-blur-xl group">
              {/* Hexagon style icon container */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ach.gradient} p-[2px] mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${ach.gradient} opacity-20`} />
                  <Icon className="w-7 h-7 text-white drop-shadow-md z-10" />
                </div>
              </div>
              <h4 className="text-white font-bold text-sm mb-1 line-clamp-1">{ach.title}</h4>
              <p className="text-[10px] text-muted-foreground mb-3 line-clamp-1">{ach.description}</p>
              <div className={`text-[10px] font-bold px-3 py-1 rounded-full border ${ach.color}`}>
                {ach.xp}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
