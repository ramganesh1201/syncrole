import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { r as XP } from "./syncrole-BmVv4SfO.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { G as Flame, T as Plus, g as Target, ht as Calendar, kt as ArrowLeft, p as TrendingUp, t as Zap, tt as CodeXml } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as XAxis, h as Tooltip, i as YAxis, l as Pie, m as ResponsiveContainer, n as PieChart, o as Line, p as Cell, r as LineChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dsa-h6HCEmlR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DSAPage() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [xpData, setXpData] = (0, import_react.useState)({
		total_xp: 0,
		level: 1,
		level_name: "Career Explorer"
	});
	const [streakData, setStreakData] = (0, import_react.useState)({
		current_streak: 0,
		longest_streak: 0
	});
	const [easy, setEasy] = (0, import_react.useState)(0);
	const [medium, setMedium] = (0, import_react.useState)(0);
	const [hard, setHard] = (0, import_react.useState)(0);
	const [platform, setPlatform] = (0, import_react.useState)("leetcode");
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function load() {
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return setLogs([]);
		const uid = u.user.id;
		const [logsRes, xpRes, streakRes] = await Promise.all([
			supabase.from("dsa_progress").select("*").eq("user_id", uid).order("log_date", { ascending: false }).limit(60),
			supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
			supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle()
		]);
		setLogs(logsRes.data ?? []);
		if (xpRes.data) setXpData(xpRes.data);
		if (streakRes.data) setStreakData(streakRes.data);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const totals = logs.reduce((a, l) => ({
		e: a.e + l.easy,
		m: a.m + l.medium,
		h: a.h + l.hard
	}), {
		e: 0,
		m: 0,
		h: 0
	});
	const total = totals.e + totals.m + totals.h;
	Array.from({ length: 7 }).map((_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - (6 - i));
		const key = d.toISOString().slice(0, 10);
		const day = logs.filter((l) => l.log_date === key).reduce((a, l) => a + l.easy + l.medium + l.hard, 0);
		return {
			day: d.toLocaleDateString(void 0, { weekday: "short" }),
			count: day
		};
	});
	const last30 = Array.from({ length: 30 }).map((_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - (29 - i));
		const key = d.toISOString().slice(0, 10);
		const day = logs.filter((l) => l.log_date === key).reduce((a, l) => a + l.easy + l.medium + l.hard, 0);
		return {
			day: d.toLocaleDateString(void 0, {
				month: "short",
				day: "numeric"
			}),
			count: day
		};
	});
	const difficultyData = [
		{
			name: "Easy",
			value: totals.e
		},
		{
			name: "Medium",
			value: totals.m
		},
		{
			name: "Hard",
			value: totals.h
		}
	];
	async function add() {
		const e = Number(easy) || 0;
		const m = Number(medium) || 0;
		const h = Number(hard) || 0;
		if (e + m + h <= 0) return toast.error("Add at least one problem");
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		const { error } = await supabase.from("dsa_progress").insert({
			user_id: u.user.id,
			easy: e,
			medium: m,
			hard: h,
			platform,
			log_date: today
		});
		if (error) return toast.error(error.message);
		const xp = (e + m + h) * XP.DSA_PROBLEM;
		await supabase.rpc("award_xp", {
			_user: u.user.id,
			_type: "dsa_logged",
			_xp: xp,
			_meta: {
				easy,
				medium,
				hard
			}
		});
		const newTotal = total + easy + medium + hard;
		for (const [code, n] of [
			["dsa_10", 10],
			["dsa_50", 50],
			["dsa_100", 100]
		]) if (newTotal >= n) await supabase.from("achievements").insert({
			user_id: u.user.id,
			code
		}).then(() => {});
		await supabase.rpc("recompute_placement", { _user: u.user.id });
		await supabase.from("notifications").insert({
			user_id: u.user.id,
			title: "DSA logged 🧠",
			body: `+${xp} XP for ${easy + medium + hard} problems`,
			type: "dsa"
		});
		toast.success(`+${xp} XP`);
		setEasy(0);
		setMedium(0);
		setHard(0);
		load();
	}
	const heat = Array.from({ length: 90 }).map((_, i) => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - (89 - i));
		const key = d.toISOString().slice(0, 10);
		return {
			key,
			n: logs.filter((l) => l.log_date === key).reduce((a, l) => a + l.easy + l.medium + l.hard, 0)
		};
	});
	const canLog = (Number(easy) || 0) + (Number(medium) || 0) + (Number(hard) || 0) > 0;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid place-items-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard",
				className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back to dashboard"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-end md:justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-bold",
					children: "DSA Command Center"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-2",
					children: "Track progress, master topics, prepare for interviews."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						icon: Zap,
						label: `${xpData.total_xp} XP from DSA`,
						accent: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
						icon: Flame,
						label: `${streakData.current_streak}-day streak`
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 md:grid-cols-4 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dsa-roadmap",
						className: "glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between",
						children: ["Topic Roadmap ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3 rotate-180" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dsa-problems",
						className: "glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between",
						children: ["Problem Library ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3 rotate-180" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dsa-companies",
						className: "glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between",
						children: ["Company Prep ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3 rotate-180" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dsa-daily",
						className: "glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between",
						children: ["Daily Challenge ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3 rotate-180" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dsa-mentor",
						className: "glass-strong rounded-xl px-4 py-3 text-sm font-medium text-aurora hover:bg-white/10 transition flex items-center justify-between",
						children: ["AI Mentor ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3 rotate-180" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total Solved",
						value: total,
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Easy ✓",
						value: totals.e,
						color: "text-green-400"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Medium ✓",
						value: totals.m,
						color: "text-yellow-400"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Hard ✓",
						value: totals.h,
						color: "text-red-400"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: TrendingUp,
						children: "Last 30 Days"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: last30,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "rgba(255,255,255,0.05)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "rgba(0,0,0,0.8)",
										border: "1px solid rgba(255,255,255,0.1)",
										borderRadius: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "count",
										stroke: "oklch(0.72 0.22 295)",
										strokeWidth: 2.5,
										dot: false
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: Target,
					children: "Difficulty Mix"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pie, {
							data: difficultyData,
							cx: "50%",
							cy: "50%",
							innerRadius: 40,
							outerRadius: 80,
							paddingAngle: 2,
							dataKey: "value",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "oklch(0.88 0.18 145)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "oklch(0.85 0.18 70)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "oklch(0.72 0.22 330)" })
							]
						}) })
					})
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: Calendar,
						children: "Consistency · Last 90 Days"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-[repeat(30,minmax(0,1fr))] sm:grid-cols-[repeat(45,minmax(0,1fr))] md:grid-cols-[repeat(90,minmax(0,1fr))] gap-1",
							children: heat.map((c) => {
								const bg = [
									"oklch(1 0 0 / 0.05)",
									"oklch(0.72 0.22 295 / 0.25)",
									"oklch(0.72 0.22 295 / 0.5)",
									"oklch(0.72 0.22 295 / 0.75)",
									"oklch(0.72 0.22 295)"
								][c.n === 0 ? 0 : Math.min(4, Math.ceil(c.n / 2))];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									title: `${c.key}: ${c.n}`,
									className: "aspect-square rounded-sm",
									style: { background: bg }
								}, c.key);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-3 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-3 h-3 rounded-sm",
											style: { background: "oklch(1 0 0 / 0.05)" }
										}),
										" ",
										"No activity"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-sm bg-aurora/20" }), " Low"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-sm bg-aurora/50" }), " Medium"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-3 h-3 rounded-sm",
											style: { background: "oklch(0.72 0.22 295)" }
										}),
										" ",
										"High"
									]
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: CodeXml,
					children: "Log Problems"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
							label: "Easy",
							value: easy,
							set: setEasy,
							color: "oklch(0.88 0.18 145)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
							label: "Medium",
							value: medium,
							set: setMedium,
							color: "oklch(0.85 0.18 70)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counter, {
							label: "Hard",
							value: hard,
							set: setHard,
							color: "oklch(0.72 0.22 330)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Platform"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: platform,
								onChange: (e) => setPlatform(e.target.value),
								className: "mt-1 w-full glass rounded-xl px-3 py-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "leetcode",
										children: "LeetCode"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "gfg",
										children: "GeeksforGeeks"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "codeforces",
										children: "Codeforces"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "manual",
										children: "Other"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: add,
							disabled: !canLog,
							className: `relative w-full rounded-full py-3 text-sm font-semibold text-primary-foreground overflow-hidden ${!canLog ? "opacity-50 cursor-not-allowed" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative inline-flex items-center justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Log session"]
							})]
						})
					]
				})] })]
			})
		]
	});
}
function Stat({ label, value, accent, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass-strong rounded-2xl p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-2 font-display text-3xl font-bold ${accent ? "text-aurora" : color || ""}`,
			children: value
		})]
	});
}
function Counter({ label, value, set, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between glass rounded-xl px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "h-2 w-2 rounded-full",
				style: { background: color }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => set(Math.max(0, value - 1)),
					className: "h-7 w-7 rounded-full glass hover:bg-white/15",
					children: "−"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scale: .8 },
					animate: { scale: 1 },
					className: "w-8 text-center font-mono",
					children: value
				}, value),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => set(value + 1),
					className: "h-7 w-7 rounded-full glass hover:bg-white/15",
					children: "+"
				})
			]
		})]
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `relative glass-strong rounded-3xl p-5 ${className}`,
		children
	});
}
function SectionLabel({ icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[10px] font-medium text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "uppercase tracking-widest",
			children
		})]
	});
}
function Pill({ icon: Icon, label, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${accent ? "bg-aurora text-primary-foreground" : "glass"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
			" ",
			label
		]
	});
}
//#endregion
export { DSAPage as component };
