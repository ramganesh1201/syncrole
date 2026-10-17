import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Lock, Send, User, ChevronRight, MessageSquare, ArrowDown, Sparkles
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useChatScroll } from "@/hooks/useChatScroll";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { SyncPilotMark } from "./SyncPilotButton";

type Props = {
  onClose: () => void;
};

const DEMO_QUICK_PROMPTS = [
  "Analyze my career path",
  "Can I get into Google?",
  "Create a 6 month roadmap",
  "Review my resume",
  "Improve placement score"
];

function MessageBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  const isUser = role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-2xs mt-0.5">
          <SyncPilotMark className="h-3.5 w-3.5" />
        </div>
      )}
      <div
        className={`max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed break-words overflow-hidden ${
          isUser
            ? "bg-blue-600 text-white rounded-tr-xs shadow-xs"
            : "bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-xs"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-7 w-7 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 text-slate-600 mt-0.5 shadow-2xs">
          <User className="h-3.5 w-3.5" />
        </div>
      )}
    </motion.div>
  );
}

export function GuestDemoMode({ onClose }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hi! I'm SyncPilot. Welcome to the **SyncPilot Demo**.\n\nI can show you how I analyze resumes, build roadmaps, and predict placement readiness for students.\n\nAsk me a question or try a quick prompt below. (3 free demo messages available)"
    }
  ]);
  const [demoCount, setDemoCount] = useState(0);
  const [locked, setLocked] = useState(false);
  
  const { scrollRef, showScrollButton, handleScroll, scrollToBottom } = useChatScroll(messages);
  const nav = useNavigate();

  const handleSend = (text: string) => {
    if (!text.trim() || locked) return;
    
    const count = demoCount + 1;
    setDemoCount(count);
    setMessages(prev => [...prev, { role: "user", content: text }]);
    setInput("");

    setTimeout(() => {
      if (count > 3) {
        setLocked(true);
      } else {
        // Predefined demo responses
        let response = "";
        const lower = text.toLowerCase();
        
        if (lower.includes("sde-1") || lower.includes("sde 1") || lower.includes("how do i become")) {
          response = "To become an SDE-1:\n\n• Build DSA foundations\n• Create real projects\n• Improve resume quality\n• Practice interviews\n\nFor personalized guidance based on your resume, GitHub, DSA progress and placement score, sign in to SyncRole.";
        } else if (lower.includes("resume")) {
          response = "I use AI to scan resumes line-by-line against actual ATS systems and job descriptions. I look for action verbs, metric-driven bullet points, and correct formatting.\n\nIf you sign in and upload yours, I'll give you a detailed score and step-by-step improvement plan.";
        } else if (lower.includes("google") || lower.includes("faang")) {
          response = "Companies like Google expect strong problem-solving skills (DSA) and system design knowledge. Their ideal candidate typically has an ATS score >85 and consistent GitHub activity.\n\nI can analyze your specific profile and tell you exactly how far you are from their bar. Sign in to find out.";
        } else if (lower.includes("roadmap")) {
          response = "I can generate personalized study roadmaps that adapt daily based on your progress. They cover DSA, system design, and core CS fundamentals.\n\nTo create your custom 6-month roadmap, please sign in.";
        } else {
          response = "This is a demo mode of SyncPilot.\n\nIn the full version, I use your actual data (Resume, GitHub, Interview scores, DSA logs) to provide hyper-personalized career guidance.\n\nTry asking: 'How do I become SDE-1?' or sign in to unlock my full intelligence.";
        }
        
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        
        if (count === 3) {
          setTimeout(() => setLocked(true), 1500);
        }
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] text-slate-900 selection:bg-blue-500/20 font-sans">
      {/* ── Top Header ── */}
      <div className="flex-shrink-0 px-4 py-3 bg-white border-b border-slate-200/90 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-8 w-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
            <SyncPilotMark className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 leading-none">
              <h2 className="font-bold text-sm text-slate-900 tracking-tight">SyncPilot</h2>
              <span className="rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-700 border border-amber-200 bg-amber-50">
                Demo
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-500 mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>AI Career Guide</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="h-8 w-8 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition active:scale-95 cursor-pointer"
          title="Close"
          aria-label="Close SyncPilot Demo"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* ── Main Chat Area ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        <div className="flex-1 overflow-y-auto px-3.5 sm:px-4 py-3.5 space-y-3" ref={scrollRef} onScroll={handleScroll}>
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}
          
          {!locked && messages.length < 5 && demoCount < 3 && (
            <div className="pt-2 space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 px-1 font-semibold">
                Suggested Prompts
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_QUICK_PROMPTS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="rounded-xl px-3 py-1.5 text-[11px] font-medium text-left bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-700 border border-slate-200/90 hover:border-blue-200 shadow-2xs transition-all active:scale-98 cursor-pointer"
                  >
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {locked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm text-center relative overflow-hidden"
            >
              <div className="relative z-10 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 mx-auto flex items-center justify-center text-blue-600 shadow-2xs">
                  <Lock className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Unlock Full SyncPilot Intelligence</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    You&apos;ve reached the end of the free demo. Sign in to access your personalized AI career twin.
                  </p>
                </div>
                
                <div className="text-left space-y-1.5 text-xs text-slate-600 max-w-xs mx-auto pt-1">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Career Twin & Roadmaps
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#EEF2FB]0" /> Recruiter Mode & ATS Scan
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Interactive Mock Interviews
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    nav({ to: "/auth" });
                  }}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow-sm active:scale-98 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Sign In to Continue</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
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
                className="h-8 w-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition pointer-events-auto active:scale-95 cursor-pointer"
              >
                <ArrowDown className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Input Composer ── */}
        <div className="flex-shrink-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/90 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <div className="flex gap-2 items-end">
            <div className="flex-1 bg-slate-50 border border-slate-200/90 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 rounded-2xl overflow-hidden transition-all shadow-2xs">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder={locked ? "Demo limit reached" : "Ask SyncPilot anything..."}
                disabled={locked}
                className="w-full bg-transparent px-3.5 py-2.5 text-sm outline-none resize-none min-h-[42px] max-h-[100px] text-slate-900 placeholder:text-slate-400 font-sans"
                rows={1}
              />
            </div>
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || locked}
              className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition disabled:opacity-40 bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white shadow-xs hover:shadow-sm active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3 text-slate-400" />
              <span>{3 - Math.min(3, demoCount)} demo messages left</span>
            </span>
            <span className="text-slate-400">SyncPilot Demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

