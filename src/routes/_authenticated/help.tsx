import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Book, MessageSquare, Bug, ChevronDown, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/help")({
  component: HelpPage,
});

const FAQS = [
  {
    question: "How does the Placement Score work?",
    answer: "The Placement Score is a comprehensive metric calculated from your Resume ATS score, DSA problem-solving depth, GitHub repository activity, completed Projects, and core Skills. It predicts your readiness for top-tier tech interviews.",
  },
  {
    question: "How GitHub Intelligence works",
    answer: "By linking your GitHub username in your Profile, SyncRole fetches your real repositories, commit history, language statistics, and star counts. This data is used to provide accurate, recruiter-facing intelligence on your coding activity.",
  },
  {
    question: "How SyncPilot works",
    answer: "SyncPilot is your AI Career Twin. It operates in multiple modes: Career Twin (for personalized advice), Interview Chamber (for mock technical interviews), and Recruiter Mode (to simulate how a hiring manager sees your profile based on your data).",
  },
  {
    question: "Uploading and Analyzing Resumes",
    answer: "Navigate to the Resume Intelligence page to upload your PDF resume. Our system parses the content to evaluate ATS compatibility, formatting, and impact, providing actionable feedback to improve your chances of passing automated screens.",
  }
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="rounded-lg bg-black/20 border border-white/5 overflow-hidden transition-colors hover:border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora"
      >
        <span className="text-white font-medium">{question}</span>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HelpPage() {
  const { user } = useAuth();
  
  // Modals state
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [bugModalOpen, setBugModalOpen] = useState(false);
  
  // Forms state
  const [loading, setLoading] = useState(false);
  
  const [supportForm, setSupportForm] = useState({ subject: "", category: "Technical Issue", description: "", email: user?.email || "" });
  const [bugForm, setBugForm] = useState({ title: "", description: "", expected: "", location: "" });

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.subject.trim() || !supportForm.description.trim()) {
      toast.error("Subject and description are required.");
      return;
    }
    
    setLoading(true);
    // Simulate processing delay for client-side action
    setTimeout(() => {
      setLoading(false);
      setSupportModalOpen(false);
      
      const body = `Category: ${supportForm.category}\nEmail: ${supportForm.email}\n\nDescription:\n${supportForm.description}`;
      window.location.href = `mailto:support@syncrole.com?subject=${encodeURIComponent(supportForm.subject)}&body=${encodeURIComponent(body)}`;
      
      toast.success("Opening your email client to send the support request.", {
        description: "No backend support service is active, utilizing client-side mailto."
      });
      setSupportForm({ subject: "", category: "Technical Issue", description: "", email: user?.email || "" });
    }, 800);
  };

  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugForm.title.trim() || !bugForm.description.trim()) {
      toast.error("Bug title and description are required.");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBugModalOpen(false);
      
      const body = `URL/Location: ${bugForm.location}\nUser Agent: ${navigator.userAgent}\n\nWhat happened:\n${bugForm.description}\n\nExpected behavior:\n${bugForm.expected}`;
      window.location.href = `mailto:bugs@syncrole.com?subject=${encodeURIComponent(`Bug: ${bugForm.title}`)}&body=${encodeURIComponent(body)}`;
      
      toast.success("Opening your email client to send the bug report.", {
        description: "No backend bug tracking is active, utilizing client-side mailto."
      });
      setBugForm({ title: "", description: "", expected: "", location: "" });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-10 pb-32">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-aurora" /> Help & Support
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">Find answers, get help, and learn how to use SyncRole effectively.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Documentation & FAQs */}
        <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 space-y-6 shadow-lg md:col-span-2 lg:col-span-1">
          <h2 className="font-semibold text-xl border-b border-white/5 pb-4 flex items-center gap-2">
            <Book className="w-5 h-5 text-aurora" /> Documentation & FAQs
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <FAQItem key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="space-y-6 md:col-span-2 lg:col-span-1">
          {/* Contact Support */}
          <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 space-y-5 shadow-lg">
            <h2 className="font-semibold text-xl border-b border-white/5 pb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-aurora" /> Contact Support
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Need personal assistance or have a specific question about your account? Our support team is here to help.
            </p>
            <Button 
              onClick={() => setSupportModalOpen(true)}
              className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/5 h-11"
            >
              Open Support Ticket
            </Button>
          </div>

          {/* Report a Bug */}
          <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 space-y-5 shadow-lg">
            <h2 className="font-semibold text-xl border-b border-white/5 pb-4 flex items-center gap-2">
              <Bug className="w-5 h-5 text-aurora" /> Report a Problem
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Spotted something weird or unexpected? Let us know so we can fix it and improve SyncRole.
            </p>
            <Button 
              onClick={() => setBugModalOpen(true)}
              variant="outline" 
              className="w-full border-aurora/30 text-aurora hover:bg-aurora/10 h-11"
            >
              Submit Bug Report
            </Button>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      <AnimatePresence>
        {supportModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !loading && setSupportModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg glass-strong border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
              role="dialog" aria-modal="true" aria-labelledby="support-title"
            >
              <button onClick={() => setSupportModalOpen(false)} disabled={loading} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/60 transition disabled:opacity-50">
                <X className="w-4 h-4" />
              </button>
              
              <h2 id="support-title" className="text-xl font-bold mb-6 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-aurora" /> Open Support Ticket</h2>
              
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/70">Subject *</label>
                  <input required disabled={loading} value={supportForm.subject} onChange={e => setSupportForm({...supportForm, subject: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors" placeholder="Brief summary of your issue" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70">Category</label>
                    <select disabled={loading} value={supportForm.category} onChange={e => setSupportForm({...supportForm, category: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors appearance-none cursor-pointer">
                      <option className="bg-slate-900">Technical Issue</option>
                      <option className="bg-slate-900">Account Issue</option>
                      <option className="bg-slate-900">Feature Question</option>
                      <option className="bg-slate-900">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70">Email address</label>
                    <input type="email" disabled={loading} value={supportForm.email} onChange={e => setSupportForm({...supportForm, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors" placeholder="name@example.com" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/70">Description *</label>
                  <textarea required disabled={loading} value={supportForm.description} onChange={e => setSupportForm({...supportForm, description: e.target.value})} rows={4} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors resize-none" placeholder="Please describe your issue in detail..." />
                </div>
                
                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setSupportModalOpen(false)} disabled={loading} className="text-white/70 hover:text-white hover:bg-white/5">Cancel</Button>
                  <Button type="submit" disabled={loading} className="bg-aurora text-black hover:bg-aurora/90 font-medium">
                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : <><Send className="w-4 h-4 mr-2" /> Submit Request</>}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bug Report Modal */}
      <AnimatePresence>
        {bugModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !loading && setBugModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg glass-strong border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
              role="dialog" aria-modal="true" aria-labelledby="bug-title"
            >
              <button onClick={() => setBugModalOpen(false)} disabled={loading} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/60 transition disabled:opacity-50">
                <X className="w-4 h-4" />
              </button>
              
              <h2 id="bug-title" className="text-xl font-bold mb-6 flex items-center gap-2"><Bug className="w-5 h-5 text-aurora" /> Submit Bug Report</h2>
              
              <form onSubmit={handleBugSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/70">Bug Title *</label>
                  <input required disabled={loading} value={bugForm.title} onChange={e => setBugForm({...bugForm, title: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors" placeholder="Short description of the bug" />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/70">What happened? *</label>
                  <textarea required disabled={loading} value={bugForm.description} onChange={e => setBugForm({...bugForm, description: e.target.value})} rows={3} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors resize-none" placeholder="Steps to reproduce or what you observed..." />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70">Expected behavior</label>
                    <input disabled={loading} value={bugForm.expected} onChange={e => setBugForm({...bugForm, expected: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors" placeholder="What should have happened" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70">Page / Location</label>
                    <input disabled={loading} value={bugForm.location} onChange={e => setBugForm({...bugForm, location: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-aurora/50 transition-colors" placeholder="e.g. /dashboard or Profile Page" />
                  </div>
                </div>
                
                <div className="pt-4 flex items-center justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setBugModalOpen(false)} disabled={loading} className="text-white/70 hover:text-white hover:bg-white/5">Cancel</Button>
                  <Button type="submit" disabled={loading} className="border-aurora/30 text-aurora hover:bg-aurora hover:text-black font-medium transition-colors">
                    {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : <><Bug className="w-4 h-4 mr-2" /> Report Bug</>}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

