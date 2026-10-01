import { useState, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface WeeklyProgressCardProps {
  scores: any[];
  currentXp: number;
  currentStreak: number;
}

export function WeeklyProgressCard({ scores, currentXp, currentStreak }: WeeklyProgressCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeframe, setTimeframe] = useState("This Week");

  const timeframes = [
    { label: "This Week" },
    { label: "Last 7 Days" },
    { label: "This Month" },
    { label: "Last 30 Days" },
  ];

  const { displayData, readinessIncrease, tasksCompleted, hasData } = useMemo(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    
    let startDate = new Date(now);
    let daysArray: string[] = [];
    
    if (timeframe === "This Week") {
      const dayOfWeek = now.getDay();
      const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      startDate = new Date(now);
      startDate.setDate(now.getDate() - diffToMonday);
      startDate.setHours(0, 0, 0, 0);
      daysArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    } else if (timeframe === "Last 7 Days") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      daysArray = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return d.toLocaleDateString(undefined, { weekday: 'short' });
      });
    } else if (timeframe === "This Month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);
      const numDays = now.getDate();
      daysArray = Array.from({ length: numDays }, (_, i) => `${i + 1}`);
    } else if (timeframe === "Last 30 Days") {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 29);
      startDate.setHours(0, 0, 0, 0);
      daysArray = Array.from({ length: 30 }, (_, i) => {
        const d = new Date(startDate);
        d.setDate(startDate.getDate() + i);
        return `${d.getMonth() + 1}/${d.getDate()}`;
      });
    }

    const scoresInTimeframe = scores.filter(s => {
      const d = new Date(s.created_at);
      return d >= startDate && d <= now;
    });

    const hasData = scoresInTimeframe.length > 0;
    
    let readinessInc = 0;
    if (hasData) {
      const latestInTimeframe = scoresInTimeframe[0].total_score;
      const priorScore = scores.find(s => new Date(s.created_at) < startDate);
      const prevVal = priorScore ? priorScore.total_score : scoresInTimeframe[scoresInTimeframe.length - 1].total_score;
      readinessInc = latestInTimeframe - prevVal;
    }

    let lastKnownScore = 0;
    const priorScoreForChart = scores.find(s => new Date(s.created_at) < startDate);
    if (priorScoreForChart) {
      lastKnownScore = priorScoreForChart.total_score;
    } else if (scores.length > 0) {
      lastKnownScore = scores[scores.length - 1].total_score;
    }

    const chartData = daysArray.map((label, i) => {
      let bucketStart = new Date(startDate);
      bucketStart.setDate(startDate.getDate() + i);
      bucketStart.setHours(0, 0, 0, 0);
      
      let bucketEnd = new Date(bucketStart);
      bucketEnd.setHours(23, 59, 59, 999);

      const scoreInBucket = scores.find(s => {
        const d = new Date(s.created_at);
        return d >= bucketStart && d <= bucketEnd;
      });

      if (scoreInBucket) {
        lastKnownScore = scoreInBucket.total_score;
      }

      return {
        day: label,
        score: lastKnownScore > 0 ? lastKnownScore : null,
      };
    });

    return { 
      displayData: chartData, 
      readinessIncrease: readinessInc, 
      tasksCompleted: scoresInTimeframe.length, 
      hasData 
    };
  }, [timeframe, scores]);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs relative">
      <div className="flex items-center justify-between mb-4 relative z-30">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Readiness Progress</h3>
        
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-slate-700 font-semibold bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Select timeframe"
          >
            {timeframe} <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>
          
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 py-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf.label}
                    onClick={() => {
                      setTimeframe(tf.label);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                      timeframe === tf.label 
                        ? "text-blue-600 bg-blue-50 font-bold" 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {tf.label}
                    {timeframe === tf.label && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-slate-50 border border-slate-100 rounded-xl">
          <p className="text-xs font-semibold text-slate-700">No progress recorded for this period.</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Complete AI assessments to build your activity graph.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-3 mb-6 bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <div>
              <div className="text-lg font-bold text-emerald-700">
                {readinessIncrease > 0 ? "+" : ""}{readinessIncrease.toFixed(1)}%
              </div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">Readiness</div>
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">{tasksCompleted}</div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">Assessments</div>
            </div>
            <div>
              <div className="text-lg font-bold text-indigo-700">{currentXp}</div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">Total XP</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">{currentStreak}</div>
              <div className="text-[10px] text-slate-500 font-medium leading-tight">Streak</div>
            </div>
          </div>

          <div className="h-40 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#64748b" }} 
                  dy={8}
                  interval={timeframe === "Last 30 Days" || timeframe === "This Month" ? "preserveStartEnd" : 0}
                  minTickGap={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  tickFormatter={(value) => `${value}%`}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1", borderRadius: "8px", fontSize: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
                  itemStyle={{ color: "#2563eb", fontWeight: "bold" }}
                  formatter={(value: number) => [`${value}%`, "Readiness"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={2.5} 
                  connectNulls={true}
                  dot={{ r: 3.5, fill: "#2563eb", strokeWidth: 0 }}
                  activeDot={{ r: 5.5, fill: "#1d4ed8", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
