import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  ArrowLeft,
  Flame,
  Zap,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Lightbulb,
  Clock,
  CheckCircle2,
  Activity,
  Play,
  Send,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DSAService } from "@/lib/services/dsa.service";
import { TodayPracticePanel } from "@/components/dsa/TodayPracticePanel";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard/dsa")({
  component: DSAPage,
  head: () => ({ meta: [{ title: "DSA Command Center — SyncRole" }] }),
});

export interface PracticeAnalytics {
  totalActiveMinutes: number;
  weeklyActiveMinutes: number;
  attemptedCount: number;
  solvedCount: number;
  totalSubmissions: number;
  fastestRuntimeMs: number | null;
}

function toLocalDateStr(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function DSAPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [practiceLogs, setPracticeLogs] = useState<any[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<any[]>([]);
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, level_name: "Career Explorer" });
  const [streakData, setStreakData] = useState({ current_streak: 0, longest_streak: 0 });
  const [loading, setLoading] = useState(true);
  
  const [revisionQueue, setRevisionQueue] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const [analytics, setAnalytics] = useState<PracticeAnalytics>({
    totalActiveMinutes: 0,
    weeklyActiveMinutes: 0,
    attemptedCount: 0,
    solvedCount: 0,
    totalSubmissions: 0,
    fastestRuntimeMs: null,
  });

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return setLogs([]);
    const uid = u.user.id;

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [logsRes, practiceRes, xpRes, streakRes, progRes, solvedRes, sessionsRes, subCountRes, subRes] =
      await Promise.all([
        supabase
          .from("dsa_progress")
          .select("*")
          .eq("user_id", uid)
          .order("log_date", { ascending: false })
          .limit(60),
        supabase
          .from("activity_logs")
          .select("*")
          .eq("user_id", uid)
          .eq("type", "dsa_practice")
          .order("created_at", { ascending: false })
          .limit(60),
        supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
        supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle(),
        supabase.from("user_problem_progress").select(`
          id, problem_id, status, is_bookmarked, needs_revision, last_solved_at, first_solved_at, solved, best_execution_time_ms, updated_at,
          dsa_problems ( id, title, difficulty, leetcode_url, topic_id )
        `).eq("user_id", uid),
        DSAService.getSolvedAnalytics(uid),
        supabase.from("dsa_practice_sessions").select("active_seconds, created_at, last_heartbeat_at").eq("user_id", uid),
        supabase.from("dsa_submissions").select("id", { count: "exact", head: true }).eq("user_id", uid),
        supabase.from("dsa_submissions").select("id, status, is_run_only, created_at").eq("user_id", uid),
      ]);
    
    setLogs(logsRes.data ?? []);
    setPracticeLogs(practiceRes.data ?? []);
    setSolvedProblems(solvedRes ?? []);

    if (xpRes.data) setXpData(xpRes.data);
    if (streakRes.data) setStreakData(streakRes.data);
    
    // Process Practice Analytics
    const sessions = sessionsRes.data ?? [];
    const totalActiveSecs = sessions.reduce((sum, s) => sum + (s.active_seconds ?? 0), 0);
    const weeklyActiveSecs = sessions
      .filter((s) => s.created_at >= sevenDaysAgo)
      .reduce((sum, s) => sum + (s.active_seconds ?? 0), 0);

    const progData = progRes.data ?? [];
    const attemptedCount = progData.filter((p: any) => p.status && p.status !== "not_started").length;
    const solvedCount = progData.filter((p: any) => p.solved || p.status === "solved").length;

    const runtimes = progData
      .map((p: any) => p.best_execution_time_ms)
      .filter((t: any): t is number => typeof t === "number" && t > 0);
    const fastestRuntimeMs = runtimes.length > 0 ? Math.min(...runtimes) : null;

    setAnalytics({
      totalActiveMinutes: Math.round(totalActiveSecs / 60),
      weeklyActiveMinutes: Math.round(weeklyActiveSecs / 60),
      attemptedCount,
      solvedCount,
      totalSubmissions: subCountRes.count ?? 0,
      fastestRuntimeMs,
    });

    // Process Revision Queue
    if (progRes.data) {
      const needsRev = progRes.data.filter((p: any) => p.needs_revision || p.is_bookmarked);
      setRevisionQueue(needsRev.slice(0, 5));
    }

    // Process Recommendations
    const { data: recData } = await supabase
      .from("dsa_problems")
      .select("id, title, difficulty, leetcode_url")
      .limit(3);
    if (recData) setRecommendations(recData);

    setLoading(false);
  }
  
  useEffect(() => {
    load();
  }, []);

  const solvedTotals = solvedProblems.reduce((a, p) => {
    const diff = p.dsa_problems?.difficulty?.toLowerCase();
    if (diff === 'easy') a.e++;
    else if (diff === 'medium') a.m++;
    else if (diff === 'hard') a.h++;
    return a;
  }, { e: 0, m: 0, h: 0 });

  const totalSolved = Math.max(analytics.solvedCount, solvedTotals.e + solvedTotals.m + solvedTotals.h);

  const last30 = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key = toLocalDateStr(d);
    const day = solvedProblems.filter((p) => {
      const dateStr = p.last_solved_at || p.first_solved_at || p.updated_at;
      return dateStr && toLocalDateStr(dateStr) === key;
    }).length;
    return { day: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), count: day };
  });

  const difficultyData = [
    { name: "Easy", value: solvedTotals.e },
    { name: "Medium", value: solvedTotals.m },
    { name: "Hard", value: solvedTotals.h },
  ];

  const heat = Array.from({ length: 90 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    const key = toLocalDateStr(d);
    
    let intensityScore = 0;
    
    const legacyDay = logs.filter((l) => l.log_date === key);
    legacyDay.forEach(l => {
      intensityScore += (l.easy + l.medium + l.hard);
    });

    const practiceDay = practiceLogs.filter(p => toLocalDateStr(p.created_at) === key);
    practiceDay.forEach(p => {
      intensityScore += 1;
      if (p.meta?.problems_attempted) intensityScore += p.meta.problems_attempted;
    });

    return { key, n: intensityScore };
  });

  if (loading && totalSolved === 0 && heat.length === 0) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back to dashboard
      </Link>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold">DSA Command Center</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Track real practice time, master topics, prepare for technical interviews.
          </p>
        </div>
        <div className="flex gap-2">
          <Pill icon={Zap} label={`${xpData.total_xp} XP from DSA`} accent />
          <Pill icon={Flame} label={`${streakData.current_streak}-day streak`} />
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid gap-2 md:grid-cols-4 lg:grid-cols-5">
        <Link
          to="/dsa-roadmap"
          className="glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between"
        >
          Topic Roadmap <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
        <Link
          to="/dsa-problems"
          className="glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between"
        >
          Problem Library <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
        <Link
          to="/dsa-companies"
          className="glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between"
        >
          Company Prep <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
        <Link
          to="/dsa-daily"
          className="glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between"
        >
          Daily Challenge <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
        <Link
          to="/dsa-mentor"
          className="glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between"
        >
          AI Mentor <ArrowLeft className="h-3 w-3 rotate-180" />
        </Link>
      </div>

      {/* Primary KPI Grid (Auto-Tracked Practice Stats) */}
      <div className="grid gap-4 md:grid-cols-5">
        <Stat
          label="Total Active Time"
          value={analytics.totalActiveMinutes > 60 ? `${Math.round(analytics.totalActiveMinutes / 60)}h` : `${analytics.totalActiveMinutes}m`}
          accent
        />
        <Stat
          label="Weekly Practice"
          value={`${analytics.weeklyActiveMinutes}m`}
          color="text-aurora"
        />
        <Stat
          label="Attempted"
          value={analytics.attemptedCount}
          color="text-yellow-400"
        />
        <Stat
          label="Verified Solved"
          value={totalSolved}
          color="text-green-400"
        />
        <Stat
          label="Fastest Solve"
          value={analytics.fastestRuntimeMs ? `${analytics.fastestRuntimeMs}ms` : "N/A"}
          color="text-accent"
        />
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Easy Verified ✓" value={solvedTotals.e} color="text-green-400" />
        <Stat label="Medium Verified ✓" value={solvedTotals.m} color="text-yellow-400" />
        <Stat label="Hard Verified ✓" value={solvedTotals.h} color="text-red-400" />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionLabel icon={TrendingUp}>Last 30 Days Activity</SectionLabel>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last30}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Solved"
                  stroke="oklch(0.72 0.22 295)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <SectionLabel icon={Target}>Difficulty Mix</SectionLabel>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#facc15" />
                  <Cell fill="#f87171" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Heatmap & Today's Practice Panel */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionLabel icon={Calendar}>Consistency Heatmap (90 Days)</SectionLabel>
          <p className="text-xs text-muted-foreground mt-1 mb-4">
            Every block represents active practice sessions & verified solves.
          </p>
          <div className="grid grid-cols-15 gap-1.5 overflow-x-auto pb-2">
            {heat.map((h) => {
              const bg =
                h.n === 0
                  ? "bg-white/5"
                  : h.n < 3
                  ? "bg-aurora/30 border border-aurora/40"
                  : h.n < 6
                  ? "bg-aurora/60 border border-aurora/70"
                  : "bg-aurora border border-white/20 shadow-[0_0_8px_rgba(168,85,247,0.5)]";
              return (
                <div
                  key={h.key}
                  title={`${h.key}: ${h.n} practice activities`}
                  className={`h-4 w-4 rounded-sm ${bg} transition-all hover:scale-125 cursor-pointer`}
                />
              );
            })}
          </div>
        </Card>

        <Card>
          <TodayPracticePanel />
        </Card>
      </div>
    </main>
  );
}

function SectionLabel({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
      <Icon className="h-3.5 w-3.5 text-aurora" />
      <span>{children}</span>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-strong rounded-3xl p-5 border border-white/5 ${className}`}>{children}</div>;
}

function Stat({ label, value, accent, color }: { label: string; value: React.ReactNode; accent?: boolean; color?: string }) {
  return (
    <div className={`glass-strong rounded-3xl p-5 border border-white/5 ${accent ? "border-aurora/30 bg-aurora/5" : ""}`}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display text-2xl font-bold mt-1 ${color ?? (accent ? "text-aurora" : "")}`}>
        {value}
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label, accent }: { icon: React.ElementType; label: string; accent?: boolean }) {
  return (
    <div
      className={`glass rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5 border border-white/10 ${
        accent ? "text-aurora border-aurora/30 bg-aurora/10" : ""
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}
