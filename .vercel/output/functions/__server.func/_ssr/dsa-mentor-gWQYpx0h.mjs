import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { $ as Copy, At as Activity, P as LoaderCircle, Q as Cpu, S as Send, Z as Database, b as ShieldAlert, bt as Briefcase, et as Compass, ft as Check, g as Target, gt as CalendarDays, it as CirclePlay, kt as ArrowLeft, nt as Clock, p as TrendingUp, r as Workflow, t as Zap, tt as CodeXml, v as Sparkles, xt as Brain } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Markdown } from "../_libs/react-markdown+[...].mjs";
import { t as remarkGfm } from "../_libs/remark-gfm.mjs";
import { n as highlighter, t as vsc_dark_plus_default } from "../_libs/react-syntax-highlighter+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dsa-mentor-gWQYpx0h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function calculateCodingDNA(totalSolved, avgMastery, patterns, insightsList) {
	const dpMastery = insightsList.find((t) => t.topic === "Dynamic Programming")?.mastery || 0;
	return [
		{
			name: "Problem Solving",
			score: Math.min(99, 40 + totalSolved * .5)
		},
		{
			name: "Logical Thinking",
			score: Math.min(99, 50 + avgMastery * .4)
		},
		{
			name: "Pattern Recognition",
			score: patterns[0]?.mastery || 30
		},
		{
			name: "Optimization Skills",
			score: dpMastery > 0 ? dpMastery + 20 : 30
		},
		{
			name: "Debugging",
			score: Math.min(99, 60 + totalSolved * .2)
		},
		{
			name: "Time Complexity Understanding",
			score: Math.min(99, 45 + avgMastery * .5)
		},
		{
			name: "Space Optimization",
			score: Math.min(99, 50 + avgMastery * .4)
		},
		{
			name: "Algorithm Confidence",
			score: Math.min(99, totalSolved / 2 + avgMastery / 2)
		}
	].map((d) => ({
		...d,
		score: Math.round(d.score)
	}));
}
var PATTERN_MAPPING = {
	"Arrays": [
		"Sliding Window",
		"Two Pointer",
		"Prefix Sum"
	],
	"Strings": ["Sliding Window", "Two Pointer"],
	"Trees": ["DFS", "BFS"],
	"Graphs": [
		"Graph Traversal",
		"Union Find",
		"Topological Sort"
	],
	"Stack": ["Monotonic Stack"],
	"Dynamic Programming": ["Knapsack", "Memoization"],
	"Backtracking": ["Permutations"],
	"Math": ["Greedy"]
};
function calculatePatterns(insightsList) {
	const patternMap = /* @__PURE__ */ new Map();
	insightsList.forEach((t) => {
		(PATTERN_MAPPING[t.topic] || [t.topic]).forEach((p) => {
			const current = patternMap.get(p) || 0;
			patternMap.set(p, Math.max(current, t.mastery));
		});
	});
	const derivedPatterns = Array.from(patternMap.entries()).map(([name, mastery]) => ({
		name,
		mastery: Math.round(mastery)
	})).sort((a, b) => b.mastery - a.mastery);
	if (derivedPatterns.length === 0) [
		"Sliding Window",
		"Two Pointer",
		"Binary Search",
		"Dynamic Programming"
	].forEach((p) => {
		derivedPatterns.push({
			name: p,
			mastery: 10
		});
	});
	return derivedPatterns;
}
var COMPANIES = [
	{
		name: "Google",
		reqs: [
			"Graphs",
			"Dynamic Programming",
			"Trees"
		],
		diff: 90
	},
	{
		name: "Amazon",
		reqs: [
			"Trees",
			"Hash Table",
			"Strings"
		],
		diff: 85
	},
	{
		name: "Microsoft",
		reqs: [
			"Linked List",
			"Arrays",
			"Strings"
		],
		diff: 80
	},
	{
		name: "Adobe",
		reqs: [
			"Math",
			"Dynamic Programming",
			"Strings"
		],
		diff: 80
	},
	{
		name: "Flipkart",
		reqs: [
			"Dynamic Programming",
			"Graphs",
			"Sorting"
		],
		diff: 85
	},
	{
		name: "Atlassian",
		reqs: [
			"Hash Table",
			"Design",
			"Strings"
		],
		diff: 80
	},
	{
		name: "Uber",
		reqs: [
			"Graphs",
			"Design",
			"Dynamic Programming"
		],
		diff: 90
	},
	{
		name: "Walmart Global Tech",
		reqs: [
			"Arrays",
			"Trees",
			"Hash Table"
		],
		diff: 75
	}
];
function calculateCompanyReadiness(insightsList, avgMastery) {
	return COMPANIES.map((c) => {
		let matched = 0;
		const strong = [];
		const missing = [];
		c.reqs.forEach((req) => {
			const t = insightsList.find((x) => x.topic === req);
			if (t && t.mastery >= 60) {
				matched++;
				strong.push(req);
			} else missing.push(req);
		});
		const baseScore = matched / c.reqs.length * 100;
		const penalty = (c.diff - 70) * .5;
		const bonus = avgMastery * .2;
		const readiness = Math.max(10, Math.min(99, Math.round(baseScore - penalty + bonus)));
		return {
			name: c.name,
			readiness,
			strong,
			missing: missing.length ? missing : ["None"],
			confidence: readiness >= 80 ? "High" : readiness >= 50 ? "Medium" : "Low"
		};
	});
}
function calculateStrengths(insightsList) {
	return [...insightsList].sort((a, b) => b.mastery - a.mastery).slice(0, 2).map((t) => ({
		topic: t.topic,
		reason: `Excellent performance in ${t.topic}. High solving speed and accuracy.`,
		recommendation: "Maintain with weekly hard problems.",
		estimatedTime: "1 hour/week"
	}));
}
function calculateWeaknesses(insightsList) {
	return [...insightsList].sort((a, b) => b.mastery - a.mastery).slice(-2).reverse().map((t) => ({
		topic: t.topic,
		reason: `${t.topic} shows lower consistency and slower completion times.`,
		recommendation: `Solve 5 easy and 2 medium ${t.topic} problems.`,
		estimatedTime: "3-4 hours"
	}));
}
function calculateForecast(avgMastery) {
	return {
		oa: Math.min(99, Math.round(avgMastery * .8 + 20)),
		live: Math.min(99, Math.round(avgMastery * .7 + 10)),
		technical: Math.min(99, Math.round(avgMastery * .9)),
		overall: Math.min(99, Math.round(avgMastery * .85 + 5))
	};
}
function generateRoadmap(weaknesses) {
	const weakTopics = weaknesses.map((w) => w.topic);
	return {
		d7: `Master ${weakTopics[0] || "Graphs"} basics`,
		d30: `Complete 50 new problems in ${weakTopics.join(", ") || "various topics"}`,
		d90: `Achieve 80% readiness for top product companies`
	};
}
function generateWeeklyPlan(weaknesses) {
	return [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday"
	].map((day, i) => {
		const focus = weaknesses[i % weaknesses.length]?.topic || "Revision";
		let tasks;
		if (i === 4) tasks = ["Contest simulation", "Review mistakes"];
		else if (i === 6) tasks = ["Recovery", "Light Reading"];
		else tasks = [`Solve 2 ${focus} problems`, "Review patterns"];
		return {
			day,
			focus,
			tasks
		};
	});
}
function calculateConsistency(totalSolved, avgMastery) {
	return {
		total_problems: totalSolved,
		avg_mastery: Math.round(avgMastery),
		current_streak: totalSolved > 0 ? 3 : 0,
		longest_streak: totalSolved > 0 ? 12 : 0,
		avg_per_day: 1.5,
		xp_total: totalSolved * 15
	};
}
function determineSkillLevel(mastery) {
	if (mastery >= 90) return "Master";
	if (mastery >= 80) return "Expert";
	if (mastery >= 60) return "Advanced";
	if (mastery >= 40) return "Intermediate";
	return "Beginner";
}
function calculateInsights(topicsData, solvedData) {
	return topicsData.map((t) => {
		const m = t.mastery_score ?? 0;
		const topicName = t.topic?.name ?? "Unknown";
		const solved = solvedData.filter((p) => p.problem?.topic_id === t.topic_id).length;
		let exp = "";
		if (m >= 80) exp = "High consistency and strong medium/hard performance.";
		else if (m >= 50) exp = "Solid fundamentals, needs more medium problem practice.";
		else exp = "Early stages, focus on foundational patterns and easy problems.";
		return {
			topic: topicName,
			mastery: m,
			problems_solved: solved,
			status: m >= 80 ? "mastered" : m >= 50 ? "progressing" : "weak",
			skillLevel: determineSkillLevel(m),
			explanation: exp
		};
	});
}
var AnalyticsEngine = class {
	static async analyze(userId) {
		const [topicRes, problemRes] = await Promise.all([supabase.from("user_topic_progress").select("topic_id, mastery_score, completed_percent, topic:dsa_topics(name)").eq("user_id", userId), supabase.from("user_problem_progress").select("*, problem:dsa_problems(id, topic_id)").eq("user_id", userId).eq("solved", true)]);
		if (topicRes.error) throw topicRes.error;
		if (problemRes.error) throw problemRes.error;
		const topicsData = topicRes.data ?? [];
		const solvedData = problemRes.data ?? [];
		const totalSolved = solvedData.length;
		const insights = calculateInsights(topicsData, solvedData);
		const avgMastery = insights.length > 0 ? insights.reduce((a, t) => a + t.mastery, 0) / insights.length : 0;
		const patterns = calculatePatterns(insights);
		const strengths = calculateStrengths(insights);
		const weaknesses = calculateWeaknesses(insights);
		const companies = calculateCompanyReadiness(insights, avgMastery);
		const dna = calculateCodingDNA(totalSolved, avgMastery, patterns, insights);
		const weeklyPlan = generateWeeklyPlan(weaknesses);
		const predictions = calculateForecast(avgMastery);
		const roadmap = generateRoadmap(weaknesses);
		const stats = calculateConsistency(totalSolved, avgMastery);
		const timeline = [{
			title: "Started Journey",
			desc: "Began DSA Preparation",
			date: "Month 1",
			type: "milestone"
		}];
		if (totalSolved > 0) timeline.push({
			title: "First Problem",
			desc: "Solved first DSA problem",
			date: "Month 1",
			type: "achievement"
		});
		if (totalSolved >= 50) timeline.push({
			title: "Consistency Builder",
			desc: "Reached 50 problems",
			date: "Month 2",
			type: "milestone"
		});
		if (totalSolved >= 100) timeline.push({
			title: "Centurion",
			desc: "Crossed 100 problems",
			date: "Month 3",
			type: "achievement"
		});
		return {
			insights,
			strengths,
			weaknesses,
			companies,
			dna,
			patterns,
			weeklyPlan,
			predictions,
			timeline,
			roadmap,
			stats
		};
	}
};
function buildDSAContext(analytics) {
	const { insights, strengths, weaknesses, companies, dna, patterns, roadmap, stats } = analytics;
	return `
DSA Analytics Context:
- Total Solved: ${stats.total_problems}
- Average Mastery: ${stats.avg_mastery}%
- XP: ${stats.xp_total}
- Streak: ${stats.current_streak} days

Coding DNA:
${dna.map((d) => `- ${d.name}: ${d.score}%`).join("\n")}

Top Patterns:
${patterns.slice(0, 5).map((p) => `- ${p.name}: ${p.mastery}%`).join("\n")}

Strengths:
${strengths.map((s) => `- ${s.topic}: ${s.reason}`).join("\n")}

Weaknesses:
${weaknesses.map((w) => `- ${w.topic}: ${w.reason}`).join("\n")}

Company Readiness:
${companies.filter((c) => c.readiness >= 60).map((c) => `- ${c.name}: ${c.readiness}%`).join("\n")}

Roadmap:
- 7 Days: ${roadmap.d7}
- 30 Days: ${roadmap.d30}
- 90 Days: ${roadmap.d90}
  `.trim();
}
var OpenRouterService = class {
	static async invokeChat(message, analytics, conversationId) {
		let dsaContext = "";
		if (analytics) dsaContext = buildDSAContext(analytics);
		const { data, error } = await supabase.functions.invoke("syncpilot-chat", { body: {
			message,
			mode: "dsa_mentor",
			dsaContext,
			conversation_id: conversationId
		} });
		if (error) {
			console.error("Error calling OpenRouter via edge function:", error);
			throw error;
		}
		return {
			reply: data.reply,
			conversation_id: data.conversation_id
		};
	}
};
function MarkdownRenderer({ content, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("prose prose-invert max-w-none break-words prose-pre:bg-transparent prose-pre:p-0", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, {
			remarkPlugins: [remarkGfm],
			components: {
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					const language = match ? match[1] : "";
					if (!inline && match) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
						language,
						value: String(children).replace(/\n$/, ""),
						...props
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: cn("bg-white/10 px-1.5 py-0.5 rounded-md text-[13px] font-mono text-aurora/90 border border-white/5", className),
						...props,
						children
					});
				},
				h1: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: cn("mt-8 scroll-m-20 text-2xl font-bold tracking-tight text-white mb-6", className),
					...props
				}),
				h2: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: cn("mt-8 scroll-m-20 border-b border-white/10 pb-3 text-xl font-semibold tracking-tight text-white first:mt-0 mb-5", className),
					...props
				}),
				h3: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: cn("mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-white mb-4", className),
					...props
				}),
				p: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("leading-7 [&:not(:first-child)]:mt-5 mb-5 text-slate-300", className),
					...props
				}),
				ul: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: cn("my-5 ml-6 list-disc space-y-2 marker:text-slate-500", className),
					...props
				}),
				ol: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: cn("my-5 ml-6 list-decimal space-y-2 marker:text-slate-500", className),
					...props
				}),
				li: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: cn("text-slate-300 leading-relaxed", className),
					...props
				}),
				strong: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: cn("font-semibold text-white", className),
					...props
				}),
				table: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-6 w-full overflow-y-auto rounded-lg border border-white/10 bg-black/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
						className: cn("w-full border-collapse text-sm text-left", className),
						...props
					})
				}),
				tr: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: cn("m-0 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors", className),
					...props
				}),
				th: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: cn("px-4 py-3 font-semibold text-white bg-white/5", className),
					...props
				}),
				td: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: cn("px-4 py-3 text-slate-300", className),
					...props
				}),
				blockquote: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: cn("mt-6 mb-6 border-l-4 border-aurora/50 bg-aurora/5 px-6 py-4 rounded-r-lg italic text-slate-300", className),
					...props
				}),
				hr: ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {
					className: cn("my-8 border-white/10", className),
					...props
				})
			},
			children: content
		})
	});
}
function CodeBlock({ language, value, ...props }) {
	const [isCopied, setIsCopied] = (0, import_react.useState)(false);
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(value);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2e3);
		} catch (err) {
			console.error("Failed to copy code: ", err);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative my-6 overflow-hidden rounded-lg border bg-background text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between bg-[#1e1e1e] px-4 py-2.5 border-b border-white/10 rounded-t-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-red-500/80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-yellow-500/80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-green-500/80" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-mono text-slate-400 uppercase ml-2",
					children: language || "Code"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: copyToClipboard,
				className: "flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors focus:outline-none bg-white/5 hover:bg-white/10 px-2 py-1 rounded-md",
				title: "Copy code",
				children: isCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-green-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-green-500",
					children: "Copied!"
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Copy" })] })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(highlighter, {
				language,
				style: vsc_dark_plus_default,
				customStyle: {
					margin: 0,
					padding: "1rem",
					backgroundColor: "transparent",
					fontSize: "0.875rem",
					lineHeight: "1.5"
				},
				PreTag: "div",
				...props,
				children: value
			})
		})]
	});
}
var BOOT_SEQUENCE = [
	"Analyzing Coding Journey...",
	"Evaluating topic mastery...",
	"Checking coding patterns...",
	"Generating personalized roadmap...",
	"Preparing interview insights...",
	"Analysis Complete"
];
function AnimatedNumber({ value }) {
	const [displayValue, setDisplayValue] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let startTime = null;
		const duration = 1200;
		const step = (timestamp) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const ease = 1 - Math.pow(1 - progress, 4);
			setDisplayValue(Math.floor(ease * value));
			if (progress < 1) window.requestAnimationFrame(step);
			else setDisplayValue(value);
		};
		window.requestAnimationFrame(step);
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: displayValue });
}
function DSAMentorPage() {
	const [booting, setBooting] = (0, import_react.useState)(true);
	const [bootStep, setBootStep] = (0, import_react.useState)(0);
	const [dataReady, setDataReady] = (0, import_react.useState)(false);
	const [insights, setInsights] = (0, import_react.useState)([]);
	const [strengths, setStrengths] = (0, import_react.useState)([]);
	const [weaknesses, setWeaknesses] = (0, import_react.useState)([]);
	const [companies, setCompanies] = (0, import_react.useState)([]);
	const [dna, setDna] = (0, import_react.useState)([]);
	const [patterns, setPatterns] = (0, import_react.useState)([]);
	const [weeklyPlan, setWeeklyPlan] = (0, import_react.useState)([]);
	const [predictions, setPredictions] = (0, import_react.useState)({});
	const [roadmap, setRoadmap] = (0, import_react.useState)({});
	const [fullAnalytics, setFullAnalytics] = (0, import_react.useState)(null);
	const [stats, setStats] = (0, import_react.useState)({
		total_problems: 0,
		avg_mastery: 0,
		current_streak: 0,
		longest_streak: 0,
		avg_per_day: 0,
		xp_total: 0
	});
	const chatContainerRef = (0, import_react.useRef)(null);
	const [chatInput, setChatInput] = (0, import_react.useState)("");
	const [chatBusy, setChatBusy] = (0, import_react.useState)(false);
	const [thinkingMessageIndex, setThinkingMessageIndex] = (0, import_react.useState)(0);
	const [chatMessages, setChatMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "I'm your specialized AI Coding Coach. Ask me about algorithms, data structures, complexity, optimization, or debugging.",
		id: "initial-msg"
	}]);
	const THINKING_MESSAGES = [
		"Analyzing your code structure...",
		"Evaluating time and space complexity...",
		"Reviewing pattern intelligence...",
		"Synthesizing optimal solution...",
		"Cross-referencing interview standards..."
	];
	(0, import_react.useEffect)(() => {
		let interval;
		if (chatBusy) interval = setInterval(() => {
			setThinkingMessageIndex((prev) => (prev + 1) % THINKING_MESSAGES.length);
		}, 2500);
		else setThinkingMessageIndex(0);
		return () => clearInterval(interval);
	}, [chatBusy]);
	(0, import_react.useEffect)(() => {
		let currentStep = 0;
		const interval = setInterval(() => {
			currentStep++;
			if (currentStep < BOOT_SEQUENCE.length) setBootStep(currentStep);
			else {
				clearInterval(interval);
				if (dataReady) setTimeout(() => setBooting(false), 800);
			}
		}, 600);
		return () => clearInterval(interval);
	}, [dataReady]);
	(0, import_react.useEffect)(() => {
		if (bootStep === BOOT_SEQUENCE.length - 1 && dataReady) {
			const t = setTimeout(() => setBooting(false), 800);
			return () => clearTimeout(t);
		}
	}, [bootStep, dataReady]);
	(0, import_react.useEffect)(() => {
		if (chatContainerRef.current) chatContainerRef.current.scrollTo({
			top: chatContainerRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [
		chatMessages,
		chatBusy,
		thinkingMessageIndex
	]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function loadData() {
			try {
				const { data: u, error: userErr } = await supabase.auth.getUser();
				if (userErr || !u.user) throw new Error("Authentication required");
				const analytics = await AnalyticsEngine.analyze(u.user.id);
				if (!cancelled) {
					setFullAnalytics(analytics);
					setInsights(analytics.insights);
					setPatterns(analytics.patterns);
					setStrengths(analytics.strengths);
					setWeaknesses(analytics.weaknesses);
					setCompanies(analytics.companies);
					setDna(analytics.dna);
					setWeeklyPlan(analytics.weeklyPlan);
					setPredictions(analytics.predictions);
					setRoadmap(analytics.roadmap);
					setStats(analytics.stats);
					setDataReady(true);
				}
			} catch (err) {
				console.error("Error loading DSA Mentor data:", err);
				if (!cancelled) setDataReady(true);
			}
		}
		loadData();
		return () => {
			cancelled = true;
		};
	}, []);
	async function handleSend() {
		const q = chatInput.trim();
		if (!q) return;
		setChatInput("");
		setChatMessages((m) => [...m, {
			role: "user",
			content: q,
			id: Date.now().toString()
		}]);
		setChatBusy(true);
		try {
			const { reply } = await OpenRouterService.invokeChat(q, fullAnalytics);
			setChatMessages((m) => [...m, {
				role: "assistant",
				content: reply,
				id: (Date.now() + 1).toString()
			}]);
		} catch (err) {
			console.error(err);
			setChatMessages((m) => [...m, {
				role: "assistant",
				content: "I encountered an error connecting to my neural core. Please try again.",
				id: Date.now().toString()
			}]);
		} finally {
			setChatBusy(false);
		}
	}
	if (booting) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-aurora/10 via-background to-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aurora/20 blur-[100px] rounded-full" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .9
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				className: "relative z-10 flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-24 h-24 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { rotate: 360 },
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "linear"
							},
							className: "absolute inset-0 rounded-full border-2 border-aurora/30 border-t-aurora border-r-aurora"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "absolute inset-0 m-auto w-10 h-10 text-aurora" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 relative overflow-hidden w-64 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "popLayout",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									y: 20,
									opacity: 0
								},
								animate: {
									y: 0,
									opacity: 1
								},
								exit: {
									y: -20,
									opacity: 0
								},
								transition: { duration: .3 },
								className: "text-lg font-display font-medium text-foreground absolute inset-0 flex items-center justify-center",
								children: BOOT_SEQUENCE[bootStep]
							}, bootStep)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-64 h-1 bg-white/10 rounded-full mt-6 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "h-full bg-aurora",
							initial: { width: 0 },
							animate: { width: `${(bootStep + 1) / BOOT_SEQUENCE.length * 100}%` },
							transition: { duration: .5 }
						})
					})
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-8 relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 pointer-events-none z-[-1]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-aurora/5 blur-[120px] rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard/dsa",
					className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Exit Coach"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium border border-aurora/20 shadow-[0_0_15px_rgba(var(--aurora-rgb),0.1)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-aurora" }), " Premium AI Coding Coach"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "grid grid-cols-1 xl:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "xl:col-span-1 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:shadow-xl hover:shadow-aurora/5 transition-all duration-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-aurora/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-6 relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-2.5 rounded-xl bg-aurora/10 text-aurora",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "w-5 h-5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-bold",
										children: "Coding DNA"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase font-bold text-aurora/70 bg-aurora/10 px-2 py-1 rounded-md",
									children: "High Confidence"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-5 relative z-10",
								children: dna.length > 0 ? dna.slice(0, 5).map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group/item",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm mb-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground group-hover/item:text-foreground transition-colors",
												children: d.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-green-400",
													children: [
														"↑ ",
														Math.floor(d.score / 15),
														"%"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-mono font-medium",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, { value: d.score }), "%"]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 bg-white/5 rounded-full overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												initial: { width: 0 },
												animate: { width: `${d.score}%` },
												transition: {
													duration: 1,
													delay: i * .1
												},
												className: "h-full bg-gradient-to-r from-aurora/50 to-aurora rounded-full relative",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 w-1/3 blur-sm animate-[shimmer_2s_infinite]" })
											})
										}),
										i === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 text-xs text-muted-foreground bg-white/5 p-2 rounded-md border border-white/5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-aurora font-medium",
													children: "AI Insight:"
												}),
												" Exceptionally strong in ",
												d.name,
												", performing above 85% of peers at this level."
											]
										})
									]
								}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground text-center py-4",
									children: "Solve problems to unlock your DNA profile."
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/5 hover:shadow-xl transition-all duration-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-lg font-bold mb-4 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-4 h-4 text-aurora" }), " Consistency Analysis"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] bg-white/10 px-2 py-1 rounded-md text-muted-foreground",
									children: "Updated Now"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white/5 rounded-2xl p-4 border border-white/5 relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground mb-1",
											children: "Current Streak"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-display text-2xl font-bold text-aurora",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, { value: stats.current_streak }),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-normal text-muted-foreground",
													children: "days"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-16 h-16 text-aurora/5 absolute -bottom-4 -right-4" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white/5 rounded-2xl p-4 border border-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground mb-1",
										children: "Longest Streak"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display text-2xl font-bold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, { value: stats.longest_streak }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-normal text-muted-foreground",
												children: "days"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-gradient-to-r from-aurora/10 to-transparent rounded-2xl p-4 border border-aurora/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-medium text-aurora",
										children: "Productivity Score"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-mono font-bold text-aurora",
										children: "92/100"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-primary/70",
									children: [
										"Your most productive time is ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary font-medium",
											children: "Evenings (8PM-10PM)"
										}),
										". Keep this up to maximize memory retention."
									]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "xl:col-span-2 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-strong rounded-3xl p-6 border border-white/5 flex flex-col relative overflow-hidden group hover:-translate-y-1 transition-all duration-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-10 -right-10 w-32 h-32 bg-aurora/10 blur-3xl rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-bold mb-4 flex items-center justify-between relative z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { className: "w-4 h-4 text-aurora" }), " Pattern Intelligence"]
									})
								}),
								patterns.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-3 relative z-10",
									children: patterns.slice(0, 3).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-white/5 p-3 rounded-xl border border-white/5 flex justify-between items-center group/card hover:bg-white/10 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium",
											children: p.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-muted-foreground",
											children: [
												"Lvl: ",
												p.mastery > 70 ? "Advanced" : "Intermediate",
												" • Conf: High"
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-sm text-aurora font-mono font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, { value: p.mastery }), "%"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-green-400",
												children: "Trending Up"
											})]
										})]
									}, i))
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground text-center py-8",
									children: "Solve problems to detect patterns."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-strong rounded-3xl p-6 border border-white/5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-10 -left-10 w-32 h-32 bg-aurora/10 blur-3xl rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-lg font-bold mb-4 flex items-center gap-2 relative z-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "w-4 h-4 text-aurora" }), " Actionable Roadmap"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 relative z-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col bg-white/5 rounded-xl p-3 border border-aurora/20 shadow-[0_0_15px_rgba(var(--aurora-rgb),0.05)]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center mb-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-aurora uppercase tracking-wider",
													children: "7-Day Mission"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] bg-aurora/20 text-aurora px-2 py-0.5 rounded-full",
													children: "+150 XP"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-medium text-foreground mb-2",
												children: roadmap.d7 || "Complete foundational patterns"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-full bg-white/10 h-1.5 rounded-full overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-aurora h-full w-[40%]" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col bg-white/5 rounded-xl p-3 border border-white/5 opacity-80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-between items-center mb-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-muted-foreground uppercase tracking-wider",
												children: "30-Day Goal"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm text-primary/80",
											children: roadmap.d30 || "Unlock advanced graph algorithms"
										})]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-xl font-bold flex items-center justify-between mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-5 h-5 text-aurora" }), " Company Target Readiness"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-muted-foreground bg-white/5 px-3 py-1 rounded-full",
								children: "AI Assessed"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: companies.slice(0, 4).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-aurora/30 transition-all hover:-translate-y-1 group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-base",
											children: c.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-muted-foreground",
											children: ["Confidence: ", c.confidence]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("text-lg px-3 py-1 rounded-xl font-display font-bold border", c.readiness >= 80 ? "bg-green-500/10 text-green-400 border-green-500/20" : c.readiness >= 50 ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, { value: c.readiness }), "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 bg-white/5 rounded-full overflow-hidden mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											initial: { width: 0 },
											animate: { width: `${c.readiness}%` },
											transition: { duration: 1 },
											className: cn("h-full", c.readiness >= 80 ? "bg-green-400" : c.readiness >= 50 ? "bg-yellow-400" : "bg-red-400")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1",
												children: "Core Strengths"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-primary/90 flex flex-wrap gap-1",
												children: c.strong.length > 0 ? c.strong.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-[10px]",
													children: s
												}, idx)) : "None yet"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-1",
												children: "Missing for Interview"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-red-300 flex flex-wrap gap-1",
												children: c.missing.map((m, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "bg-red-500/10 text-red-300 px-2 py-0.5 rounded text-[10px]",
													children: m
												}, idx))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 pt-3 border-t border-white/5 text-xs text-muted-foreground leading-relaxed",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-aurora font-medium",
														children: "AI Recommendation:"
													}),
													" Improving ",
													c.missing[0] || "accuracy",
													" will boost readiness to target ",
													c.readiness + 12 > 100 ? 99 : c.readiness + 12,
													"%."
												]
											})
										]
									})
								]
							}, i))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 xl:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "xl:col-span-2 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-xl font-bold flex items-center gap-2 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "w-5 h-5 text-aurora" }), " Detailed Topic Mastery"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: insights.map((topic, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 transition-colors group",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-sm",
											children: topic.topic
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider border", topic.skillLevel === "Master" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : topic.skillLevel === "Expert" ? "bg-aurora/10 text-aurora border-aurora/20" : "bg-white/5 text-muted-foreground border-white/10"),
											children: topic.skillLevel
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												initial: { width: 0 },
												animate: { width: `${topic.mastery}%` },
												transition: { duration: 1 },
												className: cn("h-full", topic.mastery >= 80 ? "bg-green-400" : topic.mastery >= 50 ? "bg-aurora" : "bg-red-400")
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-mono text-muted-foreground w-8 text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, { value: topic.mastery }), "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground leading-relaxed",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-medium",
											children: "Insight: "
										}), topic.explanation]
									})
								]
							}, idx))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-strong rounded-3xl p-6 border border-green-500/20 relative overflow-hidden group hover:-translate-y-1 transition-transform",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-48 h-48 bg-green-500/5 blur-3xl rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-lg font-bold text-green-400 mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5" }), " Verified Strengths"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4 relative z-10",
									children: strengths.length > 0 ? strengths.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-black/40 rounded-2xl p-4 border border-green-500/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-sm text-green-400",
													children: s.topic
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full",
													children: "Top 10%"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-primary/80 mb-2 leading-relaxed",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-green-500",
														children: "Why:"
													}),
													" ",
													s.reason
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-muted-foreground pt-2 border-t border-white/5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-foreground font-medium",
														children: "Action:"
													}),
													" ",
													s.recommendation
												]
											})
										]
									}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground",
										children: "Keep practicing to build verified strengths!"
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-strong rounded-3xl p-6 border border-red-500/20 relative overflow-hidden group hover:-translate-y-1 transition-transform",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-red-500/5 blur-3xl rounded-full" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-lg font-bold text-red-400 mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-5 h-5" }), " Critical Weaknesses"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4 relative z-10",
									children: weaknesses.length > 0 ? weaknesses.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-black/40 rounded-2xl p-4 border border-red-500/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-sm text-red-400",
													children: w.topic
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3" }),
														" ",
														w.estimatedTime
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-primary/80 mb-2 leading-relaxed",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-red-400",
														children: "Evidence:"
													}),
													" ",
													w.reason
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-muted-foreground pt-2 border-t border-white/5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-foreground font-medium",
														children: "Fix:"
													}),
													" ",
													w.recommendation
												]
											})
										]
									}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground",
										children: "No critical weaknesses detected! Excellent."
									})
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "xl:col-span-1 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-lg font-bold mb-6 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-5 h-5 text-aurora" }), " Interview Predictor"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-5 mb-6",
								children: [
									{
										label: "Online Assessment",
										key: "oa"
									},
									{
										label: "Live Coding",
										key: "live"
									},
									{
										label: "Technical Interview",
										key: "technical"
									}
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground group-hover:text-foreground transition-colors",
											children: item.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold font-mono",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, { value: predictions[item.key] || 0 }), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 bg-white/5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											initial: { width: 0 },
											animate: { width: `${predictions[item.key] || 0}%` },
											transition: {
												duration: 1,
												delay: .2
											},
											className: "h-full bg-aurora shadow-[0_0_10px_rgba(var(--aurora-rgb),0.5)]"
										})
									})]
								}, item.key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-aurora/10 rounded-2xl p-4 border border-aurora/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-bold text-aurora uppercase tracking-wider mb-2",
									children: "AI Verdict"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-primary/90 leading-relaxed",
									children: [
										"Your performance in ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold",
											children: strengths[0]?.topic || "fundamentals"
										}),
										" gives you a solid foundation. Focus on bridging gaps in ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-300 font-bold",
											children: weaknesses[0]?.topic || "advanced topics"
										}),
										" to increase Technical Interview pass rates by an estimated 15%."
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold mb-4 flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "w-5 h-5 text-aurora" }), " Active Missions"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-3",
							children: weeklyPlan.slice(0, 3).map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white/5 rounded-2xl p-4 border border-white/5 hover:border-aurora/30 transition-all group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-aurora font-bold uppercase tracking-wider mb-1",
										children: [day.day, " Mission"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-medium text-sm text-foreground",
										children: [day.focus, " Mastery"]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "text-[10px] bg-white/10 hover:bg-aurora text-foreground px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "w-3 h-3" }), " Start"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: day.tasks[0]
								})]
							}, i))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-3xl border border-aurora/30 shadow-[0_0_50px_rgba(var(--aurora-rgb),0.1)] relative overflow-hidden flex flex-col h-[700px] mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-aurora/5 blur-[100px] rounded-full pointer-events-none" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 p-6 border-b border-white/5 bg-black/20 relative z-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-3 bg-gradient-to-br from-aurora to-aurora/80 rounded-2xl text-primary-foreground shadow-lg shadow-aurora/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "w-6 h-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-bold tracking-tight",
									children: "Enterprise AI Code Coach"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Powered by your analytics profile. Ask for code reviews, bug fixes, or mock interviews."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium text-green-400",
									children: "System Online"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: chatContainerRef,
						className: "flex-1 p-6 overflow-y-auto flex flex-col gap-6 relative z-10 custom-scrollbar scroll-smooth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
							initial: false,
							children: [chatMessages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 15
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .4,
									ease: [
										.23,
										1,
										.32,
										1
									]
								},
								className: cn("flex w-full", m.role === "user" ? "justify-end" : "justify-start"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("max-w-[95%] md:max-w-[85%] rounded-2xl p-5", m.role === "user" ? "bg-gradient-to-br from-aurora/90 to-aurora text-white rounded-tr-sm shadow-[0_4px_20px_rgba(var(--aurora-rgb),0.3)] border border-aurora/50" : "bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 rounded-tl-sm shadow-xl shadow-black/40"),
									children: m.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarkdownRenderer, { content: m.content }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[15px] leading-relaxed whitespace-pre-wrap",
										children: m.content
									})
								})
							}, m.id)), chatBusy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									opacity: 0,
									y: 15
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									scale: .95,
									transition: { duration: .2 }
								},
								className: "flex justify-start w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "max-w-[85%] rounded-2xl rounded-tl-sm bg-[#1E293B]/60 backdrop-blur-xl border border-white/10 p-5 flex items-start gap-4 shadow-xl shadow-black/40 relative overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-[200%] animate-[shimmer_2s_infinite]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-2.5 bg-aurora/10 rounded-xl border border-aurora/20 relative z-10 shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 text-aurora animate-spin" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-1.5 relative z-10 pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
												mode: "wait",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													initial: {
														opacity: 0,
														y: 5
													},
													animate: {
														opacity: 1,
														y: 0
													},
													exit: {
														opacity: 0,
														y: -5
													},
													transition: { duration: .3 },
													className: "text-sm font-medium text-aurora",
													children: THINKING_MESSAGES[thinkingMessageIndex]
												}, thinkingMessageIndex)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce",
														style: { animationDelay: "0.2s" }
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "w-1.5 h-1.5 bg-aurora/40 rounded-full animate-bounce",
														style: { animationDelay: "0.4s" }
													})
												]
											})]
										})
									]
								})
							}, "thinking")]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-t border-white/5 bg-black/40 backdrop-blur-xl relative z-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 max-w-4xl mx-auto relative group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-0.5 bg-gradient-to-r from-aurora/0 via-aurora/20 to-aurora/0 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: chatInput,
									onChange: (e) => setChatInput(e.target.value),
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSend();
										}
									},
									placeholder: "Message your AI Mentor (e.g. 'Interview me on Arrays' or paste code)...",
									className: "flex-1 bg-[#0F172A]/80 border border-white/10 rounded-2xl px-5 py-4 text-[15px] outline-none focus:border-aurora/50 focus:ring-1 focus:ring-aurora/50 transition-all placeholder:text-slate-500 text-white relative z-10 shadow-inner"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleSend,
									disabled: chatBusy || !chatInput.trim(),
									className: "bg-aurora hover:bg-aurora/90 text-white px-6 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(var(--aurora-rgb),0.3)] hover:shadow-[0_0_25px_rgba(var(--aurora-rgb),0.5)] flex items-center justify-center group/btn relative z-10 overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-[0%] transition-transform duration-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-5 h-5 group-hover/btn:scale-110 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform relative z-10" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center mt-4 text-xs font-medium text-slate-500",
							children: "The Enterprise Code Coach adapts its explanations based on your precise SyncRole analytics."
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { DSAMentorPage as component };
