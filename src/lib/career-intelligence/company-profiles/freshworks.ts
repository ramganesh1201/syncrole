import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const freshworksProfile: CompanyProfile = {
  id: "freshworks",
  name: "Freshworks",
  tier: 3,
  hiringDifficulty: "Moderate",
  description: "Global cloud customer engagement software company listed on NASDAQ.",
  similarCompanies: ["zoho", "servicenow", "atlassian"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.95,
    dataSource: "SyncRole Benchmark & Freshworks Product Engineering Standards",
    region: "india",
  },
  roles: createDefaultRoleMap({
    fullstack: {
      weights: {
        dsaWeight: 65,
        systemDesignWeight: 65,
        resumeWeight: 75,
        githubWeight: 75,
        communicationWeight: 75,
        behavioralWeight: 70,
        projectsWeight: 85,
        skillsWeight: 85,
      },
      coreTechnologies: ["Ruby on Rails", "Node.js", "React", "Ember.js", "MySQL", "AWS"],
      keyPriorities: [
        { title: "Product Engineering", level: "High", description: "Building customer facing SaaS products with clean API design" },
        { title: "Portfolio & Open Source", level: "High", description: "Active GitHub contributions and real-world project deployments" },
      ],
    },
  }),
};
