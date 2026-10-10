/**
 * Single source of truth for company details used across the site.
 * Update contact details here only, every page reads from this file.
 */

const whatsappNumber = "14036078664";

export const siteConfig = {
  name: "SK Risk & Business Consulting",
  shortName: "SKRBC",
  legalName: "SK Risk & Business Consulting (SMC-Private) Limited",
  tagline: "Risk. Strategy. Experience. Results.",
  positioning: "Canadian Experience. International Perspective. Practical Business Solutions.",
  credibility: ["Canadian Professional Experience", "International Perspective", "Pakistan"],
  description:
    "SK Risk & Business Consulting provides professional risk management, insurance & claims consulting, business advisory, operational consulting and security risk solutions.",
  locale: "en",
  contact: {
    // Temporary: replaced with the company-domain address once Zoho Mail is set up.
    email: "skrbcgroup@gmail.com",
    // The number is WhatsApp only, so the site never offers a normal call link for it.
    whatsapp: {
      display: "+1 403 607 8664",
      link: `https://wa.me/${whatsappNumber}`,
    },
    location: "Rawalpindi, Pakistan",
  },
  // Pending from client.
  social: [] as ReadonlyArray<{ label: string; href: string }>,
} as const;

export type SiteConfig = typeof siteConfig;
