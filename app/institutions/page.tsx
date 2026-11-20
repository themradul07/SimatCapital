import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SideIndex from "@/components/institutions/SideIndex";
import StatusGlance from "@/components/illustrations/StatusGlance";
import InvestmentLoop from "@/components/illustrations/InvestmentLoop";
import EngineMap from "@/components/illustrations/EngineMap";
import DecisionEngine from "@/components/illustrations/DecisionEngine";
import ShariahFilter from "@/components/illustrations/ShariahFilter";
import TwoStrategies from "@/components/illustrations/TwoStrategies";
import Founder from "@/components/home/Founder";

export const metadata: Metadata = {
  title: { absolute: "Process, controls and governance · Simat Capital" },
  description: "How Simat Capital researches, screens, decides and records every investment decision.",
};

const CHAPTERS = [
  { id: "status", label: "Status, plainly" },
  { id: "process", label: "The investment process" },
  { id: "engine", label: "The research engine" },
  { id: "shariah", label: "Shariah method" },
  { id: "governance", label: "Governance and controls" },
  { id: "measurement", label: "Strategies and measurement" },
  { id: "questions", label: "Founder and questions" },
];

function Ch({ id, n, title, summary, children }: { id: string; n: number; title: ReactNode; summary?: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t py-20 md:py-28" style={{ borderColor: "var(--hairline)" }} aria-labelledby={`${id}-h`}>
      <Reveal>
        <h2 id={`${id}-h`} className="h2">
          {title}
        </h2>
        {summary && <p className="lead mt-6">{summary}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function Lines({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex gap-4 text-[16px] secondary">
          <span className="dia mt-[9px]" aria-hidden />
          {t}
        </li>
      ))}
    </ul>
  );
}

const CONTROLS = [
  ["Pre-trade checks", "Eleven checks run before any order reaches approval."],
  ["Single order route", "One authorised service sends orders; research models cannot."],
  ["Bound approval", "Each approval covers one exact order; any change cancels it."],
  ["Approval window", "Unused approvals expire."],
  ["Reconciliation", "Accounts reconciled with the broker every day."],
  ["Audit trail", "Every proposal, rejection and approval stored with its reasoning."],
];

const COMPARISON = [
  ["Selection", "Owns every compliant company at any price", "Buys only at a sensible price"],
  ["Concentration", "Weights follow the index, often heavy in a few large names", "Hard position and sector limits; conviction over index weight"],
  ["Compliance timing", "Re-screened at index review dates", "Re-screened on every new filing"],
  ["Purification", "Often left to the investor", "Calculated and recorded for every holding"],
  ["Downturns", "Falls with the index", "Risk set before every trade; cash held when ideas are scarce"],
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Can I invest today?",
    a: "No. Simat Capital does not accept external capital. You can join the waitlist to register interest; this is not an offer or a commitment.",
  },
  {
    q: "Is Simat Capital regulated?",
    a: "No. Simat Capital is not authorised by the Financial Conduct Authority and will not accept external capital unless an appropriate regulatory structure is in place.",
  },
  {
    q: "How is Shariah compliance applied?",
    a: "Every company passes four screens under a recognised methodology before it can be proposed, and is re-screened on every new filing.",
  },
  { q: "How is purification handled?", a: "Calculated for every holding, recorded in a ledger and reported quarterly." },
  { q: "What role does technology play?", a: "It researches, tests and records. It cannot place an order or make a decision." },
  {
    q: "How is my information protected?",
    a: (
      <>
        See our{" "}
        <Link href="/privacy" className="text-link">
          Privacy notice
        </Link>
        . Submissions are read only by the founder.
      </>
    ),
  },
];

export default function Institutions() {
  return (
    <>
      {/* Intro */}
      <section className="pt-[160px] pb-20 md:pt-[200px] md:pb-24">
        <div className="wrap">
          <h1 className="h1 fade-in max-w-[18ch]" style={{ ["--d" as string]: "100ms" }}>
            Process, controls and governance, <span className="em-gold">in full.</span>
          </h1>
          <p className="lead fade-in mt-6 !text-[var(--text-secondary)]" style={{ ["--d" as string]: "200ms" }}>
            What an allocator would ask, answered plainly.
          </p>
          <div className="fade-in mt-9" style={{ ["--d" as string]: "300ms" }}>
            <Link href="/contact#demo" className="btn btn-gold">
              Request a demo
            </Link>
          </div>
        </div>
      </section>

      {/* Chapters wrapped with sticky side index */}
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <SideIndex items={CHAPTERS} />
          </aside>
          <div className="min-w-0">
            {/* Ch 1: Status */}
            <Ch id="status" n={1} title="Status, plainly." summary="Where the firm stands today, what it manages, and what it cannot do.">
              <StatusGlance />
            </Ch>

            {/* Ch 2: Process */}
            <Ch
              id="process"
              n={2}
              title="The investment process."
              summary="From universe to portfolio. Four gates; every trade decided by a person."
            >
              <InvestmentLoop />
              <div className="mt-14 space-y-4">
                <p className="body">
                  No company enters the portfolio without clearing every gate. Rejections are preserved so work is not repeated.
                </p>
              </div>
            </Ch>

            {/* Ch 3: Engine */}
            <Ch
              id="engine"
              n={3}
              title="The research engine."
              summary="Ten models. Each reads primary filings, prices and transcripts in its domain."
            >
              <EngineMap />
              <div className="mt-14">
                <DecisionEngine withToggle />
              </div>
            </Ch>

            {/* Ch 4: Shariah */}
            <Ch
              id="shariah"
              n={4}
              title="Shariah method."
              summary="Four screens under a recognised methodology. Monitored continuously."
            >
              <ShariahFilter />
              <div className="mt-12 space-y-4">
                <Lines
                  items={[
                    "Purification calculated for each holding and reported quarterly",
                    "No leverage, no short selling, no interest-bearing cash",
                    "Uncertain cases excluded until resolved",
                    "Continuous re-screening on every regulatory filing",
                  ]}
                />
              </div>
            </Ch>

            {/* Ch 5: Governance */}
            <Ch id="governance" n={5} title="Governance and controls." summary="Hard rules in code that cannot be bypassed by an operator.">
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {CONTROLS.map(([title, desc]) => (
                  <div key={title} className="panel p-6">
                    <span className="dia" aria-hidden />
                    <h3 className="serif mt-4 text-[20px]" style={{ color: "var(--text-primary)" }}>
                      {title}
                    </h3>
                    <p className="mt-2 text-[14px] secondary">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <h3 className="h3">How Simat compares to a passive Shariah ETF</h3>
                <div className="mt-6 overflow-x-auto">
                  <table className="table min-w-[640px]">
                    <thead>
                      <tr>
                        <th scope="col">Dimension</th>
                        <th scope="col">Typical passive Shariah ETF</th>
                        <th scope="col">Simat Capital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map(([dim, etf, simat]) => (
                        <tr key={dim}>
                          <td>{dim}</td>
                          <td>{etf}</td>
                          <td style={{ color: "var(--text-primary)" }}>{simat}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Ch>

            {/* Ch 6: Measurement */}
            <Ch
              id="measurement"
              n={6}
              title="Strategies and measurement."
              summary="Two distinct books. Never merged, independently tracked."
            >
              <TwoStrategies full />
            </Ch>

            {/* Ch 7: Questions */}
            <Ch id="questions" n={7} title="Founder and common questions.">
              <Founder condensed />
              <div className="mt-16">
                <h3 className="h3 mb-6">Frequently asked questions</h3>
                <div className="faq divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
                  {FAQS.map((f) => (
                    <details key={f.q}>
                      <summary>
                        <span>{f.q}</span>
                        <span className="plus" aria-hidden />
                      </summary>
                      <div className="answer">{f.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            </Ch>
          </div>
        </div>
      </div>
    </>
  );
}
