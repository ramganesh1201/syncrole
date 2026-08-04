import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const googleProfile: CompanyProfile = {
  id: "google",
  name: "Google",
  tier: 1,
  hiringDifficulty: "Very High",
  description: "Global technology leader in search, cloud computing, AI, and consumer hardware.",
  similarCompanies: ["microsoft", "meta", "amazon", "apple"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.98,
    dataSource: "SyncRole Benchmark & Tech Hiring Standards",
    region: "global",
  },
  roles: createDefaultRoleMap({
    frontend: {
      weights: {
        dsaWeight: 90,
        systemDesignWeight: 80,
        resumeWeight: 70,
        githubWeight: 65,
        communicationWeight: 80,
        behavioralWeight: 75,
        projectsWeight: 70,
        skillsWeight: 85,
      },
      requiredSkills: [
        { name: "Data Structures", category: "Core CS", priority: "High", mandatory: true },
        { name: "Algorithms", category: "Core CS", priority: "High", mandatory: true },
        { name: "TypeScript", category: "Languages", priority: "High", mandatory: true },
        { name: "React", category: "Frameworks", priority: "High", mandatory: true },
        { name: "Web Performance", category: "Architecture", priority: "High", mandatory: true },
        { name: "System Design", category: "Architecture", priority: "High", mandatory: false },
      ],
      coreTechnologies: ["TypeScript", "React", "JavaScript", "HTML/CSS", "Web Vitals", "C++"],
      projectExpectations: "Large scale web applications, accessibility, high performance UI rendering, complex state management.",
      keyPriorities: [
        { title: "DSA & Problem Solving", level: "High", description: "O(N log N) optimization, Graphs, Dynamic Programming" },
        { title: "Frontend Architecture", level: "High", description: "DOM optimization, bundle size, state synchronization" },
        { title: "Google Leadership Principles", level: "Medium", description: "Googleyness, collaboration, ambiguity navigation" },
      ],
    },
    backend: {
      weights: {
        dsaWeight: 95,
        systemDesignWeight: 90,
        resumeWeight: 75,
        githubWeight: 70,
        communicationWeight: 75,
        behavioralWeight: 75,
        projectsWeight: 70,
        skillsWeight: 85,
      },
      requiredSkills: [
        { name: "Data Structures", category: "Core CS", priority: "High", mandatory: true },
        { name: "Algorithms", category: "Core CS", priority: "High", mandatory: true },
        { name: "Distributed Systems", category: "Architecture", priority: "High", mandatory: true },
        { name: "C++", category: "Languages", priority: "Medium", mandatory: false },
        { name: "Java", category: "Languages", priority: "Medium", mandatory: false },
        { name: "Python", category: "Languages", priority: "Medium", mandatory: false },
      ],
      coreTechnologies: ["C++", "Java", "Go", "Python", "gRPC", "Protobuf", "Spanner", "Borg"],
      keyPriorities: [
        { title: "Algorithmic Rigor", level: "High", description: "Flawless time/space complexity analysis and edge case coverage" },
        { title: "Distributed System Design", level: "High", description: "Scalability, fault tolerance, consistency models" },
      ],
    },
    fullstack: {
      weights: {
        dsaWeight: 85,
        systemDesignWeight: 85,
        resumeWeight: 75,
        githubWeight: 70,
        communicationWeight: 80,
        behavioralWeight: 75,
        projectsWeight: 80,
        skillsWeight: 85,
      },
    },
    ai: {
      weights: {
        dsaWeight: 90,
        systemDesignWeight: 85,
        resumeWeight: 85,
        githubWeight: 80,
        communicationWeight: 75,
        behavioralWeight: 70,
        projectsWeight: 85,
        skillsWeight: 90,
      },
    },
  }),
};
