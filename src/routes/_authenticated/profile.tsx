import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Phone, GraduationCap, Building2, Briefcase, Map, Banknote, Linkedin, Github, Globe, Code2, Target, Upload, FileText, CheckCircle2 } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Placement stats for Career Identity Card
  const [placementStats, setPlacementStats] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      const { data: stats } = await supabase.from("placement_scores").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single();
      
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
      const { error } = await supabase.from("profiles").update(profile).eq("user_id", user.id);
      if (error) throw error;
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
    toast.loading("Uploading resume...", { id: "resume-upload" });
    try {
      const path = `${user.id}/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("resumes").upload(path, file);
      if (error) throw error;
      toast.success("Resume uploaded! It will be analyzed shortly.", { id: "resume-upload" });
    } catch (err: any) {
      toast.error(err.message || "Failed to upload resume", { id: "resume-upload" });
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
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32">
      {/* Career Identity Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl glass border border-white/10 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center"
        id="identity"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-aurora/10 to-transparent opacity-50" />
        
        <div className="relative w-32 h-32 shrink-0 rounded-full border-4 border-background overflow-hidden shadow-[0_0_30px_rgba(var(--aurora),0.3)]">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center text-4xl font-bold text-aurora">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
          )}
        </div>

        <div className="relative flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">{profile?.full_name || "SyncRole User"}</h1>
            <p className="text-aurora font-medium mt-1">{profile?.target_role || "Aspiring Engineer"} • {profile?.city || "Remote"}</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Placement Readiness</p>
              <p className="text-2xl font-bold text-white">{placementStats?.total_score || 0}<span className="text-sm text-white/50">%</span></p>
            </div>
            <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Career Twin Score</p>
              <p className="text-2xl font-bold text-white">{(placementStats?.total_score ? Math.min(99, placementStats.total_score + 12) : 0)}<span className="text-sm text-white/50">%</span></p>
            </div>
            <div className="bg-white/5 rounded-lg px-4 py-2 border border-white/5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Dream Company</p>
              <p className="text-lg font-bold text-white mt-1">{profile?.dream_companies?.[0] || "Undecided"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Completion */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 border border-white/5">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2"><Target className="w-5 h-5 text-aurora" /> Profile Completion</h3>
            <p className="text-sm text-muted-foreground mt-1">Complete your profile to unlock better SyncPilot recommendations.</p>
          </div>
          <span className="text-2xl font-bold text-aurora">{completionPct}%</span>
        </div>
        <Progress value={completionPct} className="h-2 bg-white/5" indicatorColor="bg-aurora" />
      </motion.div>

      {/* Forms Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Personal Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          <div className="glass rounded-xl p-6 border border-white/5 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><User className="w-5 h-5 text-aurora" /> Personal Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <Input name="full_name" value={profile?.full_name || ""} onChange={handleChange} className="bg-black/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <Input value={user.email || ""} disabled className="bg-black/20 opacity-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <Input name="phone" value={profile?.phone || ""} onChange={handleChange} className="bg-black/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">City</label>
                <Input name="city" value={profile?.city || ""} onChange={handleChange} className="bg-black/20" />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="glass rounded-xl p-6 border border-white/5 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><GraduationCap className="w-5 h-5 text-aurora" /> Education</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">College / University</label>
                <Input name="college" value={profile?.college || ""} onChange={handleChange} className="bg-black/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Degree / Branch</label>
                  <Input name="branch" value={profile?.branch || ""} onChange={handleChange} className="bg-black/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Graduation Year</label>
                  <Input name="graduation_year" type="number" value={profile?.graduation_year || ""} onChange={handleChange} className="bg-black/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">CGPA</label>
                <Input name="cgpa" type="number" step="0.1" value={profile?.cgpa || ""} onChange={handleChange} className="bg-black/20" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          
          {/* Career Goals */}
          <div className="glass rounded-xl p-6 border border-white/5 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><Briefcase className="w-5 h-5 text-aurora" /> Career Goals</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Target Role</label>
                <Input name="target_role" value={profile?.target_role || ""} onChange={handleChange} placeholder="e.g. Frontend Engineer, Product Manager" className="bg-black/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Dream Companies (comma separated)</label>
                <Input 
                  value={profile?.dream_companies?.join(", ") || ""} 
                  onChange={(e) => handleArrayChange("dream_companies", e.target.value)} 
                  placeholder="Google, Microsoft, Stripe" 
                  className="bg-black/20" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Preferred Location</label>
                  <Input name="preferred_location" value={profile?.preferred_location || ""} onChange={handleChange} className="bg-black/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Expected Salary</label>
                  <Input name="expected_salary" value={profile?.expected_salary || ""} onChange={handleChange} placeholder="$120k" className="bg-black/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Career Goal Mode</label>
                <Select value={profile?.career_goal || ""} onValueChange={(val) => handleSelectChange("career_goal", val)}>
                  <SelectTrigger className="bg-black/20">
                    <SelectValue placeholder="Select primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MNC">MNC / Big Tech</SelectItem>
                    <SelectItem value="STARTUP">High-Growth Startup</SelectItem>
                    <SelectItem value="FREELANCE">Freelance / Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Skills (comma separated)</label>
                <Input 
                  value={profile?.skills?.join(", ") || ""} 
                  onChange={(e) => handleArrayChange("skills", e.target.value)} 
                  placeholder="React, Python, System Design" 
                  className="bg-black/20" 
                />
              </div>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="glass rounded-xl p-6 border border-white/5 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><Globe className="w-5 h-5 text-aurora" /> Social & Coding Profiles</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn URL</label>
                <Input name="linkedin" value={profile?.linkedin || ""} onChange={handleChange} className="bg-black/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Github className="w-4 h-4" /> GitHub Username</label>
                <Input name="github_username" value={profile?.github_username || ""} onChange={handleChange} className="bg-black/20" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Globe className="w-4 h-4" /> Portfolio URL</label>
                <Input name="portfolio" value={profile?.portfolio || ""} onChange={handleChange} className="bg-black/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Code2 className="w-4 h-4" /> LeetCode</label>
                  <Input name="leetcode" value={profile?.leetcode || ""} onChange={handleChange} className="bg-black/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Code2 className="w-4 h-4" /> Codeforces</label>
                  <Input name="codeforces" value={profile?.codeforces || ""} onChange={handleChange} className="bg-black/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="glass rounded-xl p-6 border border-white/5 space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><FileText className="w-5 h-5 text-aurora" /> Resume</h3>
            
            <div className="bg-black/20 border border-white/5 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                <FileText className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Upload or replace your resume</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 5MB</p>
              </div>
              <label className="mt-2 cursor-pointer">
                <span className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                  <Upload className="w-4 h-4 mr-2" /> {uploading ? "Uploading..." : "Select File"}
                </span>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={uploading} />
              </label>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Floating Save Bar */}
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }} 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-6 shadow-2xl z-50"
      >
        <p className="text-sm font-medium text-muted-foreground hidden sm:block">You have unsaved changes</p>
        <Button onClick={handleSave} disabled={saving} className="bg-aurora hover:bg-aurora/90 text-background px-8 rounded-xl font-bold tracking-wide">
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </motion.div>
    </div>
  );
}
