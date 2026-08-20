import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Code2,
  FileText,
  Github,
  Activity,
  ChevronRight,
  Zap,
  Lock,
  Star,
  CheckCircle,
  AlertCircle,
  Folder,
  GraduationCap,
  Box,
  Cloud,
  Clock,
  Award,
} from "lucide-react";
import { levelProgress, ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

/* ─── Helpers ────────────────────────────────────────────────── */

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

/* ─── Main Component ─────────────────────────────────────────── */

export default function AICareerTwinSection({ data }: { data: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isAuthed = !!data?.profile;

  // Real data extractions
  const xp = isAuthed ? (data?.xp?.total_xp ?? 0) : 1240;
  const levelInfo = levelProgress(xp);
  const level = isAuthed ? (data?.xp?.level ?? levelInfo.cur.lvl) : 78;
  const progressPct = isAuthed ? levelInfo.pct : 78;
  const streak = isAuthed ? (data?.streak?.current_streak ?? 0) : 12;

  const scores = data?.scores?.[0] || {};
  const codingScore = isAuthed
    ? (scores.coding_score ?? scores.projects_score ?? (data?.github_analysis?.commit_count ? Math.min(95, data.github_analysis.commit_count * 2) : 0))
    : 82;

  const dsaProblemsCount = (data?.dsaLogs || []).reduce(
    (acc: number, l: any) => acc + (l.easy || 0) + (l.medium || 0) + (l.hard || 0),
    0
  );
  const dsaScore = isAuthed
    ? (scores.dsa_score ?? (dsaProblemsCount > 0 ? Math.min(95, dsaProblemsCount * 5 + 30) : 0))
    : 78;

  const consistencyScore = isAuthed
    ? Math.min(100, streak * 5 + (dsaProblemsCount > 0 ? 25 : 0))
    : 88;

  // Active Mission
  const activeMission = isAuthed
    ? data?.missions?.find((m: any) => !m.completed) || data?.missions?.[0]
    : null;

  const missionTitle = isAuthed
    ? (activeMission?.title || "Complete Daily Practice")
    : "Update Your Skills";

  const missionProgress = isAuthed
    ? (activeMission ? Math.min(100, Math.round(((activeMission.progress || 0) / (activeMission.target || 1)) * 100)) : 0)
    : 75;

  const missionXp = isAuthed
    ? (activeMission?.xp_reward || 30)
    : 30;

  // Strengths List
  const strengthsList = [
    { name: "Project Building", icon: CheckCircle, rightIcon: Folder },
    { name: "Resume Writing", icon: CheckCircle, rightIcon: FileText },
    { name: "GitHub Activity", icon: CheckCircle, rightIcon: Github },
  ];

  // Weaknesses List
  const weaknessesList = [
    { name: "Consistency", icon: Clock },
    { name: "DSA / Problem Solving", icon: Code2 },
  ];

  // Growth Areas List
  const growthAreasList = [
    { name: "Advanced DSA", icon: Box, rightIcon: GraduationCap },
    { name: "System Design", icon: Box, rightIcon: Box },
    { name: "Cloud & DevOps", icon: Cloud, rightIcon: Cloud },
  ];

  // Memory Records
  const memoryRecords = isAuthed
    ? (data?.activityLogs || []).slice(0, 3).map((l: any) => ({
        label: l.title || (l.type === "resume_upload" ? "Resume uploaded" : l.type === "dsa_solved" ? "DSA problem solved" : "Activity recorded"),
        xp: l.xp_delta && l.xp_delta > 0 ? `+${l.xp_delta} XP` : "+10 XP",
        time: timeAgo(l.created_at || l.timestamp),
      }))
    : [
        { label: "Activity recorded", xp: "+10 XP", time: "2h ago" },
        { label: "Activity recorded", xp: "+10 XP", time: "1d ago" },
        { label: "Activity recorded", xp: "+10 XP", time: "3d ago" },
      ];

  if (isAuthed && memoryRecords.length === 0) {
    memoryRecords.push({ label: "Account initialized", xp: "+20 XP", time: "Just now" });
  }

  // Summary message
  const syncSummaryText = isAuthed
    ? `Based on your recent activity, your strongest signal is project building. Your main gap is consistency — I recommend focused practice over the next 30 days.`
    : "Based on your recent activity, your strongest signal is project building. Your main gap is consistency — I recommend focused practice over the next 30 days.";

  return (
    <section id="twin" ref={ref} className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ─── Header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 backdrop-blur-md shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span className="uppercase tracking-widest text-[11px]">AI CAREER TWIN</span>
            </div>
            {!isAuthed && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300">
                <Lock className="h-3 w-3" /> Demo Preview
              </div>
            )}
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Your digital{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              career twin.
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
            A living simulation of you — updated from resume, GitHub, DSA, XP, and interview history.
          </p>
        </motion.div>

        {/* ─── Three Column Composition Grid ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* ── LEFT COLUMN: Skill Builder Card ────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 bg-[#0b0c16]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h3 className="font-display text-lg font-bold text-white tracking-tight">Skill Builder</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
              </span>
            </div>

            {/* Level & Orb Row */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div>
                <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Current Level</div>
                <div className="font-display text-3xl md:text-4xl font-extrabold text-white mt-1">
                  Level <span className="text-purple-400">{level}</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1.5">
                  Keep building. You're leveling up!
                </div>
              </div>

              {/* Glowing Orb Node */}
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-[0_0_30px_rgba(168,85,247,0.4)] border border-purple-300/30 shrink-0">
                <Sparkles className="w-9 h-9 text-white drop-shadow-md" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${progressPct}%` } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full"
                />
              </div>
              <div className="text-xs font-mono text-right font-semibold text-white">
                {progressPct}%
              </div>
            </div>

            {/* Metric Score Cards */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {/* Coding */}
              <div className="bg-[#070810]/70 border border-white/10 rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xs font-mono text-purple-400">&lt;/&gt;</span>
                  <span className="font-display text-lg font-extrabold text-white">{codingScore}</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 font-medium">Coding</div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div style={{ width: `${Math.min(100, codingScore)}%` }} className="h-full bg-indigo-500 rounded-full" />
                </div>
              </div>

              {/* Problem Solving */}
              <div className="bg-[#070810]/70 border border-white/10 rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-display text-lg font-extrabold text-white">{dsaScore}</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 font-medium">Problem Solving</div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div style={{ width: `${Math.min(100, dsaScore)}%` }} className="h-full bg-purple-500 rounded-full" />
                </div>
              </div>

              {/* Consistency */}
              <div className="bg-[#070810]/70 border border-white/10 rounded-2xl p-3 text-center">
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-display text-lg font-extrabold text-white">{consistencyScore}</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 font-medium">Consistency</div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                  <div style={{ width: `${Math.min(100, consistencyScore)}%` }} className="h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Streak Card */}
            <div className="bg-[#070810]/70 border border-white/10 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Zap className="w-5 h-5 fill-amber-400/20" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{streak} Day Streak</div>
                  <div className="text-xs text-zinc-400">Keep the momentum going!</div>
                </div>
              </div>
              <Award className="w-6 h-6 text-purple-400 shrink-0" />
            </div>
          </motion.div>

          {/* ── CENTER COLUMN: Strengths, Weaknesses, Growth ────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 bg-[#0b0c16]/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-6 flex flex-col justify-between"
          >
            {/* Strengths Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">STRENGTHS</span>
              </div>

              <div className="space-y-2">
                {strengthsList.map((item, i) => {
                  const RightIcon = item.rightIcon;
                  return (
                    <div
                      key={i}
                      className="bg-[#070811]/70 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-xs md:text-sm font-semibold text-white">{item.name}</span>
                      </div>
                      <RightIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weaknesses Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">WEAKNESSES</span>
              </div>

              <div className="space-y-2">
                {weaknessesList.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="bg-[#070811]/70 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className="text-xs md:text-sm font-semibold text-white">{item.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Growth Areas Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">GROWTH AREAS</span>
              </div>

              <div className="space-y-2">
                {growthAreasList.map((item, i) => {
                  const Icon = item.icon;
                  const RightIcon = item.rightIcon;
                  return (
                    <div
                      key={i}
                      className="bg-[#070811]/70 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs md:text-sm font-semibold text-white">{item.name}</span>
                      </div>
                      <RightIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Mission, Memory, Sync Summary ──────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-4 space-y-5 flex flex-col justify-between"
          >
            {/* 1. Today's Mission Card */}
            <div className="bg-[#0b0c16]/90 border border-white/10 rounded-2xl md:rounded-3xl p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">TODAY'S MISSION</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </div>

              <h4 className="text-sm md:text-base font-bold text-white mt-2">{missionTitle}</h4>

              <div className="mt-3">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div style={{ width: `${missionProgress}%` }} className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                </div>
                <div className="text-[10px] font-mono text-right text-zinc-400 mt-1">{missionProgress}%</div>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400 font-mono font-medium">
                <Zap className="w-3.5 h-3.5 fill-amber-400/20" />
                <span>+{missionXp} XP on completion</span>
              </div>
            </div>

            {/* 2. Career Memory Card */}
            <div className="bg-[#0b0c16]/90 border border-white/10 rounded-2xl md:rounded-3xl p-5 shadow-xl backdrop-blur-xl space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">CAREER MEMORY</span>
              </div>

              <div className="space-y-2">
                {memoryRecords.map((m, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-2 text-zinc-300 font-medium">
                      <ChevronRight className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate max-w-[150px] md:max-w-[180px]">{m.label}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-emerald-400 font-medium">{m.xp}</span>
                      <span className="font-mono text-zinc-500 text-[11px]">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/dashboard"
                  className="text-xs font-semibold text-zinc-400 hover:text-white flex items-center justify-between transition-colors group"
                >
                  <span>View all activity</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* 3. Sync Summary Card */}
            <div className="bg-[#0b0c16]/90 border border-white/10 rounded-2xl md:rounded-3xl p-5 shadow-xl backdrop-blur-xl space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400">SYNC SUMMARY</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                </span>
              </div>

              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-normal">
                {syncSummaryText}
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

