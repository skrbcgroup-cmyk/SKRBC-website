"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in milliseconds, for gentle staggering of sibling blocks. */
  delay?: number;
  as?: "div" | "section" | "ul" | "ol" | "li" | "article";
};

/**
 * Fades content up once when it scrolls into view.
 * Content is rendered visible on the server; it is only hidden after hydration
 * if it starts below the fold, so nothing is lost without JavaScript.
 * Sets data-reveal="shown" when visible, which children can style against.
 */
export function Reveal({ children, className, delay, as = "div" }: RevealProps) {
  // Every allowed tag is a plain HTMLElement; typing it as a div keeps the ref simple.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyVisible = el.getBoundingClientRect().top < window.innerHeight * 0.9;
    if (reduceMotion || alreadyVisible) {
      el.dataset.reveal = "shown";
      return;
    }

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        el.dataset.reveal = "shown";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
