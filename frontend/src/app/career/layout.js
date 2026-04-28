export const metadata = {
  title: "Careers in ERP and Cloud Engineering",
  description:
    "Join EL KAID to build enterprise ERP software, data center systems, and resilient disaster recovery platforms.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "EL KAID Careers",
    description:
      "Explore engineering, product, and operations careers at EL KAID.",
    url: "/career",
    images: ["/assets/hero-real.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL KAID Careers",
    description:
      "Build ERP, data center, and disaster recovery solutions with EL KAID.",
    images: ["/assets/hero-real.png"],
  },
};

export default function CareerLayout({ children }) {
  return children;
}
