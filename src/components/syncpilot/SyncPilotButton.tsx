import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Bespoke SyncPilot vector emblem.
 * Combines an aerodynamic pilot compass spark, optical focal core,
 * secondary satellite beacon, and calibrated navigational coordinate tics.
 */
export function SyncPilotMark({ className = "w-4 h-4", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="syncpilot-brand-grad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="55%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="syncpilot-beacon-grad" x1="15" y1="2" x2="22" y2="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>

      {/* Calibrated navigational axis tics (subtle, intentional pilot reticle) */}
      <line x1="12" y1="1" x2="12" y2="3.25" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <line x1="12" y1="20.75" x2="12" y2="23" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <line x1="1" y1="12" x2="3.25" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />
      <line x1="20.75" y1="12" x2="23" y2="12" stroke="#38BDF8" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />

      {/* Primary Aerodynamic Compass Spark */}
      <path
        d="M12 3.5C12 8.194 8.194 12 3.5 12C8.194 12 12 15.806 12 20.5C12 15.806 15.806 12 20.5 12C15.806 12 12 8.194 12 3.5Z"
        fill="url(#syncpilot-brand-grad)"
      />

      {/* Optical Core Focal Dot */}
      <circle cx="12" cy="12" r="1.6" fill="#FFFFFF" />

      {/* Secondary Satellite Beacon */}
      <path
        d="M18.5 2.5C18.5 4.157 17.157 5.5 15.5 5.5C17.157 5.5 18.5 6.843 18.5 8.5C18.5 6.843 19.843 5.5 21.5 5.5C19.843 5.5 18.5 4.157 18.5 2.5Z"
        fill="url(#syncpilot-beacon-grad)"
        opacity="0.9"
      />
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
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center gap-2 h-11 pl-2 pr-3.5 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200/90 hover:border-blue-400/60 rounded-2xl shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08),0_10px_20px_-4px_rgba(15,23,42,0.1)] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 select-none"
        aria-label="Open SyncPilot AI Assistant"
      >
        {/* Navy Icon Squircle */}
        <div className="relative w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          <SyncPilotMark className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-slate-900 tracking-tight leading-none">
            SyncPilot
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider px-1 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200/60 leading-none">
            AI
          </span>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group relative flex items-center gap-3 h-[52px] pl-2.5 pr-3 bg-white/95 backdrop-blur-md text-slate-900 border border-slate-200/90 hover:border-blue-400/50 rounded-2xl shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06),0_12px_24px_-4px_rgba(15,23,42,0.08)] hover:shadow-[0_4px_14px_-2px_rgba(15,23,42,0.08),0_18px_32px_-4px_rgba(37,99,235,0.12)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white select-none pointer-events-auto"
      aria-label="Open SyncPilot AI Assistant"
    >
      {/* Icon Squircle Pedestal (Deep Navy with micro-bevel) */}
      <div className="relative w-[34px] h-[34px] rounded-xl bg-slate-900 border border-slate-800/90 flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_3px_rgba(15,23,42,0.25)] group-hover:border-blue-500/40 group-hover:bg-slate-850 transition-colors">
        <SyncPilotMark
          className={`w-4 h-4 transition-transform duration-200 ease-out ${
            isHovered ? "scale-105 -translate-y-0.5" : "scale-100"
          }`}
        />
      </div>

      {/* Typography Column */}
      <div className="text-left flex flex-col justify-center min-w-0 pr-0.5">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-[13px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
            SyncPilot
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60 leading-none select-none">
            AI
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-500 tracking-tight leading-tight mt-1 group-hover:text-slate-600 transition-colors">
          AI Career Guide
        </span>
      </div>

      {/* Trailing Action Trigger */}
      <div className="w-5 h-5 rounded-md bg-slate-100/90 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center shrink-0 transition-colors ml-0.5">
        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
      </div>
    </motion.button>
  );
}