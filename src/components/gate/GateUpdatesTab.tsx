import { GateEvent, GateUpdate } from '@/lib/gate/gateTypes';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  History,
  Info,
  ShieldCheck,
} from 'lucide-react';

interface GateUpdatesTabProps {
  events: GateEvent[];
  updates: GateUpdate[];
  lastVerifiedAt: string;
}

export default function GateUpdatesTab({ events, updates, lastVerifiedAt }: GateUpdatesTabProps) {
  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          <Calendar className="h-3.5 w-3.5" />
          <span>Updates & Source Provenance</span>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-foreground">
          Official GATE Timeline & Verified Announcements
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          Track official examination milestones, verified date releases, and announcement logs sourced directly from the official organizing institute committee portal.
        </p>
      </section>

      {/* OFFICIAL DATES TIMELINE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            <span>Official Examination Timeline</span>
          </h2>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Direct Official Sourced</span>
          </span>
        </div>

        <div className="relative border-l-2 border-white/10 ml-3 space-y-6 pl-6 py-2">
          {events.map((evt) => (
            <div key={evt.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div
                className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-background ${
                  evt.status === 'ongoing'
                    ? 'bg-emerald-400 ring-4 ring-emerald-500/20'
                    : 'bg-slate-700'
                }`}
              />

              <div className="rounded-2xl glass border border-white/10 p-5 space-y-3 hover:border-white/20 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-foreground">{evt.title}</h3>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase px-2.5 py-0.5 rounded-full border w-fit ${
                      evt.status === 'ongoing'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border-white/10'
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-accent flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{evt.dateLabel}</span>
                </div>

                {/* Provenance Metadata */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
                  <div className="space-x-3">
                    <span>
                      Status:{' '}
                      <strong className="text-slate-200 capitalize">{evt.verificationStatus}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Verified:{' '}
                      <strong className="text-slate-200">
                        {new Date(evt.lastVerifiedAt).toLocaleDateString()}
                      </strong>
                    </span>
                  </div>

                  {evt.officialUrl && (
                    <a
                      href={evt.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline font-medium"
                    >
                      <span>Verify on Official Site</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICIAL ANNOUNCEMENTS & CHANGE HISTORY FEED */}
      <section className="space-y-4 pt-4 border-t border-white/10">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent" />
          <span>Verified Updates & Change Detection Log</span>
        </h2>

        <div className="space-y-4">
          {updates.map((upd) => (
            <div key={upd.id} className="rounded-2xl glass border border-white/10 p-5 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full mb-1.5">
                    <History className="h-3 w-3" />
                    <span className="uppercase tracking-wider">{upd.updateType.replace('_', ' ')}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{upd.title}</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {new Date(upd.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{upd.summary}</p>

              {/* Provenance footer */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Source Verified
                </span>

                {upd.officialUrl && (
                  <a
                    href={upd.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline font-medium"
                  >
                    <span>View Official Source</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
