"use client";

import { useRef } from "react";
import { useInView } from "../useInView";

/**
 * I6 — The research engine map. Eleven fine-outlined tiles in three groups around a central statement.
 * [Confirm] Check this list matches the live system's modules and rename tiles to match.
 */
const GROUPS = [
  {
    name: "Research",
    tiles: [
      ["Fundamental research", "Builds and updates the thesis"],
      ["Valuation", "Fair-value ranges and scenarios"],
      ["Market intelligence", "Filings, results and events"],
      ["Tactical opportunities", "Candidates for Simat Catalyst"],
    ],
  },
  {
    name: "Risk and compliance",
    tiles: [
      ["Risk", "Exposure, drawdown, liquidity, bear case"],
      ["Shariah compliance", "Screens, monitors, purification"],
      ["Data quality", "Flags stale or failed data"],
    ],
  },
  {
    name: "Decision and reporting",
    tiles: [
      ["Investment committee", "Argues both sides, records dissent"],
      ["Portfolio construction", "Sizes and costs each proposal"],
      ["Performance and attribution", "Measures outcomes against forecasts"],
      ["Reporting", "Daily, quarterly and annual records"],
    ],
  },
];

export default function EngineMap() {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.2);
  let n = 0;

  return (
    <figure ref={ref} className={on ? "on" : ""} aria-label="Eleven specialised research models in three groups. No research model can place an order.">
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
        {GROUPS.map((g) => (
          <div key={g.name}>
            <p className="eyebrow">{g.name}</p>
            <ul className="mt-4 space-y-3">
              {g.tiles.map(([title, role]) => {
                const delay = n++ * 70;
                return (
                  <li
                    key={title}
                    className="border px-4 py-3.5"
                    style={{
                      borderColor: "var(--line-soft)",
                      opacity: on ? 1 : 0,
                      transition: `opacity 500ms var(--ease) ${delay}ms`,
                    }}
                  >
                    <span className="ill-label block">{title}</span>
                    <span className="ill-sub mt-0.5 block">{role}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Lines from the three groups converge on the central statement */}
      <svg viewBox="0 0 1200 70" preserveAspectRatio="none" className="mt-6 hidden h-[70px] w-full lg:block" aria-hidden>
        {[200, 600, 1000].map((x, i) => (
          <path
            key={x}
            d={`M ${x} 0 C ${x} 40, 600 30, 600 70`}
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            className="draw"
            style={{ ["--len" as string]: 520, ["--d" as string]: `${700 + i * 120}ms` }}
          />
        ))}
      </svg>
      <div className="mt-8 flex flex-col items-center gap-4 border-y py-8 text-center lg:mt-0" style={{ borderColor: "var(--line-soft)" }}>
        <span className="dia" aria-hidden />
        <p className="serif text-[28px] leading-tight md:text-[34px]" style={{ color: "var(--text-primary)" }}>
          No research model can place an order.
        </p>
      </div>
    </figure>
  );
}
