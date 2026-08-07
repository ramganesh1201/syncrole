import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, Target, Sparkles, BrainCircuit, Heart, Briefcase, MapPin, Loader2, CheckCircle2 } from "lucide-react";
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
      // Fetch profile data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
        
      if (profileData) setProfile(profileData);

      // Fetch AI analysis for strengths/summary
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
        <Loader2 className="w-8 h-8 text-aurora animate-spin" />
      </div>
    );
  }

  // Derived Data
  const targetRole = profile?.target_role;
  const dreamCompany = profile?.dream_companies?.[0];
  const preferredLocation = profile?.preferred_location || profile?.city;
  const careerGoal = profile?.career_goal ? profile.career_goal.charAt(0).toUpperCase() + profile.career_goal.slice(1) : null;
  const skills = Array.isArray(profile?.skills) ? profile.skills : (profile?.skills ? String(profile.skills).split(",").map(s => s.trim()).filter(Boolean) : []);
  
  // Try to find AI-derived strengths or summaries from the resume analysis if available.
  // We use existing analysis_results data to strictly avoid fabricating AI data.
  const aiResults = resumeAnalysis?.analysis_results || {};
  const hasAiData = Object.keys(aiResults).length > 0;
  
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-10 pb-32">
      {/* Header & Identity Chips */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <Fingerprint className="w-8 h-8 text-aurora" /> Career Identity
          </h1>
          <p className="text-muted-foreground">Your professional DNA and strategic direction.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {targetRole && (
            <span className="flex items-center gap-2 text-sm text-indigo-300 font-bold bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
              <Briefcase className="w-4 h-4" /> {targetRole}
            </span>
          )}
          {dreamCompany && (
            <span className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <Target className="w-4 h-4 text-slate-400" /> {dreamCompany}
            </span>
          )}
          {preferredLocation && (
            <span className="flex items-center gap-2 text-sm text-slate-300 font-medium bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              <MapPin className="w-4 h-4 text-slate-400" /> {preferredLocation}
            </span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Career Goals */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="glass rounded-[24px] p-6 md:p-8 border border-white/5 space-y-6 shadow-lg bg-slate-900/60">
          <h3 className="font-bold text-lg flex items-center gap-2 text-white"><Target className="w-5 h-5 text-indigo-400" /> Career Goals</h3>
          
          {targetRole || dreamCompany || careerGoal ? (
            <div className="space-y-5">
              {targetRole && (
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-black tracking-widest mb-1">Target Role</p>
                  <p className="text-sm font-bold text-slate-200">{targetRole}</p>
                </div>
              )}
              {dreamCompany && (
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-black tracking-widest mb-1">Dream Company</p>
                  <p className="text-sm font-bold text-slate-200">{dreamCompany}</p>
                </div>
              )}
              {careerGoal && (
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-black tracking-widest mb-1">Engineering Domain</p>
                  <p className="text-sm font-bold text-slate-200">{careerGoal}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center mt-2">
              <p className="text-sm text-slate-400 font-medium">No career goals set yet.</p>
              <p className="text-xs text-slate-500 mt-1">Update your profile to set your direction.</p>
            </div>
          )}
        </motion.div>

        {/* Core Interests */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="glass rounded-[24px] p-6 md:p-8 border border-white/5 space-y-6 shadow-lg bg-slate-900/60">
          <h3 className="font-bold text-lg flex items-center gap-2 text-white"><Heart className="w-5 h-5 text-rose-400" /> Core Interests & Tech</h3>
          
          {skills && skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill: string) => (
                <span key={skill} className="px-3 py-1.5 rounded-lg bg-black/30 border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-wide">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center mt-2">
              <p className="text-sm text-slate-400 font-medium">No core skills or interests defined.</p>
            </div>
          )}
        </motion.div>

        {/* Superpowers */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="glass rounded-[24px] p-6 md:p-8 border border-white/5 space-y-6 shadow-lg bg-slate-900/60">
          <h3 className="font-bold text-lg flex items-center gap-2 text-white"><Sparkles className="w-5 h-5 text-amber-400" /> Technical Strengths</h3>
          
          {hasAiData && aiResults.key_strengths ? (
            <ul className="space-y-4">
              {(Array.isArray(aiResults.key_strengths) ? aiResults.key_strengths : [aiResults.key_strengths]).slice(0, 3).map((strength: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> {strength}
                </li>
              ))}
            </ul>
          ) : (
             <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center mt-2">
              <p className="text-sm text-slate-400 font-medium">No strengths analyzed yet.</p>
              <p className="text-xs text-slate-500 mt-1">Upload a resume to generate AI insights.</p>
            </div>
          )}
        </motion.div>

        {/* AI Summary */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="glass rounded-[24px] p-6 md:p-8 border border-indigo-500/20 space-y-6 shadow-lg bg-indigo-950/20">
          <h3 className="font-bold text-lg flex items-center gap-2 text-white"><BrainCircuit className="w-5 h-5 text-indigo-400" /> AI Career Summary</h3>
          
          {hasAiData ? (
             <div className="space-y-5">
               {aiResults.summary && (
                 <div>
                   <p className="text-[10px] uppercase text-indigo-300/70 font-black tracking-widest mb-1.5">Current Profile</p>
                   <p className="text-sm text-slate-200 leading-relaxed font-medium">{aiResults.summary}</p>
                 </div>
               )}
               {aiResults.biggest_gap && (
                 <div className="pt-4 border-t border-white/5">
                   <p className="text-[10px] uppercase text-amber-400/80 font-black tracking-widest mb-1.5">Primary Growth Area</p>
                   <p className="text-sm text-slate-200 leading-relaxed font-medium">{aiResults.biggest_gap}</p>
                 </div>
               )}
             </div>
          ) : (
            <div className="p-4 rounded-xl bg-black/20 border border-white/5 text-center mt-2">
              <p className="text-sm text-slate-400 font-medium">No AI summary available.</p>
              <p className="text-xs text-slate-500 mt-1">AI Coach requires resume analysis data.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
