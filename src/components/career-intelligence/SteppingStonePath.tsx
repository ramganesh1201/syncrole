import { motion } from "framer-motion";
import { MapPin, ArrowRight, CheckCircle, Target, Sparkles, Building } from "lucide-react";
import {
  SteppingStonePath as PathType,
  careerEngine,
  UserCareerContext,
} from "@/lib/career-intelligence";

interface SteppingStonePathProps {
  userContext: UserCareerContext;
}

export function SteppingStonePath({ userContext }: SteppingStonePathProps) {
  const targetCompanyId = userContext.dream_companies?.[0] || "google";
  const path: PathType = careerEngine.generateCareerPath(userContext, targetCompanyId);

  return (
    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 mb-8 relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-accent" /> Dynamic Stepping-Stone Progression
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            Adaptive Path to {path.targetCompanyName}
          </h3>
        </div>

        <div className="text-xs text-muted-foreground max-w-md">
          {path.pathRationale}
        </div>
      </div>

      {/* Stepping-Stone Progression Chain */}
      <div className="relative pt-4 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {path.nodes.map((node, index) => {
            const isLast = index === path.nodes.length - 1;
            return (
              <motion.div
                key={node.companyId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className={`relative rounded-2xl p-5 border transition-all ${
                  node.isTarget
                    ? "glass-strong border-accent/40 bg-aurora/10"
                    : "glass border-white/10 hover:border-white/20"
                }`}
              >
                {node.isTarget && (
                  <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-aurora text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-lg">
                    Target Dream Company
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-white text-sm">
                      {node.companyName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                        {node.companyName}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Tier {node.tier} Company
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{node.readinessScore}%</div>
                    <div className="text-[10px] text-emerald-400 font-medium">{node.status}</div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="text-[11px] text-white/90 font-medium flex items-center gap-1">
                    <Target className="w-3 h-3 text-accent shrink-0" />
                    <span>{node.recommendedFocus}</span>
                  </div>

                  <div className="text-[10px] text-muted-foreground">
                    Est. Timeline: {node.estimatedMonthsToTarget} months milestone
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
