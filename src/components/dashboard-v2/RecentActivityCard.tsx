import { ArrowRight, TrendingUp, Github, Target, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface RecentActivityCardProps {
  recentConversations: any[];
}

export function RecentActivityCard({ recentConversations }: RecentActivityCardProps) {
  const activities = [
    {
      id: 1,
      title: "Resume ATS improved to 85%",
      subtitle: "+5 points",
      time: "2h ago",
      icon: TrendingUp,
      iconColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
    {
      id: 2,
      title: "GitHub analysis completed",
      subtitle: "Strong contribution detected",
      time: "5h ago",
      icon: Github,
      iconColor: "text-slate-800 bg-slate-100 border-slate-200",
    },
    {
      id: 3,
      title: "Daily mission completed",
      subtitle: "+40 XP earned",
      time: "1d ago",
      icon: Target,
      iconColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    },
    {
      id: 4,
      title: "New streak milestone",
      subtitle: "6 days in a row! 🔥",
      time: "1d ago",
      icon: Flame,
      iconColor: "text-orange-700 bg-orange-50 border-orange-200",
    }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col h-full shadow-xs">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Recent Activity</h3>
        <Link to="/profile" className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">
          <span>View All</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-1 no-scrollbar">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition">
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${activity.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{activity.title}</div>
                <div className={`text-[11px] mt-0.5 ${activity.subtitle.includes('+') ? 'text-emerald-700 font-semibold' : 'text-slate-500'}`}>
                  {activity.subtitle}
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-400 shrink-0">
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
