import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Upload, FileText, Github, Edit, MapPin, Briefcase, Calendar, Map, CheckCircle } from "lucide-react";

interface ProfileHeroProps {
  profile: any;
  placementStats: any;
  completionPct: number;
  uploading: boolean;
  onEditClick: () => void;
  onUploadClick: () => void;
}

export function ProfileHero({ 
  profile, 
  placementStats, 
  completionPct, 
  uploading, 
  onEditClick, 
  onUploadClick 
}: ProfileHeroProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-slate-900/60 border border-white/10 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center backdrop-blur-xl mb-8"
      id="overview"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-50" />
      
      {/* Avatar Section */}
      <div className="relative shrink-0 flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-slate-900 overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-slate-800">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-indigo-400">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
          )}
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-full" />
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {profile?.availability || "Open to Opportunities"}
        </div>
      </div>

      {/* Identity Info */}
      <div className="relative flex-1 text-center md:text-left space-y-5">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{profile?.full_name || "SyncRole User"}</h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-300 font-medium">
            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-indigo-400" /> {profile?.target_role || "Aspiring Engineer"}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-indigo-400" /> {profile?.city || "Remote"}</span>
          </div>
        </div>
        
        {/* Core Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:bg-white/10 transition-colors">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Profile Completion</p>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-white">{completionPct}%</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:bg-white/10 transition-colors">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Overall Readiness</p>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-emerald-400">{placementStats?.total_score || 0}%</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:bg-white/10 transition-colors">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Career Twin Score</p>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold text-purple-400">{(placementStats?.total_score ? Math.min(99, placementStats.total_score + 12) : 0)}%</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:bg-white/10 transition-colors">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1 font-semibold">Dream Company</p>
            <p className="text-sm font-bold text-white truncate pt-1">{profile?.dream_companies?.[0] || "Undecided"}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
          <button onClick={onEditClick} className="bg-white text-slate-900 hover:bg-slate-200 font-semibold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg shadow-white/10">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
          <button onClick={onUploadClick} disabled={uploading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/25 disabled:opacity-50">
            <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Resume"}
          </button>
          <Link to="/resume-intelligence" className="bg-slate-800 hover:bg-slate-700 text-white border border-white/10 font-semibold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" /> Resume Intelligence
          </Link>
          <a href="#github" className="bg-slate-800 hover:bg-slate-700 text-white border border-white/10 font-semibold px-4 py-2 rounded-xl text-sm transition-colors flex items-center gap-2">
            <Github className="w-4 h-4" /> View GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
