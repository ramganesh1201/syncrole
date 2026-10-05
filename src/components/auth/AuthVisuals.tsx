import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface AuthVisualsProps {
  mode: "signin" | "signup" | "forgot";
}

export function AuthVisuals({ mode }: AuthVisualsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Reduced & Refined Left Column Headline */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>SYNCROLE CAREER OS</span>
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
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
              Build your career, <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                one step at a time.
              </span>
            </>
          )}
        </h1>

        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-sm">
          {mode === "signup"
            ? "Create your account to unlock structured learning paths, project roadmaps, and recruiter readiness."
            : mode === "forgot"
            ? "Enter your email address to receive a instant, secure password reset link."
            : "Your personalized workspace for engineering skill growth, DSA practice, and role readiness."}
        </p>
      </div>

      {/* Main Career Journey Visual Scene (Vector Art Illustration) */}
      <CareerJourneyIllustration mode={mode} />
    </motion.div>
  );
}

function CareerJourneyIllustration({ mode }: { mode: "signin" | "signup" | "forgot" }) {
  return (
    <div className="relative w-full aspect-[5/4] max-w-lg mx-auto rounded-3xl bg-gradient-to-b from-white/90 to-slate-50/90 border border-slate-200/80 shadow-xl shadow-slate-200/40 p-4 sm:p-6 overflow-hidden flex items-center justify-center group">
      {/* Ambient background glows */}
      <div 
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%)" }}
      />
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)" }}
      />

      <svg
        viewBox="0 0 500 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 select-none"
      >
        <defs>
          {/* Main Gradient for Path */}
          <linearGradient id="pathGradient" x1="60" y1="340" x2="440" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          {/* Elevation Curve 1 */}
          <linearGradient id="elevationGrad1" x1="0" y1="400" x2="500" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.4" />
          </linearGradient>

          {/* Elevation Curve 2 */}
          <linearGradient id="elevationGrad2" x1="0" y1="400" x2="500" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EEF2FF" stopOpacity="0.6" />
          </linearGradient>

          {/* Node Badge Shadow */}
          <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>

          {/* Destination Glow */}
          <filter id="destinationGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Background Grid Lines (Subtle) */}
        <g opacity="0.25">
          <line x1="40" y1="90" x2="460" y2="90" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="40" y1="170" x2="460" y2="170" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="40" y1="250" x2="460" y2="250" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
          <line x1="40" y1="330" x2="460" y2="330" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 6" />
        </g>

        {/* 2. Elevation / Career Horizon Landscape Curves */}
        <path
          d="M0 400 L0 320 Q130 270 260 305 T500 230 L500 400 Z"
          fill="url(#elevationGrad1)"
        />
        <path
          d="M0 400 L0 350 Q170 305 310 325 T500 280 L500 400 Z"
          fill="url(#elevationGrad2)"
        />

        {/* 3. Ascending Career Path */}
        {/* Soft Track Shadow */}
        <path
          d="M70 330 C150 330 160 250 250 240 C340 230 350 130 430 80"
          stroke="#CBD5E1"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Main Vibrant Gradient Path */}
        <path
          d="M70 330 C150 330 160 250 250 240 C340 230 350 130 430 80"
          stroke="url(#pathGradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 4. Milestone Nodes along the Ascending Path */}

        {/* Milestone 1: LEARN (x: 140, y: 300) */}
        <g transform="translate(140, 300)" filter="url(#nodeShadow)">
          <circle r="16" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3" />
          {/* Book / Code Symbol */}
          <path d="M-5 -4 L0 -7 L5 -4 L5 4 L0 1 L-5 4 Z" fill="#2563EB" />
          <g transform="translate(0, -28)">
            <rect x="-24" y="-11" width="48" height="18" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
              LEARN
            </text>
          </g>
        </g>

        {/* Milestone 2: BUILD (x: 235, y: 242) */}
        <g transform="translate(235, 242)" filter="url(#nodeShadow)">
          <circle r="16" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="3" />
          {/* Code brackets symbol */}
          <path d="M-5 -3 L-2 -6 L-5 -9 M5 -3 L2 -6 L5 -9" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <g transform="translate(0, -28)">
            <rect x="-24" y="-11" width="48" height="18" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
              BUILD
            </text>
          </g>
        </g>

        {/* Milestone 3: PRACTICE (x: 330, y: 165) */}
        <g transform="translate(330, 165)" filter="url(#nodeShadow)">
          <circle r="16" fill="#FFFFFF" stroke="#7C3AED" strokeWidth="3" />
          {/* Target symbol */}
          <circle r="5" fill="none" stroke="#7C3AED" strokeWidth="2" />
          <circle r="2" fill="#7C3AED" />
          <g transform="translate(0, -28)">
            <rect x="-30" y="-11" width="60" height="18" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <text x="0" y="2" textAnchor="middle" fill="#1E293B" fontSize="9" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
              PRACTICE
            </text>
          </g>
        </g>

        {/* Destination Milestone: CAREER READY (x: 430, y: 80) */}
        <g transform="translate(430, 80)">
          {/* Soft pulsing glow ring */}
          <circle r="26" fill="#6366F1" opacity="0.18" className="animate-ping" />
          <circle r="20" fill="url(#pathGradient)" filter="url(#destinationGlow)" />
          {/* Star Icon */}
          <path
            d="M0 -8 L2.3 -2.3 L8.5 -2.3 L3.5 1.8 L5.4 7.8 L0 4.2 L-5.4 7.8 L-3.5 1.8 L-8.5 -2.3 L-2.3 -2.3 Z"
            fill="#FFFFFF"
          />
          <g transform="translate(0, 36)" filter="url(#nodeShadow)">
            <rect x="-34" y="-12" width="68" height="22" rx="11" fill="#4F46E5" />
            <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.6">
              READY ✨
            </text>
          </g>
        </g>

        {/* 5. Developer / Student Figure standing at start of path */}
        <g transform="translate(62, 272)">
          {/* Base Shadow */}
          <ellipse cx="14" cy="58" rx="18" ry="4.5" fill="#94A3B8" opacity="0.4" />
          
          {/* Figure Vector Art */}
          {/* Legs */}
          <rect x="7" y="34" width="4.5" height="22" rx="2" fill="#1E293B" />
          <rect x="15.5" y="34" width="4.5" height="22" rx="2" fill="#334155" />
          {/* Jacket / Torso */}
          <rect x="4" y="14" width="19" height="22" rx="5" fill="#4F46E5" />
          {/* Backpack */}
          <rect x="-2" y="16" width="6" height="15" rx="3" fill="#312E81" />
          {/* Head */}
          <circle cx="13.5" cy="6" r="6.5" fill="#F87171" />
          {/* Hair */}
          <path d="M7 4 C7 -1 20 -1 20 4 Z" fill="#0F172A" />
          {/* Arm Gesture pointing upward along the career path */}
          <path d="M19 18 L29 11" stroke="#4F46E5" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
