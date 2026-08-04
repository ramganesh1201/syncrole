import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox, Bell, AlertTriangle, Sparkles, Trophy, Info, ChevronRight, X } from "lucide-react";
import { ContextualInboxItem } from "@/lib/career-intelligence";

interface AIInboxProps {
  items: ContextualInboxItem[];
}

export function AIInbox({ items }: AIInboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getCategoryIcon = (category: ContextualInboxItem["category"]) => {
    switch (category) {
      case "blocking":
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case "opportunity":
        return <Sparkles className="w-4 h-4 text-accent" />;
      case "achievement":
        return <Trophy className="w-4 h-4 text-emerald-400" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass rounded-xl px-3.5 py-2 border border-white/10 flex items-center gap-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors relative"
      >
        <Bell className="w-4 h-4 text-accent" />
        <span>AI Inbox</span>
        {items.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-aurora text-primary-foreground text-[10px] font-bold grid place-items-center">
            {items.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-12 w-80 md:w-96 glass-strong rounded-2xl p-4 border border-white/15 shadow-2xl z-50 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <Inbox className="w-4 h-4 text-accent" /> Priority AI Inbox
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="glass rounded-xl p-3 border border-white/5 space-y-1.5 hover:bg-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-semibold text-white">
                      {getCategoryIcon(item.category)}
                      <span>{item.title}</span>
                    </div>
                    <span className="text-[9px] text-muted-foreground">{item.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{item.message}</p>

                  {item.actionRoute && (
                    <Link
                      to={item.actionRoute}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-aurora hover:underline pt-1"
                    >
                      {item.actionLabel || "Take Action"} <ChevronRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
