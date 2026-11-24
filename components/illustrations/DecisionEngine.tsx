"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "../useInView";

/**
 * I3 — The decision engine. Six diamond nodes, a return line from the last to the first.
 * A glowing gold point travels nodes 1→6 in sync with scroll, illuminating nodes with a glow.
 * Home: summary state (detail on hover / focus / tap). Institutions: "In plain words · In detail" toggle.
 */
const NODES = [
  { title: "Signals", sub: "Filings, results, prices and events across the UK, US and Japan", detail: "Monitored continuously; any change triggers a review" },
  { title: "Research engine", sub: "Specialised models for valuation, risk, Shariah and catalysts", detail: "Output: a documented thesis with a fair-value range" },
  { title: "Challenge stage", sub: "A full bear case is written and tested for every idea", detail: "Dissent is recorded, not discarded" },
  { title: "Systematic controls", sub: "Position, sector, liquidity, cash and Shariah checks", detail: "Any failed or uncertain check stops the trade" },
  { title: "CIO decision", sub: "Approve or reject, with reasons recorded", detail: "Approval is bound to one exact order and expires if unused" },
  { title: "Execution and record", sub: "Single authorised order route, reconciled with the broker", detail: "Every figure traceable to stored data" },
];
const RETURN = "Every outcome is reviewed against its thesis.";
const PERSON = 4; // node 5

export default function DecisionEngine({ withToggle = false }: { withToggle?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.25);
  const [hover, setHover] = useState<number | null>(null);
  const [detailed, setDetailed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start as the component enters the mid-lower viewport (0.85) to upper viewport (0.2)
      const start = vh * 0.85;
      const end = vh * 0.2;
      const progress = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, progress));
      setScrollProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const showDetail = (i: number) => detailed || hover === i;

  const handlers = (i: number) => ({
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(i),
    onBlur: () => setHover(null),
    onClick: () => setHover((h) => (h === i ? null : i)),
  });

  const diamond = (i: number) => {
    const isPassed = scrollProgress >= i / (NODES.length - 1);
    const active = isPassed || (on && i === PERSON);
    return (
      <span
        className="block h-[14px] w-[14px] rotate-45 border"
        style={{
          borderColor: "var(--gold-accent)",
          background: active ? "var(--gold-accent)" : "var(--bg-base)",
          boxShadow: active ? "0 0 10px var(--gold-accent), 0 0 18px var(--gold-glow)" : "none",
          transition: "background-color 300ms var(--ease), box-shadow 300ms var(--ease)",
        }}
      />
    );
  };

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
                  style={{
                    color: "var(--gold-accent)",
                    opacity: on ? 1 : 0,
                    transition: "opacity 500ms var(--ease)",
                  }}
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
          {/* Travelling glowing gold dot that follows scroll */}
          <span
            aria-hidden
            className="absolute top-1/2 z-10 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              background: "var(--gold-accent)",
              left: `${8.333 + scrollProgress * 83.334}%`,
              boxShadow: "0 0 10px var(--gold-accent), 0 0 20px var(--gold-glow), 0 0 32px var(--gold-glow-soft)",
              opacity: on ? 1 : 0.4,
              transition: "left 80ms linear, opacity 300ms var(--ease)",
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
            className={`draw ${scrollProgress > 0.8 ? "on" : ""}`}
            style={{ ["--len" as string]: 1100, ["--dur" as string]: "1200ms", ["--d" as string]: "200ms" }}
          />
        </svg>
        <p
          className="ill-sub mt-2 text-center"
          style={{ opacity: scrollProgress > 0.85 ? 1 : 0.5, transition: "opacity 500ms var(--ease)" }}
        >
          {RETURN}
        </p>
      </div>

      {/* Mobile: stacked list */}
      <ol className="relative space-y-6 md:hidden">
        <div className="absolute bottom-4 left-3 top-4 w-px" style={{ background: "var(--line)" }} />
        {NODES.map((n, i) => {
          const isPassed = scrollProgress >= i / (NODES.length - 1);
          const active = isPassed || (on && i === PERSON);
          return (
            <li key={n.title} className="relative flex gap-4 pl-8">
              <span
                className="absolute left-1 top-2 block h-[12px] w-[12px] rotate-45 border"
                style={{
                  borderColor: "var(--gold-accent)",
                  background: active ? "var(--gold-accent)" : "var(--bg-base)",
                  boxShadow: active ? "0 0 8px var(--gold-accent), 0 0 16px var(--gold-glow)" : "none",
                  transition: "background-color 300ms var(--ease), box-shadow 300ms var(--ease)",
                }}
              />
              <button type="button" className="text-left" aria-expanded={showDetail(i)} {...handlers(i)}>
                <div className="flex items-baseline gap-3">
                  <span className="ill-label font-medium">{n.title}</span>
                  {i === PERSON && <span className="text-[12px]" style={{ color: "var(--gold-accent)" }}>(Person decides)</span>}
                </div>
                <p className="ill-sub mt-1">{n.sub}</p>
                {showDetail(i) && (
                  <p className="ill-sub mt-2" style={{ color: "var(--gold-accent)" }}>
                    {n.detail}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
