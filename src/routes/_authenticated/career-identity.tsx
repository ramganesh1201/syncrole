import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, Target, Sparkles, BrainCircuit, Briefcase, MapPin, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
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
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  // Derived Data
  const targetRole = profile?.target_role;
  const dreamCompany = profile?.dream_companies?.[0];
  const preferredLocation = profile?.preferred_location || profile?.city;
  const engineeringDomain = profile?.career_goal ? profile.career_goal.charAt(0).toUpperCase() + profile.career_goal.slice(1) : null;
  const skills = Array.isArray(profile?.skills) ? profile.skills : (profile?.skills ? String(profile.skills).split(",").map(s => s.trim()).filter(Boolean) : []);
  const careerInterests = profile?.career_dna?.interests || [];
  
  const aiResults = resumeAnalysis?.analysis_results || {};
  const hasAiData = Object.keys(aiResults).length > 0;
  const strengths = Array.isArray(aiResults.key_strengths) ? aiResults.key_strengths : (aiResults.key_strengths ? [aiResults.key_strengths] : []);
  
  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-10 pb-32">
      {/* 1. Career Identity Header & Snapshot */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <Fingerprint className="w-8 h-8 text-indigo-400" /> Career Identity
          </h1>
          <p className="text-muted-foreground">Your professional DNA and strategic direction.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5">
          {targetRole && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Primary Role</span>
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-indigo-400" /> {targetRole}</span>
            </div>
          )}
          {engineeringDomain && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Domain</span>
              <span className="text-sm font-bold text-slate-200">{engineeringDomain}</span>
            </div>
          )}
          {dreamCompany && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Dream Company</span>
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-rose-400" /> {dreamCompany}</span>
            </div>
          )}
          {preferredLocation && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Preferred Location</span>
              <span className="text-sm font-bold text-slate-200 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {preferredLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Career Direction */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Career Direction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-[20px]">
            <p className="text-[10px] font-black tracking-widest text-indigo-400/80 uppercase mb-2">Target Role</p>
            <p className="font-bold text-white text-lg">{targetRole || <span className="text-slate-500 text-sm font-medium">Not specified</span>}</p>
          </div>
          <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-[20px]">
            <p className="text-[10px] font-black tracking-widest text-rose-400/80 uppercase mb-2">Target Company</p>
            <p className="font-bold text-white text-lg">{dreamCompany || <span className="text-slate-500 text-sm font-medium">Not specified</span>}</p>
          </div>
          <div className="glass bg-slate-900/60 border border-white/5 p-5 rounded-[20px]">
            <p className="text-[10px] font-black tracking-widest text-emerald-400/80 uppercase mb-2">Engineering Domain</p>
            <p className="font-bold text-white text-lg">{engineeringDomain || <span className="text-slate-500 text-sm font-medium">Not specified</span>}</p>
          </div>
        </div>
      </section>

      {/* 3. Career Goal (Optional) */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Career Goal</h2>
        {engineeringDomain || targetRole ? (
          <div className="p-6 rounded-[20px] bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
            <p className="text-[10px] font-black tracking-widest text-indigo-400 uppercase mb-2">Your Current Direction</p>
            <p className="text-slate-200 font-medium leading-relaxed">
              Transitioning into a {targetRole || "specialized"} role within {engineeringDomain || "the tech"} domain{dreamCompany ? `, aiming for opportunities at ${dreamCompany}` : ''}.
            </p>
          </div>
        ) : (
          <div className="p-6 rounded-[20px] bg-slate-900/60 border border-white/5 flex flex-col items-start gap-2">
            <p className="text-sm font-medium text-slate-300">Career goal not added yet</p>
            <p className="text-xs text-slate-500">Add your career direction from your profile to personalize SyncPilot recommendations.</p>
            <Link to="/profile" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 mt-2 flex items-center gap-1">
              Update Profile <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* 4. Technical Profile & Strengths */}
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Technical Skills */}
        <section className="space-y-4">
          <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Technical Profile</h2>
          <div className="glass bg-slate-900/60 border border-white/5 p-6 md:p-8 rounded-[24px] h-full">
            {skills && skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string) => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-200 text-xs font-bold uppercase tracking-wide">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-slate-400 font-medium">No technical skills added yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Strengths */}
        <section className="space-y-4">
          <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Career Strengths</h2>
          <div className="glass bg-slate-900/60 border border-white/5 p-6 md:p-8 rounded-[24px] h-full flex flex-col">
            {strengths && strengths.length > 0 ? (
              <ul className="space-y-4">
                {strengths.slice(0, 4).map((strength: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-200 font-medium leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> {strength}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-4 flex flex-col items-center justify-center flex-1">
                <Sparkles className="w-8 h-8 text-slate-600 mb-3" />
                <p className="text-sm text-slate-300 font-medium">No strengths analyzed yet.</p>
                <p className="text-xs text-slate-500 mt-2 mb-4 max-w-[80%]">Complete a resume analysis to identify your strongest career signals.</p>
                <Link to="/resume-intelligence" className="text-xs font-bold bg-white/10 hover:bg-white/15 border border-white/10 text-white px-4 py-2 rounded-lg transition-colors">
                  Open Resume Intelligence
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 5. Career Interests (Conditional) */}
      {careerInterests && careerInterests.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">Career Interests</h2>
          <div className="glass bg-slate-900/60 border border-white/5 p-6 rounded-[24px]">
            <div className="flex flex-wrap gap-2">
              {careerInterests.map((interest: string) => (
                <span key={interest} className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wide">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. AI Career Insight (Conditional) */}
      <section className="space-y-4">
        <h2 className="text-xs font-black tracking-widest text-slate-500 uppercase">AI Career Insight</h2>
        <div className="glass bg-indigo-950/20 border border-indigo-500/20 p-6 md:p-8 rounded-[24px]">
          {hasAiData ? (
             <div className="grid sm:grid-cols-2 gap-8">
               {aiResults.summary && (
                 <div className="space-y-2">
                   <div className="flex items-center gap-1.5 mb-3">
                     <BrainCircuit className="w-4 h-4 text-indigo-400" />
                     <p className="text-[10px] uppercase text-indigo-300/70 font-black tracking-widest">Profile Signal</p>
                   </div>
                   <p className="text-sm text-slate-200 leading-relaxed font-medium">{aiResults.summary}</p>
                 </div>
               )}
               <div className="space-y-6">
                 {aiResults.biggest_gap && (
                   <div className="space-y-2">
                     <p className="text-[10px] uppercase text-amber-400/80 font-black tracking-widest">Growth Area</p>
                     <p className="text-sm text-slate-200 leading-relaxed font-medium">{aiResults.biggest_gap}</p>
                   </div>
                 )}
               </div>
             </div>
          ) : (
            <div className="text-center py-6 flex flex-col items-center">
              <BrainCircuit className="w-8 h-8 text-slate-600 mb-3" />
              <p className="text-sm text-slate-300 font-medium">Your AI career profile hasn't been generated yet.</p>
              <p className="text-xs text-slate-500 mt-2 mb-4">Analyze your resume to unlock personalized career insights.</p>
              <Link to="/resume-intelligence" className="text-xs font-bold bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                Open Resume Intelligence
              </Link>
            </div>
          )}
        </div>
      </section>
      
    </div>
  );
}
