import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Flame,
  Trophy,
  Target,
  Github,
  FileText,
  Brain,
  Zap,
  ArrowRight,
  Code2,
  Loader2,
  Check,
  Award,
  MapPin,
  Rocket,
  Star,
  Activity,
  MessageSquare,
  Cpu,
  ChevronRight,
  Calendar,
  Clock,
  Upload,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  levelProgress,
  profileCompletionPct,
  ACHIEVEMENT_CATALOG,
  MISSION_TEMPLATES,
  XP,
} from "@/lib/syncrole";
import { toast } from "sonner";
import { extractTextFromPDF } from "@/lib/pdf";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — SyncRole" }] }),
});

type Profile = any;
type Score = any;

function Dashboard() {
  const nav = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [xp, setXp] = useState({ total_xp: 0, level: 1, level_name: "Career Explorer" });
  const [streak, setStreak] = useState({ current_streak: 0, longest_streak: 0 });
  const [scores, setScores] = useState<Score[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [achs, setAchs] = useState<string[]>([]);
  const [gh, setGh] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [interviewSessions, setInterviewSessions] = useState<any[]>([]);
  const [recentConversations, setRecentConversations] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  async function loadAll() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const uid = u.user.id;
    const [pRes, xRes, sRes, scRes, mRes, aRes, ghRes, rRes, ivRes, cvRes, oldRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
      supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
      supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle(),
      supabase
        .from("placement_scores")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(30),
      supabase
        .from("daily_missions")
        .select("*")
        .eq("user_id", uid)
        .eq("mission_date", new Date().toISOString().slice(0, 10))
        .order("created_at"),
      supabase.from("achievements").select("code").eq("user_id", uid),
      supabase.from("github_analysis").select("*").eq("user_id", uid).maybeSingle(),
      supabase
        .from("resume_versions")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      // NEW: interview sessions
      supabase
        .from("interview_sessions")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(5),
      // NEW: recent AI conversations for activity feed
      supabase
        .from("ai_conversations")
        .select("id, mode, title, updated_at")
        .eq("user_id", uid)
        .order("updated_at", { ascending: false })
        .limit(5),
      // Fallback check for old resume_analysis table
      supabase
        .from("resume_analysis")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);
    if (pRes.data && !pRes.data.onboarding_completed) {
      nav({ to: "/onboarding" });
      return;
    }
    setProfile(pRes.data);
    if (xRes.data) setXp(xRes.data as any);
    if (sRes.data) setStreak(sRes.data as any);
    setScores(scRes.data ?? []);
    setAchs((aRes.data ?? []).map((a: any) => a.code));
    setGh(ghRes.data);
    setResume(rRes.data || oldRes.data);
    setInterviewSessions(ivRes?.data ?? []);
    setRecentConversations(cvRes?.data ?? []);

    // Ensure today's missions exist
    let todaysMissions = mRes.data ?? [];
    if (todaysMissions.length === 0) {
      const today = new Date().toISOString().slice(0, 10);
      const picks = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5).slice(0, 3);
      const inserts = picks.map((m) => ({ user_id: uid, mission_date: today, ...m }));
      const { data } = await supabase.from("daily_missions").insert(inserts).select();
      todaysMissions = data ?? [];
    }
    setMissions(todaysMissions);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    const ch = supabase
      .channel("dashboard-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "placement_scores" },
        loadAll,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "achievements" },
        loadAll,
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "xp_levels" },
        loadAll,
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const latest = scores[0] ?? {
    total_score: 0,
    resume_score: 0,
    github_score: 0,
    projects_score: 0,
    dsa_score: 0,
    communication_score: 60,
    skill_score: 0,
  };
  const prev = scores[1];
  const delta = prev ? latest.total_score - prev.total_score : 0;
  const lp = levelProgress(xp.total_xp);
  const completion = useMemo(() => (profile ? profileCompletionPct(profile) : 0), [profile]);
  const chartData = [...scores]
    .reverse()
    .map((s, i) => ({ x: i, y: s.total_score }));

  async function completeMission(m: any) {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    await supabase
      .from("daily_missions")
      .update({ completed: true, completed_at: new Date().toISOString(), progress: m.target })
      .eq("id", m.id);
    await supabase.rpc("award_xp", {
      _user: u.user.id,
      _type: "mission_complete",
      _xp: m.xp_reward,
      _meta: { code: m.code },
    });
    await supabase
      .from("notifications")
      .insert({
        user_id: u.user.id,
        title: "Mission complete 🎯",
        body: `+${m.xp_reward} XP — ${m.title}`,
        type: "mission",
      });
    toast.success(`+${m.xp_reward} XP`);
    loadAll();
  }

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    toast.loading("Uploading resume...", { id: "upload" });
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not logged in");

      const ext = file.name.split('.').pop();
      const path = `${u.user.id}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("resumes").upload(path, file);
      if (uploadErr) throw uploadErr;

      const resumeText = await extractTextFromPDF(file);

      const { data: classData, error: classErr } = await supabase.functions.invoke("resume-intelligence", {
        body: { action: "classify", resumeText }
      });
      if (classErr) throw classErr;
      const document_type = classData.document_type || "Unknown";

      const { data: existingVersions } = await supabase.from("resume_versions").select("version_number").eq("user_id", u.user.id).order("version_number", { ascending: false }).limit(1);
      const version_number = existingVersions && existingVersions.length > 0 ? (existingVersions[0].version_number || 0) + 1 : 1;

      let insertData: any = {
        user_id: u.user.id,
        file_path: path,
        file_name: file.name,
        extracted_text: resumeText,
        document_type,
        version_number,
      };

      if (document_type === "Resume") {
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "ats_scan", resumeText }
        });
        if (aiErr) throw aiErr;
        insertData = {
          ...insertData,
          ats_score: aiRes.ats_score,
          keyword_match: aiRes.keyword_match,
          formatting_score: aiRes.formatting_score,
          project_score: aiRes.project_score,
          total_score: aiRes.total_score,
          suggestions: aiRes.suggestions,
          missing_skills: aiRes.missing_skills,
        };
      } else {
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "analyze_document", resumeText }
        });
        if (aiErr) throw aiErr;
        insertData = {
          ...insertData,
          analysis_results: aiRes,
          ats_score: 0,
          keyword_match: 0,
          formatting_score: 0,
          project_score: 0,
          total_score: 0,
        };
      }

      await supabase.from("resume_versions").insert(insertData);
      toast.success("Resume uploaded successfully", { id: "upload" });
      loadAll();
    } catch (e: any) {
      toast.error(e.message, { id: "upload" });
    } finally {
      setUploading(false);
    }
  };

  async function analyzeGitHub() {
    const username = profile?.github_username;
    if (!username) return toast.error("Add your GitHub username in profile first");
    toast.loading("Analyzing GitHub…", { id: "gh" });
    try {
      const [userRes, repoRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then(
          (r) => r.json(),
        ),
      ]);
      if (userRes.message === "Not Found") throw new Error("GitHub user not found");
      const repos = Array.isArray(repoRes) ? repoRes : [];
      const stars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
      const langs: Record<string, number> = {};
      repos.forEach((r) => {
        if (r.language) langs[r.language] = (langs[r.language] ?? 0) + 1;
      });
      const score = Math.min(100, repos.length * 4 + stars * 2 + (userRes.followers ?? 0));
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      await supabase
        .from("github_analysis")
        .upsert({
          user_id: u.user.id,
          username,
          repo_count: repos.length,
          star_count: stars,
          follower_count: userRes.followers ?? 0,
          languages: langs,
          score,
          strengths: Object.keys(langs).slice(0, 3),
          weaknesses: stars < 5 ? ["Low star count — add documentation"] : [],
          recommendations: [
            "Pin top 6 projects",
            "Add READMEs with screenshots",
            "Push consistently",
          ],
          analyzed_at: new Date().toISOString(),
        });
      await supabase
        .from("achievements")
        .insert({ user_id: u.user.id, code: "github_connected" })
        .then(() => {});
      await supabase.rpc("award_xp", {
        _user: u.user.id,
        _type: "github_connected",
        _xp: XP.GITHUB_CONNECT,
        _meta: {},
      });
      await supabase.rpc("recompute_placement", { _user: u.user.id });
      toast.success("GitHub analyzed", { id: "gh" });
      loadAll();
    } catch (e: any) {
      toast.error(e.message, { id: "gh" });
    }
  }

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-aurora" />
      </div>
    );
  }

  return (
    <>
      <main className="relative mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6">
        {/* greeting */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Welcome back
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">
              Hey {profile?.full_name?.split(" ")[0] ?? "there"} <span className="text-aurora">👋</span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill icon={Flame} label={`${streak.current_streak}-day streak`} accent />
            <Pill icon={Trophy} label={`${xp.level_name} · Lv ${xp.level}`} />
            <Pill icon={Zap} label={`${xp.total_xp} XP`} />
          </div>
        </div>

        {/* ── Career Journey Roadmap ── */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionLabel icon={Rocket}>Career Journey</SectionLabel>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
              AI-mapped trajectory
            </span>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/8" />
            <motion.div
              className="absolute top-5 left-5 h-0.5"
              style={{ background: "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(latest.total_score, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
            <div className="relative grid grid-cols-4 gap-2">
              {[
                {
                  label: "Current",
                  sub: profile?.college?.split(" ")[0] ?? "Student",
                  icon: MapPin,
                  color: "oklch(0.75 0.2 200)",
                  active: true,
                },
                {
                  label: "Next Milestone",
                  sub: latest.total_score < 50 ? "70+ Readiness" : "Interview Ready",
                  icon: Activity,
                  color: "oklch(0.88 0.18 60)",
                  active: latest.total_score >= 30,
                },
                {
                  label: "Target Role",
                  sub: profile?.career_goal?.split(" ").slice(0, 3).join(" ") ?? "SDE-1",
                  icon: Cpu,
                  color: "oklch(0.72 0.22 295)",
                  active: latest.total_score >= 60,
                },
                {
                  label: "Dream Company",
                  sub: "Offer Received",
                  icon: Star,
                  color: "oklch(0.88 0.20 60)",
                  active: latest.total_score >= 80,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <div
                    className={`relative h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all ${
                      step.active ? "ring-2 ring-offset-2 ring-offset-transparent" : "opacity-35"
                    }`}
                    style={{
                      background: step.active
                        ? `radial-gradient(circle, ${step.color} 40%, transparent 100%)`
                        : "oklch(1 0 0 / 5%)",
                      border: `1px solid ${step.color}`,
                    }}
                  >
                    <step.icon className="h-4 w-4 text-white" />
                    {step.active && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ background: step.color }}
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/80">{step.label}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">{step.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── Recent Activity + Future Prediction ── */}
        <div className="grid gap-4 md:grid-cols-2">

          {/* Recent Activity */}
          <Card>
            <SectionLabel icon={Activity}>Recent Activity</SectionLabel>
            <div className="mt-4 space-y-2">
              {[
                /* Build activity items from real data */
                ...achs.slice(-3).map((code, i) => ({
                  icon: Award,
                  color: "text-yellow-400",
                  label: `Achievement unlocked: ${code.replace(/_/g, " ")}`,
                  time: "Recent",
                })),
                ...recentConversations.slice(0, 2).map((c: any) => ({
                  icon: MessageSquare,
                  color: "text-cyan-400",
                  label: `SyncPilot • ${c.title || "Conversation"}`,
                  time: new Date(c.updated_at).toLocaleDateString(),
                })),
                ...interviewSessions.slice(0, 2).map((s: any) => ({
                  icon: Brain,
                  color: "text-violet-400",
                  label: `Interview • ${s.company || "Practice"} — Score ${s.score}`,
                  time: new Date(s.created_at).toLocaleDateString(),
                })),
                ...(scores.length > 0 ? [{
                  icon: TrendingUp,
                  color: "text-emerald-400",
                  label: `Placement score updated → ${latest.total_score}/100`,
                  time: new Date(scores[0]?.created_at).toLocaleDateString(),
                }] : []),
              ].slice(0, 5).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-3 glass rounded-xl px-3 py-2.5"
                >
                  <item.icon className={`h-4 w-4 flex-shrink-0 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white/80 truncate">{item.label}</div>
                    <div className="text-[10px] text-muted-foreground">{item.time}</div>
                  </div>
                </motion.div>
              ))}
              {achs.length === 0 && recentConversations.length === 0 && interviewSessions.length === 0 && (
                <div className="text-xs text-muted-foreground text-center py-4">
                  Complete missions to build your activity feed
                </div>
              )}
            </div>
          </Card>

          {/* Future Prediction */}
          <Card>
            <div className="flex items-center justify-between">
              <SectionLabel icon={Sparkles}>Future Prediction</SectionLabel>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                AI Model
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {[
                {
                  label: "Placement Probability",
                  value: Math.min(100, Math.round(latest.total_score * 1.1)),
                  suffix: "%",
                  color: "oklch(0.75 0.2 200)",
                  sub: latest.total_score >= 70 ? "High confidence" : "Improving",
                },
                {
                  label: "Expected CTC Range",
                  value: latest.total_score >= 70 ? "₹12-18 LPA" : latest.total_score >= 45 ? "₹6-10 LPA" : "₹4-7 LPA",
                  isText: true,
                  color: "oklch(0.88 0.18 145)",
                  sub: "Based on market data",
                },
                {
                  label: "Offer Timeline",
                  value: latest.total_score >= 75 ? "1-2 months" : latest.total_score >= 50 ? "3-5 months" : "6+ months",
                  isText: true,
                  color: "oklch(0.88 0.18 60)",
                  sub: "If current pace maintained",
                },
              ].map((pred, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * i }}
                  className="glass rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs text-white/60">{pred.label}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{pred.sub}</div>
                  </div>
                  <div className="text-base font-bold font-mono" style={{ color: pred.color }}>
                    {pred.isText ? pred.value : `${pred.value}${pred.suffix}`}
                  </div>
                </motion.div>
              ))}
              <div className="text-[10px] text-muted-foreground text-center pt-1">
                Ask SyncPilot "What if I solve 100 more DSA problems?" for simulation
              </div>
            </div>
          </Card>
        </div>

        {/* KPI grid */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* placement score */}
          <Card className="lg:col-span-2 row-span-2">
            <div className="flex items-start justify-between">
              <SectionLabel icon={Target}>Placement Readiness</SectionLabel>
              {delta !== 0 && (
                <span
                  className={`text-xs inline-flex items-center gap-1 ${
                    delta > 0 ? "text-[oklch(0.88_0.18_145)]" : "text-destructive"
                  }`}
                >

                  <TrendingUp className="h-3 w-3" /> {delta > 0 ? "+" : ""}
                  {delta} pts
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-6">
              <ScoreRing value={latest.total_score} />
              <div className="flex-1 space-y-2">
                {[
                  { l: "Resume", v: latest.resume_score, i: FileText },
                  { l: "GitHub", v: latest.github_score, i: Github },
                  { l: "DSA", v: latest.dsa_score, i: Brain },
                  { l: "Skills", v: latest.skill_score, i: Sparkles },
                ].map((b) => (
                  <div key={b.l} className="flex items-center gap-3">
                    <b.i className="h-3.5 w-3.5 text-muted-foreground" />
                    <div className="text-xs w-20 text-muted-foreground">{b.l}</div>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-aurora" style={{ width: `${b.v}%` }} />
                    </div>
                    <div className="text-xs font-mono w-8 text-right">{b.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 h-32">
              {chartData.length > 1 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <defs>
                      <linearGradient id="sg" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="oklch(0.75 0.20 200)" />
                        <stop offset="100%" stopColor="oklch(0.72 0.22 295)" />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="x" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(0,0,0,0.8)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12,
                      }}
                    />
                    <Line type="monotone" dataKey="y" stroke="url(#sg)" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full grid place-items-center text-xs text-muted-foreground">
                  More activity = better trend graph
                </div>
              )}
            </div>
          </Card>

          {/* level / xp */}
          <Card>
            <SectionLabel icon={Zap}>Level Progress</SectionLabel>
            <div className="mt-4">
              <div className="font-display text-2xl font-bold">{lp.cur.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Level {lp.cur.lvl}
                {lp.next && ` — ${lp.toNext} XP to ${lp.next.name}`}
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-aurora" initial={{ width: 0 }} animate={{ width: `${lp.pct}%` }} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{xp.total_xp} XP</div>
            </div>
          </Card>

          {/* profile completion */}
          <Card>
            <SectionLabel icon={Check}>Profile</SectionLabel>
            <div className="mt-4 flex items-center gap-4">
              <RingMini value={completion} />
              <div>
                <div className="font-display text-2xl font-bold">{completion}%</div>
                <div className="text-xs text-muted-foreground">complete</div>
              </div>
            </div>
            {completion < 100 && (
              <Link to="/onboarding" className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline">
                Complete now <ArrowRight className="h-3 w-3" />
              </Link>
            )}
          </Card>

          {/* streak */}
          <Card>
            <SectionLabel icon={Flame}>Current Streak</SectionLabel>
            <div className="mt-4 flex items-baseline gap-2">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="font-display text-5xl font-bold text-aurora"
              >
                {streak.current_streak}
              </motion.div>
              <div className="text-sm text-muted-foreground">days</div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">Longest: {streak.longest_streak} days</div>
          </Card>

          {/* missions */}
          <Card className="md:col-span-2">
            <div className="flex items-center justify-between">
              <SectionLabel icon={Target}>Today's Missions</SectionLabel>
              <span className="text-xs text-muted-foreground">
                {missions.filter((m) => m.completed).length}/{missions.length}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {missions.map((m) => (
                <div
                  key={m.id}
                  className={`glass rounded-xl p-3 flex items-center gap-3 ${m.completed ? "opacity-60" : ""}`}
                >
                  <button
                    onClick={() => !m.completed && completeMission(m)}
                    className={`h-7 w-7 rounded-full grid place-items-center transition ${m.completed ? "bg-aurora" : "glass hover:bg-white/15"}`}
                  >
                    {m.completed && <Check className="h-4 w-4" />}
                  </button>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${m.completed ? "line-through" : ""}`}>{m.title}</div>
                    <div className="text-xs text-muted-foreground">{m.description}</div>
                  </div>
                  <div className="text-xs font-mono text-accent">+{m.xp_reward} XP</div>
                </div>
              ))}
              {missions.length === 0 && <div className="text-xs text-muted-foreground">Refresh tomorrow for new missions 🌅</div>}
            </div>
          </Card>

          {/* DSA quick */}
          <Card>
            <SectionLabel icon={Code2}>DSA</SectionLabel>
            <div className="mt-4">
              <div className="font-display text-3xl font-bold">{latest.dsa_score}</div>
              <div className="text-xs text-muted-foreground">DSA score</div>
              <Link to="/dashboard/dsa" className="mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline">
                Open tracker <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </Card>
        </div>

        {/* analyzers */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <SectionLabel icon={Github}>GitHub Analysis</SectionLabel>
            {gh ? (
              <div className="mt-4">
                <div className="flex items-baseline gap-3">
                  <div className="font-display text-3xl font-bold text-aurora">{gh.score}</div>
                  <div className="text-xs text-muted-foreground">@{gh.username}</div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  <Stat label="Repos" value={gh.repo_count} />
                  <Stat label="Stars" value={gh.star_count} />
                  <Stat label="Followers" value={gh.follower_count} />
                </div>
                <div className="mt-3 text-xs text-muted-foreground">Top: {Object.keys(gh.languages || {}).slice(0, 3).join(" · ") || "—"}</div>
                <button onClick={analyzeGitHub} className="mt-3 text-xs text-accent hover:underline">
                  Re-analyze
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Connect GitHub to analyze your projects, languages, and activity.</p>
                <button onClick={analyzeGitHub} className="mt-3 glass rounded-full px-4 py-2 text-sm hover:bg-white/10">
                  Analyze now
                </button>
              </div>
            )}
          </Card>

          <Card className="flex flex-col">
            <SectionLabel icon={FileText}>Resume Intelligence</SectionLabel>
            {resume ? (
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-3">
                    <div className="font-display text-3xl font-bold text-aurora">{resume.total_score}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Overall Score</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <Stat label="ATS Score" value={resume.ats_score} />
                    <Stat label="Keywords" value={resume.keyword_match} />
                  </div>
                  <div className="mt-4 text-[10px] text-muted-foreground flex justify-between items-center">
                    <span>Last analyzed: {new Date(resume.created_at).toLocaleDateString()}</span>
                    <span className="bg-white/5 px-2 py-0.5 rounded-full border border-white/10">Latest Version</span>
                  </div>
                </div>
                <Link to="/resume-intelligence" className="mt-5 relative w-full block text-center rounded-xl py-2.5 text-sm font-semibold overflow-hidden group">
                  <span className="absolute inset-0 bg-aurora/10 group-hover:bg-aurora/20 transition-colors" />
                  <span className="absolute inset-0 border border-aurora/30 rounded-xl" />
                  <span className="relative flex items-center justify-center gap-2 text-aurora">
                    Open Resume Intelligence <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex-1 flex flex-col justify-between">
                <p className="text-sm text-muted-foreground">Upload your resume to unlock AI-powered Resume Intelligence and real ATS scoring.</p>
                <label className="mt-5 w-full block text-center glass rounded-xl py-2.5 text-sm hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group">
                  <span className="absolute inset-0 bg-aurora/10 group-hover:bg-aurora/20 transition-colors" />
                  <span className="relative flex items-center justify-center gap-2 text-aurora font-semibold">
                    <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Resume"}
                  </span>
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
              </div>
            )}
          </Card>
        </div>

        {/* achievements */}
        <Card>
          <div className="flex items-center justify-between">
            <SectionLabel icon={Award}>Achievements</SectionLabel>
            <span className="text-xs text-muted-foreground">
              {achs.length}/{Object.keys(ACHIEVEMENT_CATALOG).length} unlocked
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Object.entries(ACHIEVEMENT_CATALOG).map(([code, a]) => {
              const unlocked = achs.includes(code);
              return (
                <div key={code} className={`glass rounded-2xl p-3 text-center ${unlocked ? "" : "opacity-30 grayscale"}`}>
                  <div className="text-3xl">{a.emoji}</div>
                  <div className="mt-2 text-xs font-medium truncate">{a.name}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </>
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
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${accent ? "bg-aurora text-primary-foreground" : "glass"}`}>
      <Icon className="h-3.5 w-3.5" /> {label}
    </div>
  );
}
function Stat({ label, value }: any) {
  return (
    <div className="glass rounded-xl py-2">
      <div className="font-display text-lg font-bold">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase">{label}</div>
    </div>
  );
}
function ScoreRing({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="-rotate-90 h-full w-full">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.75 0.20 200)" />
            <stop offset="100%" stopColor="oklch(0.72 0.22 330)" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="9" fill="none" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          stroke="url(#rg)"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="font-display text-3xl font-bold text-aurora">{value}</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">/100</div>
        </div>
      </div>
    </div>
  );
}
function RingMini({ value }: { value: number }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 60 60" className="h-16 w-16 -rotate-90">
      <circle cx="30" cy="30" r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth="5" fill="none" />
      <circle
        cx="30"
        cy="30"
        r={r}
        stroke="url(#rg)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (c * value) / 100}
      />
    </svg>
  );
}

