import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText, Github, Target, Upload, Zap, Lock, TrendingUp,
  CheckCircle, AlertCircle, History, ExternalLink, ChevronRight,
  Star, Activity,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

/* ─── Demo data ─────────────────────────────────────────────── */

const DEMO_RESUME = {
  atsScore: 92,
  recruiterRating: 87,
  keywordMatch: 78,
  health: 85,
  topStrength: "Clear project impact metrics",
  topWeakness: "Missing quantified achievements",
  missingSkills: ["Docker", "Kubernetes", "CI/CD"],
  versions: [
    { version: 1, atsScore: 68, recruiterRating: 61, date: "3 months ago" },
    { version: 2, atsScore: 78, recruiterRating: 74, date: "6 weeks ago" },
    { version: 3, atsScore: 92, recruiterRating: 87, date: "2 weeks ago" },
  ],
};

const DEMO_GITHUB = {
  repos: 14,
  activity: 82,
  languages: ["TypeScript", "JavaScript", "Python"],
  strengths: "React · TS",
  weak: "Testing",
  missing: "DevOps",
  trend: "+12% contributions this month",
};

const DEMO_PLACEMENT = {
  readiness: 72,
  interviewReady: 68,
  offerProb: 61,
  trend: "+4.2% this month",
};

/* ─── Score ring ─────────────────────────────────────────────── */

function ScoreRing({ value, label, color, delay = 0 }: { value: number; label: string; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const circ = 2 * Math.PI * 32;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 72 72" className="h-full w-full -rotate-90">
          <circle cx="36" cy="36" r="32" fill="none" stroke="oklch(1 0 0 / 0.05)" strokeWidth="6" />
          <motion.circle
            cx="36" cy="36" r="32"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - (circ * value) / 100 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="font-display text-lg font-bold" style={{ color }}>{value}</div>
        </div>
      </div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground text-center">{label}</div>
    </div>
  );
}

/* ─── Resume intelligence sub-section ───────────────────────── */

function ResumeIntelligence({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const resumeVersions = data?.resumeVersions || [];
  const hasResume = isAuthed && resumeVersions.length > 0;
  const [showHistory, setShowHistory] = useState(false);

  // Use real data or demo
  const r = hasResume ? {
    atsScore: resumeVersions[0]?.ats_score || DEMO_RESUME.atsScore,
    recruiterRating: resumeVersions[0]?.recruiter_rating || DEMO_RESUME.recruiterRating,
    keywordMatch: resumeVersions[0]?.keyword_match || DEMO_RESUME.keywordMatch,
    health: resumeVersions[0]?.total_score || DEMO_RESUME.health,
    topStrength: resumeVersions[0]?.top_strength || DEMO_RESUME.topStrength,
    topWeakness: resumeVersions[0]?.top_weakness || DEMO_RESUME.topWeakness,
    missingSkills: resumeVersions[0]?.missing_skills || DEMO_RESUME.missingSkills,
    versions: resumeVersions.map((v: any, i: number) => ({
      version: v.version_number || i + 1,
      atsScore: v.ats_score || 70,
      recruiterRating: v.recruiter_rating || 65,
      date: new Date(v.created_at).toLocaleDateString(),
    })).reverse(),
  } : DEMO_RESUME;

  if (!isAuthed || !hasResume) {
    // Upload prompt
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl glass grid place-items-center">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Resume Analyzer</div>
            <div className="font-display text-lg font-semibold">Upload Your Resume</div>
          </div>
          {!isAuthed && (
            <div className="ml-auto inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
              <Lock className="h-3 w-3" /> Demo
            </div>
          )}
        </div>

        {/* Drop zone */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="border-2 border-dashed border-white/15 rounded-2xl p-10 text-center relative overflow-hidden mb-6"
        >
          <motion.div
            animate={{ y: [-100, 100] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          />
          <Upload className="h-10 w-10 mx-auto text-accent mb-4" />
          <div className="font-medium mb-1">
            {isAuthed ? "Drop your resume here" : "Upload to unlock AI analysis"}
          </div>
          <div className="text-sm text-muted-foreground">PDF, DOCX · Max 5MB</div>
          {isAuthed && (
            <Link to="/resume-intelligence" className="mt-5 inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-2.5 text-sm font-semibold text-primary-foreground">
              <Upload className="h-4 w-4" /> Upload & Analyze
            </Link>
          )}
        </motion.div>

        {/* Benefits list */}
        <div className="space-y-2">
          {[
            { icon: CheckCircle, text: "ATS compatibility analysis", color: "oklch(0.88 0.18 145)" },
            { icon: Star, text: "Recruiter-grade quality rating", color: "oklch(0.72 0.22 295)" },
            { icon: Zap, text: "Keyword match for target JDs", color: "oklch(0.75 0.2 200)" },
            { icon: Target, text: "Dream company skill alignment", color: "oklch(0.85 0.18 70)" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-3 text-sm text-muted-foreground">
              <b.icon className="h-4 w-4 shrink-0" style={{ color: b.color }} />
              {b.text}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Resume Intelligence Center
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-xl glass grid place-items-center">
          <FileText className="h-5 w-5 text-accent" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Resume Intelligence Center</div>
          <div className="font-display text-lg font-semibold">v{r.versions[r.versions.length - 1]?.version || 1} · Active</div>
        </div>
      </div>

      {/* Score rings */}
      <div className="flex justify-around mb-6">
        <ScoreRing value={r.atsScore} label="ATS Score" color="oklch(0.88 0.18 145)" delay={0} />
        <ScoreRing value={r.recruiterRating} label="Recruiter" color="oklch(0.72 0.22 295)" delay={0.1} />
        <ScoreRing value={r.keywordMatch} label="Keywords" color="oklch(0.75 0.2 200)" delay={0.2} />
        <ScoreRing value={r.health} label="Health" color="oklch(0.85 0.18 70)" delay={0.3} />
      </div>

      {/* Insights */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-[oklch(0.88_0.18_145)]" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Top Strength</span>
          </div>
          <div className="text-xs font-medium">{r.topStrength}</div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-[oklch(0.72_0.22_330)]" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Top Weakness</span>
          </div>
          <div className="text-xs font-medium">{r.topWeakness}</div>
        </div>
      </div>

      {/* Missing skills */}
      <div className="mb-5">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Missing Skills</div>
        <div className="flex flex-wrap gap-2">
          {(r.missingSkills || []).slice(0, 4).map((s: string) => (
            <span key={s} className="glass rounded-full px-3 py-1 text-xs text-[oklch(0.72_0.22_330)]">{s}</span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Link to="/resume-intelligence" className="flex items-center gap-1.5 glass rounded-full px-4 py-2 text-xs font-medium hover:bg-white/10 transition">
          <Upload className="h-3.5 w-3.5 text-accent" /> Upload New Version
        </Link>
        <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1.5 glass rounded-full px-4 py-2 text-xs font-medium hover:bg-white/10 transition">
          <History className="h-3.5 w-3.5 text-accent" /> Version History
        </button>
        <Link to="/resume-intelligence" className="flex items-center gap-1.5 glass rounded-full px-4 py-2 text-xs font-medium hover:bg-white/10 transition">
          <ExternalLink className="h-3.5 w-3.5 text-accent" /> Full Analysis
        </Link>
      </div>

      {/* Version history */}
      {showHistory && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-2 border-b border-white/5">
              <span>Version</span><span>ATS</span><span>Recruiter</span><span>Date</span>
            </div>
            {r.versions.map((v: any) => (
              <div key={v.version} className="grid grid-cols-4 text-xs px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition">
                <span className="font-mono text-muted-foreground">v{v.version}</span>
                <span className="font-display font-semibold text-[oklch(0.88_0.18_145)]">{v.atsScore}</span>
                <span className="font-display font-semibold text-[oklch(0.72_0.22_295)]">{v.recruiterRating}</span>
                <span className="text-muted-foreground">{v.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ─── GitHub intelligence sub-section ───────────────────────── */

function GitHubIntelligence({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const gh = isAuthed && data?.profile?.github_username ? {
    repos: DEMO_GITHUB.repos,
    activity: data?.scores?.[0]?.github_score || DEMO_GITHUB.activity,
    languages: DEMO_GITHUB.languages,
    strengths: DEMO_GITHUB.strengths,
    weak: DEMO_GITHUB.weak,
    missing: DEMO_GITHUB.missing,
    trend: DEMO_GITHUB.trend,
  } : DEMO_GITHUB;

  const repos = ["dsa-tracker", "portfolio-v3", "ml-classifier", "chat-app", "redux-store", "next-blog"];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-xl glass grid place-items-center">
          <Github className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">GitHub Intelligence</div>
          <div className="font-display text-lg font-semibold">
            {isAuthed && data?.profile?.github_username ? `@${data.profile.github_username}` : "Connect GitHub"}
          </div>
        </div>
      </div>

      {/* Repo grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {repos.map((r, i) => (
          <motion.div key={r} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="glass rounded-lg px-3 py-2 text-xs font-mono truncate">
            <span className="text-accent">→</span> {r}
          </motion.div>
        ))}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="glass rounded-xl p-4 text-center">
          <div className="font-display text-2xl font-bold text-aurora">{gh.repos}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Repos</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="font-display text-2xl font-bold" style={{ color: "oklch(0.88 0.18 145)" }}>{gh.activity}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Health</div>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <div className="flex flex-wrap gap-1 justify-center">
            {gh.languages.slice(0, 2).map((l: string) => (
              <span key={l} className="text-[10px] text-[oklch(0.75_0.2_200)]">{l}</span>
            ))}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Top Langs</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Strengths", value: gh.strengths, color: "oklch(0.88 0.18 145)" },
          { label: "Weak", value: gh.weak, color: "oklch(0.85 0.18 70)" },
          { label: "Missing", value: gh.missing, color: "oklch(0.72 0.22 330)" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-1.5 text-xs font-medium" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-[oklch(0.88_0.18_145)]">
        <TrendingUp className="h-4 w-4" /> {gh.trend}
      </div>
    </div>
  );
}

/* ─── Placement intelligence sub-section ────────────────────── */

function PlacementIntelligence({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const score = data?.scores?.[0]?.total_score || DEMO_PLACEMENT.readiness;
  const interviewReady = isAuthed ? Math.round(score * 0.92) : DEMO_PLACEMENT.interviewReady;
  const offerProb = isAuthed ? Math.round(score * 0.78) : DEMO_PLACEMENT.offerProb;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-xl glass grid place-items-center">
          <Target className="h-5 w-5 text-accent" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Placement Intelligence</div>
          <div className="font-display text-lg font-semibold">Career Readiness</div>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { label: "Placement Readiness", value: score, color: "oklch(0.75 0.2 200)" },
          { label: "Interview Readiness", value: interviewReady, color: "oklch(0.72 0.22 295)" },
          { label: "Offer Probability", value: offerProb, color: "oklch(0.88 0.18 145)" },
        ].map((m, i) => (
          <div key={m.label}>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-display font-semibold" style={{ color: m.color }}>{m.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${m.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm glass rounded-xl px-4 py-3">
        <Activity className="h-4 w-4 text-[oklch(0.88_0.18_145)]" />
        <span className="text-muted-foreground">Growth Trend:</span>
        <span className="text-[oklch(0.88_0.18_145)] font-medium">
          {isAuthed && data?.scores?.length > 1
            ? `+${score - data.scores[1].total_score} pts from last scan`
            : "+4.2% this month"}
        </span>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function AIIntelligenceCenter({ data }: { data: any }) {
  const isAuthed = !!data?.profile;

  return (
    <section id="ai-center" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span className="uppercase tracking-widest">AI Intelligence Center</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                <Lock className="h-3 w-3" /> Demo Preview
              </div>
            )}
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Every file. Every commit.{" "}
            <br />
            <span className="text-aurora">Decoded.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Resume, GitHub, and placement intelligence — unified into one command center.
          </p>
        </div>

        {/* Three-column intelligence grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Resume */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-aurora opacity-20 blur-3xl pointer-events-none" />
            {/* Intel scan line */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div className="intel-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
            <div className="relative z-10">
              <ResumeIntelligence data={data} />
            </div>
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-accent opacity-15 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <GitHubIntelligence data={data} />
            </div>
          </motion.div>

          {/* Placement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-3xl p-8 relative overflow-hidden"
          >
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[oklch(0.72_0.22_330)] opacity-15 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <PlacementIntelligence data={data} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
