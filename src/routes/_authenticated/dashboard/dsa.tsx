import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Plus,
  ArrowLeft,
  Flame,
  Zap,
  Target,
  TrendingUp,
  Award,
  Calendar,
  BookOpen,
  Briefcase,
  Lightbulb,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { XP } from "@/lib/syncrole";
import { toast } from "sonner";
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
  const [xpData, setXpData] = useState({ total_xp: 0, level: 1, level_name: "Career Explorer" });
  const [streakData, setStreakData] = useState({ current_streak: 0, longest_streak: 0 });
  const [easy, setEasy] = useState(0);
  const [medium, setMedium] = useState(0);
  const [hard, setHard] = useState(0);
  const [platform, setPlatform] = useState("leetcode");
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return setLogs([]);
    const uid = u.user.id;
    const [logsRes, xpRes, streakRes] = await Promise.all([
      supabase
        .from("dsa_progress")
        .select("*")
        .eq("user_id", uid)
        .order("log_date", { ascending: false })
        .limit(60),
      supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
      supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle(),
    ]);
    setLogs(logsRes.data ?? []);
    if (xpRes.data) setXpData(xpRes.data);
    if (streakRes.data) setStreakData(streakRes.data);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  const totals = logs.reduce((a, l) => ({ e: a.e + l.easy, m: a.m + l.medium, h: a.h + l.hard }), {
    e: 0,
    m: 0,
    h: 0,
  });
  const total = totals.e + totals.m + totals.h;

  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const day = logs
      .filter((l) => l.log_date === key)
      .reduce((a, l) => a + l.easy + l.medium + l.hard, 0);
    return { day: d.toLocaleDateString(undefined, { weekday: "short" }), count: day };
  });

  const last30 = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key = d.toISOString().slice(0, 10);
    const day = logs
      .filter((l) => l.log_date === key)
      .reduce((a, l) => a + l.easy + l.medium + l.hard, 0);
    return { day: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), count: day };
  });

  const difficultyData = [
    { name: "Easy", value: totals.e },
    { name: "Medium", value: totals.m },
    { name: "Hard", value: totals.h },
  ];

  async function add() {
    const e = Number(easy) || 0;
    const m = Number(medium) || 0;
    const h = Number(hard) || 0;
    if (e + m + h <= 0) return toast.error("Add at least one problem");
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const today = new Date().toISOString().slice(0, 10);
    const { error } = await supabase
      .from("dsa_progress")
      .insert({ user_id: u.user.id, easy: e, medium: m, hard: h, platform, log_date: today });
    if (error) return toast.error(error.message);
    const xp = (e + m + h) * XP.DSA_PROBLEM;
    await supabase.rpc("award_xp", {
      _user: u.user.id,
      _type: "dsa_logged",
      _xp: xp,
      _meta: { easy, medium, hard },
    });
    // achievements
    const newTotal = total + easy + medium + hard;
    for (const [code, n] of [
      ["dsa_10", 10],
      ["dsa_50", 50],
      ["dsa_100", 100],
    ] as const) {
      if (newTotal >= n)
        await supabase
          .from("achievements")
          .insert({ user_id: u.user.id, code })
          .then(() => {});
    }
    await supabase.rpc("recompute_placement", { _user: u.user.id });
    await supabase
      .from("notifications")
      .insert({
        user_id: u.user.id,
        title: "DSA logged 🧠",
        body: `+${xp} XP for ${easy + medium + hard} problems`,
        type: "dsa",
      });
    toast.success(`+${xp} XP`);
    setEasy(0);
    setMedium(0);
    setHard(0);
    load();
  }

  // heatmap last 90 days
  const heat = Array.from({ length: 90 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (89 - i));
    const key = d.toISOString().slice(0, 10);
    const n = logs
      .filter((l) => l.log_date === key)
      .reduce((a, l) => a + l.easy + l.medium + l.hard, 0);
    return { key, n };
  });

  const canLog = (Number(easy) || 0) + (Number(medium) || 0) + (Number(hard) || 0) > 0;

  if (loading) {
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
        <Stat label="Total Solved" value={total} accent />
        <Stat label="Easy ✓" value={totals.e} color="text-green-400" />
        <Stat label="Medium ✓" value={totals.m} color="text-yellow-400" />
        <Stat label="Hard ✓" value={totals.h} color="text-red-400" />
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
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
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
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      {/* Consistency & Log Problems */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <SectionLabel icon={Calendar}>Consistency · Last 90 Days</SectionLabel>
          <div className="mt-4">
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
                    title={`${c.key}: ${c.n}`}
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
          <SectionLabel icon={Code2}>Log Problems</SectionLabel>
          <div className="mt-4 space-y-3">
            <Counter label="Easy" value={easy} set={setEasy} color="oklch(0.88 0.18 145)" />
            <Counter label="Medium" value={medium} set={setMedium} color="oklch(0.85 0.18 70)" />
            <Counter label="Hard" value={hard} set={setHard} color="oklch(0.72 0.22 330)" />
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Platform
              </span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="mt-1 w-full glass rounded-xl px-3 py-2 text-sm"
              >
                <option value="leetcode">LeetCode</option>
                <option value="gfg">GeeksforGeeks</option>
                <option value="codeforces">Codeforces</option>
                <option value="manual">Other</option>
              </select>
            </label>
            <button
              onClick={add}
              disabled={!canLog}
              className={`relative w-full rounded-full py-3 text-sm font-semibold text-primary-foreground overflow-hidden ${!canLog ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="absolute inset-0 bg-aurora" />
              <span className="relative inline-flex items-center justify-center gap-1">
                <Plus className="h-4 w-4" /> Log session
              </span>
            </button>
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

function Counter({ label, value, set, color }: any) {
  return (
    <div className="flex items-center justify-between glass rounded-xl px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ background: color }} />
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => set(Math.max(0, value - 1))}
          className="h-7 w-7 rounded-full glass hover:bg-white/15"
        >
          −
        </button>
        <motion.div
          key={value}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-8 text-center font-mono"
        >
          {value}
        </motion.div>
        <button
          onClick={() => set(value + 1)}
          className="h-7 w-7 rounded-full glass hover:bg-white/15"
        >
          +
        </button>
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
