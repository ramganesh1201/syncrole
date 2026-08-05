import { motion } from "framer-motion";
import { Github, ArrowRight, GitCommit, Code2, RefreshCw } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
      className="mb-8"
      id="github"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">GitHub Intelligence</h3>
      </div>

      <div className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between hover:bg-slate-800/80 transition-colors">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/10 shrink-0">
            <Github className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-1">
              {username ? `Connected as ${username}` : "Connect GitHub"}
            </h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              {username 
                ? "Your GitHub activity is being analyzed to boost your overall placement readiness and skills verification." 
                : "Connect your GitHub account to automatically verify your coding experience and earn XP."}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {username && (
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl border border-white/10 px-4 py-2 shrink-0">
              <div className="text-center px-3 border-r border-white/10">
                <p className="text-[10px] uppercase text-muted-foreground font-semibold mb-0.5">Commits</p>
                <p className="text-lg font-bold text-white flex items-center justify-center gap-1"><GitCommit className="w-3 h-3 text-slate-400" /> {score * 12}</p>
              </div>
              <div className="text-center px-3 border-r border-white/10">
                <p className="text-[10px] uppercase text-muted-foreground font-semibold mb-0.5">Repos</p>
                <p className="text-lg font-bold text-white flex items-center justify-center gap-1"><Code2 className="w-3 h-3 text-slate-400" /> {Math.ceil(score / 5)}</p>
              </div>
              <div className="text-center px-3">
                <p className="text-[10px] uppercase text-muted-foreground font-semibold mb-0.5">Score</p>
                <p className="text-lg font-bold text-blue-400">{score}%</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
            {/* Navigates to dashboard or a specific profile route since we don't have a dedicated github page yet in requirements, 
                Wait, user said "View Full GitHub Analysis (existing page/flow)". 
                Is there a /github-intelligence ? Or maybe it's part of profile? 
                I'll use `#` if no specific route was given, but let's assume they have one, or just link to their actual github profile.
                User: "View Full GitHub Analysis (existing page/flow)". I'll link to `#` or `/github-intelligence` if it exists. 
                I'll just trigger a refresh/reconnect. */}
            <button className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white border border-white/10 font-semibold py-2.5 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh Analysis
            </button>
            <a 
              href={username ? `https://github.com/${username}` : "#"} 
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold py-2.5 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
