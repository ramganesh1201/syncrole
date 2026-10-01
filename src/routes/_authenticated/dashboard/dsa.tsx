import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
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
import { ConsistencyHeatmap, HeatmapDayData } from "@/components/dsa/ConsistencyHeatmap";
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

  const [sessionsData, setSessionsData] = useState<any[]>([]);
  const [submissionsData, setSubmissionsData] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);

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

    setSessionsData(sessionsRes.data ?? []);
    setSubmissionsData(subRes.data ?? []);
    setProgressData(progRes.data ?? []);

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
    const canonicalSolvedIds = new Set(
      progData.filter((p: any) => p.solved === true || p.status === "solved").map((p: any) => p.problem_id)
    );
    const solvedCount = canonicalSolvedIds.size;

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

    function handleFocus() {
      load();
    }
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const solvedTotals = solvedProblems.reduce((a, p) => {
    const diff = p.dsa_problems?.difficulty?.toLowerCase();
    if (diff === 'easy') a.e++;
    else if (diff === 'medium') a.m++;
    else if (diff === 'hard') a.h++;
    return a;
  }, { e: 0, m: 0, h: 0 });

  const totalSolved = analytics.solvedCount;

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

  const heatmapDays = useMemo<HeatmapDayData[]>(() => {
    return Array.from({ length: 90 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (89 - i));
      const key = toLocalDateStr(d);

      let activeSecs = 0;
      let runs = 0;
      let subs = 0;
      let solves = 0;

      // 1. Practice sessions on this local day
      const daySessions = sessionsData.filter((s: any) => {
        return toLocalDateStr(s.last_heartbeat_at || s.created_at) === key;
      });
      daySessions.forEach((s: any) => {
        activeSecs += s.active_seconds ?? 0;
      });

      // 2. Submissions / runs on this local day
      const daySubmissions = submissionsData.filter((sub: any) => {
        return toLocalDateStr(sub.created_at) === key;
      });
      daySubmissions.forEach((sub: any) => {
        if (sub.is_run_only) {
          runs += 1;
        } else {
          subs += 1;
        }
      });

      // 3. Verified solves on this local day
      const daySolves = progressData.filter((p: any) => {
        if (!p.solved && p.status !== "solved") return false;
        const solveDate = p.last_solved_at || p.first_solved_at || p.updated_at;
        return solveDate && toLocalDateStr(solveDate) === key;
      });
      solves = daySolves.length;

      const activeMins = Math.round(activeSecs / 60);
      const intensityScore = (activeMins * 1) + (runs * 1) + (subs * 2) + (solves * 4);

      return {
        dateKey: key,
        dateObj: d,
        activeSeconds: activeSecs,
        runCount: runs,
        submissionCount: subs,
        solvedCount: solves,
        intensityScore,
      };
    });
  }, [sessionsData, submissionsData, progressData]);

  if (loading && totalSolved === 0 && heatmapDays.every((d) => d.intensityScore === 0)) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6 bg-[#F8FAFC]">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
      </Link>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight">DSA Command Center</h1>
          <p className="text-sm text-slate-600 mt-2">
            Track real practice time, master topics, prepare for technical interviews.
          </p>
        </div>
        <div className="flex gap-2">
          <Pill icon={Zap} label={`${xpData.total_xp} XP from DSA`} accent />
          <Pill icon={Flame} label={`${streakData.current_streak}-day streak`} />
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Link
          to="/dsa-roadmap"
          className="bg-white border border-slate-200/90 text-slate-800 hover:text-purple-700 hover:bg-purple-50/70 shadow-xs hover:shadow-sm font-semibold rounded-2xl transition-all duration-200 flex items-center justify-between px-4 py-3.5 group transform hover:scale-[1.02] hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-600" /> Topic Roadmap
          </span>
          <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-400 group-hover:text-purple-600 transition-colors" />
        </Link>
        <Link
          to="/dsa-problems"
          className="bg-white border border-slate-200/90 text-slate-800 hover:text-purple-700 hover:bg-purple-50/70 shadow-xs hover:shadow-sm font-semibold rounded-2xl transition-all duration-200 flex items-center justify-between px-4 py-3.5 group transform hover:scale-[1.02] hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-purple-600" /> Problem Library
          </span>
          <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-400 group-hover:text-purple-600 transition-colors" />
        </Link>
        <Link
          to="/dsa-companies"
          className="bg-white border border-slate-200/90 text-slate-800 hover:text-purple-700 hover:bg-purple-50/70 shadow-xs hover:shadow-sm font-semibold rounded-2xl transition-all duration-200 flex items-center justify-between px-4 py-3.5 group transform hover:scale-[1.02] hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <Award className="h-4 w-4 text-purple-600" /> Company Prep
          </span>
          <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-400 group-hover:text-purple-600 transition-colors" />
        </Link>
        <Link
          to="/dsa-daily"
          className="bg-white border border-slate-200/90 text-slate-800 hover:text-purple-700 hover:bg-purple-50/70 shadow-xs hover:shadow-sm font-semibold rounded-2xl transition-all duration-200 flex items-center justify-between px-4 py-3.5 group transform hover:scale-[1.02] hover:-translate-y-0.5"
        >
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-purple-600" /> Daily Challenge
          </span>
          <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-400 group-hover:text-purple-600 transition-colors" />
        </Link>
        <Link
          to="/dsa-mentor"
          className="bg-white border border-slate-200/90 text-slate-800 hover:text-purple-700 hover:bg-purple-50/70 shadow-xs hover:shadow-sm font-semibold rounded-2xl transition-all duration-200 flex items-center justify-between px-4 py-3.5 group transform hover:scale-[1.02] hover:-translate-y-0.5 sm:col-span-2 md:col-span-1"
        >
          <span className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-purple-600" /> AI Mentor
          </span>
          <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-slate-400 group-hover:text-purple-600 transition-colors" />
        </Link>
      </div>

      {/* Primary KPI Grid (Auto-Tracked Practice Stats) */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Stat
          label="Total Active Time"
          value={analytics.totalActiveMinutes > 60 ? `${Math.round(analytics.totalActiveMinutes / 60)}h` : `${analytics.totalActiveMinutes}m`}
          accent
        />
        <Stat
          label="Weekly Practice"
          value={`${analytics.weeklyActiveMinutes}m`}
          color="text-purple-600"
        />
        <Stat
          label="Attempted"
          value={analytics.attemptedCount}
          color="text-amber-600"
        />
        <Stat
          label="Verified Solved"
          value={totalSolved}
          color="text-emerald-600"
        />
        <Stat
          label="Fastest Solve"
          value={analytics.fastestRuntimeMs ? `${analytics.fastestRuntimeMs}ms` : "N/A"}
          color="text-indigo-600"
        />
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid gap-4 md:grid-cols-3">
        <Stat label="Easy Verified ✓" value={solvedTotals.e} color="text-emerald-600" />
        <Stat label="Medium Verified ✓" value={solvedTotals.m} color="text-amber-600" />
        <Stat label="Hard Verified ✓" value={solvedTotals.h} color="text-rose-600" />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionLabel icon={TrendingUp}>Last 30 Days Activity</SectionLabel>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={last30}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.96)",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    color: "#0f172a",
                    fontWeight: 600,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Solved"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  dot={{ fill: "#8b5cf6", r: 4 }}
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
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(255, 255, 255, 0.96)",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    color: "#0f172a",
                    fontWeight: 600,
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
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Every cell represents active practice sessions & verified solves.
          </p>
          <ConsistencyHeatmap days={heatmapDays} loading={loading} />
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
    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 font-semibold">
      <Icon className="h-3.5 w-3.5 text-purple-600" />
      <span>{children}</span>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-sm transition-all ${className}`}>{children}</div>;
}

function Stat({ label, value, accent, color }: { label: string; value: React.ReactNode; accent?: boolean; color?: string }) {
  return (
    <div className={`bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs transition-all ${accent ? "border-purple-200 bg-purple-50/40" : ""}`}>
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{label}</div>
      <div className={`font-display text-2xl font-bold mt-1 ${color ?? (accent ? "text-purple-700" : "text-slate-900")}`}>
        {value}
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label, accent }: { icon: React.ElementType; label: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1.5 border shadow-xs ${
        accent
          ? "text-purple-700 border-purple-200 bg-purple-50"
          : "text-slate-700 border-slate-200 bg-white"
      }`}
    >
      <Icon className="h-3.5 w-3.5 text-purple-600" />
      {label}
    </div>
  );
}
