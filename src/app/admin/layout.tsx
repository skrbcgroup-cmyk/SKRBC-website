import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | SKRBC Admin" },
  robots: { index: false, follow: false },
};

/** Every admin page is rendered per request and kept out of search engines. */
export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return <div className="flex min-h-dvh flex-col bg-ivory">{children}</div>;
}
