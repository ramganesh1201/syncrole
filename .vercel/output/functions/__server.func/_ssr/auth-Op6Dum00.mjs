import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { N as Lock, Ot as ArrowRight, P as LoaderCircle, j as Mail, s as User, v as Sparkles } from "../_libs/lucide-react.mjs";
import { t as AuroraBackground } from "./AuroraBackground-BuJ7TTsw.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Op6Dum00.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const nav = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_, s) => {
			if (s) nav({ to: "/dashboard" });
		});
		return () => sub.subscription.unsubscribe();
	}, [nav]);
	async function submit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/dashboard`,
						data: { full_name: name }
					}
				});
				console.log("SIGNUP DATA:", data);
				console.log("SIGNUP ERROR:", error);
				if (error) throw error;
				toast.success("Account created! Redirecting…");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			}
		} catch (err) {
			toast.error(err.message ?? "Auth failed");
		} finally {
			setBusy(false);
		}
	}
	async function google() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/dashboard` }
		});
		if (error) toast.error(error.message);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen grid place-items-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuroraBackground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "relative z-10 w-full max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "mb-8 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-9 w-9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-lg bg-aurora animate-float" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-[3px] rounded-md bg-background grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-aurora" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl font-semibold",
						children: "SyncRole"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-3xl p-px",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-3xl bg-aurora opacity-50 blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-[23px] glass-strong p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold",
								children: mode === "signin" ? "Welcome back" : "Create your account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: mode === "signin" ? "Sign in to your Career OS" : "Start your placement journey in 30 seconds"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: google,
								disabled: busy,
								className: "mt-6 w-full glass rounded-full py-3 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-white/10 transition disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "h-4 w-4",
									viewBox: "0 0 24 24",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										fill: "#fff",
										d: "M21.35 11.1h-9.17v2.97h5.27c-.23 1.45-1.7 4.25-5.27 4.25-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.71 1.43l2.53-2.44C16.86 3.97 14.7 3 12.18 3 7.07 3 2.94 7.13 2.94 12.25S7.07 21.5 12.18 21.5c7 0 9.32-4.92 9.32-7.45 0-.5-.05-.88-.15-1.95z"
									})
								}), "Continue with Google"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-white/10" }),
									" or email",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-white/10" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								className: "space-y-3",
								children: [
									mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										icon: User,
										value: name,
										onChange: setName,
										placeholder: "Full name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										icon: Mail,
										type: "email",
										value: email,
										onChange: setEmail,
										placeholder: "you@college.edu"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										icon: Lock,
										type: "password",
										value: password,
										onChange: setPassword,
										placeholder: "Password (8+ chars)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: busy,
										className: "relative w-full rounded-full py-3 text-sm font-semibold text-primary-foreground overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "relative inline-flex items-center justify-center gap-2",
											children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												mode === "signin" ? "Sign In" : "Create Account",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
											] })
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 text-center text-sm text-muted-foreground",
								children: [
									mode === "signin" ? "New to SyncRole?" : "Already have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
										className: "text-accent hover:underline",
										children: mode === "signin" ? "Create one" : "Sign in"
									})
								]
							})
						]
					})]
				})]
			})
		]
	});
}
function Field({ icon: Icon, ...p }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: p.type ?? "text",
			value: p.value,
			onChange: (e) => p.onChange(e.target.value),
			placeholder: p.placeholder,
			className: "w-full glass rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ring-accent/50"
		})]
	});
}
//#endregion
export { AuthPage as component };
