import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  Info,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DSAWorkspaceService,
  WorkspaceProblem,
  SampleTestCase,
} from "@/lib/services/dsa-workspace.service";
import {
  DSASubmissionService,
  SubmissionResult,
  SubmissionStatus,
  validateSourceCode,
} from "@/lib/services/dsa-submission.service";
import { useDSAPracticeSession } from "@/hooks/useDSAPracticeSession";
import { useDSACodeDraft } from "@/hooks/useDSACodeDraft";

// Lazy-load heavy components
const ProblemPanel = lazy(() =>
  import("@/components/dsa/ProblemPanel").then((m) => ({ default: m.ProblemPanel }))
);
const CodeEditor = lazy(() =>
  import("@/components/dsa/CodeEditor").then((m) => ({ default: m.CodeEditor }))
);
const TestResultPanel = lazy(() =>
  import("@/components/dsa/TestResultPanel").then((m) => ({ default: m.TestResultPanel }))
);
const SessionPanel = lazy(() =>
  import("@/components/dsa/SessionPanel").then((m) => ({ default: m.SessionPanel }))
);

export const Route = createFileRoute("/_authenticated/dsa-workspace/$problemId")({
  component: DSAWorkspacePage,
  head: () => ({ meta: [{ title: "DSA Workspace — SyncRole" }] }),
});

type WorkspaceUIState = "idle" | "submitting" | "running" | "done";

function DSAWorkspacePage() {
  const { problemId } = Route.useParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [problem, setProblem] = useState<WorkspaceProblem | null>(null);
  const [sampleTests, setSampleTests] = useState<SampleTestCase[]>([]);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [language, setLanguage] = useState("javascript");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [uiState, setUiState] = useState<WorkspaceUIState>("idle");
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [isRunOnly, setIsRunOnly] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  // Load user and problem data
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        if (cancelled) return;

        setUserId(user.id);

        const [prob, tests, progress] = await Promise.all([
          DSAWorkspaceService.getWorkspaceProblem(problemId),
          DSAWorkspaceService.getSampleTests(problemId),
          DSAWorkspaceService.getUserProblemProgress(user.id, problemId),
        ]);

        if (cancelled) return;

        if (!prob) {
          setLoadError("Problem not found in library.");
          return;
        }

        setProblem(prob);
        setSampleTests(tests);
        setUserProgress(progress);

        // Update problem status to in_progress if not already started/solved
        if (!progress || progress.status === "not_started") {
          await DSAWorkspaceService.updateProblemStatus(user.id, problemId, "in_progress");
        }
      } catch (err: any) {
        if (!cancelled) {
          setLoadError(err.message ?? "Failed to load problem workspace.");
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [problemId]);

  // Practice session tracking
  const session = useDSAPracticeSession({
    userId,
    problemId,
  });

  // Code draft autosave
  const draft = useDSACodeDraft({
    userId,
    problemId,
    language,
    starterCode: problem?.starter_code_js ?? null,
  });

  // Handle Run Code
  const handleRunCode = useCallback(async () => {
    if (!userId || !problem || uiState !== "idle") return;

    if (problem.execution_status === "unavailable") {
      toast.info("Practice mode active: Test execution is unavailable for this problem.", {
        description: "Your code and active time are saved automatically.",
      });
      return;
    }

    const codeError = validateSourceCode(draft.code);
    if (codeError) {
      toast.error(codeError);
      return;
    }

    setIsRunOnly(true);
    setUiState("submitting");
    setSubmissionResult(null);
    session.onRunCode();

    // Mark as attempted in user progress
    await DSAWorkspaceService.updateProblemStatus(userId, problemId, "attempted");

    const { submissionId, error } = await DSASubmissionService.createAndExecute({
      userId,
      problemId,
      sessionId: session.sessionId,
      language,
      sourceCode: draft.code,
      isRunOnly: true,
      attemptNumber: submissionCount + 1,
    });

    if (error || !submissionId) {
      setUiState("done");
      setSubmissionResult({
        id: "",
        status: "system_error" as SubmissionStatus,
        passed_tests: 0,
        total_tests: 0,
        execution_time_ms: null,
        memory_kb: null,
        error_type: "system_error",
        error_message:
          error ?? "Execution service temporarily unavailable. This run was not counted.",
        attempt_number: submissionCount + 1,
        is_run_only: true,
        created_at: new Date().toISOString(),
      });
      return;
    }

    setUiState("running");

    try {
      const result = await DSASubmissionService.pollSubmissionResult(submissionId, (status) => {
        if (status === "running") setUiState("running");
      });
      setSubmissionResult(result);
      setUiState("done");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to get results.");
      setUiState("idle");
    }
  }, [userId, problem, draft.code, language, uiState, session, submissionCount, problemId]);

  // Handle Submit
  const handleSubmit = useCallback(async () => {
    if (!userId || !problem || uiState !== "idle") return;

    if (problem.execution_status === "unavailable") {
      toast.info("Practice mode active: Automated test judging is unavailable for this problem.", {
        description: "Your code draft and active practice time are saved.",
      });
      return;
    }

    const codeError = validateSourceCode(draft.code);
    if (codeError) {
      toast.error(codeError);
      return;
    }

    setIsRunOnly(false);
    setUiState("submitting");
    setSubmissionResult(null);
    session.onSubmit();
    const newAttempt = submissionCount + 1;
    setSubmissionCount(newAttempt);

    // Mark as attempted
    await DSAWorkspaceService.updateProblemStatus(userId, problemId, "attempted");

    const { submissionId, error } = await DSASubmissionService.createAndExecute({
      userId,
      problemId,
      sessionId: session.sessionId,
      language,
      sourceCode: draft.code,
      isRunOnly: false,
      attemptNumber: newAttempt,
    });

    if (error || !submissionId) {
      setUiState("done");
      setSubmissionResult({
        id: "",
        status: "system_error" as SubmissionStatus,
        passed_tests: 0,
        total_tests: 0,
        execution_time_ms: null,
        memory_kb: null,
        error_type: "system_error",
        error_message:
          error ?? "Execution service temporarily unavailable. Your submission was not counted as a failed attempt.",
        attempt_number: newAttempt,
        is_run_only: false,
        created_at: new Date().toISOString(),
      });
      return;
    }

    setUiState("running");

    try {
      const result = await DSASubmissionService.pollSubmissionResult(submissionId, (status) => {
        if (status === "running") setUiState("running");
      });

      setSubmissionResult(result);
      setUiState("done");

      if (result.status === "accepted") {
        toast.success("🎉 Accepted! Verified solution recorded!", { duration: 4000 });
        if (userId) {
          const freshProgress = await DSAWorkspaceService.getUserProblemProgress(userId, problemId);
          setUserProgress(freshProgress);
        }
      }
    } catch (err: any) {
      toast.error(err.message ?? "Failed to get results.");
      setUiState("idle");
    }
  }, [userId, problem, draft.code, language, uiState, session, submissionCount, problemId]);

  // ----------------------------------------------------------------
  // Render
  // ----------------------------------------------------------------

  if (loadError) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-4">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <p className="text-lg font-medium">{loadError}</p>
          <Link
            to="/dsa-problems"
            className="inline-flex items-center gap-2 text-sm text-aurora hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Problem Library
          </Link>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-aurora" />
          <span className="text-sm">Loading workspace…</span>
        </div>
      </div>
    );
  }

  const isSolved = userProgress?.solved || submissionResult?.status === "accepted";

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden">
      {/* ---- Workspace Header ---- */}
      <header className="flex-none border-b border-white/5 bg-background/80 backdrop-blur-xl px-4 py-2">
        <div className="mx-auto max-w-screen-2xl flex items-center justify-between gap-4">
          {/* Left: back + title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to="/dsa-problems"
              className="flex-none inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Library</span>
            </Link>
            <ChevronRight className="h-3 w-3 text-muted-foreground/40 flex-none" />
            <span className="text-sm font-medium truncate">{problem.title}</span>
            {isSolved ? (
              <span className="flex-none flex items-center gap-1 text-[10px] text-neon bg-neon/10 rounded-full px-2 py-0.5 font-medium border border-neon/20">
                <CheckCircle2 className="h-3 w-3" /> Solved
              </span>
            ) : (
              <span className="flex-none text-[10px] text-aurora bg-aurora/10 rounded-full px-2 py-0.5 font-medium border border-aurora/20">
                Practice
              </span>
            )}
          </div>

          {/* Centre: session stats */}
          <Suspense fallback={<div className="h-7 w-48 glass rounded-full animate-pulse" />}>
            <SessionPanel
              activeSeconds={session.activeSeconds}
              isIdle={session.isIdle}
              runCount={session.runCount}
              submissionCount={session.submissionCount}
              isResumed={session.isResumed}
              sessionId={session.sessionId}
              status={userProgress?.status}
              bestRuntimeMs={userProgress?.best_execution_time_ms}
            />
          </Suspense>

          {/* Right: action buttons */}
          <div className="flex-none flex items-center gap-2">
            {problem.leetcode_url && (
              <a
                href={problem.leetcode_url}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground glass rounded-lg px-3 py-1.5 transition-colors"
                title="View original problem on LeetCode"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                LeetCode
              </a>
            )}

            {problem.execution_status === "enabled" ? (
              <>
                {/* Run Code */}
                <button
                  id="btn-run-code"
                  onClick={handleRunCode}
                  disabled={uiState !== "idle"}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                    "glass border border-white/10 hover:border-aurora/40 hover:text-aurora",
                    uiState !== "idle" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {uiState === "running" && isRunOnly ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                  Run
                </button>

                {/* Submit */}
                <button
                  id="btn-submit"
                  onClick={handleSubmit}
                  disabled={uiState !== "idle"}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-all relative overflow-hidden",
                    uiState !== "idle" ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  <span className="absolute inset-0 bg-aurora" />
                  <span className="relative flex items-center gap-1.5">
                    {uiState !== "idle" && !isRunOnly ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    Submit
                  </span>
                </button>
              </>
            ) : (
              <div
                onClick={() =>
                  toast.info("Practice mode active: Code autosave and session tracking are active.")
                }
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 cursor-pointer"
                title="Automated test execution is unavailable for this problem, but practice & code draft are saved."
              >
                <Info className="h-3.5 w-3.5" /> Practice Mode
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ---- Main Content: Split pane (desktop) or stacked (mobile) ---- */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop: side-by-side */}
        <div className="hidden md:flex h-full">
          {/* Problem Panel — 40% */}
          <div className="w-[40%] min-w-[320px] h-full border-r border-white/5 overflow-y-auto">
            <Suspense fallback={<PanelSkeleton />}>
              <ProblemPanel
                problem={problem}
                sampleTests={sampleTests}
                userProgress={userProgress}
              />
            </Suspense>
          </div>

          {/* Editor + Results — 60% */}
          <div className="flex-1 flex flex-col h-full min-w-0">
            {/* Code Editor — fills available space */}
            <div className="flex-1 overflow-hidden">
              <Suspense fallback={<EditorSkeleton />}>
                <CodeEditor
                  code={draft.code}
                  onChange={draft.setCode}
                  language={language}
                  onLanguageChange={setLanguage}
                  onReset={draft.resetToStarter}
                  isLoading={uiState !== "idle"}
                  hasDraft={draft.hasDraft}
                  lastSaved={draft.lastSavedLocally}
                />
              </Suspense>
            </div>

            {/* Test Result Panel — fixed height at bottom */}
            <div className="flex-none h-[220px] border-t border-white/5 overflow-y-auto">
              <Suspense fallback={<div className="h-full grid place-items-center text-muted-foreground text-sm">Loading…</div>}>
                <TestResultPanel
                  state={uiState}
                  result={submissionResult}
                  sampleTests={sampleTests}
                  isRunOnly={isRunOnly}
                  executionStatus={problem.execution_status}
                />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden h-full overflow-y-auto space-y-4 p-4">
          <div className="glass-strong rounded-2xl overflow-hidden">
            <Suspense fallback={<PanelSkeleton />}>
              <ProblemPanel
                problem={problem}
                sampleTests={sampleTests}
                userProgress={userProgress}
              />
            </Suspense>
          </div>

          <div className="glass-strong rounded-2xl overflow-hidden">
            <Suspense fallback={<EditorSkeleton />}>
              <CodeEditor
                code={draft.code}
                onChange={draft.setCode}
                language={language}
                onLanguageChange={setLanguage}
                onReset={draft.resetToStarter}
                isLoading={uiState !== "idle"}
                hasDraft={draft.hasDraft}
                lastSaved={draft.lastSavedLocally}
              />
            </Suspense>
          </div>

          {problem.execution_status === "enabled" && (
            <div className="flex gap-3">
              <button
                onClick={handleRunCode}
                disabled={uiState !== "idle"}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl glass border border-white/10 py-2.5 text-sm font-medium disabled:opacity-50"
              >
                <Play className="h-4 w-4" /> Run Code
              </button>
              <button
                onClick={handleSubmit}
                disabled={uiState !== "idle"}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-aurora text-primary-foreground py-2.5 text-sm font-semibold disabled:opacity-50"
              >
                <Send className="h-4 w-4" /> Submit
              </button>
            </div>
          )}

          <div className="glass-strong rounded-2xl overflow-hidden min-h-[160px]">
            <Suspense fallback={null}>
              <TestResultPanel
                state={uiState}
                result={submissionResult}
                sampleTests={sampleTests}
                isRunOnly={isRunOnly}
                executionStatus={problem.execution_status}
              />
            </Suspense>
          </div>

          <div className="h-8" />
        </div>
      </div>

      {/* Draft save indicator */}
      {draft.hasDraft && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-4 right-4 z-50 text-[10px] text-muted-foreground glass rounded-full px-3 py-1.5 flex items-center gap-1.5"
        >
          <Clock className="h-3 w-3" />
          {draft.lastSavedLocally
            ? `Saved ${formatRelativeTime(draft.lastSavedLocally)}`
            : "Draft saved locally"}
        </motion.div>
      )}
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-6 w-3/4 bg-white/10 rounded" />
      <div className="h-4 w-1/3 bg-white/5 rounded" />
      <div className="space-y-2 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-white/5 rounded" />
        ))}
      </div>
    </div>
  );
}

function EditorSkeleton() {
  return (
    <div className="h-full bg-black/30 flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-aurora/50" />
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.round(seconds / 60)}m ago`;
}
