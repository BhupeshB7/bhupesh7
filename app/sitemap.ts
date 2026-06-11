import type { MetadataRoute } from "next";
import { SEO_PAGES, SITE_URL } from "@/config/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...SEO_PAGES.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: page.priority,
    })),
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
