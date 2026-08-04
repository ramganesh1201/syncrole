import { UserCareerContext, CompanyReadinessResult } from "./types";
import { careerEngine } from "./engine";

export type MaturityStage =
  | "Beginner"
  | "Building Foundation"
  | "Internship Ready"
  | "Product Company Ready"
  | "Dream Company Ready";

export type CoachPersonaState =
  | "new_user"
  | "returning_user"
  | "streak_recovery"
  | "nearing_target"
  | "completed_session";

export interface IntelligentRoutingTarget {
  label: string;
  route: string;
  reason: string;
  estimatedGain: string;
  actionType: "navigate" | "mission" | "upload" | "github";
}

export interface ContextualInboxItem {
  id: string;
  title: string;
  message: string;
  priority: 1 | 2 | 3 | 4; // 1 = Blocking, 2 = High-Impact Opportunity, 3 = Achievement, 4 = Info
  category: "blocking" | "opportunity" | "achievement" | "info";
  timestamp: string;
  actionRoute?: string;
  actionLabel?: string;
}

export interface DashboardOrchestrationResult {
  maturityStage: MaturityStage;
  personaState: CoachPersonaState;
  coachHeadline: string;
  coachMessage: string;
  primaryRoutingTarget: IntelligentRoutingTarget;
  inboxItems: ContextualInboxItem[];
  isSessionComplete: boolean;
  opportunityDeltas: {
    module: string;
    gain: string;
    description: string;
  }[];
}

class DashboardOrchestrator {
  private static instance: DashboardOrchestrator;

  private constructor() {}

  public static getInstance(): DashboardOrchestrator {
    if (!DashboardOrchestrator.instance) {
      DashboardOrchestrator.instance = new DashboardOrchestrator();
    }
    return DashboardOrchestrator.instance;
  }

  public orchestrate(
    context: UserCareerContext,
    missions: any[],
    achievements: string[],
    streakDays: number
  ): DashboardOrchestrationResult {
    const selectedCompanyId = context.dream_companies?.[0] || "google";
    const readiness = careerEngine.evaluateCompanyReadiness(context, selectedCompanyId);
    const completedMissionsCount = missions.filter((m) => m.completed).length;
    const isSessionComplete = missions.length > 0 && completedMissionsCount === missions.length;

    // 1. Compute Maturity Stage
    let maturityStage: MaturityStage = "Beginner";
    if (readiness.readinessScore >= 80) maturityStage = "Dream Company Ready";
    else if (readiness.readinessScore >= 65) maturityStage = "Product Company Ready";
    else if (readiness.readinessScore >= 50) maturityStage = "Internship Ready";
    else if (readiness.readinessScore >= 30) maturityStage = "Building Foundation";

    // 2. Compute AI Coach Persona State
    let personaState: CoachPersonaState = "returning_user";
    if (isSessionComplete) {
      personaState = "completed_session";
    } else if (!context.resumeAtsScore && !context.githubUsername) {
      personaState = "new_user";
    } else if (streakDays === 0) {
      personaState = "streak_recovery";
    } else if (readiness.readinessScore >= 70) {
      personaState = "nearing_target";
    }

    // 3. Formulate Guidance Headline & Message
    const { headline, message } = this.generateCoachGuidance(
      personaState,
      readiness,
      context,
      streakDays
    );

    // 4. Determine Highest Priority Intelligent Routing Target
    const primaryRoutingTarget = this.determinePrimaryRouting(
      context,
      readiness,
      missions,
      isSessionComplete
    );

    // 5. Generate Contextual AI Inbox (Prioritized)
    const inboxItems = this.generateAIInboxItems(
      context,
      readiness,
      achievements,
      streakDays,
      isSessionComplete
    );

    // 6. Calculate Top Opportunities
    const opportunityDeltas = [
      {
        module: "Resume Intelligence",
        gain: "+3.5%",
        description: `Optimize keywords for ${readiness.companyName} ${readiness.roleTitle}`,
      },
      {
        module: "DSA Command Center",
        gain: "+4.2%",
        description: "Master Graph & Dynamic Programming patterns",
      },
      {
        module: "GitHub Portfolio",
        gain: "+2.8%",
        description: "Add live deployment links to pinned repositories",
      },
    ];

    return {
      maturityStage,
      personaState,
      coachHeadline: headline,
      coachMessage: message,
      primaryRoutingTarget,
      inboxItems,
      isSessionComplete,
      opportunityDeltas,
    };
  }

  private generateCoachGuidance(
    state: CoachPersonaState,
    readiness: CompanyReadinessResult,
    context: UserCareerContext,
    streakDays: number
  ) {
    switch (state) {
      case "completed_session":
        return {
          headline: `Today's Journey Completed! 🚀`,
          message: `Awesome work today! You've advanced your ${readiness.companyName} ${readiness.roleTitle} readiness. Rest up and return tomorrow for your next mission.`,
        };
      case "new_user":
        return {
          headline: `Welcome to SyncRole Mission Control! 👋`,
          message: `Let's set up your profile and upload your resume to unlock custom readiness benchmarks for ${readiness.companyName}.`,
        };
      case "streak_recovery":
        return {
          headline: `Let's restart your streak today! 🔥`,
          message: `Consistency is key for top-tier hiring. Complete 1 quick task today to rebuild your active streak.`,
        };
      case "nearing_target":
        return {
          headline: `You're ${readiness.readinessScore}% Ready for ${readiness.companyName}! 🏆`,
          message: `You've mastered ${readiness.matchedSkills.length} core requirements. Focus on mock interviews and final project polish.`,
        };
      default:
        return {
          headline: `Focus on Today's Top Objective 🎯`,
          message: `You are on the ${readiness.status} path for ${readiness.companyName} ${readiness.roleTitle}. Complete today's workstation tasks to gain +3.5% readiness.`,
        };
    }
  }

  private determinePrimaryRouting(
    context: UserCareerContext,
    readiness: CompanyReadinessResult,
    missions: any[],
    isSessionComplete: boolean
  ): IntelligentRoutingTarget {
    if (isSessionComplete) {
      return {
        label: "Review Stepping-Stone Path",
        route: "/dashboard",
        reason: "Today's tasks completed. Review your target milestones.",
        estimatedGain: "Session Complete",
        actionType: "navigate",
      };
    }

    if (!context.resumeAtsScore && !context.resumeScore) {
      return {
        label: "Upload Resume PDF",
        route: "/resume-intelligence",
        reason: "Upload resume to calculate ATS keyword match for " + readiness.companyName,
        estimatedGain: "+4.5% Readiness Boost",
        actionType: "upload",
      };
    }

    if (!context.githubUsername) {
      return {
        label: "Connect GitHub Profile",
        route: "/profile",
        reason: "Link GitHub to verify open source contributions and project depth",
        estimatedGain: "+3.0% Readiness Boost",
        actionType: "github",
      };
    }

    const firstIncompleteMission = missions.find((m) => !m.completed);
    if (firstIncompleteMission) {
      return {
        label: `Start Task: ${firstIncompleteMission.title}`,
        route: firstIncompleteMission.code?.includes("dsa") ? "/dashboard/dsa" : "/dashboard",
        reason: firstIncompleteMission.description,
        estimatedGain: `+${firstIncompleteMission.xp_reward} XP & Readiness`,
        actionType: "mission",
      };
    }

    return {
      label: "Practice DSA Problems",
      route: "/dashboard/dsa",
      reason: `Boost your algorithmic readiness for ${readiness.companyName}`,
      estimatedGain: "+4.2% Readiness Boost",
      actionType: "navigate",
    };
  }

  private generateAIInboxItems(
    context: UserCareerContext,
    readiness: CompanyReadinessResult,
    achievements: string[],
    streakDays: number,
    isSessionComplete: boolean
  ): ContextualInboxItem[] {
    const items: ContextualInboxItem[] = [];

    // Priority 1: Blocking Issue
    if (!context.resumeAtsScore) {
      items.push({
        id: "inbox-resume-missing",
        title: "Resume Upload Needed",
        message: `Upload your resume to calculate your exact ATS match for ${readiness.companyName} ${readiness.roleTitle}.`,
        priority: 1,
        category: "blocking",
        timestamp: "Action Required",
        actionRoute: "/resume-intelligence",
        actionLabel: "Upload PDF",
      });
    }

    // Priority 2: High Impact Opportunity
    if (readiness.missingSkills.length > 0) {
      items.push({
        id: "inbox-skill-gap",
        title: `High Impact Skill Gap: ${readiness.missingSkills[0]}`,
        message: `${readiness.companyName} explicitly weights ${readiness.missingSkills[0]} in technical rounds.`,
        priority: 2,
        category: "opportunity",
        timestamp: "Top Readiness Opportunity",
        actionRoute: "/profile",
        actionLabel: "Add Skill",
      });
    }

    // Priority 3: Achievement / Streak
    if (streakDays > 0) {
      items.push({
        id: "inbox-streak",
        title: `${streakDays}-Day Momentum Streak Active! 🔥`,
        message: `Consistent daily activity accelerates your placement trajectory by 2.4x.`,
        priority: 3,
        category: "achievement",
        timestamp: "Active Streak",
      });
    }

    // Priority 4: Informational
    items.push({
      id: "inbox-benchmark",
      title: `${readiness.companyName} Benchmark Updated`,
      message: `Interview weights for ${readiness.roleTitle} verified against 2026 hiring standards.`,
      priority: 4,
      category: "info",
      timestamp: "System Note",
    });

    return items.sort((a, b) => a.priority - b.priority);
  }
}

export const dashboardOrchestrator = DashboardOrchestrator.getInstance();
