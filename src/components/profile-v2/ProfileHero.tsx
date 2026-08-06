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
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[32px] bg-slate-900 border border-white/10 p-6 md:p-10 flex flex-col xl:flex-row gap-10 items-stretch mb-10 shadow-2xl"
      id="overview"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-transparent opacity-80" />
      
      {/* Left: Avatar & Identity */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 flex-1">
        <div className="relative shrink-0 flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-slate-800 overflow-hidden shadow-2xl bg-slate-800 ring-2 ring-white/10">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-indigo-400 bg-slate-800">
                {profile?.full_name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {profile?.availability || "Available"}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-6 w-full">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-2">{profile?.full_name || "SyncRole User"}</h1>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 flex-wrap">
              <span className="flex items-center gap-2 text-sm text-indigo-300 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                <Briefcase className="w-4 h-4" /> {profile?.target_role || "Targeting Role"}
              </span>
              {profile?.dream_companies?.[0] && (
                <span className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                  <Building2 className="w-4 h-4 text-slate-400" /> {profile.dream_companies[0]}
                </span>
              )}
              <span className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                <MapPin className="w-4 h-4 text-slate-400" /> {profile?.preferred_location || profile?.city || "Remote"}
              </span>
            </div>
          </div>
          
          {/* Center: Core Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-start justify-center shadow-inner hover:bg-white/10 transition-colors cursor-default">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1.5 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-emerald-400" /> Readiness</p>
              <p className="text-2xl font-black text-white">{readiness}%</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-start justify-center shadow-inner hover:bg-white/10 transition-colors cursor-default">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1.5 flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-purple-400" /> Twin Score</p>
              <p className="text-2xl font-black text-white">{twinScore}%</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-start justify-center shadow-inner hover:bg-white/10 transition-colors cursor-default">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1.5 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Level</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-black text-white">{xpLevel?.level || 1}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-start justify-center shadow-inner hover:bg-white/10 transition-colors cursor-default">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1.5 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-orange-400 fill-orange-400" /> Streak</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-black text-white">{currentStreak}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col items-start justify-center shadow-inner hover:bg-white/10 transition-colors cursor-default">
              <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1.5 flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-blue-400" /> Profile</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-black text-white">{completionPct}%</p>
              </div>
            </div>
          </div>

          {/* Quick Actions (Ghost & Outline only) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <button onClick={onEditClick} className="h-10 px-5 bg-transparent border-2 border-white/10 hover:border-white/30 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-2">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
            <button onClick={onUploadClick} disabled={uploading} className="h-10 px-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" /> {uploading ? "Wait..." : "Update Resume"}
            </button>
            <a href="#coding-profiles" className="h-10 px-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> Profiles
            </a>
          </div>
        </div>
      </div>

      {/* Right: AI Career Summary Card */}
      <div className="relative xl:w-[340px] shrink-0 bg-indigo-950/40 border border-indigo-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-xl backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-indigo-500/20 p-2 rounded-xl border border-indigo-500/40">
              <Compass className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">AI Coach Insight</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-indigo-300/80 uppercase font-bold tracking-widest mb-1">Current Goal</p>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-indigo-400" /> {profile?.target_role || "Software Engineer"} at {profile?.dream_companies?.[0] || "Top Tech"}
              </p>
            </div>
            
            <div className="bg-black/30 rounded-xl p-4 border border-white/5">
              <p className="text-[10px] text-amber-400/90 uppercase font-black tracking-widest flex items-center gap-1.5 mb-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> Biggest Opportunity
              </p>
              <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                Improve your ATS match rate. Adjust formatting and add Docker to increase readiness.
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Gain</span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">+8% Readiness</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* ONE Primary Button */}
        <Link 
          to="/dashboard" 
          className="relative z-10 mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold h-12 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-white/10"
        >
          Continue Career Journey <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
});
