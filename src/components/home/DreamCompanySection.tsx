import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronRight, TrendingUp, Target, Code2, FileText, Lock, Clock } from "lucide-react";

/* ─── Company data ───────────────────────────────────────────── */

type Company = {
  name: string;
  emoji: string;
  required: number;
  skillBreakdown: { label: string; required: number }[];
  tier: string;
};

const COMPANIES: Company[] = [
  {
    name: "Google", emoji: "🔵", required: 92, tier: "FAANG",
    skillBreakdown: [
      { label: "Resume", required: 90 },
      { label: "DSA", required: 95 },
      { label: "Projects", required: 88 },
      { label: "System Design", required: 95 },
    ],
  },
  {
    name: "Amazon", emoji: "🟠", required: 90, tier: "FAANG",
    skillBreakdown: [
      { label: "Resume", required: 88 },
      { label: "DSA", required: 88 },
      { label: "Projects", required: 85 },
      { label: "System Design", required: 90 },
    ],
  },
  {
    name: "Microsoft", emoji: "🪟", required: 88, tier: "FAANG",
    skillBreakdown: [
      { label: "Resume", required: 85 },
      { label: "DSA", required: 85 },
      { label: "Projects", required: 82 },
      { label: "System Design", required: 88 },
    ],
  },
  {
    name: "Meta", emoji: "🔷", required: 92, tier: "FAANG",
    skillBreakdown: [
      { label: "Resume", required: 90 },
      { label: "DSA", required: 92 },
      { label: "Projects", required: 88 },
      { label: "System Design", required: 90 },
    ],
  },
  {
    name: "Flipkart", emoji: "🛍️", required: 84, tier: "Product",
    skillBreakdown: [
      { label: "Resume", required: 80 },
      { label: "DSA", required: 82 },
      { label: "Projects", required: 78 },
      { label: "System Design", required: 80 },
    ],
  },
  {
    name: "Swiggy", emoji: "🟠", required: 82, tier: "Product",
    skillBreakdown: [
      { label: "Resume", required: 78 },
      { label: "DSA", required: 80 },
      { label: "Projects", required: 76 },
      { label: "System Design", required: 78 },
    ],
  },
  {
    name: "Zomato", emoji: "🔴", required: 80, tier: "Product",
    skillBreakdown: [
      { label: "Resume", required: 76 },
      { label: "DSA", required: 78 },
      { label: "Projects", required: 74 },
      { label: "System Design", required: 76 },
    ],
  },
  {
    name: "Uber", emoji: "⬛", required: 86, tier: "Product",
    skillBreakdown: [
      { label: "Resume", required: 82 },
      { label: "DSA", required: 84 },
      { label: "Projects", required: 80 },
      { label: "System Design", required: 84 },
    ],
  },
  {
    name: "Razorpay", emoji: "💙", required: 82, tier: "Product",
    skillBreakdown: [
      { label: "Resume", required: 78 },
      { label: "DSA", required: 80 },
      { label: "Projects", required: 76 },
      { label: "System Design", required: 78 },
    ],
  },
];

/* ─── Skill bar ──────────────────────────────────────────────── */

function SkillBar({
  label,
  required,
  current,
  delay,
}: {
  label: string;
  required: number;
  current: number;
  delay: number;
}) {
  const gap = Math.max(0, required - current);
  const pct = Math.min(100, current);
  const color =
    gap === 0
      ? "oklch(0.88 0.18 145)"
      : gap < 15
      ? "oklch(0.85 0.18 70)"
      : "oklch(0.72 0.22 330)";

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-muted-foreground">{label}</span>
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold" style={{ color }}>{current}</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-muted-foreground">{required}</span>
          {gap > 0 && (
            <span className="text-[10px] font-mono" style={{ color: "oklch(0.72 0.22 330)" }}>-{gap}</span>
          )}
        </div>
      </div>
      <div className="relative h-2 rounded-full bg-white/5 overflow-visible">
        {/* Current */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay }}
        />
        {/* Required marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-white/40"
          style={{ left: `${required}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function DreamCompanySection({ data }: { data: any }) {
  const [activeIdx, setActiveIdx] = useState(4); // Default: Flipkart
  const isAuthed = !!data?.profile;

  const score = data?.scores?.[0]?.total_score || 0;
  const bdScore = data?.scores?.[0] || {};
  const resumeScore = data?.resume?.total_score || 0;
  const dsa = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;

  const company = COMPANIES[activeIdx];

  // User's actual scores per dimension
  const userScores = isAuthed
    ? {
        Resume: resumeScore || Math.round(score * 0.9),
        DSA: bdScore.dsa_score || Math.min(100, Math.round(dsa * 1.5)),
        Projects: bdScore.projects_score || Math.round(score * 0.85),
        "System Design": Math.max(0, Math.round((bdScore.github_score || 0) * 0.6 + score * 0.3)),
      }
    : {
        Resume: 68,
        DSA: 62,
        Projects: 72,
        "System Design": 45,
      };

  const matchScore = Math.round(
    company.skillBreakdown.reduce((acc, s) => {
      return acc + Math.min(100, (userScores[s.label as keyof typeof userScores] || 0) / s.required * 100);
    }, 0) / company.skillBreakdown.length
  );

  const gapPts = company.required - (isAuthed ? score : 68);
  const estMonths = Math.max(1, Math.ceil(gapPts / 5));

  const tierColors: Record<string, string> = {
    FAANG: "oklch(0.72 0.22 295)",
    Product: "oklch(0.75 0.2 200)",
  };

  return (
    <section id="target-company" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 text-accent" />
              <span className="uppercase tracking-widest">Dream Company Analyzer</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                <Lock className="h-3 w-3" /> Demo Preview
              </div>
            )}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Aim higher. <span className="text-aurora">Train smarter.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            See exactly how far you are from your dream company — and the precise steps to close the gap.
          </p>
        </div>

        {/* Company selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {COMPANIES.map((c, i) => (
            <motion.button
              key={c.name}
              onClick={() => setActiveIdx(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                activeIdx === i
                  ? "bg-aurora text-white shadow-glow"
                  : "glass hover:bg-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="mr-1.5">{c.emoji}</span>
              {c.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* Match score */}
            <div className="glass-strong rounded-3xl p-8 flex flex-col items-center justify-center gap-4 border border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Company Match</div>
              <div className="relative h-36 w-36">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="oklch(1 0 0 / 0.06)" strokeWidth="8" />
                  <motion.circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke={matchScore >= 80 ? "oklch(0.88 0.18 145)" : matchScore >= 60 ? "oklch(0.85 0.18 70)" : "oklch(0.72 0.22 330)"}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 50}
                    initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                    animate={{ strokeDashoffset: (2 * Math.PI * 50) * (1 - matchScore / 100) }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <div className="font-display text-3xl font-bold text-aurora">{matchScore}%</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Match</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-semibold">{company.emoji} {company.name}</div>
                <div className="glass rounded-full px-3 py-1 text-xs mt-2 inline-block" style={{ color: tierColors[company.tier] }}>
                  {company.tier} Tier
                </div>
              </div>
              {gapPts > 0 && (
                <div className="w-full glass rounded-2xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">Est. Time to Reach:</span>
                  </div>
                  <div className="font-display text-xl font-bold text-aurora mt-1">
                    {estMonths} month{estMonths > 1 ? "s" : ""}
                  </div>
                </div>
              )}
            </div>

            {/* Skill breakdown */}
            <div className="glass-strong rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-5 w-5 text-accent" />
                <div className="font-display text-lg font-semibold">Skill Breakdown</div>
              </div>
              <div className="space-y-5">
                {company.skillBreakdown.map((s, i) => (
                  <SkillBar
                    key={s.label}
                    label={s.label}
                    required={s.required}
                    current={userScores[s.label as keyof typeof userScores] || 0}
                    delay={i * 0.1}
                  />
                ))}
              </div>
              <div className="mt-6 text-[10px] text-muted-foreground flex items-center gap-2">
                <div className="h-px flex-1 bg-white/10" />
                <span>Your score / Required score · Marker = target</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
            </div>

            {/* Gap analysis */}
            <div className="glass-strong rounded-3xl p-8 border border-white/10 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <div className="font-display text-lg font-semibold">Gap Analysis</div>
              </div>

              {/* Score gap */}
              <div className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Overall Score Gap</div>
                <div className="flex items-baseline gap-3">
                  <div className="font-display text-4xl font-bold text-aurora">
                    {isAuthed ? score : 68}
                  </div>
                  <div className="text-muted-foreground">/ {company.required} required</div>
                </div>
                {gapPts > 0 && (
                  <div className="mt-2 text-sm" style={{ color: "oklch(0.72 0.22 330)" }}>
                    Gap: {gapPts} points
                  </div>
                )}
                {gapPts <= 0 && (
                  <div className="mt-2 text-sm text-[oklch(0.88_0.18_145)]">
                    ✅ You meet the threshold!
                  </div>
                )}
              </div>

              {/* Focus areas */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Priority Focus Areas</div>
                <div className="space-y-2">
                  {company.skillBreakdown
                    .map((s) => ({
                      ...s,
                      current: userScores[s.label as keyof typeof userScores] || 0,
                      gap: s.required - (userScores[s.label as keyof typeof userScores] || 0),
                    }))
                    .filter((s) => s.gap > 0)
                    .sort((a, b) => b.gap - a.gap)
                    .map((s) => (
                      <div key={s.label} className="flex items-center justify-between glass rounded-xl px-4 py-2.5 text-sm">
                        <div className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-accent" />
                          <span>{s.label}</span>
                        </div>
                        <span className="text-xs font-mono" style={{ color: "oklch(0.72 0.22 330)" }}>
                          -{s.gap} pts
                        </span>
                      </div>
                    ))}
                  {company.skillBreakdown.every(
                    (s) => (userScores[s.label as keyof typeof userScores] || 0) >= s.required
                  ) && (
                    <div className="text-center text-[oklch(0.88_0.18_145)] text-sm py-4">
                      🎯 All skills meet requirements!
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="glass-strong rounded-2xl p-4 border border-[oklch(0.72_0.22_295)]/30">
                <div className="text-xs text-muted-foreground mb-2">AI Recommendation</div>
                <p className="text-sm">
                  {gapPts > 20
                    ? `Focus on ${company.skillBreakdown.sort((a, b) => (userScores[b.label as keyof typeof userScores] || 0) - (userScores[a.label as keyof typeof userScores] || 0))[company.skillBreakdown.length - 1]?.label} first — it's your largest gap.`
                    : gapPts > 0
                    ? "You're close! 2–3 months of focused practice should get you there."
                    : "You're ready to apply! Start with your strongest matching role."}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
