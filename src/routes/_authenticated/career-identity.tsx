import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, Target, Sparkles, BrainCircuit, Briefcase, MapPin, Loader2, CheckCircle2, ArrowRight, FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/career-identity")({
  component: CareerIdentityPage,
});

function CareerIdentityPage() {
  const { user } = Route.useRouteContext();
  const [profile, setProfile] = useState<any>(null);
  const [resumeAnalysis, setResumeAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
        
      if (profileData) setProfile(profileData);

      const { data: analysisData } = await supabase
        .from("resume_analysis")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (analysisData) setResumeAnalysis(analysisData);
      
      setLoading(false);
    }
    
    loadData();
  }, [user.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading career intelligence...</p>
        </div>
      </div>
    );
  }

  // Profile Derived Data
  const targetRole = profile?.target_role;
  const dreamCompany = profile?.dream_companies?.[0];
  const preferredLocation = profile?.preferred_location || profile?.city;
  const companyPreference = profile?.company_preference;
  const engineeringDomain = profile?.career_goal ? profile.career_goal.charAt(0).toUpperCase() + profile.career_goal.slice(1) : null;
  const skills = Array.isArray(profile?.skills) ? profile.skills : (profile?.skills ? String(profile.skills).split(",").map(s => s.trim()).filter(Boolean) : []);
  
  // Resume Intelligence Derived Data
  const hasResume = !!resumeAnalysis;
  const isAnalyzed = hasResume && resumeAnalysis.ats_score !== null;
  const aiResults = resumeAnalysis?.analysis_results || {};
  const strengths = Array.isArray(aiResults.key_strengths) ? aiResults.key_strengths : (aiResults.key_strengths ? [aiResults.key_strengths] : []);
  const aiSummary = aiResults.summary || null;
  
  return (
    <div className="max-w-[1100px] mx-auto px-4 md:px-6 py-8 space-y-8 pb-32">
      
      {/* 1. CAREER IDENTITY */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <Fingerprint className="w-8 h-8 text-indigo-400" /> Career Identity
          </h1>
          <p className="text-muted-foreground">Your professional DNA and strategic direction.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Primary Role</span>
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-indigo-400" /> {targetRole || "Not specified"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Engineering Domain</span>
            <span className="text-sm font-bold text-slate-200">{engineeringDomain || "Not specified"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Dream Company</span>
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-rose-400" /> {dreamCompany || "Not specified"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Preferred Location</span>
            <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {preferredLocation || "Not specified"}</span>
          </div>
        </div>
      </section>

      <hr className="border-white/5" />

      {/* 2. CAREER DIRECTION */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Career Direction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-indigo-400/80 uppercase mb-1">Target Role</span>
            <span className="font-bold text-white text-sm">{targetRole || <span className="text-slate-500 font-medium">Not specified</span>}</span>
          </div>
          <div className="glass bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-rose-400/80 uppercase mb-1">Dream Company</span>
            <span className="font-bold text-white text-sm">{dreamCompany || <span className="text-slate-500 font-medium">Not specified</span>}</span>
          </div>
          <div className="glass bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-emerald-400/80 uppercase mb-1">Engineering Domain</span>
            <span className="font-bold text-white text-sm">{engineeringDomain || <span className="text-slate-500 font-medium">Not specified</span>}</span>
          </div>
          <div className="glass bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-amber-400/80 uppercase mb-1">Company Preference</span>
            <span className="font-bold text-white text-sm">{companyPreference || <span className="text-slate-500 font-medium">Not specified</span>}</span>
          </div>
          <div className="glass bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col">
            <span className="text-[10px] font-black tracking-widest text-cyan-400/80 uppercase mb-1">Preferred Location</span>
            <span className="font-bold text-white text-sm">{preferredLocation || <span className="text-slate-500 font-medium">Not specified</span>}</span>
          </div>
        </div>
      </section>

      <hr className="border-white/5" />

      {/* 3. TECHNICAL PROFILE */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Technical Profile</h2>
        <div className="glass bg-slate-900/60 border border-white/5 p-6 rounded-xl">
          {skills && skills.length > 0 ? (
            <div>
              <p className="text-[10px] font-black tracking-widest text-muted-foreground uppercase mb-3">Current Skills</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200 text-xs font-bold uppercase tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 font-medium">No technical skills added to profile.</p>
          )}
        </div>
      </section>

      <hr className="border-white/5" />

      {/* 4. CAREER STRENGTHS */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Career Strengths</h2>
        {hasResume ? (
          strengths.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {strengths.map((strength: string, i: number) => (
                <div key={i} className="glass bg-slate-900/60 border border-emerald-500/20 p-4 rounded-xl">
                  <div className="flex items-start gap-2 text-sm text-slate-200 font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> {strength}
                  </div>
                  <div className="text-xs text-slate-500 ml-6">Strong evidence in resume</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-xl">
              <p className="text-sm text-slate-300 font-medium">Strength analysis unavailable</p>
              <p className="text-xs text-slate-500 mt-1 mb-3">Your resume is uploaded, but the current analysis does not contain structured strengths yet.</p>
              <Link to="/resume-intelligence" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                View Resume Intelligence <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )
        ) : (
          <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-xl">
            <p className="text-sm text-slate-300 font-medium">No strengths analyzed yet.</p>
            <p className="text-xs text-slate-500 mt-1 mb-3">Complete a resume analysis to identify your strongest career signals.</p>
            <Link to="/profile" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Upload Resume <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      <hr className="border-white/5" />

      {/* 5. AI CAREER INSIGHT */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">AI Career Insight</h2>
        {hasResume ? (
          aiSummary ? (
            <div className="glass bg-indigo-950/20 border border-indigo-500/20 p-6 rounded-xl space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] uppercase text-indigo-400/80 font-black tracking-widest">Profile Summary</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">{aiSummary}</p>
              
              {/* Optional dynamic fields if present in AI results */}
              {(aiResults.career_fit || aiResults.biggest_gap || aiResults.recommended_step) && (
                <div className="grid sm:grid-cols-3 gap-6 pt-5 border-t border-indigo-500/20">
                  {aiResults.career_fit && (
                    <div>
                      <p className="text-[10px] uppercase text-indigo-300/60 font-black tracking-widest mb-1">Best Career Fit</p>
                      <p className="text-sm text-slate-300 font-medium">{aiResults.career_fit}</p>
                    </div>
                  )}
                  {aiResults.biggest_gap && (
                    <div>
                      <p className="text-[10px] uppercase text-amber-400/70 font-black tracking-widest mb-1">Growth Area</p>
                      <p className="text-sm text-slate-300 font-medium">{aiResults.biggest_gap}</p>
                    </div>
                  )}
                  {aiResults.recommended_step && (
                    <div>
                      <p className="text-[10px] uppercase text-emerald-400/70 font-black tracking-widest mb-1">Recommended Next Step</p>
                      <p className="text-sm text-slate-300 font-medium">{aiResults.recommended_step}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-xl">
              <p className="text-sm text-slate-300 font-medium">AI Career Insight unavailable.</p>
              <p className="text-xs text-slate-500 mt-1 mb-3">Your resume is analyzed, but it does not contain a narrative career insight.</p>
              <Link to="/resume-intelligence" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                View Resume Intelligence <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )
        ) : (
          <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-xl">
            <p className="text-sm text-slate-300 font-medium">Your AI career profile hasn't been generated yet.</p>
            <p className="text-xs text-slate-500 mt-1 mb-3">Analyze your resume to unlock personalized career insights.</p>
            <Link to="/profile" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Upload Resume <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      <hr className="border-white/5" />

      {/* 6. RESUME INTELLIGENCE STATUS */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Resume Intelligence</h2>
        <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {hasResume ? (
            isAnalyzed ? (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-sm font-bold text-white">Resume analyzed</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                      <span>ATS Score <strong className="text-white ml-1">{resumeAnalysis.ats_score}</strong></span>
                      <span>Last analyzed <strong className="text-white ml-1">{new Date(resumeAnalysis.created_at).toLocaleDateString()}</strong></span>
                    </div>
                  </div>
                </div>
                <Link to="/resume-intelligence" className="text-xs font-bold bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap border border-white/10">
                  View Full Intelligence &rarr;
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                    <FileText className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white block mb-1">Resume uploaded</span>
                    <span className="text-xs text-amber-400 font-medium">Analysis pending</span>
                  </div>
                </div>
                <Link to="/resume-intelligence" className="text-xs font-bold bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap border border-white/10">
                  View Resume Intelligence &rarr;
                </Link>
              </>
            )
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <FileText className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block mb-1">Resume not uploaded</span>
                  <span className="text-xs text-slate-400 font-medium">Upload your resume to unlock career insights.</span>
                </div>
              </div>
              <Link to="/profile" className="text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-indigo-500/20 whitespace-nowrap flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Upload Resume
              </Link>
            </>
          )}

        </div>
      </section>

    </div>
  );
}
