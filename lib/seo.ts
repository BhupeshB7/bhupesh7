import type { Metadata } from "next";
import { SITE, SITE_URL, SEO_PAGES, FEATURED_PROJECTS } from "@/config/site.config";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false,
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const mergedKeywords = Array.from(new Set([...SITE.keywords, ...keywords]));

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords: mergedKeywords,
    authors: [{ name: SITE.legalName, url: SITE_URL }],
    creator: SITE.legalName,
    publisher: SITE.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type,
      locale: "en_IN",
      images: [
        {
          url: absoluteUrl(SITE.ogImage),
          width: 1200,
          height: 630,
          alt: `${SITE.legalName} (${SITE.name}) software engineer portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@bhupeshb7",
      images: [absoluteUrl(SITE.ogImage)],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function pageMetadata(path: (typeof SEO_PAGES)[number]["path"]) {
  const page = SEO_PAGES.find((item) => item.path === path);
  if (!page) throw new Error(`Missing SEO page config for ${path}`);
  return buildMetadata(page);
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE_URL,
    email: SITE.email,
    telephone: SITE.phone,
    jobTitle: "Software Engineer, Backend Developer, Technical Consultant",
    knowsAbout: [
      "Backend Development",
      "Node.js",
      "MERN Stack",
      "System Design",
      "API Development",
      "SaaS MVP Development",
      "Scalable Software Architecture",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: SITE.location,
    },
    sameAs: SITE.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    alternateName: `${SITE.legalName} Portfolio`,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en-IN",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE_URL,
    email: SITE.email,
    founder: { "@id": `${SITE_URL}/#person` },
    sameAs: SITE.sameAs,
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/work-with-me#service`,
    name: `${SITE.legalName} Software Consulting`,
    url: absoluteUrl("/work-with-me"),
    email: SITE.email,
    telephone: SITE.phone,
    areaServed: ["India", "Worldwide", "Remote"],
    provider: { "@id": `${SITE_URL}/#person` },
    serviceType: [
      "Backend Development",
      "API Development",
      "SaaS MVP Development",
      "Full Stack Development",
      "AI Workflow Integration",
    ],
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#contact`,
    url: absoluteUrl("/contact"),
    name: `Contact ${SITE.legalName}`,
    about: { "@id": `${SITE_URL}/#person` },
  };
}

export function projectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/project#projects`,
    name: `${SITE.legalName} software engineering projects`,
    itemListElement: FEATURED_PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        description: project.description,
        url: absoluteUrl(`/project#${project.slug}`),
        keywords: project.keywords.join(", "),
        author: { "@id": `${SITE_URL}/#person` },
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function graphSchema(items: unknown[]) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}
