import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── Mode-specific system prompts (improved) ──────────────────────────────

// ── Helper: format GitHub repos for context ──────────────────────────────────
function formatGitHubRepos(repos: any[]): string {
  if (!repos || repos.length === 0) return "[DATA UNAVAILABLE] - No repository details retrieved.";
  return repos.map((r: any, i: number) => {
    const parts = [`${i + 1}. ${r.name}`];
    if (r.description) parts.push(`   Description: ${r.description}`);
    if (r.language) parts.push(`   Language: ${r.language}`);
    if (r.stargazers_count > 0) parts.push(`   Stars: ${r.stargazers_count}`);
    if (r.forks_count > 0) parts.push(`   Forks: ${r.forks_count}`);
    if (r.html_url) parts.push(`   URL: ${r.html_url}`);
    if (r.homepage) parts.push(`   Demo: ${r.homepage}`);
    if (r.topics?.length > 0) parts.push(`   Topics: ${r.topics.join(", ")}`);
    parts.push(`   Visibility: ${r.private ? "Private" : "Public"}`);
    parts.push(`   Last updated: ${r.updated_at ? new Date(r.updated_at).toLocaleDateString() : "Unknown"}`);
    return parts.join("\n");
  }).join("\n\n");
}

// ── Helper: format resume context ─────────────────────────────────────────────
function formatResumeContext(resume: any): string {
  if (!resume) return "[DATA UNAVAILABLE] - No resume analyzed yet.";
  const parts = [
    `- ATS Score: ${resume.ats_score ?? "[DATA UNAVAILABLE]"}/100`,
    `- Keyword Match: ${resume.keyword_match ?? "[DATA UNAVAILABLE]"}/100`,
    `- Total Score: ${resume.total_score ?? "[DATA UNAVAILABLE]"}/100`,
    `- Formatting Score: ${resume.formatting_score ?? "[DATA UNAVAILABLE]"}/100`,
    `- Project Score: ${resume.project_score ?? "[DATA UNAVAILABLE]"}/100`,
  ];
  if (resume.missing_skills?.length > 0) parts.push(`- Missing Skills: ${resume.missing_skills.join(", ")}`);
  if (resume.suggestions?.length > 0) parts.push(`- Suggestions: ${resume.suggestions.join("; ")}`);
  if (resume.analysis_results) {
    try {
      const ar = typeof resume.analysis_results === "string" ? JSON.parse(resume.analysis_results) : resume.analysis_results;
      if (ar.strengths?.length > 0) parts.push(`- Strengths: ${ar.strengths.join(", ")}`);
      if (ar.weaknesses?.length > 0) parts.push(`- Weaknesses: ${ar.weaknesses.join(", ")}`);
      if (ar.experience?.length > 0) parts.push(`- Experience: ${ar.experience.map((e: any) => typeof e === "string" ? e : e.title || e.role || JSON.stringify(e)).slice(0, 3).join("; ")}`);
      if (ar.education?.length > 0) parts.push(`- Education: ${ar.education.map((e: any) => typeof e === "string" ? e : e.degree || e.institution || JSON.stringify(e)).slice(0, 3).join("; ")}`);
      if (ar.projects?.length > 0) parts.push(`- Projects Found: ${ar.projects.map((p: any) => typeof p === "string" ? p : p.name || p.title || JSON.stringify(p)).slice(0, 5).join("; ")}`);
      if (ar.skills?.length > 0) parts.push(`- Skills Identified: ${ar.skills.join(", ")}`);
    } catch (_) { /* ignore parse errors */ }
  }
  parts.push(`- Analysis Date: ${resume.created_at ? new Date(resume.created_at).toLocaleDateString() : "Unknown"}`);
  return parts.join("\n");
}

// ── Helper: format profile context ────────────────────────────────────────────
function formatProfileContext(profile: any): string {
  if (!profile) return "[DATA UNAVAILABLE]";
  const parts = [
    `- Name: ${profile.full_name ?? "[DATA UNAVAILABLE]"}`,
    `- College: ${profile.college ?? "[DATA UNAVAILABLE]"}`,
    `- Branch: ${profile.branch ?? "[DATA UNAVAILABLE]"}`,
    `- Graduation Year: ${profile.graduation_year ?? "[DATA UNAVAILABLE]"}`,
    `- CGPA: ${profile.cgpa ?? "[DATA UNAVAILABLE]"}`,
  ];
  if (profile.city) parts.push(`- City: ${profile.city}`);
  if (profile.linkedin) parts.push(`- LinkedIn: ${profile.linkedin}`);
  if (profile.portfolio) parts.push(`- Portfolio: ${profile.portfolio}`);
  if (profile.leetcode) parts.push(`- LeetCode: ${profile.leetcode}`);
  if (profile.codeforces) parts.push(`- Codeforces: ${profile.codeforces}`);
  return parts.join("\n");
}

// ── Shared DATA RULES block ───────────────────────────────────────────────────
const DATA_RULES = `
DATA RULES:
1. You are assisting the currently authenticated user only.
2. Use only information contained in CURRENT USER CONTEXT.
3. Never use another user's information.
4. Never use generic example data as if it belongs to the user.
5. Never invent repository names, project names, scores, skills, companies, achievements, resume details, or career statistics.
6. Never infer an exact value when the actual value is unavailable.
7. Distinguish between aggregate statistics (GitHub Summary) and detailed records (GitHub Repositories). Do NOT generate repository names from a repository count.
8. If detailed information is unavailable, explicitly say that it is unavailable.
9. If a user asks for a list, return the actual records available in CURRENT USER CONTEXT.
10. If the requested data is not available, explain exactly what information is unavailable instead of generating placeholders.
11. Use the user's actual profile, GitHub, resume, DSA, placement, career and activity information whenever relevant.
12. Never expose authentication tokens, API keys, passwords, or internal security information.
13. Do not claim to have accessed GitHub data unless GitHub data was actually provided above.
14. Treat missing data as missing data, not as an invitation to guess.
15. Separate FACTS (from data) from RECOMMENDATIONS (your suggestions). Never present a recommendation as a stored data point.
16. Sound like a brilliant senior career mentor who knows the user deeply based on the data.
17. Never say you are ChatGPT or any other AI.
`;

// ── Mode-specific system prompts ──────────────────────────────────────────────

function buildCareerTwinPrompt(ctx: UserContext): string {
  return `
CURRENT USER CONTEXT

Identity:
${formatProfileContext(ctx.profile)}

Career Goals:
- Career Goal: ${ctx.profile?.career_goal ?? "[DATA UNAVAILABLE]"}
- Target Role: ${ctx.profile?.target_role ?? "[DATA UNAVAILABLE]"}
- Dream Companies: ${(ctx.profile?.dream_companies ?? []).join(", ") || "[DATA UNAVAILABLE]"}
- Preferred Location: ${ctx.profile?.preferred_location ?? "[DATA UNAVAILABLE]"}
- Expected Salary: ${ctx.profile?.expected_salary ?? "[DATA UNAVAILABLE]"}

Skills:
${(ctx.profile?.skills ?? []).length > 0 ? (ctx.profile?.skills ?? []).join(", ") : "[DATA UNAVAILABLE]"}

Placement Readiness:
${ctx.placementScore > 0 ? `- Overall Score: ${ctx.placementScore}/100 (${ctx.readinessLabel})
- Resume Score: ${ctx.latestScore?.resume_score ?? 0}/100
- GitHub Score: ${ctx.latestScore?.github_score ?? 0}/100
- DSA Score: ${ctx.latestScore?.dsa_score ?? 0}/100
- Skills Score: ${ctx.latestScore?.skill_score ?? 0}/100` : "[DATA UNAVAILABLE]"}

Recent Activity & XP:
- Total XP: ${ctx.xp?.total_xp ?? 0} (Level ${ctx.xp?.level ?? 1}: ${ctx.xp?.level_name ?? "Career Explorer"})
- Current Streak: ${ctx.streak?.current_streak ?? 0} days (Best: ${ctx.streak?.longest_streak ?? 0} days)
- Achievements Unlocked: ${ctx.achievements.length} total

GitHub Summary:
${ctx.github ? `- Username: @${ctx.github.username ?? ctx.profile?.github_username ?? "[DATA UNAVAILABLE]"}
- Total Repos: ${ctx.github.repo_count ?? "[DATA UNAVAILABLE]"}
- Stars: ${ctx.github.star_count ?? 0}
- Followers: ${ctx.github.follower_count ?? 0}
- GitHub Score: ${ctx.github.score ?? "[DATA UNAVAILABLE]"}/100
- Top Languages: ${Object.keys(ctx.github.languages || {}).slice(0, 5).join(", ") || "None detected"}
- Strengths: ${(ctx.github.strengths || []).join(", ") || "None"}
- Weaknesses: ${(ctx.github.weaknesses || []).join(", ") || "None"}
- Recommendations: ${(ctx.github.recommendations || []).join("; ") || "None"}
- Last Analyzed: ${ctx.github.analyzed_at ? new Date(ctx.github.analyzed_at).toLocaleDateString() : "Unknown"}` : "[DATA UNAVAILABLE] - GitHub not connected or analyzed yet."}

GitHub Repositories (detailed):
${formatGitHubRepos(ctx.githubRepos)}

Resume Intelligence:
${formatResumeContext(ctx.resume)}

DSA Progress:
${ctx.dsaTopics.length > 0 ? ctx.dsaTopics.map((t: any) => `- ${t.topic_name ?? t.topic_id}: ${t.solved_count ?? 0} solved`).join("\n") : "[DATA UNAVAILABLE] - No DSA progress tracked yet."}

Interview History:
${ctx.interviewSessions.length > 0 ? ctx.interviewSessions.map((s: any) => `- ${s.company ?? "Unknown"} (${s.role ?? "Unknown"}): Score ${s.score ?? "N/A"} on ${s.created_at ? new Date(s.created_at).toLocaleDateString() : "Unknown"}`).join("\n") : "[DATA UNAVAILABLE]"}

AI Memory (Previous Sessions):
${ctx.memory ? `- Career Goals: ${ctx.memory.career_goals ?? "[DATA UNAVAILABLE]"}
- Preferred Companies: ${(ctx.memory.preferred_companies ?? []).join(", ") || "[DATA UNAVAILABLE]"}
- Preferred Roles: ${(ctx.memory.preferred_roles ?? []).join(", ") || "[DATA UNAVAILABLE]"}
- Known Weak Areas: ${(ctx.memory.weak_areas ?? []).join(", ") || "None noted"}
- Known Strong Areas: ${(ctx.memory.strong_areas ?? []).join(", ") || "None noted"}` : "[DATA UNAVAILABLE]"}
${DATA_RULES}`;
}

function buildRecruiterPrompt(ctx: UserContext, company: string, role: string): string {
  const targetCompany = company || ctx.profile?.dream_companies?.[0] || "a top tech company";
  const targetRole = role || ctx.profile?.target_role || "Software Engineer";

  return `You are SyncPilot — operating in RECRUITER MODE.

You are simulating a Senior Technical Recruiter at ${targetCompany} evaluating a candidate for a ${targetRole} role.
You have access to this candidate's complete profile. Evaluate them ruthlessly and honestly.
You are NOT ChatGPT. You are SyncPilot's Recruiter Intelligence.

CURRENT USER CONTEXT

Identity:
${formatProfileContext(ctx.profile)}

Career Goals:
- Career Goal: ${ctx.profile?.career_goal ?? "[DATA UNAVAILABLE]"}
- Target Role: ${ctx.profile?.target_role ?? "[DATA UNAVAILABLE]"}
- Dream Companies: ${(ctx.profile?.dream_companies ?? []).join(", ") || "[DATA UNAVAILABLE]"}

Skills:
${(ctx.profile?.skills ?? []).length > 0 ? (ctx.profile?.skills ?? []).join(", ") : "[DATA UNAVAILABLE]"}

Placement Readiness:
${ctx.placementScore > 0 ? `- Overall Score: ${ctx.placementScore}/100
- Resume Score: ${ctx.latestScore?.resume_score ?? 0}/100
- GitHub Score: ${ctx.latestScore?.github_score ?? 0}/100
- DSA Score: ${ctx.latestScore?.dsa_score ?? 0}/100
- Skills Score: ${ctx.latestScore?.skill_score ?? 0}/100` : "[DATA UNAVAILABLE]"}

GitHub Summary:
${ctx.github ? `- Username: @${ctx.github.username ?? ctx.profile?.github_username ?? "[DATA UNAVAILABLE]"}
- Total Repos: ${ctx.github.repo_count ?? "[DATA UNAVAILABLE]"}, Stars: ${ctx.github.star_count ?? 0}
- Languages: ${Object.keys(ctx.github.languages || {}).join(", ") || "None"}
- GitHub Score: ${ctx.github.score ?? "[DATA UNAVAILABLE]"}/100` : "[DATA UNAVAILABLE] - GitHub not connected."}

GitHub Repositories (detailed):
${formatGitHubRepos(ctx.githubRepos)}

Resume Intelligence:
${formatResumeContext(ctx.resume)}

DSA:
${ctx.dsaTopics.length > 0 ? ctx.dsaTopics.map((t: any) => `- ${t.topic_name ?? t.topic_id}: ${t.solved_count ?? 0} solved`).join("\n") : "[DATA UNAVAILABLE] - No DSA progress tracked."}

Company Fit & JD Match:
${ctx.companyFit ? `- Fit Score for ${ctx.companyFit.company_name}: ${ctx.companyFit.fit_score}/100
- Strengths: ${(ctx.companyFit.strengths || []).join(", ") || "None"}
- Missing Reqs: ${(ctx.companyFit.missing_requirements || []).join(", ") || "None"}` : "[DATA UNAVAILABLE]"}
${ctx.jdMatch ? `- Recent JD Match Score: ${ctx.jdMatch.match_score}/100
- Missing Skills: ${(ctx.jdMatch.missing_skills || []).join(", ") || "None"}` : "[DATA UNAVAILABLE]"}
${DATA_RULES}
FORMAT your response as:

## RECRUITER REPORT

**Hiring Probability:** [X]%

### Strengths
[Bullet list from actual data]

### Weaknesses  
[Bullet list from actual data]

### Red Flags
[Critical issues from missing or poor data]

### Recommended Actions (Priority Order)
1. [Most urgent action]
2. [Second action]
3. [Third action]

### Market Competitiveness
[How they compare for ${targetRole} at ${targetCompany}]

### Verdict
**[HIRE / PASS / CONSIDER]** — [One line justification]`;
}

function buildInterviewPrompt(ctx: UserContext, company: string, role: string): string {
  const targetCompany = company || ctx.profile?.dream_companies?.[0] || "a top tech company";
  const targetRole = role || ctx.profile?.target_role || "Software Engineer";

  return `You are SyncPilot — operating in INTERVIEW MODE.

You are acting as a Senior Technical Interviewer at ${targetCompany} conducting a ${targetRole} interview.

CURRENT USER CONTEXT

Identity:
- Name: ${ctx.profile?.full_name ?? "Candidate"}

Career Goals:
- Career Goal: ${ctx.profile?.career_goal ?? "[DATA UNAVAILABLE]"}

Skills:
${(ctx.profile?.skills ?? []).length > 0 ? (ctx.profile?.skills ?? []).join(", ") : "[DATA UNAVAILABLE]"}

GitHub:
- Username: ${ctx.profile?.github_username ? `@${ctx.profile.github_username}` : "[DATA UNAVAILABLE]"}

DSA:
${ctx.dsaTopics.length > 0 ? ctx.dsaTopics.map((t: any) => t.topic_name ?? t.topic_id).join(", ") : "[DATA UNAVAILABLE]"}

DATA RULES:
- Treat provided user data as factual application data.
- Do not invent missing values.
- If data is [DATA UNAVAILABLE], do not base your questions on assumptions.
- Tailor the technical questions specifically to the Skills listed.

INTERVIEW RULES:
1. Conduct a realistic technical interview for ${targetRole} at ${targetCompany}.
2. Ask questions relevant to the candidate's actual skills.
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
  return `You are SyncRole's Enterprise DSA Mentor — a Premium Senior Software Engineer and Expert Interview Coach.

You exist ONLY within the DSA Mentor dashboard. You are NOT ChatGPT. 

USER PROFILE:
- Name: ${ctx.profile?.full_name ?? "Candidate"}

${dsaContext}

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
- BUG FIX MODE: When debugging, explain where the bug occurs, why, how to fix it, and what changes. Never only return corrected code.`;
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface UserContext {
  profile: any;
  xp: any;
  streak: any;
  latestScore: any;
  github: any;
  githubRepos: any[];
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

    // ── Fetch GitHub repository details ──────────────────────────────────
    let githubRepos: any[] = [];
    if (githubRes.data?.repositories && Array.isArray(githubRes.data.repositories) && githubRes.data.repositories.length > 0) {
      // Use persisted repository data from github_analysis to avoid rate limits
      githubRepos = githubRes.data.repositories;
    } else {
      const ghUsername = profileRes.data?.github_username || githubRes.data?.username;
      if (ghUsername) {
        try {
          const ghResponse = await fetch(
            `https://api.github.com/users/${encodeURIComponent(ghUsername)}/repos?per_page=100&sort=updated`,
            { headers: { "Accept": "application/vnd.github.v3+json", "User-Agent": "SyncRole-SyncPilot" } }
          );
          if (ghResponse.ok) {
            const repoData = await ghResponse.json();
            if (Array.isArray(repoData)) {
              githubRepos = repoData.map((r: any) => ({
                name: r.name,
                description: r.description,
                html_url: r.html_url,
                homepage: r.homepage,
                language: r.language,
                stargazers_count: r.stargazers_count,
                forks_count: r.forks_count,
                private: r.private,
                updated_at: r.updated_at,
                created_at: r.created_at,
                topics: r.topics,
                default_branch: r.default_branch,
                open_issues_count: r.open_issues_count,
                license: r.license?.spdx_id,
                size: r.size,
              }));
            }
          }
        } catch (e) {
          console.error("Failed to fetch GitHub repos for SyncPilot context", e);
        }
      }
    }

    const ctx: UserContext = {
      profile: profileRes.data,
      xp: xpRes.data,
      streak: streakRes.data,
      latestScore: placementRes.data,
      github: githubRes.data,
      githubRepos,
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