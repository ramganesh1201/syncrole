import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base: blue-tinted surface, clear border, navy text
          "flex h-9 w-full rounded-lg border border-[#E3E9F4] bg-[#F5F7FC] px-3 py-2 text-sm text-[#17233F] shadow-xs",
          // Placeholder
          "placeholder:text-[#8FA3C8]",
          // File input reset
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#17233F]",
          // Focus: blue ring
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457E6] focus-visible:ring-offset-0 focus-visible:border-[#2457E6]",
          // Transitions
          "transition-[border-color,box-shadow] duration-150",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#EEF2FB]",
          // Responsive
          "md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
