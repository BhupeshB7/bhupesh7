import AboutPage from "@/components/site/about/AboutPage";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graphSchema, pageMetadata, personSchema } from "@/lib/seo";

export const metadata = pageMetadata("/about");

export default function AboutRoute() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          personSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ])}
      />
      <AboutPage />
    </>
  );
}
