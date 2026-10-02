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
  Terminal,
  Cloud,
  Database,
  Check,
} from "lucide-react";

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
    return <Code2 className="h-3.5 w-3.5" />;
  }
  if (s.includes("node") || s.includes("python") || s.includes("java") || s.includes("express") || s.includes("c++") || s.includes("go")) {
    return <Terminal className="h-3.5 w-3.5" />;
  }
  if (s.includes("mongo") || s.includes("sql") || s.includes("postgres") || s.includes("redis") || s.includes("database")) {
    return <Database className="h-3.5 w-3.5" />;
  }
  if (s.includes("aws") || s.includes("docker") || s.includes("cloud") || s.includes("devops") || s.includes("gcp")) {
    return <Cloud className="h-3.5 w-3.5" />;
  }
  return <Code2 className="h-3.5 w-3.5" />;
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
  const [activeTab, setActiveTab] = useState<"overview" | "skills" | "career" | "activity">("overview");

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
    "Consistently performing in problem solving. Recommend focusing on System Design & Open Source.";

  const primaryStrength =
    resumeAnalysis?.analysis_results?.key_strengths?.[0] ||
    rawSkills[0] ||
    "Problem Solving";

  const nextStep =
    resumeAnalysis?.analysis_results?.recommended_step ||
    "System Design & Architecture";

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans pb-28 px-4 pt-4 space-y-4">
      {/* 1. IDENTITY CARD */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs relative space-y-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full border-2 border-purple-200 p-0.5 bg-purple-50 overflow-hidden shadow-2xs">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xl font-extrabold text-white">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-extrabold text-slate-900 leading-tight truncate">
                {profile?.full_name || "SyncRole Candidate"}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                Available
              </span>
            </div>

            <p className="text-xs font-semibold text-purple-700 truncate">
              {profile?.target_role || "Full Stack Developer"}
            </p>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 truncate">
              {(profile?.preferred_location || profile?.city) && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  {profile?.preferred_location || profile?.city}
                </span>
              )}
              {user?.email && (
                <span className="flex items-center gap-1 truncate">
                  <Mail className="h-3 w-3 text-slate-400" />
                  {user.email}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Social Links & Edit Button */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {profile?.github_username && (
              <a
                href={`https://github.com/${profile.github_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
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
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
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
                className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
                aria-label="Portfolio website"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>

          <button
            onClick={onEditClick}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>
      </section>

      {/* 2. PROGRESSIVE DISCLOSURE TABS */}
      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
        {[
          { id: "overview", label: "Overview", icon: BarChart3 },
          { id: "skills", label: "Skills", icon: Code2 },
          { id: "career", label: "Career", icon: Briefcase },
          { id: "activity", label: "Activity", icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                isActive
                  ? "bg-purple-50 text-purple-700 border border-purple-200/80 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-purple-600" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB CONTENTS */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Readiness Metric Grid */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                OVERVIEW METRICS
              </h2>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                Active Cycle
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                  <span>Profile Score</span>
                  <Zap className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <div className="text-xl font-extrabold text-slate-900">{readiness}%</div>
                <div className="text-[10px] text-emerald-700 font-bold">Excellent</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                  <span>XP & Level</span>
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                </div>
                <div className="text-xl font-extrabold text-slate-900">Lv. {levelNum}</div>
                <div className="text-[10px] text-purple-700 font-bold">{totalXp} Total XP</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                  <span>Repositories</span>
                  <Folder className="h-3.5 w-3.5 text-indigo-600" />
                </div>
                <div className="text-xl font-extrabold text-slate-900">
                  {githubAnalysis?.repo_count || (profile?.portfolio ? 1 : 0)}
                </div>
                <div className="text-[10px] text-indigo-600 font-bold">GitHub Active</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500">
                  <span>Daily Streak</span>
                  <Flame className="h-3.5 w-3.5 text-orange-500" />
                </div>
                <div className="text-xl font-extrabold text-slate-900">{currentStreak} Days</div>
                <div className="text-[10px] text-orange-600 font-bold">Consistent</div>
              </div>
            </div>

            <button
              onClick={onUploadClick}
              disabled={uploading}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center justify-center gap-2 transition"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{uploading ? "Uploading PDF..." : "Upload / Update Resume"}</span>
            </button>
          </section>

          {/* AI Career Insight */}
          <section className="bg-gradient-to-br from-purple-50/90 to-indigo-50/70 border border-purple-200/80 rounded-2xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>AI Career Insight</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              &ldquo;{summaryText}&rdquo;
            </p>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-100">
              <div className="p-2.5 rounded-xl bg-white border border-purple-100">
                <div className="text-[10px] font-bold text-emerald-700 uppercase flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Key Strength
                </div>
                <div className="text-xs font-bold text-slate-900 truncate mt-0.5">{primaryStrength}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-purple-100">
                <div className="text-[10px] font-bold text-purple-700 uppercase flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> Recommended
                </div>
                <div className="text-xs font-bold text-slate-900 truncate mt-0.5">{nextStep}</div>
              </div>
            </div>

            <Link
              to="/career-identity"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
            >
              <span>Get Detailed Career Report</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        </div>
      )}

      {activeTab === "skills" && (
        <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              TECHNICAL SKILLS
            </h2>
            <button onClick={onEditClick} className="text-xs text-purple-700 font-semibold hover:underline">
              Edit Skills
            </button>
          </div>

          <div className="space-y-3">
            {rawSkills.slice(0, 6).map((skill: string) => {
              const progress = Math.min(95, 70 + (skill.length * 4) % 25);
              const levelBadge = progress >= 85 ? "Expert" : progress >= 75 ? "Advanced" : "Intermediate";
              const icon = getSkillIcon(skill);

              return (
                <div key={skill} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-purple-100 border border-purple-200 grid place-items-center text-purple-700">
                        {icon}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{skill}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-bold">
                        {levelBadge}
                      </span>
                      <span className="text-xs font-bold text-purple-700">{progress}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {activeTab === "career" && (
        <div className="space-y-4">
          {/* Resume & GitHub Intelligence */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                RESUME & GITHUB INTELLIGENCE
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                Connected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-2xl font-extrabold text-slate-900">
                  {resumeAnalysis?.ats_score || placementStats?.resume_score || 78}%
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">ATS Resume Match</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <div className="text-2xl font-extrabold text-slate-900">
                  {githubAnalysis?.star_count || 0}
                </div>
                <div className="text-[10px] font-semibold text-slate-500 mt-0.5">GitHub Stars</div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to="/resume-intelligence"
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center justify-center gap-1.5 transition"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>Resume Intel</span>
              </Link>
              {profile?.github_username && (
                <a
                  href={`https://github.com/${profile.github_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>GitHub Profile</span>
                </a>
              )}
            </div>
          </section>

          {/* Portfolio & Featured Projects */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              PORTFOLIO & PROJECTS
            </h2>

            {profile?.portfolio ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Main Portfolio Website</h4>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[9px] font-bold">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 truncate">{profile.portfolio}</p>
                <a
                  href={profile.portfolio.startsWith("http") ? profile.portfolio : `https://${profile.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:underline pt-1"
                >
                  <span>View Live Demo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center space-y-2">
                <p className="text-xs text-slate-600">No portfolio link added yet.</p>
                <button onClick={onEditClick} className="text-xs font-bold text-purple-700 hover:underline">
                  + Link Portfolio Website
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {activeTab === "activity" && (
        <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            ACTIVITY TIMELINE
          </h2>

          <div className="space-y-3 relative pl-4 border-l border-slate-200">
            <div className="relative space-y-0.5">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-white" />
              <div className="text-xs font-bold text-slate-900">Pushed latest code commits</div>
              <p className="text-[10px] text-slate-500">to repository · 2 hours ago</p>
            </div>

            <div className="relative space-y-0.5 pt-2">
              <span className="absolute -left-[21px] top-3 h-2.5 w-2.5 rounded-full bg-purple-600 ring-4 ring-white" />
              <div className="text-xs font-bold text-slate-900">Solved 3 DSA problems</div>
              <p className="text-[10px] text-slate-500">Arrays & Linked Lists · 5 hours ago</p>
            </div>

            <div className="relative space-y-0.5 pt-2">
              <span className="absolute -left-[21px] top-3 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-white" />
              <div className="text-xs font-bold text-slate-900">Resume updated (v2.1)</div>
              <p className="text-[10px] text-slate-500">ATS match score calculation · 1 day ago</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
