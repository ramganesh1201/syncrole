import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Phone, GraduationCap, Building2, Briefcase, Map, Banknote, Linkedin, Github, Globe, Code2, Target, Upload, FileText, CheckCircle2 } from "lucide-react";

import { ProfileHero } from "@/components/profile-v2/ProfileHero";
import { ProfileSidebarNav, ProfileMobileNav } from "@/components/profile-v2/ProfileSidebarNav";
import { CareerOverview } from "@/components/profile-v2/CareerOverview";
import { SkillsSection } from "@/components/profile-v2/SkillsSection";
import { ProjectsSection } from "@/components/profile-v2/ProjectsSection";
import { CodingProfilesSection } from "@/components/profile-v2/CodingProfilesSection";
import { ResumeSummary } from "@/components/profile-v2/ResumeSummary";
import { GithubSummary } from "@/components/profile-v2/GithubSummary";
import { AchievementsSection } from "@/components/profile-v2/AchievementsSection";
import { ActivityTimeline } from "@/components/profile-v2/ActivityTimeline";
import { EditProfileForm } from "@/components/profile-v2/EditProfileForm";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();
  const [profile, setProfile] = useState<any>(null);
  const [placementStats, setPlacementStats] = useState<any>(null);
  const [xpLevel, setXpLevel] = useState<any>(null);
  const [streak, setStreak] = useState<any>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [githubAnalysis, setGithubAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Placement stats for Career Identity Card
  const [uploading, setUploading] = useState(false);
  const nav = useNavigate();
  const [isEditExpanded, setIsEditExpanded] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEditClick = () => {
    setIsEditExpanded(true);
    setTimeout(() => scrollToSection("edit-profile"), 100);
  };


  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      const { data: stats } = await supabase.from("placement_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single();
      const { data: xpData } = await supabase.from("xp_levels").select("*").eq("user_id", user.id).maybeSingle();
      const { data: streakData } = await supabase.from("streaks").select("*").eq("user_id", user.id).maybeSingle();
      const { data: resumeData } = await supabase.from("resume_analysis").select("*").order("created_at", { ascending: false }).limit(1).maybeSingle();
      const { data: ghData } = await supabase.from("github_analysis").select("*").eq("user_id", user.id).maybeSingle();
      
      if (xpData) setXpLevel(xpData);
      if (streakData) setStreak(streakData);
      if (resumeData) setResumeAnalysis(resumeData);
      if (ghData) setGithubAnalysis(ghData);
      
      if (data) setProfile(data);
      if (stats) setPlacementStats(stats);
      setLoading(false);
    }
    load();
  }, [user.id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setProfile((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name: string, value: string) => {
    const arr = value.split(",").map(s => s.trim()).filter(Boolean);
    setProfile((prev: any) => ({ ...prev, [name]: arr }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Database["public"]["Tables"]["profiles"]["Update"] & { company_preference?: string | null } = {
        full_name: profile.full_name,
        phone: profile.phone,
        city: profile.city,
        college: profile.college,
        branch: profile.branch,
        graduation_year: profile.graduation_year === "" ? null : Number(profile.graduation_year),
        cgpa: profile.cgpa === "" ? null : Number(profile.cgpa),
        target_role: profile.target_role,
        dream_companies: Array.isArray(profile.dream_companies) ? profile.dream_companies : (profile.dream_companies ? String(profile.dream_companies).split(",").map(s => s.trim()).filter(Boolean) : null),
        preferred_location: profile.preferred_location,
        expected_salary: profile.expected_salary,
        career_goal: ["frontend", "backend", "fullstack", "data", "ai", "mobile", "devops", "other"].includes(profile.career_goal) ? profile.career_goal : null,
        company_preference: ["MNC", "Startup", "Freelance", "Product Based", "Service Based"].includes(profile.company_preference) ? profile.company_preference : null,
        skills: Array.isArray(profile.skills) ? profile.skills : (profile.skills ? String(profile.skills).split(",").map(s => s.trim()).filter(Boolean) : null),
        linkedin: profile.linkedin,
        github_username: profile.github_username,
        portfolio: profile.portfolio,
        leetcode: profile.leetcode,
        codeforces: profile.codeforces,
      };

      if ('career_dna' in profile) {
        (payload as any).career_dna = profile.career_dna || {};
      }

      console.log("Profile update payload:", payload);

      const { error } = await supabase.from("profiles").update(payload).eq("user_id", user.id);
      
      if (error) {
        console.error("Supabase Save Error Details:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        });
        throw error;
      }
      
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    toast.loading("Uploading...", { id: "resume-upload" });
    try {
      const ext = file.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("resumes").upload(path, file);
      if (uploadErr) throw uploadErr;

      toast.loading("Extracting Resume...", { id: "resume-upload" });
      const { extractTextFromPDF } = await import("@/lib/pdf");
      const resumeText = await extractTextFromPDF(file);

      toast.loading("Analysing Skills...", { id: "resume-upload" });
      const { data: classData, error: classErr } = await supabase.functions.invoke("resume-intelligence", {
        body: { action: "classify", resumeText }
      });
      if (classErr) throw classErr;
      const document_type = classData.document_type || "Unknown";

      const { data: existingVersions } = await supabase.from("resume_analysis").select("version_number").eq("user_id", user.id).order("version_number", { ascending: false }).limit(1);
      const version_number = existingVersions && existingVersions.length > 0 ? (existingVersions[0].version_number || 0) + 1 : 1;

      let insertData: any = {
        user_id: user.id,
        file_path: path,
        file_name: file.name,
        extracted_text: resumeText,
        document_type,
        version_number,
      };

      if (document_type === "Resume") {
        toast.loading("Calculating ATS...", { id: "resume-upload" });
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "ats_scan", resumeText }
        });
        
        if (aiErr) {
          console.error("AI Request Failed", aiErr);
          throw new Error("AI analysis failed: " + (aiErr.message || "Unknown error"));
        }
        if (!aiRes || Object.keys(aiRes).length === 0 || !aiRes.ats_score) {
          throw new Error("AI returned empty or invalid analysis results.");
        }
        
        toast.loading("Generating Recommendations...", { id: "resume-upload" });
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
        toast.loading("Analysing Document...", { id: "resume-upload" });
        const { data: aiRes, error: aiErr } = await supabase.functions.invoke("resume-intelligence", {
          body: { action: "analyze_document", resumeText }
        });
        
        if (aiErr) {
          console.error("AI Request Failed", aiErr);
          throw new Error("AI document analysis failed: " + (aiErr.message || "Unknown error"));
        }
        if (!aiRes || Object.keys(aiRes).length === 0) {
          throw new Error("AI returned empty document analysis.");
        }
        
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

      toast.loading("Saving Results...", { id: "resume-upload" });
      const { data: inserted, error: insertErr } = await supabase
        .from("resume_analysis")
        .insert(insertData)
        .select()
        .single();
        
      if (insertErr) throw insertErr;
      
      if (!inserted.file_name || !inserted.extracted_text) {
        throw new Error("Database schema cache is stale and dropped the inserted columns. Please run 'NOTIFY pgrst, reload_schema;' in your Supabase SQL editor.");
      }

      toast.success("Analysis Complete", { id: "resume-upload" });
      // Redirect to resume intelligence if it was uploaded from profile
      nav({ to: "/resume-intelligence" });
    } catch (err: any) {
      toast.error(err.message || "An error occurred during analysis", { id: "resume-upload" });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-aurora border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculate profile completion
  const fields = ['full_name', 'phone', 'city', 'college', 'branch', 'graduation_year', 'target_role', 'dream_companies', 'preferred_location', 'linkedin', 'github'];
  const filledFields = fields.filter(f => profile?.[f] && (Array.isArray(profile[f]) ? profile[f].length > 0 : true));
  const completionPct = Math.round((filledFields.length / fields.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 pb-32">
      <ProfileHero 
        profile={profile}
        placementStats={placementStats}
        completionPct={completionPct}
        xpLevel={xpLevel}
        streak={streak}
        uploading={uploading}
        onEditClick={handleEditClick}
        onUploadClick={() => scrollToSection("edit-profile")}
      />
      
      <ProfileMobileNav />
      
      <div className="flex flex-col md:flex-row gap-8 relative mt-8">
        <ProfileSidebarNav />
        
        <div className="flex-1 space-y-16 min-w-0">
          
          <section id="career-group" className="space-y-10 scroll-mt-24">
            <CareerOverview profile={profile} />
            <SkillsSection profile={profile} onEditClick={handleEditClick} />
            <ProjectsSection profile={profile} onEditClick={handleEditClick} />
          </section>

          <section id="professional-group" className="space-y-10 scroll-mt-24 pt-6 border-t border-white/5">
            <CodingProfilesSection profile={profile} onEditClick={handleEditClick} />
            <div id="resume-github" className="grid lg:grid-cols-2 gap-6 scroll-mt-24">
              <ResumeSummary placementStats={placementStats} resumeAnalysis={resumeAnalysis} uploading={uploading} onUpload={handleResumeUpload} />
              <GithubSummary profile={profile} placementStats={placementStats} githubAnalysis={githubAnalysis} />
            </div>
          </section>
          
          <section id="growth-group" className="space-y-10 scroll-mt-24 pt-6 border-t border-white/5">
            <AchievementsSection onViewAllClick={() => console.log("Open achievement modal")} />
            <ActivityTimeline placementStats={placementStats} />
          </section>

          <section id="settings-group" className="space-y-10 scroll-mt-24 pt-6 border-t border-white/5">
            <EditProfileForm 
              user={user}
              profile={profile}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleArrayChange={handleArrayChange}
              handleSave={handleSave}
              saving={saving}
              uploading={uploading}
              handleResumeUpload={handleResumeUpload}
              isExpanded={isEditExpanded}
              onToggle={() => setIsEditExpanded(!isEditExpanded)}
            />
          </section>

        </div>
      </div>
    </div>
  );
}
