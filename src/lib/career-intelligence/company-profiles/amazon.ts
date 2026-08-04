import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const amazonProfile: CompanyProfile = {
  id: "amazon",
  name: "Amazon",
  tier: 1,
  hiringDifficulty: "High",
  description: "Global e-commerce, cloud infrastructure (AWS), and AI powerhouse.",
  similarCompanies: ["google", "microsoft", "oracle"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.97,
    dataSource: "SyncRole Benchmark & AWS Leadership Principles Guide",
    region: "global",
  },
  roles: createDefaultRoleMap({
    backend: {
      weights: {
        dsaWeight: 85,
        systemDesignWeight: 85,
        resumeWeight: 75,
        githubWeight: 70,
        communicationWeight: 85,
        behavioralWeight: 95,
        projectsWeight: 75,
        skillsWeight: 85,
      },
      requiredSkills: [
        { name: "Java", category: "Languages", priority: "High", mandatory: true },
        { name: "Data Structures", category: "Core CS", priority: "High", mandatory: true },
        { name: "Object Oriented Design", category: "Architecture", priority: "High", mandatory: true },
        { name: "AWS Services", category: "Cloud/DevOps", priority: "High", mandatory: true },
      ],
      coreTechnologies: ["Java", "Python", "AWS DynamoDB", "AWS S3", "AWS Lambda", "Docker"],
      keyPriorities: [
        { title: "Leadership Principles (LP)", level: "High", description: "Customer Obsession, Ownership, Bias for Action, Invent and Simplify" },
        { title: "Object-Oriented Design (OOD)", level: "High", description: "Clean class diagrams, design patterns, extensibility" },
      ],
    },
    fullstack: {
      weights: {
        dsaWeight: 80,
        systemDesignWeight: 80,
        resumeWeight: 75,
        githubWeight: 70,
        communicationWeight: 85,
        behavioralWeight: 90,
        projectsWeight: 80,
        skillsWeight: 85,
      },
    },
  }),
};
