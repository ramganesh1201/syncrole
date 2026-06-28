import { Pattern, TopicInsight } from "./types";

export const PATTERN_MAPPING: Record<string, string[]> = {
  "Arrays": ["Sliding Window", "Two Pointer", "Prefix Sum"],
  "Strings": ["Sliding Window", "Two Pointer"],
  "Trees": ["DFS", "BFS"],
  "Graphs": ["Graph Traversal", "Union Find", "Topological Sort"],
  "Stack": ["Monotonic Stack"],
  "Dynamic Programming": ["Knapsack", "Memoization"],
  "Backtracking": ["Permutations"],
  "Math": ["Greedy"]
};

export function calculatePatterns(insightsList: TopicInsight[]): Pattern[] {
  const patternMap = new Map<string, number>();
  
  insightsList.forEach(t => {
    const associatedPatterns = PATTERN_MAPPING[t.topic] || [t.topic];
    associatedPatterns.forEach(p => {
      const current = patternMap.get(p) || 0;
      patternMap.set(p, Math.max(current, t.mastery));
    });
  });

  const derivedPatterns: Pattern[] = Array.from(patternMap.entries())
    .map(([name, mastery]) => ({ name, mastery: Math.round(mastery) }))
    .sort((a,b) => b.mastery - a.mastery);
  
  if (derivedPatterns.length === 0) {
    ["Sliding Window", "Two Pointer", "Binary Search", "Dynamic Programming"].forEach(p => {
      derivedPatterns.push({ name: p, mastery: 10 });
    });
  }

  return derivedPatterns;
}
