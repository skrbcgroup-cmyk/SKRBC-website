import { siteConfig } from "@/config/site";

// Temporary placeholder — replaced by the real homepage in Phase 2.
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">{siteConfig.name}</h1>
      <p className="text-lg text-neutral-600">{siteConfig.tagline}</p>
    </main>
  );
}
