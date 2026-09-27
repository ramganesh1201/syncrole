import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "dark" | "light" | "auto";
  className?: string;
}

export function BrandLogo({ size = "md", showText = true, variant = "dark", className }: BrandLogoProps) {
  const sizeMap = {
    sm: "h-7 w-7", // 28px
    md: "h-9 w-9", // 36px
    lg: "h-11 w-11", // 44px
    xl: "h-14 w-14", // 56px
  };

  const textSizeMap = {
    sm: "text-base font-bold",
    md: "text-xl font-extrabold",
    lg: "text-2xl font-extrabold",
    xl: "text-3xl font-extrabold",
  };

  const colorMap = {
    dark: "text-slate-900",
    light: "text-white",
    auto: "text-slate-900 dark:text-white",
  };

  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2.5 outline-none transition-all duration-200 hover:opacity-90 group shrink-0", 
        className
      )}
    >
      <div className={cn("relative flex items-center justify-center overflow-hidden shrink-0", sizeMap[size])}>
        <img
          src="/favicon1.png"
          alt="SyncRole Logo"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain scale-[1.35]"
        />
      </div>
      
      {showText && (
        <span className={cn("font-display tracking-tight leading-none select-none", colorMap[variant], textSizeMap[size])}>
          SyncRole
        </span>
      )}
    </Link>
  );
}
