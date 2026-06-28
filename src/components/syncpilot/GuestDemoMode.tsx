import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Brain, Lock, Send, User, ChevronRight, MessageSquare
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

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
        <div className="flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center">
          <User className="h-3.5 w-3.5" />
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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="flex flex-col h-full bg-background/50 relative">
      {/* Header */}
      <div className="flex-shrink-0 h-[68px] flex items-center justify-between px-5 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, oklch(0.75 0.2 200 / 20%), oklch(0.72 0.22 295 / 20%))", border: "1px solid oklch(0.72 0.22 295 / 30%)" }}>
            <Brain className="h-5 w-5 text-aurora" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-semibold tracking-wide text-sm">SYNCPILOT DEMO</h2>
              <span className="glass rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest text-amber-300 border border-amber-500/30 bg-amber-500/10">Guest</span>
            </div>
            <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
              Explore the AI Career Operating System
            </div>
          </div>
        </div>

        <button onClick={onClose} className="h-8 w-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        
        {!locked && messages.length < 5 && demoCount < 3 && (
          <div className="pt-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3 px-1">Demo Quick Prompts</div>
            <div className="flex flex-wrap gap-2">
              {DEMO_QUICK_PROMPTS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="glass rounded-xl px-3.5 py-2 text-[12px] text-left hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20"
                >
                  <span className="text-foreground">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {locked && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mt-6 glass-strong rounded-2xl p-6 border border-white/10 text-center relative overflow-hidden"
           >
             <div className="absolute inset-0 bg-aurora/10 blur-2xl" />
             <div className="relative z-10">
               <div className="h-12 w-12 rounded-full glass mx-auto flex items-center justify-center mb-4 border border-white/20">
                 <Lock className="h-5 w-5 text-aurora" />
               </div>
               <h3 className="font-display text-lg font-bold mb-2">Unlock Full SyncPilot Intelligence</h3>
               <p className="text-sm text-muted-foreground mb-4">You've reached the end of the demo. Sign in to access your personalized AI career twin.</p>
               
               <div className="text-left space-y-2 mb-6 text-sm ml-4 inline-block">
                 <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-aurora" /> Career Twin</div>
                 <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-[oklch(0.75_0.2_200)]" /> Recruiter Mode</div>
                 <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-[oklch(0.85_0.18_70)]" /> Interview Chamber</div>
                 <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-cyan-400" /> Resume & GitHub Analysis</div>
                 <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-amber-400" /> Placement Prediction</div>
               </div>

               <button
                 onClick={() => {
                   onClose();
                   nav({ to: "/auth" });
                 }}
                 className="w-full relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
               >
                 <span className="absolute inset-0 rounded-xl bg-aurora" />
                 <span className="relative z-10 flex items-center gap-2">
                   Sign In <ChevronRight className="h-4 w-4" />
                 </span>
               </button>
             </div>
           </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t border-white/5 bg-black/20">
        <div className="relative flex items-end gap-2 bg-black/40 border border-white/10 rounded-2xl p-2 pl-4 focus-within:border-white/30 transition-colors">
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
            className="w-full max-h-32 bg-transparent text-[13px] outline-none resize-none py-1.5 custom-scrollbar"
            rows={1}
            style={{ minHeight: "32px" }}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || locked}
            className="flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed text-white
              bg-aurora hover:opacity-90"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="h-3 w-3 opacity-60" /> {3 - Math.min(3, demoCount)} demo messages left
          </span>
          <span className="opacity-60">SyncPilot Demo</span>
        </div>
      </div>
    </div>
  );
}
