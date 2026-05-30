# Job Opportunity Checker

An AI-powered tool that helps job seekers evaluate whether an opportunity looks legitimate — or like a scam.

**Live:** [job-scam-checker.vercel.app](https://job-scam-checker.vercel.app)  
**Part of:** [Gina Benvenuto's Portfolio](https://gina-portfolio.vercel.app)

## What it does

Paste in a job posting, recruiter email, LinkedIn message, or screenshot text. The tool uses Claude to analyze:

- **Trust level** — High / Medium / Low / Unknown
- **Red flags** — Specific scam signals identified in the text
- **Green flags** — Positive signs of legitimacy  
- **What to do next** — Practical, kind guidance

No data is stored. Every analysis is stateless.

## Built with

- [Next.js 14](https://nextjs.org/) (App Router + API Routes)
- TypeScript + Tailwind CSS
- [Anthropic Claude API](https://www.anthropic.com) (`claude-sonnet-4-6`)
- Deployed on [Vercel](https://vercel.com)
- Built using [Claude Code](https://claude.ai/code)

## Run locally

```bash
npm install

# Copy env file and add your Anthropic API key
cp .env.example .env.local

npm run dev
```

Get your API key at [console.anthropic.com](https://console.anthropic.com).
