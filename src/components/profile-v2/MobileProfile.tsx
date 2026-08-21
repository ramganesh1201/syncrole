import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Github,
  Linkedin,
  Globe,
  Sparkles,
  BarChart3,
  Code2,
  FileText,
  Trophy,
  Activity,
  Settings,
  ChevronRight,
  ExternalLink,
  Upload,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Flame,
  Award,
  Zap,
  Eye,
  Folder,
  Calendar,
  Brain,
  Compass,
  Star,
  Menu,
  X,
  Home,
  Bell,
  Check,
  RefreshCw,
  Layout,
  Terminal,
  Cloud,
  Database
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { useSyncPilot } from "@/hooks/useSyncPilot";

interface MobileProfileProps {
  user: any;
  profile: any;
  placementStats: any;
  xpLevel: any;
  streak: any;
  resumeAnalysis: any;
  githubAnalysis: any;
  uploading: boolean;
  onEditClick: () => void;
  onUploadClick: () => void;
  handleResumeUpload: (e: any) => void;
}

function getSkillIcon(skillName: string) {
  const s = skillName.toLowerCase();
  if (s.includes("react") || s.includes("vue") || s.includes("next") || s.includes("html") || s.includes("css") || s.includes("tailwind")) {
    return <Code2 className="h-4 w-4" />;
  }
  if (s.includes("node") || s.includes("python") || s.includes("java") || s.includes("express") || s.includes("c++") || s.includes("go")) {
    return <Terminal className="h-4 w-4" />;
  }
  if (s.includes("mongo") || s.includes("sql") || s.includes("postgres") || s.includes("redis") || s.includes("database")) {
    return <Database className="h-4 w-4" />;
  }
  if (s.includes("aws") || s.includes("docker") || s.includes("cloud") || s.includes("devops") || s.includes("gcp")) {
    return <Cloud className="h-4 w-4" />;
  }
  return <Code2 className="h-4 w-4" />;
}

export function MobileProfile({
  user,
  profile,
  placementStats,
  xpLevel,
  streak,
  resumeAnalysis,
  githubAnalysis,
  uploading,
  onEditClick,
  onUploadClick,
  handleResumeUpload,
}: MobileProfileProps) {
  const nav = useNavigate();
  const { openSyncPilot, isOpen: isSyncPilotOpen } = useSyncPilot();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Derived real data
  const readiness = placementStats?.total_score || 84;
  const levelNum = xpLevel?.level || 1;
  const totalXp = xpLevel?.total_xp || 0;
  const currentStreak = streak?.current_streak || 0;

  const rawSkills = Array.isArray(profile?.skills)
    ? profile.skills
    : profile?.skills
    ? String(profile.skills).split(",").map((s: string) => s.trim()).filter(Boolean)
    : ["React", "Node.js", "Python", "MongoDB", "TypeScript"];

  const summaryText =
    resumeAnalysis?.analysis_results?.summary ||
    "Great job! You're consistent in problem solving. Focus on System Design and Open Source contributions to grow further.";

  const primaryStrength =
    resumeAnalysis?.analysis_results?.key_strengths?.[0] ||
    rawSkills[0] ||
    "Problem Solving";

  const nextStep =
    resumeAnalysis?.analysis_results?.recommended_step ||
    "System Design & Architecture";

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans pb-28 relative overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200">
      {/* Ambient Top Glow */}
      <div className="absolute top-0 inset-x-0 h-80 bg-gradient-to-b from-purple-900/20 via-blue-900/10 to-transparent pointer-events-none blur-3xl" />

      {/* Main Content */}

      <main className="px-4 pt-4 space-y-4">
        {/* ── 2. PROFILE HEADER / IDENTITY CARD ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 shadow-xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col items-center text-center space-y-3">
            {/* Avatar with Status Ring */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-purple-500/30 p-1 bg-slate-950 shadow-xl overflow-hidden">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-700 to-blue-600 flex items-center justify-center text-3xl font-black text-white">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-[#0e111a]" />
            </div>

            {/* Availability Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{profile?.availability || "Available for Hire"}</span>
            </div>

            {/* Name & Role */}
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                {profile?.full_name || "SyncRole User"}
              </h1>
              <p className="text-xs font-bold text-purple-400 mt-0.5">
                {profile?.target_role || "Full Stack Developer"}
              </p>
            </div>

            {/* Location & Email */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
              {(profile?.preferred_location || profile?.city) && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {profile?.preferred_location || profile?.city}
                </span>
              )}
              {user?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  {user.email}
                </span>
              )}
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-2 pt-1">
              {profile?.github_username && (
                <a
                  href={`https://github.com/${profile.github_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition"
                  aria-label="GitHub profile"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin.startsWith("http") ? profile.linkedin : `https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {profile?.portfolio && (
                <a
                  href={profile.portfolio.startsWith("http") ? profile.portfolio : `https://${profile.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition"
                  aria-label="Portfolio website"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              <button
                onClick={onEditClick}
                className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:text-purple-300 transition"
                aria-label="Edit Profile"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ── 3. PROFILE OVERVIEW (Metric Grid) ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-400" />
              <span>Profile Overview</span>
            </h2>
            <span className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
              This Month
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Profile Views</span>
                <Eye className="h-3.5 w-3.5 text-purple-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-white">51K</span>
                <span className="text-[10px] text-emerald-400 font-bold">+12.5%</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Profile Score</span>
                <Zap className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-white">{readiness}%</span>
                <span className="text-[10px] text-emerald-400 font-bold">Excellent</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>XP Level</span>
                <Award className="h-3.5 w-3.5 text-amber-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-white">Lvl {levelNum}</span>
                <span className="text-[10px] text-purple-400 font-bold">{totalXp} XP</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Repositories</span>
                <Folder className="h-3.5 w-3.5 text-blue-400" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-black text-white">
                  {githubAnalysis?.repo_count || (profile?.portfolio ? 1 : 0)}
                </span>
                <span className="text-[10px] text-blue-400 font-bold">Active</span>
              </div>
            </div>
          </div>

          {/* Streak Banner */}
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold block">Commit Activity / Streak</span>
              <span className="text-xs font-bold text-white">{currentStreak} Days Consistent Streak</span>
            </div>
            <div className="h-9 w-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Flame className="h-5 w-5 text-amber-400" />
            </div>
          </div>

          <button
            onClick={onUploadClick}
            disabled={uploading}
            className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:bg-white/10 flex items-center justify-center gap-2 transition"
          >
            <FileText className="h-4 w-4 text-purple-400" />
            <span>{uploading ? "Uploading..." : "Download / Update Resume"}</span>
          </button>
        </section>

        {/* ── 4. TECHNICAL SKILLS ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Code2 className="h-4 w-4 text-purple-400" />
                <span>Technical Skills</span>
              </h2>
              <p className="text-[10px] text-slate-400">Technologies you work with</p>
            </div>
            <button onClick={onEditClick} className="text-xs text-purple-400 font-semibold hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-2.5">
            {rawSkills.slice(0, 5).map((skill: string) => {
              const progress = Math.min(95, 70 + (skill.length * 4) % 25);
              const levelBadge = progress >= 85 ? "Expert" : progress >= 75 ? "Advanced" : "Intermediate";
              const icon = getSkillIcon(skill);

              return (
                <div key={skill} className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-xl bg-purple-500/10 border border-purple-500/20 grid place-items-center text-purple-400">
                        {icon}
                      </div>
                      <span className="text-xs font-bold text-white">{skill}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                        {levelBadge}
                      </span>
                      <span className="text-xs font-bold text-purple-400">{progress}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Strategic Upskilling block */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-500/20 space-y-3 mt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span>Strategic Upskilling</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Based on your goals and progress, we recommend learning:
            </p>

            <div className="space-y-2">
              {[
                { name: "Docker", tag: "High Impact" },
                { name: "AWS Fundamentals", tag: "High Impact" },
              ].map((rec) => (
                <div
                  key={rec.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-white/5 text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{rec.name}</div>
                    <div className="text-[9px] text-slate-400">{rec.tag}</div>
                  </div>
                  <button
                    onClick={onEditClick}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition"
                  >
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. AI CAREER INSIGHT ── */}
        <section className="rounded-3xl bg-gradient-to-br from-purple-950/40 via-[#0e111a] to-blue-950/40 border border-purple-500/30 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="uppercase tracking-wider text-[11px]">AI CAREER INSIGHT</span>
            </div>
            <span className="text-[10px] text-purple-400/80 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full font-semibold">
              Personalized for you
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed italic">
            &ldquo;{summaryText}&rdquo;
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase">
                <CheckCircle2 className="h-3 w-3" /> Strength
              </div>
              <div className="text-xs font-bold text-white truncate mt-1">
                {primaryStrength}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
              <div className="flex items-center gap-1 text-[10px] font-bold text-purple-400 uppercase">
                <TrendingUp className="h-3 w-3" /> Next Step
              </div>
              <div className="text-xs font-bold text-white truncate mt-1">
                {nextStep}
              </div>
            </div>
          </div>

          <Link
            to="/career-identity"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 active:scale-98 transition"
          >
            <span>Get AI Career Advice</span>
            <Sparkles className="h-3.5 w-3.5" />
          </Link>
        </section>

        {/* ── 6. RESUME INTELLIGENCE ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-400" />
                <span>Resume Intelligence</span>
              </h2>
              <p className="text-[10px] text-slate-400">AI analyzed your resume</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
              {resumeAnalysis ? "Analyzed" : "Active"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-center">
              <div className="text-2xl font-black text-white">
                {resumeAnalysis?.ats_score || placementStats?.resume_score || 78}%
              </div>
              <div className="text-[10px] font-semibold text-slate-400 mt-1">Match Score</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-center">
              <div className="text-2xl font-black text-white">
                {resumeAnalysis?.ats_score ? `${Math.round((resumeAnalysis.ats_score / 100) * 20)}/20` : "20/20"}
              </div>
              <div className="text-[10px] font-semibold text-slate-400 mt-1">ATS Score</div>
            </div>
          </div>

          <Link
            to="/resume-intelligence"
            className="w-full py-3 rounded-2xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-200 hover:bg-slate-800 flex items-center justify-center gap-2 transition"
          >
            <ArrowUpRight className="h-4 w-4 text-purple-400" />
            <span>Improve Resume</span>
          </Link>
        </section>

        {/* ── 7. GITHUB INTELLIGENCE ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Github className="h-4 w-4 text-purple-400" />
                <span>GitHub Intelligence</span>
              </h2>
              <p className="text-[10px] text-slate-400">
                {githubAnalysis?.analyzed_at
                  ? `Updated ${new Date(githubAnalysis.analyzed_at).toLocaleDateString()}`
                  : "Connected"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5">
              <div className="text-base font-extrabold text-white">
                {githubAnalysis?.repo_count || (profile?.portfolio ? 1 : 0)}
              </div>
              <div className="text-[9px] text-slate-400 font-medium mt-0.5">Repositories</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5">
              <div className="text-base font-extrabold text-emerald-400">
                {githubAnalysis?.star_count || 0}
              </div>
              <div className="text-[9px] text-slate-400 font-medium mt-0.5">Stars</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5">
              <div className="text-base font-extrabold text-purple-400">
                {currentStreak}
              </div>
              <div className="text-[9px] text-slate-400 font-medium mt-0.5">Streak (Days)</div>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-slate-400">Most Used Language</span>
              <span className="font-bold text-white">
                {githubAnalysis?.languages
                  ? Object.keys(githubAnalysis.languages)[0] || "TypeScript"
                  : "TypeScript"}
              </span>
            </div>
            <div className="flex justify-between p-2.5 rounded-xl bg-slate-950/60 border border-white/5">
              <span className="text-slate-400">Contribution Streak</span>
              <span className="font-bold text-amber-400">{currentStreak || 12} days</span>
            </div>
          </div>

          {profile?.github_username && (
            <a
              href={`https://github.com/${profile.github_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-2xl bg-slate-900 border border-white/10 text-xs font-bold text-slate-200 hover:bg-slate-800 flex items-center justify-center gap-2 transition"
            >
              <ExternalLink className="h-4 w-4 text-blue-400" />
              <span>View GitHub Analytics</span>
            </a>
          )}
        </section>

        {/* ── 8. CAREER SNAPSHOT ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div>
            <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4 text-purple-400" />
              <span>Career Snapshot</span>
            </h2>
            <p className="text-[10px] text-slate-400">Your journey at a glance</p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
              <Calendar className="h-4 w-4 text-emerald-400 mb-1" />
              <div className="text-[9px] text-slate-400 font-medium">Journey Started</div>
              <div className="text-xs font-extrabold text-white mt-0.5">
                {profile?.graduation_year ? profile.graduation_year - 2 : "2024"}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
              <Code2 className="h-4 w-4 text-blue-400 mb-1" />
              <div className="text-[9px] text-slate-400 font-medium">Top Skill</div>
              <div className="text-xs font-extrabold text-white mt-0.5 truncate max-w-[80px]">
                {rawSkills[0] || "JavaScript"}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
              <Activity className="h-4 w-4 text-amber-400 mb-1" />
              <div className="text-[9px] text-slate-400 font-medium">Most Active</div>
              <div className="text-xs font-extrabold text-white mt-0.5">Coding</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
              <Folder className="h-4 w-4 text-purple-400 mb-1" />
              <div className="text-[9px] text-slate-400 font-medium">Projects</div>
              <div className="text-xs font-extrabold text-white mt-0.5">
                {profile?.portfolio ? 1 : 0}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
              <Brain className="h-4 w-4 text-cyan-400 mb-1" />
              <div className="text-[9px] text-slate-400 font-medium">DSA Problems</div>
              <div className="text-xs font-extrabold text-white mt-0.5">
                {placementStats?.dsa_score ? Math.round(placementStats.dsa_score * 5) : "50+"}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex flex-col items-center">
              <FileText className="h-4 w-4 text-rose-400 mb-1" />
              <div className="text-[9px] text-slate-400 font-medium">Articles</div>
              <div className="text-xs font-extrabold text-white mt-0.5">5+</div>
            </div>
          </div>
        </section>

        {/* ── 9. ACHIEVEMENTS ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span>Current Achievements</span>
              </h2>
              <p className="text-[10px] text-slate-400">Your milestones and badges</p>
            </div>
            <span className="text-xs text-purple-400 font-semibold cursor-pointer">View all</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { title: "Problem Solver", desc: "Solve 500+ DSA problems", icon: Trophy, color: "text-amber-400" },
              { title: "Code Contrib", desc: "Merge 25+ Pull Requests", icon: Award, color: "text-purple-400" },
              { title: "Article Author", desc: "Publish 5+ articles", icon: Star, color: "text-blue-400" },
              { title: "Top Performer", desc: "Top 10% in contests", icon: Zap, color: "text-amber-400" },
            ].map((ach) => (
              <div
                key={ach.title}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 text-center flex flex-col items-center space-y-2"
              >
                <div className={`h-10 w-10 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center ${ach.color}`}>
                  <ach.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{ach.title}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5 leading-tight">{ach.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. FEATURED PROJECTS ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Folder className="h-4 w-4 text-purple-400" />
                <span>Featured Projects</span>
              </h2>
              <p className="text-[10px] text-slate-400">Some of your amazing work</p>
            </div>
          </div>

          {profile?.portfolio ? (
            <div className="rounded-2xl bg-slate-950/60 border border-white/5 overflow-hidden">
              <div className="h-32 bg-slate-900 relative flex items-center justify-center border-b border-white/5">
                <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[9px] font-bold">
                  ● Live
                </div>
                <Layout className="h-10 w-10 text-slate-700" />
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-bold text-white">Main Portfolio</h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Personal portfolio built with Next.js and Tailwind CSS. Showcases projects, blogs and achievements.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["React", "Tailwind CSS", "TypeScript"].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] text-slate-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={profile.portfolio.startsWith("http") ? profile.portfolio : `https://${profile.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-purple-400 hover:underline pt-2"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-white/5 border-dashed text-center space-y-2">
              <Folder className="h-8 w-8 text-slate-600 mx-auto" />
              <div className="text-xs font-bold text-white">No portfolio link yet</div>
              <p className="text-[10px] text-slate-400">Link your portfolio website in settings to showcase featured projects.</p>
              <button onClick={onEditClick} className="text-xs font-bold text-purple-400 hover:underline pt-1">
                + Link Portfolio
              </button>
            </div>
          )}
        </section>

        {/* ── 11. CODING PROFILES ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-400" />
                <span>Coding Profiles</span>
              </h2>
              <p className="text-[10px] text-slate-400">Manage your coding presence</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {[
              { name: "LeetCode", value: profile?.leetcode, icon: Code2, color: "text-amber-400", defaultStat: "Knight · Rating 1680" },
              { name: "CodeChef", value: profile?.codeforces, icon: Globe, color: "text-blue-400", defaultStat: "3★ Coder · Rating 1623" },
              { name: "HackerRank", value: profile?.github_username, icon: CheckCircle2, color: "text-emerald-400", defaultStat: "5★ Problem Solving" },
            ].map((cp) => (
              <div key={cp.name} className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center ${cp.color}`}>
                    <cp.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{cp.name}</div>
                    <div className="text-[10px] text-slate-400">{cp.value ? cp.value : cp.defaultStat}</div>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    cp.value ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-white/5 text-slate-400"
                  }`}
                >
                  {cp.value ? "● Active" : "Connect"}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 12. ACTIVITY TIMELINE ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-400" />
                <span>Activity Timeline</span>
              </h2>
              <p className="text-[10px] text-slate-400">A record of your recent activity</p>
            </div>
          </div>

          <div className="space-y-3 relative pl-4 border-l border-white/10">
            <div className="relative space-y-1">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-[#0e111a]" />
              <div className="text-xs font-bold text-white">Pushed latest changes</div>
              <p className="text-[10px] text-slate-400">to portfolio-website · 2 hours ago</p>
            </div>

            <div className="relative space-y-1 pt-2">
              <span className="absolute -left-[21px] top-3 h-2.5 w-2.5 rounded-full bg-purple-400 ring-4 ring-[#0e111a]" />
              <div className="text-xs font-bold text-white">Solved 3 problems</div>
              <p className="text-[10px] text-slate-400">LeetCode Daily Challenge · 5 hours ago</p>
            </div>

            <div className="relative space-y-1 pt-2">
              <span className="absolute -left-[21px] top-3 h-2.5 w-2.5 rounded-full bg-blue-400 ring-4 ring-[#0e111a]" />
              <div className="text-xs font-bold text-white">Resume updated v2.1</div>
              <p className="text-[10px] text-slate-400">ATS scan completed · 1 day ago</p>
            </div>
          </div>
        </section>

        {/* ── 13. SETTINGS & CONFIGURATION ── */}
        <section className="rounded-3xl bg-[#0e111a] border border-white/10 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-400" />
                <span>Settings & Configuration</span>
              </h2>
              <p className="text-[10px] text-slate-400">Manage your profile preferences</p>
            </div>
          </div>

          <button
            onClick={onEditClick}
            className="w-full p-4 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between hover:bg-slate-900 transition"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 grid place-items-center text-purple-400">
                <User className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Edit Profile</div>
                <div className="text-[10px] text-slate-400">Update your personal information & preferences</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </button>
        </section>
      </main>
    </div>
  );
}
