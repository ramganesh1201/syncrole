import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Search,
  Menu,
  X,
  Play,
  Code2,
  BookOpen,
  Target,
  Rocket,
  Shield,
  GraduationCap,
  Zap,
  Home,
  UserCheck,
  LayoutDashboard,
  Brain,
  ChevronRight,
  BarChart3,
  Compass,
  FileCheck,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import SyncFooter from "@/components/SyncFooter";
import { useAuth } from "@/hooks/use-auth";

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
          ? "bg-white/95 backdrop-blur-md shadow-2xs py-2.5"
          : "bg-white/80 backdrop-blur-sm py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Mobile Integrated Brand Identity Lockup */}
        <div className="flex items-center gap-3">
          <BrandLogo size="md" className="active:scale-[0.98] transition-transform" />

          {/* Nav links (Desktop Only) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-600 ml-4">
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
              <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
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

        {/* Right side (Desktop Search & Mobile/Desktop Action) */}
        <div className="flex items-center gap-2">
          {/* Desktop Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:block relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, DSA..."
              className="w-40 focus:w-52 transition-all duration-300 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200/80 focus:border-blue-400 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </form>

          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="sm:hidden p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            aria-label="Toggle Search"
          >
            <Search className="h-4.5 w-4.5" />
          </button>

          {/* TOP NAVBAR DASHBOARD / PRIMARY ACTION BUTTON (MUST REMAIN IN TOP NAV) */}
          <button
            onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
            className="bg-blue-600 hover:bg-blue-700 active:scale-[0.97] text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer min-h-[44px]"
          >
            <span>{user ? "Dashboard" : "Get Started"}</span>
            <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
          </button>

          {/* Mobile Navigation Drawer Toggle (Desktop Hidden) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Input Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden px-4 pt-2 pb-3 bg-white"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills, DSA, topics..."
                autoFocus
                className="w-full bg-slate-100 border border-slate-200/80 rounded-full pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white px-6 py-4 space-y-3"
          >
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-blue-600 py-1.5"
            >
              Home
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1.5"
            >
              Features
            </a>
            <Link
              to="/gate"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-medium text-slate-700 py-1.5"
            >
              <span>GATE Hub</span>
              <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                New
              </span>
            </Link>
            <Link
              to="/career-transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1.5"
            >
              Explore Transformations
            </Link>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-700 py-1.5"
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
/*             PWA PERSISTENT BOTTOM ROUTE NAVIGATION (NO ANCHORS)            */
/* -------------------------------------------------------------------------- */
function MobileBottomNav() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = router.state.location.pathname;

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/career-transformations", icon: Compass },
    { label: "GATE Hub", href: "/gate", icon: Shield, isNew: true },
    { label: "Profile", href: user ? "/profile" : "/auth", icon: UserCheck },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl px-4 py-1.5 shadow-xs flex items-center justify-around h-[64px] pb-[calc(0.5rem+env(safe-area-inset-bottom))] box-content">
      {navItems.map((item) => {
        const IconComp = item.icon;
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.label}
            to={item.href as any}
            className={`relative flex flex-col items-center justify-center px-3 py-1.5 min-w-[64px] min-h-[44px] rounded-xl transition-all duration-150 ${
              isActive
                ? "text-blue-600 bg-blue-50/80 font-bold"
                : "text-slate-500 hover:text-slate-800 font-medium"
            }`}
          >
            <div className="relative">
              <IconComp className={`h-5 w-5 ${isActive ? "text-blue-600 scale-105" : "text-slate-400"}`} />
              {item.isNew && (
                <span className="absolute -top-0.5 -right-1 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SECTION                                */
/* -------------------------------------------------------------------------- */
function HeroSection({ onOpenDemo }: { onOpenDemo: () => void }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-36 pb-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white"
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-100/30 via-indigo-100/20 to-slate-100/30 blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-6 space-y-5 text-left">
            {/* Context Eyebrow */}
            <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>AI Career OS for Students</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Build Your Future <br />
              with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-800">
                SyncRole
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Your all-in-one platform to grow from college to career. Get personalized learning paths, track DSA progress, analyze your resume & GitHub, and prepare for GATE 2027.
            </p>

            {/* Micro Feature Ticker / Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                "Full-Stack Roadmap",
                "DSA Analytics",
                "Resume AI",
                "GATE 2027 Hub",
              ].map((badge) => (
                <div
                  key={badge}
                  className="inline-flex items-center gap-1.5 bg-slate-100/80 text-slate-700 text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  <CheckCircle2 className="h-3 w-3 text-blue-600 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
                className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenDemo}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Play className="h-4 w-4 text-blue-600 fill-blue-600" />
                <span>Explore SyncRole</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-3">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Student user"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Student user"
                />
                <img
                  className="inline-block h-7 w-7 sm:h-8 sm:w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Student user"
                />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Joined by <span className="font-semibold text-slate-900">1,000+</span> ambitious engineering students
              </p>
            </div>
          </div>

          {/* Right Column: Hero Artwork */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none flex items-center justify-center">
              <img
                src="/heroimage.png"
                alt="Student climbing toward a dream career with SyncRole"
                className="w-full h-auto max-h-[300px] sm:max-h-[460px] object-contain transform hover:scale-[1.01] transition-all duration-300 pointer-events-none select-none"
                style={{ mixBlendMode: "multiply" }}
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
/*                     QUICK PROOF / CAPABILITY STRIP                          */
/* -------------------------------------------------------------------------- */
function CapabilityTickerSection() {
  const capabilities = [
    { title: "Career Path", label: "Personalized Roadmap", icon: Target, color: "text-blue-600 bg-blue-50" },
    { title: "Resume AI", label: "Instant ATS Feedback", icon: FileCheck, color: "text-indigo-600 bg-indigo-50" },
    { title: "DSA Tracker", label: "Topic Analytics", icon: Code2, color: "text-emerald-600 bg-emerald-50" },
    { title: "GitHub Pulse", label: "Commit Signal", icon: Zap, color: "text-amber-600 bg-amber-50" },
    { title: "AI Guidance", label: "SyncPilot Assistant", icon: Brain, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <section className="py-8 bg-slate-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white rounded-full px-3.5 py-2 shrink-0 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <div className={`h-7 w-7 rounded-full ${c.color} flex items-center justify-center shrink-0`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 leading-none">{c.title}</div>
                  <div className="text-[10px] text-slate-500 leading-tight font-medium mt-0.5">{c.label}</div>
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
/*                     EVERYTHING YOU NEED (DYNAMIC PREVIEW)                  */
/* -------------------------------------------------------------------------- */
function EverythingYouNeedSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      title: "Track Progress",
      subtitle: "See skills, scores & readiness",
      icon: BarChart3,
      badge: "Analytics",
      preview: {
        headline: "Real-Time Career Readiness Index",
        detail: "SyncRole combines your DSA performance, GitHub activity, resume quality, and project depth into a single actionable score.",
        metrics: [
          { label: "Overall Preparedness", val: "72%", color: "bg-blue-600" },
          { label: "DSA Problem Solving", val: "68%", color: "bg-indigo-600" },
          { label: "Resume ATS Match", val: "78%", color: "bg-emerald-600" },
        ],
      },
    },
    {
      id: 1,
      title: "Learn & Practice",
      subtitle: "DSA & curated problem sets",
      icon: BookOpen,
      badge: "Practice",
      preview: {
        headline: "Targeted DSA & Technical Preparation",
        detail: "Topic-wise problem breakdown with complexity analysis, hints, and step-by-step guidance designed for top engineering roles.",
        metrics: [
          { label: "Arrays & Hashing", val: "24 Solved", color: "bg-blue-600" },
          { label: "Trees & Graphs", val: "14 Solved", color: "bg-indigo-600" },
          { label: "Dynamic Programming", val: "8 Solved", color: "bg-purple-600" },
        ],
      },
    },
    {
      id: 2,
      title: "AI Career Twin",
      subtitle: "Personalized guidance 24/7",
      icon: Rocket,
      badge: "SyncPilot",
      preview: {
        headline: "Your Dedicated AI Career Mentor",
        detail: "SyncPilot analyzes your weak areas and tells you exactly what to study today to increase your recruiter callback rate.",
        metrics: [
          { label: "Daily Recommendation", val: "Binary Trees & Resume v2", color: "bg-blue-600" },
          { label: "Target Role Match", val: "Frontend Engineer (85%)", color: "bg-indigo-600" },
        ],
      },
    },
    {
      id: 3,
      title: "GATE Hub",
      subtitle: "Official GATE 2027 resources",
      icon: Shield,
      badge: "GATE 2027",
      preview: {
        headline: "Official GATE 2027 CSE & DA Resource Center",
        detail: "Access verified syllabi, topic weightage, previous year papers, and official exam timeline updates in one structured hub.",
        metrics: [
          { label: "GATE CSE Syllabus", val: "100% Updated", color: "bg-blue-600" },
          { label: "Official Notifications", val: "Live Feed", color: "bg-emerald-600" },
        ],
      },
    },
    {
      id: 4,
      title: "Build Portfolio",
      subtitle: "Showcase verified projects",
      icon: Code2,
      badge: "Projects",
      preview: {
        headline: "Showcase Verified Production Projects",
        detail: "Turn your repository commits into clean portfolio proof cards that recruiters can evaluate instantly.",
        metrics: [
          { label: "GitHub Commits", val: "12 last 7 days", color: "bg-purple-600" },
          { label: "Recruiter Signal", val: "High Impact", color: "bg-blue-600" },
        ],
      },
    },
  ];

  const currentTab = tabs[activeTab];

  return (
    <section id="features" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left sm:text-center max-w-2xl mx-auto space-y-2 mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            ALL-IN-ONE PLATFORM
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need, In One Place
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-normal">
            From skill building to landing your dream role — SyncRole gives you the guidance and tools to stay ahead.
          </p>
        </div>

        {/* Dynamic Feature Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Navigation Pill List */}
          <div className="lg:col-span-5 flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {tabs.map((tab, idx) => {
              const IconComp = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 min-w-[200px] lg:min-w-0 text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 cursor-pointer min-h-[48px] flex items-center justify-between ${
                    isActive
                      ? "bg-blue-50/80 text-blue-900 shadow-2xs"
                      : "bg-slate-50/60 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-blue-600 text-white" : "bg-white text-slate-600 shadow-2xs"
                      }`}
                    >
                      <IconComp className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm">{tab.title}</div>
                      <div className="text-[11px] text-slate-500 font-normal hidden sm:block">
                        {tab.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isActive ? "text-blue-600 translate-x-0.5" : "text-slate-400 opacity-40"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Active Module Preview Box */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg text-left relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full">
                  {currentTab.badge}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">SyncRole Engine</span>
              </div>

              <div className="mt-4 space-y-3">
                <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                  {currentTab.preview.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {currentTab.preview.detail}
                </p>
              </div>

              {/* Dynamic Metrics */}
              <div className="mt-6 space-y-3 pt-4 border-t border-slate-800/80">
                {currentTab.preview.metrics.map((m, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">{m.label}</span>
                      <span className="text-blue-300 font-mono">{m.val}</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full`} style={{ width: "75%" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                         CAREER JOURNEY PRODUCT PREVIEW                      */
/* -------------------------------------------------------------------------- */
function ProductShowcaseSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section
      id="journey"
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-50/60 via-indigo-50/15 to-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Stats */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full">
              <Zap className="h-3.5 w-3.5 text-indigo-600" />
              <span>Your Career, Your Way</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Explore Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Career Journey
              </span>
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
              Build real-world projects, practice DSA, and track your readiness — with clear direction for every step.
            </p>

            <div>
              <button
                onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-sm transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Explore Journey</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Metrics */}
            <div className="pt-5 border-t border-slate-100 grid grid-cols-3 gap-3 text-left">
              <div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900">50+</div>
                <div className="text-[11px] text-slate-500 font-medium">Real Projects</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900">100+</div>
                <div className="text-[11px] text-slate-500 font-medium">Learning Paths</div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-extrabold text-slate-900">10+</div>
                <div className="text-[11px] text-slate-500 font-medium">Career Roles</div>
              </div>
            </div>
          </div>

          {/* Right Column: Native Mobile/Desktop Product Preview Frame */}
          <div className="lg:col-span-7">
            <div className="max-w-md mx-auto lg:max-w-none">
              <div className="rounded-3xl bg-slate-950 p-4 sm:p-5 shadow-xl text-white text-left font-sans">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-blue-600 flex items-center justify-center text-xs font-bold">
                      S
                    </div>
                    <span className="font-bold text-xs">SyncRole Mobile</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Live Dashboard</span>
                </div>

                {/* Body Content */}
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-100">
                        Target: Software Engineer
                      </h4>
                      <p className="text-[10px] text-slate-400">3rd Year CSE • SyncRole Guided</p>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800/80 px-2 py-0.5 rounded-full">
                      On Track
                    </span>
                  </div>

                  {/* Score gauge cards */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900 rounded-2xl p-2.5">
                      <div className="text-[10px] text-slate-400 font-medium">Career Readiness</div>
                      <div className="text-base font-bold text-blue-400 mt-0.5">68%</div>
                      <div className="mt-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[68%]" />
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-2.5">
                      <div className="text-[10px] text-slate-400 font-medium">DSA Analytics</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">42 / 100</div>
                      <div className="text-[9px] text-slate-400">12 Easy • 24 Medium</div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="bg-slate-900/90 rounded-2xl p-3">
                    <div className="text-[11px] font-bold text-slate-300 mb-2">Today's Goals</div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl text-slate-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                          <span>Arrays & Hashing Problem Set</span>
                        </div>
                        <span className="text-[9px] text-blue-300 font-semibold bg-blue-950 px-1.5 py-0.5 rounded">
                          +15 XP
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl text-slate-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                          <span>Resume ATS Alignment Check</span>
                        </div>
                        <span className="text-[9px] text-indigo-300 font-semibold bg-indigo-950 px-1.5 py-0.5 rounded">
                          +20 XP
                        </span>
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
    { num: "01", title: "Understand", desc: "Define your goal & assess current skills.", icon: Target },
    { num: "02", title: "Plan", desc: "Get personalized learning & milestone paths.", icon: BookOpen },
    { num: "03", title: "Practice", desc: "Build DSA consistency & real project proof.", icon: Code2 },
    { num: "04", title: "Grow", desc: "Track progress & prepare for recruiter calls.", icon: Rocket },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: How SyncRole Works */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                SIMPLE STEPS
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                How SyncRole Works
              </h2>
              <p className="text-xs sm:text-base text-slate-600 mt-1">
                A structured path from learning to landing your engineering role.
              </p>
            </div>

            {/* Step Flow List */}
            <div className="space-y-3 pt-2">
              {steps.map((s) => {
                return (
                  <div
                    key={s.num}
                    className="flex items-start gap-3.5 p-3.5 sm:p-4 bg-slate-50/60 rounded-2xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {s.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
                      <p className="text-xs text-slate-500 font-normal leading-relaxed mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: GATE Hub Highlight */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/40 to-slate-50 p-6 sm:p-7 text-left space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  <Shield className="h-3.5 w-3.5" />
                  <span>GATE Hub</span>
                </div>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Official 2027
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  GATE 2027 Preparation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
                  Dedicated space for GATE CSE & DA syllabus, official updates, and study resources.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Official updates & exam notifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Structured CSE & Data Analytics syllabus</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>Focused preparation — zero clutter</span>
                </li>
              </ul>

              <Link
                to="/gate"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm py-3 px-5 rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Explore GATE Hub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
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
        "The GATE Hub is a game changer! All the important updates and syllabus resources in one place.",
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
    <section id="stories" className="py-16 sm:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left sm:text-center max-w-xl mx-auto space-y-2 mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            STUDENTS LIKE YOU
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Stories. Real Impact.
          </h2>
          <p className="text-xs sm:text-base text-slate-600 font-normal">
            See how SyncRole is helping engineering students build skills and land opportunities.
          </p>
        </div>

        {/* 3 Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {stories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                “{item.quote}”
              </p>

              <div className="flex items-center gap-3 pt-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="h-9 w-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 leading-tight">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/60 to-slate-50 p-7 sm:p-12 text-center space-y-4 shadow-2xs">
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600">
            YOUR JOURNEY STARTS NOW
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ready to Build Your Future?
          </h2>
          <p className="text-xs sm:text-base text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
            Start building the skills, projects, and direction you need for your next step.
          </p>

          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md shadow-blue-500/20 transition-all inline-flex items-center gap-2 cursor-pointer min-h-[48px]"
            >
              <span>{user ? "Open Dashboard" : "Get Started Free"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[11px] text-slate-500 font-medium">
              No credit card required • Free for students
            </p>
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
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900 flex flex-col justify-between pb-24 sm:pb-0">
      <div>
        <Navbar />
        <HeroSection onOpenDemo={() => setIsDemoOpen(true)} />
        <CapabilityTickerSection />
        <EverythingYouNeedSection />
        <ProductShowcaseSection />
        <WorkflowAndGateSection />
        <TestimonialsSection />
        <FinalCTASection />
      </div>

      <SyncFooter />

      {/* PWA Persistent Mobile Bottom Route Navigation */}
      <MobileBottomNav />

      <Suspense fallback={null}>
        <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
      </Suspense>
    </div>
  );
}
