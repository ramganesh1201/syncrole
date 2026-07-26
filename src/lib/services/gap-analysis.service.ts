import { UnifiedCareerDNA } from "./career-dna.service";
import { CareerCompany, RoleInformation } from "./career-intelligence.service";

export interface GapAnalysisResult {
  missingSkills: string[];
  missingExperience: string | null;
  missingProjects: string[];
  estimatedTimelineMonths: number;
  dynamicReadiness: number; // calculated relative to this specific role/company
  currentStage: string;
  nextMilestone: string;
}

export const GapAnalysisService = {
  /**
   * Evaluates the gap between a user's unified Career DNA and their target
   * role at a target company. 
   * 
   * Rule: Consumes Placement Readiness (dna.placementReadiness) as an input
   * rather than rewriting the baseline calculation.
   */
  calculateGap(
    dna: UnifiedCareerDNA, 
    company: CareerCompany | null, 
    role: RoleInformation | null
  ): GapAnalysisResult {
    
    let missingSkills: string[] = [];
    let missingExperience: string | null = null;
    let missingProjects: string[] = [];
    let estimatedTimelineMonths = 0;
    
    // Default fallback if intelligence data is missing (Graceful Degradation rule)
    if (!role && !company) {
      return {
        missingSkills: dna.resumeMissingSkills,
        missingExperience: "Unknown (Missing Intelligence Data)",
        missingProjects: [],
        estimatedTimelineMonths: 3,
        dynamicReadiness: dna.placementReadiness,
        currentStage: "Preparation",
        nextMilestone: "Complete Resume Profile"
      };
    }

    const requiredSkills = role?.required_skills || [];
    const preferredSkills = role?.preferred_skills || [];
    
    // Naive matching (for demonstration - in reality, uses NLP/AI in edge function)
    // We combine github, resume, and profile skills
    const userSkillsText = [
      ...dna.currentStrengths,
      ...Object.keys(dna.githubLanguages || {}),
      dna.targetRole || ""
    ].join(" ").toLowerCase();

    // Find missing skills
    for (const rs of requiredSkills) {
      if (!userSkillsText.includes(rs.toLowerCase())) {
        missingSkills.push(rs);
      }
    }
    for (const ps of preferredSkills) {
      if (!userSkillsText.includes(ps.toLowerCase())) {
        missingSkills.push(ps + " (Preferred)");
      }
    }

    // Experience gap
    if (role?.expected_experience) {
      // Stub logic for demonstration
      missingExperience = `Target needs: ${role.expected_experience}.`;
      estimatedTimelineMonths += 6;
    }

    // Calculate dynamic readiness by extending base placement readiness
    let penalty = missingSkills.length * 5;
    if (penalty > 40) penalty = 40;
    
    let dynamicReadiness = dna.placementReadiness - penalty;
    if (dynamicReadiness < 10) dynamicReadiness = 10;
    if (dynamicReadiness > 100) dynamicReadiness = 100;

    // Timeline heuristics
    estimatedTimelineMonths += Math.ceil(missingSkills.length * 0.5);

    // Milestone logic based on readiness
    let currentStage = "Learning Fundamentals";
    let nextMilestone = "Master Required Skills";

    if (dynamicReadiness > 40) {
      currentStage = "Skill Building";
      nextMilestone = "Build target projects";
    }
    if (dynamicReadiness > 70) {
      currentStage = "Interview Prep";
      nextMilestone = "Mock interviews";
    }
    if (dynamicReadiness > 85) {
      currentStage = "Placement Ready";
      nextMilestone = "Start applying";
    }

    return {
      missingSkills,
      missingExperience,
      missingProjects,
      estimatedTimelineMonths,
      dynamicReadiness,
      currentStage,
      nextMilestone
    };
  }
};
