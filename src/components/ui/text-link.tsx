import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Inline call-to-action link with an arrow, e.g. "Learn more". */
export function TextLink({ href, children, tone = "light", className }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium",
        tone === "light" ? "text-gold-700" : "text-gold-400",
        className,
      )}
    >
      <span className="border-b border-transparent transition-colors group-hover:border-current">
        {children}
      </span>
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        strokeWidth={1.75}
      />
    </Link>
  );
}
