import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { LeadData, Message, ProjectBriefData } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.LEAD_EMAIL ?? "contact@bhupesh.me";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "leads@bhupesh.me";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateLead(lead: LeadData) {
  if (!lead) return "Lead data is required.";
  if (!lead.fullName || lead.fullName.trim().length < 2) return "Name is required.";
  if (!lead.email || !isEmail(lead.email)) return "Valid email is required.";
  if (!lead.phone || lead.phone.trim().length < 8) return "Phone or WhatsApp is required.";
  if (!lead.budgetRange) return "Budget range is required.";
  if (!lead.timeline) return "Timeline is required.";
  return "";
}

function buildEmailHtml(
  lead: LeadData,
  brief: ProjectBriefData,
  meta: {
    chatId: string;
    messageCount: number;
    date: string;
    messages?: Message[];
  },
) {
  const leadRows = [
    ["Name", lead.fullName],
    ["Email", lead.email],
    ["Phone / WhatsApp", lead.phone],
    ["Company", lead.company || "Not provided"],
    ["Budget", lead.budgetRange],
    ["Timeline", lead.timeline],
    ["Preferred Contact", lead.preferredContact],
    ["Notes", lead.notes || "Not provided"],
  ];

  const conversation = meta.messages?.length
    ? meta.messages
        .map(
          (message) => `
          <div style="margin-bottom:12px;padding:12px;border-radius:10px;background:${message.role === "user" ? "#151525" : "#101820"};">
            <div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#818cf8;font-weight:700;margin-bottom:6px;">${message.role}</div>
            <div style="font-size:13px;line-height:1.6;color:#e4e4e7;white-space:pre-wrap;">${escapeHtml(message.content)}</div>
          </div>`,
        )
        .join("")
    : "<p>No conversation messages were attached.</p>";

  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#08080f;color:#f4f4f5;margin:0;padding:24px;">
  <div style="max-width:760px;margin:0 auto;">
    <div style="margin-bottom:24px;border-bottom:1px solid #27273a;padding-bottom:16px;">
      <h1 style="margin:0;font-size:28px;">New AI Project Lead</h1>
      <p style="margin:8px 0 0;color:#a1a1aa;">${escapeHtml(new Date(meta.date).toLocaleString())} | ${meta.messageCount} messages | ${escapeHtml(meta.chatId.slice(0, 8))}</p>
    </div>

    <section style="background:#11111a;border:1px solid #27273a;border-radius:16px;padding:20px;margin-bottom:16px;">
      <h2 style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#818cf8;">Lead Information</h2>
      ${leadRows
        .map(
          ([label, value]) => `
          <div style="margin-bottom:12px;">
            <div style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#818cf8;font-weight:700;">${label}</div>
            <div style="font-size:15px;color:#f4f4f5;">${escapeHtml(value)}</div>
          </div>`,
        )
        .join("")}
    </section>

    <section style="background:#11111a;border:1px solid #27273a;border-radius:16px;padding:20px;margin-bottom:16px;">
      <h2 style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#818cf8;">Project Brief</h2>
      <h3 style="font-size:22px;margin:0 0 14px;">${escapeHtml(brief.projectName)}</h3>
      <p style="line-height:1.6;color:#e4e4e7;">${escapeHtml(brief.overview)}</p>
      <p><strong>Target Users:</strong> ${escapeHtml(brief.targetUsers)}</p>
      <p><strong>Complexity:</strong> ${escapeHtml(brief.complexity)}</p>
      <p><strong>Core Features:</strong></p>
      <ul>${brief.coreFeatures.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <p><strong>Tech Stack:</strong> ${brief.techStack.map(escapeHtml).join(", ")}</p>
      <p><strong>Future Enhancements:</strong></p>
      <ul>${brief.futureEnhancements.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>

    <section style="background:#11111a;border:1px solid #27273a;border-radius:16px;padding:20px;">
      <h2 style="font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#818cf8;">Conversation Transcript</h2>
      ${conversation}
    </section>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { lead, brief, meta } = (await req.json()) as {
      lead: LeadData;
      brief: ProjectBriefData;
      meta: {
        chatId: string;
        messageCount: number;
        date: string;
        messages?: Message[];
      };
    };

    if (!brief || !meta) {
      return NextResponse.json(
        { error: "Project brief and metadata are required." },
        { status: 400 },
      );
    }

    const error = validateLead(lead);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: lead.email,
      subject: `New AI Project Lead: ${brief.projectName} - ${lead.fullName}`,
      html: buildEmailHtml(lead, brief, meta),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-lead]", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
