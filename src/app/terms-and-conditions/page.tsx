import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The general terms that govern the use of the SK Risk & Business Consulting website.",
};

const { contact, legalName } = siteConfig;

const sections: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    content: (
      <>
        <p>
          These terms govern your use of this website, which is operated by {legalName}{" "}
          (&quot;SKRBC&quot;, &quot;we&quot;, &quot;us&quot;), a consulting company based in{" "}
          {contact.location}.
        </p>
        <p>
          By using the website, you agree to these terms. If you do not agree with them, please do
          not use the website.
        </p>
      </>
    ),
  },
  {
    id: "use-of-the-website",
    title: "Use of the website",
    content: (
      <>
        <p>You may use the website for lawful purposes only. You agree not to:</p>
        <ul>
          <li>Use the website in a way that breaks any law or regulation</li>
          <li>Attempt to gain unauthorised access to the website or its systems</li>
          <li>Send spam, harmful code or misleading information through the website</li>
          <li>Interfere with the website&apos;s security or normal operation</li>
        </ul>
      </>
    ),
  },
  {
    id: "general-information-only",
    title: "General information only",
    content: (
      <>
        <p>
          The content on this website, including articles and insights, is provided for general
          information only. It is not professional advice for your particular situation and should
          not be relied on as such.
        </p>
        <p>
          Advice from SKRBC is provided only as part of a consulting engagement, based on a review
          of your circumstances.
        </p>
      </>
    ),
  },
  {
    id: "our-services",
    title: "Our services",
    content: (
      <>
        <p>
          SKRBC provides consulting and advisory services. The scope, fees and terms of any
          engagement are set out in a separate written proposal or agreement, which takes priority
          over anything on this website.
        </p>
        <p>
          SKRBC is not an insurance company, an insurance broker or a licensed adjuster, and does
          not sell insurance or settle claims. SKRBC does not provide guarding or manned security
          services.
        </p>
      </>
    ),
  },
  {
    id: "contacting-us",
    title: "Contacting us through the website",
    content: (
      <>
        <p>
          Sending an inquiry through the contact form, by email or on WhatsApp does not create a
          client relationship. A relationship begins only when an engagement is agreed in writing.
        </p>
        <p>
          Please do not send confidential or sensitive information through the contact form. We can
          arrange a suitable way to share such information once an engagement is agreed.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    content: (
      <p>
        The SKRBC name, logo, text and design of this website belong to SKRBC or are used with
        permission. You may view and print pages for your own reference, but you may not copy,
        reproduce or reuse the content for commercial purposes without our written consent.
      </p>
    ),
  },
  {
    id: "other-websites",
    title: "Links to other websites",
    content: (
      <p>
        The website may link to websites and services run by others, such as WhatsApp. We do not
        control those websites and are not responsible for their content, availability or practices.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        We take care to keep the website accurate and available, but we do not guarantee that it
        will always be complete, current or free from interruption. To the extent permitted by law,
        SKRBC is not liable for any loss arising from the use of this website or from reliance on
        its general information.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    content: (
      <p>
        Our <Link href={routes.privacy}>Privacy Policy</Link> explains how we handle information
        from website visitors and people who contact us.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    content: <p>These terms are governed by the laws of Pakistan.</p>,
  },
  {
    id: "changes",
    title: "Changes to these terms",
    content: (
      <p>
        We may update these terms from time to time. The latest version will always be on this page,
        with the date it was last updated shown at the top. Continuing to use the website after a
        change means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>If you have any questions about these terms, please contact:</p>
        <p>
          {legalName}
          <br />
          {contact.location}
          <br />
          Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          WhatsApp: <a href={contact.whatsapp.link}>{contact.whatsapp.display}</a>
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lead="The general terms that govern the use of this website."
      lastUpdated="10 October 2026"
      sections={sections}
    />
  );
}
