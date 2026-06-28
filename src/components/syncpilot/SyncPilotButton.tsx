import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onClick: () => void;
};

export function SyncPilotButton({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex items-center justify-end">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.92 }}
            transition={{ duration: 0.18 }}
            className="mr-4 glass-strong rounded-2xl px-4 py-2.5 border border-white/15 shadow-glow"
          >
            <div className="text-sm font-semibold text-white whitespace-nowrap">SyncPilot</div>
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest">AI Career OS</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orb Button */}
      <motion.button
        onClick={onClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        className="relative h-16 w-16 rounded-full flex items-center justify-center animate-breathe"
        style={{ isolation: "isolate" }}
        aria-label="Open SyncPilot AI Career OS"
      >
        {/* Outer glow ring */}
        <span
          className="absolute inset-[-6px] rounded-full opacity-60"
          style={{
            background: "conic-gradient(from 0deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295), oklch(0.85 0.20 330), oklch(0.75 0.2 200))",
            filter: "blur(4px)",
            animation: "particle-orbit 8s linear infinite",
          }}
        />

        {/* Base orb */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295) 50%, oklch(0.85 0.20 330))",
          }}
        />

        {/* Inner glass shine */}
        <span
          className="absolute inset-[2px] rounded-full"
          style={{
            background: "linear-gradient(135deg, oklch(1 0 0 / 20%), oklch(1 0 0 / 0%) 60%)",
          }}
        />

        {/* Particles */}
        <span className="absolute inset-0 rounded-full" style={{ top: "50%", left: "50%" }}>
          <span className="particle particle-1" />
          <span className="particle particle-2" />
          <span className="particle particle-3" />
        </span>

        {/* Core icon — AI brain nodes */}
        <span className="relative z-10 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Central node */}
            <circle cx="14" cy="14" r="3.5" fill="white" opacity="0.95" />
            {/* Orbiting nodes */}
            <circle cx="14" cy="5"  r="2"   fill="white" opacity="0.8" />
            <circle cx="14" cy="23" r="2"   fill="white" opacity="0.8" />
            <circle cx="5"  cy="14" r="2"   fill="white" opacity="0.8" />
            <circle cx="23" cy="14" r="2"   fill="white" opacity="0.8" />
            {/* Connection lines */}
            <line x1="14" y1="7"  x2="14" y2="10.5" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="14" y1="17.5" x2="14" y2="21" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="7"  y1="14" x2="10.5" y2="14" stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1="17.5" y1="14" x2="21" y2="14" stroke="white" strokeWidth="1" opacity="0.5" />
            {/* Diagonal nodes */}
            <circle cx="8"  cy="8"  r="1.5" fill="white" opacity="0.5" />
            <circle cx="20" cy="8"  r="1.5" fill="white" opacity="0.5" />
            <circle cx="8"  cy="20" r="1.5" fill="white" opacity="0.5" />
            <circle cx="20" cy="20" r="1.5" fill="white" opacity="0.5" />
          </svg>
        </span>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full pulse-ring" />
      </motion.button>
    </div>
  );
}