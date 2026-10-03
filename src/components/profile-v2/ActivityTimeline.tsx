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
      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
      id="activity"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Activity Timeline</h2>
          <p className="text-xs text-slate-500 font-medium">A chronological record of your career progress.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
        {activities.length > 0 ? (
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 space-y-8">
            {order.map(groupName => {
              if (!groupedActivities[groupName]) return null;
              
              return (
                <div key={groupName} className="relative">
                  <div className="sticky top-24 z-10 bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full ml-10 mb-4 inline-block border border-slate-200 shadow-xs">
                    {groupName}
                  </div>
                  
                  <div className="space-y-6">
                    {groupedActivities[groupName].map((act: any, idx: number) => {
                      const Icon = act.icon;
                      return (
                        <motion.div 
                          initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                          key={act.id} 
                          className="relative flex items-start gap-4 ml-1"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 border border-blue-200 text-blue-600 shrink-0 shadow-xs z-10">
                            <Icon className="w-4 h-4" />
                          </div>
                          
                          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex-1 hover:bg-slate-100/60 transition-colors shadow-xs">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                              <h4 className="font-bold text-slate-900 text-sm">{act.title}</h4>
                              <time className="text-[10px] text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap w-max">{act.time}</time>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium">{act.description}</p>
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
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 border border-slate-200 text-slate-400">
              <Activity className="w-6 h-6" />
            </div>
            <p className="text-slate-900 font-bold text-sm mb-1">No recent activity</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">Complete missions or update your profile to generate career activity here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
});
