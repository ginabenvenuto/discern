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

## Who This Is For

**Anyone actively job searching** — inbound (responding to recruiter outreach) or outbound
(applying to roles they found). All experience levels. All ages.

The psychological profile that cuts across all demographics:

> Someone who senses something — about a message, a posting, a recruiter, an offer —
> and wants to understand it more clearly before deciding what to do.

They are not naive. They are not helpless. They already have instincts. What they need is
a clear-eyed perspective from outside the pressure they're inside of, plus the practical
knowledge to know what to do next.

**High-priority segments based on exposure data:**
- Gen Z / early-career: highest scam exposure (32% victimized), most likely to ignore
  red flags due to competitive pressure — most vulnerable
- Mid-career in transition: under financial pressure, getting unsolicited recruiter outreach,
  less familiar with current job market norms
- Career changers: entering unfamiliar industries, don't know what "normal" looks like

---

## What It Analyzes

The product accepts and intelligently handles all of the following. Every input type flows
through the same analysis pipeline — the output format and principles are consistent regardless
of what was submitted.

### Phase 1 (build first)
- **Pasted text** — job post, recruiter message, LinkedIn DM, WhatsApp message,
  email thread, offer letter, any written communication
- **Screenshot upload** — image of a conversation, email, job listing, recruiter profile,
  company page, or any other visible content

### Phase 2
- **URL input** — job listing (Indeed, LinkedIn, Glassdoor), company website,
  LinkedIn recruiter profile, LinkedIn company page
- App fetches and extracts meaningful text server-side, then passes to analysis pipeline

### Phase 3 — Project Mode
- User creates a named project for a single opportunity (e.g. "Head of Product role at Acme")
- Adds submissions over time: first the DM, then the job post, then the recruiter's profile,
  then the follow-up email
- Tool triangulates across all submissions for that project, not just the latest one
- The analysis deepens and sharpens as more context is added
- **All project data lives in the user's browser (IndexedDB). Nothing touches a server.**

### Phase 4 — Chrome Extension
- Works in-page on LinkedIn, Indeed, Gmail, WhatsApp Web
- User activates analysis on the page they're currently looking at — no switching tabs,
  no copy-pasting
- Same analysis pipeline and output format as the web app

---

## Output Philosophy — The Most Important Thing

**Every analysis should feel like thinking with someone, not being assessed by something.**

The goal of every output is that the user walks away feeling clearer and more capable than
when they came in — regardless of what the signals actually show.

### Structure of every output

1. **What's going on here** — a plain-English read of what was submitted and what kind of
   situation this appears to be. Sets context before anything else. Does not lead with
   concerns.

2. **What looks normal** — explicitly name what is unremarkable or expected. This is not
   reassurance — it's information. Naming what's normal builds credibility for what comes next
   and prevents the user from spiraling about things that don't warrant concern.

3. **What's worth paying attention to** — specific signals tied directly to the content
   submitted, not a generic red flag list. Each signal includes:
   - What was observed (specific, quoted or paraphrased from the submission)
   - What it could mean — including innocent explanations
   - How significant it is in context

4. **Practical next steps** — always 2–3 specific, actionable things the user can do
   right now to understand the opportunity better. Not "be careful." Not "do more research."
   Specific steps like:
   - "Ask the recruiter to move the initial call to a LinkedIn Video chat rather than Zoom —
     legitimate recruiters at established companies are generally fine with this"
   - "Search '[company name] site:linkedin.com' to confirm this recruiter appears on
     the company's actual team page"
   - "Check [company domain]/careers to verify this role is publicly listed"

5. **The bottom line** — 2–3 sentences. Where things stand, what the user should
   keep in mind as they move forward. Warm, direct, never definitive.

### Tone rules — non-negotiable

- **Never issue a verdict.** Not "this is a scam." Not "this looks safe." The user decides.
- **Never make them feel naive.** Opening with "this was smart to check" or similar is fine.
  Implying they should have known better is never fine.
- **Never amplify anxiety.** Avoid: "danger," "threat," "victim," "warning," "red alert."
  Prefer: "worth noting," "something to look into," "a pattern to be aware of."
- **Always end with agency.** The user leaves holding the decision. The output informs —
  it never instructs.
- **Acknowledge the pressure.** When the context makes it clear someone is in a competitive
  situation, it's appropriate to briefly acknowledge that the scrutiny they're applying
  here is exactly the right instinct, even under pressure.

### Tone examples

❌ "WARNING: Multiple high-risk indicators detected. This is likely a scam. Do not respond."

✅ "This looks like a fairly standard initial recruiter outreach — the job description has
   specific details around team structure and scope that vague postings usually skip. One
   thing worth a closer look: the request to move to WhatsApp before any interview has
   taken place is a pattern that shows up frequently in fraudulent outreach. Real recruiters
   at established companies generally keep early conversations on the platform where they
   found you. Here's how you could easily check this out before deciding how to respond..."

---

## The Three Principles — Non-Negotiable

These apply to every design, copy, and engineering decision. If something conflicts with one
of these, it doesn't ship.

### 1. Privacy — the user's data is never ours to keep

- Zero server-side storage. The API call is made, the response returns, nothing is written
  to any database.
- Client-side PII scrubbing runs in the browser before anything is sent:
  - Email addresses → `[EMAIL REDACTED]`
  - Phone numbers → `[PHONE REDACTED]`
  - ID / SSN numbers → `[ID REDACTED]`
- **The scrubbing step is a visible UI feature, not background processing.**
  Show the user what was removed and what cleaned text will be sent, before they confirm.
  This moment builds more trust than any privacy policy.
- Project mode data lives exclusively in the user's browser (IndexedDB). Never synced.
- Be transparent about what IS shared: cleaned text goes to Anthropic's Claude API.
  Say this plainly. Note that Anthropic does not train on API data.
- No analytics on content — ever.

### 2. Tone — it never makes someone feel stupid or alarmed

- The output validates the instinct to check before it says anything else.
- Even in the clearest scam scenario, the language is empowering not alarming.
- The person came here feeling uncertain. They should leave feeling capable.
- This applies to UI copy, empty states, error messages, and loading states —
  not just the analysis output.

### 3. Agency — it never decides for the user

- The tool surfaces signals and provides context. The user makes the call.
- Next steps are framed as things the user *can* do, never *must* do.
- The product trusts the user's intelligence. It informs; it does not protect.
- This means no scores, no verdict labels, no traffic light systems.
  These all transfer the decision to the tool. That's not what this is.

---

## Claude Prompt Design

### System prompt (use for every analysis call)

```
You are a knowledgeable, experienced advisor helping a job seeker understand a job opportunity
and decide whether it deserves their time and trust.

You are not a scam detector. You do not issue verdicts. You think out loud with the person,
acknowledge nuance and ambiguity, and always end with practical steps they can take.

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
- Treat the person as an intelligent adult under real pressure
```

### Structured JSON output format

```json
{
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
  "bottomLine": "2–3 sentences. Warm, direct, never definitive."
}
```

---

## UI/UX Principles

- **Calm and clear.** The user is already carrying anxiety. The design should reduce it,
  not add to it. Nothing alarming — not in color, language, iconography, or motion.
- **No scores, no traffic lights, no verdict badges.** These transfer the decision to the
  product. The product doesn't decide.
- **The PII scrubbing moment is prominent and designed well.** It's a trust feature.
- **Progressive disclosure.** Bottom line and next steps are immediately visible.
  Details expand below.
- **Mobile-first.** Suspicious messages arrive on phones.
- **No account required** for Phase 1–3. Zero friction.
- **Neutral loading states.** "Taking a look..." not "Scanning for threats..."
- **Empty and error states follow the same tone rules.** Warm, calm, never alarming.

---

## Technical Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Anthropic Claude API — `claude-sonnet-4-6`
- **PII scrubbing:** Client-side regex, runs in the browser before any API call
- **Image analysis:** Claude vision — pass as base64 in the API messages array
- **URL fetching:** Next.js API route fetches URL, extracts meaningful text
  (strip HTML, navigation, boilerplate), passes clean text to Claude
- **Project mode storage:** IndexedDB via a simple wrapper utility — no server
- **Chrome Extension:** Manifest V3 (Phase 4)
- **Deployment:** Vercel — `ANTHROPIC_API_KEY` set as environment variable

---

## Build Order

### Phase 1 — MVP (start here)
- [ ] PII scrubbing utility — client-side regex for email, phone, ID
- [ ] Input: text paste with live scrubbing preview
- [ ] Input: screenshot / image upload with preview
- [ ] Privacy confirmation step — show cleaned text, confirm before sending
- [ ] API route — receives cleaned text or image, returns structured JSON from Claude
- [ ] Output rendering — situation → normal signals → notable signals → next steps → bottom line
- [ ] UI: clean, calm, mobile-first — no scores, no verdict language

### Phase 2 — URL Analysis
- [ ] URL input field
- [ ] Server-side fetch + meaningful text extraction (strip HTML boilerplate)
- [ ] Support: LinkedIn job posts, Indeed listings, company websites, LinkedIn profiles
- [ ] Same analysis pipeline and output format

### Phase 3 — Project Mode
- [ ] IndexedDB wrapper utility for local project storage
- [ ] Create / name a project
- [ ] Add submissions to a project over time
- [ ] Triangulation prompt: Claude receives all project submissions together
- [ ] Project view showing accumulated signals and how the picture has developed

### Phase 4 — Chrome Extension
- [ ] Manifest V3 scaffold
- [ ] Content script: inject analysis button on LinkedIn, Indeed, Gmail, WhatsApp Web
- [ ] Side panel UI — same components as web app
- [ ] Reads current page content, passes to web app API route
- [ ] Chrome Web Store submission

---

## What We Are Not Building

- A scoring system (0–100, percentages, confidence levels)
- A verdict engine ("scam" / "safe" / "proceed" / "avoid")
- A database of known scam domains, companies, or recruiters
- An account or login system (Phase 1–3)
- Anything that stores user-submitted content server-side
- A tool that makes decisions on behalf of the user

---

## Competitive Context

| | Existing tools | This product |
|---|---|---|
| Core question | "Is this a scam?" | "Can you help me understand this?" |
| Output | Score + verdict | Situation read + signals + next steps |
| Tone | Clinical, binary | Clear-eyed, warm, practical |
| Privacy | Fine print | Visible, designed in |
| Time horizon | Single scan | Longitudinal — project mode over time |
| User relationship | Tool to user | Thought partner to person |
| User outcome | Warned or cleared | Confident and capable to decide |

---

## Key Research (LinkedIn 2026)

These numbers should inform every design and copy decision.

- **72%** of professionals already question whether a role is real before applying
- **57%** are more likely to question legitimacy than a year ago
- **32% of Gen Z ignores red flags** because the market feels too competitive — our core user
- **90%** of scams involve moving the conversation off-platform
- The vulnerability window is the **first message** — over half of off-platform attempts
  happen before any trust is established
- **49%** of recruiters say job seekers have proactively asked if a role is genuine —
  this product helps people do that effectively

Sources: LinkedIn Job Search Safety Pulse 2026 · LinkedIn Talent Research 2026

---

*Built by Gina Benvenuto using Claude Code.*
*Part of [gina-portfolio.vercel.app](https://gina-portfolio.vercel.app)*
