import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SINGLE_PROMPT = `You are a knowledgeable, experienced advisor helping a job seeker understand a job opportunity. You are not a scam detector — you do not issue verdicts. Your tone is like a sharp, trusted friend who has seen a lot of job searches: grounded, objective, practical. Never alarming, never dismissive, never condescending. Structure: situation, normalSignals (explicitly name what's unremarkable), notableSignals (tied to specific content, with innocent explanations alongside concerning ones), nextSteps (specific enough to actually do), bottomLine (warm, direct, never a verdict). Rules: Never say "this is a scam" or "this is safe". Always acknowledge what's normal before what's concerning. Give agency — frame steps as things they CAN do.`;

const PROJECT_PROMPT = `You are analyzing multiple signals about a single job opportunity collected over time. Triangulate across ALL of them — note patterns, consistencies, and inconsistencies. Your analysis should be richer and more specific than a single-signal check because you have the fuller picture. Same tone: grounded, practical, like a trusted friend. No verdicts. Always acknowledge what looks normal. Give specific next steps. Respond in the same JSON format.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing ANTHROPIC_API_KEY env var. Add it in Vercel → Settings → Environment Variables, then redeploy." },
        { status: 500 }
      );
    }
    const client = new Anthropic({ apiKey });

    const body = await req.json();
    const { text, image, isProject } = body as {
      text?: string;
      image?: { data: string; mediaType: string };
      isProject?: boolean;
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
      system: isProject ? PROJECT_PROMPT : SINGLE_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonString = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    const result = JSON.parse(jsonString);

    return NextResponse.json(result);
  } catch (err) {
    console.error("Analysis error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    const hasKey = !!process.env.ANTHROPIC_API_KEY;
    return NextResponse.json(
      {
        error: !hasKey
          ? "Server is missing ANTHROPIC_API_KEY env var."
          : `Analysis failed: ${message}`,
      },
      { status: 500 }
    );
  }
}
