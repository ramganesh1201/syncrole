import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial, Float } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

const NODES = [
  "Resume",
  "GitHub",
  "Skills",
  "DSA",
  "Projects",
  "Communication",
  "Interviews",
  "Roadmap",
];

function fibonacciSphere(samples: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius),
    );
  }
  return points;
}

function NodesAndLines() {
  const group = useRef<THREE.Group>(null);
  const nodePositions = useMemo(() => fibonacciSphere(NODES.length, 2.2), []);
  const linePairs = useMemo(() => {
    const pairs: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 3.2) {
          pairs.push([nodePositions[i], nodePositions[j]]);
        }
      }
    }
    return pairs;
  }, [nodePositions]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.12;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.15;
  });

  return (
    <group ref={group}>
      {/* Wireframe sphere */}
      <mesh>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.18, 64, 64]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.04} />
      </mesh>

      {/* Connection lines */}
      {linePairs.map(([a, b], i) => {
        const pts = new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z]);
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[pts, 3]} count={2} />
            </bufferGeometry>
            <lineBasicMaterial color="#7dd3fc" transparent opacity={0.35} />
          </line>
        );
      })}

      {/* Node orbs */}
      {nodePositions.map((p, i) => (
        <Float key={i} speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh position={p}>
            <sphereGeometry args={[0.11, 24, 24]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#a78bfa" : "#67e8f9"}
              emissive={i % 2 === 0 ? "#7c3aed" : "#06b6d4"}
              emissiveIntensity={1.4}
              toneMapped={false}
            />
          </mesh>
          <mesh position={p}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial
              color={i % 2 === 0 ? "#a78bfa" : "#67e8f9"}
              transparent
              opacity={0.18}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(1500 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (Math.random() - 0.5) * 14;
    return arr;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.02;
  });
  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial transparent color="#c4b5fd" size={0.018} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

export default function CareerSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-5, -3, 4]} intensity={1} color="#22d3ee" />
        <NodesAndLines />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          rotateSpeed={0.4}
        />
      </Suspense>
    </Canvas>
  );
}
