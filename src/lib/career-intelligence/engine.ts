import { intelligenceCache } from "./cache";
import { companyRegistry } from "./company-profiles/registry";
import { careerPathPlugin } from "./plugins/career-path-plugin";
import { readinessPlugin } from "./plugins/readiness-plugin";
import { recommendationPlugin } from "./plugins/recommendation-plugin";
import {
  CompanyProfile,
  CompanyReadinessResult,
  ExplainableRecommendation,
  SteppingStonePath,
  UserCareerContext,
} from "./types";

export class CareerIntelligenceEngine {
  private static instance: CareerIntelligenceEngine;

  private constructor() {}

  public static getInstance(): CareerIntelligenceEngine {
    if (!CareerIntelligenceEngine.instance) {
      CareerIntelligenceEngine.instance = new CareerIntelligenceEngine();
    }
    return CareerIntelligenceEngine.instance;
  }

  /**
   * Evaluate user readiness against a specific company profile (with memoized caching)
   */
  public evaluateCompanyReadiness(
    context: UserCareerContext,
    companyId: string
  ): CompanyReadinessResult {
    const cacheKey = `readiness_${context.user_id}_${companyId}_${context.target_role}_${context.skills?.join(",")}_${context.placementScore}`;
    const cached = intelligenceCache.get<CompanyReadinessResult>(cacheKey);
    if (cached) return cached;

    const company = companyRegistry.getCompany(companyId);
    const result = readinessPlugin.evaluate(context, company);
    intelligenceCache.set(cacheKey, result);
    return result;
  }

  /**
   * Generate dynamic stepping-stone progression path
   */
  public generateCareerPath(
    context: UserCareerContext,
    targetCompanyId: string
  ): SteppingStonePath {
    const cacheKey = `path_${context.user_id}_${targetCompanyId}_${context.target_role}_${context.placementScore}`;
    const cached = intelligenceCache.get<SteppingStonePath>(cacheKey);
    if (cached) return cached;

    const result = careerPathPlugin.generatePath(targetCompanyId, context);
    intelligenceCache.set(cacheKey, result);
    return result;
  }

  /**
   * Generate explainable recommendations
   */
  public generateRecommendations(
    context: UserCareerContext
  ): ExplainableRecommendation[] {
    const cacheKey = `recs_${context.user_id}_${context.target_role}_${context.dream_companies?.[0]}_${context.placementScore}`;
    const cached = intelligenceCache.get<ExplainableRecommendation[]>(cacheKey);
    if (cached) return cached;

    const result = recommendationPlugin.generateRecommendations(context);
    intelligenceCache.set(cacheKey, result);
    return result;
  }

  /**
   * Get all registered company profiles
   */
  public getAllCompanies(): CompanyProfile[] {
    return companyRegistry.getAllCompanies();
  }

  /**
   * Get specific company profile by ID
   */
  public getCompany(id: string): CompanyProfile {
    return companyRegistry.getCompany(id);
  }
}

export const careerEngine = CareerIntelligenceEngine.getInstance();
