import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Upload, FileText, Github, Edit, MapPin, Briefcase, ChevronRight, Zap, Target, Star, Link as LinkIcon, AlertCircle } from "lucide-react";

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

export function ProfileHero({ 
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
      className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-6 md:p-8 flex flex-col xl:flex-row gap-8 items-stretch mb-10 shadow-2xl"
      id="overview"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-transparent opacity-80" />
      
      {/* Left: Avatar & Identity */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">
        <div className="relative shrink-0 flex flex-col items-center gap-3">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-slate-800 overflow-hidden shadow-xl bg-slate-800 ring-2 ring-white/10">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-indigo-400 bg-slate-800">
                {profile?.full_name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {profile?.availability || "Available"}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">{profile?.full_name || "SyncRole User"}</h1>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-1">
              <span className="flex items-center gap-1.5 text-sm text-indigo-300 font-medium bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/10">
                <Briefcase className="w-3.5 h-3.5" /> {profile?.target_role || "Aspiring Engineer"}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400">
                <MapPin className="w-3.5 h-3.5" /> {profile?.city || "Remote"}
              </span>
            </div>
          </div>
          
          {/* Center: Core Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-start justify-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Target className="w-3 h-3 text-emerald-400" /> Readiness</p>
              <p className="text-xl font-black text-white">{readiness}%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-start justify-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Star className="w-3 h-3 text-purple-400" /> Twin Score</p>
              <p className="text-xl font-black text-white">{twinScore}%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-start justify-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Level</p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl font-black text-white">{xpLevel?.level || 1}</p>
                <p className="text-[10px] text-amber-400/80 font-bold hidden md:block">{levelName}</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-start justify-center">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-orange-400 fill-orange-400" /> Streak</p>
              <div className="flex items-baseline gap-1.5">
                <p className="text-xl font-black text-white">{currentStreak}</p>
                <p className="text-[10px] text-orange-400/80 font-bold hidden md:block">Days</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
            <button onClick={onEditClick} className="bg-white hover:bg-slate-200 text-slate-900 font-bold px-4 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5">
              <Edit className="w-3.5 h-3.5" /> Edit Profile
            </button>
            <button onClick={onUploadClick} disabled={uploading} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" /> {uploading ? "Uploading..." : "Upload Resume"}
            </button>
            <Link to="/resume-intelligence" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Resume Intelligence
            </Link>
            <a href="#coding-profiles" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Right: AI Career Summary Card */}
      <div className="relative xl:w-72 shrink-0 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-indigo-500/20 p-1.5 rounded-md border border-indigo-500/30">
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-white">AI Career Summary</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-indigo-300/80 uppercase font-bold tracking-wide">Current Status</p>
              <p className="text-xs font-medium text-indigo-100 mt-0.5 leading-relaxed">
                You are {readiness}% ready for a {profile?.target_role || "role"} at {profile?.dream_companies?.[0] || "Top Tech Companies"}.
              </p>
            </div>
            
            <div className="bg-black/20 rounded-lg p-3 border border-black/20">
              <p className="text-[10px] text-amber-400/80 uppercase font-bold tracking-wide flex items-center gap-1 mb-1">
                <AlertCircle className="w-3 h-3" /> Biggest Opportunity
              </p>
              <p className="text-xs font-medium text-white leading-relaxed">
                Your ATS formatting is dragging down your readiness. Fix margins and add Docker.
              </p>
            </div>
          </div>
        </div>
        
        <Link to="/dashboard" className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20">
          Continue Career Journey <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
