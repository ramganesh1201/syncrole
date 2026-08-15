// Complete End-to-End Test for dsa-execute Edge Function & Supabase DB (Anonymous Auth)

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ltsaqitiuruqcxywmzom.supabase.co";
const ANON_KEY = "sb_publishable_dd26-2TEhsBh81phR3USoA_2_U90ws-";

const supabase = createClient(SUPABASE_URL, ANON_KEY);

const twoSumSolution = `
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`;

async function main() {
  console.log("=== Starting E2E Verification ===");

  let user;

  // Try anonymous auth
  const { data: anonData, error: anonErr } = await supabase.auth.signInAnonymously();

  if (!anonErr && anonData.user) {
    user = anonData.user;
  } else {
    console.log("Anon auth notice:", anonErr?.message);
    // Fallback: sign up without confirmation or sign in
    const email = `testuser_${Date.now()}@example.com`;
    const password = "Password123!";
    const { data: suData, error: suErr } = await supabase.auth.signUp({ email, password });
    if (suErr || !suData.user) {
      console.error("Auth failed:", suErr?.message);
      return;
    }
    user = suData.user;
  }

  console.log("✓ Authenticated test user:", user.id);

  // Fetch Two Sum problem ID
  const { data: problem, error: probError } = await supabase
    .from("dsa_problems")
    .select("id, title")
    .eq("title", "Two Sum")
    .single();

  if (probError || !problem) {
    console.error("Failed to find Two Sum problem:", probError?.message);
    return;
  }

  console.log("✓ Found problem:", problem.title, "(ID:", problem.id, ")");

  // --- TEST 1: RUN CODE (Sample Tests) ---
  console.log("\n--- Executing RUN (Sample Tests) ---");
  const { data: runSub, error: runSubErr } = await supabase
    .from("dsa_submissions")
    .insert({
      user_id: user.id,
      problem_id: problem.id,
      language: "javascript",
      source_code: twoSumSolution,
      status: "queued",
      is_run_only: true,
      attempt_number: 1,
      passed_tests: 0,
      total_tests: 0,
    })
    .select("id")
    .single();

  if (runSubErr || !runSub) {
    console.error("Failed to create RUN submission:", runSubErr?.message);
    return;
  }

  console.log("✓ Created RUN submission ID:", runSub.id);

  const { data: runFnData, error: runFnErr } = await supabase.functions.invoke(
    "dsa-execute",
    {
      body: {
        submission_id: runSub.id,
        is_run_only: true,
      },
    }
  );

  console.log("RUN Edge Function Response Data:", runFnData);
  console.log("RUN Edge Function Response Error:", runFnErr);

  const { data: finalRunSub } = await supabase
    .from("dsa_submissions")
    .select("id, status, passed_tests, total_tests, execution_time_ms")
    .eq("id", runSub.id)
    .single();

  console.log("✓ RUN Final Submission DB Row:", finalRunSub);

  // --- TEST 2: SUBMIT CODE (All Tests) ---
  console.log("\n--- Executing SUBMIT (All Tests) ---");
  const { data: submitSub, error: submitSubErr } = await supabase
    .from("dsa_submissions")
    .insert({
      user_id: user.id,
      problem_id: problem.id,
      language: "javascript",
      source_code: twoSumSolution,
      status: "queued",
      is_run_only: false,
      attempt_number: 2,
      passed_tests: 0,
      total_tests: 0,
    })
    .select("id")
    .single();

  if (submitSubErr || !submitSub) {
    console.error("Failed to create SUBMIT submission:", submitSubErr?.message);
    return;
  }

  console.log("✓ Created SUBMIT submission ID:", submitSub.id);

  const { data: submitFnData, error: submitFnErr } = await supabase.functions.invoke(
    "dsa-execute",
    {
      body: {
        submission_id: submitSub.id,
        is_run_only: false,
      },
    }
  );

  console.log("SUBMIT Edge Function Response Data:", submitFnData);
  console.log("SUBMIT Edge Function Response Error:", submitFnErr);

  const { data: finalSubmitSub } = await supabase
    .from("dsa_submissions")
    .select("id, status, passed_tests, total_tests, execution_time_ms")
    .eq("id", submitSub.id)
    .single();

  console.log("✓ SUBMIT Final Submission DB Row:", finalSubmitSub);

  // --- TEST 3: VERIFY USER PROGRESS & SOLVED STATE ---
  const { data: userProgress } = await supabase
    .from("user_problem_progress")
    .select("solved, status, attempt_count, submission_count")
    .eq("user_id", user.id)
    .eq("problem_id", problem.id)
    .single();

  console.log("✓ User Problem Progress DB Row:", userProgress);
}

main().catch(console.error);
