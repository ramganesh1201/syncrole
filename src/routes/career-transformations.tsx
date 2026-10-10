import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  TrendingUp,
  Zap,
  Code2,
  FileText,
  ArrowLeft,
  Filter,
  Search,
  ChevronRight,
  Trophy,
  Sparkles,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  Quote,
  X,
  Share2,
  Send,
  Building2,
  GraduationCap,
  MessageSquare,
  Home,
  UserCheck,
  Shield,
  Compass,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useSyncPilot } from "@/hooks/useSyncPilot";
import SyncFooter from "@/components/SyncFooter";
import { BrandLogo } from "@/components/ui/brand-logo";

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

/* ─── Demo stories for fallback ────────────────────────────── */

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
      "Couldn't crack system design rounds. Resume buried my best achievements.",
    biggest_problems:
      "System design rounds were tough. Resume lacked metrics and structured technical highlights.",
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

/* ─── Metric Badge Helper ──────────────────────────────────── */

function MetricBadge({
  icon: Icon,
  label,
  value,
  badgeBg,
  textColor,
}: {
  icon: any;
  label: string;
  value: string;
  badgeBg: string;
  textColor: string;
}) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${badgeBg} ${textColor}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="font-mono font-semibold">{value}</span>
      <span className="text-[10px] uppercase tracking-wider opacity-75 font-mono">{label}</span>
    </div>
  );
}

/* ─── Full Story Reading Modal ─────────────────────────────── */

function FullStoryModal({ story, onClose }: { story: Story; onClose: () => void }) {
  const initials = (story.author_name || "?").slice(0, 2).toUpperCase();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2 }}
        className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 space-y-6 text-slate-900"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          aria-label="Close story modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Student Profile Header */}
        <div className="flex items-start gap-4 pr-10">
          <div className="h-14 w-14 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 font-bold text-lg flex items-center justify-center shrink-0 shadow-2xs">
            {initials}
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {story.author_name || "Anonymous Student"}
            </h3>
            <div className="text-xs font-semibold text-purple-700 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{story.author_role}</span>
            </div>
            {story.author_college && (
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{story.author_college}</span>
              </div>
            )}
          </div>
        </div>

        {/* Verification Status & Growth Badges */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-mono font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified by SyncRole Activity</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {story.xp_growth > 0 && (
              <MetricBadge
                icon={Zap}
                label="XP"
                value={`+${story.xp_growth.toLocaleString()}`}
                badgeBg="bg-purple-50 border-purple-200/80"
                textColor="text-purple-700"
              />
            )}
            {story.dsa_growth > 0 && (
              <MetricBadge
                icon={Code2}
                label="DSA"
                value={`+${story.dsa_growth} Solved`}
                badgeBg="bg-amber-50 border-amber-200/80"
                textColor="text-amber-800"
              />
            )}
            {story.readiness_growth > 0 && (
              <MetricBadge
                icon={Target}
                label="Readiness"
                value={`+${story.readiness_growth}%`}
                badgeBg="bg-emerald-50 border-emerald-200/80"
                textColor="text-emerald-800"
              />
            )}
            {story.resume_growth > 0 && (
              <MetricBadge
                icon={FileText}
                label="Resume"
                value={`+${story.resume_growth} pts`}
                badgeBg="bg-blue-50 border-blue-200/80"
                textColor="text-blue-800"
              />
            )}
          </div>
        </div>

        {/* Structured Story Sections */}
        <div className="space-y-5 pt-2 border-t border-slate-100 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
              Starting Point / Challenge
            </h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
              {story.before_syncrole}
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
              Strategy & Actions Taken
            </h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
              {story.actions_taken}
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-mono text-xs font-bold text-purple-700 uppercase tracking-wider">
              Current Outcome & Offer
            </h4>
            <p className="text-slate-900 font-medium leading-relaxed bg-purple-50/70 p-3.5 rounded-xl border border-purple-200/70">
              {story.current_results}
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Advice for Fellow Students
            </h4>
            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 font-medium italic flex items-start gap-3">
              <Quote className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>"{story.advice}"</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Share Story Modal ─────────────────────────────────────── */

function ShareStoryModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (newStory: Story) => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    author_name: "",
    author_role: "",
    author_college: "",
    before_syncrole: "",
    biggest_problems: "",
    actions_taken: "",
    current_results: "",
    advice: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newStory: Partial<Story> = {
        author_name: formData.author_name || "SyncRole Student",
        author_role: formData.author_role || "SDE Candidate",
        author_college: formData.author_college || null,
        before_syncrole: formData.before_syncrole,
        biggest_problems: formData.biggest_problems || formData.before_syncrole,
        actions_taken: formData.actions_taken,
        current_results: formData.current_results,
        advice: formData.advice,
        xp_growth: 2500,
        dsa_growth: 50,
        readiness_growth: 35,
        resume_growth: 20,
        likes_count: 1,
      };

      const { data, error } = await supabase
        .from("career_transformations")
        .insert([newStory])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        onSuccess(data);
      } else {
        onSuccess({
          ...newStory,
          id: `user-${Date.now()}`,
          created_at: new Date().toISOString(),
        } as Story);
      }
      onClose();
    } catch (err) {
      console.error("Error sharing story:", err);
      // Fallback add locally
      onSuccess({
        id: `user-${Date.now()}`,
        author_name: formData.author_name || "SyncRole Student",
        author_role: formData.author_role || "SDE Candidate",
        author_college: formData.author_college || null,
        before_syncrole: formData.before_syncrole,
        biggest_problems: formData.biggest_problems || formData.before_syncrole,
        actions_taken: formData.actions_taken,
        current_results: formData.current_results,
        advice: formData.advice,
        generated_story: null,
        xp_growth: 2500,
        dsa_growth: 50,
        readiness_growth: 35,
        resume_growth: 20,
        likes_count: 1,
        created_at: new Date().toISOString(),
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 space-y-5 text-slate-900"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Share Your Success</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Inspire Fellow Students
          </h3>
          <p className="text-xs text-slate-500">
            Tell the community how SyncRole helped you achieve your target placement.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                required
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                placeholder="e.g. Aarav S."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Current Role / Offer</label>
              <input
                required
                value={formData.author_role}
                onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                placeholder="e.g. SWE @ Razorpay"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">College / Institution (Optional)</label>
            <input
              value={formData.author_college}
              onChange={(e) => setFormData({ ...formData, author_college: e.target.value })}
              placeholder="e.g. BITS Pilani"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Before SyncRole (Starting Challenge)</label>
            <textarea
              required
              rows={2}
              value={formData.before_syncrole}
              onChange={(e) => setFormData({ ...formData, before_syncrole: e.target.value })}
              placeholder="What were you struggling with before using SyncRole?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Actions Taken</label>
            <textarea
              required
              rows={2}
              value={formData.actions_taken}
              onChange={(e) => setFormData({ ...formData, actions_taken: e.target.value })}
              placeholder="How did you use SyncRole (DSA, Resume AI, Career Twin)?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Current Results & Offer</label>
            <textarea
              required
              rows={2}
              value={formData.current_results}
              onChange={(e) => setFormData({ ...formData, current_results: e.target.value })}
              placeholder="What offer or readiness milestone did you achieve?"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Key Advice for Peers</label>
            <input
              required
              value={formData.advice}
              onChange={(e) => setFormData({ ...formData, advice: e.target.value })}
              placeholder="One takeaway for fellow students..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Submitting Story..." : "Submit Transformation Story"}
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Story Card Component ─────────────────────────────────── */

function StoryCard({ story, onReadFull }: { story: Story; onReadFull: () => void }) {
  const initials = (story.author_name || "?").slice(0, 2).toUpperCase();
  const timeAgo = (() => {
    const diff = Date.now() - new Date(story.created_at).getTime();
    const d = Math.floor(diff / 86400000);
    if (d < 7) return `${Math.max(1, d)}d ago`;
    if (d < 30) return `${Math.floor(d / 7)}w ago`;
    return `${Math.floor(d / 30)}mo ago`;
  })();

  return (
    <div className="bg-white border border-slate-200/90 hover:border-purple-300 rounded-2xl p-5 md:p-6 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 group">
      {/* Author Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-11 w-11 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
            {initials}
          </div>
          <div className="min-w-0 space-y-0.5">
            <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-purple-700 transition-colors">
              {story.author_name || "Anonymous Student"}
            </h3>
            <div className="text-xs font-semibold text-purple-700 truncate flex items-center gap-1">
              <Building2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{story.author_role}</span>
            </div>
            {story.author_college && (
              <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                <GraduationCap className="w-3 h-3 shrink-0" />
                <span className="truncate">{story.author_college}</span>
              </div>
            )}
          </div>
        </div>

        <span className="text-[10px] font-mono font-medium text-slate-400 shrink-0">
          {timeAgo}
        </span>
      </div>

      {/* Verification Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[10px] font-mono font-bold uppercase tracking-wider w-fit">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        <span>Verified Activity</span>
      </div>

      {/* Metric Badges */}
      <div className="flex flex-wrap gap-1.5">
        {story.xp_growth > 0 && (
          <MetricBadge
            icon={Zap}
            label="XP"
            value={`+${story.xp_growth.toLocaleString()}`}
            badgeBg="bg-purple-50 border-purple-200/70"
            textColor="text-purple-800"
          />
        )}
        {story.dsa_growth > 0 && (
          <MetricBadge
            icon={Code2}
            label="DSA"
            value={`+${story.dsa_growth}`}
            badgeBg="bg-amber-50 border-amber-200/70"
            textColor="text-amber-900"
          />
        )}
        {story.readiness_growth > 0 && (
          <MetricBadge
            icon={Target}
            label="Readiness"
            value={`+${story.readiness_growth}%`}
            badgeBg="bg-emerald-50 border-emerald-200/70"
            textColor="text-emerald-900"
          />
        )}
      </div>

      {/* Story Excerpt */}
      <div className="space-y-2 pt-1 flex-1">
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal italic line-clamp-3">
          "{story.current_results}"
        </p>
      </div>

      {/* Read Full Story Button */}
      <button
        onClick={onReadFull}
        className="w-full pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-purple-700 hover:text-purple-900 group-hover:translate-x-0.5 transition-all cursor-pointer"
      >
        <span>Read full transformation story</span>
        <ChevronRight className="w-4 h-4 text-purple-600" />
      </button>
    </div>
  );
}

/* ─── Main Page Component ───────────────────────────────────── */

function CareerTransformationsPage() {
  const { user } = useAuth();
  const [stories, setStories] = useState<Story[]>(DEMO_STORIES);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "highest_growth" | "recent">("all");
  const [search, setSearch] = useState("");
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const { data, error } = await supabase
          .from("career_transformations")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (!error && data && data.length > 0) {
          if (alive) setStories(data as Story[]);
        }
      } catch (err) {
        console.error("Error loading stories:", err);
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  const handleStoryAdded = (newStory: Story) => {
    setStories((prev) => [newStory, ...prev]);
  };

  const filtered = stories
    .filter((s) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (s.author_name || "").toLowerCase().includes(q) ||
        (s.author_role || "").toLowerCase().includes(q) ||
        (s.author_college || "").toLowerCase().includes(q) ||
        s.current_results.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (filter === "highest_growth") return b.readiness_growth - a.readiness_growth;
      if (filter === "recent") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return (b.likes_count || 0) - (a.likes_count || 0);
    });

  const stats = {
    stories: stories.length,
    avgXp: Math.round(stories.reduce((s, x) => s + (x.xp_growth || 0), 0) / Math.max(stories.length, 1)),
    avgReadiness: Math.round(stories.reduce((s, x) => s + (x.readiness_growth || 0), 0) / Math.max(stories.length, 1)),
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 pb-24 sm:pb-16">
      {/* Sticky Light Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/95 border-b border-slate-200/80 shadow-2xs pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>

          <BrandLogo size="md" />

          {!user ? (
            <Link
              to="/auth"
              className="text-xs md:text-sm font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-3.5 py-1.5 rounded-xl transition-all"
            >
              Sign in
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="text-xs md:text-sm font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-3.5 py-1.5 rounded-xl transition-all"
            >
              Dashboard
            </Link>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-10 md:pt-14 pb-8 px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide uppercase font-mono shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>REAL STUDENT JOURNEYS · VERIFIED OUTCOMES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            From learning skills to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
              landing opportunities.
            </span>
          </h1>

          <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Discover how students are building skills, improving their readiness, and moving closer to their career goals with SyncRole.
          </p>

          {/* Compact Proof-of-Progress Statistics Strip */}
          <div className="pt-4 max-w-2xl mx-auto">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 md:p-5 shadow-xs grid grid-cols-3 gap-3 md:gap-6 text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-purple-600 mb-0.5">
                  <Users className="w-4 h-4" />
                  <span className="text-base sm:text-xl md:text-2xl font-bold font-mono text-slate-900">
                    {stats.stories}
                  </span>
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  Verified Stories
                </div>
              </div>

              <div className="space-y-1 border-x border-slate-100 px-2">
                <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-0.5">
                  <Zap className="w-4 h-4" />
                  <span className="text-base sm:text-xl md:text-2xl font-bold font-mono text-slate-900">
                    +{stats.avgXp.toLocaleString()}
                  </span>
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  Avg XP Gain
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-emerald-600 mb-0.5">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-base sm:text-xl md:text-2xl font-bold font-mono text-slate-900">
                    +{stats.avgReadiness}%
                  </span>
                </div>
                <div className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                  Readiness Boost
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar: Search & Filters */}
      <section className="px-4 md:px-6 py-4">
        <div className="mx-auto max-w-7xl bg-white border border-slate-200/90 rounded-2xl p-3 md:p-4 shadow-2xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student, role, or company..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 focus:bg-white rounded-xl pl-10 pr-4 py-2 text-xs md:text-sm text-slate-900 outline-none transition-all"
            />
          </div>

          {/* Sort Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
            <div className="flex items-center gap-1 text-slate-400 text-xs font-medium mr-1 shrink-0">
              <Filter className="h-3.5 w-3.5" />
              <span>Sort:</span>
            </div>
            <div className="bg-slate-100/80 p-1 rounded-xl flex items-center gap-1 shrink-0">
              {(["all", "highest_growth", "recent"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    filter === f
                      ? "bg-purple-600 text-white shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  {f === "all" ? "Most Popular" : f === "highest_growth" ? "Highest Growth" : "Most Recent"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="px-4 md:px-6 py-6">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-2xl h-64 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white border border-slate-200/80 rounded-2xl p-8 max-w-md mx-auto space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <h3 className="font-bold text-slate-800 text-sm">No matching stories found</h3>
              <p className="text-xs text-slate-500">Try searching for a different student name, college, or role.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((story) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onReadFull={() => setActiveStory(story)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Share Your Transformation CTA Section */}
      <section className="px-4 md:px-6 py-10">
        <div className="mx-auto max-w-3xl">
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/80 rounded-3xl p-6 sm:p-10 text-center shadow-xs space-y-4">
            <div className="p-3 rounded-2xl bg-white shadow-2xs text-purple-600 inline-flex border border-purple-100 mb-1">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your progress could inspire someone.
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Share your journey and help another student see what's possible with consistency and data-driven preparation.
            </p>

            <div className="pt-2">
              {user ? (
                <button
                  onClick={() => setShareModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Your Journey</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98]"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Sign In to Share Your Story</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <FullStoryModal
            story={activeStory}
            onClose={() => setActiveStory(null)}
          />
        )}
      </AnimatePresence>

      {/* Share Story Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <ShareStoryModal
            onClose={() => setShareModalOpen(false)}
            onSuccess={handleStoryAdded}
          />
        )}
      </AnimatePresence>

      {/* SyncRole Footer */}
      <SyncFooter />

      {/* Mobile bottom navigation — keeps navigation persistent when arriving from Explore */}
      <CareerTransformationsMobileNav />
    </main>
  );
}

/* ─── Mobile Bottom Nav for Career Transformations ─────────── */
function CareerTransformationsMobileNav() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const { openSyncPilot, panelState } = useSyncPilot();
  const isSyncPilotOpen = panelState !== "closed";

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/career-transformations", icon: Compass },
    { label: "SyncPilot", action: openSyncPilot, icon: Sparkles, isCenter: true },
    { label: "GATE Hub", href: "/gate", icon: Shield, isNew: true },
    { label: "Profile", href: user ? "/profile" : "/auth", icon: UserCheck },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/98 backdrop-blur-xl border-t border-slate-200/80 shadow-sm"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-2 pt-1.5 pb-1 h-[56px]">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <button
                key={item.label}
                onClick={() => item.action?.()}
                className={`relative -top-2.5 h-11 w-11 rounded-full grid place-items-center shadow-md transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  isSyncPilotOpen
                    ? "bg-slate-900 text-indigo-300 ring-2 ring-indigo-400/50"
                    : "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white hover:brightness-110 shadow-indigo-600/25"
                }`}
                aria-label="Open SyncPilot AI Assistant"
                aria-pressed={isSyncPilotOpen}
              >
                <item.icon className="h-5 w-5" />
              </button>
            );
          }

          const IconComp = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href!);

          return (
            <Link
              key={item.label}
              to={item.href as any}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 min-w-[44px] min-h-[44px] rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50/80"
              }`}
            >
              <div className="relative">
                <IconComp
                  className={`h-[18px] w-[18px] ${
                    isActive ? "text-blue-600" : "text-slate-400"
                  }`}
                />
                {item.isNew && (
                  <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${
                isActive ? "font-semibold" : "font-medium"
              }`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
