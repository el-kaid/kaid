export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.elkaid.com";
  const now = new Date();

  const routes = [
    "",
    "/career",
    "/our-work",
    "/updates",
    "/blog",
    "/erp-software",
    "/data-center-solutions",
    "/disaster-recovery",
    "/why-elkaid",
    "/book-demo",
    "/erp-vs-tally",
    "/cloud-erp-vs-traditional-erp",
    "/data-center-vs-cloud",
    "/use-cases/retail",
    "/use-cases/manufacturing",
    "/use-cases/startups",
    "/features/accounting-automation",
    "/features/multi-branch-management",
    "/features/reporting-dashboard",
  ];
  const blogRoutes = [
    "/blog/what-is-erp-software",
    "/blog/how-data-centers-work",
    "/blog/disaster-recovery-explained",
  ];

  return [...routes, ...blogRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.startsWith("/blog/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/our-work" ? 0.9 : 0.8,
  }));
}
