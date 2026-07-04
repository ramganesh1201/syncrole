// SyncRole domain constants (client-safe)

export const LEVELS = [
  { lvl: 1, name: "Career Explorer", min: 0 },
  { lvl: 2, name: "Skill Builder", min: 200 },
  { lvl: 3, name: "Growth Seeker", min: 500 },
  { lvl: 4, name: "Placement Ready", min: 1000 },
  { lvl: 5, name: "Interview Pro", min: 2000 },
  { lvl: 6, name: "Offer Hunter", min: 4000 },
  { lvl: 7, name: "Career Master", min: 7500 },
];

export function levelProgress(totalXp: number) {
  const idx = LEVELS.findIndex(
    (l, i) => totalXp >= l.min && (i === LEVELS.length - 1 || totalXp < LEVELS[i + 1].min),
  );
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1];
  if (!next) return { cur, next: null, pct: 100, toNext: 0 };
  const span = next.min - cur.min;
  const into = totalXp - cur.min;
  return { cur, next, pct: Math.round((into / span) * 100), toNext: next.min - totalXp };
}

export const XP = {
  RESUME_UPLOAD: 50,
  GITHUB_CONNECT: 50,
  MISSION_COMPLETE: 20,
  DSA_PROBLEM: 10,
  MOCK_INTERVIEW: 40,
  PROFILE_COMPLETE: 30,
  ONBOARDING_STEP: 15,
};

export const ACHIEVEMENT_CATALOG: Record<string, { name: string; desc: string; icon: string; rarity: "Common" | "Rare" | "Epic" | "Legendary" }> = {
  // Account & Profile
  first_login: { name: "First Steps", desc: "Welcome to SyncRole", icon: "Rocket", rarity: "Common" },
  profile_completed: { name: "Profile Complete", desc: "100% profile setup", icon: "CheckCircle", rarity: "Common" },
  skill_explorer: { name: "Skill Explorer", desc: "Added 5+ skills", icon: "Target", rarity: "Common" },
  portfolio_ready: { name: "Portfolio Ready", desc: "Added 3+ projects", icon: "Briefcase", rarity: "Rare" },
  
  // Daily Activity & Streaks
  streak_3: { name: "Warming Up", desc: "3-day streak", icon: "Flame", rarity: "Common" },
  streak_7: { name: "On Fire", desc: "7-day streak", icon: "Flame", rarity: "Rare" },
  streak_14: { name: "Consistency", desc: "14-day streak", icon: "Flame", rarity: "Epic" },
  streak_30: { name: "Unstoppable", desc: "30-day streak", icon: "Diamond", rarity: "Legendary" },
  streak_100: { name: "Centurion", desc: "100-day streak", icon: "Crown", rarity: "Legendary" },
  early_bird: { name: "Early Bird", desc: "Activity before 8 AM", icon: "Sun", rarity: "Common" },
  night_owl: { name: "Night Owl", desc: "Activity after 10 PM", icon: "Moon", rarity: "Common" },

  // DSA
  dsa_first: { name: "First Problem", desc: "Solved 1 DSA problem", icon: "Code", rarity: "Common" },
  dsa_10: { name: "DSA Beginner", desc: "Solved 10 problems", icon: "Terminal", rarity: "Common" },
  dsa_50: { name: "DSA Pro", desc: "Solved 50 problems", icon: "Cpu", rarity: "Rare" },
  dsa_100: { name: "DSA Master", desc: "Solved 100 problems", icon: "Brain", rarity: "Epic" },
  dsa_250: { name: "DSA Grandmaster", desc: "Solved 250 problems", icon: "Trophy", rarity: "Legendary" },
  easy_master: { name: "Easy Master", desc: "Solved 50 Easy problems", icon: "CheckSquare", rarity: "Rare" },
  medium_master: { name: "Medium Master", desc: "Solved 50 Medium problems", icon: "Activity", rarity: "Epic" },
  hard_challenger: { name: "Hard Challenger", desc: "Solved 10 Hard problems", icon: "ShieldAlert", rarity: "Epic" },
  dsa_streak_5: { name: "Algorithm Addict", desc: "5-day DSA streak", icon: "Zap", rarity: "Rare" },
  perfect_solution: { name: "Perfect Solution", desc: "O(1) space complexity", icon: "Maximize", rarity: "Rare" },

  // Resume
  resume_uploaded: { name: "First Draft", desc: "Uploaded a resume", icon: "FileText", rarity: "Common" },
  resume_70: { name: "Resume Ready", desc: "ATS score ≥ 70", icon: "FileCheck", rarity: "Common" },
  resume_85: { name: "Polished Resume", desc: "ATS score ≥ 85", icon: "Award", rarity: "Rare" },
  resume_95: { name: "Resume Excellence", desc: "ATS score ≥ 95", icon: "Medal", rarity: "Epic" },
  keyword_hunter: { name: "Keyword Hunter", desc: "Matched 20+ keywords", icon: "Key", rarity: "Rare" },
  ats_optimized: { name: "ATS Optimized", desc: "Zero formatting errors", icon: "LayoutTemplate", rarity: "Epic" },

  // GitHub
  github_connected: { name: "GitHub Connected", desc: "Linked GitHub profile", icon: "Github", rarity: "Common" },
  github_100_commits: { name: "Active Contributor", desc: "100+ commits", icon: "GitCommit", rarity: "Rare" },
  github_500_commits: { name: "Code Machine", desc: "500+ commits", icon: "GitMerge", rarity: "Epic" },
  open_source_explorer: { name: "Open Source", desc: "Contributed to open source", icon: "Globe", rarity: "Rare" },
  star_collector: { name: "Star Collector", desc: "Earned 50+ stars", icon: "Star", rarity: "Epic" },
  polyglot: { name: "Polyglot", desc: "Used 5+ languages", icon: "Code2", rarity: "Rare" },

  // Interviews & SyncPilot
  first_mock: { name: "First Mock", desc: "Completed 1 mock interview", icon: "Mic", rarity: "Common" },
  mock_5: { name: "Interview Prep", desc: "Completed 5 mock interviews", icon: "Video", rarity: "Rare" },
  mock_10: { name: "Interview Pro", desc: "Completed 10 mock interviews", icon: "MonitorPlay", rarity: "Epic" },
  communication_expert: { name: "Communication Expert", desc: "Score 90+ in communication", icon: "MessageSquare", rarity: "Epic" },
  behavioral_ace: { name: "Behavioral Ace", desc: "Aced STAR method", icon: "Users", rarity: "Rare" },
  technical_guru: { name: "Technical Guru", desc: "Aced technical round", icon: "TerminalSquare", rarity: "Rare" },
  system_design: { name: "Architect", desc: "Aced system design", icon: "Layers", rarity: "Epic" },

  // Overall Placement
  placement_50: { name: "Halfway There", desc: "Placement score ≥ 50", icon: "TrendingUp", rarity: "Common" },
  placement_80: { name: "Placement Ready", desc: "Placement score ≥ 80", icon: "Target", rarity: "Epic" },
  placement_95: { name: "Top 1%", desc: "Placement score ≥ 95", icon: "Crown", rarity: "Legendary" },
  offer_received: { name: "Mission Accomplished", desc: "Reported a job offer", icon: "PartyPopper", rarity: "Legendary" },
};

export const MISSION_TEMPLATES = [
  { code: "dsa_3", title: "Solve 2 Medium Problems", description: "Practice algorithms", target: 2, xp_reward: 30 },
  { code: "skill_add", title: "Update Your Skills", description: "Add a new skill to profile", target: 1, xp_reward: 20 },
  { code: "github_check", title: "Push to GitHub", description: "Commit code today", target: 1, xp_reward: 25 },
  { code: "mock_interview", title: "Complete Mock Interview", description: "Practice with SyncPilot", target: 1, xp_reward: 40 },
  { code: "resume_polish", title: "Complete Resume Review", description: "Use Resume Intelligence", target: 1, xp_reward: 25 },
];

export function getProfileCompletionStatus(p: any, resumeUpload: boolean = false) {
  const fields = [
    { key: p.full_name, label: "Add Basic Details" },
    { key: p.college, label: "Add Education" },
    { key: p.graduation_year, label: "Add Graduation Year" },
    { key: p.career_goal, label: "Set Career Goal" },
    { key: (p.skills?.length ?? 0) > 0 ? "x" : null, label: "Add Top Skills" },
    { key: p.github_username, label: "Connect GitHub" },
    { key: resumeUpload ? "x" : null, label: "Upload Resume" },
  ];
  const missing = fields.filter(f => !f.key).map(f => f.label);
  const filled = fields.length - missing.length;
  const pct = Math.round((filled / fields.length) * 100);
  return { pct, missing };
}
