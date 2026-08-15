import React, { useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "lucide-react";

export interface HeatmapDayData {
  dateKey: string; // YYYY-MM-DD
  dateObj: Date;
  activeSeconds: number;
  runCount: number;
  submissionCount: number;
  solvedCount: number;
  intensityScore: number;
}

interface ConsistencyHeatmapProps {
  days: HeatmapDayData[];
  loading?: boolean;
}

function formatDisplayDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getIntensityLevel(score: number): number {
  if (score <= 0) return 0;
  if (score <= 2) return 1;
  if (score <= 5) return 2;
  if (score <= 9) return 3;
  return 4;
}

const levelColors = [
  "bg-white/[0.04] border-white/[0.06]", // Level 0: dark empty cell
  "bg-aurora/25 border-aurora/35", // Level 1: low
  "bg-aurora/50 border-aurora/65", // Level 2: moderate
  "bg-aurora/80 border-aurora/90 shadow-[0_0_8px_rgba(168,85,247,0.4)]", // Level 3: strong
  "bg-aurora border-white/30 shadow-[0_0_12px_rgba(168,85,247,0.7)]", // Level 4: high
];

export const ConsistencyHeatmap: React.FC<ConsistencyHeatmapProps> = ({
  days,
  loading = false,
}) => {
  const todayKey = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, []);

  // Map dateKey -> data
  const dataMap = useMemo(() => {
    const map = new Map<string, HeatmapDayData>();
    days.forEach((d) => map.set(d.dateKey, d));
    return map;
  }, [days]);

  // Construct 90 days array ending today
  const gridDays = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const list: Array<{
      dateKey: string;
      dateObj: Date;
      data: HeatmapDayData | null;
      dayOfWeek: number; // 0 = Mon, 6 = Sun
      monthName: string;
      isToday: boolean;
    }> = [];

    for (let i = 89; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);

      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const date = String(d.getDate()).padStart(2, "0");
      const dateKey = `${year}-${month}-${date}`;

      // Convert JS Sunday=0 to Monday=0
      const jsDay = d.getDay();
      const dayOfWeek = jsDay === 0 ? 6 : jsDay - 1;

      const monthName = d.toLocaleDateString("en-US", { month: "short" });

      list.push({
        dateKey,
        dateObj: d,
        data: dataMap.get(dateKey) ?? null,
        dayOfWeek,
        monthName,
        isToday: dateKey === todayKey,
      });
    }

    return list;
  }, [dataMap, todayKey]);

  // Arrange into 7 rows (Mon-Sun) across 13-14 week columns
  const { weeks, monthHeaders } = useMemo(() => {
    const cols: Array<Array<(typeof gridDays)[0] | null>> = [];
    let currentCol: Array<(typeof gridDays)[0] | null> = new Array(7).fill(null);

    gridDays.forEach((item) => {
      currentCol[item.dayOfWeek] = item;

      // If Sunday (end of week)
      if (item.dayOfWeek === 6) {
        cols.push(currentCol);
        currentCol = new Array(7).fill(null);
      }
    });

    // Push last partial week if needed
    if (currentCol.some((x) => x !== null)) {
      cols.push(currentCol);
    }

    // Month headers above columns
    const headers: Array<{ colIndex: number; label: string }> = [];
    let lastMonth = "";

    cols.forEach((col, cIdx) => {
      const firstValid = col.find((x) => x !== null);
      if (firstValid && firstValid.monthName !== lastMonth) {
        headers.push({ colIndex: cIdx, label: firstValid.monthName });
        lastMonth = firstValid.monthName;
      }
    });

    return { weeks: cols, monthHeaders: headers };
  }, [gridDays]);

  if (loading) {
    return (
      <div className="h-44 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full border-2 border-aurora border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Month Headers */}
      <div className="flex items-center text-[10px] font-mono text-muted-foreground pl-7">
        <div className="flex-1 flex justify-between pr-2">
          {monthHeaders.map((m) => (
            <span key={`${m.colIndex}-${m.label}`} className="text-white/60 font-medium">
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Grid with Weekday Labels */}
      <div className="flex items-start gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {/* Weekday labels */}
        <div className="grid grid-rows-7 gap-[3px] text-[9px] font-mono text-muted-foreground/70 pt-0.5 select-none shrink-0">
          <span className="h-3.5 leading-3.5">Mon</span>
          <span className="h-3.5 leading-3.5 opacity-0">Tue</span>
          <span className="h-3.5 leading-3.5">Wed</span>
          <span className="h-3.5 leading-3.5 opacity-0">Thu</span>
          <span className="h-3.5 leading-3.5">Fri</span>
          <span className="h-3.5 leading-3.5 opacity-0">Sat</span>
          <span className="h-3.5 leading-3.5 opacity-0">Sun</span>
        </div>

        {/* 13 Week Columns */}
        <TooltipProvider delayDuration={100}>
          <div className="flex gap-[3px] shrink-0">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="grid grid-rows-7 gap-[3px]">
                {week.map((cell, rIdx) => {
                  if (!cell) {
                    return (
                      <div
                        key={`empty-${wIdx}-${rIdx}`}
                        className="h-3.5 w-3.5 rounded-[3px] bg-transparent"
                      />
                    );
                  }

                  const data = cell.data;
                  const score = data?.intensityScore ?? 0;
                  const lvl = getIntensityLevel(score);
                  const activeMins = Math.round((data?.activeSeconds ?? 0) / 60);
                  const solves = data?.solvedCount ?? 0;
                  const runs = data?.runCount ?? 0;
                  const subs = data?.submissionCount ?? 0;

                  return (
                    <Tooltip key={cell.dateKey}>
                      <TooltipTrigger asChild>
                        <div
                          className={`h-3.5 w-3.5 rounded-[3px] border transition-all cursor-pointer hover:scale-125 hover:z-10 ${
                            levelColors[lvl]
                          } ${
                            cell.isToday
                              ? "ring-1 ring-aurora ring-offset-1 ring-offset-black"
                              : ""
                          }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-black/90 border border-white/10 text-xs p-2.5 rounded-xl shadow-xl backdrop-blur-md max-w-xs"
                      >
                        <div className="font-semibold text-white">
                          {formatDisplayDate(cell.dateObj)}
                          {cell.isToday && (
                            <span className="ml-1.5 text-[10px] text-aurora bg-aurora/10 px-1.5 py-0.5 rounded border border-aurora/20">
                              Today
                            </span>
                          )}
                        </div>

                        {score === 0 ? (
                          <div className="text-muted-foreground text-[11px] mt-1">
                            No practice activity
                          </div>
                        ) : (
                          <div className="space-y-1 mt-1.5 text-[11px] font-mono">
                            {activeMins > 0 && (
                              <div className="text-aurora flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-aurora" />
                                {activeMins}m active practice
                              </div>
                            )}
                            {solves > 0 && (
                              <div className="text-neon flex items-center gap-1.5 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                                {solves} verified solve{solves > 1 ? "s" : ""}
                              </div>
                            )}
                            {runs > 0 && (
                              <div className="text-accent flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                {runs} code run{runs > 1 ? "s" : ""}
                              </div>
                            )}
                            {subs > 0 && (
                              <div className="text-white/70 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                                {subs} submission{subs > 1 ? "s" : ""}
                              </div>
                            )}
                          </div>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-white/5 font-mono">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-aurora" />
          <span>90-Day Calendar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {levelColors.map((col, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-[2px] border ${col}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
