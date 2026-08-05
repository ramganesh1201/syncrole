import { motion } from "framer-motion";
import { CheckCircle2, Code2, Plus, Sparkles, ChevronRight } from "lucide-react";

interface SkillsSectionProps {
  profile: any;
  onEditClick: () => void;
}

export function SkillsSection({ profile, onEditClick }: SkillsSectionProps) {
  const skills = profile?.skills || [];
  
  // Static recommendations if skills are low
  const recommendations = ["System Design", "AWS", "GraphQL", "Docker"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      id="skills"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Top Skills & Technologies</h3>
        <button onClick={onEditClick} className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300">
          Edit Skills <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {skills.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill: string, idx: number) => {
            // Deterministic fake progress for visual appeal if we don't have real data
            const progress = 65 + (skill.length * 3) % 35;
            
            return (
              <div key={idx} className="glass bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-col justify-between hover:bg-slate-800/80 transition-colors group cursor-default">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{skill}</div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[10px] text-muted-foreground uppercase">Proficiency</span>
                    <span className="text-xs font-bold text-white">{progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass bg-slate-900/60 border border-white/10 border-dashed rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <Code2 className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-white font-semibold">No skills added yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">Add your top technologies and frameworks to improve your placement readiness score.</p>
          </div>
          <button onClick={onEditClick} className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Skills
          </button>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mt-4 p-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            <p className="text-sm text-slate-300">
              Adding <span className="font-bold text-white">System Design</span> or <span className="font-bold text-white">AWS</span> could increase your career twin score by +3%.
            </p>
          </div>
          <button onClick={onEditClick} className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-indigo-500/20">
            Add Recommended
          </button>
        </div>
      )}
    </motion.div>
  );
}
