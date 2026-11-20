"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "../useInView";

/**
 * I7 — The investment loop. Nine steps on a circle; the arrow from 9 returns to 1.
 * A single gold point travels the loop once when in view (no auto-advancing afterwards);
 * hovering, focusing or tapping a step selects it.
 */
const STEPS = [
  "Signal detected: filing, result or event",
  "Thesis updated",
  "Fair-value range revised",
  "Risk and Shariah tested",
  "Bear case written",
  "Committee debates; dissent recorded",
  "Sized, costed proposal",
  "CIO approves or rejects",
  "Outcome tracked against the thesis",
];
const WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

export default function InvestmentLoop() {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.35);
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // One pass through the loop, then rest on step 1.
  useEffect(() => {
    if (!on || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i > STEPS.length) {
        clearInterval(id);
        return;
      }
      setActive(i % STEPS.length);
    }, 650);
    return () => clearInterval(id);
  }, [on, touched]);

  const select = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const R = 150;
  const C = 190;
  const pt = (i: number) => {
    const a = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  };

  return (
    <figure ref={ref} aria-label="The investment loop: nine steps from signal to outcome. The last step feeds the first.">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,400px)_1fr]">
        <svg viewBox="0 0 380 380" className="mx-auto w-full max-w-[380px]" aria-hidden>
          <defs>
            <marker id="loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10" fill="none" stroke="var(--gold-accent)" strokeWidth="1.4" />
            </marker>
          </defs>
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line-soft)" strokeWidth="1" />
          {/* return arc from 9 to 1, slightly outside the circle */}
          <path
            d={`M ${C + (R + 16) * Math.cos(-Math.PI / 2 - 0.62)} ${C + (R + 16) * Math.sin(-Math.PI / 2 - 0.62)} A ${R + 16} ${R + 16} 0 0 1 ${C + (R + 16) * Math.cos(-Math.PI / 2 - 0.12)} ${C + (R + 16) * Math.sin(-Math.PI / 2 - 0.12)}`}
            fill="none"
            stroke="var(--gold-accent)"
            strokeWidth="1.2"
            markerEnd="url(#loop-arrow)"
          />
          {STEPS.map((_, i) => {
            const { x, y } = pt(i);
            const isOn = i === active;
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <rect
                  x={-12}
                  y={-12}
                  width={24}
                  height={24}
                  transform="rotate(45)"
                  fill={isOn ? "var(--gold-accent)" : "var(--bg-base)"}
                  stroke="var(--gold-accent)"
                  strokeOpacity={isOn ? 1 : 0.55}
                  strokeWidth="1.2"
                  style={{ transition: "fill 400ms var(--ease)" }}
                />
                <text
                  textAnchor="middle"
                  dy="5"
                  fontSize="14"
                  fill={isOn ? "var(--bg-base)" : "var(--text-primary)"}
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600 }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}
          <text x={C} y={C + 8} textAnchor="middle" fontSize="64" fill="var(--gold-accent)" style={{ fontFamily: "var(--font-cormorant)", fontVariantNumeric: "tabular-nums" }}>
            {active + 1}
          </text>
          <text x={C} y={C + 36} textAnchor="middle" fontSize="14" fill="var(--text-secondary)" style={{ fontFamily: "var(--font-inter)" }}>
            of nine
          </text>
        </svg>

        <div>
          <ol className="space-y-0.5">
            {STEPS.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  onClick={() => select(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="flex w-full gap-4 px-3 py-2.5 text-left transition-colors duration-300"
                  style={{ background: i === active ? "rgba(214,180,106,0.07)" : "transparent" }}
                >
                  <span className="ill-num w-5 shrink-0 text-[17px]">{i + 1}</span>
                  <span className="text-[15px]" style={{ color: i === active ? "var(--text-primary)" : "var(--text-secondary)" }}>
                    {s}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-5 flex items-center gap-3 pl-3 text-[14px]" style={{ color: "var(--gold-accent)" }}>
            <span aria-hidden>↺</span> 9 returns to 1. The last step feeds the first.
          </p>
          <p className="sr-only">Step {WORDS[active]} of nine selected.</p>
        </div>
      </div>
    </figure>
  );
}
