import { DNA, Pattern, TopicInsight } from "./types";

export function calculateCodingDNA(
  totalSolved: number,
  avgMastery: number,
  patterns: Pattern[],
  insightsList: TopicInsight[]
): DNA[] {
  const dpMastery = insightsList.find(t => t.topic === "Dynamic Programming")?.mastery || 0;
  
  const baseDNA = [
    { name: "Problem Solving", score: Math.min(99, 40 + totalSolved * 0.5) },
    { name: "Logical Thinking", score: Math.min(99, 50 + avgMastery * 0.4) },
    { name: "Pattern Recognition", score: patterns[0]?.mastery || 30 },
    { name: "Optimization Skills", score: dpMastery > 0 ? dpMastery + 20 : 30 },
    { name: "Debugging", score: Math.min(99, 60 + (totalSolved * 0.2)) },
    { name: "Time Complexity Understanding", score: Math.min(99, 45 + avgMastery * 0.5) },
    { name: "Space Optimization", score: Math.min(99, 50 + avgMastery * 0.4) },
    { name: "Algorithm Confidence", score: Math.min(99, (totalSolved / 2) + (avgMastery / 2)) }
  ].map(d => ({ ...d, score: Math.round(d.score) }));

  return baseDNA;
}
