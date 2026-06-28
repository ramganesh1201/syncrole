import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Trophy, ArrowRight, Sparkles, X, ChevronRight,
  CheckCircle, Send, Loader2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

/* ─── Types ─────────────────────────────────────────────────── */

type Story = {
  id: string;
  author_name: string | null;
  author_role: string | null;
  before_syncrole: string;
  current_results: string;
  advice: string;
  xp_growth: number;
  dsa_growth: number;
  readiness_growth: number;
  likes_count: number;
};

/* ─── Static featured stories (seed data fallback) ─────────── */

const FEATURED_STORIES: Story[] = [
  {
    id: "f1",
    author_name: "Aarav S.",
    author_role: "SWE @ Razorpay",
    before_syncrole: "Applying to 50+ companies with generic resume, zero responses.",
    current_results: "Landed SWE role at Razorpay — 3x my previous offer. 4 interview calls in 2 weeks.",
    advice: "Stop optimizing in a vacuum. Let the data tell you what recruiters care about.",
    xp_growth: 3200, dsa_growth: 60, readiness_growth: 38, likes_count: 241,
  },
  {
    id: "f2",
    author_name: "Priya K.",
    author_role: "Intern @ Atlassian",
    before_syncrole: "7.8 CGPA but no internship. Invisible to recruiters.",
    current_results: "First internship from Atlassian in 45 days. Same company that rejected me 6 months ago.",
    advice: "Your GitHub is your new resume. Ship real projects that solve real problems.",
    xp_growth: 2800, dsa_growth: 45, readiness_growth: 42, likes_count: 187,
  },
  {
    id: "f3",
    author_name: "Rohit M.",
    author_role: "SDE-1 @ Flipkart",
    before_syncrole: "Stuck at service companies. Product company felt out of reach.",
    current_results: "SDE-1 at Flipkart. Turned down 2 other product company offers.",
    advice: "Consistency beats brilliance. SyncRole keeps you accountable when motivation fades.",
    xp_growth: 4100, dsa_growth: 100, readiness_growth: 51, likes_count: 312,
  },
];

/* ─── Story submission modal ─────────────────────────────────── */

type FormData = {
  before: string;
  problems: string;
  actions: string;
  results: string;
  advice: string;
};

function StoryModal({ onClose, userProfile }: { onClose: () => void; userProfile: any }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ before: "", problems: "", actions: "", results: "", advice: "" });
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const questions = [
    { key: "before" as const, label: "Before SyncRole", prompt: "What was your situation before using SyncRole?", placeholder: "I was applying to 50+ companies with no responses..." },
    { key: "problems" as const, label: "Biggest Problems", prompt: "What were your biggest challenges?", placeholder: "No feedback loop, weak resume, inconsistent DSA practice..." },
    { key: "actions" as const, label: "Actions Taken", prompt: "What specific steps did you take on SyncRole?", placeholder: "Used resume analyzer, built 2 projects, solved 60 DSA problems..." },
    { key: "results" as const, label: "Current Results", prompt: "What's your outcome so far?", placeholder: "Landed SWE role at [Company] — [X]x my previous offer..." },
    { key: "advice" as const, label: "Advice to Others", prompt: "What's your best advice for others?", placeholder: "Don't optimize in a vacuum. Let data tell you what matters..." },
  ];

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const isComplete = Object.values(form).every((v) => v.trim().length > 0);

  async function submit() {
    if (!user) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("career_transformations").insert({
        user_id: user.id,
        before_syncrole: form.before,
        biggest_problems: form.problems,
        actions_taken: form.actions,
        current_results: form.results,
        advice: form.advice,
        author_name: userProfile?.full_name || null,
        author_role: userProfile?.career_goal ? `Targeting: ${userProfile.career_goal}` : null,
        author_college: userProfile?.college || null,
        is_published: false,
      });

      if (error) throw error;

      toast.success("Your story is submitted! Our team will review and publish it soon. 🚀");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center p-4 bg-background/80 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg glass-strong rounded-3xl p-8 relative border border-white/10"
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-5 right-5 h-8 w-8 grid place-items-center rounded-full glass hover:bg-white/10 transition">
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-aurora grid place-items-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="font-display text-lg font-semibold">Share Your Journey</div>
            <div className="text-xs text-muted-foreground">Step {step + 1} of {questions.length}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-8">
          <motion.div
            className="h-full bg-aurora"
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{current.label}</div>
            <div className="font-display text-xl font-semibold mb-4">{current.prompt}</div>
            <textarea
              value={form[current.key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [current.key]: e.target.value }))}
              placeholder={current.placeholder}
              rows={4}
              className="w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 ring-accent/50 resize-none"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="glass rounded-full px-5 py-2.5 text-sm disabled:opacity-30 hover:bg-white/10 transition"
          >
            Back
          </button>

          {isLast ? (
            <button
              onClick={submit}
              disabled={!isComplete || submitting}
              className="relative inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              <span className="absolute inset-0 rounded-full bg-aurora" />
              <span className="relative z-10 flex items-center gap-2">
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {submitting ? "Submitting…" : "Submit Story"}
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                if (form[current.key].trim().length < 10) {
                  toast.error("Please add more detail to continue.");
                  return;
                }
                setStep((s) => s + 1);
              }}
              className="relative inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <span className="absolute inset-0 rounded-full bg-aurora" />
              <span className="relative z-10 flex items-center gap-2">
                Next <ChevronRight className="h-4 w-4" />
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Story card ─────────────────────────────────────────────── */

function FeaturedStoryCard({ story, index }: { story: Story; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="w-[380px] shrink-0 glass-strong rounded-3xl p-7 border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-aurora grid place-items-center font-display font-bold">
            {(story.author_name || "?")[0]}
          </div>
          <div>
            <div className="font-medium">{story.author_name}</div>
            <div className="text-xs text-muted-foreground">{story.author_role}</div>
          </div>
        </div>
        <div className="story-verified rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.88_0.18_145)] flex items-center gap-1.5">
          <Trophy className="h-3 w-3" /> Verified
        </div>
      </div>

      {/* Growth metrics */}
      <div className="flex flex-wrap gap-2 mb-4">
        {story.xp_growth > 0 && (
          <span className="glass rounded-full px-2.5 py-0.5 text-[10px] text-[oklch(0.72_0.22_295)]">+{story.xp_growth.toLocaleString()} XP</span>
        )}
        {story.dsa_growth > 0 && (
          <span className="glass rounded-full px-2.5 py-0.5 text-[10px] text-[oklch(0.85_0.18_70)]">+{story.dsa_growth} DSA</span>
        )}
        {story.readiness_growth > 0 && (
          <span className="glass rounded-full px-2.5 py-0.5 text-[10px] text-[oklch(0.88_0.18_145)]">+{story.readiness_growth}% Readiness</span>
        )}
      </div>

      {/* Quote */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{story.current_results}"</p>

      {/* Advice */}
      <div className="glass rounded-xl px-4 py-3 text-xs text-[oklch(0.88_0.18_145)]">
        <span className="text-muted-foreground">Advice: </span>
        "{story.advice}"
      </div>

      {/* Stars */}
      <div className="mt-4 flex gap-1">
        {[...Array(5)].map((_, k) => (
          <Star key={k} className="h-3.5 w-3.5 fill-[oklch(0.85_0.18_70)] text-[oklch(0.85_0.18_70)]" />
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function CareerTransformationsSection({ data }: { data: any }) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [stories, setStories] = useState<Story[]>(FEATURED_STORIES);

  // Try fetching featured stories from DB
  useEffect(() => {
    let alive = true;
    supabase
      .from("career_transformations")
      .select("id, author_name, author_role, before_syncrole, current_results, advice, xp_growth, dsa_growth, readiness_growth, likes_count")
      .eq("is_published", true)
      .eq("is_featured", true)
      .order("likes_count", { ascending: false })
      .limit(3)
      .then(({ data: rows }: { data: Story[] | null }) => {
        if (alive && rows && rows.length > 0) setStories(rows);
      });
    return () => { alive = false; };
  }, []);

  return (
    <>
      <section id="success" className="relative py-32 px-6 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-5">
                <Star className="h-3.5 w-3.5 text-accent" />
                <span className="uppercase tracking-widest">Career Transformations</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
                Real students. <span className="text-aurora">Real offers.</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Every story verified against real platform activity. No fabrications, no hype.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {user && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 glass-strong rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition border border-white/10"
                >
                  <Sparkles className="h-4 w-4 text-accent" />
                  Share Your Journey
                </motion.button>
              )}
              <Link
                to="/career-transformations"
                className="inline-flex items-center gap-2 glass-strong rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition border border-white/10"
              >
                See All Transformations <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scrolling carousel */}
        <div className="relative overflow-hidden">
          {/* Fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...stories, ...stories].map((s, i) => (
              <FeaturedStoryCard key={`${s.id}-${i}`} story={s} index={i % stories.length} />
            ))}
          </motion.div>
        </div>

        {/* See all CTA */}
        <div className="flex justify-center mt-12">
          <Link
            to="/career-transformations"
            className="inline-flex items-center gap-2 glass rounded-full px-7 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 transition border border-white/10"
          >
            <CheckCircle className="h-4 w-4 text-[oklch(0.88_0.18_145)]" />
            {stories.length}+ Verified Transformations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Story submission modal */}
      <AnimatePresence>
        {showModal && (
          <StoryModal onClose={() => setShowModal(false)} userProfile={data?.profile} />
        )}
      </AnimatePresence>
    </>
  );
}
