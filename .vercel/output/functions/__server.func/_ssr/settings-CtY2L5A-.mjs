import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { D as Monitor, N as Lock, Tt as Bell, a as Volume2, c as UserCog, ft as Check, v as Sparkles, y as Shield } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CtY2L5A-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [user, setUser] = (0, import_react.useState)(null);
	const [loginMethod, setLoginMethod] = (0, import_react.useState)("email");
	const [resettingPassword, setResettingPassword] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function loadUser() {
			const { data } = await supabase.auth.getUser();
			if (data?.user) {
				setUser(data.user);
				const providers = data.user.app_metadata?.providers || [];
				const hasGoogle = providers.includes("google");
				const hasEmail = providers.includes("email");
				if (hasGoogle && hasEmail) setLoginMethod("both");
				else if (hasGoogle) setLoginMethod("google");
				else setLoginMethod("email");
			}
		}
		loadUser();
	}, []);
	const handleCreatePassword = async () => {
		if (!user?.email) return;
		setResettingPassword(true);
		try {
			const { error } = await supabase.auth.resetPasswordForEmail(user.email, { redirectTo: `${window.location.origin}/update-password` });
			if (error) throw error;
			toast.success("Password setup email sent. Check your inbox to create a password.");
		} catch (error) {
			toast.error(error.message || "Failed to send password setup email");
		} finally {
			setResettingPassword(false);
		}
	};
	const [settings, setSettings] = (0, import_react.useState)({
		theme: "dark",
		emailNotifs: true,
		pushNotifs: true,
		soundEffects: true,
		syncPilotProactive: true,
		profilePublic: false,
		twoFactor: false
	});
	const handleToggle = (key) => {
		setSettings((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};
	const handleSave = () => {
		setSaving(true);
		setTimeout(() => {
			setSaving(false);
			toast.success("Settings saved successfully!");
		}, 600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-3xl font-display font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCog, { className: "w-8 h-8 text-aurora" }), " Settings"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Manage your account preferences and application settings."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "appearance",
				className: "w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "glass border border-white/10 bg-background/50 p-1 mb-8 w-full justify-start overflow-x-auto rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "appearance",
							className: "rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "w-4 h-4 mr-2" }), " Appearance"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "notifications",
							className: "rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "w-4 h-4 mr-2" }), " Notifications"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "syncpilot",
							className: "rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 mr-2" }), " SyncPilot"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "privacy",
							className: "rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-4 h-4 mr-2" }), " Privacy"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "security",
							className: "rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4 mr-2" }), " Security"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .3 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "appearance",
							className: "space-y-6 outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-xl p-6 border border-white/5 space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-lg border-b border-white/5 pb-4",
										children: "Appearance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: "Theme"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "SyncRole is optimized for Dark Mode"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													className: `rounded-md ${settings.theme === "light" ? "bg-white/10 text-white" : "text-muted-foreground"}`,
													onClick: () => setSettings((s) => ({
														...s,
														theme: "light"
													})),
													children: "Light"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													className: `rounded-md ${settings.theme === "dark" ? "bg-white/10 text-white" : "text-muted-foreground"}`,
													onClick: () => setSettings((s) => ({
														...s,
														theme: "dark"
													})),
													children: "Dark"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													className: `rounded-md ${settings.theme === "system" ? "bg-white/10 text-white" : "text-muted-foreground"}`,
													onClick: () => setSettings((s) => ({
														...s,
														theme: "system"
													})),
													children: "System"
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-t border-white/5 pt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-10 h-10 rounded-full glass flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "w-5 h-5 text-aurora" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium text-foreground",
												children: "Sound Effects"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground",
												children: "Play sounds when unlocking achievements"
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: settings.soundEffects,
											onCheckedChange: () => handleToggle("soundEffects")
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "notifications",
							className: "space-y-6 outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-xl p-6 border border-white/5 space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-lg border-b border-white/5 pb-4",
										children: "Notification Preferences"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: "Email Notifications"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Receive weekly reports and placement updates"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: settings.emailNotifs,
											onCheckedChange: () => handleToggle("emailNotifs")
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-t border-white/5 pt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: "In-App Notifications"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Live alerts for DSA progress and XP"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: settings.pushNotifs,
											onCheckedChange: () => handleToggle("pushNotifs")
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "syncpilot",
							className: "space-y-6 outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-xl p-6 border border-white/5 space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg border-b border-white/5 pb-4",
									children: "SyncPilot Preferences"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 h-10 rounded-full glass flex items-center justify-center shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5 text-aurora" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: "Proactive Intelligence"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Allow SyncPilot to analyze your code and suggest improvements automatically"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: settings.syncPilotProactive,
										onCheckedChange: () => handleToggle("syncPilotProactive")
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "privacy",
							className: "space-y-6 outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-xl p-6 border border-white/5 space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-lg border-b border-white/5 pb-4",
									children: "Privacy & Visibility"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: "Public Profile"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Allow recruiters to discover your Career Identity"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: settings.profilePublic,
										onCheckedChange: () => handleToggle("profilePublic")
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "security",
							className: "space-y-6 outline-none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-xl p-6 border border-white/5 space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-lg border-b border-white/5 pb-4",
										children: "Account Security"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: "Current Login Method"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10",
											children: [
												loginMethod === "google" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm",
													children: "Google Account"
												}),
												loginMethod === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm",
													children: "Email & Password"
												}),
												loginMethod === "both" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm",
													children: "Google Account + Email & Password"
												})
											]
										})]
									}),
									loginMethod === "google" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-6 rounded-xl bg-gradient-to-br from-aurora/10 to-transparent border border-aurora/20 space-y-4 relative overflow-hidden group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-aurora/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
													className: "font-medium text-aurora flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }), " Use Email & Password Login"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-muted-foreground",
													children: "You currently sign in with Google. Create a password so you can also log in using your email address."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												onClick: handleCreatePassword,
												disabled: resettingPassword,
												className: "shrink-0 bg-aurora hover:bg-aurora/90 text-background font-medium",
												children: resettingPassword ? "Sending..." : "Create Password"
											})]
										})]
									}),
									loginMethod === "both" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-1 rounded-full bg-green-500/20 shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-green-500" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-medium text-green-400",
											children: "Password already configured"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground mt-1",
											children: "Your account supports both email/password login and any connected providers."
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-t border-white/5 pt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium text-foreground",
											children: "Two-Factor Authentication"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "Add an extra layer of security to your account"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
											checked: settings.twoFactor,
											onCheckedChange: () => handleToggle("twoFactor")
										})]
									})
								]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { y: 100 },
				animate: { y: 0 },
				className: "fixed bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-6 shadow-2xl z-50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-muted-foreground hidden sm:block",
					children: "Save your preferences"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSave,
					disabled: saving,
					className: "bg-aurora hover:bg-aurora/90 text-background px-8 rounded-xl font-bold tracking-wide",
					children: saving ? "Saving..." : "Save Settings"
				})]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
