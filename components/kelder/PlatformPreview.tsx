"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * A calm, tilted preview of one proposal reaching the CIO.
 * Everything here is invented and labelled Illustrative (brief flag 6).
 * No prices, returns or performance of any kind.
 */
const AGENTS = ["Research", "Valuation", "Risk", "Shariah", "Committee", "Portfolio Manager"];

const CHECKS = [
  "Shariah screen is recent",
  "Single-position limit",
  "Sector limit",
  "Cash is sufficient, no borrowing",
  "Prices are fresh",
  "Broker records reconciled",
];

const SHARIAH = ["Business activity", "Financial ratios", "Prohibited income"];

export default function PlatformPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative pb-24" aria-label="Illustrative platform preview">
      <div className="wrap" style={{ perspective: "1800px" }}>
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[22px] border shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
          style={{
            borderColor: "var(--gold-hairline)",
            background: "linear-gradient(180deg, var(--panel) 0%, var(--bg-2) 100%)",
            transform: inView ? "rotateX(0deg) translateY(0)" : "rotateX(14deg) translateY(30px)",
            opacity: inView ? 1 : 0.4,
            transition: "transform 1600ms var(--ease), opacity 1600ms var(--ease)",
            transformOrigin: "50% 0%",
          }}
        >
          {/* Window bar */}
          <div className="flex items-center justify-between gap-4 border-b px-5 py-3" style={{ borderColor: "var(--line)" }}>
            <div className="flex items-center gap-3">
              <span className="relative h-5 w-5">
                <Image src="/simat-mark.png" alt="" fill sizes="20px" className="object-contain" />
              </span>
              <span className="text-[12.5px] font-semibold" style={{ color: "var(--cream)" }}>
                Proposal awaiting approval
              </span>
            </div>
            <span className="tag-illustrative">Illustrative</span>
          </div>

          <div className="grid gap-px md:grid-cols-[1fr_1.35fr_1fr]" style={{ background: "var(--line-soft)" }}>
            {/* Column 1: the digital team */}
            <div className="p-6" style={{ background: "var(--bg-2)" }}>
              <p className="eyebrow-kelder">Prepared by the digital team</p>
              <ol className="mt-5 space-y-3">
                {AGENTS.map((a, i) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 text-[13.5px]"
                    style={{
                      color: "var(--text)",
                      opacity: inView ? 1 : 0,
                      transform: inView ? "none" : "translateX(-8px)",
                      transition: "opacity 900ms var(--ease), transform 900ms var(--ease)",
                      transitionDelay: `${500 + i * 160}ms`,
                    }}
                  >
                    <span className="h-[7px] w-[7px] rotate-45" style={{ background: "var(--gold)" }} />
                    {a}
                    <span className="ml-auto text-[11.5px] muted">done</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[12.5px] muted">Agents research and propose. None can place an order.</p>
            </div>

            {/* Column 2: the proposal */}
            <div className="p-6" style={{ background: "var(--bg)" }}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip-gold no-mark">Flagship Fund</span>
                <span className="text-[12px] muted">Example Holdings Co. (invented)</span>
              </div>
              <p className="serif mt-5 text-[26px] leading-tight md:text-[30px]" style={{ color: "var(--cream)" }}>
                Open a position in Example Holdings Co.
              </p>
              <dl className="mt-6 space-y-4 text-[13.5px]">
                {[
                  ["Why this company?", "Thesis recorded, every claim sourced."],
                  ["Why this price?", "Inside the fair-value range."],
                  ["What could go wrong?", "Bear case written and attached."],
                  ["What would change our mind?", "Agreed in advance and recorded."],
                ].map(([q, a]) => (
                  <div key={q} className="grid grid-cols-[1fr_auto] gap-3 border-b pb-3" style={{ borderColor: "var(--line-soft)" }}>
                    <dt style={{ color: "var(--cream)" }}>{q}</dt>
                    <dd className="text-right muted">{a}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="btn btn-gold pointer-events-none !h-11 !text-[13.5px]" aria-hidden>
                  Approve with passkey
                </span>
                <span className="btn btn-ghost pointer-events-none !h-11 !text-[13.5px]" aria-hidden>
                  Reject
                </span>
              </div>
              <p className="mt-4 text-[12px] muted">The approval is tied to this exact order. If the order changes, it is cancelled.</p>
            </div>

            {/* Column 3: checks */}
            <div className="p-6" style={{ background: "var(--bg-2)" }}>
              <p className="eyebrow-kelder">Shariah screen</p>
              <ul className="mt-4 space-y-2.5">
                {SHARIAH.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[13.5px]">
                    <span className="tick">✓</span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="eyebrow-kelder mt-7">Pre-trade checks, in code</p>
              <ul className="mt-4 space-y-2.5">
                {CHECKS.map((c, i) => (
                  <li
                    key={c}
                    className="flex items-center gap-3 text-[13.5px]"
                    style={{
                      opacity: inView ? 1 : 0.25,
                      transition: "opacity 800ms var(--ease)",
                      transitionDelay: `${900 + i * 140}ms`,
                    }}
                  >
                    <span className="tick">✓</span>
                    {c}
                  </li>
                ))}
                <li className="pt-1 text-[12px] muted">…and more. A failed or unknown check blocks the trade.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
