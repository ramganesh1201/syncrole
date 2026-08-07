import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Upload, CheckCircle2, AlertCircle, FileSearch, RefreshCw } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ResumeSummaryProps {
  placementStats: any;
  resumeAnalysis?: any;
  uploading: boolean;
  onUpload: (e: any) => void;
}

export const ResumeSummary = React.memo(function ResumeSummary({ placementStats, resumeAnalysis, uploading, onUpload }: ResumeSummaryProps) {
  // Use resumeAnalysis as the primary source of truth, matching the actual Resume Intelligence page
  const hasResume = !!resumeAnalysis;
  const score = resumeAnalysis?.overall_score || resumeAnalysis?.total_score || placementStats?.resume_score || 0;
  
  // Use the created_at from whichever source has the resume data
  const dateStr = resumeAnalysis?.created_at || placementStats?.created_at;
  const lastUpdated = dateStr ? new Date(dateStr).toLocaleDateString() : "Never";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass bg-slate-900/60 border border-white/10 rounded-[32px] p-8 flex flex-col justify-between h-full hover:bg-slate-800/80 transition-all shadow-xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-50" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 shadow-inner">
            <FileText className="w-6 h-6 text-indigo-400" />
          </div>
          {hasResume ? (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> Analyzed
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">
              <AlertCircle className="w-3.5 h-3.5" /> Missing
            </div>
          )}
        </div>
        
        <h4 className="text-xl font-bold text-white mb-2 font-display">Resume Intelligence</h4>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          {hasResume 
            ? "Resume analysis is ready. Your ATS score and AI recommendations are available." 
            : "Upload your resume to get an instant ATS score and targeted AI improvement recommendations."}
        </p>

        {hasResume && (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/20 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-center cursor-default hover:bg-white/5 transition-colors">
              <span className="text-[10px] uppercase text-muted-foreground font-black tracking-widest mb-2 flex items-center gap-1.5">
                <FileSearch className="w-3.5 h-3.5 text-indigo-400" /> ATS Score
              </span>
              <span className="text-3xl font-black text-white">{score}%</span>
            </div>
            <div className="bg-black/20 rounded-2xl border border-white/5 p-4 flex flex-col items-center justify-center text-center cursor-default hover:bg-white/5 transition-colors">
              <span className="text-[10px] uppercase text-muted-foreground font-black tracking-widest mb-2 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" /> Last Updated
              </span>
              <span className="text-lg font-bold text-white">{lastUpdated}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 mt-auto pt-4 relative z-10 border-t border-white/5">
        <Link 
          to="/resume-intelligence"
          className="flex-1 w-full h-12 bg-transparent hover:bg-white/5 text-white border-2 border-white/10 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
        >
          View Full Intelligence <ArrowRight className="w-4 h-4" />
        </Link>
        <label className="flex-1 w-full h-12 cursor-pointer bg-white/5 hover:bg-white/10 text-white border-2 border-white/10 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2">
          <Upload className="w-4 h-4" /> {uploading ? "Wait..." : "Replace"}
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={onUpload} disabled={uploading} />
        </label>
      </div>
    </motion.div>
  );
});
