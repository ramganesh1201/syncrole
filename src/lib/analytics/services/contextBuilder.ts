import { FullDSAAnalytics } from "../types";

export function buildDSAContext(analytics: FullDSAAnalytics): string {
  const { insights, strengths, weaknesses, companies, dna, patterns, roadmap, stats } = analytics;

  const context = `
DSA Analytics Context:
- Total Solved: ${stats.total_problems}
- Average Mastery: ${stats.avg_mastery}%
- XP: ${stats.xp_total}
- Streak: ${stats.current_streak} days

Coding DNA:
${dna.map(d => `- ${d.name}: ${d.score}%`).join("\n")}

Top Patterns:
${patterns.slice(0, 5).map(p => `- ${p.name}: ${p.mastery}%`).join("\n")}

Strengths:
${strengths.map(s => `- ${s.topic}: ${s.reason}`).join("\n")}

Weaknesses:
${weaknesses.map(w => `- ${w.topic}: ${w.reason}`).join("\n")}

Company Readiness:
${companies.filter(c => c.readiness >= 60).map(c => `- ${c.name}: ${c.readiness}%`).join("\n")}

Roadmap:
- 7 Days: ${roadmap.d7}
- 30 Days: ${roadmap.d30}
- 90 Days: ${roadmap.d90}
  `;

  return context.trim();
}
