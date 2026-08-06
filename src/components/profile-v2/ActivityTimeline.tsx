import { motion } from "framer-motion";
import { Activity, Target } from "lucide-react";

interface ActivityTimelineProps {
  placementStats: any;
}

export function ActivityTimeline({ placementStats }: ActivityTimelineProps) {
  // Use existing data only. No fake events.
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
      description: `Your overall readiness score is now ${placementStats.total_score}%`,
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Activity Timeline</h2>
          <p className="text-sm text-muted-foreground">Your recent actions and improvements.</p>
        </div>
      </div>

      <div className="glass bg-slate-900/40 border border-white/10 rounded-3xl p-6 md:p-8">
        {activities.length > 0 ? (
          <div className="relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-px before:bg-white/10 space-y-8">
            {order.map(groupName => {
              if (!groupedActivities[groupName]) return null;
              
              return (
                <div key={groupName} className="relative">
                  <div className="sticky top-20 z-10 bg-slate-900 text-xs font-bold text-indigo-400 uppercase tracking-wider py-1 pl-12 mb-4 inline-block">
                    {groupName}
                  </div>
                  
                  <div className="space-y-6">
                    {groupedActivities[groupName].map((act: any) => {
                      const Icon = act.icon;
                      return (
                        <div key={act.id} className="relative flex items-start gap-4">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-xl border ${act.color} shrink-0 shadow-[0_0_0_8px_rgba(15,23,42,1)] z-10`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          
                          <div className="glass bg-white/5 border border-white/10 p-4 rounded-2xl flex-1 hover:bg-white/10 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-white text-sm">{act.title}</h4>
                              <time className="text-[10px] text-muted-foreground font-medium bg-black/20 px-2 py-0.5 rounded-md border border-white/5">{act.time}</time>
                            </div>
                            <p className="text-xs text-slate-300">{act.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center mx-auto mb-4 border border-white/5 shadow-xl">
              <Activity className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-white font-bold text-lg">No recent activity</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">Complete missions or update your profile to generate activity here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
