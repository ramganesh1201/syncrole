import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef, useId, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Target,
  Code2,
  FileText,
  ChevronRight,
  Zap,
  CheckCircle2,
  AlertCircle,
  Flame,
  Loader2,
  Building2,
  Briefcase,
  X,
  Check,
  MapPin,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  Clock,
  BookOpen,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { levelProgress } from "@/lib/syncrole";
import { useAuth } from "@/hooks/use-auth";
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
    <div ref={containerRef} className="relative space-y-1.5 text-left">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-blue-600" />
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
          className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all pr-8 min-h-[44px]"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              setIsOpen(true);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 text-xs"
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
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl py-1 shadow-xl max-h-56 overflow-y-auto text-left"
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
                      ? "bg-blue-50 text-blue-900 font-semibold"
                      : isSelected
                      ? "text-blue-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
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
                className={`px-3.5 py-2 text-xs font-semibold text-blue-600 cursor-pointer border-t border-slate-100 flex items-center justify-between transition-colors ${
                  activeIndex === filteredOptions.length ? "bg-blue-50 text-blue-900" : "hover:bg-blue-50/50"
                }`}
              >
                <span>
                  {customPromptPrefix} &quot;{value.trim()}&quot;
                </span>
                <span className="text-xs font-bold">+</span>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
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
      <div className="flex items-center justify-center min-h-[60vh] bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
          <p className="text-xs text-slate-500 font-medium">Loading career target intelligence...</p>
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
      toast.success("Career Target preferences saved!");
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

  // Derived Data
  const totalXp = xpData?.total_xp || 0;
  const lp = levelProgress(totalXp);
  const levelNum = lp?.cur?.lvl || 1;
  const levelName = lp?.cur?.name || profile?.target_role || "Growth Seeker";

  const overallScore = placementScore?.total_score || resumeAnalysis?.ats_score || 68;
  const dsaScore = placementScore?.dsa_score || 65;
  const codingScore = placementScore?.projects_score || 80;
  const streakDays = streakData?.current_streak || 0;
  const consistencyScore = Math.min(100, streakDays * 5 + 30);

  const aiResults = resumeAnalysis?.analysis_results || {};
  const rawSkills = Array.isArray(profile?.skills)
    ? profile.skills
    : profile?.skills
    ? String(profile.skills).split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  // Strengths List
  const strengthsList = Array.isArray(aiResults.key_strengths) && aiResults.key_strengths.length > 0
    ? aiResults.key_strengths.slice(0, 2)
    : rawSkills.length > 0
    ? rawSkills.slice(0, 2).map((s: string) => `${s} Proficiency`)
    : ["React & Component Architecture", "Core Web Fundamentals"];

  // Weaknesses / Needs Attention List
  const weaknessesList = aiResults.biggest_gap
    ? [aiResults.biggest_gap, "System Design Architecture"].slice(0, 2)
    : ["System Design Architecture", "Testing & CI/CD Practices"];

  // Growth Areas List
  const growthList = aiResults.recommended_step
    ? [aiResults.recommended_step, "Advanced DSA Optimization", "Cloud Infrastructure"].slice(0, 3)
    : ["Advanced DSA Optimization", "System Architecture", "Cloud & DevOps Integration"];

  // Today's Mission Data
  const activeMission = missions.find((m) => !m.completed) || missions[0];
  const activeMissionTitle = activeMission?.title || "Complete Array & Hashing Practice";
  const activeMissionXp = activeMission?.xp_reward || 20;
  const activeMissionProgress = activeMission?.progress ?? (activeMission?.completed ? 100 : 45);

  // Memory Logs
  const memoryLogs = activityLogs.length > 0
    ? activityLogs.map((l) => ({
        text: l.title || l.action || (l.type === "resume_upload" ? "Resume analyzed for ATS match" : "DSA session recorded"),
        xp: `+${l.xp_delta || 15} XP`,
      }))
    : [
        { text: "Resume analyzed for ATS match", xp: "+15 XP" },
        { text: "DSA Array Practice completed", xp: "+15 XP" },
        { text: "GitHub activity sync recorded", xp: "+15 XP" },
      ];

  const syncSummaryText = aiResults.summary || (
    `Your recent activity shows strong ${
      strengthsList[0] ? strengthsList[0].toLowerCase() : "react"
    } progress. Your biggest current opportunity is ${
      weaknessesList[0] ? weaknessesList[0].toLowerCase() : "system design"
    }. Focus on system design practice to boost your recruiter callback rate.`
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 text-slate-900 font-sans text-left pb-24 md:pb-12">
      {/* ── 1. PAGE HEADER ── */}
      <div className="space-y-1.5 text-left">
        <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>CAREER IDENTITY & DREAM PATH</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Your digital career twin.
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-normal">
          Configure your target company and role. SyncRole uses your activity and profile to show the path toward your target.
        </p>
      </div>

      {/* ── 2. CAREER TARGET WORKSPACE ── */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-7 shadow-2xs space-y-5">
        {/* Header & Save Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                targetState === "COMPLETE TARGET"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : targetState === "PARTIAL TARGET"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {targetState}
            </span>
            <h2 className="text-sm font-bold text-slate-900">Career Target Settings</h2>
          </div>

          <button
            onClick={handleSaveTarget}
            disabled={savingTarget}
            className="bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-xs py-2.5 px-5 rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            {savingTarget ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            <span>Save Target</span>
          </button>
        </div>

        {/* Selected Target Pills */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Selected Target Pills
          </span>

          <div className="flex flex-wrap items-center gap-2 min-h-[38px] p-2 bg-slate-50 border border-slate-200/60 rounded-xl">
            {selectedCompanies.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-900"
              >
                <Building2 className="w-3 h-3 text-blue-600" />
                <span>{c}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCompany(c)}
                  className="hover:text-blue-700 text-blue-500 p-0.5 rounded-full"
                  aria-label={`Remove ${c}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {selectedRole && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-900">
                <Briefcase className="w-3 h-3 text-indigo-600" />
                <span>{selectedRole}</span>
                <button
                  type="button"
                  onClick={() => setSelectedRole("")}
                  className="hover:text-indigo-700 text-indigo-500 p-0.5 rounded-full"
                  aria-label="Clear role"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {!hasCompany && !hasRole && (
              <span className="text-xs text-slate-400 italic px-2">
                No target company or role selected. Type below to add.
              </span>
            )}
          </div>
        </div>

        {/* Autocomplete Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AutocompleteInput
            label="Target Company Search"
            placeholder="Type company (e.g. Google, Stripe, NVIDIA)..."
            icon={Building2}
            items={KNOWN_COMPANIES}
            value={companySearchQuery}
            onChange={setCompanySearchQuery}
            onSelectOption={handleAddCompany}
            customPromptPrefix="Add target company:"
          />

          <AutocompleteInput
            label="Target Role Search"
            placeholder="Type role (e.g. Software Engineer, Full Stack)..."
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

        {/* Location & Graduation Year Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Preferred Location</span>
            </label>
            <input
              type="text"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              placeholder="e.g. Remote, San Francisco, Hyderabad"
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Graduation Year</span>
            </label>
            <input
              type="number"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              placeholder="e.g. 2028"
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all min-h-[44px]"
            />
          </div>
        </div>

        {/* Compact Saved Target Summary Strip */}
        <div className="pt-2">
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Target</span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {selectedCompanies[0] || "Not Specified"}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Role</span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {selectedRole || "Not Specified"}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Location</span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {preferredLocation || "Flexible"}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Graduation</span>
              <span className="text-xs font-bold text-slate-900 truncate block">
                {graduationYear || "2028"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN WORKSPACE GRID (READINESS · STRENGTHS/GAPS · MISSION) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: CAREER READINESS (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Career Readiness</h3>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Level {levelNum} • {levelName}
            </span>
          </div>

          {/* Large Compact Readiness Score Display */}
          <div className="space-y-2 text-left">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-slate-900">{overallScore}%</span>
              <span className="text-xs text-slate-500 font-medium">Overall Preparedness</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.max(overallScore, 0), 100)}%` }}
              />
            </div>
          </div>

          {/* Metric Rows */}
          <div className="space-y-3 pt-2 border-t border-slate-100 text-xs font-medium">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Coding & Projects</span>
              <span className="font-bold text-slate-900">{codingScore}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${codingScore}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Problem Solving (DSA)</span>
              <span className="font-bold text-slate-900">{dsaScore}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${dsaScore}%` }} />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">Consistency</span>
              <span className="font-bold text-slate-900">{consistencyScore}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${consistencyScore}%` }} />
            </div>
          </div>

          {/* Streak Indicator */}
          <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 flex items-center gap-3 text-left">
            <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">{streakDays} Day Streak</div>
              <div className="text-[11px] text-slate-500 font-medium">Activity recorded today</div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: STRENGTHS / NEEDS ATTENTION / GROWTH AREAS (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
          {/* Strengths Section */}
          <div className="space-y-2.5 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Strengths</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">VERIFIED</span>
            </div>
            <div className="space-y-1.5">
              {strengthsList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5 text-xs text-slate-800 font-medium flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention Section */}
          <div className="space-y-2.5 text-left pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Needs Attention</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">PRIORITY</span>
            </div>
            <div className="space-y-1.5">
              {weaknessesList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-amber-50/60 border border-amber-100 rounded-xl p-2.5 text-xs text-slate-800 font-medium flex items-center gap-2"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Areas Section */}
          <div className="space-y-2.5 text-left pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                <span>Growth Areas</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">RECOMMENDED</span>
            </div>
            <div className="space-y-1.5">
              {growthList.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-2.5 text-xs text-slate-800 font-medium flex items-center gap-2"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TODAY'S MISSION & RECENT ACTIVITY & SYNC SUMMARY (3 Cols) */}
        <div className="lg:col-span-3 space-y-5 text-left">
          {/* Today's Mission Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                <span>Today's Mission</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full">
                Daily Task
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                {activeMissionTitle}
              </h4>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="text-blue-700 font-bold">+{activeMissionXp} XP</span>
                <span>{activeMissionProgress}% Complete</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${activeMissionProgress}%` }}
                />
              </div>
            </div>

            <Link
              to="/dashboard/dsa"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 rounded-full shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
            >
              <span>Continue Mission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Recent Activity List */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Recent Activity</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">LOGS</span>
            </div>

            <div className="space-y-2">
              {memoryLogs.map((log: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-slate-700 bg-slate-50 p-2 rounded-xl border border-slate-200/60"
                >
                  <span className="truncate pr-2">{log.text}</span>
                  <span className="text-[10px] font-bold text-blue-600 shrink-0">{log.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Summary insight */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Sync Summary</span>
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {syncSummaryText}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. SUPPORTING ACTION: RESUME INTELLIGENCE ── */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Resume Intelligence</h4>
            <p className="text-xs text-slate-500 font-normal">
              Analyze your resume for ATS score match against your target role.
            </p>
          </div>
        </div>

        <Link
          to="/resume-intelligence"
          className="bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs py-2.5 px-5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[44px]"
        >
          <span>View Analysis</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
