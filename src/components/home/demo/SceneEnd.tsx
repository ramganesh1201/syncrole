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
      className="h-full flex flex-col items-center justify-center p-12 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs text-aurora mb-6">
          <Sparkles className="w-4 h-4" /> Your AI Career Twin is Ready
        </div>
        
        <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Ready to become <br />
          <span className="text-aurora">Placement Ready?</span>
        </h2>
        
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
          Join thousands of students who are already using SyncRole to master DSA, optimize their resumes, and land their dream internships.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <button
          onClick={() => {
            onClose();
            nav({ to: "/auth" });
          }}
          className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold transition-shadow text-primary-foreground shadow-glow bg-aurora hover:bg-aurora/90"
        >
          <Sparkles className="w-4 h-4" /> Start Your Journey
        </button>

        <button
          onClick={() => {
            onClose();
            nav({ to: "/dashboard" });
          }}
          className="inline-flex items-center gap-2 rounded-full glass-strong px-8 py-4 text-sm font-semibold hover:bg-white/10 transition text-white"
        >
          <LayoutDashboard className="w-4 h-4" /> Explore Dashboard
        </button>
      </motion.div>
    </motion.div>
  );
}
