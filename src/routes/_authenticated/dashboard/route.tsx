import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardLayout,
});

/**
 * Pure layout — no content of its own.
 * Renders whichever sibling child matches the URL:
 *   /dashboard       → dashboard/index.tsx  (Dashboard Home)
 *   /dashboard/dsa   → dashboard/dsa.tsx    (DSA Command Center)
 *
 * This ensures the two pages are true siblings and never co-render.
 */
function DashboardLayout() {
  return <Outlet />;
}
