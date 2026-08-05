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
      color: "bg-emerald-400",
      iconColor: "text-emerald-400 bg-emerald-400/10",
      link: "/resume-intelligence",
    },
    {
      id: "github",
      label: "GitHub",
      score: scores.github_score || 0,
      icon: Github,
      color: "bg-blue-500",
      iconColor: "text-blue-500 bg-blue-500/10",
      link: "/profile",
    },
    {
      id: "dsa",
      label: "DSA",
      score: scores.dsa_score || 0,
      icon: Code2,
      color: "bg-purple-500",
      iconColor: "text-purple-500 bg-purple-500/10",
      link: "/dashboard/dsa",
    },
    {
      id: "projects",
      label: "Projects",
      score: scores.projects_score || 0,
      icon: FolderDot,
      color: "bg-amber-400",
      iconColor: "text-amber-400 bg-amber-400/10",
      link: "/profile",
    },
    {
      id: "skills",
      label: "Skills",
      score: scores.skill_score || 0,
      icon: Sparkles,
      color: "bg-sky-400",
      iconColor: "text-sky-400 bg-sky-400/10",
      link: "/profile",
    },
  ];

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Career Health</h3>
          <Link to="/profile" className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300 transition-colors">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.link} className="block group p-2 -mx-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.iconColor} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-medium font-mono">{item.score}/100</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-white transition-all -translate-x-2 group-hover:translate-x-0" />
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                  <div className={`h-full rounded-full ${item.color} group-hover:opacity-100 opacity-80 transition-opacity`} style={{ width: `${item.score}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
