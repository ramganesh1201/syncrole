import { ReactNode } from "react";
import { motion } from "framer-motion";

export function FakeAppWindow({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
      className="relative w-[calc(100vw-16px)] md:w-full md:max-w-5xl mx-auto h-[calc(100dvh-120px)] md:h-[65vh] md:min-h-[500px] flex flex-col rounded-2xl md:rounded-xl border border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden"
    >
      {/* App Header */}
      <div className="h-9 px-3 gap-1.5 md:h-12 md:px-4 md:gap-2 border-b border-white/10 bg-white/5 flex items-center">
        <div className="flex gap-1 md:gap-1.5 flex-none">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="mx-auto flex h-5 md:h-6 items-center rounded-md bg-black/40 px-2.5 text-[9px] md:text-[10px] text-white/40 font-mono w-28 md:w-48 justify-center shadow-inner">
          syncrole.ai
        </div>
        <div className="w-6 md:w-10 flex-none" />
      </div>

      {/* App Body */}
      <div className="flex-1 relative overflow-y-auto md:overflow-hidden bg-slate-900/50">
        {children}
      </div>
    </motion.div>
  );
}
