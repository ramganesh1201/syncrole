import { createFileRoute, Link, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Code2, Search, Filter, Star, Bookmark, Clock, SlidersHorizontal, LayoutGrid, CheckCircle2, MoreHorizontal, BrainCircuit, ChevronLeft, ChevronRight, TrendingUp, Target, ArrowRight, Award } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DSAService } from "@/lib/services/dsa.service";

type SearchParams = { topic?: string; difficulty?: string };

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  xp_reward: number;
  companies: string[] | null;
  leetcode_url: string | null;
  topic_id: string;
  subtopic: string | null;
  frequency: number | null;
  acceptance_rate: number | null;
  estimated_solving_time: number | null;
  problem_pattern: string | null;
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

type ProblemProgress = {
  id: string;
  problem_id: string;
  status: "not_started" | "attempted" | "solved";
  solved: boolean;
  last_attempted: string | null;
  is_bookmarked: boolean | null;
  is_favorite: boolean | null;
};

export const Route = createFileRoute("/_authenticated/dsa-problems")({
  component: DSAProblemsPage,
  head: () => ({ meta: [{ title: "Problem Bank — SyncRole" }] }),
  validateSearch: (search: unknown) => {
    const query = search as Record<string, string | undefined>;
    return {
      topic: query.topic ?? undefined,
      difficulty: query.difficulty ?? undefined,
    } as SearchParams;
  },
});

function DSAProblemsPage() {
  const router = useRouter();
  const searchParams = useSearch({ from: "/_authenticated/dsa-problems" }) as SearchParams;
  const [problems, setProblems] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userProgress, setUserProgress] = useState<Map<string, ProblemProgress>>(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const [totalCount, setTotalCount] = useState(0);

  const [counts, setCounts] = useState({ easy: 0, medium: 0, hard: 0 });

  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState({
    solvedStatus: 'all',
    list: 'all',
    bookmark: 'all',
    sortBy: 'difficulty',
  });

  // Fetch initial aggregate counts
  useEffect(() => {
    Promise.all([
      supabase.from('dsa_problems').select('*', { count: 'exact', head: true }).ilike('difficulty', 'Easy'),
      supabase.from('dsa_problems').select('*', { count: 'exact', head: true }).ilike('difficulty', 'Medium'),
      supabase.from('dsa_problems').select('*', { count: 'exact', head: true }).ilike('difficulty', 'Hard')
    ]).then(([e, m, h]) => setCounts({ easy: e.count || 0, medium: m.count || 0, hard: h.count || 0 }));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchParams, filterState, searchTerm]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      const userRes = await supabase.auth.getUser();
      const uid = userRes.data.user?.id;

      if (topics.length === 0) {
        try {
          const tData = await DSAService.getTopics();
          if (tData && !cancelled) setTopics(tData as Topic[]);
        } catch (e) {
          console.error("Failed to fetch topics", e);
        }
      }

      try {
        const { data: probData, count } = await DSAService.getProblems(
          filterState as any,
          searchTerm,
          page - 1, // DSAService uses 0-indexed pages internally if we want, wait no, my service does page * itemsPerPage. Let's pass 0-indexed page.
          itemsPerPage,
          uid
        );

        if (cancelled) return;
        setTotalCount(count);
        const fetchedProblems = (probData || []) as Problem[];
        setProblems(fetchedProblems);

        if (uid && fetchedProblems.length > 0) {
          const ids = fetchedProblems.map(p => p.id);
          const progressMap = await DSAService.getUserProgress(uid, ids);
          if (!cancelled) {
            setUserProgress(progressMap);
          }
        }
      } catch (err: any) {
        if (!cancelled) toast.error(err.message || "Failed to load problems");
      }

      setLoading(false);
    }

    const timeout = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [searchParams, filterState, searchTerm, page]);

  async function updateProgress(problemId: string, updates: Partial<ProblemProgress>) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const uid = userData.user.id;
    
    const existing = userProgress.get(problemId);
    const prob = problems.find(p => p.id === problemId);

    try {
      const payload = await DSAService.updateProblemProgress(uid, problemId, updates, existing, prob);
      
      const nextProgress = new Map(userProgress);
      nextProgress.set(problemId, payload as ProblemProgress);
      setUserProgress(nextProgress);

      if (updates.solved !== undefined) {
        toast.success(updates.solved ? "Marked as solved!" : "Progress updated");
      } else {
        if (updates.is_bookmarked !== undefined) toast.success(updates.is_bookmarked ? "Bookmarked" : "Removed bookmark");
        if (updates.is_favorite !== undefined) toast.success(updates.is_favorite ? "Added to favorites" : "Removed from favorites");
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to update progress");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6 flex flex-col md:flex-row gap-6">
      
      {/* Sidebar Filter Panel (Desktop) */}
      <div className={`md:w-64 shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
        <div>
          <Link to="/dashboard/dsa" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-3 w-3" /> Back to Dashboard
          </Link>
          <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2"><Filter className="w-4 h-4" /> Filters</h2>
        </div>

        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Status</div>
            <div className="flex flex-col gap-1 text-sm">
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.solvedStatus === 'all'} onChange={() => setFilterState(s => ({ ...s, solvedStatus: 'all' }))} className="accent-aurora" /> All
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.solvedStatus === 'solved'} onChange={() => setFilterState(s => ({ ...s, solvedStatus: 'solved' }))} className="accent-green-500" /> Solved
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.solvedStatus === 'unsolved'} onChange={() => setFilterState(s => ({ ...s, solvedStatus: 'unsolved' }))} className="accent-aurora" /> Unsolved
              </label>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Curated Lists</div>
            <div className="flex flex-col gap-1 text-sm">
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.list === 'all'} onChange={() => setFilterState(s => ({ ...s, list: 'all' }))} className="accent-aurora" /> None
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.list === 'blind75'} onChange={() => setFilterState(s => ({ ...s, list: 'blind75' }))} className="accent-aurora" /> Blind 75
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.list === 'neetcode150'} onChange={() => setFilterState(s => ({ ...s, list: 'neetcode150' }))} className="accent-aurora" /> NeetCode 150
              </label>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Saved</div>
            <div className="flex flex-col gap-1 text-sm">
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.bookmark === 'all'} onChange={() => setFilterState(s => ({ ...s, bookmark: 'all' }))} className="accent-aurora" /> All
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.bookmark === 'bookmarked'} onChange={() => setFilterState(s => ({ ...s, bookmark: 'bookmarked' }))} className="accent-aurora" /> Bookmarked
              </label>
              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/5 rounded">
                <input type="radio" checked={filterState.bookmark === 'favorite'} onChange={() => setFilterState(s => ({ ...s, bookmark: 'favorite' }))} className="accent-yellow-500" /> Favorites
              </label>
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Sort By</div>
            <Select 
              value={filterState.sortBy} 
              onValueChange={val => setFilterState(s => ({ ...s, sortBy: val }))}
            >
              <SelectTrigger className="w-full glass rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-aurora/50 border-none shadow-none text-muted-foreground h-auto">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="popularity">Popularity / Freq</SelectItem>
                <SelectItem value="acceptance">Acceptance Rate</SelectItem>
                <SelectItem value="newest">Recommended Order</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <h1 className="font-display text-4xl font-bold flex items-center justify-between">
            Problem Library
            <button onClick={() => setShowFilters(!showFilters)} className="md:hidden p-2 glass rounded-full">
              <SlidersHorizontal className="w-5 h-5 text-aurora" />
            </button>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Master {totalCount} highly-curated interview questions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex flex-wrap gap-2 items-center flex-1">
            {(["easy", "medium", "hard"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => {
                  router.navigate({ to: "/dsa-problems", search: (prev: any) => ({ ...prev, difficulty: prev.difficulty?.toLowerCase() === diff ? undefined : diff }) });
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${searchParams.difficulty?.toLowerCase() === diff ? "bg-aurora text-primary-foreground" : "glass"}`}
              >
                {diff === "easy" ? "🟢" : diff === "medium" ? "🟡" : "🔴"} {diff} ({counts[diff]})
              </button>
            ))}

            <Select
              value={searchParams.topic ?? "all"}
              onValueChange={(val) => {
                const topic = val === "all" ? "" : val;
                router.navigate({ to: "/dsa-problems", search: (prev: any) => ({ ...prev, topic: topic || undefined }) });
              }}
            >
              <SelectTrigger className="glass rounded-full px-4 py-2 text-sm border-none shadow-none w-[180px] h-auto">
                <SelectValue placeholder="All topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All topics</SelectItem>
                {topics.map((topic) => <SelectItem key={topic.id} value={topic.id}>{topic.name}</SelectItem>)}
              </SelectContent>
            </Select>

            {(searchParams.difficulty || searchParams.topic) && (
              <button onClick={() => router.navigate({ to: "/dsa-problems", search: {} as any })} className="px-3 py-2 rounded-full text-xs bg-white/10 hover:bg-white/15">
                Clear
              </button>
            )}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, pattern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass rounded-full pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:ring-1 focus:ring-aurora/50"
            />
          </div>
        </div>

        <div className="space-y-3">
          {loading && problems.length === 0 ? (
            <div className="grid place-items-center py-12"><div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" /></div>
          ) : problems.length === 0 ? (
            <div className="text-center py-12 glass-strong rounded-3xl border border-white/5">
              <Code2 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <div className="font-medium">No problems found</div>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              {problems.map((problem) => {
                const progress = userProgress.get(problem.id);
                const isSolved = progress?.solved;
                const isBookmarked = progress?.is_bookmarked;
                const isFavorite = progress?.is_favorite;

                return (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`glass-strong rounded-2xl p-5 flex flex-col gap-4 lg:flex-row lg:items-center justify-between transition group border ${isSolved ? 'border-green-500/20 bg-green-500/5' : 'border-white/5 hover:border-white/10'}`}
                  >
                    <div className="flex-1 space-y-3">
                      <div className="font-display font-bold text-lg flex items-center gap-3">
                        <span className={`text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md ${
                            problem.difficulty?.toLowerCase() === "easy" ? "bg-green-500/10 text-green-400 border border-green-500/20" : 
                            problem.difficulty?.toLowerCase() === "medium" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : 
                            "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}>
                          {problem.difficulty}
                        </span>
                        <span>{problem.title}</span>
                        {isSolved && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <LayoutGrid className="w-3.5 h-3.5" /> 
                          {topics.find((topic) => topic.id === problem.topic_id)?.name ?? "Topic"}
                        </span>
                        
                        {problem.blind75 && <span className="bg-aurora/20 text-aurora px-2 py-0.5 rounded-full border border-aurora/30 font-medium">Blind 75</span>}
                        {problem.neetcode150 && <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-medium">NeetCode 150</span>}
                        {problem.acceptance_rate && <span className="text-muted-foreground ml-2">Acc: {problem.acceptance_rate}%</span>}
                        {problem.estimated_solving_time && <span className="text-muted-foreground flex items-center gap-1 ml-1"><Clock className="w-3 h-3" /> {problem.estimated_solving_time}m</span>}
                      </div>

                      {problem.companies && problem.companies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {problem.companies.slice(0, 3).map(c => (
                            <span key={c} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-primary/70 border border-white/5">{c}</span>
                          ))}
                          {problem.companies.length > 3 && <span className="text-[10px] text-muted-foreground">+{problem.companies.length - 3}</span>}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end justify-between lg:h-full border-t border-white/5 pt-4 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-6">
                      <div className="flex items-center gap-2 self-start lg:self-end">
                        <button onClick={() => updateProgress(problem.id, { is_favorite: !isFavorite })} className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-yellow-400 bg-yellow-400/10' : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'}`}>
                          <Star className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
                        </button>
                        <button onClick={() => updateProgress(problem.id, { is_bookmarked: !isBookmarked })} className={`p-2 rounded-full transition-colors ${isBookmarked ? 'text-aurora bg-aurora/10' : 'text-muted-foreground hover:bg-white/10 hover:text-foreground'}`}>
                          <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                        <div className="text-xs font-mono font-bold text-aurora bg-aurora/10 px-2 py-1 rounded ml-2">+{problem.xp_reward} XP</div>
                      </div>

                      <div className="flex items-center gap-2 w-full lg:w-auto">
                        {/* Primary action: Open internal SyncRole workspace for ALL problems */}
                        <Link
                          to="/dsa-workspace/$problemId"
                          params={{ problemId: problem.id }}
                          className="flex-1 lg:flex-none justify-center rounded-xl bg-aurora px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-aurora/90 shadow-lg shadow-aurora/20 transition flex items-center gap-1.5"
                        >
                          {isSolved ? (
                            <><CheckCircle2 className="w-4 h-4" /> Practice Again</>
                          ) : (
                            <><Code2 className="w-4 h-4" /> Solve Inside SyncRole</>
                          )}
                        </Link>

                        {/* Secondary action: LeetCode link if available */}
                        {problem.leetcode_url && (
                          <a
                            href={problem.leetcode_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-none justify-center rounded-xl bg-white/5 px-3 py-2.5 text-xs font-medium hover:bg-white/10 transition flex items-center gap-1 border border-white/10 text-muted-foreground hover:text-foreground"
                            title="View on LeetCode"
                          >
                            LeetCode <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {problems.length < totalCount && (
                <div className="pt-6 pb-12 flex justify-center">
                  <button onClick={() => setPage(p => p + 1)} disabled={loading} className="glass px-8 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition disabled:opacity-50">
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
