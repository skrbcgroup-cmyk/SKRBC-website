import { notFound } from "next/navigation";

/**
 * Catches every URL that matches no page, so the branded 404 in (site)/not-found.tsx
 * renders inside the public header and footer.
 */
export default function UnknownPage() {
  notFound();
}
