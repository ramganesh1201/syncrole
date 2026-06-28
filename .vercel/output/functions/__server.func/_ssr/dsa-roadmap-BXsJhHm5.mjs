import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { kt as ArrowLeft, ot as CircleCheck, wt as BookOpen } from "../_libs/lucide-react.mjs";
import { h as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dsa-roadmap-BXsJhHm5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DSARoadmapPage() {
	const router = useRouter();
	const [topics, setTopics] = (0, import_react.useState)([]);
	const [progress, setProgress] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function load() {
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		const uid = u.user.id;
		const [topicsRes, progressRes] = await Promise.all([supabase.from("dsa_topics").select("*").order("display_order"), supabase.from("user_topic_progress").select("*").eq("user_id", uid)]);
		setTopics(topicsRes.data ?? []);
		setProgress(new Map((progressRes.data ?? []).map((p) => [p.topic_id, p])));
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid place-items-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" })
	});
	const easyTopics = topics.filter((t) => t.difficulty === "easy");
	const mediumTopics = topics.filter((t) => t.difficulty === "medium");
	const hardTopics = topics.filter((t) => t.difficulty === "hard");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard/dsa",
				className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back to DSA Command Center"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold",
				children: "DSA Topic Roadmap"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-2",
				children: "Master each data structure and algorithm systematically."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				router,
				title: "Foundations (Easy)",
				description: "Master the basics",
				color: "text-green-400",
				topics: easyTopics,
				progress
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				router,
				title: "Intermediate (Medium)",
				description: "Build solid skills",
				color: "text-yellow-400",
				topics: mediumTopics,
				progress
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				router,
				title: "Advanced (Hard)",
				description: "Achieve mastery",
				color: "text-red-400",
				topics: hardTopics,
				progress
			})
		]
	});
}
function Section({ router, title, description, color, topics, progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: `font-display text-2xl font-bold ${color}`,
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: description
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3",
		children: topics.map((topic) => {
			const prog = progress.get(topic.id);
			const completed = prog && prog.mastery_score >= 70;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					x: -10
				},
				animate: {
					opacity: 1,
					x: 0
				},
				className: "glass-strong rounded-2xl p-4 flex items-center gap-4 hover:bg-white/10 transition",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `h-10 w-10 rounded-full grid place-items-center ${completed ? "bg-green-500/20" : "bg-white/10"}`,
						children: completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-green-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-5 w-5 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: topic.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: topic.description
							}),
							prog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-aurora transition-all",
										style: { width: `${prog.completed_percent}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-mono",
									children: [prog.mastery_score, "%"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.navigate({
								to: "/dsa-problems",
								search: { topic: topic.id }
							});
						},
						className: "px-3 py-1 rounded-full text-xs bg-aurora text-primary-foreground hover:bg-aurora/90",
						children: "Practice"
					})
				]
			}, topic.id);
		})
	})] });
}
//#endregion
export { DSARoadmapPage as component };
