// The actual landing page is the static public/index.html, served at /
// via the rewrite in next.config.js. This file exists only so Next.js's
// App Router treats this as a full Next.js project (required for the
// /api/check route handler to deploy correctly on Vercel).
export default function Page() {
  return null;
}
