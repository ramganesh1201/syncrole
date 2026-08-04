import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const oracleProfile: CompanyProfile = {
  id: "oracle",
  name: "Oracle",
  tier: 2,
  hiringDifficulty: "Moderate",
  description: "Global cloud infrastructure, database systems, and enterprise software corporation.",
  similarCompanies: ["microsoft", "amazon", "servicenow"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.94,
    dataSource: "SyncRole Benchmark & Oracle Cloud Standards",
    region: "global",
  },
  roles: createDefaultRoleMap({
    backend: {
      weights: {
        dsaWeight: 75,
        systemDesignWeight: 80,
        resumeWeight: 75,
        githubWeight: 65,
        communicationWeight: 70,
        behavioralWeight: 65,
        projectsWeight: 75,
        skillsWeight: 85,
      },
      coreTechnologies: ["Java", "C++", "Oracle DB", "OCI (Oracle Cloud)", "Linux", "Kubernetes"],
    },
  }),
};
