import { Outfit, Inter } from "next/font/google";
import ClientFooterWrapper from "../components/ClientFooterWrapper";
import "./globals.css";
import Script from "next/script";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elkaid.com";
const gaId =
  process.env.NEXT_PUBLIC_GA_ID || process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EL KAID | B1 Software, B2B Trade & Sourcing Coordination",
    template: "%s | EL KAID",
  },
  description:
    "EL KAID delivers next-generation ERP systems, smart B1 billing software, custom business websites, and India-to-GCC B2B sourcing coordination services.",
  applicationName: "EL KAID",
  keywords: [
    "B1 Software",
    "billing software",
    "bookkeeping software",
    "B2B trade coordination",
    "supplier sourcing India",
    "trade coordination GCC",
    "enterprise ERP software",
    "disaster recovery",
    "data center solutions",
    "business website development"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EL KAID",
    title: "EL KAID | B1 Software, B2B Sourcing and Digital Systems",
    description:
      "Proprietary B1 billing ecosystems and India-to-GCC B2B sourcing coordination services designed for transnational enterprises.",
    images: [
      {
        url: "/assets/hero-real.png",
        width: 1200,
        height: 630,
        alt: "EL KAID enterprise platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL KAID | B1 Software, B2B Sourcing and Digital Systems",
    description:
      "Proprietary B1 billing ecosystems and India-to-GCC B2B sourcing coordination services designed for transnational enterprises.",
    images: ["/assets/hero-real.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

import AnnouncementBar from "../components/AnnouncementBar";

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EL KAID",
    url: siteUrl,
    logo: `${siteUrl}/assets/hero-real.png`,
    email: "support@elkaid.com",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-81484-12764",
        contactType: "customer support",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [],
  };

  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased pt-8`}
        suppressHydrationWarning
      >
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <BreadcrumbJsonLd />
        <AnnouncementBar />
        {children}
        <ClientFooterWrapper />
      </body>
    </html>
  );
}
