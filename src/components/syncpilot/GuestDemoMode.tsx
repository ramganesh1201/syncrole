import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Brain, Lock, Send, User, ChevronRight, MessageSquare, ArrowDown
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useChatScroll } from "@/hooks/useChatScroll";

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
        {/* Render content with basic formatting */}
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
      </div>
      {isUser && (
        <div className="flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center shrink-0 border border-white/10">
          <User className="h-3.5 w-3.5 text-slate-300" />
        </div>
      )}
    </motion.div>
  );
}

export function GuestDemoMode({ onClose }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant", content: string }[]>([
    { role: "assistant", content: "Hi! I'm SyncPilot. Welcome to the **SyncPilot Demo**.\n\nI can show you how I analyze resumes, build roadmaps, and predict placement readiness for students.\n\nAsk me a question or try a quick prompt below. (3 free demo messages available)" }
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
          response = "This is a demo mode of SyncPilot. \n\nIn the full version, I use your actual data (Resume, GitHub, Interview scores, DSA logs) to provide hyper-personalized career guidance.\n\nTry asking: 'How do I become SDE-1?' or sign in to unlock my full intelligence.";
        }
        
        setMessages(prev => [...prev, { role: "assistant", content: response }]);
        
        if (count === 3) {
           setTimeout(() => setLocked(true), 1500);
        }
      }
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#07090e] text-slate-100 selection:bg-purple-500/30">
      {/* Header */}
      <div className="flex-shrink-0 px-3 sm:px-4 pt-3 pb-2.5 border-b border-white/10 bg-slate-950/95 backdrop-blur-md z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5 shrink-0">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-md"
            style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" }}
          >
            <Brain className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xs sm:text-sm text-white leading-none">SYNCPILOT DEMO</h2>
              <span className="glass rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider text-amber-300 border border-amber-500/30 bg-amber-500/10">Guest</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Explore the AI Career Operating System
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="h-8 w-8 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition text-slate-300 active:scale-95"
          title="Close"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-3" ref={scrollRef} onScroll={handleScroll}>
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}
          
          {!locked && messages.length < 5 && demoCount < 3 && (
            <div className="pt-2 space-y-2">
              <div className="text-[10px] uppercase tracking-widest text-slate-400 px-1 font-semibold">Demo Quick Prompts</div>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_QUICK_PROMPTS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="glass rounded-xl px-3 py-1.5 text-[11px] text-left hover:bg-white/10 transition text-slate-300 border border-white/5"
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
               className="mt-4 glass-strong rounded-2xl p-5 border border-white/10 text-center relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-purple-500/10 blur-2xl" />
               <div className="relative z-10 space-y-3">
                 <div className="h-10 w-10 rounded-full glass mx-auto flex items-center justify-center border border-white/20">
                   <Lock className="h-4 w-4 text-purple-400" />
                 </div>
                 <h3 className="text-sm font-bold text-white">Unlock Full SyncPilot Intelligence</h3>
                 <p className="text-xs text-slate-400">You&apos;ve reached the end of the demo. Sign in to access your personalized AI career twin.</p>
                 
                 <div className="text-left space-y-1.5 text-xs text-slate-300 max-w-xs mx-auto pt-1">
                   <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Career Twin</div>
                   <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Recruiter Mode</div>
                   <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Interview Chamber</div>
                 </div>

                 <button
                   onClick={() => {
                     onClose();
                     nav({ to: "/auth" });
                   }}
                   className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md active:scale-98 transition flex items-center justify-center gap-2"
                 >
                   <span>Sign In</span>
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
                className="h-9 w-9 rounded-full glass border border-white/20 shadow-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors pointer-events-auto active:scale-95"
              >
                <ArrowDown className="h-4 w-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Input Composer (Fixed at bottom) */}
        <div className="flex-shrink-0 p-3 border-t border-white/10 bg-slate-950/95 backdrop-blur-md pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
          <div className="flex gap-2 items-end">
            <div className="flex-1 glass rounded-2xl overflow-hidden border border-white/10">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder={locked ? "Demo limit reached" : "Ask SyncPilot..."}
                disabled={locked}
                className="w-full bg-transparent px-3.5 py-3 text-sm outline-none resize-none min-h-[44px] max-h-[100px] text-white placeholder:text-white/30"
                rows={1}
              />
            </div>
            <button
              onClick={() => handleSend(input)}
              disabled={!input.trim() || locked}
              className="h-11 w-11 shrink-0 rounded-2xl flex items-center justify-center transition disabled:opacity-40 bg-gradient-to-tr from-cyan-500 to-purple-600 text-white shadow-md active:scale-95"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-1.5 px-1 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3 opacity-60" /> {3 - Math.min(3, demoCount)} demo messages left
            </span>
            <span className="opacity-60">SyncPilot Demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
