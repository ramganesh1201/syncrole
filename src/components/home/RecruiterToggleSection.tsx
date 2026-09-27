import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, Target, AlertTriangle, CheckCircle,
  Users, BarChart2, Zap, Brain,
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from "recharts";

type ViewMode = "student" | "recruiter";

const DEMO_RECRUITER = {
  hireDecision: "Strong Hire",
  hiringProbability: 74,
  strengths: ["Consistent daily practice", "Solid React & TypeScript capability", "Verified GitHub project rhythm"],
  weaknesses: ["System design depth limited", "Testing practices absent from portfolio"],
  riskFactors: ["No internship experience", "Limited large-scale projects"],
  competitiveness: "Top 30% of applicants for entry to mid SDE roles",
};

function CustomAngleAxisTick({ x, y, payload }: any) {
  return (
    <text x={x} y={y} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={11} dy={4}>
      {payload.value.length > 12 ? payload.value.slice(0, 10) + "…" : payload.value}
    </text>
  );
}

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
    overallProb >= 50 ? "Borderline" : "Needs Practice";

  const strengths = isAuthed
    ? recruiterStats.filter((s) => s.val >= 70).map((s) => s.label)
    : DEMO_RECRUITER.strengths;

  const riskFactors = isAuthed
    ? [
        ...(dsa < 30 ? ["Limited DSA problem volume"] : []),
        ...(rScore < 60 ? ["Resume ATS score needs polish"] : []),
        ...(streak < 5 ? ["Inconsistent daily activity"] : []),
        ...((data?.profile?.github_username ? [] : ["No GitHub account connected"])),
      ]
    : DEMO_RECRUITER.riskFactors;

  const competitiveness = isAuthed
    ? overallProb >= 80
      ? "Top 15% of applicant pool"
      : overallProb >= 65
      ? "Top 35% of applicant pool"
      : overallProb >= 50
      ? "Top 55% of applicant pool"
      : "Needs further capability building"
    : DEMO_RECRUITER.competitiveness;

  return (
    <section id="dual-view" className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="surface-primary rounded-xl p-1 inline-flex gap-1 border border-white/10">
            {(["student", "recruiter"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`relative px-6 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  view === v
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {v === "student" ? <Rocket className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />}
                  {v === "student" ? "Candidate View" : "Recruiter Evaluation View"}
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "student" ? (
            <motion.div
              key="student"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="surface-primary rounded-2xl p-8 md:p-10 text-center border border-white/10 shadow-xl max-w-3xl mx-auto"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 mx-auto flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {isAuthed ? `Building steady momentum, ${data?.profile?.full_name?.split(" ")[0] || "there"}!` : "Candidate Capability Index"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto mb-8">
                {isAuthed
                  ? `Career Readiness Index: ${score}%. Daily practice and project contributions compound directly into your evaluation score.`
                  : "Every solved problem and verified project update improves your overall placement readiness index."}
              </p>

              {isAuthed && (
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  {[
                    { label: "Readiness Index", value: `${score}%`, icon: Target },
                    { label: "Practice Streak", value: `${streak} Days`, icon: Zap },
                    { label: "DSA Solved", value: dsa.toString(), icon: Brain },
                  ].map((s) => (
                    <div key={s.label} className="surface-secondary rounded-xl p-3 text-center border border-white/8">
                      <s.icon className="h-4 w-4 text-violet-400 mx-auto mb-1" />
                      <div className="text-xl font-bold text-foreground">{s.value}</div>
                      <div className="text-[10px] font-semibold uppercase text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="recruiter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="surface-primary rounded-2xl p-8 border border-white/10 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="px-4 py-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30 text-base font-bold">
                      {hireDecision}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase text-muted-foreground">Hiring Readiness</div>
                      <div className="text-2xl font-extrabold text-foreground">
                        {overallProb}%
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-6">
                    {recruiterStats.map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground font-medium">{s.label}</span>
                          <span className="font-bold text-foreground">{s.val}/100</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            className="h-full bg-violet-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${s.val}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="surface-secondary rounded-xl p-3 flex items-center gap-2.5 border border-white/8 text-xs">
                    <BarChart2 className="h-4 w-4 text-violet-400 shrink-0" />
                    <div>
                      <span className="text-muted-foreground">Market Position: </span>
                      <span className="font-semibold text-foreground">{competitiveness}</span>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-5">
                  <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                        <PolarGrid stroke="rgba(255,255,255,0.1)" />
                        <PolarAngleAxis dataKey="subject" tick={<CustomAngleAxisTick />} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Candidate" dataKey="A" stroke="#a78bfa" fill="#8b5cf6" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {strengths.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs uppercase font-semibold text-muted-foreground">Verified Strengths</span>
                      </div>
                      <div className="space-y-1">
                        {(typeof strengths[0] === "string" && (strengths as string[]).map ? (strengths as string[]) : []).slice(0, 3).map((s: string) => (
                          <div key={s} className="text-xs text-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {riskFactors.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-xs uppercase font-semibold text-muted-foreground">Attention Factors</span>
                      </div>
                      <div className="space-y-1">
                        {riskFactors.slice(0, 3).map((r) => (
                          <div key={r} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> {r}
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
