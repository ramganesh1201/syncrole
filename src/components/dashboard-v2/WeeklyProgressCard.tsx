import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface WeeklyProgressCardProps {
  chartData: { x: number; y: number }[];
  latestScore: number;
  prevScore: number;
}

export function WeeklyProgressCard({ chartData, latestScore, prevScore }: WeeklyProgressCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("This Week");

  const timeframes = [
    { label: "This Week", requiredDays: 1 },
    { label: "Last 7 Days", requiredDays: 7 },
    { label: "This Month", requiredDays: 30 },
    { label: "Last 30 Days", requiredDays: 30 },
  ];

  // Demo data logic adjusted based on timeframe
  let displayDays = 7;
  if (timeframe === "This Month" || timeframe === "Last 30 Days") displayDays = 30;

  const days = displayDays === 7 
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  
  // Transform existing chart data to fit the view
  // Real implementation will use actual dates if available in scores, but for UI sake we map index to days.
  const displayData = days.map((day, i) => {
    const dataPoint = chartData[chartData.length - displayDays + i] || chartData[i];
    return {
      day,
      score: dataPoint?.y || (30 + i * (displayDays === 30 ? 0.5 : 2)), // fallback slope
    };
  });

  const readinessIncrease = latestScore - prevScore;

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6 relative">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progress</h3>
        
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-muted-foreground font-medium flex items-center gap-1 hover:text-white transition-colors p-1"
          >
            {timeframe} <ChevronDown className="w-3 h-3" />
          </button>
          
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 py-1">
                {timeframes.map((tf) => {
                  const isDisabled = chartData.length > 0 && chartData.length < tf.requiredDays;
                  return (
                    <button
                      key={tf.label}
                      disabled={isDisabled}
                      onClick={() => {
                        setTimeframe(tf.label);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        isDisabled 
                          ? "text-muted-foreground/40 cursor-not-allowed" 
                          : timeframe === tf.label 
                            ? "text-white bg-white/5" 
                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                      }`}
                      title={isDisabled ? "Not enough historical data" : undefined}
                    >
                      {tf.label}
                      {timeframe === tf.label && <Check className="w-3 h-3 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div>
          <div className="text-xl font-bold text-emerald-400">+{readinessIncrease > 0 ? readinessIncrease.toFixed(1) : "5.4"}%</div>
          <div className="text-[10px] text-muted-foreground mt-1 leading-tight">Readiness Increase</div>
        </div>
        <div>
          <div className="text-xl font-bold text-white">12</div>
          <div className="text-[10px] text-muted-foreground mt-1 leading-tight">Tasks Completed</div>
        </div>
        <div>
          <div className="text-xl font-bold text-emerald-400">520</div>
          <div className="text-[10px] text-muted-foreground mt-1 leading-tight">XP Earned</div>
        </div>
        <div>
          <div className="text-xl font-bold text-emerald-400">6</div>
          <div className="text-[10px] text-muted-foreground mt-1 leading-tight">Day Streak</div>
        </div>
      </div>

      <div className="h-40 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={displayData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: "#94a3b8" }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }}
              itemStyle={{ color: "#a78bfa" }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8b5cf6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#a78bfa", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
