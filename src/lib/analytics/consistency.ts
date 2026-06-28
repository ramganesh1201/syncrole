import { DSAStats } from "./types";

export function calculateConsistency(totalSolved: number, avgMastery: number): DSAStats {
  // Mock implementations for demonstration purposes unless real history tables are queried.
  // In a real scenario, this would evaluate `dsa_progress` logs.
  return {
    total_problems: totalSolved,
    avg_mastery: Math.round(avgMastery),
    current_streak: totalSolved > 0 ? 3 : 0, 
    longest_streak: totalSolved > 0 ? 12 : 0,
    avg_per_day: 1.5,
    xp_total: totalSolved * 15
  };
}
