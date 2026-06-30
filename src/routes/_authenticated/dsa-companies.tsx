import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Briefcase, Activity, Code2, Users, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dsa-companies")({
  component: DSACompaniesPage,
  head: () => ({ meta: [{ title: "Company Prep — SyncRole" }] }),
});

type Company = {
  id: string;
  company_name: string;
  description: string | null;
  interview_frequency: string | null;
  focus_topics: string[] | null;
  interview_difficulty: string | null;
  oa_difficulty: string | null;
  hiring_frequency: string | null;
  recommended_preparation_order: number | null;
  question_count: number | null;
};

type UserCompanyFocus = { id: string; company_id: string };

function DSACompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [userFocus, setUserFocus] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  async function load() {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const uid = u.user.id;
    const [compRes, focusRes] = await Promise.all([
      supabase.from("company_question_sets").select("*").order("recommended_preparation_order", { ascending: true }),
      supabase.from("user_company_focus").select("company_id").eq("user_id", uid),
    ]);
    
    // Fallback sort if recommended_preparation_order is null
    let sorted = (compRes.data ?? []) as Company[];
    sorted.sort((a, b) => {
      if (a.recommended_preparation_order === null && b.recommended_preparation_order === null) return a.company_name.localeCompare(b.company_name);
      if (a.recommended_preparation_order === null) return 1;
      if (b.recommended_preparation_order === null) return -1;
      return a.recommended_preparation_order - b.recommended_preparation_order;
    });

    setCompanies(sorted);
    setUserFocus(new Set((focusRes.data ?? []).map((f: UserCompanyFocus) => f.company_id)));
    setLoading(false);
  }

  async function toggleCompany(companyId: string) {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const isSelected = userFocus.has(companyId);
    if (isSelected) {
      await supabase
        .from("user_company_focus")
        .delete()
        .eq("company_id", companyId)
        .eq("user_id", u.user.id);
      const newFocus = new Set(userFocus);
      newFocus.delete(companyId);
      setUserFocus(newFocus);
    } else {
      await supabase
        .from("user_company_focus")
        .insert({ company_id: companyId, user_id: u.user.id });
      setUserFocus(new Set([...userFocus, companyId]));
    }
    toast.success(isSelected ? "Company removed" : "Company added");
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[60vh]">
        <div className="h-8 w-8 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-8">
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3 w-3" /> Back to DSA Command Center
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Target Companies</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Select companies to build a targeted preparation strategy and view specific analytics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {companies.map((company, idx) => {
          const selected = userFocus.has(company.id);
          
          const getDifficultyColor = (diff: string | null) => {
            if (!diff) return "text-muted-foreground";
            const lower = diff.toLowerCase();
            if (lower === 'hard') return "text-red-400";
            if (lower === 'medium') return "text-yellow-400";
            return "text-green-400";
          };

          return (
            <motion.button
              key={company.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.03 }}
              onClick={() => toggleCompany(company.id)}
              className={`relative rounded-3xl p-6 text-left transition-all duration-300 group overflow-hidden ${
                selected 
                  ? "bg-gradient-to-br from-aurora/10 to-aurora/5 border border-aurora/50 shadow-[0_0_20px_rgba(var(--aurora-rgb),0.15)]" 
                  : "glass-strong hover:bg-white/10 hover:-translate-y-1"
              }`}
            >
              {selected && (
                <div className="absolute top-4 right-4 rounded-full bg-aurora p-1.5 shadow-lg shadow-aurora/20">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-black/40 border border-white/10 grid place-items-center mt-0.5 shadow-inner">
                  <Briefcase className="h-6 w-6 text-aurora" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="font-display font-bold text-xl leading-tight">{company.company_name}</div>
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {company.description ?? "Target company prep"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1 mb-1">
                    <Code2 className="w-3 h-3" /> OA Diff
                  </div>
                  <div className={`text-sm font-medium capitalize ${getDifficultyColor(company.oa_difficulty)}`}>
                    {company.oa_difficulty || 'Unknown'}
                  </div>
                </div>
                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1 mb-1">
                    <Users className="w-3 h-3" /> Interview Diff
                  </div>
                  <div className={`text-sm font-medium capitalize ${getDifficultyColor(company.interview_difficulty)}`}>
                    {company.interview_difficulty || 'Unknown'}
                  </div>
                </div>
                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1 mb-1">
                    <Activity className="w-3 h-3" /> Hiring Freq
                  </div>
                  <div className="text-sm font-medium text-foreground capitalize">
                    {company.hiring_frequency || 'Unknown'}
                  </div>
                </div>
                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1 mb-1">
                    <Layers className="w-3 h-3" /> Questions
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {company.question_count || 0}+
                  </div>
                </div>
              </div>

              {company.focus_topics?.length ? (
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Core Focus</div>
                  <div className="flex flex-wrap gap-1.5">
                    {company.focus_topics.slice(0,4).map((topic) => (
                      <span key={topic} className="rounded-md bg-white/5 px-2 py-1 text-[10px] border border-white/5 text-primary/80">
                        {topic}
                      </span>
                    ))}
                    {company.focus_topics.length > 4 && (
                      <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] border border-white/5 text-muted-foreground">
                        +{company.focus_topics.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
            </motion.button>
          );
        })}
      </div>

      {userFocus.size > 0 && (
        <div className="glass-strong rounded-3xl p-6 border border-aurora/20">
          <h3 className="font-display font-bold flex items-center gap-2">
            Selected Targets <span className="bg-aurora text-primary-foreground text-xs px-2 py-0.5 rounded-full">{userFocus.size}</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Your AI Mentor will bias recommendations towards these companies.</p>
          <div className="flex flex-wrap gap-2">
            {companies
              .filter((c) => userFocus.has(c.id))
              .map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-2 rounded-full bg-aurora/10 border border-aurora/30 px-4 py-1.5 text-sm text-aurora font-medium group hover:bg-aurora/20 transition-colors cursor-default"
                >
                  {c.company_name}{" "}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCompany(c.id); }}
                    className="text-aurora/60 hover:text-aurora transition-colors hover:scale-110"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        </div>
      )}
    </main>
  );
}
