import LegalPage from "@/components/site/shared/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | BhupeshB7",
  description:
    "Privacy policy for the BhupeshB7 portfolio, contact channels, project discovery flow, and lead inquiry experience.",
  path: "/privacy-policy",
  keywords: ["BhupeshB7 Privacy Policy", "Bhupesh Kumar Privacy"],
});

export default function PrivacyPolicyRoute() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This page explains how this portfolio handles contact and project inquiry information."
      sections={[
        {
          title: "Information You Share",
          body: "If you contact Bhupesh by email, WhatsApp, LinkedIn, or the project discovery flow, the information you provide may be used to reply, understand your project, and continue the conversation.",
        },
        {
          title: "Project Discovery",
          body: "The AI project discovery flow may process your project idea, goals, timeline, budget range, and contact details so a useful project summary can be created.",
        },
        {
          id: "cookies",
          title: "Cookies",
          body: "This site is designed to work without advertising cookies. If analytics are added later, they should be used only to understand aggregate traffic and improve the website experience.",
        },
        {
          title: "Contact",
          body: "For privacy questions or data removal requests, email contact@bhupesh.me.",
        },
      ]}
    />
  );
}
