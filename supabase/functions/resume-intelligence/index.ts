import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  action: "classify" | "analyze_document" | "ats_scan" | "recruiter_view" | "jd_match" | "company_fit" | "rewrite";
  resumeText: string; // Used for all document text
  jdText?: string;
  companyName?: string;
  sectionText?: string;
}

// System prompts for different modes
const SYSTEM_PROMPTS = {
  classify: `You are a document classifier. Determine if the provided text is a Resume, Certificate, Transcript, Offer Letter, or Unknown. Look for key structural elements like work history (Resume), official seals/signatures (Certificate), course lists/grades (Transcript), or job offers/salary (Offer Letter).
Respond ONLY with valid JSON matching this structure:
{
  "document_type": "Resume" | "Certificate" | "Transcript" | "Offer Letter" | "Unknown"
}`,

  analyze_document: `You are an expert document analyzer. Extract key information from the provided non-resume document (Certificate, Transcript, or Offer Letter).
Provide a structured JSON response summarizing its contents (e.g., Issuer, Date, Key Achievements, Grade, Job Title, Salary).
Respond ONLY with valid JSON matching this structure:
{
  "summary": string,
  "key_details": {
    "issuer_or_institution": string,
    "date": string,
    "main_subject_or_role": string,
    "grade_or_salary": string
  },
  "extracted_skills_or_topics": string[]
}`,

  ats_scan: `You are an expert ATS (Applicant Tracking System) parser and Resume Grader.
Analyze the provided resume text and generate a structured JSON response evaluating its formatting, readability, keyword density, section structure, experience quality, project quality, and skills coverage.
Provide an ATS score, formatting score, project score, and a list of missing skills or suggestions.
Also, provide a heatmap evaluation (strong/average/weak) for: education, experience, projects, skills, achievements, certifications.
Respond ONLY with valid JSON matching this structure:
{
  "ats_score": number,
  "keyword_match": number,
  "formatting_score": number,
  "project_score": number,
  "total_score": number,
  "suggestions": string[],
  "missing_skills": string[],
  "heatmap": {
    "education": "strong" | "average" | "weak",
    "experience": "strong" | "average" | "weak",
    "projects": "strong" | "average" | "weak",
    "skills": "strong" | "average" | "weak",
    "achievements": "strong" | "average" | "weak",
    "certifications": "strong" | "average" | "weak"
  }
}`,

  recruiter_view: `You are a Senior FAANG Technical Recruiter.
Analyze the provided resume text and generate a structured JSON response simulating a recruiter's attention map and feedback.
Respond ONLY with valid JSON matching this structure:
{
  "most_viewed_sections": string[],
  "most_valuable_sections": string[],
  "likely_ignored_sections": string[],
  "what_recruiters_like": string[],
  "what_recruiters_dislike": string[],
  "top_strengths": string[],
  "top_weaknesses": string[],
  "top_opportunities": string[],
  "top_risks": string[]
}`,

  jd_match: `You are an AI Recruitment Engine evaluating a candidate against a Job Description.
Compare the resume text with the JD text and output a structured JSON response.
Respond ONLY with valid JSON matching this structure:
{
  "match_score": number,
  "matched_keywords": string[],
  "missing_keywords": string[],
  "missing_skills": string[],
  "priority_improvements": string[]
}`,

  company_fit: `You are an internal hiring committee member at the specified tech company.
Evaluate the candidate's resume for a software engineering role at this specific company.
Respond ONLY with valid JSON matching this structure:
{
  "fit_score": number,
  "strengths_for_company": string[],
  "weaknesses_for_company": string[],
  "missing_requirements": string[],
  "hiring_probability_estimate": string
}`,

  rewrite: `You are an elite Resume Writer.
Rewrite the provided resume section text using the STAR (Situation, Task, Action, Result) method. Add quantified impact metrics where possible, use recruiter-friendly language, and optimize for ATS.
Respond ONLY with valid JSON matching this structure:
{
  "before_text": string,
  "after_text": string,
  "improvements_made": string[]
}`
};

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

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized");

    const body: Payload = await req.json();
    const { action, resumeText, jdText, companyName, sectionText } = body;

    if (!resumeText && action !== "rewrite") {
      throw new Error("resumeText is required");
    }

    let systemPrompt = SYSTEM_PROMPTS[action];
    let userContent = "";

    switch (action) {
      case "classify":
        // Only send the first ~2000 chars to save tokens on classification
        userContent = `DOCUMENT TEXT:\n${resumeText.slice(0, 2000)}`;
        break;
      case "analyze_document":
        userContent = `DOCUMENT TEXT:\n${resumeText}`;
        break;
      case "ats_scan":
      case "recruiter_view":
        userContent = `RESUME:\n${resumeText}`;
        break;
      case "jd_match":
        userContent = `RESUME:\n${resumeText}\n\nJOB DESCRIPTION:\n${jdText}`;
        break;
      case "company_fit":
        systemPrompt = systemPrompt.replace("the specified tech company", companyName || "a top tech company");
        userContent = `COMPANY: ${companyName}\n\nRESUME:\n${resumeText}`;
        break;
      case "rewrite":
        userContent = `ORIGINAL TEXT:\n${sectionText || resumeText}`;
        break;
      default:
        throw new Error("Invalid action");
    }

    const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!openRouterApiKey) throw new Error("Missing OPENROUTER_API_KEY");

    const headers: Record<string, string> = {
      "Authorization": `Bearer ${openRouterApiKey}`,
      "Content-Type": "application/json",
      "X-Title": "SyncRole - Resume Intelligence",
    };

    const referer = Deno.env.get("HTTP_REFERER") || "https://syncrole.ai";
    headers["HTTP-Referer"] = referer;

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Cost-effective model for parsing
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent }
        ],
        temperature: 0.2,
      }),
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error("OpenRouter error:", errorText);
      throw new Error("Failed to get response from AI");
    }

    const result = await openRouterResponse.json();
    let content = result?.choices?.[0]?.message?.content;
    
    if (!content) throw new Error("Empty response from AI");
    
    // Clean markdown code blocks if the model wrapped the JSON
    content = content.replace(/```json\n/g, '').replace(/```/g, '').trim();

    const parsedJson = JSON.parse(content);

    // If ATS scan, optionally save it to DB (we might want the client to do this or do it here)
    // We will just return the JSON and let the frontend insert/update the DB so we can track versions.

    return new Response(JSON.stringify(parsedJson), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message || String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
