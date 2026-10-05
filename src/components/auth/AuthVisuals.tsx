import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  FileCheck, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ArrowUpRight,
  ShieldCheck,
  KeyRound,
  Zap
} from "lucide-react";

interface VisualProps {
  mode: "signin" | "signup" | "forgot";
}

export function AuthVisuals({ mode }: VisualProps) {
  if (mode === "signup") {
    return <SignUpVisual />;
  }
  if (mode === "forgot") {
    return <ForgotVisual />;
  }
  return <SignInVisual />;
}

function SignInVisual() {
  const competencies = [
    {
      name: "DSA & Problem Solving",
      score: 84,
      target: "142/170 Topics",
      icon: Code2,
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50 text-blue-600",
    },
    {
      name: "System Architecture",
      score: 72,
      target: "Scalable Systems",
      icon: Layers,
      color: "from-indigo-600 to-violet-600",
      bgColor: "bg-indigo-50 text-indigo-600",
    },
    {
      name: "Resume & ATS Optimization",
      score: 80,
      target: "Top Tech Match",
      icon: FileCheck,
      color: "from-violet-600 to-purple-600",
      bgColor: "bg-violet-50 text-violet-600",
    },
    {
      name: "Mock Interview Performance",
      score: 76,
      target: "SyncRole AI Twin",
      icon: Sparkles,
      color: "from-purple-600 to-pink-600",
      bgColor: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Header text for Left Column */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
          <Zap className="w-3.5 h-3.5 text-indigo-600" />
          <span>SyncRole Career OS</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Welcome back, <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            keep building your career.
          </span>
        </h1>
        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-md">
          Log in to access your personalized career workspace, track your skill growth, and prepare for top engineering roles.
        </p>
      </div>

      {/* Main Career Readiness UI Visualization Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4">
        {/* Card Title & Live Status */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              78%
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Career Readiness Score</h3>
              <p className="text-[11px] text-slate-500">Target Role: Senior Full-Stack Engineer</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Twin Active</span>
          </div>
        </div>

        {/* Competencies Progress Bars */}
        <div className="space-y-3">
          {competencies.map((c, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <div className={`p-1 rounded-md ${c.bgColor}`}>
                    <c.icon className="w-3.5 h-3.5" />
                  </div>
                  <span>{c.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">{c.target}</span>
                  <span className="font-bold text-slate-900">{c.score}%</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.score}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Milestone Footer Badge */}
        <div className="pt-2">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-[10px]">
                🎯
              </div>
              <div>
                <span className="font-semibold text-slate-800">Next Milestone: </span>
                <span className="text-slate-600">Reach 85% readiness for recruiter callback boost</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SignUpVisual() {
  const steps = [
    {
      title: "1. Skill Gap Assessment",
      desc: "Analyze your current readiness across DSA, Systems, and Projects.",
      status: "In Progress",
      active: true,
      icon: Compass,
    },
    {
      title: "2. Master Core Concepts",
      desc: "Structured practice roadmap tailored to target tech stacks.",
      status: "Next Up",
      active: false,
      icon: Code2,
    },
    {
      title: "3. Build Production Proof",
      desc: "Architect full-stack projects that stand out to engineering leaders.",
      status: "Upcoming",
      active: false,
      icon: Layers,
    },
    {
      title: "4. Recruiter Readiness",
      desc: "Mock interviews with SyncRole AI Twin and ATS resume optimization.",
      status: "Goal",
      active: false,
      icon: CheckCircle2,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Header text for Left Column */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>START YOUR JOURNEY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Start building your <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            career workspace today.
          </span>
        </h1>
        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-md">
          Get access to structured learning roadmaps, track your engineering readiness, and connect your progress to real opportunities.
        </p>
      </div>

      {/* Main Career Roadmap Pipeline Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">Career Growth Pipeline</h3>
          <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
            Personalized Path
          </span>
        </div>

        <div className="space-y-3.5 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[17px] top-3 bottom-3 w-0.5 bg-slate-200" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="relative flex items-start gap-3.5 group"
            >
              <div
                className={`relative z-10 h-9 w-9 rounded-xl flex items-center justify-center border transition-all ${
                  s.active
                    ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white border-transparent shadow-md shadow-indigo-500/20"
                    : "bg-white text-slate-500 border-slate-200 group-hover:border-slate-300"
                }`}
              >
                <s.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-bold ${s.active ? "text-slate-900" : "text-slate-700"}`}>
                    {s.title}
                  </h4>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      s.active
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ForgotVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
          <span>ACCOUNT SECURITY</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Recover access to your <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            SyncRole workspace.
          </span>
        </h1>
        <p className="mt-2.5 text-sm text-slate-600 leading-relaxed max-w-md">
          Don't worry — enter your account email address and we'll send you an instant reset link.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Secure Reset Process</h3>
            <p className="text-xs text-slate-500">Fast, encrypted password recovery</p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Check your inbox for the reset link</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Choose a new 8+ character password</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Return immediately to your active workspace</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
