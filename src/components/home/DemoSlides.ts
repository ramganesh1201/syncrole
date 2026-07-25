import {
  LayoutDashboard,
  Target,
  Code2,
  Brain,
  FileText,
  FileCheck,
  Github,
  CheckCircle,
  Users
} from "lucide-react";

export type DemoSlide = {
  id: string;
  title: string;
  description: string;
  icon: any;
};

export const demoSlides: DemoSlide[] = [
  {
    id: "dashboard",
    title: "AI Dashboard",
    description: "Get a comprehensive view of your career readiness with real-time analytics and predictive scoring.",
    icon: LayoutDashboard,
  },
  {
    id: "placement",
    title: "Placement Readiness",
    description: "Track your progress towards internship and full-time role requirements based on industry standards.",
    icon: Target,
  },
  {
    id: "dsa",
    title: "DSA Tracker",
    description: "Master algorithms with a structured roadmap. Track solved problems, patterns, and time complexity.",
    icon: Code2,
  },
  {
    id: "coach",
    title: "AI Coding Coach",
    description: "Stuck on a bug? Your personal AI mentor provides hints and code reviews without giving away the answer.",
    icon: Brain,
  },
  {
    id: "resume",
    title: "Resume Analyzer",
    description: "Upload your resume for instant AI feedback on layout, impact, and missing critical keywords.",
    icon: FileText,
  },
  {
    id: "ats",
    title: "ATS Score",
    description: "Simulate how Applicant Tracking Systems see your resume. Optimize for maximum visibility to recruiters.",
    icon: FileCheck,
  },
  {
    id: "github",
    title: "GitHub Intelligence",
    description: "Connect your GitHub to automatically showcase your coding languages, commit consistency, and open source impact.",
    icon: Github,
  },
  {
    id: "missions",
    title: "Daily Missions",
    description: "Stay consistent with AI-generated daily coding challenges and tasks that boost your placement score.",
    icon: CheckCircle,
  },
  {
    id: "recruiter",
    title: "Recruiter View",
    description: "Flip the switch and see exactly how a hiring manager views your profile, projects, and readiness.",
    icon: Users,
  },
];
