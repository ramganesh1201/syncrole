import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function DashboardFooterCTA() {
  return (
    <div className="sticky bottom-6 z-40 mx-auto max-w-7xl mt-8">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 mb-0.5">Pro Tip from AI Coach</div>
            <div className="text-xs text-slate-600">
              Solving just 2 more DSA problems daily can increase your target readiness score by 1.8% this week.
            </div>
          </div>
        </div>
        <Link
          to="/dashboard/dsa"
          className="shrink-0 w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-2 px-5 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Start DSA Practice</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
