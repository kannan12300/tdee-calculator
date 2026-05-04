import type { MetadataRoute } from "next";
import { futureCalculatorRoutes, SITE_URL } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Future programmatic SEO pages should be created before raising these priorities.
    ...futureCalculatorRoutes.map((route) => ({
      url: `${SITE_URL}${route.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
  ];
}
