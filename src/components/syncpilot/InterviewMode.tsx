import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Brain, Send, Loader2, User, Timer, Trophy,
  ChevronLeft, History, CheckCircle2, Star, AlertCircle, ArrowDown, Sparkles
} from "lucide-react";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { ConversationHistory } from "./ConversationHistory";
import { useChatScroll } from "@/hooks/useChatScroll";

type Props = {
  onClose: () => void;
  onSwitchMode: (m: SyncPilotMode) => void;
};

const COMPANY_PRESETS = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Swiggy", "Uber"];
const ROLE_PRESETS    = ["SDE-1", "SDE-2", "Backend Engineer", "Frontend Engineer", "Full Stack", "ML Engineer"];

function InterviewTimer({ running }: { running: boolean }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  const isLong = seconds > 2700;

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-bold ${
      isLong ? "border-amber-300 bg-amber-50 text-amber-700" : "border-indigo-100 bg-indigo-50 text-indigo-700"
    }`}>
      <Timer className="h-3.5 w-3.5" />
      <span>{m}:{s}</span>
    </div>
  );
}

function ScoreCard({ score, feedback, strengths, weaknesses }: { score: number; feedback: string; strengths: string[]; weaknesses: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl space-y-6 max-w-lg mx-auto"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 rounded-2xl bg-indigo-50 border border-indigo-100 items-center justify-center text-indigo-600">
          <Trophy className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Interview Evaluation</h3>
        <p className="text-xs text-slate-500">Feedback based on your responses during this mock session.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {strengths.length > 0 && (
          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3.5 space-y-1.5">
            <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Strengths
            </div>
            <ul className="space-y-1">
              {strengths.map((s, i) => (
                <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1">
                  <Star className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {weaknesses.length > 0 && (
          <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-3.5 space-y-1.5">
            <div className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4" /> Key Focus Areas
            </div>
            <ul className="space-y-1">
              {weaknesses.map((w, i) => (
                <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1">
                  <AlertCircle className="h-3 w-3 text-amber-600 shrink-0 mt-0.5" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed">
        {feedback}
      </div>
    </motion.div>
  );
}

type Phase = "setup" | "active" | "scorecard";

export function InterviewMode({ onClose, onSwitchMode }: Props) {
  const { messages, loading, sendMessage, loadUserData, userData, startNewConversation, conversations, loadConversation } = useSyncPilot();
  const [phase, setPhase] = useState<Phase>("setup");
  const [company, setCompany] = useState("");
  const [role, setRole]    = useState("");
  const [input, setInput]  = useState("");
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [scoreData, setScoreData] = useState<{
    score: number; feedback: string; strengths: string[]; weaknesses: string[];
  } | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const { scrollRef, showScrollButton, handleScroll, scrollToBottom } = useChatScroll(messages);

  useEffect(() => { loadUserData(); }, []);

  useEffect(() => {
    if (userData?.profile) {
      if (!company && userData.profile.dream_companies?.length > 0) {
        setCompany(userData.profile.dream_companies[0]);
      }
      if (!role && userData.profile.target_role) {
        setRole(userData.profile.target_role);
      }
    }
  }, [userData]);

  useEffect(() => {
    if (messages.length > 0 && phase === "setup") {
      setPhase("active");
      setInterviewStarted(true);
    }
  }, [messages, phase]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.role !== "assistant") return;
    const content = lastMsg.content.toLowerCase();
    if (content.includes("overall score") || content.includes("interview complete") || content.includes("final score")) {
      const scoreMatch = lastMsg.content.match(/(?:overall score|final score)[:\s]+(\d+)/i);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
      if (score > 0) {
        setScoreData({
          score,
          feedback: lastMsg.content.slice(0, 300),
          strengths: extractList(lastMsg.content, "strength"),
          weaknesses: extractList(lastMsg.content, "weakness|improve|work on"),
        });
        setPhase("scorecard");
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
    setPhase("active");
    setInterviewStarted(true);
    sendMessage(
      `Start my technical mock interview now. I am applying for ${role || "Software Engineer"} at ${company || "Top Tech"}. Begin with a brief introduction, then ask me the first question based on my profile data, projects, and DSA progress.`,
      { company, role }
    );
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
      <div className="h-full flex flex-col bg-[#F8FAFC] text-slate-900 font-sans relative overflow-hidden">
        {/* Top Header */}
        <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-slate-200/90 z-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900 leading-none">Interview Mode</div>
                <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                  AI Mock Technical & Behavioral Interviewer
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowHistory((v) => !v)}
                className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
                title="History"
              >
                <History className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center transition cursor-pointer"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => onSwitchMode("career_twin")}
              className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
            >
              Career Twin
            </button>
            <button
              onClick={() => onSwitchMode("recruiter")}
              className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
            >
              Recruiter Mode
            </button>
            <button className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full whitespace-nowrap shadow-xs">
              Interview Mode
            </button>
          </div>
        </div>

        {/* Setup Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          <AnimatePresence>
            {showHistory && (
              <ConversationHistory
                conversations={conversations}
                onSelect={(id) => { loadConversation(id); setShowHistory(false); }}
                onClose={() => setShowHistory(false)}
              />
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-6 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 items-center justify-center text-blue-600 mb-1">
                <Brain className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Interview Chamber</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Practice technical questions, system design, and communication for your target role.
              </p>
            </div>

            {/* Target Company */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Target Company</label>
              <div className="flex flex-wrap gap-1.5">
                {COMPANY_PRESETS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCompany(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer border ${
                      company === c
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Role */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Target Role</label>
              <div className="flex flex-wrap gap-1.5">
                {ROLE_PRESETS.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer border ${
                      role === r
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startInterview}
              disabled={!company || !role}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white font-semibold py-3 text-xs tracking-wide shadow-md shadow-indigo-500/20 transition active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              Start Mock Interview →
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── SCORECARD PHASE ──
  if (phase === "scorecard" && scoreData) {
    return (
      <div className="h-full flex flex-col bg-[#F8FAFC] text-slate-900 overflow-y-auto p-4">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
          <X className="h-4 w-4 text-slate-600" />
        </button>
        <div className="flex-1 flex items-center justify-center py-6">
          <div className="w-full space-y-4">
            <ScoreCard {...scoreData} />
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setPhase("setup"); setScoreData(null); setInterviewStarted(false); }}
                className="bg-white hover:bg-slate-50 border border-slate-200 rounded-xl px-5 py-2.5 text-xs font-semibold text-slate-700 transition"
              >
                Start New Practice Session
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ACTIVE INTERVIEW PHASE ──
  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Top Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-slate-200/90 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Brain className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 leading-none">AI Technical Interviewer</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5">{company} · {role}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <InterviewTimer running={interviewStarted} />
          <button
            onClick={() => setPhase("setup")}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition"
          >
            End
          </button>
          <button onClick={onClose} className="h-8 w-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600 transition">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-hidden flex relative">
        <AnimatePresence>
          {showHistory && (
            <ConversationHistory
              conversations={conversations}
              onSelect={(id) => { loadConversation(id); setShowHistory(false); }}
              onClose={() => setShowHistory(false)}
            />
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4" ref={scrollRef} onScroll={handleScroll}>
            {messages.map((m: any, i: number) => {
              const isUser = m.role === "user";
              return (
                <motion.div
                  key={m.id ?? i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="h-7 w-7 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed break-words overflow-hidden ${
                    isUser
                      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-medium rounded-tr-xs shadow-xs"
                      : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs space-y-1.5"
                  }`}>
                    {m.content.split("\n").map((line: string, li: number) => (
                      <p key={li} className={line === "" ? "h-1.5" : ""}>{line}</p>
                    ))}
                  </div>
                  {isUser && (
                    <div className="h-7 w-7 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xs w-fit">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
                <span className="font-medium">Evaluating response & generating next question…</span>
              </div>
            )}
          </div>

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

          {/* Composer */}
          <div className="flex-shrink-0 p-3 bg-white border-t border-slate-200/90 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex gap-2 items-end">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  placeholder="Type your answer to the interviewer…"
                  className="w-full bg-transparent px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none resize-none min-h-[44px] max-h-[120px]"
                  rows={1}
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-40 transition shadow-xs cursor-pointer"
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
