import { motion } from "framer-motion";
import { User, Briefcase, Code2, FolderDot, Github, FileText, Trophy, Activity } from "lucide-react";

export function ProfileNav() {
  const links = [
    { id: "overview", label: "Overview", icon: User },
    { id: "career", label: "Career", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderDot },
    { id: "github", label: "GitHub", icon: Github },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  return (
    <div className="sticky top-4 z-40 mb-8 mx-auto hidden md:block">
      <div className="glass bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex items-center justify-between shadow-2xl shadow-indigo-500/5">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon className="w-4 h-4" />
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
