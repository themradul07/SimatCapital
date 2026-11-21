"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * I1 — Hero mark. The flat mark at the centre of three concentric diamond outlines,
 * with four labels on the outer diamond's points. Diamonds draw in once on load (800ms),
 * then a slow 6s pulse on the mark only.
 */
const LABELS = ["Researched", "Screened", "Approved", "Recorded"];

const C = 250;
const RADII = [165, 118, 74];
const OUTER = RADII[0];
const pct = (v: number) => `${(v / 500) * 100}%`;

const LABEL_POS: CSSProperties[] = [
  { left: "50%", top: pct(C - OUTER), transform: "translate(-50%, calc(-100% - 14px))" },
  { left: pct(C + OUTER), top: "50%", transform: "translate(14px, -50%)" },
  { left: "50%", top: pct(C + OUTER), transform: "translate(-50%, 14px)" },
  { left: pct(C - OUTER), top: "50%", transform: "translate(calc(-100% - 14px), -50%)" },
];

export default function HeroMark() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const diamond = (r: number) => `M ${C} ${C - r} L ${C + r} ${C} L ${C} ${C + r} L ${C - r} ${C} Z`;
  const points = [
    [C, C - OUTER],
    [C + OUTER, C],
    [C, C + OUTER],
    [C - OUTER, C],
  ];

  return (
    <figure
      className={`relative mx-auto w-full max-w-[480px] ${on ? "on" : ""}`}
      aria-label="The Simat Capital mark at the centre of three diamonds: researched, screened, approved, recorded."
    >
      <svg viewBox="0 0 500 500" className="w-full" aria-hidden>
        {RADII.map((r, i) => (
          <path
            key={r}
            d={diamond(r)}
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity={0.6 - i * 0.12}
            strokeWidth="1.2"
            className="draw"
            style={{ ["--len" as string]: Math.ceil(r * Math.SQRT2 * 4) + 2, ["--dur" as string]: "800ms", ["--d" as string]: `${i * 100}ms` }}
          />
        ))}
        {points.map(([x, y], i) => (
          <rect
            key={i}
            x={x - 4.5}
            y={y - 4.5}
            width="9"
            height="9"
            transform={`rotate(45 ${x} ${y})`}
            fill="var(--bg-base)"
            stroke="var(--gold-accent)"
            strokeWidth="1.2"
            style={{ opacity: on ? 1 : 0, transition: `opacity 500ms var(--ease) ${700 + i * 80}ms` }}
          />
        ))}
        <g style={{ opacity: on ? 1 : 0, transition: "opacity 600ms var(--ease) 300ms" }}>
          <g className="mark-pulse">
            <image
              href="/simat-mark.png"
              x={C - 50}
              y={C - 50}
              width={100}
              height={100}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </g>
      </svg>

      {LABELS.map((l, i) => (
        <span
          key={l}
          aria-hidden
          className="ill-label pointer-events-none absolute hidden whitespace-nowrap sm:block"
          style={{ ...LABEL_POS[i], opacity: on ? 1 : 0, transition: `opacity 500ms var(--ease) ${820 + i * 80}ms` }}
        >
          {l}
        </span>
      ))}

      {/* Mobile: labels as a row beneath, so nothing clips at 360px */}
      <figcaption aria-hidden className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:hidden">
        {LABELS.map((l, i) => (
          <span key={l} className="ill-label inline-flex items-center gap-3">
            {l}
            {i < LABELS.length - 1 && <span className="dia dia-outline !h-[5px] !w-[5px]" />}
          </span>
        ))}
      </figcaption>
      <ul className="sr-only">
        {LABELS.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </figure>
  );
}
