import { CompanyProfile } from "../types";
import { createDefaultRoleMap } from "./defaults";

export const startupsProfile: CompanyProfile = {
  id: "startups",
  name: "Fast-Growth Tech & AI Startups",
  tier: 4,
  hiringDifficulty: "Accessible",
  description: "High-velocity product teams, YC-backed startups, and emerging AI/Web3 ventures.",
  similarCompanies: ["freshworks", "zoho"],
  metadata: {
    version: "2026.1",
    lastUpdated: "2026-08-01",
    confidenceLevel: 0.95,
    dataSource: "SyncRole Benchmark & Startup Hiring Ecosystem Data",
    region: "global",
  },
  roles: createDefaultRoleMap({
    frontend: {
      weights: {
        dsaWeight: 40,
        systemDesignWeight: 50,
        resumeWeight: 75,
        githubWeight: 90,
        communicationWeight: 80,
        behavioralWeight: 75,
        projectsWeight: 95,
        skillsWeight: 90,
      },
      requiredSkills: [
        { name: "React / Next.js", category: "Frameworks", priority: "High", mandatory: true },
        { name: "TypeScript", category: "Languages", priority: "High", mandatory: true },
        { name: "Tailwind CSS", category: "Frameworks", priority: "High", mandatory: true },
        { name: "Deployment / Vercel", category: "Cloud/DevOps", priority: "High", mandatory: true },
      ],
      coreTechnologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel", "OpenAI API"],
      keyPriorities: [
        { title: "Shipping Velocity & Real Products", level: "High", description: "Deployed live apps with real users, clean UI, and fast execution" },
        { title: "GitHub & Code Quality", level: "High", description: "Active GitHub profile with clear commits, READMEs, and modern tech stack" },
      ],
    },
    backend: {
      weights: {
        dsaWeight: 45,
        systemDesignWeight: 65,
        resumeWeight: 75,
        githubWeight: 90,
        communicationWeight: 80,
        behavioralWeight: 75,
        projectsWeight: 95,
        skillsWeight: 90,
      },
      coreTechnologies: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Supabase", "Redis", "Docker"],
    },
    fullstack: {
      weights: {
        dsaWeight: 45,
        systemDesignWeight: 60,
        resumeWeight: 75,
        githubWeight: 90,
        communicationWeight: 80,
        behavioralWeight: 75,
        projectsWeight: 95,
        skillsWeight: 90,
      },
    },
    ai: {
      weights: {
        dsaWeight: 50,
        systemDesignWeight: 65,
        resumeWeight: 80,
        githubWeight: 95,
        communicationWeight: 80,
        behavioralWeight: 75,
        projectsWeight: 95,
        skillsWeight: 95,
      },
      coreTechnologies: ["Python", "PyTorch", "LangChain", "OpenAI APIs", "Vector DBs (Pinecone/Qdrant)", "FastAPI"],
    },
  }),
};
