"use client";

import { useEffect, useRef, useState } from "react";

const gates = [
  { t: "Business activity", s: "Excluded sectors screened out" },
  { t: "Financial ratios", s: "Debt, cash and receivables tested" },
  { t: "Prohibited income", s: "Impure income measured" },
  { t: "The CIO", s: "A person decides" },
];

const CYCLE = 9000; // ms for one stock to travel the gate

/** A stock travels through the screens before it can reach the CIO. Loops calmly while visible. */
export default function ShariahGate() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = false;
    let t0 = 0;
    const loop = (t: number) => {
      if (!t0) t0 = t;
      if (reduced) {
        setP(0.9);
        return;
      }
      setP(((t - t0) % CYCLE) / CYCLE);
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) raf = requestAnimationFrame(loop);
      else cancelAnimationFrame(raf);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // token travels 0 → 1 over the first 85% of the cycle, then rests.
  const travel = Math.min(1, p / 0.85);
  const eased = travel < 0.5 ? 2 * travel * travel : 1 - Math.pow(-2 * travel + 2, 2) / 2;
  const gatePos = (i: number) => (i + 1) / (gates.length + 0.6);
  const fade = p > 0.94 ? 1 - (p - 0.94) / 0.06 : p < 0.04 ? p / 0.04 : 1;

  return (
    <div ref={ref} className="card p-6 md:p-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] muted">Before any stock can be proposed</span>
        <span className="chip chip-gold">Unclear? It stops and waits for a ruling.</span>
      </div>

      {/* desktop track */}
      <div className="relative hidden h-[150px] md:block">
        <div className="absolute left-0 right-0 top-[38px] h-px" style={{ background: "var(--line)" }} />
        <div
          className="absolute left-0 top-[38px] h-px"
          style={{ width: `${eased * 100}%`, background: "linear-gradient(90deg, transparent, var(--gold))", opacity: fade }}
        />
        {/* token */}
        <div
          className="absolute top-[38px] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${eased * 100}%`, opacity: fade }}
        >
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rotate-45" style={{ background: "var(--gold-bright)", boxShadow: "0 0 18px var(--gold)" }} />
          </div>
        </div>
        <span
          className="absolute top-0 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ left: `${Math.max(4, eased * 100)}%`, color: "var(--gold)", opacity: fade }}
        >
          A stock
        </span>

        {gates.map((g, i) => {
          const pos = gatePos(i);
          const passed = eased >= pos - 0.01;
          const last = i === gates.length - 1;
          return (
            <div key={g.t} className="absolute top-[18px] w-[150px] -translate-x-1/2 text-center" style={{ left: `${pos * 100}%` }}>
              <div
                className="mx-auto h-10 w-[3px] rounded-full transition-all duration-500"
                style={{
                  background: passed ? (last ? "var(--gold)" : "var(--ok)") : "var(--line)",
                  boxShadow: passed ? `0 0 14px ${last ? "var(--gold)" : "var(--ok)"}` : "none",
                }}
              />
              <p className="mt-5 whitespace-nowrap text-[15px] font-semibold transition-colors duration-500" style={{ color: passed ? "var(--cream)" : "var(--muted)" }}>
                {g.t}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug" style={{ color: "var(--faint)" }}>
                {g.s}
              </p>
            </div>
          );
        })}
      </div>

      {/* mobile list */}
      <ol className="space-y-5 md:hidden">
        {gates.map((g, i) => {
          const passed = eased >= gatePos(i) - 0.01;
          return (
            <li key={g.t} className="flex items-center gap-4">
              <span
                className="h-3 w-3 shrink-0 rotate-45 transition-all duration-500"
                style={{ background: passed ? (i === 3 ? "var(--gold)" : "var(--ok)") : "var(--line)" }}
              />
              <div>
                <p className="font-semibold" style={{ color: "var(--cream)" }}>{g.t}</p>
                <p className="text-[13px]" style={{ color: "var(--faint)" }}>{g.s}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
