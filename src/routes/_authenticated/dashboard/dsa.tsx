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
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DSAService } from "@/lib/services/dsa.service";
import { Clock, Bookmark, ArrowRight, RotateCcw } from "lucide-react";
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

function DSAPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [practiceLogs, setPracticeLogs] = useState<any[]>([]);
  const [solvedProblems, setSolvedProblems] = useState<any[]>([]);
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, level_name: "Career Explorer" });
  const [streakData, setStreakData] = useState({ current_streak: 0, longest_streak: 0 });
  const [loading, setLoading] = useState(true);
  
  // New features state
  const [revisionQueue, setRevisionQueue] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return setLogs([]);
    const uid = u.user.id;
    const [logsRes, practiceRes, xpRes, streakRes, progRes, solvedRes] = await Promise.all([
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
        id, problem_id, status, is_bookmarked, needs_revision, last_solved_at, solved,
        dsa_problems ( id, title, difficulty, leetcode_url, topic_id )
      `).eq("user_id", uid),
      DSAService.getSolvedAnalytics(uid)
    ]);
    
    setLogs(logsRes.data ?? []);
    setPracticeLogs(practiceRes.data ?? []);
    setSolvedProblems(solvedRes ?? []);

    if (xpRes.data) setXpData(xpRes.data);
    if (streakRes.data) setStreakData(streakRes.data);
    
    // Process Revision Queue
    if (progRes.data) {
      const needsRev = progRes.data.filter((p: any) => p.needs_revision || p.is_bookmarked);
      setRevisionQueue(needsRev.slice(0, 5));
    }

    // Process Recommendations (fetch 3 random unseen or weak topic problems)
    const { data: recData } = await supabase.from("dsa_problems").select("id, title, difficulty, leetcode_url").limit(3);
    if (recData) setRecommendations(recData);

    setLoading(false);
  }
  
  useEffect(() => {
    load();
  }, []);

  // Analytics Source of Truth: Actual Solved Problems
  const solvedTotals = solvedProblems.reduce((a, p) => {
    const diff = p.dsa_problems?.difficulty?.toLowerCase();
    if (diff === 'easy') a.e++;
    else if (diff === 'medium') a.m++;
    else if (diff === 'hard') a.h++;
    return a;
  }, { e: 0, m: 0, h: 0 });

  const totalSolved = solvedTotals.e + solvedTotals.m + solvedTotals.h;

  const last30 = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key = d.toISOString().slice(0, 10);
    const day = solvedProblems.filter((p) => {
      const dateStr = p.last_solved_at || p.updated_at;
      return dateStr && dateStr.slice(0, 10) === key;
    }).length;
    return { day: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), count: day };
  });

  const difficultyData = [
    { name: "Easy", value: solvedTotals.e },
    { name: "Medium", value: solvedTotals.m },
    { name: "Hard", value: solvedTotals.h },
  ];

  // Consistency heatmap uses both legacy logs and new practice logs
  const heat = Array.from({ length: 90 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    const key = d.toISOString().slice(0, 10);
    
    let intensityScore = 0;
    
    // Legacy dsa_progress
    const legacyDay = logs.filter((l) => l.log_date === key);
    legacyDay.forEach(l => {
      intensityScore += (l.easy + l.medium + l.hard);
    });

    // New activity_logs practice sessions
    const practiceDay = practiceLogs.filter(p => p.created_at.slice(0, 10) === key);
    practiceDay.forEach(p => {
      intensityScore += 1; // 1 session = 1 intensity point
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
            Track progress, master topics, prepare for interviews.
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

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Total Solved" value={totalSolved} accent />
        <Stat label="Easy ✓" value={solvedTotals.e} color="text-green-400" />
        <Stat label="Medium ✓" value={solvedTotals.m} color="text-yellow-400" />
        <Stat label="Hard ✓" value={solvedTotals.h} color="text-red-400" />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionLabel icon={TrendingUp}>Last 30 Days</SectionLabel>
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
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell fill="oklch(0.88 0.18 145)" />
                  <Cell fill="oklch(0.85 0.18 70)" />
                  <Cell fill="oklch(0.72 0.22 330)" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Consistency & Practice Sessions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex flex-col">
          <SectionLabel icon={Calendar}>Consistency · Last 90 Days</SectionLabel>
          <div className="mt-4 flex-1">
            <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] sm:grid-cols-[repeat(45,minmax(0,1fr))] md:grid-cols-[repeat(90,minmax(0,1fr))] gap-1">
              {heat.map((c) => {
                const intensity = c.n === 0 ? 0 : Math.min(4, Math.ceil(c.n / 2));
                const bg = [
                  "oklch(1 0 0 / 0.05)",
                  "oklch(0.72 0.22 295 / 0.25)",
                  "oklch(0.72 0.22 295 / 0.5)",
                  "oklch(0.72 0.22 295 / 0.75)",
                  "oklch(0.72 0.22 295)",
                ][intensity];
                return (
                  <div
                    key={c.key}
                    title={`${c.key}: ${c.n} activities`}
                    className="aspect-square rounded-sm"
                    style={{ background: bg }}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm" style={{ background: "oklch(1 0 0 / 0.05)" }} />{" "}
                No activity
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-aurora/20" /> Low
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-aurora/50" /> Medium
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ background: "oklch(0.72 0.22 295)" }}
                />{" "}
                High
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <TodayPracticePanel />
        </Card>
      </div>
      
      {/* Smart Revision & Recommendations */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionLabel icon={RotateCcw}>Revision Queue</SectionLabel>
            <Link to="/dsa-problems" className="text-xs text-aurora hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {revisionQueue.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6 bg-white/5 rounded-xl border border-white/5">
                No problems in your revision queue.
              </div>
            ) : (
              revisionQueue.map((item: any) => (
                <div key={item.id} className="glass rounded-xl p-3 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-aurora/10 text-aurora rounded-lg"><Bookmark className="w-4 h-4" /></div>
                    <div>
                      <div className="text-sm font-medium">{item.dsa_problems?.title || 'Unknown Problem'}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.dsa_problems?.difficulty}</div>
                    </div>
                  </div>
                  {item.dsa_problems?.leetcode_url && (
                    <a href={item.dsa_problems.leetcode_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-aurora transition-colors p-2">
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionLabel icon={Lightbulb}>AI Recommendations</SectionLabel>
            <Link to="/dsa-problems" className="text-xs text-aurora hover:underline">Explore</Link>
          </div>
          <div className="space-y-3">
            {recommendations.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-6 bg-white/5 rounded-xl border border-white/5">
                Keep practicing to get recommendations.
              </div>
            ) : (
              recommendations.map((item: any) => (
                <div key={item.id} className="glass rounded-xl p-3 flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 text-primary/80 rounded-lg"><Target className="w-4 h-4" /></div>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.difficulty}</div>
                    </div>
                  </div>
                  {item.leetcode_url && (
                    <a href={item.leetcode_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-aurora transition-colors p-2">
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

    </main>
  );
}

function Stat({ label, value, accent, color }: any) {
  return (
    <div className="glass-strong rounded-2xl p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div
        className={`mt-2 font-display text-3xl font-bold ${accent ? "text-aurora" : color || ""}`}
      >
        {value}
      </div>
    </div>
  );
}

function Card({ children, className = "" }: any) {
  return <div className={`relative glass-strong rounded-3xl p-5 ${className}`}>{children}</div>;
}

function SectionLabel({ icon: Icon, children }: any) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
      <Icon className="h-3 w-3 text-accent" />
      <span className="uppercase tracking-widest">{children}</span>
    </div>
  );
}

function Pill({ icon: Icon, label, accent }: any) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${accent ? "bg-aurora text-primary-foreground" : "glass"}`}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </div>
  );
}

