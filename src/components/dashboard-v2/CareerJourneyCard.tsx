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
    <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 flex flex-col justify-between h-full backdrop-blur-xl relative overflow-hidden">
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-8">Career Journey</h3>

        <div className="relative mb-12 mt-6">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

          {/* Steps */}
          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${step.active && step.id === "current"
                      ? "bg-slate-900 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      : step.active
                        ? "bg-indigo-500 border-indigo-500 text-white"
                        : "bg-slate-800 border-white/10 text-muted-foreground"
                    }`}>
                    <Icon className={`w-5 h-5 ${step.active && step.id === "current" ? "text-indigo-400" : ""}`} />
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-semibold ${step.id === "current" ? "text-white" : "text-muted-foreground"}`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{step.score}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-sm font-medium text-white mb-1">You are here</p>
          <p className="text-xs text-muted-foreground">Keep building to reach your dream offer!</p>
        </div>
      </div>

      <Link to="/role-explorer" className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
        View Full Journey
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
