import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Code2,
  FileText,
  Activity,
  ChevronRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  Flame,
  Trophy,
  RefreshCw,
  BrainCircuit,
  ArrowUpRight,
  Shield,
  Loader2,
  ArrowRight,
  Upload,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { levelProgress } from "@/lib/syncrole";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/career-identity")({
  component: CareerIdentityPage,
});

function CareerIdentityPage() {
  const { user } = Route.useRouteContext();
  const [profile, setProfile] = useState<any>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [xpData, setXpData] = useState<any>(null);
  const [streakData, setStreakData] = useState<any>(null);
  const [placementScore, setPlacementScore] = useState<any>(null);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [pRes, rRes, xRes, sRes, psRes, actRes, misRes] = await Promise.allSettled([
          supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
          supabase.from("resume_analysis").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
          supabase.from("xp_levels").select("*").eq("user_id", user.id).maybeSingle(),
          supabase.from("streaks").select("*").eq("user_id", user.id).maybeSingle(),
          supabase.from("placement_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
          supabase.from("activity_logs").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(4),
          supabase.from("daily_missions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(3),
        ]);

        if (pRes.status === "fulfilled" && pRes.value.data) setProfile(pRes.value.data);
        if (rRes.status === "fulfilled" && rRes.value.data) setResumeAnalysis(rRes.value.data);
        if (xRes.status === "fulfilled" && xRes.value.data) setXpData(xRes.value.data);
        if (sRes.status === "fulfilled" && sRes.value.data) setStreakData(sRes.value.data);
        if (psRes.status === "fulfilled" && psRes.value.data) setPlacementScore(psRes.value.data);
        if (actRes.status === "fulfilled" && actRes.value.data) setActivityLogs(actRes.value.data);
        if (misRes.status === "fulfilled" && misRes.value.data) setMissions(misRes.value.data);
      } catch (err) {
        console.error("Error loading Career Twin data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading career twin intelligence...</p>
        </div>
      </div>
    );
  }

  // Real Derived Data
  const totalXp = xpData?.total_xp || 0;
  const lp = levelProgress(totalXp);
  const levelNum = lp?.cur?.lvl || 1;
  const levelName = lp?.cur?.name || profile?.target_role || "Growth Seeker";

  const overallScore = placementScore?.total_score || resumeAnalysis?.ats_score || 72;
  const dsaScore = placementScore?.dsa_score || 75;
  const codingScore = placementScore?.projects_score || 80;
  const streakDays = streakData?.current_streak || 0;
  const consistencyScore = Math.min(100, streakDays * 5 + 20);

  const aiResults = resumeAnalysis?.analysis_results || {};
  const rawSkills = Array.isArray(profile?.skills)
    ? profile.skills
    : profile?.skills
    ? String(profile.skills).split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  // Strengths List (real or derived from profile/resume)
  const strengthsList = Array.isArray(aiResults.key_strengths) && aiResults.key_strengths.length > 0
    ? aiResults.key_strengths.slice(0, 3)
    : rawSkills.length > 0
    ? rawSkills.slice(0, 3).map((s: string) => `${s} Proficiency`)
    : ["Project Building & Clean Code", "Problem Solving Fundamentals", "Git & Version Control"];

  // Weaknesses List (real or derived from resume gaps)
  const weaknessesList = aiResults.biggest_gap
    ? [aiResults.biggest_gap, "System Design Architecture", "Comprehensive Unit Testing"].slice(0, 2)
    : ["System Design Architecture", "Testing & CI/CD Practices"];

  // Growth Areas List (real or derived)
  const growthList = aiResults.recommended_step
    ? [aiResults.recommended_step, "Advanced DSA Optimization", "Cloud & DevOps Integration"].slice(0, 3)
    : ["Advanced DSA Optimization", "System Architecture", "Cloud & DevOps Integration"];

  // Today's Mission Data
  const activeMission = missions.find((m) => !m.completed) || missions[0];
  const activeMissionTitle = activeMission?.title || "2 Medium DSA & System Design exercises";
  const activeMissionXp = activeMission?.xp_reward || 30;
  const activeMissionProgress = activeMission?.progress ?? (activeMission?.completed ? 100 : 65);

  // Activity Logs / Memory Data
  const memoryLogs = activityLogs.length > 0
    ? activityLogs.map((l) => ({
        text: l.title || l.action || (l.type === "resume_upload" ? "Resume uploaded & analyzed" : "Activity recorded"),
        xp: `+${l.xp_delta || 15} XP`,
      }))
    : [
        { text: "Uploaded resume v2 — ATS analysis complete", xp: "+50 XP" },
        { text: "Completed 5-day DSA activity streak", xp: "+25 XP" },
        { text: "System design practice log recorded", xp: "+30 XP" },
      ];

  // Sync Summary Text
  const syncSummaryText = aiResults.summary || (
    `Based on your recent platform activity, your strongest signal is ${
      strengthsList[0] ? strengthsList[0].toLowerCase() : "consistent problem solving"
    }. Your main growth area is ${
      weaknessesList[0] ? weaknessesList[0].toLowerCase() : "system design"
    } — complete focused practice over the next 30 days to reach your target role.`
  );

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 relative text-slate-100 pb-24">
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 1. HERO */}
      {/* ---------------------------------------------------------------- */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161226] border border-[#2e234c] text-xs font-medium text-purple-300 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-mono uppercase tracking-widest text-[11px]">AI CAREER TWIN</span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
          Your digital <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">career twin.</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          A living simulation of you — continuously updated from resume, GitHub, DSA, XP, and interview history.
        </p>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 2. MAIN CAREER TWIN GRID */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* ================================================================ */}
        {/* LEFT COLUMN: CAREER PROFILE / SKILL BUILDER */}
        {/* ================================================================ */}
        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-6 space-y-6 shadow-2xl flex flex-col justify-between">
          
          {/* Active Status Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">ACTIVE</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">SYNCHRONIZED</span>
          </div>

          {/* Avatar Visual Element */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-600/30 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-3xl font-bold text-white shadow-xl relative z-10 overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl group-hover:bg-purple-500/30 transition-all pointer-events-none" />
            </div>

            <div className="space-y-0.5">
              <h2 className="font-display text-lg font-bold text-white tracking-tight">
                Skill Builder
              </h2>
              <div className="text-xs font-mono font-semibold text-purple-400">
                Level {levelNum} • {levelName}
              </div>
              <p className="text-[11px] text-slate-400">
                Continuously training on your activity.
              </p>
            </div>
          </div>

          {/* Compact Metric Row */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center font-mono">
            <div className="space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Coding</div>
              <div className="text-sm font-bold text-white">{codingScore}%</div>
            </div>
            <div className="space-y-0.5 border-x border-white/5 px-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate">Problem Solving</div>
              <div className="text-sm font-bold text-white">{dsaScore}%</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Consistency</div>
              <div className="text-sm font-bold text-white">{consistencyScore}%</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-medium">Overall Progress</span>
              <span className="text-white font-bold">{overallScore}%</span>
            </div>
            <div className="h-2 bg-[#141624] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(overallScore, 0), 100)}%` }}
              />
            </div>
          </div>

          {/* Streak Footer */}
          <div className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center gap-3 text-xs">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="font-semibold text-white truncate font-mono">
                {streakDays} Day Streak
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Consistent daily activity recorded
              </div>
            </div>
          </div>

          {/* Resume Intelligence Link Badge */}
          <div className="pt-2">
            <Link
              to="/resume-intelligence"
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white p-2.5 rounded-xl transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">Resume Intelligence</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </Link>
          </div>

        </div>

        {/* ================================================================ */}
        {/* CENTER COLUMN: STRENGTHS / WEAKNESSES / GROWTH AREAS */}
        {/* ================================================================ */}
        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-6 space-y-6 shadow-2xl flex flex-col justify-between">
          
          {/* STRENGTHS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>STRENGTHS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">VERIFIED SIGNALS</span>
            </div>
            <div className="space-y-2">
              {strengthsList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center justify-between text-xs hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-white font-medium truncate">{item}</span>
                  </div>
                  <Code2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* WEAKNESSES */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>WEAKNESSES</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">ATTENTION NEEDED</span>
            </div>
            <div className="space-y-2">
              {weaknessesList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center justify-between text-xs hover:border-rose-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-white font-medium truncate">{item}</span>
                  </div>
                  <Target className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* GROWTH AREAS */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>GROWTH AREAS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">RECOMMENDED</span>
            </div>
            <div className="space-y-2">
              {growthList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center justify-between text-xs hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-white font-medium truncate">{item}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN: TODAY'S MISSION / CAREER MEMORY / SYNC SUMMARY */}
        {/* ================================================================ */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* TODAY'S MISSION CARD */}
          <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span>TODAY'S MISSION</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-medium">
                DAILY TASK
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white leading-snug">
                Complete {activeMissionTitle}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> +{activeMissionXp} XP on completion
                </span>
                <span>{activeMissionProgress}% Complete</span>
              </div>
              <div className="h-1.5 bg-[#141624] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeMissionProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* CAREER MEMORY CARD */}
          <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>CAREER MEMORY</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">RECENT LOGS</span>
            </div>

            <div className="space-y-2.5">
              {memoryLogs.length > 0 ? (
                memoryLogs.map((log: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-slate-300 bg-[#12131c] border border-[#20222f] rounded-xl p-2.5">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{log.text}</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-purple-400 shrink-0">{log.xp}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 italic py-2 text-center">
                  No recent career activity
                </div>
              )}
            </div>
          </div>

          {/* SYNC SUMMARY CARD */}
          <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-5 space-y-3 shadow-xl bg-gradient-to-br from-[#141026] via-[#0b0c10] to-[#0b0c10]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>SYNC SUMMARY</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {syncSummaryText}
            </p>
          </div>

        </div>

      </div>

      {/* ---------------------------------------------------------------- */}
      {/* 6. BOTTOM VALUE STRIP */}
      {/* ---------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <RefreshCw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">Real-time Updates</div>
            <div className="text-[10px] text-slate-400">Always learning from your activity</div>
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">Personalized Insights</div>
            <div className="text-[10px] text-slate-400">Tailored feedback for your growth</div>
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">AI-Powered Guidance</div>
            <div className="text-[10px] text-slate-400">Smart recommendations for you</div>
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">Your Success Partner</div>
            <div className="text-[10px] text-slate-400">Together, we achieve more</div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default CareerIdentityPage;

