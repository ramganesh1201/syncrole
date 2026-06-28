import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { F as Linkedin, H as GraduationCap, U as Globe, W as Github, Y as FileText, bt as Briefcase, dt as ChevronDown, ft as Check, g as Target, l as Upload, lt as ChevronUp, s as User, tt as CodeXml } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Route } from "./profile-D-zdz1pL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CPtnn_1D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function ProfilePage() {
	const { user } = Route.useRouteContext();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [placementStats, setPlacementStats] = (0, import_react.useState)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function load() {
			const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
			const { data: stats } = await supabase.from("placement_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single();
			if (data) setProfile(data);
			if (stats) setPlacementStats(stats);
			setLoading(false);
		}
		load();
	}, [user.id]);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfile((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const handleSelectChange = (name, value) => {
		setProfile((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const handleArrayChange = (name, value) => {
		const arr = value.split(",").map((s) => s.trim()).filter(Boolean);
		setProfile((prev) => ({
			...prev,
			[name]: arr
		}));
	};
	const handleSave = async () => {
		setSaving(true);
		try {
			const { error } = await supabase.from("profiles").update(profile).eq("user_id", user.id);
			if (error) throw error;
			toast.success("Profile updated successfully!");
		} catch (err) {
			toast.error(err.message || "Failed to update profile");
		} finally {
			setSaving(false);
		}
	};
	const handleResumeUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		toast.loading("Uploading resume...", { id: "resume-upload" });
		try {
			const path = `${user.id}/${Date.now()}_${file.name}`;
			const { error } = await supabase.storage.from("resumes").upload(path, file);
			if (error) throw error;
			toast.success("Resume uploaded! It will be analyzed shortly.", { id: "resume-upload" });
		} catch (err) {
			toast.error(err.message || "Failed to upload resume", { id: "resume-upload" });
		} finally {
			setUploading(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center justify-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-8 h-8 border-4 border-aurora border-t-transparent rounded-full animate-spin" })
	});
	const fields = [
		"full_name",
		"phone",
		"city",
		"college",
		"branch",
		"graduation_year",
		"target_role",
		"dream_companies",
		"preferred_location",
		"linkedin",
		"github"
	];
	const filledFields = fields.filter((f) => profile?.[f] && (Array.isArray(profile[f]) ? profile[f].length > 0 : true));
	const completionPct = Math.round(filledFields.length / fields.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "relative overflow-hidden rounded-2xl glass border border-white/10 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center",
				id: "identity",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-aurora/10 to-transparent opacity-50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative w-32 h-32 shrink-0 rounded-full border-4 border-background overflow-hidden shadow-[0_0_30px_rgba(var(--aurora),0.3)]",
						children: profile?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: profile.avatar_url,
							alt: "Profile",
							className: "w-full h-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-full h-full bg-white/5 flex items-center justify-center text-4xl font-bold text-aurora",
							children: profile?.full_name?.charAt(0) || "U"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1 text-center md:text-left space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-display font-bold text-white",
							children: profile?.full_name || "SyncRole User"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-aurora font-medium mt-1",
							children: [
								profile?.target_role || "Aspiring Engineer",
								" • ",
								profile?.city || "Remote"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center md:justify-start gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white/5 rounded-lg px-4 py-2 border border-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground uppercase tracking-wider mb-1",
										children: "Placement Readiness"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-2xl font-bold text-white",
										children: [placementStats?.total_score || 0, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-white/50",
											children: "%"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white/5 rounded-lg px-4 py-2 border border-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground uppercase tracking-wider mb-1",
										children: "Career Twin Score"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-2xl font-bold text-white",
										children: [placementStats?.total_score ? Math.min(99, placementStats.total_score + 12) : 0, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-white/50",
											children: "%"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white/5 rounded-lg px-4 py-2 border border-white/5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground uppercase tracking-wider mb-1",
										children: "Dream Company"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-bold text-white mt-1",
										children: profile?.dream_companies?.[0] || "Undecided"
									})]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .1 },
				className: "glass rounded-xl p-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-end mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-semibold text-lg flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-5 h-5 text-aurora" }), " Profile Completion"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						children: "Complete your profile to unlock better SyncPilot recommendations."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-2xl font-bold text-aurora",
						children: [completionPct, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: completionPct,
					className: "h-2 bg-white/5",
					indicatorColor: "bg-aurora"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .2 },
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl p-6 border border-white/5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-5 h-5 text-aurora" }), " Personal Information"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-muted-foreground",
										children: "Full Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "full_name",
										value: profile?.full_name || "",
										onChange: handleChange,
										className: "bg-black/20"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: user.email || "",
											disabled: true,
											className: "bg-black/20 opacity-50"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Phone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "phone",
											value: profile?.phone || "",
											onChange: handleChange,
											className: "bg-black/20"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-muted-foreground",
										children: "City"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "city",
										value: profile?.city || "",
										onChange: handleChange,
										className: "bg-black/20"
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl p-6 border border-white/5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "w-5 h-5 text-aurora" }), " Education"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-muted-foreground",
										children: "College / University"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "college",
										value: profile?.college || "",
										onChange: handleChange,
										className: "bg-black/20"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Degree / Branch"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "branch",
											value: profile?.branch || "",
											onChange: handleChange,
											className: "bg-black/20"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Graduation Year"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "graduation_year",
											type: "number",
											value: profile?.graduation_year || "",
											onChange: handleChange,
											className: "bg-black/20"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-medium text-muted-foreground",
										children: "CGPA"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										name: "cgpa",
										type: "number",
										step: "0.1",
										value: profile?.cgpa || "",
										onChange: handleChange,
										className: "bg-black/20"
									})]
								})
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .3 },
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-xl p-6 border border-white/5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-5 h-5 text-aurora" }), " Career Goals"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Target Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "target_role",
											value: profile?.target_role || "",
											onChange: handleChange,
											placeholder: "e.g. Frontend Engineer, Product Manager",
											className: "bg-black/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Dream Companies (comma separated)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: profile?.dream_companies?.join(", ") || "",
											onChange: (e) => handleArrayChange("dream_companies", e.target.value),
											placeholder: "Google, Microsoft, Stripe",
											className: "bg-black/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Preferred Location"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "preferred_location",
												value: profile?.preferred_location || "",
												onChange: handleChange,
												className: "bg-black/20"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "text-sm font-medium text-muted-foreground",
												children: "Expected Salary"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "expected_salary",
												value: profile?.expected_salary || "",
												onChange: handleChange,
												placeholder: "$120k",
												className: "bg-black/20"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Career Goal Mode"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: profile?.career_goal || "",
											onValueChange: (val) => handleSelectChange("career_goal", val),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "bg-black/20",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select primary goal" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "MNC",
													children: "MNC / Big Tech"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "STARTUP",
													children: "High-Growth Startup"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "FREELANCE",
													children: "Freelance / Remote"
												})
											] })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-sm font-medium text-muted-foreground",
											children: "Skills (comma separated)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: profile?.skills?.join(", ") || "",
											onChange: (e) => handleArrayChange("skills", e.target.value),
											placeholder: "React, Python, System Design",
											className: "bg-black/20"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-xl p-6 border border-white/5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-5 h-5 text-aurora" }), " Social & Coding Profiles"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-medium text-muted-foreground flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-4 h-4" }), " LinkedIn URL"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "linkedin",
											value: profile?.linkedin || "",
											onChange: handleChange,
											className: "bg-black/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-medium text-muted-foreground flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "w-4 h-4" }), " GitHub Username"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "github_username",
											value: profile?.github_username || "",
											onChange: handleChange,
											className: "bg-black/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-medium text-muted-foreground flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4" }), " Portfolio URL"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											name: "portfolio",
											value: profile?.portfolio || "",
											onChange: handleChange,
											className: "bg-black/20"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-medium text-muted-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "w-4 h-4" }), " LeetCode"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "leetcode",
												value: profile?.leetcode || "",
												onChange: handleChange,
												className: "bg-black/20"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-medium text-muted-foreground flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "w-4 h-4" }), " Codeforces"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												name: "codeforces",
												value: profile?.codeforces || "",
												onChange: handleChange,
												className: "bg-black/20"
											})]
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-xl p-6 border border-white/5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-5 h-5 text-aurora" }), " Resume"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-black/20 border border-white/5 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-full glass flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-6 h-6 text-muted-foreground" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "Upload or replace your resume"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground mt-1",
										children: "PDF, DOCX up to 5MB"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "mt-2 cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4 mr-2" }),
												" ",
												uploading ? "Uploading..." : "Select File"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											className: "hidden",
											accept: ".pdf,.doc,.docx",
											onChange: handleResumeUpload,
											disabled: uploading
										})]
									})
								]
							})]
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
					children: "You have unsaved changes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: handleSave,
					disabled: saving,
					className: "bg-aurora hover:bg-aurora/90 text-background px-8 rounded-xl font-bold tracking-wide",
					children: saving ? "Saving..." : "Save Profile"
				})]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
