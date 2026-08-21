import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Lock, Monitor, Shield, Sparkles, Volume2, UserCog, Check, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loginMethod, setLoginMethod] = useState<"google" | "email" | "both">("email");
  const [resettingPassword, setResettingPassword] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        const providers = data.user.app_metadata?.providers || [];
        const hasGoogle = providers.includes("google");
        const hasEmail = providers.includes("email");
        if (hasGoogle && hasEmail) setLoginMethod("both");
        else if (hasGoogle) setLoginMethod("google");
        else setLoginMethod("email");
      }
    }
    loadUser();
  }, []);

  const handleCreatePassword = async () => {
    if (!user?.email) return;
    setResettingPassword(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) throw error;
      toast.success("Password setup email sent. Check your inbox to create a password.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send password setup email");
    } finally {
      setResettingPassword(false);
    }
  };

  // Mock states for UI demonstration. In production, these would connect to Supabase/localStorage.
  const [settings, setSettings] = useState({
    theme: "dark",
    emailNotifs: true,
    pushNotifs: true,
    soundEffects: true,
    syncPilotProactive: true,
    profilePublic: false,
    twoFactor: false,
  });

  const handleToggle = (key: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved successfully!");
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 space-y-10 pb-36">
      
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
          <UserCog className="w-8 h-8 text-indigo-400" /> Settings
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Manage your account preferences, configure SyncPilot behaviors, and control your security settings.
        </p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        {/* Responsive Tab List */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="glass border border-white/10 bg-slate-950/50 p-1.5 w-max min-w-full justify-start rounded-xl gap-1">
            <TabsTrigger value="appearance" className="rounded-lg py-2 px-4 data-[state=active]:bg-white/10 data-[state=active]:text-indigo-400 transition-colors">
              <Monitor className="w-4 h-4 mr-2" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg py-2 px-4 data-[state=active]:bg-white/10 data-[state=active]:text-indigo-400 transition-colors">
              <Bell className="w-4 h-4 mr-2" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="syncpilot" className="rounded-lg py-2 px-4 data-[state=active]:bg-white/10 data-[state=active]:text-indigo-400 transition-colors">
              <Sparkles className="w-4 h-4 mr-2" /> SyncPilot
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-lg py-2 px-4 data-[state=active]:bg-white/10 data-[state=active]:text-indigo-400 transition-colors">
              <Shield className="w-4 h-4 mr-2" /> Privacy
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg py-2 px-4 data-[state=active]:bg-white/10 data-[state=active]:text-indigo-400 transition-colors">
              <Lock className="w-4 h-4 mr-2" /> Security
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-8">
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            
            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6 outline-none focus-visible:ring-0 m-0">
              <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 space-y-8 bg-slate-900/60 shadow-lg">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-semibold text-lg text-white tracking-tight">Appearance</h3>
                  <p className="text-sm text-slate-500 mt-1">Customize the visual and auditory experience of SyncRole.</p>
                </div>
                
                <div className="flex flex-row items-center justify-between border-t border-white/5 pt-6 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <Volume2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200 text-sm">Sound Effects</p>
                      <p className="text-sm text-slate-500 mt-1">Play sounds when unlocking achievements</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.soundEffects} 
                    onCheckedChange={() => handleToggle("soundEffects")}
                    aria-label="Toggle Sound Effects"
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6 outline-none focus-visible:ring-0 m-0">
              <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 space-y-8 bg-slate-900/60 shadow-lg">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-semibold text-lg text-white tracking-tight">Notification Preferences</h3>
                  <p className="text-sm text-slate-500 mt-1">Control how you want to be notified about career updates.</p>
                </div>
                
                <div className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">Email Notifications</p>
                    <p className="text-sm text-slate-500 mt-1">Receive weekly reports and placement updates</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifs} 
                    onCheckedChange={() => handleToggle("emailNotifs")} 
                    aria-label="Toggle Email Notifications"
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between border-t border-white/5 pt-6 gap-4">
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">In-App Notifications</p>
                    <p className="text-sm text-slate-500 mt-1">Live alerts for DSA progress and XP</p>
                  </div>
                  <Switch 
                    checked={settings.pushNotifs} 
                    onCheckedChange={() => handleToggle("pushNotifs")} 
                    aria-label="Toggle In-App Notifications"
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>
              </div>
            </TabsContent>

            {/* SyncPilot Tab */}
            <TabsContent value="syncpilot" className="space-y-6 outline-none focus-visible:ring-0 m-0">
              <div className="glass rounded-2xl p-6 sm:p-8 border border-indigo-500/10 space-y-8 bg-slate-900/60 shadow-lg">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-semibold text-lg text-white tracking-tight">SyncPilot Preferences</h3>
                  <p className="text-sm text-slate-500 mt-1">Configure your personal AI career coach.</p>
                </div>
                
                <div className="flex flex-row items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-1 sm:mt-0">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-200 text-sm">Proactive Intelligence</p>
                      <p className="text-sm text-slate-500 mt-1">Allow SyncPilot to analyze your code and suggest improvements automatically</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings.syncPilotProactive} 
                    onCheckedChange={() => handleToggle("syncPilotProactive")} 
                    aria-label="Toggle SyncPilot Proactive Intelligence"
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6 outline-none focus-visible:ring-0 m-0">
              <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 space-y-8 bg-slate-900/60 shadow-lg">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-semibold text-lg text-white tracking-tight">Privacy & Visibility</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage who can see your profile and activity.</p>
                </div>
                
                <div className="flex flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">Public Profile</p>
                    <p className="text-sm text-slate-500 mt-1">Allow recruiters to discover your Career Identity</p>
                  </div>
                  <Switch 
                    checked={settings.profilePublic} 
                    onCheckedChange={() => handleToggle("profilePublic")} 
                    aria-label="Toggle Public Profile Visibility"
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6 outline-none focus-visible:ring-0 m-0">
              <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5 space-y-8 bg-slate-900/60 shadow-lg">
                <div className="border-b border-white/5 pb-4">
                  <h3 className="font-semibold text-lg text-white tracking-tight">Account Security</h3>
                  <p className="text-sm text-slate-500 mt-1">Manage your login methods and security protocols.</p>
                </div>
                
                <div className="space-y-3">
                  <p className="font-semibold text-slate-200 text-sm">Current Login Method</p>
                  <div className="flex items-center gap-3 p-4 bg-black/20 rounded-xl border border-white/5 text-slate-300">
                    {loginMethod === "google" && <span className="text-sm font-medium">Google Account</span>}
                    {loginMethod === "email" && <span className="text-sm font-medium">Email & Password</span>}
                    {loginMethod === "both" && <span className="text-sm font-medium">Google Account + Email & Password</span>}
                  </div>
                </div>

                {loginMethod === "google" && (
                  <div className="p-6 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                      <div className="space-y-2 max-w-md">
                        <h4 className="font-semibold text-indigo-300 flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Use Email & Password Login
                        </h4>
                        <p className="text-sm text-indigo-200/70 leading-relaxed">
                          You currently sign in exclusively with Google. Establish a password so you can also log in using your email address if you lose access to Google.
                        </p>
                      </div>
                      <Button 
                        onClick={handleCreatePassword} 
                        disabled={resettingPassword}
                        className="shrink-0 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all min-w-[150px]"
                        aria-label="Create a password for email login"
                      >
                        {resettingPassword ? (
                          <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Sending...</span>
                        ) : (
                          "Create Password"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {loginMethod === "both" && (
                  <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-emerald-500/20 shrink-0">
                      <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-400">Password configured</h4>
                      <p className="text-sm text-emerald-200/70 mt-1 leading-relaxed">
                        Your account supports both email/password login and any connected OAuth providers.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex flex-row items-center justify-between border-t border-white/5 pt-6 gap-4">
                  <div>
                    <p className="font-semibold text-slate-200 text-sm">Two-Factor Authentication</p>
                    <p className="text-sm text-slate-500 mt-1">Add an extra layer of security to your account</p>
                  </div>
                  <Switch 
                    checked={settings.twoFactor} 
                    onCheckedChange={() => handleToggle("twoFactor")} 
                    aria-label="Toggle Two-Factor Authentication"
                    className="data-[state=checked]:bg-indigo-500"
                  />
                </div>
              </div>
            </TabsContent>
          </motion.div>
        </div>
      </Tabs>

      {/* Floating Save Bar */}
      <motion.div 
        initial={{ y: 100 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-6 shadow-2xl z-50 w-[calc(100%-2rem)] sm:w-auto min-w-0 sm:min-w-[400px]"
      >
        <p className="text-sm font-semibold text-slate-400 hidden sm:block">Unsaved changes will be lost</p>
        <Button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold tracking-wide transition-all min-w-[140px] ml-auto sm:ml-0 shadow-lg shadow-indigo-500/20 disabled:opacity-70"
          aria-label={saving ? "Saving settings" : "Save settings"}
        >
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </span>
          ) : (
            "Save Settings"
          )}
        </Button>
      </motion.div>
    </div>
  );
}
