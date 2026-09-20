import { GatePaperInfo, GateEvent, GateUpdate } from '@/lib/gate/gateTypes';
import { GateTab } from './GateHeader';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  FileText,
  HelpCircle,
  Layers,
  ShieldCheck,
} from 'lucide-react';

interface GateOverviewTabProps {
  paper: GatePaperInfo;
  events: GateEvent[];
  updates: GateUpdate[];
  onSelectTab: (tab: GateTab) => void;
  lastVerifiedAt: string;
  isFallback: boolean;
}

export default function GateOverviewTab({
  paper,
  events,
  updates,
  onSelectTab,
  lastVerifiedAt,
  isFallback,
}: GateOverviewTabProps) {
  const upcomingEvents = events.slice(0, 4);
  const recentUpdates = updates.slice(0, 3);

  const prepSteps = [
    { num: '01', label: 'UNDERSTAND', title: 'What is GATE?', desc: 'Exam purpose, pattern & eligibility' },
    { num: '02', label: 'CHOOSE', title: 'Which paper?', desc: 'Primary paper & secondary combinations' },
    { num: '03', label: 'DECODE', title: 'Syllabus structure', desc: 'Subject weightages & topic maps' },
    { num: '04', label: 'LEARN', title: 'Build fundamentals', desc: '1–3 curated primary resources per topic' },
    { num: '05', label: 'PRACTICE', title: 'Solve PYQs', desc: 'Topic-level previous year questions' },
    { num: '06', label: 'IMPROVE', title: 'Review weak areas', desc: 'Consistent study rhythm & re-testing' },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* 1. EDITORIAL HERO OPENING */}
      <section className="space-y-6 pt-4">
        {/* Micro-label */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>GATE 2027 • {paper.code} Discovery Hub</span>
        </div>

        {/* Large Confident Heading */}
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl leading-[1.1]">
          Understand before you prepare.
        </h1>

        {/* Short Readable Paragraph */}
        <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl font-sans">
          Official information, syllabus structure, and contextual preparation resources — organized around what you need to understand next, without searching across dozens of fragmented websites.
        </p>

        {/* Key Emphasized Statement Callout */}
        <div className="border-l-2 border-accent pl-5 py-2 my-4 bg-white/[0.02]">
          <p className="font-display text-sm md:text-base italic text-slate-200 font-medium">
            "GATE is not just a syllabus to finish. It is a problem-solving exam where fundamentals compound."
          </p>
        </div>

        {/* Metadata verification provenance */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="h-3.5 w-3.5" /> Source Provenance Verified
          </span>
          <span className="text-slate-700">•</span>
          <span>
            Last Verified:{' '}
            <strong className="text-slate-200">
              {new Date(lastVerifiedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </strong>
          </span>
          {isFallback && (
            <span className="text-amber-400 text-[11px] font-medium bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              Cached Archive
            </span>
          )}
        </div>
      </section>

      {/* 2. "WHERE ARE YOU RIGHT NOW?" ENTRY PATHS */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            ENTRY PATHWAYS
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Where are you in your GATE journey?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Path 1 */}
          <button
            onClick={() => onSelectTab('understand')}
            className="text-left border border-white/10 hover:border-accent/40 bg-white/[0.02] hover:bg-white/[0.05] p-6 rounded-2xl transition duration-200 space-y-3 group cursor-pointer"
          >
            <div className="text-xs font-mono text-accent font-semibold flex items-center justify-between">
              <span>01 • BEGINNER</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="font-display text-lg font-bold text-foreground">I'm completely new</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Understand the exam purpose, eligibility rules, paper options, and the 6-step roadmap.
            </p>
          </button>

          {/* Path 2 */}
          <button
            onClick={() => onSelectTab('syllabus')}
            className="text-left border border-white/10 hover:border-purple-400/40 bg-white/[0.02] hover:bg-white/[0.05] p-6 rounded-2xl transition duration-200 space-y-3 group cursor-pointer"
          >
            <div className="text-xs font-mono text-purple-400 font-semibold flex items-center justify-between">
              <span>02 • EXPLORER</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="font-display text-lg font-bold text-foreground">I know the basics</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explore the subject breakdown, topic weightages, and key concept checklists.
            </p>
          </button>

          {/* Path 3 */}
          <button
            onClick={() => onSelectTab('syllabus')}
            className="text-left border border-white/10 hover:border-emerald-400/40 bg-white/[0.02] hover:bg-white/[0.05] p-6 rounded-2xl transition duration-200 space-y-3 group cursor-pointer"
          >
            <div className="text-xs font-mono text-emerald-400 font-semibold flex items-center justify-between">
              <span>03 • PRACTITIONER</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
            <div className="font-display text-lg font-bold text-foreground">I'm already preparing</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access 1–3 curated learning materials per topic and test your understanding with PYQs.
            </p>
          </button>
        </div>
      </section>

      {/* 3. VISUAL PREPARATION PATH (01 -> 06) */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            VISUAL ROADMAP
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            The GATE Preparation Sequence
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {prepSteps.map((s) => (
            <div
              key={s.num}
              className="border border-white/10 bg-white/[0.02] p-4 rounded-xl space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs text-accent font-bold mb-1">{s.num}</div>
                <div className="font-display text-xs font-bold text-foreground uppercase tracking-wider">
                  {s.label}
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1">{s.title}</div>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXAM STRUCTURE FACT STRIP */}
      <section className="border border-white/10 bg-white/[0.02] p-6 rounded-2xl space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
          EXAMINATION STRUCTURE • GATE {paper.code}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-white/10">
          <div className="space-y-1">
            <div className="font-display text-3xl font-bold text-foreground">{paper.totalQuestions}</div>
            <div className="text-xs font-semibold text-slate-300">Total Questions</div>
            <div className="text-[11px] text-slate-500 font-mono">10 GA + 55 Core Subject</div>
          </div>
          <div className="space-y-1 pl-4">
            <div className="font-display text-3xl font-bold text-foreground">{paper.totalMarks} Marks</div>
            <div className="text-xs font-semibold text-slate-300">Total Paper Score</div>
            <div className="text-[11px] text-slate-500 font-mono">15% GA + 85% Subject</div>
          </div>
          <div className="space-y-1 pl-4">
            <div className="font-display text-3xl font-bold text-foreground">{paper.durationMinutes / 60} Hours</div>
            <div className="text-xs font-semibold text-slate-300">Single Session</div>
            <div className="text-[11px] text-slate-500 font-mono">180 Minutes Computer Based Test</div>
          </div>
          <div className="space-y-1 pl-4">
            <div className="font-display text-3xl font-bold text-foreground">3 Formats</div>
            <div className="text-xs font-semibold text-slate-300">Question Types</div>
            <div className="text-[11px] text-slate-500 font-mono">MCQ • MSQ • NAT</div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL ANNOUNCEMENTS & TIMELINE PREVIEW */}
      <section className="grid lg:grid-cols-2 gap-8 pt-4 border-t border-white/10">
        {/* Timeline Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              OFFICIAL TIMELINE
            </div>
            <button
              onClick={() => onSelectTab('updates')}
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
            >
              <span>Full timeline</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="border-l border-white/10 space-y-4 pl-4 font-sans">
            {upcomingEvents.map((evt) => (
              <div key={evt.id} className="relative space-y-1">
                <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{evt.title}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {evt.status}
                  </span>
                </div>
                <div className="text-xs font-mono text-accent">{evt.dateLabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              LATEST ANNOUNCEMENTS
            </div>
            <button
              onClick={() => onSelectTab('updates')}
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
            >
              <span>All updates</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3 font-sans">
            {recentUpdates.map((upd) => (
              <div key={upd.id} className="border border-white/10 bg-white/[0.02] p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{upd.title}</span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {new Date(upd.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{upd.summary}</p>
                {upd.officialUrl && (
                  <a
                    href={upd.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline"
                  >
                    <span>View official source</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
