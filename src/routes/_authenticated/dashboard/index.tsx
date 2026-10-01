import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  levelProgress,
  getProfileCompletionStatus,
  MISSION_TEMPLATES,
  XP,
} from "@/lib/syncrole";
import { toast } from "sonner";
import { extractTextFromPDF } from "@/lib/pdf";
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
      supabase
        .from("interview_sessions")
        .select("*")
        .eq("user_id", uid)
        .order("created_at", { ascending: false })
        .limit(5),
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

  const userContext: UserCareerContext = useMemo(() => {
    return {
      user_id: profile?.user_id || "",
      target_role: (profile?.target_role as CareerRole) || (profile?.career_goal as CareerRole) || "fullstack",
      dream_companies: profile?.dream_companies || [],
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

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="bg-[#F7F9FC] text-slate-900 min-h-screen">
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

      {/* Desktop Dashboard View (>= 768px) */}
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
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6 animate-pulse">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <div className="h-3 w-24 bg-slate-200 rounded-full" />
            <div className="h-8 w-64 bg-slate-200 rounded-xl" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-24 bg-slate-200 rounded-full" />
            <div className="h-8 w-24 bg-slate-200 rounded-full" />
          </div>
        </div>
        <div className="h-48 w-full bg-slate-200 rounded-3xl" />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="lg:col-span-2 row-span-2 h-72 bg-slate-200 rounded-3xl" />
          <div className="h-32 bg-slate-200 rounded-3xl" />
          <div className="h-32 bg-slate-200 rounded-3xl" />
          <div className="md:col-span-2 h-40 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
