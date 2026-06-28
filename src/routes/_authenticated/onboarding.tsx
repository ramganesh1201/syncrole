import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Github,
  FileText,
  Target,
  GraduationCap,
  Sparkles,
  Loader2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { XP } from "@/lib/syncrole";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: Onboarding,
  head: () => ({ meta: [{ title: "Get started — SyncRole" }] }),
});

const GOALS = [
  { v: "frontend", label: "Frontend Developer" },
  { v: "backend", label: "Backend Developer" },
  { v: "fullstack", label: "Full Stack Developer" },
  { v: "data", label: "Data Analyst" },
  { v: "ai", label: "AI Engineer" },
  { v: "mobile", label: "Mobile Developer" },
  { v: "devops", label: "DevOps / Cloud" },
];

const SKILL_OPTIONS = [
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
  "MongoDB",
];

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    college: "",
    branch: "",
    graduation_year: new Date().getFullYear() + 1,
    cgpa: 8.0,
    career_goal: "fullstack",
    skills: [] as string[],
    github_username: "",
  });

  useEffect(() => {
    supabase
      .from("profiles")
      .select("*")
      .maybeSingle()
      .then(({ data }: { data: any }) => {
        if (data?.onboarding_completed) {
          console.log("[DEBUG: Onboarding Redirect]", {
            userId: data.user_id,
            onboarding_completed: data.onboarding_completed,
            reason: "User already completed profile, redirecting away from onboarding to prevent loop",
          });
          nav({ to: "/dashboard" });
        }
        if (data)
          setForm((f) => ({
            ...f,
            ...(Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null)) as any),
          }));
      });
  }, [nav]);

  const steps = ["About you", "Career goal", "Your skills", "GitHub", "Resume", "Finish"];

  async function finish() {
    setBusy(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: form.full_name,
          college: form.college,
          branch: form.branch,
          graduation_year: Number(form.graduation_year),
          cgpa: Number(form.cgpa),
          career_goal: form.career_goal as any,
          skills: form.skills,
          github_username: form.github_username || null,
          onboarding_completed: true,
        })
        .eq("user_id", u.user.id);
      if (error) throw error;
      await supabase.rpc("award_xp", {
        _user: u.user.id,
        _type: "onboarding_completed",
        _xp: XP.PROFILE_COMPLETE,
        _meta: {},
      });
      await supabase
        .from("achievements")
        .insert({ user_id: u.user.id, code: "profile_completed" })
        .then(() => {});
      await supabase.rpc("recompute_placement", { _user: u.user.id });
      toast.success("Welcome aboard 🚀");
      nav({ to: "/dashboard" });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-aurora"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <div className="mt-8 relative rounded-3xl p-px">
          <div className="absolute inset-0 rounded-3xl bg-aurora opacity-40 blur" />
          <div className="relative rounded-[23px] glass-strong p-8 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {step === 0 && (
                  <Section title="Tell us about you" icon={GraduationCap}>
                    <Input
                      label="Full name"
                      value={form.full_name}
                      onChange={(v) => setForm({ ...form, full_name: v })}
                    />
                    <Input
                      label="College"
                      value={form.college}
                      onChange={(v) => setForm({ ...form, college: v })}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        label="Branch"
                        value={form.branch}
                        onChange={(v) => setForm({ ...form, branch: v })}
                      />
                      <Input
                        label="Graduation Year"
                        type="number"
                        value={String(form.graduation_year)}
                        onChange={(v) => setForm({ ...form, graduation_year: Number(v) })}
                      />
                    </div>
                    <Input
                      label="CGPA"
                      type="number"
                      value={String(form.cgpa)}
                      onChange={(v) => setForm({ ...form, cgpa: Number(v) })}
                    />
                  </Section>
                )}
                {step === 1 && (
                  <Section title="What's your career goal?" icon={Target}>
                    <div className="grid sm:grid-cols-2 gap-3 mt-2">
                      {GOALS.map((g) => (
                        <button
                          key={g.v}
                          onClick={() => setForm({ ...form, career_goal: g.v })}
                          className={`text-left rounded-2xl p-4 transition ${form.career_goal === g.v ? "bg-aurora text-primary-foreground" : "glass hover:bg-white/10"}`}
                        >
                          <div className="font-semibold">{g.label}</div>
                        </button>
                      ))}
                    </div>
                  </Section>
                )}
                {step === 2 && (
                  <Section title="Pick your current skills" icon={Sparkles}>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {SKILL_OPTIONS.map((s) => {
                        const on = form.skills.includes(s);
                        return (
                          <button
                            key={s}
                            onClick={() =>
                              setForm({
                                ...form,
                                skills: on
                                  ? form.skills.filter((x) => x !== s)
                                  : [...form.skills, s],
                              })
                            }
                            className={`rounded-full px-4 py-2 text-sm transition ${on ? "bg-aurora text-primary-foreground" : "glass hover:bg-white/10"}`}
                          >
                            {on && <Check className="inline h-3.5 w-3.5 mr-1" />}
                            {s}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {form.skills.length} selected
                    </p>
                  </Section>
                )}
                {step === 3 && (
                  <Section title="Connect your GitHub" icon={Github}>
                    <Input
                      label="GitHub username"
                      value={form.github_username}
                      onChange={(v) => setForm({ ...form, github_username: v })}
                      placeholder="octocat"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll analyze your repos, languages, and activity to compute your GitHub
                      score.
                    </p>
                  </Section>
                )}
                {step === 4 && (
                  <Section title="Upload your resume" icon={FileText}>
                    <p className="text-sm text-muted-foreground">
                      You can skip this and upload it later from the dashboard.
                    </p>
                    <ResumeUpload onUploaded={() => toast.success("Resume saved")} />
                  </Section>
                )}
                {step === 5 && (
                  <Section title="You're all set" icon={Sparkles}>
                    <p className="text-sm text-muted-foreground">
                      We'll generate your personalized placement score and daily missions in your
                      dashboard.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                      <Summary label="College" value={form.college || "—"} />
                      <Summary
                        label="Goal"
                        value={GOALS.find((g) => g.v === form.career_goal)?.label || "—"}
                      />
                      <Summary label="Skills" value={`${form.skills.length} selected`} />
                      <Summary label="GitHub" value={form.github_username || "—"} />
                    </div>
                  </Section>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <button
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className="glass rounded-full px-4 py-2 text-sm inline-flex items-center gap-1 disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="relative rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground overflow-hidden"
                >
                  <span className="absolute inset-0 bg-aurora" />
                  <span className="relative inline-flex items-center gap-1">
                    Continue <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              ) : (
                <button
                  disabled={busy}
                  onClick={finish}
                  className="relative rounded-full px-5 py-2 text-sm font-semibold text-primary-foreground overflow-hidden disabled:opacity-60"
                >
                  <span className="absolute inset-0 bg-aurora" />
                  <span className="relative inline-flex items-center gap-1">
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Generate my Placement Score <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, icon: Icon, children }: any) {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-accent" /> ONBOARDING
      </div>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="space-y-3 pt-2">{children}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full glass rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 ring-accent/50"
      />
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-medium truncate">{value}</div>
    </div>
  );
}

function ResumeUpload({ onUploaded }: { onUploaded: () => void }) {
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState<string | null>(null);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const path = `${u.user.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("resumes").upload(path, file, { upsert: true });
      if (error) throw error;
      
      // Parse PDF
      const { extractTextFromPDF } = await import("@/lib/pdf");
      const resumeText = await extractTextFromPDF(file);
      
      // Classify Document
      const { data: classData, error: classErr } = await supabase.functions.invoke("resume-intelligence", {
        body: { action: "classify", resumeText }
      });
      if (classErr) throw classErr;
      const document_type = classData.document_type || "Unknown";

      // Determine Version Number
      const { data: existingVersions } = await supabase.from("resume_versions").select("version_number").eq("user_id", u.user.id).order("version_number", { ascending: false }).limit(1);
      const version_number = existingVersions && existingVersions.length > 0 ? (existingVersions[0].version_number || 0) + 1 : 1;

      let insertData: any = {
        user_id: u.user.id,
        file_path: path,
        file_name: file.name,
        extracted_text: resumeText,
        document_type,
        version_number,
      };

      if (document_type === "Resume") {
        // Run ATS Scan
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "ats_scan", resumeText }
        });
        if (aiErr) throw aiErr;

        insertData = {
          ...insertData,
          ats_score: aiRes.ats_score,
          keyword_match: aiRes.keyword_match,
          formatting_score: aiRes.formatting_score,
          project_score: aiRes.project_score,
          total_score: aiRes.total_score,
          suggestions: aiRes.suggestions,
          missing_skills: aiRes.missing_skills,
        };
      } else {
        // Run Document Analysis
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "analyze_document", resumeText }
        });
        if (aiErr) throw aiErr;
        
        insertData = {
          ...insertData,
          analysis_results: aiRes,
          ats_score: 0,
          keyword_match: 0,
          formatting_score: 0,
          project_score: 0,
          total_score: 0,
        };
      }

      await supabase.from("resume_versions").insert(insertData);
      await supabase
        .from("achievements")
        .insert({ user_id: u.user.id, code: "resume_uploaded" })
        .then(() => {});
      await supabase.rpc("award_xp", {
        _user: u.user.id,
        _type: "resume_uploaded",
        _xp: XP.RESUME_UPLOAD,
        _meta: {},
      });
      await supabase.rpc("recompute_placement", { _user: u.user.id });
      setName(file.name);
      onUploaded();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <label className="mt-3 block cursor-pointer rounded-2xl border-2 border-dashed border-white/15 px-6 py-10 text-center hover:bg-white/5">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={upload}
        disabled={busy}
      />
      {busy ? (
        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
      ) : name ? (
        <div>
          <Check className="mx-auto h-6 w-6 text-[oklch(0.88_0.18_145)]" />
          <div className="mt-2 text-sm">{name}</div>
        </div>
      ) : (
        <div>
          <FileText className="mx-auto h-6 w-6 text-accent" />
          <div className="mt-2 text-sm font-medium">Drop your resume here</div>
          <div className="text-xs text-muted-foreground">PDF, DOC, DOCX</div>
        </div>
      )}
    </label>
  );
}
