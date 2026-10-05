import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, X, MessageSquare, Plus, Trash2, Check } from "lucide-react";
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

function getGroupLabel(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return "Older";
}

export function ConversationHistory({ conversations, onSelect, onClose }: Props) {
  const { startNewConversation, deleteConversation, conversationId } = useSyncPilot();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleNewChat = () => {
    startNewConversation();
    onClose();
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (deletingId === id) {
      await deleteConversation(id);
      setDeletingId(null);
    } else {
      setDeletingId(id);
    }
  };

  // Group conversations by Today, Yesterday, Older
  const grouped = conversations.reduce((acc, conv) => {
    const group = getGroupLabel(conv.updated_at);
    if (!acc[group]) acc[group] = [];
    acc[group].push(conv);
    return acc;
  }, {} as Record<string, Conversation[]>);

  const groups = ["Today", "Yesterday", "Older"].filter(g => grouped[g] && grouped[g].length > 0);

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 290, opacity: 1 }}
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
          className="h-6 w-6 rounded-lg hover:bg-slate-100 flex items-center justify-center transition text-slate-400 hover:text-slate-600 cursor-pointer"
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
      <div className="flex-1 overflow-y-auto py-2 px-2 space-y-3">
        {groups.length === 0 ? (
          <div className="text-center text-xs text-slate-400 pt-8 px-4 leading-relaxed">
            No previous conversations yet. Start a new chat to get instant career advice!
          </div>
        ) : (
          groups.map((groupName) => (
            <div key={groupName} className="space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 pt-1">
                {groupName}
              </div>
              {grouped[groupName].map((conv) => {
                const ml = MODE_LABELS[conv.mode] ?? { label: conv.mode, color: "bg-slate-50 text-slate-600 border-slate-100" };
                const isActive = conv.id === conversationId;
                const isConfirming = deletingId === conv.id;

                return (
                  <div
                    key={conv.id}
                    onClick={() => onSelect(conv.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition group border cursor-pointer flex items-center justify-between gap-2 ${
                      isActive 
                        ? "bg-indigo-50/60 border-indigo-200/80" 
                        : "hover:bg-slate-50 border-transparent hover:border-slate-200/60"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <MessageSquare className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"}`} />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-slate-800 truncate leading-snug group-hover:text-slate-900">
                          {conv.title || "Conversation"}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${ml.color}`}>
                            {ml.label}
                          </span>
                          <span className="text-[10px] text-slate-400">{timeAgo(conv.updated_at)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Action Button / Confirmation */}
                    <button
                      type="button"
                      onClick={(e) => handleDelete(e, conv.id)}
                      onMouseLeave={() => { if (isConfirming) setDeletingId(null); }}
                      className={`p-1.5 rounded-lg transition shrink-0 cursor-pointer ${
                        isConfirming 
                          ? "bg-red-50 text-red-600 border border-red-200" 
                          : "text-slate-300 hover:text-red-500 hover:bg-slate-100 opacity-0 group-hover:opacity-100"
                      }`}
                      title={isConfirming ? "Click again to confirm deletion" : "Delete conversation"}
                    >
                      {isConfirming ? <Check className="h-3.5 w-3.5 text-red-600" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
