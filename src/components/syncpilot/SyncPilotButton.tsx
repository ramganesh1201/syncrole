import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { SafeMetalFx } from "@/components/ui/safe-metal";

type Props = {
  onClick: () => void;
};

export function SyncPilotButton({ onClick }: Props) {
  return (
    <div className="pointer-events-auto">
      <SafeMetalFx preset="silver" variant="button" strength={0.3} theme="light">
        <motion.button
          onClick={onClick}
          whileHover={{ y: -1.5, scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="bg-white text-slate-900 border border-slate-200/90 hover:border-indigo-300/80 rounded-2xl px-3.5 py-2.5 shadow-md hover:shadow-lg shadow-slate-900/5 hover:shadow-slate-900/10 flex items-center gap-3 transition-all cursor-pointer group select-none"
          aria-label="Open SyncPilot AI Assistant"
        >
          {/* Branded rounded icon container */}
          <div className="h-8 w-8 rounded-xl bg-indigo-50/90 border border-indigo-100 group-hover:bg-indigo-100/80 group-hover:border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
            <Sparkles className="h-4 w-4" />
          </div>

          {/* Typography stack */}
          <div className="text-left flex flex-col justify-center">
            <span className="text-[13px] font-semibold text-slate-900 tracking-tight leading-snug group-hover:text-indigo-950 transition-colors">
              SyncPilot
            </span>
            <span className="text-[11px] font-medium text-slate-500 leading-none mt-0.5">
              AI Career Guide
            </span>
          </div>
        </motion.button>
      </SafeMetalFx>
    </div>
  );
}