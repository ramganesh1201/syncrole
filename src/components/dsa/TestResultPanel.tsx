import React from 'react';
import { SubmissionResult } from "@/lib/services/dsa-submission.service";
import { SampleTestCase } from "@/lib/services/dsa-workspace.service";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, XCircle, AlertTriangle, AlertCircle, Clock, Database } from 'lucide-react';

interface TestResultPanelProps {
  state: 'idle' | 'submitting' | 'running' | 'done';
  result: SubmissionResult | null;
  sampleTests: SampleTestCase[];
  isRunOnly: boolean;
}

export const TestResultPanel: React.FC<TestResultPanelProps> = ({ state, result, sampleTests, isRunOnly }) => {
  if (state === 'idle') {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground bg-black/20 rounded-xl border border-white/5">
        Run code or submit to see results
      </div>
    );
  }

  if (state === 'running' || state === 'submitting') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-aurora gap-3 bg-black/20 rounded-xl border border-white/5">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="text-sm font-medium animate-pulse">
          {state === 'running' ? 'Running code...' : 'Judging...'}
        </span>
      </div>
    );
  }

  if (!result) return null;

  const renderStatus = () => {
    switch (result.status) {
      case 'accepted':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-green-400 gap-3">
            <CheckCircle2 className="w-14 h-14" />
            <h3 className="text-3xl font-bold font-display tracking-wide">Accepted</h3>
            <div className="flex gap-6 text-sm opacity-90 mt-2 bg-green-400/10 px-4 py-2 rounded-lg border border-green-400/20">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/> {result.runtime_ms} ms</span>
              <span className="flex items-center gap-1.5"><Database className="w-4 h-4"/> {result.memory_kb} KB</span>
            </div>
            {!isRunOnly && result.total_tests && (
              <div className="text-sm text-green-400/80 mt-2 font-medium">
                Passed {result.passed_tests} / {result.total_tests} test cases
              </div>
            )}
          </div>
        );
      case 'wrong_answer':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-red-400 gap-3">
            <XCircle className="w-14 h-14" />
            <h3 className="text-3xl font-bold font-display tracking-wide">Wrong Answer</h3>
            <div className="text-sm opacity-90 mt-2 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20 font-medium">
              Passed {result.passed_tests} / {result.total_tests} test cases
            </div>
          </div>
        );
      case 'compile_error':
        return (
          <div className="flex flex-col items-start w-full py-4 text-red-400">
            <div className="flex items-center gap-2 mb-4 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
              <AlertCircle className="w-5 h-5" />
              <h3 className="text-lg font-bold font-display">Compile Error</h3>
            </div>
            <pre className="w-full bg-red-950/30 border border-red-500/20 p-4 rounded-lg text-xs font-mono text-red-300 overflow-x-auto whitespace-pre-wrap">
              {result.error_message || 'Compilation failed.'}
            </pre>
          </div>
        );
      case 'runtime_error':
        return (
          <div className="flex flex-col items-start w-full py-4 text-yellow-400">
            <div className="flex items-center gap-2 mb-4 bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-bold font-display">Runtime Error</h3>
            </div>
            <pre className="w-full bg-yellow-950/30 border border-yellow-500/20 p-4 rounded-lg text-xs font-mono text-yellow-300 overflow-x-auto whitespace-pre-wrap">
              {result.error_message || 'Execution failed during runtime.'}
            </pre>
          </div>
        );
      case 'time_limit':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-orange-400 gap-3">
            <Clock className="w-14 h-14" />
            <h3 className="text-3xl font-bold font-display tracking-wide">Time Limit Exceeded</h3>
            <div className="text-sm opacity-90 mt-2 bg-orange-400/10 px-4 py-2 rounded-lg border border-orange-400/20 font-medium">
              Passed {result.passed_tests} / {result.total_tests} test cases before timing out
            </div>
          </div>
        );
      case 'memory_limit':
        return (
          <div className="flex flex-col items-center justify-center py-8 text-purple-400 gap-3">
            <Database className="w-14 h-14" />
            <h3 className="text-3xl font-bold font-display tracking-wide">Memory Limit Exceeded</h3>
            <div className="text-sm opacity-90 mt-2 bg-purple-400/10 px-4 py-2 rounded-lg border border-purple-400/20 font-medium">
              Passed {result.passed_tests} / {result.total_tests} test cases before exceeding memory
            </div>
          </div>
        );
      case 'system_error':
      default:
        return (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400 gap-3 text-center">
            <AlertCircle className="w-14 h-14 text-gray-500" />
            <h3 className="text-2xl font-bold font-display text-white">System Error</h3>
            <p className="text-sm mt-2 max-w-md bg-white/5 p-3 rounded-lg border border-white/10">
              Execution service temporarily unavailable. Your submission was not counted.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 custom-scrollbar glass rounded-xl border border-white/10 bg-black/40">
      {renderStatus()}
      
      {isRunOnly && result.status !== 'compile_error' && result.status !== 'system_error' && (
        <div className="mt-6 flex flex-col gap-3">
          <h4 className="text-sm font-medium text-white/80 border-b border-white/10 pb-2 uppercase tracking-wider">Sample Test Results</h4>
          <div className="grid gap-3">
            {sampleTests.map((test, idx) => {
              const isPass = result.status === 'accepted' || (result.passed_tests && result.passed_tests > idx);
              return (
                <div key={idx} className={cn(
                  "rounded-lg p-3 border flex items-start gap-3 transition-colors",
                  isPass ? "bg-green-400/5 border-green-400/10" : "bg-red-400/5 border-red-400/10"
                )}>
                  <div className="mt-0.5 shrink-0">
                    {isPass ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2 text-xs font-mono">
                    <div className="flex"><span className="text-white/40 w-16 shrink-0">Input:</span><span className="text-white/80 break-all">{test.input}</span></div>
                    <div className="flex"><span className="text-white/40 w-16 shrink-0">Expected:</span><span className="text-white/80 break-all">{test.output}</span></div>
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
