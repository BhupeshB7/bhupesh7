import { SITE, SITE_URL } from "@/config/site.config";


export const dynamic = "force-static";

export function GET() {
  return new Response(
    `Contact: mailto:${SITE.email}
Preferred-Languages: en, hi
Canonical: ${SITE_URL}/.well-known/security.txt
Policy: ${SITE_URL}/privacy-policy
`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
