import { motion } from "framer-motion";
import { ArrowRight, Sparkles, LayoutDashboard } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function SceneEnd({ isActive, onClose }: { isActive: boolean; onClose: () => void }) {
  const nav = useNavigate();

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className="h-full flex flex-col items-center justify-center p-4 md:p-12 text-center overflow-y-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-1.5 md:gap-2 rounded-full glass-strong px-3 py-1 md:px-4 md:py-1.5 text-[11px] md:text-xs text-aurora mb-4 md:mb-6">
          <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" /> Your AI Career Twin is Ready
        </div>
        
        <h2 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-3 md:mb-6">
          Ready to become <br />
          <span className="text-aurora">Placement Ready?</span>
        </h2>
        
        <p className="text-xs sm:text-sm md:text-lg text-white/60 max-w-xl mx-auto mb-6 md:mb-10">
          Join thousands of students who are already using SyncRole to master DSA, optimize their resumes, and land their dream internships.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full sm:w-auto px-4 sm:px-0"
      >
        <button
          onClick={() => {
            onClose();
            nav({ to: "/auth" });
          }}
          className="relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-semibold transition-shadow text-primary-foreground shadow-glow bg-aurora hover:bg-aurora/90 w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4" /> Start Your Journey
        </button>

        <button
          onClick={() => {
            onClose();
            nav({ to: "/dashboard" });
          }}
          className="inline-flex items-center justify-center gap-2 rounded-full glass-strong px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-semibold hover:bg-white/10 transition text-white w-full sm:w-auto"
        >
          <LayoutDashboard className="w-4 h-4" /> Explore Dashboard
        </button>
      </motion.div>
    </motion.div>
  );
}
