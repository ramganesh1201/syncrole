import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Compass,
  FileCheck,
  TrendingUp,
  Check,
  Clock,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import SyncFooter from "@/components/SyncFooter";
import { useAuth } from "@/hooks/use-auth";
import { useSyncPilot } from "@/hooks/useSyncPilot";
import { supabase } from "@/integrations/supabase/client";
import { StoryModal } from "@/components/home/CareerTransformationsSection";

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
          {/* Mobile SyncPilot Top Navbar Button */}
          <button
            onClick={openSyncPilot}
            className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 active:scale-95 transition text-xs font-semibold cursor-pointer min-h-[38px]"
            aria-label="Open SyncPilot AI Assistant"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            <span className="text-[11px] font-bold">SyncPilot</span>
          </button>

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
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl px-2.5 py-1.5 shadow-xs flex items-center justify-around h-[64px] pb-[calc(0.5rem+env(safe-area-inset-bottom))] box-content">
      {navItems.map((item) => {
        if (item.isCenter) {
          return (
            <button
              key={item.label}
              onClick={() => item.action?.()}
              className={`relative -top-2.5 h-11 w-11 rounded-full grid place-items-center shadow-md transition active:scale-95 ${
                isSyncPilotOpen
                  ? "bg-slate-900 text-blue-300 ring-2 ring-blue-500/40"
                  : "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white hover:brightness-110"
              }`}
              aria-label="Open SyncPilot AI Assistant"
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
            className={`relative flex flex-col items-center justify-center px-2 py-1 min-w-[52px] min-h-[44px] rounded-xl transition-all duration-150 ${
              isActive
                ? "text-blue-600 font-bold"
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
  const { user } = useAuth();
  const navigate = useNavigate();

  const tabs = [
    {
      id: 0,
      title: "Track Progress",
      subtitle: "See skills, scores & readiness",
      icon: BarChart3,
      badge: "Analytics",
      route: user ? "/dashboard" : "/auth",
    },
    {
      id: 1,
      title: "Learn & Practice",
      subtitle: "DSA & curated problem sets",
      icon: BookOpen,
      badge: "Practice",
      route: user ? "/dashboard/dsa" : "/auth",
    },
    {
      id: 2,
      title: "AI Career Twin",
      subtitle: "Personalized guidance 24/7",
      icon: Rocket,
      badge: "SyncPilot",
      route: user ? "/dashboard" : "/auth",
    },
    {
      id: 3,
      title: "GATE Hub",
      subtitle: "Official GATE 2027 resources",
      icon: Shield,
      badge: "GATE 2027",
      route: "/gate",
    },
    {
      id: 4,
      title: "Build Portfolio",
      subtitle: "Showcase verified projects",
      icon: Code2,
      badge: "Projects",
      route: user ? "/dashboard" : "/auth",
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

        {/* Mobile Horizontal Selector (Compact, Swipeable, Scroll-safe) */}
        <div className="lg:hidden mb-6">
          <div
            role="tablist"
            aria-label="Feature navigation"
            className="flex flex-row gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 scroll-smooth"
          >
            {tabs.map((tab, idx) => {
              const IconComp = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  id={`feature-tab-mobile-${idx}`}
                  aria-controls={`feature-preview-panel-${idx}`}
                  onClick={() => setActiveTab(idx)}
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer min-h-[44px] ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60"
                  }`}
                >
                  <IconComp className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop & Main Content Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Left Navigation List */}
          <div
            role="tablist"
            aria-label="Feature selection"
            className="hidden lg:flex lg:col-span-5 flex-col gap-2.5"
          >
            {tabs.map((tab, idx) => {
              const IconComp = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  id={`feature-tab-${idx}`}
                  aria-controls={`feature-preview-panel-${idx}`}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-150 cursor-pointer border flex items-center justify-between group ${
                    isActive
                      ? "bg-blue-50/90 text-blue-900 border-blue-200/80 shadow-2xs"
                      : "bg-white text-slate-700 border-slate-200/70 hover:bg-slate-50/80 hover:border-slate-300/80"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200/60"
                      }`}
                    >
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isActive ? "text-slate-900" : "text-slate-800"}`}>
                        {tab.title}
                      </div>
                      <div className="text-xs text-slate-500 font-normal mt-0.5">
                        {tab.subtitle}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 shrink-0 transition-transform duration-150 ${
                      isActive ? "text-blue-600 translate-x-1" : "text-slate-300 group-hover:text-slate-400 opacity-60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Light Product Preview Area */}
          <div className="lg:col-span-7 w-full">
            <div
              id={`feature-preview-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={`feature-tab-${activeTab}`}
              className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs text-left relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Top Header Badge & Engine Signal */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full">
                      {currentTab.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Product Preview
                    </span>
                  </div>

                  {/* Feature Preview 0: Track Progress */}
                  {activeTab === 0 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                          Real-Time Career Readiness Index
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
                          SyncRole combines your DSA performance, GitHub activity, resume quality, and project depth into a single actionable score.
                        </p>
                      </div>

                      {/* Light Card UI Representation */}
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <div className="text-xs font-semibold text-slate-500">Overall Career Readiness</div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight font-display mt-0.5">
                              72%
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                            <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                            <span>+4% this week</span>
                          </div>
                        </div>

                        {/* Readiness Progress Bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-medium text-slate-600">
                            <span>Readiness Index</span>
                            <span className="font-mono text-slate-900 font-semibold">72 / 100</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full w-[72%]" />
                          </div>
                        </div>

                        {/* Breakdown Metrics */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                            <div className="text-[11px] text-slate-500 font-medium">DSA Solving</div>
                            <div className="text-base font-bold text-slate-900 font-mono mt-0.5">68%</div>
                            <div className="h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full w-[68%]" />
                            </div>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                            <div className="text-[11px] text-slate-500 font-medium">Resume ATS</div>
                            <div className="text-base font-bold text-slate-900 font-mono mt-0.5">78%</div>
                            <div className="h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-indigo-600 rounded-full w-[78%]" />
                            </div>
                          </div>

                          <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                            <div className="text-[11px] text-slate-500 font-medium">Project Depth</div>
                            <div className="text-base font-bold text-slate-900 font-mono mt-0.5">74%</div>
                            <div className="h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-emerald-600 rounded-full w-[74%]" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div>
                        <button
                          onClick={() => navigate({ to: currentTab.route })}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
                        >
                          <span>View Detailed Analytics</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Feature Preview 1: Learn & Practice */}
                  {activeTab === 1 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                          Targeted DSA & Technical Preparation
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
                          Topic-wise problem breakdown with complexity analysis, hints, and step-by-step guidance designed for top engineering roles.
                        </p>
                      </div>

                      {/* Light UI Practice Snippet */}
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                        {/* Featured Solved Problem */}
                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900">Two Sum</span>
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                Easy
                              </span>
                              <span className="text-[11px] text-slate-500">Arrays & Hashing</span>
                            </div>
                            <div className="text-xs text-slate-500 font-mono">
                              O(n) Time • O(n) Space
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                            <Check className="h-3.5 w-3.5" />
                            <span>Solved</span>
                          </div>
                        </div>

                        {/* Daily Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-700">Today's Goal</span>
                            <span className="font-mono text-blue-600 font-bold">3 / 5 Solved</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full w-[60%]" />
                          </div>
                        </div>

                        {/* Topics Pill Breakdown */}
                        <div className="space-y-2 pt-1">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Topic Mastery Breakdown
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-700">Arrays & Hashing</span>
                              <span className="font-mono font-bold text-blue-600">24</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-700">Trees & Graphs</span>
                              <span className="font-mono font-bold text-indigo-600">14</span>
                            </div>
                            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                              <span className="font-medium text-slate-700">Dynamic Prog.</span>
                              <span className="font-mono font-bold text-purple-600">8</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div>
                        <button
                          onClick={() => navigate({ to: currentTab.route })}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
                        >
                          <span>Continue DSA Practice</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Feature Preview 2: AI Career Twin */}
                  {activeTab === 2 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                          Your Dedicated AI Career Mentor
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
                          SyncPilot analyzes your weak areas and tells you exactly what to study today to increase your recruiter callback rate.
                        </p>
                      </div>

                      {/* Light UI AI Mentor Insight Card */}
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <div className="text-xs text-slate-500 font-medium">Target Role</div>
                            <div className="text-base font-bold text-slate-900 mt-0.5">Software Engineer</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] text-slate-500 font-medium">Target Role Match</div>
                            <div className="text-sm font-bold font-mono text-blue-600">85% Callback Rate</div>
                          </div>
                        </div>

                        {/* Next Best Action Card */}
                        <div className="bg-blue-50/70 border border-blue-200/70 p-4 rounded-xl space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                            <span>Recommended Next Best Action</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-800">
                            Strengthen: System Design & Tree Traversal
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-normal">
                            SyncPilot identified tree recursion and system design patterns as your highest-leveraged focus area for top recruiter callbacks.
                          </p>
                          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-200/60 mt-1">
                            <Clock className="h-3 w-3 text-blue-600" />
                            <span>Recommended: 3 focused sessions this week</span>
                          </div>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div>
                        <button
                          onClick={() => navigate({ to: currentTab.route })}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
                        >
                          <span>View Career Recommendations</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Feature Preview 3: GATE Hub */}
                  {activeTab === 3 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                          Official GATE 2027 CSE & DA Resource Center
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
                          Access verified syllabi, topic weightage, previous year papers, and official exam timeline updates in one structured hub.
                        </p>
                      </div>

                      {/* Light UI GATE Preview */}
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <div className="text-xs font-semibold text-slate-500">Exam Target</div>
                            <div className="text-base font-bold text-slate-900 mt-0.5">GATE 2027 CSE</div>
                          </div>
                          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-full">
                            Syllabus 100% Verified
                          </span>
                        </div>

                        {/* Subject Progress */}
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="text-slate-700">Operating Systems</span>
                              <span className="font-mono text-blue-600 font-bold">72%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 rounded-full w-[72%]" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="text-slate-700">DBMS & SQL</span>
                              <span className="font-mono text-indigo-600 font-bold">58%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-600 rounded-full w-[58%]" />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-medium">
                              <span className="text-slate-700">Computer Networks</span>
                              <span className="font-mono text-emerald-600 font-bold">64%</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-600 rounded-full w-[64%]" />
                            </div>
                          </div>
                        </div>

                        {/* Next Milestone Banner */}
                        <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-700">
                            Next Milestone: <strong className="text-slate-900 font-semibold">Complete DBMS Revision & PYQs</strong>
                          </span>
                          <span className="text-blue-600 font-semibold shrink-0 ml-2">3 Days Left</span>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div>
                        <button
                          onClick={() => navigate({ to: currentTab.route })}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
                        >
                          <span>Open GATE Hub</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Feature Preview 4: Build Portfolio */}
                  {activeTab === 4 && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                          Showcase Verified Production Projects
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-1">
                          Turn your repository commits into clean portfolio proof cards that recruiters can evaluate instantly.
                        </p>
                      </div>

                      {/* Light UI Portfolio Proof Card */}
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <div>
                            <div className="text-xs text-slate-500 font-medium">Featured Project</div>
                            <div className="text-base font-bold text-slate-900 mt-0.5">
                              SyncRole Career Engine
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Check className="h-3 w-3" /> Verified Proof
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          Full-stack platform with real-time DSA tracking, automated resume analysis, and structured GATE roadmap cards.
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5">
                          <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                            React
                          </span>
                          <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                            Supabase
                          </span>
                          <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                            Tailwind CSS
                          </span>
                          <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
                            AI Engine
                          </span>
                        </div>

                        {/* Impact Signal */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                            <div className="text-slate-500 text-[10px]">GitHub Activity</div>
                            <div className="font-bold text-slate-900 font-mono mt-0.5">12 commits / 7d</div>
                          </div>
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                            <div className="text-slate-500 text-[10px]">Recruiter Signal</div>
                            <div className="font-bold text-blue-600 mt-0.5">High Impact</div>
                          </div>
                        </div>
                      </div>

                      {/* Action CTA */}
                      <div>
                        <button
                          onClick={() => navigate({ to: currentTab.route })}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px]"
                        >
                          <span>Showcase Projects</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
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
  const [activeStage, setActiveStage] = useState(0);

  const journeyStages = [
    {
      id: 0,
      step: "01",
      title: "Set Your Target",
      badge: "Target Role",
      subtitle: "Choose your role & company direction",
      icon: Target,
      headline: "Define Your Target Role & Career Goal",
      detail: "Select your desired engineering track, target role, and preferred companies to establish your personalized preparation benchmark.",
      visualCard: {
        role: "Software Engineer",
        track: "Full-Stack & Systems Track",
        tag: "Role Target",
        points: [
          "Target Role Alignment & Benchmark Setup",
          "Automated Skill Gap Identification",
          "Role-Specific DSA & System Design Path",
        ],
      },
    },
    {
      id: 1,
      step: "02",
      title: "Know Your Readiness",
      badge: "Readiness Index",
      subtitle: "Evaluate strengths & skill gaps",
      icon: BarChart3,
      headline: "Understand Where You Stand Today",
      detail: "SyncRole analyzes your DSA problem count, resume ATS alignment, and project proof into a single real-time readiness score.",
      visualCard: {
        readinessScore: "68%",
        trend: "+4% this week",
        metrics: [
          { label: "DSA Problem Solving", val: "68%", color: "bg-blue-600" },
          { label: "Resume ATS Match", val: "78%", color: "bg-indigo-600" },
          { label: "Project Proof Depth", val: "74%", color: "bg-emerald-600" },
        ],
      },
    },
    {
      id: 2,
      title: "Follow Your Next Step",
      badge: "Next Action",
      subtitle: "Get focused daily recommendations",
      icon: Sparkles,
      headline: "No Guesswork on What to Study Next",
      detail: "Receive prioritized daily recommendations based on your weak areas so every practice session delivers high recruiter ROI.",
      visualCard: {
        focusArea: "Arrays & Dynamic Programming",
        recommendation: "3 focused practice sessions recommended this week for callback boost",
        suggestedTool: "DSA Practice & Resume Audit",
      },
    },
    {
      id: 3,
      step: "03",
      title: "Achieve Milestones",
      badge: "Daily Progress",
      subtitle: "Maintain consistency & unlock callbacks",
      icon: CheckCircle2,
      headline: "Consistent Momentum Toward Tech Roles",
      detail: "Track daily streaks, complete verified problem sets, and build proof cards recruiters can evaluate instantly.",
      visualCard: {
        milestone: "Arrays & Hashing Problem Set",
        status: "Completed & Verified",
        impact: "Recruiter Callback Readiness Updated",
      },
    },
  ];

  const currentStage = journeyStages[activeStage];

  return (
    <section
      id="journey"
      className="py-16 sm:py-24 bg-gradient-to-b from-slate-50/60 via-indigo-50/15 to-white overflow-hidden text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Text & Truthful Product Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-200/60">
              <Zap className="h-3.5 w-3.5 text-indigo-600" />
              <span>Your Career, Your Way</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Explore Your <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Career Journey
                </span>
              </h2>

              <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                Define your target role, evaluate your current readiness, and follow actionable daily steps to close your skill gaps.
              </p>
            </div>

            <div>
              <button
                onClick={() => navigate({ to: user ? "/dashboard" : "/auth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer min-h-[44px]"
              >
                <span>Explore Journey</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Truthful Value Communication (Replaces fake 50+/100+/10+ claims) */}
            <div className="pt-5 border-t border-slate-200/80 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Capabilities
              </div>
              <div className="space-y-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Personalized Target Role & Company Benchmarking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Real-Time Readiness Index Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <Check className="h-3 w-3" />
                  </div>
                  <span>Actionable Daily Guidance & Skill Gap Closing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Light Product Journey Visualization */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-slate-50/80 border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full">
                  Journey Roadmap
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                  4-Step Progression
                </span>
              </div>

              {/* Connected Journey Stage Tabs (Desktop & Mobile selector) */}
              <div
                role="tablist"
                aria-label="Career journey progression"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2"
              >
                {journeyStages.map((stg, idx) => {
                  const IconComp = stg.icon;
                  const isActive = activeStage === idx;
                  return (
                    <button
                      key={stg.id}
                      role="tab"
                      aria-selected={isActive}
                      id={`journey-tab-${idx}`}
                      aria-controls={`journey-panel-${idx}`}
                      onClick={() => setActiveStage(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[76px] ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs shadow-blue-500/20"
                          : "bg-white text-slate-700 border-slate-200/70 hover:bg-slate-100/70"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`text-[10px] font-bold tracking-wider uppercase ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                          {stg.step}
                        </span>
                        <IconComp className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                      </div>
                      <div className={`text-xs font-bold mt-1 line-clamp-1 ${isActive ? "text-white" : "text-slate-900"}`}>
                        {stg.title}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Stage Preview Card */}
              <div
                id={`journey-panel-${activeStage}`}
                role="tabpanel"
                aria-labelledby={`journey-tab-${activeStage}`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 text-left"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Step {currentStage.step} • {currentStage.badge}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-0.5">
                          {currentStage.headline}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {currentStage.detail}
                    </p>

                    {/* Stage Specific Visual Content */}
                    {activeStage === 0 && (
                      <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-slate-500 font-medium">Selected Target Role</div>
                            <div className="text-sm font-bold text-slate-900 mt-0.5">
                              {currentStage.visualCard.role}
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">
                            {currentStage.visualCard.tag}
                          </span>
                        </div>
                        <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                          {currentStage.visualCard.points?.map((pt, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeStage === 1 && (
                      <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs text-slate-500 font-medium">Career Readiness Score</div>
                            <div className="text-2xl font-extrabold text-blue-600 font-display mt-0.5">
                              {currentStage.visualCard.readinessScore}
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="h-3.5 w-3.5" />
                            {currentStage.visualCard.trend}
                          </span>
                        </div>
                        <div className="space-y-2 pt-1">
                          {currentStage.visualCard.metrics?.map((m, i) => (
                            <div key={i} className="space-y-1">
                              <div className="flex justify-between text-xs font-medium text-slate-700">
                                <span>{m.label}</span>
                                <span className="font-mono text-slate-900 font-bold">{m.val}</span>
                              </div>
                              <div className="h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                                <div className={`h-full ${m.color} rounded-full`} style={{ width: m.val }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeStage === 2 && (
                      <div className="bg-blue-50/70 border border-blue-200/70 p-4 rounded-xl space-y-2.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                          <span>Recommended Next Action</span>
                        </div>
                        <div className="text-xs font-bold text-slate-900">
                          Focus Area: {currentStage.visualCard.focusArea}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">
                          {currentStage.visualCard.recommendation}
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-200/60">
                          <Clock className="h-3 w-3 text-blue-600" />
                          <span>Suggested Tool: {currentStage.visualCard.suggestedTool}</span>
                        </div>
                      </div>
                    )}

                    {activeStage === 3 && (
                      <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="text-xs text-slate-500 font-medium">Daily Goal Target</div>
                            <div className="text-sm font-bold text-slate-900">
                              {currentStage.visualCard.milestone}
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" />
                            {currentStage.visualCard.status}
                          </span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 text-xs text-slate-600 flex items-center justify-between">
                          <span>Recruiter Callback Impact</span>
                          <span className="font-bold text-blue-600 font-mono">High Signal</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
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
type CommunityStory = {
  id: string;
  name: string;
  role: string;
  college: string;
  category: string;
  quote: string;
  outcome: string;
  avatarUrl?: string | null;
  link: string;
};

const SEED_STORIES: CommunityStory[] = [
  {
    id: "story-1",
    name: "Aarav S.",
    role: "Software Engineering Track",
    college: "BITS Pilani",
    category: "Resume & DSA Guidance",
    quote:
      "I was applying to 50+ companies with a generic resume and getting zero responses. SyncRole's ATS audit and daily DSA missions gave me a clear, data-backed path.",
    outcome: "Verified Progress Milestone",
    link: "/career-transformations",
  },
  {
    id: "story-2",
    name: "Priya K.",
    role: "Product Engineering",
    college: "VIT Vellore",
    category: "Portfolio & GitHub Proof",
    quote:
      "My GitHub was empty and my resume lacked real project depth. SyncPilot recommended building real full-stack projects and provided mock interview practice.",
    outcome: "Internship Offer Landed",
    link: "/career-transformations",
  },
  {
    id: "story-3",
    name: "Rohit M.",
    role: "System Design & DSA Track",
    college: "NIT Trichy",
    category: "DSA Consistency",
    quote:
      "System design felt like a black box and my DSA solving was inconsistent. SyncRole kept me accountable until my readiness score cracked 80%.",
    outcome: "100 DSA Problems Solved",
    link: "/career-transformations",
  },
  {
    id: "story-4",
    name: "Sneha T.",
    role: "Frontend Engineering Track",
    college: "Manipal Institute",
    category: "ATS Keyword Alignment",
    quote:
      "My React skills were solid, but my resume keywords didn't match job descriptions. Fixing ATS alignment and solving medium DSA daily transformed my callback rate.",
    outcome: "5 Recruiter Callbacks",
    link: "/career-transformations",
  },
  {
    id: "story-5",
    name: "Karthik R.",
    role: "Backend Systems Track",
    college: "Amrita University",
    category: "SyncPilot Mock Sessions",
    quote:
      "Used SyncPilot interview mode for 3 weeks to rebuild my system design fundamentals. Having actionable feedback on exact weak points made all the difference.",
    outcome: "System Design Mastery",
    link: "/career-transformations",
  },
];

function TestimonialsSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stories, setStories] = useState<CommunityStory[]>(SEED_STORIES);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch published community stories from Supabase if available
  useEffect(() => {
    let active = true;
    supabase
      .from("career_transformations")
      .select("id, author_name, author_role, author_college, before_syncrole, current_results")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(8)
      .then((res: { data: unknown }) => {
        const rows = res.data as Array<{
          id: string;
          author_name: string | null;
          author_role: string | null;
          author_college: string | null;
          before_syncrole: string;
          current_results: string | null;
        }> | null;
        if (active && rows && rows.length > 0) {
          const dbStories: CommunityStory[] = rows.map((r) => ({
            id: r.id,
            name: r.author_name || "SyncRole Student",
            role: r.author_role || "Engineering Track",
            college: r.author_college || "Verified Student",
            category: "Community Transformation",
            quote: r.before_syncrole,
            outcome: r.current_results || "Verified Progress",
            link: "/career-transformations",
          }));
          setStories(dbStories);
        }
      });
    return () => {
      active = false;
    };
  }, []);

  // Sync active index with actual scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 20; // width + gap
    const index = Math.round(container.scrollLeft / cardWidth) % stories.length;
    if (index >= 0 && index < stories.length && index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  // Automatic smooth horizontal scrolling movement
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isPaused || prefersReducedMotion || showStoryModal || stories.length <= 1) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 20;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 15) {
        // Seamlessly scroll back to start
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, showStoryModal, stories.length]);

  const scrollToStory = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 20;
    container.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleShareStoryClick = () => {
    if (user) {
      setShowStoryModal(true);
    } else {
      navigate({ to: "/auth" });
    }
  };

  // Duplicate items for continuous feel if 3+ stories
  const displayStories = stories.length >= 3 ? [...stories, ...stories] : stories;

  return (
    <section id="stories" className="py-12 sm:py-16 bg-slate-50/60 overflow-hidden text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-200/60">
          <div className="space-y-1 max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              REAL STORIES. REAL IMPACT.
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Stories from the SyncRole community.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Real experiences from students building their tech and engineering careers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/career-transformations"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1"
            >
              <span>See all stories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <button
              onClick={handleShareStoryClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-xs transition-all flex items-center gap-1.5 cursor-pointer min-h-[40px]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Share Your Story</span>
            </button>
          </div>
        </div>

        {/* Horizontal Story Rail Track */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="relative"
        >
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {displayStories.map((stg, idx) => {
              const avatarInitial = stg.name ? stg.name.charAt(0).toUpperCase() : "S";
              return (
                <div
                  key={`${stg.id}-${idx}`}
                  className="w-[82vw] max-w-[320px] sm:w-[340px] md:w-[360px] shrink-0 snap-start bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Profile DP & Information */}
                    <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
                      <div className="h-11 w-11 sm:h-13 sm:w-13 rounded-full bg-blue-100 text-blue-700 font-bold font-display text-base sm:text-lg flex items-center justify-center border-2 border-blue-200/80 shadow-2xs shrink-0">
                        {avatarInitial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight leading-snug truncate">
                          {stg.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                          {stg.college} • <span className="text-slate-700">{stg.role}</span>
                        </p>
                      </div>
                    </div>

                    {/* Story Content Excerpt */}
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                        {stg.category}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans line-clamp-4 italic">
                        “{stg.quote}”
                      </p>
                    </div>
                  </div>

                  {/* Outcome & Read Story Action */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
                    <div className="min-w-0">
                      <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Outcome</span>
                      <strong className="text-slate-900 font-bold truncate block">{stg.outcome}</strong>
                    </div>
                    <Link
                      to={stg.link}
                      className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Secondary Progress Indicator Dots */}
        {stories.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {stories.map((stg, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={stg.id}
                  onClick={() => scrollToStory(idx)}
                  aria-label={`Scroll to story ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? "w-6 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Story Submission Modal */}
      <AnimatePresence>
        {showStoryModal && (
          <StoryModal onClose={() => setShowStoryModal(false)} />
        )}
      </AnimatePresence>
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
