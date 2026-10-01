import { FileText, Code2, Github, ArrowRight, Clock, Star, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface TodayWorkspaceProps {
  missions: any[];
  onComplete: (m: any) => void;
}

export function TodayWorkspace({ missions, onComplete }: TodayWorkspaceProps) {
  const defaultTasks = [
    {
      id: "resume",
      type: "resume",
      title: "Improve Resume",
      description: "Add missing keywords & ATS optimization",
      time: "15 min",
      readiness: "+1.4%",
      xp: 40,
      icon: FileText,
      badgeColor: "bg-indigo-50 border-indigo-100 text-indigo-700",
      btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
      path: "/resume-intelligence"
    },
    {
      id: "dsa",
      type: "dsa",
      title: "Solve 2 DSA Problems",
      description: "Graphs & Dynamic Programming practice",
      time: "20 min",
      readiness: "+1.8%",
      xp: 40,
      icon: Code2,
      badgeColor: "bg-blue-50 border-blue-100 text-blue-700",
      btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
      path: "/dashboard/dsa"
    },
    {
      id: "github",
      type: "github",
      title: "GitHub Activity",
      description: "Make 1 meaningful repository commit",
      time: "10 min",
      readiness: "+0.6%",
      xp: 20,
      icon: Github,
      badgeColor: "bg-purple-50 border-purple-100 text-purple-700",
      btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white",
      path: "/profile"
    },
  ];

  const displayMissions = missions.slice(0, 3).map((m, index) => {
    const fallback = defaultTasks[index] || defaultTasks[0];
    return {
      ...m,
      title: m.title || fallback.title,
      description: m.description || fallback.description,
      time: fallback.time,
      readiness: fallback.readiness,
      xp_reward: m.xp_reward || fallback.xp,
      icon: fallback.icon,
      badgeColor: fallback.badgeColor,
      btnColor: fallback.btnColor,
      path: fallback.path
    };
  });

  const tasksToShow = displayMissions.length === 3 ? displayMissions : defaultTasks.map((t) => ({ ...t, xp_reward: t.xp, fake: true }));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Today's Workspace</h2>
          <p className="text-slate-900 text-sm font-semibold">Complete these 3 tasks to maximize your career progress</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-xs">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>Estimated time: ~45 min</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasksToShow.map((task, index) => {
          const Icon = task.icon;
          return (
            <div key={task.id || index} className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all shadow-xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-md border ${task.badgeColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-slate-900 font-bold text-sm leading-snug">{task.title}</h3>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">{task.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{task.time}</span>
                  </div>
                  <div className="text-emerald-700 font-semibold">
                    {task.readiness} Readiness
                  </div>
                  <div className="flex items-center gap-1 text-indigo-700 font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-indigo-600 text-indigo-600" />
                    <span>+{task.xp_reward} XP</span>
                  </div>
                </div>

                {task.completed ? (
                  <button
                    disabled
                    className="w-full py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Completed</span>
                  </button>
                ) : (
                  <Link
                    to={task.path}
                    className={`w-full py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold shadow-xs transition-all ${task.btnColor}`}
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
