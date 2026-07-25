import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, GitCommit, Star, Code2, Award } from "lucide-react";

export function SceneGitHub({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 500); // Graph fills
    const t2 = setTimeout(() => setPhase(2), 2000); // Repos appear
    const t3 = setTimeout(() => setPhase(3), 3500); // Badges unlock
    const t4 = setTimeout(() => setPhase(4), 4500); // Score increases
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isActive]);

  if (!isActive) return null;

  const weeks = Array.from({ length: 20 });
  const days = Array.from({ length: 7 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-6 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
          <Github className="w-8 h-8 text-white" />
        </div>
        <div>
          <div className="text-xl font-bold text-white">alex-dev</div>
          <div className="text-sm text-white/50 flex items-center gap-2">
            <GitCommit className="w-4 h-4" /> 1,432 commits in the last year
          </div>
        </div>
        
        {phase >= 4 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="ml-auto bg-aurora/20 border border-aurora/40 rounded-xl px-4 py-2 flex items-center gap-3"
          >
            <Award className="w-6 h-6 text-aurora" />
            <div>
              <div className="text-xs text-aurora font-semibold uppercase tracking-widest">Developer Score</div>
              <div className="text-xl font-bold text-white">Top 5%</div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Contribution Graph */}
      <div className="glass rounded-xl p-6 border border-white/5">
        <div className="text-sm font-semibold mb-4">Contribution Graph</div>
        <div className="flex gap-1">
          {weeks.map((_, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1">
              {days.map((_, dIdx) => {
                const isFilled = Math.random() > 0.3;
                const delay = wIdx * 0.05 + dIdx * 0.02;
                return (
                  <motion.div
                    key={dIdx}
                    initial={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    animate={
                      phase >= 1 && isFilled
                        ? { backgroundColor: "rgba(52,211,153,0.8)" }
                        : { backgroundColor: "rgba(255,255,255,0.05)" }
                    }
                    transition={{ delay: phase >= 1 ? delay : 0, duration: 0.3 }}
                    className="w-3 h-3 rounded-sm"
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Repos & Badges */}
      <div className="flex-1 flex gap-6">
        <div className="flex-1 flex flex-col gap-3">
          <div className="text-sm font-semibold">Top Repositories</div>
          <AnimatePresence>
            {phase >= 2 && [
              { n: "e-commerce-microservices", l: "Go", s: 124 },
              { n: "react-ui-components", l: "TypeScript", s: 89 }
            ].map((repo, i) => (
              <motion.div
                key={repo.n}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold text-aurora text-sm">{repo.n}</div>
                  <div className="text-xs text-white/50 flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400" /> {repo.l}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white/50 text-xs">
                  <Star className="w-3 h-3" /> {repo.s}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="w-72 flex flex-col gap-3">
          <div className="text-sm font-semibold flex items-center gap-2">
            <Code2 className="w-4 h-4 text-aurora" /> Verified Skills
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {phase >= 3 && [
                "Backend Architecture",
                "RESTful APIs",
                "React Performance",
                "Concurrent Go"
              ].map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15, type: "spring", bounce: 0.6 }}
                  className="bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  {skill}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
