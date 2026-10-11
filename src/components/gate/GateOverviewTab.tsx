import { useState } from 'react';
import { GatePaperInfo, GateEvent, GateUpdate } from '@/lib/gate/gateTypes';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  FileCheck,
  FileText,
  Info,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useGateLiveClock, resolveGateLiveSchedule } from '@/lib/gate/gateDateUtils';

interface GateOverviewTabProps {
  paper: GatePaperInfo;
  papers: GatePaperInfo[];
  events: GateEvent[];
  updates: GateUpdate[];
  onSelectPaper: (code: string) => void;
  onJumpToSyllabus: () => void;
  onJumpToUpdates: () => void;
  onJumpToPattern: () => void;
  lastVerifiedAt: string;
  isFallback: boolean;
}

export default function GateOverviewTab({
  paper,
  papers,
  events,
  updates,
  onSelectPaper,
  onJumpToSyllabus,
  onJumpToUpdates,
  onJumpToPattern,
  lastVerifiedAt,
  isFallback,
}: GateOverviewTabProps) {
  const [openFaq, setOpenFaq] = useState<string>('what_is');

  // Real-Time Dynamic GATE 2027 Schedule & Live Clock
  const now = useGateLiveClock();
  const {
    enrichedEvents,
    ongoingEvent,
    nextMilestone,
    examEvent,
    targetMilestone,
    countdown,
  } = resolveGateLiveSchedule(events, now);

  const prepRoadmapSteps = [
    { num: '01', title: 'Understand', desc: 'Purpose, eligibility & exam pattern rules' },
    { num: '02', title: 'Choose', desc: 'Primary paper & permitted 2-paper combination' },
    { num: '03', title: 'Learn', desc: 'Official GATE 2027 subject syllabus topics' },
    { num: '04', title: 'Practice', desc: 'Topic-wise previous year questions (PYQs)' },
    { num: '05', title: 'Analyze', desc: 'Identify weak areas and revise core concepts' },
    { num: '06', title: 'Revise', desc: 'Build speed, accuracy & exam-day consistency' },
  ];

  const popularPaperCodes = ['CSE', 'DA', 'ECE', 'EE', 'ME', 'CE', 'IN', 'CH'];

  const faqs = [
    {
      id: 'what_is',
      q: 'What is GATE 2027?',
      a: 'The Graduate Aptitude Test in Engineering (GATE) is a national-level examination conducted jointly by the Indian Institute of Science (IISc) and seven IITs (with IIT Madras organizing GATE 2027) on behalf of the National Coordination Board (NCB)-GATE, Department of Higher Education, Ministry of Education, Government of India.',
    },
    {
      id: 'who_eligible',
      q: 'Who is eligible to appear for GATE 2027?',
      a: 'Candidates currently studying in the 3rd year or higher of any undergraduate degree program (B.E., B.Tech, B.Sc, B.Arch, MCA, M.Sc) or who have completed any government-approved degree in Engineering, Technology, Architecture, Science, Commerce, or Arts are eligible. There is no upper age limit.',
    },
    {
      id: 'purpose',
      q: 'What opportunities does GATE open?',
      a: 'GATE scores are used for: 1) Master’s (M.Tech/M.E.) & Ph.D. admissions at IISc, IITs, NITs, and premier institutes; 2) Financial assistance (monthly stipend) during post-graduation; 3) Group-A Officer recruitment at major Public Sector Undertakings (PSUs like IOCL, ONGC, NTPC, HPCL, BARC); 4) Master’s admissions at select international universities (NUS, NTU, German tech universities).',
    },
    {
      id: 'disclaimer',
      q: 'Does qualifying GATE guarantee a job or admission?',
      a: 'No. GATE qualification satisfies the baseline eligibility for M.Tech admissions and PSU cutoffs. Individual institutes and PSUs conduct separate counseling (COAP/CCMT) or interview rounds. Qualifying GATE alone does not guarantee a job or seat.',
    },
  ];

  return (
    <div className="space-y-10 text-slate-800 font-sans">
      {/* 1. TOP OVERVIEW HERO & EXECUTIVE BRIEF */}
      <section className="space-y-5">
        {/* Verification Strip & Free Access Notice */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-teal-50/80 border border-teal-200/90 rounded-xl px-4 py-2.5 text-xs">
          <div className="flex items-center gap-2 text-teal-900 font-medium">
            <ShieldCheck className="h-4 w-4 text-teal-700 flex-shrink-0" />
            <span>
              Official GATE 2027 Data Sourced from{' '}
              <a
                href="https://gate2027.iitm.ac.in/"
                target="_blank"
                rel="noreferrer"
                className="underline font-bold hover:text-teal-950"
              >
                gate2027.iitm.ac.in
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-600 font-mono text-[11px]">
            <span>
              Last Verified:{' '}
              <strong className="text-slate-900 font-semibold">
                {new Date(lastVerifiedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-teal-800 bg-teal-100/90 px-2 py-0.5 rounded font-sans font-semibold">
              Free Public Access (No Login Required)
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider font-mono">
                Official Exam Workspace • GATE 2027
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${
                  ongoingEvent
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : targetMilestone?.isTentative
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-teal-50 text-teal-800 border-teal-300'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    ongoingEvent
                      ? 'bg-emerald-600 animate-pulse'
                      : targetMilestone?.isTentative
                      ? 'bg-amber-500'
                      : 'bg-teal-600'
                  }`}
                />
                {ongoingEvent
                  ? `Active Window: ${ongoingEvent.eventType.toUpperCase()}`
                  : targetMilestone?.isTentative
                  ? 'Schedule Status: Tentative Target Dates'
                  : 'Schedule Status: Officially Confirmed'}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Graduate Aptitude Test in Engineering — GATE 2027
            </h1>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Comprehensive national examination conducted by IIT Madras for postgraduate admissions (M.Tech / Ph.D.) across premier institutes and premier recruitment at major Public Sector Undertakings (PSUs).
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-slate-100">
            <button
              onClick={onJumpToSyllabus}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold px-5 py-2.5 text-xs transition shadow-xs cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Explore Syllabus & Papers</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={onJumpToUpdates}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold px-4 py-2.5 text-xs transition shadow-2xs cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-teal-700" />
              <span>View Exam Timeline & Dates</span>
            </button>

            <button
              onClick={onJumpToPattern}
              className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 text-xs transition shadow-2xs cursor-pointer"
            >
              <FileText className="h-4 w-4 text-slate-500" />
              <span>Exam Pattern & Marking Rules</span>
            </button>

            <a
              href="https://gate2027.iitm.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-800 ml-auto transition"
            >
              <span>IIT Madras Portal</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Compact Stat Cards (Factual, Verified Overview) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-xl md:text-2xl font-bold text-slate-900 font-mono">30 Papers</div>
            <div className="text-xs font-semibold text-slate-700">Test Papers / Disciplines</div>
            <div className="text-[11px] text-slate-500">Allowed 1 or 2 papers</div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-xl md:text-2xl font-bold text-slate-900 font-mono">3 Hours</div>
            <div className="text-xs font-semibold text-slate-700">Exam Duration</div>
            <div className="text-[11px] text-slate-500">180 Mins Single Session</div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-xl md:text-2xl font-bold text-slate-900 font-mono">100 Marks</div>
            <div className="text-xs font-semibold text-slate-700">Total Marks</div>
            <div className="text-[11px] text-slate-500">15% GA + 85% Subject</div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-xl md:text-2xl font-bold text-slate-900 font-mono">CBT Mode</div>
            <div className="text-xs font-semibold text-slate-700">Exam Delivery</div>
            <div className="text-[11px] text-slate-500">Computer Based Test</div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME SCHEDULE MONITOR & COUNTDOWN */}
      <section className="bg-white border border-teal-200/80 p-6 rounded-2xl shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 font-mono">
                Real-Time Schedule Monitor
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-medium text-slate-500 font-mono">
                Live IST Clock: {now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {ongoingEvent
                ? ongoingEvent.title
                : nextMilestone
                ? nextMilestone.title
                : 'GATE 2027 CBT Examinations'}
            </h2>
          </div>

          <button
            onClick={onJumpToUpdates}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
          >
            <span>View Full 8-Milestone Timeline</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Real-Time Countdown to Target Milestone */}
        {targetMilestone && (
          <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-900 text-white p-5 rounded-xl space-y-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-teal-400" />
                <span className="font-mono uppercase font-bold tracking-wider text-teal-300">
                  Countdown to {targetMilestone.title}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                  targetMilestone.isTentative
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                }`}
              >
                {targetMilestone.isTentative ? 'Tentative Schedule' : 'Official Announced Date'}
              </span>
            </div>

            {countdown.isTentative ? (
              <div className="text-sm font-medium text-amber-200 bg-white/5 p-3 rounded-lg border border-white/10">
                {countdown.formatted} — Verified schedule updates will synchronize automatically once IIT Madras publishes them.
              </div>
            ) : countdown.isPassed ? (
              <div className="text-sm font-semibold text-emerald-300 bg-white/5 p-3 rounded-lg border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>This examination milestone is currently underway or completed.</span>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                    {countdown.days}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-teal-300 uppercase tracking-wider">
                    Days
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-teal-300 uppercase tracking-wider">
                    Hours
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-teal-300 uppercase tracking-wider">
                    Minutes
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tracking-tight">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] sm:text-xs font-semibold text-teal-300 uppercase tracking-wider">
                    Seconds
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2 Contextual Schedule Blocks */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              {nextMilestone ? 'Immediate Next Milestone' : 'Examination Schedule'}
            </div>
            <div className="text-sm font-bold text-slate-900">
              {nextMilestone ? nextMilestone.title : examEvent ? examEvent.title : 'Official GATE 2027 Schedule'}
            </div>
            <div className="text-xs text-teal-700 font-medium font-mono">
              {nextMilestone ? nextMilestone.dateLabel : examEvent ? examEvent.dateLabel : 'Announced on portal'}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              {nextMilestone?.description || 'All milestone dates are synchronized with official IIT Madras publications.'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Registration & GOAPS Portal
            </div>
            <div className="text-sm font-bold text-slate-900">Application Window & Verification</div>
            <div className="text-xs text-slate-600">
              Ensure candidate profile details, identification, and category certificates conform to official organizing guidelines.
            </div>
            <a
              href="https://gate2027.iitm.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-teal-700 font-semibold hover:underline pt-1"
            >
              <span>Visit Official Candidate Portal</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. QUICK PAPER SHORTCUT & ACTIVE COMBINATIONS */}
      <section className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
              Discipline Context
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Active Paper: <span className="text-teal-800 font-mono">GATE {paper.code} — {paper.name}</span>
            </h2>
          </div>

          <button
            onClick={onJumpToSyllabus}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 cursor-pointer"
          >
            <span>Browse all 30 papers in Syllabus workspace</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quick paper switcher pills */}
        <div className="space-y-2">
          <div className="text-xs text-slate-600 font-medium">Quick-select popular engineering & data papers:</div>
          <div className="flex flex-wrap items-center gap-2">
            {popularPaperCodes.map((code) => {
              const isSelected = paper.code === code;
              return (
                <button
                  key={code}
                  onClick={() => onSelectPaper(code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  GATE {code}
                </button>
              );
            })}
          </div>
        </div>

        {/* Permitted 2-Paper Combinations for this paper */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-900">Permitted Secondary Combinations for GATE {paper.code}:</span>
            <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
              {paper.allowedSecondPapers && paper.allowedSecondPapers.length > 0 ? (
                paper.allowedSecondPapers.map((secCode) => (
                  <span
                    key={secCode}
                    className="px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-slate-800"
                  >
                    GATE {secCode}
                  </span>
                ))
              ) : (
                <span className="text-slate-500">Check combination guidelines on official portal.</span>
              )}
            </div>
          </div>

          <button
            onClick={onJumpToSyllabus}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-700 text-white font-semibold hover:bg-teal-800 transition shrink-0 cursor-pointer"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Open {paper.code} Syllabus PDF</span>
          </button>
        </div>
      </section>

      {/* 4. PREPARATION ROADMAP SECTION */}
      <section className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Academic Method
          </div>
          <h2 className="text-lg font-bold text-slate-900">GATE Preparation Roadmap</h2>
          <p className="text-xs text-slate-500">
            A structured sequence to master fundamental engineering concepts and score competitively.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {prepRoadmapSteps.map((step) => (
            <div
              key={step.num}
              className="bg-slate-50/80 border border-slate-200 p-3.5 rounded-xl space-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-teal-700 font-mono">{step.num}</div>
                <div className="text-xs font-bold text-slate-900">{step.title}</div>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ESSENTIAL FAQS ACCORDION */}
      <section className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-xs space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Essential Questions
          </div>
          <h2 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div key={faq.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? '' : faq.id)}
                  className="w-full text-left p-3.5 font-semibold text-xs md:text-sm text-slate-900 hover:text-teal-700 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
