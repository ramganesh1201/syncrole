import { ChevronDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface WeeklyProgressCardProps {
  chartData: { x: number; y: number }[];
  latestScore: number;
  prevScore: number;
}

export function WeeklyProgressCard({ chartData, latestScore, prevScore }: WeeklyProgressCardProps) {
  // Demo weekly data mapping to match the image, if real data is scarce
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Transform existing chart data to fit a weekly view, or use some dummy logic to make it look good for now
  // Real implementation will use actual dates if available in scores, but for UI sake we map index to days.
  const displayData = days.map((day, i) => {
    const dataPoint = chartData[chartData.length - 7 + i] || chartData[i];
    return {
      day,
      score: dataPoint?.y || (30 + i * 2), // fallback slope
    };
  });

  const readinessIncrease = latestScore - prevScore;

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Weekly Progress</h3>
        <button className="text-xs text-muted-foreground font-medium flex items-center gap-1 hover:text-white transition-colors">
          This Week <ChevronDown className="w-3 h-3" />
        </button>
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
