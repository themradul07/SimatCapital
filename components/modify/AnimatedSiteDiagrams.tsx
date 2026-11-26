"use client";

import { useEffect, useId, useState } from "react";

/**
 * 1. AnimatedThreeBranch (Landing Page & /private-investors — "The gap")
 * Continuous travelling gold pulses along all three Bezier paths converging
 * into a pulsing diamond core, with interactive branch selection.
 */
const BRANCH_ITEMS = [
  {
    label: "Compliant?",
    x: 90,
    note: "Passes all four Shariah screens — re-checked on every filing.",
  },
  {
    label: "Understood?",
    x: 270,
    note: "Original thesis, bear case written, and key risks stress-tested.",
  },
  {
    label: "Fairly priced?",
    x: 450,
    note: "Priced below conservative intrinsic value with margin of safety.",
  },
];

export function AnimatedThreeBranch({ isMotion = true }: { isMotion?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<number>(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isMotion || paused) return;
    const t = window.setInterval(() => {
      setActive((prev) => (prev + 1) % BRANCH_ITEMS.length);
    }, 2400);
    return () => window.clearInterval(t);
  }, [isMotion, paused]);

  return (
    <figure className="relative mx-auto w-full max-w-[540px] select-none">
      <div className="grid grid-cols-3 text-center">
        {BRANCH_ITEMS.map((item, i) => {
          const isHot = active === i;
          return (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => {
                setPaused(true);
                setActive(i);
              }}
              onMouseLeave={() => setPaused(false)}
              onClick={() => setActive(i)}
              className="serif text-[20px] italic sm:text-[25px] transition-all duration-300 cursor-pointer bg-transparent border-0 p-1"
              style={{
                color: isHot ? "var(--gold-accent)" : "var(--text-primary)",
                opacity: isHot ? 1 : 0.62,
                transform: isHot ? "translateY(-2px)" : "none",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <svg viewBox="0 0 540 255" className="mt-2 w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id={`${uid}-core-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.45" />
            <stop offset="60%" stopColor="var(--gold-accent)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient core glow */}
        <circle
          cx="270"
          cy="210"
          r={isMotion ? "56" : "42"}
          fill={`url(#${uid}-core-glow)`}
          style={{
            transition: "r 800ms ease",
          }}
        />

        {BRANCH_ITEMS.map((item, i) => {
          const d = `M ${item.x} 4 C ${item.x} 110, 270 90, 270 182`;
          const pathId = `${uid}-branch-${i}`;
          const isHot = active === i;
          return (
            <g key={item.label}>
              <path
                id={pathId}
                d={d}
                fill="none"
                stroke="var(--gold-accent)"
                strokeOpacity={isHot ? 0.85 : 0.25}
                strokeWidth={isHot ? 1.8 : 1.1}
                style={{ transition: "stroke-opacity 400ms ease, stroke-width 400ms ease" }}
              />
              {isMotion && (
                <circle
                  r={isHot ? 4 : 2.6}
                  fill="var(--gold-accent)"
                  opacity={isHot ? 1 : 0.55}
                >
                  <animateMotion
                    dur={`${2.1 + i * 0.2}s`}
                    begin={`${i * 0.45}s`}
                    repeatCount="indefinite"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

        {/* Converging Diamond Seal */}
        <g>
          {isMotion && (
            <rect
              x="242"
              y="182"
              width="56"
              height="56"
              transform="rotate(45 270 210)"
              fill="none"
              stroke="var(--gold-accent)"
              strokeOpacity="0.25"
              strokeWidth="1"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.15;0.55;0.15"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </rect>
          )}
          <rect
            x="248"
            y="188"
            width="44"
            height="44"
            transform="rotate(45 270 210)"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.45"
          />
          <rect
            x="256"
            y="196"
            width="28"
            height="28"
            transform="rotate(45 270 210)"
            fill="var(--gold-accent)"
          />
        </g>
      </svg>

      <p className="mt-2 min-h-[2.4em] text-center text-[13px] secondary">
        <span className="text-[var(--gold-accent)] font-medium">{BRANCH_ITEMS[active].label}</span>{" "}
        {BRANCH_ITEMS[active].note}
      </p>
    </figure>
  );
}

/**
 * 2. AnimatedOpportunityCircles (Landing Page — "The edge")
 * Three overlapping Venn circles with automatic rhythmic focus & glowing intersection.
 */
const EDGE_SETS = [
  { title: "Under-researched", cx: 205, cy: 165, note: "Light analyst coverage leaves room for original work." },
  { title: "Mispriced", cx: 335, cy: 165, note: "Market price diverges from fundamental evidence." },
  { title: "Compliant", cx: 270, cy: 278, note: "Passes all four Shariah screens on every filing." },
];

export function AnimatedOpportunityCircles({ isMotion = true }: { isMotion?: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isMotion || paused) return;
    const t = window.setInterval(() => setActive((p) => (p + 1) % EDGE_SETS.length), 2600);
    return () => window.clearInterval(t);
  }, [isMotion, paused]);

  return (
    <figure className="relative mx-auto w-full max-w-[460px] select-none">
      <svg viewBox="0 0 540 420" className="w-full overflow-visible" aria-hidden>
        {EDGE_SETS.map((s, i) => {
          const isHot = active === i;
          return (
            <g
              key={s.title}
              className="cursor-pointer"
              onMouseEnter={() => {
                setPaused(true);
                setActive(i);
              }}
              onMouseLeave={() => setPaused(false)}
              onClick={() => setActive(i)}
            >
              <circle
                cx={s.cx}
                cy={s.cy}
                r={116}
                fill="var(--gold-accent)"
                fillOpacity={isHot ? 0.09 : 0.02}
                stroke="var(--gold-accent)"
                strokeOpacity={isHot ? 0.9 : 0.3}
                strokeWidth={isHot ? 1.8 : 1}
                style={{ transition: "all 450ms ease" }}
              />
              <text
                x={s.cx}
                y={i === 2 ? s.cy + 46 : s.cy - 38}
                textAnchor="middle"
                fill={isHot ? "var(--gold-accent)" : "var(--text-primary)"}
                fontSize="15"
                fontFamily="var(--font-serif), Georgia, serif"
                fontStyle="italic"
              >
                {s.title}
              </text>
            </g>
          );
        })}

        {/* Intersection Diamond */}
        <g>
          {isMotion && (
            <circle cx="270" cy="202" r="24" fill="var(--gold-accent)" fillOpacity="0.16">
              <animate attributeName="r" values="18;28;18" dur="2.6s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.22;0.06;0.22" dur="2.6s" repeatCount="indefinite" />
            </circle>
          )}
          <rect
            x="261"
            y="193"
            width="18"
            height="18"
            transform="rotate(45 270 202)"
            fill="var(--gold-accent)"
          />
        </g>
      </svg>
      <p className="mt-2 min-h-[2.4em] text-center text-[13px] secondary">
        <span className="text-[var(--gold-accent)] font-medium">{EDGE_SETS[active].title}:</span>{" "}
        {EDGE_SETS[active].note}
      </p>
    </figure>
  );
}

/**
 * 3. AnimatedEngineMap (/institutions — "How ideas are researched")
 * Sequential signal sweep across the 3 groups & 11 modules.
 */
const ENGINE_GROUPS = [
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
      ["Challenge stage", "Full bear case written & tested"],
      ["Portfolio construction", "Sizes and costs each proposal"],
      ["Performance & attribution", "Measures outcomes vs forecasts"],
      ["Reporting", "Daily, quarterly and annual records"],
    ],
  },
];

const TOTAL_TILES = ENGINE_GROUPS.reduce((acc, g) => acc + g.tiles.length, 0);

export function AnimatedEngineMap({ isMotion = true }: { isMotion?: boolean }) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!isMotion || paused) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % TOTAL_TILES), 1100);
    return () => window.clearInterval(t);
  }, [isMotion, paused]);

  let runningIdx = 0;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        {ENGINE_GROUPS.map((g) => (
          <div
            key={g.name}
            className="rounded-lg border p-4"
            style={{ borderColor: "var(--hairline)", background: "rgba(255,255,255,0.01)" }}
          >
            <p className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)] mb-3">
              {g.name}
            </p>
            <div className="space-y-2">
              {g.tiles.map(([title, sub]) => {
                const idx = runningIdx++;
                const active = idx === step;
                return (
                  <div
                    key={title}
                    onMouseEnter={() => {
                      setPaused(true);
                      setStep(idx);
                    }}
                    onMouseLeave={() => setPaused(false)}
                    className="rounded border px-3 py-2.5 transition-all duration-300 cursor-pointer"
                    style={{
                      borderColor: active ? "var(--gold-accent)" : "var(--hairline)",
                      background: active ? "rgba(214,180,106,0.10)" : "transparent",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[13px] font-medium text-[var(--text-primary)]">{title}</span>
                      <span
                        className="inline-block h-2 w-2 rotate-45 transition-all duration-300"
                        style={{
                          background: active ? "var(--gold-accent)" : "rgba(214,180,106,0.22)",
                          transform: active ? "rotate(45deg) scale(1.2)" : "rotate(45deg) scale(1)",
                        }}
                      />
                    </div>
                    <p className="text-[12px] secondary mt-0.5">{sub}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 4. AnimatedTwoStrategies (/ & /institutions — "Never merged")
 * Rhythmic pulse across Flagship Fund and Simat Catalyst separated by an animated gold barrier.
 */
export function AnimatedTwoStrategies({ isMotion = true }: { isMotion?: boolean }) {
  const [focusSide, setFocusSide] = useState<0 | 1>(0);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setFocusSide((s) => (s === 0 ? 1 : 0)), 2800);
    return () => window.clearInterval(t);
  }, [isMotion]);

  const sides = [
    {
      name: "Flagship Fund",
      horizon: "3–5 years",
      portfolio: "11–14 concentrated holdings",
      benchmark: "S&P 500 (GBP) + Shariah index",
    },
    {
      name: "Simat Catalyst",
      horizon: "Up to 12 months",
      portfolio: "Selective catalyst positions",
      benchmark: "Absolute return per trade",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch gap-4">
      {sides.map((s, i) => {
        const active = focusSide === i;
        return (
          <div
            key={s.name}
            onMouseEnter={() => setFocusSide(i as 0 | 1)}
            className="rounded-lg border p-5 transition-all duration-500"
            style={{
              borderColor: active ? "var(--gold-accent)" : "var(--hairline)",
              background: active ? "rgba(214,180,106,0.06)" : "transparent",
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="dia transition-transform duration-500"
                style={{ transform: active ? "scale(1.25)" : "scale(1)" }}
              />
              <h4 className="serif text-[20px] text-[var(--text-primary)]">{s.name}</h4>
            </div>
            <dl className="mt-4 space-y-2.5 text-[13px]">
              <div className="flex justify-between border-t pt-2" style={{ borderColor: "var(--hairline)" }}>
                <dt className="secondary">Horizon</dt>
                <dd className="font-mono text-[var(--gold-accent)]">{s.horizon}</dd>
              </div>
              <div className="flex justify-between border-t pt-2" style={{ borderColor: "var(--hairline)" }}>
                <dt className="secondary">Portfolio</dt>
                <dd className="text-[var(--text-primary)] text-right">{s.portfolio}</dd>
              </div>
              <div className="flex justify-between border-t pt-2" style={{ borderColor: "var(--hairline)" }}>
                <dt className="secondary">Measured</dt>
                <dd className="text-[var(--text-secondary)] text-right">{s.benchmark}</dd>
              </div>
            </dl>
          </div>
        );
      })}

      {/* Animated "Never merged" barrier */}
      <div className="flex sm:flex-col items-center justify-center gap-2 py-2 sm:px-2">
        <div
          className="h-px flex-1 sm:h-auto sm:w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--gold-accent), transparent)",
            opacity: isMotion ? 0.9 : 0.5,
          }}
        />
        <span
          className="rounded-full border px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider sm:[writing-mode:vertical-rl]"
          style={{
            borderColor: "var(--gold-accent)",
            color: "var(--gold-accent)",
            background: "rgba(214,180,106,0.08)",
          }}
        >
          Never merged
        </span>
        <div
          className="h-px flex-1 sm:h-auto sm:w-px"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--gold-accent), transparent)",
            opacity: isMotion ? 0.9 : 0.5,
          }}
        />
      </div>
    </div>
  );
}

/**
 * 5. AnimatedStatusGlance (/institutions — "Where we stand today")
 * Live sequential verification sweep across In place / In progress / Not yet available.
 */
const STATUS_COLUMNS = [
  {
    key: "in-place",
    title: "In place",
    items: [
      "Proprietary research engine, end to end",
      "Systematic pre-trade controls with CIO approval",
      "Shariah screening stored with every decision",
      "Both strategies running on founder capital",
      "Custody & daily reconciliation with IBKR",
    ],
  },
  {
    key: "in-progress",
    title: "In progress",
    items: [
      "Shariah governance, being formalised",
      "Legal and regulatory structure for external capital",
      "Independent administrator and auditor",
    ],
  },
  {
    key: "not-yet",
    title: "Not yet available",
    items: ["External capital", "Verified firm track record"],
  },
] as const;

export function AnimatedStatusGlance({ isMotion = true }: { isMotion?: boolean }) {
  const [pulseIdx, setPulseIdx] = useState(0);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setPulseIdx((p) => (p + 1) % 8), 950);
    return () => window.clearInterval(t);
  }, [isMotion]);

  let itemCounter = 0;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {STATUS_COLUMNS.map((col) => (
        <div
          key={col.key}
          className="rounded-lg border-t pt-4"
          style={{ borderColor: col.key === "not-yet" ? "var(--hairline)" : "var(--line)" }}
        >
          <h4 className="text-[14px] font-semibold text-[var(--text-primary)] mb-3">{col.title}</h4>
          <ul className="space-y-2.5">
            {col.items.map((item) => {
              const idx = col.key !== "not-yet" ? itemCounter++ : -1;
              const isLit = idx >= 0 && idx === pulseIdx;
              return (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] transition-colors duration-300"
                  style={{ color: isLit ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {col.key === "in-place" ? (
                    <span
                      className="dia mt-[6px] transition-transform duration-300"
                      style={{ transform: isLit ? "scale(1.3)" : "scale(1)" }}
                    />
                  ) : col.key === "in-progress" ? (
                    <span
                      className="dia dia-outline mt-[6px] transition-transform duration-300"
                      style={{ transform: isLit ? "scale(1.3)" : "scale(1)" }}
                    />
                  ) : (
                    <span className="mt-[10px] inline-block h-px w-2.5 shrink-0 bg-[var(--text-secondary)]" />
                  )}
                  <span>{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * 6. AnimatedPurificationLedger (New Concept — "Purification per holding")
 * Visualizes dividend purification: Holdings -> Impure ratio isolation -> Charity ledger.
 */
const PURIFICATION_HOLDINGS = [
  { ticker: "HLTH-A", gross: "$1,420", impurePct: "1.8%", purified: "$25.56" },
  { ticker: "TECH-B", gross: "$980", impurePct: "0.9%", purified: "$8.82" },
  { ticker: "IND-C", gross: "$2,150", impurePct: "2.4%", purified: "$51.60" },
];

export function AnimatedPurificationLedger({ isMotion = true }: { isMotion?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setActive((p) => (p + 1) % PURIFICATION_HOLDINGS.length), 2200);
    return () => window.clearInterval(t);
  }, [isMotion]);

  return (
    <figure className="relative mx-auto w-full max-w-[540px] select-none">
      <svg viewBox="0 0 540 250" className="w-full overflow-visible" aria-hidden>
        {/* Source holdings on left */}
        {PURIFICATION_HOLDINGS.map((h, i) => {
          const y = 42 + i * 74;
          const hot = active === i;
          const pathId = `${uid}-purify-${i}`;
          const d = `M 145 ${y + 18} C 235 ${y + 18}, 255 125, 345 125`;
          return (
            <g key={h.ticker} onMouseEnter={() => setActive(i)} className="cursor-pointer">
              <rect
                x="16"
                y={y}
                width="129"
                height="36"
                rx="6"
                fill={hot ? "rgba(214,180,106,0.12)" : "rgba(255,255,255,0.015)"}
                stroke="var(--gold-accent)"
                strokeOpacity={hot ? 0.9 : 0.28}
              />
              <text x="28" y={y + 16} fill="var(--text-primary)" fontSize="11" fontFamily="monospace">
                {h.ticker}
              </text>
              <text x="28" y={y + 29} fill="var(--text-secondary)" fontSize="10" fontFamily="monospace">
                Div {h.gross} · {h.impurePct}
              </text>

              <path
                id={pathId}
                d={d}
                fill="none"
                stroke="var(--gold-accent)"
                strokeOpacity={hot ? 0.85 : 0.22}
                strokeWidth={hot ? 1.6 : 1}
              />
              {isMotion && (
                <circle r={hot ? 3.8 : 2.3} fill="var(--gold-accent)" opacity={hot ? 1 : 0.45}>
                  <animateMotion dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              )}
            </g>
          );
        })}

        {/* Central Sieve */}
        <polygon
          points="270,105 290,125 270,145 250,125"
          fill="rgba(214,180,106,0.14)"
          stroke="var(--gold-accent)"
          strokeWidth="1.4"
        />
        <text x="270" y="164" textAnchor="middle" fill="var(--gold-accent)" fontSize="10" fontFamily="monospace">
          PURIFY
        </text>

        {/* Destination Charity Ledger */}
        <rect
          x="345"
          y="78"
          width="178"
          height="94"
          rx="8"
          fill="rgba(214,180,106,0.07)"
          stroke="var(--gold-accent)"
          strokeOpacity="0.65"
        />
        <text x="434" y="103" textAnchor="middle" fill="var(--gold-accent)" fontSize="10" fontFamily="monospace">
          QUARTERLY LEDGER
        </text>
        <text x="434" y="131" textAnchor="middle" fill="var(--text-primary)" fontSize="20" fontFamily="var(--font-serif), Georgia, serif">
          {PURIFICATION_HOLDINGS[active].purified}
        </text>
        <text x="434" y="153" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace">
          {PURIFICATION_HOLDINGS[active].ticker} allocated
        </text>
      </svg>
    </figure>
  );
}

/**
 * 7. AnimatedBearCaseChallenge (New Concept — "Challenge stage & dissent")
 * Four stress-test vectors probe the central investment thesis before CIO review.
 */
const STRESS_VECTORS = [
  { label: "Margin shock", x: 95, y: 52 },
  { label: "Debt drift", x: 445, y: 52 },
  { label: "Governance", x: 95, y: 198 },
  { label: "Multiple cut", x: 445, y: 198 },
];

export function AnimatedBearCaseChallenge({ isMotion = true }: { isMotion?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [probe, setProbe] = useState(0);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setProbe((p) => (p + 1) % STRESS_VECTORS.length), 1700);
    return () => window.clearInterval(t);
  }, [isMotion]);

  return (
    <figure className="relative mx-auto w-full max-w-[540px] select-none">
      <svg viewBox="0 0 540 250" className="w-full overflow-visible" aria-hidden>
        {/* Shield rings */}
        <circle cx="270" cy="125" r="64" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.22" strokeDasharray="4 5" />
        <circle
          cx="270"
          cy="125"
          r="46"
          fill="rgba(214,180,106,0.06)"
          stroke="var(--gold-accent)"
          strokeOpacity="0.55"
        />

        {STRESS_VECTORS.map((v, i) => {
          const hot = probe === i;
          const pathId = `${uid}-stress-${i}`;
          const d = `M ${v.x} ${v.y} L 270 125`;
          return (
            <g key={v.label} onMouseEnter={() => setProbe(i)} className="cursor-pointer">
              <path
                id={pathId}
                d={d}
                stroke="var(--gold-accent)"
                strokeOpacity={hot ? 0.85 : 0.22}
                strokeWidth={hot ? 1.6 : 1}
                strokeDasharray="3 4"
              />
              {isMotion && hot && (
                <circle r="4" fill="var(--gold-accent)">
                  <animateMotion dur="1.4s" repeatCount="indefinite">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              )}
              <rect
                x={v.x - 54}
                y={v.y - 16}
                width="108"
                height="32"
                rx="16"
                fill={hot ? "rgba(214,180,106,0.16)" : "rgba(10,9,7,0.9)"}
                stroke="var(--gold-accent)"
                strokeOpacity={hot ? 0.95 : 0.35}
              />
              <text
                x={v.x}
                y={v.y + 4}
                textAnchor="middle"
                fill={hot ? "var(--gold-accent)" : "var(--text-primary)"}
                fontSize="11"
                fontFamily="monospace"
              >
                {v.label}
              </text>
            </g>
          );
        })}

        {/* Central Thesis Diamond */}
        <polygon points="270,99 296,125 270,151 244,125" fill="var(--gold-accent)" />
        <text x="270" y="129" textAnchor="middle" fill="#0a0907" fontSize="10" fontWeight="700" fontFamily="monospace">
          THESIS
        </text>
      </svg>
      <p className="mt-1 text-center text-[13px] secondary">
        Testing <span className="text-[var(--gold-accent)] font-mono">{STRESS_VECTORS[probe].label}</span> — full bear case &amp; dissent recorded before CIO review.
      </p>
    </figure>
  );
}

/**
 * 8. AnimatedMarginOfSafety (New Concept — "Priced below its value")
 * Price path oscillating into and out of the gold Margin of Safety discount band.
 */
export function AnimatedMarginOfSafety({ isMotion = true }: { isMotion?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const curve = "M 36 105 C 95 70, 145 168, 215 178 C 285 188, 330 92, 405 112 C 445 122, 475 156, 504 148";

  return (
    <figure className="relative mx-auto w-full max-w-[540px] select-none">
      <svg viewBox="0 0 540 240" className="w-full overflow-visible" aria-hidden>
        {/* Fair Value Line */}
        <line x1="30" y1="92" x2="510" y2="92" stroke="var(--text-secondary)" strokeOpacity="0.45" strokeDasharray="5 5" />
        <text x="510" y="84" textAnchor="end" fill="#f87171" fillOpacity="0.85" fontSize="10" fontFamily="monospace">
          FAIR VALUE ESTIMATE
        </text>

        {/* Margin of Safety Zone */}
        <rect x="30" y="138" width="480" height="68" fill="rgba(52,211,153,0.06)" />
        <line x1="30" y1="138" x2="510" y2="138" stroke="#34d399" strokeOpacity="0.45" />
        <text x="40" y="154" fill="#34d399" fillOpacity="0.9" fontSize="10" fontFamily="monospace">
          MARGIN OF SAFETY ZONE
        </text>

        {/* Price Curve */}
        <path id={`${uid}-price`} d={curve} fill="none" stroke="var(--gold-accent)" strokeWidth="2" />

        {/* Overextended peak indicator (subtle red) */}
        <circle cx="95" cy="91" r="4" fill="#f87171" fillOpacity="0.8" />

        {/* Buy Signal Node in discount zone (subtle green) */}
        <circle cx="215" cy="178" r="5" fill="#34d399" fillOpacity="0.9" />
        <text x="215" y="198" textAnchor="middle" fill="#34d399" fillOpacity="0.9" fontSize="10" fontFamily="monospace">
          ENTRY ZONE
        </text>

        {isMotion && (
          <circle r="5.5" fill="#fff" stroke="var(--gold-accent)" strokeWidth="2.5">
            <animateMotion dur="5.2s" repeatCount="indefinite">
              <mpath href={`#${uid}-price`} />
            </animateMotion>
          </circle>
        )}
      </svg>
      <p className="mt-1 text-center text-[13px] secondary">
        Capital is deployed only when market price sits inside the <span className="text-[var(--gold-accent)]">Margin of Safety</span> band.
      </p>
    </figure>
  );
}

/**
 * 9. AnimatedDailyReconciliation (New Concept — "IBKR Custody & Audit Chain")
 * Live daily lockstep pulse between Interactive Brokers custody and Simat Decision Log.
 */
export function AnimatedDailyReconciliation({ isMotion = true }: { isMotion?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const [block, setBlock] = useState(0);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setBlock((b) => (b + 1) % 4), 1300);
    return () => window.clearInterval(t);
  }, [isMotion]);

  return (
    <figure className="relative mx-auto w-full max-w-[540px] select-none">
      <svg viewBox="0 0 540 220" className="w-full overflow-visible" aria-hidden>
        {/* IBKR Box */}
        <rect x="24" y="40" width="150" height="72" rx="8" fill="rgba(255,255,255,0.02)" stroke="var(--gold-accent)" strokeOpacity="0.45" />
        <text x="99" y="69" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600">
          Interactive Brokers
        </text>
        <text x="99" y="90" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace">
          CUSTODY · POSITIONS
        </text>

        {/* Simat Ledger Box */}
        <rect x="366" y="40" width="150" height="72" rx="8" fill="rgba(214,180,106,0.07)" stroke="var(--gold-accent)" strokeOpacity="0.7" />
        <text x="441" y="69" textAnchor="middle" fill="var(--gold-accent)" fontSize="13" fontWeight="600">
          Simat Decision Log
        </text>
        <text x="441" y="90" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace">
          HASHED AUDIT TRAIL
        </text>

        {/* Sync Paths */}
        <path id={`${uid}-sync-top`} d="M 174 64 L 366 64" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeWidth="1.4" />
        <path id={`${uid}-sync-bot`} d="M 366 88 L 174 88" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeWidth="1.4" />
        {isMotion && (
          <>
            <circle r="3.5" fill="var(--gold-accent)">
              <animateMotion dur="1.8s" repeatCount="indefinite">
                <mpath href={`#${uid}-sync-top`} />
              </animateMotion>
            </circle>
            <circle r="3.5" fill="var(--gold-accent)">
              <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite">
                <mpath href={`#${uid}-sync-bot`} />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Hash Chain Blocks below */}
        {[0, 1, 2, 3].map((idx) => {
          const x = 68 + idx * 108;
          const lit = idx === block;
          return (
            <g key={idx}>
              {idx < 3 && (
                <line x1={x + 80} y1="168" x2={x + 108} y2="168" stroke="var(--gold-accent)" strokeOpacity="0.4" />
              )}
              <rect
                x={x}
                y="148"
                width="80"
                height="40"
                rx="6"
                fill={lit ? "rgba(214,180,106,0.16)" : "rgba(255,255,255,0.015)"}
                stroke="var(--gold-accent)"
                strokeOpacity={lit ? 0.95 : 0.3}
              />
              <text x={x + 40} y="166" textAnchor="middle" fill={lit ? "var(--gold-accent)" : "var(--text-primary)"} fontSize="10" fontFamily="monospace">
                DAY #{410 + idx}
              </text>
              <text x={x + 40} y="180" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="monospace">
                RECONCILED
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/**
 * 10. AnimatedProfitLossNAV (New Concept — "Profit & Loss / High-Water Mark")
 * Shows green segments for gains, red segments for drawdowns, and live P&L ticker.
 */
const PNL_POINTS = [
  { label: "Y1", x: 56, y: 185, nav: 100.0, chg: 0 },
  { label: "Y2", x: 142, y: 118, nav: 121.4, chg: 21.4 },
  { label: "Y3", x: 228, y: 158, nav: 109.2, chg: -10.0 },
  { label: "Y4", x: 314, y: 102, nav: 128.5, chg: 17.7 },
  { label: "Y5", x: 400, y: 66, nav: 144.8, chg: 12.7 },
  { label: "Y6", x: 484, y: 84, nav: 138.2, chg: -4.6 },
];

export function AnimatedProfitLossNAV({ isMotion = true }: { isMotion?: boolean }) {
  const [step, setStep] = useState(5);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % PNL_POINTS.length), 1500);
    return () => window.clearInterval(t);
  }, [isMotion]);

  const cur = PNL_POINTS[step];
  const isGain = cur.chg >= 0;

  return (
    <figure className="relative mx-auto w-full max-w-[540px] select-none">
      <div className="mb-3 flex items-center justify-between text-[12px] font-mono">
        <span className="text-[var(--text-secondary)]">
          PERIOD <strong className="text-[var(--text-primary)]">{cur.label}</strong> · NAV{" "}
          <strong className="text-[var(--text-primary)]">{cur.nav.toFixed(1)}</strong>
        </span>
        <span
          className="rounded-full px-2.5 py-0.5 font-semibold"
          style={{
            color: cur.chg === 0 ? "var(--gold-accent)" : isGain ? "#34d399" : "#f87171",
            background: cur.chg === 0 ? "rgba(214,180,106,0.12)" : isGain ? "rgba(52,211,153,0.14)" : "rgba(248,113,113,0.14)",
          }}
        >
          {cur.chg === 0 ? "BASE 0.0%" : `${isGain ? "+" : ""}${cur.chg.toFixed(1)}% ${isGain ? "PROFIT" : "DRAWDOWN"}`}
        </span>
      </div>

      <svg viewBox="0 0 540 220" className="w-full overflow-visible" aria-hidden>
        <line x1="36" y1="196" x2="504" y2="196" stroke="var(--hairline)" />
        {/* High-water mark dashed reference */}
        <line x1="142" y1="118" x2="314" y2="118" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeDasharray="4 4" />

        {PNL_POINTS.slice(1).map((pt, idx) => {
          const prev = PNL_POINTS[idx];
          const gain = pt.y <= prev.y;
          const color = gain ? "#34d399" : "#f87171";
          const active = idx + 1 <= step;
          return (
            <line
              key={pt.label}
              x1={prev.x}
              y1={prev.y}
              x2={pt.x}
              y2={pt.y}
              stroke={color}
              strokeWidth={active ? 2.8 : 1.2}
              strokeOpacity={active ? 1 : 0.22}
              strokeLinecap="round"
              style={{ transition: "all 350ms ease" }}
            />
          );
        })}

        {PNL_POINTS.map((pt, i) => {
          const color = i === 0 ? "var(--gold-accent)" : pt.chg >= 0 ? "#34d399" : "#f87171";
          const lit = i === step;
          return (
            <g key={pt.label} onClick={() => setStep(i)} className="cursor-pointer">
              {lit && <circle cx={pt.x} cy={pt.y} r="10" fill={color} fillOpacity="0.18" />}
              <circle cx={pt.x} cy={pt.y} r={lit ? 5.5 : 3.8} fill={i <= step ? color : "var(--bg)"} stroke={color} strokeWidth="1.6" />
              <text x={pt.x} y="213" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="monospace">
                {pt.label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

/**
 * 11. AnimatedFourRulebooks (Demo — "One company. Four rulebooks.")
 * Auto-toggles market move (-10%) showing AAOIFI breach (red) while S&P/MSCI/FTSE pass (green).
 */
const RULEBOOKS = [
  { name: "AAOIFI", basis: "Debt ÷ market value", base: 29.1, drop: 32.3, limit: 30.0 },
  { name: "S&P Shariah", basis: "Debt ÷ 36m avg mkt val", base: 29.6, drop: 29.6, limit: 33.0 },
  { name: "MSCI Islamic", basis: "Debt ÷ total assets", base: 32.0, drop: 32.0, limit: 33.33 },
  { name: "FTSE Shariah", basis: "Debt ÷ total assets", base: 32.0, drop: 32.0, limit: 33.33 },
];

export function AnimatedFourRulebooks({ isMotion = true }: { isMotion?: boolean }) {
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setDropped((d) => !d), 2600);
    return () => window.clearInterval(t);
  }, [isMotion]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-[12px] font-mono">
        <span className="secondary">
          Market Value:{" "}
          <strong style={{ color: dropped ? "#f87171" : "var(--text-primary)" }}>
            {dropped ? "$9.9bn (-10%)" : "$11.0bn"}
          </strong>
        </span>
        <button
          type="button"
          onClick={() => setDropped((d) => !d)}
          className="rounded border px-2.5 py-1 text-[11px] font-mono cursor-pointer transition-colors"
          style={{
            borderColor: dropped ? "#f87171" : "var(--gold-accent)",
            color: dropped ? "#f87171" : "var(--gold-accent)",
            background: dropped ? "rgba(248,113,113,0.10)" : "rgba(214,180,106,0.08)",
          }}
        >
          {dropped ? "State: Share price −10%" : "State: Baseline"}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {RULEBOOKS.map((rb) => {
          const val = dropped ? rb.drop : rb.base;
          const fail = val > rb.limit;
          const color = fail ? "#f87171" : "#34d399";
          const pct = Math.min(100, (val / 38) * 100);
          const limPct = (rb.limit / 38) * 100;
          return (
            <div
              key={rb.name}
              className="rounded-lg border p-3.5 transition-colors duration-500"
              style={{
                borderColor: fail ? "rgba(248,113,113,0.6)" : "var(--hairline)",
                background: fail ? "rgba(248,113,113,0.06)" : "rgba(255,255,255,0.015)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[var(--text-primary)]">{rb.name}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold"
                  style={{
                    color,
                    background: fail ? "rgba(248,113,113,0.16)" : "rgba(52,211,153,0.14)",
                  }}
                >
                  {fail ? "FAIL" : "PASS"}
                </span>
              </div>
              <p className="text-[11px] secondary mt-0.5">{rb.basis}</p>
              <div className="relative mt-2.5 h-2 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: color }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white/80"
                  style={{ left: `${limPct}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] font-mono" style={{ color }}>
                {val.toFixed(1)}% vs {rb.limit}% limit
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 12. AnimatedDrawdownShield (Demo — "When markets fall")
 * Compares passive index drawdown (red) vs Simat pre-set risk floor & cash buffer (gold/green).
 */
export function AnimatedDrawdownShield({ isMotion = true }: { isMotion?: boolean }) {
  const uid = useId().replace(/:/g, "");
  const indexPath = "M 36 62 C 130 66, 210 120, 290 172 C 360 198, 430 182, 504 166";
  const simatPath = "M 36 62 C 130 64, 210 92, 290 106 C 360 110, 430 96, 504 86";

  return (
    <figure className="relative mx-auto w-full max-w-[540px] select-none">
      <svg viewBox="0 0 540 225" className="w-full overflow-visible" aria-hidden>
        {/* Risk Floor */}
        <line x1="30" y1="118" x2="510" y2="118" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeDasharray="5 5" />
        <text x="510" y="132" textAnchor="end" fill="var(--gold-accent)" fontSize="10" fontFamily="monospace">
          PRE-SET RISK FLOOR · CASH BUFFER
        </text>

        {/* Passive Index Drop */}
        <path id={`${uid}-idx-drop`} d={indexPath} fill="none" stroke="#f87171" strokeOpacity="0.75" strokeWidth="2" strokeDasharray="4 4" />
        <text x="504" y="182" textAnchor="end" fill="#f87171" fontSize="10" fontFamily="monospace">
          PASSIVE INDEX (-18%)
        </text>

        {/* Simat Shielded Curve */}
        <path id={`${uid}-simat-shield`} d={simatPath} fill="none" stroke="#34d399" strokeWidth="2.4" />
        <text x="504" y="76" textAnchor="end" fill="#34d399" fontSize="10" fontFamily="monospace">
          SIMAT RISK-MANAGED (-6%)
        </text>

        {isMotion && (
          <>
            <circle r="4" fill="#f87171">
              <animateMotion dur="4.4s" repeatCount="indefinite">
                <mpath href={`#${uid}-idx-drop`} />
              </animateMotion>
            </circle>
            <circle r="4.5" fill="#34d399" stroke="#0a0907" strokeWidth="1.5">
              <animateMotion dur="4.4s" repeatCount="indefinite">
                <mpath href={`#${uid}-simat-shield`} />
              </animateMotion>
            </circle>
          </>
        )}
      </svg>
      <p className="mt-1 text-center text-[13px] secondary">
        Risk is set before every trade; <span className="text-[var(--gold-accent)]">cash is held</span> when ideas are scarce.
      </p>
    </figure>
  );
}

/**
 * 13. AnimatedIndexConcentration (Demo — "The problem with passive Islamic funds")
 * Contrasts top-heavy index concentration (red) vs Simat capped conviction weights (gold/green).
 */
const PASSIVE_WEIGHTS = [34, 26, 18, 12, 10];
const SIMAT_WEIGHTS = [11, 10, 9, 9, 8];

export function AnimatedIndexConcentration({ isMotion = true }: { isMotion?: boolean }) {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    if (!isMotion) return;
    const t = window.setInterval(() => setHighlight((h) => (h + 1) % PASSIVE_WEIGHTS.length), 1400);
    return () => window.clearInterval(t);
  }, [isMotion]);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="rounded-lg border p-4" style={{ borderColor: "rgba(248,113,113,0.35)" }}>
        <p className="text-[11px] font-mono uppercase tracking-wider text-[#f87171] mb-3">
          Passive Shariah Index (Top-Heavy)
        </p>
        <div className="space-y-2">
          {PASSIVE_WEIGHTS.map((w, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] font-mono">
              <span className="w-12 secondary">Top {i + 1}</span>
              <div className="h-2.5 flex-1 rounded bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{
                    width: `${w * 2.5}%`,
                    background: i < 2 ? "#f87171" : "rgba(248,113,113,0.5)",
                    opacity: highlight === i ? 1 : 0.72,
                  }}
                />
              </div>
              <span className="w-8 text-right text-[#f87171]">{w}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border p-4" style={{ borderColor: "rgba(52,211,153,0.4)" }}>
        <p className="text-[11px] font-mono uppercase tracking-wider text-[#34d399] mb-3">
          Simat Mandate (Hard Position Caps)
        </p>
        <div className="space-y-2">
          {SIMAT_WEIGHTS.map((w, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] font-mono">
              <span className="w-12 secondary">Pos {i + 1}</span>
              <div className="h-2.5 flex-1 rounded bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{
                    width: `${w * 2.5}%`,
                    background: "#34d399",
                    opacity: highlight === i ? 1 : 0.72,
                  }}
                />
              </div>
              <span className="w-8 text-right text-[#34d399]">{w}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
