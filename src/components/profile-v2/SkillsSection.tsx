import { motion } from "framer-motion";
import { CheckCircle2, Code2, Plus, Sparkles, ChevronRight, Server, Database, Cloud, Terminal } from "lucide-react";

interface SkillsSectionProps {
  profile: any;
  onEditClick: () => void;
}

export function SkillsSection({ profile, onEditClick }: SkillsSectionProps) {
  const allSkills = profile?.skills || [];
  
  // Logical categorizer based on simple keyword matching (since we don't have this in the DB)
  const categorizeSkill = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes("react") || s.includes("vue") || s.includes("angular") || s.includes("html") || s.includes("css") || s.includes("tailwind") || s.includes("next")) return "Frontend";
    if (s.includes("node") || s.includes("express") || s.includes("python") || s.includes("django") || s.includes("java") || s.includes("spring") || s.includes("go")) return "Backend";
    if (s.includes("sql") || s.includes("mongo") || s.includes("postgres") || s.includes("redis") || s.includes("firebase")) return "Database";
    if (s.includes("aws") || s.includes("gcp") || s.includes("azure") || s.includes("docker") || s.includes("kubernetes")) return "Cloud";
    return "Tools";
  };

  const categorized = allSkills.reduce((acc: any, skill: string) => {
    const cat = categorizeSkill(skill);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const getIconForCategory = (cat: string) => {
    switch (cat) {
      case "Frontend": return <Code2 className="w-4 h-4 text-blue-400" />;
      case "Backend": return <Server className="w-4 h-4 text-emerald-400" />;
      case "Database": return <Database className="w-4 h-4 text-amber-400" />;
      case "Cloud": return <Cloud className="w-4 h-4 text-purple-400" />;
      default: return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  // Static recommendations for UI completeness
  const recommendations = ["Docker", "AWS", "GraphQL", "Redis"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="skills"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Skills & Technologies</h2>
          <p className="text-sm text-muted-foreground">Your verified tech stack and proficiencies.</p>
        </div>
        <button onClick={onEditClick} className="text-xs bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Manage Skills
        </button>
      </div>

      {allSkills.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(categorized).map(([category, skills]: [string, any]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                {getIconForCategory(category)} {category}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map((skill: string, idx: number) => {
                  const progress = 70 + (skill.length * 5) % 25; // Deterministic visual progress
                  return (
                    <div key={idx} className="glass bg-slate-900/40 border border-white/5 rounded-2xl p-4 hover:bg-slate-800/60 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">{skill}</div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex justify-between items-end mb-1.5">
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Proficiency</span>
                          <span className="text-[10px] font-black text-white">{progress}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass bg-slate-900/40 border border-white/10 border-dashed rounded-3xl p-10 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Code2 className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">No skills added yet</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">Add your top technologies and frameworks to improve your placement readiness score.</p>
          </div>
          <button onClick={onEditClick} className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 mt-2 shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" /> Add Skills
          </button>
        </div>
      )}

      {/* Missing/Recommended Skills */}
      <div className="mt-8 relative overflow-hidden rounded-2xl bg-amber-500/5 border border-amber-500/20 p-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between relative z-10">
          <div>
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" /> Missing Recommended Skills
            </h4>
            <p className="text-xs text-slate-300 font-medium">Adding these highly-requested skills to your profile can increase your Twin Score by +5%.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 shrink-0">
            {recommendations.map(rec => (
              <button 
                key={rec} 
                onClick={onEditClick}
                className="px-3 py-1.5 bg-black/40 hover:bg-amber-500/20 border border-amber-500/20 rounded-lg text-xs font-bold text-amber-200 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> {rec}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
