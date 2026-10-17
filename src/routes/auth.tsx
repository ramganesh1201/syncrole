import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User as UserIcon, Loader2, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useAuth } from "@/hooks/use-auth";
import { AuthVisuals } from "@/components/auth/AuthVisuals";

type AuthMode = "signin" | "signup" | "forgot";

interface AuthSearchParams {
  mode?: AuthMode;
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): AuthSearchParams => {
    const mode = search.mode;
    if (mode === "signup" || mode === "forgot" || mode === "signin") {
      return { mode };
    }
    return { mode: "signin" };
  },
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — SyncRole" }] }),
});

function AuthPage() {
  const nav = useNavigate();
  const search = Route.useSearch();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<AuthMode>(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (search.mode && (search.mode === "signin" || search.mode === "signup" || search.mode === "forgot")) {
      setMode(search.mode);
    }
  }, [search.mode]);

  useEffect(() => {
    if (!loading && user) {
      nav({ to: "/dashboard", replace: true });
    }
  }, [user, loading, nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    
    setBusy(true);
    try {
      if (mode === "signup") {
        if (!password || password.length < 8) {
          throw new Error("Password must be at least 8 characters long.");
        }
        if (!name) {
          throw new Error("Please enter your full name.");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: name },
          },
        });

        if (error) throw error;
        toast.success("Account created! Redirecting…");
      } else if (mode === "signin") {
        if (!password) {
          throw new Error("Please enter your password.");
        }
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            throw new Error("Invalid email or password. If you originally signed up with Google, please use 'Continue with Google', or use 'Forgot Password' to set one.");
          }
          throw error;
        }
      } else if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/update-password`,
        });
        if (error) throw error;
        toast.success("Password reset link has been sent to your email. Please check your inbox (and spam folder).", {
          duration: 6000,
        });
        setMode("signin");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (err: any) {
      toast.error(err.message ?? "Google Sign-In failed.");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col relative overflow-hidden font-sans selection:bg-indigo-500/20 selection:text-slate-900">
      {/* Ambient background gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15), rgba(59, 130, 246, 0.08), transparent 70%)",
          }}
        />
        <div 
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      {/* Top Header / Navigation Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 py-3.5 md:px-6 md:py-6 flex items-center justify-between">
        <BrandLogo size="md" variant="dark" className="hidden sm:flex" />
        <BrandLogo size="sm" variant="dark" className="sm:hidden" />

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="text-slate-500 hidden sm:inline">
            {mode === "signin" ? "Not a member yet?" : mode === "signup" ? "Already registered?" : "Remembered your password?"}
          </span>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            disabled={busy}
            className="px-3.5 py-1.5 md:px-4 md:py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-blue-600 hover:text-blue-700 shadow-2xs transition active:scale-[0.98] cursor-pointer disabled:opacity-50"
          >
            {mode === "signin" ? "Create account" : "Sign in"}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 md:py-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Visual Story & Value Proposition (Desktop & Tablet) */}
          <div className="hidden lg:block lg:col-span-6 pr-2">
            <AuthVisuals mode={mode} />
          </div>

          {/* RIGHT COLUMN / MOBILE CENTER: Auth Form Surface */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            {/* Mobile Header Accent */}
            <div className="lg:hidden mb-6 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>SyncRole Career OS</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}
              </h1>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {mode === "signin" 
                  ? "Your career workspace is waiting for you."
                  : mode === "signup"
                  ? "Start your personalized career journey today."
                  : "We'll send you an instant reset link."}
              </p>
            </div>

            {/* Auth Form Card Surface */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/60 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="hidden lg:block mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {mode === "signin" ? "Sign In" : mode === "signup" ? "Create your account" : "Reset password"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {mode === "signin"
                        ? "Welcome back! Please enter your details to continue."
                        : mode === "signup"
                        ? "Start your personalized career journey"
                        : "Enter your registered email address below"}
                    </p>
                  </div>

                  {/* OAuth Section (Google) */}
                  {mode !== "forgot" && (
                    <>
                      <button
                        onClick={google}
                        disabled={busy}
                        type="button"
                        aria-label="Continue with Google"
                        className="w-full bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl py-3 px-4 text-xs font-semibold text-slate-700 inline-flex items-center justify-center gap-2.5 shadow-xs transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {busy ? (
                          <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                        ) : (
                          <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                        )}
                        Continue with Google
                      </button>

                      <div className="my-5 flex items-center gap-3 text-[11px] font-medium text-slate-400">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span>or email</span>
                        <div className="h-px flex-1 bg-slate-200" />
                      </div>
                    </>
                  )}

                  {/* Form inputs */}
                  <form onSubmit={submit} className="space-y-4">
                    {mode === "signup" && (
                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-700 block">Full name</label>
                        <Field 
                          icon={UserIcon} 
                          value={name} 
                          onChange={setName} 
                          placeholder="Enter your full name" 
                          disabled={busy}
                          autoComplete="name"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">Email address</label>
                      <Field
                        icon={Mail}
                        type="email"
                        value={email}
                        onChange={setEmail}
                        placeholder="Enter your email address"
                        disabled={busy}
                        autoComplete="email"
                      />
                    </div>

                    {mode !== "forgot" && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-semibold text-slate-700 block">Password</label>
                          {mode === "signin" && (
                            <button
                              type="button"
                              onClick={() => setMode("forgot")}
                              disabled={busy}
                              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700 transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>
                        <Field
                          icon={Lock}
                          type="password"
                          value={password}
                          onChange={setPassword}
                          placeholder={mode === "signup" ? "Create a password (8+ characters)" : "Enter your password"}
                          disabled={busy}
                          autoComplete={mode === "signin" ? "current-password" : "new-password"}
                        />
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={busy}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white font-semibold py-3 text-xs tracking-wide shadow-md shadow-indigo-500/20 transition active:scale-[0.99] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                      >
                        {busy ? (
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                        ) : (
                          <>
                            <span>
                              {mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Bottom switcher link */}
                  <div className="mt-6 text-center text-xs text-slate-500">
                    {mode === "forgot" ? (
                      <button
                        onClick={() => setMode("signin")}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold hover:underline transition disabled:opacity-50 cursor-pointer"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
                      </button>
                    ) : (
                      <div>
                        {mode === "signin" ? "New to SyncRole?" : "Already have an account?"}{" "}
                        <button
                          type="button"
                          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                          disabled={busy}
                          className="text-indigo-600 font-bold hover:underline ml-1 cursor-pointer disabled:opacity-50"
                        >
                          {mode === "signin" ? "Create account" : "Sign in"}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 py-4 text-center text-[11px] text-slate-400">
        © {new Date().getFullYear()} SyncRole Career OS. All rights reserved.
      </footer>
    </div>
  );
}

function Field({
  icon: Icon,
  disabled,
  autoComplete,
  ...p
}: {
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  disabled?: boolean;
  autoComplete?: string;
}) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = p.type === "password";
  const inputType = isPassword ? (showPwd ? "text" : "password") : (p.type ?? "text");

  return (
    <div className="relative group flex items-center">
      <Icon className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400 z-10 transition-colors group-focus-within:text-indigo-600" />
      <input
        type={inputType}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        placeholder={p.placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`w-full bg-slate-50/80 border border-slate-200 rounded-xl py-2.5 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-50 transition-all ${isPassword ? 'pr-10' : 'pr-3'}`}
        aria-label={p.placeholder}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          disabled={disabled}
          className="absolute right-3.5 h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none disabled:opacity-50 cursor-pointer"
          aria-label={showPwd ? "Hide password" : "Show password"}
        >
          {showPwd ? <EyeOff className="h-full w-full" /> : <Eye className="h-full w-full" />}
        </button>
      )}
    </div>
  );
}
