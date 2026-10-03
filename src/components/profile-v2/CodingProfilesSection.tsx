import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Code2, Globe, CheckCircle2, XCircle, Link2, ExternalLink, RefreshCw } from "lucide-react";

interface CodingProfilesSectionProps {
  profile: any;
  onEditClick: () => void;
}

export const CodingProfilesSection = React.memo(function CodingProfilesSection({ profile, onEditClick }: CodingProfilesSectionProps) {
  const profiles = [
    { 
      id: "linkedin", 
      name: "LinkedIn", 
      value: profile?.linkedin, 
      icon: Linkedin, 
      color: "text-blue-600 bg-blue-50 border-blue-200",
      benefit: "Increases visibility to tech recruiters."
    },
    { 
      id: "leetcode", 
      name: "LeetCode", 
      value: profile?.leetcode, 
      icon: Code2, 
      color: "text-orange-600 bg-orange-50 border-orange-200",
      benefit: "Validates DSA and problem-solving skills."
    },
    { 
      id: "codeforces", 
      name: "Codeforces", 
      value: profile?.codeforces, 
      icon: Globe, 
      color: "text-rose-600 bg-rose-50 border-rose-200",
      benefit: "Demonstrates competitive programming logic."
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      id="coding-profiles"
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Coding Profiles</h2>
          <p className="text-xs text-slate-500 font-medium">Link external platforms to automatically verify your technical credibility.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isConnected = !!p.value;
          
          return (
            <div 
              key={p.id}
              className={`bg-white border rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-colors ${
                isConnected 
                  ? "border-slate-200/90 hover:border-slate-300" 
                  : "border-slate-200 border-dashed hover:border-slate-300 bg-slate-50/50"
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    isConnected ? p.color : "bg-slate-100 border-slate-200 text-slate-400"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  {isConnected ? (
                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border border-slate-200">
                      <XCircle className="w-3 h-3 text-slate-400" /> Missing
                    </div>
                  )}
                </div>
                
                <div>
                  <h4 className={`font-bold text-base ${isConnected ? "text-slate-900" : "text-slate-700"}`}>{p.name}</h4>
                  {isConnected ? (
                    <p className="text-xs font-semibold text-purple-700 truncate">{p.value.replace(/https?:\/\/(www\.)?/, '')}</p>
                  ) : (
                    <p className="text-[11px] font-medium text-slate-500 leading-relaxed">{p.benefit}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                {isConnected ? (
                  <>
                    <button className="flex-1 h-9 bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/80 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                      <RefreshCw className="w-3.5 h-3.5 text-slate-600" /> Sync
                    </button>
                    <a 
                      href={p.value.startsWith('http') ? p.value : `https://${p.value}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 h-9 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </a>
                  </>
                ) : (
                  <button onClick={onEditClick} className="w-full h-9 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-slate-800 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                    <Link2 className="w-3.5 h-3.5 text-slate-600" /> Connect {p.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});
