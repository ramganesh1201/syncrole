import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const atlassianProfile: CompanyProfile = {
  id: "atlassian",
  name: "Atlassian",
  tier: 2,
  hiringDifficulty: "High",
  description: "Provider of team collaboration software (Jira, Confluence, Trello, Bitbucket).",
  similarCompanies: ["adobe", "servicenow", "microsoft"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.95,
    dataSource: "SyncRole Benchmark & Atlassian Engineering Rubric",
    region: "global",
  },
  roles: createDefaultRoleMap({
    frontend: {
      weights: {
        dsaWeight: 70,
        systemDesignWeight: 80,
        resumeWeight: 80,
        githubWeight: 75,
        communicationWeight: 85,
        behavioralWeight: 80,
        projectsWeight: 85,
        skillsWeight: 90,
      },
      coreTechnologies: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    },
    fullstack: {
      weights: {
        dsaWeight: 75,
        systemDesignWeight: 85,
        resumeWeight: 80,
        githubWeight: 75,
        communicationWeight: 85,
        behavioralWeight: 80,
        projectsWeight: 85,
        skillsWeight: 85,
      },
    },
  }),
};
