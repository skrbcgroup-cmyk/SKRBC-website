import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "gold" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  gold: "bg-gold-500 text-navy-900 hover:bg-gold-400",
  "outline-light": "border border-white/45 text-white hover:border-gold-500 hover:text-gold-400",
  "outline-dark":
    "border border-navy-900/30 text-navy-900 hover:border-navy-900 hover:bg-navy-900 hover:text-white",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** Shows a trailing arrow that nudges on hover. */
  arrow?: boolean;
  /** Opens in a new tab, for external links such as WhatsApp. */
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "gold",
  arrow = false,
  external = false,
  className,
}: ButtonLinkProps) {
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xs px-6 text-[0.9375rem] font-medium tracking-[0.01em] transition-colors duration-200",
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={1.75}
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
