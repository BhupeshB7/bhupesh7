import { SEO_PAGES, SITE, SITE_URL } from "@/config/site.config";

export const dynamic = "force-static";

export function GET() {
  const updated = new Date().toUTCString();
  const items = SEO_PAGES.map(
    (page) => `<item>
      <title><![CDATA[${page.title}]]></title>
      <link>${SITE_URL}${page.path}</link>
      <guid>${SITE_URL}${page.path}</guid>
      <description><![CDATA[${page.description}]]></description>
      <pubDate>${updated}</pubDate>
    </item>`,
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title><![CDATA[${SITE.name}]]></title>
      <link>${SITE_URL}</link>
      <description><![CDATA[${SITE.description}]]></description>
      <language>en-IN</language>
      <lastBuildDate>${updated}</lastBuildDate>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
