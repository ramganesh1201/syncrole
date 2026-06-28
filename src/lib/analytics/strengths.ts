import { StrengthWeakness, TopicInsight } from "./types";

export function calculateStrengths(insightsList: TopicInsight[]): StrengthWeakness[] {
  const sorted = [...insightsList].sort((a, b) => b.mastery - a.mastery);
  return sorted.slice(0, 2).map(t => ({
    topic: t.topic,
    reason: `Excellent performance in ${t.topic}. High solving speed and accuracy.`,
    recommendation: "Maintain with weekly hard problems.",
    estimatedTime: "1 hour/week"
  }));
}

export function calculateWeaknesses(insightsList: TopicInsight[]): StrengthWeakness[] {
  const sorted = [...insightsList].sort((a, b) => b.mastery - a.mastery);
  return sorted.slice(-2).reverse().map(t => ({
    topic: t.topic,
    reason: `${t.topic} shows lower consistency and slower completion times.`,
    recommendation: `Solve 5 easy and 2 medium ${t.topic} problems.`,
    estimatedTime: "3-4 hours"
  }));
}
