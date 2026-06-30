import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Sparkles, KeyRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: import("@supabase/supabase-js").Session | null } }) => {
      if (!session) {
        toast.error("Invalid or expired session. Please log in again.");
        router.navigate({ to: "/auth" });
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      setSuccess(true);
      toast.success("Password updated successfully!");
      
      setTimeout(() => {
        router.navigate({ to: "/dashboard" });
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-8 rounded-2xl border border-aurora/20 text-center space-y-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-aurora/10 to-transparent pointer-events-none" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </motion.div>
          <div className="space-y-2 relative z-10">
            <h2 className="text-2xl font-bold text-white">Password Updated!</h2>
            <p className="text-muted-foreground">
              Your password has been set successfully. You can now log in using either Google or your email.
            </p>
          </div>
          <p className="text-sm text-aurora animate-pulse">Redirecting to Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-8 rounded-2xl border border-white/10 space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-40 h-40 bg-aurora/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 relative z-10 text-center">
          <div className="w-14 h-14 bg-background/50 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6 text-aurora" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white">Create New Password</h1>
          <p className="text-muted-foreground text-sm">
            Set a password to enable email login for your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-black/20 border-white/10 focus:border-aurora/50 transition-colors"
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Type your password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 bg-black/20 border-white/10 focus:border-aurora/50 transition-colors"
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-aurora hover:bg-aurora/90 text-background font-bold py-6 group relative overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              {loading ? (
                "Saving Password..."
              ) : (
                <>
                  Save Password <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform" />
                </>
              )}
            </div>
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
