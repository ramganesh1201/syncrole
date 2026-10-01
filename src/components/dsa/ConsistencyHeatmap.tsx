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
  "bg-slate-100 border-slate-200/70", // Level 0: light empty cell
  "bg-purple-100 border-purple-200", // Level 1: low
  "bg-purple-300 border-purple-400", // Level 2: moderate
  "bg-purple-500 border-purple-600 text-white shadow-xs", // Level 3: strong
  "bg-purple-700 border-purple-800 text-white shadow-sm", // Level 4: high
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
        <div className="h-6 w-6 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Month Headers */}
      <div className="flex items-center text-[10px] font-mono text-slate-500 pl-7">
        <div className="flex-1 flex justify-between pr-2">
          {monthHeaders.map((m) => (
            <span key={`${m.colIndex}-${m.label}`} className="text-slate-600 font-semibold">
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* Grid with Weekday Labels */}
      <div className="flex items-start gap-2 overflow-x-auto pb-1 custom-scrollbar">
        {/* Weekday labels */}
        <div className="grid grid-rows-7 gap-[3px] text-[9px] font-mono text-slate-400 font-semibold pt-0.5 select-none shrink-0">
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
                            solves > 0
                              ? "border-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.3)]"
                              : ""
                          } ${
                            cell.isToday
                              ? "ring-2 ring-purple-600 ring-offset-2 ring-offset-white"
                              : ""
                          }`}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-white/95 border border-slate-200 text-xs p-3 rounded-xl shadow-xl backdrop-blur-md max-w-xs text-slate-900"
                      >
                        <div className="font-semibold text-slate-900 flex items-center justify-between gap-2">
                          <span>{formatDisplayDate(cell.dateObj)}</span>
                          {cell.isToday && (
                            <span className="text-[10px] text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded border border-purple-200 font-bold">
                              Today
                            </span>
                          )}
                        </div>

                        {score === 0 ? (
                          <div className="text-slate-500 text-[11px] mt-1">
                            No practice activity
                          </div>
                        ) : (
                          <div className="space-y-1 mt-1.5 text-[11px] font-mono">
                            {activeMins > 0 && (
                              <div className="text-purple-700 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                {activeMins}m active practice
                              </div>
                            )}
                            {solves > 0 && (
                              <div className="text-emerald-700 flex items-center gap-1.5 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                {solves} verified solve{solves > 1 ? "s" : ""}
                              </div>
                            )}
                            {runs > 0 && (
                              <div className="text-amber-700 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                {runs} code run{runs > 1 ? "s" : ""}
                              </div>
                            )}
                            {subs > 0 && (
                              <div className="text-slate-600 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
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
      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100 font-mono font-medium">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-purple-600" />
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
