//#region node_modules/.nitro/vite/services/ssr/assets/syncrole-BmVv4SfO.js
var LEVELS = [
	{
		lvl: 1,
		name: "Career Explorer",
		min: 0
	},
	{
		lvl: 2,
		name: "Skill Builder",
		min: 200
	},
	{
		lvl: 3,
		name: "Growth Seeker",
		min: 500
	},
	{
		lvl: 4,
		name: "Placement Ready",
		min: 1e3
	},
	{
		lvl: 5,
		name: "Interview Pro",
		min: 2e3
	},
	{
		lvl: 6,
		name: "Offer Hunter",
		min: 4e3
	},
	{
		lvl: 7,
		name: "Career Master",
		min: 7500
	}
];
function levelProgress(totalXp) {
	const idx = LEVELS.findIndex((l, i) => totalXp >= l.min && (i === LEVELS.length - 1 || totalXp < LEVELS[i + 1].min));
	const cur = LEVELS[idx];
	const next = LEVELS[idx + 1];
	if (!next) return {
		cur,
		next: null,
		pct: 100,
		toNext: 0
	};
	const span = next.min - cur.min;
	const into = totalXp - cur.min;
	return {
		cur,
		next,
		pct: Math.round(into / span * 100),
		toNext: next.min - totalXp
	};
}
var XP = {
	RESUME_UPLOAD: 50,
	GITHUB_CONNECT: 50,
	MISSION_COMPLETE: 20,
	DSA_PROBLEM: 10,
	MOCK_INTERVIEW: 40,
	PROFILE_COMPLETE: 30,
	ONBOARDING_STEP: 15
};
var ACHIEVEMENT_CATALOG = {
	first_login: {
		name: "First Login",
		desc: "Welcome to SyncRole",
		emoji: "🎉"
	},
	profile_completed: {
		name: "Profile Complete",
		desc: "100% profile completion",
		emoji: "✅"
	},
	resume_uploaded: {
		name: "Resume Uploaded",
		desc: "First resume analyzed",
		emoji: "📄"
	},
	github_connected: {
		name: "GitHub Connected",
		desc: "Code analyzed",
		emoji: "🐙"
	},
	dsa_10: {
		name: "DSA Beginner",
		desc: "10 problems solved",
		emoji: "🧩"
	},
	dsa_50: {
		name: "DSA Pro",
		desc: "50 problems solved",
		emoji: "⚡"
	},
	dsa_100: {
		name: "DSA Master",
		desc: "100 problems solved",
		emoji: "🏆"
	},
	streak_7: {
		name: "On Fire",
		desc: "7-day streak",
		emoji: "🔥"
	},
	streak_30: {
		name: "Unstoppable",
		desc: "30-day streak",
		emoji: "💎"
	},
	resume_85: {
		name: "Polished Resume",
		desc: "Resume score ≥ 85",
		emoji: "📝"
	},
	placement_80: {
		name: "Placement Ready",
		desc: "Placement score ≥ 80",
		emoji: "🚀"
	}
};
var MISSION_TEMPLATES = [
	{
		code: "dsa_3",
		title: "Solve 3 DSA problems",
		description: "Crack any 3 problems today",
		target: 3,
		xp_reward: 30
	},
	{
		code: "skill_add",
		title: "Add a new skill",
		description: "Update your profile with one new skill",
		target: 1,
		xp_reward: 20
	},
	{
		code: "github_check",
		title: "Push to GitHub",
		description: "Commit to any repo today",
		target: 1,
		xp_reward: 25
	},
	{
		code: "mock_interview",
		title: "Take a mock interview",
		description: "Practice an interview round",
		target: 1,
		xp_reward: 40
	},
	{
		code: "resume_polish",
		title: "Improve your resume",
		description: "Tweak one section of your resume",
		target: 1,
		xp_reward: 25
	}
];
function profileCompletionPct(p) {
	const fields = [
		p.full_name,
		p.college,
		p.branch,
		p.graduation_year,
		p.cgpa,
		p.career_goal,
		(p.skills?.length ?? 0) > 0 ? "x" : null,
		p.github_username
	];
	const filled = fields.filter(Boolean).length;
	return Math.round(filled / fields.length * 100);
}
//#endregion
export { profileCompletionPct as a, levelProgress as i, MISSION_TEMPLATES as n, XP as r, ACHIEVEMENT_CATALOG as t };
