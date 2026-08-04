import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Target,
  Sparkles,
  Award,
  ChevronDown,
  ShieldCheck,
  Zap,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import {
  CompanyReadinessResult,
  CareerRole,
  CompanyProfile,
  companyRegistry,
  careerEngine,
  UserCareerContext,
} from "@/lib/career-intelligence";

interface DreamCompanyHeroProps {
  userContext: UserCareerContext;
  onCompanyChange?: (companyId: string) => void;
  onRoleChange?: (roleId: CareerRole) => void;
}

const ROLES: { id: CareerRole; label: string }[] = [
  { id: "frontend", label: "Frontend Engineer" },
  { id: "backend", label: "Backend Engineer" },
  { id: "fullstack", label: "Full Stack Engineer" },
  { id: "ai", label: "AI / ML Engineer" },
  { id: "data", label: "Data Engineer" },
  { id: "mobile", label: "Mobile Developer" },
  { id: "devops", label: "DevOps / Cloud" },
];

export function DreamCompanyHero({
  userContext,
  onCompanyChange,
  onRoleChange,
}: DreamCompanyHeroProps) {
  const allCompanies = careerEngine.getAllCompanies();
  const selectedCompanyId = userContext.dream_companies?.[0] || "google";
  const selectedRoleId = userContext.target_role || "fullstack";

  const [activeTab, setActiveTab] = useState<"breakdown" | "interview" | "priorities">("breakdown");

  const readiness: CompanyReadinessResult = careerEngine.evaluateCompanyReadiness(
    userContext,
    selectedCompanyId
  );
  const companyProfile: CompanyProfile = careerEngine.getCompany(selectedCompanyId);
  const roleExpectation = companyProfile.roles[selectedRoleId] || companyProfile.roles["fullstack"];

  return (
    <div className="relative rounded-3xl p-px overflow-hidden mb-8">
      {/* Background ambient aurora glow */}
      <div className="absolute inset-0 rounded-3xl bg-aurora opacity-30 blur-xl pointer-events-none" />

      <div className="relative rounded-[23px] glass-strong p-6 md:p-8 space-y-6">
        {/* Header bar with Company & Role Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-accent font-medium uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Dream Company Intelligence
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-3 mt-1">
              <span>{companyProfile.name}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-muted-foreground font-normal">
                Tier {companyProfile.tier} • {companyProfile.hiringDifficulty} Difficulty
              </span>
            </h2>
          </div>

          {/* Dynamic Company & Role Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Company Dropdown Selector */}
            <div className="relative">
              <select
                value={selectedCompanyId}
                onChange={(e) => onCompanyChange && onCompanyChange(e.target.value)}
                className="appearance-none bg-black/40 border border-white/15 text-white text-xs font-semibold rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
              >
                {allCompanies.map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Role Dropdown Selector */}
            <div className="relative">
              <select
                value={selectedRoleId}
                onChange={(e) => onRoleChange && onRoleChange(e.target.value as CareerRole)}
                className="appearance-none bg-black/40 border border-white/15 text-white text-xs font-semibold rounded-xl px-4 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    {r.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Readiness Meter & High Level Cards */}
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Circular / Big Readiness Score Counter */}
          <div className="md:col-span-5 glass rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center text-center space-y-3">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {companyProfile.name} {roleExpectation.roleTitle} Readiness
            </div>
            
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-white/10"
                  fill="transparent"
                />
                <motion.circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="url(#gradient-aurora)"
                  strokeWidth="10"
                  strokeDasharray={377}
                  strokeDashoffset={377 - (377 * readiness.readinessScore) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 - (377 * readiness.readinessScore) / 100 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient-aurora" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="oklch(0.7 0.25 240)" />
                    <stop offset="100%" stopColor="oklch(0.85 0.18 160)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-extrabold text-white">
                  {readiness.readinessScore}%
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400">
                  {readiness.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Confidence: {readiness.confidenceScore}% ({readiness.confidenceLabel})</span>
            </div>
          </div>

          {/* Quick Metrics & Target Breakdown Tabs */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab("breakdown")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "breakdown" ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                Score Breakdown
              </button>
              <button
                onClick={() => setActiveTab("interview")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "interview" ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                Interview Pattern
              </button>
              <button
                onClick={() => setActiveTab("priorities")}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === "priorities" ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                }`}
              >
                Key Priorities
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "breakdown" && (
                <motion.div
                  key="breakdown"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-3"
                >
                  {readiness.dimensionBreakdowns.map((d) => (
                    <div key={d.dimension} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-white/90">{d.dimension}</span>
                        <span className="text-muted-foreground">
                          {d.score}% (Target Weight: {d.targetWeight}%)
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full bg-aurora"
                          initial={{ width: 0 }}
                          animate={{ width: `${d.score}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "interview" && (
                <motion.div
                  key="interview"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="grid sm:grid-cols-2 gap-3"
                >
                  {roleExpectation.interviewPattern.map((stage, idx) => (
                    <div key={stage.name} className="glass rounded-xl p-3 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span>{idx + 1}. {stage.name}</span>
                        <span className="text-accent text-[10px]">{stage.weight}%</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground font-medium">{stage.focus}</div>
                      <p className="text-[10px] text-muted-foreground/80 line-clamp-2">{stage.description}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "priorities" && (
                <motion.div
                  key="priorities"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-3"
                >
                  {roleExpectation.keyPriorities.map((p) => (
                    <div key={p.title} className="glass rounded-xl p-3 border border-white/5 flex items-start gap-3">
                      <Zap className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-xs">
                        <div className="font-semibold text-white">{p.title}</div>
                        <div className="text-muted-foreground">{p.description}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Required Data Prompt Alert if sparse data */}
        {readiness.requiredDataPrompts.length > 0 && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Confidence Boost Available:</strong> {readiness.requiredDataPrompts[0]}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
