import { Link } from '@tanstack/react-router';
import { BrandLogo } from '@/components/ui/brand-logo';
import { GatePaperInfo } from '@/lib/gate/gateTypes';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronDown,
  Compass,
  FileText,
  HelpCircle,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';
import { useState } from 'react';

export type GateTab = 'overview' | 'understand' | 'syllabus' | 'updates';

interface GateHeaderProps {
  activeTab: GateTab;
  onSelectTab: (tab: GateTab) => void;
  selectedPaper: string;
  papers: GatePaperInfo[];
  onSelectPaper: (code: string) => void;
}

export default function GateHeader({
  activeTab,
  onSelectTab,
  selectedPaper,
  papers,
  onSelectPaper,
}: GateHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: { id: GateTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'understand', label: 'Understand', icon: HelpCircle },
    { id: 'syllabus', label: 'Syllabus & Resources', icon: BookOpen },
    { id: 'updates', label: 'Updates & Timeline', icon: Calendar },
  ];

  const currentPaperObj = papers.find((p) => p.code === selectedPaper) || papers[0];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-white/10 transition-all">
      <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="group flex items-center gap-1.5 rounded-full glass border border-white/10 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition hover:border-white/20"
            title="Return to SyncRole Homepage"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">SyncRole</span>
          </Link>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-accent/20 border border-accent/40 text-accent font-display text-xs font-bold">
              GATE
            </span>
            <span className="font-display font-semibold text-sm text-foreground tracking-tight hidden md:inline">
              Public Discovery Hub
            </span>
          </div>
        </div>

        {/* Center: Desktop Tabs */}
        <nav className="hidden lg:flex items-center gap-1 glass rounded-full p-1 border border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-accent/20 text-accent border border-accent/40 shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-accent' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Paper Selector Dropdown & Mobile Menu Button */}
        <div className="flex items-center gap-2">
          {/* Paper Selector */}
          <div className="relative">
            <select
              value={selectedPaper}
              onChange={(e) => onSelectPaper(e.target.value)}
              className="appearance-none glass rounded-full pl-3.5 pr-8 py-1.5 text-xs font-semibold text-accent border border-accent/30 focus:outline-none focus:ring-1 ring-accent cursor-pointer bg-background/90"
            >
              {papers.map((p) => (
                <option key={p.code} value={p.code} className="bg-slate-900 text-foreground">
                  GATE {p.code} {!p.isFullySupported ? '(Structure)' : ''}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-accent" />
          </div>

          {/* Mobile drawer menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-2xl p-4 space-y-2 animate-in fade-in slide-in-from-top-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 pb-1">
            GATE Hub Sections
          </div>
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onSelectTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition ${
                    isActive
                      ? 'bg-accent/20 border-accent/40 text-accent font-semibold'
                      : 'glass border-white/5 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
