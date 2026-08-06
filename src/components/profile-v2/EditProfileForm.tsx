import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, Globe, Linkedin, Github, Code2, FileText, Upload, ChevronDown, ChevronUp, Settings } from "lucide-react";
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
      id="edit-profile"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Settings & Configuration</h2>
          <p className="text-sm text-muted-foreground">Manage your personal information and career preferences.</p>
        </div>
      </div>

      <div 
        className="glass bg-slate-900/60 border border-white/10 rounded-3xl p-6 cursor-pointer hover:bg-slate-800/80 transition-all shadow-lg flex items-center justify-between group"
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-white/5 group-hover:border-white/10 transition-colors">
            <Settings className="w-6 h-6 text-slate-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Edit Profile</h3>
            <p className="text-sm text-muted-foreground">Click to {isExpanded ? "collapse" : "expand"} the configuration form.</p>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center transition-all ${isExpanded ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" : "text-white"}`}>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </div>

      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="mt-6 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Personal Information Group */}
            <div className="space-y-8">
              <div className="glass bg-slate-900/40 rounded-3xl p-8 border border-white/5 shadow-xl">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><User className="w-5 h-5 text-indigo-400" /> Personal Information</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                    <Input name="full_name" value={profile?.full_name || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                      <Input value={user.email || ""} disabled className="bg-black/20 border-white/5 h-12 rounded-xl opacity-50 cursor-not-allowed" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Phone</label>
                      <Input name="phone" value={profile?.phone || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">City</label>
                    <Input name="city" value={profile?.city || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                </div>
              </div>

              {/* Education Group */}
              <div className="glass bg-slate-900/40 rounded-3xl p-8 border border-white/5 shadow-xl">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><GraduationCap className="w-5 h-5 text-indigo-400" /> Education</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">College / University</label>
                    <Input name="college" value={profile?.college || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Degree / Branch</label>
                      <Input name="branch" value={profile?.branch || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Grad Year</label>
                      <Input name="graduation_year" type="number" value={profile?.graduation_year || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">CGPA</label>
                    <Input name="cgpa" type="number" step="0.1" value={profile?.cgpa || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Career Goals Group */}
            <div className="space-y-8">
              <div className="glass bg-slate-900/40 rounded-3xl p-8 border border-white/5 shadow-xl">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><Briefcase className="w-5 h-5 text-indigo-400" /> Career Goals & Preferences</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Target Role</label>
                    <Input name="target_role" value={profile?.target_role || ""} onChange={handleChange} placeholder="e.g. Frontend Engineer" className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Dream Companies</label>
                    <Input 
                      value={profile?.dream_companies?.join(", ") || ""} 
                      onChange={(e) => handleArrayChange("dream_companies", e.target.value)} 
                      placeholder="Google, Microsoft, Stripe (comma separated)" 
                      className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Location</label>
                      <Input name="preferred_location" value={profile?.preferred_location || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Expected Salary</label>
                      <Input name="expected_salary" value={profile?.expected_salary || ""} onChange={handleChange} placeholder="$120k" className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Company Type</label>
                      <Select value={profile?.company_preference || ""} onValueChange={(val) => handleSelectChange("company_preference", val)}>
                        <SelectTrigger className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50">
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
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Domain</label>
                      <Select value={profile?.career_goal || ""} onValueChange={(val) => handleSelectChange("career_goal", val)}>
                        <SelectTrigger className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50">
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

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Skills</label>
                    <Input 
                      value={profile?.skills?.join(", ") || ""} 
                      onChange={(e) => handleArrayChange("skills", e.target.value)} 
                      placeholder="React, Python, System Design (comma separated)" 
                      className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" 
                    />
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="glass bg-slate-900/40 rounded-3xl p-8 border border-white/5 shadow-xl">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><Globe className="w-5 h-5 text-indigo-400" /> Professional Links</h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</label>
                    <Input name="linkedin" value={profile?.linkedin || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Github className="w-3.5 h-3.5" /> GitHub</label>
                    <Input name="github_username" value={profile?.github_username || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> Portfolio</label>
                    <Input name="portfolio" value={profile?.portfolio || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> LeetCode</label>
                      <Input name="leetcode" value={profile?.leetcode || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1 flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5" /> Codeforces</label>
                      <Input name="codeforces" value={profile?.codeforces || ""} onChange={handleChange} className="bg-black/20 border-white/5 h-12 rounded-xl focus-visible:ring-indigo-500/50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Upload Box */}
              <div className="bg-indigo-600/5 border border-indigo-500/20 border-dashed rounded-3xl p-8 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                  <FileText className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Upload Manual Resume</p>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider font-bold">PDF, DOCX up to 5MB</p>
                </div>
                <label className="mt-3 cursor-pointer">
                  <span className="inline-flex items-center justify-center rounded-xl text-xs font-bold transition-colors bg-white/10 hover:bg-white/20 text-white h-10 px-6 shadow-lg">
                    <Upload className="w-3.5 h-3.5 mr-2" /> {uploading ? "Uploading..." : "Select File"}
                  </span>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} disabled={uploading} />
                </label>
              </div>

            </div>
          </div>
          
          <div className="mt-8 flex justify-end sticky bottom-6 z-50">
            <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-500 text-white h-12 px-10 rounded-xl font-bold tracking-wide shadow-xl shadow-indigo-500/25 border border-indigo-400/20 text-sm">
              {saving ? "Saving Changes..." : "Save Profile Settings"}
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
