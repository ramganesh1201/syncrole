import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { B as History, O as MessageSquare, n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ConversationHistory-CRjuK1Ok.js
var import_jsx_runtime = require_jsx_runtime();
var MODE_LABELS = {
	career_twin: {
		label: "Career Twin",
		color: "text-cyan-400"
	},
	recruiter: {
		label: "Recruiter",
		color: "text-violet-400"
	},
	interview: {
		label: "Interview",
		color: "text-pink-400"
	}
};
function timeAgo(iso) {
	const diff = Date.now() - new Date(iso).getTime();
	const m = Math.floor(diff / 6e4);
	if (m < 1) return "Just now";
	if (m < 60) return `${m}m ago`;
	if (m < 1440) return `${Math.floor(m / 60)}h ago`;
	return `${Math.floor(m / 1440)}d ago`;
}
function ConversationHistory({ conversations, onSelect, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			width: 0,
			opacity: 0
		},
		animate: {
			width: 200,
			opacity: 1
		},
		exit: {
			width: 0,
			opacity: 0
		},
		transition: { duration: .22 },
		className: "flex-shrink-0 border-r border-white/8 flex flex-col overflow-hidden",
		style: { background: "oklch(0.08 0.02 270 / 90%)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-3 py-2.5 border-b border-white/8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-3.5 w-3.5 text-white/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium text-white/60",
					children: "History"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onClose,
				className: "h-5 w-5 rounded-full hover:bg-white/10 flex items-center justify-center transition",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3 text-white/40" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto py-2 space-y-0.5 px-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: conversations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-[11px] text-white/30 pt-6 px-2",
				children: "No conversations yet"
			}) : conversations.map((conv, i) => {
				const ml = MODE_LABELS[conv.mode] ?? {
					label: conv.mode,
					color: "text-white/50"
				};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
					initial: {
						opacity: 0,
						x: -8
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: { delay: i * .04 },
					onClick: () => onSelect(conv.id),
					className: "w-full text-left px-2.5 py-2 rounded-xl hover:bg-white/8 transition group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3 text-white/30 mt-0.5 flex-shrink-0 group-hover:text-white/60 transition" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] text-white/70 truncate leading-snug group-hover:text-white transition",
									children: conv.title || "Conversation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-[9px] ${ml.color} mt-0.5`,
									children: ml.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[9px] text-white/25 mt-0.5",
									children: timeAgo(conv.updated_at)
								})
							]
						})]
					})
				}, conv.id);
			}) })
		})]
	});
}
//#endregion
export { ConversationHistory as t };
