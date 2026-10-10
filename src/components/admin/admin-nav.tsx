"use client";

import { ExternalLink, FileText, FolderOpen, LayoutDashboard, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/cn";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  /** Sections not built yet are shown but not linked. */
  ready: boolean;
};

const items: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, ready: true },
  { label: "Insights", href: "/admin/articles", icon: FileText, ready: true },
  { label: "Case Studies", href: "/admin/case-studies", icon: FolderOpen, ready: true },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail, ready: true },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export function AdminNav({ userName, logout }: { userName: string; logout: () => Promise<void> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav aria-label="Admin" className="flex flex-1 flex-col">
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {!item.ready && (
                <span className="rounded-xs bg-white/10 px-1.5 py-0.5 text-[0.6875rem] text-mist">
                  Soon
                </span>
              )}
            </>
          );
          const base = "flex min-h-11 items-center gap-3 rounded-xs px-3 text-[0.9375rem]";
          return (
            <li key={item.href}>
              {item.ready ? (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    base,
                    "transition-colors",
                    isActive(pathname, item.href)
                      ? "bg-white/10 text-white"
                      : "text-mist hover:bg-white/5 hover:text-white",
                  )}
                >
                  {content}
                </Link>
              ) : (
                <span aria-disabled="true" className={cn(base, "cursor-not-allowed text-mist/60")}>
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center gap-3 rounded-xs px-3 text-[0.9375rem] text-mist transition-colors hover:bg-white/5 hover:text-white"
        >
          <ExternalLink aria-hidden="true" strokeWidth={1.5} className="size-5" />
          View website
        </a>
        <p className="px-3 pt-3 text-sm text-mist">
          Signed in as <span className="text-white">{userName}</span>
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="min-h-11 w-full cursor-pointer rounded-xs px-3 text-left text-[0.9375rem] text-gold-400 transition-colors hover:bg-white/5"
          >
            Sign out
          </button>
        </form>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-navy-900 px-4 py-3 text-white lg:hidden">
        <span className="font-serif text-lg">SKRBC Admin</span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="admin-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 cursor-pointer place-items-center"
        >
          {open ? (
            <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
          ) : (
            <Menu aria-hidden="true" strokeWidth={1.5} className="size-6" />
          )}
        </button>
      </div>
      <div
        id="admin-mobile-nav"
        hidden={!open}
        className="flex min-h-[60dvh] flex-col bg-navy-900 px-4 pb-6 lg:hidden"
      >
        {nav}
      </div>

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col bg-navy-900 px-4 py-6 lg:flex">
        <p className="mb-8 px-3 font-serif text-xl text-white">
          SKRBC <span className="text-gold-500">Admin</span>
        </p>
        {nav}
      </aside>
    </>
  );
}
