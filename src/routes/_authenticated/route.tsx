import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Code2, Settings, User, Sparkles, HelpCircle, Briefcase, GraduationCap, X, Menu, Calendar, FileText, Target, Map, Fingerprint, Bell, TrendingUp, Clock, Building2, ChevronRight } from "lucide-react";
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

import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated")({
  component: AuthedLayout,
});

function AuthedLayout() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.navigate({ to: "/auth", replace: true });
    }
  }, [loading, user, router]);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
      if (data) setProfile(data);
    }
    loadProfile();
  }, [user]);

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
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMenuOpen]);

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  const pathname = router.state.location.pathname;
  const isFullScreenRoute = pathname.startsWith("/dsa-workspace/") || pathname.startsWith("/onboarding");

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background grid place-items-center">
        <div className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#F8FAFC]">
      {/* DESKTOP & MOBILE HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs transition-all">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 active:scale-95 transition-all duration-200 flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <BrandLogo size="md" className="hidden md:flex" />
            <BrandLogo size="sm" className="md:hidden" />
          </div>

          <nav className="hidden md:flex items-center gap-1.5 text-sm">
            <NavLink to="/dashboard" icon={LayoutDashboard}>
              Dashboard
            </NavLink>
            <NavLink to="/dashboard/dsa" icon={Code2}>
              DSA
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <NotificationCenter>
              <button className="relative h-9 w-9 grid place-items-center rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 text-slate-700 hover:text-slate-900 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 shadow-xs" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </button>
            </NotificationCenter>

            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none ml-2">
                  <Avatar className="h-9 w-9 border border-slate-200 cursor-pointer transition-all duration-200 transform hover:scale-105 hover:border-purple-300 shadow-xs">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="bg-purple-100 text-xs text-purple-700 font-semibold">
                      {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-slate-200/90 text-slate-900 shadow-xl rounded-xl p-1.5">
                  <DropdownMenuLabel className="font-normal px-2.5 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none text-slate-900">{profile?.full_name || "User"}</p>
                      <p className="text-xs leading-none text-slate-500 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 my-1" />
                  <DropdownMenuItem asChild className="cursor-pointer text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:bg-slate-100 rounded-lg transition-colors py-2 px-2.5">
                    <Link to="/profile">
                      <User className="mr-2.5 h-4 w-4 text-slate-500" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:bg-slate-100 rounded-lg transition-colors py-2 px-2.5">
                    <Link to="/career-identity">
                      <Fingerprint className="mr-2.5 h-4 w-4 text-slate-500" />
                      <span className="font-medium">Career Identity</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:bg-slate-100 rounded-lg transition-colors py-2 px-2.5">
                    <Link to="/settings">
                      <Settings className="mr-2.5 h-4 w-4 text-slate-500" />
                      <span className="font-medium">Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:bg-slate-100 rounded-lg transition-colors py-2 px-2.5">
                    <Link to="/help">
                      <HelpCircle className="mr-2.5 h-4 w-4 text-slate-500" />
                      <span className="font-medium">Help</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-100 my-1" />
                  <DropdownMenuItem onClick={signOut} className="text-rose-600 focus:text-rose-600 cursor-pointer hover:bg-rose-50 focus:bg-rose-50 rounded-lg transition-colors py-2 px-2.5">
                    <LogOut className="mr-2.5 h-4 w-4 text-rose-500" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE LEFT-SLIDING DRAWER OVERLAY */}
      <div
        className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* MOBILE LEFT-SLIDING DRAWER CONTAINER */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] h-[100dvh] w-[min(88vw,360px)] max-w-[360px] bg-white border-r border-slate-200/90 p-5 flex flex-col justify-between transition-transform duration-300 ease-out shadow-2xl md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* FIXED HEADER */}
        <div className="flex-none flex items-center justify-between pb-4 border-b border-slate-100">
          <BrandLogo size="md" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2.5 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition active:scale-95 flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* INDEPENDENT SCROLLABLE MIDDLE NAVIGATION */}
        <nav className="flex-1 overflow-y-auto min-h-0 py-4 space-y-1.5">
          {[
            { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { label: "DSA Command Center", href: "/dashboard/dsa", icon: Code2 },
            { label: "Today Workspace", href: "/dashboard/workspace", icon: Calendar },
            { label: "Target Companies", href: "/dsa-companies", icon: Building2 },
            { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileText },
            { label: "Role Explorer", href: "/role-explorer", icon: Target },
            { label: "Career Identity", href: "/career-identity", icon: Fingerprint },
            { label: "My Profile", href: "/profile", icon: User },
            { label: "Settings", href: "/settings", icon: Settings },
            { label: "Help & Support", href: "/help", icon: HelpCircle },
          ].map((item) => {
            const isItemActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard" || pathname === "/dashboard/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`min-h-[44px] px-3.5 py-2.5 rounded-xl border flex items-center justify-between transition-all duration-200 text-sm font-medium ${
                  isItemActive
                    ? "bg-purple-50 border-purple-200 text-purple-700 font-semibold shadow-xs"
                    : "bg-slate-50/60 border-slate-200/60 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isItemActive ? "text-purple-600" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`h-4 w-4 flex-shrink-0 ${isItemActive ? "text-purple-600" : "text-slate-400"}`} />
              </Link>
            );
          })}
        </nav>

        {/* FIXED FOOTER WITH SAFE AREA BOTTOM PADDING */}
        <div className="flex-none pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] border-t border-slate-100">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              signOut();
            }}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-semibold text-sm hover:bg-rose-100 active:scale-[0.98] transition shadow-xs"
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
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 inline-flex items-center gap-2 ${
        isActive
          ? "text-purple-700 bg-purple-50 font-semibold border border-purple-200/80 shadow-xs"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
      }`}
    >
      <Icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? "text-purple-600" : "text-slate-500"}`} /> {children}
    </Link>
  );
}

function GlobalMobileBottomNav({ pathname }: { pathname: string }) {
  const { openSyncPilot, panelState } = useSyncPilot();
  const isSyncPilotOpen = panelState !== "closed";

  const tabs = [
    { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
    { label: "Workspace", href: "/dashboard/workspace", icon: Clock },
    { label: "SyncPilot", action: openSyncPilot, icon: Sparkles, isCenter: true },
    { label: "GATE Hub", href: "/gate", icon: GraduationCap },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 shadow-lg px-2 py-2 flex items-center justify-around pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden">
      {tabs.map((tab) => {
        if (tab.isCenter) {
          return (
            <button
              key={tab.label}
              onClick={() => tab.action?.()}
              className={`relative -top-3 h-12 w-12 rounded-full p-px shadow-md transition active:scale-95 ${
                isSyncPilotOpen
                  ? "bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-purple-500/40 ring-2 ring-purple-400/60"
                  : "bg-gradient-to-tr from-purple-600 to-blue-600 shadow-purple-500/30 hover:brightness-110"
              }`}
              aria-label="Open SyncPilot AI Assistant"
            >
              <div
                className={`h-full w-full rounded-full grid place-items-center transition ${
                  isSyncPilotOpen ? "bg-slate-900 text-cyan-300" : "bg-slate-900 text-purple-300"
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
            className={`flex flex-col items-center gap-1 text-[10px] font-medium transition py-1 px-2 rounded-xl min-w-[44px] min-h-[44px] justify-center ${
              isActive ? "text-purple-600 font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon className={`h-4 w-4 transition-transform duration-200 ${isActive ? "text-purple-600 scale-110" : "text-slate-500"}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
