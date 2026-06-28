import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity, Code2, Award, CheckCircle, FileText, Zap, Trophy,
  TrendingUp, Flame, Star, Sparkles, MessageSquare,
} from "lucide-react";
import { ACHIEVEMENT_CATALOG } from "@/lib/syncrole";

/* ─── Types ─────────────────────────────────────────────────── */

type FeedEvent = {
  type: string;
  label: string;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  xp?: number;
  time: string;
};

/* ─── Demo data ─────────────────────────────────────────────── */

const DEMO_FEED: FeedEvent[] = [
  { type: "dsa", label: "Solved 3 medium DSA problems", sub: "Binary Search · Two Pointers · Sliding Window", icon: Code2, color: "oklch(0.85 0.18 70)", xp: 30, time: "2h ago" },
  { type: "achievement", label: "Unlocked: DSA Beginner", sub: "10 problems milestone reached", icon: Trophy, color: "oklch(0.72 0.22 295)", xp: 50, time: "5h ago" },
  { type: "resume", label: "Resume v3 analyzed", sub: "ATS Score: 88 · +12 from v2", icon: FileText, color: "oklch(0.75 0.2 200)", xp: 50, time: "1d ago" },
  { type: "interview", label: "Mock interview completed", sub: "Technical Round · Score: 74/100", icon: MessageSquare, color: "oklch(0.88 0.18 145)", xp: 40, time: "2d ago" },
  { type: "xp", label: "Streak bonus earned", sub: "7-day active streak · Bonus XP", icon: Flame, color: "oklch(0.75 0.22 40)", xp: 25, time: "3d ago" },
  { type: "mission", label: "Daily mission completed", sub: "Push to GitHub · Mission done", icon: CheckCircle, color: "oklch(0.88 0.18 145)", xp: 20, time: "4d ago" },
];

const DEMO_WEEKLY = {
  xp: 245,
  dsaProblems: 12,
  placementGrowth: "+3.1%",
  xpTrend: "+18% vs last week",
  dsaTrend: "+5 vs last week",
};

const DEMO_ACHIEVEMENTS = [
  { code: "dsa_10", unlocked: true },
  { code: "resume_uploaded", unlocked: true },
  { code: "github_connected", unlocked: true },
  { code: "streak_7", unlocked: false },
  { code: "placement_80", unlocked: false },
];

/* ─── Event card ─────────────────────────────────────────────── */

function EventCard({ event, index }: { event: FeedEvent; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex items-start gap-4 glass rounded-2xl p-5 hover:bg-white/[0.06] transition group"
    >
      {/* Icon */}
      <div
        className="h-10 w-10 rounded-full grid place-items-center shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${event.color}20`, border: `1px solid ${event.color}30` }}
      >
        <span style={{ color: event.color }}>
          <event.icon className="h-4 w-4" />
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{event.label}</div>
        {event.sub && <div className="text-xs text-muted-foreground mt-0.5">{event.sub}</div>}
      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        {event.xp && (
          <div className="glass rounded-full px-2.5 py-0.5 text-xs font-mono text-[oklch(0.88_0.18_145)]">
            +{event.xp} XP
          </div>
        )}
        <div className="text-xs text-muted-foreground font-mono">{event.time}</div>
      </div>
    </motion.div>
  );
}

/* ─── Achievement badge ──────────────────────────────────────── */

function AchievementBadge({ code, unlocked, index }: { code: string; unlocked: boolean; index: number }) {
  const ach = ACHIEVEMENT_CATALOG[code];
  if (!ach) return null;

  const colors = [
    "oklch(0.75 0.20 200)",
    "oklch(0.72 0.22 295)",
    "oklch(0.85 0.18 70)",
    "oklch(0.88 0.18 145)",
    "oklch(0.72 0.22 330)",
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 150 }}
      whileHover={unlocked ? { y: -6, scale: 1.05 } : {}}
      className={`glass-strong rounded-2xl p-5 text-center ${unlocked ? "cursor-pointer" : "opacity-40 grayscale"}`}
    >
      <div className="relative h-14 w-14 mx-auto mb-3">
        <div className="absolute inset-0 rounded-full blur-xl opacity-50" style={{ background: color }} />
        <div className="relative h-full w-full rounded-full grid place-items-center text-2xl">
          {ach.emoji}
        </div>
      </div>
      <div className="text-xs font-medium leading-tight">{ach.name}</div>
      {!unlocked && <div className="text-[10px] text-muted-foreground mt-1">Locked</div>}
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function CareerProgressFeed({ data }: { data: any }) {
  const isAuthed = !!data?.profile;

  // Build live feed from real data
  const liveFeed: FeedEvent[] = [];

  if (isAuthed) {
    // DSA logs
    (data?.dsaLogs || []).slice(0, 3).forEach((l: any) => {
      const total = (l.easy || 0) + (l.medium || 0) + (l.hard || 0);
      if (total > 0) {
        liveFeed.push({
          type: "dsa",
          label: `Solved ${total} DSA problem${total > 1 ? "s" : ""}`,
          sub: `Easy: ${l.easy} · Medium: ${l.medium} · Hard: ${l.hard}`,
          icon: Code2,
          color: "oklch(0.85 0.18 70)",
          xp: total * 10,
          time: timeAgo(l.created_at),
        });
      }
    });

    // Achievements
    (data?.achs || []).slice(0, 2).forEach((a: any) => {
      liveFeed.push({
        type: "achievement",
        label: `Unlocked: ${ACHIEVEMENT_CATALOG[a.code]?.name || a.code}`,
        sub: ACHIEVEMENT_CATALOG[a.code]?.desc,
        icon: Trophy,
        color: "oklch(0.72 0.22 295)",
        xp: 50,
        time: timeAgo(a.unlocked_at || a.created_at),
      });
    });

    // Activity logs
    (data?.activityLogs || []).slice(0, 3).forEach((l: any) => {
      const typeMap: Record<string, { label: string; icon: any; color: string }> = {
        resume_upload: { label: "Resume uploaded & analyzed", icon: FileText, color: "oklch(0.75 0.2 200)" },
        mock_interview: { label: "Mock interview completed", icon: MessageSquare, color: "oklch(0.88 0.18 145)" },
        mission_complete: { label: "Daily mission completed", icon: CheckCircle, color: "oklch(0.88 0.18 145)" },
      };
      const mapped = typeMap[l.type];
      if (mapped) {
        liveFeed.push({
          type: l.type,
          label: mapped.label,
          icon: mapped.icon,
          color: mapped.color,
          xp: l.xp_delta,
          time: timeAgo(l.created_at),
        });
      }
    });

    liveFeed.sort((a, b) => {
      const ta = parseTimeAgo(a.time);
      const tb = parseTimeAgo(b.time);
      return ta - tb;
    });
  }

  const feedToShow = isAuthed && liveFeed.length > 0 ? liveFeed.slice(0, 6) : DEMO_FEED;

  // Weekly stats
  const weekly = isAuthed
    ? {
        xp: Math.round((data?.xp?.total_xp || 0) * 0.15),
        dsaProblems: (data?.dsaLogs || []).slice(0, 5).reduce((acc: number, l: any) => acc + l.easy + l.medium + l.hard, 0),
        placementGrowth:
          (data?.scores || []).length > 1
            ? `+${(data.scores[0].total_score - data.scores[1].total_score).toFixed(1)}%`
            : "+2.4%",
        xpTrend: "+15% vs last week",
        dsaTrend: "+3 vs last week",
      }
    : DEMO_WEEKLY;

  // Achievements
  const userAchCodes = (data?.achs || []).map((a: any) => a.code);
  const achievementsToShow = isAuthed
    ? Object.keys(ACHIEVEMENT_CATALOG).slice(0, 5).map((code) => ({
        code,
        unlocked: userAchCodes.includes(code),
      }))
    : DEMO_ACHIEVEMENTS;

  return (
    <section id="progress" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-6">
            <Activity className="h-3.5 w-3.5 text-accent" />
            <span className="uppercase tracking-widest">Career Progress Feed</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Every step. <span className="text-aurora">Every win.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            A chronological record of your career growth — XP earned, problems solved, milestones unlocked.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Activity feed */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)] feed-dot" />
              <h3 className="font-display text-xl font-semibold">Recent Activity</h3>
              {!isAuthed && (
                <div className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">Demo data</div>
              )}
            </div>
            {feedToShow.map((event, i) => (
              <EventCard key={i} event={event} index={i} />
            ))}
          </div>

          {/* Right: Weekly + Achievements */}
          <div className="space-y-6">
            {/* Weekly summary */}
            <div className="glass-strong rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-semibold">This Week</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">XP Earned</div>
                  <div className="font-display text-3xl font-bold text-aurora">{weekly.xp}</div>
                  <div className="text-xs text-[oklch(0.88_0.18_145)] flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> {weekly.xpTrend}
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Problems Solved</div>
                  <div className="font-display text-3xl font-bold">{weekly.dsaProblems}</div>
                  <div className="text-xs text-[oklch(0.88_0.18_145)] flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> {weekly.dsaTrend}
                  </div>
                </div>
                <div className="h-px bg-white/5" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Placement Growth</div>
                  <div className="font-display text-3xl font-bold text-[oklch(0.88_0.18_145)]">{weekly.placementGrowth}</div>
                  <div className="text-xs text-[oklch(0.88_0.18_145)] flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" /> Trending up
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-strong rounded-3xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-5">
                <Award className="h-5 w-5 text-accent" />
                <h3 className="font-display text-lg font-semibold">Achievements</h3>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {achievementsToShow.slice(0, 6).map((a, i) => (
                  <AchievementBadge key={a.code} code={a.code} unlocked={a.unlocked} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Helpers ────────────────────────────────────────────────── */

function timeAgo(ts: string): string {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  const hrs = Math.floor(diff / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function parseTimeAgo(s: string): number {
  const n = parseInt(s);
  if (s.includes("m")) return n;
  if (s.includes("h")) return n * 60;
  if (s.includes("d")) return n * 1440;
  return 0;
}
