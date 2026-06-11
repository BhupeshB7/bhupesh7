# SEO System

This app uses a centralized SEO setup so brand facts, canonical URLs, metadata,
structured data, sitemap entries, RSS, and social cards stay consistent.

## Core Files

- `config/site.config.ts`: brand identity, keywords, canonical site URL, page SEO data, and featured project hints.
- `lib/seo.ts`: metadata builder and JSON-LD schema helpers.
- `components/seo/JsonLd.tsx`: safe JSON-LD script renderer.
- `components/seo/Analytics.tsx`: optional Google Analytics and Microsoft Clarity integration.
- `app/sitemap.ts`: dynamic sitemap.
- `app/robots.ts`: dynamic robots rules.
- `app/rss.xml/route.ts`: RSS feed for the current indexed pages.
- `public/images/project1.png`: current social preview image used by Open Graph and Twitter metadata.

## Environment Variables

Optional production variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_CLARITY_PROJECT_ID`

## Adding A New SEO Page

1. Add the route and page component.
2. Add the page entry to `SEO_PAGES` in `config/site.config.ts`.
3. Export `metadata = pageMetadata("/new-route")` from the route.
4. Add relevant JSON-LD with `JsonLd`.
5. Add internal links from at least three relevant pages or sections.

## Current Indexed Pages

- `/`
- `/about`
- `/project`
- `/work-with-me`
- `/contact`
- `/privacy-policy`
- `/terms`
