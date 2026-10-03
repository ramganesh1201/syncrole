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
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    { 
      label: "Preferred Location", 
      value: profile?.preferred_location || profile?.city || "Remote", 
      icon: Map,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    { 
      label: "Engineering Domain", 
      value: profile?.career_goal ? profile.career_goal.charAt(0).toUpperCase() + profile.career_goal.slice(1) : "Software", 
      icon: Briefcase,
      color: "text-purple-600 bg-purple-50 border-purple-200"
    },
    { 
      label: "Company Fit", 
      value: profile?.company_preference || "MNC / Startup", 
      icon: Building2,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      label: "Experience Level",
      value: "Entry Level",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      label: "Graduation Year",
      value: profile?.graduation_year || "In Progress",
      icon: CalendarDays,
      color: "text-rose-600 bg-rose-50 border-rose-200"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      id="career"
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Career Snapshot</h2>
          <p className="text-xs text-slate-500 font-medium">Your primary objectives and structural preferences.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3.5 hover:bg-slate-100/80 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider font-mono mb-0.5">{card.label}</p>
                <p className="text-xs font-bold text-slate-900 truncate">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
