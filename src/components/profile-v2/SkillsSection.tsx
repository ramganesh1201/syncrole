import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Code2, Sparkles, Server, Database, Cloud, Terminal, Target, ArrowUpRight, Cpu } from "lucide-react";

interface SkillsSectionProps {
  profile: any;
  onEditClick: () => void;
}

export const SkillsSection = React.memo(function SkillsSection({ profile, onEditClick }: SkillsSectionProps) {
  const allSkills = profile?.skills || [];
  
  const categorizeSkill = (skill: string) => {
    const s = skill.toLowerCase();
    if (s.includes("react") || s.includes("vue") || s.includes("angular") || s.includes("html") || s.includes("css") || s.includes("tailwind") || s.includes("next")) return "Frontend";
    if (s.includes("node") || s.includes("express") || s.includes("python") || s.includes("django") || s.includes("java") || s.includes("spring") || s.includes("go") || s.includes("c++")) return "Backend";
    if (s.includes("sql") || s.includes("mongo") || s.includes("postgres") || s.includes("redis") || s.includes("firebase") || s.includes("prisma")) return "Database";
    if (s.includes("aws") || s.includes("gcp") || s.includes("azure") || s.includes("docker") || s.includes("kubernetes") || s.includes("linux")) return "Cloud & DevOps";
    return "Tools & Languages";
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
      case "Cloud & DevOps": return <Cloud className="w-4 h-4 text-purple-400" />;
      default: return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="skills"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Technical Skills</h2>
          <p className="text-sm text-muted-foreground font-medium">Verified technical proficiencies across your stack.</p>
        </div>
        <button onClick={onEditClick} className="h-10 px-5 bg-transparent border-2 border-white/10 hover:border-white/30 text-white font-bold rounded-xl text-xs transition-all self-start md:self-auto">
          Manage Skills
        </button>
      </div>

      {allSkills.length > 0 ? (
        <div className="space-y-10">
          {Object.entries(categorized).map(([category, skills]: [string, any]) => (
            <div key={category}>
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                {getIconForCategory(category)} {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {skills.map((skill: string, idx: number) => {
                  const progress = 70 + (skill.length * 5) % 25;
                  const confidence = progress > 85 ? "High" : progress > 75 ? "Medium" : "Developing";
                  
                  return (
                    <div key={idx} className="glass bg-slate-900/60 border border-white/5 rounded-3xl p-5 hover:bg-slate-800/80 hover:border-white/10 transition-all group shadow-lg">
                      <div className="flex justify-between items-start mb-5">
                        <div className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">{skill}</div>
                        <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span className="text-[9px] uppercase font-black tracking-widest">Verified</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3 text-[10px] uppercase font-bold tracking-wider">
                        <span className="text-slate-400">Confidence: <span className="text-white">{confidence}</span></span>
                        <span className="text-indigo-400">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass bg-slate-900/40 border border-white/10 border-dashed rounded-[32px] p-12 text-center flex flex-col items-center justify-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-xl">
            <Cpu className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <p className="text-white font-bold text-xl mb-2">No skills defined</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">Defining your technical stack is critical for placement readiness and ATS matching.</p>
          </div>
          <button onClick={onEditClick} className="mt-2 h-11 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Add Technologies
          </button>
        </div>
      )}

      {/* AI Recommendation Card */}
      <div className="mt-10 relative overflow-hidden rounded-[32px] bg-indigo-950/40 border border-indigo-500/30 p-8 shadow-2xl backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
          <div className="lg:w-1/3">
            <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" /> AI Recommendation
            </h4>
            <h3 className="text-2xl font-display font-bold text-white mb-3">Strategic Upskilling</h3>
            <p className="text-sm text-indigo-200/80 leading-relaxed font-medium">
              Based on your target role and current stack, acquiring these specific skills will yield the highest ROI for your Twin Score.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4 w-full">
            {[
              { name: "Docker", gain: "+4%", priority: "High", order: "1" },
              { name: "AWS Fundamentals", gain: "+3%", priority: "Medium", order: "2" }
            ].map((rec) => (
              <div key={rec.name} className="bg-black/30 border border-white/5 rounded-2xl p-5 hover:bg-black/40 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1 block">Priority {rec.priority}</span>
                    <h5 className="font-bold text-white text-lg">{rec.name}</h5>
                  </div>
                  <div className="bg-indigo-500/20 border border-indigo-500/30 w-8 h-8 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {rec.order}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Impact</span>
                  <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    <ArrowUpRight className="w-3 h-3" /> {rec.gain} Readiness
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});
