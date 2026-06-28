import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Plus, History, Brain, Target, Flame, Zap,
  Send, Loader2, User, ChevronRight, BookOpen,
  TrendingUp, Award, Code2, MessageSquare,
} from "lucide-react";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { levelProgress } from "@/lib/syncrole";
import { ConversationHistory } from "./ConversationHistory";

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
        <div className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}>
          <Brain className="h-3.5 w-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
        isUser
          ? "text-white rounded-tr-sm"
          : "glass rounded-tl-sm text-foreground"
      }`} style={isUser ? {
        background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))",
      } : {}}>
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
        <div className="flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center">
          <User className="h-3.5 w-3.5" />
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
  const [showHistory, setShowHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadUserData(); loadConversations(); }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="h-full flex flex-col" style={{ background: "oklch(0.10 0.02 270 / 95%)" }}>

      {/* ── Header ── */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-full flex items-center justify-center glow-pulse-cyan"
              style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}>
              <Brain className="h-4.5 w-4.5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px oklch(0.88 0.18 145)" }} />
            </div>
            <div>
              <div className="font-semibold text-sm leading-none text-white">SyncPilot</div>
              <div className="text-[10px] text-emerald-400 mt-0.5">Online</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Mode switcher pills */}
            <button className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full text-white transition font-medium">
              Career Twin
            </button>
            <button onClick={() => onSwitchMode("recruiter")}
              className="text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
              Recruiter
            </button>
            <button onClick={() => onSwitchMode("interview")}
              className="text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
              Interview
            </button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button onClick={() => setShowHistory(v => !v)}
              className="h-7 w-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition" title="Toggle History">
              <History className="h-3.5 w-3.5 text-white/60" />
            </button>
            <button onClick={startNewConversation}
              className="h-7 w-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition" title="New Chat">
              <Plus className="h-3.5 w-3.5 text-white/60" />
            </button>
            <button onClick={onClose}
              className="h-7 w-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition" title="Close">
              <X className="h-3.5 w-3.5 text-white/60" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-hidden flex">

        {/* Conversation History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <ConversationHistory
              conversations={conversations}
              onSelect={(id) => { loadConversation(id); setShowHistory(false); }}
              onClose={() => setShowHistory(false)}
            />
          )}
        </AnimatePresence>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">

          {/* Profile snapshot — shown only when no messages */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex-shrink-0 p-4 space-y-3"
              >
                {/* User card */}
                {userDataLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
                  </div>
                ) : profile ? (
                  <>
                    <div className="glass rounded-2xl p-3 flex items-center gap-3 border border-white/8">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}>
                        {(profile.full_name || "U")[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{profile.full_name || "User"}</div>
                        <div className="text-[10px] text-white/50 truncate">{profile.career_goal || "Career goal not set"}</div>
                      </div>
                      {lp && (
                        <div className="text-right">
                          <div className="text-xs font-mono text-cyan-400">{xp?.total_xp ?? 0} XP</div>
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
                        <div key={label} className="glass rounded-xl p-2 flex flex-col items-center gap-1">
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
                      <div className="glass rounded-xl p-2.5 flex items-center gap-2">
                        <Flame className="h-3.5 w-3.5 text-orange-400" />
                        <div>
                          <div className="text-sm font-bold">{streak?.current_streak ?? 0}</div>
                          <div className="text-[10px] text-white/40">day streak</div>
                        </div>
                      </div>
                      <div className="glass rounded-xl p-2.5 flex items-center gap-2">
                        <Award className="h-3.5 w-3.5 text-yellow-400" />
                        <div>
                          <div className="text-sm font-bold">{userData?.achievements.length ?? 0}</div>
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
                  <div className="glass rounded-xl p-4 text-center text-sm text-white/40">
                    Complete onboarding to unlock personalized insights
                  </div>
                )}

                {/* Quick actions */}
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 px-1">Quick Actions</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {QUICK_ACTIONS.slice(0, 4).map((a) => (
                      <button key={a.label} onClick={() => handleSend(a.prompt)}
                        className="glass rounded-xl px-2.5 py-2 text-[11px] text-left hover:bg-white/8 transition text-white/70 hover:text-white flex items-center gap-1.5">
                        <ChevronRight className="h-3 w-3 text-cyan-400 flex-shrink-0" />
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
            {messages.map((m, i) => (
              <MessageBubble key={m.id ?? i} role={m.role} content={m.content} timestamp={m.created_at} />
            ))}

            {loading && (
              <div className="flex gap-2 items-start">
                <div className="h-7 w-7 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}>
                  <Brain className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="glass rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4].map((d, i) => (
                      <motion.div key={i} className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                        animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips (when messages exist) */}
          {messages.length > 0 && messages.length < 4 && (
            <div className="flex-shrink-0 px-4 pb-2 flex gap-1.5 flex-wrap">
              {QUICK_ACTIONS.slice(4).map((a) => (
                <button key={a.label} onClick={() => handleSend(a.prompt)}
                  className="glass text-[10px] px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex-shrink-0 p-3 border-t border-white/8">
            <div className="flex gap-2 items-end">
              <div className="flex-1 glass rounded-2xl overflow-hidden border border-white/8">
                <textarea
                  value={input}
                  onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"; }}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Ask SyncPilot anything about your career..."
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none min-h-[44px] max-h-[100px] placeholder:text-white/25"
                  rows={1}
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="h-11 w-11 rounded-2xl flex items-center justify-center transition disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
              </motion.button>
            </div>
            <div className="mt-1.5 text-[10px] text-white/20 text-center">
              <MessageSquare className="h-2.5 w-2.5 inline mr-1" />
              Memory-enabled · Personalized to your data
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
