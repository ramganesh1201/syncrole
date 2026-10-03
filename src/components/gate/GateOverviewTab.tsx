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
  HelpCircle,
  Info,
  Layers,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import GateSyncPilotHelper from './GateSyncPilotHelper';

interface GateOverviewTabProps {
  paper: GatePaperInfo;
  papers: GatePaperInfo[];
  events: GateEvent[];
  updates: GateUpdate[];
  onSelectPaper: (code: string) => void;
  onJumpToSyllabus: () => void;
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
  lastVerifiedAt,
  isFallback,
}: GateOverviewTabProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<GateUpdate | null>(null);
  const [paperSearchQuery, setPaperSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<string>('what_is');

  // Filter papers for Paper Selector
  const categories = ['All', 'Computer & Data Science', 'Electrical & Electronics', 'Mechanical & Civil', 'Process & Bio Sciences'];
  
  const filteredPapers = papers.filter((p) => {
    const matchesSearch =
      p.code.toLowerCase().includes(paperSearchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(paperSearchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate Dynamic GATE 2027 Status
  const currentDate = new Date('2026-09-27T19:19:16+05:30'); // System Date: 27 Sep 2026
  const currentEvent = events.find((e) => e.status === 'ongoing') || events[1];
  const nextEvent = events.find((e) => e.status === 'upcoming') || events[2];

  const prepRoadmapSteps = [
    { num: '01', title: 'Understand', desc: 'Purpose, eligibility & exam pattern rules' },
    { num: '02', title: 'Choose', desc: 'Primary paper & permitted 2-paper combination' },
    { num: '03', title: 'Learn', desc: 'Official GATE 2027 subject syllabus topics' },
    { num: '04', title: 'Practice', desc: 'Topic-wise previous year questions (PYQs)' },
    { num: '05', title: 'Analyze', desc: 'Identify weak areas and revise core concepts' },
    { num: '06', title: 'Revise', desc: 'Build speed, accuracy & exam-day consistency' },
  ];

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
    <div className="space-y-16 text-slate-800 font-sans">
      {/* 1. TOP OVERVIEW SECTION — FACTUAL INTRODUCTION */}
      <section id="overview" className="space-y-6 pt-2 scroll-mt-28">
        {/* Verification Strip & Free Access Notice */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-teal-50/80 border border-teal-200/90 rounded-xl px-4 py-2 text-xs">
          <div className="flex items-center gap-2 text-teal-800 font-medium">
            <ShieldCheck className="h-4 w-4 text-teal-600 flex-shrink-0" />
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
            <span className="hidden sm:inline text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded font-sans font-semibold">
              Free Public Access (No Login Required)
            </span>
          </div>
        </div>

        {/* Overview Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider">
            <span>Official Exam Hub • GATE 2027</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            GATE 2027 — Graduate Aptitude Test in Engineering
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
            A national-level examination assessing comprehensive understanding of undergraduate subjects across Engineering, Technology, Science, Architecture, Commerce, Arts and Humanities.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://gate2027.iitm.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-semibold px-4 py-2.5 text-xs transition shadow-xs"
            >
              <span>Official GATE 2027 Website</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={onJumpToSyllabus}
              className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold px-4 py-2.5 text-xs transition shadow-xs cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-teal-600" />
              <span>Explore GATE {paper.code} Syllabus</span>
            </button>

            <a
              href="#dates"
              className="inline-flex items-center gap-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium px-4 py-2.5 text-xs transition"
            >
              <Calendar className="h-4 w-4 text-slate-500" />
              <span>View Important Dates</span>
            </a>
          </div>
        </div>

        {/* 4 Compact Stat Chips (Exam Facts, NOT Marketing) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-2xl font-bold text-slate-900 font-mono">30</div>
            <div className="text-xs font-semibold text-slate-700">Test Papers / Disciplines</div>
            <div className="text-[11px] text-slate-500">Allowed 1 or 2 papers</div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-2xl font-bold text-slate-900 font-mono">3 Hours</div>
            <div className="text-xs font-semibold text-slate-700">Exam Duration</div>
            <div className="text-[11px] text-slate-500">180 Mins Single Session</div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-2xl font-bold text-slate-900 font-mono">100</div>
            <div className="text-xs font-semibold text-slate-700">Total Marks</div>
            <div className="text-[11px] text-slate-500">15% GA + 85% Subject</div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 rounded-xl shadow-xs space-y-1">
            <div className="text-2xl font-bold text-slate-900 font-mono">CBT</div>
            <div className="text-xs font-semibold text-slate-700">Exam Mode</div>
            <div className="text-[11px] text-slate-500">Computer Based Test</div>
          </div>
        </div>
      </section>

      {/* 2. "WHAT IS GATE?" SECTION */}
      <section id="about" className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Educational Foundations
          </div>
          <h2 className="text-2xl font-bold text-slate-900">What is GATE?</h2>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            GATE is a national-level examination that assesses comprehensive understanding of undergraduate-level engineering, technology, architecture, science, commerce, arts, and humanities subjects.
          </p>
        </div>

        {/* Two-Column Explanation: What it opens vs Who can apply */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Column 1: Opportunities */}
          <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
              <CheckCircle2 className="h-5 w-5 text-teal-600" />
              <span>What GATE can be used for</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Postgraduate Admissions:</strong> M.Tech, M.E., M.Des, and Ph.D. programs at IISc, IITs, NITs, IIITs, and other top institutes.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Financial Assistance / Stipend:</strong> MHRD / AICTE monthly stipend (e.g., ₹12,400/month for M.Tech) where applicable.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">PSU Recruitment:</strong> Direct shortlisting for Group-A roles at PSUs (IOCL, ONGC, NTPC, HPCL, BHEL, PowerGrid, BARC).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Global Study Options:</strong> GATE scores are accepted for Master’s programs by Asian & European universities (NUS, NTU, TU Munich).
                </div>
              </li>
            </ul>

            <div className="bg-amber-50 border border-amber-200/90 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Factual Note:</strong> Qualifying GATE satisfies baseline academic criteria. It does NOT automatically guarantee admission or a PSU job without subsequent counseling or interview selection.
              </span>
            </div>
          </div>

          {/* Column 2: Eligibility */}
          <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base border-b border-slate-100 pb-3">
              <FileCheck className="h-5 w-5 text-teal-600" />
              <span>Who can apply for GATE 2027?</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Undergraduate Students:</strong> Currently studying in the 3rd year or higher of any undergraduate degree (B.E. / B.Tech / B.Sc / B.Arch / MCA / M.Sc).
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">Graduates:</strong> Already completed any government-approved degree in Engineering, Technology, Architecture, Science, Commerce, or Arts.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">No Upper Age Limit:</strong> Candidates of any age can appear without restrictions on the number of attempts.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-slate-900">International Candidates:</strong> Candidates from foreign countries who meet equivalent educational criteria are eligible.
                </div>
              </li>
            </ul>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-700">
              <strong>Official Verification:</strong> Always verify candidate category certificate templates and degree eligibility directly on the official organizing portal before final form submission.
            </div>
          </div>
        </div>

        {/* Essential FAQs Accordion */}
        <div className="space-y-3 pt-2">
          <h3 className="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? '' : faq.id)}
                    className="w-full text-left p-4 font-semibold text-xs md:text-sm text-slate-900 hover:text-teal-700 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. "WHAT IS HAPPENING NOW?" SECTION (DYNAMIC DATA-DRIVEN) */}
      <section id="status" className="space-y-4 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Real-Time Timeline Monitor
          </div>
          <h2 className="text-2xl font-bold text-slate-900">GATE 2027 — What's Happening Now?</h2>
        </div>

        <div className="bg-white border border-teal-200 p-6 rounded-2xl shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold font-mono">
                  <span className="h-2 w-2 rounded-full bg-teal-600 animate-pulse" />
                  CURRENT STATUS: REGISTRATION
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Reflected as of {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{currentEvent.title}</h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                Window: {currentEvent.dateLabel}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                IMMEDIATE NEXT EVENT
              </div>
              <div className="text-sm font-bold text-slate-900">{nextEvent.title}</div>
              <div className="text-xs text-teal-700 font-medium font-mono">{nextEvent.dateLabel}</div>
              <p className="text-[11px] text-slate-500 pt-1">
                Extended registration allows candidate application submission with prescribed late fees.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                IMPORTANT CANDIDATE ACTION
              </div>
              <div className="text-sm font-bold text-slate-900">Check Photo & Document Rules</div>
              <div className="text-xs text-slate-600">Ensure photograph background and signature conform to official guidelines.</div>
              <a
                href="https://gate2027.iitm.ac.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal-700 font-semibold hover:underline pt-1"
              >
                <span>Verify on GOAPS Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. IMPORTANT DATES SECTION */}
      <section id="dates" className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
              Verified Chronology
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Important Dates — GATE 2027</h2>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Source: <a href="https://gate2027.iitm.ac.in/" target="_blank" rel="noreferrer" className="text-teal-700 underline font-semibold">Official GATE 2027 Portal</a>
          </div>
        </div>

        {/* Visual Timeline Cards */}
        <div className="space-y-3">
          {events.map((evt) => {
            const isCurrent = evt.status === 'ongoing';
            const isCompleted = evt.status === 'completed';
            return (
              <div
                key={evt.id}
                className={`bg-white border p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition shadow-xs ${
                  isCurrent
                    ? 'border-teal-400 bg-teal-50/30 ring-1 ring-teal-300'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold flex-shrink-0 ${
                      isCurrent
                        ? 'bg-teal-600 text-white'
                        : isCompleted
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isCurrent ? '●' : isCompleted ? '✓' : '○'}
                  </span>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{evt.title}</span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                          isCurrent
                            ? 'bg-teal-100 text-teal-800 border-teal-300'
                            : isCompleted
                            ? 'bg-slate-100 text-slate-600 border-slate-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {isCurrent ? 'Active / Current' : evt.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      Event Type: <span className="capitalize">{evt.eventType.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right sm:text-right text-xs font-bold font-mono text-teal-800 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 sm:w-auto w-fit">
                  {evt.dateLabel}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
          <span>All dates are subject to official organizing institute announcements.</span>
          <span>Last Verified: {new Date(lastVerifiedAt).toLocaleDateString()}</span>
        </div>
      </section>

      {/* 5. EXAMINATION STRUCTURE SECTION */}
      <section id="pattern" className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Test Design & Marking Rules
          </div>
          <h2 className="text-2xl font-bold text-slate-900">How the GATE 2027 Exam Works</h2>
        </div>

        {/* Structure Diagram Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">
              01 • Mode & Duration
            </div>
            <div className="text-base font-bold text-slate-900">Computer Based Test (CBT)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conducted online at designated test centers across India. Total duration is 3 Hours (180 minutes) in English medium.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">
              02 • Weightage Breakdown
            </div>
            <div className="text-base font-bold text-slate-900">65 Questions • 100 Marks</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              General Aptitude (GA): 15% (15 Marks, 10 Questions). Core Subject Discipline: 85% (85 Marks, 55 Questions).
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="text-xs font-bold text-teal-700 uppercase tracking-wider font-mono">
              03 • Question Types
            </div>
            <div className="text-base font-bold text-slate-900">MCQ • MSQ • NAT</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Multiple Choice (MCQ), Multiple Select (MSQ), and Numerical Answer Type (NAT) questions.
            </p>
          </div>
        </div>

        {/* Detailed Question Format & Negative Marking Table */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            Question Format & Negative Marking Rules
          </div>

          <div className="p-5 grid md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="space-y-2 pt-2 md:pt-0">
              <div className="inline-flex px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold">
                MCQ (Multiple Choice)
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                4 options provided with exactly 1 correct answer.
              </div>
              <div className="text-xs font-medium text-rose-700 bg-rose-50 p-2 rounded border border-rose-200">
                Negative Marking: 1/3 mark deducted for 1-mark Q; 2/3 mark deducted for 2-mark Q.
              </div>
            </div>

            <div className="space-y-2 pt-4 md:pt-0 md:pl-6">
              <div className="inline-flex px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold">
                MSQ (Multiple Select)
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                One or more correct options out of 4 options provided.
              </div>
              <div className="text-xs font-medium text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                Zero Negative Marking. No partial credit for incomplete selection.
              </div>
            </div>

            <div className="space-y-2 pt-4 md:pt-0 md:pl-6">
              <div className="inline-flex px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 text-xs font-bold">
                NAT (Numerical Answer Type)
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                Numerical value entered using on-screen virtual keyboard.
              </div>
              <div className="text-xs font-medium text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                Zero Negative Marking. Entered value must lie within official tolerance range.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PAPER / BRANCH SELECTOR SECTION */}
      <section id="papers" className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
              Branch Context Selection
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Choose Your Paper</h2>
            <p className="text-xs text-slate-600">
              Selecting a paper updates the active syllabus breakdown, combinations, and resources.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              value={paperSearchQuery}
              onChange={(e) => setPaperSearchQuery(e.target.value)}
              placeholder="Search paper or code..."
              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-teal-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Branch Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredPapers.map((p) => {
            const isSelected = paper.code === p.code;
            return (
              <button
                key={p.code}
                onClick={() => onSelectPaper(p.code)}
                className={`text-left p-4 rounded-xl border transition shadow-xs cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-400/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">
                      GATE {p.code}
                    </span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                        Active Context
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-slate-900 leading-snug">{p.name}</div>
                  <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                  <span>{p.totalQuestions} Qs • {p.totalMarks} Marks</span>
                  <span className="text-teal-700 font-semibold flex items-center gap-1">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 7. TWO-PAPER COMBINATIONS SECTION */}
      <section id="combinations" className="space-y-4 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Dual Paper Options
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Can I choose two papers in GATE 2027?</h2>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-3 shadow-xs">
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
            Yes. Candidates can opt to appear in either <strong>ONE</strong> or <strong>TWO</strong> test papers from the permitted combinations specified by the GATE 2027 committee.
          </p>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-900">
              Permitted Secondary Combinations for Primary Paper: <span className="text-teal-700 font-mono font-bold">GATE {paper.code}</span>
            </div>
            {paper.allowedSecondPapers && paper.allowedSecondPapers.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2">
                {paper.allowedSecondPapers.map((code) => (
                  <span key={code} className="px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-bold font-mono text-slate-800">
                    GATE {code}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                Check official combination matrix published on official portal.
              </div>
            )}
          </div>

          <div className="pt-1">
            <a
              href="https://gate2027.iitm.ac.in/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:underline"
            >
              <span>View Official GATE 2027 Two-Paper Combinations Matrix</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. PREPARATION ROADMAP SECTION */}
      <section id="roadmap" className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Academic Process
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Preparation Roadmap</h2>
        </div>

        {/* Horizontal Timeline on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {prepRoadmapSteps.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-slate-200/90 p-4 rounded-xl space-y-2 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-teal-700 font-mono">{step.num}</div>
                <div className="text-sm font-bold text-slate-900">{step.title}</div>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. LATEST OFFICIAL UPDATES SECTION */}
      <section id="updates" className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
              Verified Notifications Log
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Latest GATE 2027 Updates</h2>
          </div>

          <span className="text-xs text-slate-500 font-mono">Strictly GATE 2027 Data</span>
        </div>

        <div className="space-y-3">
          {updates.map((upd) => (
            <div
              key={upd.id}
              onClick={() => setSelectedUpdate(upd)}
              className="bg-white border border-slate-200/90 hover:border-slate-300 p-5 rounded-2xl transition shadow-xs cursor-pointer space-y-2 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                    {upd.updateType.replace('_', ' ')}
                  </span>
                  <h3 className="font-bold text-sm md:text-base text-slate-900 group-hover:text-teal-800 transition">
                    {upd.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {new Date(upd.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{upd.summary}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-700 font-semibold">
                <span>View Details & Candidate Impact →</span>
                <span className="text-slate-400 font-normal">Official Source: gate2027.iitm.ac.in</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UPDATE DETAIL MODAL */}
      {selectedUpdate && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                  GATE 2027 Update
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{selectedUpdate.title}</h3>
                <div className="text-xs text-slate-500 font-mono">
                  Published: {new Date(selectedUpdate.publishedAt).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => setSelectedUpdate(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div>
                <strong className="text-slate-900 block mb-1">Official Summary:</strong>
                <p className="bg-slate-50 border border-slate-200 p-3 rounded-xl">{selectedUpdate.summary}</p>
              </div>

              {selectedUpdate.whatItMeans && (
                <div>
                  <strong className="text-slate-900 block mb-1">What this means for candidates:</strong>
                  <p className="bg-teal-50 border border-teal-200 text-teal-900 p-3 rounded-xl">
                    {selectedUpdate.whatItMeans}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={selectedUpdate.officialUrl || 'https://gate2027.iitm.ac.in/'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 text-white px-4 py-2 text-xs font-semibold hover:bg-teal-800 transition"
              >
                <span>Read Official Source ↗</span>
              </a>

              <button
                onClick={() => setSelectedUpdate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. OFFICIAL SOURCES & RESOURCES SECTION */}
      <section id="sources" className="space-y-6 pt-6 border-t border-slate-200 scroll-mt-28">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-mono">
            Verified Links & Archives
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Official GATE 2027 Sources</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Official Primary Sources
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <a
                  href="https://gate2027.iitm.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 font-semibold text-teal-800"
                >
                  <span>GATE 2027 Official Portal (IIT Madras)</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://gate2027.iitm.ac.in/notifications"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 font-medium text-slate-800"
                >
                  <span>Official GATE 2027 Notifications Feed</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://gate2027.iitm.ac.in/exam_papers_and_syllabus"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 font-medium text-slate-800"
                >
                  <span>Official GATE 2027 Paper Syllabus Documents</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-3 shadow-xs">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Additional Curated Learning Portals
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              <li>
                <a
                  href="https://nptel.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 font-medium text-slate-800"
                >
                  <span>NPTEL Engineering Video Lecture Series</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://ocw.mit.edu/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 font-medium text-slate-800"
                >
                  <span>MIT OpenCourseWare (Engineering & CS)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SyncPilot Integration in Light Theme */}
      <section className="pt-4 border-t border-slate-200">
        <GateSyncPilotHelper topicName={`GATE ${paper.code}`} paperCode={paper.code} />
      </section>
    </div>
  );
}
