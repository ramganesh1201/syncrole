import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Code2,
  FileText,
  Github,
  ChevronRight,
  Zap,
  Lock,
  CheckCircle,
  AlertCircle,
  Folder,
  GraduationCap,
  Box,
  Cloud,
  Clock,
  Award,
  Layers,
  Check
} from "lucide-react";
import { levelProgress } from "@/lib/syncrole";

function timeAgo(ts: string | number | Date | null | undefined): string {
  if (!ts) return "recently";
  const date = new Date(ts);
  if (isNaN(date.getTime())) return "recently";
  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const hrs = Math.floor(diffMinutes / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function AICareerTwinSection({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isAuthed = !!data?.profile;

  const [activeTab, setActiveTab] = useState<"all" | "skills" | "gaps" | "pathways">("all");
  const [missionDone, setMissionDone] = useState(false);

  const xp = isAuthed ? (data?.xp?.total_xp ?? 0) : 1240;
  const levelInfo = levelProgress(xp);
  const level = isAuthed ? (data?.xp?.level ?? levelInfo.cur.lvl) : 3;
  const progressPct = isAuthed ? levelInfo.pct : 72;
  const streak = isAuthed ? (data?.streak?.current_streak ?? 0) : 12;

  const scores = data?.scores?.[0] || {};
  const codingScore = isAuthed
    ? (scores.coding_score ?? scores.projects_score ?? (data?.github_analysis?.commit_count ? Math.min(95, data.github_analysis.commit_count * 2) : 0))
    : 75;

  const dsaProblemsCount = (data?.dsaLogs || []).reduce(
    (acc: number, l: any) => acc + (l.easy || 0) + (l.medium || 0) + (l.hard || 0),
    0
  );
  const dsaScore = isAuthed
    ? (scores.dsa_score ?? (dsaProblemsCount > 0 ? Math.min(95, dsaProblemsCount * 5 + 30) : 0))
    : 68;

  const consistencyScore = isAuthed
    ? Math.min(100, streak * 5 + (dsaProblemsCount > 0 ? 25 : 0))
    : 80;

  const activeMission = isAuthed
    ? data?.missions?.find((m: any) => !m.completed) || data?.missions?.[0]
    : null;

  const missionTitle = isAuthed
    ? (activeMission?.title || "Complete Daily Practice")
    : "Review Resume Impact Statements";

  const missionProgress = missionDone ? 100 : (isAuthed
    ? (activeMission ? Math.min(100, Math.round(((activeMission.progress || 0) / (activeMission.target || 1)) * 100)) : 0)
    : 75);

  const missionXp = isAuthed ? (activeMission?.xp_reward || 30) : 30;

  const strengthsList = [
    { name: "Project Building", detail: "Fullstack projects built with production stack" },
    { name: "Resume Fundamentals", detail: "ATS structure matches tier 1 tech templates" },
    { name: "GitHub Activity", detail: "Active commit frequency & clean repo structure" },
  ];

  const weaknessesList = [
    { name: "DSA Solving Consistency", detail: "Requires 25 additional Medium level problems" },
    { name: "System Architecture", detail: "Add distributed caching & DB indexing depth" },
  ];

  const growthAreasList = [
    { name: "Advanced Graph Algorithms", detail: "Dijkstra, Topological Sort, Union-Find" },
    { name: "High-Throughput Microservices", detail: "Dockerized APIs with Redis + Kafka" },
  ];

  const memoryRecords = isAuthed
    ? (data?.activityLogs || []).slice(0, 3).map((l: any) => ({
        label: l.title || (l.type === "resume_upload" ? "Resume uploaded" : l.type === "dsa_solved" ? "DSA problem solved" : "Activity recorded"),
        xp: l.xp_delta && l.xp_delta > 0 ? `+${l.xp_delta} XP` : "+10 XP",
        time: timeAgo(l.created_at || l.timestamp),
      }))
    : [
        { label: "Pushed 3 commits to portfolio", xp: "+15 XP", time: "2h ago" },
        { label: "Solved 3 DSA problems", xp: "+30 XP", time: "5h ago" },
        { label: "Updated resume v2.1", xp: "+20 XP", time: "1d ago" },
      ];

  const syncSummaryText = isAuthed
    ? `Based on your activity, your strongest signal is project building. Focus area: consistency in DSA practice.`
    : "Based on your activity, your strongest signal is project building. Focus area: consistency in DSA practice over the next 30 days.";

  return (
    <section id="twin" ref={ref} className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="uppercase tracking-wider text-[11px]">AI CAREER TWIN</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                <Lock className="h-3 w-3" /> Sample Preview
              </div>
            )}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Your digital <span className="text-cyan-400">career twin.</span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-lg mx-auto font-normal leading-relaxed">
            A continuous simulation of your employability — updated live from resume analysis, GitHub commits, DSA logs, and skill gaps.
          </p>

          {/* Interactive Mode Pills */}
          <div className="flex justify-center gap-2 mt-6">
            {[
              { id: "all", label: "Full Model" },
              { id: "skills", label: "Strengths" },
              { id: "gaps", label: "Attention Areas" },
              { id: "pathways", label: "Growth Pathways" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                    : "bg-white/5 border border-white/8 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Skill Builder Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-4 surface-primary border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-5 hover:border-violet-500/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-400" />
                <h3 className="text-base font-bold text-foreground">Skill Index</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Twin
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Level</div>
                <div className="text-3xl font-extrabold text-foreground mt-0.5">
                  Level <span className="text-violet-400">{level}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Keep building to unlock higher readiness tiers.
                </div>
              </div>

              <div className="w-14 h-14 rounded-xl bg-violet-600/20 border border-violet-500/30 text-violet-400 flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                L{level}
              </div>
            </div>

            <div className="space-y-1">
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${progressPct}%` } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-violet-500 rounded-full"
                />
              </div>
              <div className="text-xs font-semibold text-right text-muted-foreground">
                {progressPct}% to Next Level
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="surface-secondary border border-white/8 rounded-xl p-2.5 text-center">
                <div className="text-base font-bold text-foreground">{codingScore}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Coding</div>
              </div>

              <div className="surface-secondary border border-white/8 rounded-xl p-2.5 text-center">
                <div className="text-base font-bold text-cyan-400">{dsaScore}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">DSA</div>
              </div>

              <div className="surface-secondary border border-white/8 rounded-xl p-2.5 text-center">
                <div className="text-base font-bold text-emerald-400">{consistencyScore}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">Rhythm</div>
              </div>
            </div>

            <div className="surface-secondary border border-white/8 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-400">{streak} Day Practice Streak</div>
                  <div className="text-[10px] text-muted-foreground">Active daily rhythm</div>
                </div>
              </div>
              <Award className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </motion.div>

          {/* Center Column: Strengths, Weaknesses, Growth */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-4 surface-primary border border-white/10 rounded-2xl p-5 shadow-xl space-y-5 flex flex-col justify-between"
          >
            {(activeTab === "all" || activeTab === "skills") && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">STRENGTHS</span>
                </div>

                <div className="space-y-1.5">
                  {strengthsList.map((item, i) => (
                    <div
                      key={i}
                      className="surface-secondary border border-white/8 rounded-xl p-2.5 text-xs text-foreground space-y-0.5"
                    >
                      <div className="flex items-center gap-2 font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground pl-5">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === "all" || activeTab === "gaps") && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">ATTENTION AREAS</span>
                </div>

                <div className="space-y-1.5">
                  {weaknessesList.map((item, i) => (
                    <div
                      key={i}
                      className="surface-secondary border border-white/8 rounded-xl p-2.5 text-xs text-foreground space-y-0.5"
                    >
                      <div className="flex items-center gap-2 font-bold text-violet-300">
                        <AlertCircle className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground pl-5">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === "all" || activeTab === "pathways") && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">GROWTH PATHWAYS</span>
                </div>

                <div className="space-y-1.5">
                  {growthAreasList.map((item, i) => (
                    <div
                      key={i}
                      className="surface-secondary border border-white/8 rounded-xl p-2.5 text-xs text-foreground space-y-0.5"
                    >
                      <div className="flex items-center gap-2 font-bold text-cyan-300">
                        <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{item.name}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground pl-5">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right Column: Mission, Memory, Summary */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-4 space-y-4 flex flex-col justify-between"
          >
            {/* Mission Card with Interactive Toggle */}
            <div className="surface-primary border border-white/10 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">TODAY'S MISSION</span>
                </div>
                <button
                  onClick={() => setMissionDone(!missionDone)}
                  className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition cursor-pointer flex items-center gap-1 ${
                    missionDone
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {missionDone ? <Check className="w-3 h-3" /> : null}
                  {missionDone ? "Completed" : "Mark Done"}
                </button>
              </div>

              <h4 className="text-xs md:text-sm font-bold text-foreground mt-1">{missionTitle}</h4>

              <div className="mt-2.5">
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div style={{ width: `${missionProgress}%` }} className="h-full bg-violet-500 rounded-full transition-all duration-500" />
                </div>
                <div className="text-[10px] text-right text-muted-foreground mt-0.5">{missionProgress}%</div>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-violet-400 font-medium">
                <Zap className="w-3.5 h-3.5" />
                <span>+{missionXp} XP reward</span>
              </div>
            </div>

            <div className="surface-primary border border-white/10 rounded-2xl p-4 shadow-xl space-y-2.5">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">CAREER MEMORY</span>
              </div>

              <div className="space-y-1.5">
                {memoryRecords.map((m: { label: string; xp: string; time: string }, i: number) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-1.5 text-foreground font-medium">
                      <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate max-w-[140px] md:max-w-[170px]">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-emerald-400 font-semibold">{m.xp}</span>
                      <span className="text-muted-foreground text-[11px]">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <Link
                  to="/dashboard"
                  className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center justify-between transition-colors"
                >
                  <span>View full memory log</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="surface-primary border border-white/10 rounded-2xl p-4 shadow-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">SYNC SUMMARY</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed font-normal italic">
                {syncSummaryText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
