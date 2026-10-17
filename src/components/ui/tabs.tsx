import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Container: blue-tinted muted background, tighter height
      "inline-flex h-10 items-center justify-center rounded-xl bg-[#EEF2FB] p-1 text-[#6B7799]",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base trigger
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-medium cursor-pointer select-none",
      "ring-offset-background transition-all duration-150",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457E6] focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
      // Active state: white surface, primary blue text, subtle shadow
      "data-[state=active]:bg-white data-[state=active]:text-[#2457E6] data-[state=active]:shadow-sm data-[state=active]:font-semibold",
      // Inactive hover
      "hover:text-[#374166]",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2457E6] focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
