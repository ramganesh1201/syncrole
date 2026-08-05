import { useState } from "react";
import { ArrowRight, Hexagon, Code2, FileText, Flame, Trophy, Star, ChevronUp, CheckCircle, Target, Briefcase, Diamond, Crown, Sun, Moon, Code, Terminal, Cpu, Brain, CheckSquare, Activity, ShieldAlert, Zap, Maximize, FileCheck, Award, Medal, Key, LayoutTemplate, Github, GitCommit, GitMerge, Globe, Mic, Video, MonitorPlay, MessageSquare, Users, TerminalSquare, Layers, TrendingUp, PartyPopper, Rocket } from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

interface FeaturedAchievementsProps {
  unlockedCodes: string[];
}

export function FeaturedAchievements({ unlockedCodes }: FeaturedAchievementsProps) {
  const [showAll, setShowAll] = useState(false);

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

  const IconMap: Record<string, any> = {
    Rocket, CheckCircle, Target, Briefcase, Flame, Diamond, Crown, Sun,
    Moon, Code, Terminal, CheckSquare, ShieldAlert, Maximize, FileCheck, Medal, Key,
    LayoutTemplate, Github, GitCommit, GitMerge, Globe, Mic, Video, MonitorPlay, Users,
    TerminalSquare, Layers, PartyPopper, Cpu, Brain, Trophy, Zap, Activity, Award, Star, Code2, MessageSquare, TrendingUp
  };

  return (
    <div className="mb-8" id="achievement-vault">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Achievements</h3>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300 transition-colors"
        >
          {showAll ? (
            <>Hide Achievements <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>View All Achievements <ArrowRight className="w-3 h-3" /></>
          )}
        </button>
      </div>

      {showAll ? (
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Object.entries(ACHIEVEMENT_CATALOG).map(([code, a]) => {
              const unlocked = unlockedCodes.includes(code);
              const IconComponent = IconMap[a.icon] || Trophy;

              let rarityColor = "text-white/60 drop-shadow-md";
              let bgGlow = "from-white/10";
              if (unlocked) {
                switch(a.rarity) {
                  case "Common": rarityColor = "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"; bgGlow = "from-emerald-400/20"; break;
                  case "Rare": rarityColor = "text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]"; bgGlow = "from-blue-400/20"; break;
                  case "Epic": rarityColor = "text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]"; bgGlow = "from-purple-400/20"; break;
                  case "Legendary": rarityColor = "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]"; bgGlow = "from-yellow-400/20"; break;
                }
              }

              return (
                <div 
                  key={code} 
                  className={`group relative glass rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden min-h-[110px] ${
                    unlocked ? "hover:-translate-y-1 hover:shadow-xl border border-white/10 hover:border-white/20 cursor-default" : "opacity-40 grayscale hover:opacity-70 cursor-not-allowed"
                  }`}
                >
                  {unlocked && (
                    <div className={`absolute inset-0 bg-gradient-to-b ${bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  )}
                  <div className={`mb-3 transition-transform duration-500 ${unlocked ? "group-hover:scale-110 group-hover:-translate-y-1" : ""} ${rarityColor}`}>
                    <IconComponent className="h-8 w-8 mx-auto" strokeWidth={1.5} />
                  </div>
                  <div className="text-[10px] font-bold leading-tight text-white/90 relative z-10 font-display">
                    {a.name}
                  </div>
                  {unlocked && (
                    <div className="absolute -bottom-8 group-hover:bottom-2 left-0 right-0 text-[8px] text-white/70 transition-all duration-300 px-1 opacity-0 group-hover:opacity-100">
                      {a.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
          {featured.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.id} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center min-w-[160px] snap-center hover:bg-slate-800/80 hover:border-white/20 transition-all cursor-pointer backdrop-blur-xl group">
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
      )}
    </div>
  );
}
