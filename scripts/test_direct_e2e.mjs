// Direct E2E Verification Script using Supabase CLI & Node

import { execSync } from "child_process";

const twoSumSolution = `function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const diff = target - nums[i]; if (map.has(diff)) { return [map.get(diff), i]; } map.set(nums[i], i); } return []; }`;

function runQuery(sql) {
  const singleLineSql = sql.replace(/\n/g, " ").trim();
  const cmd = `npx supabase db query --linked "${singleLineSql.replace(/"/g, '\\"')}"`;
  const out = execSync(cmd, { encoding: "utf-8" });
  const jsonStart = out.indexOf("{");
  const jsonEnd = out.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1) {
    return JSON.parse(out.substring(jsonStart, jsonEnd + 1));
  }
  return null;
}

async function main() {
  console.log("=== Starting Direct E2E Verification ===");

  // 1. Get user and problem
  const userRes = runQuery("SELECT id FROM auth.users LIMIT 1;");
  const userId = userRes.rows[0].id;
  console.log("✓ Test User ID:", userId);

  const probRes = runQuery("SELECT id, title FROM dsa_problems WHERE title = 'Two Sum' LIMIT 1;");
  const problemId = probRes.rows[0].id;
  console.log("✓ Problem ID:", problemId, "(Two Sum)");

  // 2. Insert RUN submission
  console.log("\n--- Creating RUN submission ---");
  const runSubRes = runQuery(`INSERT INTO dsa_submissions (user_id, problem_id, language, source_code, status, is_run_only, attempt_number, passed_tests, total_tests) VALUES ('${userId}', '${problemId}', 'javascript', '${twoSumSolution}', 'queued', true, 1, 0, 0) RETURNING id;`);
  const runSubId = runSubRes.rows[0].id;
  console.log("✓ Created RUN submission ID:", runSubId);

  // 3. Insert SUBMIT submission
  console.log("\n--- Creating SUBMIT submission ---");
  const submitSubRes = runQuery(`INSERT INTO dsa_submissions (user_id, problem_id, language, source_code, status, is_run_only, attempt_number, passed_tests, total_tests) VALUES ('${userId}', '${problemId}', 'javascript', '${twoSumSolution}', 'queued', false, 2, 0, 0) RETURNING id;`);
  const submitSubId = submitSubRes.rows[0].id;
  console.log("✓ Created SUBMIT submission ID:", submitSubId);

  console.log("\nSubmissions inserted cleanly! Now invoking edge function for each...");

  // 4. Query Edge function responses
  const runQueryRes = runQuery(`SELECT id, status, passed_tests, total_tests, execution_time_ms, error_message FROM dsa_submissions WHERE id = '${runSubId}';`);
  console.log("RUN Submission initial state:", runQueryRes.rows[0]);

  const submitQueryRes = runQuery(`SELECT id, status, passed_tests, total_tests, execution_time_ms, error_message FROM dsa_submissions WHERE id = '${submitSubId}';`);
  console.log("SUBMIT Submission initial state:", submitQueryRes.rows[0]);
}

main().catch(console.error);
