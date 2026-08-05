import { motion } from "framer-motion";
import { Activity, Circle, Target } from "lucide-react";

interface ActivityTimelineProps {
  placementStats: any;
}

export function ActivityTimeline({ placementStats }: ActivityTimelineProps) {
  // We use the available data fetched in profile.tsx without making new API calls.
  const activities = [];

  if (placementStats) {
    activities.push({
      id: placementStats.id,
      title: "Placement Readiness Updated",
      description: `Your overall readiness score is now ${placementStats.total_score}%`,
      time: new Date(placementStats.created_at).toLocaleDateString(),
      icon: Target,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    });
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      id="activity"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</h3>
      </div>

      <div className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
        {activities.length > 0 ? (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(15,23,42,1)] z-10">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-sm">{act.title}</h4>
                      <time className="text-[10px] text-muted-foreground font-medium">{act.time}</time>
                    </div>
                    <p className="text-xs text-slate-300">{act.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <Activity className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-white font-semibold">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1">Complete missions or update your profile to see activity here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
