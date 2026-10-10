import { z } from "zod";

import { services } from "@/content/services";

/** Options for the "Service Required" field: every service area, plus a fallback. */
export const serviceOptions: readonly string[] = [
  ...services.map((service) => service.title),
  "Not sure yet",
];

export const contactMethodOptions = ["Email", "Phone call", "WhatsApp"] as const;
export const bestTimeOptions = ["Morning", "Afternoon", "Evening", "Any time"] as const;

/** Optional select: an empty string means "not chosen". */
const optionalChoice = <T extends readonly [string, ...string[]]>(options: T) =>
  z.union([z.enum(options), z.literal("")]);

/**
 * Contact form schema (spec section 14), shared by the browser and the server
 * so both always apply exactly the same rules.
 */
export const inquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { error: "Please enter your full name." })
    .max(100, { error: "Please keep your name under 100 characters." }),
  companyName: z
    .string()
    .trim()
    .min(2, { error: "Please enter your company name." })
    .max(150, { error: "Please keep the company name under 150 characters." }),
  email: z.email({ error: "Please enter a valid email address." }).trim().max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, {
      error: "Please enter a valid phone number, for example +92 300 1234567.",
    }),
  service: z.string().refine((value) => serviceOptions.includes(value), {
    error: "Please choose the service you need.",
  }),
  message: z
    .string()
    .trim()
    .min(20, { error: "Please tell us a little more (at least 20 characters)." })
    .max(3000, { error: "Please keep your message under 3,000 characters." }),
  contactMethod: optionalChoice(contactMethodOptions),
  bestTime: optionalChoice(bestTimeOptions),
  // Honeypot: hidden from people, often filled in by spam bots. Checked in the server action.
  website: z.string().max(200),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
