import { motion, AnimatePresence } from "framer-motion";
import { History, X, MessageSquare, Plus } from "lucide-react";
import { useSyncPilot } from "@/hooks/useSyncPilot";

type Conversation = {
  id: string;
  mode: string;
  title: string | null;
  updated_at: string;
};

interface Props {
  conversations: Conversation[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

const MODE_LABELS: Record<string, { label: string; color: string }> = {
  career_twin: { label: "Career Twin", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  recruiter:   { label: "Recruiter",   color: "bg-purple-50 text-purple-700 border-purple-100" },
  interview:   { label: "Interview",   color: "bg-blue-50 text-blue-700 border-blue-100" },
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
  const { startNewConversation } = useSyncPilot();

  const handleNewChat = () => {
    startNewConversation();
    onClose();
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 280, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex-shrink-0 border-r border-slate-200/90 flex flex-col overflow-hidden bg-white h-full absolute inset-y-0 left-0 z-50 shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-900">Chat History</span>
        </div>
        <button 
          onClick={onClose}
          className="h-6 w-6 rounded-lg hover:bg-slate-100 flex items-center justify-center transition text-slate-400 hover:text-slate-600"
          aria-label="Close history"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* New Chat Primary Action */}
      <div className="p-3 border-b border-slate-100">
        <button
          onClick={handleNewChat}
          className="w-full rounded-xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-100 text-indigo-700 py-2 px-3 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Start New Chat</span>
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto py-2 space-y-1 px-2">
        <AnimatePresence>
          {conversations.length === 0 ? (
            <div className="text-center text-xs text-slate-400 pt-8 px-4 leading-relaxed">
              No previous conversations yet. Start a new chat to get instant career advice!
            </div>
          ) : (
            conversations.map((conv, i) => {
              const ml = MODE_LABELS[conv.mode] ?? { label: conv.mode, color: "bg-slate-50 text-slate-600 border-slate-100" };
              return (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => onSelect(conv.id)}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition group border border-transparent hover:border-slate-200/60 cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0 group-hover:text-indigo-600 transition-colors" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-slate-800 truncate leading-snug group-hover:text-slate-900">
                        {conv.title || "Conversation"}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${ml.color}`}>
                          {ml.label}
                        </span>
                        <span className="text-[10px] text-slate-400">{timeAgo(conv.updated_at)}</span>
                      </div>
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
