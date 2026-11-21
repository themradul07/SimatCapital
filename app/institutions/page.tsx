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
        <h2 id={`${id}-h`} className="h2 text-balance">
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

const FIVE_QUESTIONS = [
  "Why this company?",
  "Why this price?",
  "What might the market be missing?",
  "What could go wrong?",
  "What would change our mind?",
];

const SHARIAH_POINTS = [
  "Methodology stored as data with every decision",
  "Re-screened on every new filing and each quarter",
  "Purification calculated per holding, held in a ledger, reported quarterly",
  "Uncertain cases excluded until resolved, with the decision recorded",
  "Adaptable to a client's own Shariah standard where required",
];

const GOVERNANCE = [
  "The founder sets the mandate and makes every final decision",
  "Strong results never loosen risk limits automatically; changes are proposed, reviewed and recorded",
  "No trade quota; cash is held when ideas are scarce",
];

const MEASUREMENT = [
  "Net of all costs",
  "Against a stated benchmark",
  "Risk-adjusted: volatility, Sharpe and Sortino ratios, maximum drawdown",
  "Sample size always shown",
  "No figures published until independently verified and cleared by legal review",
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
          <p className="eyebrow fade-in">For family offices and institutions</p>
          <h1 className="h1 fade-in mt-5 max-w-[18ch]" style={{ ["--d" as string]: "100ms" }}>
            The process, the controls and the governance, <span className="em-gold">in full.</span>
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
            <Ch id="status" n={1} title="Where we are today.">
              <StatusGlance />
            </Ch>

            {/* Ch 2: Process */}
            <Ch
              id="process"
              n={2}
              title={<>One cycle, end to end. <span className="em-gold">The last step feeds the first.</span></>}
            >
              <InvestmentLoop />
              <div className="mt-14">
                <h3 className="h3 mb-6">Every idea must answer five questions.</h3>
                <ol className="grid gap-x-10 gap-y-4 md:grid-cols-2">
                  {FIVE_QUESTIONS.map((q, i) => (
                    <li key={q} className="flex items-baseline gap-4 text-[17px]" style={{ color: "var(--text-primary)" }}>
                      <span className="ill-num w-5 shrink-0 text-[20px]">{i + 1}</span>
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            </Ch>

            {/* Ch 3: Engine */}
            <Ch
              id="engine"
              n={3}
              title="Specialised research models. One discipline each."
              summary="Each model covers one discipline, works from stored data and records its reasoning. None can place an order."
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
              title="Shariah discipline, applied at every stage."
            >
              <ShariahFilter expanded />
              <p className="mt-10 text-[13px] secondary">
                Thresholds follow the firm&apos;s adopted Shariah methodology and are verified against its current published version.
              </p>
              <div className="mt-12">
                <Lines items={SHARIAH_POINTS} />
              </div>
            </Ch>

            {/* Ch 5: Governance */}
            <Ch id="governance" n={5} title="When anything is uncertain, nothing proceeds." summary="Controls are enforced by the system, not by habit, and every exception is recorded.">
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
                <h3 className="h3 mb-6">Governance</h3>
                <Lines items={GOVERNANCE} />
              </div>
            </Ch>

            {/* Ch 6: Measurement */}
            <Ch id="measurement" n={6} title="Principles, stated in advance.">
              <TwoStrategies full />
              <div className="mt-14">
                <h3 className="h3 mb-6">Measurement</h3>
                <Lines items={MEASUREMENT} />
              </div>
              <div className="mt-14">
                <h3 className="h3">Why not simply buy a Shariah ETF?</h3>
                <p className="body mt-3 secondary">ETFs are not bad. They make different trade-offs.</p>
                <div className="mt-6 overflow-x-auto">
                  <table className="table min-w-[640px]">
                    <thead>
                      <tr>
                        <th scope="col">Topic</th>
                        <th scope="col">Passive Shariah ETF</th>
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
                <p className="mt-4 text-[13px] secondary">A general comparison of approaches, not of any named product.</p>
              </div>
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
                <div className="mt-10">
                  <Link href="/contact#enquiry" className="btn btn-gold">
                    Make an enquiry
                  </Link>
                </div>
              </div>
            </Ch>
          </div>
        </div>
      </div>
    </>
  );
}
