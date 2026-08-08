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

    // Filter real scores for this timeframe
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

    // Determine initial score for the chart
    let lastKnownScore = 0;
    const priorScoreForChart = scores.find(s => new Date(s.created_at) < startDate);
    if (priorScoreForChart) {
      lastKnownScore = priorScoreForChart.total_score;
    } else if (scores.length > 0) {
      lastKnownScore = scores[scores.length - 1].total_score;
    }

    // Build chart data
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
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl relative">
      <div className="flex items-center justify-between mb-6 relative z-30">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Progress</h3>
        
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-muted-foreground font-medium flex items-center gap-1 hover:text-white transition-colors p-1"
            aria-label="Select timeframe"
          >
            {timeframe} <ChevronDown className="w-3 h-3" />
          </button>
          
          {isOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 bg-slate-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf.label}
                    onClick={() => {
                      setTimeframe(tf.label);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      timeframe === tf.label 
                        ? "text-white bg-white/5" 
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {tf.label}
                    {timeframe === tf.label && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {!hasData ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-slate-300">No progress recorded for this period.</p>
          <p className="text-xs text-slate-500 mt-1">Complete AI assessments to build your activity graph.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div>
              <div className="text-xl font-bold text-emerald-400">
                {readinessIncrease > 0 ? "+" : ""}{readinessIncrease.toFixed(1)}%
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">Readiness Increase</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">{tasksCompleted}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">Assessments Taken</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400">{currentXp}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">Total XP</div>
            </div>
            <div>
              <div className="text-xl font-bold text-emerald-400">{currentStreak}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-tight">Current Streak</div>
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
                  interval={timeframe === "Last 30 Days" || timeframe === "This Month" ? "preserveStartEnd" : 0}
                  minTickGap={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  tickFormatter={(value) => `${value}%`}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", borderRadius: "8px", fontSize: "12px" }}
                  itemStyle={{ color: "#a78bfa" }}
                  formatter={(value: number) => [`${value}%`, "Readiness"]}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  connectNulls={true}
                  dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#a78bfa", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
