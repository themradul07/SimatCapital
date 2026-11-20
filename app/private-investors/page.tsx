import type { Metadata } from "next";
import Link from "next/link";
import { ChapterGap, ChapterMethod, ChapterDiscipline } from "@/components/home/Sections";

export const metadata: Metadata = {
  title: { absolute: "For private investors · Simat Capital" },
  description: "A Shariah-compliant global equity strategy for the long term.",
};

/** Brief, Section 9: a single short page reusing Home chapters II, IV and V unchanged. */
export default function PrivateInvestors() {
  return (
    <>
      <section className="pt-[160px] pb-10 md:pt-[200px]">
        <div className="wrap">
          <h1 className="h1 fade-in">For private investors.</h1>
          <p className="lead fade-in mt-6 !text-[var(--text-secondary)]" style={{ ["--d" as string]: "120ms" }}>
            Simat Capital is building a Shariah-compliant global equity strategy for the long term. We do not accept external capital.
          </p>
        </div>
      </section>

      <ChapterGap thread={false} />
      <ChapterMethod thread={false} />
      <ChapterDiscipline thread={false} />

      <section className="section">
        <div className="wrap text-center">
          <Link href="/contact#waitlist" className="btn btn-gold">
            Join the waitlist
          </Link>
          <p className="mt-6 text-[14px] secondary">Registering interest is not an offer or a commitment to invest.</p>
        </div>
      </section>
    </>
  );
}
