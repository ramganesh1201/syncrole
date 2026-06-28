import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { N as Lock, R as KeyRound, ot as CircleCheck, v as Sparkles } from "../_libs/lucide-react.mjs";
import { v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/update-password-DDCvS3z4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function UpdatePasswordPage() {
	const router = useRouter();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (!session) {
				toast.error("Invalid or expired session. Please log in again.");
				router.navigate({ to: "/auth" });
			}
		});
	}, [router]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password.length < 8) {
			toast.error("Password must be at least 8 characters long.");
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}
		setLoading(true);
		try {
			const { error } = await supabase.auth.updateUser({ password });
			if (error) throw error;
			setSuccess(true);
			toast.success("Password updated successfully!");
			setTimeout(() => {
				router.navigate({ to: "/dashboard" });
			}, 2e3);
		} catch (error) {
			toast.error(error.message || "Failed to update password.");
		} finally {
			setLoading(false);
		}
	};
	if (success) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			className: "max-w-md w-full glass p-8 rounded-2xl border border-aurora/20 text-center space-y-6 relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-aurora/10 to-transparent pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { scale: 0 },
					animate: { scale: 1 },
					transition: {
						type: "spring",
						damping: 15,
						delay: .2
					},
					className: "w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-10 h-10 text-green-400" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-white",
						children: "Password Updated!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Your password has been set successfully. You can now log in using either Google or your email."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-aurora animate-pulse",
					children: "Redirecting to Dashboard..."
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[80vh] flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "max-w-md w-full glass p-8 rounded-2xl border border-white/10 space-y-8 relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-aurora/20 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 relative z-10 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-14 h-14 bg-background/50 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "w-6 h-6 text-aurora" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-display font-bold text-white",
							children: "Create New Password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: "Set a password to enable email login for your account."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "space-y-6 relative z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "New Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									placeholder: "At least 8 characters",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "pl-10 bg-black/20 border-white/10 focus:border-aurora/50 transition-colors",
									disabled: loading
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "confirmPassword",
								children: "Confirm Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "confirmPassword",
									type: "password",
									placeholder: "Type your password again",
									value: confirmPassword,
									onChange: (e) => setConfirmPassword(e.target.value),
									className: "pl-10 bg-black/20 border-white/10 focus:border-aurora/50 transition-colors",
									disabled: loading
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading,
						className: "w-full bg-aurora hover:bg-aurora/90 text-background font-bold py-6 group relative overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center justify-center gap-2",
							children: loading ? "Saving Password..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Save Password ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 group-hover:scale-125 transition-transform" })] })
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { UpdatePasswordPage as component };
