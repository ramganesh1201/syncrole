import { lazy, Suspense, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SyncPilotButton } from "./SyncPilotButton";
import { SyncPilotLoading } from "./SyncPilotLoading";
import { useSyncPilot, SyncPilotMode, SyncPilotProvider } from "@/hooks/useSyncPilot";
import { useAuth } from "@/hooks/use-auth";
import { GuestDemoMode } from "./GuestDemoMode";

// Lazy-load heavy mode components
const CareerTwinMode = lazy(() => import("./CareerTwinMode").then(m => ({ default: m.CareerTwinMode })));
const RecruiterMode  = lazy(() => import("./RecruiterMode").then(m => ({ default: m.RecruiterMode })));
const InterviewMode  = lazy(() => import("./InterviewMode").then(m => ({ default: m.InterviewMode })));

type PanelState = "closed" | "booting" | "open";

// Panel dimensions per mode
const PANEL_DIMS: Record<SyncPilotMode, { width: string; height: string; bottom: string; right: string }> = {
  career_twin: { width: "470px",  height: "min(720px, calc(100vh - 120px))", bottom: "104px", right: "2rem" },
  recruiter:   { width: "min(72vw, 900px)", height: "min(700px, calc(100vh - 120px))", bottom: "104px", right: "2rem" },
  interview:   { width: "min(90vw, 1100px)", height: "min(800px, calc(100vh - 40px))", bottom: "50%", right: "50%" },
};

function LoadingFallback() {
  return (
    <div className="h-full flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-cyan-400" />
    </div>
  );
}

function SyncPilotLauncherInner() {
  const {
    panelState,
    setPanelState,
    openSyncPilot,
    closeSyncPilot,
    mode,
    switchMode,
    userData,
    loadConversations,
    loadConversation,
    conversationId,
  } = useSyncPilot();
  const { user } = useAuth();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOpen = () => {
    openSyncPilot();
  };

  const handleClose = () => {
    closeSyncPilot();
  };

  const handleSwitchMode = (newMode: SyncPilotMode) => {
    switchMode(newMode);
    if (newMode === "interview") {
      setPanelState("booting");
      setTimeout(() => setPanelState("open"), 800);
    }
  };

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && panelState === "open") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [panelState]);

  const dims = PANEL_DIMS[(mode as SyncPilotMode) || "career_twin"] || PANEL_DIMS.career_twin;
  const isInterview = mode === "interview";

  const panelContent = (
    <>
      {/* ── Side Panel (Career Twin / Recruiter) ── */}
      <AnimatePresence>
        {panelState !== "closed" && !isInterview && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-xs md:bg-transparent"
              onClick={handleClose}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.94 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed z-[9999] glass-strong rounded-3xl overflow-hidden border border-white/12 shadow-2xl"
              style={
                isMobile
                  ? {
                      bottom: "76px",
                      left: "0.5rem",
                      right: "0.5rem",
                      width: "calc(100vw - 1rem)",
                      height: "calc(100dvh - 86px)",
                      boxShadow: "0 0 60px -15px oklch(0.75 0.2 200 / 40%), 0 30px 80px -20px black",
                    }
                  : {
                      width: dims.width,
                      height: dims.height,
                      bottom: dims.bottom,
                      right: dims.right,
                      boxShadow:
                        mode === "recruiter"
                          ? "0 0 80px -20px oklch(0.72 0.22 295 / 50%), 0 40px 100px -20px black"
                          : "0 0 60px -15px oklch(0.75 0.2 200 / 40%), 0 30px 80px -20px black",
                    }
              }
            >
              {panelState === "booting" ? (
                <SyncPilotLoading userName={userData?.profile?.full_name ?? undefined} />
              ) : (
                <Suspense fallback={<LoadingFallback />}>
                  {!user ? (
                    <GuestDemoMode onClose={handleClose} />
                  ) : (
                    (() => {
                      switch (mode) {
                        case "career_twin":
                          return <CareerTwinMode onClose={handleClose} onSwitchMode={handleSwitchMode} />;
                        case "recruiter":
                          return <RecruiterMode onClose={handleClose} onSwitchMode={handleSwitchMode} />;
                        default:
                          return null;
                      }
                    })()
                  )}
                </Suspense>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Overlay (Interview Mode) ── */}
      <AnimatePresence>
        {panelState !== "closed" && isInterview && user && (
          <motion.div
            key="interview-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 w-[100vw] h-[100vh] z-[99999] bg-black/90 backdrop-blur-md overflow-hidden flex flex-col"
            style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 99999 }}
          >
            {panelState === "booting" ? (
              <div className="flex-1 flex items-center justify-center">
                <SyncPilotLoading userName={userData?.profile?.full_name ?? undefined} />
              </div>
            ) : (
              <Suspense fallback={<LoadingFallback />}>
                <InterviewMode onClose={handleClose} onSwitchMode={handleSwitchMode} />
              </Suspense>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* FAB - only visible on desktop (>=768px) when panel is closed */}
      <AnimatePresence>
        {panelState === "closed" && (
          <motion.div
            key="fab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[9998] bottom-[2rem] right-[2rem] hidden md:block"
          >
            <SyncPilotButton onClick={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Panel inside Portal to escape parent stacking contexts */}
      {typeof document !== "undefined" && createPortal(panelContent, document.body)}
    </>
  );
}

export function SyncPilotLauncher() {
  return <SyncPilotLauncherInner />;
}