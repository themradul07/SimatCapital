import type { Metadata } from "next";
import { DemoExperience } from "@/components/demo/DemoExperience";

/**
 * Interactive Demo — Unified horizontal platform combining Simat Capital (Fund Strategy)
 * and Shariah Ops (Automated Compliance & Ops Platform) with live 6-step engine.
 * Private: shared after a demo request, kept out of search engines.
 */
export const metadata: Metadata = {
  title: "Interactive Demo — Simat Capital & Shariah Ops",
  description: "A confidential, interactive walkthrough of the unified Simat Capital & Shariah Ops platform.",
  robots: { index: false, follow: false },
};

export default function DemoPage() {
  return <DemoExperience />;
}
