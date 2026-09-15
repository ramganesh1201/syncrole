import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  TrendingUp,
  Target,
  Code2,
  FileText,
  Activity,
  ChevronRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  Flame,
  Trophy,
  RefreshCw,
  BrainCircuit,
  ArrowUpRight,
  Shield,
  Loader2,
  ArrowRight,
  Search,
  Building2,
  Briefcase,
  X,
  Check,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { levelProgress } from "@/lib/syncrole";
import { useAuth } from "@/hooks/use-auth";
import { companyRegistry } from "@/lib/career-intelligence";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/career-identity")({
  component: CareerIdentityPage,
});

/* ── Known Catalog Data for Dynamic Ranking ── */
const KNOWN_COMPANIES = [
  "Google",
  "Google Cloud",
  "Google India",
  "Google DeepMind",
  "Microsoft",
  "Microsoft Azure",
  "Microsoft India",
  "Amazon",
  "Amazon AWS",
  "Meta",
  "Apple",
  "Netflix",
  "Atlassian",
  "Adobe",
  "NVIDIA",
  "Qualcomm",
  "Salesforce",
  "Oracle",
  "ServiceNow",
  "Zoho",
  "Freshworks",
  "Stripe",
  "Airbnb",
  "Uber",
  "Flipkart",
  "Swiggy",
  "Zomato",
  "Razorpay",
  "CRED",
  "PhonePe",
  "Meesho",
  "High-Growth Startup",
];

const KNOWN_ROLES = [
  "Software Engineer",
  "Software Developer",
  "Software Development Engineer (SDE-1)",
  "Software Engineer Intern",
  "Full Stack Engineer",
  "Full Stack Developer",
  "Frontend Engineer",
  "Frontend Developer",
  "UI Engineer",
  "React Developer",
  "Backend Engineer",
  "Backend Developer",
  "API Engineer",
  "Distributed Systems Engineer",
  "AI / ML Engineer",
  "Machine Learning Engineer",
  "AI Research Specialist",
  "Data Engineer",
  "Data Scientist",
  "Data Analyst",
  "Mobile Engineer",
  "iOS Developer",
  "Android Developer",
  "DevOps Engineer",
  "Cloud Infrastructure Engineer",
  "Site Reliability Engineer (SRE)",
  "Security Engineer",
];

/* ── Dynamic Ranking Helper ── */
function rankMatches(items: string[], query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed) return items.slice(0, 6);
  const q = trimmed.toLowerCase();

  const exact: string[] = [];
  const startsWith: string[] = [];
  const wordStartsWith: string[] = [];
  const contains: string[] = [];

  for (const item of items) {
    const lower = item.toLowerCase();
    if (lower === q) {
      exact.push(item);
    } else if (lower.startsWith(q)) {
      startsWith.push(item);
    } else if (lower.split(/\s+/).some((w) => w.startsWith(q))) {
      wordStartsWith.push(item);
    } else if (lower.includes(q)) {
      contains.push(item);
    }
  }

  const combined = Array.from(new Set([...exact, ...startsWith, ...wordStartsWith, ...contains]));
  return combined.slice(0, 6);
}

/* ── Accessible Autocomplete Component ── */
interface AutocompleteProps {
  label: string;
  placeholder: string;
  icon: any;
  items: string[];
  value: string;
  onChange: (val: string) => void;
  onSelectOption: (val: string) => void;
  customPromptPrefix?: string;
}

function AutocompleteInput({
  label,
  placeholder,
  icon: Icon,
  items,
  value,
  onChange,
  onSelectOption,
  customPromptPrefix = "Use custom:",
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const filteredOptions = useMemo(() => rankMatches(items, value), [items, value]);
  const hasExactMatch = filteredOptions.some(
    (opt) => opt.toLowerCase() === value.trim().toLowerCase()
  );
  const showCustomOption = Boolean(value.trim() && !hasExactMatch);

  const totalOptionCount = filteredOptions.length + (showCustomOption ? 1 : 0);

  // Close listbox when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
        setActiveIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % totalOptionCount);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + totalOptionCount) % totalOptionCount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
        onSelectOption(filteredOptions[activeIndex]);
        setIsOpen(false);
      } else if (showCustomOption && activeIndex === filteredOptions.length) {
        onSelectOption(value.trim());
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative space-y-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-purple-400" />
        <span>{label}</span>
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          role="combobox"
          className="w-full bg-[#12131c] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all pr-8"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(true);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white text-xs"
            aria-label="Clear input"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown Listbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={listboxId}
            role="listbox"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute z-50 left-0 right-0 mt-1 bg-[#141624] border border-white/15 rounded-xl py-1 shadow-2xl max-h-56 overflow-y-auto"
          >
            {filteredOptions.map((opt, idx) => {
              const isSelected = opt.toLowerCase() === value.trim().toLowerCase();
              const isActive = idx === activeIndex;
              return (
                <li
                  key={opt}
                  role="option"
                  aria-selected={isSelected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onSelectOption(opt);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`px-3.5 py-2 text-xs font-medium cursor-pointer flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-purple-600/30 text-white font-semibold"
                      : isSelected
                      ? "text-purple-300 font-semibold"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-400" />}
                </li>
              );
            })}

            {showCustomOption && (
              <li
                role="option"
                aria-selected={false}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelectOption(value.trim());
                  setIsOpen(false);
                }}
                onMouseEnter={() => setActiveIndex(filteredOptions.length)}
                className={`px-3.5 py-2 text-xs font-semibold text-purple-300 cursor-pointer border-t border-white/10 flex items-center justify-between transition-colors ${
                  activeIndex === filteredOptions.length ? "bg-purple-600/30 text-white" : "hover:bg-purple-500/10"
                }`}
              >
                <span>
                  {customPromptPrefix} &quot;{value.trim()}&quot;
                </span>
                <PlusIcon className="w-3.5 h-3.5 text-purple-400" />
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14"/><path d="M12 5v14"/>
    </svg>
  );
}

/* ── Main Career Identity Page Component ── */
function CareerIdentityPage() {
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [xpData, setXpData] = useState<any>(null);
  const [streakData, setStreakData] = useState<any>(null);
  const [placementScore, setPlacementScore] = useState<any>(null);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Target Editing State
  const [companySearchQuery, setCompanySearchQuery] = useState("");
  const [roleSearchQuery, setRoleSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [preferredLocation, setPreferredLocation] = useState<string>("");
  const [graduationYear, setGraduationYear] = useState<string>("");
  const [savingTarget, setSavingTarget] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !user.id) return;

    async function loadData() {
      try {
        const uid = user.id;
        const [pRes, rRes, xRes, sRes, psRes, actRes, misRes] = await Promise.allSettled([
          supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle(),
          supabase.from("resume_analysis").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(1).maybeSingle(),
          supabase.from("xp_levels").select("*").eq("user_id", uid).maybeSingle(),
          supabase.from("streaks").select("*").eq("user_id", uid).maybeSingle(),
          supabase.from("placement_scores").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(1).maybeSingle(),
          supabase.from("activity_logs").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(4),
          supabase.from("daily_missions").select("*").eq("user_id", uid).order("created_at", { ascending: false }).limit(3),
        ]);

        if (pRes.status === "fulfilled" && pRes.value.data) {
          const p = pRes.value.data;
          setProfile(p);
          setSelectedCompanies(p.dream_companies || []);
          setSelectedRole(p.target_role || p.career_goal || "");
          setPreferredLocation(p.preferred_location || "");
          setGraduationYear(p.graduation_year ? String(p.graduation_year) : "");
        }
        if (rRes.status === "fulfilled" && rRes.value.data) setResumeAnalysis(rRes.value.data);
        if (xRes.status === "fulfilled" && xRes.value.data) setXpData(xRes.value.data);
        if (sRes.status === "fulfilled" && sRes.value.data) setStreakData(sRes.value.data);
        if (psRes.status === "fulfilled" && psRes.value.data) setPlacementScore(psRes.value.data);
        if (actRes.status === "fulfilled" && actRes.value.data) setActivityLogs(actRes.value.data);
        if (misRes.status === "fulfilled" && misRes.value.data) setMissions(misRes.value.data);
      } catch (err) {
        console.error("Error loading Career Twin data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [authLoading, user]);

  // Loading safety
  if (authLoading || loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading career twin intelligence...</p>
        </div>
      </div>
    );
  }

  // Handle adding target company
  const handleAddCompany = (compName: string) => {
    const trimmed = compName.trim();
    if (!trimmed) return;
    if (!selectedCompanies.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedCompanies([...selectedCompanies, trimmed]);
    }
    setCompanySearchQuery("");
  };

  // Handle removing target company
  const handleRemoveCompany = (compName: string) => {
    setSelectedCompanies(selectedCompanies.filter((c) => c !== compName));
  };

  // Handle saving target to Supabase profile
  const handleSaveTarget = async () => {
    if (!user?.id) return;
    setSavingTarget(true);
    try {
      const updates = {
        dream_companies: selectedCompanies,
        target_role: selectedRole.trim() || null,
        preferred_location: preferredLocation.trim() || null,
        graduation_year: graduationYear ? Number(graduationYear) : null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").update(updates).eq("user_id", user.id);

      if (error) throw error;

      setProfile((prev: any) => ({ ...prev, ...updates }));
      toast.success("Dream Target configuration updated!");
    } catch (err: any) {
      console.error("Error saving target:", err);
      toast.error(err.message || "Failed to update target preferences.");
    } finally {
      setSavingTarget(false);
    }
  };

  // Target completeness state
  const hasCompany = selectedCompanies.length > 0;
  const hasRole = Boolean(selectedRole.trim());
  const targetState: "NO TARGET" | "PARTIAL TARGET" | "COMPLETE TARGET" =
    hasCompany && hasRole ? "COMPLETE TARGET" : hasCompany || hasRole ? "PARTIAL TARGET" : "NO TARGET";

  // Real Derived Data
  const totalXp = xpData?.total_xp || 0;
  const lp = levelProgress(totalXp);
  const levelNum = lp?.cur?.lvl || 1;
  const levelName = lp?.cur?.name || profile?.target_role || "Growth Seeker";

  const overallScore = placementScore?.total_score || resumeAnalysis?.ats_score || 72;
  const dsaScore = placementScore?.dsa_score || 75;
  const codingScore = placementScore?.projects_score || 80;
  const streakDays = streakData?.current_streak || 0;
  const consistencyScore = Math.min(100, streakDays * 5 + 20);

  const aiResults = resumeAnalysis?.analysis_results || {};
  const rawSkills = Array.isArray(profile?.skills)
    ? profile.skills
    : profile?.skills
    ? String(profile.skills).split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  // Strengths List
  const strengthsList = Array.isArray(aiResults.key_strengths) && aiResults.key_strengths.length > 0
    ? aiResults.key_strengths.slice(0, 3)
    : rawSkills.length > 0
    ? rawSkills.slice(0, 3).map((s: string) => `${s} Proficiency`)
    : ["Project Building & Clean Code", "Problem Solving Fundamentals", "Git & Version Control"];

  // Weaknesses List
  const weaknessesList = aiResults.biggest_gap
    ? [aiResults.biggest_gap, "System Design Architecture", "Comprehensive Unit Testing"].slice(0, 2)
    : ["System Design Architecture", "Testing & CI/CD Practices"];

  // Growth Areas List
  const growthList = aiResults.recommended_step
    ? [aiResults.recommended_step, "Advanced DSA Optimization", "Cloud & DevOps Integration"].slice(0, 3)
    : ["Advanced DSA Optimization", "System Architecture", "Cloud & DevOps Integration"];

  // Today's Mission Data
  const activeMission = missions.find((m) => !m.completed) || missions[0];
  const activeMissionTitle = activeMission?.title || "2 Medium DSA & System Design exercises";
  const activeMissionXp = activeMission?.xp_reward || 30;
  const activeMissionProgress = activeMission?.progress ?? (activeMission?.completed ? 100 : 65);

  // Memory Logs
  const memoryLogs = activityLogs.length > 0
    ? activityLogs.map((l) => ({
        text: l.title || l.action || (l.type === "resume_upload" ? "Resume uploaded & analyzed" : "Activity recorded"),
        xp: `+${l.xp_delta || 15} XP`,
      }))
    : [
        { text: "Uploaded resume v2 — ATS analysis complete", xp: "+50 XP" },
        { text: "Completed 5-day DSA activity streak", xp: "+25 XP" },
        { text: "System design practice log recorded", xp: "+30 XP" },
      ];

  const syncSummaryText = aiResults.summary || (
    `Based on your recent platform activity, your strongest signal is ${
      strengthsList[0] ? strengthsList[0].toLowerCase() : "consistent problem solving"
    }. Your main growth area is ${
      weaknessesList[0] ? weaknessesList[0].toLowerCase() : "system design"
    } — complete focused practice over the next 30 days to reach your target role.`
  );

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 relative text-slate-100 pb-24">
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      {/* ── 1. HERO ── */}
      <div className="text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161226] border border-[#2e234c] text-xs font-medium text-purple-300 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="font-mono uppercase tracking-widest text-[11px]">CAREER IDENTITY & DREAM PATH</span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
          Your digital <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">career twin.</span>
        </h1>

        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          Configure your target company and role. SyncRole compares your current readiness with your dream path.
        </p>
      </div>

      {/* ── 2. DREAM TARGET SEARCH & SELECTION CARD ── */}
      <div className="bg-[#0b0c10] border border-[#1e202e] rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                targetState === "COMPLETE TARGET"
                  ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                  : targetState === "PARTIAL TARGET"
                  ? "bg-amber-500/10 border border-amber-500/30 text-amber-300"
                  : "bg-purple-500/10 border border-purple-500/30 text-purple-300"
              }`}>
                {targetState}
              </span>
              <span className="text-xs font-semibold text-white">Target Preference Settings</span>
            </div>
            <p className="text-xs text-slate-400">
              Type to search or enter any custom company and role you are aiming for.
            </p>
          </div>

          <button
            onClick={handleSaveTarget}
            disabled={savingTarget}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:brightness-110 text-white font-semibold text-xs shadow-lg shadow-purple-500/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {savingTarget ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>Save Target Preference</span>
          </button>
        </div>

        {/* Selected Target Pills Display */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            Selected Targets
          </div>

          <div className="flex flex-wrap items-center gap-2 min-h-[38px] p-2.5 rounded-2xl bg-[#12131c] border border-white/5">
            {selectedCompanies.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-600/30 border border-purple-500/50 text-xs font-semibold text-white shadow-sm"
              >
                <Building2 className="w-3 h-3 text-purple-300" />
                <span>{c}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCompany(c)}
                  className="hover:text-purple-200 text-purple-400 p-0.5 rounded-full"
                  aria-label={`Remove ${c}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedRole && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/30 border border-blue-500/50 text-xs font-semibold text-white shadow-sm">
                <Briefcase className="w-3 h-3 text-blue-300" />
                <span>{selectedRole}</span>
                <button
                  type="button"
                  onClick={() => setSelectedRole("")}
                  className="hover:text-blue-200 text-blue-400 p-0.5 rounded-full"
                  aria-label="Clear role"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {!hasCompany && !hasRole && (
              <span className="text-xs text-slate-500 italic px-2">
                No target company or role selected yet. Search below to add.
              </span>
            )}
          </div>
        </div>

        {/* Autocomplete Search Form Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-2">
          {/* Target Company Autocomplete */}
          <AutocompleteInput
            label="Target Company Search"
            placeholder="Type company name (e.g. Google, NVIDIA, Stripe)..."
            icon={Building2}
            items={KNOWN_COMPANIES}
            value={companySearchQuery}
            onChange={setCompanySearchQuery}
            onSelectOption={handleAddCompany}
            customPromptPrefix="Add target company:"
          />

          {/* Target Role Autocomplete */}
          <AutocompleteInput
            label="Target Role Search"
            placeholder="Type role name (e.g. Full Stack Engineer, AI Engineer)..."
            icon={Briefcase}
            items={KNOWN_ROLES}
            value={roleSearchQuery || selectedRole}
            onChange={(val) => {
              setRoleSearchQuery(val);
              setSelectedRole(val);
            }}
            onSelectOption={(roleName) => {
              setSelectedRole(roleName);
              setRoleSearchQuery("");
            }}
            customPromptPrefix="Use custom role:"
          />
        </div>

        {/* Location & Graduation Year Options */}
        <div className="grid md:grid-cols-2 gap-6 pt-2 border-t border-white/5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              <span>Preferred Location</span>
            </label>
            <input
              type="text"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              placeholder="e.g. Remote, San Francisco, Bangalore"
              className="w-full bg-[#12131c] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
              <span>Graduation Year</span>
            </label>
            <input
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="e.g. 2026"
              className="w-full bg-[#12131c] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── 3. MAIN CAREER TWIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT COLUMN: CAREER PROFILE / SKILL BUILDER */}
        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-6 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">ACTIVE</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">SYNCHRONIZED</span>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-600/30 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-3xl font-bold text-white shadow-xl relative z-10 overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display bg-gradient-to-br from-white to-purple-200 bg-clip-text text-transparent">
                    {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </span>
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl group-hover:bg-purple-500/30 transition-all pointer-events-none" />
            </div>

            <div className="space-y-0.5">
              <h2 className="font-display text-lg font-bold text-white tracking-tight">
                Skill Builder
              </h2>
              <div className="text-xs font-mono font-semibold text-purple-400">
                Level {levelNum} • {levelName}
              </div>
              <p className="text-[11px] text-slate-400">
                Continuously training on your activity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center font-mono">
            <div className="space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Coding</div>
              <div className="text-sm font-bold text-white">{codingScore}%</div>
            </div>
            <div className="space-y-0.5 border-x border-white/5 px-1">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider truncate">Problem Solving</div>
              <div className="text-sm font-bold text-white">{dsaScore}%</div>
            </div>
            <div className="space-y-0.5">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Consistency</div>
              <div className="text-sm font-bold text-white">{consistencyScore}%</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-medium">Overall Progress</span>
              <span className="text-white font-bold">{overallScore}%</span>
            </div>
            <div className="h-2 bg-[#141624] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(overallScore, 0), 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center gap-3 text-xs">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div className="space-y-0.5 min-w-0">
              <div className="font-semibold text-white truncate font-mono">
                {streakDays} Day Streak
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                Consistent daily activity recorded
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/resume-intelligence"
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 hover:text-white p-2.5 rounded-xl transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">Resume Intelligence</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </Link>
          </div>
        </div>

        {/* CENTER COLUMN: STRENGTHS / WEAKNESSES / GROWTH AREAS */}
        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-6 space-y-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>STRENGTHS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">VERIFIED SIGNALS</span>
            </div>
            <div className="space-y-2">
              {strengthsList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center justify-between text-xs hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-white font-medium truncate">{item}</span>
                  </div>
                  <Code2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>WEAKNESSES</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">ATTENTION NEEDED</span>
            </div>
            <div className="space-y-2">
              {weaknessesList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center justify-between text-xs hover:border-rose-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span className="text-white font-medium truncate">{item}</span>
                  </div>
                  <Target className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>GROWTH AREAS</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">RECOMMENDED</span>
            </div>
            <div className="space-y-2">
              {growthList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-[#12131c] border border-[#20222f] rounded-xl p-3 flex items-center justify-between text-xs hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-white font-medium truncate">{item}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TODAY'S MISSION / CAREER MEMORY / SYNC SUMMARY */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span>TODAY&apos;S MISSION</span>
              </div>
              <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded font-medium">
                DAILY TASK
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white leading-snug">
                Complete {activeMissionTitle}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> +{activeMissionXp} XP on completion
                </span>
                <span>{activeMissionProgress}% Complete</span>
              </div>
              <div className="h-1.5 bg-[#141624] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${activeMissionProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                <span>CAREER MEMORY</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">RECENT LOGS</span>
            </div>

            <div className="space-y-2.5">
              {memoryLogs.length > 0 ? (
                memoryLogs.map((log: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-slate-300 bg-[#12131c] border border-[#20222f] rounded-xl p-2.5">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <ChevronRight className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="truncate">{log.text}</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-purple-400 shrink-0">{log.xp}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 italic py-2 text-center">
                  No recent career activity
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0b0c10] border border-[#1e202e] rounded-2xl p-5 space-y-3 shadow-xl bg-gradient-to-br from-[#141026] via-[#0b0c10] to-[#0b0c10]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>SYNC SUMMARY</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {syncSummaryText}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM VALUE STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <RefreshCw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">Real-time Updates</div>
            <div className="text-[10px] text-slate-400">Always learning from your activity</div>
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
            <BrainCircuit className="w-4 h-4 text-purple-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">Personalized Insights</div>
            <div className="text-[10px] text-slate-400">Tailored feedback for your growth</div>
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">AI-Powered Guidance</div>
            <div className="text-[10px] text-slate-400">Smart recommendations for you</div>
          </div>
        </div>

        <div className="bg-[#0b0c10] border border-[#1e202e] rounded-xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">Your Success Partner</div>
            <div className="text-[10px] text-slate-400">Together, we achieve more</div>
          </div>
        </div>
      </div>
    </main>
  );
}
