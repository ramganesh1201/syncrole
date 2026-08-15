import { createFileRoute, Link, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  MoreHorizontal,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target,
  ArrowRight,
  Award,
  RotateCcw,
  Sparkles,
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

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            to="/dashboard/dsa"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="h-3 w-3" /> Back to DSA Command Center
          </Link>
          <h1 className="font-display text-3xl font-bold flex items-center gap-3">
            <span>SyncRole DSA Practice Engine</span>
            <span className="text-xs bg-aurora/10 text-aurora border border-aurora/20 px-2.5 py-1 rounded-full font-sans font-medium">
              Interactive Workspace
            </span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Practice algorithms, track your active coding time, and build interview readiness inside SyncRole.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/dsa-roadmap"
            className="glass rounded-xl px-4 py-2.5 text-xs font-semibold hover:bg-white/10 transition flex items-center gap-2 border border-white/10"
          >
            <BrainCircuit className="w-4 h-4 text-aurora" /> Roadmap View
          </Link>
        </div>
      </div>

      {/* Filter Presets */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
        {[
          { id: "all", label: "All Problems" },
          { id: "blind75", label: "Blind 75" },
          { id: "neetcode150", label: "NeetCode 150" },
        ].map((list) => (
          <button
            key={list.id}
            onClick={() => {
              const newList = list.id === "all" ? undefined : list.id;
              router.navigate({
                to: "/dsa-problems",
                search: (prev: any) => ({ ...prev, list: newList }),
              });
            }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition ${
              filters.list === list.id || (list.id === "all" && !filters.list)
                ? "bg-aurora text-primary-foreground shadow-lg shadow-aurora/20 font-semibold"
                : "glass hover:bg-white/10 text-muted-foreground"
            }`}
          >
            {list.label}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-strong rounded-3xl p-4 border border-white/5 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            {/* Difficulty Filter */}
            <Select
              value={searchParams.difficulty ?? "all"}
              onValueChange={(val) => {
                const diff = val === "all" ? "" : val;
                router.navigate({
                  to: "/dsa-problems",
                  search: (prev: any) => ({ ...prev, difficulty: diff || undefined }),
                });
              }}
            >
              <SelectTrigger className="glass rounded-full px-4 py-2 text-sm border-none shadow-none w-[140px] h-auto">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Topic Filter */}
            <Select
              value={searchParams.topic ?? "all"}
              onValueChange={(val) => {
                const topic = val === "all" ? "" : val;
                router.navigate({
                  to: "/dsa-problems",
                  search: (prev: any) => ({ ...prev, topic: topic || undefined }),
                });
              }}
            >
              <SelectTrigger className="glass rounded-full px-4 py-2 text-sm border-none shadow-none w-[180px] h-auto">
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

            {(searchParams.difficulty || searchParams.topic) && (
              <button
                onClick={() =>
                  router.navigate({ to: "/dsa-problems", search: {} as any })
                }
                className="px-3 py-2 rounded-full text-xs bg-white/10 hover:bg-white/15 transition"
              >
                Clear
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search problem, pattern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass rounded-full pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-aurora/50"
            />
          </div>
        </div>

        {/* Problem List */}
        <div className="space-y-3 pt-2">
          {loading && problems.length === 0 ? (
            <div className="grid place-items-center py-12">
              <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
            </div>
          ) : problems.length === 0 ? (
            <div className="text-center py-12 glass-strong rounded-3xl border border-white/5">
              <Code2 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <div className="font-medium">No problems found</div>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your filters or search query.
              </p>
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
                    className={`glass-strong rounded-2xl p-5 flex flex-col gap-4 lg:flex-row lg:items-center justify-between transition group border ${
                      isSolved
                        ? "border-green-500/20 bg-green-500/5"
                        : hasStarted
                        ? "border-aurora/20 bg-aurora/5"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex-1 space-y-3">
                      <div className="font-display font-bold text-lg flex items-center gap-3">
                        <span
                          className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md font-sans ${
                            problem.difficulty?.toLowerCase() === "easy"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : problem.difficulty?.toLowerCase() === "medium"
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                        <span className="text-white">{problem.title}</span>
                        {isSolved && (
                          <span className="flex items-center text-green-400 text-xs bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/20 font-sans font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Solved
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
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
                          <span className="text-muted-foreground ml-2">
                            Acc: {problem.acceptance_rate}%
                          </span>
                        )}
                        {problem.estimated_solving_time && (
                          <span className="text-muted-foreground flex items-center gap-1 ml-1">
                            <Clock className="w-3 h-3" /> {problem.estimated_solving_time}m
                          </span>
                        )}
                      </div>

                      {/* Company tags & Progress line */}
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
                          <div className="text-[11px] text-muted-foreground font-mono flex items-center gap-2">
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

                    {/* Right column: Action CTAs */}
                    <div className="flex flex-col gap-3 lg:items-end justify-between lg:h-full border-t border-white/5 pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6">
                      <div className="flex items-center gap-2 self-start lg:self-end">
                        <button
                          onClick={() =>
                            updateProgress(problem.id, { is_favorite: !isFavorite })
                          }
                          className={`p-2 rounded-full transition-colors ${
                            isFavorite
                              ? "text-yellow-400 bg-yellow-400/10"
                              : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                          }`}
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
                          className={`p-2 rounded-full transition-colors ${
                            isBookmarked
                              ? "text-aurora bg-aurora/10"
                              : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                          }`}
                        >
                          <Bookmark
                            className="w-4 h-4"
                            fill={isBookmarked ? "currentColor" : "none"}
                          />
                        </button>
                        <div className="text-xs font-mono font-bold text-aurora bg-aurora/10 px-2 py-1 rounded ml-2">
                          +{problem.xp_reward} XP
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full lg:w-auto">
                        {/* Unified Primary Action for EVERY problem: Open SyncRole Practice Workspace */}
                        <Link
                          to="/dsa-workspace/$problemId"
                          params={{ problemId: problem.id }}
                          className={`flex-1 lg:flex-none justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition flex items-center gap-2 shadow-lg ${
                            isSolved
                              ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 shadow-green-500/10"
                              : hasStarted
                              ? "bg-aurora/80 text-white hover:bg-aurora shadow-aurora/20"
                              : "bg-aurora text-primary-foreground hover:bg-aurora/90 shadow-aurora/20"
                          }`}
                        >
                          {isSolved ? (
                            <>
                              <RotateCcw className="w-4 h-4" /> Practice Again
                            </>
                          ) : hasStarted ? (
                            <>
                              <Code2 className="w-4 h-4" /> Continue Practice
                            </>
                          ) : (
                            <>
                              <Code2 className="w-4 h-4" /> Practice
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
                    className="glass px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Load More Problems"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
