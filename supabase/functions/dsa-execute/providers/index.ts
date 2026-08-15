import { CodeExecutionProvider } from "./types.ts";
import { PistonExecutionProvider } from "./piston.ts";
import { Judge0ExecutionProvider } from "./judge0.ts";

export * from "./types.ts";
export * from "./piston.ts";
export * from "./judge0.ts";

export function getExecutionProvider(): CodeExecutionProvider {
  const providerName = (Deno.env.get("EXECUTION_PROVIDER") || "").toLowerCase();

  if (providerName === "piston" || Deno.env.get("PISTON_API_URL")) {
    return new PistonExecutionProvider();
  }

  // Default to Judge0 provider (uses JUDGE0_API_URL or open Judge0 CE endpoint https://ce.judge0.com)
  return new Judge0ExecutionProvider();
}
