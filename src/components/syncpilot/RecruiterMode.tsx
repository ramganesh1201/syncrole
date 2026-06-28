import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Briefcase, Send, Loader2, User, ChevronLeft,
  TrendingUp, AlertTriangle, CheckCircle2, Brain,
  Target, Shield, Zap, BarChart3, History,
} from "lucide-react";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { ConversationHistory } from "./ConversationHistory";

type Props = {
  onClose: () => void;
  onSwitchMode: (m: SyncPilotMode) => void;
};

const RECRUITER_PROMPTS = [
  "Generate a full RECRUITER REPORT for my profile. Include: Hiring Probability, ATS Score, Resume Analysis, Strengths, Weaknesses, Risk Factors, and Final Verdict.",
  "What's my market competitiveness vs other candidates applying for my target role?",
  "What's the #1 thing I must fix before applying to top companies?",
  "Predict my offer probability at FAANG companies given my current profile.",
  "What salary range should I expect based on my skills and experience?",
];

function HiringMeter({ probability }: { probability: number }) {
  const getColor = (p: number) =>
    p >= 70 ? "oklch(0.88 0.18 145)" : p >= 45 ? "oklch(0.88 0.18 60)" : "oklch(0.65 0.24 25)";

  return (
    <div className="glass rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs uppercase tracking-widest text-white/50">Hiring Probability</div>
        <BarChart3 className="h-4 w-4 text-white/30" />
      </div>
      <div className="flex items-end gap-3 mb-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="font-display text-5xl font-bold"
          style={{ color: getColor(probability) }}
        >
          {probability}%
        </motion.div>
        <div className="pb-1.5 text-sm text-white/40">
          {probability >= 70 ? "Strong Candidate" : probability >= 45 ? "Moderate Fit" : "Needs Work"}
        </div>
      </div>
      <div className="h-2 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${probability}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          style={{ background: `linear-gradient(90deg, oklch(0.65 0.24 25), ${getColor(probability)})` }}
        />
      </div>
    </div>
  );
}

function ScoreBar({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  const color = value >= 70 ? "oklch(0.88 0.18 145)" : value >= 40 ? "oklch(0.88 0.18 60)" : "oklch(0.65 0.24 25)";
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-3.5 w-3.5 text-white/40 flex-shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/60">{label}</span>
          <span className="font-mono" style={{ color }}>{value}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            style={{ background: color }}
          />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
          <Briefcase className="h-3.5 w-3.5 text-white" />
        </div>
      )}
      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${
        isUser ? "text-white rounded-tr-sm" : "glass rounded-tl-sm"
      }`} style={isUser ? {
        background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))",
      } : {}}>
        {content}
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </motion.div>
  );
}

export function RecruiterMode({ onClose, onSwitchMode }: Props) {
  const { messages, loading, userData, userDataLoading, sendMessage, loadUserData, switchMode, conversations, loadConversation } = useSyncPilot();
  const [input, setInput] = useState("");
  const [autoReportSent, setAutoReportSent] = useState(false);
  const initializedRef = useRef(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadUserData(); }, []);

  // Auto-generate recruiter report on first open
  useEffect(() => {
    if (!autoReportSent && !loading && !userDataLoading && messages.length === 0) {
      if (initializedRef.current) return;
      initializedRef.current = true;
      setAutoReportSent(true);
      sendMessage(RECRUITER_PROMPTS[0], { company, role });
    }
  }, [userDataLoading, autoReportSent, loading, messages.length, company, role, sendMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ps = userData?.placementScore;

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    await sendMessage(msg, { company, role });
  }

  return (
    <div className="h-full flex flex-col" style={{ background: "oklch(0.09 0.02 270 / 96%)" }}>

      {/* ── Header ── */}
      <div className="flex-shrink-0 px-5 pt-4 pb-3 border-b border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">Recruiter Mode</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  Senior Technical Recruiter
                </span>
              </div>
              <div className="text-[10px] text-white/40 mt-0.5">
                AI-powered candidate evaluation using your live data
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => onSwitchMode("career_twin")}
              className="text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
              Career Twin
            </button>
            <button className="text-[10px] bg-violet-500/20 px-2.5 py-1 rounded-full text-violet-300 border border-violet-500/30 transition font-medium">
              Recruiter
            </button>
            <button onClick={() => onSwitchMode("interview")}
              className="text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
              Interview
            </button>
            <div className="w-px h-4 bg-white/10 mx-1"></div>
            <button onClick={() => setShowHistory(v => !v)}
              className="h-8 w-8 rounded-full glass hover:bg-white/10 flex items-center justify-center transition" title="Toggle History">
              <History className="h-4 w-4 text-white/60" />
            </button>
            <button onClick={onClose}
              className="h-8 w-8 rounded-full glass hover:bg-white/10 flex items-center justify-center transition" title="Close">
              <X className="h-4 w-4 text-white/60" />
            </button>
          </div>
        </div>

        {/* Company/Role inputs */}
        <div className="mt-3 flex gap-2">
          <input
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="Target company (e.g. Google)"
            className="flex-1 glass rounded-xl px-3 py-2 text-xs outline-none border border-white/8 placeholder:text-white/25"
          />
          <input
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder="Role (e.g. SDE-2)"
            className="flex-1 glass rounded-xl px-3 py-2 text-xs outline-none border border-white/8 placeholder:text-white/25"
          />
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex-1 overflow-hidden flex gap-0">
        
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

        {/* Left: Score snapshot panel */}
        {!showHistory && (
        <div className="flex-shrink-0 w-64 border-r border-white/8 overflow-y-auto p-4 space-y-3">
          <HiringMeter probability={ps?.total_score ?? 0} />

          {/* Score breakdown */}
          <div className="glass rounded-2xl p-4 space-y-3 border border-white/8">
            <div className="text-[10px] uppercase tracking-widest text-white/40">Score Breakdown</div>
            <ScoreBar label="ATS / Resume" value={ps?.resume_score ?? 0} icon={Shield} />
            <ScoreBar label="DSA Depth" value={ps?.dsa_score ?? 0} icon={Brain} />
            <ScoreBar label="GitHub" value={ps?.github_score ?? 0} icon={Zap} />
            <ScoreBar label="Projects" value={ps?.projects_score ?? 0} icon={Target} />
            <ScoreBar label="Skills" value={ps?.skill_score ?? 0} icon={TrendingUp} />
          </div>

          {/* Quick prompts */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-widest text-white/30">Ask Recruiter</div>
            {RECRUITER_PROMPTS.slice(1).map((p) => (
              <button key={p} onClick={() => handleSend(p)}
                className="w-full text-left glass rounded-xl px-3 py-2 text-[11px] text-white/60 hover:text-white hover:bg-white/8 transition leading-snug">
                {p.slice(0, 55)}…
              </button>
            ))}
          </div>
        </div>
        )}

        {/* Right: Chat with Recruiter AI */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/30 text-sm pt-8"
              >
                <Briefcase className="h-8 w-8 mx-auto mb-3 text-violet-500/40" />
                Generating your Recruiter Report…
              </motion.div>
            )}

            {messages.map((m, i) => (
              <MessageBubble key={m.id ?? i} role={m.role} content={m.content} />
            ))}

            {loading && (
              <div className="flex gap-2 items-center">
                <div className="h-7 w-7 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
                  <Briefcase className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="glass rounded-2xl rounded-tl-sm px-4 py-2.5">
                  <div className="flex gap-1">
                    {[0, 0.15, 0.3].map((d, i) => (
                      <motion.div key={i} className="h-1.5 w-1.5 rounded-full bg-violet-400"
                        animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: d }} />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] text-white/30">Analyzing your profile…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 p-4 border-t border-white/8">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
                placeholder="Ask the recruiter anything…"
                className="flex-1 glass rounded-2xl px-4 py-3 text-sm outline-none border border-white/8 placeholder:text-white/25"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="h-12 w-12 rounded-2xl flex items-center justify-center disabled:opacity-40 transition"
                style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
