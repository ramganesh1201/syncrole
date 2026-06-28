import { createFileRoute, Link, useRouter, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Code2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SearchParams = { topic?: string; difficulty?: string };

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  xp_reward: number;
  companies: string[] | null;
  leetcode_url: string | null;
  topic_id: string;
};

type Topic = { id: string; name: string };

type ProblemProgress = {
  id: string;
  problem_id: string;
  status: "not_started" | "attempted" | "solved";
  solved: boolean;
  last_attempted: string | null;
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
  const [filtered, setFiltered] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userProgress, setUserProgress] = useState<Map<string, ProblemProgress>>(new Map());
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProblems() {
      setLoading(true);
      const userRes = await supabase.auth.getUser();
      const uid = userRes.data.user?.id;
      const userIdForQuery = uid ?? null;

      const [problemRes, topicsRes, progressRes] = await Promise.all([
        supabase
          .from("dsa_problems")
          .select("id, title, difficulty, xp_reward, companies, leetcode_url, topic_id")
          .order("difficulty"),
        supabase.from("dsa_topics").select("id, name").order("display_order"),
        userIdForQuery
          ? supabase
              .from("user_problem_progress")
              .select("id, problem_id, status, solved, last_attempted")
              .eq("user_id", userIdForQuery)
          : Promise.resolve({ data: [], error: null }),
      ]);

      if (cancelled) return;

      setTopics((topicsRes.data ?? []) as Topic[]);

      const data = (problemRes.data ?? []) as Problem[];
      let filteredData = data;

      if (searchParams.topic) {
        filteredData = filteredData.filter((p) => p.topic_id === searchParams.topic);
      }

      if (searchParams.difficulty) {
        filteredData = filteredData.filter((p) => p.difficulty === searchParams.difficulty);
      }

      setProblems(filteredData);
      setFiltered(filteredData);
      setUserProgress(
        new Map(
          (progressRes.data ?? []).map((item: any) => [
            item.problem_id as string,
            item as ProblemProgress,
          ]),
        ),
      );
      setLoading(false);
    }

    loadProblems();

    return () => {
      cancelled = true;
    };
  }, [searchParams.topic, searchParams.difficulty]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFiltered(problems);
      return;
    }

    setFiltered(
      problems.filter((p) => {
        const title = p.title.toLowerCase();
        const topicName = topics.find((topic) => topic.id === p.topic_id)?.name.toLowerCase() ?? "";
        return title.includes(term) || topicName.includes(term);
      }),
    );
  }, [searchTerm, problems, topics]);

  const countByDifficulty = useMemo(
    () => ({
      easy: problems.filter((p) => p.difficulty === "easy").length,
      medium: problems.filter((p) => p.difficulty === "medium").length,
      hard: problems.filter((p) => p.difficulty === "hard").length,
    }),
    [problems],
  );

  async function updateProblemProgress(problem: Problem, solved: boolean) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const uid = userData.user.id;

    const now = new Date().toISOString();
    const existing = userProgress.get(problem.id);

    const payload = {
      user_id: uid,
      problem_id: problem.id,
      status: solved ? "solved" : "attempted",
      solved,
      last_attempted: now,
    };

    let progressRow: ProblemProgress | null = null;

    if (existing) {
      const { error } = await supabase
        .from("user_problem_progress")
        .update(payload)
        .eq("id", existing.id)
        .select()
        .single();

      if (error) {
        toast.error(error.message);
        return;
      }

      progressRow = { ...existing, ...payload } as ProblemProgress;
    } else {
      const { data, error } = await supabase
        .from("user_problem_progress")
        .insert(payload)
        .select()
        .single();

      if (error || !data) {
        toast.error(error?.message ?? "Unable to save progress");
        return;
      }

      progressRow = data as ProblemProgress;
    }

    const nextProgress = new Map(userProgress);
    nextProgress.set(problem.id, progressRow);
    setUserProgress(nextProgress);

    const topicProblems = problems.filter((p) => p.topic_id === problem.topic_id);
    const solvedCount = topicProblems.filter((p) => nextProgress.get(p.id)?.solved).length;
    const completedPercent = topicProblems.length
      ? Math.round((solvedCount / topicProblems.length) * 100)
      : 0;
    const masteryScore = completedPercent;

    const topicPayload = {
      user_id: uid,
      topic_id: problem.topic_id,
      completed_percent: completedPercent,
      mastery_score: masteryScore,
      last_activity: now,
    };

    const { error: topicError } = await supabase
      .from("user_topic_progress")
      .upsert(topicPayload, { onConflict: ["user_id", "topic_id"] });

    if (topicError) {
      toast.error(topicError.message);
      return;
    }

    toast.success(solved ? "Marked solved and updated topic progress" : "Progress saved");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-6">
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back to DSA Command Center
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Problem Library</h1>
        <p className="text-sm text-muted-foreground">
          Solve {problems.length} curated problems from top companies.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex flex-wrap gap-3 items-center">
          {(["easy", "medium", "hard"] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => {
                router.navigate({
                  to: "/dsa-problems",
                  search: {
                    difficulty: diff,
                    ...(searchParams.topic ? { topic: searchParams.topic } : {}),
                  },
                });
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                searchParams.difficulty === diff ? "bg-aurora text-primary-foreground" : "glass"
              }`}
            >
              {diff === "easy" ? "🟢" : diff === "medium" ? "🟡" : "🔴"} {diff} (
              {countByDifficulty[diff]})
            </button>
          ))}

          <label className="relative block">
            <span className="sr-only">Topic filter</span>
            <select
              value={searchParams.topic ?? ""}
              onChange={(e) => {
                const topic = e.target.value;
                router.navigate({
                  to: "/dsa-problems",
                  search: {
                    ...(topic ? { topic } : {}),
                    ...(searchParams.difficulty ? { difficulty: searchParams.difficulty } : {}),
                  },
                });
              }}
              className="glass rounded-full px-4 py-2 text-sm"
            >
              <option value="">All topics</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </label>

          {(searchParams.difficulty || searchParams.topic) && (
            <button
              type="button"
              onClick={() => router.navigate({ to: "/dsa-problems" })}
              className="px-3 py-2 rounded-full text-xs bg-white/10 hover:bg-white/15"
            >
              Clear
            </button>
          )}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search problems or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full glass rounded-xl pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        {loading ? (
          <div className="grid place-items-center py-12">
            <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <Code2 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No problems found.</p>
          </div>
        ) : (
          filtered.map((problem) => {
            const progress = userProgress.get(problem.id);
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between hover:bg-white/10 transition group"
              >
                <div className="flex-1">
                  <div className="font-medium flex flex-wrap items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        problem.difficulty === "easy"
                          ? "bg-green-500/20 text-green-400"
                          : problem.difficulty === "medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                    {problem.title}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 rounded-full bg-white/5">
                      Topic:{" "}
                      {topics.find((topic) => topic.id === problem.topic_id)?.name ?? "Unknown"}
                    </span>
                    {problem.companies?.map((company) => (
                      <span key={company} className="px-2 py-1 rounded-full bg-white/5">
                        {company}
                      </span>
                    ))}
                    {progress ? (
                      <span className="px-2 py-1 rounded-full bg-aurora/10 text-aurora">
                        {progress.solved
                          ? "Solved"
                          : progress.status === "attempted"
                            ? "Attempted"
                            : "Not started"}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col gap-3 items-start md:items-end">
                  <div className="text-sm font-mono text-aurora">+{problem.xp_reward} XP</div>
                  <div className="flex gap-2 flex-wrap">
                    {problem.leetcode_url ? (
                      <a
                        href={problem.leetcode_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition"
                      >
                        <ArrowUpRight className="inline h-3.5 w-3.5" /> Open
                      </a>
                    ) : null}

                    {progress?.solved ? (
                      <span className="rounded-full bg-green-500/10 px-3 py-2 text-xs text-green-400">
                        Solved
                      </span>
                    ) : (
                      <button
                        onClick={() => updateProblemProgress(problem, true)}
                        className="rounded-full bg-aurora px-3 py-2 text-xs text-primary-foreground hover:bg-aurora/90 transition"
                      >
                        Mark solved
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </main>
  );
}
