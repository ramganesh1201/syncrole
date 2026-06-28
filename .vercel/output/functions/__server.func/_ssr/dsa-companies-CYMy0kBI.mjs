import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { bt as Briefcase, ft as Check, kt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dsa-companies-CYMy0kBI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DSACompaniesPage() {
	const [companies, setCompanies] = (0, import_react.useState)([]);
	const [userFocus, setUserFocus] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function load() {
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		const uid = u.user.id;
		const [compRes, focusRes] = await Promise.all([supabase.from("company_question_sets").select("*").order("company_name"), supabase.from("user_company_focus").select("company_id").eq("user_id", uid)]);
		setCompanies(compRes.data ?? []);
		setUserFocus(new Set((focusRes.data ?? []).map((f) => f.company_id)));
		setLoading(false);
	}
	async function toggleCompany(companyId) {
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		const isSelected = userFocus.has(companyId);
		if (isSelected) {
			await supabase.from("user_company_focus").delete().eq("company_id", companyId).eq("user_id", u.user.id);
			const newFocus = new Set(userFocus);
			newFocus.delete(companyId);
			setUserFocus(newFocus);
		} else {
			await supabase.from("user_company_focus").insert({
				company_id: companyId,
				user_id: u.user.id
			});
			setUserFocus(new Set([...userFocus, companyId]));
		}
		toast.success(isSelected ? "Company removed" : "Company added");
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid place-items-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard/dsa",
				className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back to DSA Command Center"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-bold",
				children: "Target Companies"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Select companies to focus your preparation on."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-2 gap-4",
				children: companies.map((company, idx) => {
					const selected = userFocus.has(company.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						initial: {
							opacity: 0,
							scale: .9
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: { delay: idx * .05 },
						onClick: () => toggleCompany(company.id),
						className: `relative rounded-2xl p-6 text-left transition group ${selected ? "bg-gradient-to-br from-aurora/30 to-aurora/10 border border-aurora/50" : "glass-strong hover:bg-white/10"}`,
						children: [selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-3 right-3 rounded-full bg-aurora p-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary-foreground" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-lg bg-white/10 grid place-items-center mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-5 w-5 text-aurora" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display font-bold text-lg",
										children: company.company_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground mt-1",
										children: company.description ?? "Target company prep"
									}),
									company.focus_topics?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: company.focus_topics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white/5 px-2 py-1 text-[11px]",
											children: topic
										}, topic))
									}) : null
								]
							})]
						})]
					}, company.id);
				})
			}),
			userFocus.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass-strong rounded-2xl p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-display font-bold",
					children: [
						"Selected Companies (",
						userFocus.size,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: companies.filter((c) => userFocus.has(c.id)).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full bg-aurora/20 px-3 py-1 text-sm",
						children: [
							c.company_name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleCompany(c.id),
								className: "text-aurora hover:text-aurora/80",
								children: "×"
							})
						]
					}, c.id))
				})]
			})
		]
	});
}
//#endregion
export { DSACompaniesPage as component };
