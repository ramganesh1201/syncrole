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
    <div className="space-y-12 text-slate-800 font-sans">
      {/* Editorial Header */}
      <section className="space-y-3 pt-2 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-teal-700">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
          <span>UPDATES & OFFICIAL PROVENANCE</span>
        </div>

        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900">
          Official GATE 2027 Timeline & Announcements Log
        </h2>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Track official examination milestones, verified date releases, and announcement logs sourced directly from the official organizing institute portal (IIT Madras).
        </p>
      </section>

      {/* Official Timeline */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
              GATE 2027 TIMELINE
            </div>
            <h3 className="text-xl font-bold text-slate-900">Official Examination Milestones</h3>
          </div>
          <span className="text-xs font-mono text-teal-800 font-semibold flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-teal-600" /> Directly Verified
          </span>
        </div>

        {/* Timeline Items */}
        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className={`bg-white border p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                evt.status === 'ongoing' ? 'border-teal-400 bg-teal-50/20' : 'border-slate-200/90'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{evt.title}</span>
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
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
                <div className="text-xs text-slate-500 font-mono">
                  Verified Status: <strong className="text-slate-800 capitalize">{evt.verificationStatus}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-xs font-bold font-mono text-teal-800 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  {evt.dateLabel}
                </div>

                {evt.officialUrl && (
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-teal-700 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Verify ↗</span>
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
          <h3 className="text-xl font-bold text-slate-900">Verified Announcement Log</h3>
        </div>

        <div className="space-y-3">
          {updates.map((upd) => (
            <div key={upd.id} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    {upd.updateType.replace('_', ' ')}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">{upd.title}</h4>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {new Date(upd.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{upd.summary}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-teal-700 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Direct Official Sourced
                </span>

                {upd.officialUrl && (
                  <a
                    href={upd.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-teal-700 hover:underline font-semibold"
                  >
                    <span>Official Source</span>
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
