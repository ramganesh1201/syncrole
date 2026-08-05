import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function DashboardFooterCTA() {
  return (
    <div className="sticky bottom-6 z-40 mx-auto max-w-7xl mt-8">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-indigo-500/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white mb-0.5">Pro Tip from AI Coach</div>
            <div className="text-sm text-muted-foreground">
              Solving just 2 more DSA problems daily can increase your Google readiness by 1.8% this week.
            </div>
          </div>
        </div>
        <Link
          to="/dashboard/dsa"
          className="shrink-0 w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-2.5 px-6 font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
        >
          Start DSA Practice <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
