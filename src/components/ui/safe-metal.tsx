import { useEffect, useState, ComponentProps } from "react";
import { MetalFx, MetalBadge } from "metal-fx";

export function SafeMetalFx({ children, ...props }: ComponentProps<typeof MetalFx>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <MetalFx {...props}>{children}</MetalFx>;
}

export function SafeMetalBadge({ children, ...props }: ComponentProps<typeof MetalBadge>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
        {children}
      </span>
    );
  }

  return <MetalBadge {...props}>{children}</MetalBadge>;
}
