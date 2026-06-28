import { motion, AnimatePresence } from "framer-motion";
import { History, X, MessageSquare } from "lucide-react";

type Conversation = {
  id: string;
  mode: string;
  title: string | null;
  updated_at: string;
};

type Props = {
  conversations: Conversation[];
  onSelect: (id: string) => void;
  onClose: () => void;
};

const MODE_LABELS: Record<string, { label: string; color: string }> = {
  career_twin: { label: "Career Twin", color: "text-cyan-400" },
  recruiter:   { label: "Recruiter",   color: "text-violet-400" },
  interview:   { label: "Interview",   color: "text-pink-400" },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)   return "Just now";
  if (m < 60)  return `${m}m ago`;
  if (m < 1440) return `${Math.floor(m / 60)}h ago`;
  return `${Math.floor(m / 1440)}d ago`;
}

export function ConversationHistory({ conversations, onSelect, onClose }: Props) {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 200, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="flex-shrink-0 border-r border-white/8 flex flex-col overflow-hidden"
      style={{ background: "oklch(0.08 0.02 270 / 90%)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/8">
        <div className="flex items-center gap-1.5">
          <History className="h-3.5 w-3.5 text-white/40" />
          <span className="text-[11px] font-medium text-white/60">History</span>
        </div>
        <button onClick={onClose}
          className="h-5 w-5 rounded-full hover:bg-white/10 flex items-center justify-center transition">
          <X className="h-3 w-3 text-white/40" />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-0.5 px-2">
        <AnimatePresence>
          {conversations.length === 0 ? (
            <div className="text-center text-[11px] text-white/30 pt-6 px-2">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv, i) => {
              const ml = MODE_LABELS[conv.mode] ?? { label: conv.mode, color: "text-white/50" };
              return (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => onSelect(conv.id)}
                  className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-white/8 transition group"
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-3 w-3 text-white/30 mt-0.5 flex-shrink-0 group-hover:text-white/60 transition" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] text-white/70 truncate leading-snug group-hover:text-white transition">
                        {conv.title || "Conversation"}
                      </div>
                      <div className={`text-[9px] ${ml.color} mt-0.5`}>{ml.label}</div>
                      <div className="text-[9px] text-white/25 mt-0.5">{timeAgo(conv.updated_at)}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
