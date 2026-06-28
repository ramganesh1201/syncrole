import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { r as XP } from "./syncrole-BmVv4SfO.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { H as GraduationCap, Ot as ArrowRight, P as LoaderCircle, W as Github, Y as FileText, ft as Check, g as Target, kt as ArrowLeft, v as Sparkles } from "../_libs/lucide-react.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-CLocEfj6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOALS = [
	{
		v: "frontend",
		label: "Frontend Developer"
	},
	{
		v: "backend",
		label: "Backend Developer"
	},
	{
		v: "fullstack",
		label: "Full Stack Developer"
	},
	{
		v: "data",
		label: "Data Analyst"
	},
	{
		v: "ai",
		label: "AI Engineer"
	},
	{
		v: "mobile",
		label: "Mobile Developer"
	},
	{
		v: "devops",
		label: "DevOps / Cloud"
	}
];
var SKILL_OPTIONS = [
	"React",
	"TypeScript",
	"Node.js",
	"Python",
	"Java",
	"C++",
	"SQL",
	"AWS",
	"Docker",
	"Tailwind",
	"Next.js",
	"FastAPI",
	"PyTorch",
	"TensorFlow",
	"Go",
	"Rust",
	"Kotlin",
	"Swift",
	"GraphQL",
	"MongoDB"
];
function Onboarding() {
	const nav = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		college: "",
		branch: "",
		graduation_year: (/* @__PURE__ */ new Date()).getFullYear() + 1,
		cgpa: 8,
		career_goal: "fullstack",
		skills: [],
		github_username: ""
	});
	(0, import_react.useEffect)(() => {
		supabase.from("profiles").select("*").maybeSingle().then(({ data }) => {
			if (data?.onboarding_completed) {
				console.log("[DEBUG: Onboarding Redirect]", {
					userId: data.user_id,
					onboarding_completed: data.onboarding_completed,
					reason: "User already completed profile, redirecting away from onboarding to prevent loop"
				});
				nav({ to: "/dashboard" });
			}
			if (data) setForm((f) => ({
				...f,
				...Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))
			}));
		});
	}, [nav]);
	const steps = [
		"About you",
		"Career goal",
		"Your skills",
		"GitHub",
		"Resume",
		"Finish"
	];
	async function finish() {
		setBusy(true);
		try {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) throw new Error("Not signed in");
			const { error } = await supabase.from("profiles").update({
				full_name: form.full_name,
				college: form.college,
				branch: form.branch,
				graduation_year: Number(form.graduation_year),
				cgpa: Number(form.cgpa),
				career_goal: form.career_goal,
				skills: form.skills,
				github_username: form.github_username || null,
				onboarding_completed: true
			}).eq("user_id", u.user.id);
			if (error) throw error;
			await supabase.rpc("award_xp", {
				_user: u.user.id,
				_type: "onboarding_completed",
				_xp: XP.PROFILE_COMPLETE,
				_meta: {}
			});
			await supabase.from("achievements").insert({
				user_id: u.user.id,
				code: "profile_completed"
			}).then(() => {});
			await supabase.rpc("recompute_placement", { _user: u.user.id });
			toast.success("Welcome aboard 🚀");
			nav({ to: "/dashboard" });
		} catch (e) {
			toast.error(e.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "relative min-h-[calc(100vh-4rem)] px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-between text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Step ",
						step + 1,
						" of ",
						steps.length
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round((step + 1) / steps.length * 100), "%"] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1 rounded-full bg-white/5 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "h-full bg-aurora",
						animate: { width: `${(step + 1) / steps.length * 100}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 relative rounded-3xl p-px",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-3xl bg-aurora opacity-40 blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-[23px] glass-strong p-8 min-h-[420px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									x: 20
								},
								animate: {
									opacity: 1,
									x: 0
								},
								exit: {
									opacity: 0,
									x: -20
								},
								children: [
									step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
										title: "Tell us about you",
										icon: GraduationCap,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												label: "Full name",
												value: form.full_name,
												onChange: (v) => setForm({
													...form,
													full_name: v
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												label: "College",
												value: form.college,
												onChange: (v) => setForm({
													...form,
													college: v
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													label: "Branch",
													value: form.branch,
													onChange: (v) => setForm({
														...form,
														branch: v
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													label: "Graduation Year",
													type: "number",
													value: String(form.graduation_year),
													onChange: (v) => setForm({
														...form,
														graduation_year: Number(v)
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												label: "CGPA",
												type: "number",
												value: String(form.cgpa),
												onChange: (v) => setForm({
													...form,
													cgpa: Number(v)
												})
											})
										]
									}),
									step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
										title: "What's your career goal?",
										icon: Target,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid sm:grid-cols-2 gap-3 mt-2",
											children: GOALS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setForm({
													...form,
													career_goal: g.v
												}),
												className: `text-left rounded-2xl p-4 transition ${form.career_goal === g.v ? "bg-aurora text-primary-foreground" : "glass hover:bg-white/10"}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold",
													children: g.label
												})
											}, g.v))
										})
									}),
									step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
										title: "Pick your current skills",
										icon: Sparkles,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2 mt-2",
											children: SKILL_OPTIONS.map((s) => {
												const on = form.skills.includes(s);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => setForm({
														...form,
														skills: on ? form.skills.filter((x) => x !== s) : [...form.skills, s]
													}),
													className: `rounded-full px-4 py-2 text-sm transition ${on ? "bg-aurora text-primary-foreground" : "glass hover:bg-white/10"}`,
													children: [on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "inline h-3.5 w-3.5 mr-1" }), s]
												}, s);
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-3 text-xs text-muted-foreground",
											children: [form.skills.length, " selected"]
										})]
									}),
									step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
										title: "Connect your GitHub",
										icon: Github,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											label: "GitHub username",
											value: form.github_username,
											onChange: (v) => setForm({
												...form,
												github_username: v
											}),
											placeholder: "octocat"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "We'll analyze your repos, languages, and activity to compute your GitHub score."
										})]
									}),
									step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
										title: "Upload your resume",
										icon: FileText,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "You can skip this and upload it later from the dashboard."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeUpload, { onUploaded: () => toast.success("Resume saved") })]
									}),
									step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
										title: "You're all set",
										icon: Sparkles,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "We'll generate your personalized placement score and daily missions in your dashboard."
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 grid grid-cols-2 gap-3 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
													label: "College",
													value: form.college || "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
													label: "Goal",
													value: GOALS.find((g) => g.v === form.career_goal)?.label || "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
													label: "Skills",
													value: `${form.skills.length} selected`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
													label: "GitHub",
													value: form.github_username || "—"
												})
											]
										})]
									})
								]
							}, step)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: step === 0,
								onClick: () => setStep(step - 1),
								className: "glass rounded-full px-4 py-2 text-sm inline-flex items-center gap-1 disabled:opacity-30",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back"]
							}), step < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setStep(step + 1),
								className: "relative rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative inline-flex items-center gap-1",
									children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: busy,
								onClick: finish,
								className: "relative rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground overflow-hidden disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative inline-flex items-center gap-1",
									children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Generate my Placement Score ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })] })
								})]
							})]
						})]
					})]
				})
			]
		})
	});
}
function Section({ title, icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-accent" }), " ONBOARDING"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 pt-2",
				children
			})
		]
	});
}
function Input({ label, value, onChange, type = "text", placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			onChange: (e) => onChange(e.target.value),
			placeholder,
			className: "mt-1 w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent/50"
		})]
	});
}
function Summary({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-medium truncate",
			children: value
		})]
	});
}
function ResumeUpload({ onUploaded }) {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)(null);
	async function upload(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		setBusy(true);
		try {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) return;
			const path = `${u.user.id}/${Date.now()}-${file.name}`;
			const { error } = await supabase.storage.from("resumes").upload(path, file, { upsert: true });
			if (error) throw error;
			const { extractTextFromPDF } = await import("./pdf-FGxUDQXw.mjs");
			const resumeText = await extractTextFromPDF(file);
			const { data: classData, error: classErr } = await supabase.functions.invoke("resume-intelligence", { body: {
				action: "classify",
				resumeText
			} });
			if (classErr) throw classErr;
			const document_type = classData.document_type || "Unknown";
			const { data: existingVersions } = await supabase.from("resume_versions").select("version_number").eq("user_id", u.user.id).order("version_number", { ascending: false }).limit(1);
			const version_number = existingVersions && existingVersions.length > 0 ? (existingVersions[0].version_number || 0) + 1 : 1;
			let insertData = {
				user_id: u.user.id,
				file_path: path,
				file_name: file.name,
				extracted_text: resumeText,
				document_type,
				version_number
			};
			if (document_type === "Resume") {
				const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", { body: {
					action: "ats_scan",
					resumeText
				} });
				if (aiErr) throw aiErr;
				insertData = {
					...insertData,
					ats_score: aiRes.ats_score,
					keyword_match: aiRes.keyword_match,
					formatting_score: aiRes.formatting_score,
					project_score: aiRes.project_score,
					total_score: aiRes.total_score,
					suggestions: aiRes.suggestions,
					missing_skills: aiRes.missing_skills
				};
			} else {
				const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", { body: {
					action: "analyze_document",
					resumeText
				} });
				if (aiErr) throw aiErr;
				insertData = {
					...insertData,
					analysis_results: aiRes,
					ats_score: 0,
					keyword_match: 0,
					formatting_score: 0,
					project_score: 0,
					total_score: 0
				};
			}
			await supabase.from("resume_versions").insert(insertData);
			await supabase.from("achievements").insert({
				user_id: u.user.id,
				code: "resume_uploaded"
			}).then(() => {});
			await supabase.rpc("award_xp", {
				_user: u.user.id,
				_type: "resume_uploaded",
				_xp: XP.RESUME_UPLOAD,
				_meta: {}
			});
			await supabase.rpc("recompute_placement", { _user: u.user.id });
			setName(file.name);
			onUploaded();
		} catch (e) {
			toast.error(e.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-3 block cursor-pointer rounded-2xl border-2 border-dashed border-white/15 px-6 py-10 text-center hover:bg-white/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "file",
			accept: ".pdf,.doc,.docx",
			className: "hidden",
			onChange: upload,
			disabled: busy
		}), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto h-6 w-6 animate-spin" }) : name ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mx-auto h-6 w-6 text-[oklch(0.88_0.18_145)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-sm",
			children: name
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto h-6 w-6 text-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm font-medium",
				children: "Drop your resume here"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: "PDF, DOC, DOCX"
			})
		] })]
	});
}
//#endregion
export { Onboarding as component };
