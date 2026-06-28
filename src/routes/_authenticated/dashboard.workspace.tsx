import { createFileRoute, Outlet, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Code2,
  User,
  Bell,
  LogOut,
  Sparkles,
  Menu,
  X,
  FileText,
  Brain,
  Calendar,
  Briefcase,
  BarChart3,
  Check,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard/workspace")({
  component: DashboardWorkspaceLayout,
});

function DashboardWorkspaceLayout() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();

    // Safari fallback
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const [unread, setUnread] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;

      const [profileRes, notifRes] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact" }).eq("user_id", u.user.id).maybeSingle(),
        supabase
          .from("notifications")
          .select("id", { count: "exact" })
          .eq("read", false),
      ]);

      if (!alive) return;
      setProfile(profileRes.data ?? null);
      setUnread(notifRes.data?.length ?? 0);
    }

    void load();

    const ch = supabase
      .channel("workspace-notifs")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications" }, () => {
        void supabase
          .from("notifications")
          .select("id", { count: "exact" })
          .eq("read", false)
          .then((r: any) => alive && setUnread(r.data?.length ?? 0));
      })
      .subscribe();

    return () => {
      alive = false;
      supabase.removeChannel(ch);
    };
  }, []);

  const navItems = useMemo(() => {
    return [
      { to: "/dashboard/overview", label: "Overview", Icon: LayoutDashboard },
      { to: "/dashboard/dsa", label: "DSA", Icon: Code2 },
      { to: "/dashboard/dsa/mentor", label: "AI Mentor", Icon: Brain },
      { to: "/dashboard/resume", label: "Resume", Icon: FileText },
      { to: "/dashboard/interviews", label: "Interview Prep", Icon: Calendar },
      { to: "/dashboard/applications", label: "Applications", Icon: Briefcase },
      { to: "/dashboard/analytics", label: "Analytics", Icon: BarChart3 },
    ] satisfies Array<{ to: string; label: string; Icon: any }>;
  }, []);

  const activePath = router.state.location.pathname;

  function isActive(to: string) {
    if (to === "/dashboard/overview") return activePath === "/dashboard" || activePath === "/dashboard/overview";
    return activePath === to || activePath.startsWith(to + "/");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile drawer */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <button
            className="h-10 w-10 rounded-full glass grid place-items-center"
            onClick={() => setDrawerOpen((v) => !v)}
            aria-label="Open navigation"
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      )}

      <AnimatePresence>
        {isMobile && drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setDrawerOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        {!isMobile && (
          <aside className="w-[280px] shrink-0 border-r border-white/5 bg-background/70 backdrop-blur-xl sticky top-0 h-screen">
            <Sidebar
              navItems={navItems}
              activePath={activePath}
              isActive={isActive}
              profile={profile}
              unread={unread}
              onNavigate={(to) => router.navigate({ to })}
            />
          </aside>
        )}

        {isMobile && drawerOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] z-50 border-r border-white/5 bg-background/90 backdrop-blur-xl"
          >
            <Sidebar
              navItems={navItems}
              activePath={activePath}
              isActive={isActive}
              profile={profile}
              unread={unread}
              onNavigate={(to) => {
                setDrawerOpen(false);
                router.navigate({ to });
              }}
            />
          </motion.aside>
        )}

        {/* Main column */}
        <div className="flex-1 flex flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-white/5">
            <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-lg bg-aurora" />
                  <div className="absolute inset-[3px] rounded-md bg-background grid place-items-center">
                    <Sparkles className="h-3.5 w-3.5 text-aurora" />
                  </div>
                </div>
                <span className="font-display text-lg font-semibold">SyncRole</span>
              </Link>

              <div className="flex items-center gap-2">
                <button
                  className="relative h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/10"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-aurora text-[10px] font-bold grid place-items-center">
                      {unread}
                    </span>
                  )}
                </button>

                <div className="hidden md:flex items-center gap-2 rounded-full glass px-3 py-1.5">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="text-xs text-muted-foreground">
                    {profile?.full_name ?? "User"}
                  </div>
                </div>

                <LogoutButton />
              </div>
            </div>
          </header>

          {/* Content area */}
          <div className="flex-1">
            <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={router.state.location.pathname}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="h-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  navItems,
  activePath,
  isActive,
  profile,
  unread,
  onNavigate,
}: {
  navItems: Array<{ to: string; label: string; Icon: any }>;
  activePath: string;
  isActive: (to: string) => boolean;
  profile: any;
  unread: number;
  onNavigate: (to: string) => void;
}) {
  return (
    <div className="h-full flex flex-col">

      <nav className="flex-1 px-2 pb-4 overflow-auto">
        <div className="space-y-1">
          {navItems.map(({ to, label, Icon }) => {
            const active = isActive(to);
            return (
              <button
                key={to}
                onClick={() => onNavigate(to)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition ${
                  active
                    ? "bg-white/10 text-foreground border border-white/10"
                    : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Profile</div>
            <div className="mt-1 text-sm font-medium truncate">{profile?.full_name ?? "User"}</div>
          </div>
          <div className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-2 h-4 min-w-4 px-1 rounded-full bg-aurora text-[10px] font-bold grid place-items-center">
                {unread}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  return (
    <button
      onClick={signOut}
      className="h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/10"
      title="Sign out"
    >
      <LogOut className="h-4 w-4" />
    </button>
  );
}

