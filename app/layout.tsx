import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discern — Think clearly about any job opportunity",
  description:
    "Paste a job post, recruiter message, or email. Get a clear-eyed read with practical next steps — privately, no judgment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
