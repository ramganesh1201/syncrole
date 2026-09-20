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
  Sparkles,
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
  const upcomingEvents = events.slice(0, 3);
  const recentUpdates = updates.slice(0, 3);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* LANDING HERO BANNER */}
      <section className="relative rounded-3xl glass border border-white/10 p-6 md:p-12 overflow-hidden shadow-soft">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3.5 py-1 text-xs font-semibold text-accent uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Public Information & Preparation Discovery Hub</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            GATE 2027 — {paper.code}
          </h1>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {paper.description} Your starting point for understanding the examination structure, exploring the official syllabus, and discovering contextual learning resources without searching across fragmented websites.
          </p>

          {/* Verification Badge */}
          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="h-3.5 w-3.5" /> Official Source Provenance
            </span>
            <span>•</span>
            <span>
              Last Verified:{' '}
              <strong className="text-foreground">
                {new Date(lastVerifiedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </strong>
            </span>
            {isFallback && (
              <span className="text-amber-400 text-[11px] font-medium bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                Cached Archive (Verify on official site)
              </span>
            )}
          </div>
        </div>
      </section>

      {/* THREE CLEAR ENTRY PATHWAYS */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Compass className="h-5 w-5 text-accent" />
          <span>Where are you in your GATE journey?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Path 1: New to GATE */}
          <div className="relative rounded-2xl glass border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition group">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/30 text-accent grid place-items-center">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">New to GATE?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Understand the examination purpose, eligibility requirements, paper selection rules, and the 6-step starter roadmap.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onSelectTab('understand')}
                className="w-full inline-flex items-center justify-between text-xs font-semibold text-accent hover:text-white bg-accent/10 hover:bg-accent/20 border border-accent/30 px-4 py-2.5 rounded-xl transition group-hover:translate-x-0.5"
              >
                <span>Start with the basics</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Path 2: Know the basics */}
          <div className="relative rounded-2xl glass border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition group">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 grid place-items-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">Know the basics?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Explore the complete subject-wise syllabus tree, topic weightages, and key concepts for GATE {paper.code}.
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onSelectTab('syllabus')}
                className="w-full inline-flex items-center justify-between text-xs font-semibold text-purple-300 hover:text-white bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 px-4 py-2.5 rounded-xl transition group-hover:translate-x-0.5"
              >
                <span>Explore syllabus</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Path 3: Already preparing */}
          <div className="relative rounded-2xl glass border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition group">
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 grid place-items-center">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">Already preparing?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Find curated topic-level learning materials, standard textbook references, and verified previous-year questions (PYQs).
              </p>
            </div>
            <div className="pt-6">
              <button
                onClick={() => onSelectTab('syllabus')}
                className="w-full inline-flex items-center justify-between text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-4 py-2.5 rounded-xl transition group-hover:translate-x-0.5"
              >
                <span>Explore resources</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EXAM STRUCTURE FACTS (No fake vanity metrics) */}
      <section className="rounded-2xl glass border border-white/10 p-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          GATE {paper.code} Examination Facts & Structure
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-white/5">
          <div className="p-2">
            <div className="font-display text-2xl font-bold text-accent">{paper.totalQuestions}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Total Questions</div>
            <div className="text-[10px] text-slate-500 mt-1">10 GA + 55 Core Subject</div>
          </div>
          <div className="p-2 pl-4">
            <div className="font-display text-2xl font-bold text-accent">{paper.totalMarks} Marks</div>
            <div className="text-xs text-muted-foreground mt-0.5">Total Paper Score</div>
            <div className="text-[10px] text-slate-500 mt-1">15% GA + 85% Subject</div>
          </div>
          <div className="p-2 pl-4">
            <div className="font-display text-2xl font-bold text-accent">{paper.durationMinutes / 60} Hours</div>
            <div className="text-xs text-muted-foreground mt-0.5">Exam Duration</div>
            <div className="text-[10px] text-slate-500 mt-1">180 minutes single session</div>
          </div>
          <div className="p-2 pl-4">
            <div className="font-display text-2xl font-bold text-accent">3 Types</div>
            <div className="text-xs text-muted-foreground mt-0.5">Question Formats</div>
            <div className="text-[10px] text-slate-500 mt-1">MCQ • MSQ • NAT</div>
          </div>
        </div>
      </section>

      {/* TIMELINE PREVIEW & LATEST UPDATES FEED */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Key Timeline Milestones */}
        <div className="rounded-2xl glass border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" />
              <span>Upcoming Milestones</span>
            </h3>
            <button
              onClick={() => onSelectTab('updates')}
              className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
            >
              <span>Full timeline</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-xl glass border border-white/5 p-3.5 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-foreground">{evt.title}</div>
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-slate-500" />
                    <span>{evt.dateLabel}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
                    evt.status === 'ongoing'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-300 border-white/10'
                  }`}
                >
                  {evt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Verified Updates */}
        <div className="rounded-2xl glass border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              <span>Official Announcements</span>
            </h3>
            <button
              onClick={() => onSelectTab('updates')}
              className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
            >
              <span>All updates</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentUpdates.map((upd) => (
              <div key={upd.id} className="rounded-xl glass border border-white/5 p-3.5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground line-clamp-1">{upd.title}</span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(upd.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-slate-400 line-clamp-2 leading-relaxed">{upd.summary}</p>
                {upd.officialUrl && (
                  <a
                    href={upd.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline font-medium"
                  >
                    <span>View Official Portal</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
