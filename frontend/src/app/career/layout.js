export const metadata = {
  title: "Careers at EL KAID | B1 Software and B2B Trade Sourcing",
  description:
    "Join EL KAID to engineer smart B1 billing software, custom business websites, and coordinate India-to-GCC B2B trade sourcing networks.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "EL KAID Careers",
    description:
      "Explore full-stack engineering, UI/UX product design, and transnational B2B trade operations careers at EL KAID.",
    url: "/career",
    images: ["/assets/hero-real.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL KAID Careers",
    description:
      "Engineer B1 software platforms and transnational trade coordination networks with EL KAID.",
    images: ["/assets/hero-real.png"],
  },
};

export default function CareerLayout({ children }) {
  return children;
}
