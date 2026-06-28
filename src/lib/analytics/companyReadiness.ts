import { CompanyProfile, TopicInsight } from "./types";

export const COMPANIES = [
  { name: "Google", reqs: ["Graphs", "Dynamic Programming", "Trees"], diff: 90 },
  { name: "Amazon", reqs: ["Trees", "Hash Table", "Strings"], diff: 85 },
  { name: "Microsoft", reqs: ["Linked List", "Arrays", "Strings"], diff: 80 },
  { name: "Adobe", reqs: ["Math", "Dynamic Programming", "Strings"], diff: 80 },
  { name: "Flipkart", reqs: ["Dynamic Programming", "Graphs", "Sorting"], diff: 85 },
  { name: "Atlassian", reqs: ["Hash Table", "Design", "Strings"], diff: 80 },
  { name: "Uber", reqs: ["Graphs", "Design", "Dynamic Programming"], diff: 90 },
  { name: "Walmart Global Tech", reqs: ["Arrays", "Trees", "Hash Table"], diff: 75 }
];

export function calculateCompanyReadiness(
  insightsList: TopicInsight[],
  avgMastery: number
): CompanyProfile[] {
  return COMPANIES.map(c => {
    let matched = 0;
    const strong: string[] = [];
    const missing: string[] = [];
    
    c.reqs.forEach(req => {
      const t = insightsList.find(x => x.topic === req);
      if (t && t.mastery >= 60) {
        matched++;
        strong.push(req);
      } else {
        missing.push(req);
      }
    });

    const baseScore = (matched / c.reqs.length) * 100;
    const penalty = (c.diff - 70) * 0.5;
    const bonus = avgMastery * 0.2;
    const readiness = Math.max(10, Math.min(99, Math.round(baseScore - penalty + bonus)));
    
    return {
      name: c.name,
      readiness,
      strong,
      missing: missing.length ? missing : ["None"],
      confidence: readiness >= 80 ? "High" : readiness >= 50 ? "Medium" : "Low"
    };
  });
}
