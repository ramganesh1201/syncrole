import { motion } from "framer-motion";
import { Banknote, Map, Code2, Target, Calendar } from "lucide-react";

interface CareerOverviewProps {
  profile: any;
}

export function CareerOverview({ profile }: CareerOverviewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      id="career"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Career Overview</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass bg-slate-900/60 border border-white/10 rounded-2xl p-5 hover:bg-slate-800/80 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
            <Banknote className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Expected Salary</p>
          <p className="text-white font-bold">{profile?.expected_salary || "Not specified"}</p>
        </div>

        <div className="glass bg-slate-900/60 border border-white/10 rounded-2xl p-5 hover:bg-slate-800/80 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
            <Map className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Preferred Location</p>
          <p className="text-white font-bold">{profile?.preferred_location || "Not specified"}</p>
        </div>

        <div className="glass bg-slate-900/60 border border-white/10 rounded-2xl p-5 hover:bg-slate-800/80 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
            <Code2 className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Domain</p>
          <p className="text-white font-bold capitalize">{profile?.career_goal || "Not specified"}</p>
        </div>

        <div className="glass bg-slate-900/60 border border-white/10 rounded-2xl p-5 hover:bg-slate-800/80 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mb-3">
            <Target className="w-5 h-5 text-orange-400" />
          </div>
          <p className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Company Fit</p>
          <p className="text-white font-bold capitalize">{profile?.company_preference || "Not specified"}</p>
        </div>
      </div>
    </motion.div>
  );
}
