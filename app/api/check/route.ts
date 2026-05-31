import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SINGLE_PROMPT = `You are a knowledgeable, experienced advisor helping a job seeker understand a job opportunity and decide whether it deserves their time and trust.

You are not a scam detector. You do not issue verdicts. You think out loud with the person, acknowledge nuance, and always end with practical steps they can take.

Evaluate the submission across four categories. For each category, write a one-line status statement (scannable in two seconds) and supporting signals.

Categories:
1. Contact & Channel — how the outreach happened, what platform, any off-platform pressure (move to WhatsApp/Telegram/personal email early is a clear concern signal). Staying on-platform is the clearest legitimacy signal.
2. Identity (Person & Company) — recruiter and company verifiability. Profile age, employee count, verification badges, company page activity, whether the recruiter appears on the company's team page.
3. Process & Offer — hiring timeline, role clarity, urgency, compensation reasonableness. Unrealistic salary, vague role, pressure to decide quickly, offers before a real interview.
4. Money & Payment — any financial requests: fees, equipment, expenses, crypto, wire transfers. Unambiguous — any payment request early in hiring is a clear signal. Surface plainly; do not soften.

Then provide:
- 2–3 specific, actionable next steps (specific enough to act on right now — include exact search queries or URLs where helpful)
- A 2–3 sentence bottom line: warm, direct, never definitive

Rules:
- Never say "this is a scam" or "this is safe" — the user decides
- Tie every observation to specific content submitted — no generic lists
- Every category must be filled. If nothing notable, name what looks normal.
- Contact, identity, process signals: always include innocent explanations alongside concerns
- Money signals: name them plainly. Any payment request early in hiring is not ambiguous.
- Avoid alarm language: danger, threat, warning, victim, suspicious. Prefer: worth noting, worth a closer look, worth checking.
- Tone: calm, direct, empowering — never alarming
- Treat the person as an intelligent adult under real pressure`;

const PROJECT_PROMPT = `You are analyzing multiple signals about a single job opportunity collected over time. Triangulate across ALL of them — note patterns, consistencies, and inconsistencies across submissions. Your analysis should be richer than a single-signal check.

Same four-category evaluation structure (Contact & Channel, Identity, Process & Offer, Money & Payment), same tone (grounded, practical, no verdicts, always acknowledge what looks normal), same JSON output format.`;

const OUTPUT_TEMPLATE = `{
  "situation": "Plain-English read of what was submitted and what kind of interaction this appears to be. One short paragraph.",
  "evaluation": {
    "contactAndChannel": {
      "status": "One-line summary, scannable",
      "signals": [
        {
          "observation": "Specific thing noticed, tied to actual content",
          "context": "What this means — innocent explanations alongside concerns",
          "type": "expected"
        }
      ]
    },
    "identity": {
      "status": "One-line summary",
      "signals": [
        {
          "observation": "Specific thing noticed",
          "context": "What this means",
          "type": "expected"
        }
      ]
    },
    "processAndOffer": {
      "status": "One-line summary",
      "signals": [
        {
          "observation": "Specific thing noticed",
          "context": "What this means",
          "type": "expected"
        }
      ]
    },
    "moneyAndPayment": {
      "status": "One-line summary",
      "signals": [
        {
          "observation": "Specific thing noticed",
          "context": "Plain language for money signals — do not soften",
          "type": "expected"
        }
      ]
    }
  },
  "nextSteps": [
    {
      "action": "Bold action phrase — what to do",
      "detail": "How to do it, specific enough to act on right now",
      "query": "Optional copy-paste search query or URL — omit field if not applicable"
    }
  ],
  "bottomLine": "2-3 sentences. Warm, direct, never definitive."
}`;

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
      'Respond with a JSON object in exactly this format (no markdown, just raw JSON). Each "type" must be either "expected" or "worth_noting":',
      OUTPUT_TEMPLATE,
    ].join("\n");

    userContent.push({ type: "text", text: textContent });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3072,
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
