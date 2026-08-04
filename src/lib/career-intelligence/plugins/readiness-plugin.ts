import {
  CompanyProfile,
  CompanyReadinessResult,
  DimensionBreakdown,
  UserCareerContext,
} from "../types";

export class ReadinessPlugin {
  public id = "readiness-plugin";
  public name = "Data-Driven Company & Role Readiness Calculator";
  public version = "1.0.0";

  public evaluate(context: UserCareerContext, profile: CompanyProfile): CompanyReadinessResult {
    const roleId = context.target_role || "fullstack";
    const roleExpectation = profile.roles[roleId] || profile.roles["fullstack"] || profile.roles["frontend"];
    const weights = roleExpectation.weights;

    // Evaluate subscores (with fallback / default metrics if user context has empty metrics)
    const dsaRaw = context.dsaScore ?? Math.min(100, ((context.dsaSolvedCount ?? 0) / 100) * 100);
    const resumeRaw = context.resumeScore ?? context.resumeAtsScore ?? 60;
    const githubRaw = context.githubScore ?? (context.githubUsername ? 70 : 40);
    const projectsRaw = context.projectsScore ?? 65;
    const skillRaw = context.skillScore ?? 60;
    const commRaw = context.communicationScore ?? 70;

    // Skill Overlap matching
    const userSkillsSet = new Set((context.skills || []).map((s) => s.toLowerCase()));
    const requiredSkills = roleExpectation.requiredSkills || [];

    let matchedCount = 0;
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    for (const req of requiredSkills) {
      const found = Array.from(userSkillsSet).some(
        (us) => us.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(us)
      );
      if (found) {
        matchedCount++;
        matchedSkills.push(req.name);
      } else {
        missingSkills.push(req.name);
      }
    }

    const skillMatchScore =
      requiredSkills.length > 0
        ? Math.round((matchedCount / requiredSkills.length) * 100)
        : 75;

    // Dimension breakdowns
    const dimensionBreakdowns: DimensionBreakdown[] = [
      {
        dimension: "Data Structures & Algorithms",
        score: Math.round(dsaRaw),
        targetWeight: weights.dsaWeight,
        weightedScore: Math.round((dsaRaw * weights.dsaWeight) / 100),
      },
      {
        dimension: "Resume & ATS Match",
        score: Math.round(resumeRaw),
        targetWeight: weights.resumeWeight,
        weightedScore: Math.round((resumeRaw * weights.resumeWeight) / 100),
      },
      {
        dimension: "GitHub & Open Source",
        score: Math.round(githubRaw),
        targetWeight: weights.githubWeight,
        weightedScore: Math.round((githubRaw * weights.githubWeight) / 100),
      },
      {
        dimension: "Projects & Portfolio",
        score: Math.round(projectsRaw),
        targetWeight: weights.projectsWeight,
        weightedScore: Math.round((projectsRaw * weights.projectsWeight) / 100),
      },
      {
        dimension: "Role Skill Alignment",
        score: skillMatchScore,
        targetWeight: weights.skillsWeight,
        weightedScore: Math.round((skillMatchScore * weights.skillsWeight) / 100),
        matchedCount,
        totalRequired: requiredSkills.length,
        missingSkills,
      },
      {
        dimension: "Communication & Behavioral",
        score: Math.round(commRaw),
        targetWeight: weights.behavioralWeight,
        weightedScore: Math.round((commRaw * weights.behavioralWeight) / 100),
      },
    ];

    // Total readiness weighted calculation
    const totalWeights = dimensionBreakdowns.reduce((acc, d) => acc + d.targetWeight, 0);
    const weightedSum = dimensionBreakdowns.reduce((acc, d) => acc + d.weightedScore, 0);

    let readinessScore = Math.min(100, Math.max(15, Math.round((weightedSum / totalWeights) * 100)));

    // Status classification
    let status: CompanyReadinessResult["status"] = "Needs Focus";
    if (readinessScore >= 80) status = "Ready";
    else if (readinessScore >= 65) status = "On Track";
    else if (readinessScore < 45) status = "Long-term Target";

    // Confidence scoring and prompts
    const requiredDataPrompts: string[] = [];
    let confidenceScore = 90;

    if (!context.githubUsername) {
      confidenceScore -= 15;
      requiredDataPrompts.push("Connect GitHub profile to verify open source & project activity");
    }
    if (!context.resumeAtsScore && !context.resumeScore) {
      confidenceScore -= 15;
      requiredDataPrompts.push("Upload your resume to perform ATS analysis against " + profile.name);
    }
    if ((context.skills || []).length < 3) {
      confidenceScore -= 10;
      requiredDataPrompts.push("Add more skills to your profile to refine target role alignment");
    }

    let confidenceLabel: CompanyReadinessResult["confidenceLabel"] = "High";
    if (confidenceScore < 60) confidenceLabel = "Low";
    else if (confidenceScore < 80) confidenceLabel = "Medium";

    return {
      companyId: profile.id,
      companyName: profile.name,
      roleId: roleExpectation.roleId,
      roleTitle: roleExpectation.roleTitle,
      readinessScore,
      status,
      confidenceScore,
      confidenceLabel,
      requiredDataPrompts,
      matchedSkills,
      missingSkills,
      dimensionBreakdowns,
      profileMetadata: profile.metadata,
    };
  }
}

export const readinessPlugin = new ReadinessPlugin();
