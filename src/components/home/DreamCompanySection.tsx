import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  ChevronRight,
  TrendingUp,
  Code2,
  FileText,
  Lock,
  ArrowRight,
  Building2,
  Brain,
  Sparkles,
  Layers,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { careerEngine } from "@/lib/career-intelligence";

/* ─── Popular Company Suggestions ( shortcuts / explore targets ) ─── */
interface TargetSuggestion {
  id: string;
  name: string;
  emoji: string;
  tier: string;
  defaultRole: string;
}

const POPULAR_TARGETS: TargetSuggestion[] = [
  { id: "google", name: "Google", emoji: "🔵", tier: "Tier 1 · Tech Giant", defaultRole: "Software Engineer" },
  { id: "microsoft", name: "Microsoft", emoji: "🪟", tier: "Tier 1 · Tech Giant", defaultRole: "Full Stack Engineer" },
  { id: "amazon", name: "Amazon", emoji: "🟠", tier: "Tier 1 · Tech Giant", defaultRole: "Backend Engineer" },
  { id: "atlassian", name: "Atlassian", emoji: "🔷", tier: "Tier 1 · Product", defaultRole: "Software Engineer" },
  { id: "nvidia", name: "NVIDIA", emoji: "🟢", tier: "Tier 1 · Hardware/AI", defaultRole: "AI / ML Engineer" },
  { id: "adobe", name: "Adobe", emoji: "🔴", tier: "Tier 1 · Product", defaultRole: "Frontend Engineer" },
  { id: "zoho", name: "Zoho", emoji: "🟨", tier: "Product Company", defaultRole: "Full Stack Engineer" },
  { id: "startups", name: "High-Growth Startup", emoji: "🚀", tier: "Startup Tier", defaultRole: "Full Stack Engineer" },
];

export default function DreamCompanySection({ data }: { data: any }) {
  const nav = useNavigate();
  const isAuthed = !!data?.profile;
  const userSavedCompanies: string[] = data?.profile?.dream_companies || [];
  const userTargetRole: string = data?.profile?.target_role || data?.profile?.career_goal || "Software Engineer";

  // Active selected company for preview/analysis
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    userSavedCompanies.length > 0 ? userSavedCompanies[0] : "google"
  );

  const hasConfiguredTarget = isAuthed && userSavedCompanies.length > 0;

  // Real user readiness scores
  const score = data?.scores?.[0]?.total_score || 0;
  const bdScore = data?.scores?.[0] || {};
  const resumeScore = data?.resume?.total_score || 0;
  const dsaSolved = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;

  // Active Company Profile
  const companyProfile = careerEngine.getCompany(selectedCompanyId);
  const companyName = companyProfile?.name || selectedCompanyId.toUpperCase();

  // Dimension breakdown using real data
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

  // Sort gaps by points to target (largest gap first)
  const sortedGaps = [...realGaps].sort((a, b) => (b.target - b.current) - (a.target - a.current));
  const biggestGap = sortedGaps[0];

  const targetReadinessScore = isAuthed ? (score || 50) : 68;
  const pointsToClose = Math.max(0, 100 - targetReadinessScore);

  return (
    <section id="target-company" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-purple-300 border border-purple-500/20">
              <Target className="h-3.5 w-3.5 text-purple-400" />
              <span className="uppercase tracking-widest">DREAM PATH</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                <Lock className="h-3 w-3" /> Preview
              </div>
            )}
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
            Your goal. Your gap. <span className="text-aurora">Your next move.</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            SyncRole compares your current readiness with your configured target and builds your next steps.
          </p>
        </div>

        {/* ── STATE 1: NO TARGET CONFIGURED (Authed User with empty dream_companies) ── */}
        {isAuthed && !hasConfiguredTarget && (
          <div className="glass-strong rounded-3xl p-8 md:p-12 mb-12 border border-purple-500/20 text-center max-w-3xl mx-auto space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 mx-auto flex items-center justify-center text-purple-300">
              <Target className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">
                WHERE DO YOU WANT TO GO?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Set the company and role you're aiming for. SyncRole will compare your current readiness with that target and build your next steps.
              </p>
            </div>
            <div>
              <Link
                to="/career-identity"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Set My Dream Target</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* ── EXPLORE / POPULAR TARGETS SHORTCUTS ── */}
        <div className="mb-10">
          <div className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            {hasConfiguredTarget ? "YOUR TARGETS & POPULAR SHORTCUTS" : "EXPLORE POPULAR TARGETS"}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {/* If user has saved targets, show them first */}
            {userSavedCompanies.map((cId) => {
              const cp = careerEngine.getCompany(cId);
              const isSelected = cId.toLowerCase() === selectedCompanyId.toLowerCase();
              return (
                <motion.button
                  key={`user-${cId}`}
                  onClick={() => setSelectedCompanyId(cId)}
                  whileTap={{ scale: 0.97 }}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-glow border border-purple-400"
                      : "bg-purple-500/10 border border-purple-500/30 text-purple-200 hover:bg-purple-500/20"
                  }`}
                >
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300">TARGET</span>
                  <span>{cp.name}</span>
                </motion.button>
              );
            })}

            {/* Popular target shortcuts */}
            {POPULAR_TARGETS.filter(t => !userSavedCompanies.map(c => c.toLowerCase()).includes(t.id)).map((t) => (
              <motion.button
                key={t.id}
                onClick={() => setSelectedCompanyId(t.id)}
                whileTap={{ scale: 0.97 }}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                  selectedCompanyId.toLowerCase() === t.id.toLowerCase()
                    ? "bg-aurora text-white shadow-glow"
                    : "glass hover:bg-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="mr-1.5">{t.emoji}</span>
                {t.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── DREAM PATH ANALYSIS GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCompanyId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* CARD 1: TARGET READINESS */}
            <div className="glass-strong rounded-3xl p-8 flex flex-col justify-between border border-white/10 relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    {hasConfiguredTarget && userSavedCompanies.map(c => c.toLowerCase()).includes(selectedCompanyId.toLowerCase()) ? "YOUR ACTIVE TARGET" : "TARGET READINESS"}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {companyProfile?.tier ? `Tier ${companyProfile.tier}` : "Tech Target"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-lg shrink-0">
                    <Building2 className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">{companyName}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{userTargetRole}</p>
                  </div>
                </div>

                {/* Score Dial */}
                <div className="py-4 flex flex-col items-center justify-center">
                  <div className="relative h-36 w-36 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="8" />
                      <motion.circle
                        cx="60" cy="60" r="50"
                        fill="none"
                        stroke={targetReadinessScore >= 80 ? "oklch(0.88 0.18 145)" : targetReadinessScore >= 60 ? "oklch(0.85 0.18 70)" : "oklch(0.72 0.22 330)"}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 50}
                        initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                        animate={{ strokeDashoffset: (2 * Math.PI * 50) * (1 - targetReadinessScore / 100) }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <div>
                        <div className="font-display text-3xl font-bold text-white">
                          {targetReadinessScore} <span className="text-xs font-normal text-muted-foreground">/ 100</span>
                        </div>
                        <div className="text-[10px] text-purple-300 font-semibold uppercase tracking-wider mt-0.5">
                          Readiness
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs font-semibold text-purple-300">
                    {pointsToClose > 0 ? `${pointsToClose} points to close gap` : "Target readiness threshold met!"}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Based on your current SyncRole profile signals
                  </p>
                </div>
              </div>

              {!isAuthed && (
                <button
                  onClick={() => nav({ to: "/auth" })}
                  className="mt-6 w-full py-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-200 text-xs font-semibold hover:bg-purple-600/30 transition flex items-center justify-center gap-1.5"
                >
                  <span>Sign in to Set as Target</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* CARD 2: WHAT'S BETWEEN YOU AND YOUR TARGET? (GAP BREAKDOWN) */}
            <div className="glass-strong rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Target className="h-5 w-5 text-accent" />
                  <div className="font-display text-lg font-semibold text-white">What's Between You & Target?</div>
                </div>

                <div className="space-y-4">
                  {realGaps.map((g) => {
                    const gap = Math.max(0, g.target - g.current);
                    return (
                      <div key={g.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">{g.label}</span>
                          <span className="font-mono text-white">
                            {g.current} <span className="text-muted-foreground">/ {g.target}</span>
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${gap === 0 ? 'bg-emerald-400' : gap < 15 ? 'bg-amber-400' : 'bg-purple-500'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (g.current / g.target) * 100)}%` }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>SyncRole ranks your readiness bottlenecks from real activity</span>
              </div>
            </div>

            {/* CARD 3: BIGGEST GAP & NEXT BEST MOVE */}
            <div className="glass-strong rounded-3xl p-8 border border-white/10 flex flex-col justify-between space-y-5">
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <div className="font-display text-lg font-semibold text-white">Your Next Move</div>
                </div>

                {/* Biggest gap callout */}
                <div className="glass rounded-2xl p-4 border border-amber-500/20 bg-amber-500/5">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400 mb-1">
                    LARGEST CURRENT GAP
                  </div>
                  <div className="text-base font-bold text-white mb-1">
                    {biggestGap?.label}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Current score: <span className="text-white font-semibold">{biggestGap?.current}</span> (Target: {biggestGap?.target}). Improving this area provides the largest leverage for your target.
                  </p>
                </div>

                {/* Long-term path concept */}
                <div className="glass rounded-2xl p-4 border border-white/5 space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-purple-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>CAREER PROGRESSION</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Improve primary leverage areas → Build verified capability → Approach application-ready territory.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={isAuthed ? biggestGap?.route || "/dashboard" : "/auth"}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 text-white rounded-xl py-3 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <span>{isAuthed ? `Start ${biggestGap?.label.split(" ")[0]} Practice` : "Get Started on Dream Path"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
