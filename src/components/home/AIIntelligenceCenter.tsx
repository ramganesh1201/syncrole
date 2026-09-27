import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText, Github, Target, Upload, Zap, Lock, TrendingUp,
  CheckCircle, AlertCircle, History, ExternalLink, Star, Activity, Code2, Building2
} from "lucide-react";
import { Link } from "@tanstack/react-router";

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
  languages: [
    { name: "TypeScript", pct: 55, color: "bg-violet-400" },
    { name: "Python", pct: 30, color: "bg-cyan-400" },
    { name: "Go / SQL", pct: 15, color: "bg-emerald-400" }
  ],
  strengths: "React · TS · Node",
  weak: "Integration Testing",
  missing: "CI/CD Pipeline",
  trend: "+12% contributions this month",
};

const DEMO_PLACEMENT = {
  readiness: 72,
  interviewReady: 68,
  offerProb: 61,
  trend: "+4.2% this month",
};

function ScoreRing({ value, label, color, delay = 0 }: { value: number; label: string; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const circ = 2 * Math.PI * 28;

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <motion.circle
            cx="32" cy="32" r="28"
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={inView ? { strokeDashoffset: circ - (circ * value) / 100 } : {}}
            transition={{ duration: 1, ease: "easeOut", delay }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-sm font-bold text-foreground">{value}</div>
        </div>
      </div>
      <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-center">{label}</div>
    </div>
  );
}

function ResumeIntelligence({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const resumeVersions = data?.resumeVersions || [];
  const hasResume = isAuthed && resumeVersions.length > 0;
  const [showHistory, setShowHistory] = useState(false);

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
    return (
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Resume Analyzer</div>
            <div className="text-base font-bold text-foreground">Upload Your Resume</div>
          </div>
          {!isAuthed && (
            <div className="ml-auto inline-flex items-center gap-1 rounded-md border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
              <Lock className="h-3 w-3" /> Sample
            </div>
          )}
        </div>

        <div className="border border-dashed border-white/15 rounded-xl p-8 text-center relative overflow-hidden mb-5 bg-white/5 hover:border-violet-500/40 transition-colors">
          <Upload className="h-8 w-8 mx-auto text-violet-400 mb-3" />
          <div className="font-medium text-sm text-foreground mb-0.5">
            {isAuthed ? "Drop your resume here" : "Upload to unlock ATS analysis"}
          </div>
          <div className="text-xs text-muted-foreground">PDF or DOCX · Max 5MB</div>
          {isAuthed && (
            <Link to="/resume-intelligence" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-xs font-semibold text-white transition shadow-sm">
              <Upload className="h-3.5 w-3.5" /> Upload & Analyze
            </Link>
          )}
        </div>

        <div className="space-y-1.5">
          {[
            { icon: CheckCircle, text: "ATS compatibility scoring" },
            { icon: Star, text: "Recruiter-grade impact evaluation" },
            { icon: Zap, text: "Keyword alignment with target SDE roles" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2.5 text-xs text-muted-foreground">
              <b.icon className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Resume Intelligence</div>
          <div className="text-base font-bold text-foreground">v{r.versions[r.versions.length - 1]?.version || 1} · Active Analysis</div>
        </div>
      </div>

      <div className="flex justify-around mb-5">
        <ScoreRing value={r.atsScore} label="ATS Score" color="#a78bfa" delay={0} />
        <ScoreRing value={r.recruiterRating} label="Recruiter" color="#22d3ee" delay={0.1} />
        <ScoreRing value={r.keywordMatch} label="Keywords" color="#34d399" delay={0.2} />
        <ScoreRing value={r.health} label="Overall" color="#f59e0b" delay={0.3} />
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-4">
        <div className="surface-secondary rounded-xl p-3 border border-white/8">
          <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-semibold text-emerald-400">
            <CheckCircle className="h-3 w-3" /> Top Strength
          </div>
          <div className="text-xs font-medium text-foreground">{r.topStrength}</div>
        </div>
        <div className="surface-secondary rounded-xl p-3 border border-white/8">
          <div className="flex items-center gap-1.5 mb-1 text-[10px] uppercase font-semibold text-violet-400">
            <AlertCircle className="h-3 w-3" /> Primary Gap
          </div>
          <div className="text-xs font-medium text-foreground">{r.topWeakness}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">Missing Technical Keywords</div>
        <div className="flex flex-wrap gap-1.5">
          {(r.missingSkills || []).slice(0, 4).map((s: string) => (
            <span key={s} className="bg-white/5 border border-white/8 rounded-md px-2.5 py-0.5 text-xs text-muted-foreground font-medium">{s}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link to="/resume-intelligence" className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground transition">
          <Upload className="h-3.5 w-3.5 text-violet-400" /> New Version
        </Link>
        <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-foreground transition cursor-pointer">
          <History className="h-3.5 w-3.5 text-cyan-400" /> History
        </button>
      </div>

      {showHistory && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden mt-3">
          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
            <div className="grid grid-cols-4 text-[10px] uppercase font-semibold text-muted-foreground px-3 py-2 border-b border-white/5">
              <span>Ver</span><span>ATS</span><span>Rating</span><span>Date</span>
            </div>
            {r.versions.map((v: any) => (
              <div key={v.version} className="grid grid-cols-4 text-xs px-3 py-2 border-b border-white/5 last:border-0 hover:bg-white/5 transition">
                <span className="font-mono text-muted-foreground">v{v.version}</span>
                <span className="font-bold text-violet-400">{v.atsScore}</span>
                <span className="font-bold text-cyan-400">{v.recruiterRating}</span>
                <span className="text-muted-foreground">{v.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

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
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-foreground">
          <Github className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">GitHub Intelligence</div>
          <div className="text-base font-bold text-foreground">
            {isAuthed && data?.profile?.github_username ? `@${data.profile.github_username}` : "Repository Health"}
          </div>
        </div>
      </div>

      {/* Language Breakdown Visual */}
      <div className="mb-4 space-y-1.5">
        <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
          <span>Language Distribution</span>
          <span className="text-cyan-400 font-mono">14 Active Repos</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
          {gh.languages.map((l) => (
            <div key={l.name} style={{ width: `${l.pct}%` }} className={`h-full ${l.color}`} title={`${l.name}: ${l.pct}%`} />
          ))}
        </div>
        <div className="flex gap-3 text-[10px] text-muted-foreground">
          {gh.languages.map((l) => (
            <div key={l.name} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${l.color}`} />
              <span>{l.name} ({l.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {repos.map((r) => (
          <div key={r} className="surface-secondary rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-muted-foreground truncate border border-white/5 hover:border-violet-500/20 transition-all cursor-pointer">
            <span className="text-violet-400 mr-1">→</span>{r}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Strengths", value: gh.strengths, color: "text-emerald-400" },
          { label: "Focus", value: gh.weak, color: "text-violet-400" },
          { label: "Gap", value: gh.missing, color: "text-cyan-400" },
        ].map((s) => (
          <div key={s.label} className="surface-secondary rounded-xl p-2.5 border border-white/8">
            <div className="text-[10px] uppercase font-semibold text-muted-foreground">{s.label}</div>
            <div className={`mt-0.5 text-xs font-semibold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
        <TrendingUp className="h-3.5 w-3.5" /> {gh.trend}
      </div>
    </div>
  );
}

function PlacementIntelligence({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const score = data?.scores?.[0]?.total_score || DEMO_PLACEMENT.readiness;
  
  const [selectedTier, setSelectedTier] = useState<"tier1" | "unicorn" | "product">("tier1");

  const tierMultipliers = {
    tier1: { label: "Tier 1 Product (Google/Amazon)", readiness: score, interview: Math.round(score * 0.88), offer: Math.round(score * 0.65) },
    unicorn: { label: "High-Growth Unicorn", readiness: Math.min(100, score + 8), interview: Math.round(score * 0.95), offer: Math.round(score * 0.78) },
    product: { label: "Product SaaS Companies", readiness: Math.min(100, score + 14), interview: Math.round(score * 0.98), offer: Math.round(score * 0.86) },
  };

  const activeMetrics = tierMultipliers[selectedTier];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Placement Intelligence</div>
            <div className="text-base font-bold text-foreground">Company Tier Benchmarks</div>
          </div>
        </div>
      </div>

      {/* Segmented Tier Switcher */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 border border-white/5 mb-4">
        {[
          { id: "tier1", label: "Tier 1" },
          { id: "unicorn", label: "Unicorns" },
          { id: "product", label: "Product Cos" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTier(t.id as any)}
            className={`flex-1 rounded-lg py-1 text-[11px] font-semibold transition cursor-pointer ${
              selectedTier === t.id
                ? "bg-violet-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {[
          { label: "Placement Readiness", value: activeMetrics.readiness, color: "bg-violet-500" },
          { label: "Interview Readiness", value: activeMetrics.interview, color: "bg-cyan-400" },
          { label: "Offer Probability", value: activeMetrics.offer, color: "bg-emerald-400" },
        ].map((m, i) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground font-medium">{m.label}</span>
              <span className="font-bold text-foreground">{m.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${m.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs surface-secondary border border-white/8 rounded-xl px-3.5 py-2.5">
        <Activity className="h-4 w-4 text-emerald-400 shrink-0" />
        <span className="text-muted-foreground">Target Tier:</span>
        <span className="text-emerald-400 font-semibold truncate">
          {activeMetrics.label}
        </span>
      </div>
    </div>
  );
}

export default function AIIntelligenceCenter({ data }: { data: any }) {
  const isAuthed = !!data?.profile;

  return (
    <section id="ai-center" className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-violet-400" />
              <span className="uppercase tracking-wider text-[11px]">AI Intelligence Center</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                <Lock className="h-3 w-3" /> Sample Preview
              </div>
            )}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Every file. Every commit. <span className="text-cyan-400">Decoded.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            Resume health, GitHub activity, and placement readiness — analyzed and presented in one clear workspace.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="surface-primary rounded-2xl p-6 border border-white/10 shadow-xl hover:border-violet-500/30 transition-all"
          >
            <ResumeIntelligence data={data} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="surface-primary rounded-2xl p-6 border border-white/10 shadow-xl hover:border-violet-500/30 transition-all"
          >
            <GitHubIntelligence data={data} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="surface-primary rounded-2xl p-6 border border-white/10 shadow-xl hover:border-violet-500/30 transition-all"
          >
            <PlacementIntelligence data={data} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
