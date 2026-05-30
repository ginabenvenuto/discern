// This page is never actually rendered — the rewrite in next.config.js
// (beforeFiles) intercepts / and serves public/index.html before Next.js
// reaches this file. It only exists so Vercel reliably detects the
// project as a Next.js App Router app and deploys the /api/check route.
export default function Page() {
  return null;
}
