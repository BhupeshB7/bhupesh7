import LegalPage from "@/components/site/shared/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service | BhupeshB7",
  description:
    "Terms for using the BhupeshB7 portfolio, project discovery flow, and contact channels.",
  path: "/terms",
  keywords: ["BhupeshB7 Terms", "Bhupesh Kumar Terms"],
});

export default function TermsRoute() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms describe the basic expectations for using this portfolio and contacting Bhupesh Kumar."
      sections={[
        {
          title: "Website Content",
          body: "The content on this site is provided for portfolio, educational, and professional discovery purposes. It should not be treated as legal, financial, or security advice.",
        },
        {
          title: "Project Conversations",
          body: "Contacting Bhupesh or using the project discovery flow does not create a formal client relationship until both sides agree on scope, pricing, timeline, and written terms.",
        },
        {
          title: "External Links",
          body: "This site links to third-party platforms such as GitHub, LinkedIn, X, email, and WhatsApp. Those platforms are governed by their own terms and privacy policies.",
        },
        {
          title: "Contact",
          body: "For questions about these terms, email contact@bhupesh.me.",
        },
      ]}
    />
  );
}
