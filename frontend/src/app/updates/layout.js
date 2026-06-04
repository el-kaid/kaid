export const metadata = {
  title: "Support Hub & Contact | EL KAID",
  description:
    "Get fast support for B1 billing software configurations, active bookkeeping questions, database sync architectures, and high-availability data services.",
  alternates: { canonical: "/updates" },
  openGraph: {
    title: "EL KAID Support Hub",
    description:
      "Get direct technical assistance for B1 billing software or high-availability database system integrations.",
    url: "/updates",
    images: ["/assets/hero-real.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL KAID Support Hub",
    description:
      "Direct technical support for B1 software and custom enterprise database sync integrations.",
    images: ["/assets/hero-real.png"],
  },
};

export default function UpdatesLayout({ children }) {
  return children;
}
