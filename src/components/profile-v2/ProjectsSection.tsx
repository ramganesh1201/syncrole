import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, FolderDot, Edit, Link2, LayoutTemplate, CheckCircle2, TrendingUp, AlertCircle } from "lucide-react";

interface ProjectsSectionProps {
  profile: any;
  onEditClick: () => void;
}

export const ProjectsSection = React.memo(function ProjectsSection({ profile, onEditClick }: ProjectsSectionProps) {
  const hasPortfolio = !!profile?.portfolio;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="projects"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Featured Projects</h2>
          <p className="text-sm text-muted-foreground font-medium">Demonstrate your capabilities through real-world applications.</p>
        </div>
      </div>

      {hasPortfolio ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass bg-slate-900/60 border border-white/5 rounded-[32px] overflow-hidden hover:bg-slate-800/80 transition-all group shadow-xl flex flex-col">
            {/* Project Image Placeholder */}
            <div className="h-56 bg-slate-800 relative overflow-hidden flex items-center justify-center border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              <LayoutTemplate className="w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-700" />
              
              <div className="absolute top-5 right-5 flex gap-2">
                <span className="bg-emerald-500/90 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1.5">Personal Website</p>
                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">Main Portfolio</h4>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed flex-1">
                A comprehensive showcase of my recent work, technical skills, and professional experience, deployed to the web.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1.5 bg-black/30 border border-white/5 rounded-xl text-[10px] font-bold text-slate-300 uppercase tracking-widest">React</span>
                <span className="px-3 py-1.5 bg-black/30 border border-white/5 rounded-xl text-[10px] font-bold text-slate-300 uppercase tracking-widest">Tailwind</span>
                <span className="px-3 py-1.5 bg-black/30 border border-white/5 rounded-xl text-[10px] font-bold text-slate-300 uppercase tracking-widest">TypeScript</span>
              </div>
              
              {/* Recruiter Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-white/5">
                <div>
                  <p className="text-[9px] uppercase font-black tracking-widest text-slate-500 mb-1">Recruiter Value</p>
                  <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> High Impact</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-black tracking-widest text-slate-500 mb-1">ATS Match</p>
                  <p className="text-sm font-bold text-white">+5% Readiness</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <a href={profile.portfolio.startsWith('http') ? profile.portfolio : `https://${profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex-1 h-11 bg-transparent hover:bg-white/5 text-white border-2 border-white/10 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <button onClick={onEditClick} className="w-11 h-11 rounded-xl bg-transparent hover:bg-white/5 border-2 border-white/10 flex items-center justify-center transition-colors">
                  <Edit className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass bg-slate-900/40 border border-white/10 border-dashed rounded-[32px] p-12 lg:p-16 text-center flex flex-col items-center justify-center gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent opacity-70" />
          
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-slate-800/80 flex items-center justify-center border border-white/10 shadow-2xl mb-3 relative z-10 mx-auto">
              <FolderDot className="w-10 h-10 text-indigo-400" />
            </div>
            <div className="absolute -inset-6 bg-indigo-500/20 blur-3xl rounded-full z-0" />
          </div>
          
          <div className="relative z-10 max-w-md mx-auto space-y-3">
            <h3 className="text-white font-bold text-2xl font-display">Build your portfolio</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Projects are the #1 signal recruiters look for. Linking a live portfolio or importing repositories dramatically improves your visibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 mt-4 w-full sm:w-auto">
            <button onClick={onEditClick} className="w-full sm:w-auto h-11 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Link2 className="w-4 h-4" /> Link Portfolio
            </button>
            <button onClick={onEditClick} className="w-full sm:w-auto h-11 px-6 bg-transparent hover:bg-white/5 text-white border-2 border-white/10 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2">
              <Github className="w-4 h-4" /> Import GitHub
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
});
