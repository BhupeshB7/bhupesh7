import { SITE } from "@/config/site.config";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    `/* TEAM */
Name: ${SITE.legalName}
Alias: ${SITE.name}
Role: Software Engineer, Backend Developer, Technical Consultant
Location: ${SITE.location}
Contact: ${SITE.email}

/* SITE */
Built with: Next.js App Router, React, TypeScript
Language: English (India)
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
