import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Briefcase } from "lucide-react";
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
      supabase.from("company_question_sets").select("*").order("company_name"),
      supabase.from("user_company_focus").select("company_id").eq("user_id", uid),
    ]);
    setCompanies(compRes.data ?? []);
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
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-8 space-y-8">
      <Link
        to="/dashboard/dsa"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" /> Back to DSA Command Center
      </Link>

      <div>
        <h1 className="font-display text-4xl font-bold">Target Companies</h1>
        <p className="text-sm text-muted-foreground">
          Select companies to focus your preparation on.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {companies.map((company: Company, idx) => {
          const selected = userFocus.has(company.id);
          return (
            <motion.button
              key={company.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => toggleCompany(company.id)}
              className={`relative rounded-2xl p-6 text-left transition group ${selected ? "bg-gradient-to-br from-aurora/30 to-aurora/10 border border-aurora/50" : "glass-strong hover:bg-white/10"}`}
            >
              {selected && (
                <div className="absolute top-3 right-3 rounded-full bg-aurora p-1.5">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center mt-1">
                  <Briefcase className="h-5 w-5 text-aurora" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-lg">{company.company_name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {company.description ?? "Target company prep"}
                  </div>
                  {company.focus_topics?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {company.focus_topics.map((topic) => (
                        <span key={topic} className="rounded-full bg-white/5 px-2 py-1 text-[11px]">
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {userFocus.size > 0 && (
        <div className="glass-strong rounded-2xl p-6">
          <h3 className="font-display font-bold">Selected Companies ({userFocus.size})</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {companies
              .filter((c) => userFocus.has(c.id))
              .map((c) => (
                <span
                  key={c.id}
                  className="inline-flex items-center gap-2 rounded-full bg-aurora/20 px-3 py-1 text-sm"
                >
                  {c.company_name}{" "}
                  <button
                    onClick={() => toggleCompany(c.id)}
                    className="text-aurora hover:text-aurora/80"
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
