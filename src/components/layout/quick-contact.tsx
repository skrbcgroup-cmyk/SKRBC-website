import { Mail, MessageSquareText } from "lucide-react";
import Link from "next/link";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";

const { email, whatsapp } = siteConfig.contact;

/**
 * Desktop: floating WhatsApp button.
 * Mobile: a fixed bar with WhatsApp, Email and the contact form (spec section 20).
 * The phone number is WhatsApp only, so there is no call button.
 */
export function QuickContact() {
  return (
    <>
      <a
        href={whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-6 bottom-6 z-40 hidden size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_8px_24px_-6px_rgb(0_0_0/0.35)] transition-transform duration-200 hover:-translate-y-0.5 md:grid"
      >
        <WhatsAppIcon className="size-7" />
      </a>

      <nav
        aria-label="Quick contact"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900 pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="grid grid-cols-3 text-xs font-medium text-white">
          <li>
            <a
              href={whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-16 flex-col items-center justify-center gap-1"
            >
              <WhatsAppIcon className="size-5 text-whatsapp" />
              WhatsApp
            </a>
          </li>
          <li className="border-x border-white/10">
            <a
              href={`mailto:${email}`}
              className="flex h-16 flex-col items-center justify-center gap-1"
            >
              <Mail aria-hidden="true" strokeWidth={1.5} className="size-5 text-gold-500" />
              Email
            </a>
          </li>
          <li>
            <Link
              href={routes.contact}
              className="flex h-16 flex-col items-center justify-center gap-1"
            >
              <MessageSquareText
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-5 text-gold-500"
              />
              Contact Form
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
