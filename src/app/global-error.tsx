"use client";

import { siteConfig } from "@/config/site";

/**
 * Last-resort error page, used only if the root layout itself fails.
 * It replaces the whole document, so it uses plain inline styles.
 */
export default function GlobalError({ retry }: { error: Error; retry: () => void }) {
  return (
    <html lang={siteConfig.locale}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "24px",
          background: "#0f1c2e",
          color: "#ffffff",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
        }}
      >
        <title>Something went wrong | SKRBC</title>
        <main style={{ maxWidth: "36rem" }}>
          <p style={{ color: "#c9a253", letterSpacing: "0.16em", fontSize: "12px" }}>
            {siteConfig.name.toUpperCase()}
          </p>
          <h1 style={{ fontSize: "40px", fontWeight: 500, lineHeight: 1.1, margin: "16px 0" }}>
            Something went wrong.
          </h1>
          <p style={{ color: "#a9b3bf", fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
            Please try again. If the problem continues, message us on WhatsApp at{" "}
            <a href={siteConfig.contact.whatsapp.link} style={{ color: "#d8b469" }}>
              {siteConfig.contact.whatsapp.display}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "24px",
              minHeight: "48px",
              padding: "0 24px",
              border: 0,
              borderRadius: "2px",
              background: "#c9a253",
              color: "#0f1c2e",
              fontSize: "15px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
