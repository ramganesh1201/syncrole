import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, User as UserIcon, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AuroraBackground from "@/components/AuroraBackground";
import { BrandLogo } from "@/components/ui/brand-logo";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/dashboard" });
  },
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — SyncRole" }] }),
});

type AuthMode = "signin" | "signup" | "forgot";

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (session && event !== "PASSWORD_RECOVERY") {
        nav({ to: "/dashboard" });
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

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
    <main className="relative min-h-screen grid place-items-center px-4 py-16">
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <BrandLogo size="lg" />
        </div>

        <div className="relative rounded-3xl p-px">
          <div className="absolute inset-0 rounded-3xl bg-aurora opacity-50 blur" />
          <div className="relative rounded-[23px] glass-strong p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="font-display text-2xl font-bold">
                  {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mode === "signin"
                    ? "Sign in to your Career OS"
                    : mode === "signup"
                    ? "Start your placement journey in 30 seconds"
                    : "Enter your email to receive a reset link"}
                </p>

                {mode !== "forgot" && (
                  <>
                    <button
                      onClick={google}
                      disabled={busy}
                      aria-label="Continue with Google"
                      className="mt-6 w-full glass rounded-full py-3 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {busy ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fill="#fff"
                            d="M21.35 11.1h-9.17v2.97h5.27c-.23 1.45-1.7 4.25-5.27 4.25-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.71 1.43l2.53-2.44C16.86 3.97 14.7 3 12.18 3 7.07 3 2.94 7.13 2.94 12.25S7.07 21.5 12.18 21.5c7 0 9.32-4.92 9.32-7.45 0-.5-.05-.88-.15-1.95z"
                          />
                        </svg>
                      )}
                      Continue with Google
                    </button>

                    <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="h-px flex-1 bg-white/10" /> or email{" "}
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                  </>
                )}

                <form onSubmit={submit} className={`space-y-4 ${mode === "forgot" ? "mt-6" : ""}`}>
                  {mode === "signup" && (
                    <Field 
                      icon={UserIcon} 
                      value={name} 
                      onChange={setName} 
                      placeholder="Full name" 
                      disabled={busy}
                      autoComplete="name"
                    />
                  )}
                  <Field
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="you@college.edu"
                    disabled={busy}
                    autoComplete="email"
                  />
                  {mode !== "forgot" && (
                    <div className="space-y-1">
                      <Field
                        icon={Lock}
                        type="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="Password (8+ chars)"
                        disabled={busy}
                        autoComplete={mode === "signin" ? "current-password" : "new-password"}
                      />
                      {mode === "signin" && (
                        <div className="flex justify-end px-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setMode("forgot")}
                            disabled={busy}
                            className="text-xs text-muted-foreground hover:text-accent transition-colors disabled:opacity-50"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <button
                      disabled={busy}
                      className="relative w-full rounded-full py-3 text-sm font-semibold text-primary-foreground overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 bg-aurora" />
                      <span className="relative inline-flex items-center justify-center gap-2">
                        {busy ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            {mode === "signin" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}{" "}
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  {mode === "forgot" ? (
                    <button
                      onClick={() => setMode("signin")}
                      disabled={busy}
                      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-white transition disabled:opacity-50"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
                    </button>
                  ) : (
                    <>
                      {mode === "signin" ? "New to SyncRole?" : "Already have an account?"}{" "}
                      <button
                        type="button"
                        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                        disabled={busy}
                        className="text-accent hover:underline disabled:opacity-50"
                      >
                        {mode === "signin" ? "Create one" : "Sign in"}
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </main>
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
      <Icon className="pointer-events-none absolute left-4 h-[18px] w-[18px] text-muted-foreground transition-colors group-focus-within:text-accent" />
      <input
        type={inputType}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        placeholder={p.placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`w-full glass rounded-full py-3 pl-12 text-sm outline-none focus:ring-2 ring-accent/50 disabled:opacity-50 transition-all ${isPassword ? 'pr-12' : 'pr-4'}`}
        aria-label={p.placeholder}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          disabled={disabled}
          className="absolute right-4 h-[18px] w-[18px] text-muted-foreground hover:text-white transition-colors focus:outline-none disabled:opacity-50"
          aria-label={showPwd ? "Hide password" : "Show password"}
        >
          {showPwd ? <EyeOff className="h-full w-full" /> : <Eye className="h-full w-full" />}
        </button>
      )}
    </div>
  );
}
