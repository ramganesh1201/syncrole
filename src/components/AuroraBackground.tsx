export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Calm, static top accent glow */}
      <div
        className="absolute -top-32 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.18 285 / 0.4), transparent 70%)",
        }}
      />
      {/* Grid line background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
    </div>
  );
}
