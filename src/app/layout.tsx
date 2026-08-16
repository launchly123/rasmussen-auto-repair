import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { business, siteUrl } from "@/lib/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { RevealObserver } from "@/components/RevealObserver";
import { CmsOverrides } from "@/components/CmsOverrides";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

// Grotesk for UI and headings; a transitional serif for the archival moments;
// a technical mono for spec labels. All self-hosted and subset by next/font.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

const title = "Rasmussen Auto Repair | Family-Owned Auto Repair in Fresno, CA";
const description =
  "Family-owned auto repair in Fresno, California since 1967. Honest diagnostics, brake repair, maintenance, smog, diesel and fleet service for American, Japanese and European vehicles. 1023 N Maple Ave — (559) 251-0669.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description,
  keywords: [
    "auto repair Fresno",
    "auto repair shop Fresno CA",
    "mechanic Fresno",
    "brake repair Fresno",
    "auto diagnostics Fresno",
    "smog inspection Fresno",
    "family-owned auto repair Fresno",
    "diesel repair Fresno",
    "fleet service Fresno",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: business.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Fresno",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1011",
  colorScheme: "dark",
};

/**
 * Enables the concealed state for scroll reveals — and only when the reveal is
 * certain to be able to run to completion. A tab that loads in the background
 * never gets this class, so an unfinished entrance animation can never leave
 * the page blank. Runs before first paint.
 */
const REVEAL_GATE = `(function(){try{
if(document.visibilityState!=='visible')return;
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.documentElement.classList.add('js-reveal');
}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_GATE }} />
        <StructuredData />
      </head>
      <body>
        {/*
          The Agency Console's visual editor loads this site inside an iframe
          served from ITS OWN origin (cms-omega-seven.vercel.app), then injects
          a <base href="https://this-site.vercel.app/"> so relative asset URLs
          resolve against us instead of the console. Next's App Router calls
          history.replaceState() with a relative URL during hydration; the
          browser resolves that URL through <base> (giving our origin) but
          validates it against the document's REAL origin (the console's — it
          served the bytes). The mismatch throws an uncaught SecurityError that
          kills hydration before the console's postMessage "ready" handshake
          fires, so the editor times out on "This page couldn't load".

          strategy="beforeInteractive" is required, not afterInteractive: this
          must patch history before Next's own router runtime touches it.

          This affects every Next.js App Router site connected to this console,
          not just this one.
        */}
        <Script id="cms-iframe-history-guard" strategy="beforeInteractive">
          {`
            (function () {
              if (window.self === window.top) return; // not embedded — leave History alone
              ["pushState", "replaceState"].forEach(function (fn) {
                var original = window.history[fn];
                window.history[fn] = function () {
                  try {
                    return original.apply(this, arguments);
                  } catch (e) {
                    if (e instanceof DOMException && e.name === "SecurityError") return;
                    throw e;
                  }
                };
              });
            })();
          `}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-red focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <RevealObserver />
        <CmsOverrides />
      </body>
    </html>
  );
}
