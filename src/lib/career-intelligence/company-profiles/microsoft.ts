import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const microsoftProfile: CompanyProfile = {
  id: "microsoft",
  name: "Microsoft",
  tier: 1,
  hiringDifficulty: "High",
  description: "Global cloud, productivity software, OS, and enterprise technology pioneer.",
  similarCompanies: ["google", "amazon", "oracle", "adobe"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.96,
    dataSource: "SyncRole Benchmark & Microsoft Recruiting Standard",
    region: "global",
  },
  roles: createDefaultRoleMap({
    frontend: {
      weights: {
        dsaWeight: 75,
        systemDesignWeight: 70,
        resumeWeight: 80,
        githubWeight: 70,
        communicationWeight: 85,
        behavioralWeight: 80,
        projectsWeight: 80,
        skillsWeight: 85,
      },
      requiredSkills: [
        { name: "React", category: "Frameworks", priority: "High", mandatory: true },
        { name: "TypeScript", category: "Languages", priority: "High", mandatory: true },
        { name: "Data Structures", category: "Core CS", priority: "High", mandatory: true },
        { name: "C# / .NET", category: "Languages", priority: "Medium", mandatory: false },
        { name: "Accessibility (a11y)", category: "Architecture", priority: "High", mandatory: false },
      ],
      coreTechnologies: ["React", "TypeScript", "C#", "Azure", "GraphQL", "Fluent UI"],
      keyPriorities: [
        { title: "Production Projects", level: "High", description: "Clean code structure, modular component design, testing" },
        { title: "Communication & STAR Method", level: "High", description: "Clear explanation of technical trade-offs and behavioral scenarios" },
      ],
    },
    backend: {
      weights: {
        dsaWeight: 85,
        systemDesignWeight: 85,
        resumeWeight: 80,
        githubWeight: 70,
        communicationWeight: 80,
        behavioralWeight: 80,
        projectsWeight: 75,
        skillsWeight: 85,
      },
      coreTechnologies: ["C#", ".NET Core", "Java", "Azure", "SQL Server", "CosmosDB"],
    },
    fullstack: {
      weights: {
        dsaWeight: 80,
        systemDesignWeight: 80,
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
