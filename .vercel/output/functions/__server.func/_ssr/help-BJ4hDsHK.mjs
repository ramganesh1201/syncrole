import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { Ct as Book, L as Keyboard, O as MessageSquare, X as ExternalLink, at as CircleHelp, yt as Bug } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-BJ4hDsHK.js
var import_jsx_runtime = require_jsx_runtime();
function HelpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-display font-bold text-white flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "w-8 h-8 text-aurora" }), " Help & Support"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Find answers, get support, and learn how to maximize SyncRole."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-2 gap-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .3,
						delay: .1
					},
					className: "glass rounded-xl p-6 border border-white/5 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Book, { className: "w-5 h-5 text-aurora" }), " Documentation & FAQs"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Browse our extensive guides on how to use SyncPilot, master DSA modules, and boost your Placement Readiness." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#",
								className: "flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 transition-colors group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white group-hover:text-aurora transition-colors",
									children: "How does the Placement Score work?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4 opacity-50" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#",
								className: "flex items-center justify-between p-3 rounded-lg bg-black/20 hover:bg-white/5 border border-white/5 transition-colors group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white group-hover:text-aurora transition-colors",
									children: "Uploading and Analyzing Resumes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-4 h-4 opacity-50" })]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .3,
						delay: .2
					},
					className: "glass rounded-xl p-6 border border-white/5 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "w-5 h-5 text-aurora" }), " Contact Support"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Need personal assistance? Our support team is here to help you navigate your career journey." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full bg-white/10 hover:bg-white/20 text-white border border-white/5",
							children: "Open Support Ticket"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .3,
						delay: .3
					},
					className: "glass rounded-xl p-6 border border-white/5 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bug, { className: "w-5 h-5 text-aurora" }), " Report a Bug"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Spotted something weird? Let us know so we can fix it immediately." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "w-full border-aurora/30 text-aurora hover:bg-aurora hover:text-black",
							children: "Submit Bug Report"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .3,
						delay: .4
					},
					className: "glass rounded-xl p-6 border border-white/5 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold text-lg border-b border-white/5 pb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "w-5 h-5 text-aurora" }), " Keyboard Shortcuts"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted-foreground space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open SyncPilot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-white",
									children: "⌘ + K"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Go to Dashboard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-white",
									children: "G + D"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Toggle Theme" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-white",
									children: "⌘ + Shift + L"
								})]
							})
						]
					})]
				})
			]
		})]
	});
}
//#endregion
export { HelpPage as component };
