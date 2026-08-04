import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Target, Trophy, Flame } from "lucide-react";
import {
  UserCareerContext,
  CompanyReadinessResult,
  DashboardOrchestrationResult,
  careerEngine,
} from "@/lib/career-intelligence";
import { AIInbox } from "./AIInbox";

interface AIMissionControlHeroProps {
  userContext: UserCareerContext;
  userName: string;
  orchestration: DashboardOrchestrationResult;
  onContinueJourney: () => void;
}

export function AIMissionControlHero({
  userContext,
  userName,
  orchestration,
  onContinueJourney,
}: AIMissionControlHeroProps) {
  const nav = useNavigate();
  const selectedCompanyId = userContext.dream_companies?.[0] || "google";
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );

  const handlePrimaryCTA = () => {
    const target = orchestration.primaryRoutingTarget;
    if (target.actionType === "navigate" && target.route !== "/dashboard") {
      nav({ to: target.route });
    } else {
      onContinueJourney();
    }
  };

  return (
    <div className="relative rounded-3xl p-px overflow-hidden mb-6">
      {/* Aurora Ambient Lighting */}
      <div className="absolute inset-0 rounded-3xl bg-aurora opacity-35 blur-xl pointer-events-none" />

      <div className="relative rounded-[23px] glass-strong p-6 md:p-8 space-y-6">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Mission Control
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white font-medium border border-white/10">
              Stage: {orchestration.maturityStage}
            </span>
          </div>

          <AIInbox items={orchestration.inboxItems} />
        </div>

        {/* Dynamic Context Greeting & Objective */}
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
              {orchestration.coachHeadline}
            </h1>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              {orchestration.coachMessage}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="glass px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-white flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-accent" />
                <span>Target: {readiness.companyName} ({readiness.roleTitle})</span>
              </div>
              <div className="glass px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-emerald-400">
                Current Readiness: {readiness.readinessScore}% ({readiness.status})
              </div>
            </div>
          </div>

          {/* SINGLE PRIMARY CTA: Continue Today's Journey */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <button
              onClick={handlePrimaryCTA}
              className="relative rounded-2xl px-6 py-4 text-sm font-bold text-primary-foreground overflow-hidden w-full text-center group shadow-xl hover:shadow-aurora/20 transition-all"
            >
              <span className="absolute inset-0 bg-aurora transition-transform group-hover:scale-105" />
              <span className="relative inline-flex items-center justify-center gap-2">
                {orchestration.primaryRoutingTarget.label} <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <p className="text-[11px] text-center text-muted-foreground mt-2">
              {orchestration.primaryRoutingTarget.reason}
            </p>
          </div>
        </div>

        {/* Today's Readiness Opportunity Drivers */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {orchestration.opportunityDeltas.map((opp) => (
            <div key={opp.module} className="glass rounded-xl p-3 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span>{opp.module}</span>
                <span className="text-emerald-400 font-bold">{opp.gain}</span>
              </div>
              <p className="text-[10px] text-muted-foreground line-clamp-1">{opp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
