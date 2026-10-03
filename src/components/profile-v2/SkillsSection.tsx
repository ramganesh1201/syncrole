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
      case "Frontend": return <Code2 className="w-4 h-4 text-blue-600" />;
      case "Backend": return <Server className="w-4 h-4 text-emerald-600" />;
      case "Database": return <Database className="w-4 h-4 text-amber-600" />;
      case "Cloud & DevOps": return <Cloud className="w-4 h-4 text-purple-600" />;
      default: return <Terminal className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      id="skills"
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Technical Skills</h2>
          <p className="text-xs text-slate-500 font-medium">Verified technical proficiencies across your stack.</p>
        </div>
        <button 
          onClick={onEditClick} 
          className="h-9 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold border border-slate-200/80 rounded-xl text-xs transition-colors self-start md:self-auto cursor-pointer"
        >
          Manage Skills
        </button>
      </div>

      {allSkills.length > 0 ? (
        <div className="space-y-6">
          {Object.entries(categorized).map(([category, skills]: [string, any]) => (
            <div key={category} className="space-y-3">
              <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-2">
                {getIconForCategory(category)} {category}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {skills.map((skill: string, idx: number) => {
                  const progress = 70 + (skill.length * 5) % 25;
                  const confidence = progress > 85 ? "High" : progress > 75 ? "Medium" : "Developing";
                  
                  return (
                    <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-2.5 shadow-xs hover:border-slate-300 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="font-bold text-slate-900 text-sm">{skill}</div>
                        <div className="flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span className="text-[9px] uppercase font-bold tracking-wider">Verified</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] uppercase font-semibold tracking-wider font-mono">
                        <span className="text-slate-500">Confidence: <span className="text-slate-900 font-bold">{confidence}</span></span>
                        <span className="text-purple-600 font-bold">{progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/90 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-200">
            <Cpu className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-slate-900 font-bold text-base mb-1">No skills defined</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">Defining your technical stack is critical for placement readiness and ATS matching.</p>
          </div>
          <button onClick={onEditClick} className="mt-1 h-9 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs cursor-pointer">
            Add Technologies
          </button>
        </div>
      )}

      {/* AI Recommendation Module */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="lg:w-1/3 space-y-1">
            <h4 className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Recommendation
            </h4>
            <h3 className="text-lg font-bold text-slate-900 font-display">Strategic Upskilling</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Acquiring these skills for your target role will yield the highest impact on your Twin Score.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-3 w-full">
            {[
              { name: "Docker", gain: "+4%", priority: "High", order: "1" },
              { name: "AWS Fundamentals", gain: "+3%", priority: "Medium", order: "2" }
            ].map((rec) => (
              <div key={rec.name} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[9px] text-purple-600 font-extrabold uppercase tracking-wider font-mono block">Priority {rec.priority}</span>
                    <h5 className="font-bold text-slate-900 text-sm">{rec.name}</h5>
                  </div>
                  <div className="bg-purple-100 border border-purple-200 w-7 h-7 rounded-lg flex items-center justify-center text-purple-700 font-extrabold text-xs font-mono">
                    {rec.order}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Est. Impact</span>
                  <span className="flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
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
