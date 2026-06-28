import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { s as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AuroraBackground-BuJ7TTsw.js
var import_jsx_runtime = require_jsx_runtime();
function AuroraBackground() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-50 blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.72 0.22 295 / 0.6), transparent 60%)" },
				animate: {
					x: [
						"-50%",
						"-45%",
						"-55%",
						"-50%"
					],
					y: [
						0,
						20,
						-10,
						0
					]
				},
				transition: {
					duration: 18,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute top-1/3 -right-40 h-[600px] w-[800px] rounded-full opacity-40 blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.75 0.20 200 / 0.55), transparent 60%)" },
				animate: {
					x: [
						0,
						-40,
						20,
						0
					],
					y: [
						0,
						30,
						-20,
						0
					]
				},
				transition: {
					duration: 22,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "absolute bottom-0 left-0 h-[500px] w-[700px] rounded-full opacity-30 blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.72 0.22 330 / 0.5), transparent 60%)" },
				animate: {
					x: [
						0,
						40,
						-20,
						0
					],
					y: [
						0,
						-30,
						20,
						0
					]
				},
				transition: {
					duration: 20,
					repeat: Infinity,
					ease: "easeInOut"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-bg" })
		]
	});
}
//#endregion
export { AuroraBackground as t };
