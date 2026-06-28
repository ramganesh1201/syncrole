import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, Target, Sparkles, BrainCircuit, Heart, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/_authenticated/career-identity")({
  component: CareerIdentityPage,
});

function CareerIdentityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Fingerprint className="w-8 h-8 text-aurora" /> Career Identity
        </h1>
        <p className="text-muted-foreground">Define your professional DNA. This data supercharges SyncPilot and Recruiter Mode.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><Target className="w-5 h-5 text-aurora" /> Career Goals</h3>
          <div className="text-sm text-muted-foreground">
            <p>Your primary objectives for the next 1-3 years.</p>
            <div className="mt-4 p-4 rounded-lg bg-black/20 border border-white/5 italic">
              "To transition into a Senior Frontend Engineering role at a high-growth startup, focusing on AI-driven interfaces."
            </div>
            <p className="mt-4 text-xs text-aurora">Coming soon: Editable goal framework.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-aurora" /> Core Interests</h3>
          <div className="text-sm text-muted-foreground">
            <div className="flex flex-wrap gap-2 mt-2">
              {['Design Systems', 'Machine Learning', 'Performance Optimization', 'UX Architecture'].map(i => (
                <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs">{i}</span>
              ))}
            </div>
            <p className="mt-6 text-xs text-aurora">Coming soon: Interest mapping.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-aurora" /> Superpowers & Strengths</h3>
          <div className="text-sm text-muted-foreground">
            <ul className="space-y-3 mt-2">
              <li className="flex items-start gap-2"><CheckCircleIcon /> Rapid prototyping</li>
              <li className="flex items-start gap-2"><CheckCircleIcon /> Cross-functional communication</li>
              <li className="flex items-start gap-2"><CheckCircleIcon /> Algorithmic problem solving</li>
            </ul>
            <p className="mt-6 text-xs text-aurora">Coming soon: Strengths assessment.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-aurora" /> AI Summary</h3>
          <div className="text-sm text-muted-foreground">
            <p>Based on your activity, SyncPilot views you as:</p>
            <div className="mt-4 p-4 rounded-lg bg-aurora/10 border border-aurora/20 text-white leading-relaxed">
              A highly motivated engineer with strong foundational DSA skills, actively improving system design concepts. You show a high velocity in learning new frontend frameworks.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-4 h-4 text-aurora shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
