import React from "react";
import { motion } from "framer-motion";
import { Activity, Target } from "lucide-react";

interface ActivityTimelineProps {
  placementStats: any;
}

export const ActivityTimeline = React.memo(function ActivityTimeline({ placementStats }: ActivityTimelineProps) {
  // Use existing data only.
  const activities = [];

  if (placementStats) {
    const statDate = new Date(placementStats.created_at);
    const today = new Date();
    const isToday = statDate.toDateString() === today.toDateString();
    
    let group = "Earlier";
    if (isToday) group = "Today";
    else if (today.getTime() - statDate.getTime() < 86400000 * 2) group = "Yesterday";
    else if (today.getTime() - statDate.getTime() < 86400000 * 7) group = "This Week";

    activities.push({
      id: placementStats.id,
      title: "Placement Readiness Updated",
      description: `Your overall readiness score reached ${placementStats.total_score}%.`,
      time: statDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      group,
      icon: Target,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    });
  }

  const groupedActivities = activities.reduce((acc: any, act) => {
    if (!acc[act.group]) acc[act.group] = [];
    acc[act.group].push(act);
    return acc;
  }, {});

  const order = ["Today", "Yesterday", "This Week", "Earlier"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="activity"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Activity Timeline</h2>
          <p className="text-sm text-muted-foreground font-medium">A chronological record of your career progress.</p>
        </div>
      </div>

      <div className="glass bg-slate-900/60 border border-white/5 rounded-[32px] p-8 md:p-12 shadow-xl">
        {activities.length > 0 ? (
          <div className="relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-white/5 space-y-12">
            {order.map(groupName => {
              if (!groupedActivities[groupName]) return null;
              
              return (
                <div key={groupName} className="relative">
                  <div className="sticky top-24 z-10 bg-slate-900/80 backdrop-blur-md text-[10px] font-black text-indigo-400 uppercase tracking-widest py-1.5 px-4 rounded-full ml-12 mb-6 inline-block border border-indigo-500/20 shadow-sm">
                    {groupName}
                  </div>
                  
                  <div className="space-y-8">
                    {groupedActivities[groupName].map((act: any, idx: number) => {
                      const Icon = act.icon;
                      return (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                          key={act.id} 
                          className="relative flex items-start gap-6"
                        >
                          <div className={`flex items-center justify-center w-12 h-12 rounded-2xl border ${act.color} shrink-0 shadow-[0_0_0_8px_rgba(15,23,42,1)] z-10`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div className="glass bg-white/5 border border-white/10 p-5 rounded-[24px] flex-1 hover:bg-white/10 transition-colors shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                              <h4 className="font-bold text-white text-base">{act.title}</h4>
                              <time className="text-[10px] text-muted-foreground font-bold bg-black/30 px-2.5 py-1 rounded-md border border-white/5 whitespace-nowrap w-max">{act.time}</time>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed font-medium">{act.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-3xl bg-slate-800 flex items-center justify-center mx-auto mb-5 border border-white/5 shadow-2xl">
              <Activity className="w-8 h-8 text-slate-500" />
            </div>
            <p className="text-white font-bold text-xl mb-2">No recent activity</p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">Complete missions or update your profile to generate career activity here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});
