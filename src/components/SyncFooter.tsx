import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Send,
  MessageCircle,
  Sparkles,
  Mail,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function SyncFooter() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    setBusy(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setBusy(false);
    if (error && !error.message.includes("duplicate")) return toast.error(error.message);
    setEmail("");
    toast.success("You're on the list 🚀");
  }

  const social = [
    { i: Github, href: "https://github.com/ramganesh1201", label: "GitHub" },
    { i: Linkedin, href: "https://www.linkedin.com/in/vemula-ram-ganesh/", label: "LinkedIn" },
    { i: Instagram, href: "#", label: "Instagram" },
    { i: Twitter, href: "#", label: "Twitter / X" },
    { i: Send, href: "#", label: "Telegram" },
  ];

  return (
    <footer className="relative border-t border-white/5 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-lg bg-aurora" />
              <div className="absolute inset-[3px] rounded-md bg-background grid place-items-center">
                <Sparkles className="h-4 w-4 text-aurora" />
              </div>
            </div>
            <span className="font-display text-xl font-semibold">SyncRole</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            The Career Operating System for the next generation of builders. AI-powered placement
            intelligence, gamified growth, real outcomes.
          </p>
          <form onSubmit={subscribe} className="mt-6 flex max-w-md gap-2">
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full glass rounded-full pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-accent/50"
              />
            </div>
            <button
              disabled={busy}
              className="rounded-full bg-aurora px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Product
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/dashboard" className="hover:text-foreground text-muted-foreground">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/dsa" className="hover:text-foreground text-muted-foreground">
                DSA Tracker
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-foreground text-muted-foreground">
                Sign In
              </Link>
            </li>
            <li>
              <a href="#score" className="hover:text-foreground text-muted-foreground">
                Placement Score
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Community
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {social.map(({ i: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-4 w-4" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SyncRole — The Career Operating System</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="mailto:hello@syncrole.app" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
