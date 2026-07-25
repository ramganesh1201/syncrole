import { ReactNode } from "react";
import { motion } from "framer-motion";

export function FakeAppWindow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
      className="relative w-full max-w-5xl mx-auto h-[65vh] min-h-[500px] flex flex-col rounded-xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-2xl overflow-hidden"
    >
      {/* App Header */}
      <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="mx-auto flex h-6 items-center rounded-md bg-black/40 px-3 text-[10px] text-white/40 font-mono w-48 justify-center shadow-inner">
          syncrole.ai
        </div>
        <div className="w-10" />
      </div>

      {/* App Body */}
      <div className="flex-1 relative overflow-hidden bg-slate-900/50">
        {children}
      </div>
    </motion.div>
  );
}
