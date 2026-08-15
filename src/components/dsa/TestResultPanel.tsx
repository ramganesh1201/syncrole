import React from "react";
import { SubmissionResult } from "@/lib/services/dsa-submission.service";
import { SampleTestCase } from "@/lib/services/dsa-workspace.service";
import { cn } from "@/lib/utils";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  Database,
  Info,
  ShieldCheck,
} from "lucide-react";

interface TestResultPanelProps {
  state: "idle" | "submitting" | "running" | "done";
  result: SubmissionResult | null;
  sampleTests: SampleTestCase[];
  isRunOnly: boolean;
  executionStatus?: "enabled" | "unavailable";
}

export const TestResultPanel: React.FC<TestResultPanelProps> = ({
  state,
  result,
  sampleTests,
  isRunOnly,
  executionStatus = "enabled",
}) => {
  // Practice Mode Active (Execution Unavailable)
  if (executionStatus === "unavailable") {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center text-xs text-muted-foreground bg-black/20 rounded-xl border border-white/5 gap-2">
        <div className="p-2 rounded-full bg-aurora/10 border border-aurora/20 text-aurora">
          <Info className="w-5 h-5" />
        </div>
        <div className="font-semibold text-sm text-foreground">
          Practice Mode Active
        </div>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          Work through this problem inside SyncRole. Your practice time, code draft, and session activity are tracked automatically. Automated test execution will be added to this problem soon.
        </p>
      </div>
    );
  }

  // Actively executing
  if (state === "running" || state === "submitting") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-aurora gap-2 bg-black/20 rounded-xl border border-white/5">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-xs font-medium animate-pulse">
          {state === "running" ? "Running test cases..." : "Submitting solution for verification..."}
        </span>
      </div>
    );
  }

  // Placeholder when no result is present
  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-muted-foreground bg-black/20 rounded-xl border border-white/5">
        Run code or submit to see verified test results
      </div>
    );
  }

  const renderStatusHeader = () => {
    switch (result.status) {
      case "accepted":
        return (
          <div className="flex flex-col items-center justify-center py-4 text-green-400 gap-2 text-center">
            <CheckCircle2 className="w-10 h-10" />
            <h3 className="text-xl font-bold font-display tracking-wide">
              Accepted
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs mt-0.5">
              <span className="bg-green-400/10 px-3 py-1 rounded-lg border border-green-400/20 font-mono font-medium">
                Passed {result.passed_tests} / {result.total_tests} test cases
              </span>
              {result.execution_time_ms !== null && (
                <span className="bg-green-400/10 px-3 py-1 rounded-lg border border-green-400/20 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {result.execution_time_ms} ms
                </span>
              )}
            </div>
            {isRunOnly ? (
              <p className="text-xs text-green-300/80 mt-1">
                Your solution passes all visible sample test cases. You can submit when ready for final verification.
              </p>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-xs text-green-300 font-semibold bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30 mt-1">
                <ShieldCheck className="w-4 h-4" /> Solution Verified & Solved Recorded!
              </div>
            )}
          </div>
        );

      case "wrong_answer": {
        const failedCount = Math.max(0, result.total_tests - result.passed_tests);
        return (
          <div className="flex flex-col items-center justify-center py-4 text-red-400 gap-2 text-center">
            <XCircle className="w-10 h-10" />
            <h3 className="text-xl font-bold font-display tracking-wide">
              Wrong Answer
            </h3>
            <div className="text-xs bg-red-400/10 px-3 py-1 rounded-lg border border-red-400/20 font-mono font-medium">
              Passed {result.passed_tests} / {result.total_tests} test cases
            </div>
            {isRunOnly ? (
              <p className="text-xs text-red-300/80 mt-1">
                Fix your solution and run again.
              </p>
            ) : (
              <p className="text-xs text-red-300/80 mt-1">
                {failedCount > 0
                  ? `${failedCount} hidden test case${failedCount > 1 ? "s" : ""} failed. Review your edge cases and try again.`
                  : "Some test cases failed. Review your logic and submit again."}
              </p>
            )}
          </div>
        );
      }

      case "compile_error":
        return (
          <div className="flex flex-col items-start w-full py-2 text-red-400">
            <div className="flex items-center gap-2 mb-2 bg-red-400/10 px-3 py-1 rounded-lg border border-red-400/20">
              <AlertCircle className="w-4 h-4" />
              <h3 className="text-sm font-bold font-display">Compile Error</h3>
            </div>
            <pre className="w-full bg-red-950/30 border border-red-500/20 p-3 rounded-lg text-xs font-mono text-red-300 overflow-x-auto whitespace-pre-wrap">
              {result.error_message || "Compilation failed."}
            </pre>
          </div>
        );

      case "runtime_error":
        return (
          <div className="flex flex-col items-start w-full py-2 text-yellow-400">
            <div className="flex items-center gap-2 mb-2 bg-yellow-400/10 px-3 py-1 rounded-lg border border-yellow-400/20">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-sm font-bold font-display">Runtime Error</h3>
            </div>
            <pre className="w-full bg-yellow-950/30 border border-yellow-500/20 p-3 rounded-lg text-xs font-mono text-yellow-300 overflow-x-auto whitespace-pre-wrap">
              {result.error_message || "Execution failed during runtime."}
            </pre>
          </div>
        );

      case "time_limit":
        return (
          <div className="flex flex-col items-center justify-center py-4 text-orange-400 gap-2 text-center">
            <Clock className="w-10 h-10" />
            <h3 className="text-xl font-bold font-display tracking-wide">
              Time Limit Exceeded
            </h3>
            <p className="text-xs bg-orange-400/10 px-3 py-1 rounded-lg border border-orange-400/20 font-medium">
              Passed {result.passed_tests} / {result.total_tests} test cases before timing out
            </p>
          </div>
        );

      case "system_error":
      default:
        return (
          <div className="flex flex-col items-center justify-center py-4 text-gray-400 gap-2 text-center">
            <AlertCircle className="w-10 h-10 text-gray-500" />
            <h3 className="text-base font-bold font-display text-white">
              System Error
            </h3>
            <p className="text-xs max-w-md bg-white/5 p-2.5 rounded-lg border border-white/10 text-gray-300 leading-relaxed">
              {result.error_message ||
                "The code execution service is temporarily unavailable. Your code was saved and this attempt was not penalized. Please try again."}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 custom-scrollbar glass rounded-xl border border-white/10 bg-black/40">
      {renderStatusHeader()}

      {/* Show Sample Test Case Details for RUN */}
      {isRunOnly &&
        result.status !== "compile_error" &&
        result.status !== "system_error" &&
        sampleTests.length > 0 && (
          <div className="mt-3 flex flex-col gap-2">
            <h4 className="text-xs font-medium text-white/80 border-b border-white/10 pb-1.5 uppercase tracking-wider">
              Sample Test Cases
            </h4>
            <div className="grid gap-2">
              {sampleTests.map((test, idx) => {
                const isPass =
                  result.status === "accepted" ||
                  (result.passed_tests && result.passed_tests > idx);
                return (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-lg p-2.5 border flex items-start gap-2.5 transition-colors text-xs font-mono",
                      isPass
                        ? "bg-green-400/5 border-green-400/10"
                        : "bg-red-400/5 border-red-400/10"
                    )}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isPass ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-sans font-semibold mb-1 text-white/90">
                        <span>Test Case {idx + 1}</span>
                        <span
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded font-mono uppercase",
                            isPass
                              ? "bg-green-400/10 text-green-400"
                              : "bg-red-400/10 text-red-400"
                          )}
                        >
                          {isPass ? "Passed" : "Failed"}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-white/40 w-16 shrink-0 font-sans">Input:</span>
                        <span className="text-white/80 break-all">{test.input}</span>
                      </div>
                      <div className="flex">
                        <span className="text-white/40 w-16 shrink-0 font-sans">Expected:</span>
                        <span className="text-white/80 break-all">{test.expected_output}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
};
