"use client";

import KHead from "./KHead";
import Reveal from "../Reveal";
import CountUp from "../CountUp";

const LEDGER = [
  { t: "Idea proposed", s: "Research" },
  { t: "Bear case recorded", s: "Risk" },
  { t: "Idea rejected, reason kept", s: "Committee" },
  { t: "Report figure traced to stored data", s: "Reporting" },
];

export default function Transparency() {
  return (
    <section className="k-section">
      <div className="wrap space-y-14">
        <KHead
          chip="Transparency and record-keeping"
          title={
            <>
              A number that cannot be traced <span className="italic-gold">is struck out.</span>
            </>
          }
          lede="The aim is repeatable, risk-adjusted compounding, not the highest annual return."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="card-kelder p-7 md:p-9">
            <span className="eyebrow-kelder">Audit trail</span>
            <h3 className="h3 mt-3">A permanent record of every decision.</h3>
            <p className="mt-3 text-[15px] muted">Including rejected ideas and the reasons. Records are chained, so any edit is detected.</p>
            <ol className="mt-7 space-y-0">
              {LEDGER.map((l, i) => (
                <li key={l.t} className="relative flex items-center gap-4 py-3">
                  {i < LEDGER.length - 1 && (
                    <span aria-hidden className="absolute left-[5px] top-[26px] h-full w-px" style={{ background: "var(--gold-hairline)" }} />
                  )}
                  <span className="relative h-[11px] w-[11px] shrink-0 rotate-45 border" style={{ borderColor: "var(--gold)", background: "var(--bg)" }} />
                  <span className="flex-1 text-[14.5px]" style={{ color: "var(--cream)" }}>{l.t}</span>
                  <span className="text-[12px] muted">{l.s}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border" style={{ borderColor: "var(--line)", background: "var(--line)" }}>
            {[
              { n: 5, l: "questions every investment must answer" },
              { n: 11, l: "pre-trade checks, run in code" },
              { n: 12, l: "AI roles, each with one job" },
              { n: 0, l: "orders an AI agent can place" },
            ].map((s) => (
              <div key={s.l} className="flex flex-col justify-end p-6 md:p-8" style={{ background: "var(--bg-2)" }}>
                <p className="serif text-[56px] leading-none md:text-[68px]" style={{ color: "var(--gold)" }}>
                  {s.n === 0 ? "0" : <CountUp to={s.n} />}
                </p>
                <p className="mt-3 text-[13.5px] muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            "Reports every day, quarter and year, with every number traced to stored data.",
            "Performance measured net of costs, against a stated benchmark, with sample size and drawdown shown.",
            "Strong results never raise the risk taken.",
          ].map((t, i) => (
            <Reveal key={t} delay={i * 100} className="border-t pt-5" style={{ borderColor: "var(--gold-deep)" }}>
              <p style={{ color: "var(--text)" }}>{t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
