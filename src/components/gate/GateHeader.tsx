import { Link } from '@tanstack/react-router';
import { GatePaperInfo } from '@/lib/gate/gateTypes';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronDown,
  Compass,
  FileText,
  HelpCircle,
  Layers,
  Menu,
  Sparkles,
  X,
  Search,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';

export type GateSectionId =
  | 'overview'
  | 'about'
  | 'status'
  | 'dates'
  | 'pattern'
  | 'papers'
  | 'syllabus'
  | 'combinations'
  | 'roadmap'
  | 'updates'
  | 'sources';

interface GateHeaderProps {
  activeSection: GateSectionId;
  onSelectSection: (sectionId: GateSectionId) => void;
  selectedPaper: string;
  papers: GatePaperInfo[];
  onSelectPaper: (code: string) => void;
}

export default function GateHeader({
  activeSection,
  onSelectSection,
  selectedPaper,
  papers,
  onSelectPaper,
}: GateHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections: { id: GateSectionId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'about', label: 'What is GATE?' },
    { id: 'status', label: 'Now' },
    { id: 'dates', label: 'Dates' },
    { id: 'pattern', label: 'Exam Pattern' },
    { id: 'papers', label: 'Papers' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'updates', label: 'Updates' },
    { id: 'sources', label: 'Sources' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900 transition-all shadow-xs">
      {/* Top Primary Contextual Bar */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Return & GATE 2027 Identity */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition"
            title="Return to SyncRole"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline font-semibold">SyncRole</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold font-mono">
              GATE 2027
            </span>
            <span className="text-xs font-semibold text-slate-600 hidden md:inline">
              Official Discovery Hub
            </span>
          </div>
        </div>

        {/* Right: Paper Selector & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <label htmlFor="gate-paper-select" className="sr-only">
              Select GATE Test Paper
            </label>
            <select
              id="gate-paper-select"
              value={selectedPaper}
              onChange={(e) => onSelectPaper(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-8 py-1 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-xs"
            >
              {papers.map((p) => (
                <option key={p.code} value={p.code}>
                  GATE {p.code} — {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Secondary Sticky Navigation Bar for Desktop */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-4 md:px-6">
        <div className="mx-auto max-w-7xl flex items-center gap-1 overflow-x-auto no-scrollbar py-1.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 pb-1">
            GATE Hub Navigation
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => {
                    onSelectSection(sec.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isActive
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
