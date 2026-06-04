export const metadata = {
  title: "Careers at EL KAID | Software & Technical Teams",
  description:
    "Join EL KAID to engineer smart B1 billing software, custom enterprise platforms, and secure transaction sync database engines.",
  alternates: { canonical: "/career" },
  openGraph: {
    title: "EL KAID Careers",
    description:
      "Explore full-stack engineering, DevOps infrastructure, and UI/UX product design careers at EL KAID.",
    url: "/career",
    images: ["/assets/hero-real.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EL KAID Careers",
    description:
      "Engineer B1 software platforms and high-availability enterprise backend systems with EL KAID.",
    images: ["/assets/hero-real.png"],
  },
};

export default function CareerLayout({ children }) {
  return children;
}
