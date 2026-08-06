import { motion } from "framer-motion";
import { Github, GitCommit, Code2, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

interface GithubSummaryProps {
  profile: any;
  placementStats: any;
}

export function GithubSummary({ profile, placementStats }: GithubSummaryProps) {
  const username = profile?.github_username;
  const score = placementStats?.github_score || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full hover:bg-slate-800/80 transition-colors shadow-xl"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/10">
            <Github className="w-6 h-6 text-white" />
          </div>
          {username ? (
            <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3" /> Connected
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <AlertCircle className="w-3 h-3" /> Missing
            </div>
          )}
        </div>
        
        <h4 className="text-lg font-bold text-white mb-1">GitHub Intelligence</h4>
        <p className="text-xs text-muted-foreground mb-6 line-clamp-2">
          {username 
            ? `Analyzing repositories and commit history for ${username}.` 
            : "Connect your GitHub account to verify your coding experience."}
        </p>

        {username && (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Score</span>
              <span className="text-xl font-black text-blue-400">{score}%</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Repos</span>
              <span className="text-lg font-bold text-white flex items-center justify-center gap-1"><Code2 className="w-3 h-3 text-slate-400" /> {Math.ceil(score / 5)}</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Commits</span>
              <span className="text-lg font-bold text-white flex items-center justify-center gap-1"><GitCommit className="w-3 h-3 text-slate-400" /> {score * 12}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 mt-auto pt-4">
        <button className="flex-1 w-full bg-slate-800 hover:bg-slate-700 text-white border border-white/10 font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-black/20">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
        <a 
          href={username ? `https://github.com/${username}` : "#"} 
          target="_blank" rel="noopener noreferrer"
          className="flex-1 w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
        >
          <Github className="w-3.5 h-3.5" /> View Profile
        </a>
      </div>
    </motion.div>
  );
}
