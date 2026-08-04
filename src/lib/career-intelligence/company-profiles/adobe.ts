import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const adobeProfile: CompanyProfile = {
  id: "adobe",
  name: "Adobe",
  tier: 2,
  hiringDifficulty: "High",
  description: "Global creative software, document management, and digital experience leader.",
  similarCompanies: ["atlassian", "microsoft", "google"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.95,
    dataSource: "SyncRole Benchmark & Adobe Technical Standards",
    region: "global",
  },
  roles: createDefaultRoleMap({
    frontend: {
      weights: {
        dsaWeight: 75,
        systemDesignWeight: 75,
        resumeWeight: 80,
        githubWeight: 75,
        communicationWeight: 75,
        behavioralWeight: 70,
        projectsWeight: 85,
        skillsWeight: 90,
      },
      requiredSkills: [
        { name: "React", category: "Frameworks", priority: "High", mandatory: true },
        { name: "TypeScript", category: "Languages", priority: "High", mandatory: true },
        { name: "Web Graphics / Canvas / WebGL", category: "Architecture", priority: "Medium", mandatory: false },
        { name: "CSS Architecture", category: "Frameworks", priority: "High", mandatory: true },
        { name: "Data Structures", category: "Core CS", priority: "High", mandatory: true },
      ],
      coreTechnologies: ["React", "TypeScript", "C++ / WebAssembly", "Web Content Management", "Node.js"],
      keyPriorities: [
        { title: "Frontend Engineering & UI Systems", level: "High", description: "Design systems, performance rendering, web graphics" },
        { title: "Project & Portfolio Depth", level: "High", description: "Complex web tools, canvas manipulation, rich interaction" },
      ],
    },
    fullstack: {
      weights: {
        dsaWeight: 75,
        systemDesignWeight: 80,
        resumeWeight: 80,
        githubWeight: 75,
        communicationWeight: 75,
        behavioralWeight: 70,
        projectsWeight: 85,
        skillsWeight: 85,
      },
    },
  }),
};
