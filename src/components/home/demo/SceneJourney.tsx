import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Code2, Rocket, Users, Target, Check } from "lucide-react";

export function SceneJourney({ isActive }: { isActive: boolean }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPhase(0);
      return;
    }
    const nodes = 5;
    const timers: NodeJS.Timeout[] = [];
    for (let i = 0; i <= nodes; i++) {
      timers.push(setTimeout(() => setPhase(i + 1), 1000 + i * 800));
    }
    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  if (!isActive) return null;

  const journeySteps = [
    { icon: FileText, title: "Resume Setup", id: 1 },
    { icon: Code2, title: "DSA Mastery", id: 2 },
    { icon: Rocket, title: "Projects Built", id: 3 },
    { icon: Users, title: "Mock Interviews", id: 4 },
    { icon: Target, title: "Placement Ready", id: 5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full p-4 md:p-10 flex flex-col items-center justify-center relative overflow-y-auto md:overflow-visible"
    >
      <div className="text-lg md:text-2xl font-bold font-display text-white mb-8 md:mb-12 text-center">Your Path to Tech Internships</div>
      
      <div className="relative w-full max-w-3xl flex justify-between items-center z-10 px-1 sm:px-4">
        {/* Background Connecting Line */}
        <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-0.5 md:h-1 bg-white/10 -z-10 rounded-full" />
        
        {/* Animated Connecting Line */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min((phase - 1) * 25, 100)}%` }}
          transition={{ duration: 0.8, ease: "linear" }}
          className="absolute left-[5%] top-1/2 -translate-y-1/2 h-0.5 md:h-1 bg-aurora -z-10 shadow-[0_0_15px_rgba(var(--aurora-rgb),0.8)] rounded-full"
        />

        {journeySteps.map((step, idx) => {
          const isComplete = phase > idx;
          const isCurrent = phase === idx;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center gap-2 md:gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                className={`w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors duration-500 relative ${
                  isComplete
                    ? "bg-aurora text-black shadow-[0_0_30px_rgba(var(--aurora-rgb),0.6)]"
                    : isCurrent
                    ? "bg-white border-2 border-aurora text-aurora shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    : "bg-[#0F172A] border-2 border-white/20 text-white/40"
                }`}
              >
                {isComplete ? (
                  <Check className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                ) : (
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
                )}
                
                {isCurrent && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute inset-0 rounded-full border border-aurora"
                  />
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 + 0.2 }}
                className={`absolute -bottom-6 md:-bottom-8 whitespace-nowrap text-[9px] sm:text-xs md:text-sm font-semibold transition-colors duration-500 ${
                  isComplete ? "text-aurora" : isCurrent ? "text-white" : "text-white/40"
                }`}
              >
                {step.title}
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
