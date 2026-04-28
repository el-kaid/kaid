export const metadata = {
  title: "Support Hub and Product Updates",
  description:
    "Contact EL KAID support for ERP, accounting automation, and platform guidance. Access fast technical and enterprise assistance.",
  alternates: { canonical: "/updates" },
  openGraph: {
    title: "EL KAID Support Hub",
    description:
      "Get fast support for ERP workflows, integrations, and enterprise onboarding.",
    url: "/updates",
    images: ["/assets/hero-custom.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL KAID Support Hub",
    description:
      "Get fast support for ERP workflows, integrations, and enterprise onboarding.",
    images: ["/assets/hero-custom.jpg"],
  },
};

export default function UpdatesLayout({ children }) {
  return children;
}
