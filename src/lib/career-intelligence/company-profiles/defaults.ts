import { CareerRole, RoleExpectation } from "../types";

export function createDefaultRoleMap(
  overrides: Partial<Record<CareerRole, Partial<RoleExpectation>>> = {}
): Record<CareerRole, RoleExpectation> {
  const roles: CareerRole[] = [
    "frontend",
    "backend",
    "fullstack",
    "data",
    "ai",
    "mobile",
    "devops",
    "cloud",
    "security",
  ];

  const result: Partial<Record<CareerRole, RoleExpectation>> = {};

  for (const r of roles) {
    const override = overrides[r] || {};
    result[r] = {
      roleId: r,
      roleTitle: getRoleTitle(r),
      weights: {
        dsaWeight: override.weights?.dsaWeight ?? 70,
        systemDesignWeight: override.weights?.systemDesignWeight ?? 60,
        resumeWeight: override.weights?.resumeWeight ?? 75,
        githubWeight: override.weights?.githubWeight ?? 65,
        communicationWeight: override.weights?.communicationWeight ?? 70,
        behavioralWeight: override.weights?.behavioralWeight ?? 60,
        projectsWeight: override.weights?.projectsWeight ?? 75,
        skillsWeight: override.weights?.skillsWeight ?? 80,
      },
      requiredSkills: override.requiredSkills ?? getDefaultSkillsForRole(r),
      coreTechnologies: override.coreTechnologies ?? getDefaultTechForRole(r),
      interviewPattern: override.interviewPattern ?? getDefaultInterviewPattern(r),
      projectExpectations:
        override.projectExpectations ??
        "Production-ready applications with deployment, error handling, and clean code.",
      experiencePreference: override.experiencePreference ?? "entry",
      keyPriorities: override.keyPriorities ?? [
        { title: "Technical Excellence", level: "High", description: "Demonstrated code quality and problem solving" },
        { title: "Core CS Fundamentals", level: "High", description: "Data structures, algorithms, and OS/Networking" },
      ],
    };
  }

  return result as Record<CareerRole, RoleExpectation>;
}

function getRoleTitle(role: CareerRole): string {
  switch (role) {
    case "frontend": return "Frontend Engineer";
    case "backend": return "Backend Engineer";
    case "fullstack": return "Full Stack Engineer";
    case "data": return "Data Engineer / Analyst";
    case "ai": return "AI / ML Engineer";
    case "mobile": return "Mobile App Developer";
    case "devops": return "DevOps / Infrastructure";
    case "cloud": return "Cloud Engineer";
    case "security": return "Security Engineer";
  }
}

function getDefaultSkillsForRole(role: CareerRole) {
  switch (role) {
    case "frontend":
      return [
        { name: "React", category: "Frameworks" as const, priority: "High" as const, mandatory: true },
        { name: "TypeScript", category: "Languages" as const, priority: "High" as const, mandatory: true },
        { name: "CSS/Tailwind", category: "Frameworks" as const, priority: "Medium" as const, mandatory: false },
        { name: "Data Structures", category: "Core CS" as const, priority: "High" as const, mandatory: true },
      ];
    case "backend":
      return [
        { name: "Node.js", category: "Frameworks" as const, priority: "High" as const, mandatory: true },
        { name: "SQL", category: "Databases" as const, priority: "High" as const, mandatory: true },
        { name: "System Design", category: "Architecture" as const, priority: "High" as const, mandatory: true },
        { name: "Data Structures", category: "Core CS" as const, priority: "High" as const, mandatory: true },
      ];
    default:
      return [
        { name: "JavaScript", category: "Languages" as const, priority: "High" as const, mandatory: true },
        { name: "Data Structures", category: "Core CS" as const, priority: "High" as const, mandatory: true },
        { name: "Git", category: "Cloud/DevOps" as const, priority: "Medium" as const, mandatory: true },
      ];
  }
}

function getDefaultTechForRole(role: CareerRole): string[] {
  switch (role) {
    case "frontend": return ["React", "TypeScript", "Next.js", "HTML5/CSS3", "Vite"];
    case "backend": return ["Node.js", "Python", "Java", "PostgreSQL", "Docker", "Redis"];
    case "fullstack": return ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"];
    case "data": return ["Python", "SQL", "Spark", "Pandas", "Airflow"];
    case "ai": return ["Python", "PyTorch", "TensorFlow", "FastAPI", "OpenAI APIs"];
    case "mobile": return ["React Native", "Flutter", "Swift", "Kotlin"];
    case "devops": return ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"];
    case "cloud": return ["AWS", "Azure", "Docker", "Terraform", "Linux"];
    case "security": return ["Python", "Linux", "OWASP", "Network Security", "Cryptography"];
  }
}

function getDefaultInterviewPattern(role: CareerRole) {
  return [
    { name: "OA / Screening", focus: "DSA & Aptitude", weight: 20, description: "Online assessment with 2-3 algorithmic problems" },
    { name: "Technical Round 1", focus: "Problem Solving & Core Skills", weight: 30, description: "Deep dive into DSA, language fundamentals, and live coding" },
    { name: "Technical Round 2", focus: "System Design / Projects", weight: 30, description: "Architecture discussion or code walkthrough" },
    { name: "Culture & Leadership", focus: "Behavioral & Communication", weight: 20, description: "Alignment with company values and communication" },
  ];
}
