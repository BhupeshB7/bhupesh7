import Credibility from "@/components/site/home/Credibility";
import FeaturedWork from "@/components/site/home/FeaturedWork";
import Footer from "@/components/site/shared/Footer";
import Hero from "@/components/site/home/Hero";
import Insights from "@/components/site/home/Insights";
import WhatIBuild from "@/components/site/home/WhatIBuild";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  graphSchema,
  organizationSchema,
  pageMetadata,
  personSchema,
  professionalServiceSchema,
  websiteSchema,
} from "@/lib/seo";

export const metadata = pageMetadata("/");

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          personSchema(),
          websiteSchema(),
          organizationSchema(),
          professionalServiceSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ])}
      />
      <Hero />
      <Credibility />
      <WhatIBuild />
      <FeaturedWork />
      <Insights />
      <Footer />
    </>
  );
}
