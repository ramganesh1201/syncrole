import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { c as AnimatePresence, s as motion, t as useInView } from "../_libs/framer-motion.mjs";
import { C as Search, J as Filter, Ot as ArrowRight, Y as FileText, _ as Star, d as Trophy, g as Target, kt as ArrowLeft, o as Users, p as TrendingUp, t as Zap, tt as CodeXml, ut as ChevronRight, v as Sparkles } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAuth } from "./use-auth-DCSAk2El.mjs";
import { t as SyncFooter } from "./SyncFooter-CufUqpg5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/career-transformations-D2WWbIDV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEMO_STORIES = [
	{
		id: "demo-1",
		author_name: "Aarav S.",
		author_role: "SWE @ Razorpay",
		author_college: "BITS Pilani",
		before_syncrole: "I was applying to 50+ companies with the same generic resume and getting zero responses. Completely lost.",
		biggest_problems: "No feedback loop. No idea which skills mattered. Resume felt like a shot in the dark every time I sent it.",
		actions_taken: "Used SyncRole resume analyzer, built 2 real projects from the GitHub recommendations, completed 60 DSA problems in 45 days with the daily mission system.",
		current_results: "Landed SWE role at Razorpay — 3x my previous offer. Got 4 interview calls in the last 2 weeks alone.",
		advice: "Stop optimizing in a vacuum. Let the data tell you what recruiters actually care about. SyncRole made that crystal clear.",
		generated_story: null,
		xp_growth: 3200,
		dsa_growth: 60,
		readiness_growth: 38,
		resume_growth: 22,
		likes_count: 241,
		created_at: "2026-05-15T10:00:00Z"
	},
	{
		id: "demo-2",
		author_name: "Priya K.",
		author_role: "Intern @ Atlassian",
		author_college: "VIT Vellore",
		before_syncrole: "Fresher with a 7.8 CGPA but no internship experience. Was invisible to every recruiter I reached out to.",
		biggest_problems: "GitHub was empty. Resume had only coursework. No idea how to build real projects that would impress tech companies.",
		actions_taken: "Connected GitHub, built a full-stack project in 30 days guided by Career Twin, ran 5 mock interviews with SyncPilot until I felt genuinely confident.",
		current_results: "First internship offer from Atlassian in 45 days. Same company that rejected me 6 months before.",
		advice: "Your GitHub is your new resume. Ship real projects that solve real problems. SyncPilot will tell you exactly what to build.",
		generated_story: null,
		xp_growth: 2800,
		dsa_growth: 45,
		readiness_growth: 42,
		resume_growth: 18,
		likes_count: 187,
		created_at: "2026-05-20T10:00:00Z"
	},
	{
		id: "demo-3",
		author_name: "Rohit M.",
		author_role: "SDE-1 @ Flipkart",
		author_college: "NIT Trichy",
		before_syncrole: "Stuck at service companies for 2 years. Dream was a product company but it felt completely out of reach.",
		biggest_problems: "System design was a black box. DSA was inconsistent. Resume was mediocre despite having real work experience.",
		actions_taken: "Career Twin identified my exact DSA gap. Solved 100 problems in 90 days. Rebuilt resume from scratch using AI analysis. The readiness score finally cracked 80.",
		current_results: "SDE-1 offer from Flipkart. Turned down 2 other product company offers to join them.",
		advice: "Consistency beats brilliance. Show up every day. SyncRole keeps you accountable when motivation fades.",
		generated_story: null,
		xp_growth: 4100,
		dsa_growth: 100,
		readiness_growth: 51,
		resume_growth: 30,
		likes_count: 312,
		created_at: "2026-06-01T10:00:00Z"
	},
	{
		id: "demo-4",
		author_name: "Sneha T.",
		author_role: "Frontend @ Swiggy",
		author_college: "Manipal Institute",
		before_syncrole: "I had React skills but no idea how to communicate them to recruiters. My GitHub looked abandoned.",
		biggest_problems: "Couldn't explain my projects well. DSA was weak. Resume keywords didn't match JDs at all.",
		actions_taken: "GitHub analyzer showed me exactly what to build. Fixed resume keywords. Solved medium DSA daily for 60 days.",
		current_results: "5 interview calls in one week after profile update. Joined Swiggy frontend team within 2 months.",
		advice: "Recruiters can't hire what they can't find. Make your profile speak the right language.",
		generated_story: null,
		xp_growth: 2200,
		dsa_growth: 72,
		readiness_growth: 29,
		resume_growth: 35,
		likes_count: 156,
		created_at: "2026-06-10T10:00:00Z"
	},
	{
		id: "demo-5",
		author_name: "Karthik R.",
		author_role: "Backend @ Meesho",
		author_college: "Amrita University",
		before_syncrole: "Back-end developer with solid Node.js skills but my placement score was stuck at 42%.",
		biggest_problems: "Couldn't crack system design rounds. Resume buried my best achievements.",
		actions_taken: "Used SyncPilot Interview mode for 3 weeks. Rebuilt system design fundamentals. Resume AI gave me actionable fixes I'd never have figured out alone.",
		current_results: "Placement score went from 42% to 78% in 6 weeks. Meesho offer followed.",
		advice: "The score doesn't lie. If it's stuck, something specific is wrong. SyncRole pinpoints exactly what.",
		generated_story: null,
		xp_growth: 1900,
		dsa_growth: 38,
		readiness_growth: 36,
		resume_growth: 28,
		likes_count: 98,
		created_at: "2026-06-15T10:00:00Z"
	},
	{
		id: "demo-6",
		author_name: "Ananya M.",
		author_role: "Data @ PhonePe",
		author_college: "IIT Hyderabad",
		before_syncrole: "Strong academic background but zero industry exposure. Felt like an imposter during every interview.",
		biggest_problems: "No projects, no GitHub activity, no system to track my preparation progress.",
		actions_taken: "Career Twin built a 90-day plan. Followed it strictly. Daily missions kept me on track even when tired.",
		current_results: "PhonePe Data Engineering role. Doubled my expected salary by being better prepared than everyone else.",
		advice: "Having a plan isn't enough. You need a system that adapts as you grow. SyncRole is that system.",
		generated_story: null,
		xp_growth: 5200,
		dsa_growth: 85,
		readiness_growth: 55,
		resume_growth: 40,
		likes_count: 274,
		created_at: "2026-06-18T10:00:00Z"
	}
];
function GlassCard({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `glass-strong rounded-3xl border border-white/10 ${className}`,
		children
	});
}
function GrowthBadge({ icon: Icon, label, value, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 glass rounded-full px-3 py-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { color },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs font-display font-semibold",
				style: { color },
				children: ["+", value]
			})
		]
	});
}
function StoryCard({ story, index }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		amount: .2
	});
	const [expanded, setExpanded] = (0, import_react.useState)(false);
	const initials = (story.author_name || "?").slice(0, 2).toUpperCase();
	const timeAgo = (() => {
		const diff = Date.now() - new Date(story.created_at).getTime();
		const d = Math.floor(diff / 864e5);
		if (d < 7) return `${d}d ago`;
		if (d < 30) return `${Math.floor(d / 7)}w ago`;
		return `${Math.floor(d / 30)}mo ago`;
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
			delay: index % 3 * .1
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassCard, {
			className: "p-7 h-full flex flex-col hover:border-white/20 transition-all duration-300 group",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 rounded-full bg-aurora grid place-items-center font-display font-bold text-sm shrink-0",
							children: initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: story.author_name || "Anonymous"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: story.author_role
							}),
							story.author_college && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground/60",
								children: story.author_college
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-muted-foreground",
							children: timeAgo
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1 mt-1 justify-end",
							children: [...Array(5)].map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-[oklch(0.85_0.18_70)] text-[oklch(0.85_0.18_70)]" }, k))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2 mb-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.88_0.18_145)]/30 bg-[oklch(0.88_0.18_145)]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[oklch(0.88_0.18_145)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-3 w-3" }), " Verified by SyncRole Activity"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 mb-5",
					children: [
						story.xp_growth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthBadge, {
							icon: Zap,
							label: "XP",
							value: story.xp_growth.toLocaleString(),
							color: "oklch(0.72 0.22 295)"
						}),
						story.dsa_growth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthBadge, {
							icon: CodeXml,
							label: "DSA",
							value: `${story.dsa_growth} problems`,
							color: "oklch(0.85 0.18 70)"
						}),
						story.readiness_growth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthBadge, {
							icon: Target,
							label: "Readiness",
							value: `${story.readiness_growth}%`,
							color: "oklch(0.88 0.18 145)"
						}),
						story.resume_growth > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrowthBadge, {
							icon: FileText,
							label: "Resume",
							value: `+${story.resume_growth}pts`,
							color: "oklch(0.75 0.20 200)"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground leading-relaxed",
						children: [
							"\"",
							story.current_results,
							"\""
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: expanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							height: 0
						},
						animate: {
							opacity: 1,
							height: "auto"
						},
						exit: {
							opacity: 0,
							height: 0
						},
						className: "overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3 border-t border-white/10 pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1",
									children: "Before SyncRole"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: story.before_syncrole
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1",
									children: "What I Did"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: story.actions_taken
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1",
									children: "Advice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-[oklch(0.88_0.18_145)]",
									children: [
										"\"",
										story.advice,
										"\""
									]
								})] })
							]
						})
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setExpanded(!expanded),
					className: "mt-4 text-xs text-muted-foreground hover:text-foreground transition flex items-center gap-1 self-start",
					children: [expanded ? "Show less" : "Read full story", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}` })]
				})
			]
		})
	});
}
function CareerTransformationsPage() {
	const { user } = useAuth();
	const [stories, setStories] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let alive = true;
		async function load() {
			const { data, error } = await supabase.from("career_transformations").select("*").eq("is_published", true).order("created_at", { ascending: false }).limit(50).then(({ data: rows }) => {
				if (alive) {
					if (rows && rows.length > 0) setStories(rows);
					else setStories(DEMO_STORIES);
					setLoading(false);
				}
			});
		}
		load();
		return () => {
			alive = false;
		};
	}, []);
	const filtered = stories.filter((s) => {
		if (!search) return true;
		const q = search.toLowerCase();
		return (s.author_name || "").toLowerCase().includes(q) || (s.author_role || "").toLowerCase().includes(q) || s.current_results.toLowerCase().includes(q);
	}).sort((a, b) => {
		if (filter === "highest_growth") return b.readiness_growth - a.readiness_growth;
		if (filter === "recent") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		return b.likes_count - a.likes_count;
	});
	const stats = {
		stories: stories.length,
		avgXp: Math.round(stories.reduce((s, x) => s + x.xp_growth, 0) / Math.max(stories.length, 1)),
		avgReadiness: Math.round(stories.reduce((s, x) => s + x.readiness_growth, 0) / Math.max(stories.length, 1))
	};
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-background via-background to-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: { background: "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.72 0.22 295 / 22%), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 20%, oklch(0.75 0.2 200 / 18%), transparent 60%)" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-white/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 h-14 flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Back to Home"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-7 w-7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-lg bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-[3px] rounded-md bg-background grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-aurora" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-base font-semibold",
								children: "SyncRole"
							})]
						}),
						!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "text-sm text-muted-foreground hover:text-foreground transition",
							children: "Sign in"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "text-sm text-muted-foreground hover:text-foreground transition",
							children: "Dashboard"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative pt-20 pb-16 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center",
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
							className: "inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs mb-8 border border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex h-2 w-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.88_0.18_145)] opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.88_0.18_145)]" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground tracking-wide",
								children: "Real Stories · Real Outcomes · Verified by Activity Data"
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
								delay: .15,
								duration: .8
							},
							className: "font-display text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-foreground",
								children: "Career"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-aurora",
								children: "Transformations."
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
							transition: { delay: .3 },
							className: "mx-auto mt-6 max-w-xl text-muted-foreground",
							children: "Students who used SyncRole to go from stuck to hired. Every story is verified against real platform activity data."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .5 },
							className: "mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto",
							children: [
								{
									label: "Stories",
									value: stats.stories.toString(),
									icon: Users
								},
								{
									label: "Avg XP Gained",
									value: `+${stats.avgXp.toLocaleString()}`,
									icon: Zap
								},
								{
									label: "Avg Readiness Gain",
									value: `+${stats.avgReadiness}%`,
									icon: TrendingUp
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-accent mx-auto mb-2" }),
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
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-6 pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Search stories…",
							className: "w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent/50"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass rounded-full p-1 inline-flex gap-1",
							children: [
								"all",
								"highest_growth",
								"recent"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setFilter(f),
								className: `px-4 py-1.5 rounded-full text-xs font-medium transition ${filter === f ? "bg-white/15 text-foreground" : "text-muted-foreground hover:text-foreground"}`,
								children: f === "all" ? "Most Popular" : f === "highest_growth" ? "Highest Growth" : "Most Recent"
							}, f))
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-strong rounded-3xl h-80 animate-pulse" }, i))
					}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center py-24 text-muted-foreground",
						children: "No stories match your search."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: filtered.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryCard, {
							story: s,
							index: i
						}, s.id))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-3xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative p-px rounded-3xl overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-[oklch(0.7_0.22_295)] via-[oklch(0.75_0.2_200)] to-[oklch(0.72_0.22_330)] opacity-50 blur-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative glass-strong rounded-[23px] p-10 text-center z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-10 w-10 text-aurora mx-auto mb-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-bold mb-3",
									children: "Share Your Transformation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground max-w-md mx-auto mb-8",
									children: "Inspire the next generation. If SyncRole helped you land an offer, your story belongs here."
								}),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									className: "inline-flex items-center gap-2 rounded-full bg-aurora px-7 py-3.5 text-sm font-semibold text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }), " Share Your Journey"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/auth",
									className: "inline-flex items-center gap-2 rounded-full bg-aurora px-7 py-3.5 text-sm font-semibold text-primary-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }), " Sign In to Share"]
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncFooter, {})
		]
	});
}
//#endregion
export { CareerTransformationsPage as component };
