import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { d as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DJSrJ5NY.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Pure layout — no content of its own.
* Renders whichever sibling child matches the URL:
*   /dashboard       → dashboard/index.tsx  (Dashboard Home)
*   /dashboard/dsa   → dashboard/dsa.tsx    (DSA Command Center)
*
* This ensures the two pages are true siblings and never co-render.
*/
function DashboardLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { DashboardLayout as component };
