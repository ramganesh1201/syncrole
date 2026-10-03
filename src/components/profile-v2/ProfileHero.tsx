import React from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Upload, FileText, Github, Edit, MapPin, Briefcase, ChevronRight, Zap, Target, Star, Link as LinkIcon, AlertCircle, Building2, TrendingUp, Compass } from "lucide-react";

interface ProfileHeroProps {
  profile: any;
  placementStats: any;
  completionPct: number;
  xpLevel: any;
  streak: any;
  uploading: boolean;
  onEditClick: () => void;
  onUploadClick: () => void;
}

export const ProfileHero = React.memo(function ProfileHero({ 
  profile, 
  placementStats, 
  completionPct, 
  xpLevel,
  streak,
  uploading, 
  onEditClick, 
  onUploadClick 
}: ProfileHeroProps) {
  const readiness = placementStats?.total_score || 0;
  const twinScore = placementStats?.total_score ? Math.min(99, placementStats.total_score + 12) : 0;
  const levelName = xpLevel?.level_name || "Career Explorer";
  const xpAmount = xpLevel?.total_xp || 0;
  const currentStreak = streak?.current_streak || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 flex flex-col xl:flex-row gap-8 items-stretch mb-8 shadow-xs"
      id="overview"
    >
      {/* Left: Avatar & Identity & Compact Metrics */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1 min-w-0">
        <div className="relative shrink-0 flex flex-col items-center gap-2">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-slate-100 overflow-hidden shadow-xs bg-slate-100 ring-1 ring-slate-200">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-purple-600 bg-purple-50">
                {profile?.full_name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            {profile?.availability || "Available"}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-4 w-full min-w-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {profile?.full_name || "SyncRole User"}
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/80">
                <Briefcase className="w-3.5 h-3.5 text-purple-600" /> {profile?.target_role || "Targeting Role"}
              </span>
              {profile?.dream_companies?.[0] && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/80">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" /> {profile.dream_companies[0]}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100/90 px-3 py-1 rounded-full border border-slate-200/80">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> {profile?.preferred_location || profile?.city || "Remote"}
              </span>
            </div>
          </div>
          
          {/* Core Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-col items-start justify-center">
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider mb-1 flex items-center gap-1 font-mono">
                <Target className="w-3 h-3 text-emerald-600" /> Readiness
              </p>
              <p className="text-xl font-extrabold text-slate-900">{readiness}%</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-col items-start justify-center">
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider mb-1 flex items-center gap-1 font-mono">
                <Star className="w-3 h-3 text-purple-600" /> Twin Score
              </p>
              <p className="text-xl font-extrabold text-slate-900">{twinScore}%</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-col items-start justify-center">
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider mb-1 flex items-center gap-1 font-mono">
                <Zap className="w-3 h-3 text-amber-500" /> Level
              </p>
              <p className="text-xl font-extrabold text-slate-900">{xpLevel?.level || 1}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-col items-start justify-center">
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider mb-1 flex items-center gap-1 font-mono">
                <Zap className="w-3 h-3 text-orange-500 fill-orange-500" /> Streak
              </p>
              <p className="text-xl font-extrabold text-slate-900">{currentStreak}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex flex-col items-start justify-center col-span-2 sm:col-span-1">
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider mb-1 flex items-center gap-1 font-mono">
                <TrendingUp className="w-3 h-3 text-blue-600" /> Profile
              </p>
              <p className="text-xl font-extrabold text-slate-900">{completionPct}%</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
            <button 
              onClick={onEditClick} 
              className="h-9 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
            >
              <Edit className="w-3.5 h-3.5" /> Edit Profile
            </button>
            <button 
              onClick={onUploadClick} 
              disabled={uploading} 
              className="h-9 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold rounded-xl text-xs border border-slate-200/80 transition-colors flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Upload className="w-3.5 h-3.5 text-slate-600" /> {uploading ? "Wait..." : "Update Resume"}
            </button>
            <a 
              href="#coding-profiles" 
              className="h-9 px-4 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-semibold rounded-xl text-xs border border-slate-200/80 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-slate-600" /> Coding Profiles
            </a>
          </div>
        </div>
      </div>

      {/* Right: AI Coach Guidance Module */}
      <div className="relative xl:w-[320px] shrink-0 bg-gradient-to-br from-purple-50/80 via-indigo-50/50 to-blue-50/40 border border-purple-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider font-mono">
            <Compass className="w-4 h-4 text-purple-600" />
            <span>AI Coach Insight</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider font-mono mb-0.5">Target Goal</p>
              <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-purple-600 shrink-0" /> 
                <span className="truncate">{profile?.target_role || "Software Engineer"} at {profile?.dream_companies?.[0] || "Top Tech"}</span>
              </p>
            </div>

            <div className="bg-white/80 rounded-xl p-3 border border-purple-100 shadow-2xs space-y-1.5">
              <p className="text-[10px] text-amber-800 font-extrabold uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Primary Focus Area
              </p>
              <p className="text-xs font-medium text-slate-700 leading-relaxed">
                Improve your ATS match rate. Update skills and complete a resume review to boost placement readiness.
              </p>
              <div className="pt-2 flex items-center justify-between border-t border-purple-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Est. Impact</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">+8% Readiness</span>
              </div>
            </div>
          </div>
        </div>

        <Link 
          to="/dashboard" 
          className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold h-10 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95"
        >
          <span>Continue Journey</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
});
