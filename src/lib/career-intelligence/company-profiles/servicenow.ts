import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const servicenowProfile: CompanyProfile = {
  id: "servicenow",
  name: "ServiceNow",
  tier: 2,
  hiringDifficulty: "Moderate",
  description: "Enterprise cloud platform providing digital workflows and IT service management.",
  similarCompanies: ["oracle", "zoho", "freshworks"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.94,
    dataSource: "SyncRole Benchmark & Enterprise Tech Hiring Report",
    region: "global",
  },
  roles: createDefaultRoleMap({
    fullstack: {
      weights: {
        dsaWeight: 70,
        systemDesignWeight: 75,
        resumeWeight: 80,
        githubWeight: 70,
        communicationWeight: 75,
        behavioralWeight: 70,
        projectsWeight: 80,
        skillsWeight: 85,
      },
      coreTechnologies: ["Java", "JavaScript", "React", "SQL", "REST APIs", "Cloud Infrastructure"],
    },
  }),
};
