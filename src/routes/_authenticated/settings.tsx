import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCog, 
  ArrowLeft, 
  Lock, 
  Shield, 
  Bell, 
  Sparkles, 
  Volume2, 
  User, 
  Check, 
  Loader2, 
  ChevronRight, 
  Mail, 
  HelpCircle, 
  KeyRound,
  Eye,
  Smartphone,
  Save,
  CheckCircle2,
  Compass
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

interface UserSettings {
  emailNotifs: boolean;
  pushNotifs: boolean;
  soundEffects: boolean;
  syncPilotProactive: boolean;
  profilePublic: boolean;
  twoFactor: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  emailNotifs: true,
  pushNotifs: true,
  soundEffects: true,
  syncPilotProactive: true,
  profilePublic: false,
  twoFactor: false,
};

function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"google" | "email" | "both">("email");
  const [profile, setProfile] = useState<any>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Settings state initialized from localStorage if available
  const [settings, setSettings] = useState<UserSettings>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("syncrole_user_settings");
        if (stored) {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
      } catch (e) {
        // Fallback to defaults
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      const providers = user.app_metadata?.providers || [];
      const hasGoogle = providers.includes("google");
      const hasEmail = providers.includes("email");
      if (hasGoogle && hasEmail) setLoginMethod("both");
      else if (hasGoogle) setLoginMethod("google");
      else setLoginMethod("email");

      // Load profile info
      const { data } = await supabase.from("profiles").select("full_name, avatar_url, target_role, college").eq("user_id", user.id).single();
      if (data) setProfile(data);
    }
    loadData();
  }, [user]);

  const handleToggle = (key: keyof UserSettings) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      setHasChanges(true);
      return updated;
    });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem("syncrole_user_settings", JSON.stringify(settings));
        setHasChanges(false);
        toast.success("Settings saved successfully!");
      } catch (e) {
        toast.error("Failed to persist settings.");
      } finally {
        setSaving(false);
      }
    }, 400);
  };

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 pb-36">
        
        {/* Top Header & Breadcrumb */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link 
              to="/profile" 
              className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors p-1 -ml-1 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Profile</span>
            </Link>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <UserCog className="w-5 h-5" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
                  Account Settings
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Manage your credentials, AI coach preferences, and notifications.
              </p>
            </div>

            {/* In-flow Save Button (Desktop / Tablet) */}
            <div className="hidden sm:block">
              <Button
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold px-4 h-10 shadow-xs transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* SECTION 1: ACCOUNT & AUTHENTICATION */}
        <section className="space-y-3">
          <div className="px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Account & Credentials
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
            {/* User Details Row */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center text-sm shrink-0">
                  {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {profile?.full_name || "SyncRole Student"}
                  </p>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{user?.email || "No email available"}</span>
                  </p>
                </div>
              </div>

              <Link
                to="/profile"
                className="shrink-0 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200/60 transition-colors inline-flex items-center gap-1"
              >
                <span>Edit Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Login Method Row */}
            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Current Sign-in Method</p>
                  <p className="text-xs text-slate-500 mt-0.5">How your credentials authenticate into SyncRole</p>
                </div>
                <div className="shrink-0">
                  {loginMethod === "google" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                      Google OAuth
                    </span>
                  )}
                  {loginMethod === "email" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      Email & Password
                    </span>
                  )}
                  {loginMethod === "both" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Google + Password
                    </span>
                  )}
                </div>
              </div>

              {/* Password Setup for Google Users */}
              {loginMethod === "google" && (
                <div className="mt-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                      Set up an email password
                    </p>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      Establish a backup password to sign in directly with your email.
                    </p>
                  </div>
                  <Button
                    onClick={handleCreatePassword}
                    disabled={resettingPassword}
                    variant="outline"
                    className="h-8 px-3 text-xs font-semibold border-slate-200 bg-white hover:bg-slate-100 text-slate-800 shrink-0 rounded-lg shadow-2xs"
                  >
                    {resettingPassword ? (
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Sending Link...</span>
                      </span>
                    ) : (
                      "Set Password"
                    )}
                  </Button>
                </div>
              )}

              {/* Password Configured Badge */}
              {loginMethod === "both" && (
                <div className="mt-2 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your account supports both Google login and email password authentication.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: SYNCPILOT & AI PREFERENCES */}
        <section className="space-y-3">
          <div className="px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              SyncPilot & Platform Intelligence
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
            {/* Proactive Intelligence Toggle */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Proactive Intelligence</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Allow SyncPilot to analyze code logic and suggest optimizations during practice sessions.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.syncPilotProactive}
                onCheckedChange={() => handleToggle("syncPilotProactive")}
                aria-label="Toggle SyncPilot Proactive Intelligence"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>

            {/* Sound Effects Toggle */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Volume2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Milestone Audio Feedback</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Play subtle sound cues when earning daily mission XP or clearing test cases.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={() => handleToggle("soundEffects")}
                aria-label="Toggle Audio Feedback"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>

            {/* Career Identity Quick Link */}
            <Link
              to="/career-identity"
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center shrink-0">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Career Identity & Target Goals
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure your dream companies, target roles, and readiness path.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
            </Link>
          </div>
        </section>

        {/* SECTION 3: NOTIFICATION PREFERENCES */}
        <section className="space-y-3">
          <div className="px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Notifications & Alerts
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
            {/* Email Notifications */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Weekly Readiness Summaries</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Receive email digests tracking your DSA streaks and weekly score momentum.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifs}
                onCheckedChange={() => handleToggle("emailNotifs")}
                aria-label="Toggle Weekly Email Summaries"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>

            {/* In-App Notifications */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">In-App Practice Alerts</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Show real-time notifications for daily streak reminders and XP awards.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifs}
                onCheckedChange={() => handleToggle("pushNotifs")}
                aria-label="Toggle In-App Alerts"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>
          </div>
        </section>

        {/* SECTION 4: PRIVACY & RECRUITER VISIBILITY */}
        <section className="space-y-3">
          <div className="px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Privacy & Security
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
            {/* Public Profile Visibility */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Eye className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Public Recruiter Visibility</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Allow partner recruiters to discover your verified achievements and Placement Score.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.profilePublic}
                onCheckedChange={() => handleToggle("profilePublic")}
                aria-label="Toggle Public Recruiter Visibility"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>

            {/* Two-Factor Authentication */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Enhanced Sign-In Verification</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Prompt for additional email OTP confirmation on new unrecognized browser logins.
                  </p>
                </div>
              </div>
              <Switch
                checked={settings.twoFactor}
                onCheckedChange={() => handleToggle("twoFactor")}
                aria-label="Toggle Enhanced Verification"
                className="data-[state=checked]:bg-blue-600 shrink-0"
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: HELP & SUPPORT SHORTCUT */}
        <section className="space-y-3">
          <div className="px-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Support & Documentation
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden divide-y divide-slate-100">
            <Link
              to="/help"
              className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Help Center & FAQs
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Read feature guides, understand score calculations, or file a support ticket.
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
            </Link>
          </div>
        </section>

        {/* Mobile Persistent Save Bar (when changes are pending) */}
        {/* Placed with safe clearance above the 56px bottom navigation */}
        <AnimatePresence>
          {hasChanges && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-[calc(56px+env(safe-area-inset-bottom)+0.75rem)] inset-x-4 z-40 sm:hidden bg-white/95 backdrop-blur-xl border border-slate-200/95 shadow-xl rounded-2xl p-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900">Unsaved Preferences</p>
                <p className="text-[10px] text-slate-500 truncate">Tap to apply changes to your account</p>
              </div>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold px-4 h-9 shadow-xs shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
