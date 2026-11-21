"use client";

import { useState } from "react";
import { C, CONVICTION, DOWNSIDE_POINTS, IDEAS, LIMITS, SHOCKS } from "../content";
import { Chapter, Diamond, Pill, useReducedMotion, useSeen, useTicker } from "../primitives";

/* ================================================================
   06 · Building the portfolio — size an idea, run the four limit
   checks, and add it to the portfolio only if every check passes
================================================================ */

const SINGLE = [0.3, 0.5, 0.7, 0.9, 1.15];
const STEPS = ["Idea", "Sized", "Limits checked", "Portfolio"];
const EXISTING = 10;
const SLOTS = 14;

function usage(ideaIdx: number, c: number) {
  const idea = IDEAS[ideaIdx];
  return [SINGLE[c - 1], idea.sector[0] + idea.sector[1] * c, idea.liq * c, 0.35 + 0.1 * c];
}

function PortfolioVisual() {
  const reduced = useReducedMotion();
  const [idea, setIdea] = useState(0);
  const [conv, setConv] = useState(3);
  const [checked, setChecked] = useState(-1); // -1 idle, 0..4 checks completed
  const [added, setAdded] = useState<string[]>([]);

  const vals = usage(idea, conv);
  const checking = checked >= 0 && checked < LIMITS.length;
  const done = checked === LIMITS.length;
  const pass = vals.every((v) => v <= 1);
  const inPortfolio = added.includes(IDEAS[idea].name);

  useTicker(checking, 520, () => setChecked((n) => Math.min(LIMITS.length, n + 1)));

  const reset = () => setChecked(-1);
  const run = () => setChecked(reduced ? LIMITS.length : 0);
  const stepNow = inPortfolio ? 3 : done ? 2 : checking ? 2 : 1;

  return (
    <div className="dm-panel p-5 sm:p-7">
      {/* stepper */}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px]" aria-label="Process">
        {STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1 font-semibold"
              style={{
                background: i <= stepNow ? `color-mix(in srgb, ${C.bl} 16%, transparent)` : "transparent",
                color: i <= stepNow ? "var(--text-primary)" : "var(--text-secondary)",
                border: `1px solid ${i === stepNow ? C.bl : "var(--panel-line)"}`,
                transition: "all 400ms var(--ease)",
              }}
            >
              {s}
              {s === "Portfolio" && <span className="font-normal text-[var(--text-secondary)]"> (typically 11–14 holdings)</span>}
            </span>
            {i < STEPS.length - 1 && <span className="text-[var(--text-secondary)]">→</span>}
          </li>
        ))}
      </ol>

      <div className="mt-7 grid gap-7 md:grid-cols-2">
        {/* controls */}
        <div>
          <p className="dm-tag">1 · Choose an idea</p>
          <div className="mt-3 grid gap-2" role="radiogroup" aria-label="Idea">
            {IDEAS.map((x, i) => (
              <button
                key={x.name}
                role="radio"
                aria-checked={i === idea}
                onClick={() => {
                  setIdea(i);
                  reset();
                }}
                className="flex items-center justify-between rounded-[10px] border px-4 py-3 text-left"
                style={{
                  borderColor: i === idea ? C.bl : "var(--panel-line)",
                  background: i === idea ? `color-mix(in srgb, ${C.bl} 8%, transparent)` : "transparent",
                  transition: "all 400ms var(--ease)",
                  cursor: "pointer",
                }}
              >
                <span>
                  <span className="block text-[15px] font-semibold">{x.name}</span>
                  <span className="block text-[13px] text-[var(--text-secondary)]">{x.desc}</span>
                </span>
                {added.includes(x.name) && <Pill color={C.gold}>Held</Pill>}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-baseline justify-between">
            <label htmlFor="conviction" className="dm-tag">
              2 · Set conviction
            </label>
            <span className="serif text-[22px]" style={{ color: C.bl }}>
              {CONVICTION[conv - 1]}
            </span>
          </div>
          <input
            id="conviction"
            type="range"
            min={1}
            max={5}
            step={1}
            value={conv}
            onChange={(e) => {
              setConv(Number(e.target.value));
              reset();
            }}
            aria-valuetext={CONVICTION[conv - 1]}
            className="dm-range mt-2"
            style={{ ["--fill" as string]: `${((conv - 1) / 4) * 100}%`, ["--track" as string]: C.bl }}
          />
          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">Higher conviction means a larger proposed position.</p>

          <button className="btn btn-gold mt-6 w-full" onClick={run} disabled={checking}>
            {checking ? "Checking limits…" : "3 · Run the limit checks"}
          </button>
        </div>

        {/* checks */}
        <div>
          <p className="dm-tag">Pre-trade limits</p>
          <ul className="mt-3 grid gap-4">
            {LIMITS.map((l, i) => {
              const v = vals[i];
              const ok = v <= 1;
              const resolved = checked > i;
              const active = checked === i;
              const col = !resolved ? C.bl : ok ? C.em : C.co;
              return (
                <li key={l}>
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="font-medium">{l}</span>
                    {resolved ? (
                      <Pill color={col}>{ok ? "Pass" : "Stop"}</Pill>
                    ) : active ? (
                      <svg className="dm-spin" width="16" height="16" viewBox="0 0 16 16" aria-label="checking">
                        <circle cx="8" cy="8" r="6" fill="none" stroke={C.bl} strokeWidth="2" strokeDasharray="20 40" />
                      </svg>
                    ) : (
                      <span className="text-[12px] text-[var(--text-secondary)]">Pending</span>
                    )}
                  </div>
                  <div className="relative mt-2 h-2 rounded-full bg-white/[0.06]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${Math.min(v, 1.3) / 1.3 * 100}%`,
                        background: col,
                        opacity: resolved ? 0.9 : 0.45,
                        transition: "width 600ms var(--ease), background-color 400ms, opacity 400ms",
                      }}
                    />
                    <span className="absolute -top-1 bottom-[-4px] w-px" style={{ left: `${100 / 1.3}%`, background: "var(--text-primary)" }} title="Limit" />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-right text-[11px] text-[var(--text-secondary)]">│ = limit</p>

          <div className="mt-4 min-h-[112px]" aria-live="polite">
            {done && (
              <div className="dm-fade-up rounded-[10px] border p-4" style={{ borderColor: pass ? C.em : C.co, background: `color-mix(in srgb, ${pass ? C.em : C.co} 7%, transparent)` }}>
                <p className="text-[15px] font-semibold" style={{ color: pass ? C.em : C.co }}>
                  {pass ? "Every limit passes. The proposal goes to the CIO." : "A limit failed. Nothing proceeds."}
                </p>
                <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                  {pass ? "Sized, costed and recorded before any approval." : "Lower the conviction to resize, then run the checks again."}
                </p>
                {pass && (
                  <button
                    className="btn btn-outline mt-3 !min-h-[40px] !text-[14px]"
                    disabled={inPortfolio || EXISTING + added.length >= SLOTS}
                    onClick={() => setAdded((a) => [...a, IDEAS[idea].name])}
                  >
                    {inPortfolio ? "In the portfolio" : "Add to portfolio"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* portfolio */}
      <div className="mt-6 border-t border-[var(--hairline)] pt-5">
        <div className="flex items-center justify-between">
          <p className="dm-tag">Portfolio · illustrative</p>
          <p className="text-[13px] text-[var(--text-secondary)]">{EXISTING + added.length} holdings</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {Array.from({ length: SLOTS }, (_, i) => {
            const newIdx = i - EXISTING;
            const isNew = newIdx >= 0 && newIdx < added.length;
            const filled = i < EXISTING || isNew;
            return (
              <span key={i} className={isNew ? "dm-fade-up" : ""} title={isNew ? added[newIdx] : undefined}>
                <Diamond size={16} color={isNew ? C.gold : filled ? "rgba(243,236,220,0.35)" : "rgba(243,236,220,0.15)"} filled={filled} />
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  return (
    <Chapter id="portfolio">
      <PortfolioVisual />
    </Chapter>
  );
}

/* ================================================================
   07 · The downside — a bad-day drill against past shocks.
   Shape only: no axes, no projected figures.
================================================================ */

const DX = (i: number) => 50 + i * (520 / 12);
const LIMIT_Y = 150;

function DownsideVisual() {
  const seen = useSeen();
  const reduced = useReducedMotion();
  const [shock, setShock] = useState(1);
  const [phase, setPhase] = useState(0);
  useTicker(seen && phase < 4, 1000, () => setPhase((p) => p + 1));
  const ph = reduced ? 4 : phase;

  const path = SHOCKS[shock].path;
  const d = path.map((y, i) => `${i ? "L" : "M"}${DX(i)} ${y}`).join(" ");
  const cross = Math.max(1, path.findIndex((y) => y >= LIMIT_Y));
  const trough = path.indexOf(Math.max(...path));

  const restart = (i: number) => {
    setShock(i);
    setPhase(0);
  };

  const markers = [
    { x: DX(0), y: path[0], label: "Bear case written", at: 1, col: C.gold, dy: -26 },
    { x: DX(0), y: path[0], label: "Stress tested", at: 2, col: C.bl, dy: -48 },
    { x: DX(cross), y: path[cross], label: "Review triggered", at: 3, col: C.co, dy: 34 },
    { x: DX(trough), y: path[trough], label: "Cash as defence", at: 4, col: C.em, dy: 30 },
  ];

  return (
    <div className="dm-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Past market shock">
          {SHOCKS.map((s, i) => (
            <button key={s.name} role="radio" aria-checked={i === shock} className="dm-chip !min-h-[36px] !text-[13px]" style={{ ["--chip" as string]: C.co }} onClick={() => restart(i)}>
              {s.name}
            </button>
          ))}
        </div>
        <button className="text-link text-[14px]" onClick={() => restart(shock)}>
          ↻ Run the drill again
        </button>
      </div>

      <svg viewBox="0 0 600 260" className="mt-5 w-full" role="img" aria-label={`Illustrative ${SHOCKS[shock].name} path. Bear case and stress test before; review at the drawdown limit; cash held as defence.`}>
        <rect x="0" y="0" width={DX(0) + 6} height="260" fill="rgba(110,168,255,0.05)" />
        <text x={DX(0) / 2 + 3} y="250" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
          Before
        </text>
        <line x1="20" x2="590" y1={LIMIT_Y} y2={LIMIT_Y} stroke={C.co} strokeOpacity="0.7" strokeDasharray="6 5" />
        <text x="588" y={LIMIT_Y - 8} textAnchor="end" fontSize="11" fontWeight={600} fill={C.co}>
          Drawdown limit
        </text>
        <path d={d} fill="none" stroke="rgba(243,236,220,0.12)" strokeWidth="2" />
        <path
          key={`${shock}`}
          d={d}
          pathLength={1}
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1, strokeDashoffset: ph >= 3 ? 0 : ph >= 2 ? 0.55 : 1, transition: "stroke-dashoffset 1400ms var(--ease)" }}
        />
        {markers.map((m) => {
          const on = ph >= m.at;
          return (
            <g key={m.label} style={{ opacity: on ? 1 : 0, transition: "opacity 500ms var(--ease)" }}>
              <line x1={m.x} x2={m.x} y1={m.y} y2={m.y + m.dy + (m.dy < 0 ? 6 : -12)} stroke={m.col} strokeOpacity="0.6" />
              <circle cx={m.x} cy={m.y} r="5" fill={m.col} />
              {on && <circle cx={m.x} cy={m.y} r="5" fill="none" stroke={m.col} className="dm-ping" />}
              <text x={m.x + (m.x < 100 ? -4 : 0)} y={m.y + m.dy} textAnchor={m.x < 100 ? "start" : "middle"} fontSize="12" fontWeight={600} fill={m.col}>
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-[12px] text-[var(--text-secondary)]">Illustrative shape of a past shock. No projected losses or return figures.</p>
    </div>
  );
}

function DownsidePoints() {
  return (
    <ul className="grid gap-3">
      {DOWNSIDE_POINTS.map((p, i) => (
        <li key={p} className="flex items-start gap-3 text-[16px] text-[var(--text-primary)]">
          <span className="serif mt-[1px] w-6 shrink-0 text-[18px]" style={{ color: [C.gold, C.bl, C.co, C.em][i] }}>
            {i + 1}
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

export function Downside() {
  return (
    <Chapter id="downside" aside={<DownsidePoints />}>
      <DownsideVisual />
    </Chapter>
  );
}
