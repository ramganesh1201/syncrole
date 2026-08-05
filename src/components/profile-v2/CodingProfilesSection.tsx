import { motion } from "framer-motion";
import { Linkedin, Code2, Globe, ChevronRight, Plus } from "lucide-react";

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
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Professional & Coding Profiles</h3>
        <button onClick={onEditClick} className="text-xs text-indigo-400 font-semibold flex items-center gap-1 hover:text-indigo-300">
          Edit Profiles <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {profiles.map((p) => {
          const Icon = p.icon;
          return p.value ? (
            <a 
              key={p.id}
              href={p.value.startsWith('http') ? p.value : `https://${p.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800/80 hover:border-white/20 transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${p.color} group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-white font-bold text-sm">{p.name}</p>
                <p className="text-xs text-muted-foreground truncate font-medium">Connected</p>
              </div>
            </a>
          ) : (
            <button 
              key={p.id}
              onClick={onEditClick}
              className="glass bg-slate-900/60 border border-white/10 border-dashed rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800/80 transition-all group text-left"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 bg-white/5 group-hover:bg-white/10 transition-colors">
                <Plus className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </div>
              <div>
                <p className="text-slate-300 font-bold text-sm group-hover:text-white transition-colors">Connect {p.name}</p>
                <p className="text-xs text-muted-foreground">Not added</p>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
