import { companyRegistry } from "../company-profiles/registry";
import { ExplainableRecommendation, UserCareerContext } from "../types";
import { readinessPlugin } from "./readiness-plugin";

export class RecommendationPlugin {
  public id = "recommendation-plugin";
  public name = "Explainable AI Recommendation Engine";
  public version = "1.0.0";

  public generateRecommendations(
    context: UserCareerContext
  ): ExplainableRecommendation[] {
    const targetCompanyId = context.dream_companies?.[0] || "google";
    const targetCompany = companyRegistry.getCompany(targetCompanyId);
    const readiness = readinessPlugin.evaluate(context, targetCompany);

    const recommendations: ExplainableRecommendation[] = [];

    // 1. Missing Technical Skill Gap Recommendation
    if (readiness.missingSkills.length > 0) {
      const topMissing = readiness.missingSkills.slice(0, 2).join(" & ");
      recommendations.push({
        id: "rec-skill-gap",
        action: `Master ${topMissing}`,
        reason: `${targetCompany.name} ${readiness.roleTitle} role explicitly requires competency in ${topMissing}.`,
        targetRequirement: `${targetCompany.name} Role Skill Alignment`,
        estimatedGain: "+3.5% Target Readiness",
        confidenceScore: 92,
        confidenceLabel: "High",
        sourceModule: "Skill Builder",
        priority: "High",
      });
    }

    // 2. DSA Improvement Recommendation
    const dsaBreakdown = readiness.dimensionBreakdowns.find((d) => d.dimension.includes("Data Structures"));
    if (dsaBreakdown && dsaBreakdown.score < 75 && dsaBreakdown.targetWeight >= 70) {
      recommendations.push({
        id: "rec-dsa-focus",
        action: "Practice Medium Graph & Dynamic Programming Problems",
        reason: `${targetCompany.name} interviews place heavy emphasis (${dsaBreakdown.targetWeight}%) on algorithmic problem solving.`,
        targetRequirement: `${targetCompany.name} Technical Screening`,
        estimatedGain: "+4.2% Target Readiness",
        confidenceScore: 95,
        confidenceLabel: "High",
        sourceModule: "DSA Tracker",
        priority: "High",
      });
    }

    // 3. Resume / ATS Optimization Recommendation
    const resumeBreakdown = readiness.dimensionBreakdowns.find((d) => d.dimension.includes("Resume"));
    if (resumeBreakdown && (resumeBreakdown.score < 70 || !context.resumeAtsScore)) {
      recommendations.push({
        id: "rec-resume-ats",
        action: "Optimize Resume Keywords for " + readiness.roleTitle,
        reason: `Your current ATS score (${resumeBreakdown.score}%) has room to improve for ${targetCompany.name}'s resume filter.`,
        targetRequirement: `${targetCompany.name} Resume Screening`,
        estimatedGain: "+2.8% Target Readiness",
        confidenceScore: readiness.confidenceScore,
        confidenceLabel: readiness.confidenceLabel,
        sourceModule: "Resume Intelligence",
        requiredData: !context.resumeAtsScore ? "Upload updated resume PDF" : undefined,
        priority: "Medium",
      });
    }

    // 4. GitHub Contribution & Project Proof
    const githubBreakdown = readiness.dimensionBreakdowns.find((d) => d.dimension.includes("GitHub"));
    if (githubBreakdown && (!context.githubUsername || githubBreakdown.score < 65)) {
      recommendations.push({
        id: "rec-github-connect",
        action: "Deploy a Live Project and Connect GitHub",
        reason: `${targetCompany.name} reviewers verify code quality, commits, and live deployments.`,
        targetRequirement: `${targetCompany.name} Engineering Portfolio`,
        estimatedGain: "+3.0% Target Readiness",
        confidenceScore: 85,
        confidenceLabel: "Medium",
        sourceModule: "GitHub Intelligence",
        requiredData: !context.githubUsername ? "Link GitHub username" : undefined,
        priority: "Medium",
      });
    }

    // Fallback recommendation if user is already highly ready
    if (recommendations.length === 0) {
      recommendations.push({
        id: "rec-mock-interview",
        action: `Schedule a Mock Interview for ${targetCompany.name} ${readiness.roleTitle}`,
        reason: `Your readiness is ${readiness.readinessScore}%. Practice real-time coding and communication with SyncPilot.`,
        targetRequirement: `${targetCompany.name} Onsite Round`,
        estimatedGain: "+2.0% Confidence Boost",
        confidenceScore: 98,
        confidenceLabel: "High",
        sourceModule: "Mock Interview",
        priority: "High",
      });
    }

    return recommendations;
  }
}

export const recommendationPlugin = new RecommendationPlugin();
