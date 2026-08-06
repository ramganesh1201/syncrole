import { motion } from "framer-motion";
import { FileText, ArrowRight, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ResumeSummaryProps {
  placementStats: any;
  uploading: boolean;
  onUpload: (e: any) => void;
}

export function ResumeSummary({ placementStats, uploading, onUpload }: ResumeSummaryProps) {
  const score = placementStats?.resume_score || 0;
  const hasResume = score > 0;
  const lastUpdated = placementStats?.created_at ? new Date(placementStats.created_at).toLocaleDateString() : "Never";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full hover:bg-slate-800/80 transition-colors shadow-xl"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <FileText className="w-6 h-6 text-indigo-400" />
          </div>
          {hasResume ? (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3" /> Active
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <AlertCircle className="w-3 h-3" /> Missing
            </div>
          )}
        </div>
        
        <h4 className="text-lg font-bold text-white mb-1">Resume Intelligence</h4>
        <p className="text-xs text-muted-foreground mb-6 line-clamp-2">
          {hasResume 
            ? "Your resume has been parsed and scored against industry standard ATS systems." 
            : "Upload your resume to get an instant ATS score and improvement recommendations."}
        </p>

        {hasResume && (
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase text-muted-foreground font-bold mb-1">ATS Score</span>
              <span className="text-2xl font-black text-emerald-400">{score}%</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase text-muted-foreground font-bold mb-1">Last Updated</span>
              <span className="text-sm font-bold text-white">{lastUpdated}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 mt-auto pt-4">
        <Link 
          to="/resume-intelligence"
          className="flex-1 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20"
        >
          View Intelligence <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <label className="flex-1 w-full cursor-pointer bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-2 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
          <Upload className="w-3.5 h-3.5" /> {uploading ? "Wait..." : "Replace"}
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={onUpload} disabled={uploading} />
        </label>
      </div>
    </motion.div>
  );
}
