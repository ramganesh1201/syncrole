import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThinkingOrb } from "thinking-orbs";
import {
  X, Briefcase, Send, Loader2, User,
  TrendingUp, CheckCircle2, Brain,
  Target, Shield, Zap, BarChart3, History, ArrowDown, Sparkles
} from "lucide-react";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { ConversationHistory } from "./ConversationHistory";
import { useChatScroll } from "@/hooks/useChatScroll";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

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
    p >= 70 ? "text-emerald-600" : p >= 45 ? "text-amber-600" : "text-rose-600";

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Hiring Probability</div>
        <BarChart3 className="h-4 w-4 text-slate-400" />
      </div>
      <div className="flex items-end gap-3 mb-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className={`text-4xl font-extrabold ${getColor(probability)}`}
        >
          {probability}%
        </motion.div>
        <div className="pb-1 text-xs font-semibold text-slate-500">
          {probability >= 70 ? "Strong Candidate" : probability >= 45 ? "Moderate Fit" : "Needs Work"}
        </div>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${probability}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    </div>
  );
}

function ScoreBar({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-600 font-medium">{label}</span>
          <span className="font-bold text-slate-900">{value}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="h-7 w-7 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
          <Briefcase className="h-3.5 w-3.5" />
        </div>
      )}
      <div className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed break-words overflow-hidden ${
        isUser 
          ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-medium rounded-tr-xs shadow-xs" 
          : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs"
      }`}>
        {isUser ? (
          <p>{content}</p>
        ) : (
          <MarkdownRenderer content={content} />
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

export function RecruiterMode({ onClose, onSwitchMode }: Props) {
  const { messages, loading, userData, userDataLoading, sendMessage, loadUserData, conversations, loadConversation } = useSyncPilot();
  const [input, setInput] = useState("");
  const [autoReportSent, setAutoReportSent] = useState(false);
  const initializedRef = useRef(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
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
    if (!autoReportSent && !loading && !userDataLoading && messages.length === 0) {
      if (initializedRef.current) return;
      initializedRef.current = true;
      setAutoReportSent(true);
      sendMessage(RECRUITER_PROMPTS[0], { company, role });
    }
  }, [userDataLoading, autoReportSent, loading, messages.length, company, role, sendMessage]);

  const ps = userData?.placementScore;

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    await sendMessage(msg, { company, role });
  }

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] text-slate-900 font-sans">
      {/* ── Top Header ── */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-slate-200/90 z-10">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900 leading-none">Recruiter Mode</div>
              <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                AI Recruiter & ATS Candidate Evaluation
              </div>
            </div>
          </div>

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
          <button
            onClick={() => onSwitchMode("career_twin")}
            className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
          >
            Career Twin
          </button>
          <button className="text-xs font-semibold bg-purple-600 text-white px-3 py-1 rounded-full whitespace-nowrap shadow-xs">
            Recruiter Mode
          </button>
          <button
            onClick={() => onSwitchMode("interview")}
            className="text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3 py-1 rounded-full whitespace-nowrap transition cursor-pointer"
          >
            Interview Mode
          </button>
        </div>

        {/* Company & Role Controls */}
        <div className="mt-2.5 flex gap-2">
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Target company (e.g. Google)"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-purple-500"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Target role (e.g. Senior SDE)"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </div>

      {/* ── Content Layout ── */}
      <div className="flex-1 overflow-hidden flex relative">
        <AnimatePresence>
          {showHistory && (
            <ConversationHistory
              conversations={conversations}
              onSelect={(id) => { loadConversation(id); setShowHistory(false); }}
              onClose={() => setShowHistory(false)}
            />
          )}
        </AnimatePresence>

        {/* Left Snapshot Sidebar (Desktop) */}
        {!showHistory && (
          <div className="hidden sm:block flex-shrink-0 w-64 border-r border-slate-200/80 overflow-y-auto p-3 space-y-3 bg-white/60">
            <HiringMeter probability={ps?.total_score ?? 0} />

            <div className="bg-white rounded-2xl p-3 space-y-2.5 border border-slate-200/80 shadow-xs">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score Breakdown</div>
              <ScoreBar label="ATS / Resume" value={ps?.resume_score ?? 0} icon={Shield} />
              <ScoreBar label="DSA Depth" value={ps?.dsa_score ?? 0} icon={Brain} />
              <ScoreBar label="GitHub" value={ps?.github_score ?? 0} icon={Zap} />
              <ScoreBar label="Projects" value={ps?.projects_score ?? 0} icon={Target} />
              <ScoreBar label="Skills" value={ps?.skill_score ?? 0} icon={TrendingUp} />
            </div>

            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1">Recruiter Prompts</div>
              {RECRUITER_PROMPTS.slice(1).map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="w-full text-left bg-white hover:bg-slate-50 rounded-xl p-2 text-[11px] font-medium text-slate-700 hover:text-purple-600 transition border border-slate-200/70 truncate cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right Chat Panel */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
          <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4" ref={scrollRef} onScroll={handleScroll}>
            {messages.length === 0 && !loading && (
              <div className="text-center text-slate-400 text-xs py-8">
                Generating your Recruiter Report…
              </div>
            )}

            {messages.map((m: any, i: number) => (
              <MessageBubble key={m.id ?? i} role={m.role} content={m.content} />
            ))}

            {loading && (
              <div className="flex items-center gap-2.5 text-xs text-slate-500 bg-white border border-slate-200/90 rounded-2xl px-4 py-2.5 shadow-xs w-fit">
                <ThinkingOrb state="searching" size={20} />
                <span className="font-medium">Evaluating profile fit…</span>
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

          {/* Input Composer */}
          <div className="flex-shrink-0 p-3 bg-white border-t border-slate-200/90 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="Ask the recruiter anything…"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-purple-500"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className="h-10 w-10 shrink-0 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center disabled:opacity-40 transition shadow-xs cursor-pointer"
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
