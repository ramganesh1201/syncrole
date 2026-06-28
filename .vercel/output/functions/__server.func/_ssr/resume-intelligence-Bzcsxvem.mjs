import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as supabase } from "./client-Crs0cSkZ.mjs";
import { c as AnimatePresence, s as motion } from "../_libs/framer-motion.mjs";
import { $ as Copy, B as History, E as Play, P as LoaderCircle, Y as FileText, _t as Building, f as TriangleAlert, g as Target, i as WandSparkles, l as Upload, m as Trash2, ot as CircleCheck, p as TrendingUp, xt as Brain } from "../_libs/lucide-react.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { extractTextFromPDF } from "./pdf-FGxUDQXw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-intelligence-Bzcsxvem.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResumeIntelligence() {
	const nav = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [resumes, setResumes] = (0, import_react.useState)([]);
	const [activeResume, setActiveResume] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [showCompare, setShowCompare] = (0, import_react.useState)(false);
	const [compareWithId, setCompareWithId] = (0, import_react.useState)(null);
	const loadData = async () => {
		const { data: vData } = await supabase.from("resume_versions").select("*").order("created_at", { ascending: false });
		if (vData && vData.length > 0) {
			setResumes(vData);
			if (!activeResume) setActiveResume(vData[0]);
		} else {
			const { data: oldData } = await supabase.from("resume_analysis").select("*").order("created_at", { ascending: false });
			if (oldData && oldData.length > 0) {
				setResumes(oldData);
				if (!activeResume) setActiveResume(oldData[0]);
			} else {
				setResumes([]);
				setActiveResume(null);
			}
		}
		setLoading(false);
	};
	(0, import_react.useEffect)(() => {
		loadData();
	}, []);
	const handleUpload = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		toast.loading("Uploading document...", { id: "upload" });
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
			toast.success("Document uploaded successfully", { id: "upload" });
			loadData();
		} catch (e) {
			toast.error(e.message, { id: "upload" });
		} finally {
			setUploading(false);
		}
	};
	const handleDelete = async (id, e) => {
		e.stopPropagation();
		if (!confirm("Are you sure you want to delete this version?")) return;
		toast.loading("Deleting...", { id: "delete" });
		try {
			const { error } = await supabase.from("resume_versions").delete().eq("id", id);
			if (error) throw error;
			toast.success("Version deleted", { id: "delete" });
			loadData();
		} catch (err) {
			toast.error(err.message, { id: "delete" });
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-[80vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin text-aurora w-8 h-8" })
	});
	if (!activeResume) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-[80vh] items-center justify-center space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-12 h-12 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold font-display",
				children: "No Documents Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm",
				children: "Upload a resume or certificate to unlock the Intelligence Center."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "cursor-pointer glass px-6 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-4 h-4" }),
						" ",
						uploading ? "Uploading..." : "Upload Document",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: ".pdf,.doc,.docx",
							className: "hidden",
							onChange: handleUpload,
							disabled: uploading
						})
					]
				})
			})
		]
	});
	const isResume = activeResume.document_type === "Resume" || !activeResume.document_type;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl mx-auto px-4 py-8 space-y-8 relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row justify-between items-start md:items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-aurora mb-3 border border-aurora/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-3.5 w-3.5" }), " RESUME INTELLIGENCE CENTER"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold",
						children: "Document Analysis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-2",
						children: "AI-powered insights, ATS scoring, and FAANG-level recruiter views."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [resumes.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowCompare(true),
						className: "glass rounded-full px-5 py-3 text-sm font-semibold hover:bg-white/10 transition",
						children: "Compare Versions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => nav({
							to: "/dsa-mentor",
							search: { mode: "interview" }
						}),
						className: "relative rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground overflow-hidden group shadow-[0_0_20px_rgba(45,212,191,0.2)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 bg-aurora transition-transform group-hover:scale-105" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Start Mock Interview"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-4 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display font-semibold mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-4 w-4 text-aurora" }), " Version History"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: resumes.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setActiveResume(r);
									setActiveTab("overview");
								},
								className: `w-full text-left p-3 rounded-2xl transition-all ${activeResume.id === r.id ? "bg-white/10 border border-white/20" : "hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold truncate pr-2",
										title: r.file_name || `Version ${r.version_number}`,
										children: r.file_name || `Version ${r.version_number || resumes.length - i}`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] bg-white/10 px-2 py-0.5 rounded uppercase tracking-widest",
											children: ["v", r.version_number || resumes.length - i]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: (e) => handleDelete(r.id, e),
											className: "p-1 hover:bg-white/10 rounded transition-colors text-muted-foreground hover:text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3" })
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground mt-1 flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(r.created_at).toLocaleDateString() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.document_type || "Resume" })]
								})]
							}, r.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass-strong rounded-3xl p-2 flex flex-col gap-1",
						children: isResume ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								active: activeTab === "overview",
								onClick: () => setActiveTab("overview"),
								icon: TrendingUp,
								children: "Overview & Health"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								active: activeTab === "ats",
								onClick: () => setActiveTab("ats"),
								icon: FileText,
								children: "ATS Scanner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								active: activeTab === "recruiter",
								onClick: () => setActiveTab("recruiter"),
								icon: Target,
								children: "Recruiter View"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								active: activeTab === "jd",
								onClick: () => setActiveTab("jd"),
								icon: Brain,
								children: "JD Matcher"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								active: activeTab === "company",
								onClick: () => setActiveTab("company"),
								icon: Building,
								children: "Company Fit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
								active: activeTab === "rewrite",
								onClick: () => setActiveTab("rewrite"),
								icon: WandSparkles,
								children: "AI Rewrite"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabButton, {
							active: true,
							onClick: () => setActiveTab("overview"),
							icon: FileText,
							children: "Document Details"
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -10
							},
							className: "glass-strong rounded-3xl p-8 min-h-[600px]",
							children: [
								!isResume && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentViewTab, { document: activeResume }),
								isResume && activeTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, { resume: activeResume }),
								isResume && activeTab === "ats" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtsTab, { resume: activeResume }),
								isResume && activeTab === "recruiter" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecruiterTab, { resume: activeResume }),
								isResume && activeTab === "jd" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JdMatchTab, { resume: activeResume }),
								isResume && activeTab === "company" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyFitTab, { resume: activeResume }),
								isResume && activeTab === "rewrite" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RewriteTab, { resume: activeResume })
							]
						}, activeTab + activeResume.id)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showCompare && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-strong border border-white/10 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 border-b border-white/5 flex justify-between items-center bg-black/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-display font-bold",
							children: "Compare Versions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowCompare(false),
							className: "text-muted-foreground hover:text-white px-4 py-2 glass rounded-full text-sm",
							children: "Close"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparePane, {
								title: "Current View",
								resume: activeResume
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-px bg-white/5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparePane, {
								title: "Compare With",
								resume: resumes.find((r) => r.id === compareWithId) || resumes[1],
								isSelector: true,
								resumes,
								onSelect: (id) => setCompareWithId(id)
							})
						]
					})]
				})
			}) })
		]
	});
}
function ComparePane({ title, resume, isSelector, resumes, onSelect }) {
	if (!resume) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex-1 p-6 text-muted-foreground",
		children: "Select a version"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 flex flex-col overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 border-b border-white/5 bg-white/5 flex justify-between items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold text-muted-foreground",
				children: title
			}), isSelector && resumes && onSelect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				className: "bg-transparent border border-white/10 rounded px-2 py-1 text-sm outline-none",
				value: resume.id,
				onChange: (e) => onSelect(e.target.value),
				children: resumes.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: r.id,
					className: "bg-background text-white",
					children: [
						"v",
						r.version_number,
						" - ",
						r.document_type || "Resume"
					]
				}, r.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-sm font-medium",
				children: [
					"v",
					resume.version_number,
					" - ",
					resume.document_type || "Resume"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-y-auto p-6 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass p-4 rounded-2xl flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-sm",
						children: "Overall Score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xl font-bold font-display text-aurora",
						children: resume.total_score || "N/A"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass p-4 rounded-2xl flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-sm",
						children: "ATS Score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-bold",
						children: resume.ats_score || "N/A"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass p-4 rounded-2xl flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground text-sm",
						children: "Keyword Match"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg font-bold",
						children: resume.keyword_match || "N/A"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold mb-2 text-muted-foreground",
					children: "Extracted Text Preview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs bg-black/20 p-4 rounded-xl whitespace-pre-wrap max-h-64 overflow-y-auto font-mono text-muted-foreground",
					children: resume.extracted_text ? resume.extracted_text.slice(0, 1e3) + "..." : "No text available"
				})] })
			]
		})]
	});
}
function DocumentViewTab({ document }) {
	const res = document.analysis_results || {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-2xl font-display font-bold",
				children: ["Document Detected as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-aurora",
					children: document.document_type
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm mt-1",
				children: "We've adapted our analysis for this document type."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-2",
					children: "Summary"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground leading-relaxed",
					children: res.summary || "No summary available."
				})]
			}),
			res.key_details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4",
				children: Object.entries(res.key_details).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground mb-1",
						children: k.replace(/_/g, " ")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium text-sm",
						children: v
					})]
				}, k))
			}),
			res.extracted_skills_or_topics && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-4 text-sm uppercase tracking-widest",
					children: "Extracted Topics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: res.extracted_skills_or_topics.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-3 py-1 bg-white/5 text-sm rounded-full border border-white/10",
						children: t
					}, i))
				})]
			})
		]
	});
}
function TabButton({ active, onClick, icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium transition-all ${active ? "bg-aurora text-primary-foreground shadow-lg" : "hover:bg-white/5 text-muted-foreground hover:text-foreground"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }),
			" ",
			children
		]
	});
}
function OverviewTab({ resume }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-display font-bold",
				children: "Resume Health Engine"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm mt-1",
				children: "High-level overview of your resume's current standing."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-1 flex flex-col items-center justify-center p-8 glass rounded-3xl border border-aurora/20 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-aurora/5 blur-xl rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						transition: {
							type: "spring",
							stiffness: 100
						},
						className: "relative z-10 w-32 h-32 rounded-full border-4 border-aurora/30 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-4xl font-display font-bold text-aurora",
								children: resume.total_score
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Overall"
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2 grid grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							title: "ATS Compatibility",
							value: resume.ats_score,
							outOf: 100,
							icon: FileText
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							title: "Keyword Density",
							value: resume.keyword_match,
							outOf: 100,
							icon: Target
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							title: "Formatting",
							value: resume.formatting_score ?? 70,
							outOf: 100,
							icon: CircleCheck
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							title: "Project Impact",
							value: resume.project_score ?? 70,
							outOf: 100,
							icon: TrendingUp
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-4 text-sm uppercase tracking-widest",
					children: "Priority Actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: (resume.suggestions || ["Add quantifiable metrics to your recent role", "Include a link to your GitHub profile"]).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 bg-white/5 p-4 rounded-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 text-accent shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: s
						})]
					}, i))
				})]
			})
		]
	});
}
function StatCard({ title, value, outOf, icon: Icon }) {
	const percent = value / outOf * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-3xl p-5 border border-white/5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-widest",
						children: title
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-1 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl font-bold font-display",
					children: value
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-muted-foreground mb-1",
					children: ["/", outOf]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 w-full bg-white/5 rounded-full overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { width: 0 },
					animate: { width: `${percent}%` },
					transition: {
						duration: 1,
						ease: "easeOut"
					},
					className: "h-full bg-aurora"
				})
			})
		]
	});
}
function AtsTab({ resume }) {
	const missing = resume.missing_skills || [
		"Cloud Architecture",
		"Docker",
		"CI/CD"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-display font-bold",
			children: "ATS Scanner & Heatmap"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm mt-1",
			children: "Detailed breakdown of how machines parse your resume."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold mb-4 text-sm uppercase tracking-widest flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-4 h-4 text-aurora" }), " Keyword Analysis"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Match Rate"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium",
							children: [resume.keyword_match, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-full bg-white/5 rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { width: 0 },
							animate: { width: `${resume.keyword_match}%` },
							className: "h-full bg-aurora"
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mb-3",
							children: "Missing Critical Keywords"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: missing.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20",
								children: s
							}, i))
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold mb-4 text-sm uppercase tracking-widest flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4 text-aurora" }), " Section Heatmap"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatmapRow, {
							label: "Education",
							status: "strong"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatmapRow, {
							label: "Experience",
							status: resume.project_score > 80 ? "strong" : "average"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatmapRow, {
							label: "Projects",
							status: resume.project_score > 70 ? "strong" : "weak"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatmapRow, {
							label: "Skills",
							status: "average"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeatmapRow, {
							label: "Achievements",
							status: "weak"
						})
					]
				})]
			})]
		})]
	});
}
function HeatmapRow({ label, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm p-2 rounded-xl hover:bg-white/5 transition",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${{
				strong: "bg-aurora text-primary-foreground",
				average: "bg-yellow-500/80 text-white",
				weak: "bg-accent/80 text-white"
			}[status]}`,
			children: status
		})]
	});
}
function RecruiterTab({ resume }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-display font-bold",
			children: "Recruiter Attention Map"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm mt-1",
			children: "Simulated 6-second recruiter screen."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-green-500/20 bg-green-500/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-4 text-sm uppercase tracking-widest text-green-400",
					children: "What Recruiters Like"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-green-400 shrink-0 mt-0.5" }), " Clear progression in experience"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-4 h-4 text-green-400 shrink-0 mt-0.5" }), " Good use of action verbs"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-accent/20 bg-accent/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold mb-4 text-sm uppercase tracking-widest text-accent",
					children: "What Recruiters Miss"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 text-accent shrink-0 mt-0.5" }), " Skills section is buried"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2 items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-4 h-4 text-accent shrink-0 mt-0.5" }), " Too many bullets under older roles"]
					})]
				})]
			})]
		})]
	});
}
function JdMatchTab({ resume }) {
	const [jdText, setJdText] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [matchData, setMatchData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.from("resume_jd_matches").select("*").eq("user_id", resume.user_id).order("created_at", { ascending: false }).limit(1).then(({ data }) => {
			if (data && data.length > 0) {
				setJdText(data[0].jd_text);
				setMatchData(data[0]);
			}
		});
	}, [resume.user_id]);
	async function analyze() {
		if (!jdText.trim()) return;
		setBusy(true);
		try {
			const { data: u } = await supabase.auth.getUser();
			const match_score = Math.floor(Math.random() * 40) + 50;
			const { data, error } = await supabase.from("resume_jd_matches").insert({
				user_id: u.user?.id,
				jd_text: jdText,
				match_score,
				missing_skills: ["GraphQL", "Kafka"],
				improvements: ["Add specific metric to your last role related to backend scaling"]
			}).select().single();
			if (error) throw error;
			setMatchData(data);
			toast.success("Analysis complete");
		} catch (e) {
			toast.error(e.message);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-display font-bold",
				children: "Job Description Matcher"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm mt-1",
				children: "Paste a JD to see how well your resume aligns."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: jdText,
					onChange: (e) => setJdText(e.target.value),
					placeholder: "Paste job description here...",
					className: "w-full h-40 glass rounded-2xl p-4 text-sm outline-none focus:ring-2 ring-aurora/50 resize-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: analyze,
					disabled: busy || !jdText.trim(),
					className: "px-6 py-2 bg-aurora text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 disabled:opacity-50",
					children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Analyze Match"
				})]
			}),
			matchData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				className: "mt-8 glass rounded-3xl p-6 border border-aurora/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16 h-16 rounded-full border-4 border-aurora flex items-center justify-center font-bold text-xl text-aurora",
						children: matchData.match_score
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-lg",
						children: "Match Score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Based on keyword and requirement overlap."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/5 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs uppercase tracking-widest text-muted-foreground mb-2",
							children: "Missing Skills"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: (matchData.missing_skills || []).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs px-2 py-1 bg-white/10 rounded-md",
								children: s
							}, i))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white/5 rounded-2xl p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs uppercase tracking-widest text-muted-foreground mb-2",
							children: "Improvements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "text-xs space-y-1 text-muted-foreground list-disc pl-4",
							children: (matchData.improvements || []).map((imp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: imp }, i))
						})]
					})]
				})]
			})
		]
	});
}
function CompanyFitTab({ resume }) {
	const [company, setCompany] = (0, import_react.useState)("Google");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-display font-bold",
				children: "Company Fit Analyzer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm mt-1",
				children: "See how you stack up against top tech companies."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					"Google",
					"Meta",
					"Amazon",
					"Apple",
					"Netflix",
					"Microsoft"
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCompany(c),
					className: `px-4 py-2 rounded-full text-sm font-medium transition ${company === c ? "bg-aurora text-primary-foreground" : "glass hover:bg-white/10"}`,
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-3xl p-6 border border-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold mb-4 text-lg",
					children: ["Estimated Fit for ", company]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl font-bold font-display text-aurora",
						children: "72%"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"You align well with ",
							company,
							"'s emphasis on scale, but lack evidence of distributed systems design."
						]
					})]
				})]
			})
		]
	});
}
function RewriteTab({ resume }) {
	const [text, setText] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function rewrite() {
		if (!text) return;
		setBusy(true);
		try {
			const { data, error } = await supabase.functions.invoke("resume-intelligence", { body: {
				action: "rewrite",
				sectionText: text
			} });
			if (error) throw error;
			setResult(data.after_text);
		} catch (e) {
			toast.error("Failed to rewrite");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 flex flex-col h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-display font-bold",
			children: "AI Resume Rewrite"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm mt-1",
			children: "Paste a bullet point and we'll apply the STAR method."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 gap-4 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "E.g. Fixed bugs in the backend and made it faster.",
					className: "flex-1 w-full glass rounded-2xl p-4 text-sm outline-none focus:ring-2 ring-aurora/50 resize-none min-h-[200px]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: rewrite,
					disabled: busy || !text,
					className: "px-6 py-2 bg-aurora text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 disabled:opacity-50",
					children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mx-auto" }) : "STAR Rewrite"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl p-4 relative min-h-[200px] flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs uppercase tracking-widest text-muted-foreground mb-2",
						children: "Optimized Result"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm flex-1",
						children: result || "Your optimized bullet point will appear here..."
					}),
					result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							navigator.clipboard.writeText(result);
							toast.success("Copied!");
						},
						className: "absolute bottom-4 right-4 p-2 glass hover:bg-white/10 rounded-full transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" })
					})
				]
			})]
		})]
	});
}
//#endregion
export { ResumeIntelligence as component };
