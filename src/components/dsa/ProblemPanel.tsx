import React from 'react';
import { WorkspaceProblem, SampleTestCase } from "@/lib/services/dsa-workspace.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ExternalLink, CheckCircle2 } from "lucide-react";

interface ProblemPanelProps {
  problem: WorkspaceProblem;
  sampleTests: SampleTestCase[];
  userProgress?: any;
}

const difficultyColor = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

export const ProblemPanel: React.FC<ProblemPanelProps> = ({ problem, sampleTests, userProgress }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden glass rounded-xl border-white/10">
      <div className="flex-none p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-display font-bold text-white">{problem.title}</h2>
          {userProgress?.solved && (
            <div className="flex items-center text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Solved
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-xs px-2 py-1 rounded-md border", difficultyColor[problem.difficulty as keyof typeof difficultyColor] || "text-gray-400 bg-gray-400/10")}>
            {problem.difficulty}
          </span>
          {problem.topic && (
            <span className="text-xs px-2 py-1 rounded-md border border-white/10 bg-white/5 text-muted-foreground">
              {problem.topic}
            </span>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="description" className="flex-1 flex flex-col min-h-0">
        <TabsList className="flex-none w-full justify-start rounded-none border-b border-white/10 bg-transparent h-12 p-0">
          <TabsTrigger value="description" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-aurora data-[state=active]:text-aurora data-[state=active]:bg-white/5 data-[state=active]:shadow-none px-6 transition-all">Description</TabsTrigger>
          <TabsTrigger value="examples" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-aurora data-[state=active]:text-aurora data-[state=active]:bg-white/5 data-[state=active]:shadow-none px-6 transition-all">Examples</TabsTrigger>
          <TabsTrigger value="constraints" className="h-full rounded-none border-b-2 border-transparent data-[state=active]:border-aurora data-[state=active]:text-aurora data-[state=active]:bg-white/5 data-[state=active]:shadow-none px-6 transition-all">Constraints</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <TabsContent value="description" className="m-0 h-full outline-none text-muted-foreground">
            <div className="prose prose-invert max-w-none font-sans text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: problem.description_html || '' }} />
          </TabsContent>
          
          <TabsContent value="examples" className="m-0 h-full outline-none flex flex-col gap-6">
            {problem.examples_json?.map((example: any, i: number) => (
              <div key={i} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-3 text-sm">Example {i + 1}:</h4>
                <div className="space-y-2 text-sm font-mono text-muted-foreground">
                  <div className="flex"><span className="text-white/50 w-20 shrink-0">Input:</span> <span className="break-all text-gray-300">{example.input}</span></div>
                  <div className="flex"><span className="text-white/50 w-20 shrink-0">Output:</span> <span className="break-all text-gray-300">{example.output}</span></div>
                  {example.explanation && (
                    <div className="flex mt-2 pt-2 border-t border-white/5">
                      <span className="text-white/50 w-20 shrink-0 font-sans">Explain:</span> 
                      <span className="font-sans text-xs break-words">{example.explanation}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="constraints" className="m-0 h-full outline-none">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 prose prose-invert max-w-none font-mono text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: problem.constraints_md || '' }} />
          </TabsContent>
        </div>
      </Tabs>
      
      {problem.leetcode_url && (
        <div className="flex-none p-3 border-t border-white/10 bg-black/20">
          <a href={problem.leetcode_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-muted-foreground hover:text-white transition-colors">
            <ExternalLink className="w-3 h-3 mr-1.5" />
            View on LeetCode
          </a>
        </div>
      )}
    </div>
  );
};
