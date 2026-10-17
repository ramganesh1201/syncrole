import { useState, useEffect, useRef, useId, useMemo } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Code2,
  Brain,
  Compass,
  Calendar,
  Building2,
  BarChart3,
  GraduationCap,
  FileCheck,
  UserCheck,
  TrendingUp,
  Target,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Sparkles,
  Rocket,
  CornerDownLeft,
  ChevronRight,
  Command,
} from "lucide-react";

export interface SearchDestination {
  id: string;
  title: string;
  description: string;
  category: "DSA Practice" | "GATE Exam" | "Career Tools" | "Workspace" | "Account" | "Platform";
  to: string;
  isHash?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  featured?: boolean;
}

export const VERIFIED_SEARCH_DESTINATIONS: SearchDestination[] = [
  // DSA Practice & Learning
  {
    id: "dsa-problems",
    title: "DSA Problem Library",
    description: "450+ curated coding problems with difficulty levels and company tags",
    category: "DSA Practice",
    to: "/dsa-problems",
    icon: Code2,
    tags: ["problems", "leetcode", "dsa", "coding", "algorithms", "data structures", "arrays", "trees", "dp"],
    featured: true,
  },
  {
    id: "dsa-mentor",
    title: "AI DSA Mentor",
    description: "Interactive AI coding tutor with real-time feedback and step-by-step hints",
    category: "DSA Practice",
    to: "/dsa-mentor",
    icon: Brain,
    tags: ["mentor", "ai", "coach", "dsa", "code tutor", "hints", "explain", "debugging"],
    featured: true,
  },
  {
    id: "dsa-roadmap",
    title: "DSA Algorithmic Roadmap",
    description: "Structured topic-by-topic algorithmic preparation learning path",
    category: "DSA Practice",
    to: "/dsa-roadmap",
    icon: Compass,
    tags: ["roadmap", "learning path", "syllabus", "dsa roadmap", "guide", "steps"],
  },
  {
    id: "dsa-daily",
    title: "Daily DSA Challenge",
    description: "Daily coding problem with streak tracking and comprehensive solutions",
    category: "DSA Practice",
    to: "/dsa-daily",
    icon: Calendar,
    tags: ["daily", "potd", "streak", "challenge", "today problem"],
  },
  {
    id: "dsa-companies",
    title: "Company-wise DSA Questions",
    description: "Top interview coding questions from Google, Amazon, Microsoft & Meta",
    category: "DSA Practice",
    to: "/dsa-companies",
    icon: Building2,
    tags: ["companies", "faang", "google", "amazon", "microsoft", "uber", "interviews"],
  },
  {
    id: "dsa-analytics",
    title: "DSA Performance Analytics",
    description: "Track solved problems, accuracy rate, speed breakdown, and topic mastery",
    category: "DSA Practice",
    to: "/dashboard/dsa",
    icon: BarChart3,
    tags: ["analytics", "stats", "metrics", "performance", "progress", "mastery"],
  },

  // GATE Exam
  {
    id: "gate-hub",
    title: "GATE 2027 Hub",
    description: "Official exam countdowns, CS & DA syllabus PDFs, and preparation resources",
    category: "GATE Exam",
    to: "/gate",
    icon: GraduationCap,
    tags: ["gate", "gate 2027", "exam", "syllabus", "cs", "da", "iit", "countdown", "dates", "pdf", "downloads"],
    featured: true,
  },

  // Career Intelligence & Tools
  {
    id: "resume-intelligence",
    title: "Resume AI Intelligence",
    description: "ATS score audit, resume bullet optimization, and keyword analysis",
    category: "Career Tools",
    to: "/resume-intelligence",
    icon: FileCheck,
    tags: ["resume", "cv", "ats", "score", "ai", "review", "analyzer", "bullets", "formatting"],
    featured: true,
  },
  {
    id: "career-identity",
    title: "GitHub & Career Identity",
    description: "Developer profile audit, repository analytics, and technical skill verification",
    category: "Career Tools",
    to: "/career-identity",
    icon: UserCheck,
    tags: ["github", "identity", "git", "portfolio", "commits", "projects", "repositories"],
  },
  {
    id: "career-transformations",
    title: "Career Transformations",
    description: "Real student success stories, salary transitions, and career trajectory reviews",
    category: "Career Tools",
    to: "/career-transformations",
    icon: TrendingUp,
    tags: ["stories", "transformations", "alumni", "placements", "salary", "reviews", "success"],
  },
  {
    id: "role-explorer",
    title: "Role Explorer",
    description: "Explore tech roles, salary bands, industry expectations, and skill roadmaps",
    category: "Career Tools",
    to: "/role-explorer",
    icon: Target,
    tags: ["roles", "career", "skills", "frontend", "backend", "devops", "ai", "machine learning"],
  },

  // Workspace & Account
  {
    id: "dashboard",
    title: "Student Dashboard",
    description: "Overview of your active prep tracks, milestone progress, and recommendations",
    category: "Workspace",
    to: "/dashboard",
    icon: LayoutDashboard,
    tags: ["dashboard", "home", "overview", "tasks", "my progress"],
  },
  {
    id: "profile",
    title: "Career Profile",
    description: "Manage personal bio, target roles, academic records, and verified achievements",
    category: "Account",
    to: "/profile",
    icon: UserCheck,
    tags: ["profile", "bio", "account", "settings", "education", "college", "degree"],
  },
  {
    id: "settings",
    title: "Platform Settings",
    description: "Notification preferences, security settings, and account details",
    category: "Account",
    to: "/settings",
    icon: Settings,
    tags: ["settings", "preferences", "security", "notifications", "password", "theme"],
  },
  {
    id: "help",
    title: "Help Center & FAQs",
    description: "Feature walkthroughs, answers to frequent questions, and student support",
    category: "Platform",
    to: "/help",
    icon: HelpCircle,
    tags: ["help", "faq", "support", "docs", "guide", "contact"],
  },

  // Homepage Quick Anchor Links
  {
    id: "features",
    title: "SyncRole Core Features",
    description: "Explore the complete AI Career OS suite designed for university students",
    category: "Platform",
    to: "#features",
    isHash: true,
    icon: Sparkles,
    tags: ["features", "overview", "tools", "suite", "capabilities"],
  },
  {
    id: "journey",
    title: "College to Career Journey",
    description: "Four-step structured framework from foundation to high-growth tech roles",
    category: "Platform",
    to: "#journey",
    isHash: true,
    icon: Rocket,
    tags: ["journey", "framework", "steps", "college to career", "process"],
  },
];

interface QuickSearchProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  renderMobileTrigger?: boolean;
}

export function QuickSearch({
  isMobileOpen: isMobileOpenProp,
  onMobileClose,
  renderMobileTrigger = true,
}: QuickSearchProps = {}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const isMobileOpen = isMobileOpenProp !== undefined ? isMobileOpenProp : internalMobileOpen;
  
  const closeMobile = () => {
    setInternalMobileOpen(false);
    if (onMobileClose) onMobileClose();
  };

  const openMobile = () => {
    setInternalMobileOpen(true);
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchInputId = useId();

  // Detect OS for shortcut hint (Cmd+K vs Ctrl+K)
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform));
    }
  }, []);

  // Global Keyboard Shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        const target = e.target as HTMLElement;
        // Don't trigger if user is actively typing in a contenteditable or textarea
        if (target && (target.tagName === "TEXTAREA" || target.isContentEditable)) {
          return;
        }
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            inputRef.current?.focus();
            return true;
          } else {
            inputRef.current?.blur();
            return false;
          }
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Lock mobile body scroll and auto-focus when mobile search modal is open
  useEffect(() => {
    if (isMobileOpen) {
      const originalInlineOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        mobileInputRef.current?.focus();
      }, 60);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalInlineOverflow || "";
      };
    }
  }, [isMobileOpen]);

  // Escape key closes mobile search modal
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleMobileEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
      }
    };
    window.addEventListener("keydown", handleMobileEsc);
    return () => window.removeEventListener("keydown", handleMobileEsc);
  }, [isMobileOpen]);

  // Search Scoring Algorithm
  const filteredDestinations = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // Return featured items first when search is empty
      return VERIFIED_SEARCH_DESTINATIONS.filter((d) => d.featured || d.category === "DSA Practice").slice(0, 7);
    }

    const scored = VERIFIED_SEARCH_DESTINATIONS.map((item) => {
      let score = 0;
      const lowerTitle = item.title.toLowerCase();
      const lowerDesc = item.description.toLowerCase();
      const lowerCat = item.category.toLowerCase();

      // Exact title match
      if (lowerTitle === trimmed) score += 100;
      // Title starts with query
      else if (lowerTitle.startsWith(trimmed)) score += 80;
      // Title contains query
      else if (lowerTitle.includes(trimmed)) score += 60;

      // Tag exact or partial match
      for (const tag of item.tags) {
        if (tag.toLowerCase() === trimmed) {
          score += 45;
          break;
        } else if (tag.toLowerCase().includes(trimmed)) {
          score += 25;
          break;
        }
      }

      // Category match
      if (lowerCat.includes(trimmed)) score += 30;

      // Description match
      if (lowerDesc.includes(trimmed)) score += 20;

      return { item, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item);
  }, [query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredDestinations]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleSelect = (dest: SearchDestination) => {
    setIsOpen(false);
    closeMobile();

    if (dest.isHash) {
      const element = document.querySelector(dest.to);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = dest.to;
      }
    } else {
      navigate({ to: dest.to });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filteredDestinations.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % filteredDestinations.length);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filteredDestinations.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + filteredDestinations.length) % filteredDestinations.length);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredDestinations.length > 0 && filteredDestinations[selectedIndex]) {
        handleSelect(filteredDestinations[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP QUICK SEARCH (Embedded in Header with Dropdown Panel) */}
      {/* ------------------------------------------------------------- */}
      <div ref={containerRef} className="hidden sm:block relative">
        <div className="relative flex items-center">
          <label htmlFor={searchInputId} className="sr-only">
            Quick search destinations, DSA, GATE, and career tools
          </label>
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none transition-colors group-focus-within:text-blue-600"
            aria-hidden="true"
          />
          <input
            id={searchInputId}
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="quick-search-desktop-results"
            aria-activedescendant={
              isOpen && filteredDestinations[selectedIndex]
                ? `search-item-${filteredDestinations[selectedIndex].id}`
                : undefined
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onClick={() => setIsOpen(true)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search skills, DSA, GATE..."
            className="w-48 lg:w-56 focus:w-64 transition-all duration-200 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200/90 focus:border-blue-400 rounded-full pl-9 pr-12 py-1.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20"
          />

          {/* Clear Button or Keyboard Shortcut Indicator */}
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
              aria-label="Clear search input"
            >
              <X className="h-3 w-3" />
            </button>
          ) : (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none hidden md:inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 shadow-2xs">
              {isMac ? "âŒ˜K" : "Ctrl+K"}
            </kbd>
          )}
        </div>

        {/* Desktop Results Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-96 lg:w-[440px] max-w-[calc(100vw-2rem)] bg-white/98 backdrop-blur-xl border border-slate-200/95 shadow-xl shadow-slate-900/10 rounded-2xl overflow-hidden z-50 text-slate-800"
            >
              {/* Category / Context Bar */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-100 bg-slate-50/70 text-[11px] font-medium text-slate-500">
                <span>{query.trim() ? "Search Results" : "Suggested Quick Destinations"}</span>
                <span className="text-[10px] text-slate-400">
                  {filteredDestinations.length} {filteredDestinations.length === 1 ? "destination" : "destinations"}
                </span>
              </div>

              {/* Scrollable Results List */}
              <div
                id="quick-search-desktop-results"
                ref={listRef}
                role="listbox"
                className="max-h-[380px] overflow-y-auto p-1.5 divide-y divide-slate-50 focus:outline-none"
              >
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((dest, index) => {
                    const isSelected = index === selectedIndex;
                    const IconComponent = dest.icon;

                    return (
                      <div
                        key={dest.id}
                        id={`search-item-${dest.id}`}
                        data-index={index}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(dest)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50/90 text-blue-950"
                            : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div
                          className={`mt-0.5 p-2 rounded-lg shrink-0 transition-colors ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-xs shadow-blue-500/30"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs font-semibold truncate ${
                                isSelected ? "text-blue-900" : "text-slate-900"
                              }`}
                            >
                              {dest.title}
                            </span>
                            <span
                              className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                                isSelected
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {dest.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {dest.description}
                          </p>
                        </div>

                        <ArrowRight
                          className={`h-3.5 w-3.5 self-center shrink-0 transition-transform ${
                            isSelected
                              ? "text-blue-600 translate-x-0.5 opacity-100"
                              : "text-slate-300 opacity-0 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 px-4 text-center space-y-2">
                    <div className="h-9 w-9 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                      <Search className="h-4 w-4" />
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      No matching destinations for &ldquo;{query}&rdquo;
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                      Try searching for topics like <span className="font-medium text-slate-700">DSA</span>,{" "}
                      <span className="font-medium text-slate-700">GATE</span>,{" "}
                      <span className="font-medium text-slate-700">Resume</span>, or{" "}
                      <span className="font-medium text-slate-700">Roadmap</span>.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline pt-1"
                    >
                      Clear query
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop Footer Shortcuts Guide */}
              <div className="px-3 py-2 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">â†‘</kbd>
                    <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">â†“</kbd>
                    <span>navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">â†µ</kbd>
                    <span>select</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[9px]">esc</kbd>
                    <span>close</span>
                  </span>
                </div>
                <span className="font-medium text-slate-400 hidden sm:inline">SyncRole Quick Search</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Search Trigger Button */}
      {renderMobileTrigger && (
        <button
          type="button"
          onClick={openMobile}
          className="sm:hidden p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Open Quick Search"
        >
          <Search className="h-4.5 w-4.5" />
        </button>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MOBILE APP-LIKE QUICK SEARCH MODAL (Full Touch & PWA-Ready)   */}
      {/* ------------------------------------------------------------- */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed inset-0 z-[70] sm:hidden flex flex-col bg-white h-[100dvh] w-screen max-w-full overflow-hidden"
              >
                {/* Backdrop / Safe Area Top Bar */}
                <div
                  className="bg-white border-b border-slate-200/90 px-4 py-3 flex items-center gap-2.5 shadow-2xs shrink-0"
                  style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))" }}
                >
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                      ref={mobileInputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search skills, DSA, GATE..."
                      className="w-full bg-slate-100 border border-slate-200 rounded-full pl-9.5 pr-8 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          mobileInputRef.current?.focus();
                        }}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                        aria-label="Clear query"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={closeMobile}
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 active:scale-95 transition-transform shrink-0"
                  >
                    Cancel
                  </button>
                </div>

                {/* Mobile Scrollable Results Area */}
                <div
                  className="flex-1 min-h-0 overflow-y-auto px-4 py-3 divide-y divide-slate-100 overscroll-contain"
                  style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom, 0px))" }}
                >
                  <div className="pb-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                    {query.trim() ? "Matching Destinations" : "Recommended Destinations"}
                  </div>

                  {filteredDestinations.length > 0 ? (
                    <div className="space-y-1 pt-1">
                      {filteredDestinations.map((dest) => {
                        const IconComponent = dest.icon;
                        return (
                          <button
                            key={dest.id}
                            type="button"
                            onClick={() => handleSelect(dest)}
                            className="w-full text-left flex items-start gap-3.5 py-3 px-2 rounded-xl active:bg-slate-100 transition-colors cursor-pointer min-h-[48px]"
                          >
                            <div className="mt-0.5 p-2.5 rounded-xl bg-slate-100 text-blue-600 shrink-0">
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5 flex-wrap">
                                <span className="text-sm font-semibold text-slate-900 truncate">
                                  {dest.title}
                                </span>
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                                  {dest.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                                {dest.description}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-300 self-center shrink-0 ml-1" />
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                        <Search className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          No results for &ldquo;{query}&rdquo;
                        </p>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                          Search for DSA problems, GATE 2027 Hub, resume analysis, or career roadmaps.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          mobileInputRef.current?.focus();
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 pt-2"
                      >
                        Reset Search
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

