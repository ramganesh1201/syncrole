import { GateEvent, GateUpdate } from '@/lib/gate/gateTypes';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  History,
  ShieldCheck,
} from 'lucide-react';

interface GateUpdatesTabProps {
  events: GateEvent[];
  updates: GateUpdate[];
  lastVerifiedAt: string;
}

export default function GateUpdatesTab({ events, updates, lastVerifiedAt }: GateUpdatesTabProps) {
  return (
    <div className="space-y-16 animate-in fade-in duration-300 font-sans">
      {/* 1. EDITORIAL HEADER */}
      <section className="space-y-4 pt-4">
        {/* Micro label */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>UPDATES & SOURCE PROVENANCE</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl leading-tight">
          Official GATE Timeline & Verified Announcements
        </h1>

        {/* Short Summary */}
        <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
          Track official examination milestones, verified date releases, and announcement logs sourced directly from the official organizing institute committee portal.
        </p>
      </section>

      {/* 2. OFFICIAL EXAMINATION TIMELINE */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
              GATE 2027 TIMELINE
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Official Examination Milestones</h2>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-medium flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Direct Official Sourced
          </span>
        </div>

        {/* Vertical Timeline with Connectors */}
        <div className="relative border-l border-white/10 ml-3 space-y-6 pl-6 py-2">
          {events.map((evt) => (
            <div key={evt.id} className="relative space-y-2">
              {/* Connector Dot */}
              <div
                className={`absolute -left-[30px] top-1.5 h-3 w-3 rounded-full ${
                  evt.status === 'ongoing' ? 'bg-emerald-400 ring-4 ring-emerald-500/20' : 'bg-slate-600'
                }`}
              />

              <div className="border border-white/10 bg-white/[0.02] p-5 rounded-xl space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-display text-base font-semibold text-foreground">{evt.title}</div>
                  <span
                    className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded border w-fit ${
                      evt.status === 'ongoing'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-white/5 text-slate-300 border-white/10'
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-accent">{evt.dateLabel}</div>

                {/* Provenance Footer */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                  <div className="space-x-3">
                    <span>
                      Status: <strong className="text-slate-200 capitalize">{evt.verificationStatus}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Verified: <strong className="text-slate-200">{new Date(evt.lastVerifiedAt).toLocaleDateString()}</strong>
                    </span>
                  </div>

                  {evt.officialUrl && (
                    <a
                      href={evt.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent hover:underline font-medium"
                    >
                      <span>Verify on Official Portal</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CHRONOLOGICAL ANNOUNCEMENTS FEED */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            LATEST OFFICIAL UPDATES
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">Verified Announcement Log</h2>
        </div>

        <div className="space-y-4 font-sans">
          {updates.map((upd) => (
            <div key={upd.id} className="border border-white/10 bg-white/[0.02] p-5 rounded-xl space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase text-purple-300 font-semibold">
                    {upd.updateType.replace('_', ' ')}
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{upd.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {new Date(upd.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{upd.summary}</p>

              {/* Provenance footer */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
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
