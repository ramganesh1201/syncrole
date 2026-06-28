import { TopicInsight } from "./types";

export function determineSkillLevel(mastery: number): string {
  if (mastery >= 90) return "Master";
  if (mastery >= 80) return "Expert";
  if (mastery >= 60) return "Advanced";
  if (mastery >= 40) return "Intermediate";
  return "Beginner";
}

export function calculateInsights(topicsData: any[], solvedData: any[]): TopicInsight[] {
  return topicsData.map((t: any) => {
    const m = t.mastery_score ?? 0;
    const topicName = t.topic?.name ?? "Unknown";
    const solved = solvedData.filter((p: any) => p.problem?.topic_id === t.topic_id).length;
    
    let exp = "";
    if (m >= 80) exp = "High consistency and strong medium/hard performance.";
    else if (m >= 50) exp = "Solid fundamentals, needs more medium problem practice.";
    else exp = "Early stages, focus on foundational patterns and easy problems.";

    return {
      topic: topicName,
      mastery: m,
      problems_solved: solved,
      status: m >= 80 ? "mastered" : m >= 50 ? "progressing" : "weak",
      skillLevel: determineSkillLevel(m),
      explanation: exp
    };
  });
}
