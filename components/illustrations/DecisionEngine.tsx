"use client";

import { useRef, useState } from "react";
import { useInView } from "../useInView";

/**
 * I3 — The decision engine. Six diamond nodes, a return line from the last to the first.
 * One gold point travels nodes 1→6 once when in view, then the return line draws.
 * Home: summary state (detail on hover / focus / tap). Institutions: "In plain words · In detail" toggle.
 */
const NODES = [
  { title: "Signals", sub: "Filings, results, prices and events across the UK, US and Japan", detail: "Monitored continuously; any change triggers a review" },
  { title: "Research engine", sub: "Specialised models for valuation, risk, Shariah and catalysts", detail: "Output: a documented thesis with a fair-value range" },
  { title: "Investment committee", sub: "Bull and bear cases argued in full", detail: "Dissent is recorded, not discarded" },
  { title: "Systematic controls", sub: "Position, sector, liquidity, cash and Shariah checks", detail: "Any failed or uncertain check stops the trade" },
  { title: "CIO decision", sub: "Approve or reject, with reasons recorded", detail: "Approval is bound to one exact order and expires if unused" },
  { title: "Execution and record", sub: "Single authorised order route, reconciled with the broker", detail: "Every figure traceable to stored data" },
];
const RETURN = "Every outcome is reviewed against its thesis.";
const PERSON = 4; // node 5
const TRAVEL = 2600;

export default function DecisionEngine({ withToggle = false }: { withToggle?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.35);
  const [hover, setHover] = useState<number | null>(null);
  const [detailed, setDetailed] = useState(false);

  const nodeDelay = (i: number) => (TRAVEL / (NODES.length - 1)) * i;
  const showDetail = (i: number) => detailed || hover === i;

  const handlers = (i: number) => ({
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(i),
    onBlur: () => setHover(null),
    onClick: () => setHover((h) => (h === i ? null : i)),
  });

  const diamond = (i: number) => (
    <span
      className="block h-[14px] w-[14px] rotate-45 border"
      style={{
        borderColor: "var(--gold-accent)",
        background: on ? (i === PERSON ? "var(--gold-accent)" : "var(--bg-raised)") : "var(--bg-base)",
        transition: `background-color 400ms var(--ease) ${nodeDelay(i)}ms`,
      }}
    />
  );

  return (
    <figure ref={ref} aria-label="The decision engine: six stages from signals to execution and record, with every outcome reviewed against its thesis.">
      {withToggle && (
        <div className="mb-10 inline-flex border" style={{ borderColor: "var(--line)" }} role="group" aria-label="Level of detail">
          {["In plain words", "In detail"].map((label, i) => {
            const pressed = detailed === (i === 1);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={pressed}
                onClick={() => setDetailed(i === 1)}
                className="px-4 py-2 text-[14px] transition-colors duration-300"
                style={{ background: pressed ? "var(--gold-accent)" : "transparent", color: pressed ? "var(--bg-base)" : "var(--text-secondary)" }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Desktop: horizontal */}
      <div className="relative hidden md:block">
        {/* "A person decides" marker above node 5 */}
        <div className="grid grid-cols-6">
          {NODES.map((_, i) => (
            <div key={i} className="flex h-10 flex-col items-center justify-end">
              {i === PERSON && (
                <span
                  className="flex flex-col items-center text-[13px] font-medium"
                  style={{ color: "var(--gold-accent)", opacity: on ? 1 : 0, transition: `opacity 500ms var(--ease) ${nodeDelay(PERSON)}ms` }}
                >
                  A person decides
                  <span className="mt-1 h-3 w-px" style={{ background: "var(--gold-accent)" }} />
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="relative mt-2">
          <div className="absolute top-1/2 h-px" style={{ left: "8.333%", right: "8.333%", background: "var(--line)" }} />
          {/* travelling gold point */}
          <span
            aria-hidden
            className="absolute top-1/2 z-10 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "var(--gold-accent)",
              left: on ? "91.667%" : "8.333%",
              opacity: on ? 0 : 1,
              transition: `left ${TRAVEL}ms cubic-bezier(0.45, 0, 0.55, 1), opacity 300ms ease ${TRAVEL}ms`,
            }}
          />
          <ol className="relative grid grid-cols-6">
            {NODES.map((_, i) => (
              <li key={i} className="flex justify-center py-2">
                {diamond(i)}
              </li>
            ))}
          </ol>
        </div>

        <ol className="mt-6 grid grid-cols-6 gap-4">
          {NODES.map((n, i) => (
            <li key={n.title} className="text-center">
              <button type="button" className="w-full cursor-default px-1 text-center" aria-expanded={showDetail(i)} {...handlers(i)}>
                <span className="ill-label block">{n.title}</span>
                <span className="ill-sub mt-1.5 block">{n.sub}</span>
                <span
                  className="ill-sub mt-2 block overflow-hidden"
                  style={{ color: "var(--gold-accent)", maxHeight: showDetail(i) ? 80 : 0, opacity: showDetail(i) ? 1 : 0, transition: "max-height 400ms var(--ease), opacity 400ms var(--ease)" }}
                >
                  {n.detail}
                </span>
              </button>
            </li>
          ))}
        </ol>

        {/* Return line: node 6 back to node 1 */}
        <svg viewBox="0 0 1200 44" preserveAspectRatio="none" className="mt-6 h-11 w-full overflow-visible" aria-hidden>
          <path
            d="M 1100 0 V 30 H 100 V 6"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
            className={`draw ${on ? "on" : ""}`}
            style={{ ["--len" as string]: 1100, ["--dur" as string]: "1200ms", ["--d" as string]: `${TRAVEL}ms` }}
          />
        </svg>
        <p
          className="ill-sub mt-2 text-center"
          style={{ opacity: on ? 1 : 0, transition: `opacity 500ms var(--ease) ${TRAVEL + 900}ms` }}
        >
          ← {RETURN}
        </p>
      </div>

      {/* Mobile: vertical, same content */}
      <div className="relative md:hidden">
        <div className="absolute bottom-6 left-[7px] top-2 w-px" style={{ background: "var(--line)" }} />
        <ol className="relative space-y-7">
          {NODES.map((n, i) => (
            <li key={n.title} className="flex gap-5">
              <span className="mt-1.5 shrink-0">
                {diamond(i)}
              </span>
              <button type="button" className="text-left" aria-expanded={showDetail(i)} {...handlers(i)}>
                {i === PERSON && (
                  <span className="mb-1 block text-[13px] font-medium" style={{ color: "var(--gold-accent)" }}>
                    A person decides
                  </span>
                )}
                <span className="ill-label block">{n.title}</span>
                <span className="ill-sub mt-1 block">{n.sub}</span>
                {showDetail(i) && (
                  <span className="ill-sub mt-1.5 block" style={{ color: "var(--gold-accent)" }}>
                    {n.detail}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
        <p className="ill-sub mt-6 pl-9">↺ {RETURN}</p>
      </div>
    </figure>
  );
}
