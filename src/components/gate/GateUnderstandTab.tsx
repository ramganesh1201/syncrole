import { GatePaperInfo } from '@/lib/gate/gateTypes';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  GraduationCap,
  HelpCircle,
  Layers,
  MapPin,
  ShieldCheck,
  Target,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';

interface GateUnderstandTabProps {
  paper: GatePaperInfo;
  onExploreSyllabus: () => void;
}

export default function GateUnderstandTab({ paper, onExploreSyllabus }: GateUnderstandTabProps) {
  const [activeAccordion, setActiveAccordion] = useState<string>('what_is_gate');

  const faqs = [
    {
      id: 'what_is_gate',
      question: 'What is GATE?',
      answer:
        'The Graduate Aptitude Test in Engineering (GATE) is a national-level examination conducted jointly by the Indian Institute of Science (IISc) and seven Indian Institutes of Technology (IIT Bombay, IIT Delhi, IIT Guwahati, IIT Kanpur, IIT Kharagpur, IIT Madras, IIT Roorkee) on behalf of the National Coordination Board (NCB) - GATE.',
    },
    {
      id: 'who_can_apply',
      question: 'Who is eligible to take GATE?',
      answer:
        'Candidates currently studying in the 3rd year or higher of any undergraduate degree program (B.E. / B.Tech / B.Sc / B.Arch / MCA / M.Sc) or who have already completed any government-approved degree in Engineering, Technology, Architecture, Science, Commerce, or Arts are eligible to appear for GATE. There is no age limit.',
    },
    {
      id: 'purpose_gate',
      question: 'What is the purpose of GATE?',
      answer:
        'GATE scores are utilized for: 1) Admission to M.Tech / M.E. / Ph.D. programs at IISc, IITs, NITs, and premier institutes; 2) Recruitment to Public Sector Undertakings (PSUs) such as IOCL, ONGC, NTPC, BHEL, HPCL, and BARC; 3) Financial assistance/stipend (MHRD/AICTE) during post-graduation; 4) Admissions to selected foreign universities (e.g. NUS, NTU Singapore, TU Munich).',
    },
    {
      id: 'exam_pattern',
      question: 'How is the examination structured?',
      answer:
        'GATE is a 3-hour Computer Based Test (CBT) consisting of 65 questions totaling 100 marks. The paper comprises General Aptitude (15 marks) and Subject Specific Questions (85 marks). Questions are of three types: Multiple Choice Questions (MCQs with negative marking), Multiple Select Questions (MSQs with no negative marking), and Numerical Answer Type (NAT with no negative marking).',
    },
  ];

  const steps = [
    {
      step: 'Step 1',
      title: 'Understand the Exam Structure',
      desc: 'Familiarize yourself with the 3-hour duration, marking scheme, MCQ/MSQ/NAT rules, and negative marking penalties.',
    },
    {
      step: 'Step 2',
      title: 'Choose Your Paper & Inspect Syllabus',
      desc: 'Select your primary paper (e.g. GATE CSE) and optionally a secondary paper (e.g. GATE DA). Review subject-wise weightages.',
    },
    {
      step: 'Step 3',
      title: 'Focus on High-Weightage Core Subjects',
      desc: 'Start with foundational subjects like Data Structures, Algorithms, Operating Systems, and General Aptitude.',
    },
    {
      step: 'Step 4',
      title: 'Learn Topics with 1–3 Curated Resources',
      desc: 'Study each topic using 1–3 curated learning materials (NPTEL lectures, standard author chapters, or concise notes).',
    },
    {
      step: 'Step 5',
      title: 'Practice Previous Year Questions (PYQs)',
      desc: 'Solve authentic GATE CSE PYQs (2010–2024) for every completed topic to master question patterns and time management.',
    },
    {
      step: 'Step 6',
      title: 'Review Weak Areas & Continue',
      desc: 'Analyze mistake logs, re-test concepts on NAT calculations, and maintain a calm, consistent study rhythm.',
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* HEADER SECTION */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Understand GATE</span>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-foreground">
          What is GATE & How to Begin
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-3xl leading-relaxed">
          A clear, beginner-friendly guide to understanding the Graduate Aptitude Test in Engineering before diving into syllabus topics and study resources.
        </p>
      </section>

      {/* FREQUENTLY ASKED ESSENTIAL QUESTIONS (ACCORDION) */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-accent" />
          <span>Essential GATE Questions Explained</span>
        </h2>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = activeAccordion === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl glass border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setActiveAccordion(isOpen ? '' : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-base text-foreground hover:text-accent transition"
                >
                  <span>{faq.question}</span>
                  <ChevronRight
                    className={`h-5 w-5 text-accent transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6-STEP "WHERE SHOULD I START?" GUIDED ROADMAP */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
            <Target className="h-5 w-5 text-accent" />
            <span>Where Should I Start? — 6-Step Preparation Roadmap</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            A simple, non-overwhelming step-by-step path designed to build confidence and focus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="rounded-2xl glass border border-white/10 p-5 space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-accent">
                  {item.step}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">0{idx + 1} / 06</span>
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Action CTA to Syllabus */}
        <div className="pt-2 text-center">
          <button
            onClick={onExploreSyllabus}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent/20 hover:bg-accent/30 text-accent font-semibold px-6 py-3 text-sm transition-all border border-accent/40 shadow-glow"
          >
            <span>Proceed to GATE {paper.code} Syllabus & Resources</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
