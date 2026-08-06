import { motion } from "framer-motion";
import { ExternalLink, Github, FolderDot, Edit, Plus, LayoutTemplate, Link2 } from "lucide-react";

interface ProjectsSectionProps {
  profile: any;
  onEditClick: () => void;
}

export function ProjectsSection({ profile, onEditClick }: ProjectsSectionProps) {
  const hasPortfolio = !!profile?.portfolio;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="projects"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Projects & Portfolio</h2>
          <p className="text-sm text-muted-foreground">Showcase your best work to recruiters.</p>
        </div>
      </div>

      {hasPortfolio ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all group shadow-xl">
            {/* Project Image Placeholder */}
            <div className="h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center border-b border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50 group-hover:opacity-100 transition-opacity" />
              <LayoutTemplate className="w-16 h-16 text-white/10 group-hover:scale-110 transition-transform duration-500" />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-emerald-500/90 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">Active</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-lg font-bold text-white mb-0.5 group-hover:text-indigo-400 transition-colors">Main Portfolio</h4>
                  <p className="text-xs text-indigo-400/80 font-bold uppercase tracking-wider">Personal Website</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                A showcase of my recent work, skills, and professional experience, deployed to the web.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-300 uppercase tracking-wider">React</span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-300 uppercase tracking-wider">Tailwind</span>
                <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-slate-300 uppercase tracking-wider">TypeScript</span>
              </div>
              
              <div className="flex items-center gap-3">
                <a href={profile.portfolio.startsWith('http') ? profile.portfolio : `https://${profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20">
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
                <button onClick={onEditClick} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors">
                  <Edit className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass bg-slate-900/40 border border-white/10 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center gap-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/5 via-transparent to-transparent opacity-50" />
          
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center border border-white/10 shadow-xl mb-2 relative z-10 mx-auto">
              <FolderDot className="w-8 h-8 text-indigo-400" />
            </div>
            <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full z-0" />
          </div>
          
          <div className="relative z-10 max-w-sm">
            <p className="text-white font-bold text-lg mb-2">Build your project portfolio</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Recruiters love to see real-world projects. Link your personal website or import projects directly from GitHub.
            </p>
          </div>
          
          <div className="flex items-center gap-3 relative z-10 mt-2">
            <button onClick={onEditClick} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
              <Link2 className="w-4 h-4" /> Link Portfolio
            </button>
            <button onClick={onEditClick} className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> Import GitHub
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
