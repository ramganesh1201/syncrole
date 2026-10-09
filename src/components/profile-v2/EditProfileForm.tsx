import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, Globe, Linkedin, Github, Code2, FileText, Upload, Settings, X, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  onClose?: () => void;
}

export const EditProfileForm = React.memo(function EditProfileForm({
  user,
  profile,
  handleChange,
  handleSelectChange,
  handleArrayChange,
  handleSave,
  saving,
  uploading,
  handleResumeUpload,
  onClose
}: EditProfileFormProps) {

  return (
    <div className="bg-white md:rounded-2xl rounded-t-2xl border border-slate-200/90 shadow-2xl md:max-w-4xl w-full mx-auto overflow-hidden flex flex-col md:max-h-[90vh] h-full md:h-auto">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">Edit Profile & Settings</h3>
            <p className="text-xs text-slate-500 font-medium">Update your career goals, experience, and contact details.</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Form Content Body */}
      <div className="p-6 overflow-y-auto space-y-6 flex-1">
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Left Column: Personal Info & Education */}
          <div className="space-y-6">
            {/* Personal Information Group */}
            <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-blue-600" /> Personal Details
              </h4>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <Input name="full_name" value={profile?.full_name || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Email</label>
                    <Input value={user?.email || ""} disabled className="bg-slate-100 border-slate-200 h-10 text-xs text-slate-500 opacity-80 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Phone</label>
                    <Input name="phone" value={profile?.phone || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">City</label>
                  <Input name="city" value={profile?.city || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                </div>
              </div>
            </div>

            {/* Education Group */}
            <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-blue-600" /> Education
              </h4>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">College / University</label>
                  <Input name="college" value={profile?.college || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Degree / Branch</label>
                    <Input name="branch" value={profile?.branch || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Grad Year</label>
                    <Input name="graduation_year" type="number" value={profile?.graduation_year || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">CGPA</label>
                  <Input name="cgpa" type="number" step="0.1" value={profile?.cgpa || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Career Goals & Links */}
          <div className="space-y-6">
            {/* Career Goals Group */}
            <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-blue-600" /> Career Target & Preferences
              </h4>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Target Role</label>
                  <Input name="target_role" value={profile?.target_role || ""} onChange={handleChange} placeholder="e.g. Full-Stack Developer" className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Target Companies</label>
                  <Input 
                    value={profile?.dream_companies?.join(", ") || ""} 
                    onChange={(e) => handleArrayChange("dream_companies", e.target.value)} 
                    placeholder="Google, Microsoft, Stripe" 
                    className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Location</label>
                    <Input name="preferred_location" value={profile?.preferred_location || ""} onChange={handleChange} className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Expected Salary</label>
                    <Input name="expected_salary" value={profile?.expected_salary || ""} onChange={handleChange} placeholder="e.g. $120k / ₹15 LPA" className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Company Preference</label>
                    <Select value={profile?.company_preference || ""} onValueChange={(val) => handleSelectChange("company_preference", val)}>
                      <SelectTrigger className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600">
                        <SelectValue placeholder="Select type" />
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
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Domain</label>
                    <Select value={profile?.career_goal || ""} onValueChange={(val) => handleSelectChange("career_goal", val)}>
                      <SelectTrigger className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600">
                        <SelectValue placeholder="Select domain" />
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
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">Primary Technical Skills</label>
                  <Input 
                    value={profile?.skills?.join(", ") || ""} 
                    onChange={(e) => handleArrayChange("skills", e.target.value)} 
                    placeholder="React, TypeScript, Node.js" 
                    className="bg-white border-slate-200 h-10 text-xs text-slate-900 focus-visible:ring-blue-600" 
                  />
                </div>
              </div>
            </div>

            {/* Social Profiles */}
            <div className="bg-slate-50/70 rounded-xl p-5 border border-slate-200/80">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-blue-600" /> Professional Profiles & Links
              </h4>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Linkedin className="w-3 h-3 text-blue-700" /> LinkedIn Profile
                  </label>
                  <Input name="linkedin" value={profile?.linkedin || ""} onChange={handleChange} placeholder="https://linkedin.com/in/username" className="bg-white border-slate-200 h-9 text-xs text-slate-900" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Github className="w-3 h-3 text-slate-900" /> GitHub Username
                  </label>
                  <Input name="github_username" value={profile?.github_username || ""} onChange={handleChange} placeholder="username" className="bg-white border-slate-200 h-9 text-xs text-slate-900" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3 text-slate-600" /> Portfolio Website
                  </label>
                  <Input name="portfolio" value={profile?.portfolio || ""} onChange={handleChange} placeholder="https://yourportfolio.com" className="bg-white border-slate-200 h-9 text-xs text-slate-900" />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-amber-600" /> LeetCode
                    </label>
                    <Input name="leetcode" value={profile?.leetcode || ""} onChange={handleChange} placeholder="username" className="bg-white border-slate-200 h-9 text-xs text-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-red-600" /> Codeforces
                    </label>
                    <Input name="codeforces" value={profile?.codeforces || ""} onChange={handleChange} placeholder="username" className="bg-white border-slate-200 h-9 text-xs text-slate-900" />
                  </div>
                </div>
              </div>
            </div>

            {/* Resume Upload Box */}
            <div className="bg-blue-50/60 border border-blue-200/80 border-dashed rounded-xl p-5 text-center flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Upload Manual Resume</p>
                  <p className="text-[10px] text-slate-500 font-medium">PDF, DOCX up to 5MB</p>
                </div>
              </div>
              <label className="cursor-pointer shrink-0">
                <span className="inline-flex items-center justify-center rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 shadow-xs transition-colors">
                  <Upload className="w-3.5 h-3.5 mr-1.5" /> {uploading ? "Uploading..." : "Select File"}
                </span>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={uploading} />
              </label>
            </div>

          </div>
        </div>
      </div>
      
      {/* Footer Bar */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
        {onClose && (
          <Button variant="outline" onClick={onClose} className="h-10 px-5 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold text-xs rounded-xl cursor-pointer">
            Cancel
          </Button>
        )}
        <Button onClick={handleSave} disabled={saving} className="h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5">
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Profile Settings"}
        </Button>
      </div>
    </div>
  );
});
