import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { ContactInquiryData } from "@/lib/types";

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

function validate(data: ContactInquiryData) {
  if (!data.fullName || data.fullName.trim().length < 2) return "Name is required.";
  if (!data.email || !isEmail(data.email)) return "Valid email is required.";
  if (!data.phone || data.phone.trim().length < 8) return "Phone or WhatsApp number is required.";
  if (!data.message || data.message.trim().length < 20) return "Message is too short.";
  return "";
}

function buildEmail(data: ContactInquiryData) {
  const rows = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Company", data.company || "Not provided"],
  ];

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#08080f;color:#f4f4f5;font-family:Arial,sans-serif;">
  <div style="max-width:680px;margin:0 auto;">
    <h1 style="margin:0 0 8px;font-size:26px;">New Contact Inquiry</h1>
    <p style="margin:0 0 24px;color:#a1a1aa;">Submitted from bhupesh.me/contact</p>
    <div style="background:#11111a;border:1px solid #27273a;border-radius:16px;padding:20px;">
      ${rows
        .map(
          ([label, value]) => `
          <div style="margin-bottom:14px;">
            <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#818cf8;font-weight:700;">${label}</div>
            <div style="font-size:15px;color:#f4f4f5;">${escapeHtml(value)}</div>
          </div>`,
        )
        .join("")}
      <div style="margin-top:18px;padding-top:18px;border-top:1px solid #27273a;">
        <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#818cf8;font-weight:700;">Message</div>
        <div style="font-size:15px;line-height:1.6;color:#e4e4e7;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ContactInquiryData;
    const error = validate(data);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `New contact message from ${data.fullName}`,
      html: buildEmail(data),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Failed to send inquiry." }, { status: 500 });
  }
}
