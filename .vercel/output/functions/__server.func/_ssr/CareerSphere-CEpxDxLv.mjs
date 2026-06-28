import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as Canvas, c as Vector3, i as OrbitControls, n as Float, o as useFrame, r as PointMaterial, t as Points } from "../_libs/@react-three/drei+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CareerSphere-CEpxDxLv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NODES = [
	"Resume",
	"GitHub",
	"Skills",
	"DSA",
	"Projects",
	"Communication",
	"Interviews",
	"Roadmap"
];
function fibonacciSphere(samples, radius) {
	const points = [];
	const phi = Math.PI * (3 - Math.sqrt(5));
	for (let i = 0; i < samples; i++) {
		const y = 1 - i / (samples - 1) * 2;
		const r = Math.sqrt(1 - y * y);
		const theta = phi * i;
		points.push(new Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
	}
	return points;
}
function NodesAndLines() {
	const group = (0, import_react.useRef)(null);
	const nodePositions = (0, import_react.useMemo)(() => fibonacciSphere(NODES.length, 2.2), []);
	const linePairs = (0, import_react.useMemo)(() => {
		const pairs = [];
		for (let i = 0; i < nodePositions.length; i++) for (let j = i + 1; j < nodePositions.length; j++) if (nodePositions[i].distanceTo(nodePositions[j]) < 3.2) pairs.push([nodePositions[i], nodePositions[j]]);
		return pairs;
	}, [nodePositions]);
	useFrame((state) => {
		if (!group.current) return;
		const t = state.clock.getElapsedTime();
		group.current.rotation.y = t * .12;
		group.current.rotation.x = Math.sin(t * .2) * .15;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: group,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("icosahedronGeometry", { args: [2.2, 3] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#a78bfa",
				wireframe: true,
				transparent: true,
				opacity: .18
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				2.18,
				64,
				64
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				color: "#7c3aed",
				transparent: true,
				opacity: .04
			})] }),
			linePairs.map(([a, b], i) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("line", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferGeometry", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("bufferAttribute", {
					attach: "attributes-position",
					args: [new Float32Array([
						a.x,
						a.y,
						a.z,
						b.x,
						b.y,
						b.z
					]), 3],
					count: 2
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
					color: "#7dd3fc",
					transparent: true,
					opacity: .35
				})] }, i);
			}),
			nodePositions.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Float, {
				speed: 2,
				rotationIntensity: .4,
				floatIntensity: .6,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: p,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.11,
						24,
						24
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: i % 2 === 0 ? "#a78bfa" : "#67e8f9",
						emissive: i % 2 === 0 ? "#7c3aed" : "#06b6d4",
						emissiveIntensity: 1.4,
						toneMapped: false
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: p,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.22,
						16,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: i % 2 === 0 ? "#a78bfa" : "#67e8f9",
						transparent: true,
						opacity: .18
					})]
				})]
			}, i))
		]
	});
}
function Particles() {
	const ref = (0, import_react.useRef)(null);
	const positions = (0, import_react.useMemo)(() => {
		const arr = new Float32Array(1500 * 3);
		for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - .5) * 14;
		return arr;
	}, []);
	useFrame((s) => {
		if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * .02;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Points, {
		ref,
		positions,
		stride: 3,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PointMaterial, {
			transparent: true,
			color: "#c4b5fd",
			size: .018,
			sizeAttenuation: true,
			depthWrite: false
		})
	});
}
function CareerSphere() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		camera: {
			position: [
				0,
				0,
				6.2
			],
			fov: 50
		},
		dpr: [1, 1.6],
		gl: {
			antialias: true,
			alpha: true
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
			fallback: null,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", { intensity: .6 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					position: [
						5,
						5,
						5
					],
					intensity: 1.2,
					color: "#a78bfa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
					position: [
						-5,
						-3,
						4
					],
					intensity: 1,
					color: "#22d3ee"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NodesAndLines, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Particles, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrbitControls, {
					enableZoom: false,
					enablePan: false,
					autoRotate: true,
					autoRotateSpeed: .4,
					rotateSpeed: .4
				})
			]
		})
	});
}
//#endregion
export { CareerSphere as default };
