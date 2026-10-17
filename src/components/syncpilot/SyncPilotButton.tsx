import { useState } from "react";
import { motion } from "framer-motion";

/**
 * Native SyncPilot vector mark.
 * Designed with SyncRole's precision blue aesthetic: an aerodynamic 4-point
 * navigational spark with an optical focus core and subtle orbital satellite.
 */
export function SyncPilotMark({ className = "w-3.5 h-3.5", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="syncpilot-native-grad" x1="2" y1="2" x2="18" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* Primary Compass Spark in SyncRole Blue */}
      <path
        d="M10 2C10 6.418 6.418 10 2 10C6.418 10 10 13.582 10 18C10 13.582 13.582 10 18 10C13.582 10 10 6.418 10 2Z"
        fill="url(#syncpilot-native-grad)"
      />

      {/* Optical Core */}
      <circle cx="10" cy="10" r="1.5" fill="#FFFFFF" />

      {/* Satellite Node */}
      <circle cx="15.5" cy="4.5" r="1.25" fill="#60A5FA" />
    </svg>
  );
}

type Props = {
  onClick: () => void;
  compact?: boolean;
};

export function SyncPilotButton({ onClick, compact = false }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  if (compact) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
        className="group relative flex items-center gap-2 h-9 pl-1.5 pr-3 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200/90 hover:border-blue-400/60 rounded-xl shadow-xs hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 select-none"
        aria-label="Open SyncPilot AI Assistant"
      >
        <div className="w-6 h-6 rounded-lg bg-blue-50/90 border border-blue-100/80 flex items-center justify-center shrink-0 text-blue-600 shadow-xs">
          <SyncPilotMark className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-semibold text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
          SyncPilot
        </span>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="group relative flex items-center h-[38px] pl-1.5 pr-3.5 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200/90 hover:border-blue-400/60 rounded-xl shadow-[0_1px_3px_rgba(15,23,42,0.06),0_4px_12px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_2px_6px_rgba(15,23,42,0.06),0_8px_16px_-2px_rgba(37,99,235,0.08)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white select-none pointer-events-auto"
      aria-label="Open SyncPilot AI Assistant"
    >
      {/* Precision Icon Chamber (Light, crisp SyncRole Blue palette) */}
      <div className="relative w-7 h-7 rounded-lg bg-blue-50/90 border border-blue-100/80 group-hover:bg-blue-100/70 group-hover:border-blue-200 flex items-center justify-center shrink-0 text-blue-600 shadow-xs transition-colors">
        <SyncPilotMark
          className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
            isHovered ? "scale-105 -translate-y-0.5" : "scale-100"
          }`}
        />
      </div>

      {/* Architectural Hairline Divider */}
      <div className="h-3.5 w-px bg-slate-200/90 mx-2 shrink-0 group-hover:bg-blue-200/80 transition-colors" />

      {/* Balanced Single-Line Typography */}
      <div className="flex items-center gap-1.5 leading-none whitespace-nowrap">
        <span className="text-[13px] font-semibold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
          SyncPilot
        </span>
        <span className="text-slate-300 text-xs font-normal select-none">·</span>
        <span className="text-[11.5px] font-medium text-slate-500 tracking-normal group-hover:text-slate-600 transition-colors">
          Career Guide
        </span>
      </div>
    </motion.button>
  );
}
