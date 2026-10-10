import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  /** "light" for light backgrounds, "dark" for navy backgrounds. */
  tone?: "light" | "dark";
  className?: string;
};

/** Small uppercase label with a gold rule, placed above section headings. */
export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase",
        "before:h-px before:w-8 before:shrink-0 before:bg-current",
        tone === "light" ? "text-gold-700" : "text-gold-500",
        className,
      )}
    >
      {children}
    </p>
  );
}
