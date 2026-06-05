import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { LeadData, ProjectBriefData } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY!);

const TO_EMAIL = process.env.LEAD_EMAIL ?? "contact@bhupesh.me";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "leads@bhupesh.me";

function buildEmailHtml(
  lead: LeadData,
  brief: ProjectBriefData,
  meta: { chatId: string; messageCount: number; date: string }
): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body { font-family: 'Courier New', monospace; background: #0a0a0a; color: #e5e5e5; margin: 0; padding: 24px; }
  .card { background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px; margin-bottom: 16px; }
  .label { font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #7c3aed; margin-bottom: 6px; }
  .value { font-size: 14px; color: #e5e5e5; margin-bottom: 16px; }
  .title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 4px; font-family: sans-serif; }
  .tag { display: inline-block; background: #1a1a2e; border: 1px solid #7c3aed44; color: #a78bfa; padding: 2px 8px; border-radius: 6px; font-size: 11px; margin: 2px; }
  .feature { padding: 4px 0; color: #a1a1aa; font-size: 13px; }
  .feature::before { content: "→ "; color: #7c3aed; }
  .meta { font-size: 11px; color: #555; }
  h2 { font-family: sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #7c3aed; margin: 0 0 16px; }
</style></head>
<body>
  <div style="max-width: 600px; margin: 0 auto;">
    <div style="margin-bottom: 24px; border-bottom: 1px solid #222; padding-bottom: 16px;">
      <div class="title">New Project Lead</div>
      <div class="meta">${new Date(meta.date).toLocaleString()} · ${meta.messageCount} messages · ${meta.chatId.slice(0, 8)}</div>
    </div>

    <div class="card">
      <h2>Lead Information</h2>
      <div class="label">Name</div><div class="value">${lead.fullName}</div>
      <div class="label">Email</div><div class="value"><a href="mailto:${lead.email}" style="color: #7c3aed;">${lead.email}</a></div>
      ${lead.company ? `<div class="label">Company</div><div class="value">${lead.company}</div>` : ""}
      <div class="label">Budget</div><div class="value">${lead.budgetRange}</div>
      <div class="label">Timeline</div><div class="value">${lead.timeline}</div>
    </div>

    <div class="card">
      <h2>Project Brief</h2>
      <div class="label">Project Name</div>
      <div style="font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 16px; font-family: sans-serif;">${brief.projectName}</div>

      <div class="label">Overview</div><div class="value">${brief.overview}</div>
      <div class="label">Target Users</div><div class="value">${brief.targetUsers}</div>

      <div class="label">Core Features</div>
      <div style="margin-bottom: 16px;">
        ${brief.coreFeatures.map((f) => `<div class="feature">${f}</div>`).join("")}
      </div>

      <div class="label">Tech Stack</div>
      <div style="margin-bottom: 16px;">
        ${brief.techStack.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>

      <div class="label">Complexity</div><div class="value">${brief.complexity}</div>

      <div class="label">Future Enhancements</div>
      <div>
        ${brief.futureEnhancements.map((e) => `<div class="feature" style="color: #71717a;">${e}</div>`).join("")}
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { lead, brief, meta } = await req.json() as {
      lead: LeadData;
      brief: ProjectBriefData;
      meta: { chatId: string; messageCount: number; date: string };
    };

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `New Project Lead: ${brief.projectName} — ${lead.fullName}`,
      html: buildEmailHtml(lead, brief, meta),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-lead]", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
