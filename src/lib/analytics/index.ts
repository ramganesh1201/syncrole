import { supabase } from "@/integrations/supabase/client";
import { FullDSAAnalytics, TimelineEvent } from "./types";
import { calculateCodingDNA } from "./codingDNA";
import { calculatePatterns } from "./patternIntelligence";
import { calculateCompanyReadiness } from "./companyReadiness";
import { calculateStrengths, calculateWeaknesses } from "./strengths";
import { calculateForecast } from "./forecast";
import { generateRoadmap, generateWeeklyPlan } from "./roadmap";
import { calculateConsistency } from "./consistency";
import { calculateInsights } from "./insights";

export class AnalyticsEngine {
  static async analyze(userId: string): Promise<FullDSAAnalytics> {
    const [topicRes, problemRes] = await Promise.all([
      supabase.from("user_topic_progress").select("topic_id, mastery_score, completed_percent, topic:dsa_topics(name)").eq("user_id", userId),
      supabase.from("user_problem_progress").select("*, problem:dsa_problems(id, topic_id)").eq("user_id", userId).eq("solved", true)
    ]);

    if (topicRes.error) throw topicRes.error;
    if (problemRes.error) throw problemRes.error;

    const topicsData = topicRes.data ?? [];
    const solvedData = problemRes.data ?? [];
    const totalSolved = solvedData.length;

    const insights = calculateInsights(topicsData, solvedData);
    const avgMastery = insights.length > 0 ? insights.reduce((a, t) => a + t.mastery, 0) / insights.length : 0;

    const patterns = calculatePatterns(insights);
    const strengths = calculateStrengths(insights);
    const weaknesses = calculateWeaknesses(insights);
    const companies = calculateCompanyReadiness(insights, avgMastery);
    const dna = calculateCodingDNA(totalSolved, avgMastery, patterns, insights);
    const weeklyPlan = generateWeeklyPlan(weaknesses);
    const predictions = calculateForecast(avgMastery);
    const roadmap = generateRoadmap(weaknesses);
    const stats = calculateConsistency(totalSolved, avgMastery);

    const timeline: TimelineEvent[] = [
      { title: "Started Journey", desc: "Began DSA Preparation", date: "Month 1", type: "milestone" }
    ];
    if (totalSolved > 0) timeline.push({ title: "First Problem", desc: "Solved first DSA problem", date: "Month 1", type: "achievement" });
    if (totalSolved >= 50) timeline.push({ title: "Consistency Builder", desc: "Reached 50 problems", date: "Month 2", type: "milestone" });
    if (totalSolved >= 100) timeline.push({ title: "Centurion", desc: "Crossed 100 problems", date: "Month 3", type: "achievement" });

    return {
      insights,
      strengths,
      weaknesses,
      companies,
      dna,
      patterns,
      weeklyPlan,
      predictions,
      timeline,
      roadmap,
      stats
    };
  }
}
