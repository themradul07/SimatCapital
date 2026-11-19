import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Demo",
  description: "Request access to the Simat Capital platform demo.",
};

export default function Demo() {
  return (
    <section className="relative overflow-hidden pt-[150px] pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="wrap relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div>
          <span className="chip-gold fade-in">Demo</span>
          <h1 className="h2 mt-6 fade-in" style={{ ["--d" as string]: "120ms" }}>
            See the platform <span className="italic-gold">working.</span>
          </h1>
          <p className="lede mt-6 fade-in" style={{ ["--d" as string]: "240ms" }}>
            The demo shows the Intelligence Desk the founder uses every day: the digital team at work, the checks, the approval
            step and the records. Access is by request while the platform is in its paper trading phase.
          </p>
          <ul className="mt-10 space-y-4 fade-in" style={{ ["--d" as string]: "360ms" }}>
            {[
              "Every figure in the demo is illustrative.",
              "Nothing in the demo is an offer or advice.",
              "The demo cannot place an order.",
            ].map((t) => (
              <li key={t} className="flex gap-4">
                <span className="mt-[9px] h-[7px] w-[7px] shrink-0 rotate-45" style={{ background: "var(--gold)" }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <Reveal delay={200}>
          <LeadForm variant="demo" />
        </Reveal>
      </div>
    </section>
  );
}
