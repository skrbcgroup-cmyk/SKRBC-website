import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { routes } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SK Risk & Business Consulting collects, uses and protects information from website visitors and contact form submissions.",
};

const { contact, legalName } = siteConfig;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    content: (
      <>
        <p>
          This website is operated by {legalName} (&quot;SKRBC&quot;, &quot;we&quot;,
          &quot;us&quot;), a consulting company based in {contact.location}.
        </p>
        <p>
          This policy explains what information we collect when you visit this website or contact
          us, how we use it and the choices you have. If you have any questions, please contact us
          using the details at the end of this page.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    content: (
      <>
        <p>
          <strong>Information you give us.</strong> When you submit the contact form, we collect the
          details you enter:
        </p>
        <ul>
          <li>Full name and company name</li>
          <li>Email address and phone number</li>
          <li>The service you are interested in and your message</li>
          <li>Your preferred contact method and best time to contact you, if you provide them</li>
        </ul>
        <p>
          If you contact us by email or WhatsApp, we receive the information you choose to share in
          that message.
        </p>
        <p>
          <strong>Information collected automatically.</strong> When you visit the website, basic
          technical information such as your IP address, browser type, device type and the pages you
          visit may be recorded by our hosting provider for security and performance, and by
          analytics tools if they are in use.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How we use information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiry and discuss your requirements</li>
          <li>Prepare proposals and provide our consulting services</li>
          <li>Understand how the website is used so we can improve it</li>
          <li>Keep the website secure and protect it from spam and misuse</li>
          <li>Meet our legal and regulatory obligations</li>
        </ul>
        <p>We do not sell your personal information or share it for marketing by others.</p>
      </>
    ),
  },
  {
    id: "cookies-and-analytics",
    title: "Cookies and analytics",
    content: (
      <>
        <p>
          The website does not use advertising cookies. We may use Google Analytics to understand,
          in general terms, how visitors find and use the website. Google Analytics uses cookies to
          collect this information.
        </p>
        <p>
          The contact form may be protected by a spam-prevention service that checks whether a
          submission comes from a real person. This service may process technical information about
          your browser and device.
        </p>
        <p>
          You can block or delete cookies through your browser settings. The website will still
          work, although some features may not.
        </p>
      </>
    ),
  },
  {
    id: "service-providers",
    title: "Service providers",
    content: (
      <>
        <p>
          We use trusted service providers to run the website and handle inquiries. They process
          information on our behalf and only for the purposes described in this policy:
        </p>
        <ul>
          <li>Cloudflare, for website hosting, security and data storage</li>
          <li>An email service provider, to deliver contact form notifications to us</li>
          <li>Google Analytics, for website usage statistics</li>
        </ul>
        <p>
          If you choose to message us on WhatsApp, your conversation is also subject to
          WhatsApp&apos;s own privacy policy.
        </p>
      </>
    ),
  },
  {
    id: "how-long-we-keep-information",
    title: "How long we keep information",
    content: (
      <p>
        We keep inquiry information only for as long as we need it to respond to you, provide our
        services and maintain proper business records. After that, it is deleted or anonymised.
      </p>
    ),
  },
  {
    id: "how-we-protect-information",
    title: "How we protect information",
    content: (
      <p>
        The website uses an encrypted connection (HTTPS), and access to inquiry information is
        limited to the people who need it. We take reasonable steps to protect the information we
        hold, but no method of transmission or storage is completely secure.
      </p>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    content: (
      <p>
        You can ask us what personal information we hold about you, ask us to correct it, or ask us
        to delete it. To make a request, email us at{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>. We will respond within a reasonable
        time.
      </p>
    ),
  },
  {
    id: "other-websites",
    title: "Links to other websites",
    content: (
      <p>
        The website may link to other websites and services, such as WhatsApp. We are not
        responsible for the content or privacy practices of those websites, and we encourage you to
        read their privacy policies.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy from time to time. The latest version will always be on this page,
        with the date it was last updated shown at the top.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    content: (
      <>
        <p>For any questions about this policy or your information, please contact:</p>
        <p>
          {legalName}
          <br />
          {contact.location}
          <br />
          Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <br />
          WhatsApp: <a href={contact.whatsapp.link}>{contact.whatsapp.display}</a>
        </p>
        <p>
          You can also reach us through our <Link href={routes.contact}>contact page</Link>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lead="How we collect, use and protect information from website visitors and people who contact us."
      lastUpdated="10 October 2026"
      sections={sections}
    />
  );
}
