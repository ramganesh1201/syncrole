import { Roadmap, StrengthWeakness, WeeklyPlanTask } from "./types";

export function generateRoadmap(weaknesses: StrengthWeakness[]): Roadmap {
  const weakTopics = weaknesses.map(w => w.topic);
  const primaryWeakness = weakTopics[0] || 'Graphs';
  
  return {
    d7: `Master ${primaryWeakness} basics`,
    d30: `Complete 50 new problems in ${weakTopics.join(", ") || "various topics"}`,
    d90: `Achieve 80% readiness for top product companies`
  };
}

export function generateWeeklyPlan(weaknesses: StrengthWeakness[]): WeeklyPlanTask[] {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return days.map((day, i) => {
    const focus = weaknesses[i % weaknesses.length]?.topic || "Revision";
    let tasks: string[];
    
    if (i === 4) {
      tasks = ["Contest simulation", "Review mistakes"];
    } else if (i === 6) {
      tasks = ["Recovery", "Light Reading"];
    } else {
      tasks = [`Solve 2 ${focus} problems`, "Review patterns"];
    }
    
    return { day, focus, tasks };
  });
}
