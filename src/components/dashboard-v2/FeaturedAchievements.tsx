import { useState } from "react";
import { ArrowRight, Hexagon, Code2, FileText, Flame, Trophy, Star, ChevronUp, CheckCircle, Target, Briefcase, Diamond, Crown, Sun, Moon, Code, Terminal, Cpu, Brain, CheckSquare, Activity, ShieldAlert, Zap, Maximize, FileCheck, Award, Medal, Key, LayoutTemplate, Github, GitCommit, GitMerge, Globe, Mic, Video, MonitorPlay, MessageSquare, Users, TerminalSquare, Layers, TrendingUp, PartyPopper, Rocket } from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

interface FeaturedAchievementsProps {
  unlockedCodes: string[];
}

export function FeaturedAchievements({ unlockedCodes }: FeaturedAchievementsProps) {
  const [showAll, setShowAll] = useState(false);

  const featured = [
    {
      id: "week_warrior",
      title: "Week Warrior",
      description: "Maintain 7-day streak",
      xp: "+100 XP",
      icon: Hexagon,
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "code_consistent",
      title: "Code Consistent",
      description: "10 GitHub commits",
      xp: "+75 XP",
      icon: Code2,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      id: "resume_booster",
      title: "Resume Booster",
      description: "Improve ATS to 80+",
      xp: "+75 XP",
      icon: FileText,
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      id: "dsa_performer",
      title: "DSA Performer",
      description: "Solve 50 problems",
      xp: "+100 XP",
      icon: Flame,
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
      id: "mission_master",
      title: "Mission Master",
      description: "Complete 20 missions",
      xp: "+150 XP",
      icon: Trophy,
      badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
    },
    {
      id: "rising_star",
      title: "Rising Star",
      description: "Reach 30% readiness",
      xp: "+100 XP",
      icon: Star,
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
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
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Achievements</h3>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
        >
          {showAll ? (
            <><span>Hide Achievements</span> <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <><span>View All Achievements</span> <ArrowRight className="w-3.5 h-3.5" /></>
          )}
        </button>
      </div>

      {showAll ? (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Object.entries(ACHIEVEMENT_CATALOG).map(([code, a]) => {
              const unlocked = unlockedCodes.includes(code);
              const IconComponent = IconMap[a.icon] || Trophy;

              return (
                <div 
                  key={code} 
                  className={`bg-slate-50 border rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all ${
                    unlocked ? "border-blue-200 bg-blue-50/40 text-slate-900" : "border-slate-200 opacity-50 grayscale"
                  }`}
                >
                  <div className={`mb-2 ${unlocked ? "text-blue-600" : "text-slate-400"}`}>
                    <IconComponent className="h-6 w-6 mx-auto" />
                  </div>
                  <div className="text-[11px] font-bold leading-tight text-slate-900">
                    {a.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featured.map((ach) => {
            const Icon = ach.icon;
            return (
              <div key={ach.id} className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs transition group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6 text-slate-800" />
                </div>
                <h4 className="text-slate-900 font-bold text-xs mb-0.5 line-clamp-1">{ach.title}</h4>
                <p className="text-[10px] text-slate-500 mb-2 line-clamp-1">{ach.description}</p>
                <div className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border font-mono ${ach.badgeColor}`}>
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
