export type Redaction = {
  type: "email" | "phone" | "id";
  label: string;
};

export type ScrubResult = {
  cleaned: string;
  redactions: Redaction[];
};

export function scrubPII(text: string): ScrubResult {
  const redactions: Redaction[] = [];
  let cleaned = text;

  cleaned = cleaned.replace(
    /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
    (match) => {
      redactions.push({ type: "email", label: match });
      return "[EMAIL REDACTED]";
    }
  );

  cleaned = cleaned.replace(
    /(\+?1[\s.\-]?)?(\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})/g,
    (match) => {
      redactions.push({ type: "phone", label: match.trim() });
      return "[PHONE REDACTED]";
    }
  );

  cleaned = cleaned.replace(/\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g, (match) => {
    redactions.push({ type: "id", label: match });
    return "[ID REDACTED]";
  });

  return { cleaned, redactions };
}
