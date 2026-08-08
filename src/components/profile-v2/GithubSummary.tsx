import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Code2, RefreshCw, CheckCircle2, AlertCircle, Activity, Star, GitFork, ExternalLink, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface GithubSummaryProps {
  profile: any;
  placementStats: any;
  githubAnalysis?: any;
}

export const GithubSummary = React.memo(function GithubSummary({ profile, placementStats, githubAnalysis }: GithubSummaryProps) {
  const username = profile?.github_username;
  const [refreshing, setRefreshing] = useState(false);

  // Fallback to old behavior if githubAnalysis hasn't been fetched yet
  const score = githubAnalysis?.score ?? placementStats?.github_score ?? 0;
  
  const handleRefresh = async () => {
    if (!username) return;
    setRefreshing(true);
    toast.loading("Re-analyzing GitHub...", { id: "gh-refresh" });
    try {
      const [userRes, repoRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`).then((r) => r.json()),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then((r) => r.json()),
      ]);
      if (userRes.message === "Not Found") throw new Error("GitHub user not found");
      if (userRes.message && userRes.message.includes("API rate limit")) throw new Error("GitHub temporarily limited this analysis. Please try again later.");

      const allRepos = Array.isArray(repoRes) ? repoRes : [];
      const analyzedRepos = allRepos.filter(r => !r.fork);
      
      const stars = analyzedRepos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
      const langs: Record<string, number> = {};
      let reposWithDocs = 0;
      let recentlyUpdated = 0;
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      const normalizedRepos = analyzedRepos.map(r => {
        if (r.language) langs[r.language] = (langs[r.language] ?? 0) + 1;
        if (r.description || r.has_wiki) reposWithDocs++;
        if (new Date(r.updated_at) > thirtyDaysAgo) recentlyUpdated++;
        
        return {
          name: r.name,
          description: r.description,
          url: r.html_url,
          homepage: r.homepage,
          language: r.language,
          topics: r.topics || [],
          stars: r.stargazers_count ?? 0,
          forks: r.forks_count ?? 0,
          updated_at: r.updated_at
        };
      });

      const projectQuality = Math.min(100, Math.round((stars * 10) + (analyzedRepos.length * 2)));
      const activityScore = Math.min(100, Math.round((recentlyUpdated / (analyzedRepos.length || 1)) * 100 + recentlyUpdated * 5));
      const docScore = Math.min(100, Math.round((reposWithDocs / (analyzedRepos.length || 1)) * 100));
      const techDepth = Math.min(100, Math.round(Object.keys(langs).length * 15 + Math.max(0, ...Object.values(langs)) * 10));
      
      const healthScore = Math.round((projectQuality + activityScore + docScore + techDepth) / 4) || 0;

      const strengths = [];
      const weaknesses = [];
      if (stars >= 10) strengths.push(`Recognized projects (${stars} total stars)`);
      if (recentlyUpdated >= 3) strengths.push("Consistent recent activity");
      if (Object.keys(langs).length >= 4) strengths.push("Broad technology exposure");
      if (docScore < 50) weaknesses.push("Many repositories lack descriptions or documentation");
      if (recentlyUpdated === 0) weaknesses.push("No recent repository activity");
      
      const recommendations = [];
      if (docScore < 70) recommendations.push("Improve README documentation: Add project overview, setup instructions and screenshots.");
      if (recentlyUpdated < 2) recommendations.push("Maintain recent activity: Continue improving existing projects.");
      if (stars < 5) recommendations.push("Increase project presentation: Add live demos to your strongest projects.");

      const { data: u } = await supabase.auth.getUser();
      if (!u?.user) throw new Error("Not authenticated");

      await supabase.from("github_analysis").upsert({
        user_id: u.user.id,
        username,
        repo_count: userRes.public_repos ?? 0,
        star_count: stars,
        follower_count: userRes.followers ?? 0,
        languages: langs,
        repositories: normalizedRepos,
        score: healthScore,
        strengths: strengths.length ? strengths : ["Not enough GitHub activity data to confidently identify this strength."],
        weaknesses,
        recommendations,
        analyzed_at: new Date().toISOString(),
      });

      toast.success("GitHub analysis updated. Please refresh the page.", { id: "gh-refresh" });
    } catch (err: any) {
      toast.error(err.message || "Failed to refresh GitHub data", { id: "gh-refresh" });
    } finally {
      setRefreshing(false);
    }
  };

  const getSortedRepos = () => {
    if (!githubAnalysis?.repositories || !Array.isArray(githubAnalysis.repositories)) return [];
    return [...githubAnalysis.repositories]
      .sort((a, b) => {
        // Priority: Stars -> Recent Activity -> Has Desc
        if (b.stars !== a.stars) return b.stars - a.stars;
        const aDate = new Date(a.updated_at).getTime();
        const bDate = new Date(b.updated_at).getTime();
        return bDate - aDate;
      })
      .slice(0, 3);
  };

  const getTopLanguages = () => {
    if (!githubAnalysis?.languages) return [];
    const total = Object.values(githubAnalysis.languages as Record<string, number>).reduce((a, b) => a + b, 0);
    if (total === 0) return [];
    
    return Object.entries(githubAnalysis.languages as Record<string, number>)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang, count]) => ({
        lang,
        pct: Math.round((count / total) * 100)
      }));
  };

  const topRepos = getSortedRepos();
  const topLanguages = getTopLanguages();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass bg-slate-900/60 border border-white/10 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between h-full hover:bg-slate-800/80 transition-all shadow-xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700/20 via-transparent to-transparent opacity-50" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white font-display flex items-center gap-2">
                GitHub Intelligence
              </h4>
              {username ? (
                <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  @{username}
                  <span className="flex items-center gap-1 text-blue-400 text-[10px] uppercase font-bold tracking-wider ml-2 px-2 py-0.5 bg-blue-500/10 rounded-full border border-blue-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Analyzed
                  </span>
                </div>
              ) : (
                <div className="text-sm text-amber-400 flex items-center gap-1.5 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Not Connected
                </div>
              )}
            </div>
          </div>
          
          {username && githubAnalysis?.analyzed_at && (
            <div className="text-[10px] text-muted-foreground text-right">
              Last analyzed<br/>
              {new Date(githubAnalysis.analyzed_at).toLocaleDateString()}
            </div>
          )}
        </div>

        {!username ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[250px]">
              Connect your GitHub account to unlock real-time repository intelligence and recruiter signals.
            </p>
          </div>
        ) : !githubAnalysis ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center py-8">
            <div className="w-8 h-8 border-4 border-white/10 border-t-white/60 rounded-full animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Loading analysis...</p>
          </div>
        ) : (
          <div className="space-y-6 flex-1">
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs text-white font-medium">{score}/100 Health</span>
              </div>
              <div className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs text-white font-medium">{githubAnalysis.repo_count ?? 0} Public Repos</span>
              </div>
              <div className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs text-white font-medium">{githubAnalysis.star_count ?? 0} Stars</span>
              </div>
            </div>

            {/* Featured Repositories */}
            {topRepos.length > 0 && (
              <div>
                <div className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-3">Featured Repositories</div>
                <div className="space-y-2">
                  {topRepos.map((repo, i) => (
                    <a key={i} href={repo.url} target="_blank" rel="noopener noreferrer" className="block bg-black/20 hover:bg-white/5 border border-white/5 rounded-xl p-3 transition-colors group">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{repo.name}</span>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          {repo.stars > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400" />{repo.stars}</span>}
                          {repo.forks > 0 && <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks}</span>}
                        </div>
                      </div>
                      {repo.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{repo.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                        {repo.language && <span className="text-blue-300">{repo.language}</span>}
                        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Two Column Footer: Tech & Signal */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-2">Technology Profile</div>
                {topLanguages.length > 0 ? (
                  <div className="space-y-1.5">
                    {topLanguages.map((l, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <span className="text-white font-medium">{l.lang}</span>
                        <span className="text-slate-400">{l.pct}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">Data unavailable</span>
                )}
              </div>
              
              <div>
                <div className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Recruiter Signal
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                  {githubAnalysis?.recommendations?.[0] || githubAnalysis?.strengths?.[0] || "Not enough GitHub data to generate a reliable recruiter assessment."}
                </p>
              </div>
            </div>
            
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-4 relative z-10 border-t border-white/5">
        <button 
          onClick={handleRefresh}
          disabled={!username || refreshing}
          className="flex-1 w-full h-11 bg-white/5 hover:bg-white/10 text-white border-2 border-white/10 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> 
          {refreshing ? "Analyzing..." : "Refresh Analysis"}
        </button>
        <a 
          href={username ? `https://github.com/${username}` : "#"} 
          target="_blank" rel="noopener noreferrer"
          className="flex-1 w-full h-11 bg-transparent hover:bg-white/5 text-white border-2 border-white/10 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-3.5 h-3.5" /> View GitHub Profile
        </a>
      </div>
    </motion.div>
  );
});
