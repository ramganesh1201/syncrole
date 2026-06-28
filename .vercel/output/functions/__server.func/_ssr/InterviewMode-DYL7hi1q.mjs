import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useSyncPilot } from "./useSyncPilot-MSH2spMY.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { B as History, P as LoaderCircle, S as Send, _ as Star, ct as CircleAlert, d as Trophy, h as Timer, n as X, ot as CircleCheck, s as User, xt as Brain } from "../_libs/lucide-react.mjs";
import { t as ConversationHistory } from "./ConversationHistory-CRjuK1Ok.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/InterviewMode-DYL7hi1q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COMPANY_PRESETS = [
	"Google",
	"Amazon",
	"Microsoft",
	"Meta",
	"Apple",
	"Flipkart",
	"Swiggy",
	"Uber",
	"Zomato"
];
var ROLE_PRESETS = [
	"SDE-1",
	"SDE-2",
	"Backend Engineer",
	"Frontend Engineer",
	"Full Stack",
	"ML Engineer",
	"Data Engineer"
];
function InterviewTimer({ running }) {
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const id = setInterval(() => setSeconds((s) => s + 1), 1e3);
		return () => clearInterval(id);
	}, [running]);
	const m = String(Math.floor(seconds / 60)).padStart(2, "0");
	const s = String(seconds % 60).padStart(2, "0");
	const isLong = seconds > 2700;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: `flex items-center gap-2 glass rounded-xl px-3 py-1.5 border ${isLong ? "border-orange-500/40 text-orange-400" : "border-white/10 text-white"}`,
		animate: isLong ? { borderColor: [
			"rgba(249,115,22,0.4)",
			"rgba(249,115,22,0.8)",
			"rgba(249,115,22,0.4)"
		] } : {},
		transition: {
			repeat: Infinity,
			duration: 1.5
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: `h-3.5 w-3.5 ${isLong ? "text-orange-400" : "text-cyan-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono text-sm font-bold",
			children: [
				m,
				":",
				s
			]
		})]
	});
}
function ScoreCard({ score, feedback, strengths, weaknesses }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			scale: .95
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		className: "glass rounded-3xl p-6 border border-white/10 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 right-0 p-8 opacity-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "h-32 w-32" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex flex-col items-center text-center mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-widest text-white/50 mb-3",
					children: "Final Verdict"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 100 100",
						className: "h-24 w-24 -rotate-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "50",
							cy: "50",
							r: "45",
							stroke: "oklch(1 0 0 / 10%)",
							strokeWidth: "8",
							fill: "none"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
							cx: "50",
							cy: "50",
							r: "45",
							stroke: "oklch(0.72 0.22 295)",
							strokeWidth: "8",
							fill: "none",
							strokeLinecap: "round",
							strokeDasharray: 2 * Math.PI * 45,
							initial: { strokeDashoffset: 2 * Math.PI * 45 },
							animate: { strokeDashoffset: 2 * Math.PI * 45 * (1 - score / 100) },
							transition: {
								duration: 1.5,
								ease: "easeOut",
								delay: .2
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center rotate-90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-2xl font-bold",
							style: { color: "oklch(0.72 0.22 295)" },
							children: score
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 mb-4 relative z-10",
				children: [strengths.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-3 border border-white/8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Strengths"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5",
						children: strengths.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-1.5 text-xs text-white/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 text-emerald-400 mt-0.5 flex-shrink-0" }), s]
						}, i))
					})]
				}), weaknesses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-3 border border-white/8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] uppercase tracking-widest text-red-400 mb-2 flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), " Areas to Improve"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5",
						children: weaknesses.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-1.5 text-xs text-white/70",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" }), w]
						}, i))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass rounded-xl p-4 text-xs text-white/60 leading-relaxed border border-white/5",
				children: feedback
			})
		]
	});
}
function InterviewMode({ onClose, onSwitchMode }) {
	const { messages, loading, sendMessage, loadUserData, switchMode, startNewConversation, conversations, loadConversation } = useSyncPilot();
	const [phase, setPhase] = (0, import_react.useState)("setup");
	const [company, setCompany] = (0, import_react.useState)("Google");
	const [role, setRole] = (0, import_react.useState)("SDE-1");
	const [input, setInput] = (0, import_react.useState)("");
	const [interviewStarted, setInterviewStarted] = (0, import_react.useState)(false);
	const [scoreData, setScoreData] = (0, import_react.useState)(null);
	const [showHistory, setShowHistory] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		loadUserData();
	}, []);
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	(0, import_react.useEffect)(() => {
		if (messages.length > 0 && phase === "setup") {
			setPhase("active");
			setInterviewStarted(true);
		}
	}, [messages, phase]);
	(0, import_react.useEffect)(() => {
		const lastMsg = messages[messages.length - 1];
		if (!lastMsg || lastMsg.role !== "assistant") return;
		const content = lastMsg.content.toLowerCase();
		if (content.includes("overall score") || content.includes("interview complete") || content.includes("final score")) {
			const scoreMatch = lastMsg.content.match(/(?:overall score|final score)[:\s]+(\d+)/i);
			const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
			if (score > 0) setTimeout(() => {
				setScoreData({
					score,
					feedback: lastMsg.content.slice(0, 300),
					strengths: extractList(lastMsg.content, "strength"),
					weaknesses: extractList(lastMsg.content, "weakness|improve|work on")
				});
				setPhase("scorecard");
			}, 1500);
		}
	}, [messages]);
	function extractList(text, keyword) {
		const lines = text.split("\n");
		const result = [];
		let capture = false;
		for (const line of lines) {
			if (new RegExp(keyword, "i").test(line)) {
				capture = true;
				continue;
			}
			if (capture && line.trim().match(/^[-•*\d]/)) result.push(line.replace(/^[-•*\d.)\s]+/, "").trim());
			else if (capture && line.trim() === "") break;
		}
		return result.slice(0, 4);
	}
	async function startInterview() {
		startNewConversation();
		setPhase("chamber-entry");
		setTimeout(() => {
			setPhase("active");
			setInterviewStarted(true);
			sendMessage(`Start my interview now. I am applying for ${role} at ${company}. Begin with a brief introduction, then ask me the first technical question. Base the questions on my profile data, projects, and DSA progress.`, {
				company,
				role
			});
		}, 2200);
	}
	async function handleSend() {
		const msg = input.trim();
		if (!msg || loading) return;
		setInput("");
		await sendMessage(msg, {
			company,
			role
		});
	}
	if (phase === "setup") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex overflow-hidden interview-chamber",
		style: { background: "oklch(0.09 0.02 270 / 96%)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationHistory, {
			conversations,
			onSelect: (id) => {
				loadConversation(id);
				setShowHistory(false);
			},
			onClose: () => setShowHistory(false)
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex flex-col items-center justify-center p-8 relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "w-full max-w-md space-y-6 mt-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-4 left-0 w-full px-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onSwitchMode("career_twin"),
									className: "text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white",
									children: "Career Twin"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => onSwitchMode("recruiter"),
									className: "text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white",
									children: "Recruiter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-[10px] bg-pink-500/20 px-2.5 py-1 rounded-full text-pink-300 border border-pink-500/30 transition font-medium",
									children: "Interview"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-4 bg-white/10 mx-1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setShowHistory((v) => !v),
									className: "h-8 w-8 rounded-full glass hover:bg-white/10 flex items-center justify-center transition",
									title: "Toggle History",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4 text-white/60" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onClose,
									className: "h-8 w-8 rounded-full glass hover:bg-white/10 flex items-center justify-center transition",
									title: "Close",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 text-white/60" })
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex h-16 w-16 rounded-2xl items-center justify-center mb-4",
								style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-8 w-8 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold text-white",
								children: "Interview Chamber"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/50 mt-1",
								children: "AI-powered interview simulation using your live profile"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs uppercase tracking-widest text-white/40",
								children: "Target Company"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2 mb-2",
								children: COMPANY_PRESETS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCompany(c),
									className: `px-3 py-1.5 rounded-full text-xs transition ${company === c ? "text-white border-cyan-400/50" : "glass text-white/50 hover:text-white"}`,
									style: company === c ? {
										background: "linear-gradient(135deg, oklch(0.75 0.2 200 / 30%), oklch(0.72 0.22 295 / 30%))",
										border: "1px solid oklch(0.75 0.2 200 / 50%)"
									} : {},
									children: c
								}, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: company,
								onChange: (e) => setCompany(e.target.value),
								className: "w-full glass rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 placeholder:text-white/25",
								placeholder: "Or type custom company…"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs uppercase tracking-widest text-white/40",
								children: "Role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2 mb-2",
								children: ROLE_PRESETS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setRole(r),
									className: `px-3 py-1.5 rounded-full text-xs transition ${role === r ? "text-white" : "glass text-white/50 hover:text-white"}`,
									style: role === r ? {
										background: "linear-gradient(135deg, oklch(0.72 0.22 295 / 30%), oklch(0.85 0.20 330 / 30%))",
										border: "1px solid oklch(0.72 0.22 295 / 50%)"
									} : {},
									children: r
								}, r))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: role,
								onChange: (e) => setRole(e.target.value),
								className: "w-full glass rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 placeholder:text-white/25",
								placeholder: "Or type custom role…"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onSwitchMode("career_twin"),
							className: "flex-1 glass rounded-xl py-2 text-xs text-white/50 hover:text-white transition",
							children: "← Career Twin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: startInterview,
							disabled: !company || !role,
							className: "flex-1 rounded-xl px-4 py-3.5 font-bold text-white transition disabled:opacity-50",
							style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
							children: "Enter Chamber →"
						})]
					})
				]
			})
		})]
	});
	if (phase === "chamber-entry") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col items-center justify-center interview-chamber relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scan-line" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0",
				style: {
					backgroundImage: "linear-gradient(oklch(0.72 0.22 295 / 8%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.22 295 / 8%) 1px, transparent 1px)",
					backgroundSize: "40px 40px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					scale: .5
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: { duration: .5 },
				className: "text-center z-10 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						animate: { rotate: 360 },
						transition: {
							repeat: Infinity,
							duration: 3,
							ease: "linear"
						},
						className: "h-20 w-20 mx-auto rounded-full",
						style: { background: "conic-gradient(from 0deg, transparent 60%, oklch(0.72 0.22 295), oklch(0.85 0.20 330), transparent 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold text-white",
						children: "Entering Interview Chamber"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-white/50",
						children: [
							company,
							" — ",
							role
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 text-[11px] text-violet-400",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { opacity: [
								1,
								0,
								1
							] },
							transition: {
								repeat: Infinity,
								duration: 1
							},
							children: "▋"
						}), "AI Interviewer Initializing…"]
					})
				]
			})
		]
	});
	if (phase === "scorecard" && scoreData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col interview-chamber overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onClose,
			className: "absolute top-4 right-4 z-10 h-8 w-8 rounded-full glass flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 text-white/60" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 flex items-center justify-center p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreCard, { ...scoreData }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							startNewConversation();
							setPhase("setup");
							setScoreData(null);
							setInterviewStarted(false);
						},
						className: "glass rounded-xl px-6 py-2.5 text-sm hover:bg-white/10 transition",
						children: "Retry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => onSwitchMode("career_twin"),
						className: "rounded-xl px-6 py-2.5 text-sm font-medium text-white transition",
						style: { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" },
						children: "Career Twin Analysis"
					})]
				})]
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col interview-chamber",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-shrink-0 px-4 py-3 border-b border-white/8 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-9 w-9 rounded-full flex items-center justify-center",
						style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400",
							style: { boxShadow: "0 0 6px oklch(0.88 0.18 145)" }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold text-white",
						children: "AI Interviewer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] text-white/40",
						children: [
							company,
							" · ",
							role
						]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InterviewTimer, { running: interviewStarted }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setPhase("scorecard");
								setScoreData({
									score: 0,
									feedback: "Session ended early",
									strengths: [],
									weaknesses: []
								});
							},
							className: "text-[11px] glass px-3 py-1.5 rounded-xl hover:bg-white/10 transition text-orange-400 border border-orange-500/20",
							children: "End Interview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "h-8 w-8 rounded-full glass hover:bg-white/10 flex items-center justify-center transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 text-white/60" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto px-5 py-4 space-y-4",
				children: [
					messages.map((m, i) => {
						const isUser = m.role === "user";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: `flex gap-3 ${isUser ? "justify-end" : "justify-start"}`,
							children: [
								!isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
									style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4 text-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `max-w-[78%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${isUser ? "rounded-tr-sm text-white" : "glass rounded-tl-sm border border-white/8"}`,
									style: isUser ? { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" } : {},
									children: m.content.split("\n").map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: line === "" ? "h-2" : "",
										children: line
									}, li))
								}),
								isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-shrink-0 h-8 w-8 rounded-full glass flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" })
								})
							]
						}, m.id ?? i);
					}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded-full flex items-center justify-center",
							style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4 text-white" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass rounded-2xl rounded-tl-sm px-4 py-3 border border-white/8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: [
									0,
									.15,
									.3
								].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "h-2 w-2 rounded-full bg-violet-400",
									animate: { y: [
										0,
										-6,
										0
									] },
									transition: {
										repeat: Infinity,
										duration: .7,
										delay: d
									}
								}, i))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-shrink-0 p-4 border-t border-white/8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 glass rounded-2xl border border-white/8 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: input,
							onChange: (e) => {
								setInput(e.target.value);
								e.target.style.height = "auto";
								e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
							},
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									handleSend();
								}
							},
							placeholder: "Type your answer… (Enter to send, Shift+Enter for new line)",
							className: "w-full bg-transparent px-4 py-3 text-sm outline-none resize-none min-h-[44px] max-h-[120px] placeholder:text-white/25",
							rows: 1
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						whileTap: { scale: .9 },
						onClick: handleSend,
						disabled: !input.trim() || loading,
						className: "h-12 w-12 rounded-2xl flex items-center justify-center disabled:opacity-40 transition",
						style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 text-white" })
					})]
				})
			})
		]
	});
}
//#endregion
export { InterviewMode };
