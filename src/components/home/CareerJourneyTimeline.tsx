import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  TrendingUp, CheckCircle, Target, Clock,
  ChevronRight, Sparkles, MapPin, Flag, Lock, ArrowRight, BookOpen, Code2, Trophy
} from "lucide-react";

interface PhaseDetail {
  id: string;
  label: string;
  sub: string;
  phase: "past" | "present" | "future";
  done: boolean;
  active: boolean;
  score: number;
  dsa: number;
  description: string;
  keyActions: string[];
  recommendedTool: string;
}

const STAGES: PhaseDetail[] = [
  {
    id: "started",
    label: "Foundation",
    sub: "Profile & Setup",
    phase: "past",
    done: true,
    active: false,
    score: 40,
    dsa: 10,
    description: "Initialize your career identity, sync GitHub profile, and perform initial ATS resume audit.",
    keyActions: ["Complete Career Identity setup", "Sync GitHub repositories", "Run first ATS Resume scan"],
    recommendedTool: "Career Identity Matrix"
  },
  {
    id: "current",
    label: "Current State",
    sub: "Growth Seeker",
    phase: "present",
    done: false,
    active: true,
    score: 72,
    dsa: 48,
    description: "Building core DSA consistency, improving resume bullet points, and tracking daily streak.",
    keyActions: ["Maintain 7-day DSA solving streak", "Fix top 3 ATS resume formatting gaps", "Complete 1 full-stack project"],
    recommendedTool: "DSA Practice Engine"
  },
  {
    id: "interview",
    label: "Interview Ready",
    sub: "Est. 4–6 Weeks",
    phase: "future",
    done: false,
    active: false,
    score: 82,
    dsa: 75,
    description: "Mastering common interview patterns, system design fundamentals, and live technical mock interviews.",
    keyActions: ["Conquer 75 LeetCode Medium problems", "Conduct 3 AI mock interviews with SyncPilot", "Optimize GitHub commit frequency"],
    recommendedTool: "SyncPilot AI Interviewer"
  },
  {
    id: "offer",
    label: "Target Goal",
    sub: "Product Engineer",
    phase: "future",
    done: false,
    active: false,
    score: 90,
    dsa: 120,
    description: "Target company benchmarking passed. Ready for top product company tech loops and recruiter referrals.",
    keyActions: ["Benchmark against Google/Amazon cutoffs", "Generate recruiter evaluation report", "Final offer negotiation preparation"],
    recommendedTool: "Recruiter Radar & Benchmarks"
  }
];

function PhaseNode({
  stage,
  isSelected,
  onClick,
  index,
}: {
  stage: PhaseDetail;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className={`relative flex flex-col items-center cursor-pointer group select-none ${isSelected ? "z-10" : ""}`}
    >
      <div
        className={`relative h-12 w-12 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-md ${
          isSelected
            ? "border-violet-500 bg-violet-600/30 text-violet-300 shadow-violet-500/20 scale-105"
            : stage.done
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500/60"
            : stage.active
            ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:border-cyan-400"
            : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground"
        }`}
      >
        {stage.done ? (
          <CheckCircle className="h-5 w-5 text-emerald-400" />
        ) : isSelected ? (
          <div className="h-3 w-3 rounded-full bg-violet-400 animate-pulse" />
        ) : (
          <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40 group-hover:bg-violet-400 transition-colors" />
        )}
      </div>

      <div className="mt-3 text-center">
        <div className={`text-xs font-bold transition-colors ${isSelected ? "text-violet-400" : "text-foreground"}`}>
          {stage.label}
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5">{stage.sub}</div>
      </div>
    </motion.div>
  );
}

function SimCard({ sim, index }: { sim: { label: string; score: number; dsa: number; level: string; milestone: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="surface-primary rounded-2xl p-5 border border-white/10 shadow-xl space-y-3 hover:border-violet-500/30 transition-all hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between">
        <div className="bg-white/5 border border-white/10 rounded-md px-2.5 py-0.5 text-xs font-semibold text-foreground">
          {sim.label}
        </div>
        <div className="text-xs text-emerald-400 font-medium">{sim.milestone}</div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Readiness</span>
            <span className="font-bold text-violet-400">{sim.score}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full bg-violet-500 rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: `${sim.score}%` } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">DSA Target</span>
          <span className="font-bold text-cyan-400">{sim.dsa} problems</span>
        </div>

        <div className="surface-secondary rounded-lg px-3 py-1.5 text-center border border-white/5">
          <div className="text-[10px] uppercase font-semibold text-muted-foreground">Milestone Status</div>
          <div className="text-xs font-bold text-foreground mt-0.5">{sim.level}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CareerJourneyTimeline({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const score = data?.scores?.[0]?.total_score || 72;
  const problems = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 48;
  const streak = data?.streak?.current_streak || 12;

  const [selectedStageId, setSelectedStageId] = useState<string>("current");
  const selectedStage = STAGES.find(s => s.id === selectedStageId) || STAGES[1];

  const simulations = [
    {
      label: "30 Days",
      score: Math.min(100, score + 8),
      dsa: problems + 20,
      level: "Placement Ready",
      milestone: "Consistent Streak",
    },
    {
      label: "90 Days",
      score: Math.min(100, score + 18),
      dsa: problems + 55,
      level: "Interview Pro",
      milestone: "Mock Interview Ace",
    },
    {
      label: "180 Days",
      score: Math.min(100, score + 30),
      dsa: problems + 90,
      level: "Offer Hunter",
      milestone: "Dream Offer Stage",
    },
  ];

  return (
    <section id="journey" className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-violet-400" />
              <span className="uppercase tracking-wider text-[11px]">INTERACTIVE CAREER ROADMAP</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                <Lock className="h-3 w-3" /> Sample Preview
              </div>
            )}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Where you are. <span className="text-cyan-400">Where you're going.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            Click any career stage below to reveal specific milestones, target metrics, and high-impact actions.
          </p>
        </div>

        {/* Timeline Track */}
        <div className="relative mb-12">
          <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-white/10 z-0" />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STAGES.map((stage, idx) => (
              <PhaseNode
                key={stage.id}
                stage={stage}
                isSelected={stage.id === selectedStageId}
                onClick={() => setSelectedStageId(stage.id)}
                index={idx}
              />
            ))}
          </div>
        </div>

        {/* Active Stage Progressive Reveal Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="surface-primary rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl mb-12 space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Selected Stage Details
                  </div>
                  <div className="text-xl font-extrabold text-foreground flex items-center gap-2">
                    <span>{selectedStage.label}</span>
                    <span className="text-xs font-normal text-muted-foreground">({selectedStage.sub})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-center">
                  <span className="text-muted-foreground mr-1.5">Benchmark Score:</span>
                  <span className="font-bold text-violet-400">{selectedStage.score}%</span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-center">
                  <span className="text-muted-foreground mr-1.5">DSA Problems:</span>
                  <span className="font-bold text-cyan-400">{selectedStage.dsa}+</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {selectedStage.description}
            </p>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-violet-400" /> Actionable Stage Deliverables
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {selectedStage.keyActions.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium text-foreground bg-white/5 rounded-xl p-3 border border-white/5 hover:border-violet-500/20 transition-all"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-muted-foreground">
                Primary Operating Tool: <strong className="text-foreground">{selectedStage.recommendedTool}</strong>
              </span>
              <span className="text-violet-400 font-semibold flex items-center gap-1 cursor-pointer hover:underline">
                Explore Stage Tools <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Growth Projection Grid */}
        <div className="mb-6 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-violet-400" />
          <h3 className="text-lg font-bold text-foreground">Future Growth Projection</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {simulations.map((sim, i) => (
            <SimCard key={sim.label} sim={sim} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
