import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  CheckCircle2,
  Search,
  Menu,
  X,
  Play,
  Code2,
  BookOpen,
  Target,
  Rocket,
  Award,
  TrendingUp,
  Building2,
  Flame,
  ChevronRight,
  Star,
  Activity,
  Layers,
  BarChart3,
  Shield,
  GraduationCap,
  Briefcase,
  UserCheck,
  Compass,
  FileCheck,
  Zap,
  Lock,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import SyncFooter from "@/components/SyncFooter";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

const DemoModal = lazy(() => import("@/components/home/DemoModal"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SyncRole — Build Your Future with SyncRole" },
      {
        name: "description",
        content:
          "The AI Career Operating System for Students. Track your progress, practice DSA, prepare for GATE 2027, analyze your resume & GitHub, and build your career path.",
      },
      { property: "og:title", content: "SyncRole — Build Your Future" },
      {
        property: "og:description",
        content:
          "Your all-in-one platform to grow from college to career. Get personalized learning paths, track DSA progress, and explore dream opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

/* -------------------------------------------------------------------------- */
/*                                NAVBAR COMPONENT                            */
/* -------------------------------------------------------------------------- */
function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (user) {
        navigate({ to: "/dashboard" });
      } else {
        navigate({ to: "/auth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xs border-b border-slate-100 py-3"
          : "bg-white/70 backdrop-blur-sm py-4 border-b border-slate-100/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <BrandLogo size="md" />

          {/* Nav links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a
              href="#home"
              className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1.5"
            >
              Home
            </a>
            <a href="#features" className="hover:text-blue-600 transition-colors">
              Features
            </a>
            <Link
              to="/gate"
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5"
            >
              GATE Hub
              <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                New
              </span>
            </Link>
            <a href="#journey" className="hover:text-blue-600 transition-colors">
              Resources
            </a>
            <a href="#stories" className="hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>
        </div>

        {/* Right side: Search bar & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anything..."
              className="w-44 focus:w-56 transition-all duration-300 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200/70 focus:border-blue-400 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </form>

          {/* Primary CTA */}
          <button
            onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {user ? "Dashboard" : "Get Started"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
            className="bg-blue-600 text-white font-semibold text-xs px-3.5 py-1.5 rounded-full"
          >
            {user ? "Dashboard" : "Get Started"}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3"
          >
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                className="w-full bg-slate-100 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-xs text-slate-800"
              />
            </form>
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-blue-600 py-1"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1"
            >
              Features
            </a>
            <Link
              to="/gate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-medium text-slate-700 py-1"
            >
              <span>GATE Hub</span>
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                New
              </span>
            </Link>
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1"
            >
              Resources
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1"
            >
              About
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SECTION                                */
/* -------------------------------------------------------------------------- */
function HeroSection({ onOpenDemo }: { onOpenDemo: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section id="home" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/80 via-blue-50/20 to-white">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-200/40 via-purple-200/30 to-indigo-200/40 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3.5 py-1.5 text-xs font-semibold text-indigo-700 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
              <span>AI Career OS for Students</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Build Your Future <br />
              with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                SyncRole
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Your all-in-one platform to grow from college to career. Get personalized learning paths, track your progress, analyze your resume & GitHub, practice DSA, and explore your dream opportunities — all in one place.
            </p>

            {/* Key Feature Checkmarks */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {[
                "Full-Stack Development",
                "Career Guidance",
                "AI-Powered Applications",
              ].map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-blue-50/80 border border-blue-100 text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenDemo}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="h-4 w-4 text-blue-600 fill-blue-600" />
                <span>Explore Features</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Student user"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Student user"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Student user"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                  alt="Student user"
                />
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Join <span className="font-bold text-slate-900">1000+</span> students on their journey
              </p>
            </div>
          </div>

          {/* Right Column: Integrated Hero Artwork */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:-ml-4 xl:-ml-8 z-10">
            <div className="relative w-full max-w-xl lg:max-w-none lg:w-[115%] xl:w-[122%] flex items-center justify-center">
              <img
                src="/heroimage.png"
                alt="Student climbing toward a dream career with SyncRole"
                className="w-full h-auto max-h-[560px] sm:max-h-[620px] lg:max-h-[660px] object-contain object-center transform lg:scale-105 transition-all duration-500 pointer-events-none select-none"
                style={{ mixBlendMode: 'multiply' }}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                           FEATURE INTRODUCTION                              */
/* -------------------------------------------------------------------------- */
function FeatureIntroSection() {
  const features = [
    {
      title: "Track Progress",
      desc: "See your skills, scores and achievements in one place.",
      icon: BarChart3,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Learn & Practice",
      desc: "DSA, resume, GitHub and real-world challenges.",
      icon: BookOpen,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: "AI Career Twin",
      desc: "Get personalized guidance for your dream role & company.",
      icon: Rocket,
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      title: "GATE Hub",
      desc: "Stay updated with official GATE resources and latest events.",
      icon: Shield,
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      title: "Build Portfolio",
      desc: "Showcase your projects and get recruiter-ready.",
      icon: Code2,
      color: "text-cyan-600 bg-cyan-50 border-cyan-100",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            ALL-IN-ONE PLATFORM
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need, In One Place
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            From learning to landing your dream job — SyncRole gives you the tools, guidance and support to stay ahead.
          </p>
        </div>

        {/* 5 Horizontal Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className={`h-11 w-11 rounded-xl border ${f.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <IconComp className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         CAREER JOURNEY & LAPTOP MOCKUP                      */
/* -------------------------------------------------------------------------- */
function ProductShowcaseSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section id="journey" className="py-20 sm:py-28 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Stats */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-indigo-100/80 border border-indigo-200 rounded-full px-3.5 py-1 text-xs font-semibold text-indigo-700">
              <Zap className="h-3.5 w-3.5 text-indigo-600 fill-indigo-600" />
              <span>Your Career, Your Way</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Explore Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Career Journey
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-md">
              Build real-world projects, solve problems, and gain in-demand skills — with clean code and modern tech.
            </p>

            <div>
              <button
                onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Projects</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  50+
                </div>
                <div className="text-xs text-slate-500 font-medium">Real Projects</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  100+
                </div>
                <div className="text-xs text-slate-500 font-medium">Learning Paths</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  10+
                </div>
                <div className="text-xs text-slate-500 font-medium">Career Roles</div>
              </div>
            </div>
          </div>

          {/* Right Column: Sleek Laptop Display Mockup */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto">
              {/* Laptop Shell Outer Frame */}
              <div className="rounded-2xl sm:rounded-3xl bg-slate-900 p-2 sm:p-3 shadow-2xl shadow-blue-950/30 border border-slate-800">
                {/* Top Laptop Notch / Camera bar */}
                <div className="h-4 bg-slate-950 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center px-4">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
                </div>

                {/* Laptop Screen Content */}
                <div className="rounded-lg sm:rounded-xl bg-[#0b0f19] text-white p-4 sm:p-6 overflow-hidden border border-slate-800 text-left font-sans">
                  {/* Mock Dashboard Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center text-xs font-bold">
                        S
                      </div>
                      <span className="font-bold text-xs tracking-tight">SyncRole</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-[11px] text-slate-400">
                        <Search className="h-3 w-3 text-slate-500" />
                        <span>Search skills, DSA, projects...</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                          RG
                        </div>
                        <div className="hidden sm:block text-[11px]">
                          <div className="font-semibold text-slate-200 leading-none">Ram Ganesh</div>
                          <div className="text-[9px] text-slate-400 leading-tight">3rd Year • CSE</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Welcome banner */}
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5">
                        Good Morning, Ram Ganesh! 🖐️
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Semi-slow start: top tool for top growth.
                      </p>
                    </div>
                  </div>

                  {/* 4 Metric Cards Row */}
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3">
                      <div className="text-[10px] text-slate-400 font-medium">Career Readiness</div>
                      <div className="mt-1 text-base font-bold text-blue-400">68%</div>
                      <div className="mt-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[68%]" />
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3">
                      <div className="text-[10px] text-slate-400 font-medium">DSA Progress</div>
                      <div className="mt-1 text-base font-bold text-slate-100">42 <span className="text-[10px] text-slate-400 font-normal">/ 100</span></div>
                      <div className="text-[9px] text-emerald-400 mt-0.5">12 Easy</div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3">
                      <div className="text-[10px] text-slate-400 font-medium">Resume Score</div>
                      <div className="mt-1 text-base font-bold text-indigo-400">78 <span className="text-[10px] text-slate-400 font-normal">/ 100</span></div>
                      <div className="text-[9px] text-indigo-300 mt-0.5">2 Revision</div>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-3">
                      <div className="text-[10px] text-slate-400 font-medium">GitHub Activity</div>
                      <div className="mt-1 text-base font-bold text-purple-400">12 commits</div>
                      <div className="text-[9px] text-slate-400 mt-0.5">in last 7d</div>
                    </div>
                  </div>

                  {/* Mock Today's Journey Checklist */}
                  <div className="mt-4 bg-slate-900/60 border border-slate-800 rounded-xl p-3.5">
                    <div className="text-[11px] font-bold text-slate-300 mb-2.5">Today's Journey</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                          <span className="text-slate-200">Complete DSA Practice (Arrays)</span>
                        </div>
                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[9px] font-semibold">Start</span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded-lg border border-slate-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                          <span className="text-slate-200">Update your Resume</span>
                        </div>
                        <span className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[9px] font-semibold">Continue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                     HOW SYNCROLE WORKS & GATE HUB HIGHLIGHT                */
/* -------------------------------------------------------------------------- */
function WorkflowAndGateSection() {
  const navigate = useNavigate();

  const steps = [
    {
      num: "1",
      title: "Understand",
      desc: "Know your goals and current level.",
      icon: Target,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      num: "2",
      title: "Learn",
      desc: "Access in-depth resources & content.",
      icon: BookOpen,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      num: "3",
      title: "Practice",
      desc: "Build skills with DSA & real projects.",
      icon: Code2,
      color: "bg-teal-50 text-teal-600 border-teal-200",
    },
    {
      num: "4",
      title: "Grow",
      desc: "Track progress & improve with AI.",
      icon: Rocket,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: How SyncRole Works */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                SIMPLE STEPS
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                How SyncRole Works
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Follow a clear path from learning to landing your dream role.
              </p>
            </div>

            {/* 4 Steps Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((s, idx) => {
                const IconComp = s.icon;
                return (
                  <div
                    key={s.num}
                    className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 hover:bg-white hover:shadow-md hover:border-blue-200 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-10 w-10 rounded-xl border ${s.color} flex items-center justify-center font-bold text-sm`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                          Step {s.num}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base leading-tight">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div>
              <button
                onClick={() => navigate({ to: "/auth" })}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Start Learning</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: GATE Hub Highlight Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/70 to-slate-50 border border-blue-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between text-left space-y-6">
              <div>
                {/* Header badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                    <Shield className="h-3.5 w-3.5" />
                    <span>GATE Hub</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    New
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  GATE 2027 Preparation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Your dedicated space for GATE 2027 preparation, syllabus, official updates, and study resources.
                </p>

                {/* Bullets */}
                <ul className="mt-5 space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Latest official updates & notifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Syllabus, resources & study plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Real-time data from official sources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Simple, clean and focused — no distractions</span>
                  </li>
                </ul>
              </div>

              {/* Inset Campus Graphic Preview Card */}
              <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 overflow-hidden relative shadow-md">
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">OFFICIAL REPO</span>
                    <h4 className="text-sm font-bold text-white">GATE 2027 CSE & DA</h4>
                  </div>
                  <GraduationCap className="h-8 w-8 text-blue-300/80" />
                </div>
              </div>

              <div>
                <Link
                  to="/gate"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-full shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore GATE Hub</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                       REAL STORIES / TESTIMONIALS                          */
/* -------------------------------------------------------------------------- */
function TestimonialsSection() {
  const stories = [
    {
      quote:
        "SyncRole helped me stay consistent with DSA and land my internship. The progress tracking is amazing!",
      name: "Priya Sharma",
      role: "B.Tech CSE · 3rd Year",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote:
        "The GATE Hub is a game changer! All the important updates and resources in one place.",
      name: "Rahul Verma",
      role: "B.Tech ECE · 3rd Year",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    },
    {
      quote:
        "I built my portfolio through SyncRole and got noticed by recruiters. The guidance is spot on!",
      name: "Ananya Reddy",
      role: "B.Tech CSE · 4th Year",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
  ];

  return (
    <section id="stories" className="py-20 sm:py-28 bg-slate-50/80 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="text-left max-w-xl">
            <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <span>STUDENTS LIKE YOU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Real Stories. Real Impact.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              See how SyncRole is helping students build better skills, land opportunities and achieve their dreams.
            </p>
          </div>

          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-xs transition-colors"
            >
              <span>Read Their Stories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-6"
            >
              <div>
                <span className="text-3xl text-blue-500 font-serif leading-none block mb-2">“</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 FINAL CTA                                  */
/* -------------------------------------------------------------------------- */
function FinalCTASection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-100/80 p-8 sm:p-12 lg:p-14 text-center overflow-hidden shadow-sm">
          {/* Subtle decorative shapes */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-56 h-56 rounded-full bg-blue-200/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-56 h-56 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />

          {/* Handwritten note */}
          <div className="absolute bottom-4 right-6 hidden sm:block text-indigo-400/60 font-mono italic text-xs tracking-wider transform -rotate-2 pointer-events-none select-none">
            Better Skills Bigger Dreams ♡
          </div>

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500">
              YOUR JOURNEY STARTS NOW
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ready to Build Your Future?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Start building the skills, projects, and direction you need for your next step.
            </p>

            <div className="pt-3 flex flex-col items-center gap-2.5">
              <button
                onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-px transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{user ? "Open Dashboard" : "Get Started Free"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-[11px] text-slate-500 font-medium">
                No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MAIN LANDING PAGE                            */
/* -------------------------------------------------------------------------- */
function LandingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between">
      <div>
        <Navbar />
        <HeroSection onOpenDemo={() => setIsDemoOpen(true)} />
        <FeatureIntroSection />
        <ProductShowcaseSection />
        <WorkflowAndGateSection />
        <TestimonialsSection />
        <FinalCTASection />
      </div>

      <SyncFooter />

      <Suspense fallback={null}>
        <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      </Suspense>
    </div>
  );
}
