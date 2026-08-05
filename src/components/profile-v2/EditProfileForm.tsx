import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, Globe, Linkedin, Github, Code2, FileText, Upload, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface EditProfileFormProps {
  user: any;
  profile: any;
  handleChange: (e: any) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleArrayChange: (name: string, value: string) => void;
  handleSave: () => void;
  saving: boolean;
  uploading: boolean;
  handleResumeUpload: (e: any) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

export function EditProfileForm({
  user,
  profile,
  handleChange,
  handleSelectChange,
  handleArrayChange,
  handleSave,
  saving,
  uploading,
  handleResumeUpload,
  isExpanded,
  onToggle
}: EditProfileFormProps) {

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="mb-8"
      id="edit-profile"
    >
      <div 
        className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-slate-800/80 transition-colors flex items-center justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <User className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Edit Profile & Settings</h3>
            <p className="text-sm text-muted-foreground">Update your personal details, career goals, and links.</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
          {isExpanded ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
        </div>
      </div>

      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="mt-6 overflow-hidden"
        >
          {/* EXACT Forms Grid From Original */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="glass bg-slate-900/80 rounded-xl p-6 border border-white/10 space-y-4 shadow-xl">
                <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><User className="w-5 h-5 text-aurora" /> Personal Information</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <Input name="full_name" value={profile?.full_name || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <Input value={user.email || ""} disabled className="bg-black/40 border-white/10 opacity-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <Input name="phone" value={profile?.phone || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">City</label>
                    <Input name="city" value={profile?.city || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="glass bg-slate-900/80 rounded-xl p-6 border border-white/10 space-y-4 shadow-xl">
                <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><GraduationCap className="w-5 h-5 text-aurora" /> Education</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">College / University</label>
                    <Input name="college" value={profile?.college || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Degree / Branch</label>
                      <Input name="branch" value={profile?.branch || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Graduation Year</label>
                      <Input name="graduation_year" type="number" value={profile?.graduation_year || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">CGPA</label>
                    <Input name="cgpa" type="number" step="0.1" value={profile?.cgpa || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Career Goals */}
              <div className="glass bg-slate-900/80 rounded-xl p-6 border border-white/10 space-y-4 shadow-xl">
                <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><Briefcase className="w-5 h-5 text-aurora" /> Career Goals</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Target Role</label>
                    <Input name="target_role" value={profile?.target_role || ""} onChange={handleChange} placeholder="e.g. Frontend Engineer, Product Manager" className="bg-black/40 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Dream Companies (comma separated)</label>
                    <Input 
                      value={profile?.dream_companies?.join(", ") || ""} 
                      onChange={(e) => handleArrayChange("dream_companies", e.target.value)} 
                      placeholder="Google, Microsoft, Stripe" 
                      className="bg-black/40 border-white/10" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Preferred Location</label>
                      <Input name="preferred_location" value={profile?.preferred_location || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Expected Salary</label>
                      <Input name="expected_salary" value={profile?.expected_salary || ""} onChange={handleChange} placeholder="$120k" className="bg-black/40 border-white/10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Company Preference</label>
                    <Select value={profile?.company_preference || ""} onValueChange={(val) => handleSelectChange("company_preference", val)}>
                      <SelectTrigger className="bg-black/40 border-white/10">
                        <SelectValue placeholder="Select company preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MNC">MNC / Big Tech</SelectItem>
                        <SelectItem value="Startup">High-Growth Startup</SelectItem>
                        <SelectItem value="Freelance">Freelance / Remote</SelectItem>
                        <SelectItem value="Product Based">Product Based</SelectItem>
                        <SelectItem value="Service Based">Service Based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Engineering Domain</label>
                    <Select value={profile?.career_goal || ""} onValueChange={(val) => handleSelectChange("career_goal", val)}>
                      <SelectTrigger className="bg-black/40 border-white/10">
                        <SelectValue placeholder="Select engineering domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="fullstack">Fullstack</SelectItem>
                        <SelectItem value="data">Data Engineering</SelectItem>
                        <SelectItem value="ai">AI / ML</SelectItem>
                        <SelectItem value="mobile">Mobile Dev</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Skills (comma separated)</label>
                    <Input 
                      value={profile?.skills?.join(", ") || ""} 
                      onChange={(e) => handleArrayChange("skills", e.target.value)} 
                      placeholder="React, Python, System Design" 
                      className="bg-black/40 border-white/10" 
                    />
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="glass bg-slate-900/80 rounded-xl p-6 border border-white/10 space-y-4 shadow-xl">
                <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><Globe className="w-5 h-5 text-aurora" /> Social & Coding Profiles</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn URL</label>
                    <Input name="linkedin" value={profile?.linkedin || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Github className="w-4 h-4" /> GitHub Username</label>
                    <Input name="github_username" value={profile?.github_username || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Globe className="w-4 h-4" /> Portfolio URL</label>
                    <Input name="portfolio" value={profile?.portfolio || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Code2 className="w-4 h-4" /> LeetCode</label>
                      <Input name="leetcode" value={profile?.leetcode || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Code2 className="w-4 h-4" /> Codeforces</label>
                      <Input name="codeforces" value={profile?.codeforces || ""} onChange={handleChange} className="bg-black/40 border-white/10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div className="glass bg-slate-900/80 rounded-xl p-6 border border-white/10 space-y-4 shadow-xl">
                <h3 className="font-semibold text-lg flex items-center gap-2 border-b border-white/5 pb-4"><FileText className="w-5 h-5 text-aurora" /> Resume</h3>
                
                <div className="bg-black/40 border border-white/10 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Upload or replace your resume</p>
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

            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-xl font-bold tracking-wide shadow-lg shadow-indigo-500/20">
              {saving ? "Saving..." : "Save Profile Updates"}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
