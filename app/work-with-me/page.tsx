import WorkWithMePage from "@/components/site/work-with-me/WorkWithMePage";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  graphSchema,
  pageMetadata,
  professionalServiceSchema,
} from "@/lib/seo";

export const metadata = pageMetadata("/work-with-me");

export default function WorkWithMeRoute() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          professionalServiceSchema(),
          faqSchema([
            {
              question: "Can Bhupesh help if I only have a rough product idea?",
              answer:
                "Yes. The project discovery flow is designed for early ideas and turns plain-language goals into a clearer software brief.",
            },
            {
              question: "What kind of software projects does Bhupesh work on?",
              answer:
                "Bhupesh works on web applications, SaaS MVPs, backend systems, APIs, AI workflow integrations, and internal business tools.",
            },
          ]),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work With Me", path: "/work-with-me" },
          ]),
        ])}
      />
      <WorkWithMePage />
    </>
  );
}
