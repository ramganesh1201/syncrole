import { supabase } from "@/integrations/supabase/client";
import { CareerIntelligenceService, CareerCompany, RoleInformation } from "./career-intelligence.service";

export interface UnifiedCareerDNA {
  userId: string;
  // Basic Profile Info
  fullName: string | null;
  targetRole: string | null;
  dreamCompanies: string[];
  expectedSalary: string | null;
  
  // Custom DNA extensions (from JSONB)
  learningProgress: number;
  currentStrengths: string[];
  currentWeaknesses: string[];
  careerInterests: string[];
  
  // DSA Data
  dsaScore: number;
  dsaProblemsSolved: number;
  
  // GitHub Data
  githubScore: number;
  githubLanguages: any;
  githubStrengths: string[];
  
  // Resume Data
  resumeScore: number;
  resumeMissingSkills: string[];
  
  // Placement Readiness
  placementReadiness: number;
}

export const CareerDnaService = {
  /**
   * Constructs the unified Career DNA profile without modifying any underlying 
   * tables or replacing existing isolated systems.
   */
  async getUnifiedDNA(userId: string): Promise<UnifiedCareerDNA | null> {
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (profileErr || !profile) {
      console.error("Failed to load profile for DNA", profileErr);
      return null;
    }

    // Safely parse the new career_dna jsonb field
    const dnaJson = (profile.career_dna as any) || {};

    const [
      { data: placementData },
      { data: dsaData },
      { data: githubData },
      { data: resumeData }
    ] = await Promise.all([
      supabase.from("placement_scores").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("dsa_progress").select("easy, medium, hard").eq("user_id", userId),
      supabase.from("github_analysis").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("resume_analysis").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    ]);

    let dsaSolved = 0;
    if (dsaData) {
      dsaData.forEach((d: any) => {
        dsaSolved += (d.easy || 0) + (d.medium || 0) + (d.hard || 0);
      });
    }

    return {
      userId,
      fullName: profile.full_name,
      targetRole: profile.target_role,
      dreamCompanies: profile.dream_companies || [],
      expectedSalary: profile.expected_salary,
      
      learningProgress: dnaJson.learning_progress || 0,
      currentStrengths: dnaJson.current_strengths || [],
      currentWeaknesses: dnaJson.current_weaknesses || [],
      careerInterests: dnaJson.career_interests || [],
      
      dsaScore: placementData?.dsa_score || 0,
      dsaProblemsSolved: dsaSolved,
      
      githubScore: githubData?.score || 0,
      githubLanguages: githubData?.languages || {},
      githubStrengths: githubData?.strengths || [],
      
      resumeScore: resumeData?.total_score || 0,
      resumeMissingSkills: resumeData?.missing_skills || [],
      
      placementReadiness: placementData?.total_score || 0,
    };
  },
  
  /**
   * Safely updates the career_dna jsonb field in the profile.
   */
  async updateDNAField(userId: string, fields: Partial<UnifiedCareerDNA>) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("career_dna")
      .eq("user_id", userId)
      .maybeSingle();
      
    if (!profile) return false;
    
    const currentDna = (profile.career_dna as any) || {};
    
    if (fields.learningProgress !== undefined) currentDna.learning_progress = fields.learningProgress;
    if (fields.currentStrengths !== undefined) currentDna.current_strengths = fields.currentStrengths;
    if (fields.currentWeaknesses !== undefined) currentDna.current_weaknesses = fields.currentWeaknesses;
    if (fields.careerInterests !== undefined) currentDna.career_interests = fields.careerInterests;

    const { error } = await supabase
      .from("profiles")
      .update({ career_dna: currentDna })
      .eq("user_id", userId);
      
    return !error;
  }
};
