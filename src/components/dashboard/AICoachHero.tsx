import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Flame, Target, ArrowRight } from "lucide-react";
import {
  UserCareerContext,
  CompanyReadinessResult,
  DashboardOrchestrationResult,
  careerEngine,
} from "@/lib/career-intelligence";
import { AIInbox } from "./AIInbox";

interface AICoachHeroProps {
  userContext: UserCareerContext;
  userName: string;
  orchestration: DashboardOrchestrationResult;
  onContinueJourney: () => void;
}

export function AICoachHero({
  userContext,
  userName,
  orchestration,
  onContinueJourney,
}: AICoachHeroProps) {
  const selectedCompanyId = userContext?.dream_companies?.[0] || "google";
  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );

  return (
    <div className="relative rounded-3xl p-px overflow-hidden mb-6">
      <div className="absolute inset-0 rounded-3xl bg-aurora opacity-30 blur-xl pointer-events-none" />

      <div className="relative rounded-[23px] glass-strong p-6 md:p-8 space-y-6">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Mission Control
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white font-medium border border-white/10">
              Stage: {orchestration?.maturityStage ?? "Beginner"}
            </span>
          </div>

          <AIInbox items={orchestration?.inboxItems ?? []} />
        </div>

        {/* Dynamic Context Headline & Objective */}
        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight">
              {orchestration?.coachHeadline ?? `Welcome back, ${userName?.split(" ")[0] || "Engineer"}! 🎯`}
            </h1>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              {orchestration?.coachMessage ?? "Complete today's highest-priority tasks to advance your career."}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="glass px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-white flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-accent" />
                <span>Target: {readiness.companyName} ({readiness.roleTitle})</span>
              </div>
              <div className="glass px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-emerald-400">
                Readiness: {readiness.readinessScore}% ({readiness.status})
              </div>
            </div>
          </div>

          {/* Single Primary CTA */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <button
              onClick={() => {
                const target = orchestration?.primaryRoutingTarget;
                if (target?.actionType === "navigate" && target.route !== "/dashboard") {
                  window.location.href = target.route;
                } else {
                  onContinueJourney();
                }
              }}
              className="relative rounded-2xl px-6 py-4 text-sm font-bold text-primary-foreground overflow-hidden w-full text-center group shadow-xl hover:shadow-aurora/20 transition-all"
            >
              <span className="absolute inset-0 bg-aurora transition-transform group-hover:scale-105" />
              <span className="relative inline-flex items-center justify-center gap-2">
                {orchestration?.primaryRoutingTarget?.label ?? "Continue Today's Journey"}{" "}
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <p className="text-[11px] text-center text-muted-foreground mt-2">
              {orchestration?.primaryRoutingTarget?.reason ?? "Your highest-impact task is waiting."}
            </p>
          </div>
        </div>

        {/* 4 Core Questions Quick Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-white/10">
          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">1. Target Goal</div>
            <div className="text-xs font-bold text-white truncate">
              {readiness.companyName} • {readiness.roleTitle}
            </div>
          </div>

          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">2. Readiness</div>
            <div className="text-xs font-bold text-emerald-400">
              {readiness.readinessScore}% ({readiness.status})
            </div>
          </div>

          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">3. Skills Mastered</div>
            <div className="text-xs font-bold text-white">
              {(readiness.matchedSkills ?? []).length} /{" "}
              {(readiness.matchedSkills ?? []).length + (readiness.missingSkills ?? []).length} Core
            </div>
          </div>

          <div className="glass rounded-xl p-3 border border-white/5 space-y-0.5">
            <div className="text-[10px] uppercase text-muted-foreground font-semibold">4. Today's Gain</div>
            <div className="text-xs font-bold text-accent">
              {orchestration?.opportunityDeltas?.[0]?.gain ?? "+3.5%"} Readiness + XP
            </div>
          </div>
        </div>

        {/* Readiness Opportunity Drivers */}
        {(orchestration?.opportunityDeltas?.length ?? 0) > 0 && (
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
        )}
      </div>
    </div>
  );
}
