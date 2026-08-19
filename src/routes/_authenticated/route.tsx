import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, Code2, Settings, User, Sparkles, HelpCircle, Briefcase, GraduationCap, X, Menu, Calendar, FileText, Target, Map, Fingerprint, Bell } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { useEffect, useState } from "react";
import { SyncPilotLauncher } from "@/components/syncpilot/SyncPilotLauncher";
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

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen relative">
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
              <button className="relative h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/10 transition-colors">
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

      {/* MOBILE HAMBURGER DRAWER */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6 md:hidden">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <BrandLogo size="md" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 space-y-3">
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
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-900/60 border border-white/5 text-slate-200 text-sm font-medium hover:bg-slate-800 transition"
                >
                  <item.icon className="h-4 w-4 text-purple-400" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10">
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
      )}

      <Outlet />
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
