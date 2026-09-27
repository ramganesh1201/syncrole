import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  TrendingUp,
  Lock,
  ArrowRight,
  Building2,
  Sparkles,
  Layers,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { careerEngine } from "@/lib/career-intelligence";

interface TargetSuggestion {
  id: string;
  name: string;
  emoji: string;
  tier: string;
  defaultRole: string;
}

const POPULAR_TARGETS: TargetSuggestion[] = [
  { id: "google", name: "Google", emoji: "🔵", tier: "Tier 1", defaultRole: "Software Engineer" },
  { id: "microsoft", name: "Microsoft", emoji: "🪟", tier: "Tier 1", defaultRole: "Full Stack Engineer" },
  { id: "amazon", name: "Amazon", emoji: "🟠", tier: "Tier 1", defaultRole: "Backend Engineer" },
  { id: "atlassian", name: "Atlassian", emoji: "🔷", tier: "Tier 1", defaultRole: "Software Engineer" },
  { id: "nvidia", name: "NVIDIA", emoji: "🟢", tier: "Tier 1", defaultRole: "AI / ML Engineer" },
  { id: "adobe", name: "Adobe", emoji: "🔴", tier: "Tier 1", defaultRole: "Frontend Engineer" },
  { id: "zoho", name: "Zoho", emoji: "🟨", tier: "Product", defaultRole: "Full Stack Engineer" },
  { id: "startups", name: "High-Growth Startup", emoji: "🚀", tier: "Startup", defaultRole: "Full Stack Engineer" },
];

export default function DreamCompanySection({ data }: { data: any }) {
  const nav = useNavigate();
  const isAuthed = !!data?.profile;
  const userSavedCompanies: string[] = data?.profile?.dream_companies || [];
  const userTargetRole: string = data?.profile?.target_role || data?.profile?.career_goal || "Software Engineer";

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    userSavedCompanies.length > 0 ? userSavedCompanies[0] : "google"
  );

  const hasConfiguredTarget = isAuthed && userSavedCompanies.length > 0;

  const score = data?.scores?.[0]?.total_score || 0;
  const bdScore = data?.scores?.[0] || {};
  const resumeScore = data?.resume?.total_score || 0;
  const dsaSolved = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;

  const companyProfile = careerEngine.getCompany(selectedCompanyId);
  const companyName = companyProfile?.name || selectedCompanyId.toUpperCase();

  const realGaps = isAuthed
    ? [
        {
          label: "DSA & Problem Solving",
          current: bdScore.dsa_score ?? Math.min(100, dsaSolved * 2),
          target: 85,
          route: "/dashboard/dsa",
        },
        {
          label: "Resume & ATS Score",
          current: resumeScore || bdScore.resume_score || 0,
          target: 80,
          route: "/resume-intelligence",
        },
        {
          label: "Projects & Engineering Depth",
          current: bdScore.projects_score || bdScore.github_score || 0,
          target: 75,
          route: "/profile",
        },
        {
          label: "System Design & Architecture",
          current: Math.max(0, Math.round((bdScore.github_score || 0) * 0.6 + score * 0.4)),
          target: 80,
          route: "/dashboard",
        },
      ]
    : [
        { label: "DSA & Problem Solving", current: 62, target: 85, route: "/auth" },
        { label: "Resume & ATS Score", current: 68, target: 80, route: "/auth" },
        { label: "Projects & Engineering Depth", current: 72, target: 75, route: "/auth" },
        { label: "System Design & Architecture", current: 45, target: 80, route: "/auth" },
      ];

  const sortedGaps = [...realGaps].sort((a, b) => (b.target - b.current) - (a.target - a.current));
  const biggestGap = sortedGaps[0];

  const targetReadinessScore = isAuthed ? (score || 50) : 68;
  const pointsToClose = Math.max(0, 100 - targetReadinessScore);

  return (
    <section id="target-company" className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-violet-400">
              <Target className="h-3.5 w-3.5" />
              <span className="uppercase tracking-wider text-[11px]">DREAM TARGET</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                <Lock className="h-3 w-3" /> Sample Preview
              </div>
            )}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Your goal. Your gap. <span className="text-cyan-400">Your next move.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            SyncRole compares your current capability profile against target role requirements to highlight your priority focus areas.
          </p>
        </div>

        {/* Empty State */}
        {isAuthed && !hasConfiguredTarget && (
          <div className="surface-primary rounded-2xl p-8 mb-8 border border-white/10 text-center max-w-2xl mx-auto space-y-4">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 mx-auto flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-foreground">
                Set Your Career Target
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                Configure your target role and target companies to receive tailored gap analysis and actionable practice steps.
              </p>
            </div>
            <div>
              <Link
                to="/career-identity"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-sm transition"
              >
                <span>Set Target Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Popular Targets Shortcuts */}
        <div className="mb-8">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {hasConfiguredTarget ? "YOUR TARGETS & EXPLORE" : "EXPLORE TARGET COMPANIES"}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {userSavedCompanies.map((cId) => {
              const cp = careerEngine.getCompany(cId);
              const isSelected = cId.toLowerCase() === selectedCompanyId.toLowerCase();
              return (
                <button
                  key={`user-${cId}`}
                  onClick={() => setSelectedCompanyId(cId)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-violet-600 text-white border border-violet-500"
                      : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white">TARGET</span>
                  <span>{cp.name}</span>
                </button>
              );
            })}

            {POPULAR_TARGETS.filter(t => !userSavedCompanies.map(c => c.toLowerCase()).includes(t.id)).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedCompanyId(t.id)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition cursor-pointer ${
                  selectedCompanyId.toLowerCase() === t.id.toLowerCase()
                    ? "bg-violet-600 text-white font-semibold"
                    : "bg-white/5 border border-white/8 hover:bg-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="mr-1">{t.emoji}</span>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCompanyId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Target Readiness */}
            <div className="surface-primary rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">
                    Target Profile
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {companyProfile?.tier ? `Tier ${companyProfile.tier}` : "Target"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground shrink-0">
                    <Building2 className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{companyName}</h3>
                    <p className="text-xs text-muted-foreground">{userTargetRole}</p>
                  </div>
                </div>

                <div className="py-3 flex flex-col items-center justify-center">
                  <div className="text-4xl font-extrabold text-foreground">
                    {targetReadinessScore} <span className="text-sm font-normal text-muted-foreground">/ 100</span>
                  </div>
                  <div className="text-xs font-semibold text-violet-400 uppercase tracking-wider mt-1">
                    Readiness Index
                  </div>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  {pointsToClose > 0 ? `${pointsToClose} pts from target benchmark` : "Threshold met"}
                </div>
              </div>

              {!isAuthed && (
                <button
                  onClick={() => nav({ to: "/auth" })}
                  className="mt-4 w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-foreground text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Sign in to save target</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Gap Breakdown */}
            <div className="surface-primary rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Target className="h-4 w-4 text-cyan-400" />
                  <div className="text-base font-bold text-foreground">Capability Gaps</div>
                </div>

                <div className="space-y-3.5">
                  {realGaps.map((g) => {
                    const gap = Math.max(0, g.target - g.current);
                    return (
                      <div key={g.label} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground font-medium">{g.label}</span>
                          <span className="font-semibold text-foreground">
                            {g.current} <span className="text-muted-foreground font-normal">/ {g.target}</span>
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${gap === 0 ? 'bg-emerald-400' : 'bg-violet-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (g.current / g.target) * 100)}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/8 text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span>Evaluated against target benchmarks</span>
              </div>
            </div>

            {/* Next Best Move */}
            <div className="surface-primary rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <div className="text-base font-bold text-foreground">Next Action</div>
                </div>

                <div className="surface-secondary rounded-xl p-3.5 border border-white/8 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    LARGEST GAP
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    {biggestGap?.label}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Current: <span className="text-foreground font-semibold">{biggestGap?.current}</span> (Target: {biggestGap?.target}). Closing this gap provides your maximum placement lift.
                  </p>
                </div>

                <div className="surface-secondary rounded-xl p-3.5 border border-white/8 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    <span>Path Sequence</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Close priority gap → Verify capability in log → Unlock interview readiness.
                  </p>
                </div>
              </div>

              <Link
                to={isAuthed ? biggestGap?.route || "/dashboard" : "/auth"}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-2.5 text-xs font-semibold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>{isAuthed ? `Focus on ${biggestGap?.label.split(" ")[0]}` : "Start Target Path"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
