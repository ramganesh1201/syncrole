import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── Mode-specific system prompts (improved) ──────────────────────────────

function buildCareerTwinPrompt(ctx: UserContext): string {
  return `
USER PROFILE:
- Name: ${ctx.profile?.full_name ?? "Unknown"}
- College: ${ctx.profile?.college ?? "Not set"}
- Branch: ${ctx.profile?.branch ?? "Not set"}
- Graduation Year: ${ctx.profile?.graduation_year ?? "Not set"}
- CGPA: ${ctx.profile?.cgpa ?? "Not set"}
- Career Goal: ${ctx.profile?.career_goal ?? "Not specified"}
- Skills: ${(ctx.profile?.skills ?? []).join(", ") || "None listed"}
- GitHub: ${ctx.profile?.github_username ? `@${ctx.profile.github_username}` : "Not connected"}

CAREER METRICS:
- Total XP: ${ctx.xp?.total_xp ?? 0} (Level ${ctx.xp?.level ?? 1}: ${ctx.xp?.level_name ?? "Career Explorer"})
- Placement Readiness: ${ctx.placementScore}/100 (${ctx.readinessLabel})
- Current Streak: ${ctx.streak?.current_streak ?? 0} days (Best: ${ctx.streak?.longest_streak ?? 0} days)
- Resume Score: ${ctx.latestScore?.resume_score ?? 0}/100
- GitHub Score: ${ctx.latestScore?.github_score ?? 0}/100
- DSA Score: ${ctx.latestScore?.dsa_score ?? 0}/100
- Skills Score: ${ctx.latestScore?.skill_score ?? 0}/100

GITHUB ANALYSIS:
${ctx.github ? `- Repos: ${ctx.github.repo_count}, Stars: ${ctx.github.star_count}, Followers: ${ctx.github.follower_count}
- Top Languages: ${Object.keys(ctx.github.languages || {}).slice(0, 3).join(", ") || "None detected"}
- Strengths: ${(ctx.github.strengths || []).join(", ") || "None"}
- Recommendations: ${(ctx.github.recommendations || []).slice(0, 2).join("; ") || "None"}` : "GitHub not connected."}

RESUME ANALYSIS:
${ctx.resume ? `- ATS Score: ${ctx.resume.ats_score}/100
- Keyword Match: ${ctx.resume.keyword_match}/100
- Total Score: ${ctx.resume.total_score}/100
- Top Suggestions: ${(ctx.resume.suggestions || []).slice(0, 2).join("; ") || "None"}` : "No resume analyzed yet."}

DSA PROGRESS:
${ctx.dsaTopics.length > 0 ? ctx.dsaTopics.map((t: any) => `- ${t.topic_name ?? t.topic_id}: ${t.solved_count ?? 0} solved`).join("\n") : "No DSA topics tracked yet."}

AI MEMORY (persistent context from previous sessions):
${ctx.memory ? `- Career Goals: ${ctx.memory.career_goals ?? "Not specified"}
- Preferred Companies: ${(ctx.memory.preferred_companies ?? []).join(", ") || "Not specified"}
- Preferred Roles: ${(ctx.memory.preferred_roles ?? []).join(", ") || "Not specified"}
- Known Weak Areas: ${(ctx.memory.weak_areas ?? []).join(", ") || "None noted"}
- Known Strong Areas: ${(ctx.memory.strong_areas ?? []).join(", ") || "None noted"}` : "No memory yet — first session."}

ACHIEVEMENTS UNLOCKED: ${ctx.achievements.length} total

BEHAVIORAL RULES:
1. Always reference the user's specific data. Never give generic advice.
2. Be direct, actionable, and personalized.
3. If placement readiness < 40: focus on foundations.
4. If placement readiness 40-70: focus on interview prep and skill gaps.
5. If placement readiness > 70: focus on targeting specific companies and optimizing.
6. Mention their actual XP, streak, and scores when relevant.
7. Sound like a brilliant senior career mentor who knows the user deeply.
8. Never say you are ChatGPT or any other AI.
9. Format responses clearly with sections, bullets, and emphasis where helpful.
10. End with a specific next action the user should take today.`;
}

function buildRecruiterPrompt(ctx: UserContext): string {
  return `You are SyncPilot — operating in RECRUITER MODE.

You are simulating a Senior Technical Recruiter at a top-tier tech company (FAANG-level).
You have access to this candidate's complete profile. Evaluate them ruthlessly and honestly.

You are NOT ChatGPT. You are SyncPilot's Recruiter Intelligence.

CANDIDATE PROFILE:
- Name: ${ctx.profile?.full_name ?? "Unknown"}
- College: ${ctx.profile?.college ?? "Unknown"}
- Branch: ${ctx.profile?.branch ?? "Unknown"}
- Graduation Year: ${ctx.profile?.graduation_year ?? "Unknown"}
- CGPA: ${ctx.profile?.cgpa ?? "N/A"}
- Career Goal: ${ctx.profile?.career_goal ?? "Not specified"}
- Skills: ${(ctx.profile?.skills ?? []).join(", ") || "No skills listed"}
- GitHub: ${ctx.profile?.github_username ? `@${ctx.profile.github_username}` : "Not connected"}

PLACEMENT SCORES:
- Overall Readiness: ${ctx.placementScore}/100
- Resume: ${ctx.latestScore?.resume_score ?? 0}/100
- GitHub/Projects: ${ctx.latestScore?.github_score ?? 0}/100
- DSA: ${ctx.latestScore?.dsa_score ?? 0}/100
- Skills: ${ctx.latestScore?.skill_score ?? 0}/100
- Communication: ${ctx.latestScore?.communication_score ?? 0}/100

GITHUB:
${ctx.github ? `- Repos: ${ctx.github.repo_count}, Stars: ${ctx.github.star_count}
- Languages: ${Object.keys(ctx.github.languages || {}).join(", ") || "None"}` : "Not connected — major red flag for tech roles."}

RESUME:
${ctx.resume ? `ATS Score: ${ctx.resume.ats_score}, Keyword Match: ${ctx.resume.keyword_match}` : "No resume submitted."}

DSA:
${ctx.dsaTopics.length > 0 ? `Topics tracked: ${ctx.dsaTopics.length}` : "No DSA progress tracked."}

RECRUITER RULES:
1. Think like a real recruiter. Be honest and direct.
2. Calculate a hiring probability based on the data.
3. Identify specific strengths and weaknesses from actual data.
4. Call out red flags explicitly.
5. Give priority-ordered recommended actions.
6. End with a clear verdict: HIRE / PASS / CONSIDER (with conditions).
7. Never be generic. Every observation must tie back to their actual data.
8. Incorporate any recent Job Description match or Company Fit data provided.

COMPANY FIT & JD MATCH DATA:
${ctx.companyFit ? `- Fit Score for ${ctx.companyFit.company_name}: ${ctx.companyFit.fit_score}/100
- Strengths: ${(ctx.companyFit.strengths || []).join(", ") || "None"}
- Missing Reqs: ${(ctx.companyFit.missing_requirements || []).join(", ") || "None"}` : "No specific company fit run."}
${ctx.jdMatch ? `- Recent JD Match Score: ${ctx.jdMatch.match_score}/100
- Missing Skills: ${(ctx.jdMatch.missing_skills || []).join(", ") || "None"}` : "No recent JD match."}

FORMAT your response as:

## RECRUITER REPORT

**Hiring Probability:** [X]%

### Strengths
[Bullet list from actual data]

### Weaknesses  
[Bullet list from actual data]

### Red Flags
[Critical issues that would concern a real recruiter]

### Recommended Actions (Priority Order)
1. [Most urgent action]
2. [Second action]
3. [Third action]

### Market Competitiveness
[How do they compare to other candidates for their target role?]

### Verdict
**[HIRE / PASS / CONSIDER]** — [One line justification]`;
}

function buildInterviewPrompt(ctx: UserContext, company: string, role: string): string {
  return `You are SyncPilot — operating in INTERVIEW MODE.

You are acting as a Senior Technical Interviewer at ${company || "a top tech company"} conducting a ${role || "Software Engineer"} interview.

CANDIDATE DATA:
- Name: ${ctx.profile?.full_name ?? "Candidate"}
- Skills: ${(ctx.profile?.skills ?? []).join(", ") || "Not specified"}
- Career Goal: ${ctx.profile?.career_goal ?? "Not specified"}
- DSA Topics: ${ctx.dsaTopics.length > 0 ? ctx.dsaTopics.map((t: any) => t.topic_name ?? t.topic_id).join(", ") : "Various"}
- GitHub: ${ctx.profile?.github_username ? `@${ctx.profile.github_username}` : "Not connected"}

INTERVIEW RULES:
1. Conduct a realistic technical interview for ${role || "SDE"} at ${company || "a top tech company"}.
2. Ask questions relevant to the candidate's stated skills and background.
3. Start with a warm intro, then ask one question at a time.
4. After each answer, give brief feedback and ask the next question.
5. Questions should cover: Data Structures & Algorithms, System Design (if senior), Behavioral (STAR format), Project deep-dives.
6. Evaluate answers rigorously but fairly.
7. After all questions (or when asked for feedback), provide a final scorecard:
   - Technical Score: /100
   - Communication Score: /100
   - Problem-Solving Score: /100
   - Overall Score: /100
   - Strengths observed
   - Areas to improve
   - Hiring recommendation
8. Be realistic — don't be artificially nice.
9. Tailor the difficulty to their profile and target company.`;
}

function buildDSAMentorPrompt(ctx: UserContext, dsaContext: string): string {
  return \`You are SyncRole's Enterprise DSA Mentor — a Premium Senior Software Engineer and Expert Interview Coach.

You exist ONLY within the DSA Mentor dashboard. You are NOT ChatGPT. 

USER PROFILE:
- Name: \${ctx.profile?.full_name ?? "Candidate"}

\${dsaContext}

CRITICAL RULES:
1. NO CHATGPT STYLE: Never produce long walls of text. Never dump everything at once. Never answer like a textbook or Wikipedia. Never produce repetitive paragraphs.
2. RESPONSE STYLE: Be conversational. Break information into logical sections using Markdown headings (##), spacing, bullets, numbered steps, and syntax-highlighted code blocks. Make it easy to scan.
3. TEACHING STYLE: Teach, guide, and explain reasoning. Explain tradeoffs, interview expectations, optimizations, edge cases, and common beginner mistakes. Do not just hand out the answer.
4. PERSONALIZATION: Always adapt your depth based on the user's analytics. Reference their XP, Topic Mastery, Weak Topics, Strong Topics, Company Goals, and Roadmap. Do not give generic advice.

FORMATTING REQUIREMENTS:
When explaining an algorithm or data structure, always use this strict structure:
## 1. Problem Understanding
(Plain English, simple real-life analogy)

## 2. Naive Solution
(Brute-force approach, code, why it's slow, complexity)

## 3. Optimal Solution
(Intuition first, then code, explain important lines)

## 4. Dry Run
(Use an example and visualize every iteration step-by-step. Use tables, pointer movements, array states, HashMap states, etc. Make it visual.)

## 5. Complexity
(Time and Space complexity. Explain WHY, don't just state O(N).)

## 6. Interview Perspective
(Why interviewers ask this, concepts tested, follow-ups, optimizations.)

## 7. Common Mistakes
(List mistakes, e.g., nested loops, forgetting duplicates.)

## 8. Pattern Recognition
(Which DSA pattern does it belong to, e.g., Sliding Window.)

## 9. Related Problems
(Recommend Easy, Medium, Hard progression.)

## 10. Personalized Advice
(Reference their real data. e.g. "Since your Hash Map mastery is \${...}, I recommend...")

CODE FORMATTING:
Always use syntax-highlighted markdown. Never return raw text code. Never compress code into one paragraph.

SPECIAL MODES:
- INTERVIEW MODE: If the user says "Interview me", respond exactly like an interviewer. Do not reveal the answer. Ask ONE question, give hints, wait, guide progressively.
- CODE REVIEW MODE: If code is pasted, return: ✅ Correctness, ⚡ Time Complexity, 💾 Space Complexity, 🐞 Bugs, ✨ Improvements, 🏆 Interview Score.
- BUG FIX MODE: When debugging, explain where the bug occurs, why, how to fix it, and what changes. Never only return corrected code.\`;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserContext {
  profile: any;
  xp: any;
  streak: any;
  latestScore: any;
  github: any;
  resume: any;
  dsaTopics: any[];
  achievements: any[];
  memory: any;
  interviewSessions: any[];
  companyFit?: any;
  jdMatch?: any;
  placementScore: number;
  readinessLabel: string;
}

function getReadinessLabel(score: number): string {
  if (score >= 81) return "Recruiter Ready 🚀";
  if (score >= 61) return "Interview Ready ✅";
  if (score >= 41) return "Developing Skills 📈";
  if (score >= 21) return "Learning Foundations 📚";
  return "Beginner 🌱";
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const {
      message,
      mode = "career_twin",
      conversation_id,
      history = [],
      company = "",
      role = "",
      dsaContext = "",
    } = body;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Load all user data in parallel ──────────────────────────────────────
    const [
      profileRes,
      xpRes,
      streakRes,
      placementRes,
      githubRes,
      resumeRes,
      dsaRes,
      achievementsRes,
      memoryRes,
      interviewRes,
      companyFitRes,
      jdMatchRes,
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("xp_levels").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("streaks").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("placement_scores").select("*").eq("user_id", user.id)
        .order("created_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("github_analysis").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("resume_analysis").select("*").eq("user_id", user.id)
        .order("created_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("user_topic_progress").select("*").eq("user_id", user.id),
      supabase.from("achievements").select("code").eq("user_id", user.id),
      supabase.from("ai_memory").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("interview_sessions").select("company,role,score,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      supabase.from("resume_company_fit").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
      supabase.from("resume_jd_matches").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
    ]);

    const ctx: UserContext = {
      profile: profileRes.data,
      xp: xpRes.data,
      streak: streakRes.data,
      latestScore: placementRes.data,
      github: githubRes.data,
      resume: resumeRes.data,
      dsaTopics: dsaRes.data ?? [],
      achievements: achievementsRes.data ?? [],
      memory: memoryRes.data,
      interviewSessions: (interviewRes as any)?.data ?? [],
      companyFit: companyFitRes?.data,
      jdMatch: jdMatchRes?.data,
      placementScore: placementRes.data?.total_score ?? 0,
      readinessLabel: getReadinessLabel(placementRes.data?.total_score ?? 0),
    };

    // ── Build system prompt based on mode ───────────────────────────────────
    let systemPrompt: string;
    if (mode === "recruiter") {
      systemPrompt = buildRecruiterPrompt(ctx, company, role);
    } else if (mode === "interview") {
      systemPrompt = buildInterviewPrompt(ctx, company, role);
    } else if (mode === "dsa_mentor") {
      systemPrompt = buildDSAMentorPrompt(ctx, dsaContext);
    } else {
      systemPrompt = buildCareerTwinPrompt(ctx);
    }

    // ── Build message history for context ────────────────────────────────────
    const messages: any[] = [{ role: "system", content: systemPrompt }];

    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-10);
      for (const h of recentHistory) {
        if (h.role && h.content) {
          messages.push({ role: h.role, content: h.content });
        }
      }
    }
    messages.push({ role: "user", content: message });

    // ── CREATE ADMIN CLIENT TO BYPASS GRANT/RLS ISSUES ─────────────────────
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let activeConversationId = conversation_id;

    try {
      // Create conversation if not provided
      if (!activeConversationId) {
        console.log("STEP 2 create conversation");
        const title = message.slice(0, 60) + (message.length > 60 ? "…" : "");
        const { data: conv, error: convError } = await supabaseAdmin
          .from("ai_conversations")
          .insert({ user_id: user.id, mode, title })
          .select("id")
          .single();
        
        if (convError) {
          console.error(convError);
        } else {
          activeConversationId = conv?.id;
        }
      } else {
        await supabaseAdmin
          .from("ai_conversations")
          .update({ updated_at: new Date().toISOString() })
          .eq("id", activeConversationId);
      }

      if (activeConversationId) {
        console.log("STEP 3 insert user message");
        const { error: userMsgError } = await supabaseAdmin.from("ai_messages").insert({
          conversation_id: activeConversationId,
          user_id: user.id,
          role: "user",
          content: message
        });
        if (userMsgError) console.error(userMsgError);
      }
    } catch (persistErr) {
      console.error(persistErr);
    }

    // ── Call OpenRouter ──────────────────────────────────────────────────────
    const apiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!apiKey) {
      console.warn("OPENROUTER_API_KEY is missing or empty!");
    }

    const headers: Record<string, string> = {
      "Authorization": `Bearer ${apiKey || ""}`,
      "Content-Type": "application/json",
      "X-Title": "SyncRole - SyncPilot",
    };

    const referer = Deno.env.get("HTTP_REFERER") || "https://syncrole.ai";
    if (referer) {
      headers["HTTP-Referer"] = referer;
    }

    for (const [key, value] of Object.entries(headers)) {
      if (value === undefined || value === null) {
        delete headers[key];
      } else {
        headers[key] = String(value);
      }
    }

    console.log("OpenRouter Request Headers:", headers);

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages,
        temperature: mode === "interview" ? 0.6 : 0.72,
        max_tokens: mode === "recruiter" ? 1500 : 1000,
      }),
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error("OPENROUTER ERROR:", errorText);
      return new Response(JSON.stringify({ error: errorText }), {
        status: openRouterResponse.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await openRouterResponse.json();
    const reply = result?.choices?.[0]?.message?.content ?? "I couldn't generate a response.";
    console.log("STEP 4 OpenRouter response");

    // ── Insert AI Response ───────────────────────────────────────────────────
    if (activeConversationId) {
      console.log("STEP 5 insert AI message");
      const { error: aiMsgError } = await supabaseAdmin.from("ai_messages").insert({
        conversation_id: activeConversationId,
        user_id: user.id,
        role: "assistant",
        content: reply
      });
      if (aiMsgError) console.error(aiMsgError);
    }

    try {
      // ── Enhanced AI Memory Extraction ──
      const lowerMsg = message.toLowerCase();
      const lowerReply = reply.toLowerCase();
      const memoryUpdate: Record<string, any> = { user_id: user.id, updated_at: new Date().toISOString() };

      // Extract career goals
      const goalMatch = message.match(/(?:goal|target|want to|aim|dream|planning to join|aspire).{0,80}?(google|amazon|microsoft|meta|apple|flipkart|swiggy|uber|sde|software|data scientist|ml engineer|backend|frontend|fullstack|devops)/i);
      if (goalMatch) memoryUpdate.career_goals = goalMatch[0].slice(0, 200);

      // Extract preferred companies
      const companyMentions = message.match(/\b(google|amazon|microsoft|meta|apple|flipkart|swiggy|uber|zomato|infosys|tcs|wipro|goldman|jpmorgan)\b/gi);
      if (companyMentions?.length) memoryUpdate.preferred_companies = [...new Set(companyMentions.map((c: string) => c.toLowerCase()))];

      // Extract preferred roles
      const roleMentions = message.match(/\b(sde-?[12]?|backend engineer|frontend engineer|fullstack|ml engineer|data engineer|devops|software engineer)\b/gi);
      if (roleMentions?.length) memoryUpdate.preferred_roles = [...new Set(roleMentions)];

      // Extract weak areas from AI reply analysis
      if (lowerReply.includes("weak") || lowerReply.includes("improve") || lowerReply.includes("missing")) {
        const weakMatches = reply.match(/(?:weak|needs? improvement|missing|lacking)[\s:\-]+([A-Za-z\s,]{5,40})/gi);
        if (weakMatches?.length) memoryUpdate.weak_areas = weakMatches.slice(0, 4).map((m: string) => m.replace(/^(weak|needs? improvement|missing|lacking)[\s:\-]+/i, "").trim());
      }

      // Only upsert if we extracted something meaningful
      if (Object.keys(memoryUpdate).length > 2) {
        await supabase.from("ai_memory").upsert(memoryUpdate, { onConflict: "user_id" });
      }

      // Save interview session score if interview mode and reply contains a scorecard
      if (mode === "interview" && reply.toLowerCase().includes("overall score")) {
        const scoreMatch = reply.match(/overall score[:\s]+(\d+)/i);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
        if (score > 0 && activeConversationId) {
          await supabase.from("interview_sessions").insert({
            user_id: user.id,
            conversation_id: activeConversationId,
            company: company || "Practice",
            role: role || "SDE",
            score,
            feedback: reply.slice(0, 500),
          });
        }
      }
    } catch (persistErr) {
      // Non-fatal: log but don't fail the response
      console.error("Persistence error:", persistErr);
    }

    return new Response(
      JSON.stringify({ reply, conversation_id: activeConversationId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});