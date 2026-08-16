import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Briefcase,
  Activity,
  Code2,
  Users,
  Layers,
  Plus,
  Target,
  Sparkles,
  TrendingUp,
  AlertCircle,
  X,
  ChevronRight,
  Clock,
  Play,
  RotateCcw,
  Building2,
  Compass,
  Lock,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dsa-companies")({
  component: DSACompaniesPage,
  head: () => ({ meta: [{ title: "Target Companies & Strategy — SyncRole" }] }),
});

type Company = {
  id: string;
  company_name: string;
  description: string | null;
  interview_frequency: string | null;
  focus_topics: string[] | null;
  top_topics: string[] | null;
  interview_difficulty: string | null;
  oa_difficulty: string | null;
  hiring_frequency: string | null;
  recommended_preparation_order: number | null;
  question_count: number | null;
};

type UserCompanyFocus = { id: string; company_id: string };

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  topic_id: string;
  companies: string[] | null;
  tags: string[] | null;
};

type Topic = { id: string; name: string };

type UserProgress = {
  problem_id: string;
  solved: boolean;
  status: string;
  run_count: number;
  submission_count: number;
};

// Known company logo URLs (SimpleIcons CDN with white invert filter for dark mode)
const COMPANY_LOGOS: Record<string, string> = {
  Google: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
  Amazon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
  Microsoft: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg",
  Meta: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg",
  Netflix: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netflix.svg",
  Uber: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/uber.svg",
  Flipkart: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flipkart.svg",
  Atlassian: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/atlassian.svg",
  Adobe: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg",
  Apple: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg",
  Airbnb: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/airbnb.svg",
  Stripe: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg",
  LinkedIn: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg",
};

// Company Logo Component with graceful Initial-Avatar Fallback
function CompanyLogo({ name, className = "w-7 h-7" }: { name: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const logoUrl = COMPANY_LOGOS[name];
  const initial = name ? name.charAt(0).toUpperCase() : "C";

  if (!logoUrl || failed) {
    return (
      <div
        className={`${className} rounded-full bg-gradient-to-br from-aurora/30 to-aurora/10 border border-aurora/40 flex items-center justify-center font-display font-bold text-aurora text-xs shadow-sm select-none`}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className={`${className} object-contain filter invert brightness-200 opacity-90 transition-opacity group-hover:opacity-100`}
    />
  );
}

function DSACompaniesPage() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [userFocus, setUserFocus] = useState<Set<string>>(new Set());
  const [problems, setProblems] = useState<Problem[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [userProgressMap, setUserProgressMap] = useState<Map<string, UserProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [activeStrategyCompany, setActiveStrategyCompany] = useState<Company | null>(null);

  async function load() {
    setLoading(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        setLoading(false);
        return;
      }
      const uid = u.user.id;

      const [compRes, focusRes, probRes, topicRes, progRes] = await Promise.all([
        supabase
          .from("company_question_sets")
          .select("*")
          .order("recommended_preparation_order", { ascending: true }),
        supabase.from("user_company_focus").select("company_id").eq("user_id", uid),
        supabase
          .from("dsa_problems")
          .select("id, title, difficulty, topic_id, companies, tags"),
        supabase.from("dsa_topics").select("id, name"),
        supabase
          .from("user_problem_progress")
          .select("problem_id, solved, status, run_count, submission_count")
          .eq("user_id", uid),
      ]);

      let sorted = (compRes.data ?? []) as Company[];
      sorted.sort((a, b) => {
        if (a.recommended_preparation_order === null && b.recommended_preparation_order === null)
          return a.company_name.localeCompare(b.company_name);
        if (a.recommended_preparation_order === null) return 1;
        if (b.recommended_preparation_order === null) return -1;
        return a.recommended_preparation_order - b.recommended_preparation_order;
      });

      setCompanies(sorted);
      setUserFocus(new Set((focusRes.data ?? []).map((f: UserCompanyFocus) => f.company_id)));
      setProblems((probRes.data ?? []) as Problem[]);
      setTopics((topicRes.data ?? []) as Topic[]);

      const progMap = new Map<string, UserProgress>();
      (progRes.data ?? []).forEach((p: any) => progMap.set(p.problem_id, p));
      setUserProgressMap(progMap);
    } catch (err) {
      console.error("Failed to load company preparation data:", err);
      toast.error("Failed to load target companies data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleCompany(companyId: string) {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const isSelected = userFocus.has(companyId);
    try {
      if (isSelected) {
        const { error } = await supabase
          .from("user_company_focus")
          .delete()
          .eq("company_id", companyId)
          .eq("user_id", u.user.id);

        if (error) throw error;
        const newFocus = new Set(userFocus);
        newFocus.delete(companyId);
        setUserFocus(newFocus);
        toast.success("Target company removed");
      } else {
        const { error } = await supabase
          .from("user_company_focus")
          .insert({ company_id: companyId, user_id: u.user.id });

        if (error) throw error;
        setUserFocus(new Set([...userFocus, companyId]));
        toast.success("Target company added!");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Failed to update target company.");
    }
  }

  // Topic map (id -> name)
  const topicMap = useMemo(() => {
    const map = new Map<string, string>();
    topics.forEach((t) => map.set(t.id, t.name));
    return map;
  }, [topics]);

  // Derive canonical solved count across all DSA problems
  const totalUserSolves = useMemo(() => {
    let count = 0;
    userProgressMap.forEach((p) => {
      if (p.solved === true || p.status === "solved") count++;
    });
    return count;
  }, [userProgressMap]);

  // Compute analytics for each company
  const companyAnalytics = useMemo(() => {
    const map = new Map<
      string,
      {
        totalRelevant: number;
        solvedCount: number;
        inProgressCount: number;
        remainingCount: number;
        readinessScore: number | null;
        coreTopics: string[];
        weakTopics: string[];
        relevantProblems: Problem[];
      }
    >();

    companies.forEach((company) => {
      const cNameLower = company.company_name.toLowerCase();
      const companyTopics = [
        ...(company.focus_topics ?? []),
        ...(company.top_topics ?? []),
      ].map((t) => t.toLowerCase());

      // Filter relevant problems
      const relevant = problems.filter((p) => {
        const matchesCompanyTag = p.companies?.some(
          (c) => c.toLowerCase() === cNameLower || c.toLowerCase().includes(cNameLower)
        );
        const tName = topicMap.get(p.topic_id)?.toLowerCase();
        const matchesTopic = tName ? companyTopics.includes(tName) : false;
        return matchesCompanyTag || matchesTopic;
      });

      let solved = 0;
      let inProgress = 0;
      const topicStats: Record<string, { total: number; solved: number }> = {};

      relevant.forEach((p) => {
        const prog = userProgressMap.get(p.id);
        const isSol = Boolean(prog?.solved === true || prog?.status === "solved");
        const isProg =
          !isSol &&
          Boolean(
            prog?.status === "in_progress" ||
              prog?.status === "attempted" ||
              (prog?.run_count ?? 0) > 0 ||
              (prog?.submission_count ?? 0) > 0
          );

        if (isSol) solved++;
        else if (isProg) inProgress++;

        const tName = topicMap.get(p.topic_id) ?? "Other";
        if (!topicStats[tName]) topicStats[tName] = { total: 0, solved: 0 };
        topicStats[tName].total++;
        if (isSol) topicStats[tName].solved++;
      });

      const totalRel = relevant.length;
      const remaining = Math.max(0, totalRel - solved);

      // Deterministic readiness: null if user has 0 solves or 0 relevant problems
      let score: number | null = null;
      if (totalUserSolves > 0 && totalRel > 0) {
        score = Math.round((solved / totalRel) * 100);
      }

      // Weak topics (<50% solved among relevant topics)
      const weakTopics = Object.entries(topicStats)
        .filter(([_, st]) => st.solved / Math.max(1, st.total) < 0.5)
        .map(([t]) => t);

      const coreTopics =
        company.focus_topics && company.focus_topics.length > 0
          ? company.focus_topics
          : Object.keys(topicStats).slice(0, 4);

      map.set(company.id, {
        totalRelevant: totalRel,
        solvedCount: solved,
        inProgressCount: inProgress,
        remainingCount: remaining,
        readinessScore: score,
        coreTopics,
        weakTopics: weakTopics.slice(0, 3),
        relevantProblems: relevant,
      });
    });

    return map;
  }, [companies, problems, topicMap, userProgressMap, totalUserSolves]);

  // Overall KPI summaries
  const targetCompanies = useMemo(() => {
    return companies.filter((c) => userFocus.has(c.id));
  }, [companies, userFocus]);

  // Relevant problem set across all selected target companies
  const targetRelevantProblems = useMemo(() => {
    const set = new Set<string>();
    targetCompanies.forEach((c) => {
      const stats = companyAnalytics.get(c.id);
      stats?.relevantProblems.forEach((p) => set.add(p.id));
    });
    return set;
  }, [targetCompanies, companyAnalytics]);

  // Count solved relevant problems across targets
  const solvedTargetRelevantCount = useMemo(() => {
    let count = 0;
    targetRelevantProblems.forEach((pid) => {
      const prog = userProgressMap.get(pid);
      if (prog?.solved === true || prog?.status === "solved") count++;
    });
    return count;
  }, [targetRelevantProblems, userProgressMap]);

  // Relevant coverage percentage across target companies
  const relevantCoveragePct = useMemo(() => {
    if (targetCompanies.length === 0 || totalUserSolves === 0 || targetRelevantProblems.size === 0) {
      return null;
    }
    return Math.round((solvedTargetRelevantCount / targetRelevantProblems.size) * 100);
  }, [targetCompanies, totalUserSolves, targetRelevantProblems, solvedTargetRelevantCount]);

  // Next Priority Topic across targets
  const nextPriorityArea = useMemo(() => {
    if (targetCompanies.length === 0) {
      return { topic: "Choose a target", detail: "Select companies below to evaluate priority topic gaps." };
    }
    if (totalUserSolves === 0) {
      return { topic: "Start DSA Practice", detail: "Solve verified DSA problems to build your preparation coverage." };
    }

    // Evaluate weak topics across targets
    const topicStats: Record<string, { total: number; solved: number }> = {};
    targetCompanies.forEach((c) => {
      const stats = companyAnalytics.get(c.id);
      stats?.relevantProblems.forEach((p) => {
        const tName = topicMap.get(p.topic_id) ?? "Algorithm";
        if (!topicStats[tName]) topicStats[tName] = { total: 0, solved: 0 };
        topicStats[tName].total++;
        const prog = userProgressMap.get(p.id);
        if (prog?.solved === true || prog?.status === "solved") topicStats[tName].solved++;
      });
    });

    let weakestTopic = "";
    let lowestPct = 999;
    let weakestSolved = 0;
    let weakestTotal = 0;

    Object.entries(topicStats).forEach(([tName, st]) => {
      const pct = st.solved / Math.max(1, st.total);
      if (pct < lowestPct) {
        lowestPct = pct;
        weakestTopic = tName;
        weakestSolved = st.solved;
        weakestTotal = st.total;
      }
    });

    if (weakestTopic) {
      return {
        topic: weakestTopic,
        detail: `${weakestSolved} of ${weakestTotal} company-relevant problems solved`,
        solved: weakestSolved,
        total: weakestTotal,
      };
    }

    return { topic: "Maintain Consistency", detail: "Coverage is strong across target topics." };
  }, [targetCompanies, totalUserSolves, companyAnalytics, topicMap, userProgressMap]);

  // Hero preparation signal status
  const heroSignal = useMemo(() => {
    if (userFocus.size === 0) {
      return {
        title: "Choose your target companies",
        subtitle: "Start by selecting the companies you're preparing for below.",
        status: "Setup Required",
      };
    }
    if (totalUserSolves === 0) {
      return {
        title: "Readiness is building",
        subtitle: `${userFocus.size} target company selected. Keep solving verified problems to unlock readiness.`,
        status: "Data Building",
      };
    }
    return {
      title: "Preparation active",
      subtitle: `Your progress is being compared against ${userFocus.size} target company requirement pools.`,
      status: "Active Tracking",
    };
  }, [userFocus.size, totalUserSolves]);

  // Overlap topics across target companies with company counts
  const targetOverlapTopicsWithCounts = useMemo(() => {
    if (targetCompanies.length === 0) return [];
    const topicCounts: Record<string, number> = {};
    targetCompanies.forEach((c) => {
      const stats = companyAnalytics.get(c.id);
      const topics = stats?.coreTopics ?? [];
      topics.forEach((t) => {
        topicCounts[t] = (topicCounts[t] ?? 0) + 1;
      });
    });
    return Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([topic, count]) => ({ topic, count }));
  }, [targetCompanies, companyAnalytics]);

  // "Recommended Next Step" Actionable Content
  const nextStepRecommendation = useMemo(() => {
    if (targetCompanies.length === 0) {
      return {
        headline: "Choose your first target company",
        text: "Select the companies below to build a focused interview preparation plan.",
        actionText: "Choose Target Companies ↓",
        type: "scroll",
        targetCompany: null,
        targetProblem: null,
      };
    }

    if (totalUserSolves === 0) {
      const companyNames = targetCompanies.map((c) => c.company_name).join(", ");
      return {
        headline: "Start building your interview coverage",
        text: `You're targeting ${companyNames}. Begin with high-frequency topics relevant to your selected companies.`,
        actionText: "Start Practicing →",
        type: "navigate_problems",
        targetCompany: targetCompanies[0],
        targetProblem: null,
      };
    }

    // Find target company & unsolved problem in priority weak topic
    let selectedTarget: Company | null = null;
    let weakestTopic = nextPriorityArea.topic;
    let recommendedProblem: Problem | null = null;

    for (const c of targetCompanies) {
      const stats = companyAnalytics.get(c.id);
      const unsolvedInCompany = (stats?.relevantProblems ?? []).filter((p) => {
        const prog = userProgressMap.get(p.id);
        return !(prog?.solved === true || prog?.status === "solved");
      });

      if (unsolvedInCompany.length > 0) {
        selectedTarget = c;
        // Find problem in weakest topic if available
        const inWeak = unsolvedInCompany.find(
          (p) => (topicMap.get(p.topic_id) ?? "") === weakestTopic
        );
        recommendedProblem = inWeak ?? unsolvedInCompany[0];
        break;
      }
    }

    if (relevantCoveragePct !== null && relevantCoveragePct >= 60) {
      return {
        headline: "Your preparation is on track",
        text: "Your verified DSA coverage is strong across your current targets. Keep practicing weak areas to improve consistency.",
        actionText: "Review Strategy →",
        type: "open_strategy",
        targetCompany: targetCompanies[0],
        targetProblem: null,
      };
    }

    if (recommendedProblem && selectedTarget) {
      return {
        headline: `Strengthen ${weakestTopic}`,
        text: `${weakestTopic} is currently one of your highest-priority gaps across your selected companies (${nextPriorityArea.detail}).`,
        actionText: "Practice Recommended Problem →",
        type: "practice_problem",
        targetCompany: selectedTarget,
        targetProblem: recommendedProblem,
      };
    }

    return {
      headline: "Continue company-focused DSA practice",
      text: "Maintain your practice streak and tackle medium-difficulty problems.",
      actionText: "Explore Problem Library →",
      type: "navigate_problems",
      targetCompany: null,
      targetProblem: null,
    };
  }, [
    targetCompanies,
    totalUserSolves,
    nextPriorityArea,
    companyAnalytics,
    userProgressMap,
    topicMap,
    relevantCoveragePct,
  ]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-8">
        <div className="h-6 w-36 glass rounded animate-pulse" />
        <div className="h-10 w-72 glass rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 glass-strong rounded-3xl animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 glass-strong rounded-3xl animate-pulse" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-8">
      {/* Back Link */}
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to DSA Command Center
      </Link>

      {/* 1. HERO — INTERVIEW INTELLIGENCE CENTER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-white/5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-aurora font-semibold bg-aurora/10 border border-aurora/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-aurora" /> INTERVIEW INTELLIGENCE
            </span>
            <span className="text-[10px] font-mono text-muted-foreground bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full">
              Target Company Preparation
            </span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            Turn your DSA practice into a company-specific interview plan.
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Select the companies you're targeting. SyncRole compares your verified DSA progress with company-relevant topics and shows exactly where to focus next.
          </p>
        </div>

        {/* Real-data Preparation Signal Panel */}
        <div className="glass-strong rounded-2xl p-4 border border-white/10 shrink-0 w-full lg:w-80 space-y-2 bg-black/40 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-aurora" /> Preparation Signal
            </span>
            <span className={`h-2 w-2 rounded-full ${userFocus.size > 0 ? "bg-aurora animate-pulse" : "bg-muted-foreground"}`} />
          </div>
          <div>
            <div className="font-display font-semibold text-sm text-white">
              {heroSignal.title}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal">
              {heroSignal.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* 2. YOUR PREPARATION SNAPSHOT (Replacing generic KPI cards) */}
      <div className="space-y-3">
        <div>
          <h2 className="font-display font-semibold text-base text-white">
            Your Preparation Snapshot
          </h2>
          <p className="text-xs text-muted-foreground">
            Based on your verified DSA progress and selected targets.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-strong rounded-2xl p-4 border border-white/5 space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              1. TARGETS
            </div>
            <div className="font-display text-2xl font-bold text-aurora">
              {userFocus.size}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {userFocus.size === 1 ? "1 company targeted" : `${userFocus.size} companies targeted`}
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-4 border border-white/5 space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              2. VERIFIED SOLVES
            </div>
            <div className="font-display text-2xl font-bold text-green-400">
              {totalUserSolves}
            </div>
            <div className="text-[10px] text-muted-foreground">
              Canonical solved problems
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-4 border border-white/5 space-y-1">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              3. RELEVANT COVERAGE
            </div>
            <div className="font-display text-2xl font-bold text-accent">
              {relevantCoveragePct !== null ? `${relevantCoveragePct}%` : "Not enough data"}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {relevantCoveragePct !== null
                ? `${solvedTargetRelevantCount} / ${targetRelevantProblems.size} target problems`
                : "Requires target & solves"}
            </div>
          </div>

          <div className="glass-strong rounded-2xl p-4 border border-white/5 space-y-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              4. NEXT PRIORITY
            </div>
            <div className="font-display text-lg font-bold text-yellow-400 truncate">
              {nextPriorityArea.topic}
            </div>
            <div className="text-[10px] text-muted-foreground truncate">
              {nextPriorityArea.detail}
            </div>
          </div>
        </div>
      </div>

      {/* 3. YOUR PREPARATION JOURNEY (3-Step Horizontal Workflow) */}
      <div className="glass-strong rounded-3xl p-6 border border-white/5 space-y-4">
        <div>
          <h2 className="font-display font-semibold text-base text-white">
            Your Preparation Journey
          </h2>
          <p className="text-xs text-muted-foreground">
            Dynamic stage progress derived from real target selections & verified solves.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Step 01 */}
          <div
            className={`glass rounded-2xl p-4 border space-y-2 transition-all ${
              userFocus.size > 0
                ? "border-aurora/40 bg-aurora/5"
                : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-aurora">01</span>
              {userFocus.size > 0 ? (
                <span className="text-[10px] font-mono bg-aurora/20 text-aurora border border-aurora/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3" /> COMPLETED
                </span>
              ) : (
                <span className="text-[10px] font-mono bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full font-semibold">
                  ACTIVE
                </span>
              )}
            </div>
            <div className="font-display font-bold text-sm text-white">
              Choose Targets
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Select companies you want to prepare for.
            </p>
          </div>

          {/* Step 02 */}
          <div
            className={`glass rounded-2xl p-4 border space-y-2 transition-all ${
              userFocus.size === 0
                ? "border-white/5 opacity-60"
                : totalUserSolves > 0
                ? "border-aurora/40 bg-aurora/5"
                : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-aurora">02</span>
              {userFocus.size === 0 ? (
                <span className="text-[10px] font-mono bg-white/5 text-muted-foreground border border-white/5 px-2 py-0.5 rounded-full">
                  WAITING
                </span>
              ) : (
                <span className="text-[10px] font-mono bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full font-semibold">
                  ACTIVE
                </span>
              )}
            </div>
            <div className="font-display font-bold text-sm text-white">
              Build Coverage
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Solve the DSA topics most relevant to those companies.
            </p>
          </div>

          {/* Step 03 */}
          <div
            className={`glass rounded-2xl p-4 border space-y-2 transition-all ${
              userFocus.size === 0 || totalUserSolves === 0
                ? "border-white/5 opacity-60"
                : relevantCoveragePct !== null && relevantCoveragePct >= 60
                ? "border-green-400/40 bg-green-500/5"
                : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-aurora">03</span>
              {userFocus.size === 0 || totalUserSolves === 0 ? (
                <span className="text-[10px] font-mono bg-white/5 text-muted-foreground border border-white/5 px-2 py-0.5 rounded-full">
                  WAITING
                </span>
              ) : relevantCoveragePct !== null && relevantCoveragePct >= 60 ? (
                <span className="text-[10px] font-mono bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <Check className="w-3 h-3" /> READY
                </span>
              ) : (
                <span className="text-[10px] font-mono bg-aurora/10 text-aurora border border-aurora/20 px-2 py-0.5 rounded-full font-semibold">
                  ACTIVE
                </span>
              )}
            </div>
            <div className="font-display font-bold text-sm text-white">
              Verify Readiness
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Use verified solves to measure how prepared you actually are.
            </p>
          </div>
        </div>
      </div>

      {/* 4. WHY COMPANY-SPECIFIC PREPARATION? (Integrated explanation row) */}
      <div className="glass-strong rounded-3xl p-6 border border-white/5 space-y-4">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
          <Compass className="h-4 w-4 text-aurora" />
          <span>Why company-specific preparation?</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-4 border border-white/5 space-y-1">
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-aurora" /> COMPANY SIGNAL
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Different companies emphasize different DSA patterns. Targeting lets SyncRole prioritize the right topics.
            </p>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/5 space-y-1">
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-accent" /> YOUR GAP
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Compare your verified solves against the relevant problem pool to identify what you're missing.
            </p>
          </div>
          <div className="glass rounded-2xl p-4 border border-white/5 space-y-1">
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> NEXT ACTION
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Stop guessing what to practice. Get a concrete next problem based on your target and current progress.
            </p>
          </div>
        </div>
      </div>

      {/* 5. RECOMMENDED NEXT STEP (Dynamic & Actionable) */}
      <div className="glass-strong rounded-3xl p-6 border border-aurora/30 bg-aurora/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-aurora font-mono font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-aurora" /> Recommended Next Step
          </div>
          <h3 className="font-display font-bold text-lg text-white">
            {nextStepRecommendation.headline}
          </h3>
          <p className="text-xs text-muted-foreground max-w-xl">
            {nextStepRecommendation.text}
          </p>
        </div>

        <button
          onClick={() => {
            if (nextStepRecommendation.type === "scroll") {
              const el = document.getElementById("all-companies-section");
              el?.scrollIntoView({ behavior: "smooth" });
            } else if (nextStepRecommendation.type === "practice_problem" && nextStepRecommendation.targetProblem) {
              navigate({
                to: "/dsa-workspace/$problemId",
                params: { problemId: nextStepRecommendation.targetProblem.id },
              });
            } else if (nextStepRecommendation.type === "open_strategy" && nextStepRecommendation.targetCompany) {
              setActiveStrategyCompany(nextStepRecommendation.targetCompany);
            } else {
              navigate({ to: "/dsa-problems" });
            }
          }}
          className="glass rounded-full px-5 py-2.5 text-xs font-semibold text-aurora hover:bg-white/10 transition-colors border border-aurora/30 shrink-0 flex items-center gap-2"
        >
          <span>{nextStepRecommendation.actionText}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6. TARGET OVERLAP INSIGHT */}
      <div className="glass-strong rounded-3xl p-6 border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono font-medium flex items-center gap-2">
            <Layers className="w-4 h-4 text-aurora" />
            <span>Target Overlap</span>
          </div>
        </div>

        {targetCompanies.length > 1 && targetOverlapTopicsWithCounts.length > 0 ? (
          <>
            <div className="text-xs font-semibold text-white">
              Your targets share {targetOverlapTopicsWithCounts.length} major DSA areas
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {targetOverlapTopicsWithCounts.map(({ topic, count }) => (
                <span
                  key={topic}
                  className="bg-aurora/10 text-aurora border border-aurora/20 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{topic}</span>
                  <span className="text-[10px] bg-aurora/20 px-1.5 py-0.2 rounded-full font-mono">
                    {count} targets
                  </span>
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              These topics appear across multiple selected companies, making them high-leverage preparation areas.
            </p>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">
            Target overlap will appear after you select multiple companies.
          </p>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* All Company Cards Grid (UNTOUCHED / PRESERVED BELOW) */}
      {/* ---------------------------------------------------------------- */}
      <div id="all-companies-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg text-white">All Companies</h2>
          <span className="text-xs text-muted-foreground font-mono">
            {companies.length} Available
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((company, idx) => {
            const selected = userFocus.has(company.id);
            const stats = companyAnalytics.get(company.id);

            const totalRel = stats?.totalRelevant ?? 0;
            const solvedCnt = stats?.solvedCount ?? 0;
            const readiness = stats?.readinessScore ?? null;
            const coreTopics = stats?.coreTopics ?? company.focus_topics ?? [];
            const weakTopics = stats?.weakTopics ?? [];

            return (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                className={`relative rounded-3xl p-6 text-left transition-all duration-300 group flex flex-col justify-between border ${
                  selected
                    ? "bg-gradient-to-br from-aurora/10 to-aurora/5 border-aurora/50 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                    : "glass-strong border-white/5 hover:border-white/10 hover:-translate-y-1"
                }`}
              >
                <div className="space-y-4">
                  {/* Top row: Logo, Name, Target Toggle */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                        <CompanyLogo name={company.company_name} className="w-7 h-7" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-bold text-lg text-white truncate leading-tight">
                          {company.company_name}
                        </h3>
                        <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                          {company.description ?? "Interview Preparation"}
                        </p>
                      </div>
                    </div>

                    {/* Target Toggle Button */}
                    <button
                      onClick={() => toggleCompany(company.id)}
                      className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition-all flex items-center gap-1.5 ${
                        selected
                          ? "bg-aurora text-primary-foreground font-semibold shadow-md"
                          : "glass text-muted-foreground hover:text-white border border-white/10 hover:border-white/20"
                      }`}
                    >
                      {selected ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Target
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Add Target
                        </>
                      )}
                    </button>
                  </div>

                  {/* Readiness & Solved Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-black/20 rounded-2xl p-3 border border-white/5 space-y-0.5">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                        Readiness
                      </div>
                      <div className="text-sm font-bold text-aurora">
                        {readiness !== null ? `${readiness}%` : "Not enough data"}
                      </div>
                    </div>
                    <div className="bg-black/20 rounded-2xl p-3 border border-white/5 space-y-0.5">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                        Relevant Solved
                      </div>
                      <div className="text-sm font-bold text-green-400">
                        {solvedCnt} {totalRel > 0 ? `/ ${totalRel}` : "solved"}
                      </div>
                    </div>
                  </div>

                  {/* Core Topics */}
                  {coreTopics.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                        Core Topics
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {coreTopics.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] border border-white/5 text-primary/80 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Weak Areas (if target & weak topics exist) */}
                  {selected && weakTopics.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="text-[10px] uppercase tracking-widest text-yellow-400/90 font-mono font-medium">
                        Weak Areas
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {weakTopics.map((t) => (
                          <span
                            key={t}
                            className="rounded-md bg-yellow-500/10 text-yellow-400 px-2 py-0.5 text-[10px] border border-yellow-500/20 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary CTA */}
                <div className="pt-4 mt-4 border-t border-white/5">
                  <button
                    onClick={() => setActiveStrategyCompany(company)}
                    className="w-full glass rounded-xl py-2 px-4 text-xs font-semibold text-aurora hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 border border-white/10"
                  >
                    <span>{selected ? "Continue Preparation →" : "View Strategy →"}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Company Strategy Modal */}
      <AnimatePresence>
        {activeStrategyCompany && (
          <CompanyStrategyModal
            company={activeStrategyCompany}
            stats={companyAnalytics.get(activeStrategyCompany.id)}
            isSelected={userFocus.has(activeStrategyCompany.id)}
            onToggleTarget={() => toggleCompany(activeStrategyCompany.id)}
            onClose={() => setActiveStrategyCompany(null)}
            userProgressMap={userProgressMap}
            topicMap={topicMap}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

// ----------------------------------------------------------------
// Company Strategy Modal Component (UNTOUCHED / PRESERVED)
// ----------------------------------------------------------------

interface StrategyModalProps {
  company: Company;
  stats: any;
  isSelected: boolean;
  onToggleTarget: () => void;
  onClose: () => void;
  userProgressMap: Map<string, UserProgress>;
  topicMap: Map<string, string>;
}

function CompanyStrategyModal({
  company,
  stats,
  isSelected,
  onToggleTarget,
  onClose,
  userProgressMap,
  topicMap,
}: StrategyModalProps) {
  const navigate = useNavigate();

  const totalRel = stats?.totalRelevant ?? 0;
  const solvedCnt = stats?.solvedCount ?? 0;
  const inProgressCnt = stats?.inProgressCount ?? 0;
  const remainingCnt = stats?.remainingCount ?? 0;
  const readiness = stats?.readinessScore ?? null;
  const relevantProblems: Problem[] = stats?.relevantProblems ?? [];

  // Categorize & recommend next problems
  const recommendedProblems = useMemo(() => {
    // Filter out already solved problems
    const unsolved = relevantProblems.filter((p) => {
      const prog = userProgressMap.get(p.id);
      return !(prog?.solved === true || prog?.status === "solved");
    });

    // Sort: 1) in progress first, 2) weak topics first, 3) easy/medium first
    unsolved.sort((a, b) => {
      const progA = userProgressMap.get(a.id);
      const progB = userProgressMap.get(b.id);
      const inProgA = progA?.status === "in_progress" || progA?.status === "attempted";
      const inProgB = progB?.status === "in_progress" || progB?.status === "attempted";
      if (inProgA && !inProgB) return -1;
      if (!inProgA && inProgB) return 1;

      const diffOrder: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
      const dA = diffOrder[a.difficulty?.toLowerCase()] ?? 2;
      const dB = diffOrder[b.difficulty?.toLowerCase()] ?? 2;
      return dA - dB;
    });

    return unsolved.slice(0, 5);
  }, [relevantProblems, userProgressMap]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl glass-strong rounded-3xl p-6 md:p-8 border border-white/10 space-y-6 my-8 shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass text-muted-foreground hover:text-white transition-colors"
          aria-label="Close strategy modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
            <CompanyLogo name={company.company_name} className="w-8 h-8" />
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-white truncate">
                {company.company_name} Strategy
              </h2>
              {isSelected && (
                <span className="text-[10px] bg-aurora/10 text-aurora border border-aurora/20 px-2.5 py-0.5 rounded-full font-medium shrink-0">
                  Target Company
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {company.description ?? "Interview Preparation & Practice Roadmap"}
            </p>
          </div>
        </div>

        {/* Target Action Button */}
        <div className="flex items-center justify-between glass rounded-2xl p-4 border border-white/5">
          <div className="text-xs text-muted-foreground">
            {isSelected
              ? "This company is in your active target list."
              : "Add to target list to bias recommendations & track readiness."}
          </div>
          <button
            onClick={onToggleTarget}
            className={`text-xs px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-1.5 ${
              isSelected
                ? "bg-aurora text-primary-foreground"
                : "glass border border-white/10 hover:border-aurora/40 text-aurora"
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5" /> Target Company
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add Target Company
              </>
            )}
          </button>
        </div>

        {/* Readiness Bar & Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1 glass rounded-2xl p-4 border border-white/5 flex flex-col justify-between space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Overall Readiness
            </div>
            <div className="font-display text-3xl font-bold text-aurora">
              {readiness !== null ? `${readiness}%` : "Not enough data"}
            </div>
            <div className="text-[11px] text-muted-foreground leading-tight">
              {readiness !== null
                ? `${solvedCnt} of ${totalRel} relevant problems solved`
                : "Solve company problems to unlock score"}
            </div>
          </div>

          <div className="sm:col-span-2 glass rounded-2xl p-4 border border-white/5 space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Preparation Progress Breakdown
            </div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="glass rounded-xl p-2">
                <div className="text-sm font-bold text-green-400">{solvedCnt}</div>
                <div className="text-[9px] text-muted-foreground">Solved</div>
              </div>
              <div className="glass rounded-xl p-2">
                <div className="text-sm font-bold text-yellow-400">{inProgressCnt}</div>
                <div className="text-[9px] text-muted-foreground">In Progress</div>
              </div>
              <div className="glass rounded-xl p-2">
                <div className="text-sm font-bold text-muted-foreground">{remainingCnt}</div>
                <div className="text-[9px] text-muted-foreground">Remaining</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Topics Breakdown */}
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono font-medium">
            Core Topics & Coverage
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {(company.focus_topics ?? ["Arrays", "Strings", "Trees", "Graphs"]).map((t) => (
              <div
                key={t}
                className="glass rounded-xl p-3 border border-white/5 flex items-center justify-between text-xs"
              >
                <span className="font-medium text-white">{t}</span>
                <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-muted-foreground font-mono">
                  High Priority
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Next Problems */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-aurora" />
              <span>What Should I Practice Next?</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">
              {recommendedProblems.length} Recommended
            </span>
          </div>

          {recommendedProblems.length === 0 ? (
            <div className="text-center py-6 glass rounded-2xl border border-white/5 space-y-2">
              <p className="text-xs text-muted-foreground">
                You have completed all current relevant problems for this company!
              </p>
              <button
                onClick={() => navigate({ to: "/dsa-problems" })}
                className="glass px-4 py-2 rounded-full text-xs text-aurora hover:bg-white/10 transition-colors"
              >
                Explore Problem Library →
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {recommendedProblems.map((prob) => {
                const prog = userProgressMap.get(prob.id);
                const inProg = prog?.status === "in_progress" || prog?.status === "attempted";

                return (
                  <div
                    key={prob.id}
                    className="glass rounded-2xl p-3.5 flex items-center justify-between gap-3 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-mono font-semibold ${
                            prob.difficulty?.toLowerCase() === "easy"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : prob.difficulty?.toLowerCase() === "medium"
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {prob.difficulty}
                        </span>
                        <span className="text-xs font-semibold text-white truncate">
                          {prob.title}
                        </span>
                      </div>
                      <div className="text-[10px] text-muted-foreground flex items-center gap-2">
                        <span>{topicMap.get(prob.topic_id) ?? "Algorithm"}</span>
                        {inProg && (
                          <span className="text-aurora font-medium">In Progress</span>
                        )}
                      </div>
                    </div>

                    <Link
                      to="/dsa-workspace/$problemId"
                      params={{ problemId: prob.id }}
                      className="glass rounded-xl px-3 py-1.5 text-xs font-semibold text-aurora hover:bg-white/10 transition-colors border border-aurora/30 shrink-0 flex items-center gap-1"
                    >
                      <span>Practice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="glass rounded-full px-6 py-2 text-xs font-medium text-muted-foreground hover:text-white transition-colors border border-white/10"
          >
            Close Strategy
          </button>
        </div>
      </motion.div>
    </div>
  );
}
