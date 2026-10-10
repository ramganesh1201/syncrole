import React, { useEffect, useState, useMemo } from 'react';
import { GatePaperInfo, GateEvent, GateUpdate, GateSyllabusTopic } from '@/lib/gate/gateTypes';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  HelpCircle,
  Info,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Compass,
  Bell,
  Check,
  Globe,
  FileCheck,
  Download,
} from 'lucide-react';
import {
  useGateLiveClock,
  resolveGateLiveSchedule,
  downloadOrOpenGatePdf,
} from '@/lib/gate/gateDateUtils';

export type GateMobileTab = 'home' | 'syllabus' | 'dates' | 'updates' | 'more';

interface GateMobileScreensProps {
  activeScreen: GateMobileTab;
  onNavigateScreen: (screen: GateMobileTab) => void;
  paper: GatePaperInfo;
  papers: GatePaperInfo[];
  events: GateEvent[];
  updates: GateUpdate[];
  syllabus: GateSyllabusTopic[];
  onSelectPaper: (code: string) => void;
  lastVerifiedAt: string;
}

export function GateMobileScreens({
  activeScreen,
  onNavigateScreen,
  paper,
  papers,
  events,
  updates,
  syllabus,
  onSelectPaper,
  lastVerifiedAt,
}: GateMobileScreensProps) {
  switch (activeScreen) {
    case 'syllabus':
      return (
        <GateMobileSyllabusScreen
          paper={paper}
          papers={papers}
          syllabus={syllabus}
          onSelectPaper={onSelectPaper}
        />
      );
    case 'dates':
      return <GateMobileDatesScreen events={events} lastVerifiedAt={lastVerifiedAt} />;
    case 'updates':
      return <GateMobileUpdatesScreen updates={updates} lastVerifiedAt={lastVerifiedAt} />;
    case 'more':
      return (
        <GateMobileMoreScreen
          paper={paper}
          onNavigateScreen={onNavigateScreen}
          lastVerifiedAt={lastVerifiedAt}
        />
      );
    case 'home':
    default:
      return (
        <GateMobileHomeScreen
          paper={paper}
          events={events}
          updates={updates}
          onNavigateScreen={onNavigateScreen}
        />
      );
  }
}

/* ─────────────────────────────────────────────────────────────
   1. MOBILE HOME SCREEN (Overview / Gateway Screen)
   ───────────────────────────────────────────────────────────── */
function GateMobileHomeScreen({
  paper,
  events,
  updates,
  onNavigateScreen,
}: {
  paper: GatePaperInfo;
  events: GateEvent[];
  updates: GateUpdate[];
  onNavigateScreen: (screen: GateMobileTab) => void;
}) {
  const now = useGateLiveClock();
  const { ongoingEvent, nextMilestone, targetMilestone, countdown } = resolveGateLiveSchedule(
    events,
    now
  );

  return (
    <div className="space-y-5 text-slate-800 font-sans">
      {/* Verification Notice */}
      <div className="flex items-center justify-between gap-2 bg-teal-50 border border-teal-200/90 rounded-2xl px-3.5 py-2 text-xs">
        <div className="flex items-center gap-2 text-teal-800 font-medium min-w-0">
          <ShieldCheck className="h-4 w-4 text-teal-600 shrink-0" />
          <span className="truncate">Source-Backed Official GATE 2027 Hub</span>
        </div>
        <a
          href="https://gate2027.iitm.ac.in/"
          target="_blank"
          rel="noreferrer"
          className="text-teal-900 font-bold underline text-[11px] shrink-0"
        >
          IIT Madras ↗
        </a>
      </div>

      {/* Intro Hero */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-xs">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold font-mono">
          GATE 2027 OFFICIAL INFO
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Graduate Aptitude Test in Engineering 2027
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Source-backed official syllabus, exam pattern, important timeline milestones, eligibility rules, and official announcements.
          </p>
        </div>

        <button
          onClick={() => onNavigateScreen('syllabus')}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 shadow-xs flex items-center justify-center gap-2 transition active:scale-[0.99]"
        >
          <span>Explore GATE 2027 Syllabus</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* Quick Factual Tiles */}
      <section className="grid grid-cols-2 gap-2.5">
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-0.5 text-center shadow-xs">
          <div className="text-xl font-black text-slate-900 font-mono">30</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Test Papers</div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-0.5 text-center shadow-xs">
          <div className="text-xl font-black text-slate-900 font-mono">3 Hours</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Exam Duration</div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-0.5 text-center shadow-xs">
          <div className="text-xl font-black text-slate-900 font-mono">100</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Marks</div>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-0.5 text-center shadow-xs">
          <div className="text-xl font-black text-slate-900 font-mono">CBT</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Online Mode</div>
        </div>
      </section>

      {/* Dynamic Live Status & Real-Time Countdown Card */}
      <section className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-2xl p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-extrabold uppercase tracking-wider text-teal-300 font-mono">
            {ongoingEvent ? "WHAT'S HAPPENING NOW" : 'NEXT OFFICIAL MILESTONE'}
          </span>
          <span className="font-bold bg-teal-500/20 text-teal-200 border border-teal-400/30 px-2 py-0.5 rounded-full font-mono">
            {ongoingEvent ? 'ACTIVE WINDOW' : targetMilestone?.isTentative ? 'TENTATIVE' : 'UPCOMING'}
          </span>
        </div>

        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white leading-snug">
            {ongoingEvent ? ongoingEvent.title : targetMilestone ? targetMilestone.title : 'GATE 2027 Examinations'}
          </h3>
          <div className="text-[11px] text-teal-300 font-mono font-bold">
            {ongoingEvent ? ongoingEvent.dateLabel : targetMilestone ? targetMilestone.dateLabel : 'Schedule active'}
          </div>
        </div>

        {targetMilestone && !countdown.isPassed && !countdown.isTentative && (
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 space-y-1">
            <div className="text-[9px] font-mono text-teal-300 uppercase tracking-wider flex items-center justify-between">
              <span>Countdown to {targetMilestone.title}</span>
              <span className="text-white font-bold">Live IST</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
              <div className="bg-black/20 rounded p-1">
                <div className="text-sm font-bold text-white">{countdown.days}</div>
                <div className="text-[8px] text-slate-300">Days</div>
              </div>
              <div className="bg-black/20 rounded p-1">
                <div className="text-sm font-bold text-white">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-300">Hours</div>
              </div>
              <div className="bg-black/20 rounded p-1">
                <div className="text-sm font-bold text-white">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-300">Mins</div>
              </div>
              <div className="bg-black/20 rounded p-1">
                <div className="text-sm font-bold text-emerald-400">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-300">Secs</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => onNavigateScreen('dates')}
          className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.99]"
        >
          <span>View All Important Dates</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </section>

      {/* What is GATE Card */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          WHAT IS GATE?
        </h2>

        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          GATE is a national-level examination conducted jointly by IISc Bangalore and 7 IITs (organized by IIT Madras for 2027) under the Ministry of Education, Govt of India.
        </p>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-bold text-slate-900">Conducting Body</div>
            <div className="text-slate-500 text-[10px]">IIT Madras (2027)</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="font-bold text-slate-900">Score Validity</div>
            <div className="text-slate-500 text-[10px]">3 Years from result</div>
          </div>
        </div>

        <button
          onClick={() => onNavigateScreen('more')}
          className="w-full text-center text-xs font-semibold text-teal-800 hover:underline pt-1"
        >
          Learn more about GATE rules →
        </button>
      </section>

      {/* Syllabus Preview */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            OFFICIAL SYLLABUS
          </h2>
          <button
            onClick={() => onNavigateScreen('syllabus')}
            className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
          >
            <span>Explore all</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">GATE {paper.code} — {paper.name}</span>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            Full subject-wise topic breakdown, weightage estimates, and official syllabus PDF source.
          </p>
        </div>
      </section>

      {/* Latest Updates Preview */}
      {updates.length > 0 && (
        <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
              LATEST ANNOUNCEMENTS
            </h2>
            <button
              onClick={() => onNavigateScreen('updates')}
              className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {updates.slice(0, 2).map((upd) => (
              <div key={upd.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-teal-800 uppercase font-mono">{upd.updateType.replace('_', ' ')}</span>
                  <span className="text-slate-400">{new Date(upd.publishedAt).toLocaleDateString()}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{upd.title}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Official Resources */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          OFFICIAL SOURCES & PORTALS
        </h2>

        <div className="space-y-2">
          <a
            href="https://gate2027.iitm.ac.in/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-100 transition"
          >
            <span>Official GATE 2027 IIT Madras Website</span>
            <ExternalLink className="h-4 w-4 text-teal-700 shrink-0" />
          </a>
          <a
            href="https://gate2027.iitm.ac.in/assets/docs/brochure.pdf"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-100 transition"
          >
            <span>Official Information Brochure (PDF)</span>
            <ExternalLink className="h-4 w-4 text-teal-700 shrink-0" />
          </a>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. MOBILE SYLLABUS SCREEN
   ───────────────────────────────────────────────────────────── */
function GateMobileSyllabusScreen({
  paper,
  papers,
  syllabus,
  onSelectPaper,
}: {
  paper: GatePaperInfo;
  papers: GatePaperInfo[];
  syllabus: GateSyllabusTopic[];
  onSelectPaper: (code: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPaperPickerOpen, setIsPaperPickerOpen] = useState(false);
  const [openSubjectId, setOpenSubjectId] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfUrl =
    paper.officialPdfUrl ||
    `https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/${
      paper.code === 'CSE' ? 'CS' : paper.code === 'ECE' ? 'EC' : paper.code
    }_GATE2027_Syllabus.pdf`;

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadOrOpenGatePdf(pdfUrl, paper.code);
    } finally {
      setIsDownloading(false);
    }
  };

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(papers.map((p) => p.category || 'Other')));
    return ['All', ...cats];
  }, [papers]);

  // Filter papers for Paper Selector Picker
  const filteredPapers = useMemo(() => {
    return papers.filter((p) => {
      const matchesSearch =
        !searchQuery.trim() ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [papers, searchQuery, selectedCategory]);

  // Group syllabus by Subject
  const subjectsMap = useMemo(() => {
    const map = new Map<string, { subjectId: string; subjectName: string; topics: GateSyllabusTopic[] }>();
    syllabus.forEach((t) => {
      if (!map.has(t.subjectId)) {
        map.set(t.subjectId, { subjectId: t.subjectId, subjectName: t.subjectName, topics: [] });
      }
      map.get(t.subjectId)!.topics.push(t);
    });
    return Array.from(map.values());
  }, [syllabus]);

  // Auto-open first subject
  useEffect(() => {
    if (subjectsMap.length > 0 && !openSubjectId) {
      setOpenSubjectId(subjectsMap[0].subjectId);
    }
  }, [subjectsMap]);

  return (
    <div className="space-y-4 text-slate-800 font-sans">
      {/* Screen Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
            GATE 2027 Official Syllabus
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-bold font-mono">
            {papers.length} Papers Available
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Official subject breakdowns for all 30 GATE 2027 test papers.
        </p>

        {/* Searchable Paper Selector Launcher Button */}
        <button
          onClick={() => setIsPaperPickerOpen(true)}
          className="w-full p-3.5 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-xs hover:bg-slate-800 transition active:scale-[0.99]"
        >
          <div className="flex items-center gap-2.5 truncate">
            <Layers className="h-4 w-4 text-teal-400 shrink-0" />
            <div className="text-left truncate">
              <div className="text-[10px] font-bold font-mono uppercase text-teal-300">SELECTED TEST PAPER</div>
              <div className="text-xs font-bold text-white truncate">
                GATE {paper.code} — {paper.name}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg border border-white/20 shrink-0">
            Change Paper ▾
          </span>
        </button>
      </div>

      {/* SEARCHABLE PAPER SELECTOR MODAL / BOTTOM SHEET */}
      {isPaperPickerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end md:justify-center p-0 md:p-6 animate-in fade-in">
          <div className="bg-white rounded-t-3xl md:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Select GATE 2027 Paper</h3>
                <p className="text-[11px] text-slate-500">Choose from all 30 official test papers</p>
              </div>
              <button
                onClick={() => setIsPaperPickerOpen(false)}
                className="p-1.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition text-xs font-bold"
              >
                Close ✕
              </button>
            </div>

            {/* Search Input inside Picker */}
            <div className="p-4 border-b border-slate-100 space-y-2 bg-white">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search code or paper name (e.g. CSE, DA, EE, ME)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500 shadow-2xs"
                  autoFocus
                />
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 pt-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper List Items */}
            <div className="p-4 overflow-y-auto custom-scrollbar space-y-2 max-h-[50vh]">
              {filteredPapers.map((p) => {
                const isSelected = p.code === paper.code;
                return (
                  <button
                    key={p.code}
                    onClick={() => {
                      onSelectPaper(p.code);
                      setIsPaperPickerOpen(false);
                    }}
                    className={`w-full p-3.5 rounded-2xl text-left transition flex items-center justify-between border ${
                      isSelected
                        ? 'bg-teal-50 border-teal-300 text-teal-950 font-bold shadow-2xs'
                        : 'bg-white border-slate-200/80 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          GATE {p.code}
                        </span>
                        {p.category && (
                          <span className="text-[9px] font-mono text-slate-500 truncate">
                            {p.category}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate pt-0.5">
                        {p.name}
                      </div>
                    </div>
                    {isSelected ? (
                      <Check className="h-4 w-4 text-teal-700 shrink-0" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Selected Paper Details & Mobile Download Action Card */}
      <div className="bg-white border border-teal-200/90 rounded-2xl p-4 space-y-3.5 shadow-xs">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5 min-w-0">
            <span className="text-[10px] font-bold font-mono uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              GATE {paper.code} 2027 SYLLABUS
            </span>
            <h2 className="font-extrabold text-sm text-slate-900 truncate pt-1">
              {paper.name}
            </h2>
            <div className="text-[11px] text-slate-500 font-medium">
              Verified Source: IIT Madras Official GATE 2027 Repository
            </div>
          </div>
        </div>

        {/* Action Buttons: Download PDF (Primary, min 44px) + View Online (Secondary) */}
        <div className="flex flex-col sm:flex-row items-stretch gap-2 pt-1">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-75 cursor-pointer min-h-[44px]"
          >
            {isDownloading ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin shrink-0" />
                <span>Downloading PDF...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 shrink-0 text-teal-200" />
                <span>Download Syllabus PDF</span>
              </>
            )}
          </button>

          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition shrink-0 min-h-[44px]"
          >
            <span>View Online</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-500 shrink-0" />
          </a>
        </div>
      </div>

      {/* Subject Accordions */}
      <div className="space-y-2.5">
        <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400 px-1">
          SUBJECT TOPICS ({subjectsMap.length} SECTIONS)
        </div>

        {subjectsMap.map((sub) => {
          const isOpen = openSubjectId === sub.subjectId;
          return (
            <div
              key={sub.subjectId}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenSubjectId(isOpen ? '' : sub.subjectId)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <BookOpen className="h-4 w-4 text-teal-700 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {sub.subjectName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold shrink-0">
                    ({sub.topics.length})
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3">
                  {sub.topics.map((topic) => (
                    <div
                      key={topic.topicId}
                      className="bg-white border border-slate-200/80 rounded-xl p-3.5 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{topic.topicName}</h4>
                        {topic.weightageEstimate && (
                          <span className="text-[9px] font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 shrink-0">
                            {topic.weightageEstimate}
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        {topic.conceptSummary}
                      </p>

                      {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">
                            Key Syllabus Coverage Checklist:
                          </span>
                          <div className="space-y-1">
                            {topic.keyTakeaways.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. MOBILE DATES SCREEN
   ───────────────────────────────────────────────────────────── */
function GateMobileDatesScreen({
  events,
  lastVerifiedAt,
}: {
  events: GateEvent[];
  lastVerifiedAt: string;
}) {
  const now = useGateLiveClock();
  const {
    enrichedEvents,
    ongoingEvent,
    nextMilestone,
    targetMilestone,
    countdown,
  } = resolveGateLiveSchedule(events, now);

  return (
    <div className="space-y-4 text-slate-800 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-xs">
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
          GATE 2027 Important Dates
        </h1>
        <p className="text-xs text-slate-600">
          Official timeline milestones & schedule verified from IIT Madras.
        </p>
        <div className="text-[11px] text-teal-800 font-mono font-medium pt-1">
          Last Verified: {new Date(lastVerifiedAt).toLocaleDateString()} • Live IST Time
        </div>
      </div>

      {/* Real-Time Countdown to Target Milestone */}
      {targetMilestone && (
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-2xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-extrabold uppercase tracking-wider text-teal-300 font-mono">
              COUNTDOWN TO {targetMilestone.eventType.toUpperCase()}
            </span>
            <span className={`font-bold px-2 py-0.5 rounded-full border text-[9px] font-mono ${
              targetMilestone.isTentative
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
            }`}>
              {targetMilestone.isTentative ? 'TENTATIVE' : 'OFFICIAL ANNOUNCED'}
            </span>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xs font-bold text-white">{targetMilestone.title}</h3>
            <div className="text-[11px] text-teal-300 font-mono font-bold">
              {targetMilestone.dateLabel}
            </div>
          </div>

          {countdown.isTentative ? (
            <div className="text-[11px] text-amber-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
              {countdown.formatted}
            </div>
          ) : countdown.isPassed ? (
            <div className="text-[11px] text-emerald-300 bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Milestone currently underway or completed</span>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
              <div className="bg-black/20 rounded p-1.5">
                <div className="text-base font-bold text-white">{countdown.days}</div>
                <div className="text-[8px] text-slate-300 uppercase">Days</div>
              </div>
              <div className="bg-black/20 rounded p-1.5">
                <div className="text-base font-bold text-white">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-300 uppercase">Hours</div>
              </div>
              <div className="bg-black/20 rounded p-1.5">
                <div className="text-base font-bold text-white">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-300 uppercase">Mins</div>
              </div>
              <div className="bg-black/20 rounded p-1.5">
                <div className="text-base font-bold text-emerald-400">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className="text-[8px] text-slate-300 uppercase">Secs</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Current Status */}
      {ongoingEvent && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase font-bold text-emerald-900">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              ACTIVE RIGHT NOW
            </span>
            <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
              {ongoingEvent.status}
            </span>
          </div>
          <h3 className="text-xs font-bold text-emerald-950">{ongoingEvent.title}</h3>
          <p className="text-[11px] text-emerald-800 leading-snug">{ongoingEvent.description}</p>
        </div>
      )}

      {/* Vertical Timeline with Dynamic Live Status */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
        <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
          EXAMINATION TIMELINE ({enrichedEvents.length} MILESTONES)
        </div>

        <div className="space-y-4 relative pl-4 border-l-2 border-teal-200">
          {enrichedEvents.map((evt) => {
            const isOngoing = evt.status === 'ongoing';
            const isCompleted = evt.status === 'completed';
            const isTentative = evt.status === 'tentative';

            return (
              <div key={evt.id} className="relative space-y-1">
                <span
                  className={`absolute -left-[23px] top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ring-2 ${
                    isOngoing
                      ? 'bg-emerald-600 ring-emerald-300 animate-pulse'
                      : isCompleted
                      ? 'bg-slate-400 ring-slate-200'
                      : isTentative
                      ? 'bg-amber-500 ring-amber-200'
                      : 'bg-blue-600 ring-blue-200'
                  }`}
                />

                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900">{evt.title}</h4>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                        isOngoing
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : isCompleted
                          ? 'bg-slate-100 text-slate-500 border-slate-200'
                          : isTentative
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {isOngoing ? 'Active Now' : evt.status}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                      {evt.isTentative ? 'Tentative' : 'Official'}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-bold font-mono text-teal-800">
                  {evt.dateLabel}
                </div>

                {evt.description && (
                  <p className="text-[11px] text-slate-600 leading-snug">{evt.description}</p>
                )}

                {evt.officialUrl && (
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-800 hover:underline pt-1"
                  >
                    <span>Verify official release</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. MOBILE UPDATES SCREEN
   ───────────────────────────────────────────────────────────── */
function GateMobileUpdatesScreen({
  updates,
  lastVerifiedAt,
}: {
  updates: GateUpdate[];
  lastVerifiedAt: string;
}) {
  return (
    <div className="space-y-4 text-slate-800 font-sans">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-xs">
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
          GATE 2027 Official Updates
        </h1>
        <p className="text-xs text-slate-600">
          Chronological announcement log directly from IIT Madras portal.
        </p>
      </div>

      <div className="space-y-3">
        {updates.map((upd) => (
          <div key={upd.id} className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-2 shadow-xs">
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-bold text-teal-800 uppercase font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {upd.updateType.replace('_', ' ')}
              </span>
              <span className="text-slate-400 font-mono">
                {new Date(upd.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h3 className="text-xs font-bold text-slate-900 leading-snug">{upd.title}</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{upd.summary}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-teal-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" /> Sourced
              </span>

              {upd.officialUrl && (
                <a
                  href={upd.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:underline"
                >
                  <span>Read official update</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. MOBILE MORE SCREEN (Resources, Exam Pattern, Roadmap, FAQ)
   ───────────────────────────────────────────────────────────── */
function GateMobileMoreScreen({
  paper,
  onNavigateScreen,
  lastVerifiedAt,
}: {
  paper: GatePaperInfo;
  onNavigateScreen: (screen: GateMobileTab) => void;
  lastVerifiedAt: string;
}) {
  const [activeSection, setActiveSection] = useState<'menu' | 'pattern' | 'roadmap' | 'faq'>('menu');

  const prepSteps = [
    { num: '01', title: 'Understand', desc: 'Eligibility, syllabus scope & exam pattern rules' },
    { num: '02', title: 'Choose Paper', desc: 'Primary paper code & permitted 2nd paper' },
    { num: '03', title: 'Learn Syllabus', desc: 'Master GATE 2027 core subject topics' },
    { num: '04', title: 'Practice PYQs', desc: 'Topic-wise previous year question solving' },
    { num: '05', title: 'Analyze Gaps', desc: 'Identify weak subjects & strengthen speed' },
    { num: '06', title: 'Revise Concepts', desc: 'Build exam-day accuracy and confidence' },
  ];

  const faqs = [
    {
      q: 'What is GATE 2027?',
      a: 'GATE is a national-level examination conducted jointly by IISc and 7 IITs (organized by IIT Madras for GATE 2027) for M.Tech admissions, PSU jobs, and financial stipends.',
    },
    {
      q: 'Who is eligible to apply?',
      a: 'Candidates in the 3rd year or higher of B.E., B.Tech, B.Sc, B.Arch, M.Sc or degree holders in Engineering, Technology, Architecture or Science are eligible. No upper age limit.',
    },
    {
      q: 'What is the score validity?',
      a: 'GATE scores remain valid for 3 years from the date of result declaration.',
    },
  ];

  return (
    <div className="space-y-4 text-slate-800 font-sans">
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-2 shadow-xs">
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
          GATE 2027 Resources & Information
        </h1>
        <p className="text-xs text-slate-600">
          Exam pattern, preparation sequence, official links, and FAQs.
        </p>
      </div>

      {/* App-Style Navigation List Rows */}
      <div className="space-y-2">
        <button
          onClick={() => setActiveSection(activeSection === 'pattern' ? 'menu' : 'pattern')}
          className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Exam Pattern & Marking</div>
              <div className="text-[10px] text-slate-500">CBT, 65 Questions, 100 Marks rules</div>
            </div>
          </div>
          <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${activeSection === 'pattern' ? 'rotate-90' : ''}`} />
        </button>

        {activeSection === 'pattern' && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-xs">GATE 2027 Examination Scheme</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">General Aptitude</span>
                <span className="font-bold text-slate-900">15 Marks (15%)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Subject Paper</span>
                <span className="font-bold text-slate-900">85 Marks (85%)</span>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Question Types: Multiple Choice (MCQ), Multiple Select (MSQ), and Numerical Answer Type (NAT). Negative marking applies to MCQs (1/3rd for 1-mark, 2/3rd for 2-mark). Zero negative marking for MSQ and NAT.
            </p>
          </div>
        )}

        <button
          onClick={() => setActiveSection(activeSection === 'roadmap' ? 'menu' : 'roadmap')}
          className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Preparation Roadmap Sequence</div>
              <div className="text-[10px] text-slate-500">6-step general preparation strategy</div>
            </div>
          </div>
          <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${activeSection === 'roadmap' ? 'rotate-90' : ''}`} />
        </button>

        {activeSection === 'roadmap' && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
            <div className="space-y-2">
              {prepSteps.map((step) => (
                <div key={step.num} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <span className="text-xs font-extrabold text-teal-800 font-mono">{step.num}</span>
                  <div>
                    <div className="font-bold text-slate-900">{step.title}</div>
                    <div className="text-[11px] text-slate-600">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setActiveSection(activeSection === 'faq' ? 'menu' : 'faq')}
          className="w-full p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-between text-left hover:bg-slate-50 transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Frequently Asked Questions</div>
              <div className="text-[10px] text-slate-500">Eligibility, scores & opportunities</div>
            </div>
          </div>
          <ChevronRight className={`h-4 w-4 text-slate-400 transition-transform ${activeSection === 'faq' ? 'rotate-90' : ''}`} />
        </button>

        {activeSection === 'faq' && (
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">{faq.q}</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* External Sources Links */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-xs">
        <div className="text-[10px] font-bold font-mono uppercase tracking-wider text-slate-400">
          OFFICIAL SOURCES
        </div>

        <div className="space-y-2 text-xs">
          <a
            href="https://gate2027.iitm.ac.in/"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-bold text-slate-900 hover:bg-slate-100 transition"
          >
            <span>Official GATE 2027 IIT Madras Portal</span>
            <ExternalLink className="h-4 w-4 text-teal-700 shrink-0" />
          </a>
          <a
            href="https://gate2027.iitm.ac.in/assets/docs/brochure.pdf"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-bold text-slate-900 hover:bg-slate-100 transition"
          >
            <span>Information Brochure (PDF)</span>
            <ExternalLink className="h-4 w-4 text-teal-700 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
