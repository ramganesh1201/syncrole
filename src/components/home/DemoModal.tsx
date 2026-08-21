import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { DemoTimeline, Chapter } from "./demo/DemoTimeline";
import { FakeAppWindow } from "./demo/FakeAppWindow";
import { SceneDashboard } from "./demo/SceneDashboard";
import { SceneCoach } from "./demo/SceneCoach";
import { SceneResume } from "./demo/SceneResume";
import { SceneGitHub } from "./demo/SceneGitHub";
import { SceneJourney } from "./demo/SceneJourney";
import { SceneRecruiter } from "./demo/SceneRecruiter";
import { SceneEnd } from "./demo/SceneEnd";

type DemoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const chapters: Chapter[] = [
  { id: "dashboard", title: "AI Dashboard", duration: 4000 },
  { id: "coach", title: "AI Coding Coach", duration: 6000 },
  { id: "resume", title: "Resume Analyzer", duration: 7000 },
  { id: "github", title: "GitHub Intelligence", duration: 6000 },
  { id: "journey", title: "Placement Journey", duration: 6000 },
  { id: "recruiter", title: "Recruiter View", duration: 5000 },
  { id: "end", title: "Get Started", duration: 0 }, // infinite
];

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Main animation loop
  useEffect(() => {
    if (!isOpen) {
      setCurrentChapterIndex(0);
      setProgress(0);
      setIsPlaying(true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const currentChapter = chapters[currentChapterIndex];
    
    // If it's the last chapter, just stop playback
    if (currentChapterIndex === chapters.length - 1) {
      setIsPlaying(false);
      setProgress(1);
      return;
    }

    if (!isPlaying) {
      lastTimeRef.current = performance.now();
      return;
    }

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setProgress((prev) => {
        const nextProgress = prev + dt / currentChapter.duration;
        if (nextProgress >= 1) {
          // Move to next chapter
          setTimeout(() => {
            setCurrentChapterIndex((i) => Math.min(chapters.length - 1, i + 1));
            setProgress(0);
            lastTimeRef.current = 0; // reset for next frame
          }, 0);
          return 1;
        }
        return nextProgress;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, isPlaying, currentChapterIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    lastTimeRef.current = 0;
  };

  const handleSkip = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      setProgress(0);
      lastTimeRef.current = 0;
    }
  };

  const handleRestart = () => {
    setCurrentChapterIndex(0);
    setProgress(0);
    setIsPlaying(true);
    lastTimeRef.current = 0;
  };

  const handleJump = (index: number) => {
    setCurrentChapterIndex(index);
    setProgress(0);
    setIsPlaying(true);
    lastTimeRef.current = 0;
  };

  if (!isOpen) return null;

  const isEnding = currentChapterIndex === chapters.length - 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
        {/* Background & Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-slate-950/90 backdrop-blur-3xl"
        />

        {/* Ambient Lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 50, -50, 0], 
              y: [0, -50, 50, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[150%] h-[150%] bg-aurora/10 blur-[120px] rounded-full mix-blend-screen"
          />
          <motion.div
            animate={{ 
              x: [0, -50, 50, 0], 
              y: [0, 50, -50, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -left-1/4 w-[150%] h-[150%] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen"
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 md:right-6 md:top-6 z-[110] rounded-full p-2.5 md:p-3 bg-[#0d1322]/90 md:bg-white/5 border border-white/15 text-white/90 transition-all hover:bg-white/10 hover:text-white active:scale-95 backdrop-blur-md min-h-[44px] min-w-[44px] flex items-center justify-center shadow-lg"
          aria-label="Close demo"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Main Content Area */}
        <div className="relative z-10 w-full px-2 sm:px-4 md:px-12 pt-3 pb-24 md:pt-8 md:pb-32 h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!isEnding ? (
              <FakeAppWindow key="app">
                <SceneDashboard isActive={currentChapterIndex === 0} />
                <SceneCoach isActive={currentChapterIndex === 1} />
                <SceneResume isActive={currentChapterIndex === 2} />
                <SceneGitHub isActive={currentChapterIndex === 3} />
                <SceneJourney isActive={currentChapterIndex === 4} />
                <SceneRecruiter isActive={currentChapterIndex === 5} />
              </FakeAppWindow>
            ) : (
              <SceneEnd key="end" isActive={true} onClose={onClose} />
            )}
          </AnimatePresence>
        </div>

        {/* Timeline (Hidden on End Screen) */}
        <AnimatePresence>
          {!isEnding && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 z-50"
            >
              <DemoTimeline
                chapters={chapters.slice(0, 6)}
                currentChapterIndex={currentChapterIndex}
                progress={progress}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onSkip={handleSkip}
                onRestart={handleRestart}
                onJump={handleJump}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
