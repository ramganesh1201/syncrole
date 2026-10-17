import { GateEvent, GateUpdate } from '@/lib/gate/gateTypes';
import { useGateLiveClock, enrichEventsWithDynamicStatus } from '@/lib/gate/gateDateUtils';
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
  const now = useGateLiveClock();
  const dynamicEvents = enrichEventsWithDynamicStatus(events, now);

  return (
    <div className="space-y-12 text-slate-800 font-sans">
      {/* Editorial Header */}
      <section className="space-y-3 pt-2 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-teal-700">
          <span className="h-2 w-2 rounded-full bg-teal-600" />
          <span>Updates & Official Provenance</span>
        </div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
          Official GATE 2027 Timeline & Announcements Log
        </h1>

        <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
          Track official examination milestones, verified date releases, and announcement logs sourced directly from the official organizing institute portal (IIT Madras).
        </p>
      </section>

      {/* Official Timeline */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
              GATE 2027 TIMELINE
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">Official Examination Milestones</h2>
          </div>
          <span className="text-xs md:text-sm font-mono text-teal-800 font-semibold flex items-center gap-1.5">
            <ShieldCheck className="h-4.5 w-4.5 text-teal-600" /> Directly Verified
          </span>
        </div>

        {/* Timeline Items */}
        <div className="space-y-3.5">
          {dynamicEvents.map((evt) => (
            <div
              key={evt.id}
              className={`bg-white border p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs ${
                evt.status === 'ongoing' ? 'border-emerald-400 bg-emerald-50/20 ring-1 ring-emerald-300' : 'border-slate-200/90'
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-bold text-base text-slate-900">{evt.title}</span>
                  <span
                    className={`text-xs font-mono uppercase font-bold px-2.5 py-0.5 rounded border ${
                      evt.status === 'ongoing'
                        ? 'bg-teal-100 text-teal-800 border-teal-300'
                        : evt.status === 'completed'
                        ? 'bg-slate-100 text-slate-600 border-slate-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {evt.status}
                  </span>
                </div>
                {evt.description && (
                  <p className="text-sm text-slate-600 leading-relaxed max-w-2xl pt-0.5">
                    {evt.description}
                  </p>
                )}
                <div className="text-xs text-slate-500 font-mono pt-0.5">
                  Verified Status: <strong className="text-slate-800 capitalize">{evt.verificationStatus}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-xs md:text-sm font-bold font-mono text-teal-800 bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
                  {evt.dateLabel}
                </div>

                {evt.officialUrl && (
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs md:text-sm font-semibold text-teal-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Verify â†—</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Announcements Feed */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            LATEST OFFICIAL UPDATES
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">Verified Announcement Log</h2>
        </div>

        <div className="space-y-3.5">
          {updates.map((upd) => (
            <div key={upd.id} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-2.5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold font-mono uppercase px-2.5 py-0.5 rounded bg-teal-100 text-teal-800">
                    {upd.updateType.replace('_', ' ')}
                  </span>
                  <h3 className="font-bold text-base md:text-lg text-slate-900">{upd.title}</h3>
                </div>
                <span className="text-xs md:text-sm font-mono text-slate-500">
                  {new Date(upd.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed">{upd.summary}</p>

              {upd.whatItMeans && (
                <div className="bg-teal-50/70 border border-teal-200/80 p-3.5 rounded-xl text-xs md:text-sm text-teal-950 leading-relaxed">
                  <strong className="text-teal-900">What this means for candidates: </strong>
                  {upd.whatItMeans}
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs md:text-sm">
                <span className="flex items-center gap-1 text-teal-700 font-semibold">
                  <CheckCircle2 className="h-4 w-4" /> Direct Official Sourced
                </span>

                {upd.officialUrl && (
                  <a
                    href={upd.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-teal-700 hover:underline font-semibold"
                  >
                    <span>Official Source</span>
                    <ExternalLink className="h-3.5 w-3.5" />
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

