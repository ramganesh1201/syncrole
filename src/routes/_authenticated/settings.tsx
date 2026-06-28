import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Lock, Monitor, Shield, Sparkles, Volume2, UserCog, Check, Mail } from "lucide-react";
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
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-8 pb-32">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <UserCog className="w-8 h-8 text-aurora" /> Settings
        </h1>
        <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="glass border border-white/10 bg-background/50 p-1 mb-8 w-full justify-start overflow-x-auto rounded-xl">
          <TabsTrigger value="appearance" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora"><Monitor className="w-4 h-4 mr-2" /> Appearance</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora"><Bell className="w-4 h-4 mr-2" /> Notifications</TabsTrigger>
          <TabsTrigger value="syncpilot" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora"><Sparkles className="w-4 h-4 mr-2" /> SyncPilot</TabsTrigger>
          <TabsTrigger value="privacy" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora"><Shield className="w-4 h-4 mr-2" /> Privacy</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-aurora"><Lock className="w-4 h-4 mr-2" /> Security</TabsTrigger>
        </TabsList>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6 outline-none">
            <div className="glass rounded-xl p-6 border border-white/5 space-y-6">
              <h3 className="font-semibold text-lg border-b border-white/5 pb-4">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Theme</p>
                  <p className="text-sm text-muted-foreground">SyncRole is optimized for Dark Mode</p>
                </div>
                <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg border border-white/5">
                  <Button variant="ghost" size="sm" className={`rounded-md ${settings.theme === "light" ? "bg-white/10 text-white" : "text-muted-foreground"}`} onClick={() => setSettings(s => ({...s, theme: "light"}))}>Light</Button>
                  <Button variant="ghost" size="sm" className={`rounded-md ${settings.theme === "dark" ? "bg-white/10 text-white" : "text-muted-foreground"}`} onClick={() => setSettings(s => ({...s, theme: "dark"}))}>Dark</Button>
                  <Button variant="ghost" size="sm" className={`rounded-md ${settings.theme === "system" ? "bg-white/10 text-white" : "text-muted-foreground"}`} onClick={() => setSettings(s => ({...s, theme: "system"}))}>System</Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0">
                    <Volume2 className="w-5 h-5 text-aurora" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Sound Effects</p>
                    <p className="text-sm text-muted-foreground">Play sounds when unlocking achievements</p>
                  </div>
                </div>
                <Switch checked={settings.soundEffects} onCheckedChange={() => handleToggle("soundEffects")} />
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 outline-none">
            <div className="glass rounded-xl p-6 border border-white/5 space-y-6">
              <h3 className="font-semibold text-lg border-b border-white/5 pb-4">Notification Preferences</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive weekly reports and placement updates</p>
                </div>
                <Switch checked={settings.emailNotifs} onCheckedChange={() => handleToggle("emailNotifs")} />
              </div>
              
              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <p className="font-medium text-foreground">In-App Notifications</p>
                  <p className="text-sm text-muted-foreground">Live alerts for DSA progress and XP</p>
                </div>
                <Switch checked={settings.pushNotifs} onCheckedChange={() => handleToggle("pushNotifs")} />
              </div>
            </div>
          </TabsContent>

          {/* SyncPilot Tab */}
          <TabsContent value="syncpilot" className="space-y-6 outline-none">
            <div className="glass rounded-xl p-6 border border-white/5 space-y-6">
              <h3 className="font-semibold text-lg border-b border-white/5 pb-4">SyncPilot Preferences</h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-aurora" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Proactive Intelligence</p>
                    <p className="text-sm text-muted-foreground">Allow SyncPilot to analyze your code and suggest improvements automatically</p>
                  </div>
                </div>
                <Switch checked={settings.syncPilotProactive} onCheckedChange={() => handleToggle("syncPilotProactive")} />
              </div>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6 outline-none">
            <div className="glass rounded-xl p-6 border border-white/5 space-y-6">
              <h3 className="font-semibold text-lg border-b border-white/5 pb-4">Privacy & Visibility</h3>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Public Profile</p>
                  <p className="text-sm text-muted-foreground">Allow recruiters to discover your Career Identity</p>
                </div>
                <Switch checked={settings.profilePublic} onCheckedChange={() => handleToggle("profilePublic")} />
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6 outline-none">
            <div className="glass rounded-xl p-6 border border-white/5 space-y-6">
              <h3 className="font-semibold text-lg border-b border-white/5 pb-4">Account Security</h3>
              
              <div className="space-y-4">
                <p className="font-medium text-foreground">Current Login Method</p>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  {loginMethod === "google" && <span className="text-sm">Google Account</span>}
                  {loginMethod === "email" && <span className="text-sm">Email &amp; Password</span>}
                  {loginMethod === "both" && <span className="text-sm">Google Account + Email &amp; Password</span>}
                </div>
              </div>

              {loginMethod === "google" && (
                <div className="p-6 rounded-xl bg-gradient-to-br from-aurora/10 to-transparent border border-aurora/20 space-y-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-aurora/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium text-aurora flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Use Email &amp; Password Login
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        You currently sign in with Google. Create a password so you can also log in using your email address.
                      </p>
                    </div>
                    <Button 
                      onClick={handleCreatePassword} 
                      disabled={resettingPassword}
                      className="shrink-0 bg-aurora hover:bg-aurora/90 text-background font-medium"
                    >
                      {resettingPassword ? "Sending..." : "Create Password"}
                    </Button>
                  </div>
                </div>
              )}

              {loginMethod === "both" && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                  <div className="p-1 rounded-full bg-green-500/20 shrink-0">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-400">Password already configured</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your account supports both email/password login and any connected providers.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-white/5 pt-6">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={settings.twoFactor} onCheckedChange={() => handleToggle("twoFactor")} />
              </div>
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>

      {/* Floating Save Bar */}
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }} 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-6 shadow-2xl z-50"
      >
        <p className="text-sm font-medium text-muted-foreground hidden sm:block">Save your preferences</p>
        <Button onClick={handleSave} disabled={saving} className="bg-aurora hover:bg-aurora/90 text-background px-8 rounded-xl font-bold tracking-wide">
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </motion.div>
    </div>
  );
}
