import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Layers, Sparkles, CheckCircle2, Clock, ShieldAlert, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GATE_TABS = [
  {
    id: "overview",
    title: "Exam Structure",
    badge: "100 Marks · 3 Hours",
    content: {
      heading: "Computer Science (CS) & Data Science (DA) Paper Structure",
      items: [
        { label: "General Aptitude", detail: "15% of total marks (Language & Quantitative Reasoning)" },
        { label: "Engineering Mathematics", detail: "13% of total marks (Linear Algebra, Calculus, Probability)" },
        { label: "Core Subject Weightage", detail: "72% of total marks (DSA, OS, DBMS, Networks, Architecture)" },
      ],
      insight: "Multiple Choice (MCQ), Multiple Select (MSQ), and Numerical Answer Type (NAT) questions."
    }
  },
  {
    id: "syllabus",
    title: "Syllabus Explorer",
    badge: "CS & DA Tracks",
    content: {
      heading: "Core Technical Pillars Covered in GATE 2027",
      items: [
        { label: "Data Structures & Algorithms", detail: "Arrays, Stacks, Trees, Graphs, Sorting, Hashing, Dynamic Programming" },
        { label: "Operating Systems & Architecture", detail: "Processes, Threads, Memory Management, CPU Scheduling, Pipeline" },
        { label: "Databases & Computer Networks", detail: "SQL, Normalization, Transactions, TCP/IP, Routing, Application Layer" },
      ],
      insight: "Interactive syllabus breakdown available with topic-wise weightage analysis."
    }
  },
  {
    id: "resources",
    title: "Curated Materials",
    badge: "Free & Verified",
    content: {
      heading: "Official & Open Access Learning Material",
      items: [
        { label: "NPTEL Video Lectures", detail: "Top IIT faculty lectures organized by GATE subject modules" },
        { label: "Standard Textbook References", detail: "Cormen (Algorithms), Silberschatz (OS), Korth (DBMS), Tanenbaum (CN)" },
        { label: "Previous Year Questions (PYQs)", detail: "15+ years of verified question papers with detailed step-by-step solutions" },
      ],
      insight: "Zero fluff. Direct links to original university and government repositories."
    }
  },
  {
    id: "updates",
    title: "Official Updates",
    badge: "2027 Cycle",
    content: {
      heading: "Important Notifications & Timeline Milestones",
      items: [
        { label: "Official Notification", detail: "Expected release by August 2026 on GOAPS portal" },
        { label: "Application Window", detail: "September – October 2026" },
        { label: "Exam Window", detail: "First two weekends of February 2027" },
      ],
      insight: "Stay updated with verified exam schedules directly on SyncRole."
    }
  }
];

export default function CurrentlyRelevantGateSection() {
  const [activeTabId, setActiveTabId] = useState<string>("overview");
  const activeTab = GATE_TABS.find(t => t.id === activeTabId) || GATE_TABS[0];

  return (
    <section className="relative py-16 px-4 md:px-6">
      <div className="mx-auto max-w-5xl surface-primary border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
              <Sparkles className="h-3 w-3" />
              <span>GATE 2027 DISCOVERY HUB</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Understand. Explore. <span className="text-cyan-400">Prepare.</span>
            </h2>

            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Understand exam structure, explore official syllabus topics, and access curated materials without leaving your career platform.
            </p>
          </div>

          <Link
            to="/gate"
            className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-foreground font-semibold px-5 py-2.5 text-xs border border-white/10 transition group shrink-0"
          >
            <span>Full GATE Hub</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 text-cyan-400" />
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-6 mb-6">
          {GATE_TABS.map((tab) => {
            const isSelected = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-violet-600 text-white shadow-md border border-violet-500"
                    : "bg-white/5 text-muted-foreground hover:text-foreground border border-white/5 hover:border-white/10"
                }`}
              >
                <span>{tab.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? "bg-white/20 text-white" : "bg-white/5 text-muted-foreground"}`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="surface-secondary border border-white/8 rounded-xl p-5 space-y-4"
          >
            <div className="text-sm font-bold text-foreground flex items-center justify-between">
              <span>{activeTab.content.heading}</span>
              <span className="text-[11px] font-medium text-cyan-400">{activeTab.badge}</span>
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {activeTab.content.items.map((item, idx) => (
                <div key={idx} className="bg-white/3 border border-white/5 rounded-lg p-3 space-y-1">
                  <div className="text-xs font-bold text-violet-300">{item.label}</div>
                  <div className="text-[11px] text-muted-foreground leading-relaxed">{item.detail}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-white/5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>{activeTab.content.insight}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

