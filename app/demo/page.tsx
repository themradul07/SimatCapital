import type { Metadata } from "next";
import { DemoExperience } from "@/components/demo/DemoExperience";

/**
 * Investor demo (brief, B). Private: shared only after a demo request, never linked publicly.
 * Kept out of search engines regardless of SITE_INDEXABLE.
 */
export const metadata: Metadata = {
  title: "Investor demo",
  description: "A confidential, illustrative walkthrough of how Simat Capital researches, screens, decides and records.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <DemoExperience />;
}
