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
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      id="projects"
      className="space-y-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Featured Projects</h2>
          <p className="text-xs text-slate-500 font-medium">Demonstrate your capabilities through real-world applications.</p>
        </div>
      </div>

      {hasPortfolio ? (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-colors flex flex-col">
            <div className="h-44 bg-slate-100 relative overflow-hidden flex items-center justify-center border-b border-slate-200/80">
              <LayoutTemplate className="w-16 h-16 text-slate-300" />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Completed
                </span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1 space-y-4">
              <div>
                <p className="text-[10px] text-purple-600 font-extrabold uppercase tracking-wider font-mono mb-0.5">Personal Website</p>
                <h4 className="text-base font-bold text-slate-900">Main Portfolio</h4>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed font-medium flex-1">
                A comprehensive showcase of my recent work, technical skills, and professional experience, deployed to the web.
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200/80 rounded-lg text-[10px] font-bold text-slate-700 uppercase tracking-wider font-mono">React</span>
                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200/80 rounded-lg text-[10px] font-bold text-slate-700 uppercase tracking-wider font-mono">Tailwind</span>
                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200/80 rounded-lg text-[10px] font-bold text-slate-700 uppercase tracking-wider font-mono">TypeScript</span>
              </div>
              
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <a 
                  href={profile.portfolio.startsWith('http') ? profile.portfolio : `https://${profile.portfolio}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 h-9 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
                <button onClick={onEditClick} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 flex items-center justify-center transition-colors cursor-pointer">
                  <Edit className="w-3.5 h-3.5 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-200">
            <FolderDot className="w-6 h-6 text-purple-600" />
          </div>
          
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="text-slate-900 font-bold text-base font-display">Build your portfolio</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Linking a live portfolio or importing repositories dramatically improves your recruiter visibility.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 mt-2 w-full sm:w-auto">
            <button onClick={onEditClick} className="w-full sm:w-auto h-9 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95">
              <Link2 className="w-3.5 h-3.5" /> Link Portfolio
            </button>
            <button onClick={onEditClick} className="w-full sm:w-auto h-9 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/80 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Github className="w-3.5 h-3.5 text-slate-600" /> Import GitHub
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
});
