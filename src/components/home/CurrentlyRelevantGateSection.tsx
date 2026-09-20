import { Link } from '@tanstack/react-router';
import { ArrowRight, Compass } from 'lucide-react';

export default function CurrentlyRelevantGateSection() {
  return (
    <section className="relative py-12 px-4 md:px-6">
      <div className="mx-auto max-w-5xl border-y border-white/10 py-10 my-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            {/* Micro label */}
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Currently Relevant Opportunities</span>
            </div>

            {/* Confident Heading */}
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              GATE 2027 Discovery Hub
            </h2>

            {/* Concise Editorial Summary */}
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl font-sans">
              A clearer way to understand the exam structure, explore the official syllabus, and find contextual preparation resources — organized around what you need to learn next.
            </p>

            {/* Supporting Micro Metadata */}
            <div className="pt-2 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground font-mono">
              <span>Official Info</span>
              <span className="text-slate-700">•</span>
              <span>Syllabus Explorer</span>
              <span className="text-slate-700">•</span>
              <span>Curated Materials</span>
              <span className="text-slate-700">•</span>
              <span>Verified Updates</span>
            </div>
          </div>

          {/* Clean Editorial CTA */}
          <div className="flex-none pt-2 md:pt-0">
            <Link
              to="/gate"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-accent/20 hover:border-accent/40 text-foreground hover:text-accent font-semibold px-6 py-3 text-sm transition-all duration-200 group"
            >
              <span>Explore GATE</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
