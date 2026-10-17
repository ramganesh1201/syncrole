import { Link } from '@tanstack/react-router';
import { GatePaperInfo } from '@/lib/gate/gateTypes';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronRight,
  Compass,
  FileText,
  HelpCircle,
  Layers,
  Menu,
  Sparkles,
  X,
  Search,
  ExternalLink,
  Info,
  Clock,
  Bell,
  Home,
  MoreHorizontal,
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
  | 'roadmap'
  | 'updates'
  | 'sources';

export type GateDesktopTab = 'overview' | 'syllabus' | 'pattern' | 'updates';

export type GateMobileTab = 'home' | 'syllabus' | 'dates' | 'updates' | 'more';

interface GateHeaderProps {
  activeDesktopTab: GateDesktopTab;
  onSelectDesktopTab: (tab: GateDesktopTab) => void;
  activeMobileTab: GateMobileTab;
  onSelectMobileTab: (tab: GateMobileTab) => void;
  selectedPaper: string;
  papers: GatePaperInfo[];
  onSelectPaper: (code: string) => void;
}

export default function GateHeader({
  activeDesktopTab,
  onSelectDesktopTab,
  activeMobileTab,
  onSelectMobileTab,
  selectedPaper,
  papers,
  onSelectPaper,
}: GateHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const desktopTabs: { id: GateDesktopTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'syllabus', label: 'Syllabus & Papers', icon: BookOpen },
    { id: 'pattern', label: 'Exam Pattern & Rules', icon: FileText },
    { id: 'updates', label: 'Updates & Timeline', icon: Bell },
  ];

  const mobileTabs: { id: GateMobileTab; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'dates', label: 'Dates', icon: Calendar },
    { id: 'updates', label: 'Updates', icon: Bell },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 text-slate-900 transition-all shadow-xs pt-[env(safe-area-inset-top)]">
        {/* Top Contextual Header Bar - Clean 320px flex layout */}
        <div className="mx-auto max-w-7xl px-3 md:px-6 h-14 flex items-center justify-between gap-2">
          {/* Left: Contextual App Back to SyncRole Home */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 transition min-h-[36px]"
              title="Return to SyncRole Home"
            >
              <ArrowLeft className="h-4 w-4 text-slate-600" />
              <span>SyncRole</span>
            </Link>
          </div>

          {/* Center: GATE 2027 App Title Badge */}
          <div className="flex items-center gap-1.5 truncate justify-center">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-900 text-xs font-black font-mono tracking-tight shrink-0">
              GATE 2027
            </span>
            <span className="text-xs font-semibold text-slate-500 hidden md:inline truncate">
              Public Discovery Hub
            </span>
          </div>

          {/* Right: Paper Selector (Desktop only) */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative hidden md:block">
              <label htmlFor="gate-paper-select" className="sr-only">
                Select GATE Test Paper
              </label>
              <select
                id="gate-paper-select"
                value={selectedPaper}
                onChange={(e) => onSelectPaper(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-300 rounded-xl pl-3 pr-7 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer shadow-2xs"
              >
                {papers.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.code} â€” {p.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Secondary Sticky Navigation Bar for Desktop Workspace Tabs (hidden on mobile) */}
        <div className="hidden md:block border-t border-slate-200/80 bg-slate-50/90 px-4 md:px-6">
          <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 py-1.5">
            <nav className="flex items-center gap-1.5" aria-label="GATE Hub Workspace Navigation">
              {desktopTabs.map((tab) => {
                const isActive = activeDesktopTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onSelectDesktopTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="text-[11px] text-slate-500 font-mono hidden lg:flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>IIT Madras Organizing Institute â€¢ GATE 2027</span>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE GATE PWA BOTTOM NAV BAR */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-lg px-2 py-1 flex items-center justify-around pb-[calc(0.4rem+env(safe-area-inset-bottom))] md:hidden h-[60px] box-content">
        {mobileTabs.map((tab) => {
          const isActive = activeMobileTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectMobileTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-all py-1 px-3 rounded-xl min-w-[48px] min-h-[44px] justify-center ${
                isActive
                  ? 'text-teal-900 font-extrabold bg-teal-50/90 border border-teal-200/80'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className={`h-4 w-4 transition-transform ${isActive ? 'text-teal-700 scale-110' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

