import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

export default function FinalCTA() {
  const { user } = useAuth();
  const nav = useNavigate();

  return (
    <section className="relative py-20 md:py-28 px-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="surface-primary rounded-2xl p-8 md:p-14 text-center border border-white/10 shadow-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-semibold text-muted-foreground"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Built for Computer Science Engineers & Job Seekers</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-foreground"
          >
            Stop Guessing. <span className="text-cyan-400">Know What Gets You Hired.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            Replace guesswork with a continuous career operating system that analyzes your capability, builds your roadmap, and tracks your readiness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-2 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => nav({ to: user ? "/dashboard" : "/auth" })}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 text-sm font-semibold transition shadow-md cursor-pointer"
            >
              <span>{user ? "Open Workspace Dashboard" : "Start Free Now"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-syncpilot"));
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-foreground border border-white/10 px-5 py-3 text-sm font-semibold transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>Launch SyncPilot</span>
            </button>

            <button
              onClick={() => window.open("mailto:hello@syncrole.app?subject=Inquiry", "_blank")}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground border border-white/10 px-5 py-3 text-sm font-semibold transition cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Contact Team</span>
            </button>
          </motion.div>

          <div className="pt-4 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground font-medium">
            <span>✓ Free to get started</span>
            <span>✓ Real AI analysis</span>
            <span>✓ No credit card required</span>
          </div>
        </div>
      </div>
    </section>
  );
}
