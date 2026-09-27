import { Link } from '@tanstack/react-router';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface GateFooterProps {
  lastVerifiedAt: string;
}

export default function GateFooter({ lastVerifiedAt }: GateFooterProps) {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-700 py-10 mt-16 font-sans">
      <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">SyncRole</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200 font-mono">
                GATE 2027 Hub
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-xl">
              Public information product for GATE 2027 aspirants. Source-backed syllabus breakdowns, verified dates, examination patterns, and curated academic learning links.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 transition"
            >
              ← Back to SyncRole Platform
            </Link>
            <a
              href="https://gate2027.iitm.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1"
            >
              <span>Official GATE Portal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-teal-600 flex-shrink-0" />
            <span>
              Official Source Verified: <strong className="text-slate-800 font-mono">gate2027.iitm.ac.in</strong> (IIT Madras)
            </span>
          </div>

          <div className="font-mono text-[11px]">
            Last Verified:{' '}
            <strong className="text-slate-700">
              {new Date(lastVerifiedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </strong>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-4 leading-relaxed">
          <strong className="text-slate-500">Legal Disclaimer:</strong> GATE is an official examination conducted by the National Coordination Board (NCB)-GATE, Department of Higher Education, Ministry of Education, Government of India. SyncRole is an independent preparation and discovery platform. All examination logos, names, and official trademarks belong to their respective official authorities.
        </div>
      </div>
    </footer>
  );
}
