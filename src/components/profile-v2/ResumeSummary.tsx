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
  const hasResume = !!resumeAnalysis;
  const score = resumeAnalysis?.overall_score || resumeAnalysis?.total_score || placementStats?.resume_score || 0;
  
  const dateStr = resumeAnalysis?.created_at || placementStats?.created_at;
  const lastUpdated = dateStr ? new Date(dateStr).toLocaleDateString() : "Never";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs hover:border-slate-300 transition-colors"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-200">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          {hasResume ? (
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Analyzed
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
              <AlertCircle className="w-3 h-3 text-amber-600" /> Missing
            </div>
          )}
        </div>
        
        <div>
          <h4 className="text-base font-bold text-slate-900 font-display">Resume Intelligence</h4>
          <p className="text-xs text-slate-500 leading-relaxed mt-1">
            {hasResume 
              ? "Resume analysis is ready. Your ATS score and AI recommendations are available." 
              : "Upload your resume to get an instant ATS score and targeted AI recommendations."}
          </p>
        </div>

        {hasResume && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase text-slate-500 font-extrabold tracking-wider mb-1 flex items-center gap-1 font-mono">
                <FileSearch className="w-3 h-3 text-purple-600" /> ATS Score
              </span>
              <span className="text-2xl font-extrabold text-slate-900">{score}%</span>
            </div>
            <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-3 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase text-slate-500 font-extrabold tracking-wider mb-1 flex items-center gap-1 font-mono">
                <RefreshCw className="w-3 h-3 text-slate-400" /> Last Updated
              </span>
              <span className="text-xs font-bold text-slate-900">{lastUpdated}</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 mt-4 pt-3 border-t border-slate-100">
        <Link 
          to="/resume-intelligence"
          className="flex-1 w-full h-9 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
        >
          View Full Intelligence <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <label className="flex-1 w-full h-9 cursor-pointer bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/80 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-slate-600" /> {uploading ? "Wait..." : "Replace"}
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={onUpload} disabled={uploading} />
        </label>
      </div>
    </motion.div>
  );
});
