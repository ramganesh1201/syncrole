import React from 'react';
import { cn } from "@/lib/utils";
import { Play, Send, Clock } from 'lucide-react';

interface SessionPanelProps {
  activeSeconds: number;
  isIdle: boolean;
  runCount: number;
  submissionCount: number;
  isResumed: boolean;
  sessionId: string | null;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const SessionPanel: React.FC<SessionPanelProps> = ({
  activeSeconds,
  isIdle,
  runCount,
  submissionCount,
  isResumed,
  sessionId
}) => {
  if (!sessionId) return null;

  return (
    <div className="flex items-center gap-3 glass-strong rounded-full px-4 py-1.5 border border-white/10 text-xs shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 pr-3 border-r border-white/10" title={isIdle ? "Idle" : "Active Practice Time"}>
        <div className={cn(
          "w-2 h-2 rounded-full transition-all duration-500", 
          isIdle ? "bg-gray-500" : "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
        )} />
        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="font-mono font-medium text-white tracking-wider w-[64px]">
          {formatTime(activeSeconds)}
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/5" title="Run Count">
          <Play className="w-3 h-3 text-aurora" />
          <span className="text-white/80 font-medium">{runCount}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full border border-white/5" title="Submission Count">
          <Send className="w-3 h-3 text-aurora" />
          <span className="text-white/80 font-medium">{submissionCount}</span>
        </div>
      </div>
      
      {isResumed && (
        <div className="ml-1 pl-3 border-l border-white/10">
          <span className="px-2 py-0.5 rounded-full bg-aurora/10 text-aurora text-[10px] font-medium border border-aurora/20">
            Resumed
          </span>
        </div>
      )}
    </div>
  );
};
