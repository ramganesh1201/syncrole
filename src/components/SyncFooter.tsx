import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";

export default function SyncFooter() {
  const social = [
    { i: Github, href: "https://github.com/ramganesh1201", label: "GitHub" },
    { i: Linkedin, href: "https://www.linkedin.com/in/vemula-ram-ganesh/", label: "LinkedIn" },
    { i: Twitter, href: "https://x.com", label: "X" },
    { i: Globe, href: "#", label: "Website" },
  ];

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 pt-14 pb-8 text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
          {/* Left Column: Brand Lockup & Statement */}
          <div className="md:col-span-4 space-y-4 text-left">
            <BrandLogo size="md" variant="dark" />
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed font-normal">
              Build your future. One step at a time. The AI Career Operating System helping students learn, practice DSA, build projects, and get recruiter-ready.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              {social.map(({ i: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="h-8.5 w-8.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns: Useful Destinations */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            {/* Product Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">
                Product
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li>
                  <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a href="#journey" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Career Journey
                  </a>
                </li>
                <li>
                  <Link to="/dashboard/dsa" className="text-slate-600 hover:text-blue-600 transition-colors">
                    DSA Practice
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Resume Intelligence
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 transition-colors">
                    AI Career Twin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">
                Explore
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li>
                  <Link to="/gate" className="text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5">
                    <span>GATE Hub</span>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">New</span>
                  </Link>
                </li>
                <li>
                  <a href="#journey" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Learning Paths
                  </a>
                </li>
                <li>
                  <a href="#journey" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Real Projects
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Platform Features
                  </a>
                </li>
              </ul>
            </div>

            {/* Account & Company Column */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-display">
                Account & Info
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm font-medium">
                <li>
                  <Link to="/auth" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Sign In / Register
                  </Link>
                </li>
                <li>
                  <a href="#stories" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Student Stories
                  </a>
                </li>
                <li>
                  <a href="#home" className="text-slate-600 hover:text-blue-600 transition-colors">
                    Overview
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © {new Date().getFullYear()} SyncRole. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <span>I build ideas into digital products</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline ml-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
