import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { CartProvider } from "@/components/layout/CartProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HalftoneFooter } from "@/components/layout/HalftoneFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CursorEffect } from "@/components/layout/CursorEffect";
import { Preloader } from "@/components/layout/Preloader";
import { site } from "@/lib/content/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

// Typeheist Belmonte Ballpoint (Print) — self-hosted; used for the Roadblocks
// value headings on the homepage.
const belmonte = localFont({
  src: "./fonts/BelmonteBallpointPrint.woff2",
  variable: "--font-belmonte-face",
  weight: "400",
  display: "swap",
});

// GC Godthem — self-hosted; used for the homepage hero headline.
const godthem = localFont({
  src: "./fonts/GcGodthem.woff2",
  variable: "--font-godthem-face",
  weight: "400",
  display: "swap",
});

const title = `${site.name} | Creative Communications & Media Production in Sierra Leone`;
const ogImage = {
  url: "/hero-freetown-poster.jpg",
  width: 1920,
  height: 1080,
  alt: site.name,
};

const description =
  "The Media Foundry is a creative communications and media production company in Sierra Leone, helping organisations and brands tell meaningful stories through strategy, film, photography and visual storytelling.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};

// Organization structured data — read by Google as an unambiguous "this
// entity exists, here's what it does and where" signal, independent of how
// well any single page's copy happens to be worded.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/icon.png`,
  description: site.description,
  email: site.email,
  areaServed: "Sierra Leone",
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Freetown",
      addressCountry: "SL",
    },
  },
  knowsAbout: [
    "Strategic communications",
    "Creative direction",
    "Institutional storytelling",
    "Documentary production",
    "Corporate and brand films",
    "Campaign production",
    "Photography",
    "Podcast and interview production",
  ],
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${belmonte.variable} ${godthem.variable} ${instrumentSans.variable}`}
    >
      <head>
        {/* October = Breast Cancer Awareness Month. Runs before first paint so
            there's no blue flash; uses the visitor's own date, so it turns
            itself off on 1 November with no redeploy. ?pink=1 / ?pink=0
            force it on/off for previewing. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var q=new URLSearchParams(location.search).get('pink');if(q==='1'||q==='0')sessionStorage.setItem('mf-pink',q);var o=sessionStorage.getItem('mf-pink');if(o==='1'||(o!=='0'&&new Date().getMonth()===9))document.documentElement.setAttribute('data-awareness','pink')}catch(e){}})()",
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CartProvider>
              <Preloader />
              <SmoothScroll />
              <CursorEffect />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <HalftoneFooter />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
