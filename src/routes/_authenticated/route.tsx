import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Code2, Settings, User, Sparkles, HelpCircle, Briefcase, GraduationCap, X, Menu, Calendar, FileText, Target, Fingerprint, Bell, TrendingUp, Clock, Building2, ChevronRight } from "lucide-react";
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

  // Determine current mobile header section title
  const getPageTitle = (path: string) => {
    if (path.startsWith("/dashboard/dsa")) return "DSA Command";
    if (path.startsWith("/dashboard/workspace")) return "Workspace";
    if (path.startsWith("/dashboard")) return "Dashboard";
    if (path.startsWith("/dsa-problems")) return "DSA Problems";
    if (path.startsWith("/dsa-daily")) return "Daily DSA";
    if (path.startsWith("/dsa-companies")) return "Target Companies";
    if (path.startsWith("/dsa-roadmap")) return "DSA Roadmap";
    if (path.startsWith("/dsa-mentor")) return "AI Mentor";
    if (path.startsWith("/resume-intelligence")) return "Resume Intel";
    if (path.startsWith("/role-explorer")) return "Role Explorer";
    if (path.startsWith("/career-identity")) return "Career Identity";
    if (path.startsWith("/profile")) return "Profile";
    if (path.startsWith("/settings")) return "Settings";
    if (path.startsWith("/help")) return "Help";
    if (path.startsWith("/gate")) return "GATE Hub";
    return "";
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] grid place-items-center">
        <div className="h-8 w-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-[#F7F9FC] text-slate-900 font-sans">
      {/* APP HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 border-b border-slate-200/80 shadow-xs transition-all pt-[env(safe-area-inset-top)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100/90 border border-slate-200/80 text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 active:scale-95 transition flex items-center justify-center min-w-[40px] min-h-[40px]"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <BrandLogo size="md" className="hidden md:flex" />
            <BrandLogo size="sm" className="md:hidden" />
          </div>

          {/* Center Title on Mobile */}
          <div className="md:hidden text-center">
            <span className="text-xs font-bold text-slate-700 tracking-tight">
              {getPageTitle(pathname)}
            </span>
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
              <button className="relative h-9 w-9 grid place-items-center rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 text-slate-700 hover:text-slate-900 transition active:scale-95 shadow-xs" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </button>
            </NotificationCenter>

            <Link to="/profile" className="md:hidden">
              <Avatar className="h-8 w-8 border border-slate-200 cursor-pointer shadow-xs">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback className="bg-purple-100 text-xs text-purple-700 font-bold">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none ml-2">
                  <Avatar className="h-9 w-9 border border-slate-200 cursor-pointer transition transform hover:scale-105 hover:border-purple-300 shadow-xs">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback className="bg-purple-100 text-xs text-purple-700 font-bold">
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

      {/* MOBILE CATEGORIZED DRAWER CONTAINER */}
      <div
        className={`fixed inset-y-0 left-0 z-[70] h-[100dvh] w-[min(85vw,340px)] max-w-[340px] bg-white border-r border-slate-200/90 p-4 flex flex-col justify-between transition-transform duration-300 ease-out shadow-2xl md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="flex-none flex items-center justify-between pb-3.5 border-b border-slate-100">
          <BrandLogo size="md" />
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition active:scale-95 flex items-center justify-center min-w-[36px] min-h-[36px]"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* CATEGORIZED NAVIGATION LIST */}
        <nav className="flex-1 overflow-y-auto min-h-0 py-3 space-y-4">
          {/* PRIMARY */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Primary Workspace</span>
            {[
              { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
              { label: "Today Workspace", href: "/dashboard/workspace", icon: Calendar },
              { label: "DSA Command Center", href: "/dashboard/dsa", icon: Code2 },
            ].map((item) => (
              <DrawerLink key={item.label} item={item} pathname={pathname} onClose={() => setIsMenuOpen(false)} />
            ))}
          </div>

          {/* CAREER */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Career & Skills</span>
            {[
              { label: "Resume Intelligence", href: "/resume-intelligence", icon: FileText },
              { label: "Career Identity", href: "/career-identity", icon: Fingerprint },
              { label: "Role Explorer", href: "/role-explorer", icon: Target },
              { label: "Target Companies", href: "/dsa-companies", icon: Building2 },
            ].map((item) => (
              <DrawerLink key={item.label} item={item} pathname={pathname} onClose={() => setIsMenuOpen(false)} />
            ))}
          </div>

          {/* ACCOUNT */}
          <div className="space-y-1 pt-1 border-t border-slate-100">
            <span className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Account & Settings</span>
            {[
              { label: "My Profile", href: "/profile", icon: User },
              { label: "Settings", href: "/settings", icon: Settings },
              { label: "Help & Support", href: "/help", icon: HelpCircle },
            ].map((item) => (
              <DrawerLink key={item.label} item={item} pathname={pathname} onClose={() => setIsMenuOpen(false)} />
            ))}
          </div>
        </nav>

        {/* FOOTER */}
        <div className="flex-none pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] border-t border-slate-100">
          <button
            onClick={() => {
              setIsMenuOpen(false);
              signOut();
            }}
            className="w-full min-h-[42px] flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 font-semibold text-xs hover:bg-rose-100 active:scale-[0.98] transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <main className={isFullScreenRoute ? "" : "pb-24 md:pb-0"}>
        <Outlet />
      </main>

      {/* NATIVE APP BOTTOM NAV BAR */}
      {!isFullScreenRoute && <GlobalMobileBottomNav pathname={pathname} />}
    </div>
  );
}

function DrawerLink({ item, pathname, onClose }: { item: { label: string; href: string; icon: any }; pathname: string; onClose: () => void }) {
  const isItemActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard" || pathname === "/dashboard/"
      : pathname.startsWith(item.href);

  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      onClick={onClose}
      className={`min-h-[42px] px-3 py-2 rounded-xl flex items-center justify-between transition text-xs font-medium ${
        isItemActive
          ? "bg-purple-50 border border-purple-200/80 text-purple-700 font-semibold shadow-xs"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Icon className={`h-4 w-4 flex-shrink-0 ${isItemActive ? "text-purple-600" : "text-slate-500"}`} />
        <span>{item.label}</span>
      </div>
      <ChevronRight className={`h-3.5 w-3.5 ${isItemActive ? "text-purple-600" : "text-slate-400"}`} />
    </Link>
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
      className={`px-4 py-2 rounded-full text-sm font-medium transition inline-flex items-center gap-2 ${
        isActive
          ? "text-purple-700 bg-purple-50 font-semibold border border-purple-200/80 shadow-xs"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
      }`}
    >
      <Icon className={`h-4 w-4 ${isActive ? "text-purple-600" : "text-slate-500"}`} /> {children}
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
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-lg px-3 py-1.5 flex items-center justify-around pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden h-[64px] box-content">
      {tabs.map((tab) => {
        if (tab.isCenter) {
          return (
            <button
              key={tab.label}
              onClick={() => tab.action?.()}
              className={`relative -top-2.5 h-11 w-11 rounded-full grid place-items-center shadow-md transition active:scale-95 ${
                isSyncPilotOpen
                  ? "bg-slate-900 text-purple-300 ring-2 ring-purple-500/40"
                  : "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white hover:brightness-110"
              }`}
              aria-label="Open SyncPilot AI Assistant"
            >
              <tab.icon className="h-5 w-5" />
            </button>
          );
        }

        const isWorkspaceTab = tab.href === "/dashboard/workspace";
        const isDashboardTab = tab.href === "/dashboard";
        const isProfileTab = tab.href === "/profile";
        const isGateTab = tab.href === "/gate";

        let isActive = false;
        if (isWorkspaceTab) {
          isActive = pathname.startsWith("/dashboard/workspace");
        } else if (isDashboardTab) {
          isActive =
            (pathname === "/dashboard" ||
              pathname === "/dashboard/" ||
              pathname === "/" ||
              (pathname.startsWith("/dashboard/") && !pathname.startsWith("/dashboard/workspace")) ||
              pathname.startsWith("/dsa-") ||
              pathname.startsWith("/resume-intelligence"));
        } else if (isProfileTab) {
          isActive =
            pathname.startsWith("/profile") ||
            pathname.startsWith("/settings") ||
            pathname.startsWith("/career-identity") ||
            pathname.startsWith("/role-explorer") ||
            pathname.startsWith("/help");
        } else if (isGateTab) {
          isActive = pathname.startsWith("/gate");
        } else {
          isActive = pathname.startsWith(tab.href!);
        }

        const Icon = tab.icon;

        return (
          <Link
            key={tab.label}
            to={tab.href!}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition py-1 px-2.5 rounded-xl min-w-[44px] min-h-[44px] justify-center ${
              isActive ? "text-purple-700 font-bold" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon className={`h-4 w-4 transition-transform ${isActive ? "text-purple-600 scale-110" : "text-slate-400"}`} />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
