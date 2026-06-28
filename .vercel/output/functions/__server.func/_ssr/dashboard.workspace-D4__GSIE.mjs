import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { I as LayoutDashboard, M as LogOut, Tt as Bell, Y as FileText, bt as Briefcase, ht as Calendar, k as Menu, mt as ChartColumn, n as X, s as User, tt as CodeXml, v as Sparkles, xt as Brain } from "../_libs/lucide-react.mjs";
import { d as Outlet, h as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard.workspace-D4__GSIE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardWorkspaceLayout() {
	const router = useRouter();
	const [isMobile, setIsMobile] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const update = () => setIsMobile(mq.matches);
		update();
		if (typeof mq.addEventListener === "function") {
			mq.addEventListener("change", update);
			return () => mq.removeEventListener("change", update);
		}
		mq.addListener(update);
		return () => mq.removeListener(update);
	}, []);
	const [unread, setUnread] = (0, import_react.useState)(0);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		async function load() {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) return;
			const [profileRes, notifRes] = await Promise.all([supabase.from("profiles").select("*", { count: "exact" }).eq("user_id", u.user.id).maybeSingle(), supabase.from("notifications").select("id", { count: "exact" }).eq("read", false)]);
			if (!alive) return;
			setProfile(profileRes.data ?? null);
			setUnread(notifRes.data?.length ?? 0);
		}
		load();
		const ch = supabase.channel("workspace-notifs").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "notifications"
		}, () => {
			supabase.from("notifications").select("id", { count: "exact" }).eq("read", false).then((r) => alive && setUnread(r.data?.length ?? 0));
		}).subscribe();
		return () => {
			alive = false;
			supabase.removeChannel(ch);
		};
	}, []);
	const navItems = (0, import_react.useMemo)(() => {
		return [
			{
				to: "/dashboard/overview",
				label: "Overview",
				Icon: LayoutDashboard
			},
			{
				to: "/dashboard/dsa",
				label: "DSA",
				Icon: CodeXml
			},
			{
				to: "/dashboard/dsa/mentor",
				label: "AI Mentor",
				Icon: Brain
			},
			{
				to: "/dashboard/resume",
				label: "Resume",
				Icon: FileText
			},
			{
				to: "/dashboard/interviews",
				label: "Interview Prep",
				Icon: Calendar
			},
			{
				to: "/dashboard/applications",
				label: "Applications",
				Icon: Briefcase
			},
			{
				to: "/dashboard/analytics",
				label: "Analytics",
				Icon: ChartColumn
			}
		];
	}, []);
	const activePath = router.state.location.pathname;
	function isActive(to) {
		if (to === "/dashboard/overview") return activePath === "/dashboard" || activePath === "/dashboard/overview";
		return activePath === to || activePath.startsWith(to + "/");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed top-4 right-4 z-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-10 w-10 rounded-full glass grid place-items-center",
					onClick: () => setDrawerOpen((v) => !v),
					"aria-label": "Open navigation",
					children: drawerOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: isMobile && drawerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 bg-black/40 z-40",
				onClick: () => setDrawerOpen(false)
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen",
				children: [
					!isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "w-[280px] shrink-0 border-r border-white/5 bg-background/70 backdrop-blur-xl sticky top-0 h-screen",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
							navItems,
							activePath,
							isActive,
							profile,
							unread,
							onNavigate: (to) => router.navigate({ to })
						})
					}),
					isMobile && drawerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.aside, {
						initial: { x: "-100%" },
						animate: { x: 0 },
						exit: { x: "-100%" },
						transition: {
							type: "spring",
							stiffness: 260,
							damping: 26
						},
						className: "fixed left-0 top-0 bottom-0 w-[280px] z-50 border-r border-white/5 bg-background/90 backdrop-blur-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
							navItems,
							activePath,
							isActive,
							profile,
							unread,
							onNavigate: (to) => {
								setDrawerOpen(false);
								router.navigate({ to });
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
							className: "sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/dashboard",
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-8 w-8",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-lg bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-[3px] rounded-md bg-background grid place-items-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-aurora" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-lg font-semibold",
										children: "SyncRole"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "relative h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/10",
											"aria-label": "Notifications",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-aurora text-[10px] font-bold grid place-items-center",
												children: unread
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "hidden md:flex items-center gap-2 rounded-full glass px-3 py-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: profile?.full_name ?? "User"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoutButton, {})
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto max-w-7xl px-4 md:px-6 py-8 h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
										transition: { duration: .18 },
										className: "h-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
									}, router.state.location.pathname)
								})
							})
						})]
					})
				]
			})
		]
	});
}
function Sidebar({ navItems, activePath, isActive, profile, unread, onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-full flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "flex-1 px-2 pb-4 overflow-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: navItems.map(({ to, label, Icon }) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onNavigate(to),
						className: `w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${isActive(to) ? "bg-white/10 text-foreground border border-white/10" : "text-muted-foreground hover:bg-white/5"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: label
						})]
					}, to);
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4 border-t border-white/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-widest text-muted-foreground",
						children: "Profile"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm font-medium truncate",
						children: profile?.full_name ?? "User"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-muted-foreground" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -top-1 -right-2 h-4 min-w-4 px-1 rounded-full bg-aurora text-[10px] font-bold grid place-items-center",
						children: unread
					})]
				})]
			})
		})]
	});
}
function LogoutButton() {
	const router = useRouter();
	async function signOut() {
		await supabase.auth.signOut();
		router.navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: signOut,
		className: "h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/10",
		title: "Sign out",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
	});
}
//#endregion
export { DashboardWorkspaceLayout as component };
