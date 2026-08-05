import { ArrowRight, TrendingUp, Github, Target, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface RecentActivityCardProps {
  recentConversations: any[];
}

export function RecentActivityCard({ recentConversations }: RecentActivityCardProps) {
  // Create a structured list of recent activities based on available data.
  // In a real app, this might come from a unified activity feed API.
  const activities = [
    {
      id: 1,
      title: "Resume ATS improved to 85%",
      subtitle: "+5 points",
      time: "2h ago",
      icon: TrendingUp,
      iconColor: "text-emerald-400 bg-emerald-400/10",
    },
    {
      id: 2,
      title: "GitHub analysis completed",
      subtitle: "Strong contribution detected",
      time: "5h ago",
      icon: Github,
      iconColor: "text-white bg-white/10",
    },
    {
      id: 3,
      title: "Daily mission completed",
      subtitle: "+40 XP earned",
      time: "1d ago",
      icon: Target,
      iconColor: "text-indigo-400 bg-indigo-400/10",
    },
    {
      id: 4,
      title: "New streak milestone",
      subtitle: "6 days in a row! 🔥",
      time: "1d ago",
      icon: Flame,
      iconColor: "text-orange-400 bg-orange-400/10",
    }
  ];

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col h-full backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</h3>
        <Link to="/profile" className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${activity.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{activity.title}</div>
                <div className={`text-xs mt-0.5 ${activity.subtitle.includes('+') ? 'text-emerald-400 font-medium' : 'text-muted-foreground'}`}>
                  {activity.subtitle}
                </div>
              </div>
              <div className="text-[10px] text-muted-foreground font-medium shrink-0">
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
