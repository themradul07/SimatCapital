"use client";

import { useRef } from "react";
import { useInView } from "../useInView";

/**
 * I5 — Two strategies, separated by a thin vertical gold line labelled NEVER MERGED.
 * Home: titles, horizon and approach. Institutions: full table plus shared and separate bands.
 * Horizons follow Section C of the brief (Catalyst: up to 12 months), which takes precedence over Section 5.
 */
const STRATEGIES = {
  home: [
    { name: "Flagship Fund", rows: [["Horizon", "3–5 years"], ["Approach", "Long-term, conviction-led global equity."]] },
    { name: "Simat Catalyst", rows: [["Horizon", "Up to 12 months"], ["Approach", "Shorter-term, catalyst-led opportunities."]] },
  ],
  full: [
    {
      name: "Flagship Fund",
      rows: [
        ["Horizon", "3–5 years"],
        ["Approach", "Conviction-led, quality at a sensible price"],
        ["Portfolio", "Concentrated, typically 11–14 holdings"],
        ["Measured against", "S&P 500 (GBP), with a Shariah index alongside"],
      ],
    },
    {
      name: "Simat Catalyst",
      rows: [
        ["Horizon", "Up to 12 months"],
        ["Approach", "Catalyst-led: results, re-ratings, momentum"],
        ["Portfolio", "Selective, high-conviction positions"],
        ["Measured against", "Absolute return, measured per trade"],
      ],
    },
  ],
};

export default function TwoStrategies({ full = false }: { full?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.3);
  const data = full ? STRATEGIES.full : STRATEGIES.home;

  return (
    <figure ref={ref} aria-label="Two strategies, Flagship Fund and Simat Catalyst, never merged.">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr]">
        {data.map((s, i) => (
          <div key={s.name} className={i === 0 ? "sm:order-1 sm:pr-10" : "sm:order-3 sm:pl-10"}>
            <div className="flex items-center gap-3">
              <span className="dia" aria-hidden />
              <h3 className="h3">{s.name}</h3>
            </div>
            <dl className="mt-6 space-y-4">
              {s.rows.map(([k, v]) => (
                <div key={k} className="border-t pt-3" style={{ borderColor: "var(--hairline)" }}>
                  <dt className="ill-sub uppercase tracking-[0.12em]">{k}</dt>
                  <dd className="ill-label mt-1">
                    {/\d/.test(v) && k === "Horizon" ? <span className="ill-num text-[19px]">{v}</span> : v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        {/* Divider: NEVER MERGED */}
        <div className="relative my-8 flex items-center justify-center sm:order-2 sm:my-0 sm:w-14 sm:flex-col">
          <span
            aria-hidden
            className="h-px flex-1 sm:h-auto sm:w-px"
            style={{
              background: "var(--gold-accent)",
              transformOrigin: "top",
              transform: on ? "none" : "scaleY(0)",
              transition: "transform 900ms var(--ease)",
            }}
          />
          <span className="px-3 py-3 text-[12px] font-semibold tracking-[0.2em] sm:[writing-mode:vertical-rl]" style={{ color: "var(--gold-accent)" }}>
            NEVER MERGED
          </span>
          <span
            aria-hidden
            className="h-px flex-1 sm:h-auto sm:w-px"
            style={{
              background: "var(--gold-accent)",
              transformOrigin: "bottom",
              transform: on ? "none" : "scaleY(0)",
              transition: "transform 900ms var(--ease)",
            }}
          />
        </div>
      </div>

      {full && (
        <div className="mt-10 grid gap-px sm:grid-cols-2" style={{ background: "var(--hairline)" }}>
          <div className="p-5" style={{ background: "var(--bg-raised)" }}>
            <p className="ill-sub uppercase tracking-[0.12em]">Shared</p>
            <p className="ill-label mt-1.5">Same research engine · Same Shariah method · Same controls</p>
          </div>
          <div className="p-5" style={{ background: "var(--bg-raised)" }}>
            <p className="ill-sub uppercase tracking-[0.12em]">Separate</p>
            <p className="ill-label mt-1.5">Own capital · Own limits · Own records · Own approvals</p>
          </div>
        </div>
      )}
    </figure>
  );
}
