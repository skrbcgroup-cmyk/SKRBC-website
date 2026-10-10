import { QuickContact } from "@/components/layout/quick-contact";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

/** Public website chrome: header, footer and quick-contact buttons. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-24 rounded-xs bg-gold-500 px-4 py-3 text-sm font-medium text-navy-900 focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <QuickContact />
      {/* Keeps the footer clear of the fixed mobile contact bar. */}
      <div
        aria-hidden="true"
        className="h-[calc(4rem+env(safe-area-inset-bottom))] bg-navy-950 md:hidden"
      />
    </>
  );
}
