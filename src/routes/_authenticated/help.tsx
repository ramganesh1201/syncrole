import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HelpCircle, Book, MessageSquare, Bug, Keyboard, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/help")({
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-8 h-8 text-aurora" /> Help & Support
        </h1>
        <p className="text-muted-foreground">Find answers, get support, and learn how to maximize SyncRole.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><Book className="w-5 h-5 text-aurora" /> Documentation & FAQs</h3>
          <div className="text-sm text-muted-foreground space-y-4">
            <p>Browse our extensive guides on how to use SyncPilot, master DSA modules, and boost your Placement Readiness.</p>
            <div className="space-y-2">
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 transition-colors group">
                <span className="text-white group-hover:text-aurora transition-colors">How does the Placement Score work?</span>
                <ExternalLink className="w-4 h-4 opacity-50" />
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 transition-colors group">
                <span className="text-white group-hover:text-aurora transition-colors">Uploading and Analyzing Resumes</span>
                <ExternalLink className="w-4 h-4 opacity-50" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-aurora" /> Contact Support</h3>
          <div className="text-sm text-muted-foreground space-y-4">
            <p>Need personal assistance? Our support team is here to help you navigate your career journey.</p>
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/5">
              Open Support Ticket
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><Bug className="w-5 h-5 text-aurora" /> Report a Bug</h3>
          <div className="text-sm text-muted-foreground space-y-4">
            <p>Spotted something weird? Let us know so we can fix it immediately.</p>
            <Button variant="outline" className="w-full border-aurora/30 text-aurora hover:bg-aurora hover:text-black">
              Submit Bug Report
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.4 }} className="glass rounded-xl p-6 border border-white/5 space-y-6">
          <h3 className="font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2"><Keyboard className="w-5 h-5 text-aurora" /> Keyboard Shortcuts</h3>
          <div className="text-sm text-muted-foreground space-y-3">
            <div className="flex items-center justify-between">
              <span>Open SyncPilot</span>
              <kbd className="px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-white">⌘ + K</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Go to Dashboard</span>
              <kbd className="px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-white">G + D</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Toggle Theme</span>
              <kbd className="px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-white">⌘ + Shift + L</kbd>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
