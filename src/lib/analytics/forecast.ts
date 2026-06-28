import { DSAPredictions } from "./types";

export function calculateForecast(avgMastery: number): DSAPredictions {
  return {
    oa: Math.min(99, Math.round(avgMastery * 0.8 + 20)),
    live: Math.min(99, Math.round(avgMastery * 0.7 + 10)),
    technical: Math.min(99, Math.round(avgMastery * 0.9)),
    overall: Math.min(99, Math.round(avgMastery * 0.85 + 5))
  };
}
