import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base: consistent height, padding, typography, focus ring, transitions
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold cursor-pointer select-none transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457E6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97]",
  {
    variants: {
      variant: {
        // Primary — SyncRole blue, clear action hierarchy
        default:
          "bg-[#2457E6] text-white shadow-sm hover:bg-[#1e4acf] hover:shadow-md hover:shadow-[#2457E6]/20 active:bg-[#1940b8]",

        // Destructive — rose red
        destructive:
          "bg-[#DC2626] text-white shadow-sm hover:bg-[#b91c1c] hover:shadow-md hover:shadow-[#DC2626]/20",

        // Outline — border + transparent bg
        outline:
          "border border-[#E3E9F4] bg-white text-[#374166] shadow-xs hover:bg-[#EEF2FB] hover:border-[#2457E6]/30 hover:text-[#17233F]",

        // Secondary — subtle blue-tinted fill
        secondary:
          "bg-[#EEF2FB] text-[#2457E6] shadow-xs hover:bg-[#dde5f7] hover:text-[#1940b8]",

        // Ghost — minimal, for less prominent actions
        ghost:
          "text-[#374166] hover:bg-[#EEF2FB] hover:text-[#17233F]",

        // Link — underline style
        link:
          "text-[#2457E6] underline-offset-4 hover:underline hover:text-[#1940b8] shadow-none",

        // Success — teal confirm states
        success:
          "bg-[#0F766E] text-white shadow-sm hover:bg-[#0d6460] hover:shadow-md hover:shadow-[#0F766E]/20",

        // Navy — strong dark call-to-action
        navy:
          "bg-[#17233F] text-white shadow-sm hover:bg-[#1f2f52] hover:shadow-md hover:shadow-[#17233F]/25",
      },
      size: {
        sm:      "h-8  px-3   text-xs  rounded-md gap-1.5",
        default: "h-9  px-4   py-2",
        lg:      "h-10 px-6   text-sm",
        xl:      "h-11 px-8   text-base",
        icon:    "h-9  w-9    rounded-lg",
        "icon-sm": "h-8 w-8   rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
