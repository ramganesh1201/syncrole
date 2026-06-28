import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useSyncPilot } from "./useSyncPilot-MSH2spMY.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { B as History, P as LoaderCircle, S as Send, bt as Briefcase, g as Target, mt as ChartColumn, n as X, p as TrendingUp, s as User, t as Zap, xt as Brain, y as Shield } from "../_libs/lucide-react.mjs";
import { t as ConversationHistory } from "./ConversationHistory-CRjuK1Ok.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RecruiterMode-DitqS3dG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RECRUITER_PROMPTS = [
	"Generate a full RECRUITER REPORT for my profile. Include: Hiring Probability, ATS Score, Resume Analysis, Strengths, Weaknesses, Risk Factors, and Final Verdict.",
	"What's my market competitiveness vs other candidates applying for my target role?",
	"What's the #1 thing I must fix before applying to top companies?",
	"Predict my offer probability at FAANG companies given my current profile.",
	"What salary range should I expect based on my skills and experience?"
];
function HiringMeter({ probability }) {
	const getColor = (p) => p >= 70 ? "oklch(0.88 0.18 145)" : p >= 45 ? "oklch(0.88 0.18 60)" : "oklch(0.65 0.24 25)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5 border border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-white/50",
					children: "Hiring Probability"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4 text-white/30" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .5
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: {
						type: "spring",
						stiffness: 200,
						delay: .2
					},
					className: "font-display text-5xl font-bold",
					style: { color: getColor(probability) },
					children: [probability, "%"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pb-1.5 text-sm text-white/40",
					children: probability >= 70 ? "Strong Candidate" : probability >= 45 ? "Moderate Fit" : "Needs Work"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 rounded-full bg-white/8 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full rounded-full",
					initial: { width: 0 },
					animate: { width: `${probability}%` },
					transition: {
						duration: 1.2,
						ease: "easeOut",
						delay: .3
					},
					style: { background: `linear-gradient(90deg, oklch(0.65 0.24 25), ${getColor(probability)})` }
				})
			})
		]
	});
}
function ScoreBar({ label, value, icon: Icon }) {
	const color = value >= 70 ? "oklch(0.88 0.18 145)" : value >= 40 ? "oklch(0.88 0.18 60)" : "oklch(0.65 0.24 25)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-white/40 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between text-xs mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white/60",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					style: { color },
					children: value
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 rounded-full bg-white/8 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "h-full rounded-full",
					initial: { width: 0 },
					animate: { width: `${value}%` },
					transition: {
						duration: 1,
						ease: "easeOut",
						delay: .5
					},
					style: { background: color }
				})
			})]
		})]
	});
}
function MessageBubble({ role, content }) {
	const isUser = role === "user";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 6
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: `flex gap-2 ${isUser ? "justify-end" : "justify-start"}`,
		children: [
			!isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center",
				style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-3.5 w-3.5 text-white" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap ${isUser ? "text-white rounded-tr-sm" : "glass rounded-tl-sm"}`,
				style: isUser ? { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" } : {},
				children: content
			}),
			isUser && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-shrink-0 h-7 w-7 rounded-full glass flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5" })
			})
		]
	});
}
function RecruiterMode({ onClose, onSwitchMode }) {
	const { messages, loading, userData, userDataLoading, sendMessage, loadUserData, switchMode, conversations, loadConversation } = useSyncPilot();
	const [input, setInput] = (0, import_react.useState)("");
	const [autoReportSent, setAutoReportSent] = (0, import_react.useState)(false);
	const initializedRef = (0, import_react.useRef)(false);
	const [company, setCompany] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [showHistory, setShowHistory] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		loadUserData();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!autoReportSent && !loading && !userDataLoading && messages.length === 0) {
			if (initializedRef.current) return;
			initializedRef.current = true;
			setAutoReportSent(true);
			sendMessage(RECRUITER_PROMPTS[0], {
				company,
				role
			});
		}
	}, [
		userDataLoading,
		autoReportSent,
		loading,
		messages.length,
		company,
		role,
		sendMessage
	]);
	(0, import_react.useEffect)(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const ps = userData?.placementScore;
	async function handleSend(text) {
		const msg = (text ?? input).trim();
		if (!msg || loading) return;
		setInput("");
		await sendMessage(msg, {
			company,
			role
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col",
		style: { background: "oklch(0.09 0.02 270 / 96%)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-shrink-0 px-5 pt-4 pb-3 border-b border-white/8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-10 w-10 rounded-xl flex items-center justify-center",
						style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-5 w-5 text-white" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-sm text-white",
							children: "Recruiter Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30",
							children: "Senior Technical Recruiter"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-white/40 mt-0.5",
						children: "AI-powered candidate evaluation using your live data"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => onSwitchMode("career_twin"),
							className: "text-[10px] glass px-2.5 py-1 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white",
							children: "Career Twin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "text-[10px] bg-violet-500/20 px-2.5 py-1 rounded-full text-violet-300 border border-violet-500/30 transition font-medium",
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
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: company,
					onChange: (e) => setCompany(e.target.value),
					placeholder: "Target company (e.g. Google)",
					className: "flex-1 glass rounded-xl px-3 py-2 text-xs outline-none border border-white/8 placeholder:text-white/25"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: role,
					onChange: (e) => setRole(e.target.value),
					placeholder: "Role (e.g. SDE-2)",
					className: "flex-1 glass rounded-xl px-3 py-2 text-xs outline-none border border-white/8 placeholder:text-white/25"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-hidden flex gap-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConversationHistory, {
					conversations,
					onSelect: (id) => {
						loadConversation(id);
						setShowHistory(false);
					},
					onClose: () => setShowHistory(false)
				}) }),
				!showHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-shrink-0 w-64 border-r border-white/8 overflow-y-auto p-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiringMeter, { probability: ps?.total_score ?? 0 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl p-4 space-y-3 border border-white/8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-white/40",
									children: "Score Breakdown"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
									label: "ATS / Resume",
									value: ps?.resume_score ?? 0,
									icon: Shield
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
									label: "DSA Depth",
									value: ps?.dsa_score ?? 0,
									icon: Brain
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
									label: "GitHub",
									value: ps?.github_score ?? 0,
									icon: Zap
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
									label: "Projects",
									value: ps?.projects_score ?? 0,
									icon: Target
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
									label: "Skills",
									value: ps?.skill_score ?? 0,
									icon: TrendingUp
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-white/30",
								children: "Ask Recruiter"
							}), RECRUITER_PROMPTS.slice(1).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleSend(p),
								className: "w-full text-left glass rounded-xl px-3 py-2 text-[11px] text-white/60 hover:text-white hover:bg-white/8 transition leading-snug",
								children: [p.slice(0, 55), "…"]
							}, p))]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col min-w-0 min-h-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto px-5 py-4 space-y-4",
						children: [
							messages.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								className: "text-center text-white/30 text-sm pt-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-8 w-8 mx-auto mb-3 text-violet-500/40" }), "Generating your Recruiter Report…"]
							}),
							messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
								role: m.role,
								content: m.content
							}, m.id ?? i)),
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-7 w-7 rounded-full flex items-center justify-center",
										style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-3.5 w-3.5 text-white" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "glass rounded-2xl rounded-tl-sm px-4 py-2.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-1",
											children: [
												0,
												.15,
												.3
											].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												className: "h-1.5 w-1.5 rounded-full bg-violet-400",
												animate: { y: [
													0,
													-5,
													0
												] },
												transition: {
													repeat: Infinity,
													duration: .7,
													delay: d
												}
											}, i))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] text-white/30",
										children: "Analyzing your profile…"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: messagesEndRef })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-shrink-0 p-4 border-t border-white/8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: input,
								onChange: (e) => setInput(e.target.value),
								onKeyDown: (e) => {
									if (e.key === "Enter") handleSend();
								},
								placeholder: "Ask the recruiter anything…",
								className: "flex-1 glass rounded-2xl px-4 py-3 text-sm outline-none border border-white/8 placeholder:text-white/25"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
								whileTap: { scale: .9 },
								onClick: () => handleSend(),
								disabled: !input.trim() || loading,
								className: "h-12 w-12 rounded-2xl flex items-center justify-center disabled:opacity-40 transition",
								style: { background: "linear-gradient(135deg, oklch(0.72 0.22 295), oklch(0.85 0.20 330))" },
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 text-white" })
							})]
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { RecruiterMode };
