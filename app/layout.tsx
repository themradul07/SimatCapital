import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * Brief, Section D: keep the site noindex until the solicitor has signed off.
 * Set SITE_INDEXABLE=true in the environment only after sign-off.
 */
const indexable = process.env.SITE_INDEXABLE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Simat Capital · Shariah-compliant global equity",
    template: "%s · Simat Capital",
  },
  description:
    "Shariah-compliant global equity, built on a proprietary research engine, systematic controls and human judgement.",
  robots: indexable ? undefined : { index: false, follow: false },
  openGraph: {
    siteName: "Simat Capital",
    type: "website",
  },
};

/**
 * Root layout: fonts and document shell only.
 * The website chrome (header, footer) lives in app/(site)/layout.tsx, so the
 * standalone investor demo at /demo renders full screen with none of it.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
