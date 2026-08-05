import { motion } from "framer-motion";
import { ExternalLink, Github, FolderDot, Edit, Plus, ChevronRight } from "lucide-react";

interface ProjectsSectionProps {
  profile: any;
  onEditClick: () => void;
}

export function ProjectsSection({ profile, onEditClick }: ProjectsSectionProps) {
  const hasPortfolio = !!profile?.portfolio;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      id="projects"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Projects & Portfolio</h3>
        {hasPortfolio && (
          <button onClick={onEditClick} className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300">
            Edit Portfolio <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {hasPortfolio ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all group">
            {/* Project Image Placeholder */}
            <div className="h-40 bg-slate-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              <FolderDot className="w-12 h-12 text-white/20" />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-lg font-bold text-white">Main Portfolio</h4>
                  <p className="text-sm text-indigo-400 font-medium">Personal Website</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Active</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                A showcase of my recent work, skills, and professional experience.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300 font-medium">React</span>
                <span className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300 font-medium">Tailwind</span>
              </div>
              
              <div className="flex items-center gap-3">
                <a href={profile.portfolio.startsWith('http') ? profile.portfolio : `https://${profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <button onClick={onEditClick} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Edit className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass bg-slate-900/60 border border-white/10 border-dashed rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <FolderDot className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-white font-semibold">No portfolio added yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">Link your personal website or portfolio to showcase your best work to recruiters.</p>
          </div>
          <button onClick={onEditClick} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Portfolio URL
          </button>
        </div>
      )}
    </motion.div>
  );
}
