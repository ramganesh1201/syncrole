import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Code2, Settings, User, Sparkles, HelpCircle, Briefcase, GraduationCap, X, Menu, Calendar, FileText, Target, Map, Fingerprint, Bell, TrendingUp, Clock } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useEffect, useState } from "react";
import { SyncPilotLauncher } from "@/components/syncpilot/SyncPilotLauncher";
import { useSyncPilot } from "@/hooks/useSyncPilot";
import { NotificationCenter } from "@/components/dashboard/NotificationCenter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const router = useRouter();
  const { user } = Route.useRouteContext();
  const [profile, setProfile] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      if (data) setProfile(data);
    }
    loadProfile();
  }, [user.id]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  const pathname = router.state.location.pathname;
  const isFullScreenRoute = pathname.startsWith("/dsa-workspace/") || pathname.startsWith("/onboarding");

  return (
    <div className="min-h-screen relative">
      {/* DESKTOP & MOBILE HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white active:scale-95 transition"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <BrandLogo size="md" className="hidden md:flex" />
            <BrandLogo size="sm" className="md:hidden" />
          </div>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            <NavLink to="/dashboard" icon={LayoutDashboard}>
              Dashboard
            </NavLink>
            <NavLink to="/dashboard/dsa" icon={Code2}>
              DSA
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <NotificationCenter>
              <button className="relative h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/10 transition-colors" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </button>
            </NotificationCenter>

            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none ml-2">
                  <Avatar className="h-9 w-9 border border-white/10 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="bg-white/5 text-xs text-aurora font-medium">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-white/10">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-foreground">{profile?.full_name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
                    <Link to="/career-identity">
                      <Fingerprint className="mr-2 h-4 w-4" />
                      <span>Career Identity</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer hover:bg-white/5">
                    <Link to="/help">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem onClick={signOut} className="text-red-400 focus:text-red-400 cursor-pointer hover:bg-white/5">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE LEFT-SLIDING DRAWER OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* MOBILE LEFT-SLIDING DRAWER CONTAINER */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#090d16] border-r border-white/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <BrandLogo size="md" />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-6 space-y-2">
            {[
              { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
              { label: "DSA Command Center", href: "/dashboard/dsa", icon: Code2 },
              { label: "Today Workspace", href: "/dashboard/workspace", icon: Calendar },
              { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileText },
              { label: "Career Identity", href: "/career-identity", icon: Fingerprint },
              { label: "My Profile", href: "/profile", icon: User },
              { label: "Settings", href: "/settings", icon: Settings },
              { label: "Help & Support", href: "/help", icon: HelpCircle },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 text-slate-200 text-sm font-medium hover:bg-slate-800 transition"
              >
                <item.icon className="h-4 w-4 text-purple-400" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 flex-none">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              signOut();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-medium text-sm hover:bg-red-500/20 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT OUTLET CONTAINER */}
      <main className={isFullScreenRoute ? "" : "pb-20 md:pb-0"}>
        <Outlet />
      </main>

      {/* GLOBAL MOBILE BOTTOM NAVIGATION BAR */}
      {!isFullScreenRoute && <GlobalMobileBottomNav pathname={pathname} />}
    </div>
  );
}

function NavLink({
  to,
  icon: Icon,
  children,
}: {
  to: string;
  icon: any;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isActive = router.state.location.pathname === to;

  return (
    <Link
      to={to}
      onClick={(e) => {
        e.preventDefault();
        router.navigate({ to });
      }}
      className={`px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 inline-flex items-center gap-2 ${
        isActive ? "text-foreground bg-white/10" : ""
      }`}
    >
      <Icon className="h-4 w-4" /> {children}
    </Link>
  );
}

function GlobalMobileBottomNav({ pathname }: { pathname: string }) {
  const { openSyncPilot, panelState } = useSyncPilot();
  const isSyncPilotOpen = panelState !== "closed";

  const tabs = [
    { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
    { label: "Workspace", href: "/dashboard/workspace", icon: Clock },
    { label: "AI SyncPilot", action: openSyncPilot, icon: Sparkles, isCenter: true },
    { label: "Analytics", href: "/resume-intelligence", icon: FileText },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#07090e]/95 backdrop-blur-2xl border-t border-white/10 px-2 py-2 flex items-center justify-around pb-safe md:hidden">
      {tabs.map((tab) => {
        if (tab.isCenter) {
          return (
            <button
              key={tab.label}
              onClick={() => tab.action?.()}
              className={`relative -top-3 h-12 w-12 rounded-full p-px shadow-lg transition active:scale-95 ${
                isSyncPilotOpen
                  ? "bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-purple-500/60 ring-2 ring-purple-400/60"
                  : "bg-gradient-to-tr from-purple-600 to-blue-600 shadow-purple-500/40 hover:brightness-110"
              }`}
              aria-label="Open SyncPilot AI Assistant"
            >
              <div
                className={`h-full w-full rounded-full grid place-items-center transition ${
                  isSyncPilotOpen ? "bg-purple-950 text-cyan-300" : "bg-slate-950 text-purple-300"
                }`}
              >
                <tab.icon className="h-5 w-5" />
              </div>
            </button>
          );
        }

        const isActive =
          tab.href === "/dashboard"
            ? pathname === "/dashboard" || pathname === "/dashboard/"
            : pathname.startsWith(tab.href!);

        const Icon = tab.icon;

        return (
          <Link
            key={tab.label}
            to={tab.href!}
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition py-1 px-2 rounded-xl ${
              isActive ? "text-purple-400 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className={`h-4 w-4 ${isActive ? "text-purple-400 scale-110" : "text-slate-400"}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
