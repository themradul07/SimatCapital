"use client";

import { useRef, useState } from "react";
import { useInView } from "../useInView";

/** I2 — Where we look for alpha. Three overlapping circles; the intersection is our opportunity set. */
const SETS = [
  {
    title: "Under-researched",
    sub: "Small and mid-sized companies with light analyst coverage.",
    detail: "Fewer analysts, more room for original research",
    cx: 205,
    cy: 165,
  },
  {
    title: "Mispriced",
    sub: "Where our view differs from the market's, with evidence.",
    detail: "Every thesis states what the market is missing",
    cx: 335,
    cy: 165,
  },
  {
    title: "Compliant",
    sub: "Passes all four Shariah screens.",
    detail: "Re-screened on every new filing",
    cx: 270,
    cy: 278,
  },
];
const R = 118;

export default function OpportunityCircles() {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.3);
  const [active, setActive] = useState<number | null>(null);
  const circ = Math.ceil(2 * Math.PI * R) + 2;

  return (
    <figure ref={ref} className={on ? "on" : ""} aria-label="Three overlapping circles: under-researched, mispriced and compliant. Where all three meet is our opportunity set.">
      <svg viewBox="60 20 420 400" className="mx-auto w-full max-w-[440px]" aria-hidden>
        {SETS.map((s, i) => (
          <circle
            key={s.title}
            cx={s.cx}
            cy={s.cy}
            r={R}
            fill="none"
            stroke="var(--gold-accent)"
            strokeWidth={active === i ? 1.6 : 1.2}
            strokeOpacity={active === null || active === i ? 0.7 : 0.25}
            className="draw"
            transform={`rotate(${-90 + i * 120} ${s.cx} ${s.cy})`}
            style={{ ["--len" as string]: circ, ["--dur" as string]: "1400ms", ["--d" as string]: `${i * 200}ms`, transitionProperty: "stroke-dashoffset, stroke-opacity" }}
          />
        ))}
        {/* titles inside each circle's outer lobe */}
        {[
          { x: 150, y: 140 },
          { x: 390, y: 140 },
          { x: 270, y: 352 },
        ].map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            fontSize="17"
            fill="var(--text-primary)"
            style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", opacity: on ? 1 : 0, transition: `opacity 500ms var(--ease) ${900 + i * 120}ms` }}
          >
            {SETS[i].title}
          </text>
        ))}
        <g style={{ opacity: on ? 1 : 0, transition: "opacity 600ms var(--ease) 1500ms" }}>
          <rect x="262" y="194" width="16" height="16" transform="rotate(45 270 202)" fill="var(--gold-accent)" />
          <text x="270" y="238" textAnchor="middle" fontSize="13" fill="var(--text-primary)" style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}>
            Our opportunity set
          </text>
        </g>
      </svg>

      <ul className="mt-8 grid gap-6 sm:grid-cols-3">
        {SETS.map((s, i) => {
          const open = active === i;
          return (
            <li key={s.title}>
              <button
                type="button"
                className="w-full text-left"
                aria-expanded={open}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(open ? null : i)}
              >
                <span className="flex items-center gap-3">
                  <span className="inline-block h-3 w-3 rounded-full border" style={{ borderColor: "var(--gold-accent)" }} aria-hidden />
                  <span className="ill-label">{s.title}</span>
                </span>
                <span className="ill-sub mt-1.5 block">{s.sub}</span>
                <span
                  className="ill-sub mt-1.5 block overflow-hidden"
                  style={{ color: "var(--gold-accent)", maxHeight: open ? 60 : 0, opacity: open ? 1 : 0, transition: "max-height 400ms var(--ease), opacity 400ms var(--ease)" }}
                >
                  {s.detail}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="sr-only">Centre: Our opportunity set.</p>
    </figure>
  );
}
