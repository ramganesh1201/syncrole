import { companyRegistry } from "../company-profiles/registry";
import {
  SteppingStoneNode,
  SteppingStonePath,
  UserCareerContext,
} from "../types";
import { readinessPlugin } from "./readiness-plugin";

export class CareerPathPlugin {
  public id = "career-path-plugin";
  public name = "Dynamic Stepping-Stone Progression Engine";
  public version = "1.0.0";

  public generatePath(
    targetCompanyId: string,
    context: UserCareerContext
  ): SteppingStonePath {
    const targetCompany = companyRegistry.getCompany(targetCompanyId);
    const targetResult = readinessPlugin.evaluate(context, targetCompany);

    const allCompanies = companyRegistry.getAllCompanies();

    // Filter out the target company and evaluate user readiness for all candidate companies
    const candidateNodes: SteppingStoneNode[] = allCompanies
      .filter((c) => c.id !== targetCompany.id)
      .map((company) => {
        const result = readinessPlugin.evaluate(context, company);
        return {
          companyId: company.id,
          companyName: company.name,
          tier: company.tier,
          readinessScore: result.readinessScore,
          status: result.status,
          recommendedFocus:
            result.missingSkills.length > 0
              ? `Master ${result.missingSkills.slice(0, 2).join(" & ")}`
              : `Consolidate ${company.name} interview patterns`,
          estimatedMonthsToTarget: Math.max(1, Math.round((100 - result.readinessScore) / 15)),
          isTarget: false,
        };
      });

    // Sort candidate companies by readiness (highest first) and tier progression
    candidateNodes.sort((a, b) => b.readinessScore - a.readinessScore);

    // Pick top 2-3 progressive stepping stone companies
    const selectedNodes: SteppingStoneNode[] = [];

    // 1. First milestone: High readiness company (Tier 4 or Tier 3)
    const accessible = candidateNodes.find((n) => n.readinessScore >= 70) || candidateNodes[0];
    if (accessible) selectedNodes.push(accessible);

    // 2. Intermediate milestone: Tier 2 or growth company
    const intermediate = candidateNodes.find(
      (n) => n.tier < (accessible?.tier ?? 4) && n.readinessScore >= 50 && n.companyId !== accessible?.companyId
    ) || candidateNodes.find((n) => n.companyId !== accessible?.companyId);

    if (intermediate && intermediate.companyId !== accessible?.companyId) {
      selectedNodes.push(intermediate);
    }

    // 3. Final Target Node
    const targetNode: SteppingStoneNode = {
      companyId: targetCompany.id,
      companyName: targetCompany.name,
      tier: targetCompany.tier,
      readinessScore: targetResult.readinessScore,
      status: targetResult.status,
      recommendedFocus: `Achieve 80%+ target readiness for ${targetCompany.name} ${targetResult.roleTitle}`,
      estimatedMonthsToTarget: Math.max(2, Math.round((100 - targetResult.readinessScore) / 10)),
      isTarget: true,
    };

    selectedNodes.push(targetNode);

    const rationale =
      targetResult.readinessScore >= 75
        ? `You already have strong readiness (${targetResult.readinessScore}%) for ${targetCompany.name}! Focus on fine-tuning interview patterns and mock interviews.`
        : `Dynamic Stepping-Stone Progression: Transition from high-accessibility companies (${selectedNodes[0]?.companyName || "Startups"}) towards ${targetCompany.name} to maximize offer likelihood.`;

    return {
      targetCompanyId: targetCompany.id,
      targetCompanyName: targetCompany.name,
      targetRole: context.target_role || "fullstack",
      currentReadinessScore: targetResult.readinessScore,
      nodes: selectedNodes,
      pathRationale: rationale,
    };
  }
}

export const careerPathPlugin = new CareerPathPlugin();
