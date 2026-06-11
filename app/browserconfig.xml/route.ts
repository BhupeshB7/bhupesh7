export const dynamic = "force-static";

export function GET() {
  return new Response(
    `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <TileColor>#07080f</TileColor>
    </tile>
  </msapplication>
</browserconfig>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}
