"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  "A new filing, result or event is detected",
  "Research updates the thesis for the company",
  "Valuation revisits assumptions and the fair-value range",
  "Risk and Shariah test the idea against the rules",
  "A bear case is written and recorded",
  "The Investment Committee weighs both sides and records any dissent",
  "The Portfolio Manager turns the decision into a sized, costed proposal",
  "The CIO approves or rejects",
  "The action is recorded, monitored and later compared with what happened",
];

/** Nine-step loop. A highlight walks the circle while visible; the last step feeds the first. */
export default function InvestmentCycle() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting && !paused) timer = setInterval(() => setActive((a) => (a + 1) % steps.length), 2200);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [paused]);

  const R = 150;
  const C = 190;
  const pt = (i: number) => {
    const a = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  };
  const arcLen = 2 * Math.PI * R;

  return (
    <div ref={ref} className="grid items-center gap-10 md:grid-cols-[minmax(0,380px)_1fr]">
      <svg viewBox="0 0 380 380" className="mx-auto w-full max-w-[380px]" aria-hidden>
        <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line)" strokeWidth="1" />
        <circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.5"
          strokeDasharray={arcLen}
          strokeDashoffset={arcLen * (1 - (active + 1) / steps.length)}
          transform={`rotate(-90 ${C} ${C})`}
          style={{ transition: "stroke-dashoffset 1200ms var(--ease)" }}
        />
        {steps.map((_, i) => {
          const { x, y } = pt(i);
          const on = i === active;
          const done = i <= active;
          return (
            <g key={i} transform={`translate(${x} ${y})`} style={{ cursor: "pointer" }} onMouseEnter={() => { setPaused(true); setActive(i); }} onMouseLeave={() => setPaused(false)}>
              <rect
                x={-13}
                y={-13}
                width={26}
                height={26}
                rx={4}
                transform="rotate(45)"
                fill={on ? "var(--gold)" : "var(--bg)"}
                stroke={done ? "var(--gold)" : "var(--line)"}
                style={{ transition: "all 700ms var(--ease)", filter: on ? "drop-shadow(0 0 10px rgba(214,180,106,0.7))" : "none" }}
              />
              <text textAnchor="middle" dy="4.5" fontSize="12" fontWeight="700" fill={on ? "#0b1520" : done ? "var(--gold)" : "var(--faint)"} style={{ fontFamily: "var(--font-inter)" }}>
                {i + 1}
              </text>
            </g>
          );
        })}
        <text x={C} y={C - 6} textAnchor="middle" fontSize="40" fill="var(--cream)" style={{ fontFamily: "var(--font-cormorant)" }}>
          {String(active + 1).padStart(2, "0")}
        </text>
        <text x={C} y={C + 22} textAnchor="middle" fontSize="10" letterSpacing="3" fill="var(--muted)" style={{ fontFamily: "var(--font-inter)" }}>
          OF NINE · LOOPS
        </text>
      </svg>

      <ol className="space-y-1" onMouseLeave={() => setPaused(false)}>
        {steps.map((s, i) => (
          <li
            key={s}
            onMouseEnter={() => { setPaused(true); setActive(i); }}
            className="flex cursor-default gap-4 rounded-xl px-4 py-2.5 transition-all duration-500"
            style={{ background: i === active ? "var(--gold-wash)" : "transparent", color: i === active ? "var(--cream)" : "var(--muted)" }}
          >
            <span className="w-5 shrink-0 text-[13px] font-semibold" style={{ color: i === active ? "var(--gold)" : "var(--faint)" }}>{i + 1}</span>
            <span className="text-[15px]">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
