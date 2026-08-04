import { motion } from "framer-motion";
import { Check, Target, Zap, Clock, ArrowRight, Award, Sparkles } from "lucide-react";
import { UserCareerContext, ExplainableRecommendation, careerEngine } from "@/lib/career-intelligence";

interface DailyWorkspaceCardProps {
  missions: any[];
  onCompleteMission: (mission: any) => void;
  userContext: UserCareerContext;
}

export function DailyWorkspaceCard({
  missions,
  onCompleteMission,
  userContext,
}: DailyWorkspaceCardProps) {
  const recommendations: ExplainableRecommendation[] = careerEngine.generateRecommendations(userContext);
  const primaryRec = recommendations[0];

  const completedCount = missions.filter((m) => m.completed).length;

  return (
    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
            <Target className="w-4 h-4 text-accent" /> Today's Action Center
          </div>
          <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <span>Prioritized Workstation</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-aurora/10 text-aurora border border-aurora/20 font-normal">
              {completedCount} / {missions.length} Completed
            </span>
          </h3>
        </div>

        {primaryRec && (
          <div className="text-xs text-emerald-300 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>#1 Priority Gain: {primaryRec.estimatedGain}</span>
          </div>
        )}
      </div>

      {/* Top 3 Prioritized Mission Tasks */}
      <div className="space-y-3">
        {missions.map((m, idx) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className={`glass rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border transition-all ${
              m.completed
                ? "opacity-50 grayscale bg-black/20 border-white/5"
                : "border-white/10 hover:border-accent/40 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <button
                disabled={m.completed}
                onClick={() => onCompleteMission(m)}
                className={`w-8 h-8 rounded-full grid place-items-center transition-all ${
                  m.completed
                    ? "bg-aurora text-primary-foreground shadow-lg"
                    : "glass border border-white/20 hover:border-aurora"
                }`}
              >
                {m.completed ? <Check className="w-4 h-4" /> : <div className="w-2.5 h-2.5 rounded-full bg-aurora/50" />}
              </button>

              <div className="space-y-0.5">
                <div className={`text-sm font-semibold ${m.completed ? "line-through text-white/50" : "text-white"}`}>
                  {m.title}
                </div>
                <div className="text-xs text-muted-foreground">{m.description}</div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3 border-t md:border-t-0 pt-2 md:pt-0 border-white/5">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" /> ~15 mins
              </span>

              <span className="text-xs font-mono text-accent bg-aurora/10 px-2.5 py-1 rounded-lg border border-aurora/20">
                +{m.xp_reward} XP
              </span>

              {!m.completed && (
                <button
                  onClick={() => onCompleteMission(m)}
                  className="text-xs font-semibold px-4 py-1.5 rounded-xl bg-aurora text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Complete
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {missions.length === 0 && (
          <div className="text-center py-8 text-sm text-muted-foreground glass rounded-2xl p-6">
            All missions completed for today! Great job maintaining your momentum.
          </div>
        )}
      </div>
    </div>
  );
}
