import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { SITE } from "@/data/site";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--f-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--f-body",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--f-serif",
  preload: false,
  display: "swap",
});

// Only used to resolve OG image URLs when no domain is configured. Canonical and sitemap still need NEXT_PUBLIC_SITE_URL.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const metadataFallbackOrigin = vercelHost ? `https://${vercelHost}` : "http://localhost:3000";

const title = `${SITE.name}: ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url ?? metadataFallbackOrigin),
  ...(SITE.url ? { alternates: { canonical: "/" } } : {}),
  title: { default: title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title,
    description: SITE.description,
    locale: "en",
  },
  twitter: { card: "summary_large_image", title, description: SITE.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0C",
  colorScheme: "dark",
};

const noscriptCss =
  "[data-reveal],[data-draw]{opacity:1!important;transform:none!important;clip-path:none!important}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <head>
        <noscript>
          <style>{noscriptCss}</style>
        </noscript>
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
