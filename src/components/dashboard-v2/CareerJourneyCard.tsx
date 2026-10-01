import { ArrowRight, Home, User, FileText, Sparkles, Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { UserCareerContext } from "@/lib/career-intelligence";

interface CareerJourneyCardProps {
  userContext: UserCareerContext;
}

export function CareerJourneyCard({ userContext }: CareerJourneyCardProps) {
  const currentScore = userContext.placementScore || 36;

  const steps = [
    { id: "current", label: "Current", icon: Home, score: currentScore, active: true },
    { id: "foundation", label: "Foundation", icon: User, score: 50, active: currentScore >= 50 },
    { id: "internship", label: "Internship", icon: FileText, score: 70, active: currentScore >= 70 },
    { id: "product", label: "Product Co.", icon: Sparkles, score: 90, active: currentScore >= 90 },
    { id: "dream", label: "Dream Offer", icon: Trophy, score: 100, active: currentScore >= 100 },
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs">
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 font-mono">Career Journey</h3>

        <div className="relative mb-8 mt-4">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

          {/* Steps */}
          <div className="flex justify-between relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.active && step.id === "current"
                      ? "bg-white border-blue-600 shadow-md text-blue-600"
                      : step.active
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-100 border-slate-300 text-slate-400"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-center">
                    <div className={`text-[11px] font-bold ${step.id === "current" ? "text-slate-900" : "text-slate-500"}`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{step.score}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mb-5 bg-slate-50 border border-slate-100 p-3 rounded-xl">
          <p className="text-xs font-bold text-slate-900">You are currently at Step 1 ({currentScore}% Readiness)</p>
          <p className="text-[11px] text-slate-500">Keep building skills to reach your target offer!</p>
        </div>
      </div>

      <Link to="/role-explorer" className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl py-2.5 text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-xs">
        <span>View Full Journey</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
