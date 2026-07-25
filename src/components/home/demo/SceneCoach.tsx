import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Code2, Sparkles, User, Medal } from "lucide-react";

export function SceneCoach({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 1000); // User typing done
    const t2 = setTimeout(() => setPhase(2), 2500); // AI thinking done, show code
    const t3 = setTimeout(() => setPhase(3), 4000); // Show complexity
    const t4 = setTimeout(() => setPhase(4), 5000); // Show success badge
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex gap-4 p-6"
    >
      {/* Editor Side */}
      <div className="flex-1 flex flex-col rounded-2xl bg-black/40 border border-white/5 overflow-hidden font-mono text-sm relative">
        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
          <Code2 className="w-4 h-4 text-aurora" />
          <span className="text-white/70">twoSum.ts</span>
        </div>
        <div className="p-4 flex-1">
          <div className="text-white/40 mb-2">{'function twoSum(nums: number[], target: number): number[] {'}</div>
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pl-4 text-emerald-300 space-y-1 overflow-hidden"
              >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  const map = new Map&lt;number, number&gt;();
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  for (let i = 0; i &lt; nums.length; i++) {'{'}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="pl-4">
                  const complement = target - nums[i];
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="pl-4">
                  if (map.has(complement)) return [map.get(complement)!, i];
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="pl-4">
                  map.set(nums[i], i);
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                  {'}'}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
                  return [];
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-white/40 mt-2">{'}'}</div>
        </div>

        {/* Success Overlay */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center flex-col gap-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center"
              >
                <Medal className="w-12 h-12 text-emerald-400" />
              </motion.div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">Optimal Solution!</div>
                <div className="text-aurora font-mono">+120 XP</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Side */}
      <div className="w-80 flex flex-col rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
        <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
          <Brain className="w-4 h-4 text-[#e879f9]" />
          <span className="text-white/70 text-sm font-semibold">AI Coach</span>
        </div>
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto">
          {/* User Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="self-end max-w-[90%] bg-white/10 rounded-2xl rounded-tr-sm p-3 text-sm text-white"
          >
            How can I optimize this to O(N) time?
          </motion.div>

          {/* AI Response */}
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="self-start max-w-[90%] bg-aurora/10 border border-aurora/20 rounded-2xl rounded-tl-sm p-3 text-sm text-white/90"
            >
              {phase === 1 ? (
                <div className="flex gap-1 items-center h-5">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-aurora" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-aurora" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-aurora" />
                </div>
              ) : (
                <div className="space-y-2">
                  <div>You can use a Hash Map to store the difference between the target and the current element.</div>
                  {phase >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 pt-3 border-t border-aurora/20 text-xs"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-white/50">Time</span>
                        <span className="text-emerald-400 font-mono">O(N)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Space</span>
                        <span className="text-amber-400 font-mono">O(N)</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
