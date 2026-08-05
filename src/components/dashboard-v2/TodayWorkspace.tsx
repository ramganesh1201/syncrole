import { FileText, Code2, Github, ArrowRight, Clock, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface TodayWorkspaceProps {
  missions: any[];
  onComplete: (m: any) => void;
}

export function TodayWorkspace({ missions, onComplete }: TodayWorkspaceProps) {
  // Map missions to the 3 required types or use fallbacks to match the UI if missions are empty
  const defaultTasks = [
    {
      id: "resume",
      type: "resume",
      title: "Improve Resume",
      description: "Add missing keywords",
      time: "15 min",
      readiness: "+1.4%",
      xp: 40,
      icon: FileText,
      color: "bg-purple-500/20 text-purple-400",
      btnColor: "bg-purple-600 hover:bg-purple-700 text-white",
      path: "/resume-intelligence"
    },
    {
      id: "dsa",
      type: "dsa",
      title: "Solve 2 DSA Problems",
      description: "Graphs & Dynamic Programming",
      time: "20 min",
      readiness: "+1.8%",
      xp: 40,
      icon: Code2,
      color: "bg-blue-500/20 text-blue-400",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white",
      path: "/dashboard/dsa"
    },
    {
      id: "github",
      type: "github",
      title: "GitHub Activity",
      description: "Make 1 meaningful commit",
      time: "10 min",
      readiness: "+0.6%",
      xp: 20,
      icon: Github,
      color: "bg-emerald-500/20 text-emerald-400",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
      path: "/profile"
    },
  ];

  // We map the incoming missions. If they lack info, we use the fallback info.
  // The user requested 3 large cards sequentially numbered.
  const displayMissions = missions.slice(0, 3).map((m, index) => {
    const fallback = defaultTasks[index] || defaultTasks[0];
    return {
      ...m,
      title: m.title || fallback.title,
      description: m.description || fallback.description,
      time: fallback.time, // fallback for now if no time in mission
      readiness: fallback.readiness,
      xp_reward: m.xp_reward || fallback.xp,
      icon: fallback.icon,
      color: fallback.color,
      btnColor: fallback.btnColor,
      path: fallback.path
    };
  });

  // If there are no missions loaded yet, we can show skeletons or the default tasks.
  const tasksToShow = displayMissions.length === 3 ? displayMissions : defaultTasks.map((t, i) => ({ ...t, xp_reward: t.xp, fake: true }));

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Today's Workspace</h2>
          <p className="text-white text-sm">Complete these 3 tasks to maximize your progress</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
          <Clock className="w-3.5 h-3.5" />
          <span>Estimated time: ~45 min</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tasksToShow.map((task, index) => {
          const Icon = task.icon;
          return (
            <div key={task.id || index} className="bg-slate-900/60 border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-all backdrop-blur-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${task.color.replace('text-', 'bg-').replace('/20', '')} text-white shrink-0`}>
                  {index + 1}
                </div>
                <div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${task.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-base leading-tight">{task.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{task.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    {task.time}
                  </div>
                  <div className="text-emerald-400">
                    {task.readiness} Readiness
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <Star className="w-3.5 h-3.5 fill-purple-400" />
                    +{task.xp_reward} XP
                  </div>
                </div>

                {task.completed ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all bg-white/10 text-white/50 cursor-not-allowed"
                  >
                    Completed
                  </button>
                ) : (
                  <Link
                    to={task.path}
                    className={`w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${task.btnColor}`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
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
