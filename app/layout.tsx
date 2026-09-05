import type { Metadata } from "next";
import { Big_Shoulders, Instrument_Sans, Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import { CartProvider } from "@/components/layout/CartProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CursorEffect } from "@/components/layout/CursorEffect";
import { Preloader } from "@/components/layout/Preloader";
import { site } from "@/lib/content/site";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["700", "900"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
});

const title = `${site.name} — Creative Agency & Production Company`;
const ogImage = {
  url: "/hero-freetown-poster.jpg",
  width: 1920,
  height: 1080,
  alt: site.name,
};

export const metadata: Metadata = {
  title,
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
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
  logo: `${site.url}/logo-dark.png`,
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
    "Creative agency services",
    "Documentary production",
    "Brand strategy",
    "Brand identity design",
    "Film and video production",
    "Photography",
    "Podcast production",
    "Social and content campaigns",
    "Digital product development",
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
      className={`${bigShoulders.variable} ${instrumentSans.variable} ${inter.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <CartProvider>
              <Preloader />
              <CursorEffect />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
