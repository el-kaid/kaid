import { Geist, Geist_Mono } from "next/font/google";
import ClientFooterWrapper from "../components/ClientFooterWrapper";
import "./globals.css";
import Script from "next/script";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import GlobalCtaBar from "../components/GlobalCtaBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elkaid.com";
const gaId =
  process.env.NEXT_PUBLIC_GA_ID || process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EL KAID | ERP, Data Center and Disaster Recovery Solutions",
    template: "%s | EL KAID",
  },
  description:
    "EL KAID builds enterprise ERP systems, resilient data center infrastructure, and disaster recovery solutions for modern businesses.",
  applicationName: "EL KAID",
  keywords: [
    "ERP software",
    "enterprise resource planning",
    "data center solutions",
    "disaster recovery services",
    "business continuity planning",
    "cloud ERP",
    "financial automation platform",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EL KAID",
    title: "EL KAID | ERP, Data Center and Disaster Recovery Solutions",
    description:
      "Enterprise ERP, data center infrastructure, and disaster recovery services designed for resilient operations.",
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
    title: "EL KAID | ERP, Data Center and Disaster Recovery Solutions",
    description:
      "Enterprise ERP, data center infrastructure, and disaster recovery services designed for resilient operations.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased pt-8`}
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
        <GlobalCtaBar />
      </body>
    </html>
  );
}
