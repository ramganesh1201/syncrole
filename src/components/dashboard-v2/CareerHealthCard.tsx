import { ArrowRight, FileText, Github, Code2, FolderDot, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface CareerHealthCardProps {
  scores: any;
}

export function CareerHealthCard({ scores }: CareerHealthCardProps) {
  const items = [
    {
      id: "resume",
      label: "Resume",
      score: scores.resume_score || 0,
      icon: FileText,
      color: "bg-emerald-500",
      iconColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      link: "/resume-intelligence",
    },
    {
      id: "github",
      label: "GitHub",
      score: scores.github_score || 0,
      icon: Github,
      color: "bg-blue-600",
      iconColor: "text-blue-700 bg-blue-50 border-blue-200",
      link: "/profile",
    },
    {
      id: "dsa",
      label: "DSA",
      score: scores.dsa_score || 0,
      icon: Code2,
      color: "bg-indigo-600",
      iconColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
      link: "/dashboard/dsa",
    },
    {
      id: "projects",
      label: "Projects",
      score: scores.projects_score || 0,
      icon: FolderDot,
      color: "bg-amber-500",
      iconColor: "text-amber-700 bg-amber-50 border-amber-200",
      link: "/profile",
    },
    {
      id: "skills",
      label: "Skills",
      score: scores.skill_score || 0,
      icon: Sparkles,
      color: "bg-purple-600",
      iconColor: "text-purple-700 bg-purple-50 border-purple-200",
      link: "/profile",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Career Health</h3>
          <Link to="/profile" className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.link} className="block group p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${item.iconColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-slate-700">{item.score}/100</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${Math.max(4, item.score)}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
