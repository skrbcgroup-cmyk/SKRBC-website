import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Container } from "@/components/ui/container";
import { footerNav, routes, type NavLink } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/content/images.generated";

function FooterLinks({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div>
      <h2 className="mb-5 font-sans text-xs font-semibold tracking-[0.16em] text-white uppercase">
        {title}
      </h2>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-flex min-h-9 items-center transition-colors hover:text-gold-400"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { contact, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-[0.9375rem] text-mist">
      <Container>
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
          <div className="max-w-sm">
            <Link href={routes.home} className="inline-block">
              <Image
                {...siteImages.logoHorizontalOnDark}
                alt={siteConfig.name}
                sizes="240px"
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-6 font-serif text-xl text-white">{siteConfig.tagline}</p>
            <p className="mt-3 leading-relaxed">{siteConfig.positioning}</p>
          </div>

          <FooterLinks title="Quick Links" links={footerNav.quickLinks} />
          <FooterLinks title="Services" links={footerNav.services} />

          <div>
            <h2 className="mb-5 font-sans text-xs font-semibold tracking-[0.16em] text-white uppercase">
              Contact
            </h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-gold-400"
                >
                  <Mail
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-4 shrink-0 text-gold-500"
                  />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors hover:text-gold-400"
                >
                  <WhatsAppIcon className="size-4 shrink-0 text-gold-500" />
                  WhatsApp {contact.whatsapp.display}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4 shrink-0 text-gold-500"
                />
                {contact.location}
              </li>
            </ul>
            {social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-gold-400"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="flex flex-wrap gap-y-2 border-t border-white/10 py-6 text-sm text-white/85">
          {siteConfig.credibility.map((item, index) => (
            <span key={item} className="flex items-center">
              {index > 0 && <span aria-hidden="true" className="mx-4 h-3.5 w-px bg-gold-500" />}
              {item}
            </span>
          ))}
        </p>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
