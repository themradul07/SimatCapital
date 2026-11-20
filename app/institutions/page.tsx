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
        <p className="eyebrow">Chapter {n}</p>
        <h2 id={`${id}-h`} className="h2 mt-4">
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
          <p className="eyebrow fade-in">For family offices and institutions</p>
          <h1 className="h1 fade-in mt-6 max-w-[18ch]" style={{ ["--d" as string]: "100ms" }}>
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

      <div className="wrap grid gap-12 pb-24 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside>
          <SideIndex items={CHAPTERS} />
        </aside>

        <div className="min-w-0">
          <Ch id="status" n={1} title="Where we are today.">
            <StatusGlance />
          </Ch>

          <Ch
            id="process"
            n={2}
            title={
              <>
                One cycle, end to end. <span className="em-gold">The last step feeds the first.</span>
              </>
            }
          >
            <InvestmentLoop />
            <Reveal className="mt-16">
              <h3 className="h3">Every idea must answer five questions.</h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Why this company?", "Why this price?", "What might the market be missing?", "What could go wrong?", "What would change our mind?"].map(
                  (q, i) => (
                    <li key={q} className="flex items-baseline gap-4 border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
                      <span className="ill-num text-[19px]">{i + 1}</span>
                      <span style={{ color: "var(--text-primary)" }}>{q}</span>
                    </li>
                  ),
                )}
              </ol>
            </Reveal>
          </Ch>

          <Ch
            id="engine"
            n={3}
            title="Specialised research models. One discipline each."
            summary="Each model covers one discipline, works from stored data and records its reasoning. None can place an order."
          >
            <EngineMap />
            <div className="mt-20">
              <DecisionEngine withToggle />
            </div>
          </Ch>

          <Ch id="shariah" n={4} title="Shariah discipline, applied at every stage.">
            <ShariahFilter expanded />
            <p className="mt-8 text-[13px] secondary">
              Thresholds follow the firm&apos;s adopted Shariah methodology and are verified against its current published version.
            </p>
            <div className="mt-14">
              <Lines
                items={[
                  "Methodology stored as data with every decision",
                  "Re-screened on every new filing and each quarter",
                  "Purification calculated per holding, held in a ledger, reported quarterly",
                  "Uncertain cases excluded until resolved, with the decision recorded",
                  "Adaptable to a client's own Shariah standard where required",
                ]}
              />
            </div>
          </Ch>

          <Ch
            id="governance"
            n={5}
            title="When anything is uncertain, nothing proceeds."
            summary="Controls are enforced by the system, not by habit, and every exception is recorded."
          >
            <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-3" style={{ background: "var(--hairline)" }}>
              {CONTROLS.map(([t, d]) => (
                <div key={t} className="p-6" style={{ background: "var(--bg-base)" }}>
                  <p className="flex items-center gap-3">
                    <span className="dia dia-outline" aria-hidden />
                    <span className="ill-label">{t}</span>
                  </p>
                  <p className="ill-sub mt-2 !text-[14px]">{d}</p>
                </div>
              ))}
            </div>
            <Reveal className="mt-14">
              <h3 className="h3">Governance</h3>
              <div className="mt-6">
                <Lines
                  items={[
                    "The founder sets the mandate and makes every final decision",
                    "Strong results never loosen risk limits automatically; changes are proposed, reviewed and recorded",
                    "No trade quota; cash is held when ideas are scarce",
                  ]}
                />
              </div>
            </Reveal>
          </Ch>

          <Ch id="measurement" n={6} title="Principles, stated in advance.">
            <TwoStrategies full />
            <Reveal className="mt-16">
              <h3 className="h3">Measurement</h3>
              <div className="mt-6">
                <Lines
                  items={[
                    "Net of all costs",
                    "Against a stated benchmark",
                    "Risk-adjusted: volatility, Sharpe and Sortino ratios, maximum drawdown",
                    "Sample size always shown",
                    "No figures published until independently verified and cleared by legal review",
                  ]}
                />
              </div>
            </Reveal>
            <Reveal className="mt-16">
              <h3 className="h3">Why not simply buy a Shariah ETF?</h3>
              <p className="body mt-3">ETFs are not bad. They make different trade-offs.</p>
              <div className="mt-8 overflow-x-auto">
                <table className="table min-w-[560px]">
                  <thead>
                    <tr>
                      <th scope="col">Topic</th>
                      <th scope="col">Passive Shariah ETF</th>
                      <th scope="col">Simat Capital</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map(([t, etf, simat]) => (
                      <tr key={t}>
                        <th scope="row" className="!border-b !py-[18px] !text-[15px] !font-medium !normal-case !tracking-normal" style={{ color: "var(--text-primary)", borderColor: "var(--hairline)" }}>
                          {t}
                        </th>
                        <td>{etf}</td>
                        <td style={{ color: "var(--text-primary)" }}>{simat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-5 text-[13px] secondary">A general comparison of approaches, not of any named product.</p>
            </Reveal>
          </Ch>

          <Ch id="questions" n={7} title="Founder and questions">
            <Founder condensed />
            <div className="faq mt-16 border-t" style={{ borderColor: "var(--hairline)" }}>
              {FAQS.map((f) => (
                <details key={f.q}>
                  <summary>
                    {f.q}
                    <span className="plus" aria-hidden />
                  </summary>
                  <p className="answer">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="mt-12">
              <Link href="/contact#enquiry" className="btn btn-gold">
                Make an enquiry
              </Link>
            </div>
          </Ch>
        </div>
      </div>
    </>
  );
}
