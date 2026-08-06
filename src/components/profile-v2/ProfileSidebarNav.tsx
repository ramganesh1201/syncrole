import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Code2, FolderDot, Github, FileText, Trophy, Activity, Settings } from "lucide-react";

export function ProfileSidebarNav() {
  const [activeSection, setActiveSection] = useState("overview");

  const links = [
    { id: "overview", label: "Overview", icon: User },
    { id: "career-group", label: "Career", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderDot },
    { id: "professional-group", label: "Professional", icon: FileText },
    { id: "resume", label: "Resume", icon: FileText },
    { id: "github", label: "GitHub", icon: Github },
    { id: "growth-group", label: "Growth", icon: Trophy },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "activity", label: "Activity", icon: Activity },
    { id: "settings-group", label: "Settings", icon: Settings },
    { id: "edit-profile", label: "Edit Profile", icon: Settings },
  ];
  
  // We'll just show the high-level groups and important sections in the sidebar for a clean UI
  const navLinks = [
    { id: "overview", label: "Hero Overview", icon: User },
    { id: "career-group", label: "Career Overview", icon: Briefcase },
    { id: "skills", label: "Skills & Tech", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderDot },
    { id: "coding-profiles", label: "Coding Profiles", icon: Github },
    { id: "resume-github", label: "Intelligence", icon: FileText },
    { id: "growth-group", label: "Growth & Activity", icon: Trophy },
    { id: "edit-profile", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to find the most visible element
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-10% 0px -40% 0px", threshold: 0.2 }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL hash without jumping
      window.history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <div className="sticky top-24 z-40 hidden md:block w-full max-w-[240px]">
      <div className="space-y-1 mb-6 px-2">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-3">Career Identity</h3>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.id;
          
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
              {link.label}
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active" 
                  className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-r-full" 
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function ProfileMobileNav() {
  const navLinks = [
    { id: "overview", label: "Overview", icon: User },
    { id: "career-group", label: "Career", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: FolderDot },
    { id: "resume-github", label: "Intelligence", icon: FileText },
    { id: "growth-group", label: "Growth", icon: Trophy },
    { id: "edit-profile", label: "Settings", icon: Settings },
  ];

  return (
    <div className="sticky top-16 z-40 md:hidden w-full bg-background/80 backdrop-blur-xl border-b border-white/5 -mx-4 px-4 pb-2 mb-6 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 w-max pt-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-sm font-medium text-slate-300 whitespace-nowrap"
            >
              <Icon className="w-3.5 h-3.5" />
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
