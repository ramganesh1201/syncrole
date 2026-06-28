import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Target, TrendingUp, AlertTriangle, CheckCircle,
  Users, BarChart2, Zap, Brain,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from "recharts";

/* ─── Types ─────────────────────────────────────────────────── */

type ViewMode = "student" | "recruiter";

/* ─── Demo constants ─────────────────────────────────────────── */

const DEMO_RECRUITER = {
  hireDecision: "Strong Hire",
  hiringProbability: 74,
  strengths: ["Consistent daily activity", "Strong React & TypeScript skills", "Resume shows real project impact"],
  weaknesses: ["System design exposure limited", "Testing practices absent from portfolio"],
  riskFactors: ["No internship experience", "Limited company-scale projects"],
  competitiveness: "Top 30% of applicants for mid-level SDE roles",
};

/* ─── Radar chart custom label ───────────────────────────────── */

function CustomAngleAxisTick({ x, y, payload }: any) {
  return (
    <text x={x} y={y} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={10} dy={4}>
      {payload.value.length > 12 ? payload.value.slice(0, 10) + "…" : payload.value}
    </text>
  );
}

/* ─── Main component ────────────────────────────────────────── */

export default function RecruiterToggleSection({ data }: { data: any }) {
  const [view, setView] = useState<ViewMode>("student");
  const isAuthed = !!data?.profile;

  const dsa = data?.dsaLogs?.reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0) || 0;
  const score = data?.scores?.[0]?.total_score || 0;
  const bdScore = data?.scores?.[0] || { resume_score: 0, projects_score: 0, github_score: 0, dsa_score: 0, communication_score: 0 };
  const rScore = data?.resume?.total_score || 0;
  const streak = data?.streak?.current_streak || 0;
  const xp = data?.xp?.total_xp || 0;

  const recruiterStats = isAuthed
    ? [
        { label: "Technical Skills", val: Math.min(100, Math.round(bdScore.projects_score * 0.5 + (bdScore.github_score || 0) * 0.5 + 10)) },
        { label: "Problem Solving", val: Math.min(100, Math.round(dsa * 1.2 + (bdScore.dsa_score || 0) * 0.4)) },
        { label: "Consistency", val: Math.min(100, streak * 5 + 25) },
        { label: "Learning Speed", val: Math.min(100, Math.round(xp / 80 + 35)) },
        { label: "Resume Strength", val: rScore || 50 },
        { label: "Interview Ready", val: score },
      ]
    : [
        { label: "Technical Skills", val: 74 },
        { label: "Problem Solving", val: 68 },
        { label: "Consistency", val: 82 },
        { label: "Learning Speed", val: 71 },
        { label: "Resume Strength", val: 68 },
        { label: "Interview Ready", val: 72 },
      ];

  const radarData = recruiterStats.map((s) => ({ subject: s.label, A: s.val, fullMark: 100 }));

  const overallProb = Math.round(recruiterStats.reduce((a, s) => a + s.val, 0) / recruiterStats.length);

  const hireDecision =
    overallProb >= 80 ? "Strong Hire" :
    overallProb >= 65 ? "Hire" :
    overallProb >= 50 ? "Borderline" : "Not Yet";

  const hireColor =
    hireDecision === "Strong Hire" ? "oklch(0.88 0.18 145)" :
    hireDecision === "Hire" ? "oklch(0.75 0.2 200)" :
    hireDecision === "Borderline" ? "oklch(0.85 0.18 70)" : "oklch(0.72 0.22 330)";

  const strengths = isAuthed
    ? recruiterStats.filter((s) => s.val >= 70).map((s) => s.label)
    : DEMO_RECRUITER.strengths;

  const weaknessList = isAuthed
    ? recruiterStats.filter((s) => s.val < 60).map((s) => `Low ${s.label} (${s.val}/100)`)
    : DEMO_RECRUITER.weaknesses;

  const riskFactors = isAuthed
    ? [
        ...(dsa < 30 ? ["Limited DSA practice"] : []),
        ...(rScore < 60 ? ["Weak resume score"] : []),
        ...(streak < 5 ? ["Inconsistent activity"] : []),
        ...((data?.profile?.github_username ? [] : ["No GitHub connected"])),
      ]
    : DEMO_RECRUITER.riskFactors;

  const competitiveness = isAuthed
    ? overallProb >= 80
      ? "Top 15% of applicants"
      : overallProb >= 65
      ? "Top 35% of applicants"
      : overallProb >= 50
      ? "Top 55% of applicants"
      : "Lower 45% — needs improvement"
    : DEMO_RECRUITER.competitiveness;

  return (
    <section id="dual-view" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Toggle */}
        <div className="flex justify-center mb-14">
          <div className="glass rounded-full p-1.5 inline-flex gap-1 border border-white/10">
            {(["student", "recruiter"] as ViewMode[]).map((v) => (
              <motion.button
                key={v}
                onClick={() => setView(v)}
                className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-colors ${
                  view === v ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {view === v && (
                  <motion.div
                    layoutId="toggle-bg"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {v === "student" ? <Rocket className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                  {v === "student" ? "Student View" : "Recruiter View"}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "student" ? (
            <motion.div
              key="student"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="glass-strong rounded-3xl p-8 md:p-12 text-center border border-white/10"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Rocket className="h-16 w-16 text-accent mx-auto mb-6" />
              </motion.div>
              <h3 className="font-display text-3xl font-bold mb-4">
                {isAuthed ? `You're building momentum, ${data?.profile?.full_name?.split(" ")[0] || "there"}!` : "You're doing great!"}
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                {isAuthed
                  ? `Placement score: ${score}%. Every DSA problem and resume update compounds into career growth. Keep your ${streak}-day streak alive.`
                  : "Keep solving problems and building your streak. Every small step compounds into massive career growth."}
              </p>

              {isAuthed && (
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                  {[
                    { label: "Placement Score", value: `${score}%`, icon: Target },
                    { label: "Day Streak", value: streak.toString(), icon: Zap },
                    { label: "DSA Solved", value: dsa.toString(), icon: Brain },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-2xl p-4">
                      <s.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                      <div className="font-display text-2xl font-bold text-aurora">{s.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="recruiter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="glass-strong rounded-3xl p-8 md:p-12 border border-white/10"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Hire decision + stats */}
                <div>
                  {/* Hire decision badge */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className="px-6 py-3 rounded-2xl font-display text-xl font-bold hire-yes"
                      style={{ background: `${hireColor}20`, color: hireColor, border: `1px solid ${hireColor}40` }}
                    >
                      {hireDecision}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">Hiring Probability</div>
                      <div className="font-display text-3xl font-bold" style={{ color: hireColor }}>
                        {overallProb}%
                      </div>
                    </div>
                  </div>

                  {/* Stats bars */}
                  <div className="space-y-3 mb-8">
                    {recruiterStats.map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{s.label}</span>
                          <span className="font-mono text-foreground">{s.val}/100</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full bg-aurora"
                            initial={{ width: 0 }}
                            animate={{ width: `${s.val}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Competitiveness */}
                  <div className="glass rounded-2xl p-4 flex items-center gap-3">
                    <BarChart2 className="h-5 w-5 text-accent shrink-0" />
                    <div className="text-sm">
                      <span className="text-muted-foreground">Market Position: </span>
                      <span className="font-medium">{competitiveness}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Radar + insight lists */}
                <div className="space-y-6">
                  {/* Radar chart */}
                  <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.08)" />
                        <PolarAngleAxis dataKey="subject" tick={<CustomAngleAxisTick />} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Candidate" dataKey="A" stroke="oklch(0.72 0.22 295)" fill="oklch(0.72 0.22 295)" fillOpacity={0.35} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Strengths */}
                  {strengths.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-[oklch(0.88_0.18_145)]" />
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Strengths</span>
                      </div>
                      <div className="space-y-1.5">
                        {(typeof strengths[0] === "string" && (strengths as string[]).map ? (strengths as string[]) : []).slice(0, 3).map((s: string) => (
                          <div key={s} className="text-sm text-[oklch(0.88_0.18_145)] flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 shrink-0" /> {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk factors */}
                  {riskFactors.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-[oklch(0.85_0.18_70)]" />
                        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Risk Factors</span>
                      </div>
                      <div className="space-y-1.5">
                        {riskFactors.slice(0, 3).map((r) => (
                          <div key={r} className="text-sm text-[oklch(0.85_0.18_70)] flex items-center gap-2">
                            <AlertTriangle className="h-3 w-3 shrink-0" /> {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
