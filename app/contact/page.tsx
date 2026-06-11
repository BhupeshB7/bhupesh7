import ContactPage from "@/components/site/contact/ContactPage";
import JsonLd from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  contactPageSchema,
  graphSchema,
  pageMetadata,
  personSchema,
} from "@/lib/seo";

export const metadata = pageMetadata("/contact");

export default function ContactRoute() {
  return (
    <>
      <JsonLd
        data={graphSchema([
          personSchema(),
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ])}
      />
      <ContactPage />
    </>
  );
}
