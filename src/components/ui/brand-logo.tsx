import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "dark" | "light" | "auto";
  className?: string;
}

export function BrandLogo({
  size = "md",
  showText = true,
  variant = "dark",
  className,
}: BrandLogoProps) {
  const sizeMap = {
    sm: "h-7 w-7 rounded-lg",
    md: "h-9 w-9 rounded-xl",
    lg: "h-11 w-11 rounded-2xl",
    xl: "h-14 w-14 rounded-2xl",
  };

  const textSizeMap = {
    sm: "text-base tracking-tight",
    md: "text-lg sm:text-xl tracking-tight",
    lg: "text-2xl tracking-tight",
    xl: "text-3xl tracking-tight",
  };

  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-center gap-2.5 outline-none transition-all duration-200 group shrink-0 active:scale-[0.98] select-none",
        className
      )}
    >
      {/* Logo Icon Container with subtle glass depth & crisp scaling */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden shrink-0 bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 p-1 shadow-xs transition-transform duration-300 group-hover:scale-105",
          sizeMap[size]
        )}
      >
        <img
          src="/favicon1.png"
          alt="SyncRole Logo"
          decoding="async"
          className="w-full h-full object-contain scale-[1.3] group-hover:rotate-[3deg] transition-transform duration-300"
        />
      </div>

      {/* Brand Wordmark with sleek typography */}
      {showText && (
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "font-display font-extrabold leading-none tracking-tight",
              textSizeMap[size]
            )}
          >
            <span className={variant === "light" ? "text-white" : "text-slate-900"}>
              Sync
            </span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent font-extrabold ml-[1px]">
              Role
            </span>
          </span>
        </div>
      )}
    </Link>
  );
}
