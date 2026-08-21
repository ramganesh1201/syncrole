import { motion } from "framer-motion";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

export type Chapter = {
  id: string;
  title: string;
  duration: number; // in milliseconds
};

export function DemoTimeline({
  chapters,
  currentChapterIndex,
  progress,
  isPlaying,
  onPlayPause,
  onSkip,
  onRestart,
  onJump,
}: {
  chapters: Chapter[];
  currentChapterIndex: number;
  progress: number; // 0 to 1
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkip: () => void;
  onRestart: () => void;
  onJump: (index: number) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-white/10 p-3 md:p-4 pb-safe">
      <div className="max-w-4xl mx-auto flex flex-col gap-2.5 md:gap-3">
        {/* Progress Bars */}
        <div className="flex gap-1 md:gap-2 h-1 md:h-1.5">
          {chapters.map((chapter, idx) => {
            let fill = 0;
            if (idx < currentChapterIndex) fill = 100;
            else if (idx === currentChapterIndex) fill = progress * 100;

            return (
              <button
                key={chapter.id}
                onClick={() => onJump(idx)}
                className="flex-1 relative bg-white/10 rounded-full overflow-hidden cursor-pointer hover:bg-white/20 transition-colors group"
                aria-label={`Jump to ${chapter.title}`}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-aurora rounded-full"
                  style={{ width: `${fill}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-[10px] px-2 py-1 rounded whitespace-nowrap border border-white/10 pointer-events-none">
                  {chapter.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="text-[11px] md:text-xs font-semibold text-white/90 truncate max-w-[160px] sm:max-w-none">
            {chapters[currentChapterIndex]?.title || "Demo"}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={onRestart}
              className="text-white/60 hover:text-white transition-colors p-2.5 rounded-full hover:bg-white/5 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Restart"
              aria-label="Restart demo"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={onPlayPause}
              className="flex h-9 w-9 md:h-8 md:w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95 min-h-[44px] min-w-[44px]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
            <button
              onClick={onSkip}
              className="text-white/60 hover:text-white transition-colors p-2.5 rounded-full hover:bg-white/5 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Skip forward"
              aria-label="Skip forward"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
