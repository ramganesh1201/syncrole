import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Target, Zap, Bell, CheckCircle } from "lucide-react";

function Counter({ from, to, duration, delay = 0, suffix = "" }: any) {
  const [val, setVal] = useState(from);

  useEffect(() => {
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

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [from, to, duration, delay]);

  return <span>{val}{suffix}</span>;
}

export function SceneDashboard({ isActive }: { isActive: boolean }) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-3 md:p-6 h-full flex flex-col overflow-y-auto md:overflow-visible"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2.5 md:gap-3"
        >
          <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-aurora/20 flex items-center justify-center flex-none">
            <LayoutDashboard className="h-4 w-4 md:h-5 md:w-5 text-aurora" />
          </div>
          <div>
            <div className="text-base md:text-lg font-bold text-white leading-tight">Welcome back, Alex</div>
            <div className="text-[11px] md:text-xs text-muted-foreground">Your career dashboard is syncing...</div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative h-9 w-9 md:h-10 md:w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-none"
        >
          <Bell className="h-4 w-4 text-white/70" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5, type: "spring" }}
            className="absolute top-0 right-0 h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-red-500 border-2 border-[#0F172A]"
          />
        </motion.div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 flex-1">
        {/* Main Stats */}
        <div className="col-span-1 md:col-span-2 flex flex-col gap-3 md:gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-4 md:p-5 border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Target className="w-12 h-12 md:w-16 md:h-16" />
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Placement Readiness</div>
              <div className="text-3xl md:text-4xl font-bold font-display text-aurora">
                <Counter from={48} to={92} duration={2000} delay={800} suffix="%" />
              </div>
              <div className="mt-3 md:mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "48%" }}
                  animate={{ width: "92%" }}
                  transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
                  className="h-full bg-aurora rounded-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass rounded-2xl p-4 md:p-5 border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Zap className="w-12 h-12 md:w-16 md:h-16" />
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1 md:mb-2">Total XP</div>
              <div className="text-3xl md:text-4xl font-bold font-display text-[#e879f9]">
                <Counter from={0} to={2480} duration={2500} delay={1000} />
              </div>
              <div className="mt-3 md:mt-4 text-[11px] md:text-xs text-white/50">Level 8 · Senior Developer</div>
            </motion.div>
          </div>

          {/* Fake Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="glass rounded-2xl p-4 md:p-5 border border-white/5 flex-1 flex flex-col min-h-[140px]"
          >
            <div className="text-xs md:text-sm font-semibold mb-3 md:mb-4">Activity Timeline</div>
            <div className="flex-1 flex items-end justify-between gap-1.5 md:gap-2 h-24 md:h-auto">
              {[40, 60, 30, 80, 50, 90, 100].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5, type: "spring" }}
                  className="w-full bg-aurora/20 rounded-t-sm hover:bg-aurora/40 transition-colors"
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 flex flex-col gap-3 md:gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="glass rounded-2xl p-4 md:p-5 border border-white/5"
          >
            <div className="text-xs md:text-sm font-semibold mb-2 md:mb-3">Profile Completion</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xl md:text-2xl font-bold text-emerald-400">
                <Counter from={85} to={100} duration={1000} delay={2000} suffix="%" />
              </div>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "85%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 2, duration: 1 }}
                className="h-full bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 }}
            className="glass rounded-2xl p-4 md:p-5 border border-white/5 flex-1"
          >
            <div className="text-xs md:text-sm font-semibold mb-3 md:mb-4">Daily Missions</div>
            <div className="space-y-2.5 md:space-y-3">
              {[
                { t: "Solve 2 DSA problems", d: 1.6 },
                { t: "Review Resume ATS", d: 1.8 },
                { t: "Complete Mock Interview", d: 2.0 }
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: m.d }}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: m.d + 0.5, type: "spring" }}
                    className="flex-none"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                  </motion.div>
                  <div className="text-xs text-white/80">{m.t}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
