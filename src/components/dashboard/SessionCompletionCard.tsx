import { motion } from "framer-motion";
import { CheckCircle2, PartyPopper, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { CompanyReadinessResult } from "@/lib/career-intelligence";

interface SessionCompletionCardProps {
  readiness: CompanyReadinessResult;
}

export function SessionCompletionCard({ readiness }: SessionCompletionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative rounded-3xl p-px overflow-hidden mb-6"
    >
      <div className="absolute inset-0 rounded-3xl bg-aurora opacity-40 blur-xl" />

      <div className="relative rounded-[23px] glass-strong p-6 md:p-8 space-y-4 text-center">
        <div className="w-14 h-14 rounded-full bg-aurora/20 border border-aurora/40 grid place-items-center mx-auto text-aurora">
          <PartyPopper className="w-7 h-7" />
        </div>

        <div className="space-y-1 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" /> Today's Journey Complete!
          </div>
          <h3 className="text-2xl font-display font-bold text-white">
            Target Readiness Boosted to {readiness.readinessScore}%
          </h3>
          <p className="text-sm text-muted-foreground">
            You've completed all high-priority missions for today. Your progress has been logged to your {readiness.companyName} {readiness.roleTitle} trajectory.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
          <div className="glass rounded-xl p-3 border border-white/5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">Missions Finished</div>
            <div className="text-base font-bold text-white">3 / 3 Complete</div>
          </div>
          <div className="glass rounded-xl p-3 border border-white/5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">Target Readiness</div>
            <div className="text-base font-bold text-emerald-400">{readiness.readinessScore}% (+3.5%)</div>
          </div>
          <div className="glass rounded-xl p-3 border border-white/5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">Tomorrow Preview</div>
            <div className="text-base font-bold text-accent">Mock Interview</div>
          </div>
        </div>

        <div className="text-xs text-white/60 pt-2 flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          <span>See you tomorrow for your next daily mission!</span>
        </div>
      </div>
    </motion.div>
  );
}
