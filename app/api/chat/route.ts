import { NextRequest, NextResponse } from "next/server";
import { Groq } from "groq-sdk";
import { SITE } from "@/config/site.config";
import type { Message, ProgressState } from "@/lib/types";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const EMPTY_PROGRESS: ProgressState = {
  projectIdea: false,
  targetUsers: false,
  coreFeatures: false,
  platformRequirements: false,
  budget: false,
  timeline: false,
};

const SYSTEM_PROMPT = `You are an AI Project Consultant representing Bhupesh Kumar, also known as BhupeshB7.

VERIFIED BHUPESH DETAILS:
${SITE.facts.map((fact) => `- ${fact}`).join("\n")}

STRICT ACCURACY RULES:
- Use only the verified details above when asked about Bhupesh.
- Do not invent education, college, employer, client names, awards, exact age, exact pricing, or unavailable services.
- Never claim Bhupesh studied at BITS Pilani unless the user provides that fact in the conversation.
- If a visitor asks for a detail you do not know, say: "I don't have that verified detail here, but you can contact Bhupesh directly at ${SITE.email}."
- If asked how to contact Bhupesh, give email (${SITE.email}), WhatsApp (+91 85818 69783), the contact page (/contact), and booking option (/contact).

YOUR PURPOSE:
Help people plan software projects so Bhupesh can understand and build them. This includes websites, mobile apps, web apps, SaaS MVPs, dashboards, internal tools, booking systems, ecommerce, AI workflows, APIs, and backend systems.

CONVERSATION STYLE:
- Ask one question at a time.
- Keep replies short, specific, and useful.
- Prefer 2-5 sentences unless the user asks for depth.
- Use simple language. Avoid jargon unless the user is technical.
- Match Hindi or Hinglish if the user writes that way.
- Be friendly but do not overpromise.

INFORMATION TO GATHER:
1. What the project is about.
2. Who will use it.
3. Core features.
4. Website, app, dashboard, API, or multiple platforms.
5. Special needs such as payments, bookings, auth, AI, files, notifications, admin panels, integrations.
6. Budget in Indian Rupees (INR / ₹).
7. Timeline.

BUDGET RULES:
- Always ask budget in ₹ / INR, not dollars.
- Use ranges such as Under ₹50,000, ₹50,000 - ₹1,50,000, ₹1,50,000 - ₹5,00,000, ₹5,00,000+.
- If the user gives dollars, politely ask for an approximate INR budget range. Do not pretend to know live exchange rates.

UNRELATED QUESTIONS:
If the user asks about news, politics, cricket, general knowledge, or anything unrelated to Bhupesh or project planning, briefly say you are here to help plan their software project and ask what they want to build.

READY SIGNAL:
Once you have gathered project type, target users, main features, platform preference, INR budget, and timeline, add READY_FOR_BRIEF on a new line at the very end.

PROGRESS TRACKING:
At the end of every response, on a new line output exactly:
PROGRESS:{"projectIdea":false,"targetUsers":false,"coreFeatures":false,"platformRequirements":false,"budget":false,"timeline":false}
Set each value to true once that topic is covered based on the full conversation history.`;

function extractProgress(text: string): ProgressState {
  const match = text.match(/PROGRESS:(\{[^}]+\})/);
  if (!match) return EMPTY_PROGRESS;
  try {
    return { ...EMPTY_PROGRESS, ...JSON.parse(match[1]) };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function cleanReply(text: string): string {
  return text
    .replace(/READY_FOR_BRIEF/g, "")
    .replace(/PROGRESS:\{[^}]+\}/g, "")
    .trim();
}

function statusOf(err: unknown) {
  if (typeof err === "object" && err !== null && "status" in err) {
    return err.status;
  }
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    const result = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 700,
      temperature: 0.35,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({
          role: m.role === "user" ? ("user" as const) : ("assistant" as const),
          content: m.content,
        })),
      ],
    });

    const rawText = result.choices[0]?.message?.content ?? "";

    return NextResponse.json({
      reply: cleanReply(rawText),
      progress: extractProgress(rawText),
      readyForBrief: rawText.includes("READY_FOR_BRIEF"),
    });
  } catch (err: unknown) {
    console.error("[chat]", err);
    if (statusOf(err) === 429) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 },
    );
  }
}
