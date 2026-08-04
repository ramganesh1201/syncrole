import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Github, Brain, Sparkles, ArrowRight, Activity, Upload, CheckCircle2 } from "lucide-react";
import { UserCareerContext } from "@/lib/career-intelligence";

interface UnifiedCareerAssetsProps {
  latest: any;
  resume: any;
  gh: any;
  uploading: boolean;
  onUploadResume: (e: any) => void;
  onAnalyzeGitHub: () => void;
}

export function UnifiedCareerAssets({
  latest,
  resume,
  gh,
  uploading,
  onUploadResume,
  onAnalyzeGitHub,
}: UnifiedCareerAssetsProps) {
  const [activeTab, setActiveTab] = useState<"resume" | "dsa" | "github" | "skills">("resume");

  return (
    <div className="glass rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-accent" /> Unified Career Assets Hub
          </div>
          <h3 className="text-xl font-display font-bold text-white">
            Core Technical Qualifications
          </h3>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 glass p-1 rounded-xl border border-white/10">
          {[
            { id: "resume", label: "Resume Intelligence", icon: FileText, score: resume?.ats_score ?? latest.resume_score },
            { id: "dsa", label: "DSA Command Center", icon: Brain, score: latest.dsa_score },
            { id: "github", label: "GitHub Analysis", icon: Github, score: gh?.score ?? latest.github_score },
            { id: "skills", label: "Skill Builder", icon: Sparkles, score: latest.skill_score },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-aurora text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="text-[10px] opacity-80 font-mono">({tab.score}%)</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === "resume" && (
          <motion.div
            key="resume"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-8 space-y-3">
              <div className="text-xs uppercase text-muted-foreground font-semibold">ATS Resume Match</div>
              <h4 className="text-2xl font-bold text-white">
                {resume ? `Resume ATS Score: ${resume.ats_score || resume.total_score || 0}%` : "No Resume Uploaded Yet"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {resume
                  ? "Your resume has been analyzed against ATS standards. Keyword alignment and structural formatting are verified."
                  : "Upload your resume to calculate ATS keyword matches and unlock custom career recommendations."}
              </p>

              {resume?.missing_skills?.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-white/80 font-medium mr-1">Missing Keywords:</span>
                  {resume.missing_skills.slice(0, 4).map((k: string, i: number) => (
                    <span key={i} className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-xs">
                      {k}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-4 flex justify-end">
              {resume ? (
                <Link
                  to="/resume-intelligence"
                  className="w-full text-center py-3 text-sm font-semibold bg-aurora text-primary-foreground rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  View Full ATS Breakdown <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <label className="w-full text-center py-3 text-sm font-semibold bg-aurora text-primary-foreground rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Upload Resume PDF"}
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onUploadResume} disabled={uploading} />
                </label>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === "dsa" && (
          <motion.div
            key="dsa"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-8 space-y-3">
              <div className="text-xs uppercase text-muted-foreground font-semibold">Algorithmic Mastery</div>
              <h4 className="text-2xl font-bold text-white">DSA Readiness Score: {latest.dsa_score}%</h4>
              <p className="text-sm text-muted-foreground">
                Target company technical rounds prioritize Graph Traversal, Dynamic Programming, and Arrays/Strings.
              </p>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <Link
                to="/dashboard/dsa"
                className="w-full text-center py-3 text-sm font-semibold bg-aurora text-primary-foreground rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Open DSA Command Center <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {activeTab === "github" && (
          <motion.div
            key="github"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-8 space-y-3">
              <div className="text-xs uppercase text-muted-foreground font-semibold">Open Source & Code Quality</div>
              <h4 className="text-2xl font-bold text-white">
                {gh ? `GitHub Score: ${gh.score || 0}%` : "GitHub Not Linked"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {gh
                  ? `Repos: ${gh.repo_count || 0} • Stars: ${gh.star_count || 0} • Followers: ${gh.follower_count || 0}`
                  : "Link your GitHub username in your profile to analyze open source activity and repository quality."}
              </p>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <button
                onClick={onAnalyzeGitHub}
                className="w-full text-center py-3 text-sm font-semibold bg-aurora text-primary-foreground rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" /> {gh ? "Re-Analyze GitHub" : "Connect GitHub"}
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "skills" && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid md:grid-cols-12 gap-6 items-center"
          >
            <div className="md:col-span-8 space-y-3">
              <div className="text-xs uppercase text-muted-foreground font-semibold">Competency Alignment</div>
              <h4 className="text-2xl font-bold text-white">Skill Score: {latest.skill_score}%</h4>
              <p className="text-sm text-muted-foreground">
                Add frameworks, core CS concepts, and languages to your profile to continuously align with target roles.
              </p>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <Link
                to="/profile"
                className="w-full text-center py-3 text-sm font-semibold bg-aurora text-primary-foreground rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Manage Profile Skills <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
