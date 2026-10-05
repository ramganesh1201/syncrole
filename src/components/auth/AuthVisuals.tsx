import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AuthVisualsProps {
  mode: "signin" | "signup" | "forgot";
}

export function AuthVisuals({ mode }: AuthVisualsProps) {
  return (
    <div className="relative flex flex-col justify-between h-full min-h-[440px]">
      {/* Brand Message (No card box, directly on page surface) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>SYNCROLE CAREER OS</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {mode === "signup" ? (
            <>
              Start your career <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                journey today.
              </span>
            </>
          ) : mode === "forgot" ? (
            <>
              Recover your <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                SyncRole workspace.
              </span>
            </>
          ) : (
            <>
              Your career path <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                starts here.
              </span>
            </>
          )}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
          {mode === "signup"
            ? "Unlock structured learning paths, project roadmaps, and recruiter readiness."
            : mode === "forgot"
            ? "Enter your email address to receive a secure password reset link."
            : "Your workspace for engineering skill growth, DSA practice, and role readiness."}
        </p>
      </motion.div>

      {/* Integrated Career Vector Path Graphic (Un-carded, flowing naturally) */}
      <div className="relative w-full h-[320px] mt-4 flex items-center justify-center">
        <CareerVectorCanvas mode={mode} />
      </div>
    </div>
  );
}

function CareerVectorCanvas({ mode }: { mode: "signin" | "signup" | "forgot" }) {
  return (
    <div className="w-full h-full relative select-none">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/4 left-10 w-60 h-60 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)" }}
      />
      <div 
        className="absolute bottom-0 right-10 w-56 h-56 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)" }}
      />

      <svg
        viewBox="0 0 520 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          <linearGradient id="pathGrad" x1="40" y1="280" x2="480" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="45%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Soft Background Grid lines */}
        <g opacity="0.18">
          <line x1="30" y1="70" x2="490" y2="70" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="30" y1="140" x2="490" y2="140" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="30" y1="210" x2="490" y2="210" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="30" y1="280" x2="490" y2="280" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
        </g>

        {/* Elevation Landscape Curves */}
        <path
          d="M0 320 L0 250 Q140 210 280 240 T520 180 L520 320 Z"
          fill="#EEF2FF"
          opacity="0.5"
        />
        <path
          d="M0 320 L0 275 Q180 240 320 255 T520 220 L520 320 Z"
          fill="#F8FAFC"
          opacity="0.7"
        />

        {/* Main Flowing Career Path */}
        <path
          d="M50 270 C140 270 150 190 240 180 C330 170 350 80 460 50"
          stroke="#E2E8F0"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M50 270 C140 270 150 190 240 180 C330 170 350 80 460 50"
          stroke="url(#pathGrad)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Milestone Nodes */}

        {/* Milestone 1: LEARN (x: 125, y: 242) */}
        <g transform="translate(125, 242)">
          <circle r="14" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
          <path d="M-4 -3 L0 -5 L4 -3 L4 3 L0 1 L-4 3 Z" fill="#2563EB" />
          <g transform="translate(0, -26)">
            <rect x="-22" y="-10" width="44" height="17" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="800" fontFamily="sans-serif">
              LEARN
            </text>
          </g>
        </g>

        {/* Milestone 2: BUILD (x: 225, y: 184) */}
        <g transform="translate(225, 184)">
          <circle r="14" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="3" />
          <path d="M-4 -2 L-2 -5 L-4 -8 M4 -2 L2 -5 L4 -8" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
          <g transform="translate(0, -26)">
            <rect x="-22" y="-10" width="44" height="17" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="800" fontFamily="sans-serif">
              BUILD
            </text>
          </g>
        </g>

        {/* Milestone 3: PRACTICE (x: 335, y: 125) */}
        <g transform="translate(335, 125)">
          <circle r="14" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="3" />
          <circle r="4" fill="none" stroke="#7C3AED" strokeWidth="2" />
          <g transform="translate(0, -26)">
            <rect x="-28" y="-10" width="56" height="17" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="800" fontFamily="sans-serif">
              PRACTICE
            </text>
          </g>
        </g>

        {/* Destination: READY ✨ (x: 460, y: 50) */}
        <g transform="translate(460, 50)">
          <circle r="22" fill="#6366F1" opacity="0.16" className="animate-ping" />
          <circle r="17" fill="url(#pathGrad)" filter="url(#glowEffect)" />
          <path
            d="M0 -7 L2 -2 L7.5 -2 L3 1.5 L5 7 L0 3.5 L-5 7 L-3 1.5 L-7.5 -2 L-2 -2 Z"
            fill="#FFFFFF"
          />
          <g transform="translate(0, 32)">
            <rect x="-30" y="-10" width="60" height="20" rx="10" fill="#4F46E5" />
            <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
              READY ✨
            </text>
          </g>
        </g>

        {/* Developer Figure at Start */}
        <g transform="translate(45, 222)">
          <ellipse cx="12" cy="50" rx="15" ry="4" fill="#94A3B8" opacity="0.35" />
          <rect x="6" y="28" width="4" height="20" rx="2" fill="#1E293B" />
          <rect x="14" y="28" width="4" height="20" rx="2" fill="#334155" />
          <rect x="3" y="10" width="18" height="20" rx="5" fill="#4F46E5" />
          <rect x="-2" y="12" width="5" height="14" rx="2" fill="#312E81" />
          <circle cx="12" cy="3" r="6" fill="#F87171" />
          <path d="M6 1 C6 -3 18 -3 18 1 Z" fill="#0F172A" />
          <path d="M17 14 L26 8" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
