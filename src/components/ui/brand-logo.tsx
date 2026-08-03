import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export function BrandLogo({ size = "md", showText = true, className }: BrandLogoProps) {
  const sizeMap = {
    sm: "h-8 w-8", // 32px (Mobile navigation)
    md: "h-10 w-10", // 40px (Header/Footer)
    lg: "h-12 w-12", // 48px (Authentication)
    xl: "h-16 w-16", // 64px (Loading screens)
  };

  const textSizeMap = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2 outline-none transition-all duration-200 hover:brightness-110 group", 
        className
      )}
    >
      <div className={cn("relative flex items-center justify-center overflow-hidden", sizeMap[size])}>
        <img
          src="/favicon1.png"
          alt="SyncRole Logo"
          decoding="async"
          className="absolute inset-0 w-full h-full object-contain scale-[1.35]"
        />
      </div>
      
      {showText && (
        <span className={cn("font-display font-extrabold tracking-tight text-foreground", textSizeMap[size])}>
          SyncRole
        </span>
      )}
    </Link>
  );
}
