import { GatePaperInfo } from '@/lib/gate/gateTypes';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
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
      question: 'What exactly is GATE?',
      answer:
        'The Graduate Aptitude Test in Engineering (GATE) is a national-level examination conducted jointly by the Indian Institute of Science (IISc) and seven Indian Institutes of Technology (IIT Bombay, IIT Delhi, IIT Guwahati, IIT Kanpur, IIT Kharagpur, IIT Madras, IIT Roorkee) on behalf of the National Coordination Board (NCB) - GATE.',
      takeaway: 'GATE tests deep conceptual understanding over rote memorization.',
    },
    {
      id: 'who_can_apply',
      question: 'Who is eligible to take GATE?',
      answer:
        'Candidates currently studying in the 3rd year or higher of any undergraduate degree program (B.E. / B.Tech / B.Sc / B.Arch / MCA / M.Sc) or who have already completed any government-approved degree in Engineering, Technology, Architecture, Science, Commerce, or Arts are eligible to appear for GATE. There is no upper age limit.',
      takeaway: '3rd year and final year students are fully eligible.',
    },
    {
      id: 'purpose_gate',
      question: 'What opportunities open after GATE?',
      answer:
        'GATE scores are utilized for: 1) Admission to M.Tech / M.E. / Ph.D. programs at IISc, IITs, NITs, and premier institutes; 2) Recruitment to Public Sector Undertakings (PSUs) such as IOCL, ONGC, NTPC, BHEL, HPCL, and BARC; 3) Financial assistance/stipend (MHRD/AICTE) during post-graduation; 4) Admissions to selected foreign universities (e.g. NUS, NTU Singapore, TU Munich).',
      takeaway: 'GATE opens pathways for higher studies, PSU recruitment, and global research.',
    },
    {
      id: 'exam_pattern',
      question: 'How is the examination structured & marked?',
      answer:
        'GATE is a 3-hour Computer Based Test (CBT) consisting of 65 questions totaling 100 marks. The paper comprises General Aptitude (15 marks) and Subject Specific Questions (85 marks). Questions are of three types: Multiple Choice Questions (MCQs with negative marking), Multiple Select Questions (MSQs with no negative marking), and Numerical Answer Type (NAT with no negative marking).',
      takeaway: 'MCQs penalize wrong answers (-1/3 or -2/3), while MSQs and NAT have zero negative marking.',
    },
  ];

  const pathways = [
    {
      title: 'Higher Studies (M.Tech / Ph.D.)',
      subtitle: 'IISc, IITs, NITs & IIITs',
      desc: 'Pursue specialized post-graduation in AI, Data Science, Systems, VLSI, or Thermal Engineering with monthly MHRD stipends.',
    },
    {
      title: 'PSU Recruitment',
      subtitle: 'Group-A Officer Roles',
      desc: 'Direct recruitment into major Indian PSUs (IOCL, ONGC, NTPC, BHEL, HPCL, PowerGrid, BARC) based directly on GATE score.',
    },
    {
      title: 'Global Universities & Research',
      subtitle: 'NUS, NTU, TU Munich & RWTH Aachen',
      desc: 'GATE scores are recognized by leading Asian and European universities for Master of Science programs.',
    },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* 1. EDITORIAL HEADER */}
      <section className="space-y-4 pt-4">
        {/* Micro label */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>UNDERSTAND GATE • GUIDED EXPLANATION</span>
        </div>

        {/* Confident Heading */}
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl leading-tight">
          Before you prepare, understand what you're preparing for.
        </h1>

        {/* Short Reading Paragraph */}
        <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
          A clear, structured breakdown of the examination purpose, eligibility, paper selection rules, and fundamental preparation guidelines.
        </p>

        {/* Emphasized Statement Callout */}
        <div className="border-l-2 border-accent pl-5 py-3 bg-white/[0.02]">
          <p className="font-display text-sm md:text-base italic text-slate-200 font-medium">
            "GATE is not just a syllabus to finish. It is a problem-solving exam where fundamentals compound."
          </p>
        </div>
      </section>

      {/* 2. FACTUAL PATHWAYS (WHAT OPPORTUNITIES GATE UNLOCKS) */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            CAREER PATHWAYS
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            What Opportunities Does GATE Unlock?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {pathways.map((p) => (
            <div key={p.title} className="border border-white/10 bg-white/[0.02] p-6 rounded-2xl space-y-2">
              <div className="text-xs font-mono text-accent font-semibold">{p.subtitle}</div>
              <div className="font-display text-base font-bold text-foreground">{p.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ESSENTIAL QUESTIONS (ACCORDION WITH KEY TAKEAWAYS) */}
      <section className="space-y-6 pt-4 border-t border-white/10">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            FACTUAL FOUNDATIONS
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Essential Questions Answered
          </h2>
        </div>

        <div className="space-y-3 font-sans">
          {faqs.map((faq) => {
            const isOpen = activeAccordion === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-white/10 bg-white/[0.02] rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setActiveAccordion(isOpen ? '' : faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-base text-foreground hover:text-accent transition"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-accent transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-slate-300 leading-relaxed space-y-3 border-t border-white/5 pt-4">
                    <p>{faq.answer}</p>
                    <div className="border-l border-emerald-400/50 pl-3 py-1 text-emerald-300 font-mono text-xs">
                      <strong>Key Takeaway:</strong> {faq.takeaway}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ACTION CTA TO SYLLABUS */}
      <section className="pt-4 border-t border-white/10 text-center space-y-4">
        <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
          Ready to explore what to study first?
        </p>
        <div>
          <button
            onClick={onExploreSyllabus}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-accent/40 bg-accent/20 hover:bg-accent/30 text-accent font-semibold px-6 py-3 text-sm transition shadow-glow"
          >
            <span>Explore GATE {paper.code} Syllabus & Resources</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
