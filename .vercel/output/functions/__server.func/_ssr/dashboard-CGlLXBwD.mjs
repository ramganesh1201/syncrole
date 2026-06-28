import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { a as profileCompletionPct, i as levelProgress, n as MISSION_TEMPLATES, r as XP, t as ACHIEVEMENT_CATALOG } from "./syncrole-BmVv4SfO.mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
import { A as MapPin, At as Activity, Et as Award, G as Flame, O as MessageSquare, Ot as ArrowRight, P as LoaderCircle, Q as Cpu, W as Github, Y as FileText, _ as Star, d as Trophy, ft as Check, g as Target, l as Upload, p as TrendingUp, t as Zap, tt as CodeXml, v as Sparkles, w as Rocket, xt as Brain } from "../_libs/lucide-react.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { extractTextFromPDF } from "./pdf-FGxUDQXw.mjs";
import { a as XAxis, h as Tooltip, i as YAxis, m as ResponsiveContainer, o as Line, r as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CGlLXBwD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const nav = useNavigate();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [xp, setXp] = (0, import_react.useState)({
		total_xp: 0,
		level: 1,
		level_name: "Career Explorer"
	});
	const [streak, setStreak] = (0, import_react.useState)({
		current_streak: 0,
		longest_streak: 0
	});
	const [scores, setScores] = (0, import_react.useState)([]);
	const [missions, setMissions] = (0, import_react.useState)([]);
	const [achs, setAchs] = (0, import_react.useState)([]);
	const [gh, setGh] = (0, import_react.useState)(null);
	const [resume, setResume] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [interviewSessions, setInterviewSessions] = (0, import_react.useState)([]);
	const [recentConversations, setRecentConversations] = (0, import_react.useState)([]);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function loadAll() {
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		const uid = u.user.id;
		const [pRes, xRes, sRes, scRes, mRes, aRes, ghRes, rRes, ivRes, cvRes, oldRes] = await Promise.all([
			supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
			supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
			supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle(),
			supabase.from("placement_scores").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(30),
			supabase.from("daily_missions").select("*").eq("user_id", uid).eq("mission_date", (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).order("created_at"),
			supabase.from("achievements").select("code").eq("user_id", uid),
			supabase.from("github_analysis").select("*").eq("user_id", uid).maybeSingle(),
			supabase.from("resume_versions").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(1).maybeSingle(),
			supabase.from("interview_sessions").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(5),
			supabase.from("ai_conversations").select("id, mode, title, updated_at").eq("user_id", uid).order("updated_at", { ascending: false }).limit(5),
			supabase.from("resume_analysis").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(1).maybeSingle()
		]);
		if (pRes.data && !pRes.data.onboarding_completed) {
			nav({ to: "/onboarding" });
			return;
		}
		setProfile(pRes.data);
		if (xRes.data) setXp(xRes.data);
		if (sRes.data) setStreak(sRes.data);
		setScores(scRes.data ?? []);
		setAchs((aRes.data ?? []).map((a) => a.code));
		setGh(ghRes.data);
		setResume(rRes.data || oldRes.data);
		setInterviewSessions(ivRes?.data ?? []);
		setRecentConversations(cvRes?.data ?? []);
		let todaysMissions = mRes.data ?? [];
		if (todaysMissions.length === 0) {
			const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
			const inserts = [...MISSION_TEMPLATES].sort(() => Math.random() - .5).slice(0, 3).map((m) => ({
				user_id: uid,
				mission_date: today,
				...m
			}));
			const { data } = await supabase.from("daily_missions").insert(inserts).select();
			todaysMissions = data ?? [];
		}
		setMissions(todaysMissions);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		loadAll();
	}, []);
	(0, import_react.useEffect)(() => {
		const ch = supabase.channel("dashboard-live").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "placement_scores"
		}, loadAll).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "achievements"
		}, loadAll).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "xp_levels"
		}, loadAll).subscribe();
		return () => {
			supabase.removeChannel(ch);
		};
	}, []);
	const latest = scores[0] ?? {
		total_score: 0,
		resume_score: 0,
		github_score: 0,
		projects_score: 0,
		dsa_score: 0,
		communication_score: 60,
		skill_score: 0
	};
	const prev = scores[1];
	const delta = prev ? latest.total_score - prev.total_score : 0;
	const lp = levelProgress(xp.total_xp);
	const completion = (0, import_react.useMemo)(() => profile ? profileCompletionPct(profile) : 0, [profile]);
	const chartData = [...scores].reverse().map((s, i) => ({
		x: i,
		y: s.total_score
	}));
	async function completeMission(m) {
		const { data: u } = await supabase.auth.getUser();
		if (!u.user) return;
		await supabase.from("daily_missions").update({
			completed: true,
			completed_at: (/* @__PURE__ */ new Date()).toISOString(),
			progress: m.target
		}).eq("id", m.id);
		await supabase.rpc("award_xp", {
			_user: u.user.id,
			_type: "mission_complete",
			_xp: m.xp_reward,
			_meta: { code: m.code }
		});
		await supabase.from("notifications").insert({
			user_id: u.user.id,
			title: "Mission complete 🎯",
			body: `+${m.xp_reward} XP — ${m.title}`,
			type: "mission"
		});
		toast.success(`+${m.xp_reward} XP`);
		loadAll();
	}
	const handleUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		toast.loading("Uploading resume...", { id: "upload" });
		try {
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) throw new Error("Not logged in");
			const ext = file.name.split(".").pop();
			const path = `${u.user.id}/${Date.now()}.${ext}`;
			const { error: uploadErr } = await supabase.storage.from("resumes").upload(path, file);
			if (uploadErr) throw uploadErr;
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
			toast.success("Resume uploaded successfully", { id: "upload" });
			loadAll();
		} catch (e) {
			toast.error(e.message, { id: "upload" });
		} finally {
			setUploading(false);
		}
	};
	async function analyzeGitHub() {
		const username = profile?.github_username;
		if (!username) return toast.error("Add your GitHub username in profile first");
		toast.loading("Analyzing GitHub…", { id: "gh" });
		try {
			const [userRes, repoRes] = await Promise.all([fetch(`https://api.github.com/users/${username}`).then((r) => r.json()), fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`).then((r) => r.json())]);
			if (userRes.message === "Not Found") throw new Error("GitHub user not found");
			const repos = Array.isArray(repoRes) ? repoRes : [];
			const stars = repos.reduce((s, r) => s + (r.stargazers_count ?? 0), 0);
			const langs = {};
			repos.forEach((r) => {
				if (r.language) langs[r.language] = (langs[r.language] ?? 0) + 1;
			});
			const score = Math.min(100, repos.length * 4 + stars * 2 + (userRes.followers ?? 0));
			const { data: u } = await supabase.auth.getUser();
			if (!u.user) return;
			await supabase.from("github_analysis").upsert({
				user_id: u.user.id,
				username,
				repo_count: repos.length,
				star_count: stars,
				follower_count: userRes.followers ?? 0,
				languages: langs,
				score,
				strengths: Object.keys(langs).slice(0, 3),
				weaknesses: stars < 5 ? ["Low star count — add documentation"] : [],
				recommendations: [
					"Pin top 6 projects",
					"Add READMEs with screenshots",
					"Push consistently"
				],
				analyzed_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			await supabase.from("achievements").insert({
				user_id: u.user.id,
				code: "github_connected"
			}).then(() => {});
			await supabase.rpc("award_xp", {
				_user: u.user.id,
				_type: "github_connected",
				_xp: XP.GITHUB_CONNECT,
				_meta: {}
			});
			await supabase.rpc("recompute_placement", { _user: u.user.id });
			toast.success("GitHub analyzed", { id: "gh" });
			loadAll();
		} catch (e) {
			toast.error(e.message, { id: "gh" });
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid place-items-center min-h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-aurora" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-widest text-muted-foreground",
					children: "Welcome back"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl md:text-4xl font-bold mt-1",
					children: [
						"Hey ",
						profile?.full_name?.split(" ")[0] ?? "there",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-aurora",
							children: "👋"
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							icon: Flame,
							label: `${streak.current_streak}-day streak`,
							accent: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							icon: Trophy,
							label: `${xp.level_name} · Lv ${xp.level}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, {
							icon: Zap,
							label: `${xp.total_xp} XP`
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: Rocket,
					children: "Career Journey"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground uppercase tracking-widest",
					children: "AI-mapped trajectory"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-5 left-5 right-5 h-0.5 bg-white/8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute top-5 left-5 h-0.5",
						style: { background: "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.72 0.22 295))" },
						initial: { width: 0 },
						animate: { width: `${Math.min(latest.total_score, 100)}%` },
						transition: {
							duration: 1.5,
							ease: "easeOut",
							delay: .5
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative grid grid-cols-4 gap-2",
						children: [
							{
								label: "Current",
								sub: profile?.college?.split(" ")[0] ?? "Student",
								icon: MapPin,
								color: "oklch(0.75 0.2 200)",
								active: true
							},
							{
								label: "Next Milestone",
								sub: latest.total_score < 50 ? "70+ Readiness" : "Interview Ready",
								icon: Activity,
								color: "oklch(0.88 0.18 60)",
								active: latest.total_score >= 30
							},
							{
								label: "Target Role",
								sub: profile?.career_goal?.split(" ").slice(0, 3).join(" ") ?? "SDE-1",
								icon: Cpu,
								color: "oklch(0.72 0.22 295)",
								active: latest.total_score >= 60
							},
							{
								label: "Dream Company",
								sub: "Offer Received",
								icon: Star,
								color: "oklch(0.88 0.20 60)",
								active: latest.total_score >= 80
							}
						].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .3 + i * .1 },
							className: "flex flex-col items-center text-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `relative h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all ${step.active ? "ring-2 ring-offset-2 ring-offset-transparent" : "opacity-35"}`,
								style: {
									background: step.active ? `radial-gradient(circle, ${step.color} 40%, transparent 100%)` : "oklch(1 0 0 / 5%)",
									border: `1px solid ${step.color}`
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "h-4 w-4 text-white" }), step.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-0 rounded-full animate-ping opacity-20",
									style: { background: step.color }
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold text-white/80",
								children: step.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground leading-tight",
								children: step.sub
							})] })]
						}, i))
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: Activity,
					children: "Recent Activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-2",
					children: [[
						...achs.slice(-3).map((code, i) => ({
							icon: Award,
							color: "text-yellow-400",
							label: `Achievement unlocked: ${code.replace(/_/g, " ")}`,
							time: "Recent"
						})),
						...recentConversations.slice(0, 2).map((c) => ({
							icon: MessageSquare,
							color: "text-cyan-400",
							label: `SyncPilot • ${c.title || "Conversation"}`,
							time: new Date(c.updated_at).toLocaleDateString()
						})),
						...interviewSessions.slice(0, 2).map((s) => ({
							icon: Brain,
							color: "text-violet-400",
							label: `Interview • ${s.company || "Practice"} — Score ${s.score}`,
							time: new Date(s.created_at).toLocaleDateString()
						})),
						...scores.length > 0 ? [{
							icon: TrendingUp,
							color: "text-emerald-400",
							label: `Placement score updated → ${latest.total_score}/100`,
							time: new Date(scores[0]?.created_at).toLocaleDateString()
						}] : []
					].slice(0, 5).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: -8
						},
						animate: {
							opacity: 1,
							x: 0
						},
						transition: { delay: .1 * i },
						className: "flex items-center gap-3 glass rounded-xl px-3 py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: `h-4 w-4 flex-shrink-0 ${item.color}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-white/80 truncate",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] text-muted-foreground",
								children: item.time
							})]
						})]
					}, i)), achs.length === 0 && recentConversations.length === 0 && interviewSessions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground text-center py-4",
						children: "Complete missions to build your activity feed"
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: Sparkles,
						children: "Future Prediction"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20",
						children: "AI Model"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [[
						{
							label: "Placement Probability",
							value: Math.min(100, Math.round(latest.total_score * 1.1)),
							suffix: "%",
							color: "oklch(0.75 0.2 200)",
							sub: latest.total_score >= 70 ? "High confidence" : "Improving"
						},
						{
							label: "Expected CTC Range",
							value: latest.total_score >= 70 ? "₹12-18 LPA" : latest.total_score >= 45 ? "₹6-10 LPA" : "₹4-7 LPA",
							isText: true,
							color: "oklch(0.88 0.18 145)",
							sub: "Based on market data"
						},
						{
							label: "Offer Timeline",
							value: latest.total_score >= 75 ? "1-2 months" : latest.total_score >= 50 ? "3-5 months" : "6+ months",
							isText: true,
							color: "oklch(0.88 0.18 60)",
							sub: "If current pace maintained"
						}
					].map((pred, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: .15 * i },
						className: "glass rounded-xl p-3 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-white/60",
							children: pred.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] text-muted-foreground mt-0.5",
							children: pred.sub
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-base font-bold font-mono",
							style: { color: pred.color },
							children: pred.isText ? pred.value : `${pred.value}${pred.suffix}`
						})]
					}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-muted-foreground text-center pt-1",
						children: "Ask SyncPilot \"What if I solve 100 more DSA problems?\" for simulation"
					})]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-3 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:col-span-2 row-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
									icon: Target,
									children: "Placement Readiness"
								}), delta !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `text-xs inline-flex items-center gap-1 ${delta > 0 ? "text-[oklch(0.88_0.18_145)]" : "text-destructive"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }),
										" ",
										delta > 0 ? "+" : "",
										delta,
										" pts"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRing, { value: latest.total_score }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 space-y-2",
									children: [
										{
											l: "Resume",
											v: latest.resume_score,
											i: FileText
										},
										{
											l: "GitHub",
											v: latest.github_score,
											i: Github
										},
										{
											l: "DSA",
											v: latest.dsa_score,
											i: Brain
										},
										{
											l: "Skills",
											v: latest.skill_score,
											i: Sparkles
										}
									].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.i, { className: "h-3.5 w-3.5 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs w-20 text-muted-foreground",
												children: b.l
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-full bg-aurora",
													style: { width: `${b.v}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs font-mono w-8 text-right",
												children: b.v
											})
										]
									}, b.l))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 h-32",
								children: chartData.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
										data: chartData,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "sg",
												x1: "0",
												y1: "0",
												x2: "1",
												y2: "0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "oklch(0.75 0.20 200)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "oklch(0.72 0.22 295)"
												})]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "x",
												hide: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												hide: true,
												domain: [0, 100]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												background: "rgba(0,0,0,0.8)",
												border: "1px solid rgba(255,255,255,0.1)",
												borderRadius: 12
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
												type: "monotone",
												dataKey: "y",
												stroke: "url(#sg)",
												strokeWidth: 2.5,
												dot: false
											})
										]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full grid place-items-center text-xs text-muted-foreground",
									children: "More activity = better trend graph"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: Zap,
						children: "Level Progress"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-2xl font-bold",
								children: lp.cur.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: [
									"Level ",
									lp.cur.lvl,
									lp.next && ` — ${lp.toNext} XP to ${lp.next.name}`
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 h-2 rounded-full bg-white/5 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "h-full bg-aurora",
									initial: { width: 0 },
									animate: { width: `${lp.pct}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [xp.total_xp, " XP"]
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
							icon: Check,
							children: "Profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RingMini, { value: completion }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-2xl font-bold",
								children: [completion, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "complete"
							})] })]
						}),
						completion < 100 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/onboarding",
							className: "mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline",
							children: ["Complete now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
							icon: Flame,
							children: "Current Streak"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								animate: { scale: [
									1,
									1.08,
									1
								] },
								transition: {
									repeat: Infinity,
									duration: 2
								},
								className: "font-display text-5xl font-bold text-aurora",
								children: streak.current_streak
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: "days"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mt-2",
							children: [
								"Longest: ",
								streak.longest_streak,
								" days"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "md:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
								icon: Target,
								children: "Today's Missions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [
									missions.filter((m) => m.completed).length,
									"/",
									missions.length
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2",
							children: [missions.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `glass rounded-xl p-3 flex items-center gap-3 ${m.completed ? "opacity-60" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => !m.completed && completeMission(m),
										className: `h-7 w-7 rounded-full grid place-items-center transition ${m.completed ? "bg-aurora" : "glass hover:bg-white/15"}`,
										children: m.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `text-sm font-medium ${m.completed ? "line-through" : ""}`,
											children: m.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											children: m.description
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs font-mono text-accent",
										children: [
											"+",
											m.xp_reward,
											" XP"
										]
									})
								]
							}, m.id)), missions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Refresh tomorrow for new missions 🌅"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: CodeXml,
						children: "DSA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-bold",
								children: latest.dsa_score
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "DSA score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard/dsa",
								className: "mt-3 inline-flex items-center gap-1 text-xs text-accent hover:underline",
								children: ["Open tracker ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: Github,
					children: "GitHub Analysis"
				}), gh ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl font-bold text-aurora",
								children: gh.score
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: ["@", gh.username]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-3 gap-3 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Repos",
									value: gh.repo_count
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Stars",
									value: gh.star_count
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Followers",
									value: gh.follower_count
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-xs text-muted-foreground",
							children: ["Top: ", Object.keys(gh.languages || {}).slice(0, 3).join(" · ") || "—"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: analyzeGitHub,
							className: "mt-3 text-xs text-accent hover:underline",
							children: "Re-analyze"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Connect GitHub to analyze your projects, languages, and activity."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: analyzeGitHub,
						className: "mt-3 glass rounded-full px-4 py-2 text-sm hover:bg-white/10",
						children: "Analyze now"
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						icon: FileText,
						children: "Resume Intelligence"
					}), resume ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex-1 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-3xl font-bold text-aurora",
									children: resume.total_score
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground uppercase tracking-widest",
									children: "Overall Score"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-2 gap-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "ATS Score",
									value: resume.ats_score
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Keywords",
									value: resume.keyword_match
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-[10px] text-muted-foreground flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Last analyzed: ", new Date(resume.created_at).toLocaleDateString()] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-white/5 px-2 py-0.5 rounded-full border border-white/10",
									children: "Latest Version"
								})]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/resume-intelligence",
							className: "mt-5 relative w-full block text-center rounded-xl py-2.5 text-sm font-semibold overflow-hidden group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-aurora/10 group-hover:bg-aurora/20 transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 border border-aurora/30 rounded-xl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex items-center justify-center gap-2 text-aurora",
									children: ["Open Resume Intelligence ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex-1 flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Upload your resume to unlock AI-powered Resume Intelligence and real ATS scoring."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-5 w-full block text-center glass rounded-xl py-2.5 text-sm hover:bg-white/10 transition-colors cursor-pointer relative overflow-hidden group",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-aurora/10 group-hover:bg-aurora/20 transition-colors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "relative flex items-center justify-center gap-2 text-aurora font-semibold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }),
										" ",
										uploading ? "Uploading..." : "Upload Resume"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: ".pdf,.doc,.docx",
									className: "hidden",
									onChange: handleUpload,
									disabled: uploading
								})
							]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
					icon: Award,
					children: "Achievements"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [
						achs.length,
						"/",
						Object.keys(ACHIEVEMENT_CATALOG).length,
						" unlocked"
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3",
				children: Object.entries(ACHIEVEMENT_CATALOG).map(([code, a]) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `glass rounded-2xl p-3 text-center ${achs.includes(code) ? "" : "opacity-30 grayscale"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl",
							children: a.emoji
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xs font-medium truncate",
							children: a.name
						})]
					}, code);
				})
			})] })
		]
	}) });
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `relative glass-strong rounded-3xl p-5 ${className}`,
		children
	});
}
function SectionLabel({ icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[10px] font-medium text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "uppercase tracking-widest",
			children
		})]
	});
}
function Pill({ icon: Icon, label, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${accent ? "bg-aurora text-primary-foreground" : "glass"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
			" ",
			label
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-lg font-bold",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] text-muted-foreground uppercase",
			children: label
		})]
	});
}
function ScoreRing({ value }) {
	const r = 52;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-32 w-32 shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 120",
			className: "-rotate-90 h-full w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "rg",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "oklch(0.75 0.20 200)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "oklch(0.72 0.22 330)"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "60",
					cy: "60",
					r,
					stroke: "oklch(1 0 0 / 0.08)",
					strokeWidth: "9",
					fill: "none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.circle, {
					cx: "60",
					cy: "60",
					r,
					stroke: "url(#rg)",
					strokeWidth: "9",
					fill: "none",
					strokeLinecap: "round",
					strokeDasharray: c,
					initial: { strokeDashoffset: c },
					animate: { strokeDashoffset: c - c * value / 100 },
					transition: {
						duration: 1.4,
						ease: "easeOut"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-3xl font-bold text-aurora",
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-widest text-muted-foreground",
					children: "/100"
				})]
			})
		})]
	});
}
function RingMini({ value }) {
	const r = 24;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 60 60",
		className: "h-16 w-16 -rotate-90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "30",
			cy: "30",
			r,
			stroke: "oklch(1 0 0 / 0.08)",
			strokeWidth: "5",
			fill: "none"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "30",
			cy: "30",
			r,
			stroke: "url(#rg)",
			strokeWidth: "5",
			fill: "none",
			strokeLinecap: "round",
			strokeDasharray: c,
			strokeDashoffset: c - c * value / 100
		})]
	});
}
//#endregion
export { Dashboard as component };
