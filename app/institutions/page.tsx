import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SideIndex from "@/components/SideIndex";
import InvestmentCycle from "@/components/InvestmentCycle";
import DecisionFlow from "@/components/DecisionFlow";
import ShariahGate from "@/components/ShariahGate";
import TwoBooks from "@/components/TwoBooks";
import EtfTable from "@/components/EtfTable";
import Founder from "@/components/Founder";
import Faq, { faqCore } from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import Arrow from "@/components/Arrow";

export const metadata: Metadata = {
  title: "For Family Offices and Institutions",
  description:
    "The Simat Capital investment process, controls, Shariah method, governance and security, in full.",
};

const index = [
  { id: "status", label: "Status, plainly" },
  { id: "process", label: "The investment process" },
  { id: "team", label: "The digital investment team" },
  { id: "decision", label: "A person decides" },
  { id: "controls", label: "The controls" },
  { id: "shariah", label: "Shariah method" },
  { id: "strategies", label: "Two strategies" },
  { id: "governance", label: "Governance" },
  { id: "proof", label: "How we prove it works" },
  { id: "day", label: "A day on the platform" },
  { id: "security", label: "Security and data" },
  { id: "benchmarks", label: "Benchmarks" },
  { id: "etf", label: "Versus a Shariah ETF" },
  { id: "founder", label: "The founder" },
  { id: "faq", label: "Questions" },
  { id: "briefing", label: "Request the briefing" },
];

const team = [
  ["CIO / Orchestrator", "Assigns work, tracks status, escalates"],
  ["Portfolio Manager", "Turns decisions into sized, costed proposals"],
  ["Research", "Keeps the thesis for each holding and candidate, every claim sourced"],
  ["Valuation", "Maintains fair-value ranges and scenarios"],
  ["Tactical Trading", "Develops short-term candidates for Simat Catalyst"],
  ["Risk", "Tests exposure, drawdown, concentration and liquidity; argues the bear case"],
  ["Shariah Compliance", "Screens, watches holdings, tracks purification"],
  ["Market Intelligence", "Flags material news, earnings and events"],
  ["Performance and Attribution", "Measures against benchmarks; checks forecasts against outcomes"],
  ["Investment Committee", "Weighs both sides, records the decision and any dissent"],
  ["Reporting", "Writes daily, quarterly and annual reports from system records"],
  ["Data Quality and Infrastructure", "Flags stale data, failed jobs and outages"],
];

const controls = [
  ["Eleven pre-trade checks", "Run by code before any order reaches approval. A failed or unknown check blocks the trade."],
  ["One sender", "One locked-down service is the only thing that can send an order. Agents hold no broker keys."],
  ["Bound approval", "Passkey approval tied to one exact, versioned order. A material change cancels it."],
  ["Approval window", "Orders have an approval window. An old approval is refused."],
  ["No duplicates", "A timeout never leads to a duplicate order."],
  ["Broker truth", "An order counts as filled only when the broker's own records show it."],
  ["Reconciliation", "Holdings and cash reconciled to the broker every night and before orders. Any difference stops new orders until explained."],
  ["Kill switch", "Cancels open orders and blocks new ones in seconds. It never sells a holding by itself."],
  ["Fail closed", "Stale prices, stale Shariah screens, broker disconnects and unresolved breaks all block new orders."],
  ["Plain instruments", "No leverage, margin, shorting or derivatives."],
];

const day = [
  ["Early morning", "Data refreshed, changed companies re-screened"],
  ["Early morning", "Accounts reconciled to the broker"],
  ["Morning", "Morning brief for the CIO, every figure checked"],
  ["Market hours", "News triage, proposals and alerts to the CIO"],
  ["After each close", "Closing snapshot of prices, value and results"],
  ["Evening", "Fills reconciled, end-of-day report delivered"],
  ["Overnight", "Backup and a locked, tamper-evident audit copy"],
];

function Block({ id, eyebrow, title, lede, children }: { id: string; eyebrow: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className="border-t py-20 first:border-t-0 first:pt-0 md:py-28" style={{ borderColor: "var(--line-soft)" }}>
      <Reveal>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="h2 mt-5 max-w-3xl">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={160}>
          <p className="lede mt-6">{lede}</p>
        </Reveal>
      )}
      {children && <div className="mt-12">{children}</div>}
    </section>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-4 md:grid-cols-2">
      {items.map((t, i) => (
        <Reveal as="li" key={i} delay={i * 60} className="flex gap-4">
          <span className="mt-[9px] h-[7px] w-[7px] shrink-0 rotate-45" style={{ background: "var(--gold)" }} />
          <span>{t}</span>
        </Reveal>
      ))}
    </ul>
  );
}

export default function Institutions() {
  return (
    <>
      <Hero
        eyebrow="For family offices and institutions"
        lines={["The process, the controls", "and the governance,", "*in* *full.*"]}
        lede="Simat Capital runs a private digital investment team: AI agents research and propose, code enforces the rules, and a person approves every investment decision. This page sets out how, and what is not yet in place."
        actions={
          <>
            <a href="#briefing" className="btn btn-gold">
              Request the investor briefing <Arrow />
            </a>
            <Link href="/demo" className="btn btn-ghost">Watch the demo</Link>
          </>
        }
      />

      <div className="wrap grid gap-16 pb-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside>
          <SideIndex items={index} />
        </aside>

        <div>
          <Block
            id="status"
            eyebrow="Status, plainly"
            title={<>What exists today, <span className="italic-gold">and what does not.</span></>}
            lede="We would rather you hear this from us first."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Reveal className="card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "var(--ok)" }}>In place</p>
                <ul className="mt-4 space-y-2.5 text-[15px]">
                  <li>The investment process and digital team, end to end</li>
                  <li>Code-enforced pre-trade checks and passkey approval</li>
                  <li>MSCI Islamic screening, stored as data</li>
                  <li>Paper (practice) accounts, reconciled and recorded</li>
                </ul>
              </Reveal>
              <Reveal delay={120} className="card">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] gold">Not yet available</p>
                <ul className="mt-4 space-y-2.5 text-[15px] muted">
                  <li>No track record yet: paper trading phase</li>
                  <li>No outside capital managed</li>
                  <li>Shariah adviser not yet appointed; interim rulings marked as interim</li>
                  <li>Independent security review planned before outside money is taken</li>
                </ul>
              </Reveal>
            </div>
          </Block>

          <Block
            id="process"
            eyebrow="The investment process"
            title={<>One cycle, end to end. <span className="italic-gold">The last step feeds the first.</span></>}
          >
            <InvestmentCycle />
          </Block>

          <Block
            id="team"
            eyebrow="The digital investment team"
            title={<>Twelve roles. <span className="italic-gold">One job each.</span></>}
            lede="Roles never overlap and none can place an order. The founder sets the mandate and risk appetite and does not direct each agent's next task. He steps in for approvals, exceptions, disputed Shariah rulings, material risk decisions and activating live capital."
          >
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {team.map(([r, j], i) => (
                <Reveal key={r} delay={(i % 3) * 80} className="card" style={{ padding: 22 }}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold" style={{ color: "var(--cream)" }}>{r}</p>
                    <span className="text-[11px] font-semibold" style={{ color: "var(--faint)" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-2 text-[14px] muted">{j}</p>
                </Reveal>
              ))}
            </div>
          </Block>

          <Block
            id="decision"
            eyebrow="A person decides"
            title={<>The same picture, <span className="italic-gold">opened up.</span></>}
            lede="Switch between depths. The flow does not change; only the detail does."
          >
            <DecisionFlow initialMode="technical" />
          </Block>

          <Block
            id="controls"
            eyebrow="The controls"
            title={<>Fail closed. <span className="italic-gold">Always.</span></>}
            lede="Short, factual statements of how the platform is designed. Test results will be published only after acceptance testing passes."
          >
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--line)" }}>
              {controls.map(([k, v], i) => (
                <Reveal
                  key={k}
                  delay={i * 40}
                  className="grid gap-2 border-b p-5 last:border-b-0 md:grid-cols-[220px_1fr] md:gap-8 md:p-6"
                  style={{ borderColor: "var(--line-soft)", background: i % 2 ? "var(--bg)" : "var(--bg-2)" }}
                >
                  <p className="flex items-center gap-3 font-semibold" style={{ color: "var(--cream)" }}>
                    <span className="text-[12px] gold" style={{ fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                    {k}
                  </p>
                  <p className="muted">{v}</p>
                </Reveal>
              ))}
            </div>
          </Block>

          <Block
            id="shariah"
            eyebrow="Shariah method"
            title={<>MSCI Islamic, <span className="italic-gold">stored as data.</span></>}
            lede="The method is held as data so it can change if the adviser decides otherwise. Shariah-compliant by method; not a certification."
          >
            <ShariahGate />
            <div className="mt-10">
              <Bullets
                items={[
                  <><b style={{ color: "var(--cream)" }}>Screening layers:</b> business activity (excluded sectors), financial ratios (debt, cash and interest-bearing securities, receivables), prohibited income (capped at 5% of income), then a final pre-trade check using a recent screen.</>,
                  <><b style={{ color: "var(--cream)" }}>Disputes:</b> where two sources disagree, the stock waits for a ruling and the ruling is recorded. Until an adviser is appointed, interim rulings by the CIO are marked as interim.</>,
                  <><b style={{ color: "var(--cream)" }}>Holdings watch:</b> every holding re-screened after each new report and each quarter. A holding that drifts is flagged, then handled under the method&apos;s exit rule.</>,
                  <><b style={{ color: "var(--cream)" }}>Purification:</b> calculated and recorded per holding, with a ledger and a quarterly report.</>,
                  <><b style={{ color: "var(--cream)" }}>Account settings:</b> no interest on cash, no share lending, no borrowing, no short selling.</>,
                  <><b style={{ color: "var(--cream)" }}>Quarterly Shariah report:</b> every holding against its limits, the watch list, rulings made and the purification ledger.</>,
                ]}
              />
            </div>

            <Reveal className="card mt-12 md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="serif text-[26px]" style={{ color: "var(--cream)" }}>Worked example: Northfield Instruments</p>
                <span className="tag-illustrative">Illustrative</span>
              </div>
              <p className="mt-2 text-[13px]" style={{ color: "var(--faint)" }}>Invented company and invented data, to show the shape of a screen only.</p>
              <div className="mt-8 grid gap-3 md:grid-cols-4">
                {[
                  ["Business activity", "Industrial sensors. No excluded activity."],
                  ["Financial ratios", "Debt, cash and receivables within the method's limits."],
                  ["Prohibited income", "Below the 5% cap. Impure share recorded for purification."],
                  ["Pre-trade check", "Screen is recent. Passed to the CIO."],
                ].map(([t, d], i) => (
                  <div key={t} className="rounded-xl border p-5" style={{ borderColor: "rgba(63,207,142,0.3)", background: "var(--ok-wash)" }}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--ok)" }}>Test {i + 1} · Pass</p>
                    <p className="mt-2 font-semibold" style={{ color: "var(--cream)" }}>{t}</p>
                    <p className="mt-1 text-[13.5px] muted">{d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Block>

          <Block
            id="strategies"
            eyebrow="Two strategies, one platform"
            title={<>Two books, <span className="italic-gold">never merged.</span></>}
            lede="One cannot borrow from the other's cash or limits. The combined view is for reading only."
          >
            <TwoBooks detail="full" />
          </Block>

          <Block
            id="governance"
            eyebrow="Governance and the human role"
            title={<>Risk and Shariah are <span className="italic-gold">hard constraints</span>, never advice.</>}
          >
            <Reveal className="card md:p-10">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] muted">Limits come in three levels. The stricter rule wins.</p>
              <div className="mt-8 space-y-4">
                {[
                  ["Normal", "Applies every day", 55],
                  ["Exception", "Needs the CIO's recorded approval", 78],
                  ["Absolute maximum", "Nothing overrides it", 100],
                ].map(([k, v, w], i) => (
                  <div key={k as string} className="grid items-center gap-3 md:grid-cols-[180px_1fr]">
                    <p className="font-semibold" style={{ color: "var(--cream)" }}>{k}</p>
                    <div className="relative h-11 overflow-hidden rounded-lg" style={{ background: "var(--bg)" }}>
                      <div
                        className="absolute inset-y-0 left-0 flex items-center rounded-lg px-4 text-[13px]"
                        style={{
                          width: `${w}%`,
                          background: i === 2 ? "linear-gradient(90deg, rgba(226,114,107,0.12), rgba(226,114,107,0.3))" : `rgba(214,180,106,${0.1 + i * 0.08})`,
                          borderRight: `2px solid ${i === 2 ? "var(--stop)" : "var(--gold)"}`,
                          color: "var(--cream)",
                        }}
                      >
                        {v}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[12.5px]" style={{ color: "var(--faint)" }}>Values are not published. Bars show the relationship between levels only.</p>
            </Reveal>
            <div className="mt-10">
              <Bullets
                items={[
                  "The founder defines the mandate and makes final capital decisions.",
                  "Performance never raises risk. A strong year, a gap to the benchmark or a fall from a peak never raises a limit or the risk taken.",
                  "No trade quota and no target number of holdings. With too few good ideas, the portfolio holds cash.",
                  "When data is incomplete, Shariah status is unclear or confidence is low, the system stops and sends the decision to the CIO.",
                  "Live trading is never inferred from the calendar. A readiness report goes to the CIO, who decides.",
                ]}
              />
            </div>
          </Block>

          <Block
            id="proof"
            eyebrow="How we prove it works"
            title={<>Designed to be <span className="italic-gold">checked.</span></>}
            lede="How the platform is designed and tested. Results will be stated only once acceptance testing has passed."
          >
            <Bullets
              items={[
                "Every number in an AI-written memo or report is matched to stored data. Unmatched numbers are struck out.",
                "Every claim ties to a stored source, with a sample checked by a person each week.",
                "Forecasts are locked at the time of the decision and scored against what happened.",
                "Controls are tested before every release, including orders built to fail that must be refused.",
                "Jobs and reports run on schedule; an alert fires if the end-of-day report is missing.",
                "Agents are reviewed on the value they add.",
                "Performance is net of costs, compared with a benchmark over the same period, with sample-size warnings.",
              ]}
            />
          </Block>

          <Block id="day" eyebrow="A day in the life of the platform" title={<>From first data <span className="italic-gold">to locked record.</span></>}>
            <ol className="relative ml-2 border-l" style={{ borderColor: "var(--line)" }}>
              {day.map(([t, d], i) => (
                <Reveal as="li" key={i} delay={i * 90} className="relative pb-8 pl-8 last:pb-0">
                  <span className="absolute -left-[6px] top-[7px] h-[11px] w-[11px] rotate-45" style={{ background: "var(--bg)", border: "1.5px solid var(--gold)" }} />
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] gold">{t}</p>
                  <p className="mt-1 text-[17px]" style={{ color: "var(--cream)" }}>{d}</p>
                </Reveal>
              ))}
            </ol>
          </Block>

          <Block id="security" eyebrow="Security and data" title={<>AI drafts. <span className="italic-gold">It never holds a key.</span></>}>
            <Bullets
              items={[
                "Private sign-in with passkeys. No page loads before sign-in.",
                "Audit records are chained, so any edit is detected and raises an alert.",
                "Secrets are kept in a protected store. Only the execution service can read the order key. Keys are rotated regularly.",
                "Backups allow recovery to any point in a recent window.",
                "An independent security review is planned before outside money is taken.",
                "AI is used for research and drafting only. It never holds a key or sends an order.",
              ]}
            />
          </Block>

          <Block id="benchmarks" eyebrow="Benchmarks and measurement" title={<>Principles, <span className="italic-gold">stated in advance.</span></>}>
            <div className="grid gap-5 md:grid-cols-2">
              <Reveal className="card">
                <p className="serif text-[24px]" style={{ color: "var(--cream)" }}>Flagship Fund</p>
                <p className="mt-2 muted">Compared first with a recognised Shariah global benchmark, with a Shariah US index and a conventional market index as references.</p>
              </Reveal>
              <Reveal delay={120} className="card">
                <p className="serif text-[24px]" style={{ color: "var(--cream)" }}>Simat Catalyst</p>
                <p className="mt-2 muted">Compared first with a broad Shariah global market index, with the same Shariah global benchmark as a second reference.</p>
              </Reveal>
            </div>
            <div className="mt-10">
              <Bullets
                items={[
                  "Measured in pounds sterling.",
                  "Simple excess return reported separately from risk-adjusted measures.",
                  "Money added or withdrawn by investors never counts as performance.",
                ]}
              />
            </div>
          </Block>

          <Block id="etf" eyebrow="A fair question" title={<>Why not simply buy a <span className="italic-gold">Shariah ETF?</span></>}>
            <EtfTable full />
          </Block>

          <section id="founder" className="border-t py-20 md:py-28" style={{ borderColor: "var(--line-soft)" }}>
            <Founder long />
          </section>

          <Block id="faq" eyebrow="Questions" title={<>For investors <span className="italic-gold">and advisers.</span></>}>
            <Faq
              items={[
                faqCore[2],
                faqCore[1],
                faqCore[0],
                { q: "Do you have a track record?", a: "Not yet. Simat Capital is in a paper trading phase. Our record is being built transparently: forecasts are locked at decision time and scored, and performance will be reported net of costs against a stated benchmark, with sample size and drawdown shown." },
                faqCore[4],
                { q: "Can I see the platform?", a: "Yes. Request access to the demo, or ask for it as part of the investor briefing. Any figures in the demo are illustrative." },
                faqCore[5],
              ]}
            />
          </Block>

          <Block
            id="briefing"
            eyebrow="Request the investor briefing"
            title={<>Ask for <span className="italic-gold">a conversation.</span></>}
            lede="Tell us a little about your organisation. A PDF summary of this page will be available on request."
          >
            <LeadForm variant="briefing" />
          </Block>
        </div>
      </div>
    </>
  );
}
