import { motion } from "framer-motion";
import { Rocket, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";

export default function FinalCTA() {
  const { user } = useAuth();
  const nav = useNavigate();

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative p-px rounded-3xl overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] opacity-50 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] animate-spin-slow opacity-25" />

          <div className="relative glass-strong rounded-[23px] p-12 md:p-20 text-center overflow-hidden bg-card/90 backdrop-blur-3xl">
            {/* Glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-aurora opacity-30 blur-3xl pointer-events-none" />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs border border-white/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.88_0.18_145)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)]" />
              </span>
              <span className="text-muted-foreground tracking-wide">50,000+ Students. Real Outcomes.</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="relative font-display text-4xl md:text-6xl font-bold tracking-tight"
            >
              Stop Guessing.{" "}
              <br />
              <span className="text-aurora">Know Exactly What Gets You Hired.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative mt-6 text-muted-foreground max-w-xl mx-auto text-lg"
            >
              Join students who replaced guesswork with intelligence. SyncRole gives you the exact data, path, and tools to get hired faster.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="relative mt-12 flex flex-wrap justify-center gap-4"
            >
              {/* Launch SyncPilot */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  // SyncPilot launcher is in global context — trigger via a custom event
                  window.dispatchEvent(new CustomEvent("open-syncpilot"));
                }}
                className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                <span className="absolute inset-0 rounded-full bg-aurora" />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Launch SyncPilot
                </span>
              </motion.button>

              {/* Start Free */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => nav({ to: user ? "/dashboard" : "/auth" })}
                className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.88_0.18_145)] to-[oklch(0.75_0.2_200)]" />
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="h-4 w-4" /> {user ? "Open Dashboard" : "Start Free"}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.button>

              {/* Talk to Sales */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => window.open("mailto:hello@syncrole.app?subject=Sales Inquiry", "_blank")}
                className="inline-flex items-center gap-2 glass-strong rounded-full px-8 py-4 text-sm font-semibold hover:bg-white/10 transition border border-white/10"
              >
                <MessageSquare className="h-4 w-4" /> Talk To Sales
              </motion.button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="relative mt-14 flex flex-wrap justify-center gap-8 text-xs text-muted-foreground"
            >
              {[
                "✓ Free to start",
                "✓ No credit card required",
                "✓ Real AI analysis",
                "✓ Cancel anytime",
              ].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
