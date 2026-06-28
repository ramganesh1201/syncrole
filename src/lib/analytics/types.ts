export type TopicInsight = {
  topic: string;
  mastery: number;
  problems_solved: number;
  status: "mastered" | "progressing" | "weak";
  skillLevel: string;
  explanation: string;
};

export type StrengthWeakness = {
  topic: string;
  reason: string;
  recommendation: string;
  estimatedTime: string;
};

export type CompanyProfile = {
  name: string;
  readiness: number;
  strong: string[];
  missing: string[];
  confidence: string;
};

export type DNA = {
  name: string;
  score: number;
};

export type Pattern = {
  name: string;
  mastery: number;
};

export type TimelineEvent = {
  title: string;
  desc: string;
  date: string;
  type: 'achievement' | 'milestone';
};

export type WeeklyPlanTask = {
  day: string;
  focus: string;
  tasks: string[];
};

export type DSAPredictions = {
  oa: number;
  live: number;
  technical: number;
  overall: number;
};

export type Roadmap = {
  d7: string;
  d30: string;
  d90: string;
};

export type DSAStats = {
  total_problems: number;
  avg_mastery: number;
  current_streak: number;
  longest_streak: number;
  avg_per_day: number;
  xp_total: number;
};

export type FullDSAAnalytics = {
  insights: TopicInsight[];
  strengths: StrengthWeakness[];
  weaknesses: StrengthWeakness[];
  companies: CompanyProfile[];
  dna: DNA[];
  patterns: Pattern[];
  weeklyPlan: WeeklyPlanTask[];
  predictions: DSAPredictions;
  timeline: TimelineEvent[];
  roadmap: Roadmap;
  stats: DSAStats;
};
