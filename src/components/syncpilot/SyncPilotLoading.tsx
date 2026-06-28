import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_STAGES = [
  { text: "Initializing SyncPilot...",          delay: 0,    color: "text-cyan-400" },
  { text: "Loading Career Graph...",             delay: 280,  color: "text-white" },
  { text: "Analyzing DSA Progress...",           delay: 520,  color: "text-violet-400" },
  { text: "Scanning Resume...",                  delay: 760,  color: "text-white" },
  { text: "Evaluating Placement Readiness...",   delay: 980,  color: "text-emerald-400" },
  { text: "Running Recruiter Simulation...",     delay: 1200, color: "text-pink-400" },
  { text: "Career Twin Online ✦",               delay: 1480, color: "text-cyan-300" },
];

function playBootSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const beep = (freq: number, start: number, dur: number, vol = 0.06) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    };
    beep(880,  0,    0.08);
    beep(1100, 0.12, 0.08);
    beep(1320, 0.26, 0.12);
    beep(1760, 0.45, 0.18, 0.04);
  } catch { /* autoplay blocked — silent */ }
}

export function SyncPilotLoading({ userName }: { userName?: string }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    playBootSound();

    BOOT_STAGES.forEach((stage, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, stage.delay);
    });

    // Progress bar
    const interval = setInterval(() => {
      setScanProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2;
      });
    }, 32);

    // Done
    setTimeout(() => setDone(true), 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full flex flex-col items-center justify-center overflow-hidden bg-black/60 backdrop-blur-xl">
      {/* Scan line */}
      <div className="scan-line" />

      {/* Holographic grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(oklch(0.75 0.2 200 / 30%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.2 200 / 30%) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Core orb */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="h-24 w-24 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 60%, oklch(0.75 0.2 200), oklch(0.72 0.22 295), transparent 100%)",
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="absolute inset-3 rounded-full"
          style={{
            background: "conic-gradient(from 180deg, transparent 60%, oklch(0.85 0.20 330), oklch(0.72 0.22 295), transparent 100%)",
          }}
        />
        {/* Center glow */}
        <div
          className="absolute inset-6 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.75 0.2 200 / 80%), oklch(0.72 0.22 295 / 60%))",
            boxShadow: "0 0 30px oklch(0.75 0.2 200 / 60%)",
          }}
        />
        {/* Core dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-white" style={{ boxShadow: "0 0 12px white" }} />
        </div>
      </div>

      {/* Terminal text */}
      <div className="font-mono text-[11px] space-y-1.5 w-72 mb-6">
        <AnimatePresence>
          {BOOT_STAGES.map((stage, i) =>
            visibleLines.includes(i) ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`flex items-center gap-2 ${stage.color}`}
              >
                <span className="text-white/30">{">"}</span>
                <span>{stage.text}</span>
                {i === visibleLines.length - 1 && !done && (
                  <span className="typing-cursor" />
                )}
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="w-72 h-0.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))",
            width: `${scanProgress}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/30"
      >
        {userName ? `Welcome back, ${userName.split(" ")[0]}` : "SyncPilot — AI Career OS"}
      </motion.div>
    </div>
  );
}