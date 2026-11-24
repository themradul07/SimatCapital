import type { Metadata } from "next";
import InvestorDemo from "@/components/demo/InvestorDemo";

/**
 * Simat Capital investor overview. Standalone and confidential: shared from the
 * website's "Request a demo" button or sent after an enquiry. Kept out of search engines.
 */
export const metadata: Metadata = {
  title: { absolute: "Investor overview · Simat Capital" },
  description: "A confidential overview of Simat Capital's beliefs, process, risk controls and governance.",
  robots: { index: false, follow: false, nocache: true },
};

export default function DemoPage() {
  return <InvestorDemo />;
}
