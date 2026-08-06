import React from "react";
import { motion } from "framer-motion";
import { Banknote, Map, Building2, Briefcase, Clock, CalendarDays } from "lucide-react";

interface CareerOverviewProps {
  profile: any;
}

export const CareerOverview = React.memo(function CareerOverview({ profile }: CareerOverviewProps) {
  const cards = [
    { 
      label: "Expected Salary", 
      value: profile?.expected_salary || "Not Set", 
      icon: Banknote,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20"
    },
    { 
      label: "Preferred Location", 
      value: profile?.preferred_location || profile?.city || "Remote", 
      icon: Map,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20"
    },
    { 
      label: "Engineering Domain", 
      value: profile?.career_goal ? profile.career_goal.charAt(0).toUpperCase() + profile.career_goal.slice(1) : "Software", 
      icon: Briefcase,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20"
    },
    { 
      label: "Company Fit", 
      value: profile?.company_preference || "MNC / Startup", 
      icon: Building2,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20"
    },
    {
      label: "Experience Level",
      value: "Entry Level", // Mocked as it's not strictly in profile, but standard for student profiles
      icon: Clock,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20"
    },
    {
      label: "Graduation Year",
      value: profile?.graduation_year || "In Progress",
      icon: CalendarDays,
      color: "text-rose-400",
      bg: "bg-rose-500/10 border-rose-500/20"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="career"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Career Snapshot</h2>
          <p className="text-sm text-muted-foreground font-medium">Your primary objectives and structural preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="glass bg-slate-900/60 border border-white/5 rounded-3xl p-6 flex flex-col justify-center h-[140px] hover:bg-slate-800/80 transition-all group shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${card.bg} transition-transform group-hover:scale-105`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
                <p className="text-sm font-bold text-white truncate group-hover:text-indigo-200 transition-colors">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
