import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Target, HelpCircle, CheckCircle, ShieldCheck } from "lucide-react";
import {
  ExplainableRecommendation,
  careerEngine,
  UserCareerContext,
} from "@/lib/career-intelligence";

interface AdaptiveFocusWidgetProps {
  userContext: UserCareerContext;
}

export function AdaptiveFocusWidget({ userContext }: AdaptiveFocusWidgetProps) {
  const recommendations: ExplainableRecommendation[] = careerEngine.generateRecommendations(userContext);
  const primaryRec = recommendations[0];

  if (!primaryRec) return null;

  return (
    <div className="relative rounded-3xl p-px overflow-hidden mb-8">
      <div className="absolute inset-0 rounded-3xl bg-aurora opacity-30 blur" />
      <div className="relative rounded-[23px] glass-strong p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent font-medium uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-accent" /> Explainable Career Focus
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Confidence: {primaryRec.confidenceScore}% ({primaryRec.confidenceLabel})
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Today's Recommended Focus
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white">
              {primaryRec.action}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Reason:</strong> {primaryRec.reason}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs border border-white/10 font-medium">
                Target: {primaryRec.targetRequirement}
              </span>
              <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                Est. Gain: {primaryRec.estimatedGain}
              </span>
              <span className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium">
                Source: {primaryRec.sourceModule}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <button className="relative rounded-2xl px-6 py-3 text-sm font-semibold text-primary-foreground overflow-hidden w-full md:w-auto text-center group">
              <span className="absolute inset-0 bg-aurora transition-transform group-hover:scale-105" />
              <span className="relative inline-flex items-center justify-center gap-2">
                Start Activity <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

        {/* Secondary Recommendations list if present */}
        {recommendations.length > 1 && (
          <div className="pt-4 border-t border-white/10 grid sm:grid-cols-2 gap-3">
            {recommendations.slice(1, 3).map((rec) => (
              <div key={rec.id} className="glass rounded-xl p-3 border border-white/5 space-y-1">
                <div className="text-xs font-semibold text-white flex items-center justify-between">
                  <span>{rec.action}</span>
                  <span className="text-[10px] text-emerald-400 font-normal">{rec.estimatedGain}</span>
                </div>
                <div className="text-[11px] text-muted-foreground line-clamp-1">{rec.reason}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
