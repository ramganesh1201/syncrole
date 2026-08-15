import React from "react";
import { WorkspaceProblem, SampleTestCase } from "@/lib/services/dsa-workspace.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ExternalLink, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

interface ProblemPanelProps {
  problem: WorkspaceProblem;
  sampleTests: SampleTestCase[];
  userProgress?: any;
}

const difficultyColor: Record<string, string> = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

export const ProblemPanel: React.FC<ProblemPanelProps> = ({
  problem,
  sampleTests,
  userProgress,
}) => {
  const isSolved = userProgress?.solved;

  return (
    <div className="flex flex-col h-full overflow-hidden glass rounded-xl border-white/10">
      {/* Header */}
      <div className="flex-none p-4 border-b border-white/10">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-xl font-display font-bold text-white truncate">
            {problem.title}
          </h2>
          {isSolved && (
            <div className="flex-none flex items-center text-green-400 text-xs bg-green-400/10 px-2.5 py-1 rounded-full border border-green-400/20 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Solved
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-md border font-medium",
              difficultyColor[problem.difficulty] ||
                "text-gray-400 bg-gray-400/10 border-gray-400/20"
            )}
          >
            {problem.difficulty}
          </span>

          {problem.topic_name && (
            <span className="text-xs px-2 py-0.5 rounded-md border border-white/10 bg-white/5 text-muted-foreground">
              {problem.topic_name}
            </span>
          )}

          {problem.execution_status === "enabled" ? (
            <span className="text-[10px] px-2 py-0.5 rounded-md border border-aurora/30 bg-aurora/10 text-aurora font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Test Execution Ready
            </span>
          ) : (
            <span className="text-[10px] px-2 py-0.5 rounded-md border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 font-medium">
              Practice Mode
            </span>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description" className="flex-1 flex flex-col min-h-0">
        <TabsList className="flex-none w-full justify-start rounded-none border-b border-white/10 bg-transparent h-10 p-0">
          <TabsTrigger
            value="description"
            className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-aurora data-[state=active]:text-aurora data-[state=active]:bg-white/5 data-[state=active]:shadow-none px-4 text-xs font-medium transition-all"
          >
            Description
          </TabsTrigger>
          <TabsTrigger
            value="examples"
            className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-aurora data-[state=active]:text-aurora data-[state=active]:bg-white/5 data-[state=active]:shadow-none px-4 text-xs font-medium transition-all"
          >
            Examples {problem.examples_json?.length ? `(${problem.examples_json.length})` : ""}
          </TabsTrigger>
          <TabsTrigger
            value="constraints"
            className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-aurora data-[state=active]:text-aurora data-[state=active]:bg-white/5 data-[state=active]:shadow-none px-4 text-xs font-medium transition-all"
          >
            Constraints
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* Description */}
          <TabsContent value="description" className="m-0 h-full outline-none text-muted-foreground">
            {problem.description_md ? (
              <div className="prose prose-invert max-w-none text-xs leading-relaxed whitespace-pre-wrap font-sans text-gray-300">
                {problem.description_md}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground py-4">
                No description provided for this problem yet. Use the code editor to practice logic and algorithms.
              </div>
            )}
          </TabsContent>

          {/* Examples */}
          <TabsContent value="examples" className="m-0 h-full outline-none flex flex-col gap-4">
            {problem.examples_json && problem.examples_json.length > 0 ? (
              problem.examples_json.map((example: any, i: number) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <h4 className="text-white font-medium mb-2 text-xs">Example {i + 1}:</h4>
                  <div className="space-y-1.5 text-xs font-mono text-muted-foreground">
                    <div className="flex">
                      <span className="text-white/50 w-16 shrink-0">Input:</span>
                      <span className="break-all text-gray-200">{example.input}</span>
                    </div>
                    <div className="flex">
                      <span className="text-white/50 w-16 shrink-0">Output:</span>
                      <span className="break-all text-gray-200">{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="flex mt-1.5 pt-1.5 border-t border-white/5">
                        <span className="text-white/50 w-16 shrink-0 font-sans">Explain:</span>
                        <span className="font-sans text-xs text-gray-400 break-words">
                          {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : sampleTests.length > 0 ? (
              sampleTests.map((test, i) => (
                <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10 font-mono text-xs">
                  <h4 className="text-white font-medium mb-2 font-sans">Sample Case {i + 1}:</h4>
                  <div className="space-y-1">
                    <div><span className="text-white/50">Input:</span> {test.input}</div>
                    <div><span className="text-white/50">Expected:</span> {test.expected_output}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-xs text-muted-foreground py-4">No example test cases available.</div>
            )}
          </TabsContent>

          {/* Constraints */}
          <TabsContent value="constraints" className="m-0 h-full outline-none">
            {problem.constraints_md ? (
              <div className="bg-white/5 rounded-lg p-3 border border-white/10 font-mono text-xs text-gray-300 whitespace-pre-wrap">
                {problem.constraints_md}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground py-4">Standard time/memory constraints apply.</div>
            )}
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer link to LeetCode as secondary action */}
      {problem.leetcode_url && (
        <div className="flex-none p-2.5 border-t border-white/10 bg-black/20 flex justify-between items-center text-xs">
          <span className="text-muted-foreground text-[11px]">External Problem Link:</span>
          <a
            href={problem.leetcode_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-aurora hover:underline font-medium transition-colors"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            View on LeetCode
          </a>
        </div>
      )}
    </div>
  );
};
