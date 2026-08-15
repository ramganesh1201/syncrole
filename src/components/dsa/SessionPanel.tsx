import React from "react";
import { cn } from "@/lib/utils";
import { Play, Send, Clock, CheckCircle2, Zap } from "lucide-react";

interface SessionPanelProps {
  activeSeconds: number;
  isIdle: boolean;
  runCount: number;
  submissionCount: number;
  isResumed: boolean;
  sessionId: string | null;
  status?: string | null;
  bestRuntimeMs?: number | null;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};

export const SessionPanel: React.FC<SessionPanelProps> = ({
  activeSeconds,
  isIdle,
  runCount,
  submissionCount,
  isResumed,
  sessionId,
  status,
  bestRuntimeMs,
}) => {
  if (!sessionId) return null;

  return (
    <div className="flex items-center gap-3 glass-strong rounded-full px-3.5 py-1 border border-white/10 text-xs shadow-lg backdrop-blur-md">
      {/* Active Time */}
      <div
        className="flex items-center gap-1.5 pr-2.5 border-r border-white/10"
        title={isIdle ? "Idle (paused active counter)" : "Active Practice Time"}
      >
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-500",
            isIdle
              ? "bg-gray-500"
              : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"
          )}
        />
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="font-mono font-medium text-white tracking-wide">
          {formatTime(activeSeconds)}
        </span>
      </div>

      {/* Runs & Submissions */}
      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-1 text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
          title="Run Code count"
        >
          <Play className="w-3 h-3 text-aurora" />
          <span className="text-white/80 font-medium">{runCount}</span>
        </div>
        <div
          className="flex items-center gap-1 text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/5"
          title="Submissions count"
        >
          <Send className="w-3 h-3 text-aurora" />
          <span className="text-white/80 font-medium">{submissionCount}</span>
        </div>
      </div>

      {/* Best Runtime if solved */}
      {bestRuntimeMs != null && (
        <div className="hidden sm:flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 text-[11px] font-mono">
          <Zap className="w-3 h-3" />
          <span>{bestRuntimeMs}ms</span>
        </div>
      )}

      {/* Resumed Badge */}
      {isResumed && (
        <div className="hidden md:block">
          <span className="px-2 py-0.5 rounded-full bg-aurora/10 text-aurora text-[10px] font-medium border border-aurora/20">
            Resumed Session
          </span>
        </div>
      )}
    </div>
  );
};
