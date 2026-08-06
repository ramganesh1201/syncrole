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
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      benefit: "Increases visibility to tech recruiters."
    },
    { 
      id: "leetcode", 
      name: "LeetCode", 
      value: profile?.leetcode, 
      icon: Code2, 
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      benefit: "Validates DSA and problem-solving skills."
    },
    { 
      id: "codeforces", 
      name: "Codeforces", 
      value: profile?.codeforces, 
      icon: Globe, 
      color: "text-red-400 bg-red-500/10 border-red-500/20",
      benefit: "Demonstrates competitive programming logic."
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="coding-profiles"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 font-display">Coding Profiles</h2>
          <p className="text-sm text-muted-foreground font-medium">Link external platforms to automatically verify your technical credibility.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isConnected = !!p.value;
          
          return (
            <div 
              key={p.id}
              className={`glass border rounded-[24px] p-6 flex flex-col justify-between h-[240px] transition-all group relative overflow-hidden shadow-lg ${
                isConnected 
                  ? "bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-800/80" 
                  : "bg-slate-900/30 border-white/5 border-dashed hover:border-white/20"
              }`}
            >
              {isConnected && (
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              )}
              
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    isConnected ? p.color : "bg-black/30 border-white/5 text-slate-500"
                  } transition-transform group-hover:scale-105 shadow-inner`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {isConnected ? (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-slate-800/50 text-slate-400 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border border-white/5">
                      <XCircle className="w-3 h-3" /> Missing
                    </div>
                  )}
                </div>
                
                <h4 className={`font-bold text-lg mb-1 ${isConnected ? "text-white" : "text-slate-300"}`}>{p.name}</h4>
                {isConnected ? (
                  <p className="text-xs text-indigo-300 font-bold truncate mb-2">{p.value.replace(/https?:\/\/(www\.)?/, '')}</p>
                ) : (
                  <p className="text-[10px] font-medium text-slate-500 leading-relaxed max-w-[90%] mb-2">{p.benefit}</p>
                )}
                
                {isConnected && (
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Last Synced: Today</p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                {isConnected ? (
                  <>
                    <button className="flex-1 h-10 bg-transparent hover:bg-white/5 text-slate-300 border-2 border-white/5 hover:border-white/10 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" /> Sync
                    </button>
                    <a href={p.value.startsWith('http') ? p.value : `https://${p.value}`} target="_blank" rel="noopener noreferrer" className="flex-1 h-10 bg-transparent hover:bg-white/5 text-white border-2 border-white/10 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5" /> View
                    </a>
                  </>
                ) : (
                  <button onClick={onEditClick} className="w-full h-10 bg-transparent border-2 border-white/5 hover:border-white/20 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2">
                    <Link2 className="w-4 h-4" /> Connect {p.name}
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
