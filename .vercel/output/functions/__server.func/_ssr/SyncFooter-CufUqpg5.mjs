import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { F as Linkedin, S as Send, W as Github, j as Mail, u as Twitter, v as Sparkles, z as Instagram } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SyncFooter-CufUqpg5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SyncFooter() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function subscribe(e) {
		e.preventDefault();
		if (!email.includes("@")) return toast.error("Enter a valid email");
		setBusy(true);
		const { error } = await supabase.from("newsletter_subscribers").insert({ email });
		setBusy(false);
		if (error && !error.message.includes("duplicate")) return toast.error(error.message);
		setEmail("");
		toast.success("You're on the list 🚀");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative border-t border-white/5 mt-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-9 w-9",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-lg bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-[3px] rounded-md bg-background grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-aurora" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl font-semibold",
								children: "SyncRole"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-md text-sm text-muted-foreground",
							children: "The Career Operating System for the next generation of builders. AI-powered placement intelligence, gamified growth, real outcomes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: subscribe,
							className: "mt-6 flex max-w-md gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "your@email.com",
									className: "w-full glass rounded-full pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-accent/50"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								className: "rounded-full bg-aurora px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60",
								children: "Subscribe"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Product"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "hover:text-foreground text-muted-foreground",
							children: "Dashboard"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard/dsa",
							className: "hover:text-foreground text-muted-foreground",
							children: "DSA Tracker"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "hover:text-foreground text-muted-foreground",
							children: "Sign In"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#score",
							className: "hover:text-foreground text-muted-foreground",
							children: "Placement Score"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
					children: "Community"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid grid-cols-2 gap-2 text-sm",
					children: [
						{
							i: Github,
							href: "https://github.com/ramganesh1201",
							label: "GitHub"
						},
						{
							i: Linkedin,
							href: "https://www.linkedin.com/in/vemula-ram-ganesh/",
							label: "LinkedIn"
						},
						{
							i: Instagram,
							href: "#",
							label: "Instagram"
						},
						{
							i: Twitter,
							href: "#",
							label: "Twitter / X"
						},
						{
							i: Send,
							href: "#",
							label: "Telegram"
						}
					].map(({ i: Icon, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href,
						className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
							" ",
							label
						]
					}) }, label))
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" SyncRole — The Career Operating System"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#",
							className: "hover:text-foreground",
							children: "Terms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:hello@syncrole.app",
							className: "hover:text-foreground",
							children: "Contact"
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { SyncFooter as t };
