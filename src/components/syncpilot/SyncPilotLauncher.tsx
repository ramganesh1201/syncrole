import { lazy, Suspense, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SyncPilotButton } from "./SyncPilotButton";
import { useSyncPilot, SyncPilotMode } from "@/hooks/useSyncPilot";
import { useAuth } from "@/hooks/use-auth";
import { GuestDemoMode } from "./GuestDemoMode";

// Lazy-load mode components
const CareerTwinMode = lazy(() => import("./CareerTwinMode").then(m => ({ default: m.CareerTwinMode })));
const RecruiterMode  = lazy(() => import("./RecruiterMode").then(m => ({ default: m.RecruiterMode })));
const InterviewMode  = lazy(() => import("./InterviewMode").then(m => ({ default: m.InterviewMode })));

const PANEL_DIMS: Record<SyncPilotMode, { width: string; height: string; bottom: string; right: string }> = {
  career_twin: { width: "min(500px, 92vw)", height: "min(720px, calc(100vh - 100px))", bottom: "1.5rem", right: "1.5rem" },
  recruiter:   { width: "min(800px, 92vw)", height: "min(720px, calc(100vh - 100px))", bottom: "1.5rem", right: "1.5rem" },
  interview:   { width: "min(1000px, 94vw)", height: "min(800px, calc(100vh - 40px))", bottom: "50%", right: "50%" },
};

function LoadingFallback() {
  return (
    <div className="h-full flex items-center justify-center bg-white text-slate-500">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
    </div>
  );
}

function SyncPilotLauncherInner() {
  const {
    panelState,
    openSyncPilot,
    closeSyncPilot,
    mode,
    switchMode,
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

  // Lock body scroll on mobile only
  useEffect(() => {
    if (panelState !== "closed" && isMobile && typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    } else if (typeof window !== "undefined") {
      document.body.style.overflow = "";
    }
    return () => {
      if (typeof window !== "undefined") document.body.style.overflow = "";
    };
  }, [panelState, isMobile]);

  const dims = PANEL_DIMS[(mode as SyncPilotMode) || "career_twin"] || PANEL_DIMS.career_twin;
  const isInterview = mode === "interview";

  const panelContent = (
    <>
      {/* Side Panel (Career Twin / Recruiter) */}
      <AnimatePresence>
        {panelState !== "closed" && !isInterview && (
          <>
            {/* Subtle translucent backdrop NO BLUR so underlying page stays crisp */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9990] bg-slate-900/15 md:bg-transparent"
              onClick={handleClose}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed z-[9999] bg-white rounded-none md:rounded-3xl overflow-hidden border-0 md:border md:border-slate-200/90 shadow-2xl shadow-slate-900/15"
              style={
                isMobile
                  ? {
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: "100vw",
                      height: "100dvh",
                    }
                  : {
                      width: dims.width,
                      height: dims.height,
                      bottom: dims.bottom,
                      right: dims.right,
                    }
              }
            >
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
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Fullscreen Overlay (Interview Mode) */}
      <AnimatePresence>
        {panelState !== "closed" && isInterview && user && (
          <motion.div
            key="interview-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-[100vw] h-[100vh] z-[99999] bg-slate-900/90 backdrop-blur-sm overflow-hidden flex flex-col"
          >
            <Suspense fallback={<LoadingFallback />}>
              <InterviewMode onClose={handleClose} onSwitchMode={handleSwitchMode} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {/* FAB - visible when panel is closed */}
      <AnimatePresence>
        {panelState === "closed" && (
          <motion.div
            key="fab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[9998] bottom-[1.5rem] right-[1.5rem] block"
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