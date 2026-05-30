"use client";

import { useRef, useState } from "react";
import { scrubPII, type ScrubResult } from "./lib/pii";

type NotableSignal = {
  observation: string;
  context: string;
  weight: "low" | "medium" | "high";
};

type AnalysisResult = {
  situation: string;
  normalSignals: string[];
  notableSignals: NotableSignal[];
  nextSteps: string[];
  bottomLine: string;
};

type ImageData = {
  base64: string;
  mediaType: string;
  previewUrl: string;
  fileName: string;
};

type Step = "input" | "confirm" | "loading" | "result";

export default function Home() {
  const [step, setStep] = useState<Step>("input");
  const [text, setText] = useState("");
  const [image, setImage] = useState<ImageData | null>(null);
  const [scrubbed, setScrubbed] = useState<ScrubResult | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(",")[1];
      setImage({
        base64,
        mediaType: file.type,
        previewUrl: dataUrl,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  }

  function handleReview() {
    if (!text.trim() && !image) return;
    const s = text.trim() ? scrubPII(text) : { cleaned: "", redactions: [] };
    setScrubbed(s);
    setStep("confirm");
  }

  async function handleConfirm() {
    setStep("loading");
    setError("");
    try {
      const body: { text?: string; image?: { data: string; mediaType: string } } = {};
      if (scrubbed?.cleaned) body.text = scrubbed.cleaned;
      if (image) body.image = { data: image.base64, mediaType: image.mediaType };

      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      const data = await res.json();
      setResult(data);
      setStep("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
      setStep("confirm");
    }
  }

  function handleReset() {
    setText("");
    setImage(null);
    setScrubbed(null);
    setResult(null);
    setError("");
    setStep("input");
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FBF8F3" }}>
      <div className="max-w-2xl mx-auto px-5 py-8">

        {/* Nav */}
        <div className="flex items-center justify-between mb-10">
          <span className="font-semibold text-base tracking-tight" style={{ color: "#1C1410" }}>
            Discern
          </span>
          <span className="text-xs px-3 py-1 rounded-full font-medium"
            style={{ backgroundColor: "#F0E8DE", color: "#8C6E58" }}>
            Free · No account needed
          </span>
        </div>

        {/* Step: Input */}
        {step === "input" && (
          <div>
            {/* Hero */}
            <div className="mb-7">
              <h1 className="text-3xl font-semibold leading-snug mb-3"
                style={{ color: "#1C1410" }}>
                Get a clear-eyed read on<br />any job opportunity.
              </h1>
              <p className="text-sm leading-relaxed" style={{ color: "#7C6655" }}>
                Paste a recruiter message, job posting, or email thread — or upload a screenshot.
                You&apos;ll get honest context and practical next steps, privately. No judgment.
              </p>
            </div>

            {/* Input area */}
            <div className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste a job post, recruiter DM, email, offer letter, or any written communication..."
                rows={7}
                className="w-full rounded-2xl px-4 py-3.5 text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 border"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E5D9CE",
                  color: "#1C1410",
                  caretColor: "#B5622B",
                }}
              />

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t" style={{ borderColor: "#E5D9CE" }} />
                <span className="text-xs" style={{ color: "#B5A899" }}>or</span>
                <div className="flex-1 border-t" style={{ borderColor: "#E5D9CE" }} />
              </div>

              {/* Image upload */}
              {image ? (
                <div className="relative rounded-2xl border overflow-hidden"
                  style={{ borderColor: "#E5D9CE", backgroundColor: "#FFFFFF" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.previewUrl}
                    alt="Uploaded screenshot"
                    className="max-h-56 w-full object-contain p-3"
                  />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs border"
                    style={{ backgroundColor: "#FFFFFF", color: "#7C6655", borderColor: "#E5D9CE" }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-2xl border-2 border-dashed py-6 text-center text-sm transition-colors"
                  style={{ borderColor: "#E5D9CE", color: "#B5A899", backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C4A98A";
                    e.currentTarget.style.color = "#7C6655";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E5D9CE";
                    e.currentTarget.style.color = "#B5A899";
                  }}
                >
                  Upload a screenshot
                  <span className="block text-xs mt-1">JPG, PNG, or WebP</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageChange(file);
                }}
              />

              <button
                onClick={handleReview}
                disabled={!text.trim() && !image}
                className="w-full font-medium py-3.5 rounded-2xl transition-colors text-sm"
                style={{
                  backgroundColor: (!text.trim() && !image) ? "#E5D9CE" : "#B5622B",
                  color: (!text.trim() && !image) ? "#B5A899" : "#FFFFFF",
                  cursor: (!text.trim() && !image) ? "not-allowed" : "pointer",
                }}
              >
                Take a look →
              </button>

              <p className="text-xs text-center" style={{ color: "#B5A899" }}>
                Nothing you submit is stored. We&apos;ll show you exactly what gets sent before you confirm.
              </p>
            </div>
          </div>
        )}

        {/* Step: Privacy Confirmation */}
        {step === "confirm" && scrubbed && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold mb-1" style={{ color: "#1C1410" }}>
                Before we send anything
              </h2>
              <p className="text-sm" style={{ color: "#7C6655" }}>
                Here&apos;s exactly what will be sent to Claude for analysis. Nothing is stored.
              </p>
            </div>

            {scrubbed.redactions.length > 0 && (
              <div className="rounded-2xl px-4 py-4" style={{ backgroundColor: "#FEF3E2", border: "1px solid #F5D9B0" }}>
                <p className="text-sm font-medium mb-2" style={{ color: "#8A5A1E" }}>
                  We removed {scrubbed.redactions.length} piece{scrubbed.redactions.length !== 1 ? "s" : ""} of personal info:
                </p>
                <ul className="space-y-1.5">
                  {scrubbed.redactions.map((r, i) => (
                    <li key={i} className="text-xs flex gap-2 items-center" style={{ color: "#8A5A1E" }}>
                      <span className="font-mono px-1.5 py-0.5 rounded text-xs font-semibold"
                        style={{ backgroundColor: "#F5D9B0", color: "#6B4414" }}>
                        {r.type === "email" ? "EMAIL" : r.type === "phone" ? "PHONE" : "ID"}
                      </span>
                      <span className="opacity-60 truncate">{r.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {scrubbed.redactions.length === 0 && scrubbed.cleaned && (
              <div className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: "#F0E8DE", color: "#7C6655" }}>
                No personal information was detected in your text.
              </div>
            )}

            {image && (
              <div className="rounded-2xl px-4 py-3.5 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5D9CE" }}>
                <p className="text-sm font-medium mb-1" style={{ color: "#1C1410" }}>Screenshot included</p>
                <p className="text-xs" style={{ color: "#7C6655" }}>
                  {image.fileName} — Images can&apos;t be automatically redacted. Make sure you&apos;re
                  comfortable with what&apos;s visible before continuing.
                </p>
              </div>
            )}

            {scrubbed.cleaned && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#B5A899" }}>
                  Text being sent
                </p>
                <div className="rounded-2xl px-4 py-3.5 text-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto border"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "#E5D9CE", color: "#1C1410" }}>
                  {scrubbed.cleaned}
                </div>
              </div>
            )}

            <div className="rounded-2xl px-4 py-3 text-xs leading-relaxed" style={{ backgroundColor: "#F0E8DE", color: "#8C6E58" }}>
              This cleaned text is sent to Anthropic&apos;s Claude API. Anthropic does not train on API
              data. Nothing is written to any database.
            </div>

            {error && (
              <div className="rounded-2xl px-4 py-3 text-sm border" style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA", color: "#991B1B" }}>
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep("input")}
                className="flex-1 font-medium py-3.5 rounded-2xl transition-colors text-sm border"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E5D9CE", color: "#7C6655" }}
              >
                ← Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-[2] font-medium py-3.5 rounded-2xl transition-colors text-sm"
                style={{ backgroundColor: "#B5622B", color: "#FFFFFF" }}
              >
                Looks good — analyze it
              </button>
            </div>
          </div>
        )}

        {/* Step: Loading */}
        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin mb-5"
              style={{ borderColor: "#E5D9CE", borderTopColor: "#B5622B" }} />
            <p className="text-sm" style={{ color: "#7C6655" }}>Taking a look...</p>
          </div>
        )}

        {/* Step: Result */}
        {step === "result" && result && (
          <div className="space-y-5">

            {/* What's going on here */}
            <div className="rounded-2xl px-5 py-5" style={{ backgroundColor: "#F0E8DE" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#B5A899" }}>
                What&apos;s going on here
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#1C1410" }}>{result.situation}</p>
            </div>

            {/* What looks normal */}
            {result.normalSignals.length > 0 && (
              <div className="rounded-2xl px-5 py-4 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5D9CE" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#B5A899" }}>
                  What looks normal
                </p>
                <ul className="space-y-2.5">
                  {result.normalSignals.map((signal, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "#3D2B1F" }}>
                      <span className="shrink-0 mt-0.5" style={{ color: "#C4A98A" }}>—</span>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Worth paying attention to */}
            {result.notableSignals.length > 0 && (
              <div className="rounded-2xl px-5 py-4 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5D9CE" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#B5A899" }}>
                  Worth paying attention to
                </p>
                <div className="space-y-4">
                  {result.notableSignals.map((signal, i) => (
                    <div key={i} className="pl-3.5 space-y-1 border-l-2" style={{ borderColor: "#E5D9CE" }}>
                      <p className="text-sm font-medium leading-snug" style={{ color: "#1C1410" }}>
                        {signal.observation}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "#7C6655" }}>
                        {signal.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What you can do right now */}
            {result.nextSteps.length > 0 && (
              <div className="rounded-2xl px-5 py-4 border" style={{ backgroundColor: "#FFFFFF", borderColor: "#E5D9CE" }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#B5A899" }}>
                  What you can do right now
                </p>
                <ol className="space-y-3">
                  {result.nextSteps.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#3D2B1F" }}>
                      <span className="shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center font-semibold mt-0.5"
                        style={{ backgroundColor: "#F0E8DE", color: "#8C6E58" }}>
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Bottom line */}
            <div className="rounded-2xl px-5 py-5" style={{ backgroundColor: "#2D1F14" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8C7060" }}>
                The bottom line
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#F5EDE4" }}>
                {result.bottomLine}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full font-medium py-3.5 rounded-2xl text-sm border transition-colors"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E5D9CE", color: "#7C6655" }}
            >
              Check another opportunity
            </button>

            <p className="text-xs text-center" style={{ color: "#B5A899" }}>
              Nothing you submitted was stored. Analysis powered by Claude.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
