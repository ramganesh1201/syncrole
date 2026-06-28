import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Brain, Send, Loader2, User, Timer, Trophy,
  Mic, MicOff, ChevronLeft, Building2, Briefcase,
  Target, Play, Settings, History, CheckCircle2, Star, AlertCircle,
} from "lucide-react";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { ConversationHistory } from "./ConversationHistory";

type Props = {
  onClose: () => void;
  onSwitchMode: (m: SyncPilotMode) => void;
};

const COMPANY_PRESETS = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Flipkart", "Swiggy", "Uber", "Zomato"];
const ROLE_PRESETS    = ["SDE-1", "SDE-2", "Backend Engineer", "Frontend Engineer", "Full Stack", "ML Engineer", "Data Engineer"];

function InterviewTimer({ running }: { running: boolean }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  const isLong = seconds > 2700; // 45 min warning

  return (
    <motion.div
      className={`flex items-center gap-2 glass rounded-xl px-3 py-1.5 border ${
        isLong ? "border-orange-500/40 text-orange-400" : "border-white/10 text-white"
      }`}
      animate={isLong ? { borderColor: ["rgba(249,115,22,0.4)", "rgba(249,115,22,0.8)", "rgba(249,115,22,0.4)"] } : {}}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <Timer className={`h-3.5 w-3.5 ${isLong ? "text-orange-400" : "text-cyan-400"}`} />
      <span className="font-mono text-sm font-bold">{m}:{s}</span>
    </motion.div>
  );
}



function ScoreCard({ score, feedback, strengths, weaknesses }: { score: number; feedback: string; strengths: string[]; weaknesses: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl p-6 border border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Trophy className="h-32 w-32" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center mb-6">
        <div className="text-[10px] uppercase tracking-widest text-white/50 mb-3">Final Verdict</div>
        <div className="relative">
          <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
            <circle cx="50" cy="50" r="45" stroke="oklch(1 0 0 / 10%)" strokeWidth="8" fill="none" />
            <motion.circle
              cx="50" cy="50" r="45" stroke="oklch(0.72 0.22 295)" strokeWidth="8" fill="none"
              strokeLinecap="round" strokeDasharray={2 * Math.PI * 45}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ strokeDashoffset: (2 * Math.PI * 45) * (1 - score / 100) }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center rotate-90">
            <span className="font-display text-2xl font-bold" style={{ color: "oklch(0.72 0.22 295)" }}>{score}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
        {/* Strengths */}
        {strengths.length > 0 && (
          <div className="glass rounded-xl p-3 border border-white/8">
            <div className="text-[10px] uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3" /> Strengths
            </div>
            <ul className="space-y-1.5">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-white/70">
                  <Star className="h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Weaknesses */}
        {weaknesses.length > 0 && (
          <div className="glass rounded-xl p-3 border border-white/8">
            <div className="text-[10px] uppercase tracking-widest text-red-400 mb-2 flex items-center gap-1.5">
              <AlertCircle className="h-3 w-3" /> Areas to Improve
            </div>
            <ul className="space-y-1.5">
              {weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-white/70">
                  <AlertCircle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="glass rounded-xl p-4 text-xs text-white/60 leading-relaxed border border-white/5">
        {feedback}
      </div>
    </motion.div>
  );
}

type Phase = "setup" | "chamber-entry" | "active" | "scorecard";

export function InterviewMode({ onClose, onSwitchMode }: Props) {
  const { messages, loading, sendMessage, loadUserData, switchMode, startNewConversation, conversations, loadConversation } = useSyncPilot();
  const [phase, setPhase] = useState<Phase>("setup");
  const [company, setCompany] = useState("Google");
  const [role, setRole]    = useState("SDE-1");
  const [input, setInput]  = useState("");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [scoreData, setScoreData] = useState<{
    score: number; feedback: string; strengths: string[]; weaknesses: string[];
  } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadUserData(); }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Jump to active phase if a conversation is loaded from history
  useEffect(() => {
    if (messages.length > 0 && phase === "setup") {
      setPhase("active");
      setInterviewStarted(true);
    }
  }, [messages, phase]);

  // Detect scorecard in AI response
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.role !== "assistant") return;
    const content = lastMsg.content.toLowerCase();
    if (content.includes("overall score") || content.includes("interview complete") || content.includes("final score")) {
      const scoreMatch = lastMsg.content.match(/(?:overall score|final score)[:\s]+(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      if (score > 0) {
        setTimeout(() => {
          setScoreData({
            score,
            feedback: lastMsg.content.slice(0, 300),
            strengths: extractList(lastMsg.content, "strength"),
            weaknesses: extractList(lastMsg.content, "weakness|improve|work on"),
          });
          setPhase("scorecard");
        }, 1500);
      }
    }
  }, [messages]);

  function extractList(text: string, keyword: string): string[] {
    const lines = text.split("\n");
    const result: string[] = [];
    let capture = false;
    for (const line of lines) {
      if (new RegExp(keyword, "i").test(line)) { capture = true; continue; }
      if (capture && line.trim().match(/^[-•*\d]/)) {
        result.push(line.replace(/^[-•*\d.)\s]+/, "").trim());
      } else if (capture && line.trim() === "") {
        break;
      }
    }
    return result.slice(0, 4);
  }

  async function startInterview() {
    startNewConversation();
    setPhase("chamber-entry");
    // Chamber animation plays for 2s, then go active
    setTimeout(() => {
      setPhase("active");
      setInterviewStarted(true);
      sendMessage(
        `Start my interview now. I am applying for ${role} at ${company}. Begin with a brief introduction, then ask me the first technical question. Base the questions on my profile data, projects, and DSA progress.`,
        { company, role }
      );
    }, 2200);
  }

  async function handleSend() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    await sendMessage(msg, { company, role });
  }

  // ── SETUP PHASE ──
  if (phase === "setup") {
    return (
      <div className="h-full flex overflow-hidden interview-chamber" style={{ background: "oklch(0.09 0.02 270 / 96%)" }}>
        
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

        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-6 mt-12"
        >
          {/* Header */}
          <div className="absolute top-4 left-0 w-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* History button if we want to show it on left */}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => onSwitchMode("career_twin")}
                className="text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
                Career Twin
              </button>
              <button onClick={() => onSwitchMode("recruiter")}
                className="text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
                Recruiter
              </button>
              <button className="text-[10px] bg-pink-500/20 px-2.5 py-1 rounded-full text-pink-300 border border-pink-500/30 transition font-medium">
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

          <div className="text-center">
            <div className="inline-flex h-16 w-16 rounded-2xl items-center justify-center mb-4"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white">Interview Chamber</h2>
            <p className="text-sm text-white/50 mt-1">AI-powered interview simulation using your live profile</p>
          </div>

          {/* Company selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">Target Company</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {COMPANY_PRESETS.map(c => (
                <button key={c} onClick={() => setCompany(c)}
                  className={`px-3 py-1.5 rounded-full text-xs transition ${
                    company === c ? "text-white border-cyan-400/50" : "glass text-white/50 hover:text-white"
                  }`}
                  style={company === c ? {
                    background: "linear-gradient(135deg, oklch(0.75 0.2 200 / 30%), oklch(0.72 0.22 295 / 30%))",
                    border: "1px solid oklch(0.75 0.2 200 / 50%)",
                  } : {}}>
                  {c}
                </button>
              ))}
            </div>
            <input value={company} onChange={e => setCompany(e.target.value)}
              className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 placeholder:text-white/25"
              placeholder="Or type custom company…" />
          </div>

          {/* Role selector */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40">Role</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {ROLE_PRESETS.map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className={`px-3 py-1.5 rounded-full text-xs transition ${
                    role === r ? "text-white" : "glass text-white/50 hover:text-white"
                  }`}
                  style={role === r ? {
                    background: "linear-gradient(135deg, oklch(0.72 0.22 295 / 30%), oklch(0.85 0.20 330 / 30%))",
                    border: "1px solid oklch(0.72 0.22 295 / 50%)",
                  } : {}}>
                  {r}
                </button>
              ))}
            </div>
            <input value={role} onChange={e => setRole(e.target.value)}
              className="w-full glass rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 placeholder:text-white/25"
              placeholder="Or type custom role…" />
          </div>

          {/* Mode switch */}
          <div className="flex gap-2">
            <button onClick={() => onSwitchMode("career_twin")}
              className="flex-1 glass rounded-xl py-2 text-xs text-white/50 hover:text-white transition">
              ← Career Twin
            </button>
            <button onClick={startInterview} disabled={!company || !role}
              className="flex-1 rounded-xl px-4 py-3.5 font-bold text-white transition disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
              Enter Chamber →
            </button>
          </div>
        </motion.div>
      </div>
      </div>
    );
  }

  // ── CHAMBER ENTRY ANIMATION ──
  if (phase === "chamber-entry") {
    return (
      <div className="h-full flex flex-col items-center justify-center interview-chamber relative overflow-hidden">
        <div className="scan-line" />
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(oklch(0.72 0.22 295 / 8%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.22 295 / 8%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10 space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="h-20 w-20 mx-auto rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 60%, oklch(0.72 0.22 295), oklch(0.85 0.20 330), transparent 100%)",
            }}
          />
          <div className="font-display text-2xl font-bold text-white">Entering Interview Chamber</div>
          <div className="text-sm text-white/50">{company} — {role}</div>
          <div className="flex items-center justify-center gap-2 text-[11px] text-violet-400">
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
              ▋
            </motion.div>
            AI Interviewer Initializing…
          </div>
        </motion.div>
      </div>
    );
  }

  // ── SCORECARD PHASE ──
  if (phase === "scorecard" && scoreData) {
    return (
      <div className="h-full flex flex-col interview-chamber overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full glass flex items-center justify-center">
          <X className="h-4 w-4 text-white/60" />
        </button>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full space-y-4">
            <ScoreCard {...scoreData} />
            <div className="flex gap-3 justify-center">
              <button onClick={() => { startNewConversation(); setPhase("setup"); setScoreData(null); setInterviewStarted(false); }}
                className="glass rounded-xl px-6 py-2.5 text-sm hover:bg-white/10 transition">
                Retry
              </button>
              <button onClick={() => onSwitchMode("career_twin")}
                className="rounded-xl px-6 py-2.5 text-sm font-medium text-white transition"
                style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}>
                Career Twin Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ACTIVE INTERVIEW ──
  return (
    <div className="h-full flex flex-col interview-chamber">
      {/* Header bar */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-white/8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Interviewer avatar */}
          <div className="relative h-9 w-9 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
            <Brain className="h-4 w-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 6px oklch(0.88 0.18 145)" }} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">AI Interviewer</div>
            <div className="text-[10px] text-white/40">{company} · {role}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <InterviewTimer running={interviewStarted} />
          <button onClick={() => { setPhase("scorecard"); setScoreData({ score: 0, feedback: "Session ended early", strengths: [], weaknesses: [] }); }}
            className="text-[11px] glass px-3 py-1.5 rounded-xl hover:bg-white/10 transition text-orange-400 border border-orange-500/20">
            End Interview
          </button>
          <button onClick={onClose}
            className="h-8 w-8 rounded-full glass hover:bg-white/10 flex items-center justify-center transition">
            <X className="h-4 w-4 text-white/60" />
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((m, i) => {
          const isUser = m.role === "user";
          return (
            <motion.div key={m.id ?? i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
                  <Brain className="h-4 w-4 text-white" />
                </div>
              )}
              <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                isUser ? "rounded-tr-sm text-white" : "glass rounded-tl-sm border border-white/8"
              }`} style={isUser ? {
                background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))",
              } : {}}>
                {m.content.split("\n").map((line, li) => (
                  <p key={li} className={line === "" ? "h-2" : ""}>{line}</p>
                ))}
              </div>
              {isUser && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full glass flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              )}
            </motion.div>
          );
        })}

        {loading && (
          <div className="flex gap-3 items-center">
            <div className="h-8 w-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}>
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 border border-white/8">
              <div className="flex gap-1.5">
                {[0, 0.15, 0.3].map((d, i) => (
                  <motion.div key={i} className="h-2 w-2 rounded-full bg-violet-400"
                    animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: d }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-white/8">
        <div className="flex gap-2 items-end">
          <div className="flex-1 glass rounded-2xl border border-white/8 overflow-hidden">
            <textarea
              value={input}
              onChange={e => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"; }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Type your answer… (Enter to send, Shift+Enter for new line)"
              className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none min-h-[44px] max-h-[120px] placeholder:text-white/25"
              rows={1}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="h-12 w-12 rounded-2xl flex items-center justify-center disabled:opacity-40 transition"
            style={{ background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" }}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : <Send className="h-4 w-4 text-white" />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
