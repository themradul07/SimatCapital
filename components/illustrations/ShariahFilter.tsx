"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * I4 — The Shariah filter. A line with four vertical gates; a small diamond (a stock) passes
 * through each gate on scroll and becomes solid gold after gate 4.
 * Home: summary state. Institutions: expanded state.
 */
const GATES = [
  {
    title: "Business activity",
    summary: "Excludes conventional finance, alcohol, tobacco, gambling and other non-permissible sectors.",
    expanded: "Excludes conventional finance, alcohol, tobacco, gambling, pork, adult entertainment and other non-permissible sectors.",
  },
  {
    title: "Financial ratios",
    summary: "Debt below 33.33% of total assets; cash and interest-bearing securities below 33.33%; receivables and cash below 33.33%.",
    expanded: "Debt below 33.33% of total assets · Cash and interest-bearing securities below 33.33% · Receivables and cash below 33.33%",
  },
  {
    title: "Income purity",
    summary: "Non-permissible income below 5% of revenue.",
    expanded: "Non-permissible income below 5% of revenue; purification calculated per holding.",
  },
  {
    title: "Continuous review",
    summary: "Re-screened on every new filing.",
    expanded: "Re-screened on every new filing; a failing holding is exited under the method's rules.",
  },
];
const BRANCH = "Uncertain? Excluded until resolved.";
const GATE_POS = [0.125, 0.375, 0.625, 0.875];

/** Numbers in illustrations: serif, gold, tabular figures. */
function withNumbers(text: string): ReactNode[] {
  return text.split(/(\d+(?:\.\d+)?%)/g).map((part, i) =>
    /^\d/.test(part) ? (
      <span key={i} className="ill-num text-[15px] font-semibold">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduced) return setP(1);
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the figure's top reaches 85% of the viewport, 1 when it reaches 30%.
      const start = vh * 0.85;
      const end = vh * 0.3;
      setP(Math.min(1, Math.max(0, (start - r.top) / (start - end))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

export default function ShariahFilter({ expanded = false }: { expanded?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref);
  const pos = 0.02 + p * 0.96;
  const passed = (i: number) => pos >= GATE_POS[i];
  const solid = pos > 0.9;

  const stock = (vertical: boolean) => (
    <span
      aria-hidden
      className="absolute z-10 h-[13px] w-[13px] border"
      style={{
        [vertical ? "top" : "left"]: `${pos * 100}%`,
        [vertical ? "left" : "top"]: vertical ? "7px" : "50%",
        transform: "translate(-50%, -50%) rotate(45deg)",
        borderColor: "var(--gold-accent)",
        background: solid ? "var(--gold-accent)" : "var(--bg-base)",
        boxShadow: solid ? "0 0 0 4px rgba(214,180,106,0.12)" : "none",
        transition: "background-color 400ms var(--ease), box-shadow 400ms var(--ease)",
      }}
    />
  );

  return (
    <figure ref={ref} aria-label="The Shariah filter: every company passes four gates, business activity, financial ratios, income purity and continuous review.">
      {/* Desktop */}
      <div className="hidden md:block">
        {/* Branch from gate 2 */}
        <div className="relative h-12">
          <div className="absolute bottom-0 flex items-end gap-2" style={{ left: "37.5%" }}>
            <svg width="44" height="34" viewBox="0 0 44 34" aria-hidden className="shrink-0">
              <path d="M0 34 L 0 20 Q 0 6 14 6 L 44 6" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.2" />
            </svg>
            <span className="ill-sub -mb-0 pb-[18px] whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
              {BRANCH}
            </span>
          </div>
        </div>
        <div className="relative h-16">
          <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: "var(--line)" }} />
          {GATE_POS.map((g, i) => (
            <span
              key={g}
              aria-hidden
              className="absolute top-0 h-full w-px"
              style={{ left: `${g * 100}%`, background: passed(i) ? "var(--gold-accent)" : "var(--line)", transition: "background-color 300ms var(--ease)" }}
            />
          ))}
          {stock(false)}
        </div>
        <ol className="mt-6 grid grid-cols-4 gap-6">
          {GATES.map((g, i) => (
            <li key={g.title} className="text-center">
              <span className="ill-num block text-[15px]">Gate {i + 1}</span>
              <span className="ill-label mt-1 block">{g.title}</span>
              <span className="ill-sub mt-1.5 block">{withNumbers(expanded ? g.expanded : g.summary)}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Mobile: vertical */}
      <div className="relative md:hidden">
        <div className="absolute bottom-0 left-[7px] top-0 w-px" style={{ background: "var(--line)" }} />
        {stock(true)}
        <ol className="relative space-y-8 py-2">
          {GATES.map((g, i) => (
            <li key={g.title} className="pl-9">
              <span aria-hidden className="absolute left-0 h-px w-[15px]" style={{ marginTop: 10, background: passed(i) ? "var(--gold-accent)" : "var(--line)" }} />
              <span className="ill-num block text-[15px]">Gate {i + 1}</span>
              <span className="ill-label block">{g.title}</span>
              <span className="ill-sub mt-1 block">{withNumbers(expanded ? g.expanded : g.summary)}</span>
              {i === 1 && (
                <span className="ill-sub mt-2 block" style={{ color: "var(--text-primary)" }}>
                  ↳ {BRANCH}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <p className="sr-only">{BRANCH}</p>
    </figure>
  );
}
