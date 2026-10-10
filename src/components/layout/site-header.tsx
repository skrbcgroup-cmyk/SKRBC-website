"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { Container } from "@/components/ui/container";
import { mainNav, routes, serviceNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/content/images.generated";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Transparent over the dark page hero, solid navy once the page scrolls.
 * Every page starts with a navy hero, so the white logo and links always read well.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesMenuId = useId();
  const mobileMenuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Stop the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-300",
        solid ? "bg-navy-900 py-3 shadow-[0_1px_0_rgb(255_255_255/0.08)]" : "py-5",
      )}
    >
      <Container className="flex items-center justify-between gap-6">
        <Link href={routes.home} onClick={closeMenus} className="shrink-0">
          <Image
            {...siteImages.logoHorizontalOnDark}
            alt={siteConfig.name}
            loading="eager"
            sizes="260px"
            className={cn(
              "w-auto transition-[height] duration-300",
              solid ? "h-10 sm:h-11" : "h-11 sm:h-13",
            )}
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              const linkClass = cn(
                "relative py-2 text-[0.9375rem] font-medium transition-colors",
                "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-gold-500 after:transition-transform after:duration-300",
                active
                  ? "text-white after:scale-x-100"
                  : "text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100",
              );

              if (item.href !== routes.services) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={linkClass}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.href}
                  className="group relative flex items-center gap-1"
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={linkClass}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls={servicesMenuId}
                    aria-label="Show service pages"
                    onClick={() => setServicesOpen((open) => !open)}
                    className="-mr-2 grid size-8 cursor-pointer place-items-center text-white/80 hover:text-white"
                  >
                    <ChevronDown
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className={cn(
                        "size-4 transition-transform duration-200 group-hover:rotate-180",
                        servicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    id={servicesMenuId}
                    className={cn(
                      "absolute top-full left-1/2 w-80 -translate-x-1/2 pt-4 transition-[opacity,visibility,translate] duration-200",
                      "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
                      servicesOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-1 opacity-0",
                    )}
                  >
                    <ul className="border-t-2 border-gold-500 bg-white py-2 shadow-[0_18px_40px_-12px_rgb(10_20_34/0.35)]">
                      {serviceNav.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={closeMenus}
                            className="block px-5 py-3 text-[0.9375rem] text-ink transition-colors hover:bg-ivory hover:text-navy-900"
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                      <li className="mt-1 border-t border-line">
                        <Link
                          href={routes.services}
                          onClick={closeMenus}
                          className="block px-5 py-3 text-sm font-medium text-gold-700 hover:bg-ivory"
                        >
                          View all services
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={routes.contact}
            className="hidden min-h-11 items-center rounded-xs bg-gold-500 px-5 text-sm font-medium text-navy-900 transition-colors hover:bg-gold-400 xl:inline-flex"
          >
            Speak With a Consultant
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={mobileMenuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="-mr-2 grid size-11 cursor-pointer place-items-center text-white lg:hidden"
          >
            {menuOpen ? (
              <X aria-hidden="true" strokeWidth={1.5} className="size-6" />
            ) : (
              <Menu aria-hidden="true" strokeWidth={1.5} className="size-6" />
            )}
          </button>
        </div>
      </Container>

      <div
        id={mobileMenuId}
        hidden={!menuOpen}
        className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto border-t border-white/10 bg-navy-900 lg:hidden"
      >
        <Container className="flex min-h-full flex-col py-6">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-white/10">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center font-serif text-2xl text-white aria-[current=page]:text-gold-400"
                  >
                    {item.label}
                  </Link>
                  {item.href === routes.services && (
                    <ul className="pb-4">
                      {serviceNav.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            onClick={closeMenus}
                            className="flex min-h-11 items-center border-l border-gold-500/50 pl-4 text-[0.9375rem] text-mist hover:text-white"
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-8">
            <Link
              href={routes.contact}
              onClick={closeMenus}
              className="flex min-h-12 items-center justify-center rounded-xs bg-gold-500 px-6 font-medium text-navy-900"
            >
              Speak With a Consultant
            </Link>
            <p className="mt-6 text-sm text-mist">
              {siteConfig.contact.email}
              <br />
              WhatsApp {siteConfig.contact.whatsapp.display}
            </p>
          </div>
        </Container>
      </div>
    </header>
  );
}
