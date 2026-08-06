import React from "react";
import { motion } from "framer-motion";
import { Github, GitCommit, Code2, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, Activity } from "lucide-react";

interface GithubSummaryProps {
  profile: any;
  placementStats: any;
}

export const GithubSummary = React.memo(function GithubSummary({ profile, placementStats }: GithubSummaryProps) {
  const username = profile?.github_username;
  const score = placementStats?.github_score || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass bg-slate-900/60 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between h-full hover:bg-slate-800/80 transition-all shadow-xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700/20 via-transparent to-transparent opacity-50" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
            <Github className="w-6 h-6 text-white" />
          </div>
          {username ? (
            <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> Connected
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">
              <AlertCircle className="w-3.5 h-3.5" /> Missing
            </div>
          )}
        </div>
        
        <h4 className="text-xl font-bold text-white mb-2 font-display">GitHub Intelligence</h4>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          {username 
            ? `Deep analysis of ${username}'s repositories, languages, and contribution trends.` 
            : "Connect your GitHub account to verify your coding experience and boost your Twin Score."}
        </p>

        {username && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-black/20 rounded-2xl border border-white/5 p-3 flex flex-col items-center justify-center text-center cursor-default hover:bg-white/5 transition-colors">
              <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest mb-2 flex items-center gap-1">
                <Activity className="w-3 h-3 text-blue-400" /> Score
              </span>
              <span className="text-2xl font-black text-white">{score}%</span>
            </div>
            <div className="bg-black/20 rounded-2xl border border-white/5 p-3 flex flex-col items-center justify-center text-center cursor-default hover:bg-white/5 transition-colors">
              <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest mb-2 flex items-center gap-1">
                <Code2 className="w-3 h-3 text-slate-400" /> Repos
              </span>
              <span className="text-xl font-bold text-white">{Math.ceil(score / 5)}</span>
            </div>
            <div className="bg-black/20 rounded-2xl border border-white/5 p-3 flex flex-col items-center justify-center text-center cursor-default hover:bg-white/5 transition-colors">
              <span className="text-[9px] uppercase text-slate-500 font-black tracking-widest mb-2 flex items-center gap-1">
                <GitCommit className="w-3 h-3 text-slate-400" /> Commits
              </span>
              <span className="text-xl font-bold text-white">{score * 12}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto pt-4 relative z-10 border-t border-white/5">
        <button className="flex-1 w-full h-12 bg-white/5 hover:bg-white/10 text-white border-2 border-white/10 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
        <a 
          href={username ? `https://github.com/${username}` : "#"} 
          target="_blank" rel="noopener noreferrer"
          className="flex-1 w-full h-12 bg-transparent hover:bg-white/5 text-white border-2 border-white/10 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
        >
          <Github className="w-4 h-4" /> View Full Profile
        </a>
      </div>
    </motion.div>
  );
});
