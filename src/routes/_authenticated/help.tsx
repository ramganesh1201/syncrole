import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  MessageSquare, 
  Bug, 
  Send, 
  X, 
  Loader2, 
  ArrowLeft,
  Sparkles,
  BookOpen,
  Code2,
  FileText,
  GitBranch,
  Shield,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/help")({
  component: HelpPage,
});

interface FAQ {
  id: string;
  category: "scoring" | "dsa" | "resume_github" | "syncpilot" | "gate" | "account";
  question: string;
  summary: string;
  answer: string;
  relatedLink?: {
    label: string;
    href: string;
  };
}

const CATEGORIES = [
  { id: "all", label: "All Topics" },
  { id: "scoring", label: "Readiness & Scores" },
  { id: "dsa", label: "DSA Practice" },
  { id: "resume_github", label: "Resume & GitHub" },
  { id: "syncpilot", label: "SyncPilot AI" },
  { id: "gate", label: "GATE Hub" },
  { id: "account", label: "Account & Profile" },
] as const;

const FAQS: FAQ[] = [
  {
    id: "placement-score",
    category: "scoring",
    question: "How is the Placement Readiness Score calculated?",
    summary: "A holistic 0–100 index combining DSA solving, ATS resume strength, GitHub commits, and projects.",
    answer: "Your Placement Readiness Score is computed from four core pillars: (1) DSA solving depth and topic mastery across Easy/Medium/Hard problems, (2) ATS Resume score parsed from your uploaded PDF, (3) GitHub commit consistency, repository breadth, and stars, and (4) verified projects and coding profile links. SyncRole evaluates these factors against current tech hiring benchmarks.",
    relatedLink: {
      label: "View Dashboard Analytics",
      href: "/dashboard",
    },
  },
  {
    id: "syncpilot-modes",
    category: "syncpilot",
    question: "What are the different modes in SyncPilot AI?",
    summary: "Career Twin for personalized planning, Interview Chamber for mocks, and Recruiter Mode for profile audits.",
    answer: "SyncPilot operates across three targeted modes: (1) Career Twin provides personalized guidance, milestone tracking, and daily mission roadmaps. (2) Interview Chamber conducts interactive technical or behavioral mock interviews with instant feedback. (3) Recruiter Mode reviews your resume, GitHub signal, and skills from the perspective of an engineering hiring manager.",
  },
  {
    id: "resume-ats",
    category: "resume_github",
    question: "How does Resume Intelligence audit my resume?",
    summary: "Automated ATS compliance check, section breakdown, impact bullet metrics, and keyword gap analysis.",
    answer: "When you upload your PDF resume, SyncRole extracts the textual content and evaluates it against industry ATS guidelines. It checks layout readability, action-verb usage, quantified metrics (e.g., % improvements or scale), section ordering, and identifies missing keywords relevant to your target engineering roles.",
    relatedLink: {
      label: "Open Resume Intelligence",
      href: "/resume-intelligence",
    },
  },
  {
    id: "github-sync",
    category: "resume_github",
    question: "How does GitHub Intelligence gather commit data?",
    summary: "Connect your GitHub username in your Profile to sync real repositories, top languages, and commit momentum.",
    answer: "By specifying your GitHub username in your Profile, SyncRole fetches public repository statistics, recent commit cadence, most frequent programming languages, and star activity. This verified signal demonstrates real-world software delivery to recruiters without manual status updates.",
    relatedLink: {
      label: "Update GitHub in Profile",
      href: "/profile",
    },
  },
  {
    id: "dsa-roadmap",
    category: "dsa",
    question: "How does DSA tracking and topic mastery work?",
    summary: "Curated problem lists across patterns, topic heatmaps, company frequency tags, and daily missions.",
    answer: "The DSA Command Center tracks your progress across foundational computer science patterns (Arrays, Two Pointers, Trees, Graphs, Dynamic Programming). Each solved problem increments your XP and topic mastery percentage, updating your daily streak and company readiness metrics.",
    relatedLink: {
      label: "Explore DSA Problems",
      href: "/dsa-problems",
    },
  },
  {
    id: "gate-hub",
    category: "gate",
    question: "What is available in the GATE 2027 Information Hub?",
    summary: "Official syllabus, timeline milestones, paper patterns, and academic reference resources.",
    answer: "The GATE Hub contains source-verified examination data for GATE CSE, DA, and supported engineering papers. You can inspect subject weightages, official dates, question formats (MCQ/MSQ/NAT), eligibility criteria, and curated academic preparation links.",
    relatedLink: {
      label: "Visit GATE 2027 Hub",
      href: "/gate",
    },
  },
  {
    id: "profile-visibility",
    category: "account",
    question: "Who can see my SyncRole profile and achievements?",
    summary: "By default, your profile is private until you enable public recruiter visibility in Settings.",
    answer: "Your preparations, notes, and progress remain private to you. In Settings > Privacy, you can toggle 'Public Recruiter Visibility' to allow verified partner companies and hiring managers to discover your Career Identity, projects, and verified scores.",
    relatedLink: {
      label: "Manage Privacy Settings",
      href: "/settings",
    },
  },
  {
    id: "daily-missions",
    category: "scoring",
    question: "How do Daily Missions and XP streaks work?",
    summary: "Complete 3 daily actions (DSA problem, resume update, quiz) to keep your streak and earn placement XP.",
    answer: "Daily Missions are tailored recommendations generated by your AI Coach to keep preparation consistent. Completing daily missions awards XP, raises your placement level, and reinforces learning habits ahead of campus and off-campus recruitment drives.",
    relatedLink: {
      label: "Check Today's Missions",
      href: "/dashboard",
    },
  },
];

function FAQAccordionItem({ 
  faq, 
  isOpen, 
  onToggle 
}: { 
  faq: FAQ; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200 hover:border-slate-300">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-2xl gap-4 cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="space-y-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {faq.question}
          </h3>
          <p className="text-xs text-slate-500 leading-normal line-clamp-1 sm:line-clamp-none">
            {faq.summary}
          </p>
        </div>
        <div className={`w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-500 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 bg-blue-50 text-blue-600 border-blue-200" : ""}`}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
              <p className="pt-3">{faq.answer}</p>
              
              {faq.relatedLink && (
                <div className="pt-1">
                  <Link
                    to={faq.relatedLink.href as any}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200/60 transition-colors"
                  >
                    <span>{faq.relatedLink.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HelpPage() {
  const { user } = useAuth();
  
  // Search and Category State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("placement-score");

  // Modals state
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [bugModalOpen, setBugModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Forms state
  const [supportForm, setSupportForm] = useState({ 
    subject: "", 
    category: "Technical Question", 
    description: "", 
    email: user?.email || "" 
  });
  const [bugForm, setBugForm] = useState({ 
    title: "", 
    description: "", 
    expected: "", 
    location: "" 
  });

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.summary.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.subject.trim() || !supportForm.description.trim()) {
      toast.error("Please fill in the subject and description.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSupportModalOpen(false);

      const body = `User Email: ${supportForm.email || user?.email || "Not provided"}\nCategory: ${supportForm.category}\n\nDetails:\n${supportForm.description}`;
      window.location.href = `mailto:support@syncrole.com?subject=${encodeURIComponent(`[SyncRole Support] ${supportForm.subject}`)}&body=${encodeURIComponent(body)}`;

      toast.success("Support request prepared in your mail client.", {
        description: "Review and send from your preferred email application."
      });
      setSupportForm({ subject: "", category: "Technical Question", description: "", email: user?.email || "" });
    }, 500);
  };

  const handleBugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugForm.title.trim() || !bugForm.description.trim()) {
      toast.error("Please provide a title and bug description.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setBugModalOpen(false);

      const body = `Page/Location: ${bugForm.location || window.location.pathname}\nUser Agent: ${navigator.userAgent}\n\nWhat happened:\n${bugForm.description}\n\nExpected:\n${bugForm.expected || "N/A"}`;
      window.location.href = `mailto:bugs@syncrole.com?subject=${encodeURIComponent(`[Bug Report] ${bugForm.title}`)}&body=${encodeURIComponent(body)}`;

      toast.success("Bug report draft opened in your mail client.", {
        description: "Thank you for helping us improve SyncRole!"
      });
      setBugForm({ title: "", description: "", expected: "", location: "" });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 pb-36">

        {/* Top Header & Breadcrumb */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors p-1 -ml-1 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                Help & Support Center
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
              Search guide documentation, understand placement metrics, or get in touch with our team.
            </p>
          </div>
        </div>

        {/* REAL-TIME SEARCH BAR */}
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, score criteria, DSA, resume AI..."
              className="w-full h-12 bg-white border border-slate-200/90 rounded-2xl pl-11 pr-10 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 w-6 h-6 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 min-w-max">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition-all cursor-pointer min-h-[38px] ${
                    active
                      ? "bg-blue-600 text-white shadow-2xs"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/80"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQS ACCORDION LIST */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Frequently Asked Questions ({filteredFaqs.length})
            </h2>
            {searchQuery && (
              <span className="text-xs text-blue-600 font-semibold">
                Filtering by "{searchQuery}"
              </span>
            )}
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <FAQAccordionItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaqId === faq.id}
                  onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-400 mx-auto flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">No matching help topics</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn't find any questions matching "{searchQuery}". Try a different keyword or reach out to our team below.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="h-9 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Clear Search & Filters
              </Button>
            </div>
          )}
        </section>

        {/* SUPPORT & BUG REPORT CARDS */}
        <section className="space-y-3 pt-4">
          <div className="px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Need Direct Assistance?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Contact Support Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shadow-2xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Contact Support Team</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Have questions regarding your account, scoring discrepancies, or feature access? File a ticket directly.
                </p>
              </div>
              <Button
                onClick={() => setSupportModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold h-10 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open Support Ticket</span>
              </Button>
            </div>

            {/* Report Bug Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center shadow-2xs">
                  <Bug className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Report an Issue</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Encountered a layout glitch, broken button, or unexpected evaluation output? Help us fix it quickly.
                </p>
              </div>
              <Button
                onClick={() => setBugModalOpen(true)}
                variant="outline"
                className="w-full border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl text-xs font-semibold h-10 shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Bug className="w-3.5 h-3.5" />
                <span>Submit Bug Report</span>
              </Button>
            </div>
          </div>
        </section>

      </div>

      {/* SUPPORT TICKET MODAL */}
      <AnimatePresence>
        {supportModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => !submitting && setSupportModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg bg-white border border-slate-200/95 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-2rem)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="support-dialog-title"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 id="support-dialog-title" className="text-sm font-bold text-slate-900 font-display">
                      Open Support Ticket
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Our support team will respond to your email.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSupportModalOpen(false)}
                  disabled={submitting}
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSupportSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Subject *</label>
                  <input
                    required
                    disabled={submitting}
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="e.g. Issue connecting GitHub account"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Category</label>
                    <select
                      disabled={submitting}
                      value={supportForm.category}
                      onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      <option>Technical Question</option>
                      <option>Scoring & Evaluation</option>
                      <option>Account Credentials</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Your Email</label>
                    <input
                      type="email"
                      disabled={submitting}
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Details & Description *</label>
                  <textarea
                    required
                    rows={4}
                    disabled={submitting}
                    value={supportForm.description}
                    onChange={(e) => setSupportForm({ ...supportForm, description: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                    placeholder="Describe what you need assistance with..."
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSupportModalOpen(false)}
                    disabled={submitting}
                    className="h-9 px-4 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-9 px-4 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Preparing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Ticket</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BUG REPORT MODAL */}
      <AnimatePresence>
        {bugModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
              onClick={() => !submitting && setBugModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-lg bg-white border border-slate-200/95 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-2rem)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bug-dialog-title"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shadow-xs">
                    <Bug className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 id="bug-dialog-title" className="text-sm font-bold text-slate-900 font-display">
                      Submit Bug Report
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Report unexpected errors or broken interface components.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBugModalOpen(false)}
                  disabled={submitting}
                  className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleBugSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">Bug Summary *</label>
                  <input
                    required
                    disabled={submitting}
                    value={bugForm.title}
                    onChange={(e) => setBugForm({ ...bugForm, title: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Short description of what failed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Page / Route</label>
                    <input
                      disabled={submitting}
                      value={bugForm.location}
                      onChange={(e) => setBugForm({ ...bugForm, location: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="e.g. /dsa-mentor or Profile"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Expected Result</label>
                    <input
                      disabled={submitting}
                      value={bugForm.expected}
                      onChange={(e) => setBugForm({ ...bugForm, expected: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="What should have happened"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">What Happened & Steps *</label>
                  <textarea
                    required
                    rows={4}
                    disabled={submitting}
                    value={bugForm.description}
                    onChange={(e) => setBugForm({ ...bugForm, description: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                    placeholder="Describe step-by-step what occurred and any error text..."
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setBugModalOpen(false)}
                    disabled={submitting}
                    className="h-9 px-4 text-xs font-semibold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-9 px-4 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Bug className="w-3.5 h-3.5" />
                        <span>Report Bug</span>
                      </>
                    )}
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
