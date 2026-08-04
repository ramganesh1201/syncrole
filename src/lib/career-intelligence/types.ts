// Career Intelligence Types & Data Contracts

export type CareerRole =
  | "frontend"
  | "backend"
  | "fullstack"
  | "data"
  | "ai"
  | "mobile"
  | "devops"
  | "cloud"
  | "security";

export type ExperienceLevel = "intern" | "entry" | "junior" | "mid" | "senior";

export type HiringDifficulty = "Accessible" | "Moderate" | "High" | "Very High";

export type Region = "global" | "india" | "us" | "europe" | "apac";

export interface VersionMetadata {
  version: string;
  lastUpdated: string;
  confidenceLevel: number; // 0 to 1
  dataSource: string;
  region?: Region;
}

export interface DimensionWeight {
  dsaWeight: number; // 0 to 100
  systemDesignWeight: number; // 0 to 100
  resumeWeight: number; // 0 to 100
  githubWeight: number; // 0 to 100
  communicationWeight: number; // 0 to 100
  behavioralWeight: number; // 0 to 100
  projectsWeight: number; // 0 to 100
  skillsWeight: number; // 0 to 100
}

export interface SkillRequirement {
  name: string;
  category: "Languages" | "Frameworks" | "Core CS" | "Cloud/DevOps" | "Databases" | "Architecture";
  priority: "High" | "Medium" | "Low";
  mandatory: boolean;
}

export interface InterviewStage {
  name: string;
  focus: string;
  weight: number; // percentage
  description: string;
}

export interface RoleExpectation {
  roleId: CareerRole;
  roleTitle: string;
  weights: DimensionWeight;
  requiredSkills: SkillRequirement[];
  coreTechnologies: string[];
  interviewPattern: InterviewStage[];
  projectExpectations: string;
  experiencePreference: ExperienceLevel;
  keyPriorities: {
    title: string;
    level: "High" | "Medium" | "Low";
    description: string;
  }[];
}

export interface CompanyProfile {
  id: string;
  name: string;
  logoUrl?: string;
  tier: 1 | 2 | 3 | 4; // Tier 1 (FAANG/Big Tech) -> Tier 4 (Startups)
  hiringDifficulty: HiringDifficulty;
  metadata: VersionMetadata;
  roles: Record<CareerRole, RoleExpectation>;
  similarCompanies: string[];
  description: string;
}

export interface UserCareerContext {
  user_id: string;
  target_role: CareerRole;
  dream_companies: string[];
  preferred_location?: string;
  graduation_year?: number;
  experience_level?: ExperienceLevel;
  weekly_study_hours?: number;

  // Existing placement metrics from SyncRole
  placementScore?: number; // 0-100 overall
  dsaScore?: number;
  resumeScore?: number;
  githubScore?: number;
  projectsScore?: number;
  skillScore?: number;
  communicationScore?: number;

  skills: string[];
  githubUsername?: string;
  resumeMissingSkills?: string[];
  resumeAtsScore?: number;
  dsaSolvedCount?: number;
  dsaEasyCount?: number;
  dsaMediumCount?: number;
  dsaHardCount?: number;
}

export interface DimensionBreakdown {
  dimension: string;
  score: number; // 0-100
  weightedScore: number;
  targetWeight: number;
  matchedCount?: number;
  totalRequired?: number;
  missingSkills?: string[];
}

export interface CompanyReadinessResult {
  companyId: string;
  companyName: string;
  roleId: CareerRole;
  roleTitle: string;
  readinessScore: number; // 0-100%
  status: "Ready" | "On Track" | "Needs Focus" | "Long-term Target";
  confidenceScore: number; // 0-100%
  confidenceLabel: "High" | "Medium" | "Low";
  requiredDataPrompts: string[];
  matchedSkills: string[];
  missingSkills: string[];
  dimensionBreakdowns: DimensionBreakdown[];
  profileMetadata: VersionMetadata;
}

export interface SteppingStoneNode {
  companyId: string;
  companyName: string;
  tier: number;
  readinessScore: number;
  status: string;
  recommendedFocus: string;
  estimatedMonthsToTarget: number;
  isTarget: boolean;
}

export interface SteppingStonePath {
  targetCompanyId: string;
  targetCompanyName: string;
  targetRole: CareerRole;
  currentReadinessScore: number;
  nodes: SteppingStoneNode[];
  pathRationale: string;
}

export interface ExplainableRecommendation {
  id: string;
  action: string;
  reason: string;
  targetRequirement: string;
  estimatedGain: string;
  confidenceScore: number;
  confidenceLabel: "High" | "Medium" | "Low";
  sourceModule: "Resume Intelligence" | "GitHub Intelligence" | "DSA Tracker" | "Skill Builder" | "Mock Interview";
  requiredData?: string;
  priority: "High" | "Medium" | "Low";
}

export interface CareerIntelligencePlugin {
  id: string;
  name: string;
  version: string;
  evaluate: (context: UserCareerContext, profile: CompanyProfile) => any;
}
