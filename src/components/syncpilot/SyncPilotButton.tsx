import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  onClick: () => void;
};

export function SyncPilotButton({ onClick }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9998] flex items-center justify-end pointer-events-auto">
      {/* Subtle Tooltip on Hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 6, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="mr-2.5 hidden sm:block bg-slate-900 text-white rounded-xl px-3 py-1.5 shadow-md border border-slate-800 text-left"
          >
            <div className="text-xs font-bold whitespace-nowrap">SyncPilot</div>
            <div className="text-[10px] text-slate-400">AI Career Assistant</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integrated Floating Assistant Button */}
      <motion.button
        onClick={onClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/90 hover:border-indigo-300 rounded-full px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-lg hover:shadow-xl shadow-slate-900/10 flex items-center gap-2 transition-all cursor-pointer group"
        aria-label="Open SyncPilot AI Assistant"
      >
        <div className="h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full bg-indigo-50 border border-indigo-100 group-hover:bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs font-bold text-slate-800 tracking-tight">SyncPilot</span>
      </motion.button>
    </div>
  );
}