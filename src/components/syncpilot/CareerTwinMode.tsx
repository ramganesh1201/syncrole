import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Plus, History, Brain, Target, Flame, Zap,
  Send, Loader2, User, ChevronRight, BookOpen,
  TrendingUp, Award, Code2, MessageSquare, ArrowDown,
} from "lucide-react";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { levelProgress } from "@/lib/syncrole";
import { ConversationHistory } from "./ConversationHistory";
import { useChatScroll } from "@/hooks/useChatScroll";

type Props = {
  onClose: () => void;
  onSwitchMode: (m: SyncPilotMode) => void;
};

const QUICK_ACTIONS = [
  { label: "Placement Analysis",    prompt: "Give me a full placement readiness analysis based on my current data." },
  { label: "DSA Roadmap",           prompt: "Create a personalized DSA study roadmap based on my progress and target role." },
  { label: "Skill Gap Analysis",    prompt: "Identify my skill gaps compared to what top companies look for." },
  { label: "Resume Improvement",    prompt: "Analyze my resume score and give me the top 5 improvements I should make." },
  { label: "Interview Prep",        prompt: "Create a 2-week interview preparation plan based on my weak areas." },
  { label: "Career Trajectory",     prompt: "Predict my career trajectory and best role fit based on my current profile." },
];

function ScoreRingSmall({ value, color = "#06b6d4" }: { value: number; color?: string }) {
  const r = 22; const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
      <circle cx="28" cy="28" r={r} stroke="oklch(1 0 0 / 8%)" strokeWidth="5" fill="none" />
      <motion.circle
        cx="28" cy="28" r={r} stroke={color} strokeWidth="5" fill="none"
        strokeLinecap="round" strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * value) / 100 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
}

function MessageBubble({ role, content, timestamp }: { role: "user" | "assistant"; content: string; timestamp?: string }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div
          className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center shrink-0 shadow-sm"
          style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
        >
          <Brain className="h-3.5 w-3.5 text-white" />
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed break-words overflow-hidden ${
          isUser
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-xs shadow-sm"
            : "glass rounded-tl-xs text-foreground border border-white/10"
        }`}
      >
        {/* Render content with basic markdown-like formatting */}
        {content.split("\n").map((line, i) => {
          if (line.startsWith("**") && line.endsWith("**"))
            return <p key={i} className="font-semibold">{line.slice(2, -2)}</p>;
          if (line.startsWith("# "))
            return <p key={i} className="font-bold text-cyan-400 mt-1">{line.slice(2)}</p>;
          if (line.startsWith("- ") || line.startsWith("• "))
            return <p key={i} className="pl-2 before:content-['•'] before:mr-1.5 before:text-cyan-400">{line.slice(2)}</p>;
          if (line === "")
            return <br key={i} />;
          return <p key={i}>{line}</p>;
        })}
        {timestamp && (
          <div className="mt-1 text-[10px] opacity-40 text-right">
            {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center shrink-0 border border-white/10">
          <User className="h-3.5 w-3.5 text-slate-300" />
        </div>
      )}
    </motion.div>
  );
}

export function CareerTwinMode({ onClose, onSwitchMode }: Props) {
  const {
    messages, loading, userData, userDataLoading,
    sendMessage, loadUserData, conversations,
    loadConversations, loadConversation, startNewConversation,
  } = useSyncPilot();

  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const { scrollRef, showScrollButton, handleScroll, scrollToBottom } = useChatScroll(messages);

  useEffect(() => { loadUserData(); loadConversations(); }, []);

  const profile  = userData?.profile;
  const xp       = userData?.xp;
  const streak   = userData?.streak;
  const ps       = userData?.placementScore;
  const resume   = userData?.resume;
  const lp       = xp ? levelProgress(xp.total_xp) : null;

  const placementScore = ps?.total_score ?? 0;
  const resumeScore    = resume?.total_score ?? 0;
  const dsaScore       = ps?.dsa_score ?? 0;

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    await sendMessage(msg);
  }

  return (
    <div className="h-full flex flex-col bg-[#07090e] text-slate-100 selection:bg-purple-500/30">

      {/* ── Header ── */}
      <div className="flex-shrink-0 px-3 sm:px-4 pt-3 pb-2.5 border-b border-white/10 bg-slate-950/95 backdrop-blur-md z-10">
        <div className="flex items-center justify-between gap-2">
          {/* Left branding */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="relative h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-md"
              style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
            >
              <Brain className="h-4 w-4 text-white" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm leading-none text-white">SyncPilot</div>
              <div className="text-[10px] font-medium text-emerald-400 mt-0.5 flex items-center gap-1">
                <span>●</span> Online
              </div>
            </div>
          </div>

          {/* Right action icons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="h-8 w-8 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition text-slate-300 active:scale-95"
              title="Toggle History"
              aria-label="Toggle History"
            >
              <History className="h-4 w-4" />
            </button>
            <button
              onClick={startNewConversation}
              className="h-8 w-8 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition text-slate-300 active:scale-95"
              title="New Chat"
              aria-label="New Chat"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition text-slate-300 active:scale-95"
              title="Close"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable mode selector pills */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none py-0.5 max-w-full">
          <button className="text-[11px] font-semibold bg-purple-500/30 text-purple-200 border border-purple-500/40 px-3 py-1 rounded-full whitespace-nowrap">
            Career Twin
          </button>
          <button
            onClick={() => onSwitchMode("recruiter")}
            className="text-[11px] font-medium glass text-slate-400 hover:text-white px-3 py-1 rounded-full whitespace-nowrap transition"
          >
            Recruiter
          </button>
          <button
            onClick={() => onSwitchMode("interview")}
            className="text-[11px] font-medium glass text-slate-400 hover:text-white px-3 py-1 rounded-full whitespace-nowrap transition"
          >
            Interview
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative">

        {/* Conversation History Drawer */}
        <AnimatePresence>
          {showHistory && (
            <ConversationHistory
              conversations={conversations}
              onSelect={(id) => { loadConversation(id); setShowHistory(false); }}
              onClose={() => setShowHistory(false)}
            />
          )}
        </AnimatePresence>

        {/* Main chat column */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">

          {/* Scrollable message container */}
          <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-3 space-y-3" ref={scrollRef} onScroll={handleScroll}>

            {/* Profile snapshot (when messages.length === 0) */}
            <AnimatePresence>
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-3 pb-2"
                >
                  {userDataLoading ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
                    </div>
                  ) : profile ? (
                    <>
                      <div className="glass rounded-2xl p-3 flex items-center gap-3 border border-white/8">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
                          style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
                        >
                          {(profile.full_name || "U")[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate text-white">{profile.full_name || "User"}</div>
                          <div className="text-[10px] text-white/50 truncate">{profile.career_goal || "Career goal not set"}</div>
                        </div>
                        {lp && (
                          <div className="text-right shrink-0">
                            <div className="text-xs font-mono text-cyan-400 font-bold">{xp?.total_xp ?? 0} XP</div>
                            <div className="text-[10px] text-white/40">Lv {lp.cur.lvl}</div>
                          </div>
                        )}
                      </div>

                      {/* Score rings */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: "Placement", value: placementScore, color: "oklch(0.75 0.2 200)", icon: Target },
                          { label: "Resume", value: resumeScore, color: "oklch(0.72 0.22 295)", icon: BookOpen },
                          { label: "DSA", value: dsaScore, color: "oklch(0.88 0.18 145)", icon: Code2 },
                        ].map(({ label, value, color, icon: Icon }) => (
                          <div key={label} className="glass rounded-xl p-2 flex flex-col items-center gap-1 border border-white/5">
                            <div className="relative">
                              <ScoreRingSmall value={value} color={color} />
                              <div className="absolute inset-0 flex items-center justify-center rotate-90">
                                <span className="text-xs font-bold" style={{ color }}>{value}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon className="h-2.5 w-2.5 text-white/40" />
                              <span className="text-[10px] text-white/50">{label}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Live stats row */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="glass rounded-xl p-2.5 flex items-center gap-2 border border-white/5">
                          <Flame className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                          <div>
                            <div className="text-sm font-bold text-white">{streak?.current_streak ?? 0}</div>
                            <div className="text-[10px] text-white/40">day streak</div>
                          </div>
                        </div>
                        <div className="glass rounded-xl p-2.5 flex items-center gap-2 border border-white/5">
                          <Award className="h-3.5 w-3.5 text-yellow-400 shrink-0" />
                          <div>
                            <div className="text-sm font-bold text-white">{userData?.achievements.length ?? 0}</div>
                            <div className="text-[10px] text-white/40">achievements</div>
                          </div>
                        </div>
                      </div>

                      {/* Memory hint */}
                      {userData?.memory?.career_goals && (
                        <div className="glass rounded-xl px-3 py-2 flex items-start gap-2 border border-violet-500/20">
                          <Zap className="h-3 w-3 text-violet-400 mt-0.5 flex-shrink-0" />
                          <div className="text-[10px] text-white/60">
                            <span className="text-violet-400 font-medium">Memory: </span>
                            {userData.memory.career_goals}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="glass rounded-xl p-4 text-center text-sm text-white/40 border border-white/5">
                      Complete onboarding to unlock personalized insights
                    </div>
                  )}

                  {/* Quick actions */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 px-1 font-semibold">Quick Actions</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {QUICK_ACTIONS.slice(0, 4).map((a) => (
                        <button
                          key={a.label}
                          onClick={() => handleSend(a.prompt)}
                          className="glass rounded-xl px-2.5 py-2 text-[11px] text-left hover:bg-white/10 transition text-slate-300 hover:text-white flex items-center gap-1.5 border border-white/5"
                        >
                          <ChevronRight className="h-3 w-3 text-cyan-400 shrink-0" />
                          <span className="line-clamp-1">{a.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Render message list */}
            {messages.map((m: any, i: number) => (
              <MessageBubble key={m.id ?? i} role={m.role} content={m.content} timestamp={m.created_at} />
            ))}

            {/* AI Loading state */}
            {loading && (
              <div className="flex gap-2.5 items-start">
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 shadow-md"
                  style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
                >
                  <Brain className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="glass rounded-2xl rounded-tl-xs px-4 py-3 border border-white/10">
                  <div className="flex gap-1.5 items-center">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.div
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: d }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scroll to bottom button */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <AnimatePresence>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  aria-label="Scroll to latest message"
                  className="h-9 w-9 rounded-full glass border border-white/20 shadow-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors pointer-events-auto active:scale-95"
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Quick chips (when messages exist) */}
          {messages.length > 0 && messages.length < 4 && (
            <div className="flex-shrink-0 px-3 sm:px-4 pb-2 flex gap-1.5 flex-wrap">
              {QUICK_ACTIONS.slice(4).map((a) => (
                <button
                  key={a.label}
                  onClick={() => handleSend(a.prompt)}
                  className="glass text-[10px] px-2.5 py-1 rounded-full hover:bg-white/10 transition text-slate-300 hover:text-white border border-white/5"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Composer (Fixed at bottom) */}
          <div className="flex-shrink-0 p-3 border-t border-white/10 bg-slate-950/95 backdrop-blur-md pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex gap-2 items-end">
              <div className="flex-1 glass rounded-2xl overflow-hidden border border-white/10">
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
                  className="w-full bg-transparent px-3.5 py-3 text-sm outline-none resize-none min-h-[44px] max-h-[100px] text-white placeholder:text-white/30"
                  rows={1}
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="h-11 w-11 shrink-0 rounded-2xl flex items-center justify-center transition disabled:opacity-40 bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-md active:scale-95"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
              </motion.button>
            </div>
            <div className="mt-1.5 text-[10px] text-white/30 text-center flex items-center justify-center gap-1">
              <MessageSquare className="h-2.5 w-2.5 opacity-60" />
              <span>Memory-enabled · Personalized to your data</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
