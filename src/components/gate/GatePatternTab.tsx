import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  ShieldCheck,
  Award,
  GraduationCap,
  Briefcase,
  Globe,
} from 'lucide-react';
import { GatePaperInfo } from '@/lib/gate/gateTypes';

interface GatePatternTabProps {
  paper: GatePaperInfo;
  onExploreSyllabus: () => void;
}

export default function GatePatternTab({ paper, onExploreSyllabus }: GatePatternTabProps) {
  return (
    <div className="space-y-10 text-slate-800 font-sans">
      {/* 1. Header & Verification Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-teal-700 uppercase tracking-wider">
            <span className="h-2 w-2 rounded-full bg-teal-600" />
            <span>Official Examination Design & Scoring Structure</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            GATE 2027 Exam Pattern & Marking Rules
          </h1>
          <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Standardized test design, question formats, negative marking penalties, and candidate eligibility rules set by the GATE 2027 Organizing Committee (IIT Madras).
          </p>
        </div>

        <a
          href="https://gate2027.iitm.ac.in/question_paper_pattern"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shrink-0 self-start sm:self-auto shadow-xs"
        >
          <span>Official Pattern Guide ↗</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-300" />
        </a>
      </div>

      {/* 2. Three Structural Pillars */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              01 • Mode & Duration
            </span>
            <FileText className="h-4 w-4 text-teal-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Computer Based Test (CBT)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            180 minutes (3 hours) total duration in single continuous session. Administered online at authorized test centers nationwide in English medium.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Scratch pads provided; virtual scientific calculator on screen.
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              02 • Weightage Distribution
            </span>
            <Award className="h-4 w-4 text-teal-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">65 Questions • 100 Marks</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            General Aptitude (GA) accounts for 15% (15 marks, 10 questions). Subject Specific Discipline covers 85% (85 marks, 55 questions).
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Applicable across all 30 standard engineering & science papers.
          </div>
        </div>

        <div className="bg-white border border-slate-200/90 p-5 rounded-2xl space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider font-mono bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              03 • Question Types
            </span>
            <ShieldCheck className="h-4 w-4 text-teal-700" />
          </div>
          <h3 className="text-base font-bold text-slate-900">MCQ • MSQ • NAT</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mix of 1-mark and 2-mark questions assessing recall, comprehension, application, and analytical synthesis across undergraduate syllabus.
          </p>
          <div className="pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
            Different negative marking rules apply per question type.
          </div>
        </div>
      </div>

      {/* 3. Detailed Question Format & Negative Marking Matrix */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs space-y-0">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-800 font-mono">
            Scoring Rules & Negative Marking Matrix
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            Source: Official GATE 2027 Brochure
          </span>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* MCQ */}
          <div className="space-y-3 pt-2 md:pt-0">
            <div className="flex items-center justify-between">
              <span className="inline-flex px-2.5 py-1 rounded-lg bg-blue-100 text-blue-900 text-xs font-bold font-mono">
                MCQ (Multiple Choice)
              </span>
              <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Negative Marking
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Objective questions with 4 choices. Exactly one choice is correct.
            </p>
            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1.5 text-xs text-rose-900 font-mono">
              <div className="font-bold">Penalty Deductions:</div>
              <div className="text-[11px] leading-relaxed">
                • 1-mark question: <strong>1/3 mark deducted</strong> for wrong answer
              </div>
              <div className="text-[11px] leading-relaxed">
                • 2-mark question: <strong>2/3 mark deducted</strong> for wrong answer
              </div>
              <div className="text-[11px] text-slate-600 pt-1">
                Zero deduction for unattempted questions.
              </div>
            </div>
          </div>

          {/* MSQ */}
          <div className="space-y-3 pt-5 md:pt-0 md:pl-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex px-2.5 py-1 rounded-lg bg-teal-100 text-teal-900 text-xs font-bold font-mono">
                MSQ (Multiple Select)
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                No Negative
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              One or more correct choices out of 4 options. Candidates must identify all correct choices.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 text-xs text-emerald-900 font-mono">
              <div className="font-bold">Scoring Policy:</div>
              <div className="text-[11px] leading-relaxed">
                • Full marks awarded only if <strong>all correct choices</strong> are selected.
              </div>
              <div className="text-[11px] leading-relaxed">
                • <strong>No partial credit</strong> for incomplete selection.
              </div>
              <div className="text-[11px] text-emerald-800 font-bold pt-1">
                Zero negative marking for incorrect choices.
              </div>
            </div>
          </div>

          {/* NAT */}
          <div className="space-y-3 pt-5 md:pt-0 md:pl-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 text-xs font-bold font-mono">
                NAT (Numerical Answer)
              </span>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                No Negative
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              No choices displayed. The answer is a signed real number entered via on-screen virtual keypad.
            </p>
            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5 text-xs text-indigo-900 font-mono">
              <div className="font-bold">Numerical Rules:</div>
              <div className="text-[11px] leading-relaxed">
                • Answers are evaluated within specified tolerance intervals.
              </div>
              <div className="text-[11px] leading-relaxed">
                • Round off to specified decimal places as instructed in question.
              </div>
              <div className="text-[11px] text-indigo-800 font-bold pt-1">
                Zero negative marking for incorrect numericals.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Eligibility & Pathways */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Eligibility Criteria */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <GraduationCap className="h-5 w-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-base">Candidate Eligibility Rules</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">Academic Standing:</strong> Candidates currently studying in the <strong>3rd year or higher</strong> of any undergraduate degree program (B.E., B.Tech, B.Sc, B.Arch, MCA, M.Sc) are fully eligible.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">Completed Degrees:</strong> Graduates who have completed any government-approved degree in Engineering, Technology, Architecture, Science, Commerce, Arts, or Humanities.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">Age Limit:</strong> There is <strong>no upper age limit</strong> to appear for the GATE examination.
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs text-slate-700 flex items-start gap-2">
            <Info className="h-4 w-4 text-teal-700 shrink-0 mt-0.5" />
            <span>
              Candidates can appear in <strong>1 or 2 test papers</strong> from the permitted 2-paper combination table specified by the organizing institute.
            </span>
          </div>
        </div>

        {/* Opportunities Unlocked */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase className="h-5 w-5 text-teal-700" />
            <h3 className="font-bold text-slate-900 text-base">Opportunities Unlocked</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">Postgraduate Admissions:</strong> M.Tech, M.E., M.Des, and Ph.D. admissions at IISc Bangalore, IITs, NITs, and IIITs via COAP and CCMT.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">PSU Recruitment:</strong> Direct shortlisting for Group-A Executive positions at leading Public Sector Undertakings (IOCL, ONGC, NTPC, BHEL, HPCL, BARC, PowerGrid).
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">Financial Assistance:</strong> Monthly AICTE/MHRD stipend (₹12,400/month for M.Tech candidates) during postgraduate tenure.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900">Global Recognition:</strong> GATE scores are accepted for graduate admissions by select overseas universities (NUS, NTU Singapore, TU Munich).
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200/80 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Factual Note:</strong> Qualifying GATE satisfies baseline eligibility. Institutes and PSUs conduct independent counseling and interview selection rounds.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
