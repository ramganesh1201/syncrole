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
  // Execution Unavailable (Practice Mode)
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

  if (state === "running" || state === "submitting") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-aurora gap-2 bg-black/20 rounded-xl border border-white/5">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-xs font-medium animate-pulse">
          {state === "running" ? "Running test cases..." : "Submitting to edge judge..."}
        </span>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-xs text-muted-foreground bg-black/20 rounded-xl border border-white/5">
        Run code or submit to see verified test results
      </div>
    );
  }

  const renderStatus = () => {
    switch (result.status) {
      case "accepted":
        return (
          <div className="flex flex-col items-center justify-center py-6 text-green-400 gap-2">
            <CheckCircle2 className="w-12 h-12" />
            <h3 className="text-2xl font-bold font-display tracking-wide">
              Accepted
            </h3>
            <div className="flex gap-4 text-xs mt-1 bg-green-400/10 px-3 py-1.5 rounded-lg border border-green-400/20 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />{" "}
                {result.execution_time_ms ? `${result.execution_time_ms} ms` : "N/A"}
              </span>
              {result.memory_kb && (
                <span className="flex items-center gap-1">
                  <Database className="w-3.5 h-3.5" /> {result.memory_kb} KB
                </span>
              )}
            </div>
            {!isRunOnly && result.total_tests > 0 && (
              <div className="text-xs text-green-400/90 font-medium mt-1">
                Passed {result.passed_tests} / {result.total_tests} test cases
              </div>
            )}
          </div>
        );
      case "wrong_answer":
        return (
          <div className="flex flex-col items-center justify-center py-6 text-red-400 gap-2">
            <XCircle className="w-12 h-12" />
            <h3 className="text-2xl font-bold font-display tracking-wide">
              Wrong Answer
            </h3>
            <div className="text-xs mt-1 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20 font-medium font-mono">
              Passed {result.passed_tests} / {result.total_tests} test cases
            </div>
          </div>
        );
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
          <div className="flex flex-col items-center justify-center py-6 text-orange-400 gap-2">
            <Clock className="w-12 h-12" />
            <h3 className="text-2xl font-bold font-display tracking-wide">
              Time Limit Exceeded
            </h3>
            <div className="text-xs mt-1 bg-orange-400/10 px-3 py-1.5 rounded-lg border border-orange-400/20 font-medium">
              Passed {result.passed_tests} / {result.total_tests} test cases before timing out
            </div>
          </div>
        );
      case "memory_limit":
        return (
          <div className="flex flex-col items-center justify-center py-6 text-purple-400 gap-2">
            <Database className="w-12 h-12" />
            <h3 className="text-2xl font-bold font-display tracking-wide">
              Memory Limit Exceeded
            </h3>
            <div className="text-xs mt-1 bg-purple-400/10 px-3 py-1.5 rounded-lg border border-purple-400/20 font-medium">
              Passed {result.passed_tests} / {result.total_tests} test cases before exceeding memory limit
            </div>
          </div>
        );
      case "system_error":
      default:
        return (
          <div className="flex flex-col items-center justify-center py-6 text-gray-400 gap-2 text-center">
            <AlertCircle className="w-10 h-10 text-gray-500" />
            <h3 className="text-lg font-bold font-display text-white">
              System Error
            </h3>
            <p className="text-xs mt-1 max-w-md bg-white/5 p-2.5 rounded-lg border border-white/10">
              {result.error_message || "Execution service temporarily unavailable. Your attempt was not counted."}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 custom-scrollbar glass rounded-xl border border-white/10 bg-black/40">
      {renderStatus()}

      {isRunOnly &&
        result.status !== "compile_error" &&
        result.status !== "system_error" &&
        sampleTests.length > 0 && (
          <div className="mt-4 flex flex-col gap-2">
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
