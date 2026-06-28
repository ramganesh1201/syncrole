import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { C as Search, Dt as ArrowUpRight, kt as ArrowLeft, tt as CodeXml } from "../_libs/lucide-react.mjs";
import { _ as useSearch, h as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dsa-problems-C4enWJ_r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DSAProblemsPage() {
	const router = useRouter();
	const searchParams = useSearch({ from: "/_authenticated/dsa-problems" });
	const [problems, setProblems] = (0, import_react.useState)([]);
	const [filtered, setFiltered] = (0, import_react.useState)([]);
	const [topics, setTopics] = (0, import_react.useState)([]);
	const [userProgress, setUserProgress] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function loadProblems() {
			setLoading(true);
			const userIdForQuery = (await supabase.auth.getUser()).data.user?.id ?? null;
			const [problemRes, topicsRes, progressRes] = await Promise.all([
				supabase.from("dsa_problems").select("id, title, difficulty, xp_reward, companies, leetcode_url, topic_id").order("difficulty"),
				supabase.from("dsa_topics").select("id, name").order("display_order"),
				userIdForQuery ? supabase.from("user_problem_progress").select("id, problem_id, status, solved, last_attempted").eq("user_id", userIdForQuery) : Promise.resolve({
					data: [],
					error: null
				})
			]);
			if (cancelled) return;
			setTopics(topicsRes.data ?? []);
			let filteredData = problemRes.data ?? [];
			if (searchParams.topic) filteredData = filteredData.filter((p) => p.topic_id === searchParams.topic);
			if (searchParams.difficulty) filteredData = filteredData.filter((p) => p.difficulty === searchParams.difficulty);
			setProblems(filteredData);
			setFiltered(filteredData);
			setUserProgress(new Map((progressRes.data ?? []).map((item) => [item.problem_id, item])));
			setLoading(false);
		}
		loadProblems();
		return () => {
			cancelled = true;
		};
	}, [searchParams.topic, searchParams.difficulty]);
	(0, import_react.useEffect)(() => {
		const term = searchTerm.trim().toLowerCase();
		if (!term) {
			setFiltered(problems);
			return;
		}
		setFiltered(problems.filter((p) => {
			const title = p.title.toLowerCase();
			const topicName = topics.find((topic) => topic.id === p.topic_id)?.name.toLowerCase() ?? "";
			return title.includes(term) || topicName.includes(term);
		}));
	}, [
		searchTerm,
		problems,
		topics
	]);
	const countByDifficulty = (0, import_react.useMemo)(() => ({
		easy: problems.filter((p) => p.difficulty === "easy").length,
		medium: problems.filter((p) => p.difficulty === "medium").length,
		hard: problems.filter((p) => p.difficulty === "hard").length
	}), [problems]);
	async function updateProblemProgress(problem, solved) {
		const { data: userData } = await supabase.auth.getUser();
		if (!userData.user) return;
		const uid = userData.user.id;
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const existing = userProgress.get(problem.id);
		const payload = {
			user_id: uid,
			problem_id: problem.id,
			status: solved ? "solved" : "attempted",
			solved,
			last_attempted: now
		};
		let progressRow = null;
		if (existing) {
			const { error } = await supabase.from("user_problem_progress").update(payload).eq("id", existing.id).select().single();
			if (error) {
				toast.error(error.message);
				return;
			}
			progressRow = {
				...existing,
				...payload
			};
		} else {
			const { data, error } = await supabase.from("user_problem_progress").insert(payload).select().single();
			if (error || !data) {
				toast.error(error?.message ?? "Unable to save progress");
				return;
			}
			progressRow = data;
		}
		const nextProgress = new Map(userProgress);
		nextProgress.set(problem.id, progressRow);
		setUserProgress(nextProgress);
		const topicProblems = problems.filter((p) => p.topic_id === problem.topic_id);
		const solvedCount = topicProblems.filter((p) => nextProgress.get(p.id)?.solved).length;
		const completedPercent = topicProblems.length ? Math.round(solvedCount / topicProblems.length * 100) : 0;
		const masteryScore = completedPercent;
		const topicPayload = {
			user_id: uid,
			topic_id: problem.topic_id,
			completed_percent: completedPercent,
			mastery_score: masteryScore,
			last_activity: now
		};
		const { error: topicError } = await supabase.from("user_topic_progress").upsert(topicPayload, { onConflict: ["user_id", "topic_id"] });
		if (topicError) {
			toast.error(topicError.message);
			return;
		}
		toast.success(solved ? "Marked solved and updated topic progress" : "Progress saved");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard/dsa",
				className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back to DSA Command Center"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold",
				children: "Problem Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Solve ",
					problems.length,
					" curated problems from top companies."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3 items-center",
					children: [
						[
							"easy",
							"medium",
							"hard"
						].map((diff) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								router.navigate({
									to: "/dsa-problems",
									search: {
										difficulty: diff,
										...searchParams.topic ? { topic: searchParams.topic } : {}
									}
								});
							},
							className: `px-4 py-2 rounded-full text-xs font-medium transition ${searchParams.difficulty === diff ? "bg-aurora text-primary-foreground" : "glass"}`,
							children: [
								diff === "easy" ? "🟢" : diff === "medium" ? "🟡" : "🔴",
								" ",
								diff,
								" (",
								countByDifficulty[diff],
								")"
							]
						}, diff)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "relative block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Topic filter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: searchParams.topic ?? "",
								onChange: (e) => {
									const topic = e.target.value;
									router.navigate({
										to: "/dsa-problems",
										search: {
											...topic ? { topic } : {},
											...searchParams.difficulty ? { difficulty: searchParams.difficulty } : {}
										}
									});
								},
								className: "glass rounded-full px-4 py-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "All topics"
								}), topics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: topic.id,
									children: topic.name
								}, topic.id))]
							})]
						}),
						(searchParams.difficulty || searchParams.topic) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => router.navigate({ to: "/dsa-problems" }),
							className: "px-3 py-2 rounded-full text-xs bg-white/10 hover:bg-white/15",
							children: "Clear"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search problems or topics...",
						value: searchTerm,
						onChange: (e) => setSearchTerm(e.target.value),
						className: "w-full glass rounded-xl pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid place-items-center py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" })
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-8 w-8 text-muted-foreground mx-auto mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "No problems found."
					})]
				}) : filtered.map((problem) => {
					const progress = userProgress.get(problem.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 5
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "glass-strong rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between hover:bg-white/10 transition group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs px-2 py-0.5 rounded ${problem.difficulty === "easy" ? "bg-green-500/20 text-green-400" : problem.difficulty === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`,
									children: problem.difficulty
								}), problem.title]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-2 py-1 rounded-full bg-white/5",
										children: [
											"Topic:",
											" ",
											topics.find((topic) => topic.id === problem.topic_id)?.name ?? "Unknown"
										]
									}),
									problem.companies?.map((company) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-1 rounded-full bg-white/5",
										children: company
									}, company)),
									progress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-2 py-1 rounded-full bg-aurora/10 text-aurora",
										children: progress.solved ? "Solved" : progress.status === "attempted" ? "Attempted" : "Not started"
									}) : null
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 items-start md:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-mono text-aurora",
								children: [
									"+",
									problem.xp_reward,
									" XP"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 flex-wrap",
								children: [problem.leetcode_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: problem.leetcode_url,
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-full bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "inline h-3.5 w-3.5" }), " Open"]
								}) : null, progress?.solved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-green-500/10 px-3 py-2 text-xs text-green-400",
									children: "Solved"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => updateProblemProgress(problem, true),
									className: "rounded-full bg-aurora px-3 py-2 text-xs text-primary-foreground hover:bg-aurora/90 transition",
									children: "Mark solved"
								})]
							})]
						})]
					}, problem.id);
				})
			})
		]
	});
}
//#endregion
export { DSAProblemsPage as component };
