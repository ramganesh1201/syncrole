import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { t as ACHIEVEMENT_CATALOG } from "./syncrole-BmVv4SfO.mjs";
import { a as useMotionValue, c as AnimatePresence, i as useTransform, n as animate, o as useScroll, r as useSpring, s as motion, t as useInView } from "../_libs/framer-motion.mjs";
import { A as MapPin, At as Activity, B as History, E as Play, Et as Award, G as Flame, K as Flag, N as Lock, O as MessageSquare, Ot as ArrowRight, P as LoaderCircle, S as Send, W as Github, X as ExternalLink, Y as FileText, _ as Star, ct as CircleAlert, d as Trophy, f as TriangleAlert, g as Target, l as Upload, n as X, nt as Clock, o as Users, p as TrendingUp, pt as ChartNoAxesColumn, st as CircleCheckBig, t as Zap, tt as CodeXml, ut as ChevronRight, v as Sparkles, vt as Building2, w as Rocket, xt as Brain } from "../_libs/lucide-react.mjs";
import { t as AuroraBackground } from "./AuroraBackground-BuJ7TTsw.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useAuth } from "./use-auth-DCSAk2El.mjs";
import { t as SyncFooter } from "./SyncFooter-CufUqpg5.mjs";
import { c as Radar, d as PolarRadiusAxis, f as PolarGrid, m as ResponsiveContainer, t as RadarChart, u as PolarAngleAxis } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D2BOsVc5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CareerSphere = (0, import_react.lazy)(() => import("./CareerSphere-CEpxDxLv.mjs"));
function ReadinessOrb({ score, isDemo }) {
	const circ = 2 * Math.PI * 54;
	const pct = Math.max(0, Math.min(100, score));
	const color = pct >= 80 ? "oklch(0.88 0.18 145)" : pct >= 60 ? "oklch(0.75 0.2 200)" : "oklch(0.72 0.22 295)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-44 w-44 mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 rounded-full blur-3xl opacity-30 readiness-orb",
				style: { background: color }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 120 120",
				className: "h-full w-full -rotate-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "60",
					cy: "60",
					r: "54",
					fill: "none",
					stroke: "oklch(1 0 0 / 0.06)",
					strokeWidth: "8"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: "60",
					cy: "60",
					r: "54",
					fill: "none",
					stroke: color,
					strokeWidth: "8",
					strokeLinecap: "round",
					strokeDasharray: circ,
					initial: { strokeDashoffset: circ },
					animate: { strokeDashoffset: circ - circ * pct / 100 },
					transition: {
						duration: 1.6,
						ease: "easeOut",
						delay: .5
					},
					style: { filter: `drop-shadow(0 0 8px ${color})` }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-4xl font-bold",
							style: { color },
							children: pct
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5",
							children: "Readiness"
						}),
						isDemo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-widest text-amber-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-2.5 w-2.5" }), " Demo"]
						})
					]
				})
			})
		]
	});
}
function StatCard({ icon: Icon, label, value, sub, color, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			delay,
			duration: .5
		},
		whileHover: {
			y: -6,
			scale: 1.02
		},
		className: "glass-strong rounded-3xl p-5 relative overflow-hidden group cursor-default border border-white/5 hover:border-white/15 transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl",
			style: { background: `radial-gradient(circle at 80% 20%, ${color}18, transparent 60%)` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-xl glass grid place-items-center",
						style: { border: `1px solid ${color}30` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground font-semibold",
						children: label
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-3xl font-bold",
					style: { color },
					children: value
				}),
				sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground mt-1.5",
					children: sub
				})
			]
		})]
	});
}
var DEMO$1 = {
	name: "Alex",
	score: 72,
	level: 3,
	levelName: "Growth Seeker",
	xp: 1240,
	problems: 48,
	streak: 12,
	goal: "SDE @ Product Company",
	skillGap: "System Design",
	fastestPath: "Ship 2 real projects + lift DSA streak",
	timeline: "4 – 6 months"
};
function AnimatedCount({ to, suffix }) {
	const [count, setCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const controls = animate(0, to, {
			duration: 2,
			ease: "easeOut",
			onUpdate(value) {
				setCount(Math.round(value));
			}
		});
		return () => controls.stop();
	}, [to]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [count.toLocaleString(), suffix] });
}
function GuestHero() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
	const opacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "career-os",
		ref,
		className: "relative min-h-screen w-full overflow-hidden pt-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-24 rounded-full bg-aurora blur-3xl opacity-50" })
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerSphere, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: {
					y,
					opacity
				},
				className: "relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-32",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-4xl mx-auto text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .2 },
							className: "inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs border border-white/10 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex h-2 w-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-accent" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground tracking-wide",
								children: "AI Career Operating System · Now in Beta"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 30
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .35,
								duration: .8
							},
							className: "font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-foreground",
								children: "Your Career."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-aurora",
								children: "Quantified."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .55,
								duration: .8
							},
							className: "mx-auto max-w-2xl text-base md:text-lg text-muted-foreground mb-10",
							children: "An AI Career Operating System that continuously analyzes your journey toward employability — resume, GitHub, DSA, interviews, and everything in between."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .8
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								delay: .6,
								duration: .8
							},
							className: "mb-12",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadinessOrb, {
								score: DEMO$1.score,
								isDemo: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-sm text-muted-foreground",
								children: ["Sample Career Readiness Score — ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: "yours updates live"
								})]
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
							transition: { delay: .75 },
							className: "flex flex-wrap items-center justify-center gap-4 mb-20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								whileHover: { scale: 1.03 },
								whileTap: { scale: .97 },
								onClick: () => nav({ to: "/auth" }),
								className: "relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative z-10 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }),
										" Generate My Placement Score ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								whileHover: { scale: 1.03 },
								whileTap: { scale: .97 },
								className: "inline-flex items-center gap-2 rounded-full glass-strong px-7 py-4 text-sm font-semibold hover:bg-white/10 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), " Watch Live Demo"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .9 },
							className: "grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: Target,
									label: "Placement",
									value: `${DEMO$1.score}%`,
									sub: "Career Readiness",
									color: "oklch(0.75 0.20 200)",
									delay: 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: Zap,
									label: "XP & Level",
									value: DEMO$1.xp.toLocaleString(),
									sub: `Lvl ${DEMO$1.level} · ${DEMO$1.levelName}`,
									color: "oklch(0.72 0.22 295)",
									delay: .05
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: CodeXml,
									label: "DSA Solved",
									value: DEMO$1.problems,
									sub: "Problems Conquered",
									color: "oklch(0.85 0.18 70)",
									delay: .1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: Flame,
									label: "Streak",
									value: DEMO$1.streak,
									sub: "Day Active Streak",
									color: "oklch(0.75 0.22 40)",
									delay: .15
								})
							]
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
							transition: { delay: 1.1 },
							className: "mt-12 mx-auto max-w-3xl glass-strong rounded-3xl p-6 border border-white/5 flex flex-wrap items-center justify-center gap-12 md:gap-24 text-center relative overflow-hidden group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none",
								style: { background: `radial-gradient(circle at 50% 50%, oklch(0.72 0.22 295 / 0.1), transparent 70%)` }
							}), [
								{
									to: 5e4,
									suffix: "+",
									l: "Students"
								},
								{
									to: 1,
									suffix: "M+",
									l: "Skills Analyzed"
								},
								{
									to: 1e5,
									suffix: "+",
									l: "Interviews"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-2xl md:text-3xl font-bold text-aurora mb-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedCount, {
										to: s.to,
										suffix: s.suffix
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium",
									children: s.l
								})]
							}, s.l))]
						})
					]
				})
			})
		]
	});
}
function AuthHero({ data }) {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
	const opacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
	const nav = useNavigate();
	const name = data?.profile?.full_name?.split(" ")[0] || "there";
	const score = data?.scores?.[0]?.total_score || 0;
	const xp = data?.xp?.total_xp || 0;
	const lvl = data?.xp?.level || 1;
	const lvlName = data?.xp?.level_name || "Career Explorer";
	const problems = data?.dsaLogs?.reduce((acc, l) => acc + l.easy + l.medium + l.hard, 0) || 0;
	const streak = data?.streak?.current_streak || 0;
	const goal = data?.profile?.career_goal || "Land a Dream Job";
	const skills = data?.profile?.skills || [];
	const resumeScore = data?.resume?.total_score || 0;
	const bdScore = data?.scores?.[0] || {};
	const skillScores = {
		"Resume": bdScore.resume_score || 0,
		"GitHub": bdScore.github_score || 0,
		"DSA": bdScore.dsa_score || 0,
		"Projects": bdScore.projects_score || 0,
		"Communication": bdScore.communication_score || 0
	};
	const skillGap = Object.entries(skillScores).sort(([, a], [, b]) => a - b)[0]?.[0] || "System Design";
	const hiringTimeline = score >= 85 ? "< 1 month" : score >= 70 ? "2 – 3 months" : score >= 55 ? "4 – 6 months" : "6 – 12 months";
	const fastestPath = (bdScore.dsa_score || 0) < 60 ? "Boost DSA + build 1 real project" : resumeScore < 70 ? "Improve resume + GitHub contributions" : "Complete mock interviews + system design";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "career-os",
		ref,
		className: "relative min-h-screen w-full overflow-hidden pt-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 w-24 rounded-full bg-aurora blur-3xl opacity-50" })
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerSphere, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				style: {
					y,
					opacity
				},
				className: "relative z-20 mx-auto max-w-6xl px-6 pt-12 pb-32",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .1 },
						className: "inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs border border-white/10 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex h-2 w-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.88_0.18_145)] opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)]" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground tracking-wide",
							children: "Personalized Career OS · Live Data"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .2,
							duration: .8
						},
						className: "font-display text-[clamp(2.4rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-foreground",
							children: "Welcome back,"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "block text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.7_0.22_295)] to-[oklch(0.75_0.2_200)]",
							children: [name, "."]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid lg:grid-cols-2 gap-10 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -30
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .35 },
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadinessOrb, { score }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [
										{
											icon: Target,
											label: "Career Goal",
											value: goal,
											color: "oklch(0.75 0.20 200)"
										},
										{
											icon: Brain,
											label: "Skill Gap",
											value: skillGap,
											color: "oklch(0.72 0.22 330)"
										},
										{
											icon: TrendingUp,
											label: "Fastest Path",
											value: fastestPath,
											color: "oklch(0.88 0.18 145)"
										},
										{
											icon: Clock,
											label: "Est. Timeline",
											value: hiringTimeline,
											color: "oklch(0.85 0.18 70)"
										}
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass rounded-2xl p-4 border border-white/5 hover:border-white/15 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
												className: "h-3.5 w-3.5",
												style: { color: item.color }
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] uppercase tracking-widest text-muted-foreground",
												children: item.label
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium leading-tight",
											children: item.value
										})]
									}, item.label))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileHover: { scale: 1.02 },
									whileTap: { scale: .97 },
									onClick: () => nav({ to: "/dashboard" }),
									className: "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative z-10 flex items-center gap-2",
										children: ["Open Dashboard ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: 30
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: { delay: .45 },
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: Target,
									label: "Placement",
									value: `${score}%`,
									sub: "Career Readiness",
									color: "oklch(0.75 0.20 200)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: Zap,
									label: "XP & Level",
									value: xp.toLocaleString(),
									sub: `Lvl ${lvl} · ${lvlName}`,
									color: "oklch(0.72 0.22 295)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: CodeXml,
									label: "DSA Solved",
									value: problems,
									sub: "Problems Conquered",
									color: "oklch(0.85 0.18 70)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
									icon: Flame,
									label: "Streak",
									value: streak,
									sub: "Day Active Streak",
									color: "oklch(0.75 0.22 40)"
								}),
								skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2 glass rounded-3xl p-5 border border-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-3",
										children: "Your Skills"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2",
										children: [skills.slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "glass rounded-full px-3 py-1 text-xs font-medium",
											children: s
										}, s)), skills.length > 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "glass rounded-full px-3 py-1 text-xs text-muted-foreground",
											children: [
												"+",
												skills.length - 6,
												" more"
											]
										})]
									})]
								})
							]
						})]
					})
				]
			})
		]
	});
}
function HeroSection({ data, isAuthed }) {
	return isAuthed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthHero, { data }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestHero, {});
}
var DEMO_TIMELINE = {
	current: {
		score: 72,
		dsa: 48,
		streak: 12,
		level: "Growth Seeker",
		status: "Active Learner"
	},
	nextMilestone: {
		title: "Interview Ready",
		dsa: 75,
		score: 80,
		eta: "6 weeks",
		actions: [
			"Solve 27 more DSA",
			"Complete 3 mock interviews",
			"Push 2 real projects to GitHub"
		]
	},
	targetRole: "SDE @ Product Company",
	targetCompany: "Flipkart / Swiggy / Razorpay",
	simulations: [
		{
			label: "30 Days",
			score: 77,
			dsa: 62,
			level: "Placement Ready",
			milestone: "Resume Polished"
		},
		{
			label: "90 Days",
			score: 84,
			dsa: 90,
			level: "Interview Pro",
			milestone: "Mock Interview Ace"
		},
		{
			label: "180 Days",
			score: 91,
			dsa: 120,
			level: "Offer Hunter",
			milestone: "Dream Offer Stage"
		}
	]
};
function PhaseNode({ phase, label, sub, active, done, index }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .5
	});
	const color = {
		past: "oklch(0.88 0.18 145)",
		present: "oklch(0.72 0.22 295)",
		future: "oklch(0.75 0.2 200)"
	}[phase];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		ref,
		initial: {
			opacity: 0,
			y: 20
		},
		animate: inView ? {
			opacity: 1,
			y: 0
		} : {},
		transition: {
			duration: .5,
			delay: index * .15
		},
		className: `relative flex flex-col items-center ${active ? "z-10" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `relative h-16 w-16 rounded-full border-2 grid place-items-center transition-all duration-500 ${active ? "scale-125 shadow-glow" : done ? "" : "opacity-70"}`,
			style: {
				borderColor: color,
				background: done || active ? `${color}20` : "transparent",
				boxShadow: active ? `0 0 30px ${color}60` : void 0
			},
			children: [done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
				className: "h-7 w-7",
				style: { color }
			}) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-4 w-4 rounded-full ai-pulse",
				style: { background: color }
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-3 w-3 rounded-full opacity-40",
				style: { background: color }
			}), active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute inset-0 rounded-full",
				animate: {
					scale: [
						1,
						1.4,
						1
					],
					opacity: [
						.6,
						0,
						.6
					]
				},
				transition: {
					duration: 2,
					repeat: Infinity
				},
				style: { border: `2px solid ${color}` }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-sm font-semibold",
				style: active ? { color } : void 0,
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground mt-1",
				children: sub
			})]
		})]
	});
}
function SimCard({ sim, index }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .3
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		ref,
		initial: {
			opacity: 0,
			y: 30
		},
		animate: inView ? {
			opacity: 1,
			y: 0
		} : {},
		transition: {
			duration: .5,
			delay: index * .15
		},
		className: "glass-strong rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 border border-white/5 transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[oklch(0.72_0.22_295)]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-full px-3 py-1 text-xs font-mono font-semibold text-muted-foreground",
					children: sim.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-[oklch(0.88_0.18_145)] font-medium",
					children: sim.milestone
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-xs mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Readiness"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display font-semibold text-aurora",
							children: [sim.score, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 rounded-full bg-white/5 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "h-full bg-aurora",
							initial: { width: 0 },
							animate: inView ? { width: `${sim.score}%` } : {},
							transition: {
								duration: 1.2,
								delay: .3 + index * .15,
								ease: "easeOut"
							}
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: "DSA Solved"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display font-semibold text-sm",
							style: { color: "oklch(0.85 0.18 70)" },
							children: [sim.dsa, " problems"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl px-3 py-2 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "Level"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold mt-0.5",
							children: sim.level
						})]
					})
				]
			})]
		})]
	});
}
function CareerJourneyTimeline({ data }) {
	const isAuthed = !!data?.profile;
	const score = data?.scores?.[0]?.total_score || 0;
	const problems = data?.dsaLogs?.reduce((acc, l) => acc + l.easy + l.medium + l.hard, 0) || 0;
	const streak = data?.streak?.current_streak || 0;
	const lvlName = data?.xp?.level_name || "Career Explorer";
	const goal = data?.profile?.career_goal || "Land a Dream Job";
	const github = data?.profile?.github_username;
	const diff80 = Math.max(0, 80 - score);
	const estWeeks = Math.max(1, Math.round(diff80 / 5));
	const nextActions = [];
	if (problems < 50) nextActions.push(`Solve ${50 - problems} more DSA problems`);
	if ((data?.scores?.[0]?.resume_score || 0) < 75) nextActions.push("Improve resume score to 75+");
	if (!github) nextActions.push("Connect your GitHub account");
	if (streak < 7) nextActions.push("Build a 7-day activity streak");
	if (nextActions.length === 0) nextActions.push("Take 3 mock interviews with SyncPilot");
	const simulations = [
		{
			label: "30 Days",
			score: Math.min(100, score + 8),
			dsa: problems + 20,
			level: "Placement Ready",
			milestone: "Consistent Streak"
		},
		{
			label: "90 Days",
			score: Math.min(100, score + 18),
			dsa: problems + 55,
			level: "Interview Pro",
			milestone: "Mock Interview Ace"
		},
		{
			label: "180 Days",
			score: Math.min(100, score + 30),
			dsa: problems + 90,
			level: "Offer Hunter",
			milestone: "Dream Offer Stage"
		}
	];
	const d = isAuthed ? {
		current: {
			score,
			dsa: problems,
			streak,
			level: lvlName,
			status: "Active Learner"
		},
		nextMilestone: {
			title: "Interview Ready",
			dsa: 75,
			score: 80,
			eta: `${estWeeks} weeks`,
			actions: nextActions
		},
		targetRole: goal,
		targetCompany: data?.profile?.dream_company || "Top Product Company",
		simulations
	} : DEMO_TIMELINE;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "journey",
		className: "relative py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto mb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "uppercase tracking-widest",
									children: "Career Journey + Future Prediction"
								})]
							}), !isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Demo Preview"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl md:text-6xl font-bold tracking-tight",
							children: ["Where you are. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-aurora",
								children: "Where you'll be."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground",
							children: "An intelligent timeline that maps your past, present, and future — recalculated daily from your activity."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-white/5 z-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "h-full timeline-line origin-left",
							initial: { scaleX: 0 },
							whileInView: { scaleX: 1 },
							viewport: { once: true },
							transition: {
								duration: 1.5,
								ease: "easeOut"
							}
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseNode, {
								phase: "past",
								label: "Started",
								sub: "Profile Created",
								done: true,
								index: 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseNode, {
								phase: "present",
								label: "Current",
								sub: `${d.current.level}`,
								active: true,
								index: 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseNode, {
								phase: "future",
								label: d.nextMilestone.title,
								sub: `Est. ${d.nextMilestone.eta}`,
								index: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseNode, {
								phase: "future",
								label: "Target Role",
								sub: d.targetRole,
								index: 3
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-6 mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: -30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { duration: .6 },
						className: "glass-strong rounded-3xl p-8 border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-xl bg-[oklch(0.75_0.20_200)]/20 grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-[oklch(0.75_0.20_200)]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs uppercase tracking-widest text-muted-foreground",
								children: "Current State"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-semibold",
								children: d.current.status
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								{
									label: "Readiness",
									value: `${d.current.score}%`
								},
								{
									label: "DSA Solved",
									value: d.current.dsa.toString()
								},
								{
									label: "Day Streak",
									value: d.current.streak.toString()
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-2xl font-bold text-aurora",
									children: s.value
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1",
									children: s.label
								})]
							}, s.label))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: 30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { duration: .6 },
						className: "glass-strong rounded-3xl p-8 border border-[oklch(0.72_0.22_295)]/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 mb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-xl bg-[oklch(0.72_0.22_295)]/20 grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-[oklch(0.72_0.22_295)]" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-muted-foreground",
									children: "Next Milestone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-lg font-semibold",
									children: d.nextMilestone.title
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ml-auto glass rounded-full px-3 py-1 text-xs font-mono text-[oklch(0.88_0.18_145)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "inline h-3 w-3 mr-1" }), d.nextMilestone.eta]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: d.nextMilestone.actions.slice(0, 3).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-accent shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a })]
							}, i))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					className: "glass rounded-2xl p-5 mb-16 flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-xl bg-[oklch(0.85_0.18_70)]/20 grid place-items-center shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-5 w-5 text-[oklch(0.85_0.18_70)]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-muted-foreground mb-1",
									children: "Target Role & Company"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-xl font-semibold",
									children: d.targetRole
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: d.targetCompany
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl px-5 py-3 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Required Score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl font-bold text-aurora",
								children: "88%"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-semibold",
							children: "Future Simulation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass rounded-full px-3 py-1 text-xs text-muted-foreground",
							children: isAuthed ? "Recalculates from your live data" : "Based on demo progress"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-6",
					children: d.simulations.map((sim, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimCard, {
						sim,
						index: i
					}, sim.label))
				})
			]
		})
	});
}
var DEMO = {
	rank: "Growth Seeker",
	score: 72,
	resumeScore: 68,
	dsa: 48,
	streak: 12,
	xp: 1240,
	strengths: [
		"React & TypeScript",
		"API Design",
		"Problem Solving"
	],
	weaknesses: [
		"System Design",
		"Testing Practices",
		"DevOps"
	],
	growthAreas: [
		"Advanced DSA",
		"System Architecture",
		"Cloud Technologies"
	],
	todayMission: "Solve 3 medium DSA problems",
	memory: [
		"Uploaded resume v2 — ATS score improved by 12 points",
		"Completed 5-day DSA streak",
		"Mock interview: scored 74/100 on technical round"
	],
	syncPilotSummary: "Based on your recent activity, your strongest signal is consistent DSA practice. Your main gap is system design — I recommend 2 architecture projects in the next 30 days to unlock Product Company tier."
};
function OrbitRings() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 pointer-events-none",
		children: [
			1,
			2,
			3
		].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "absolute inset-0 rounded-full border border-white/10",
			style: {
				scale: 1 + r * .28,
				top: "50%",
				left: "50%",
				transform: `translate(-50%, -50%) scale(${1 + r * .28})`
			},
			animate: { rotate: 360 },
			transition: {
				duration: 20 + r * 10,
				repeat: Infinity,
				ease: "linear"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full",
				style: { background: [
					"oklch(0.75 0.2 200)",
					"oklch(0.72 0.22 295)",
					"oklch(0.72 0.22 330)"
				][r - 1] }
			})
		}, r))
	});
}
function InsightList({ items, type }) {
	const colors = {
		strength: "oklch(0.88 0.18 145)",
		weakness: "oklch(0.72 0.22 330)",
		growth: "oklch(0.75 0.2 200)"
	};
	const Icon = {
		strength: CircleCheckBig,
		weakness: CircleAlert,
		growth: TrendingUp
	}[type];
	const color = colors[type];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 glass rounded-xl px-4 py-2.5 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-4 w-4 shrink-0",
				style: { color }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
		}, item))
	});
}
function AICareerTwinSection({ data }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .2
	});
	const isAuthed = !!data?.profile;
	const xp = data?.xp?.total_xp || 0;
	const lvlName = data?.xp?.level_name || DEMO.rank;
	const score = data?.scores?.[0]?.total_score || 0;
	const rScore = data?.resume?.total_score || 0;
	const problems = data?.dsaLogs?.reduce((acc, l) => acc + l.easy + l.medium + l.hard, 0) || 0;
	const streak = data?.streak?.current_streak || 0;
	const bdScore = data?.scores?.[0] || {};
	const signalMap = {
		"Resume Writing": rScore || 0,
		"GitHub Activity": bdScore.github_score || 0,
		"DSA / Problem Solving": bdScore.dsa_score || 0,
		"Project Building": bdScore.projects_score || 0,
		"Communication": bdScore.communication_score || 0,
		"Consistency": Math.min(100, streak * 5 + 20)
	};
	const sorted = Object.entries(signalMap).sort(([, a], [, b]) => b - a);
	const strengths = sorted.slice(0, 3).map(([k]) => k);
	const weaknesses = sorted.slice(-2).map(([k]) => k);
	const growthAreas = [
		"Advanced DSA",
		"System Design",
		"Cloud & DevOps"
	].filter((g) => !strengths.includes(g));
	const todayMission = data?.missions?.find((m) => !m.completed)?.title || DEMO.todayMission;
	const memory = isAuthed ? (data?.activityLogs || []).slice(0, 3).map((l) => {
		if (l.type === "resume_upload") return `Uploaded resume — ATS analysis complete`;
		if (l.type === "dsa_solve") return `Solved DSA problems · +${l.xp_delta} XP`;
		if (l.type === "mock_interview") return `Completed mock interview round`;
		if (l.type === "achievement") return `Unlocked achievement: ${ACHIEVEMENT_CATALOG[l.meta?.code || ""]?.name || "Badge"}`;
		return `Activity recorded · +${l.xp_delta} XP`;
	}) : DEMO.memory;
	const syncPilotSummary = isAuthed ? `Based on your recent activity, ${strengths[0] ? `your strongest signal is ${strengths[0].toLowerCase()}.` : "you're building momentum."} ${weaknesses[0] ? `Your main gap is ${weaknesses[0].toLowerCase()} — I recommend focused practice over the next 30 days.` : "Keep up the consistency!"}` : DEMO.syncPilotSummary;
	const d = isAuthed ? {
		rank: lvlName,
		score,
		resumeScore: rScore,
		dsa: problems,
		streak,
		xp,
		strengths,
		weaknesses,
		growthAreas,
		todayMission,
		memory,
		syncPilotSummary
	} : DEMO;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "twin",
		ref,
		className: "relative py-32 px-6 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 pointer-events-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[oklch(0.72_0.22_295)]/8 blur-3xl" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase tracking-widest",
								children: "AI Career Twin"
							})]
						}), !isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Demo Preview"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl md:text-6xl font-bold tracking-tight",
						children: ["Your digital ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-aurora",
							children: "career twin."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground",
						children: "A living simulation of you — continuously updated from resume, GitHub, DSA, XP, and interview history."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative p-px rounded-3xl overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] opacity-40 blur-xl animate-pulse" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] animate-spin-slow opacity-25" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative glass-strong rounded-[23px] p-8 md:p-12 z-10 bg-card/90 backdrop-blur-3xl grid md:grid-cols-3 gap-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center gap-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-52 w-52",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitRings, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-4 rounded-full bg-aurora blur-3xl opacity-20" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												className: "relative h-full w-full rounded-full glass-strong border-2 border-white/20 grid place-items-center pulse-ring",
												animate: { y: [
													0,
													-8,
													0
												] },
												transition: {
													duration: 4,
													repeat: Infinity
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-32 w-32 rounded-full bg-aurora grid place-items-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-12 w-12 text-white" })
												})
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-2xl font-bold text-aurora",
											children: d.rank
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm text-muted-foreground mt-1",
											children: "Current Level"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full space-y-2",
										children: [
											{
												label: "DSA",
												value: Math.min(100, d.dsa * 2),
												icon: CodeXml
											},
											{
												label: "Resume",
												value: d.resumeScore,
												icon: FileText
											},
											{
												label: "Streak",
												value: Math.min(100, d.streak * 4),
												icon: Activity
											}
										].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
														className: "h-full bg-aurora",
														initial: { width: 0 },
														animate: inView ? { width: `${s.value}%` } : {},
														transition: {
															duration: 1.2,
															ease: "easeOut",
															delay: .5
														}
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-mono text-muted-foreground w-8 text-right",
													children: s.value
												})
											]
										}, s.label))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-[oklch(0.88_0.18_145)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
											children: "Strengths"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightList, {
										items: d.strengths,
										type: "strength"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-[oklch(0.72_0.22_330)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
											children: "Weaknesses"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightList, {
										items: d.weaknesses,
										type: "weakness"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-[oklch(0.75_0.2_200)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
											children: "Growth Areas"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightList, {
										items: d.growthAreas.slice(0, 3),
										type: "growth"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass rounded-2xl p-5 border border-[oklch(0.85_0.18_70)]/30",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mb-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-6 w-6 rounded-lg bg-[oklch(0.85_0.18_70)]/20 grid place-items-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-3.5 w-3.5 text-[oklch(0.85_0.18_70)]" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
													children: "Today's Mission"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium",
												children: d.todayMission
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex items-center gap-2 text-xs text-[oklch(0.85_0.18_70)]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3" }), " +30 XP on completion"]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass rounded-2xl p-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
												children: "Career Memory"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [d.memory.slice(0, 3).map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start gap-2 text-xs text-muted-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-accent mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m })]
											}, i)), d.memory.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground/60 italic",
												children: "No activity yet — start your journey!"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-strong rounded-2xl p-5 border border-[oklch(0.72_0.22_295)]/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mb-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-8 w-8 rounded-xl bg-aurora grid place-items-center shrink-0",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 text-white" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs font-semibold",
													children: "SyncPilot Summary"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground",
													children: "Updated from your activity"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "ml-auto",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)] feed-dot" })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground leading-relaxed",
											children: d.syncPilotSummary
										})]
									})
								]
							})
						]
					})
				]
			})]
		})]
	});
}
var DEMO_RECRUITER = {
	hireDecision: "Strong Hire",
	hiringProbability: 74,
	strengths: [
		"Consistent daily activity",
		"Strong React & TypeScript skills",
		"Resume shows real project impact"
	],
	weaknesses: ["System design exposure limited", "Testing practices absent from portfolio"],
	riskFactors: ["No internship experience", "Limited company-scale projects"],
	competitiveness: "Top 30% of applicants for mid-level SDE roles"
};
function CustomAngleAxisTick({ x, y, payload }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x,
		y,
		textAnchor: "middle",
		fill: "rgba(255,255,255,0.5)",
		fontSize: 10,
		dy: 4,
		children: payload.value.length > 12 ? payload.value.slice(0, 10) + "…" : payload.value
	});
}
function RecruiterToggleSection({ data }) {
	const [view, setView] = (0, import_react.useState)("student");
	const isAuthed = !!data?.profile;
	const dsa = data?.dsaLogs?.reduce((acc, l) => acc + l.easy + l.medium + l.hard, 0) || 0;
	const score = data?.scores?.[0]?.total_score || 0;
	const bdScore = data?.scores?.[0] || {
		resume_score: 0,
		projects_score: 0,
		github_score: 0,
		dsa_score: 0,
		communication_score: 0
	};
	const rScore = data?.resume?.total_score || 0;
	const streak = data?.streak?.current_streak || 0;
	const xp = data?.xp?.total_xp || 0;
	const recruiterStats = isAuthed ? [
		{
			label: "Technical Skills",
			val: Math.min(100, Math.round(bdScore.projects_score * .5 + (bdScore.github_score || 0) * .5 + 10))
		},
		{
			label: "Problem Solving",
			val: Math.min(100, Math.round(dsa * 1.2 + (bdScore.dsa_score || 0) * .4))
		},
		{
			label: "Consistency",
			val: Math.min(100, streak * 5 + 25)
		},
		{
			label: "Learning Speed",
			val: Math.min(100, Math.round(xp / 80 + 35))
		},
		{
			label: "Resume Strength",
			val: rScore || 50
		},
		{
			label: "Interview Ready",
			val: score
		}
	] : [
		{
			label: "Technical Skills",
			val: 74
		},
		{
			label: "Problem Solving",
			val: 68
		},
		{
			label: "Consistency",
			val: 82
		},
		{
			label: "Learning Speed",
			val: 71
		},
		{
			label: "Resume Strength",
			val: 68
		},
		{
			label: "Interview Ready",
			val: 72
		}
	];
	const radarData = recruiterStats.map((s) => ({
		subject: s.label,
		A: s.val,
		fullMark: 100
	}));
	const overallProb = Math.round(recruiterStats.reduce((a, s) => a + s.val, 0) / recruiterStats.length);
	const hireDecision = overallProb >= 80 ? "Strong Hire" : overallProb >= 65 ? "Hire" : overallProb >= 50 ? "Borderline" : "Not Yet";
	const hireColor = hireDecision === "Strong Hire" ? "oklch(0.88 0.18 145)" : hireDecision === "Hire" ? "oklch(0.75 0.2 200)" : hireDecision === "Borderline" ? "oklch(0.85 0.18 70)" : "oklch(0.72 0.22 330)";
	const strengths = isAuthed ? recruiterStats.filter((s) => s.val >= 70).map((s) => s.label) : DEMO_RECRUITER.strengths;
	isAuthed ? recruiterStats.filter((s) => s.val < 60).map((s) => `Low ${s.label} (${s.val}/100)`) : DEMO_RECRUITER.weaknesses;
	const riskFactors = isAuthed ? [
		...dsa < 30 ? ["Limited DSA practice"] : [],
		...rScore < 60 ? ["Weak resume score"] : [],
		...streak < 5 ? ["Inconsistent activity"] : [],
		...data?.profile?.github_username ? [] : ["No GitHub connected"]
	] : DEMO_RECRUITER.riskFactors;
	const competitiveness = isAuthed ? overallProb >= 80 ? "Top 15% of applicants" : overallProb >= 65 ? "Top 35% of applicants" : overallProb >= 50 ? "Top 55% of applicants" : "Lower 45% — needs improvement" : DEMO_RECRUITER.competitiveness;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "dual-view",
		className: "relative py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center mb-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-full p-1.5 inline-flex gap-1 border border-white/10",
					children: ["student", "recruiter"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						onClick: () => setView(v),
						className: `relative px-8 py-3 rounded-full text-sm font-semibold transition-colors ${view === v ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`,
						children: [view === v && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "toggle-bg",
							className: "absolute inset-0 rounded-full bg-white/10",
							transition: {
								type: "spring",
								bounce: .2,
								duration: .4
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative z-10 flex items-center gap-2",
							children: [v === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), v === "student" ? "Student View" : "Recruiter View"]
						})]
					}, v))
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: view === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
						y: -15
					},
					transition: { duration: .35 },
					className: "glass-strong rounded-3xl p-8 md:p-12 text-center border border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { y: [
								0,
								-10,
								0
							] },
							transition: {
								duration: 3,
								repeat: Infinity
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-16 w-16 text-accent mx-auto mb-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-3xl font-bold mb-4",
							children: isAuthed ? `You're building momentum, ${data?.profile?.full_name?.split(" ")[0] || "there"}!` : "You're doing great!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground max-w-xl mx-auto mb-10",
							children: isAuthed ? `Placement score: ${score}%. Every DSA problem and resume update compounds into career growth. Keep your ${streak}-day streak alive.` : "Keep solving problems and building your streak. Every small step compounds into massive career growth."
						}),
						isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-4 max-w-lg mx-auto",
							children: [
								{
									label: "Placement Score",
									value: `${score}%`,
									icon: Target
								},
								{
									label: "Day Streak",
									value: streak.toString(),
									icon: Zap
								},
								{
									label: "DSA Solved",
									value: dsa.toString(),
									icon: Brain
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-5 w-5 text-accent mx-auto mb-2" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-2xl font-bold text-aurora",
										children: s.value
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1",
										children: s.label
									})
								]
							}, s.label))
						})
					]
				}, "student") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
						y: -15
					},
					transition: { duration: .35 },
					className: "glass-strong rounded-3xl p-8 md:p-12 border border-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-12 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "px-6 py-3 rounded-2xl font-display text-xl font-bold hire-yes",
									style: {
										background: `${hireColor}20`,
										color: hireColor,
										border: `1px solid ${hireColor}40`
									},
									children: hireDecision
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-widest text-muted-foreground",
									children: "Hiring Probability"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display text-3xl font-bold",
									style: { color: hireColor },
									children: [overallProb, "%"]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3 mb-8",
								children: recruiterStats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-xs mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: s.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-foreground",
										children: [s.val, "/100"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 rounded-full bg-white/5 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										className: "h-full bg-aurora",
										initial: { width: 0 },
										animate: { width: `${s.val}%` },
										transition: {
											duration: 1,
											ease: "easeOut"
										}
									})
								})] }, s.label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumn, { className: "h-5 w-5 text-accent shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Market Position: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: competitiveness
									})]
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-[240px] w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
											cx: "50%",
											cy: "50%",
											outerRadius: "80%",
											data: radarData,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "rgba(255,255,255,0.08)" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
													dataKey: "subject",
													tick: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomAngleAxisTick, {})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarRadiusAxis, {
													angle: 30,
													domain: [0, 100],
													tick: false,
													axisLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
													name: "Candidate",
													dataKey: "A",
													stroke: "oklch(0.72 0.22 295)",
													fill: "oklch(0.72 0.22 295)",
													fillOpacity: .35
												})
											]
										})
									})
								}),
								strengths.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-[oklch(0.88_0.18_145)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
										children: "Strengths"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1.5",
									children: (typeof strengths[0] === "string" && strengths.map ? strengths : []).slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm text-[oklch(0.88_0.18_145)] flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-3 w-3 shrink-0" }),
											" ",
											s
										]
									}, s))
								})] }),
								riskFactors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-[oklch(0.85_0.18_70)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-widest text-muted-foreground font-semibold",
										children: "Risk Factors"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-1.5",
									children: riskFactors.slice(0, 3).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm text-[oklch(0.85_0.18_70)] flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3 w-3 shrink-0" }),
											" ",
											r
										]
									}, r))
								})] })
							]
						})]
					})
				}, "recruiter")
			})]
		})
	});
}
var DEMO_RESUME = {
	atsScore: 92,
	recruiterRating: 87,
	keywordMatch: 78,
	health: 85,
	topStrength: "Clear project impact metrics",
	topWeakness: "Missing quantified achievements",
	missingSkills: [
		"Docker",
		"Kubernetes",
		"CI/CD"
	],
	versions: [
		{
			version: 1,
			atsScore: 68,
			recruiterRating: 61,
			date: "3 months ago"
		},
		{
			version: 2,
			atsScore: 78,
			recruiterRating: 74,
			date: "6 weeks ago"
		},
		{
			version: 3,
			atsScore: 92,
			recruiterRating: 87,
			date: "2 weeks ago"
		}
	]
};
var DEMO_GITHUB = {
	repos: 14,
	activity: 82,
	languages: [
		"TypeScript",
		"JavaScript",
		"Python"
	],
	strengths: "React · TS",
	weak: "Testing",
	missing: "DevOps",
	trend: "+12% contributions this month"
};
var DEMO_PLACEMENT = {
	readiness: 72,
	interviewReady: 68,
	offerProb: 61,
	trend: "+4.2% this month"
};
function ScoreRing({ value, label, color, delay = 0 }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .5
	});
	const circ = 2 * Math.PI * 32;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-20 w-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 72 72",
				className: "h-full w-full -rotate-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "36",
					cy: "36",
					r: "32",
					fill: "none",
					stroke: "oklch(1 0 0 / 0.05)",
					strokeWidth: "6"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: "36",
					cy: "36",
					r: "32",
					fill: "none",
					stroke: color,
					strokeWidth: "6",
					strokeLinecap: "round",
					strokeDasharray: circ,
					initial: { strokeDashoffset: circ },
					animate: inView ? { strokeDashoffset: circ - circ * value / 100 } : {},
					transition: {
						duration: 1.2,
						ease: "easeOut",
						delay
					},
					style: { filter: `drop-shadow(0 0 6px ${color})` }
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg font-bold",
					style: { color },
					children: value
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-widest text-muted-foreground text-center",
			children: label
		})]
	});
}
function ResumeIntelligence({ data }) {
	const isAuthed = !!data?.profile;
	const resumeVersions = data?.resumeVersions || [];
	const hasResume = isAuthed && resumeVersions.length > 0;
	const [showHistory, setShowHistory] = (0, import_react.useState)(false);
	const r = hasResume ? {
		atsScore: resumeVersions[0]?.ats_score || DEMO_RESUME.atsScore,
		recruiterRating: resumeVersions[0]?.recruiter_rating || DEMO_RESUME.recruiterRating,
		keywordMatch: resumeVersions[0]?.keyword_match || DEMO_RESUME.keywordMatch,
		health: resumeVersions[0]?.total_score || DEMO_RESUME.health,
		topStrength: resumeVersions[0]?.top_strength || DEMO_RESUME.topStrength,
		topWeakness: resumeVersions[0]?.top_weakness || DEMO_RESUME.topWeakness,
		missingSkills: resumeVersions[0]?.missing_skills || DEMO_RESUME.missingSkills,
		versions: resumeVersions.map((v, i) => ({
			version: v.version_number || i + 1,
			atsScore: v.ats_score || 70,
			recruiterRating: v.recruiter_rating || 65,
			date: new Date(v.created_at).toLocaleDateString()
		})).reverse()
	} : DEMO_RESUME;
	if (!isAuthed || !hasResume) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-11 w-11 rounded-xl glass grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-accent" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: "Resume Analyzer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-lg font-semibold",
					children: "Upload Your Resume"
				})] }),
				!isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Demo"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			whileHover: { scale: 1.01 },
			className: "border-2 border-dashed border-white/15 rounded-2xl p-10 text-center relative overflow-hidden mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: { y: [-100, 100] },
					transition: {
						duration: 2.5,
						repeat: Infinity,
						ease: "linear"
					},
					className: "absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-10 w-10 mx-auto text-accent mb-4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium mb-1",
					children: isAuthed ? "Drop your resume here" : "Upload to unlock AI analysis"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "PDF, DOCX · Max 5MB"
				}),
				isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/resume-intelligence",
					className: "mt-5 inline-flex items-center gap-2 rounded-full bg-aurora px-6 py-2.5 text-sm font-semibold text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), " Upload & Analyze"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: [
				{
					icon: CircleCheckBig,
					text: "ATS compatibility analysis",
					color: "oklch(0.88 0.18 145)"
				},
				{
					icon: Star,
					text: "Recruiter-grade quality rating",
					color: "oklch(0.72 0.22 295)"
				},
				{
					icon: Zap,
					text: "Keyword match for target JDs",
					color: "oklch(0.75 0.2 200)"
				},
				{
					icon: Target,
					text: "Dream company skill alignment",
					color: "oklch(0.85 0.18 70)"
				}
			].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, {
					className: "h-4 w-4 shrink-0",
					style: { color: b.color }
				}), b.text]
			}, b.text))
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-11 w-11 rounded-xl glass grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-accent" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: "Resume Intelligence Center"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-display text-lg font-semibold",
				children: [
					"v",
					r.versions[r.versions.length - 1]?.version || 1,
					" · Active"
				]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-around mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
					value: r.atsScore,
					label: "ATS Score",
					color: "oklch(0.88 0.18 145)",
					delay: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
					value: r.recruiterRating,
					label: "Recruiter",
					color: "oklch(0.72 0.22 295)",
					delay: .1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
					value: r.keywordMatch,
					label: "Keywords",
					color: "oklch(0.75 0.2 200)",
					delay: .2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, {
					value: r.health,
					label: "Health",
					color: "oklch(0.85 0.18 70)",
					delay: .3
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-[oklch(0.88_0.18_145)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Top Strength"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium",
					children: r.topStrength
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-[oklch(0.72_0.22_330)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Top Weakness"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium",
					children: r.topWeakness
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
				children: "Missing Skills"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: (r.missingSkills || []).slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "glass rounded-full px-3 py-1 text-xs text-[oklch(0.72_0.22_330)]",
					children: s
				}, s))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2 mb-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/resume-intelligence",
					className: "flex items-center gap-1.5 glass rounded-full px-4 py-2 text-xs font-medium hover:bg-white/10 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5 text-accent" }), " Upload New Version"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setShowHistory(!showHistory),
					className: "flex items-center gap-1.5 glass rounded-full px-4 py-2 text-xs font-medium hover:bg-white/10 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5 text-accent" }), " Version History"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/resume-intelligence",
					className: "flex items-center gap-1.5 glass rounded-full px-4 py-2 text-xs font-medium hover:bg-white/10 transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5 text-accent" }), " Full Analysis"]
				})
			]
		}),
		showHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				height: 0
			},
			animate: {
				opacity: 1,
				height: "auto"
			},
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-white/10 rounded-2xl overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-4 text-[10px] uppercase tracking-widest text-muted-foreground px-4 py-2 border-b border-white/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Version" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ATS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recruiter" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Date" })
					]
				}), r.versions.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-4 text-xs px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-muted-foreground",
							children: ["v", v.version]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display font-semibold text-[oklch(0.88_0.18_145)]",
							children: v.atsScore
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display font-semibold text-[oklch(0.72_0.22_295)]",
							children: v.recruiterRating
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: v.date
						})
					]
				}, v.version))]
			})
		})
	] });
}
function GitHubIntelligence({ data }) {
	const isAuthed = !!data?.profile;
	const gh = isAuthed && data?.profile?.github_username ? {
		repos: DEMO_GITHUB.repos,
		activity: data?.scores?.[0]?.github_score || DEMO_GITHUB.activity,
		languages: DEMO_GITHUB.languages,
		strengths: DEMO_GITHUB.strengths,
		weak: DEMO_GITHUB.weak,
		missing: DEMO_GITHUB.missing,
		trend: DEMO_GITHUB.trend
	} : DEMO_GITHUB;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-11 w-11 rounded-xl glass grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: "GitHub Intelligence"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-lg font-semibold",
				children: isAuthed && data?.profile?.github_username ? `@${data.profile.github_username}` : "Connect GitHub"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 md:grid-cols-3 gap-2 mb-6",
			children: [
				"dsa-tracker",
				"portfolio-v3",
				"ml-classifier",
				"chat-app",
				"redux-store",
				"next-blog"
			].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { delay: i * .06 },
				className: "glass rounded-lg px-3 py-2 text-xs font-mono truncate",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "→"
					}),
					" ",
					r
				]
			}, r))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-3 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold text-aurora",
						children: gh.repos
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1",
						children: "Repos"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold",
						style: { color: "oklch(0.88 0.18 145)" },
						children: gh.activity
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1",
						children: "Health"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1 justify-center",
						children: gh.languages.slice(0, 2).map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-[oklch(0.75_0.2_200)]",
							children: l
						}, l))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground mt-1",
						children: "Top Langs"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-2",
			children: [
				{
					label: "Strengths",
					value: gh.strengths,
					color: "oklch(0.88 0.18 145)"
				},
				{
					label: "Weak",
					value: gh.weak,
					color: "oklch(0.85 0.18 70)"
				},
				{
					label: "Missing",
					value: gh.missing,
					color: "oklch(0.72 0.22 330)"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-widest text-muted-foreground",
					children: s.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 text-xs font-medium",
					style: { color: s.color },
					children: s.value
				})]
			}, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-2 text-sm text-[oklch(0.88_0.18_145)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
				" ",
				gh.trend
			]
		})
	] });
}
function PlacementIntelligence({ data }) {
	const isAuthed = !!data?.profile;
	const score = data?.scores?.[0]?.total_score || DEMO_PLACEMENT.readiness;
	const interviewReady = isAuthed ? Math.round(score * .92) : DEMO_PLACEMENT.interviewReady;
	const offerProb = isAuthed ? Math.round(score * .78) : DEMO_PLACEMENT.offerProb;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-11 w-11 rounded-xl glass grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-accent" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-widest text-muted-foreground",
				children: "Placement Intelligence"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-lg font-semibold",
				children: "Career Readiness"
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: [
				{
					label: "Placement Readiness",
					value: score,
					color: "oklch(0.75 0.2 200)"
				},
				{
					label: "Interview Readiness",
					value: interviewReady,
					color: "oklch(0.72 0.22 295)"
				},
				{
					label: "Offer Probability",
					value: offerProb,
					color: "oklch(0.88 0.18 145)"
				}
			].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-sm mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: m.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display font-semibold",
					style: { color: m.color },
					children: [m.value, "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 rounded-full bg-white/5 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full rounded-full",
					style: { background: m.color },
					initial: { width: 0 },
					whileInView: { width: `${m.value}%` },
					viewport: { once: true },
					transition: {
						duration: 1.2,
						ease: "easeOut",
						delay: i * .15
					}
				})
			})] }, m.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex items-center gap-2 text-sm glass rounded-xl px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4 text-[oklch(0.88_0.18_145)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "Growth Trend:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[oklch(0.88_0.18_145)] font-medium",
					children: isAuthed && data?.scores?.length > 1 ? `+${score - data.scores[1].total_score} pts from last scan` : "+4.2% this month"
				})
			]
		})
	] });
}
function AIIntelligenceCenter({ data }) {
	const isAuthed = !!data?.profile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "ai-center",
		className: "relative py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase tracking-widest",
								children: "AI Intelligence Center"
							})]
						}), !isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Demo Preview"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl md:text-6xl font-bold tracking-tight",
						children: [
							"Every file. Every commit.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-aurora",
								children: "Decoded."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground",
						children: "Resume, GitHub, and placement intelligence — unified into one command center."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-3 gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 40
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "glass-strong rounded-3xl p-8 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -right-20 h-60 w-60 rounded-full bg-aurora opacity-20 blur-3xl pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 overflow-hidden rounded-3xl pointer-events-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "intel-scan absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative z-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeIntelligence, { data })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 40
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .1 },
						className: "glass-strong rounded-3xl p-8 relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-20 -left-20 h-60 w-60 rounded-full bg-accent opacity-15 blur-3xl pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitHubIntelligence, { data })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 40
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .2 },
						className: "glass-strong rounded-3xl p-8 relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[oklch(0.72_0.22_330)] opacity-15 blur-3xl pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlacementIntelligence, { data })
						})]
					})
				]
			})]
		})
	});
}
var COMPANIES = [
	{
		name: "Google",
		emoji: "🔵",
		required: 92,
		tier: "FAANG",
		skillBreakdown: [
			{
				label: "Resume",
				required: 90
			},
			{
				label: "DSA",
				required: 95
			},
			{
				label: "Projects",
				required: 88
			},
			{
				label: "System Design",
				required: 95
			}
		]
	},
	{
		name: "Amazon",
		emoji: "🟠",
		required: 90,
		tier: "FAANG",
		skillBreakdown: [
			{
				label: "Resume",
				required: 88
			},
			{
				label: "DSA",
				required: 88
			},
			{
				label: "Projects",
				required: 85
			},
			{
				label: "System Design",
				required: 90
			}
		]
	},
	{
		name: "Microsoft",
		emoji: "🪟",
		required: 88,
		tier: "FAANG",
		skillBreakdown: [
			{
				label: "Resume",
				required: 85
			},
			{
				label: "DSA",
				required: 85
			},
			{
				label: "Projects",
				required: 82
			},
			{
				label: "System Design",
				required: 88
			}
		]
	},
	{
		name: "Meta",
		emoji: "🔷",
		required: 92,
		tier: "FAANG",
		skillBreakdown: [
			{
				label: "Resume",
				required: 90
			},
			{
				label: "DSA",
				required: 92
			},
			{
				label: "Projects",
				required: 88
			},
			{
				label: "System Design",
				required: 90
			}
		]
	},
	{
		name: "Flipkart",
		emoji: "🛍️",
		required: 84,
		tier: "Product",
		skillBreakdown: [
			{
				label: "Resume",
				required: 80
			},
			{
				label: "DSA",
				required: 82
			},
			{
				label: "Projects",
				required: 78
			},
			{
				label: "System Design",
				required: 80
			}
		]
	},
	{
		name: "Swiggy",
		emoji: "🟠",
		required: 82,
		tier: "Product",
		skillBreakdown: [
			{
				label: "Resume",
				required: 78
			},
			{
				label: "DSA",
				required: 80
			},
			{
				label: "Projects",
				required: 76
			},
			{
				label: "System Design",
				required: 78
			}
		]
	},
	{
		name: "Zomato",
		emoji: "🔴",
		required: 80,
		tier: "Product",
		skillBreakdown: [
			{
				label: "Resume",
				required: 76
			},
			{
				label: "DSA",
				required: 78
			},
			{
				label: "Projects",
				required: 74
			},
			{
				label: "System Design",
				required: 76
			}
		]
	},
	{
		name: "Uber",
		emoji: "⬛",
		required: 86,
		tier: "Product",
		skillBreakdown: [
			{
				label: "Resume",
				required: 82
			},
			{
				label: "DSA",
				required: 84
			},
			{
				label: "Projects",
				required: 80
			},
			{
				label: "System Design",
				required: 84
			}
		]
	},
	{
		name: "Razorpay",
		emoji: "💙",
		required: 82,
		tier: "Product",
		skillBreakdown: [
			{
				label: "Resume",
				required: 78
			},
			{
				label: "DSA",
				required: 80
			},
			{
				label: "Projects",
				required: 76
			},
			{
				label: "System Design",
				required: 78
			}
		]
	}
];
function SkillBar({ label, required, current, delay }) {
	const gap = Math.max(0, required - current);
	const pct = Math.min(100, current);
	const color = gap === 0 ? "oklch(0.88 0.18 145)" : gap < 15 ? "oklch(0.85 0.18 70)" : "oklch(0.72 0.22 330)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm mb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display font-semibold",
					style: { color },
					children: current
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground/50",
					children: "/"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: required
				}),
				gap > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-mono",
					style: { color: "oklch(0.72 0.22 330)" },
					children: ["-", gap]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-2 rounded-full bg-white/5 overflow-visible",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "absolute top-0 left-0 h-full rounded-full",
			style: { background: color },
			initial: { width: 0 },
			animate: { width: `${pct}%` },
			transition: {
				duration: 1.2,
				ease: "easeOut",
				delay
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-1/2 -translate-y-1/2 h-4 w-0.5 rounded-full bg-white/40",
			style: { left: `${required}%` }
		})]
	})] });
}
function DreamCompanySection({ data }) {
	const [activeIdx, setActiveIdx] = (0, import_react.useState)(4);
	const isAuthed = !!data?.profile;
	const score = data?.scores?.[0]?.total_score || 0;
	const bdScore = data?.scores?.[0] || {};
	const resumeScore = data?.resume?.total_score || 0;
	const dsa = data?.dsaLogs?.reduce((acc, l) => acc + l.easy + l.medium + l.hard, 0) || 0;
	const company = COMPANIES[activeIdx];
	const userScores = isAuthed ? {
		Resume: resumeScore || Math.round(score * .9),
		DSA: bdScore.dsa_score || Math.min(100, Math.round(dsa * 1.5)),
		Projects: bdScore.projects_score || Math.round(score * .85),
		"System Design": Math.max(0, Math.round((bdScore.github_score || 0) * .6 + score * .3))
	} : {
		Resume: 68,
		DSA: 62,
		Projects: 72,
		"System Design": 45
	};
	const matchScore = Math.round(company.skillBreakdown.reduce((acc, s) => {
		return acc + Math.min(100, (userScores[s.label] || 0) / s.required * 100);
	}, 0) / company.skillBreakdown.length);
	const gapPts = company.required - (isAuthed ? score : 68);
	const estMonths = Math.max(1, Math.ceil(gapPts / 5));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "target-company",
		className: "relative py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-2xl mx-auto mb-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "uppercase tracking-widest",
									children: "Dream Company Analyzer"
								})]
							}), !isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-amber-300",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Demo Preview"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl md:text-6xl font-bold tracking-tight",
							children: ["Aim higher. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-aurora",
								children: "Train smarter."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground",
							children: "See exactly how far you are from your dream company — and the precise steps to close the gap."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap justify-center gap-2 mb-10",
					children: COMPANIES.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						onClick: () => setActiveIdx(i),
						whileHover: { scale: 1.05 },
						whileTap: { scale: .97 },
						className: `rounded-full px-4 py-2 text-sm transition-all ${activeIdx === i ? "bg-aurora text-white shadow-glow" : "glass hover:bg-white/10 text-muted-foreground hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-1.5",
							children: c.emoji
						}), c.name]
					}, c.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -20
						},
						transition: { duration: .35 },
						className: "grid md:grid-cols-3 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-strong rounded-3xl p-8 flex flex-col items-center justify-center gap-4 border border-white/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground",
										children: "Company Match"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-36 w-36",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											viewBox: "0 0 120 120",
											className: "h-full w-full -rotate-90",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "60",
												cy: "60",
												r: "50",
												fill: "none",
												stroke: "oklch(1 0 0 / 0.06)",
												strokeWidth: "8"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
												cx: "60",
												cy: "60",
												r: "50",
												fill: "none",
												stroke: matchScore >= 80 ? "oklch(0.88 0.18 145)" : matchScore >= 60 ? "oklch(0.85 0.18 70)" : "oklch(0.72 0.22 330)",
												strokeWidth: "8",
												strokeLinecap: "round",
												strokeDasharray: 2 * Math.PI * 50,
												initial: { strokeDashoffset: 2 * Math.PI * 50 },
												animate: { strokeDashoffset: 2 * Math.PI * 50 * (1 - matchScore / 100) },
												transition: {
													duration: 1.4,
													ease: "easeOut"
												}
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 grid place-items-center text-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-display text-3xl font-bold text-aurora",
												children: [matchScore, "%"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground mt-1",
												children: "Match"
											})] })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-display text-2xl font-semibold",
											children: [
												company.emoji,
												" ",
												company.name
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "glass rounded-full px-3 py-1 text-xs mt-2 inline-block",
											style: { color: {
												FAANG: "oklch(0.72 0.22 295)",
												Product: "oklch(0.75 0.2 200)"
											}[company.tier] },
											children: [company.tier, " Tier"]
										})]
									}),
									gapPts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-full glass rounded-2xl p-4 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-center gap-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Est. Time to Reach:"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-display text-xl font-bold text-aurora mt-1",
											children: [
												estMonths,
												" month",
												estMonths > 1 ? "s" : ""
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-strong rounded-3xl p-8 border border-white/10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-lg font-semibold",
											children: "Skill Breakdown"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-5",
										children: company.skillBreakdown.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillBar, {
											label: s.label,
											required: s.required,
											current: userScores[s.label] || 0,
											delay: i * .1
										}, s.label))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 text-[10px] text-muted-foreground flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-white/10" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Your score / Required score · Marker = target" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-white/10" })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-strong rounded-3xl p-8 border border-white/10 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-lg font-semibold",
											children: "Gap Analysis"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass rounded-2xl p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
												children: "Overall Score Gap"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-display text-4xl font-bold text-aurora",
													children: isAuthed ? score : 68
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-muted-foreground",
													children: [
														"/ ",
														company.required,
														" required"
													]
												})]
											}),
											gapPts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 text-sm",
												style: { color: "oklch(0.72 0.22 330)" },
												children: [
													"Gap: ",
													gapPts,
													" points"
												]
											}),
											gapPts <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 text-sm text-[oklch(0.88_0.18_145)]",
												children: "✅ You meet the threshold!"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-3",
										children: "Priority Focus Areas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [company.skillBreakdown.map((s) => ({
											...s,
											current: userScores[s.label] || 0,
											gap: s.required - (userScores[s.label] || 0)
										})).filter((s) => s.gap > 0).sort((a, b) => b.gap - a.gap).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between glass rounded-xl px-4 py-2.5 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.label })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-mono",
												style: { color: "oklch(0.72 0.22 330)" },
												children: [
													"-",
													s.gap,
													" pts"
												]
											})]
										}, s.label)), company.skillBreakdown.every((s) => (userScores[s.label] || 0) >= s.required) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center text-[oklch(0.88_0.18_145)] text-sm py-4",
											children: "🎯 All skills meet requirements!"
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "glass-strong rounded-2xl p-4 border border-[oklch(0.72_0.22_295)]/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground mb-2",
											children: "AI Recommendation"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: gapPts > 20 ? `Focus on ${company.skillBreakdown.sort((a, b) => (userScores[b.label] || 0) - (userScores[a.label] || 0))[company.skillBreakdown.length - 1]?.label} first — it's your largest gap.` : gapPts > 0 ? "You're close! 2–3 months of focused practice should get you there." : "You're ready to apply! Start with your strongest matching role."
										})]
									})
								]
							})
						]
					}, activeIdx)
				})
			]
		})
	});
}
var DEMO_FEED = [
	{
		type: "dsa",
		label: "Solved 3 medium DSA problems",
		sub: "Binary Search · Two Pointers · Sliding Window",
		icon: CodeXml,
		color: "oklch(0.85 0.18 70)",
		xp: 30,
		time: "2h ago"
	},
	{
		type: "achievement",
		label: "Unlocked: DSA Beginner",
		sub: "10 problems milestone reached",
		icon: Trophy,
		color: "oklch(0.72 0.22 295)",
		xp: 50,
		time: "5h ago"
	},
	{
		type: "resume",
		label: "Resume v3 analyzed",
		sub: "ATS Score: 88 · +12 from v2",
		icon: FileText,
		color: "oklch(0.75 0.2 200)",
		xp: 50,
		time: "1d ago"
	},
	{
		type: "interview",
		label: "Mock interview completed",
		sub: "Technical Round · Score: 74/100",
		icon: MessageSquare,
		color: "oklch(0.88 0.18 145)",
		xp: 40,
		time: "2d ago"
	},
	{
		type: "xp",
		label: "Streak bonus earned",
		sub: "7-day active streak · Bonus XP",
		icon: Flame,
		color: "oklch(0.75 0.22 40)",
		xp: 25,
		time: "3d ago"
	},
	{
		type: "mission",
		label: "Daily mission completed",
		sub: "Push to GitHub · Mission done",
		icon: CircleCheckBig,
		color: "oklch(0.88 0.18 145)",
		xp: 20,
		time: "4d ago"
	}
];
var DEMO_WEEKLY = {
	xp: 245,
	dsaProblems: 12,
	placementGrowth: "+3.1%",
	xpTrend: "+18% vs last week",
	dsaTrend: "+5 vs last week"
};
var DEMO_ACHIEVEMENTS = [
	{
		code: "dsa_10",
		unlocked: true
	},
	{
		code: "resume_uploaded",
		unlocked: true
	},
	{
		code: "github_connected",
		unlocked: true
	},
	{
		code: "streak_7",
		unlocked: false
	},
	{
		code: "placement_80",
		unlocked: false
	}
];
function EventCard({ event, index }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .4
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		ref,
		initial: {
			opacity: 0,
			x: 20
		},
		animate: inView ? {
			opacity: 1,
			x: 0
		} : {},
		transition: {
			duration: .45,
			delay: index * .08
		},
		className: "flex items-start gap-4 glass rounded-2xl p-5 hover:bg-white/[0.06] transition group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 w-10 rounded-full grid place-items-center shrink-0 transition-transform duration-300 group-hover:scale-110",
				style: {
					background: `${event.color}20`,
					border: `1px solid ${event.color}30`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: event.color },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(event.icon, { className: "h-4 w-4" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium text-sm",
					children: event.label
				}), event.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: event.sub
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-end gap-1 shrink-0",
				children: [event.xp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-full px-2.5 py-0.5 text-xs font-mono text-[oklch(0.88_0.18_145)]",
					children: [
						"+",
						event.xp,
						" XP"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-muted-foreground font-mono",
					children: event.time
				})]
			})
		]
	});
}
function AchievementBadge({ code, unlocked, index }) {
	const ach = ACHIEVEMENT_CATALOG[code];
	if (!ach) return null;
	const colors = [
		"oklch(0.75 0.20 200)",
		"oklch(0.72 0.22 295)",
		"oklch(0.85 0.18 70)",
		"oklch(0.88 0.18 145)",
		"oklch(0.72 0.22 330)"
	];
	const color = colors[index % colors.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			scale: .5,
			rotate: -15
		},
		whileInView: {
			opacity: 1,
			scale: 1,
			rotate: 0
		},
		viewport: { once: true },
		transition: {
			delay: index * .1,
			type: "spring",
			stiffness: 150
		},
		whileHover: unlocked ? {
			y: -6,
			scale: 1.05
		} : {},
		className: `glass-strong rounded-2xl p-5 text-center ${unlocked ? "cursor-pointer" : "opacity-40 grayscale"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-14 w-14 mx-auto mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 rounded-full blur-xl opacity-50",
					style: { background: color }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-full w-full rounded-full grid place-items-center text-2xl",
					children: ach.emoji
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium leading-tight",
				children: ach.name
			}),
			!unlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] text-muted-foreground mt-1",
				children: "Locked"
			})
		]
	});
}
function CareerProgressFeed({ data }) {
	const isAuthed = !!data?.profile;
	const liveFeed = [];
	if (isAuthed) {
		(data?.dsaLogs || []).slice(0, 3).forEach((l) => {
			const total = (l.easy || 0) + (l.medium || 0) + (l.hard || 0);
			if (total > 0) liveFeed.push({
				type: "dsa",
				label: `Solved ${total} DSA problem${total > 1 ? "s" : ""}`,
				sub: `Easy: ${l.easy} · Medium: ${l.medium} · Hard: ${l.hard}`,
				icon: CodeXml,
				color: "oklch(0.85 0.18 70)",
				xp: total * 10,
				time: timeAgo(l.created_at)
			});
		});
		(data?.achs || []).slice(0, 2).forEach((a) => {
			liveFeed.push({
				type: "achievement",
				label: `Unlocked: ${ACHIEVEMENT_CATALOG[a.code]?.name || a.code}`,
				sub: ACHIEVEMENT_CATALOG[a.code]?.desc,
				icon: Trophy,
				color: "oklch(0.72 0.22 295)",
				xp: 50,
				time: timeAgo(a.unlocked_at || a.created_at)
			});
		});
		(data?.activityLogs || []).slice(0, 3).forEach((l) => {
			const mapped = {
				resume_upload: {
					label: "Resume uploaded & analyzed",
					icon: FileText,
					color: "oklch(0.75 0.2 200)"
				},
				mock_interview: {
					label: "Mock interview completed",
					icon: MessageSquare,
					color: "oklch(0.88 0.18 145)"
				},
				mission_complete: {
					label: "Daily mission completed",
					icon: CircleCheckBig,
					color: "oklch(0.88 0.18 145)"
				}
			}[l.type];
			if (mapped) liveFeed.push({
				type: l.type,
				label: mapped.label,
				icon: mapped.icon,
				color: mapped.color,
				xp: l.xp_delta,
				time: timeAgo(l.created_at)
			});
		});
		liveFeed.sort((a, b) => {
			return parseTimeAgo(a.time) - parseTimeAgo(b.time);
		});
	}
	const feedToShow = isAuthed && liveFeed.length > 0 ? liveFeed.slice(0, 6) : DEMO_FEED;
	const weekly = isAuthed ? {
		xp: Math.round((data?.xp?.total_xp || 0) * .15),
		dsaProblems: (data?.dsaLogs || []).slice(0, 5).reduce((acc, l) => acc + l.easy + l.medium + l.hard, 0),
		placementGrowth: (data?.scores || []).length > 1 ? `+${(data.scores[0].total_score - data.scores[1].total_score).toFixed(1)}%` : "+2.4%",
		xpTrend: "+15% vs last week",
		dsaTrend: "+3 vs last week"
	} : DEMO_WEEKLY;
	const userAchCodes = (data?.achs || []).map((a) => a.code);
	const achievementsToShow = isAuthed ? Object.keys(ACHIEVEMENT_CATALOG).slice(0, 5).map((code) => ({
		code,
		unlocked: userAchCodes.includes(code)
	})) : DEMO_ACHIEVEMENTS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "progress",
		className: "relative py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "uppercase tracking-widest",
							children: "Career Progress Feed"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl md:text-6xl font-bold tracking-tight",
						children: ["Every step. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-aurora",
							children: "Every win."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground",
						children: "A chronological record of your career growth — XP earned, problems solved, milestones unlocked."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-3 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)] feed-dot" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl font-semibold",
								children: "Recent Activity"
							}),
							!isAuthed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass rounded-full px-3 py-1 text-xs text-muted-foreground",
								children: "Demo data"
							})
						]
					}), feedToShow.map((event, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventCard, {
						event,
						index: i
					}, i))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold",
								children: "This Week"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1",
										children: "XP Earned"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-3xl font-bold text-aurora",
										children: weekly.xp
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-[oklch(0.88_0.18_145)] flex items-center gap-1 mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }),
											" ",
											weekly.xpTrend
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-white/5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1",
										children: "Problems Solved"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-3xl font-bold",
										children: weekly.dsaProblems
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-[oklch(0.88_0.18_145)] flex items-center gap-1 mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }),
											" ",
											weekly.dsaTrend
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px bg-white/5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1",
										children: "Placement Growth"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-3xl font-bold text-[oklch(0.88_0.18_145)]",
										children: weekly.placementGrowth
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-[oklch(0.88_0.18_145)] flex items-center gap-1 mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " Trending up"]
									})
								] })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6 border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-5 w-5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-semibold",
								children: "Achievements"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-3",
							children: achievementsToShow.slice(0, 6).map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AchievementBadge, {
								code: a.code,
								unlocked: a.unlocked,
								index: i
							}, a.code))
						})]
					})]
				})]
			})]
		})
	});
}
function timeAgo(ts) {
	const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 6e4);
	if (diff < 60) return `${diff}m ago`;
	const hrs = Math.floor(diff / 60);
	if (hrs < 24) return `${hrs}h ago`;
	return `${Math.floor(hrs / 24)}d ago`;
}
function parseTimeAgo(s) {
	const n = parseInt(s);
	if (s.includes("m")) return n;
	if (s.includes("h")) return n * 60;
	if (s.includes("d")) return n * 1440;
	return 0;
}
var FEATURED_STORIES = [
	{
		id: "f1",
		author_name: "Aarav S.",
		author_role: "SWE @ Razorpay",
		before_syncrole: "Applying to 50+ companies with generic resume, zero responses.",
		current_results: "Landed SWE role at Razorpay — 3x my previous offer. 4 interview calls in 2 weeks.",
		advice: "Stop optimizing in a vacuum. Let the data tell you what recruiters care about.",
		xp_growth: 3200,
		dsa_growth: 60,
		readiness_growth: 38,
		likes_count: 241
	},
	{
		id: "f2",
		author_name: "Priya K.",
		author_role: "Intern @ Atlassian",
		before_syncrole: "7.8 CGPA but no internship. Invisible to recruiters.",
		current_results: "First internship from Atlassian in 45 days. Same company that rejected me 6 months ago.",
		advice: "Your GitHub is your new resume. Ship real projects that solve real problems.",
		xp_growth: 2800,
		dsa_growth: 45,
		readiness_growth: 42,
		likes_count: 187
	},
	{
		id: "f3",
		author_name: "Rohit M.",
		author_role: "SDE-1 @ Flipkart",
		before_syncrole: "Stuck at service companies. Product company felt out of reach.",
		current_results: "SDE-1 at Flipkart. Turned down 2 other product company offers.",
		advice: "Consistency beats brilliance. SyncRole keeps you accountable when motivation fades.",
		xp_growth: 4100,
		dsa_growth: 100,
		readiness_growth: 51,
		likes_count: 312
	}
];
function StoryModal({ onClose, userProfile }) {
	const [step, setStep] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)({
		before: "",
		problems: "",
		actions: "",
		results: "",
		advice: ""
	});
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const { user } = useAuth();
	const questions = [
		{
			key: "before",
			label: "Before SyncRole",
			prompt: "What was your situation before using SyncRole?",
			placeholder: "I was applying to 50+ companies with no responses..."
		},
		{
			key: "problems",
			label: "Biggest Problems",
			prompt: "What were your biggest challenges?",
			placeholder: "No feedback loop, weak resume, inconsistent DSA practice..."
		},
		{
			key: "actions",
			label: "Actions Taken",
			prompt: "What specific steps did you take on SyncRole?",
			placeholder: "Used resume analyzer, built 2 projects, solved 60 DSA problems..."
		},
		{
			key: "results",
			label: "Current Results",
			prompt: "What's your outcome so far?",
			placeholder: "Landed SWE role at [Company] — [X]x my previous offer..."
		},
		{
			key: "advice",
			label: "Advice to Others",
			prompt: "What's your best advice for others?",
			placeholder: "Don't optimize in a vacuum. Let data tell you what matters..."
		}
	];
	const current = questions[step];
	const isLast = step === questions.length - 1;
	const isComplete = Object.values(form).every((v) => v.trim().length > 0);
	async function submit() {
		if (!user) return;
		setSubmitting(true);
		try {
			const { error } = await supabase.from("career_transformations").insert({
				user_id: user.id,
				before_syncrole: form.before,
				biggest_problems: form.problems,
				actions_taken: form.actions,
				current_results: form.results,
				advice: form.advice,
				author_name: userProfile?.full_name || null,
				author_role: userProfile?.career_goal ? `Targeting: ${userProfile.career_goal}` : null,
				author_college: userProfile?.college || null,
				is_published: false
			});
			if (error) throw error;
			toast.success("Your story is submitted! Our team will review and publish it soon. 🚀");
			onClose();
		} catch (err) {
			toast.error(err.message || "Failed to submit. Please try again.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-50 grid place-items-center p-4 bg-background/80 backdrop-blur-xl",
		onClick: (e) => e.target === e.currentTarget && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .9,
				y: 20
			},
			animate: {
				scale: 1,
				y: 0
			},
			exit: {
				scale: .9,
				y: 20
			},
			className: "w-full max-w-lg glass-strong rounded-3xl p-8 relative border border-white/10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-5 right-5 h-8 w-8 grid place-items-center rounded-full glass hover:bg-white/10 transition",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-10 w-10 rounded-xl bg-aurora grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg font-semibold",
						children: "Share Your Journey"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							"Step ",
							step + 1,
							" of ",
							questions.length
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 rounded-full bg-white/5 overflow-hidden mb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full bg-aurora",
						animate: { width: `${(step + 1) / questions.length * 100}%` },
						transition: { duration: .4 }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: 20
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: -20
						},
						transition: { duration: .25 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-2",
								children: current.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-xl font-semibold mb-4",
								children: current.prompt
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: form[current.key],
								onChange: (e) => setForm((prev) => ({
									...prev,
									[current.key]: e.target.value
								})),
								placeholder: current.placeholder,
								rows: 4,
								className: "w-full glass rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 ring-accent/50 resize-none"
							})
						]
					}, step)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setStep((s) => Math.max(0, s - 1)),
						disabled: step === 0,
						className: "glass rounded-full px-5 py-2.5 text-sm disabled:opacity-30 hover:bg-white/10 transition",
						children: "Back"
					}), isLast ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: submit,
						disabled: !isComplete || submitting,
						className: "relative inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative z-10 flex items-center gap-2",
							children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), submitting ? "Submitting…" : "Submit Story"]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (form[current.key].trim().length < 10) {
								toast.error("Please add more detail to continue.");
								return;
							}
							setStep((s) => s + 1);
						},
						className: "relative inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-semibold text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative z-10 flex items-center gap-2",
							children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})]
					})]
				})
			]
		})
	});
}
function FeaturedStoryCard({ story, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: { once: true },
		transition: { delay: index * .12 },
		whileHover: { y: -6 },
		className: "w-[380px] shrink-0 glass-strong rounded-3xl p-7 border border-white/10 hover:border-white/20 transition-all duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-11 w-11 rounded-full bg-aurora grid place-items-center font-display font-bold",
						children: (story.author_name || "?")[0]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: story.author_name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: story.author_role
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "story-verified rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.88_0.18_145)] flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3 w-3" }), " Verified"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 mb-4",
				children: [
					story.xp_growth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "glass rounded-full px-2.5 py-0.5 text-[10px] text-[oklch(0.72_0.22_295)]",
						children: [
							"+",
							story.xp_growth.toLocaleString(),
							" XP"
						]
					}),
					story.dsa_growth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "glass rounded-full px-2.5 py-0.5 text-[10px] text-[oklch(0.85_0.18_70)]",
						children: [
							"+",
							story.dsa_growth,
							" DSA"
						]
					}),
					story.readiness_growth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "glass rounded-full px-2.5 py-0.5 text-[10px] text-[oklch(0.88_0.18_145)]",
						children: [
							"+",
							story.readiness_growth,
							"% Readiness"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground leading-relaxed mb-4",
				children: [
					"\"",
					story.current_results,
					"\""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-xl px-4 py-3 text-xs text-[oklch(0.88_0.18_145)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Advice: "
					}),
					"\"",
					story.advice,
					"\""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-1",
				children: [...Array(5)].map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-[oklch(0.85_0.18_70)] text-[oklch(0.85_0.18_70)]" }, k))
			})
		]
	});
}
function CareerTransformationsSection({ data }) {
	const { user } = useAuth();
	const [showModal, setShowModal] = (0, import_react.useState)(false);
	const [stories, setStories] = (0, import_react.useState)(FEATURED_STORIES);
	(0, import_react.useEffect)(() => {
		let alive = true;
		supabase.from("career_transformations").select("id, author_name, author_role, before_syncrole, current_results, advice, xp_growth, dsa_growth, readiness_growth, likes_count").eq("is_published", true).eq("is_featured", true).order("likes_count", { ascending: false }).limit(3).then(({ data: rows }) => {
			if (alive && rows && rows.length > 0) setStories(rows);
		});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "success",
		className: "relative py-32 px-6 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-7xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "uppercase tracking-widest",
								children: "Career Transformations"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-4xl md:text-6xl font-bold tracking-tight",
							children: ["Real students. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-aurora",
								children: "Real offers."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground max-w-md",
							children: "Every story verified against real platform activity. No fabrications, no hype."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-3 shrink-0",
						children: [user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
							whileHover: { scale: 1.03 },
							whileTap: { scale: .97 },
							onClick: () => setShowModal(true),
							className: "inline-flex items-center gap-2 glass-strong rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition border border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-accent" }), "Share Your Journey"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/career-transformations",
							className: "inline-flex items-center gap-2 glass-strong rounded-full px-6 py-3 text-sm font-semibold hover:bg-white/10 transition border border-white/10",
							children: ["See All Transformations ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "flex gap-6 w-max",
						animate: { x: ["0%", "-50%"] },
						transition: {
							duration: 35,
							repeat: Infinity,
							ease: "linear"
						},
						children: [...stories, ...stories].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedStoryCard, {
							story: s,
							index: i % stories.length
						}, `${s.id}-${i}`))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/career-transformations",
					className: "inline-flex items-center gap-2 glass rounded-full px-7 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 transition border border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-4 w-4 text-[oklch(0.88_0.18_145)]" }),
						stories.length,
						"+ Verified Transformations",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
					]
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryModal, {
		onClose: () => setShowModal(false),
		userProfile: data?.profile
	}) })] });
}
function FinalCTA() {
	const { user } = useAuth();
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-32 px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative p-px rounded-3xl overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] opacity-50 blur-xl animate-pulse" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] animate-spin-slow opacity-25" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative glass-strong rounded-[23px] p-12 md:p-20 text-center overflow-hidden bg-card/90 backdrop-blur-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-aurora opacity-30 blur-3xl pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								className: "inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs border border-white/10 mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex h-2 w-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.88_0.18_145)] opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)]" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground tracking-wide",
									children: "50,000+ Students. Real Outcomes."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
								initial: {
									opacity: 0,
									y: 30
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: {
									delay: .15,
									duration: .8
								},
								className: "relative font-display text-4xl md:text-6xl font-bold tracking-tight",
								children: [
									"Stop Guessing.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-aurora",
										children: "Know Exactly What Gets You Hired."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: .3 },
								className: "relative mt-6 text-muted-foreground max-w-xl mx-auto text-lg",
								children: "Join students who replaced guesswork with intelligence. SyncRole gives you the exact data, path, and tools to get hired faster."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { delay: .45 },
								className: "relative mt-12 flex flex-wrap justify-center gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { scale: 1.03 },
										whileTap: { scale: .97 },
										onClick: () => {
											window.dispatchEvent(new CustomEvent("open-syncpilot"));
										},
										className: "relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground shadow-glow",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative z-10 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Launch SyncPilot"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { scale: 1.03 },
										whileTap: { scale: .97 },
										onClick: () => nav({ to: user ? "/dashboard" : "/auth" }),
										className: "relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.88_0.18_145)] to-[oklch(0.75_0.2_200)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative z-10 flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-4 w-4" }),
												" ",
												user ? "Open Dashboard" : "Start Free",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
										whileHover: { scale: 1.03 },
										whileTap: { scale: .97 },
										onClick: () => window.open("mailto:hello@syncrole.app?subject=Sales Inquiry", "_blank"),
										className: "inline-flex items-center gap-2 glass-strong rounded-full px-8 py-4 text-sm font-semibold hover:bg-white/10 transition border border-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4" }), " Talk To Sales"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { opacity: 0 },
								whileInView: { opacity: 1 },
								viewport: { once: true },
								transition: { delay: .6 },
								className: "relative mt-14 flex flex-wrap justify-center gap-8 text-xs text-muted-foreground",
								children: [
									"✓ Free to start",
									"✓ No credit card required",
									"✓ Real AI analysis",
									"✓ Cancel anytime"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s }, s))
							})
						]
					})
				]
			})
		})
	});
}
(0, import_react.lazy)(() => import("./CareerSphere-CEpxDxLv.mjs"));
function MagneticButton({ children, variant = "primary", className = "", onClick }) {
	const ref = (0, import_react.useRef)(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, {
		stiffness: 200,
		damping: 15
	});
	const sy = useSpring(y, {
		stiffness: 200,
		damping: 15
	});
	function handleMove(e) {
		const r = ref.current.getBoundingClientRect();
		x.set((e.clientX - r.left - r.width / 2) * .25);
		y.set((e.clientY - r.top - r.height / 2) * .25);
	}
	function handleLeave() {
		x.set(0);
		y.set(0);
	}
	const base = "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-shadow";
	const styles = variant === "primary" ? "text-primary-foreground shadow-glow" : "glass-strong text-foreground hover:bg-white/10";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
		ref,
		style: {
			x: sx,
			y: sy
		},
		onMouseMove: handleMove,
		onMouseLeave: handleLeave,
		onClick,
		className: `${base} ${styles} ${className}`,
		children: [variant === "primary" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative z-10 inline-flex items-center gap-2",
			children
		})]
	});
}
function GetStartedCTA({ children, variant = "primary", className = "" }) {
	const { user } = useAuth();
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
		variant,
		className,
		onClick: () => nav({ to: user ? "/dashboard" : "/auth" }),
		children: children ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			user ? "Open Dashboard" : "Get Started",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
		] })
	});
}
function useHomeData(user) {
	const [data, setData] = (0, import_react.useState)({
		profile: null,
		xp: null,
		streak: null,
		scores: [],
		dsaLogs: [],
		achs: [],
		missions: [],
		resume: null,
		loading: true
	});
	(0, import_react.useEffect)(() => {
		if (!user) {
			setData((prev) => ({
				...prev,
				loading: false
			}));
			return;
		}
		let alive = true;
		async function load() {
			const uid = user.id;
			const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			const [pRes, xRes, sRes, scRes, dRes, aRes, mRes, rRes, alRes] = await Promise.all([
				supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
				supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
				supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle(),
				supabase.from("placement_scores").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(30),
				supabase.from("dsa_progress").select("*").eq("user_id", uid).order("log_date", { ascending: false }).limit(60),
				supabase.from("achievements").select("*").eq("user_id", uid),
				supabase.from("daily_missions").select("*").eq("user_id", uid).eq("mission_date", today),
				supabase.from("resume_analysis").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(10),
				supabase.from("activity_logs").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(20)
			]);
			if (alive) {
				const resumeVersions = rRes.data || [];
				setData({
					profile: pRes.data,
					xp: xRes.data,
					streak: sRes.data,
					scores: scRes.data || [],
					dsaLogs: dRes.data || [],
					achs: aRes.data || [],
					missions: mRes.data || [],
					resume: resumeVersions[0] || null,
					resumeVersions,
					activityLogs: alRes.data || [],
					loading: false
				});
			}
		}
		load();
		return () => {
			alive = false;
		};
	}, [user]);
	return data;
}
function Nav() {
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => scrollY.on("change", (v) => setScrolled(v > 24)), [scrollY]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.nav, {
		initial: {
			y: -30,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			duration: .6,
			ease: "easeOut"
		},
		className: `fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mx-auto max-w-7xl px-6 transition-all ${scrolled ? "" : ""}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center justify-between rounded-full px-5 py-2.5 transition-all ${scrolled ? "glass-strong" : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-8 w-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-lg bg-aurora animate-float" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-[3px] rounded-md bg-background grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-aurora" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg font-semibold tracking-tight",
							children: "SyncRole"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:flex items-center gap-8 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#journey",
								className: "hover:text-foreground transition",
								children: "Journey"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#twin",
								className: "hover:text-foreground transition",
								children: "Career Twin"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#ai-center",
								className: "hover:text-foreground transition",
								children: "AI Center"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#target-company",
								className: "hover:text-foreground transition",
								children: "Target Company"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#progress",
								className: "hover:text-foreground transition",
								children: "Progress"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#success",
								className: "hover:text-foreground transition",
								children: "Success"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GetStartedCTA, { className: "!px-5 !py-2 !text-xs" })
				]
			})
		})
	});
}
function CursorSpotlight() {
	const x = useMotionValue(-200);
	const y = useMotionValue(-200);
	(0, import_react.useEffect)(() => {
		const move = (e) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};
		window.addEventListener("mousemove", move);
		return () => window.removeEventListener("mousemove", move);
	}, [x, y]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "pointer-events-none fixed -inset-px z-[60] hidden md:block",
		style: { background: useTransform([x, y], ([cx, cy]) => `radial-gradient(600px circle at ${cx}px ${cy}px, oklch(0.72 0.22 295 / 0.08), transparent 40%)`) }
	});
}
function Landing() {
	const { user } = useAuth();
	const homeData = useHomeData(user);
	if (user && homeData.loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background grid place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("link", {
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
				rel: "stylesheet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CursorSpotlight, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {
				data: homeData,
				isAuthed: !!user
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerJourneyTimeline, { data: homeData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AICareerTwinSection, { data: homeData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecruiterToggleSection, { data: homeData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIIntelligenceCenter, { data: homeData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DreamCompanySection, { data: homeData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerProgressFeed, { data: homeData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerTransformationsSection, { data: homeData }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncFooter, {})
		]
	});
}
//#endregion
export { Landing as component };
