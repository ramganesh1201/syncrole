import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useSyncPilot } from "./useSyncPilot-MSH2spMY.mjs";
import { i as levelProgress } from "./syncrole-BmVv4SfO.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { B as History, Et as Award, G as Flame, O as MessageSquare, P as LoaderCircle, S as Send, T as Plus, g as Target, n as X, s as User, t as Zap, tt as CodeXml, ut as ChevronRight, wt as BookOpen, xt as Brain } from "../_libs/lucide-react.mjs";
import { t as ConversationHistory } from "./ConversationHistory-CRjuK1Ok.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CareerTwinMode-Agh25t4t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var QUICK_ACTIONS = [
	{
		label: "Placement Analysis",
		prompt: "Give me a full placement readiness analysis based on my current data."
	},
	{
		label: "DSA Roadmap",
		prompt: "Create a personalized DSA study roadmap based on my progress and target role."
	},
	{
		label: "Skill Gap Analysis",
		prompt: "Identify my skill gaps compared to what top companies look for."
	},
	{
		label: "Resume Improvement",
		prompt: "Analyze my resume score and give me the top 5 improvements I should make."
	},
	{
		label: "Interview Prep",
		prompt: "Create a 2-week interview preparation plan based on my weak areas."
	},
	{
		label: "Career Trajectory",
		prompt: "Predict my career trajectory and best role fit based on my current profile."
	}
];
function ScoreRingSmall({ value, color = "#06b6d4" }) {
	const r = 22;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 56 56",
		className: "h-14 w-14 -rotate-90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "28",
			cy: "28",
			r,
			stroke: "oklch(1 0 0 / 8%)",
			strokeWidth: "5",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
			cx: "28",
			cy: "28",
			r,
			stroke: color,
			strokeWidth: "5",
			fill: "none",
			strokeLinecap: "round",
			strokeDasharray: c,
			initial: { strokeDashoffset: c },
			animate: { strokeDashoffset: c - c * value / 100 },
			transition: {
				duration: 1.2,
				ease: "easeOut",
				delay: .3
			}
		})]
	});
}
function MessageBubble({ role, content, timestamp }) {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${isUser ? "text-white rounded-tr-sm" : "glass rounded-tl-sm text-foreground"}`,
				style: isUser ? { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" } : {},
				children: [content.split("\n").map((line, i) => {
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
				}), timestamp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-[10px] opacity-40 text-right",
					children: new Date(timestamp).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})
				})]
			}),
			isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" })
			})
		]
	});
}
function CareerTwinMode({ onClose, onSwitchMode }) {
	const { messages, loading, userData, userDataLoading, sendMessage, loadUserData, conversations, loadConversations, loadConversation, startNewConversation } = useSyncPilot();
	const [input, setInput] = (0, import_react.useState)("");
	const [showHistory, setShowHistory] = (0, import_react.useState)(true);
	const messagesEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		loadUserData();
		loadConversations();
	}, []);
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const profile = userData?.profile;
	const xp = userData?.xp;
	const streak = userData?.streak;
	const ps = userData?.placementScore;
	const resume = userData?.resume;
	const lp = xp ? levelProgress(xp.total_xp) : null;
	const placementScore = ps?.total_score ?? 0;
	const resumeScore = resume?.total_score ?? 0;
	const dsaScore = ps?.dsa_score ?? 0;
	async function handleSend(text) {
		const msg = (text ?? input).trim();
		if (!msg || loading) return;
		setInput("");
		await sendMessage(msg);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col",
		style: { background: "oklch(0.10 0.02 270 / 95%)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-shrink-0 px-4 pt-4 pb-3 border-b border-white/8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-9 w-9 rounded-full flex items-center justify-center glow-pulse-cyan",
						style: { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4.5 w-4.5 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400",
							style: { boxShadow: "0 0 6px oklch(0.88 0.18 145)" }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-sm leading-none text-white",
						children: "SyncPilot"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-emerald-400 mt-0.5",
						children: "Online"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-[10px] bg-white/20 px-2.5 py-1 rounded-full text-white transition font-medium",
							children: "Career Twin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onSwitchMode("recruiter"),
							className: "text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white",
							children: "Recruiter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onSwitchMode("interview"),
							className: "text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white",
							children: "Interview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px h-4 bg-white/10 mx-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowHistory((v) => !v),
							className: "h-7 w-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition",
							title: "Toggle History",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5 text-white/60" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: startNewConversation,
							className: "h-7 w-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition",
							title: "New Chat",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 text-white/60" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "h-7 w-7 rounded-full glass hover:bg-white/10 flex items-center justify-center transition",
							title: "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 text-white/60" })
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-hidden flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationHistory, {
				conversations,
				onSelect: (id) => {
					loadConversation(id);
					setShowHistory(false);
				},
				onClose: () => setShowHistory(false)
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-w-0 min-h-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						className: "flex-shrink-0 p-4 space-y-3",
						children: [userDataLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center py-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-cyan-400" })
						}) : profile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-3 flex items-center gap-3 border border-white/8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-10 w-10 rounded-full flex items-center justify-center text-lg font-bold",
										style: { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" },
										children: (profile.full_name || "U")[0].toUpperCase()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-sm truncate",
											children: profile.full_name || "User"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-white/50 truncate",
											children: profile.career_goal || "Career goal not set"
										})]
									}),
									lp && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs font-mono text-cyan-400",
											children: [xp?.total_xp ?? 0, " XP"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-white/40",
											children: ["Lv ", lp.cur.lvl]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 gap-2",
								children: [
									{
										label: "Placement",
										value: placementScore,
										color: "oklch(0.75 0.2 200)",
										icon: Target
									},
									{
										label: "Resume",
										value: resumeScore,
										color: "oklch(0.72 0.22 295)",
										icon: BookOpen
									},
									{
										label: "DSA",
										value: dsaScore,
										color: "oklch(0.88 0.18 145)",
										icon: CodeXml
									}
								].map(({ label, value, color, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-xl p-2 flex flex-col items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRingSmall, {
											value,
											color
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 flex items-center justify-center rotate-90",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold",
												style: { color },
												children: value
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-2.5 w-2.5 text-white/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-white/50",
											children: label
										})]
									})]
								}, label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-xl p-2.5 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-3.5 w-3.5 text-orange-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold",
										children: streak?.current_streak ?? 0
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-white/40",
										children: "day streak"
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass rounded-xl p-2.5 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 text-yellow-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-bold",
										children: userData?.achievements.length ?? 0
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-white/40",
										children: "achievements"
									})] })]
								})]
							}),
							userData?.memory?.career_goals && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-xl px-3 py-2 flex items-start gap-2 border border-violet-500/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3 w-3 text-violet-400 mt-0.5 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-white/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-violet-400 font-medium",
										children: "Memory: "
									}), userData.memory.career_goals]
								})]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass rounded-xl p-4 text-center text-sm text-white/40",
							children: "Complete onboarding to unlock personalized insights"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-white/30 px-1",
								children: "Quick Actions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-1.5",
								children: QUICK_ACTIONS.slice(0, 4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => handleSend(a.prompt),
									className: "glass rounded-xl px-2.5 py-2 text-[11px] text-left hover:bg-white/8 transition text-white/70 hover:text-white flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-cyan-400 flex-shrink-0" }), a.label]
								}, a.label))
							})]
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto px-4 py-2 space-y-3",
						children: [
							messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
								role: m.role,
								content: m.content,
								timestamp: m.created_at
							}, m.id ?? i)),
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-7 w-7 rounded-full flex items-center justify-center",
									style: { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-3.5 w-3.5 text-white" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "glass rounded-2xl rounded-tl-sm px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-1",
										children: [
											0,
											.2,
											.4
										].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											className: "h-1.5 w-1.5 rounded-full bg-cyan-400",
											animate: { y: [
												0,
												-5,
												0
											] },
											transition: {
												repeat: Infinity,
												duration: .8,
												delay: d
											}
										}, i))
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
						]
					}),
					messages.length > 0 && messages.length < 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-shrink-0 px-4 pb-2 flex gap-1.5 flex-wrap",
						children: QUICK_ACTIONS.slice(4).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => handleSend(a.prompt),
							className: "glass text-[10px] px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white",
							children: a.label
						}, a.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-shrink-0 p-3 border-t border-white/8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 glass rounded-2xl overflow-hidden border border-white/8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: input,
									onChange: (e) => {
										setInput(e.target.value);
										e.target.style.height = "auto";
										e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
									},
									onKeyDown: (e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											handleSend();
										}
									},
									placeholder: "Ask SyncPilot anything about your career...",
									className: "w-full bg-transparent px-4 py-3 text-sm outline-none resize-none min-h-[44px] max-h-[100px] placeholder:text-white/25",
									rows: 1
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileTap: { scale: .9 },
								onClick: () => handleSend(),
								disabled: !input.trim() || loading,
								className: "h-11 w-11 rounded-2xl flex items-center justify-center transition disabled:opacity-40",
								style: { background: "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" },
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 text-white" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 text-[10px] text-white/20 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-2.5 w-2.5 inline mr-1" }), "Memory-enabled · Personalized to your data"]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { CareerTwinMode };
