import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Map, Target, TrendingUp, Users, ArrowRight, DollarSign, BrainCircuit } from "lucide-react";
import { FeatureFlags } from "@/lib/feature-flags";
import { CareerIntelligenceService, RoleInformation } from "@/lib/services/career-intelligence.service";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/role-explorer")({
  component: RoleExplorerPage,
});

function RoleExplorerPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [roles, setRoles] = useState<RoleInformation[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleInformation | null>(null);
  const [loading, setLoading] = useState(false);

  // Graceful degradation / Feature Flag check
  if (!FeatureFlags.ENABLE_ROLE_EXPLORER) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Role Explorer Coming Soon</h1>
        <p className="text-muted-foreground mb-6">We're currently building out the intelligent role explorer feature.</p>
        <Button onClick={() => navigate({ to: "/dashboard" })}>Return to Dashboard</Button>
      </div>
    );
  }

  useEffect(() => {
    async function fetchRoles() {
      if (query.trim().length < 2) {
        setRoles([]);
        return;
      }
      setLoading(true);
      const results = await CareerIntelligenceService.searchRoles(query);
      setRoles(results);
      setLoading(false);
    }
    
    const timeout = setTimeout(fetchRoles, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Map className="w-8 h-8 text-aurora" /> Role Explorer
        </h1>
        <p className="text-muted-foreground">Discover intelligent career paths, salary progressions, and expected skills.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        {/* Sidebar / Search */}
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search roles (e.g. Frontend Engineer)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-aurora"
            />
          </div>
          
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
            {loading && <p className="text-muted-foreground text-sm">Searching...</p>}
            {!loading && roles.length === 0 && query.length >= 2 && (
              <p className="text-muted-foreground text-sm">No roles found.</p>
            )}
            {roles.map(role => (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedRole(role)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  selectedRole?.id === role.id 
                    ? "bg-aurora/10 border-aurora" 
                    : "glass border-white/5 hover:border-white/20"
                }`}
              >
                <h3 className="font-semibold text-white">{role.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{role.overview}</p>
              </motion.button>
            ))}
            
            {/* Fallback example if DB is empty for demo purposes */}
            {roles.length === 0 && query.length === 0 && (
              <div className="p-4 rounded-xl glass border border-white/5 text-sm text-muted-foreground">
                Start typing to explore roles...
              </div>
            )}
          </div>
        </div>

        {/* Main Details Panel */}
        <div className="glass rounded-xl border border-white/5 min-h-[60vh] p-6 md:p-8">
          {selectedRole ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedRole.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{selectedRole.overview || "No overview available."}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-aurora" /> Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(selectedRole.required_skills || []).map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
                        {skill}
                      </span>
                    ))}
                    {(!selectedRole.required_skills || selectedRole.required_skills.length === 0) && (
                      <span className="text-sm text-muted-foreground">None specified</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" /> Salary Progression
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {selectedRole.salary_progression && Object.keys(selectedRole.salary_progression).length > 0 ? (
                      <pre className="text-xs mt-2 bg-black/40 p-3 rounded-lg overflow-x-auto">
                        {JSON.stringify(selectedRole.salary_progression, null, 2)}
                      </pre>
                    ) : (
                      <p>Salary data not available for this role.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-aurora" /> Daily Work & Responsibilities
                </h3>
                <p className="text-sm text-muted-foreground">{selectedRole.daily_work || "Not specified."}</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  {(selectedRole.responsibilities || []).map(res => (
                    <li key={res} className="text-sm text-muted-foreground">{res}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-aurora" /> Promotion Path
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedRole.promotion_path || "Information currently unavailable."}
                </p>
              </div>

            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <Briefcase className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg text-white">Select a role to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
