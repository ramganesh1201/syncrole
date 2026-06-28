import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AuroraBackground from "@/components/AuroraBackground";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/dashboard" });
  },
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in — SyncRole" }] }),
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_: unknown, s: any) => {
      if (s) nav({ to: "/dashboard" });
    });
    return () => sub.subscription.unsubscribe();
  }, [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: name },
          },
        });

        console.log("SIGNUP DATA:", data);
        console.log("SIGNUP ERROR:", error);

        if (error) throw error;
        toast.success("Account created! Redirecting…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message ?? "Auth failed");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast.error(error.message);
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
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-lg bg-aurora animate-float" />
            <div className="absolute inset-[3px] rounded-md bg-background grid place-items-center">
              <Sparkles className="h-4 w-4 text-aurora" />
            </div>
          </div>
          <span className="font-display text-xl font-semibold">SyncRole</span>
        </Link>

        <div className="relative rounded-3xl p-px">
          <div className="absolute inset-0 rounded-3xl bg-aurora opacity-50 blur" />
          <div className="relative rounded-[23px] glass-strong p-8">
            <h1 className="font-display text-2xl font-bold">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signin"
                ? "Sign in to your Career OS"
                : "Start your placement journey in 30 seconds"}
            </p>

            <button
              onClick={google}
              disabled={busy}
              className="mt-6 w-full glass rounded-full py-3 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-white/10 transition disabled:opacity-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M21.35 11.1h-9.17v2.97h5.27c-.23 1.45-1.7 4.25-5.27 4.25-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.71 1.43l2.53-2.44C16.86 3.97 14.7 3 12.18 3 7.07 3 2.94 7.13 2.94 12.25S7.07 21.5 12.18 21.5c7 0 9.32-4.92 9.32-7.45 0-.5-.05-.88-.15-1.95z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-white/10" /> or email{" "}
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={submit} className="space-y-3">
              {mode === "signup" && (
                <Field icon={UserIcon} value={name} onChange={setName} placeholder="Full name" />
              )}
              <Field
                icon={Mail}
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@college.edu"
              />
              <Field
                icon={Lock}
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Password (8+ chars)"
              />
              <button
                disabled={busy}
                className="relative w-full rounded-full py-3 text-sm font-semibold text-primary-foreground overflow-hidden"
              >
                <span className="absolute inset-0 bg-aurora" />
                <span className="relative inline-flex items-center justify-center gap-2">
                  {busy ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {mode === "signin" ? "Sign In" : "Create Account"}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "New to SyncRole?" : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-accent hover:underline"
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

function Field({
  icon: Icon,
  ...p
}: {
  icon: React.ComponentType<{ className?: string }>;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type={p.type ?? "text"}
        value={p.value}
        onChange={(e) => p.onChange(e.target.value)}
        placeholder={p.placeholder}
        className="w-full glass rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ring-accent/50"
      />
    </div>
  );
}
