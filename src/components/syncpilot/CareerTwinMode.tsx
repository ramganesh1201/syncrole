import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Plus, History, Sparkles, Send, Loader2, User,
  ChevronRight, ArrowDown, FileText, Target, Code2, ShieldCheck, Github
} from "lucide-react";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { ConversationHistory } from "./ConversationHistory";
import { useChatScroll } from "@/hooks/useChatScroll";

type Props = {
  onClose: () => void;
  onSwitchMode: (m: SyncPilotMode) => void;
};

const STARTER_PROMPTS = [
  {
    title: "Review my resume",
    desc: "Top 5 improvements to boost ATS score",
    prompt: "Analyze my resume score and give me the top 5 improvements I should make.",
    icon: FileText,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    title: "Target Role Readiness",
    desc: "Placement readiness analysis & gap report",
    prompt: "Give me a full placement readiness analysis based on my current data.",
    icon: Target,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    title: "DSA Study Plan",
    desc: "Personalized roadmap based on target role",
    prompt: "Create a personalized DSA study roadmap based on my progress and target role.",
    icon: Code2,
    color: "text-violet-600 bg-violet-50 border-violet-100",
  },
  {
    title: "Technical Interview Prep",
    desc: "2-week targeted mock prep plan",
    prompt: "Create a 2-week interview preparation plan based on my weak areas.",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    title: "GitHub Profile Audit",
    desc: "Project depth & commit quality recommendations",
    prompt: "Analyze my GitHub profile and recommend project improvements.",
    icon: Github,
    color: "text-purple-600 bg-purple-50 border-purple-100",
  },
];

function MessageBubble({ role, content, timestamp }: { role: "user" | "assistant"; content: string; timestamp?: string }) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="h-7 w-7 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
      )}

      <div
        className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed break-words overflow-hidden ${
          isUser
            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-medium rounded-tr-xs shadow-xs"
            : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs space-y-1.5"
        }`}
      >
        {isUser ? (
          <p>{content}</p>
        ) : (
          content.split("\n").map((line, i) => {
            if (line.startsWith("**") && line.endsWith("**")) {
              return <p key={i} className="font-bold text-slate-900 mt-1">{line.slice(2, -2)}</p>;
            }
            if (line.startsWith("# ") || line.startsWith("## ")) {
              return <p key={i} className="font-bold text-indigo-600 text-sm mt-2">{line.replace(/^#+\s*/, "")}</p>;
            }
            if (line.startsWith("- ") || line.startsWith("• ")) {
              return (
                <div key={i} className="flex items-start gap-1.5 pl-1 my-0.5">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{line.slice(2)}</span>
                </div>
              );
            }
            if (line === "") return <div key={i} className="h-1.5" />;
            return <p key={i}>{line}</p>;
          })
        )}

        {timestamp && (
          <div className={`mt-1 text-[10px] text-right ${isUser ? "text-white/70" : "text-slate-400"}`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        )}
      </div>

      {isUser && (
        <div className="h-7 w-7 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </motion.div>
  );
}

export function CareerTwinMode({ onClose, onSwitchMode }: Props) {
  const {
    messages, loading,
    sendMessage, loadUserData,
    loadConversations, loadConversation, startNewConversation, conversations
  } = useSyncPilot();

  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const { scrollRef, showScrollButton, handleScroll, scrollToBottom } = useChatScroll(messages);

  useEffect(() => {
    loadUserData();
    loadConversations();
  }, []);

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    await sendMessage(msg);
  }

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500/20 font-sans">
      {/* ── Top Header ── */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-slate-200/90 z-10">
        <div className="flex items-center justify-between gap-2">
          {/* Brand & Status */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 leading-none">SyncPilot</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>AI Career Guide</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
              title="History"
              aria-label="Toggle History"
            >
              <History className="h-4 w-4" />
            </button>
            <button
              onClick={startNewConversation}
              className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
              title="New Chat"
              aria-label="New Chat"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
              title="Close"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button className="text-xs font-semibold bg-indigo-600 text-white px-3 py-1 rounded-full whitespace-nowrap shadow-xs">
            Career Twin
          </button>
          <button
            onClick={() => onSwitchMode("recruiter")}
            className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
          >
            Recruiter Mode
          </button>
          <button
            onClick={() => onSwitchMode("interview")}
            className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
          >
            Interview Mode
          </button>
        </div>
      </div>

      {/* ── Main Chat Area ── */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative">
        {/* History Drawer */}
        <AnimatePresence>
          {showHistory && (
            <ConversationHistory
              conversations={conversations}
              onSelect={(id) => { loadConversation(id); setShowHistory(false); }}
              onClose={() => setShowHistory(false)}
            />
          )}
        </AnimatePresence>

        {/* Scrollable Messages Container */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4" ref={scrollRef} onScroll={handleScroll}>
          
          {/* New Chat Empty State */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 pt-2 pb-4"
              >
                {/* Intro Banner */}
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Your AI Career Companion</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">What are you working toward?</h2>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Ask SyncPilot anything about your career path, skills, resume score, DSA roadmap, or interview prep.
                  </p>
                </div>

                {/* Starter Prompts Grid */}
                <div className="space-y-2">
                  <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider px-1">
                    Quick Start Actions
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {STARTER_PROMPTS.map((sp) => (
                      <button
                        key={sp.title}
                        onClick={() => handleSend(sp.prompt)}
                        className="p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-300 transition text-left group cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-xl border ${sp.color} shrink-0`}>
                            <sp.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                              <span>{sp.title}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                            <div className="text-[11px] text-slate-500 truncate mt-0.5">{sp.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Chat Message List */}
          {messages.map((m: any, i: number) => (
            <MessageBubble key={m.id ?? i} role={m.role} content={m.content} timestamp={m.created_at} />
          ))}

          {/* Thinking / Loading State */}
          {loading && (
            <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xs w-fit">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-600" />
              <span className="font-medium">SyncPilot is analyzing...</span>
            </div>
          )}
        </div>

        {/* Scroll to bottom floating button */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <AnimatePresence>
            {showScrollButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToBottom}
                aria-label="Scroll to latest message"
                className="h-8 w-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors pointer-events-auto cursor-pointer"
              >
                <ArrowDown className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Input Composer ── */}
        <div className="flex-shrink-0 p-3 bg-white border-t border-slate-200/90 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <div className="flex gap-2 items-end">
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask SyncPilot anything about your career..."
                className="w-full bg-transparent px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none resize-none min-h-[40px] max-h-[100px]"
                rows={1}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition disabled:opacity-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-xs cursor-pointer"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
