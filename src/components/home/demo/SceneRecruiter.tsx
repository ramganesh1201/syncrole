import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Search, Target, Github, FileText, CheckCircle, Code2 } from "lucide-react";

export function SceneRecruiter({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 500); // UI loads
    const t2 = setTimeout(() => setPhase(2), 1500); // Profile Card opens
    const t3 = setTimeout(() => setPhase(3), 2500); // Scores populate
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full bg-[#FAFAFA] text-slate-900 flex overflow-y-auto md:overflow-hidden font-sans"
    >
      {/* Recruiter Sidebar (Desktop only) */}
      <div className="w-64 border-r border-slate-200 bg-white p-4 hidden md:flex flex-col gap-6">
        <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
          <Target className="w-6 h-6 text-indigo-600" /> TalentOS
        </div>
        <div className="space-y-1">
          {["Candidates", "Pipelines", "Interviews", "Analytics"].map((item, i) => (
            <div
              key={item}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                i === 0 ? "bg-indigo-50 text-indigo-700" : "text-slate-500"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 md:p-6 relative flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 md:mb-6">
          <div className="text-lg md:text-2xl font-bold">Candidates Pipeline</div>
          <div className="relative w-full sm:w-auto">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by skill..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs md:text-sm w-full sm:w-64 bg-white focus:outline-none"
              readOnly
              value="Go Developer"
            />
          </div>
        </div>

        {/* Candidate List Fake Background */}
        <div className="space-y-3 opacity-30 hidden md:block">
          <div className="h-16 bg-white border border-slate-200 rounded-xl" />
          <div className="h-16 bg-white border border-slate-200 rounded-xl" />
          <div className="h-16 bg-white border border-slate-200 rounded-xl" />
        </div>

        {/* Profile Card Popup */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="relative md:absolute inset-x-0 md:inset-x-6 top-0 md:top-24 bottom-0 md:bottom-6 bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-y-auto md:overflow-hidden flex-1"
            >
              {/* Profile Header & Info */}
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 p-4 md:p-8 flex flex-col gap-4 md:gap-6 bg-slate-50/50">
                <div className="text-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-indigo-100 text-indigo-600 mx-auto mb-2 md:mb-4 flex items-center justify-center font-bold text-xl md:text-3xl">
                    AD
                  </div>
                  <div className="text-base md:text-xl font-bold">Alex Dev</div>
                  <div className="text-xs md:text-sm text-slate-500">Full-Stack Engineer</div>
                </div>

                <div>
                  <div className="text-[10px] md:text-xs font-semibold text-slate-400 uppercase mb-2">Verified Skills</div>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {["React", "Node.js", "Go", "PostgreSQL", "System Design"].map(s => (
                      <span key={s} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-[11px] md:text-xs rounded-md font-medium border border-indigo-100">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SyncRole AI Insights */}
              <div className="flex-1 p-4 md:p-8">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="h-5 w-5 md:h-6 md:w-6 rounded bg-indigo-600 flex items-center justify-center flex-none">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm md:text-base">SyncRole AI Assessment</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {/* Readiness Score */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="p-3.5 md:p-5 border border-slate-100 rounded-xl bg-white shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs md:text-sm font-semibold text-slate-500">Placement Readiness</div>
                      <div className="text-2xl md:text-3xl font-bold text-slate-800">92%</div>
                    </div>
                    <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 opacity-20" />
                  </motion.div>

                  {/* GitHub Score */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="p-3.5 md:p-5 border border-slate-100 rounded-xl bg-white shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs md:text-sm font-semibold text-slate-500">GitHub Activity</div>
                      <div className="text-2xl md:text-3xl font-bold text-slate-800">Top 5%</div>
                    </div>
                    <Github className="w-8 h-8 md:w-10 md:h-10 text-slate-800 opacity-10" />
                  </motion.div>

                  {/* Resume Score */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="p-3.5 md:p-5 border border-slate-100 rounded-xl bg-white shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs md:text-sm font-semibold text-slate-500">ATS Resume Score</div>
                      <div className="text-2xl md:text-3xl font-bold text-slate-800">89/100</div>
                    </div>
                    <FileText className="w-8 h-8 md:w-10 md:h-10 text-blue-500 opacity-20" />
                  </motion.div>

                  {/* Interview Score */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="p-3.5 md:p-5 border border-slate-100 rounded-xl bg-white shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs md:text-sm font-semibold text-slate-500">DSA Proficiency</div>
                      <div className="text-2xl md:text-3xl font-bold text-slate-800">Strong</div>
                    </div>
                    <Code2 className="w-8 h-8 md:w-10 md:h-10 text-amber-500 opacity-20" />
                  </motion.div>
                </div>

                {phase >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 md:mt-6 p-3 md:p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-xs md:text-sm text-emerald-800 flex items-start gap-2.5 md:gap-3"
                  >
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <strong>Highly Recommended:</strong> Candidate meets all criteria for Senior Backend Developer roles. Strong communication and optimal coding practices demonstrated in recent mock interviews.
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
