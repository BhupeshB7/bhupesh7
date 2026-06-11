import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import type { Message, ProjectBriefData } from "@/lib/types";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SUMMARY_PROMPT = `You are a technical project analyst. Based on the conversation provided, generate a structured project brief as a JSON object.

Return ONLY valid JSON with no markdown, no backticks, no preamble. Exactly this structure:
{
  "projectName": "string",
  "overview": "string (2-3 sentences)",
  "targetUsers": "string (1-2 sentences)",
  "coreFeatures": ["string", "string", ...],
  "techStack": ["string", "string", ...],
  "complexity": "Low" | "Medium" | "High",
  "futureEnhancements": ["string", "string", ...]
}

Rules:
- coreFeatures: 4-8 items
- techStack: suggest realistic modern stack (e.g. Next.js, Node.js, PostgreSQL, etc.)
- futureEnhancements: 3-5 items
- complexity: Low for simple CRUD apps, Medium for multi-role apps, High for AI/real-time/complex integrations
- If budget appears in the conversation, preserve it in INR language inside the overview or futureEnhancements where relevant
- Write everything in simple English even if the conversation was in Hindi`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    const conversationText = messages
      .map((m) => `${m.role === "user" ? "Client" : "Consultant"}: ${m.content}`)
      .join("\n");

    const result = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SUMMARY_PROMPT },
        { role: "user", content: `Conversation:\n${conversationText}` },
      ],
    });

    const raw = result.choices[0]?.message?.content?.trim() ?? "";
    const brief: ProjectBriefData = JSON.parse(raw);

    return NextResponse.json({ brief });
  } catch (err) {
    console.error("[project-summary]", err);
    return NextResponse.json({ error: "Failed to generate brief" }, { status: 500 });
  }
}
