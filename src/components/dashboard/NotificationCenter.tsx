import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bell, Check, Sparkles, Code2, FileText, Target, Trophy, Clock, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function NotificationCenter({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    load();
    const chNotif = supabase
      .channel("notif-bell-center")
      .on("postgres_changes", { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` }, load)
      .on("postgres_changes", { event: "*", schema: "public", table: "activity_logs", filter: `user_id=eq.${user.id}` }, load)
      .subscribe();
    return () => {
      supabase.removeChannel(chNotif);
    };
  }, [user]);

  async function load() {
    if (!user) return;
    // Fetch notifications
    const { data: notifs } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    // Fetch activity logs as adapter
    const { data: logs } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    const adaptedLogs = (logs || []).map(log => ({
      id: log.id,
      title: mapLogTypeToTitle(log.type),
      body: `You earned ${log.xp_delta} XP for completing a ${log.type.replace(/_/g, ' ')}.`,
      type: log.type,
      created_at: log.created_at,
      read: true, // Activity logs are considered read for now, or we can use local storage
      isAdapter: true
    }));

    const all = [...(notifs || []), ...adaptedLogs]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 30);

    setItems(all);
    setUnreadCount(all.filter(i => !i.read && !i.isAdapter).length);
  }

  async function markAsRead(id: string) {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, read: true } : i));
    setUnreadCount(prev => Math.max(0, prev - 1));
  }

  async function markAllAsRead() {
    if (!user) return;
    await supabase.from("notifications").update({ read: true }).eq("user_id", user.id).eq("read", false);
    setItems(prev => prev.map(i => ({ ...i, read: true })));
    setUnreadCount(0);
  }

  const mapLogTypeToTitle = (type: string) => {
    if (type.includes("dsa")) return "DSA Problem Solved";
    if (type.includes("resume")) return "Resume Analyzed";
    if (type.includes("mission")) return "Daily Mission Complete";
    return "Activity Logged";
  };

  const getIcon = (type: string) => {
    if (type.includes("dsa")) return <Code2 className="w-4 h-4 text-primary" />;
    if (type.includes("resume")) return <FileText className="w-4 h-4 text-blue-400" />;
    if (type.includes("mission")) return <Target className="w-4 h-4 text-orange-400" />;
    if (type.includes("achievement")) return <Trophy className="w-4 h-4 text-yellow-400" />;
    return <Sparkles className="w-4 h-4 text-aurora" />;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative inline-block cursor-pointer">
          {children}
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-aurora text-[10px] font-bold grid place-items-center z-10 pointer-events-none">
              {unreadCount}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md border-white/10 bg-background/80 backdrop-blur-xl p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-white/5 space-y-1">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-aurora" />
              Notifications
            </SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs text-muted-foreground hover:text-foreground">
                <Check className="w-3 h-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground"
              >
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 opacity-20" />
                </div>
                <p>You're all caught up!</p>
                <p className="text-sm opacity-60">No new notifications right now.</p>
              </motion.div>
            ) : (
              items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`relative overflow-hidden rounded-xl border p-4 transition-all ${
                    !item.read ? "bg-white/5 border-aurora/30 shadow-[0_0_15px_rgba(var(--aurora),0.1)]" : "bg-black/20 border-white/5"
                  }`}
                  onClick={() => !item.read && markAsRead(item.id)}
                >
                  <div className="flex gap-3">
                    <div className="mt-0.5 shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${!item.read ? 'glass' : 'bg-white/5'}`}>
                        {getIcon(item.type || "")}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className={`text-sm font-medium ${!item.read ? "text-foreground" : "text-foreground/80"}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.body}
                      </p>
                      <div className="flex items-center gap-1.5 pt-2 text-[10px] text-muted-foreground/60 font-medium uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {!item.read && (
                      <div className="w-2 h-2 rounded-full bg-aurora shrink-0 mt-1 shadow-[0_0_8px_rgba(var(--aurora),0.8)] animate-pulse" />
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
