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
import { dashboardOrchestrator } from "@/lib/career-intelligence";
import { DashboardHero } from "@/components/dashboard-v2/DashboardHero";
import { TodayWorkspace } from "@/components/dashboard-v2/TodayWorkspace";
import { DreamCompanyProgressCard } from "@/components/dashboard-v2/DreamCompanyProgressCard";
import { CareerJourneyCard } from "@/components/dashboard-v2/CareerJourneyCard";
import { CareerHealthCard } from "@/components/dashboard-v2/CareerHealthCard";
import { WeeklyProgressCard } from "@/components/dashboard-v2/WeeklyProgressCard";
import { RecentActivityCard } from "@/components/dashboard-v2/RecentActivityCard";
import { FeaturedAchievements } from "@/components/dashboard-v2/FeaturedAchievements";
import { DashboardFooterCTA } from "@/components/dashboard-v2/DashboardFooterCTA";
import { MobileDashboard } from "@/components/dashboard-v2/MobileDashboard";

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

  const workspaceRef = useRef<HTMLDivElement>(null);

  const orchestration = useMemo(() => {
    return dashboardOrchestrator.orchestrate(
      userContext,
      missions,
      achs,
      streak.current_streak
    );
  }, [userContext, missions, achs, streak.current_streak]);

  const scrollToWorkspace = () => {
    if (workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then((r) => r.json()),
      ]);
      if (userRes.message === "Not Found") throw new Error("GitHub user not found");
      if (userRes.message && userRes.message.includes("API rate limit")) throw new Error("GitHub temporarily limited this analysis. Please try again later.");

      const allRepos = Array.isArray(repoRes) ? repoRes : [];
      const analyzedRepos = allRepos.filter(r => !r.fork);
      
      const stars = analyzedRepos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
      const langs: Record<string, number> = {};
      let reposWithDocs = 0;
      let recentlyUpdated = 0;
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const normalizedRepos = analyzedRepos.map(r => {
        if (r.language) langs[r.language] = (langs[r.language] ?? 0) + 1;
        if (r.description || r.has_wiki) reposWithDocs++;
        if (new Date(r.updated_at) > thirtyDaysAgo) recentlyUpdated++;
        
        return {
          name: r.name,
          description: r.description,
          url: r.html_url,
          homepage: r.homepage,
          language: r.language,
          topics: r.topics || [],
          stars: r.stargazers_count ?? 0,
          forks: r.forks_count ?? 0,
          updated_at: r.updated_at
        };
      });

      // Dimensions
      const projectQuality = Math.min(100, Math.round((stars * 10) + (analyzedRepos.length * 2)));
      const activityScore = Math.min(100, Math.round((recentlyUpdated / (analyzedRepos.length || 1)) * 100 + recentlyUpdated * 5));
      const docScore = Math.min(100, Math.round((reposWithDocs / (analyzedRepos.length || 1)) * 100));
      const techDepth = Math.min(100, Math.round(Object.keys(langs).length * 15 + Math.max(0, ...Object.values(langs)) * 10));
      
      const healthScore = Math.round((projectQuality + activityScore + docScore + techDepth) / 4) || 0;

      // Strengths & Weaknesses
      const strengths = [];
      const weaknesses = [];
      if (stars >= 10) strengths.push(`Recognized projects (${stars} total stars)`);
      if (recentlyUpdated >= 3) strengths.push("Consistent recent activity");
      if (Object.keys(langs).length >= 4) strengths.push("Broad technology exposure");
      if (docScore < 50) weaknesses.push("Many repositories lack descriptions or documentation");
      if (recentlyUpdated === 0) weaknesses.push("No recent repository activity");
      
      const sortedLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]);
      const topLang = sortedLangs.length > 0 ? sortedLangs[0][0] : "Code";

      const recommendations = [];
      if (docScore < 70) recommendations.push("Improve README documentation: Add project overview, setup instructions and screenshots.");
      if (recentlyUpdated < 2) recommendations.push("Maintain recent activity: Continue improving existing projects.");
      if (stars < 5) recommendations.push("Increase project presentation: Add live demos to your strongest projects.");

      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      
      await supabase
        .from("github_analysis")
        .upsert({
          user_id: u.user.id,
          username,
          repo_count: userRes.public_repos ?? 0,
          star_count: stars,
          follower_count: userRes.followers ?? 0,
          languages: langs,
          repositories: normalizedRepos,
          score: healthScore,
          strengths: strengths.length ? strengths : ["Not enough GitHub activity data to confidently identify this strength."],
          weaknesses,
          recommendations,
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
      {/* Mobile Dashboard Experience (< 768px) */}
      <div className="block md:hidden">
        <MobileDashboard
          userContext={userContext}
          profile={profile}
          userName={profile?.full_name || ""}
          orchestration={orchestration}
          onContinueJourney={scrollToWorkspace}
          xp={xp}
          streak={streak}
          missions={missions}
          onCompleteMission={completeMission}
          latestScore={latest}
        />
      </div>

      {/* Desktop Dashboard View (>= 768px) - UNCHANGED */}
      <div className="hidden md:block relative mx-auto max-w-7xl px-4 md:px-6 py-8 min-h-screen">
        <DashboardHero 
          userContext={userContext}
          userName={profile?.full_name || ""}
          orchestration={orchestration}
          onContinueJourney={scrollToWorkspace}
          xp={xp}
          streak={streak}
        />
        
        <div ref={workspaceRef}>
          <TodayWorkspace 
            missions={missions}
            onComplete={completeMission}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <DreamCompanyProgressCard userContext={userContext} />
          </div>
          <div className="lg:col-span-1">
            <CareerJourneyCard userContext={userContext} />
          </div>
          <div className="lg:col-span-1">
            <CareerHealthCard scores={latest} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="h-[360px]">
            <WeeklyProgressCard 
              scores={scores} 
              currentXp={xp.total_xp} 
              currentStreak={streak.current_streak} 
            />
          </div>
          <div className="h-[360px]">
            <RecentActivityCard recentConversations={recentConversations} />
          </div>
        </div>

        <FeaturedAchievements unlockedCodes={achs} />
        
        <DashboardFooterCTA />
      </div>
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
