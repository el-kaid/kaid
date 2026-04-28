"use client";

import { usePathname } from "next/navigation";

const labelMap = {
  "": "Home",
  "our-work": "Innovation",
  career: "Career",
  updates: "Support Hub",
  blog: "Blog",
  "erp-software": "ERP Software",
  "data-center-solutions": "Data Center Solutions",
  "disaster-recovery": "Disaster Recovery",
};

function toLabel(segment) {
  return labelMap[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elkaid.com";
  const cleanPath = pathname?.split("?")[0] || "/";
  const segments = cleanPath === "/" ? [] : cleanPath.split("/").filter(Boolean);

  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    ...segments.map((segment, index) => {
      const fullPath = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        "@type": "ListItem",
        position: index + 2,
        name: toLabel(segment),
        item: `${siteUrl}${fullPath}`,
      };
    }),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
