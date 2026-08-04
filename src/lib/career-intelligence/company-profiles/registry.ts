import { CompanyProfile, CareerRole } from "../types";
import { googleProfile } from "./google";
import { microsoftProfile } from "./microsoft";
import { amazonProfile } from "./amazon";
import { adobeProfile } from "./adobe";
import { atlassianProfile } from "./atlassian";
import { servicenowProfile } from "./servicenow";
import { oracleProfile } from "./oracle";
import { zohoProfile } from "./zoho";
import { freshworksProfile } from "./freshworks";
import { startupsProfile } from "./startups";

class CompanyRegistry {
  private profiles: Map<string, CompanyProfile> = new Map();

  constructor() {
    this.register(googleProfile);
    this.register(microsoftProfile);
    this.register(amazonProfile);
    this.register(adobeProfile);
    this.register(atlassianProfile);
    this.register(servicenowProfile);
    this.register(oracleProfile);
    this.register(zohoProfile);
    this.register(freshworksProfile);
    this.register(startupsProfile);
  }

  public register(profile: CompanyProfile): void {
    this.profiles.set(profile.id.toLowerCase(), profile);
  }

  public getCompany(id: string): CompanyProfile {
    const key = id.toLowerCase();
    if (this.profiles.has(key)) {
      return this.profiles.get(key)!;
    }
    // Fallback if requested company is not explicitly configured
    return this.createGenericProfile(id);
  }

  public getAllCompanies(): CompanyProfile[] {
    return Array.from(this.profiles.values());
  }

  public getCompanyRole(companyId: string, role: CareerRole) {
    const company = this.getCompany(companyId);
    return company.roles[role] || company.roles["fullstack"] || company.roles["frontend"];
  }

  private createGenericProfile(name: string): CompanyProfile {
    const cleanId = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    return {
      id: cleanId,
      name: name,
      tier: 3,
      hiringDifficulty: "Moderate",
      description: `Target Tech Company: ${name}`,
      similarCompanies: ["zoho", "freshworks", "startups"],
      metadata: {
        version: "2026.1",
        lastUpdated: new Date().toISOString().slice(0, 10),
        confidenceLevel: 0.85,
        dataSource: "SyncRole Dynamic Benchmark Engine",
        region: "global",
      },
      roles: googleProfile.roles, // Fallback default role map
    };
  }
}

export const companyRegistry = new CompanyRegistry();
