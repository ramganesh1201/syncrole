import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Code2,
  Trophy,
  FileText,
  MessageSquare,
  Flame,
  CheckCircle,
  TrendingUp,
  Award,
  Sparkles,
  Target,
  Briefcase,
  User,
  Crown,
  Github,
  Zap,
  Brain,
  ShieldAlert,
  ArrowRight,
  Star,
  Globe,
} from "lucide-react";
import { ACHIEVEMENT_CATALOG, levelProgress } from "@/lib/syncrole";

/* ─── Types ─────────────────────────────────────────────────── */

type FeedEvent = {
  type: string;
  label: string;
  sub?: string;
  xp?: number;
  time: string;
  rawTime: number;
};

interface CategoryStyle {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
  glow: string;
  badgeBg: string;
}

/* ─── Category Visual Styling Map ─────────────────────────────── */

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  dsa: {
    icon: Code2,
    color: "text-emerald-400",
    bg: "bg-emerald-950/80",
    border: "border-emerald-500/40",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.25)]",
    badgeBg: "bg-emerald-950/60 border-emerald-500/30 text-emerald-400",
  },
  achievement: {
    icon: Trophy,
    color: "text-purple-400",
    bg: "bg-purple-950/80",
    border: "border-purple-500/40",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.25)]",
    badgeBg: "bg-purple-950/60 border-purple-500/30 text-purple-400",
  },
  resume: {
    icon: FileText,
    color: "text-sky-400",
    bg: "bg-sky-950/80",
    border: "border-sky-500/40",
    glow: "shadow-[0_0_15px_rgba(56,189,248,0.25)]",
    badgeBg: "bg-sky-950/60 border-sky-500/30 text-sky-400",
  },
  interview: {
    icon: MessageSquare,
    color: "text-teal-400",
    bg: "bg-teal-950/80",
    border: "border-teal-500/40",
    glow: "shadow-[0_0_15px_rgba(45,212,191,0.25)]",
    badgeBg: "bg-teal-950/60 border-teal-500/30 text-teal-400",
  },
  streak: {
    icon: Flame,
    color: "text-amber-400",
    bg: "bg-amber-950/80",
    border: "border-amber-500/40",
    glow: "shadow-[0_0_15px_rgba(251,191,36,0.25)]",
    badgeBg: "bg-amber-950/60 border-amber-500/30 text-amber-400",
  },
  mission: {
    icon: Target,
    color: "text-rose-400",
    bg: "bg-rose-950/80",
    border: "border-rose-500/40",
    glow: "shadow-[0_0_15px_rgba(251,113,133,0.25)]",
    badgeBg: "bg-rose-950/60 border-rose-500/30 text-rose-400",
  },
  github: {
    icon: Github,
    color: "text-indigo-400",
    bg: "bg-indigo-950/80",
    border: "border-indigo-500/40",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.25)]",
    badgeBg: "bg-indigo-950/60 border-indigo-500/30 text-indigo-400",
  },
  profile: {
    icon: User,
    color: "text-cyan-400",
    bg: "bg-cyan-950/80",
    border: "border-cyan-500/40",
    glow: "shadow-[0_0_15px_rgba(34,211,238,0.25)]",
    badgeBg: "bg-cyan-950/60 border-cyan-500/30 text-cyan-400",
  },
  xp: {
    icon: Sparkles,
    color: "text-violet-400",
    bg: "bg-violet-950/80",
    border: "border-violet-500/40",
    glow: "shadow-[0_0_15px_rgba(167,139,250,0.25)]",
    badgeBg: "bg-violet-950/60 border-violet-500/30 text-violet-400",
  },
};

/* ─── Catalog Icon Resolver ──────────────────────────────────── */

const CATALOG_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket: Sparkles,
  CheckCircle: CheckCircle,
  Target: Target,
  Briefcase: Briefcase,
  Flame: Flame,
  Diamond: Sparkles,
  Crown: Crown,
  Sun: Sparkles,
  Moon: Sparkles,
  Code: Code2,
  Terminal: Code2,
  Cpu: Brain,
  Brain: Brain,
  Trophy: Trophy,
  CheckSquare: CheckCircle,
  Activity: Activity,
  ShieldAlert: ShieldAlert,
  Zap: Zap,
  Maximize: Sparkles,
  FileText: FileText,
  FileCheck: FileText,
  Award: Award,
  Medal: Award,
  Key: Sparkles,
  LayoutTemplate: FileText,
  Github: Github,
  GitCommit: Github,
  GitMerge: Github,
  Globe: Globe,
  Star: Star,
  Code2: Code2,
  Mic: MessageSquare,
  Video: MessageSquare,
  MonitorPlay: MessageSquare,
  MessageSquare: MessageSquare,
  Users: User,
  TerminalSquare: Code2,
  Layers: Target,
  TrendingUp: TrendingUp,
  PartyPopper: Trophy,
};

/* ─── Demo Fallbacks (Unauthenticated Visitors) ───────────────── */

const DEMO_FEED: FeedEvent[] = [
  {
    type: "achievement",
    label: "Unlocked: First Steps",
    sub: "Welcome to SyncRole! You've taken your first step.",
    xp: 50,
    time: "2h ago",
    rawTime: Date.now() - 2 * 3600 * 1000,
  },
  {
    type: "profile",
    label: "Unlocked: Profile Complete",
    sub: "100% profile setup completed.",
    xp: 50,
    time: "1d ago",
    rawTime: Date.now() - 24 * 3600 * 1000,
  },
  {
    type: "dsa",
    label: "Solved 5 DSA Problems",
    sub: "You solved 5 problems on LeetCode.",
    xp: 75,
    time: "2d ago",
    rawTime: Date.now() - 2 * 86400 * 1000,
  },
  {
    type: "streak",
    label: "7 Day Streak",
    sub: "Consistency level increased. Keep it up!",
    xp: 30,
    time: "2d ago",
    rawTime: Date.now() - 2 * 86400 * 1000 - 3600 * 1000,
  },
  {
    type: "xp",
    label: "Milestone: Skill Explorer",
    sub: "Explored 10+ new skills.",
    xp: 60,
    time: "3d ago",
    rawTime: Date.now() - 3 * 86400 * 1000,
  },
  {
    type: "interview",
    label: "Completed Mock Interview",
    sub: "Great job! You're interview ready.",
    xp: 40,
    time: "4d ago",
    rawTime: Date.now() - 4 * 86400 * 1000,
  },
];

const DEMO_ACHIEVEMENTS = [
  { code: "first_login", name: "First Steps", status: "Unlocked", unlocked: true },
  { code: "profile_completed", name: "Profile Complete", status: "Unlocked", unlocked: true },
  { code: "skill_explorer", name: "Skill Explorer", status: "Level 1", unlocked: false },
  { code: "portfolio_ready", name: "Portfolio Ready", status: "Locked", unlocked: false },
  { code: "streak_3", name: "Warming Up", status: "5 Day Streak", unlocked: false },
  { code: "dsa_10", name: "Consistent Performer", status: "Locked", unlocked: false },
];

/* ─── Main Component ─────────────────────────────────────────── */

export default function CareerProgressFeed({ data }: { data: any }) {
  const isAuthed = !!data?.profile;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // 1. Build Live Feed Events from Real Application Data
  let liveFeed: FeedEvent[] = [];

  if (isAuthed) {
    // Activity Logs
    (data?.activityLogs || []).forEach((l: any) => {
      const typeMap: Record<string, { label: string; type: string; defaultSub: string }> = {
        resume_upload: { type: "resume", label: "Resume Uploaded & Analyzed", defaultSub: "Resume Intelligence review completed" },
        mock_interview: { type: "interview", label: "Mock Interview Completed", defaultSub: "SyncPilot technical practice completed" },
        mission_complete: { type: "mission", label: "Daily Mission Completed", defaultSub: "Career mission accomplished" },
        dsa_solved: { type: "dsa", label: "Solved DSA Problem", defaultSub: "Algorithmic practice logged" },
        streak_milestone: { type: "streak", label: "Streak Milestone", defaultSub: "Consistency streak updated" },
        profile_completed: { type: "profile", label: "Profile Completed", defaultSub: "Profile setup completed" },
      };
      const mapped = typeMap[l.type] || {
        type: "xp",
        label: l.title || "Career Activity Logged",
        defaultSub: l.description || "System activity recorded",
      };
      const eventTime = l.created_at || l.timestamp;
      liveFeed.push({
        type: mapped.type,
        label: l.title || mapped.label,
        sub: l.description || mapped.defaultSub,
        xp: l.xp_delta && l.xp_delta > 0 ? l.xp_delta : undefined,
        time: timeAgo(eventTime),
        rawTime: new Date(eventTime || Date.now()).getTime(),
      });
    });

    // DSA Logs
    (data?.dsaLogs || []).forEach((l: any) => {
      const total = (l.easy || 0) + (l.medium || 0) + (l.hard || 0);
      if (total > 0) {
        const eventTime = l.created_at || l.log_date;
        liveFeed.push({
          type: "dsa",
          label: `Solved ${total} DSA Problem${total > 1 ? "s" : ""}`,
          sub: `Easy: ${l.easy || 0} · Medium: ${l.medium || 0} · Hard: ${l.hard || 0}`,
          xp: total * 10,
          time: timeAgo(eventTime),
          rawTime: new Date(eventTime || Date.now()).getTime(),
        });
      }
    });

    // Unlocked Achievements
    (data?.achs || []).forEach((a: any) => {
      const cat = ACHIEVEMENT_CATALOG[a.code];
      const eventTime = a.unlocked_at || a.created_at;
      liveFeed.push({
        type: "achievement",
        label: `Unlocked: ${cat?.name || a.code}`,
        sub: cat?.desc || "Milestone unlocked",
        xp: 50,
        time: timeAgo(eventTime),
        rawTime: new Date(eventTime || Date.now()).getTime(),
      });
    });

    // Active Streak
    if (data?.streak?.current_streak && data.streak.current_streak > 0) {
      const eventTime = data.streak.last_activity_date || data.streak.updated_at;
      liveFeed.push({
        type: "streak",
        label: `${data.streak.current_streak} Day Streak`,
        sub: "Consistency level increased. Keep it up!",
        xp: 25,
        time: timeAgo(eventTime),
        rawTime: new Date(eventTime || Date.now()).getTime(),
      });
    }

    // Resume Analysis
    if (data?.resume) {
      liveFeed.push({
        type: "resume",
        label: "Resume Analysis Completed",
        sub: `ATS Score: ${data.resume.total_score || "N/A"}/100`,
        xp: 50,
        time: timeAgo(data.resume.created_at),
        rawTime: new Date(data.resume.created_at || Date.now()).getTime(),
      });
    }

    // Deduplicate identical label & time entries
    const seen = new Set<string>();
    const uniqueFeed: FeedEvent[] = [];
    for (const item of liveFeed) {
      const key = `${item.label}-${item.time}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueFeed.push(item);
      }
    }

    // Sort descending chronologically
    uniqueFeed.sort((a, b) => b.rawTime - a.rawTime);
    liveFeed = uniqueFeed;
  }

  // Fallback initial milestone if authenticated user has no feed events yet
  if (isAuthed && liveFeed.length === 0) {
    liveFeed = [
      {
        type: "profile",
        label: "Welcome to SyncRole",
        sub: "Your career progress tracking is initialized.",
        xp: 20,
        time: "Just now",
        rawTime: Date.now(),
      },
    ];
  }

  const feedToShow = isAuthed ? liveFeed.slice(0, 6) : DEMO_FEED;

  // 2. Weekly Statistics Calculations
  const sevenDaysAgo = Date.now() - 7 * 24 * 3600 * 1000;

  const weeklyXp = isAuthed
    ? liveFeed
        .filter((e) => e.rawTime >= sevenDaysAgo && (e.xp || 0) > 0)
        .reduce((acc, curr) => acc + (curr.xp || 0), 0) || (data?.xp?.total_xp ? Math.min(data.xp.total_xp, 250) : 0)
    : 430;

  const weeklyDsa = isAuthed
    ? (data?.dsaLogs || [])
        .filter((l: any) => new Date(l.created_at || l.log_date || 0).getTime() >= sevenDaysAgo)
        .reduce((acc: number, l: any) => acc + (l.easy || 0) + (l.medium || 0) + (l.hard || 0), 0)
    : 12;

  let placementGrowthStr = "+8.4%";
  if (isAuthed) {
    if (data?.scores && data.scores.length > 0) {
      const latest = data.scores[0]?.total_score;
      if (data.scores.length >= 2) {
        const prev = data.scores[1]?.total_score;
        if (typeof latest === "number" && typeof prev === "number") {
          const diff = latest - prev;
          placementGrowthStr = `${diff >= 0 ? "+" : ""}${diff.toFixed(1)}%`;
        } else if (typeof latest === "number") {
          placementGrowthStr = `${latest.toFixed(1)}%`;
        }
      } else if (typeof latest === "number") {
        placementGrowthStr = `${latest.toFixed(1)}%`;
      } else {
        placementGrowthStr = "—";
      }
    } else {
      placementGrowthStr = "—";
    }
  }

  // 3. Achievements Calculation
  const userAchCodes = new Set((data?.achs || []).map((a: any) => a.code));
  let achievementsToShow: Array<{ code: string; name: string; status: string; unlocked: boolean; icon: string }> = [];

  if (isAuthed) {
    const catalogEntries = Object.entries(ACHIEVEMENT_CATALOG);
    achievementsToShow = catalogEntries.slice(0, 6).map(([code, meta]) => {
      const unlocked = userAchCodes.has(code);
      return {
        code,
        name: meta.name,
        status: unlocked ? "Unlocked" : "Locked",
        unlocked,
        icon: meta.icon,
      };
    });
  } else {
    achievementsToShow = DEMO_ACHIEVEMENTS.map((a) => ({
      code: a.code,
      name: a.name,
      status: a.status,
      unlocked: a.unlocked,
      icon: ACHIEVEMENT_CATALOG[a.code]?.icon || "Trophy",
    }));
  }

  // 4. Career Progress Summary Calculation
  const totalXp = isAuthed ? (data?.xp?.total_xp ?? 0) : 2850;
  const levelInfo = levelProgress(totalXp);
  const currentLevel = isAuthed ? (data?.xp?.level ?? levelInfo.cur.lvl) : 12;
  const displayName = isAuthed
    ? (data?.profile?.full_name ? data.profile.full_name.split(" ")[0] : "Learner")
    : "Ram";

  return (
    <section id="progress" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* ─── Header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-muted-foreground mb-5 border border-white/10 shadow-sm backdrop-blur-md">
            <Activity className="h-3.5 w-3.5 text-cyan-400" />
            <span className="uppercase tracking-widest text-[11px] text-zinc-300">CAREER PROGRESS FEED</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Every{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
              step.
            </span>{" "}
            Every{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              win.
            </span>
          </h2>

          <p className="mt-4 text-sm md:text-base text-zinc-400 max-w-xl mx-auto font-normal leading-relaxed">
            A chronological record of your career growth — XP earned, problems solved, milestones unlocked.
          </p>
        </motion.div>

        {/* ─── Main Two-Column Layout ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
          {/* Left Column: Recent Activity Feed */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h3 className="font-display text-xl font-bold text-white tracking-tight">Recent Activity</h3>
              {!isAuthed && (
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                  Demo data
                </span>
              )}
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 md:pl-8 space-y-4">
              {/* Continuous Vertical Connecting Line */}
              <div className="absolute left-[19px] md:left-[23px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-purple-500/40 via-blue-500/20 to-transparent" />

              {feedToShow.map((event, i) => {
                const catStyle = CATEGORY_STYLES[event.type] || CATEGORY_STYLES.xp;
                const IconComp = catStyle.icon;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="relative flex items-center gap-4 group"
                  >
                    {/* Node Icon Badge */}
                    <div
                      className={`relative z-10 -ml-6 md:-ml-8 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full shrink-0 border transition-transform duration-200 group-hover:scale-105 ${catStyle.bg} ${catStyle.border} ${catStyle.glow}`}
                    >
                      <IconComp className={`w-4 h-4 md:w-5 md:h-5 ${catStyle.color}`} />
                    </div>

                    {/* Activity Card */}
                    <div className="flex-1 bg-[#0c0e17]/80 border border-white/10 hover:border-white/20 rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4 transition-all duration-200 shadow-xl backdrop-blur-md">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm md:text-base font-semibold text-white tracking-tight truncate">
                          {event.label}
                        </h4>
                        {event.sub && (
                          <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 font-normal">
                            {event.sub}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {event.xp && event.xp > 0 && (
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${catStyle.badgeBg}`}>
                            +{event.xp} XP
                          </span>
                        )}
                        <span className="text-xs text-zinc-400 font-mono">
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* View Full Activity Link */}
              <div className="pt-2">
                <Link
                  to="/dashboard"
                  className="w-full py-3.5 bg-[#0c0e17]/80 border border-white/10 hover:border-white/20 rounded-2xl text-xs md:text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group backdrop-blur-md"
                >
                  <span>View Full Activity</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: This Week Analytics + Achievements */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* 1. This Week Analytics Card */}
            <div className="bg-[#0c0e17]/80 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl backdrop-blur-md space-y-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-display text-lg font-bold text-white tracking-tight">This Week</h3>
              </div>

              <div className="space-y-4">
                {/* XP Earned */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">XP EARNED</div>
                    <div className="font-display text-2xl md:text-3xl font-extrabold text-white mt-0.5">
                      {weeklyXp}
                    </div>
                  </div>
                  {!isAuthed && (
                    <div className="text-right">
                      <div className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1">
                        <TrendingUp className="w-3 h-3" /> ↑ 15%
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">vs last week</div>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10" />

                {/* Problems Solved */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">PROBLEMS SOLVED</div>
                    <div className="font-display text-2xl md:text-3xl font-extrabold text-white mt-0.5">
                      {weeklyDsa}
                    </div>
                  </div>
                  {!isAuthed && (
                    <div className="text-right">
                      <div className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1">
                        <TrendingUp className="w-3 h-3" /> ↑ 3
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">vs last week</div>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10" />

                {/* Placement Growth */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">PLACEMENT GROWTH</div>
                    <div className="font-display text-2xl md:text-3xl font-extrabold text-emerald-400 mt-0.5">
                      {placementGrowthStr}
                    </div>
                  </div>
                  {!isAuthed && (
                    <div className="text-right">
                      <div className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1">
                        <TrendingUp className="w-3 h-3" /> ↑ 2.1%
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">vs last week</div>
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10" />

                {/* Daily Avg Active Time */}
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">DAILY AVG. ACTIVE TIME</div>
                    <div className="font-display text-2xl md:text-3xl font-extrabold text-white mt-0.5">
                      {isAuthed ? "—" : "45m"}
                    </div>
                  </div>
                  {!isAuthed && (
                    <div className="text-right">
                      <div className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1">
                        <TrendingUp className="w-3 h-3" /> ↑ 10m
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5">vs last week</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Achievements Grid Card */}
            <div className="bg-[#0c0e17]/80 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">Achievements</h3>
                </div>
                <Link
                  to="/career-identity"
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2.5 md:gap-3">
                {achievementsToShow.map((ach, i) => {
                  const IconComp = CATALOG_ICONS[ach.icon] || Trophy;

                  return (
                    <div
                      key={ach.code || i}
                      className="bg-[#080911]/60 border border-white/10 rounded-2xl p-3 text-center flex flex-col items-center justify-between transition-all duration-200 hover:border-white/20 group"
                    >
                      <div
                        className={`relative w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center mb-2 transition-transform duration-200 group-hover:scale-105 ${
                          ach.unlocked
                            ? "bg-purple-950/70 border border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                            : "bg-zinc-900/60 border border-white/5 text-zinc-600 grayscale opacity-60"
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-semibold text-white line-clamp-1 w-full text-center">
                        {ach.name}
                      </div>
                      <div
                        className={`text-[10px] font-medium mt-1 ${
                          ach.unlocked ? "text-purple-400" : "text-zinc-400"
                        }`}
                      >
                        {ach.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom Career Progress Summary Card ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0c0e17]/90 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          {/* Left: Crown Icon Node + Personal Greeting */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 flex items-center justify-center text-white shadow-[0_0_25px_rgba(147,51,234,0.35)] shrink-0 border border-purple-400/30">
              <Crown className="w-7 h-7 text-purple-200" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
                Keep going, {displayName}!
              </h3>
              <p className="text-xs md:text-sm text-zinc-400 mt-1 font-normal">
                Level {currentLevel} · {totalXp.toLocaleString()} Total XP earned. Keep building your streak!
              </p>
            </div>
          </div>

          {/* Center / Right: Progress Metrics */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 md:gap-10 w-full lg:w-auto border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
            <div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total XP</div>
              <div className="font-display text-2xl md:text-3xl font-extrabold text-white mt-0.5">
                {totalXp.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Level</div>
              <div className="font-display text-2xl md:text-3xl font-extrabold text-white mt-0.5">
                {currentLevel}
              </div>
            </div>

            <div className="min-w-[180px] md:min-w-[220px]">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span className="font-medium uppercase tracking-wider">To next level</span>
                <span className="font-semibold text-white font-mono">{levelInfo.toNext} XP</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${levelInfo.pct}%` } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full"
                />
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-1 text-right">
                {totalXp.toLocaleString()} / {levelInfo.next ? levelInfo.next.min.toLocaleString() : totalXp.toLocaleString()} XP
              </div>
            </div>

            <div>
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-xs md:text-sm font-semibold text-white transition-all duration-200 flex items-center gap-2 group whitespace-nowrap"
              >
                <span>View Dashboard</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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

