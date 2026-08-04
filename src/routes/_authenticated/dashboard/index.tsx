import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Sparkles, TrendingUp, Flame, Trophy, Target, Github, FileText, Brain, Zap, ArrowRight,
  Code2, Loader2, Check, Award, MapPin, Rocket, Star, Activity, MessageSquare, Cpu,
  ChevronRight, Calendar, Clock, Upload, CheckCircle, Briefcase, Diamond, Crown, Sun,
  Moon, Code, Terminal, CheckSquare, ShieldAlert, Maximize, FileCheck, Medal, Key,
  LayoutTemplate, GitCommit, GitMerge, Globe, Mic, Video, MonitorPlay, Users,
  TerminalSquare, Layers, PartyPopper
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FeatureFlags } from "@/lib/feature-flags";
import {
  levelProgress,
  getProfileCompletionStatus,
  ACHIEVEMENT_CATALOG,
  MISSION_TEMPLATES,
  XP,
} from "@/lib/syncrole";
import { toast } from "sonner";
import { extractTextFromPDF } from "@/lib/pdf";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { DreamCompanyHero } from "@/components/career-intelligence/DreamCompanyHero";
import { SteppingStonePath } from "@/components/career-intelligence/SteppingStonePath";
import { AdaptiveFocusWidget } from "@/components/career-intelligence/AdaptiveFocusWidget";
import { UserCareerContext, CareerRole } from "@/lib/career-intelligence";
import { AICoachHero } from "@/components/dashboard/AICoachHero";
import { DailyWorkspaceCard } from "@/components/dashboard/DailyWorkspaceCard";
import { AchievementMotivation } from "@/components/dashboard/AchievementMotivation";
import { UnifiedCareerAssets } from "@/components/dashboard/UnifiedCareerAssets";

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
    const [pRes, xRes, sRes, scRes, mRes, aRes, ghRes, rRes, ivRes, cvRes] = await Promise.all([
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
        .from("resume_analysis")
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
    setResume(rRes.data);
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

  const latest = useMemo(
    () =>
      scores[0] ?? {
        total_score: 0,
        resume_score: 0,
        github_score: 0,
        projects_score: 0,
        dsa_score: 0,
        communication_score: 60,
        skill_score: 0,
      },
    [scores]
  );
  const prev = useMemo(() => scores[1], [scores]);
  const delta = useMemo(
    () => (prev ? latest.total_score - prev.total_score : 0),
    [latest, prev]
  );
  const lp = useMemo(() => levelProgress(xp.total_xp), [xp.total_xp]);
  const { pct: completion, missing: missingProfileTasks } = useMemo(
    () => getProfileCompletionStatus(profile || {}, !!resume),
    [profile, resume]
  );
  const chartData = useMemo(
    () =>
      [...scores]
        .reverse()
        .map((s, i) => ({ x: i, y: s.total_score })),
    [scores]
  );

  const userContext: UserCareerContext = useMemo(() => {
    return {
      user_id: profile?.user_id || "",
      target_role: (profile?.target_role as CareerRole) || (profile?.career_goal as CareerRole) || "fullstack",
      dream_companies: profile?.dream_companies && profile.dream_companies.length > 0 ? profile.dream_companies : ["google"],
      preferred_location: profile?.preferred_location || "Remote",
      graduation_year: profile?.graduation_year,
      placementScore: latest.total_score,
      dsaScore: latest.dsa_score,
      resumeScore: latest.resume_score,
      githubScore: latest.github_score,
      projectsScore: latest.projects_score,
      skillScore: latest.skill_score,
      communicationScore: latest.communication_score,
      skills: profile?.skills || [],
      githubUsername: profile?.github_username,
      resumeAtsScore: resume?.ats_score,
      resumeMissingSkills: resume?.missing_skills || [],
    };
  }, [profile, latest, resume]);

  const handleCompanyChange = async (companyId: string) => {
    setProfile((prev: any) => ({ ...prev, dream_companies: [companyId] }));
    const { data: u } = await supabase.auth.getUser();
    if (u.user) {
      await supabase
        .from("profiles")
        .update({ dream_companies: [companyId] })
        .eq("user_id", u.user.id);
      toast.success(`Dream company set to ${companyId.toUpperCase()}`);
    }
  };

  const handleRoleChange = async (roleId: CareerRole) => {
    setProfile((prev: any) => ({ ...prev, target_role: roleId }));
    const { data: u } = await supabase.auth.getUser();
    if (u.user) {
      await supabase
        .from("profiles")
        .update({ target_role: roleId })
        .eq("user_id", u.user.id);
      toast.success(`Target role set to ${roleId}`);
    }
  };

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

    try {
      console.log("[Pipeline Trace] 1. Resume selected:", file.name, `(${file.size} bytes)`);
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File must be less than 5MB");
      }

      setUploading(true);
      toast.loading("Uploading document...", { id: "upload" });

      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not logged in");

      const fileExt = file.name.split('.').pop();
      const filePath = `${u.user.id}/${crypto.randomUUID()}.${fileExt}`;
      
      console.log("[Pipeline Trace] 2. Storage upload initiated to path:", filePath);
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) {
        console.error("[Pipeline Trace] Storage upload failed:", uploadError);
        throw uploadError;
      }
      console.log("[Pipeline Trace] Storage upload SUCCESS.");

      toast.loading("Extracting text...", { id: "upload" });
      console.log("[Pipeline Trace] 3. PDF extraction initiated.");
      const resumeText = await extractTextFromPDF(file);
      console.log("[Pipeline Trace] PDF extraction SUCCESS. Extracted length:", resumeText.length);

      toast.loading("Classifying Document...", { id: "upload" });
      console.log("[Pipeline Trace] 4. AI classification initiated.");
      const { data: classData, error: classErr } = await supabase.functions.invoke("resume-intelligence", {
        body: { action: "classify", resumeText }
      });
      if (classErr) {
        console.error("[Pipeline Trace] AI classification failed:", classErr);
        throw classErr;
      }
      
      const document_type = classData?.document_type || "Unknown";
      console.log("[Pipeline Trace] AI classification SUCCESS. Type:", document_type);

      console.trace("resume query: fetch version_number in dashboard upload");
      console.trace("resume query: fetch latest from resume_analysis in dashboard");
      const { data: existingVersions } = await supabase.from("resume_analysis").select("version_number").eq("user_id", u.user.id).order("version_number", { ascending: false }).limit(1);
      const version_number = existingVersions && existingVersions.length > 0 ? (existingVersions[0].version_number || 0) + 1 : 1;

      let insertData: any = {
        user_id: u.user.id,
        file_path: filePath,
        file_name: file.name,
        extracted_text: resumeText,
        document_type,
        version_number,
      };

      if (document_type === "Resume") {
        toast.loading("Calculating ATS...", { id: "upload" });
        console.log("[Pipeline Trace] 5. AI ATS Scan initiated.");
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "ats_scan", resumeText }
        });
        
        if (aiErr) {
          console.error("[Pipeline Trace] AI ATS Scan failed:", aiErr);
          throw new Error("AI analysis failed: " + (aiErr.message || "Unknown error"));
        }
        if (!aiRes || Object.keys(aiRes).length === 0 || !aiRes.ats_score) {
          console.error("[Pipeline Trace] AI ATS Scan returned empty/invalid results:", aiRes);
          throw new Error("AI returned empty or invalid analysis results.");
        }
        console.log("[Pipeline Trace] AI ATS Scan SUCCESS. Score:", aiRes.ats_score);
        
        toast.loading("Generating Recommendations...", { id: "upload" });
        insertData = {
          ...insertData,
          analysis_results: aiRes,
          ats_score: aiRes.ats_score,
          keyword_match: aiRes.keyword_match,
          formatting_score: aiRes.formatting_score,
          project_score: aiRes.project_score,
          total_score: aiRes.total_score,
          suggestions: aiRes.suggestions,
          missing_skills: aiRes.missing_skills,
        };
      } else {
        toast.loading("Analysing Document...", { id: "upload" });
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "analyze_document", resumeText }
        });
        
        if (aiErr) {
          console.error("AI Request Failed", aiErr);
          throw new Error("AI document analysis failed: " + (aiErr.message || "Unknown error"));
        }
        if (!aiRes || Object.keys(aiRes).length === 0) {
          throw new Error("AI returned empty document analysis.");
        }
        
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

      toast.loading("Saving Results...", { id: "upload" });
      console.log("[Pipeline Trace] 6. Database insert initiated to resume_analysis.");
      console.log("[Pipeline Trace] Payload:", insertData);
      
      const { data: inserted, error: insertErr } = await supabase
        .from("resume_analysis")
        .insert(insertData)
        .select()
        .single();
        
      if (insertErr) {
        console.error("[Pipeline Trace] Database insert failed:", insertErr);
        throw insertErr;
      }
      
      console.log("[Pipeline Trace] Database insert SUCCESS. Row returned:", inserted);
      
      // Verification that the schema cache accepted the new columns (e.g. file_name, extracted_text)
      if (!inserted.file_name || !inserted.extracted_text) {
        console.error("[Pipeline Trace] SCHEMA CACHE FAILURE detected. Database returned NULL for newly added columns.");
        throw new Error("Database schema cache is stale and dropped the inserted columns. Please run 'NOTIFY pgrst, reload_schema;' in your Supabase SQL editor.");
      }

      console.log("[Pipeline Trace] 7. Dashboard refresh initiated.");
      toast.success("Analysis Complete", { id: "upload" });
      loadAll();
      nav({ to: "/resume-intelligence" });
      console.log("[Pipeline Trace] PIPELINE COMPLETE.");
    } catch (e: any) {
      console.error("[Pipeline Trace] FATAL PIPELINE EXCEPTION:", e);
      toast.error(e.message || "An error occurred during analysis", { id: "upload" });
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
    return <DashboardSkeleton />;
  }

  const heroSummary = [];
  if (latest.resume_score < 70) heroSummary.push("Improve Resume Projects");
  if (latest.dsa_score < 70) heroSummary.push("Solve 2 Medium DSA Problems");
  if (interviewSessions.length === 0) heroSummary.push("Finish 1 Mock Interview");
  if (heroSummary.length === 0) heroSummary.push("Keep practicing your core skills");

  const expectedTimeline = latest.total_score >= 75 ? "1-2 months" : latest.total_score >= 50 ? "3-5 months" : "6+ months";

  return (
    <>
      <motion.main
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6"
      >
        {/* ── 1. LIVING AI COACH & DYNAMIC DAILY CONTEXT ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <AICoachHero
            userContext={userContext}
            userName={profile?.full_name || ""}
            totalXp={xp.total_xp}
            levelName={xp.level_name}
            currentStreak={streak.current_streak}
            scores={scores}
          />
        </motion.div>

        {/* ── 2. DREAM COMPANY INTELLIGENCE & ADAPTIVE JOURNEY ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <DreamCompanyHero
            userContext={userContext}
            onCompanyChange={handleCompanyChange}
            onRoleChange={handleRoleChange}
          />
          <AdaptiveFocusWidget userContext={userContext} />
        </motion.div>

        {/* ── 3. TODAY'S ACTION WORKSPACE & MISSIONS ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <DailyWorkspaceCard
            missions={missions}
            onCompleteMission={completeMission}
            userContext={userContext}
          />
        </motion.div>

        {/* ── 4. WIN OF THE DAY & MOMENTUM ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <AchievementMotivation
            unlockedCodes={achs}
            currentStreak={streak.current_streak}
          />
        </motion.div>

        {/* ── 5. DYNAMIC STEPPING-STONE CAREER PATH ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <SteppingStonePath userContext={userContext} />
        </motion.div>

        {/* ── 6. UNIFIED CAREER ASSETS HUB ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <UnifiedCareerAssets
            latest={latest}
            resume={resume}
            gh={gh}
            uploading={uploading}
            onUploadResume={handleUpload}
            onAnalyzeGitHub={analyzeGitHub}
          />
        </motion.div>

        {/* ── 2. PLACEMENT READINESS & KPI GRID ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Card className="lg:col-span-2 row-span-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <div className="flex items-start justify-between">
              <SectionLabel icon={Target}>Placement Readiness</SectionLabel>
              {delta !== 0 && (
                <span className={`text-xs inline-flex items-center gap-1 ${delta > 0 ? "text-[oklch(0.88_0.18_145)]" : "text-destructive"}`}>
                  <TrendingUp className="h-3 w-3" /> {delta > 0 ? "+" : ""}
                  <AnimatedCounter value={delta} /> pts
                </span>
              )}
            </div>
            <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-8">
              <ScoreRing value={latest.total_score} />
              <div className="flex-1 w-full space-y-3">
                {[
                  { l: "Resume", v: latest.resume_score, i: FileText, to: "/resume-intelligence" },
                  { l: "DSA", v: latest.dsa_score, i: Brain, to: "/dashboard/dsa" },
                  { l: "GitHub", v: latest.github_score, i: Github, to: null },
                  { l: "Skills", v: latest.skill_score, i: Sparkles, to: null },
                ].map((b) => {
                  const Wrapper: any = b.to ? Link : "div";
                  return (
                    <Wrapper
                      key={b.l}
                      to={b.to || undefined}
                      className={`group flex items-center gap-3 p-2 -mx-2 rounded-xl transition-colors ${
                        b.to ? "hover:bg-white/5 cursor-pointer" : "opacity-60 cursor-default"
                      }`}
                    >
                      <b.i className={`h-4 w-4 text-muted-foreground transition-colors ${b.to ? "group-hover:text-aurora" : ""}`} />
                      <div className={`text-sm w-20 transition-colors ${b.to ? "text-white/80 group-hover:text-white" : "text-white/50"}`}>
                        {b.l}
                      </div>
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className={`h-full transition-colors ${b.to ? "bg-aurora/80 group-hover:bg-aurora" : "bg-white/20"}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${b.v}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="text-xs font-mono w-8 text-right"><AnimatedCounter value={b.v} /></div>
                      <div className={`text-[10px] uppercase tracking-widest pl-2 transition-opacity ${
                        b.to ? "text-aurora opacity-0 group-hover:opacity-100" : "text-muted-foreground opacity-100"
                      }`}>
                        {b.to ? "Improve →" : "Soon"}
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* level / xp */}
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <SectionLabel icon={Zap}>Level Progress</SectionLabel>
            <div className="mt-4">
              <div className="font-display text-2xl font-bold">{lp.cur.name}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Level <AnimatedCounter value={lp.cur.lvl} />
                {lp.next && (
                  <span className="opacity-60"> — {lp.toNext} XP to {lp.next.name}</span>
                )}
              </div>
              <div className="mt-4 h-2.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-aurora/60 to-aurora" initial={{ width: 0 }} animate={{ width: `${lp.pct}%` }} transition={{ duration: 1.2, ease: "easeOut" }} />
              </div>
              <div className="mt-3 flex justify-between items-center text-xs text-muted-foreground">
                <span className="font-mono text-white/80"><AnimatedCounter value={xp.total_xp} /> XP</span>
                {lp.next && <span className="font-mono text-white/40">{lp.next.min} XP</span>}
              </div>
            </div>
          </Card>

          {/* profile completion */}
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <SectionLabel icon={Check}>Profile Checklist</SectionLabel>
            <div className="mt-4 flex items-center gap-4 mb-4">
              <RingMini value={completion} />
              <div>
                <div className="font-display text-3xl font-bold"><AnimatedCounter value={completion} />%</div>
                <div className="text-xs text-muted-foreground">complete</div>
              </div>
            </div>
            {missingProfileTasks.length > 0 ? (
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-xs font-semibold text-white/80 mb-2">Complete next:</div>
                <ul className="space-y-1.5">
                  {missingProfileTasks.slice(0, 3).map((task: string, i: number) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-aurora/50" />
                      {task}
                    </li>
                  ))}
                </ul>
                <Link to="/onboarding" className="mt-4 block w-full text-center py-2 text-xs bg-aurora/10 text-aurora hover:bg-aurora/20 border border-aurora/20 rounded-lg transition-colors">
                  Complete Profile →
                </Link>
              </div>
            ) : (
              <div className="mt-4 block w-full text-center py-3 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" /> Looking good!
              </div>
            )}
          </Card>
        </motion.div>

        {/* ── 3. CAREER JOURNEY ROADMAP ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <SectionLabel icon={Rocket}>Career Journey</SectionLabel>
              <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full border border-white/10 text-muted-foreground uppercase tracking-widest">
                AI-mapped trajectory
              </span>
            </div>
            <div className="relative">
              {/* Connecting line background */}
              <div className="absolute top-5 left-5 right-5 h-1 bg-white/5 rounded-full" />
              {/* Connecting line fill */}
              <motion.div
                className="absolute top-5 left-5 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(latest.total_score, 100)}%` }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              />
              <div className="relative grid grid-cols-4 gap-2">
                {[
                  {
                    label: "Current",
                    sub: profile?.college?.split(" ")[0] ?? "Student",
                    icon: MapPin,
                    color: "oklch(0.75 0.2 200)",
                    active: true,
                    pct: 0
                  },
                  {
                    label: "Next Milestone",
                    sub: latest.total_score < 50 ? "70+ Readiness" : "Interview Ready",
                    icon: Activity,
                    color: "oklch(0.88 0.18 60)",
                    active: latest.total_score >= 30,
                    pct: 30
                  },
                  {
                    label: "Target Role",
                    sub: profile?.career_goal?.split(" ").slice(0, 3).join(" ") ?? "SDE-1",
                    icon: Cpu,
                    color: "oklch(0.72 0.22 295)",
                    active: latest.total_score >= 60,
                    pct: 60
                  },
                  {
                    label: "Dream Company",
                    sub: "Offer Received",
                    icon: Star,
                    color: "oklch(0.88 0.20 60)",
                    active: latest.total_score >= 80,
                    pct: 80
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="group flex flex-col items-center text-center gap-3 cursor-default"
                  >
                    <div
                      className={`relative h-11 w-11 rounded-full flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 ${
                        step.active ? "ring-4 ring-black/40 ring-offset-2 ring-offset-transparent shadow-lg" : "opacity-40 grayscale"
                      }`}
                      style={{
                        background: step.active ? `radial-gradient(circle, ${step.color} 30%, transparent 100%)` : "oklch(1 0 0 / 10%)",
                        border: `1.5px solid ${step.color}`,
                        boxShadow: step.active ? `0 0 20px ${step.color}40` : "none",
                      }}
                    >
                      <step.icon className={`h-4 w-4 ${step.active ? "text-white" : "text-white/50"}`} />
                      {step.active && <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: step.color }} />}
                    </div>
                    <div>
                      <div className={`text-xs font-semibold transition-colors ${step.active ? "text-white" : "text-white/40"}`}>{step.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{step.sub}</div>
                      {step.active && latest.total_score >= step.pct && latest.total_score < (step.pct + 25) && (
                        <div className="mt-2 text-[9px] uppercase tracking-widest text-aurora opacity-0 group-hover:opacity-100 transition-opacity">
                          In Progress
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── 4. MISSIONS & ANALYZERS ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          {/* missions */}
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <SectionLabel icon={Target}>Daily Missions</SectionLabel>
              <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                {missions.filter((m) => m.completed).length}/{missions.length}
              </span>
            </div>
            <div className="mt-4 space-y-2">
              {missions.map((m) => (
                <div key={m.id} className={`glass rounded-xl p-3 flex items-center gap-3 transition-all duration-500 ${m.completed ? "opacity-50 grayscale bg-black/20" : "hover:bg-white/5"}`}>
                  <div className={`h-7 w-7 shrink-0 rounded-full grid place-items-center transition-all duration-300 ${m.completed ? "bg-aurora scale-100 shadow-[0_0_10px_rgba(var(--aurora-rgb),0.5)]" : "glass border border-white/10"}`}>
                    {m.completed && <Check className="h-4 w-4 text-black" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate transition-all duration-300 ${m.completed ? "line-through text-white/50" : "text-white/90"}`}>{m.title}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{m.description}</div>
                  </div>
                  <div className="text-[10px] font-mono text-accent whitespace-nowrap bg-aurora/10 px-2 py-0.5 rounded border border-aurora/20">+{m.xp_reward} XP</div>
                </div>
              ))}
              {missions.length === 0 && <EmptyState icon={Target} title="No Missions" desc="Refresh tomorrow for new daily missions." />}
            </div>
          </Card>

          {/* GitHub */}
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <SectionLabel icon={Github}>GitHub Intelligence</SectionLabel>
            {gh ? (
              <div className="mt-5">
                <div className="flex items-baseline gap-3 mb-4">
                  <div className="font-display text-4xl font-bold text-aurora"><AnimatedCounter value={gh.score || 0} /></div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Score</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="glass rounded-xl py-3 flex flex-col items-center justify-center border border-white/5">
                    <div className="font-display text-xl font-bold"><AnimatedCounter value={gh.repo_count || 0} /></div>
                    <div className="text-[9px] text-muted-foreground uppercase">Repos</div>
                  </div>
                  <div className="glass rounded-xl py-3 flex flex-col items-center justify-center border border-white/5">
                    <div className="font-display text-xl font-bold"><AnimatedCounter value={gh.star_count || 0} /></div>
                    <div className="text-[9px] text-muted-foreground uppercase">Stars</div>
                  </div>
                  <div className="glass rounded-xl py-3 flex flex-col items-center justify-center border border-white/5">
                    <div className="font-display text-xl font-bold"><AnimatedCounter value={gh.follower_count || 0} /></div>
                    <div className="text-[9px] text-muted-foreground uppercase">Followers</div>
                  </div>
                </div>

                {gh.languages && Object.keys(gh.languages).length > 0 && (
                  <div className="mb-4 bg-white/5 rounded-xl p-3 border border-white/10">
                    <div className="text-xs font-semibold text-white/80 mb-2">Language Distribution</div>
                    <div className="flex w-full h-1.5 rounded-full overflow-hidden bg-black/20 gap-0.5">
                      {Object.entries(gh.languages).slice(0, 4).map(([lang, count]: any, i) => {
                        const total = Object.values(gh.languages).reduce((a: any, b: any) => a + b, 0) as number;
                        const pct = (count / total) * 100;
                        const colors = ["bg-blue-400", "bg-yellow-400", "bg-purple-400", "bg-emerald-400"];
                        return <motion.div key={lang} initial={{ width: 0 }} animate={{ width: `${pct}%` }} className={colors[i % colors.length]} title={`${lang}: ${Math.round(pct)}%`} />;
                      })}
                    </div>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {Object.keys(gh.languages).slice(0, 4).map((lang, i) => {
                        const colors = ["text-blue-400", "text-yellow-400", "text-purple-400", "text-emerald-400"];
                        const dotColors = ["bg-blue-400", "bg-yellow-400", "bg-purple-400", "bg-emerald-400"];
                        return (
                          <div key={lang} className="flex items-center gap-1">
                            <div className={`h-1.5 w-1.5 rounded-full ${dotColors[i % dotColors.length]}`} />
                            <span className={`text-[9px] ${colors[i % colors.length]}`}>{lang}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <button onClick={analyzeGitHub} className="w-full py-2.5 text-xs text-white/80 hover:text-white font-semibold bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2">
                  <Activity className="h-3.5 w-3.5" /> Re-analyze Profile
                </button>
              </div>
            ) : (
              <EmptyState 
                icon={Github} 
                title="Connect GitHub" 
                desc="Analyze your repositories to boost your placement score."
                ctaText="Analyze Profile"
                onCta={analyzeGitHub}
              />
            )}
          </Card>

          {/* Resume */}
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300 flex flex-col">
            <div className="flex justify-between items-start">
              <SectionLabel icon={FileText}>Resume Intelligence</SectionLabel>
              {resume && <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/20">Analyzed</span>}
            </div>
            {resume ? (
              <div className="mt-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <div className="font-display text-4xl font-bold text-aurora"><AnimatedCounter value={resume.total_score || resume.ats_score || 0} /></div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">Score</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center mb-4">
                    <div className="glass rounded-xl py-3 border border-white/5">
                      <div className="font-display text-xl font-bold"><AnimatedCounter value={resume.ats_score || 0} /></div>
                      <div className="text-[9px] text-muted-foreground uppercase">ATS Match</div>
                    </div>
                    <div className="glass rounded-xl py-3 border border-white/5">
                      <div className="font-display text-xl font-bold"><AnimatedCounter value={resume.keyword_match || 0} /></div>
                      <div className="text-[9px] text-muted-foreground uppercase">Keywords</div>
                    </div>
                  </div>
                  
                  {/* Dynamic Insights from Resume */}
                  {(resume.missing_skills?.length > 0 || resume.suggestions?.length > 0) && (
                    <div className="bg-white/5 rounded-xl p-3 mb-4 text-xs">
                      {resume.missing_skills?.length > 0 && (
                        <div className="mb-2">
                          <div className="font-semibold text-white/80 mb-1">Missing Keywords:</div>
                          <div className="flex flex-wrap gap-1">
                            {resume.missing_skills.slice(0, 3).map((k: string, i: number) => (
                              <span key={i} className="bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded text-[10px]">{k}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      {resume.suggestions?.length > 0 && (
                        <div>
                          <div className="font-semibold text-white/80 mb-1">Quick Fix:</div>
                          <div className="text-muted-foreground line-clamp-2">{resume.suggestions[0]}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Link to="/resume-intelligence" className="w-full text-center py-2.5 text-sm font-semibold bg-aurora/10 hover:bg-aurora/20 text-aurora border border-aurora/30 rounded-xl transition-all flex items-center justify-center gap-2 group">
                  View Full Analysis <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center">
                <EmptyState 
                  icon={FileText} 
                  title="Upload Resume" 
                  desc="Unlock AI-powered scoring and ATS optimization."
                />
                <label className="mt-2 w-full text-center py-2.5 text-sm font-semibold bg-aurora/10 hover:bg-aurora/20 text-aurora border border-aurora/30 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group">
                  <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload PDF"}
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
              </div>
            )}
          </Card>
        </motion.div>

        {/* ── 4.5. CAREER INTELLIGENCE LAYER ── */}
        {FeatureFlags.ENABLE_ROLE_EXPLORER && (
          <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
            <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300 border-aurora/20 bg-aurora/5">
              <div className="flex items-center justify-between mb-4">
                <SectionLabel icon={Globe}>Career Intelligence</SectionLabel>
                <span className="bg-aurora/20 text-aurora text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-aurora/30 shadow-[0_0_10px_rgba(var(--aurora-rgb),0.3)]">New Feature</span>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Role Explorer & AI Career Mapping</h3>
                  <p className="text-sm text-white/70 max-w-xl leading-relaxed">
                    Discover intelligent career paths, missing skills, and salary progressions for top tech roles. Use the Gap Analysis engine to see exactly what you need to master next.
                  </p>
                </div>
                <Link to="/role-explorer" className="w-full md:w-auto px-6 py-3 text-sm font-semibold bg-aurora hover:bg-aurora/90 text-black rounded-xl transition-all flex items-center justify-center gap-2 group whitespace-nowrap shadow-[0_0_20px_rgba(var(--aurora-rgb),0.4)]">
                  Explore Roles <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── 5. ACTIVITY & PREDICTIONS ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Recent Activity */}
          <Card className="lg:col-span-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <SectionLabel icon={Activity}>Recent Activity Feed</SectionLabel>
            <div className="mt-5 space-y-2">
              {[
                ...achs.slice(-3).map((code) => ({
                  icon: Award,
                  color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
                  label: "Achievement Unlocked",
                  sub: code.replace(/_/g, " "),
                  time: "Recent",
                })),
                ...recentConversations.slice(0, 2).map((c: any) => ({
                  icon: MessageSquare,
                  color: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
                  label: "SyncPilot Conversation",
                  sub: c.title || "Career Advice",
                  time: new Date(c.updated_at).toLocaleDateString(),
                })),
                ...interviewSessions.slice(0, 2).map((s: any) => ({
                  icon: Brain,
                  color: "text-violet-400 bg-violet-400/10 border-violet-400/20",
                  label: "Mock Interview Completed",
                  sub: `${s.company || "Practice"} — Score ${s.score}`,
                  time: new Date(s.created_at).toLocaleDateString(),
                })),
                ...(scores.length > 0 ? [{
                  icon: TrendingUp,
                  color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
                  label: "Placement Score Updated",
                  sub: `New total: ${latest.total_score}/100`,
                  time: new Date(scores[0]?.created_at).toLocaleDateString(),
                }] : []),
              ].slice(0, 5).map((item, i) => (
                <div key={i} className="group flex items-center gap-4 glass rounded-2xl px-4 py-3 hover:bg-white/5 transition-colors cursor-default border border-white/5 hover:border-white/10">
                  <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center border ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white/90 font-medium truncate">{item.label}</div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">{item.sub}</div>
                  </div>
                  <div className="text-[10px] text-muted-foreground whitespace-nowrap bg-black/20 px-2 py-1 rounded-md">
                    {item.time}
                  </div>
                </div>
              ))}
              {achs.length === 0 && recentConversations.length === 0 && interviewSessions.length === 0 && (
                <EmptyState icon={Activity} title="No Activity Yet" desc="Complete missions and use tools to build your history." />
              )}
            </div>
          </Card>

          {/* Future Prediction */}
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <SectionLabel icon={Sparkles}>AI Prediction</SectionLabel>
              <span className="text-[9px] px-2 py-0.5 rounded-md bg-violet-500/15 text-violet-400 border border-violet-500/20 uppercase tracking-widest">
                Forecast
              </span>
            </div>
            <div className="space-y-3">
              {(() => {
                const skills = [
                  { name: "Resume", score: latest.resume_score || 0 },
                  { name: "GitHub", score: latest.github_score || 0 },
                  { name: "DSA", score: latest.dsa_score || 0 },
                  { name: "Communication", score: latest.communication_score || 0 }
                ].sort((a, b) => a.score - b.score);
                const weakest = skills[0];
                const strongest = skills[skills.length - 1];

                return [
                  {
                    label: "Placement Probability",
                    value: Math.min(99, Math.round((latest.total_score || 0) * 1.1)),
                    suffix: "%",
                    color: "oklch(0.75 0.2 200)",
                    sub: latest.total_score >= 70 ? "High confidence" : "Improving",
                  },
                  {
                    label: "Strongest Skill",
                    value: strongest.name,
                    isText: true,
                    color: "oklch(0.88 0.18 145)",
                    sub: `Score: ${strongest.score}`,
                  },
                  {
                    label: "Action Required",
                    value: `Improve ${weakest.name}`,
                    isText: true,
                    color: "oklch(0.88 0.18 60)",
                    sub: `Weakest score: ${weakest.score}`,
                  },
                ].map((pred, i) => (
                  <div key={i} className="glass rounded-2xl p-3.5 flex items-center justify-between group hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                    <div>
                      <div className="text-xs font-medium text-white/80">{pred.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{pred.sub}</div>
                    </div>
                    <div className="text-sm font-bold font-mono transition-transform group-hover:scale-105 text-right max-w-[120px] truncate" style={{ color: pred.color }}>
                      {pred.isText ? pred.value : <><AnimatedCounter value={Number(pred.value)} />{pred.suffix}</>}
                    </div>
                  </div>
                ));
              })()}
              <div className="text-[10px] text-muted-foreground/60 text-center pt-2 leading-relaxed">
                Predictions generated live from your current data profile.
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ── 6. ACHIEVEMENT VAULT ── */}
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
          <Card className="hover:-translate-y-1 hover:shadow-xl hover:shadow-aurora/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-5">
              <SectionLabel icon={Award}>Achievement Vault</SectionLabel>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <span className="text-aurora font-bold">{achs.length}</span> / {Object.keys(ACHIEVEMENT_CATALOG).length} Unlocked
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {Object.entries(ACHIEVEMENT_CATALOG).map(([code, a]) => {
                const unlocked = achs.includes(code);
                const IconMap: Record<string, any> = {
                  Rocket, CheckCircle, Target, Briefcase, Flame, Diamond, Crown, Sun,
                  Moon, Code, Terminal, CheckSquare, ShieldAlert, Maximize, FileCheck, Medal, Key,
                  LayoutTemplate, Github, GitCommit, GitMerge, Globe, Mic, Video, MonitorPlay, Users,
                  TerminalSquare, Layers, PartyPopper, Cpu, Brain, Trophy, Zap, Activity, Award, Star, Code2, MessageSquare, TrendingUp
                };
                const IconComponent = IconMap[a.icon] || Trophy;

                let rarityColor = "text-white/60 drop-shadow-md";
                let bgGlow = "from-white/10";
                if (unlocked) {
                  switch(a.rarity) {
                    case "Common": rarityColor = "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"; bgGlow = "from-emerald-400/20"; break;
                    case "Rare": rarityColor = "text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.6)]"; bgGlow = "from-blue-400/20"; break;
                    case "Epic": rarityColor = "text-purple-400 drop-shadow-[0_0_12px_rgba(192,132,252,0.8)]"; bgGlow = "from-purple-400/20"; break;
                    case "Legendary": rarityColor = "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,1)]"; bgGlow = "from-yellow-400/20"; break;
                  }
                }

                return (
                  <div 
                    key={code} 
                    className={`group relative glass rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-500 overflow-hidden min-h-[110px] ${
                      unlocked ? "hover:-translate-y-1 hover:shadow-xl border border-white/10 hover:border-white/20 cursor-default" : "opacity-40 grayscale hover:opacity-70 cursor-not-allowed"
                    }`}
                  >
                    {unlocked && (
                      <div className={`absolute inset-0 bg-gradient-to-b ${bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    )}
                    <div className={`mb-3 transition-transform duration-500 ${unlocked ? "group-hover:scale-110 group-hover:-translate-y-1" : ""} ${rarityColor}`}>
                      <IconComponent className="h-8 w-8 mx-auto" strokeWidth={1.5} />
                    </div>
                    <div className="text-[10px] font-bold leading-tight text-white/90 relative z-10 font-display">
                      {a.name}
                    </div>
                    {unlocked && (
                      <div className="absolute -bottom-8 group-hover:bottom-2 left-0 right-0 text-[8px] text-white/70 transition-all duration-300 px-1 opacity-0 group-hover:opacity-100">
                        {a.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

      </motion.main>
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

function AnimatedCounter({ value, className }: { value: number; className?: string }) {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    mv.set(value);
  }, [value, mv]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return <span className={className}>{display}</span>;
}

function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6 animate-pulse">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="h-3 w-24 bg-white/10 rounded-full" />
          <div className="h-8 w-64 bg-white/10 rounded-xl" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-white/10 rounded-full" />
          <div className="h-8 w-24 bg-white/10 rounded-full" />
        </div>
      </div>
      <div className="h-48 w-full bg-white/5 rounded-3xl" />
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="lg:col-span-2 row-span-2 h-72 bg-white/5 rounded-3xl" />
        <div className="h-32 bg-white/5 rounded-3xl" />
        <div className="h-32 bg-white/5 rounded-3xl" />
        <div className="md:col-span-2 h-40 bg-white/5 rounded-3xl" />
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc, ctaText, onCta }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
      <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 mb-4 max-w-[200px]">{desc}</p>
      {ctaText && onCta && (
        <button onClick={onCta} className="text-xs bg-aurora/10 text-aurora hover:bg-aurora/20 px-4 py-2 rounded-full transition-colors font-medium border border-aurora/20">
          {ctaText}
        </button>
      )}
    </div>
  );
}
