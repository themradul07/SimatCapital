"use client";

import { useState } from "react";
import { BELIEFS, C, DEBT_LIMIT, PROBLEMS, QUARTERS } from "../content";
import { Chapter, Diamond, Pill, d, useSeen, useTicker } from "../primitives";

/* ================================================================
   01 · Our beliefs — the mark's diamond, split into four principles
================================================================ */

const PIECES = [
  { pts: "200,16 292,108 200,200 108,108", cx: 200, cy: 108, dx: 0, dy: -12 },
  { pts: "384,200 292,292 200,200 292,108", cx: 292, cy: 200, dx: 12, dy: 0 },
  { pts: "200,384 108,292 200,200 292,292", cx: 200, cy: 292, dx: 0, dy: 12 },
  { pts: "16,200 108,108 200,200 108,292", cx: 108, cy: 200, dx: -12, dy: 0 },
] as const;

function BeliefsVisual() {
  const seen = useSeen();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  useTicker(seen && !touched, 4200, () => setActive((a) => (a + 1) % 4));
  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };
  const b = BELIEFS[active];

  return (
    <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <svg viewBox="-8 -8 416 416" className="mx-auto w-full max-w-[360px]" role="group" aria-label="Four beliefs, one per piece of the mark">
        {PIECES.map((p, i) => {
          const on = i === active;
          const col = BELIEFS[i].color;
          return (
            <g
              key={i}
              role="button"
              tabIndex={0}
              aria-label={BELIEFS[i].title}
              aria-pressed={on}
              onClick={() => pick(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(i))}
              style={{
                cursor: "pointer",
                transform: on ? `translate(${p.dx}px, ${p.dy}px)` : "none",
                transition: "transform 700ms var(--ease)",
                outline: "none",
              }}
            >
              <polygon
                points={p.pts}
                fill={col}
                fillOpacity={on ? 0.18 : 0.02}
                stroke={on ? col : "var(--line)"}
                strokeWidth={on ? 1.6 : 1.1}
                style={{ transition: "fill-opacity 600ms var(--ease), stroke 600ms var(--ease)" }}
              />
              <text x={p.cx} y={p.cy + 13} textAnchor="middle" className="serif" fontSize="40" fill={on ? col : "var(--text-secondary)"} style={{ transition: "fill 600ms" }}>
                {`0${i + 1}`}
              </text>
            </g>
          );
        })}
      </svg>

      <div>
        <div key={active} className="dm-panel dm-fade-up p-7" style={{ borderColor: `color-mix(in srgb, ${b.color} 45%, transparent)` }}>
          <p className="dm-tag" style={{ color: b.color }}>
            Belief {`0${active + 1}`}
          </p>
          <h3 className="h3 mt-3 !text-[28px]">{b.title}</h3>
          <p className="body mt-3">{b.body}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Beliefs">
          {BELIEFS.map((x, i) => (
            <button
              key={x.title}
              role="tab"
              aria-selected={i === active}
              className="dm-chip"
              style={{ ["--chip" as string]: x.color }}
              onClick={() => pick(i)}
            >
              {`0${i + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Beliefs() {
  return (
    <Chapter id="beliefs">
      <BeliefsVisual />
    </Chapter>
  );
}

/* ================================================================
   02 · The problems we solve — flip each gap to see our answer
================================================================ */

function ProblemsVisual() {
  const [open, setOpen] = useState<boolean[]>([false, false, false]);
  const all = open.every(Boolean);
  const toggle = (i: number) => setOpen((o) => o.map((v, k) => (k === i ? !v : v)));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="small">Tap a card to turn the gap into our answer.</p>
        <button className="dm-chip" aria-pressed={all} style={{ ["--chip" as string]: C.em }} onClick={() => setOpen([!all, !all, !all])}>
          {all ? "Show the gaps" : "Show all answers"}
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {PROBLEMS.map((p, i) => (
          <button key={p.gap} className="dm-flip dm-x min-h-[270px]" style={d(200 + i * 140)} aria-pressed={open[i]} onClick={() => toggle(i)}>
            <span className="sr-only">{open[i] ? `Our answer: ${p.answer}` : `The gap: ${p.gap} ${p.gapBody}`}</span>
            <span className="dm-flip-inner" aria-hidden>
              <span className="dm-face" style={{ background: "rgba(255,138,115,0.05)", border: "1px solid rgba(255,138,115,0.32)" }}>
                <span className="flex items-center justify-between">
                  <Pill color={C.co}>The gap</Pill>
                  <span className="serif text-[22px] text-[var(--text-secondary)]">{`0${i + 1}`}</span>
                </span>
                <span className="h3 mt-4 block">{p.gap}</span>
                <span className="body block text-[15px]">{p.gapBody}</span>
                <span className="mt-auto pt-4 text-[13px] font-semibold" style={{ color: C.co }}>
                  See our answer →
                </span>
              </span>
              <span className="dm-face dm-face-back" style={{ background: "rgba(60,203,143,0.07)", border: "1px solid rgba(60,203,143,0.4)" }}>
                <span className="flex items-center justify-between">
                  <Pill color={C.em}>Our answer</Pill>
                  <span className="serif text-[22px] text-[var(--text-secondary)]">{`0${i + 1}`}</span>
                </span>
                <span className="mt-4 flex items-start gap-3">
                  <span className="mt-[6px]">
                    <Diamond color={C.em} />
                  </span>
                  <span className="h3 block">{p.answer}</span>
                </span>
                <span className="mt-auto pt-4 text-[13px] font-semibold text-[var(--text-secondary)]">← Back to the gap</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Problems() {
  return (
    <Chapter id="problems" wide>
      <ProblemsVisual />
    </Chapter>
  );
}

/* ================================================================
   03 · Why Shariah is hard — one company across four quarters,
   then a slider to try the debt screen yourself
================================================================ */

const Y = (v: number) => 230 - (v / 50) * 190;
const statusColor = (s: string) => (s === "Compliant" ? C.em : s === "Breach" ? C.co : "var(--text-secondary)");

function QuarterChart() {
  const seen = useSeen();
  const [q, setQ] = useState(0);
  const [touched, setTouched] = useState(false);
  useTicker(seen && !touched, 2200, () => setQ((x) => (x + 1) % 4));
  const cur = QUARTERS[q];

  return (
    <div className="dm-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="dm-tag">One company · four quarters · illustrative</p>
        <div className="flex gap-2" role="tablist" aria-label="Quarter">
          {QUARTERS.map((x, i) => (
            <button
              key={x.q}
              role="tab"
              aria-selected={i === q}
              className="dm-chip !min-h-[34px] !px-3 !text-[13px]"
              style={{ ["--chip" as string]: C.bl }}
              onClick={() => {
                setTouched(true);
                setQ(i);
              }}
            >
              {x.q}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 520 270" className="mt-4 w-full" role="img" aria-label="Debt as a share of total assets: Q1 24%, Q2 29%, Q3 35% breach, Q4 exited. Limit 33.33%.">
        {[0, 10, 20, 30, 40, 50].map((v) => (
          <line key={v} x1="44" x2="510" y1={Y(v)} y2={Y(v)} stroke="var(--hairline)" />
        ))}
        {[0, 25, 50].map((v) => (
          <text key={v} x="36" y={Y(v) + 4} textAnchor="end" fontSize="11" fill="var(--text-secondary)">
            {v}%
          </text>
        ))}
        {QUARTERS.map((x, i) => {
          const bx = 80 + i * 112;
          const on = i <= q;
          const exited = x.status === "Exited";
          const col = statusColor(x.status);
          const h = (x.debt / 50) * 190;
          return (
            <g key={x.q} style={{ opacity: on ? 1 : 0.22, transition: "opacity 600ms var(--ease)" }}>
              <rect
                x={bx}
                y={Y(x.debt)}
                width="60"
                height={h}
                rx="3"
                fill={exited ? "transparent" : col}
                fillOpacity={i === q ? 0.85 : 0.4}
                stroke={col}
                strokeDasharray={exited ? "4 4" : undefined}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "bottom",
                  transform: seen ? "scaleY(1)" : "scaleY(0)",
                  transition: `transform 900ms var(--ease) ${300 + i * 120}ms, fill-opacity 500ms`,
                }}
              />
              <text x={bx + 30} y={Y(x.debt) + 24} textAnchor="middle" className="serif" fontSize="19" fill={i === q && !exited ? "#0a0907" : "var(--text-primary)"}>
                {exited ? "—" : `${x.debt}%`}
              </text>
              <text x={bx + 30} y="252" textAnchor="middle" fontSize="13" fontWeight={600} fill="var(--text-primary)">
                {x.q}
              </text>
              <text x={bx + 30} y="268" textAnchor="middle" fontSize="11" fill={col}>
                {x.status}
              </text>
            </g>
          );
        })}
        <line x1="44" x2="510" y1={Y(DEBT_LIMIT)} y2={Y(DEBT_LIMIT)} stroke={C.co} strokeDasharray="6 5" strokeWidth="1.4" />
        <rect x="392" y={Y(DEBT_LIMIT) - 24} width="118" height="19" rx="9.5" fill="var(--bg-base)" stroke={C.co} strokeOpacity="0.5" />
        <text x="451" y={Y(DEBT_LIMIT) - 10.5} textAnchor="middle" fontSize="11" fontWeight={600} fill={C.co}>
          Limit 33.33%
        </text>
      </svg>

      <div key={q} className="dm-fade-up mt-4 flex items-start gap-3 border-t border-[var(--hairline)] pt-4">
        <Pill color={statusColor(cur.status)}>{cur.status}</Pill>
        <p className="text-[15px] text-[var(--text-primary)]">{cur.note}</p>
      </div>
    </div>
  );
}

function TryTheScreen() {
  const [v, setV] = useState(28);
  const pass = v < DEBT_LIMIT;
  const col = pass ? C.em : C.co;
  return (
    <div className="dm-panel mt-5 p-5 sm:p-7" style={{ borderColor: `color-mix(in srgb, ${col} 35%, transparent)`, transition: "border-color 400ms" }}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="dm-tag" style={{ color: C.bl }}>
            Try the screen
          </p>
          <label htmlFor="debt-range" className="mt-1 block text-[15px] text-[var(--text-primary)]">
            Move the company&apos;s borrowing
          </label>
        </div>
        <div className="text-right">
          <p className="serif text-[40px] leading-none" style={{ color: col, transition: "color 400ms" }}>
            {v.toFixed(1)}%
          </p>
          <div className="mt-2">
            <Pill color={col}>{pass ? "Pass" : "Breach"}</Pill>
          </div>
        </div>
      </div>
      <input
        id="debt-range"
        type="range"
        min={10}
        max={50}
        step={0.5}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className="dm-range mt-4"
        aria-valuetext={`${v}% debt to total assets, ${pass ? "passes" : "breaches"} the 33.33% limit`}
        style={{ ["--fill" as string]: `${((v - 10) / 40) * 100}%`, ["--track" as string]: col }}
      />
      <div className="relative mt-1 h-5 text-[11px] text-[var(--text-secondary)]">
        <span className="absolute left-0">10%</span>
        <span className="absolute -translate-x-1/2" style={{ left: `${((DEBT_LIMIT - 10) / 40) * 100}%`, color: C.co }}>
          ▲ 33.33%
        </span>
        <span className="absolute right-0">50%</span>
      </div>
      <p className="mt-3 text-[14px] text-[var(--text-secondary)]">
        {pass ? "Below the limit: the company may be held." : "Above the limit: purchases stop and the holding is exited under the method's rules."}
      </p>
    </div>
  );
}

export function WhyHard() {
  return (
    <Chapter id="why-hard" aside={<p className="serif text-[24px] italic text-[var(--text-primary)]">That is why we screen continuously, not once.</p>}>
      <QuarterChart />
      <TryTheScreen />
    </Chapter>
  );
}
