import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, KeyRound, CheckCircle2, XCircle, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AuroraBackground from "@/components/AuroraBackground";

export const Route = createFileRoute("/_authenticated/update-password")({
  component: UpdatePasswordPage,
});

function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // If the user navigates here without a valid session, redirect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: any } }) => {
      if (!session) {
        toast.error("Invalid or expired session. Please log in again.");
        router.navigate({ to: "/auth" });
      }
    });
  }, [router]);

  const reqLength = password.length >= 8;
  const reqUpper = /[A-Z]/.test(password);
  const reqLower = /[a-z]/.test(password);
  const reqNumber = /[0-9]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;
  const allValid = reqLength && reqUpper && reqLower && reqNumber && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) {
      toast.error("Please ensure all password requirements are met.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      setSuccess(true);
      toast.success("Password updated successfully!");
      
      setTimeout(() => {
        router.navigate({ to: "/auth" });
      }, 3000);
    } catch (error: any) {
      toast.error(error.message || "Failed to update password. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="relative min-h-screen grid place-items-center px-4">
        <AuroraBackground />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-8 rounded-3xl border border-aurora/20 text-center space-y-6 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </motion.div>
          <div className="space-y-2 relative z-10">
            <h2 className="text-2xl font-display font-bold text-white">Password Updated!</h2>
            <p className="text-sm text-muted-foreground">
              Your password has been set successfully. You can now log in to your account.
            </p>
          </div>
          <p className="text-sm text-aurora animate-pulse mt-4">Redirecting to Login...</p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[80vh] flex items-center justify-center p-4">
      <AuroraBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-8 rounded-3xl border border-white/10 space-y-8 relative z-10"
      >
        <div className="space-y-3 relative z-10 text-center">
          <div className="w-14 h-14 bg-background/50 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6 text-aurora" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Set New Password</h1>
          <p className="text-muted-foreground text-sm">
            Please enter a strong password to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 bg-black/20 border-white/10 focus:border-aurora/50 transition-colors rounded-full h-12"
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-11 bg-black/20 border-white/10 focus:border-aurora/50 transition-colors rounded-full h-12"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <div className="bg-black/30 rounded-2xl p-4 space-y-2 text-xs">
            <p className="font-medium text-white/80 mb-3">Password requirements:</p>
            <RequirementItem met={reqLength} text="At least 8 characters long" />
            <RequirementItem met={reqUpper} text="Contains at least one uppercase letter" />
            <RequirementItem met={reqLower} text="Contains at least one lowercase letter" />
            <RequirementItem met={reqNumber} text="Contains at least one number" />
            <RequirementItem met={passwordsMatch} text="Passwords match" />
          </div>

          <Button 
            type="submit" 
            disabled={loading || !allValid}
            className="w-full bg-aurora hover:bg-aurora/90 text-background font-bold h-12 rounded-full group relative overflow-hidden disabled:opacity-50 transition-all"
          >
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Update Password <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
                </>
              )}
            </div>
          </Button>
        </form>
      </motion.div>
    </main>
  );
}

function RequirementItem({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <XCircle className="w-4 h-4 text-muted-foreground" />
      )}
      <span className={met ? "text-green-400/90" : "text-muted-foreground"}>{text}</span>
    </div>
  );
}
