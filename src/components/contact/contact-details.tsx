import { Mail, MapPin } from "lucide-react";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { siteConfig } from "@/config/site";
import { engagementSteps } from "@/content/services";

const { contact, legalName } = siteConfig;

/** Company details, the WhatsApp button and what happens after getting in touch. */
export function ContactDetails() {
  return (
    <div className="space-y-6">
      <div className="bg-navy-900 p-8 text-white sm:p-10">
        <h2 className="text-2xl">Contact details</h2>
        <p className="mt-2 text-[0.9375rem] text-mist">{legalName}</p>

        <ul className="mt-8 space-y-5 text-[0.9375rem]">
          <li className="flex gap-4">
            <MapPin
              aria-hidden="true"
              strokeWidth={1.5}
              className="mt-0.5 size-5 shrink-0 text-gold-500"
            />
            <span>
              <span className="block text-xs font-semibold tracking-[0.16em] text-mist uppercase">
                Location
              </span>
              {contact.location}
            </span>
          </li>
          <li className="flex gap-4">
            <Mail
              aria-hidden="true"
              strokeWidth={1.5}
              className="mt-0.5 size-5 shrink-0 text-gold-500"
            />
            <span>
              <span className="block text-xs font-semibold tracking-[0.16em] text-mist uppercase">
                Email
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="break-all underline-offset-4 hover:text-gold-400 hover:underline"
              >
                {contact.email}
              </a>
            </span>
          </li>
          <li className="flex gap-4">
            <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-gold-500" />
            <span>
              <span className="block text-xs font-semibold tracking-[0.16em] text-mist uppercase">
                Phone (WhatsApp only)
              </span>
              <a
                href={contact.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-gold-400 hover:underline"
              >
                {contact.whatsapp.display}
              </a>
            </span>
          </li>
        </ul>

        <a
          href={contact.whatsapp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 flex min-h-13 items-center justify-center gap-3 rounded-xs bg-whatsapp px-6 font-medium text-navy-950 transition-[filter] hover:brightness-95"
        >
          <WhatsAppIcon className="size-5" />
          Chat With Us on WhatsApp
        </a>
        <p className="mt-3 text-center text-sm text-mist">
          This number is for WhatsApp messages only.
        </p>
      </div>

      <div className="border border-line p-8 sm:p-10">
        <h2 className="text-2xl text-navy-900">What happens next</h2>
        <ol className="mt-6 space-y-4">
          {engagementSteps.map((step, index) => (
            <li key={step} className="grid grid-cols-[2.25rem_1fr] text-[0.9375rem] text-ink">
              <span aria-hidden="true" className="font-serif text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
