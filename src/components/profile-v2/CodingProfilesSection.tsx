import { motion } from "framer-motion";
import { Linkedin, Code2, Globe, CheckCircle2, XCircle, Link2, ExternalLink } from "lucide-react";

interface CodingProfilesSectionProps {
  profile: any;
  onEditClick: () => void;
}

export function CodingProfilesSection({ profile, onEditClick }: CodingProfilesSectionProps) {
  const profiles = [
    { id: "linkedin", name: "LinkedIn", value: profile?.linkedin, icon: Linkedin, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { id: "leetcode", name: "LeetCode", value: profile?.leetcode, icon: Code2, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
    { id: "codeforces", name: "Codeforces", value: profile?.codeforces, icon: Globe, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      id="coding-profiles"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Coding Profiles</h2>
          <p className="text-sm text-muted-foreground">Connect platforms to verify your coding experience.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isConnected = !!p.value;
          
          return (
            <div 
              key={p.id}
              className={`glass border rounded-3xl p-5 flex flex-col justify-between h-[180px] transition-all group relative overflow-hidden ${
                isConnected 
                  ? "bg-slate-900/60 border-white/10 hover:border-white/20 hover:bg-slate-800/80" 
                  : "bg-slate-900/40 border-white/5 border-dashed hover:border-white/20"
              }`}
            >
              {isConnected && (
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              )}
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                    isConnected ? p.color : "bg-white/5 border-white/10 text-slate-400"
                  } transition-transform group-hover:scale-105`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  {isConnected ? (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      <XCircle className="w-3 h-3" /> Missing
                    </div>
                  )}
                </div>
                
                <h4 className={`font-bold text-lg ${isConnected ? "text-white" : "text-slate-300"}`}>{p.name}</h4>
                {isConnected ? (
                  <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">{p.value.replace(/https?:\/\/(www\.)?/, '')}</p>
                ) : (
                  <p className="text-xs text-muted-foreground mt-0.5">Not connected</p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                {isConnected ? (
                  <>
                    <button onClick={onEditClick} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-1.5 rounded-lg text-xs transition-colors text-center">
                      Edit
                    </button>
                    <a href={p.value.startsWith('http') ? p.value : `https://${p.value}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </>
                ) : (
                  <button onClick={onEditClick} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-1.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5" /> Connect {p.name}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
