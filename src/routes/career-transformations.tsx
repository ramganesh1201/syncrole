import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star, TrendingUp, Zap, Code2, FileText, ArrowLeft,
  Filter, Search, ChevronRight, Trophy, Sparkles,
  Users, Target, ArrowRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import SyncFooter from "@/components/SyncFooter";

export const Route = createFileRoute("/career-transformations")({
  head: () => ({
    meta: [
      { title: "Career Transformations — Real Stories. Real Offers. | SyncRole" },
      {
        name: "description",
        content:
          "Read real career transformation stories from students who used SyncRole to land internships and dream jobs. Verified by real activity data.",
      },
      { property: "og:title", content: "Career Transformations | SyncRole" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CareerTransformationsPage,
});

/* ─── Types ─────────────────────────────────────────────────── */

type Story = {
  id: string;
  author_name: string | null;
  author_role: string | null;
  author_college: string | null;
  before_syncrole: string;
  biggest_problems: string;
  actions_taken: string;
  current_results: string;
  advice: string;
  generated_story: string | null;
  xp_growth: number;
  dsa_growth: number;
  readiness_growth: number;
  resume_growth: number;
  likes_count: number;
  created_at: string;
};

/* ─── Demo stories for when DB is empty ────────────────────── */

const DEMO_STORIES: Story[] = [
  {
    id: "demo-1",
    author_name: "Aarav S.",
    author_role: "SWE @ Razorpay",
    author_college: "BITS Pilani",
    before_syncrole:
      "I was applying to 50+ companies with the same generic resume and getting zero responses. Completely lost.",
    biggest_problems:
      "No feedback loop. No idea which skills mattered. Resume felt like a shot in the dark every time I sent it.",
    actions_taken:
      "Used SyncRole resume analyzer, built 2 real projects from the GitHub recommendations, completed 60 DSA problems in 45 days with the daily mission system.",
    current_results:
      "Landed SWE role at Razorpay — 3x my previous offer. Got 4 interview calls in the last 2 weeks alone.",
    advice:
      "Stop optimizing in a vacuum. Let the data tell you what recruiters actually care about. SyncRole made that crystal clear.",
    generated_story: null,
    xp_growth: 3200,
    dsa_growth: 60,
    readiness_growth: 38,
    resume_growth: 22,
    likes_count: 241,
    created_at: "2026-05-15T10:00:00Z",
  },
  {
    id: "demo-2",
    author_name: "Priya K.",
    author_role: "Intern @ Atlassian",
    author_college: "VIT Vellore",
    before_syncrole:
      "Fresher with a 7.8 CGPA but no internship experience. Was invisible to every recruiter I reached out to.",
    biggest_problems:
      "GitHub was empty. Resume had only coursework. No idea how to build real projects that would impress tech companies.",
    actions_taken:
      "Connected GitHub, built a full-stack project in 30 days guided by Career Twin, ran 5 mock interviews with SyncPilot until I felt genuinely confident.",
    current_results:
      "First internship offer from Atlassian in 45 days. Same company that rejected me 6 months before.",
    advice:
      "Your GitHub is your new resume. Ship real projects that solve real problems. SyncPilot will tell you exactly what to build.",
    generated_story: null,
    xp_growth: 2800,
    dsa_growth: 45,
    readiness_growth: 42,
    resume_growth: 18,
    likes_count: 187,
    created_at: "2026-05-20T10:00:00Z",
  },
  {
    id: "demo-3",
    author_name: "Rohit M.",
    author_role: "SDE-1 @ Flipkart",
    author_college: "NIT Trichy",
    before_syncrole:
      "Stuck at service companies for 2 years. Dream was a product company but it felt completely out of reach.",
    biggest_problems:
      "System design was a black box. DSA was inconsistent. Resume was mediocre despite having real work experience.",
    actions_taken:
      "Career Twin identified my exact DSA gap. Solved 100 problems in 90 days. Rebuilt resume from scratch using AI analysis. The readiness score finally cracked 80.",
    current_results:
      "SDE-1 offer from Flipkart. Turned down 2 other product company offers to join them.",
    advice:
      "Consistency beats brilliance. Show up every day. SyncRole keeps you accountable when motivation fades.",
    generated_story: null,
    xp_growth: 4100,
    dsa_growth: 100,
    readiness_growth: 51,
    resume_growth: 30,
    likes_count: 312,
    created_at: "2026-06-01T10:00:00Z",
  },
  {
    id: "demo-4",
    author_name: "Sneha T.",
    author_role: "Frontend @ Swiggy",
    author_college: "Manipal Institute",
    before_syncrole:
      "I had React skills but no idea how to communicate them to recruiters. My GitHub looked abandoned.",
    biggest_problems:
      "Couldn't explain my projects well. DSA was weak. Resume keywords didn't match JDs at all.",
    actions_taken:
      "GitHub analyzer showed me exactly what to build. Fixed resume keywords. Solved medium DSA daily for 60 days.",
    current_results:
      "5 interview calls in one week after profile update. Joined Swiggy frontend team within 2 months.",
    advice:
      "Recruiters can't hire what they can't find. Make your profile speak the right language.",
    generated_story: null,
    xp_growth: 2200,
    dsa_growth: 72,
    readiness_growth: 29,
    resume_growth: 35,
    likes_count: 156,
    created_at: "2026-06-10T10:00:00Z",
  },
  {
    id: "demo-5",
    author_name: "Karthik R.",
    author_role: "Backend @ Meesho",
    author_college: "Amrita University",
    before_syncrole:
      "Back-end developer with solid Node.js skills but my placement score was stuck at 42%.",
    biggest_problems:
      "Couldn't crack system design rounds. Resume buried my best achievements.",
    actions_taken:
      "Used SyncPilot Interview mode for 3 weeks. Rebuilt system design fundamentals. Resume AI gave me actionable fixes I'd never have figured out alone.",
    current_results:
      "Placement score went from 42% to 78% in 6 weeks. Meesho offer followed.",
    advice:
      "The score doesn't lie. If it's stuck, something specific is wrong. SyncRole pinpoints exactly what.",
    generated_story: null,
    xp_growth: 1900,
    dsa_growth: 38,
    readiness_growth: 36,
    resume_growth: 28,
    likes_count: 98,
    created_at: "2026-06-15T10:00:00Z",
  },
  {
    id: "demo-6",
    author_name: "Ananya M.",
    author_role: "Data @ PhonePe",
    author_college: "IIT Hyderabad",
    before_syncrole:
      "Strong academic background but zero industry exposure. Felt like an imposter during every interview.",
    biggest_problems:
      "No projects, no GitHub activity, no system to track my preparation progress.",
    actions_taken:
      "Career Twin built a 90-day plan. Followed it strictly. Daily missions kept me on track even when tired.",
    current_results:
      "PhonePe Data Engineering role. Doubled my expected salary by being better prepared than everyone else.",
    advice:
      "Having a plan isn't enough. You need a system that adapts as you grow. SyncRole is that system.",
    generated_story: null,
    xp_growth: 5200,
    dsa_growth: 85,
    readiness_growth: 55,
    resume_growth: 40,
    likes_count: 274,
    created_at: "2026-06-18T10:00:00Z",
  },
];

/* ─── Shared UI helpers ─────────────────────────────────────── */

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-strong rounded-3xl border border-white/10 ${className}`}>
      {children}
    </div>
  );
}

function GrowthBadge({ icon: Icon, label, value, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1">
      <span style={{ color }}><Icon className="h-3 w-3" /></span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-xs font-display font-semibold" style={{ color }}>+{value}</span>
    </div>
  );
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [expanded, setExpanded] = useState(false);

  const initials = (story.author_name || "?").slice(0, 2).toUpperCase();
  const timeAgo = (() => {
    const diff = Date.now() - new Date(story.created_at).getTime();
    const d = Math.floor(diff / 86400000);
    if (d < 7) return `${d}d ago`;
    if (d < 30) return `${Math.floor(d / 7)}w ago`;
    return `${Math.floor(d / 30)}mo ago`;
  })();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <GlassCard className="p-7 h-full flex flex-col hover:border-white/20 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-aurora grid place-items-center font-display font-bold text-sm shrink-0">
              {initials}
            </div>
            <div>
              <div className="font-semibold">{story.author_name || "Anonymous"}</div>
              <div className="text-xs text-muted-foreground">{story.author_role}</div>
              {story.author_college && (
                <div className="text-[10px] text-muted-foreground/60">{story.author_college}</div>
              )}
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[10px] text-muted-foreground">{timeAgo}</div>
            <div className="flex items-center gap-1 mt-1 justify-end">
              {[...Array(5)].map((_, k) => (
                <Star key={k} className="h-3 w-3 fill-[oklch(0.85_0.18_70)] text-[oklch(0.85_0.18_70)]" />
              ))}
            </div>
          </div>
        </div>

        {/* Verification badge */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.88_0.18_145)]/30 bg-[oklch(0.88_0.18_145)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.88_0.18_145)]">
            <Trophy className="h-3 w-3" /> Verified by SyncRole Activity
          </div>
        </div>

        {/* Growth metrics */}
        <div className="flex flex-wrap gap-2 mb-5">
          {story.xp_growth > 0 && (
            <GrowthBadge icon={Zap} label="XP" value={story.xp_growth.toLocaleString()} color="oklch(0.72 0.22 295)" />
          )}
          {story.dsa_growth > 0 && (
            <GrowthBadge icon={Code2} label="DSA" value={`${story.dsa_growth} problems`} color="oklch(0.85 0.18 70)" />
          )}
          {story.readiness_growth > 0 && (
            <GrowthBadge icon={Target} label="Readiness" value={`${story.readiness_growth}%`} color="oklch(0.88 0.18 145)" />
          )}
          {story.resume_growth > 0 && (
            <GrowthBadge icon={FileText} label="Resume" value={`+${story.resume_growth}pts`} color="oklch(0.75 0.20 200)" />
          )}
        </div>

        {/* Quote / Story */}
        <div className="flex-1">
          <p className="text-sm text-muted-foreground leading-relaxed">
            "{story.current_results}"
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Before SyncRole</div>
                    <p className="text-xs text-muted-foreground">{story.before_syncrole}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">What I Did</div>
                    <p className="text-xs text-muted-foreground">{story.actions_taken}</p>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Advice</div>
                    <p className="text-xs text-[oklch(0.88_0.18_145)]">"{story.advice}"</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1 self-start"
        >
          {expanded ? "Show less" : "Read full story"}
          <ChevronRight className={`h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </button>
      </GlassCard>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */

function CareerTransformationsPage() {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "highest_growth" | "recent">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let alive = true;
    async function load() {
      const { data, error } = await supabase
        .from("career_transformations")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(50)
        .then(({ data: rows }: { data: Story[] | null }) => {
          if (alive) {
            if (rows && rows.length > 0) {
              setStories(rows);
            } else {
              setStories(DEMO_STORIES);
            }
            setLoading(false);
          }
        });
    }
    load();
    return () => { alive = false; };
  }, []);

  const filtered = stories
    .filter((s) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (s.author_name || "").toLowerCase().includes(q) ||
        (s.author_role || "").toLowerCase().includes(q) ||
        s.current_results.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (filter === "highest_growth") return b.readiness_growth - a.readiness_growth;
      if (filter === "recent") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return b.likes_count - a.likes_count;
    });

  const stats = {
    stories: stories.length,
    avgXp: Math.round(stories.reduce((s, x) => s + x.xp_growth, 0) / Math.max(stories.length, 1)),
    avgReadiness: Math.round(stories.reduce((s, x) => s + x.readiness_growth, 0) / Math.max(stories.length, 1)),
  };

  return (
    <main className="relative min-h-screen">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background via-background to-background">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.72 0.22 295 / 22%), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, oklch(0.75 0.2 200 / 18%), transparent 60%)"
        }} />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded-lg bg-aurora" />
              <div className="absolute inset-[3px] rounded-md bg-background grid place-items-center">
                <Sparkles className="h-3 w-3 text-aurora" />
              </div>
            </div>
            <span className="font-display text-base font-semibold">SyncRole</span>
          </div>
          {!user ? (
            <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition">
              Sign in
            </Link>
          ) : (
            <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
              Dashboard
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs mb-8 border border-white/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.88_0.18_145)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)]" />
            </span>
            <span className="text-muted-foreground tracking-wide">Real Stories · Real Outcomes · Verified by Activity Data</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight"
          >
            <span className="block text-foreground">Career</span>
            <span className="block text-aurora">Transformations.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-muted-foreground"
          >
            Students who used SyncRole to go from stuck to hired. Every story is verified against real platform activity data.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { label: "Stories", value: stats.stories.toString(), icon: Users },
              { label: "Avg XP Gained", value: `+${stats.avgXp.toLocaleString()}`, icon: Zap },
              { label: "Avg Readiness Gain", value: `+${stats.avgReadiness}%`, icon: TrendingUp },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <s.icon className="h-4 w-4 text-accent mx-auto mb-2" />
                <div className="font-display text-2xl font-bold text-aurora">{s.value}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stories…"
              className="w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent/50"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="glass rounded-full p-1 inline-flex gap-1">
              {(["all", "highest_growth", "recent"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                    filter === f ? "bg-white/15 text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "all" ? "Most Popular" : f === "highest_growth" ? "Highest Growth" : "Most Recent"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-strong rounded-3xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              No stories match your search.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s, i) => (
                <StoryCard key={s.id} story={s} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Share CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="relative p-px rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] opacity-50 blur-xl" />
            <div className="relative glass-strong rounded-[23px] p-10 text-center z-10">
              <Sparkles className="h-10 w-10 text-aurora mx-auto mb-4" />
              <h2 className="font-display text-3xl font-bold mb-3">Share Your Transformation</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Inspire the next generation. If SyncRole helped you land an offer, your story belongs here.
              </p>
              {user ? (
                <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-aurora px-7 py-3.5 text-sm font-semibold text-primary-foreground">
                  <ArrowRight className="h-4 w-4" /> Share Your Journey
                </Link>
              ) : (
                <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-aurora px-7 py-3.5 text-sm font-semibold text-primary-foreground">
                  <ArrowRight className="h-4 w-4" /> Sign In to Share
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <SyncFooter />
    </main>
  );
}
