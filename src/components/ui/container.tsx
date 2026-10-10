import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Centered page width with the site's side gutters. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-site px-4 sm:px-6", className)}>{children}</div>;
}
