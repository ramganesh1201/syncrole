import { o as __toESM } from "../_runtime.mjs";
import { l as require_react_dom, u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { n as useSyncPilot, t as SyncPilotProvider } from "./useSyncPilot-MSH2spMY.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { N as Lock, O as MessageSquare, P as LoaderCircle, S as Send, X as ExternalLink, ht as Calendar, kt as ArrowLeft, n as X, nt as Clock, ot as CircleCheck, s as User, t as Zap, ut as ChevronRight, xt as Brain } from "../_libs/lucide-react.mjs";
import { A as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as useAuth, t as AuthProvider } from "./use-auth-DCSAk2El.mjs";
import { t as Route$19 } from "./profile-D-zdz1pL.mjs";
import { t as Route$20 } from "./route-IqPvF6wW.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CfJA445f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var styles_default = "/assets/styles-D477ABsd.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function SyncPilotButton({ onClick }) {
	const [hovered, setHovered] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-8 right-8 z-[9999] flex items-center justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: hovered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				x: 10,
				scale: .92
			},
			animate: {
				opacity: 1,
				x: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				x: 10,
				scale: .92
			},
			transition: { duration: .18 },
			className: "mr-4 glass-strong rounded-2xl px-4 py-2.5 border border-white/15 shadow-glow",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold text-white whitespace-nowrap",
				children: "SyncPilot"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] text-cyan-400 uppercase tracking-widest",
				children: "AI Career OS"
			})]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			onClick,
			onHoverStart: () => setHovered(true),
			onHoverEnd: () => setHovered(false),
			initial: {
				scale: 0,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 20,
				delay: .5
			},
			whileHover: { scale: 1.12 },
			whileTap: { scale: .93 },
			className: "relative h-16 w-16 rounded-full flex items-center justify-center animate-breathe",
			style: { isolation: "isolate" },
			"aria-label": "Open SyncPilot AI Career OS",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-[-6px] rounded-full opacity-60",
					style: {
						background: "conic-gradient(from 0deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295), oklch(0.85 0.20 330), oklch(0.75 0.2 200))",
						filter: "blur(4px)",
						animation: "particle-orbit 8s linear infinite"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-0 rounded-full",
					style: { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295) 50%, oklch(0.85 0.20 330))" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-[2px] rounded-full",
					style: { background: "linear-gradient(135deg, oklch(1 0 0 / 20%), oklch(1 0 0 / 0%) 60%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute inset-0 rounded-full",
					style: {
						top: "50%",
						left: "50%"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "particle particle-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "particle particle-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "particle particle-3" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative z-10 flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						width: "28",
						height: "28",
						viewBox: "0 0 28 28",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "14",
								cy: "14",
								r: "3.5",
								fill: "white",
								opacity: "0.95"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "14",
								cy: "5",
								r: "2",
								fill: "white",
								opacity: "0.8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "14",
								cy: "23",
								r: "2",
								fill: "white",
								opacity: "0.8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "5",
								cy: "14",
								r: "2",
								fill: "white",
								opacity: "0.8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "23",
								cy: "14",
								r: "2",
								fill: "white",
								opacity: "0.8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "14",
								y1: "7",
								x2: "14",
								y2: "10.5",
								stroke: "white",
								strokeWidth: "1",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "14",
								y1: "17.5",
								x2: "14",
								y2: "21",
								stroke: "white",
								strokeWidth: "1",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "7",
								y1: "14",
								x2: "10.5",
								y2: "14",
								stroke: "white",
								strokeWidth: "1",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: "17.5",
								y1: "14",
								x2: "21",
								y2: "14",
								stroke: "white",
								strokeWidth: "1",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "8",
								cy: "8",
								r: "1.5",
								fill: "white",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "20",
								cy: "8",
								r: "1.5",
								fill: "white",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "8",
								cy: "20",
								r: "1.5",
								fill: "white",
								opacity: "0.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "20",
								cy: "20",
								r: "1.5",
								fill: "white",
								opacity: "0.5"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full pulse-ring" })
			]
		})]
	});
}
var BOOT_STAGES = [
	{
		text: "Initializing SyncPilot...",
		delay: 0,
		color: "text-cyan-400"
	},
	{
		text: "Loading Career Graph...",
		delay: 280,
		color: "text-white"
	},
	{
		text: "Analyzing DSA Progress...",
		delay: 520,
		color: "text-violet-400"
	},
	{
		text: "Scanning Resume...",
		delay: 760,
		color: "text-white"
	},
	{
		text: "Evaluating Placement Readiness...",
		delay: 980,
		color: "text-emerald-400"
	},
	{
		text: "Running Recruiter Simulation...",
		delay: 1200,
		color: "text-pink-400"
	},
	{
		text: "Career Twin Online ✦",
		delay: 1480,
		color: "text-cyan-300"
	}
];
function playBootSound() {
	try {
		const ctx = new (window.AudioContext || window.webkitAudioContext)();
		const beep = (freq, start, dur, vol = .06) => {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
			gain.gain.setValueAtTime(0, ctx.currentTime + start);
			gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + .02);
			gain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
			osc.start(ctx.currentTime + start);
			osc.stop(ctx.currentTime + start + dur + .05);
		};
		beep(880, 0, .08);
		beep(1100, .12, .08);
		beep(1320, .26, .12);
		beep(1760, .45, .18, .04);
	} catch {}
}
function SyncPilotLoading({ userName }) {
	const [visibleLines, setVisibleLines] = (0, import_react.useState)([]);
	const [scanProgress, setScanProgress] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		playBootSound();
		BOOT_STAGES.forEach((stage, i) => {
			setTimeout(() => {
				setVisibleLines((prev) => [...prev, i]);
			}, stage.delay);
		});
		const interval = setInterval(() => {
			setScanProgress((p) => {
				if (p >= 100) {
					clearInterval(interval);
					return 100;
				}
				return p + 2;
			});
		}, 32);
		setTimeout(() => setDone(true), 1800);
		return () => clearInterval(interval);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full flex flex-col items-center justify-center overflow-hidden bg-black/60 backdrop-blur-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan-line" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-10",
				style: {
					backgroundImage: "linear-gradient(oklch(0.75 0.2 200 / 30%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.2 200 / 30%) 1px, transparent 1px)",
					backgroundSize: "28px 28px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { rotate: 360 },
						transition: {
							repeat: Infinity,
							duration: 3,
							ease: "linear"
						},
						className: "h-24 w-24 rounded-full",
						style: { background: "conic-gradient(from 0deg, transparent 60%, oklch(0.75 0.2 200), oklch(0.72 0.22 295), transparent 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { rotate: -360 },
						transition: {
							repeat: Infinity,
							duration: 5,
							ease: "linear"
						},
						className: "absolute inset-3 rounded-full",
						style: { background: "conic-gradient(from 180deg, transparent 60%, oklch(0.85 0.20 330), oklch(0.72 0.22 295), transparent 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-6 rounded-full",
						style: {
							background: "radial-gradient(circle, oklch(0.75 0.2 200 / 80%), oklch(0.72 0.22 295 / 60%))",
							boxShadow: "0 0 30px oklch(0.75 0.2 200 / 60%)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-3 w-3 rounded-full bg-white",
							style: { boxShadow: "0 0 12px white" }
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[11px] space-y-1.5 w-72 mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: BOOT_STAGES.map((stage, i) => visibleLines.includes(i) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -12
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: {
						duration: .25,
						ease: "easeOut"
					},
					className: `flex items-center gap-2 ${stage.color}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white/30",
							children: ">"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stage.text }),
						i === visibleLines.length - 1 && !done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "typing-cursor" })
					]
				}, i) : null) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-72 h-0.5 rounded-full bg-white/10 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full rounded-full",
					style: {
						background: "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))",
						width: `${scanProgress}%`
					},
					transition: { duration: .1 }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: { delay: .3 },
				className: "mt-6 text-[10px] uppercase tracking-[0.3em] text-white/30",
				children: userName ? `Welcome back, ${userName.split(" ")[0]}` : "SyncPilot — AI Career OS"
			})
		]
	});
}
var DEMO_QUICK_PROMPTS = [
	"Analyze my career path",
	"Can I get into Google?",
	"Create a 6 month roadmap",
	"Review my resume",
	"Improve placement score"
];
function MessageBubble({ role, content }) {
	const isUser = role === "user";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 8,
			scale: .97
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		transition: { duration: .22 },
		className: `flex gap-2 ${isUser ? "justify-end" : "justify-start"}`,
		children: [
			!isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center",
				style: { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-3.5 w-3.5 text-white" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${isUser ? "text-white rounded-tr-sm" : "glass rounded-tl-sm text-foreground"}`,
				style: isUser ? { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" } : {},
				children: content.split("\n").map((line, i) => {
					if (line.startsWith("**") && line.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: line.slice(2, -2)
					}, i);
					if (line.startsWith("# ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold text-cyan-400 mt-1",
						children: line.slice(2)
					}, i);
					if (line.startsWith("- ") || line.startsWith("• ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pl-2 before:content-['•'] before:mr-1.5 before:text-cyan-400",
						children: line.slice(2)
					}, i);
					if (line === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}, i);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: line }, i);
				})
			}),
			isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" })
			})
		]
	});
}
function GuestDemoMode({ onClose }) {
	const [input, setInput] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		content: "Hi! I'm SyncPilot. Welcome to the **SyncPilot Demo**.\n\nI can show you how I analyze resumes, build roadmaps, and predict placement readiness for students.\n\nAsk me a question or try a quick prompt below. (3 free demo messages available)"
	}]);
	const [demoCount, setDemoCount] = (0, import_react.useState)(0);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	const nav = useNavigate();
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const handleSend = (text) => {
		if (!text.trim() || locked) return;
		const count = demoCount + 1;
		setDemoCount(count);
		setMessages((prev) => [...prev, {
			role: "user",
			content: text
		}]);
		setInput("");
		setTimeout(() => {
			if (count > 3) setLocked(true);
			else {
				let response = "";
				const lower = text.toLowerCase();
				if (lower.includes("sde-1") || lower.includes("sde 1") || lower.includes("how do i become")) response = "To become an SDE-1:\n\n• Build DSA foundations\n• Create real projects\n• Improve resume quality\n• Practice interviews\n\nFor personalized guidance based on your resume, GitHub, DSA progress and placement score, sign in to SyncRole.";
				else if (lower.includes("resume")) response = "I use AI to scan resumes line-by-line against actual ATS systems and job descriptions. I look for action verbs, metric-driven bullet points, and correct formatting.\n\nIf you sign in and upload yours, I'll give you a detailed score and step-by-step improvement plan.";
				else if (lower.includes("google") || lower.includes("faang")) response = "Companies like Google expect strong problem-solving skills (DSA) and system design knowledge. Their ideal candidate typically has an ATS score >85 and consistent GitHub activity.\n\nI can analyze your specific profile and tell you exactly how far you are from their bar. Sign in to find out.";
				else if (lower.includes("roadmap")) response = "I can generate personalized study roadmaps that adapt daily based on your progress. They cover DSA, system design, and core CS fundamentals.\n\nTo create your custom 6-month roadmap, please sign in.";
				else response = "This is a demo mode of SyncPilot. \n\nIn the full version, I use your actual data (Resume, GitHub, Interview scores, DSA logs) to provide hyper-personalized career guidance.\n\nTry asking: 'How do I become SDE-1?' or sign in to unlock my full intelligence.";
				setMessages((prev) => [...prev, {
					role: "assistant",
					content: response
				}]);
				if (count === 3) setTimeout(() => setLocked(true), 1500);
			}
		}, 600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-background/50 relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-shrink-0 h-[68px] flex items-center justify-between px-5 border-b border-white/5 bg-black/20 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-9 w-9 rounded-xl flex items-center justify-center",
						style: {
							background: "linear-gradient(135deg, oklch(0.75 0.2 200 / 20%), oklch(0.72 0.22 295 / 20%))",
							border: "1px solid oklch(0.72 0.22 295 / 30%)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-5 w-5 text-aurora" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display font-semibold tracking-wide text-sm",
							children: "SYNCPILOT DEMO"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "glass rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest text-amber-300 border border-amber-500/30 bg-amber-500/10",
							children: "Guest"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5",
						children: "Explore the AI Career Operating System"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "h-8 w-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4",
				children: [
					messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
						role: m.role,
						content: m.content
					}, i)),
					!locked && messages.length < 5 && demoCount < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-3 px-1",
							children: "Demo Quick Prompts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: DEMO_QUICK_PROMPTS.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleSend(q),
								className: "glass rounded-xl px-3.5 py-2 text-[12px] text-left hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-foreground",
									children: q
								})
							}, i))
						})]
					}),
					locked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "mt-6 glass-strong rounded-2xl p-6 border border-white/10 text-center relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-aurora/10 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-full glass mx-auto flex items-center justify-center mb-4 border border-white/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-aurora" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold mb-2",
									children: "Unlock Full SyncPilot Intelligence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground mb-4",
									children: "You've reached the end of the demo. Sign in to access your personalized AI career twin."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left space-y-2 mb-6 text-sm ml-4 inline-block",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-aurora" }), " Career Twin"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-[oklch(0.75_0.2_200)]" }), " Recruiter Mode"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-[oklch(0.85_0.18_70)]" }), " Interview Chamber"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-cyan-400" }), " Resume & GitHub Analysis"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1 rounded-full bg-amber-400" }), " Placement Prediction"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										onClose();
										nav({ to: "/auth" });
									},
									className: "w-full relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-xl bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative z-10 flex items-center gap-2",
										children: ["Sign In ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-shrink-0 p-4 border-t border-white/5 bg-black/20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-end gap-2 bg-black/40 border border-white/10 rounded-2xl p-2 pl-4 focus-within:border-white/30 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSend(input);
							}
						},
						placeholder: locked ? "Demo limit reached" : "Ask SyncPilot...",
						disabled: locked,
						className: "w-full max-h-32 bg-transparent text-[13px] outline-none resize-none py-1.5 custom-scrollbar",
						rows: 1,
						style: { minHeight: "32px" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => handleSend(input),
						disabled: !input.trim() || locked,
						className: "flex-shrink-0 h-8 w-8 rounded-xl flex items-center justify-center transition-colors\n              disabled:opacity-40 disabled:cursor-not-allowed text-white\n              bg-aurora hover:opacity-90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mt-2 px-1 text-[10px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3 opacity-60" }),
							" ",
							3 - Math.min(3, demoCount),
							" demo messages left"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "opacity-60",
						children: "SyncPilot Demo"
					})]
				})]
			})
		]
	});
}
var CareerTwinMode = (0, import_react.lazy)(() => import("./CareerTwinMode-Agh25t4t.mjs").then((m) => ({ default: m.CareerTwinMode })));
var RecruiterMode = (0, import_react.lazy)(() => import("./RecruiterMode-DitqS3dG.mjs").then((m) => ({ default: m.RecruiterMode })));
var InterviewMode = (0, import_react.lazy)(() => import("./InterviewMode-DYL7hi1q.mjs").then((m) => ({ default: m.InterviewMode })));
var PANEL_DIMS = {
	career_twin: {
		width: "470px",
		height: "min(720px, calc(100vh - 120px))",
		bottom: "104px",
		right: "2rem"
	},
	recruiter: {
		width: "min(72vw, 900px)",
		height: "min(700px, calc(100vh - 120px))",
		bottom: "104px",
		right: "2rem"
	},
	interview: {
		width: "min(90vw, 1100px)",
		height: "min(800px, calc(100vh - 40px))",
		bottom: "50%",
		right: "50%"
	}
};
function LoadingFallback() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-cyan-400" })
	});
}
function SyncPilotLauncherInner() {
	const [panelState, setPanelState] = (0, import_react.useState)("closed");
	const { mode, switchMode, userData, loadConversations, loadConversation, conversationId } = useSyncPilot();
	const { user } = useAuth();
	const handleOpen = () => {
		setPanelState("booting");
		setTimeout(async () => {
			setPanelState("open");
			const convs = await loadConversations();
			if (convs && convs.length > 0 && !conversationId) loadConversation(convs[0].id);
		}, 1900);
	};
	const handleClose = () => {
		setPanelState("closed");
	};
	const handleSwitchMode = (newMode) => {
		switchMode(newMode);
		if (newMode === "interview") {
			setPanelState("booting");
			setTimeout(() => setPanelState("open"), 800);
		}
	};
	(0, import_react.useEffect)(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape" && panelState === "open") handleClose();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [panelState]);
	const dims = PANEL_DIMS[mode];
	const isInterview = mode === "interview";
	const panelContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: panelState !== "closed" && !isInterview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[9990] bg-transparent",
		onClick: handleClose
	}, "backdrop"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 40,
			scale: .94
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 40,
			scale: .94
		},
		transition: {
			type: "spring",
			stiffness: 300,
			damping: 28
		},
		className: "fixed z-[9999] glass-strong rounded-3xl overflow-hidden border border-white/12 shadow-2xl",
		style: {
			width: dims.width,
			height: dims.height,
			bottom: dims.bottom,
			right: dims.right,
			boxShadow: mode === "recruiter" ? "0 0 80px -20px oklch(0.72 0.22 295 / 50%), 0 40px 100px -20px black" : "0 0 60px -15px oklch(0.75 0.2 200 / 40%), 0 30px 80px -20px black"
		},
		children: panelState === "booting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncPilotLoading, { userName: userData?.profile?.full_name ?? void 0 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingFallback, {}),
			children: !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestDemoMode, { onClose: handleClose }) : (() => {
				switch (mode) {
					case "career_twin": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CareerTwinMode, {
						onClose: handleClose,
						onSwitchMode: handleSwitchMode
					});
					case "recruiter": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecruiterMode, {
						onClose: handleClose,
						onSwitchMode: handleSwitchMode
					});
					default: return null;
				}
			})()
		})
	}, "panel")] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: panelState !== "closed" && isInterview && user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: .5 },
		className: "fixed inset-0 w-[100vw] h-[100vh] z-[99999] bg-black/90 backdrop-blur-md overflow-hidden flex flex-col",
		style: {
			position: "fixed",
			inset: 0,
			width: "100vw",
			height: "100vh",
			zIndex: 99999
		},
		children: panelState === "booting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncPilotLoading, { userName: userData?.profile?.full_name ?? void 0 })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingFallback, {}),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterviewMode, {
				onClose: handleClose,
				onSwitchMode: handleSwitchMode
			})
		})
	}, "interview-fullscreen") })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: panelState === "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed z-[9998] bottom-[2rem] right-[2rem]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncPilotButton, { onClick: handleOpen })
	}, "fab") }), typeof document !== "undefined" && (0, import_react_dom.createPortal)(panelContent, document.body)] });
}
function SyncPilotLauncher() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncPilotProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncPilotLauncherInner, {}) });
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "top-right",
				richColors: true,
				closeButton: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncPilotLauncher, {})
		] })
	});
}
var $$splitComponentImporter$16 = () => import("./career-transformations-D2WWbIDV.mjs");
var Route$17 = createFileRoute("/career-transformations")({
	head: () => ({ meta: [
		{ title: "Career Transformations — Real Stories. Real Offers. | SyncRole" },
		{
			name: "description",
			content: "Read real career transformation stories from students who used SyncRole to land internships and dream jobs. Verified by real activity data."
		},
		{
			property: "og:title",
			content: "Career Transformations | SyncRole"
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./auth-Op6Dum00.mjs");
var Route$16 = createFileRoute("/auth")({
	ssr: false,
	beforeLoad: async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session) throw redirect({ to: "/dashboard" });
	},
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Sign in — SyncRole" }] })
});
var $$splitComponentImporter$14 = () => import("./routes-D2BOsVc5.mjs");
(0, import_react.lazy)(() => import("./CareerSphere-CEpxDxLv.mjs"));
var Route$15 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "SyncRole — Stop Guessing. Start Getting Hired." },
		{
			name: "description",
			content: "AI-powered career intelligence platform. Analyze your resume, GitHub, and skills. Get a personalized roadmap to internships and dream jobs."
		},
		{
			property: "og:title",
			content: "SyncRole — The Career Operating System"
		},
		{
			property: "og:description",
			content: "AI that analyzes your skills, projects, resume, and interview readiness — and builds your path to getting hired."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./update-password-DDCvS3z4.mjs");
var Route$14 = createFileRoute("/_authenticated/update-password")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./settings-CtY2L5A-.mjs");
var Route$13 = createFileRoute("/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./resume-intelligence-Bzcsxvem.mjs");
var Route$12 = createFileRoute("/_authenticated/resume-intelligence")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "Resume Intelligence — SyncRole" }] })
});
var $$splitComponentImporter$10 = () => import("./onboarding-CLocEfj6.mjs");
var Route$11 = createFileRoute("/_authenticated/onboarding")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "Get started — SyncRole" }] })
});
var $$splitComponentImporter$9 = () => import("./help-BJ4hDsHK.mjs");
var Route$10 = createFileRoute("/_authenticated/help")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./dsa-roadmap-BXsJhHm5.mjs");
var Route$9 = createFileRoute("/_authenticated/dsa-roadmap")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	head: () => ({ meta: [{ title: "DSA Roadmap — SyncRole" }] })
});
var $$splitComponentImporter$7 = () => import("./dsa-problems-C4enWJ_r.mjs");
var Route$8 = createFileRoute("/_authenticated/dsa-problems")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Problem Bank — SyncRole" }] }),
	validateSearch: (search) => {
		const query = search;
		return {
			topic: query.topic ?? void 0,
			difficulty: query.difficulty ?? void 0
		};
	}
});
var $$splitComponentImporter$6 = () => import("./dsa-mentor-gWQYpx0h.mjs");
var Route$7 = createFileRoute("/_authenticated/dsa-mentor")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "AI Coding Coach — SyncRole" }] })
});
var Route$6 = createFileRoute("/_authenticated/dsa-daily")({
	component: DSADailyPage,
	head: () => ({ meta: [{ title: "Daily Challenges — SyncRole" }] })
});
async function getOrCreateTodayChallenge(params) {
	const { todayStr } = params;
	const challengeRes = await supabase.from("dsa_daily_challenges").select("id, challenge_date, problem_id, xp_reward").eq("challenge_date", todayStr).maybeSingle();
	if (!challengeRes.error && challengeRes.data) {
		const challenge = challengeRes.data;
		const problemRes = await supabase.from("dsa_problems").select("id, title, difficulty, topic_id, leetcode_url, companies, xp_reward").eq("id", challenge.problem_id).single();
		if (problemRes.error || !problemRes.data) return null;
		const topicRes = await supabase.from("dsa_topics").select("name").eq("id", problemRes.data.topic_id).single();
		const problem = {
			...problemRes.data,
			topic_name: topicRes.data?.name ?? "Unknown"
		};
		return {
			...challenge,
			problem
		};
	}
	const topicRes = await supabase.from("dsa_topics").select("id, name").limit(1).single();
	if (topicRes.error || !topicRes.data) return null;
	const problemRes = await supabase.from("dsa_problems").select("id, title, difficulty, topic_id, leetcode_url, companies, xp_reward").eq("topic_id", topicRes.data.id).limit(1).single();
	if (problemRes.error || !problemRes.data) return null;
	const problem = {
		...problemRes.data,
		topic_name: topicRes.data.name ?? "Unknown"
	};
	const insertRes = await supabase.from("dsa_daily_challenges").insert({
		challenge_date: todayStr,
		problem_id: problem.id,
		xp_reward: problem.xp_reward ?? 50
	}).select("id, challenge_date, problem_id, xp_reward").single();
	if (insertRes.error || !insertRes.data) return null;
	return {
		...insertRes.data,
		problem
	};
}
function getStatusFromRow(p) {
	if (!p) return "not_started";
	if (p.status) return p.status;
	if (p.claimed) return "claimed";
	if (p.completed) return "completed";
	if (p.started_at) return "in_progress";
	return "not_started";
}
function isUuid(id) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}
function estimateTime(difficulty) {
	if (difficulty === "easy") return "15 min";
	if (difficulty === "medium") return "25 min";
	if (difficulty === "hard") return "45 min";
	return "30 min";
}
function recruiterSignalForDifficulty(difficulty) {
	if (difficulty === "easy") return 1;
	if (difficulty === "medium") return 2;
	if (difficulty === "hard") return 3;
	return 1;
}
function recruiterConsistencyCopy(status) {
	if (status === "claimed") return {
		consistency: 84,
		growth: "Trending Up"
	};
	if (status === "completed") return {
		consistency: 78,
		growth: "Improving"
	};
	if (status === "in_progress") return {
		consistency: 62,
		growth: "Warming Up"
	};
	return {
		consistency: 0,
		growth: "Start to unlock signals"
	};
}
function DSADailyPage() {
	const [today, setToday] = (0, import_react.useState)(null);
	const [progress, setProgress] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const todayStr = (0, import_react.useMemo)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), []);
	async function load() {
		setLoading(true);
		try {
			const { data: auth } = await supabase.auth.getUser();
			if (!auth.user) {
				setToday(null);
				setProgress(null);
				return;
			}
			const challenge = await getOrCreateTodayChallenge({ todayStr });
			if (!challenge?.id || !challenge.problem) {
				setToday(null);
				setProgress(null);
				return;
			}
			if (!isUuid(challenge.id)) {
				setToday(null);
				setProgress(null);
				return;
			}
			const row = (await supabase.from("user_daily_challenge_progress").select("id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status").eq("user_id", auth.user.id).eq("challenge_id", challenge.id).maybeSingle()).data;
			console.log("challenge", challenge);
			console.log("problem", challenge.problem);
			console.log("progress", row);
			setToday(challenge);
			setProgress(row);
		} catch (err) {
			console.error("DSADailyPage.load error", err);
			toast.error("Failed to load today challenge.");
			setToday(null);
			setProgress(null);
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [todayStr]);
	const status = getStatusFromRow(progress);
	async function openLeetCode() {
		if (!today?.problem?.leetcode_url) {
			toast.error("No external link available for this challenge.");
			return;
		}
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return;
		if (!progress) {
			setBusy(true);
			try {
				const nowIso = (/* @__PURE__ */ new Date()).toISOString();
				const insertRes = await supabase.from("user_daily_challenge_progress").upsert({
					user_id: auth.user.id,
					challenge_id: today.id,
					status: "in_progress",
					started_at: nowIso,
					completed: false,
					xp_earned: 0,
					claimed: false,
					claimed_at: null,
					completed_at: null
				}, { onConflict: "user_id,challenge_id" }).select("id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status").single();
				if (insertRes.error) throw insertRes.error;
				setProgress(insertRes.data);
				window.open(today.problem.leetcode_url, "_blank", "noopener,noreferrer");
			} catch (e) {
				console.error(e);
				toast.error("Failed to start daily challenge.");
			} finally {
				setBusy(false);
			}
			return;
		}
		window.open(today.problem.leetcode_url, "_blank", "noopener,noreferrer");
	}
	async function markCompleted() {
		if (!today?.id) return;
		if (status === "claimed") return;
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return;
		setBusy(true);
		try {
			const nowIso = (/* @__PURE__ */ new Date()).toISOString();
			const upsertRes = await supabase.from("user_daily_challenge_progress").upsert({
				user_id: auth.user.id,
				challenge_id: today.id,
				status: "completed",
				completed: true,
				completed_at: nowIso,
				claimed: false,
				claimed_at: null,
				started_at: progress?.started_at ?? nowIso
			}, { onConflict: "user_id,challenge_id" }).select("id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status").single();
			if (upsertRes.error) throw upsertRes.error;
			setProgress(upsertRes.data);
			toast.success("Marked as solved. Claim reward when ready.");
		} catch (e) {
			console.error(e);
			toast.error("Failed to mark completion.");
		} finally {
			setBusy(false);
		}
	}
	async function claimReward() {
		if (!today?.id || !today.problem) return;
		if (status !== "completed") return;
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return;
		setBusy(true);
		try {
			if ((await supabase.from("user_daily_challenge_progress").select("id,claimed").eq("user_id", auth.user.id).eq("challenge_id", today.id).maybeSingle()).data?.claimed) {
				toast.success("Reward already claimed.");
				await load();
				return;
			}
			const nowIso = (/* @__PURE__ */ new Date()).toISOString();
			const upsertRes = await supabase.from("user_daily_challenge_progress").upsert({
				user_id: auth.user.id,
				challenge_id: today.id,
				status: "claimed",
				claimed: true,
				claimed_at: nowIso,
				completed: true,
				completed_at: progress?.completed_at ?? nowIso,
				xp_earned: today.xp_reward
			}, { onConflict: "user_id,challenge_id" }).select("id,user_id,challenge_id,completed,completed_at,xp_earned,claimed,claimed_at,created_at,started_at,status").single();
			if (upsertRes.error) throw upsertRes.error;
			const awardRes = await supabase.rpc("award_xp", {
				_user: auth.user.id,
				_type: "daily_challenge",
				_xp: today.xp_reward,
				_meta: { challenge_id: today.id }
			});
			if (awardRes.error) throw awardRes.error;
			const recomputeRes = await supabase.rpc("recompute_placement", { _user: auth.user.id });
			if (recomputeRes.error) throw recomputeRes.error;
			const notifRes = await supabase.from("notifications").insert({
				user_id: auth.user.id,
				title: "Daily Challenge Claimed 🏆",
				body: `+${today.xp_reward} XP for ${today.problem.difficulty} ${today.problem.topic_name} challenge`,
				type: "achievement"
			});
			if (notifRes.error) throw notifRes.error;
			toast.success("Reward claimed! Great work.");
			await load();
		} catch (e) {
			console.error(e);
			toast.error("Failed to claim reward.");
		} finally {
			setBusy(false);
		}
	}
	const recruiterImpact = recruiterConsistencyCopy(status);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid place-items-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" })
	});
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
				children: "Today's Challenge"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-2",
				children: "Complete the daily challenge to earn bonus XP and maintain your streak."
			})] }),
			today?.problem ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				className: "relative glass-strong rounded-3xl p-8 border border-aurora/20 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-aurora/5 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Today's Challenge"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-bold",
									children: today.problem.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground mt-2",
									children: [
										"Topic: ",
										today.problem.topic_name,
										" · Difficulty: ",
										today.problem.difficulty
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-display text-4xl font-bold text-aurora",
									children: ["+", today.xp_reward]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: "XP Reward"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Difficulty"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
										style: { background: today.problem.difficulty === "easy" ? "oklch(0.88 0.18 145 / 0.2)" : today.problem.difficulty === "medium" ? "oklch(0.85 0.18 70 / 0.2)" : "oklch(0.72 0.22 330 / 0.2)" },
										children: [
											today.problem.difficulty === "easy" ? "🟢" : today.problem.difficulty === "medium" ? "🟡" : "🔴",
											" ",
											today.problem.difficulty
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Estimated Time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 font-medium",
										children: estimateTime(today.problem.difficulty)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Recruiter Value"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 font-medium",
										children: ["Recruiter Signal +", recruiterSignalForDifficulty(today.problem.difficulty)]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Recruiter Signal Score"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 font-medium",
										children: ["+", recruiterSignalForDifficulty(today.problem.difficulty)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Consistency Score"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 font-medium",
										children: recruiterImpact.consistency ? `${recruiterImpact.consistency}%` : "—"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-2xl p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Technical Growth"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 font-medium",
										children: recruiterImpact.growth
									})]
								})
							]
						}),
						status === "not_started" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => void openLeetCode(),
							disabled: busy,
							className: "relative w-full rounded-2xl py-4 text-base font-semibold text-primary-foreground overflow-hidden transition disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-r from-aurora to-aurora/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative inline-flex items-center justify-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" }),
									" ",
									busy ? "Starting..." : "Solve Challenge"
								]
							})]
						}),
						status === "in_progress" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-strong rounded-2xl p-6 border border-aurora/20 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium",
									children: "In Progress"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: "Open the link, solve it, then confirm below."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => void openLeetCode(),
									disabled: busy,
									className: "inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs hover:bg-white/15 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }), " Open"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => void markCompleted(),
									disabled: busy,
									className: "rounded-2xl py-4 text-base font-semibold text-primary-foreground bg-green-500/20 border border-green-500/30 hover:bg-green-500/25 transition",
									children: "Yes, I Solved It"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toast.message("Come back when you’ve solved it."),
									disabled: busy,
									className: "rounded-2xl py-4 text-base font-semibold text-foreground bg-white/5 border border-white/10 hover:bg-white/10 transition",
									children: "Not Yet"
								})]
							})]
						}),
						status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-strong rounded-2xl p-6 border border-green-500/30 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: { scale: .98 },
									animate: { scale: 1 },
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-7 w-7 text-green-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-2xl font-bold",
										children: "Challenge Completed 🎉"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-muted-foreground",
										children: "Skills Demonstrated: Problem Solving · DSA Fundamentals · Algorithmic Thinking"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid md:grid-cols-3 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-white/5 p-4 border border-white/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs uppercase tracking-widest text-muted-foreground",
												children: "Recruiter Signals"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-2 text-sm text-foreground",
												children: "Consistency"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm text-foreground",
												children: "Discipline"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm text-foreground",
												children: "Technical Growth"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-white/5 p-4 border border-white/10 md:col-span-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs uppercase tracking-widest text-muted-foreground",
												children: "XP Available"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 font-display text-4xl font-bold text-aurora",
												children: [
													"+",
													today.xp_reward,
													" XP"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-1 text-sm text-muted-foreground",
												children: "AI Mentor update: your consistency improved through validated daily completion."
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => void claimReward(),
									disabled: busy,
									className: "relative w-full rounded-2xl py-4 text-base font-semibold text-primary-foreground overflow-hidden transition disabled:opacity-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-gradient-to-r from-aurora to-aurora/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative inline-flex items-center justify-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-5 w-5" }),
											" ",
											busy ? "Claiming..." : "Claim Reward"
										]
									})]
								})
							]
						}),
						status === "claimed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: { scale: .95 },
							animate: { scale: 1 },
							className: "rounded-2xl bg-green-500/10 border border-green-500/30 p-6 flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6 text-green-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium text-green-400",
								children: "Reward Claimed"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground",
								children: ["Claimed at ", new Date(progress?.claimed_at ?? "").toLocaleTimeString()]
							})] })]
						})
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-2xl p-8 text-center space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-12 w-12 text-muted-foreground mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium",
					children: "No Challenge Today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Check back tomorrow for a new daily challenge!"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display font-bold mb-4",
				children: "Past 7 Days"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 text-sm text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Challenge history will appear here once you complete more daily challenges." })
			})] })
		]
	});
}
var $$splitComponentImporter$5 = () => import("./dsa-companies-CYMy0kBI.mjs");
var Route$5 = createFileRoute("/_authenticated/dsa-companies")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Company Prep — SyncRole" }] })
});
var $$splitComponentImporter$4 = () => import("./career-identity-BPbtFTMz.mjs");
var Route$4 = createFileRoute("/_authenticated/career-identity")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./route-DJSrJ5NY.mjs");
var Route$3 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
/**
* Pure layout — no content of its own.
* Renders whichever sibling child matches the URL:
*   /dashboard       → dashboard/index.tsx  (Dashboard Home)
*   /dashboard/dsa   → dashboard/dsa.tsx    (DSA Command Center)
*
* This ensures the two pages are true siblings and never co-render.
*/
var $$splitComponentImporter$2 = () => import("./dashboard-CGlLXBwD.mjs");
var Route$2 = createFileRoute("/_authenticated/dashboard/")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Dashboard — SyncRole" }] })
});
var $$splitComponentImporter$1 = () => import("./dashboard.workspace-D4__GSIE.mjs");
var Route$1 = createFileRoute("/_authenticated/dashboard/workspace")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./dsa-h6HCEmlR.mjs");
var Route = createFileRoute("/_authenticated/dashboard/dsa")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: () => ({ meta: [{ title: "DSA Command Center — SyncRole" }] })
});
var CareerTransformationsRoute = Route$17.update({
	id: "/career-transformations",
	path: "/career-transformations",
	getParentRoute: () => Route$18
});
var AuthRoute = Route$16.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$18
});
var AuthenticatedRouteRoute = Route$20.update({
	id: "/_authenticated",
	getParentRoute: () => Route$18
});
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AuthenticatedUpdatePasswordRoute = Route$14.update({
	id: "/update-password",
	path: "/update-password",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$13.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedResumeIntelligenceRoute = Route$12.update({
	id: "/resume-intelligence",
	path: "/resume-intelligence",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$19.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOnboardingRoute = Route$11.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedHelpRoute = Route$10.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDsaRoadmapRoute = Route$9.update({
	id: "/dsa-roadmap",
	path: "/dsa-roadmap",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDsaProblemsRoute = Route$8.update({
	id: "/dsa-problems",
	path: "/dsa-problems",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDsaMentorRoute = Route$7.update({
	id: "/dsa-mentor",
	path: "/dsa-mentor",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDsaDailyRoute = Route$6.update({
	id: "/dsa-daily",
	path: "/dsa-daily",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDsaCompaniesRoute = Route$5.update({
	id: "/dsa-companies",
	path: "/dsa-companies",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCareerIdentityRoute = Route$4.update({
	id: "/career-identity",
	path: "/career-identity",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRouteRoute = Route$3.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedDashboardRouteRoute
});
var AuthenticatedDashboardWorkspaceRoute = Route$1.update({
	id: "/workspace",
	path: "/workspace",
	getParentRoute: () => AuthenticatedDashboardRouteRoute
});
var AuthenticatedDashboardRouteRouteChildren = {
	AuthenticatedDashboardDsaRoute: Route.update({
		id: "/dsa",
		path: "/dsa",
		getParentRoute: () => AuthenticatedDashboardRouteRoute
	}),
	AuthenticatedDashboardWorkspaceRoute,
	AuthenticatedDashboardIndexRoute
};
var AuthenticatedRouteRouteChildren = {
	AuthenticatedDashboardRouteRoute: AuthenticatedDashboardRouteRoute._addFileChildren(AuthenticatedDashboardRouteRouteChildren),
	AuthenticatedCareerIdentityRoute,
	AuthenticatedDsaCompaniesRoute,
	AuthenticatedDsaDailyRoute,
	AuthenticatedDsaMentorRoute,
	AuthenticatedDsaProblemsRoute,
	AuthenticatedDsaRoadmapRoute,
	AuthenticatedHelpRoute,
	AuthenticatedOnboardingRoute,
	AuthenticatedProfileRoute,
	AuthenticatedResumeIntelligenceRoute,
	AuthenticatedSettingsRoute,
	AuthenticatedUpdatePasswordRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	CareerTransformationsRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
