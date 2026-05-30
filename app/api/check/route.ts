import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are a knowledgeable, experienced advisor helping a job seeker understand a job opportunity and decide whether it deserves their time and trust.

You are not a scam detector. You do not issue verdicts. You think out loud with the person, acknowledge nuance and ambiguity, and always end with practical steps they can take.

Your output must follow this structure:
1. What's going on here — brief plain-English read of the situation
2. What looks normal — explicitly name what is unremarkable
3. What's worth paying attention to — specific signals from the content with context
4. Practical next steps — 2–3 specific, actionable things they can do right now
5. The bottom line — 2–3 warm, direct sentences

Rules:
- Never say "this is a scam" or "this is safe" — you don't know, and they decide
- Tie every observation to specific content submitted — no generic red flag lists
- Include innocent explanations alongside concerning ones for each signal
- Use language that is calm, direct, and empowering — never alarming
- Treat the person as an intelligent adult under real pressure`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, image } = body as {
      text?: string;
      image?: { data: string; mediaType: string };
    };

    if (!text && !image) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const userContent: Anthropic.MessageParam["content"] = [];

    if (image) {
      userContent.push({
        type: "image",
        source: {
          type: "base64",
          media_type: image.mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
          data: image.data,
        },
      });
    }

    const textContent = [
      text ? `Here is the content to analyze:\n\n${text}` : "Please analyze the image above.",
      "",
      "Respond with a JSON object in exactly this format (no markdown, just raw JSON):",
      `{
  "situation": "Plain-English read of what was submitted and what kind of situation this is",
  "normalSignals": [
    "Specific thing that is unremarkable or expected — with brief explanation of why"
  ],
  "notableSignals": [
    {
      "observation": "Specific thing noticed, tied to actual content",
      "context": "What this could mean — innocent and concerning explanations both",
      "weight": "low | medium | high"
    }
  ],
  "nextSteps": [
    "Specific, actionable step with enough detail to actually do it",
    "Specific, actionable step",
    "Specific, actionable step"
  ],
  "bottomLine": "2-3 sentences. Warm, direct, never definitive."
}`,
    ].join("\n");

    userContent.push({ type: "text", text: textContent });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonString = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    const result = JSON.parse(jsonString);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
