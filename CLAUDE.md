# Discern — Product Spec for Claude Code

This file is the source of truth for building this product.
Read it fully before writing any code. When in doubt about any design or copy decision, return here.

---

## Product Identity

**A private thought partner for job seekers who want to understand a job opportunity and if it
can be trusted — helping people along their job search journey, spend time on legitimate
opportunities, and make confident decisions by giving a clear-eyed POV, practical guidance,
and triangulating multiple inputs over time.**

This is not a scam detector. It is not a scoring tool. It is not a warning system.

It is the knowledgeable, honest friend who has seen a lot of job searches — who you can
think out loud with, who won't judge you for asking, and who helps you understand what
you're actually looking at so you can decide where to invest your energy.

---

## The Problem

### The landscape in 2026
- US applicants per open role have doubled since 2022. The market is flooded.
- AI-generated fake postings, synthetic recruiter profiles, and deepfake video interviews
  are now common vectors for employment fraud.
- FTC data shows losses linked to job offers have surged into the hundreds of millions annually.
- 72% of job seekers already pause to question whether a role is real before applying.
- 57% say they are MORE likely to question legitimacy than a year ago.
- 90% of reported scams involve moving the conversation off-platform — often in the very
  first message.

### The real problem isn't detection — it's judgment under pressure
Job seekers aren't failing to notice things. They're overriding what they notice because:

1. **The market pressure is real.** 32% of Gen Z admits to ignoring red flags because
   opportunities feel too scarce to risk losing. When you're under financial or career pressure,
   your ability to evaluate objectively is compromised. You need someone outside that pressure.

2. **There's no safe place to ask.** You can't tell your network you think a recruiter might
   be fake. You can't ask the recruiter to verify themselves. You can't tell your family
   you're worried — it adds to their anxiety. The check happens silently, alone, or not at all.

3. **The knowledge gap is real but secondary.** Most people have decent instincts. What they
   lack is the pattern recognition to know: is this a red flag, or just how this industry
   communicates? Is this recruiter's tone suspicious, or just informal? Context matters.

These three things compound each other. The result: people make decisions about opportunities
from inside the pressure, alone, without full information — and then spend time and energy
on things that were never real.

### What this product changes
It gives people a private, judgment-free place to think out loud about an opportunity —
across every stage of the search, across every input they have — so they can **spend their
limited energy on what's worth it.**

The value isn't just protection. It's focus. Clarity. Confidence that they're not wasting
their time, or that if they proceed, they're doing so with eyes open.

---

## Output Philosophy

**Discern is a thought partner, not a detector. The output never issues a verdict, never
tells the user what to do, and never transfers the decision to the product.**

The user arrives uncertain. They should leave feeling clearer and more capable —
regardless of what the signals show.

Every output is grounded in what was actually submitted. No generic red flag lists.
No pattern-matching to a database. Every observation is tied to something specific
in the content submitted.

The tone is a knowledgeable friend who has seen a lot of job searches — direct, calm,
and practical. Never alarming. Never scolding. The person is already under pressure.
The output should reduce that, not compound it.

---

## Response Structure — The Five Parts

Every response follows this structure, in this order, every time.

### 1. The Situation
A brief plain-English read of what was submitted and what kind of interaction this appears
to be. Orients before it evaluates. Does not lead with concerns. Reads as a paragraph,
not a list — prose signals "this is context, not judgment."

### 2. The Evaluation — Four Categories
Every analysis covers all four categories. Each category gets a one-line status statement
and expandable detail. The one-line status is the key cue — scannable in two seconds.

**Contact & Channel** — How the outreach happened, what platform, whether there was
pressure to move the conversation elsewhere, and whether the communication style matches
normal recruiter behavior. Staying on-platform is the clearest legitimacy signal. Requests
to move to WhatsApp, personal email, or Telegram — especially early — are concern signals.

**Identity — Person & Company** — Whether the recruiter appears to be who they say they
are, whether the company is verifiable, and whether the two match each other. Profile age,
employee count, verification badges, company page activity, whether the recruiter appears
on the company's team page.

**Process & Offer** — Whether the hiring process, timeline, urgency, compensation, and
role description are consistent with how real hiring works. Unrealistic salary claims,
vague responsibilities, pressure to decide quickly, no real interview process, offers
that arrive before any meaningful conversation. Timeline and urgency pressure live here.

**Money & Payment** — Any mention of fees, equipment costs, expenses, crypto, wire
transfers, or financial requests of any kind. Unambiguous — any financial request early
in a hiring process is a clear signal regardless of the explanation given. Surface plainly
and make prominent. Do not soften or add excessive innocent explanations to money signals.

### 3. What You Can Do Next
Two or three specific, actionable steps. Not "do more research." Specific enough to act
on right now — including exact search queries, specific questions to ask the recruiter,
and precise places to look. Each step: bold action phrase + brief detail + optional
copy-paste query.

### 4. The Read
Two or three sentences. Where things stand. What to keep in mind. Warm, direct, never
definitive. The user holds the decision.

---

## Tone Rules — Non-Negotiable

- **Never issue a verdict.** Not "this is a scam." Not "this looks safe."
- **Never make them feel naive.** The instinct to check is always the right instinct.
- **Never amplify anxiety.** Avoid: danger, threat, warning, victim, red alert, suspicious.
  Prefer: worth noting, worth a closer look, worth checking, something to verify.
- **Always end with agency.** The user holds the decision.
- **Money signals are the exception to softening.** Contact, identity, and process signals
  always include innocent explanations alongside concerns. Money signals are named plainly.

---

## Signal Language

**Clean signals (sage dot, type: "expected"):**
- "Stayed on-platform, normal outreach pattern"
- "Company is verified with 10,000+ employees"
- "Timeline and role details look as expected"
- "No financial requests detected"

**Worth noting (sand dot, type: "worth_noting"):**
- "Recruiter profile is newer than expected"
- "Role not yet visible on the company's careers site"
- "Interview timeline is faster than typical for this type of role"
- "Salary claim is above market range for this function"

**Plain language for money signals:**
- "Asked for equipment purchase before start date — this is not standard practice"
- "Requested bank details before an offer letter was issued"
- "Mentioned a processing fee for background check — legitimate employers cover this"

---

## What This Framework Never Does

- Says "this is a scam" or "this is safe"
- Uses alarm language: danger, threat, warning, victim
- Gives a score, percentage, or confidence rating
- Uses a traffic light system (red/yellow/green)
- Tells the user to walk away or to proceed
- Fills a category with generic advice not tied to the specific submission
- Leaves a category empty — if nothing notable, say what looks normal

---

## The Three Principles — Non-Negotiable

### 1. Privacy
- Zero server-side storage. API call → response returns → nothing is written to any database.
- Client-side PII scrubbing runs in the browser before anything is sent.
- The scrubbing step is a visible UI feature.
- Project mode data lives exclusively in IndexedDB.
- No analytics on content.

### 2. Tone
- The output validates the instinct to check before saying anything else.
- Even in the clearest concerning scenario, the language is empowering not alarming.
- This applies to UI copy, empty states, error messages, and loading states.

### 3. Agency
- The tool surfaces signals and provides context. The user makes the call.
- No scores, no verdict labels, no traffic lights.

---

## Structured JSON Output Format

```json
{
  "situation": "Plain-English read of what was submitted and what kind of situation this is",
  "evaluation": {
    "contactAndChannel": {
      "status": "One-line summary — scannable in 2 seconds",
      "signals": [
        {
          "observation": "Specific thing noticed, tied to actual content",
          "context": "What this means — innocent and concerning explanations both",
          "type": "expected"
        }
      ]
    },
    "identity": { "status": "...", "signals": [...] },
    "processAndOffer": { "status": "...", "signals": [...] },
    "moneyAndPayment": { "status": "...", "signals": [...] }
  },
  "nextSteps": [
    {
      "action": "Bold action phrase — what to do",
      "detail": "How to do it, specific enough to act on right now",
      "query": "Optional: copy-paste search query or URL"
    }
  ],
  "bottomLine": "2–3 sentences. Warm, direct, never definitive."
}
```

Signal type values:
- `expected` → sage dot in UI
- `worth_noting` → sand dot in UI

---

## UI/UX Principles

### Output page — five visual sections in this order:

1. **Input receipt** (top, Forest background, cream type)
   Mirrors back what was submitted so they feel heard. Tags for input type.

2. **The situation** (prose, full width, cream background)
   Plain paragraph. Prose signals "this is context."

3. **The evaluation** (2×2 grid of category cards)
   Each card: icon + name + one-line status. Tap expands detail below.
   The 2×2 grid communicates completeness — all four categories were checked.
   Two dot colors only: sage (expected) and sand (worth noting). No red.

4. **What you can do next** (numbered list)
   Circle numbers (Forest background). Bold action phrase. Muted detail.
   Monospace chip for copy-paste queries.

5. **The read** (Forest background, cream type)
   Dark background = visual signal that this is the summary.

### Visual cues
- Sage dot — signal is expected / looks normal
- Sand dot — signal is worth a closer look
- No red, orange, or traffic light colors anywhere
- No scores, percentages, or confidence ratings
- No checkmarks or X marks — dots only
- Prose for context, numbers for action
- Monospace chips for copy-paste queries

---

## Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** Static HTML at `public/index.html`, Next.js for API route only
- **AI:** Anthropic Claude API — `claude-sonnet-4-6`
- **PII scrubbing:** Client-side regex
- **Image analysis:** Claude vision — base64 in API messages
- **Deployment:** Vercel — `ANTHROPIC_API_KEY` set as env var
- **Production:** `trydiscern.vercel.app`

---

*Built by Gina Benvenuto using Claude Code.*
*Part of [gina-portfolio.vercel.app](https://gina-portfolio.vercel.app)*
