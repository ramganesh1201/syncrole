import { Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen, Calendar, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function CurrentlyRelevantGateSection() {
  return (
    <section className="relative py-12 px-4 md:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="relative rounded-3xl glass border border-white/10 p-6 md:p-10 overflow-hidden group hover:border-white/20 transition-all duration-300 shadow-soft">
          {/* Subtle background accent glow */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              {/* Contextual Badge */}
              <div className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Currently Relevant — Academic Opportunity</span>
              </div>

              {/* Section Header */}
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                GATE 2027 Discovery Hub
              </h2>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Preparing for GATE or just getting started? Understand the examination structure, explore the syllabus, access verified dates, and discover curated preparation resources — organized in one place.
              </p>

              {/* Supporting Highlights */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Official Information
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-accent" /> Syllabus Explorer
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" /> Contextual Resources
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" /> Updates & Timeline
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex-none pt-2 md:pt-0">
              <Link
                to="/gate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent/20 hover:bg-accent/30 text-accent font-semibold px-6 py-3.5 text-sm transition-all duration-200 border border-accent/40 hover:border-accent/60 shadow-glow cursor-pointer group-hover:translate-x-0.5"
              >
                <span>Explore GATE</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
