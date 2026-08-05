import { motion } from "framer-motion";
import { FileText, ArrowRight, Upload, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ResumeSummaryProps {
  placementStats: any;
  uploading: boolean;
  onUpload: (e: any) => void;
}

export function ResumeSummary({ placementStats, uploading, onUpload }: ResumeSummaryProps) {
  const score = placementStats?.resume_score || 0;
  const hasResume = score > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      id="resume"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Resume Intelligence</h3>
      </div>

      <div className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between hover:bg-slate-800/80 transition-colors">
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
              <FileText className="w-8 h-8 text-indigo-400" />
            </div>
            {hasResume && (
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-1 border-2 border-slate-900">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-1">
              {hasResume ? "Resume is Active" : "Upload Your Resume"}
            </h4>
            <p className="text-sm text-muted-foreground max-w-sm">
              {hasResume 
                ? "Your resume has been analyzed by SyncPilot. Check your detailed ATS report to improve formatting and keywords." 
                : "Upload your latest PDF resume to get an instant ATS score and AI-driven improvement recommendations."}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          {hasResume && (
            <div className="flex flex-col items-center justify-center px-6 py-2 bg-white/5 rounded-2xl border border-white/10 shrink-0">
              <span className="text-[10px] uppercase text-muted-foreground font-semibold mb-0.5">Health Score</span>
              <span className="text-2xl font-bold text-emerald-400">{score}%</span>
            </div>
          )}

          <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
            <Link 
              to="/resume-intelligence"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
            >
              View Full Intelligence <ArrowRight className="w-4 h-4" />
            </Link>
            <label className="w-full sm:w-auto cursor-pointer bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold py-2.5 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" /> {uploading ? "Uploading..." : "Replace Resume"}
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={onUpload} disabled={uploading} />
            </label>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
