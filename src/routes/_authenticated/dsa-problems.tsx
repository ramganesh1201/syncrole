import { createFileRoute, Link, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  Search,
  Filter,
  Star,
  Bookmark,
  Clock,
  SlidersHorizontal,
  LayoutGrid,
  CheckCircle2,
  BrainCircuit,
  RotateCcw,
  Sparkles,
  X,
  ListFilter,
  Check,
  Zap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DSAService } from "@/lib/services/dsa.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/dsa-problems")({
  component: DSAProblemsPage,
  head: () => ({ meta: [{ title: "DSA Problem Library — SyncRole" }] }),
});

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  topic_id: string;
  slug: string | null;
  xp_reward: number;
  acceptance_rate: number | null;
  frequency: number | null;
  estimated_solving_time: number | null;
  companies: string[] | null;
  tags: string[] | null;
  is_premium: boolean | null;
  recommended_order: number | null;
  importance: number | null;
  blind75: boolean | null;
  neetcode150: boolean | null;
  top150: boolean | null;
  grind75: boolean | null;
  has_internal_engine: boolean | null;
};

type Topic = { id: string; name: string };

function DSAProblemsPage() {
  const router = useRouter();
  const searchParams = useSearch({ from: "/_authenticated/dsa-problems" }) as any;

  const [problems, setProblems] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userProgress, setUserProgress] = useState<Map<string, any>>(new Map());
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const ITEMS_PER_PAGE = 20;

  // Filter state synced with search params
  const filters = {
    sortBy: searchParams.sortBy ?? "default",
    topic: searchParams.topic ?? "",
    difficulty: searchParams.difficulty ?? "",
    list: searchParams.list ?? "all",
    solvedStatus: searchParams.solvedStatus ?? "all",
    bookmark: searchParams.bookmark ?? "all",
  };

  useEffect(() => {
    async function init() {
      try {
        const topicList = await DSAService.getTopics();
        setTopics(topicList ?? []);
      } catch (err) {
        console.error("Failed to load topics:", err);
      }
    }
    init();
  }, []);

  useEffect(() => {
    async function fetchProblems() {
      setLoading(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData.user?.id;

        const { data, count } = await DSAService.getProblems(
          filters,
          searchTerm,
          page,
          ITEMS_PER_PAGE,
          userId
        );

        setProblems(data as Problem[]);
        setTotalCount(count);

        if (userId && data && data.length > 0) {
          const problemIds = data.map((p) => p.id);
          const progressMap = await DSAService.getUserProgress(userId, problemIds);
          setUserProgress(progressMap);
        }
      } catch (err) {
        console.error("Failed to load problems:", err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(fetchProblems, 300);
    return () => clearTimeout(timer);
  }, [
    filters.sortBy,
    filters.topic,
    filters.difficulty,
    filters.list,
    filters.solvedStatus,
    filters.bookmark,
    searchTerm,
    page,
  ]);

  function updateFilter(key: string, value: string | undefined) {
    setPage(0);
    router.navigate({
      to: "/dsa-problems",
      search: (prev: any) => {
        const next = { ...prev };
        if (value && value !== "all" && value !== "default") {
          next[key] = value;
        } else {
          delete next[key];
        }
        return next;
      },
    });
  }

  function clearAllFilters() {
    setPage(0);
    setSearchTerm("");
    router.navigate({ to: "/dsa-problems", search: {} as any });
  }

  async function updateProgress(problemId: string, updates: any) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    try {
      const current = userProgress.get(problemId) || {};
      const payload = {
        user_id: userData.user.id,
        problem_id: problemId,
        ...current,
        ...updates,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("user_problem_progress")
        .upsert(payload, { onConflict: "user_id,problem_id" });

      if (error) throw error;

      setUserProgress((prev) => {
        const next = new Map(prev);
        next.set(problemId, { ...current, ...updates });
        return next;
      });
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  }

  const hasActiveFilters =
    Boolean(searchParams.difficulty) ||
    Boolean(searchParams.topic) ||
    Boolean(searchParams.list) ||
    Boolean(searchParams.solvedStatus) ||
    Boolean(searchParams.bookmark) ||
    Boolean(searchParams.sortBy) ||
    Boolean(searchTerm.trim());

  // Shared Sidebar Content Component
  const SidebarContent = () => (
    <div className="space-y-6">
      {/* STATUS */}
      <div className="space-y-2.5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Status</span>
          {filters.solvedStatus !== "all" && (
            <span className="text-[10px] text-aurora font-mono">Active</span>
          )}
        </div>
        <div className="space-y-1">
          {[
            { id: "all", label: "All Problems" },
            { id: "solved", label: "Solved" },
            { id: "unsolved", label: "Unsolved" },
          ].map((opt) => {
            const isSelected = filters.solvedStatus === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => updateFilter("solvedStatus", opt.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-aurora/15 text-aurora border border-aurora/30 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-aurora bg-aurora text-primary-foreground"
                        : "border-white/20 bg-black/20"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CURATED LISTS */}
      <div className="space-y-2.5 pt-4 border-t border-white/5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Curated Lists</span>
          {filters.list !== "all" && (
            <span className="text-[10px] text-aurora font-mono">Active</span>
          )}
        </div>
        <div className="space-y-1">
          {[
            { id: "all", label: "None (All Problems)" },
            { id: "blind75", label: "Blind 75" },
            { id: "neetcode150", label: "NeetCode 150" },
          ].map((opt) => {
            const isSelected = filters.list === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => updateFilter("list", opt.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-aurora/15 text-aurora border border-aurora/30 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-aurora bg-aurora text-primary-foreground"
                        : "border-white/20 bg-black/20"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
                {opt.id === "blind75" && (
                  <span className="text-[9px] bg-aurora/20 text-aurora px-1.5 py-0.5 rounded font-mono">
                    75
                  </span>
                )}
                {opt.id === "neetcode150" && (
                  <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                    150
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SAVED */}
      <div className="space-y-2.5 pt-4 border-t border-white/5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
          <span>Saved</span>
          {filters.bookmark !== "all" && (
            <span className="text-[10px] text-aurora font-mono">Active</span>
          )}
        </div>
        <div className="space-y-1">
          {[
            { id: "all", label: "All" },
            { id: "bookmarked", label: "Bookmarked", icon: Bookmark },
            { id: "favorite", label: "Favorites", icon: Star },
          ].map((opt) => {
            const isSelected = filters.bookmark === opt.id;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => updateFilter("bookmark", opt.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-aurora/15 text-aurora border border-aurora/30 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-aurora bg-aurora text-primary-foreground"
                        : "border-white/20 bg-black/20"
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span className="flex items-center gap-1.5">
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SORT BY */}
      <div className="space-y-2.5 pt-4 border-t border-white/5">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Sort By
        </div>
        <Select
          value={filters.sortBy}
          onValueChange={(val) => updateFilter("sortBy", val)}
        >
          <SelectTrigger className="w-full glass rounded-xl px-3 py-2 text-xs border-white/10 h-9 bg-black/20 focus:ring-1 focus:ring-aurora/50">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">XP Reward (Default)</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
            <SelectItem value="popularity">Popularity / Frequency</SelectItem>
            <SelectItem value="acceptance">Acceptance Rate</SelectItem>
            <SelectItem value="newest">Recommended Order</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CLEAR ALL BUTTON */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full mt-2 py-2 px-3 rounded-xl glass text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 border border-white/10"
          aria-label="Clear all active filters"
        >
          <X className="w-3.5 h-3.5" /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6">
      {/* Page Header (Clean, Linear/Vercel Workspace Style) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            to="/dashboard/dsa"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to DSA Command Center
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight flex flex-wrap items-center gap-2.5">
            <span>SyncRole DSA Problem Library</span>
            <span className="text-[11px] font-sans font-medium bg-aurora/10 text-aurora border border-aurora/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-aurora" /> Internal Engine
            </span>
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Master algorithms with interactive code execution, autosaved drafts, and verified solution tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden glass rounded-xl px-4 py-2.5 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 border border-white/10 text-aurora"
            aria-label="Toggle filters menu"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-aurora animate-pulse" />
            )}
          </button>

          {/* Roadmap View Button */}
          <Link
            to="/dsa-roadmap"
            className="glass rounded-xl px-4 py-2.5 text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-2 border border-white/10 text-foreground"
          >
            <BrainCircuit className="w-4 h-4 text-aurora" /> Roadmap View
          </Link>
        </div>
      </div>

      {/* Mobile Filters Drawer / Modal */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong rounded-3xl p-5 border border-white/10 overflow-hidden space-y-4"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-aurora" /> Filter Problems
              </h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-muted-foreground transition-colors"
                aria-label="Close filters menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two-Column Desktop Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* LEFT SIDEBAR (Desktop / Tablet) */}
        <aside className="hidden lg:block w-64 shrink-0 glass-strong rounded-3xl p-5 border border-white/5 space-y-6 sticky top-20">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-aurora" /> Filters
            </h3>
            {hasActiveFilters && (
              <span className="text-[10px] bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full font-mono">
                Active
              </span>
            )}
          </div>
          <SidebarContent />
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0 space-y-4 w-full">
          {/* Top Bar Controls (Search, Difficulty, Topic) */}
          <div className="glass-strong rounded-3xl p-4 border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                {/* Difficulty Select */}
                <Select
                  value={filters.difficulty || "all"}
                  onValueChange={(val) => updateFilter("difficulty", val)}
                >
                  <SelectTrigger className="glass rounded-full px-4 py-2 text-xs font-medium border-none shadow-none w-[140px] h-9">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>

                {/* Topic Select */}
                <Select
                  value={filters.topic || "all"}
                  onValueChange={(val) => updateFilter("topic", val)}
                >
                  <SelectTrigger className="glass rounded-full px-4 py-2 text-xs font-medium border-none shadow-none w-[170px] h-9">
                    <SelectValue placeholder="All topics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All topics</SelectItem>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clean Search Input with Magnifying Glass Icon */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search title, pattern..."
                  value={searchTerm}
                  onChange={(e) => {
                    setPage(0);
                    setSearchTerm(e.target.value);
                  }}
                  className="w-full glass rounded-full pl-9 pr-4 py-2 text-xs placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-aurora/50 h-9"
                />
              </div>
            </div>

            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5 text-[11px]">
                <span className="text-muted-foreground mr-1">Active:</span>
                {filters.solvedStatus !== "all" && (
                  <span className="bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full flex items-center gap-1 capitalize">
                    {filters.solvedStatus}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => updateFilter("solvedStatus", "all")}
                      aria-label="Remove status filter"
                    />
                  </span>
                )}
                {filters.list !== "all" && (
                  <span className="bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    {filters.list}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => updateFilter("list", "all")}
                      aria-label="Remove list filter"
                    />
                  </span>
                )}
                {filters.difficulty && (
                  <span className="bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full flex items-center gap-1 capitalize">
                    {filters.difficulty}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => updateFilter("difficulty", "all")}
                      aria-label="Remove difficulty filter"
                    />
                  </span>
                )}
                {filters.topic && (
                  <span className="bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    {topics.find((t) => t.id === filters.topic)?.name ?? "Topic"}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => updateFilter("topic", "all")}
                      aria-label="Remove topic filter"
                    />
                  </span>
                )}
                {filters.bookmark !== "all" && (
                  <span className="bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full flex items-center gap-1 capitalize">
                    {filters.bookmark}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => updateFilter("bookmark", "all")}
                      aria-label="Remove bookmark filter"
                    />
                  </span>
                )}
                {searchTerm.trim() && (
                  <span className="bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                    "{searchTerm}"
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => setSearchTerm("")}
                      aria-label="Remove search term"
                    />
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-muted-foreground hover:text-white underline ml-1"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Problem Cards List */}
          <div className="space-y-3">
            {loading && problems.length === 0 ? (
              <div className="grid place-items-center py-16 glass-strong rounded-3xl border border-white/5">
                <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
              </div>
            ) : problems.length === 0 ? (
              <div className="text-center py-16 glass-strong rounded-3xl border border-white/5 space-y-3">
                <Code2 className="h-10 w-10 text-muted-foreground mx-auto" />
                <div className="font-medium text-white">No problems found</div>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Try clearing your filters or search term to see more problems.
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-2 glass px-4 py-2 rounded-full text-xs text-aurora hover:bg-white/10 transition-colors"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {problems.map((problem) => {
                  const progress = userProgress.get(problem.id);
                  const isSolved = progress?.solved;
                  const isBookmarked = progress?.is_bookmarked;
                  const isFavorite = progress?.is_favorite;
                  const status = progress?.status ?? (isSolved ? "solved" : "not_started");
                  const hasStarted = status === "in_progress" || status === "attempted";

                  return (
                    <motion.div
                      key={problem.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`glass-strong rounded-2xl p-5 flex flex-col gap-4 lg:flex-row lg:items-center justify-between transition-colors group border ${
                        isSolved
                          ? "border-green-500/20 bg-green-500/5"
                          : hasStarted
                          ? "border-aurora/20 bg-aurora/5"
                          : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex-1 space-y-3 min-w-0">
                        <div className="font-display font-semibold text-base flex flex-wrap items-center gap-2.5">
                          <span
                            className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md font-sans font-semibold ${
                              problem.difficulty?.toLowerCase() === "easy"
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : problem.difficulty?.toLowerCase() === "medium"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {problem.difficulty}
                          </span>
                          <span className="text-white truncate">{problem.title}</span>
                          {isSolved && (
                            <span className="inline-flex items-center text-green-400 text-xs bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20 font-sans font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Solved
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-muted-foreground inline-flex items-center gap-1">
                            <LayoutGrid className="w-3.5 h-3.5" />
                            {topics.find((topic) => topic.id === problem.topic_id)?.name ??
                              "Algorithms"}
                          </span>

                          {problem.blind75 && (
                            <span className="bg-aurora/20 text-aurora px-2 py-0.5 rounded-full border border-aurora/30 font-medium text-[10px]">
                              Blind 75
                            </span>
                          )}
                          {problem.neetcode150 && (
                            <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-medium text-[10px]">
                              NeetCode 150
                            </span>
                          )}
                          {problem.acceptance_rate && (
                            <span className="text-muted-foreground ml-1">
                              Acc: {problem.acceptance_rate}%
                            </span>
                          )}
                          {problem.estimated_solving_time && (
                            <span className="text-muted-foreground inline-flex items-center gap-1 ml-1">
                              <Clock className="w-3.5 h-3.5" /> {problem.estimated_solving_time}m
                            </span>
                          )}
                        </div>

                        {/* Company Tags & Recent Run Counts */}
                        <div className="flex flex-wrap items-center gap-3">
                          {problem.companies && problem.companies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {problem.companies.slice(0, 3).map((c) => (
                                <span
                                  key={c}
                                  className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-primary/70 border border-white/5"
                                >
                                  {c}
                                </span>
                              ))}
                              {problem.companies.length > 3 && (
                                <span className="text-[10px] text-muted-foreground">
                                  +{problem.companies.length - 3}
                                </span>
                              )}
                            </div>
                          )}

                          {progress && (progress.run_count > 0 || progress.submission_count > 0) && (
                            <div className="text-[11px] text-muted-foreground font-mono inline-flex items-center gap-2">
                              <span className="text-aurora font-medium capitalize">
                                {progress.status === "solved" ? "✓ Verified Solved" : progress.status}
                              </span>
                              <span>•</span>
                              <span>{progress.run_count ?? 0} runs</span>
                              <span>•</span>
                              <span>{progress.submission_count ?? 0} submissions</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right column: Action CTAs & Star/Bookmark */}
                      <div className="flex flex-col gap-3 lg:items-end justify-between lg:h-full border-t border-white/5 pt-3 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-5 shrink-0">
                        <div className="flex items-center gap-2 self-start lg:self-end">
                          <button
                            onClick={() =>
                              updateProgress(problem.id, { is_favorite: !isFavorite })
                            }
                            className={`p-1.5 rounded-full transition-colors ${
                              isFavorite
                                ? "text-yellow-400 bg-yellow-400/10"
                                : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                            }`}
                            title="Favorite problem"
                            aria-label="Favorite problem"
                          >
                            <Star
                              className="w-4 h-4"
                              fill={isFavorite ? "currentColor" : "none"}
                            />
                          </button>
                          <button
                            onClick={() =>
                              updateProgress(problem.id, { is_bookmarked: !isBookmarked })
                            }
                            className={`p-1.5 rounded-full transition-colors ${
                              isBookmarked
                                ? "text-aurora bg-aurora/10"
                                : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                            }`}
                            title="Bookmark problem"
                            aria-label="Bookmark problem"
                          >
                            <Bookmark
                              className="w-4 h-4"
                              fill={isBookmarked ? "currentColor" : "none"}
                            />
                          </button>
                          <div className="text-xs font-mono font-bold text-aurora bg-aurora/10 px-2 py-0.5 rounded ml-1 inline-flex items-center gap-1">
                            <Zap className="w-3 h-3 text-aurora" /> +{problem.xp_reward} XP
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full lg:w-auto">
                          {/* Primary Action: Open SyncRole Practice Workspace */}
                          <Link
                            to="/dsa-workspace/$problemId"
                            params={{ problemId: problem.id }}
                            className={`flex-1 lg:flex-none justify-center rounded-xl px-4 py-2 text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-lg ${
                              isSolved
                                ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 shadow-green-500/10"
                                : hasStarted
                                ? "bg-aurora/80 text-white hover:bg-aurora shadow-aurora/20"
                                : "bg-aurora text-primary-foreground hover:bg-aurora/90 shadow-aurora/20"
                            }`}
                          >
                            {isSolved ? (
                              <>
                                <RotateCcw className="w-3.5 h-3.5" /> Practice Again
                              </>
                            ) : hasStarted ? (
                              <>
                                <Code2 className="w-3.5 h-3.5" /> Continue Practice
                              </>
                            ) : (
                              <>
                                <Code2 className="w-3.5 h-3.5" /> Practice
                              </>
                            )}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {problems.length < totalCount && (
                  <div className="pt-6 pb-12 flex justify-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      disabled={loading}
                      className="glass px-8 py-3 rounded-full text-xs font-medium hover:bg-white/10 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Load More Problems"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </main>
  );
}
