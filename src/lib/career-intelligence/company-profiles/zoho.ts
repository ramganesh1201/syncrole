import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const zohoProfile: CompanyProfile = {
  id: "zoho",
  name: "Zoho",
  tier: 3,
  hiringDifficulty: "Moderate",
  description: "Pioneer in bootstrapped SaaS, CRM, productivity tools, and cloud software.",
  similarCompanies: ["freshworks", "servicenow"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.96,
    dataSource: "SyncRole Benchmark & Zoho Hiring Pattern Analysis",
    region: "india",
  },
  roles: createDefaultRoleMap({
    frontend: {
      weights: {
        dsaWeight: 60,
        systemDesignWeight: 55,
        resumeWeight: 70,
        githubWeight: 75,
        communicationWeight: 70,
        behavioralWeight: 65,
        projectsWeight: 85,
        skillsWeight: 90,
      },
      requiredSkills: [
        { name: "JavaScript", category: "Languages", priority: "High", mandatory: true },
        { name: "Data Structures", category: "Core CS", priority: "High", mandatory: true },
        { name: "React", category: "Frameworks", priority: "High", mandatory: true },
        { name: "DOM Manipulation", category: "Architecture", priority: "High", mandatory: true },
      ],
      coreTechnologies: ["Vanilla JS", "React", "HTML/CSS", "Java", "C++"],
      keyPriorities: [
        { title: "Strong CS Fundamentals", level: "High", description: "C/C++/Java basics, matrix operations, string parsing" },
        { title: "Hands-on Coding Speed", level: "High", description: "Real-time round 2 & 3 live app building" },
      ],
    },
    backend: {
      weights: {
        dsaWeight: 70,
        systemDesignWeight: 60,
        resumeWeight: 70,
        githubWeight: 70,
        communicationWeight: 65,
        behavioralWeight: 60,
        projectsWeight: 80,
        skillsWeight: 85,
      },
      coreTechnologies: ["Java", "C++", "MySQL", "PostgreSQL", "Servlet/JSP"],
    },
  }),
};
