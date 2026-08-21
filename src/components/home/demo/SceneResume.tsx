import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, UploadCloud, Search, CheckCircle, AlertTriangle } from "lucide-react";

function Counter({ from, to, duration, delay = 0, isActive }: any) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!isActive) return;
    let startTime: number;
    let animationFrame: number;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      if (elapsed < delay) {
        animationFrame = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min((elapsed - delay) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(from + (to - from) * easeOut));
      if (progress < 1) animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, from, to, duration, delay]);

  return <span>{val}</span>;
}

export function SceneResume({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    const t1 = setTimeout(() => setPhase(1), 1000); // Upload starts
    const t2 = setTimeout(() => setPhase(2), 2000); // Upload done, scanning starts
    const t3 = setTimeout(() => setPhase(3), 3500); // Scanning done, show score
    const t4 = setTimeout(() => setPhase(4), 5000); // Fix keywords
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-6 overflow-y-auto md:overflow-visible"
    >
      {/* Resume Document */}
      <div className="w-full md:flex-1 max-w-sm mx-auto relative min-h-[180px] md:h-full glass rounded-xl border border-white/5 p-4 md:p-6 flex flex-col overflow-hidden bg-white/5 shadow-2xl">
        <AnimatePresence>
          {phase < 2 && (
            <motion.div
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md rounded-xl border-2 border-dashed border-white/20 p-4"
            >
              <motion.div
                animate={phase === 1 ? { y: [0, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <UploadCloud className="w-10 h-10 md:w-12 md:h-12 text-aurora mb-2 md:mb-3" />
              </motion.div>
              <div className="text-xs md:text-sm font-semibold">Drop resume here</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fake Resume Content */}
        <div className="space-y-3 md:space-y-4 opacity-80 blur-[1px]">
          <div className="h-5 md:h-6 w-1/2 bg-white/20 rounded-md mb-4 md:mb-6" />
          <div className="space-y-1.5 md:space-y-2">
            <div className="h-2.5 md:h-3 w-full bg-white/10 rounded-md" />
            <div className="h-2.5 md:h-3 w-5/6 bg-white/10 rounded-md" />
            <div className="h-2.5 md:h-3 w-4/6 bg-white/10 rounded-md" />
          </div>
          <div className="h-3.5 md:h-4 w-1/3 bg-white/20 rounded-md mt-4 md:mt-6 mb-2" />
          <div className="space-y-1.5 md:space-y-2">
            <div className="h-2.5 md:h-3 w-full flex gap-2">
              <span className="flex-1 bg-white/10 rounded-md" />
              <motion.span 
                animate={phase >= 4 ? { backgroundColor: "rgb(52 211 153 / 0.4)" } : { backgroundColor: "rgb(239 68 68 / 0.4)" }}
                className="w-12 md:w-16 rounded-md"
              />
              <span className="flex-1 bg-white/10 rounded-md" />
            </div>
            <div className="h-2.5 md:h-3 w-5/6 bg-white/10 rounded-md" />
          </div>
        </div>

        {/* Scanning Laser */}
        {phase === 2 && (
          <motion.div
            initial={{ top: 0, opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-aurora shadow-[0_0_20px_rgba(var(--aurora-rgb),0.8)] z-10"
          />
        )}
      </div>

      {/* Analysis Side */}
      <div className="w-full md:flex-1 flex flex-col gap-3 md:gap-4">
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-xl p-4 md:p-6 border border-white/5 flex items-center justify-between"
          >
            <div>
              <div className="text-[10px] md:text-sm text-muted-foreground uppercase tracking-widest mb-1">ATS Match Score</div>
              <div className="text-3xl md:text-5xl font-display font-bold text-white">
                <Counter from={41} to={89} duration={1500} delay={0} isActive={phase >= 3} />
                <span className="text-lg md:text-2xl text-white/50">/100</span>
              </div>
            </div>
            <motion.div
              initial={{ rotate: -90, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
              className="w-20 h-20 rounded-full border-4 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>
          </motion.div>
        )}

        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass flex-1 rounded-xl p-5 border border-white/5"
          >
            <div className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-aurora" /> AI Recommendations
            </div>
            <div className="space-y-3">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="flex gap-3 bg-white/5 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-amber-400">Missing Keyword: "Microservices"</div>
                  <div className="text-xs text-white/60">Add this to your experience section to bypass ATS filters.</div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="flex gap-3 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-emerald-400">Action Verbs Optimized</div>
                  <div className="text-xs text-white/60">Changed "helped with" to "orchestrated". Impact score increased.</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
