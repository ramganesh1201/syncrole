import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, FileText, Github, Brain, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { UserCareerContext } from "@/lib/career-intelligence";

interface CareerHealthOverviewProps {
  latest: any;
  resume: any;
  gh: any;
  userContext: UserCareerContext;
}

export function CareerHealthOverview({
  latest,
  resume,
  gh,
  userContext,
}: CareerHealthOverviewProps) {
  const getHealthBadge = (score: number) => {
    if (score >= 75) return { label: "Optimal", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    if (score >= 50) return { label: "Moderate", color: "text-amber-300 bg-amber-500/10 border-amber-500/20" };
    return { label: "Needs Focus", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
  };

  const resumeScore = resume?.ats_score ?? latest.resume_score ?? 0;
  const dsaScore = latest.dsa_score ?? 0;
  const githubScore = gh?.score ?? latest.github_score ?? 0;
  const skillScore = latest.skill_score ?? 0;

  const items = [
    {
      id: "resume",
      title: "Resume & ATS Health",
      score: resumeScore,
      health: getHealthBadge(resumeScore),
      description: resume ? `ATS Score: ${resumeScore}% • Keyword Match Verified` : "No resume uploaded yet",
      route: "/resume-intelligence",
      actionLabel: "View Resume Analysis",
      icon: FileText,
    },
    {
      id: "dsa",
      title: "DSA & Problem Solving",
      score: dsaScore,
      health: getHealthBadge(dsaScore),
      description: `Algorithmic Score: ${dsaScore}% • Core CS Fundamentals`,
      route: "/dashboard/dsa",
      actionLabel: "Open DSA Command Center",
      icon: Brain,
    },
    {
      id: "github",
      title: "GitHub & Open Source",
      score: githubScore,
      health: getHealthBadge(githubScore),
      description: gh ? `Score: ${githubScore}% • ${gh.repo_count || 0} Repos • ${gh.star_count || 0} Stars` : "GitHub profile not connected",
      route: "/profile",
      actionLabel: "View GitHub Settings",
      icon: Github,
    },
    {
      id: "skills",
      title: "Skill Competency Match",
      score: skillScore,
      health: getHealthBadge(skillScore),
      description: `Skill Score: ${skillScore}% • Target Role Alignment`,
      route: "/profile",
      actionLabel: "Edit Profile Skills",
      icon: Sparkles,
    },
  ];

  return (
    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
            <Activity className="w-4 h-4 text-accent" /> Concise Career Health Overview
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            Single Source Technical Health
          </h3>
        </div>

        <span className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/10">
          Progressive Disclosure
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="glass rounded-2xl p-5 border border-white/5 space-y-3 hover:border-white/15 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center text-white">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{item.title}</div>
                  <div className="text-[11px] text-muted-foreground">{item.description}</div>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${item.health.color}`}>
                {item.health.label}
              </span>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-white">{item.score}% Readiness</span>
              <Link
                to={item.route}
                className="text-xs font-semibold text-aurora hover:underline inline-flex items-center gap-1"
              >
                {item.actionLabel} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
