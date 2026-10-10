import type { Metadata } from "next";

import { ContactDetails } from "@/components/contact/contact-details";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SK Risk & Business Consulting in Rawalpindi for risk management, insurance and claims, business and security risk consulting. Send an inquiry or chat on WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your business."
        lead="Tell us about your situation and the support you need. Send an inquiry with the form, email us, or message us on WhatsApp."
      />
      <section className="py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div>
            <h2 className="text-[1.875rem] leading-tight text-navy-900 sm:text-4xl">
              Send an inquiry
            </h2>
            <p className="mt-3 mb-10 text-slate">
              Share a few details and we will get back to you to discuss how we can help.
            </p>
            <InquiryForm />
          </div>
          <ContactDetails />
        </Container>
      </section>
    </>
  );
}
