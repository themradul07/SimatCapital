"use client";

import { useState } from "react";
import { C, ENGINE, ENGINE_FEED, GLOBE_LABEL, PLAYBOOK } from "../content";
import { Chapter, Pill, useSeen, useTicker } from "../primitives";

/* ================================================================
   04 · The Simat engine — seven modules, a travelling gold point,
   a return loop and an illustrative activity feed
================================================================ */

const INPUTS = ["Filings", "Results", "Prices", "Events"];
const LAST = ENGINE.length - 1;

function clock(idx: number) {
  const m = 9 * 60 + 12 + idx * 4;
  return `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function EngineVisual() {
  const seen = useSeen();
  const [tick, setTick] = useState(0);
  const [live, setLive] = useState(true);
  useTicker(seen && live, 2600, () => setTick((t) => t + 1));
  const step = tick % ENGINE.length;
  const cur = ENGINE[step];

  const pick = (i: number) => {
    setLive(false);
    setTick((t) => t - (t % ENGINE.length) + i);
  };

  const feed = [0, 1, 2, 3, 4].map((k) => tick - k).filter((i) => i >= 0);

  return (
    <div className="dm-panel overflow-hidden p-5 sm:p-8">
      {/* inputs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="dm-tag mr-2">Live inputs</span>
          {INPUTS.map((x, i) => (
            <span key={x} className="inline-flex items-center gap-2 rounded-full border border-[var(--panel-line)] px-3 py-1 text-[13px] text-[var(--text-primary)]">
              <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden>
                <circle cx="4" cy="4" r="3" fill={C.bl} />
                <circle cx="4" cy="4" r="3" fill={C.bl} className="dm-ping" style={{ animationDelay: `${i * 300}ms` }} />
              </svg>
              {x}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Pill color={live ? C.em : "var(--text-secondary)"}>{live ? "Running" : "Paused"}</Pill>
          {!live && (
            <button className="text-link text-[14px]" onClick={() => setLive(true)}>
              Resume
            </button>
          )}
        </div>
      </div>

      {/* pipeline, desktop */}
      <div className="relative mt-16 hidden md:block">
        <div className="relative grid grid-cols-7">
          <div className="absolute top-[24px] h-px bg-[var(--line)]" style={{ left: `${100 / 14}%`, right: `${100 / 14}%` }} />
          <div
            className="absolute top-[24px] h-[2px] -translate-y-[0.5px]"
            style={{
              left: `${100 / 14}%`,
              width: `${(step / LAST) * (100 - 200 / 14)}%`,
              background: "var(--gold-accent)",
              transition: "width 900ms var(--ease)",
            }}
          />
          <span
            aria-hidden
            className="absolute top-[24px] z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${((step + 0.5) / ENGINE.length) * 100}%`,
              background: "var(--gold-accent)",
              boxShadow: "0 0 18px 4px var(--gold-glow)",
              transition: "left 900ms var(--ease)",
            }}
          />
          {ENGINE.map((m, i) => {
            const on = i === step;
            const done = i < step;
            return (
              <div key={m.name} className="relative flex flex-col items-center text-center">
                {i === LAST && (
                  <span className="absolute -top-11 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.1em] uppercase" style={{ color: C.gold, borderColor: "var(--line)" }}>
                    A person decides
                  </span>
                )}
                <button
                  onClick={() => pick(i)}
                  aria-pressed={on}
                  aria-label={`${m.name}: ${m.line}`}
                  className="relative z-20 grid h-12 w-12 place-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="absolute inset-[7px] rotate-45 rounded-[3px] border"
                    style={{
                      background: on ? m.color : done ? "#17150f" : "var(--bg-base)",
                      borderColor: on || done ? m.color : "rgba(243,236,220,0.18)",
                      boxShadow: on ? `0 0 26px 2px color-mix(in srgb, ${m.color} 55%, transparent)` : "none",
                      transition: "all 600ms var(--ease)",
                    }}
                  />
                  <span className="serif relative text-[15px]" style={{ color: on ? "#0a0907" : done ? m.color : "var(--text-secondary)" }}>
                    {i + 1}
                  </span>
                </button>
                <span className="mt-3 px-1 text-[13px] leading-tight font-medium" style={{ color: on ? "var(--text-primary)" : "var(--text-secondary)", transition: "color 400ms" }}>
                  {m.name}
                </span>
              </div>
            );
          })}
        </div>
        {/* return loop */}
        <div className="relative mt-5 h-10">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden>
            <path d={`M ${1000 - 1000 / 14} 0 V 26 H ${1000 / 14} V 4`} fill="none" stroke="var(--gold-accent)" strokeOpacity="0.55" strokeWidth="1.2" vectorEffect="non-scaling-stroke" className="dm-flow" />
          </svg>
          <span className="absolute -translate-x-1/2 text-[10px] leading-none" style={{ left: `${100 / 14}%`, top: -2, color: C.gold }}>
            ▲
          </span>
          <span className="absolute left-1/2 top-[26px] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--bg-base)] px-3 text-[12.5px] text-[var(--text-secondary)]">
            Every outcome is reviewed against its thesis.
          </span>
        </div>
      </div>

      {/* pipeline, mobile */}
      <ol className="mt-8 grid gap-2 md:hidden">
        {ENGINE.map((m, i) => {
          const on = i === step;
          return (
            <li key={m.name}>
              <button
                onClick={() => pick(i)}
                aria-pressed={on}
                className="flex w-full items-center gap-3 rounded-[10px] border px-4 py-3 text-left"
                style={{ borderColor: on ? m.color : "var(--panel-line)", background: on ? `color-mix(in srgb, ${m.color} 10%, transparent)` : "transparent", transition: "all 400ms" }}
              >
                <span className="h-3 w-3 rotate-45" style={{ background: on || i < step ? m.color : "transparent", border: `1.5px solid ${m.color}` }} />
                <span className="text-[15px] font-medium">{m.name}</span>
                {i === LAST && <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: C.gold }}>A person decides</span>}
              </button>
            </li>
          );
        })}
        <li className="pt-2 text-[13px] text-[var(--text-secondary)]">↺ Every outcome is reviewed against its thesis.</li>
      </ol>

      {/* detail + feed */}
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div key={step} className="dm-fade-up rounded-[12px] border p-6" style={{ borderColor: `color-mix(in srgb, ${cur.color} 45%, transparent)`, background: `color-mix(in srgb, ${cur.color} 6%, transparent)` }}>
          <p className="dm-tag" style={{ color: cur.color }}>
            Step {step + 1} of {ENGINE.length}
            {step === LAST ? " · A person decides" : ""}
          </p>
          <p className="serif mt-2 text-[30px] leading-tight">{cur.name}</p>
          <p className="mt-2 text-[16px] text-[var(--text-primary)]">{cur.line}</p>
          <p className="mt-5 text-[13px] text-[var(--text-secondary)]">Tap any module to pause and inspect it.</p>
        </div>
        <div className="rounded-[12px] border border-[var(--panel-line)] bg-black/20 p-6" aria-live="polite">
          <div className="flex items-center justify-between">
            <p className="dm-tag">Activity feed</p>
            <span className="text-[11px] text-[var(--text-secondary)]">Illustrative activity</span>
          </div>
          <ul className="mt-4 grid gap-3">
            {feed.map((idx, k) => {
              const m = ENGINE[idx % ENGINE.length];
              return (
                <li key={idx} className={`flex items-start gap-3 text-[14px] ${k === 0 ? "dm-slide-in" : ""}`} style={{ opacity: 1 - k * 0.17, transition: "opacity 500ms" }}>
                  <span className="serif w-11 shrink-0 text-[15px] text-[var(--text-secondary)]">{clock(idx)}</span>
                  <span className="mt-[7px] h-2 w-2 shrink-0 rotate-45" style={{ background: m.color }} />
                  <span className="text-[var(--text-primary)]">{ENGINE_FEED[idx % ENGINE.length]}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Engine() {
  return (
    <Chapter id="engine" wide>
      <EngineVisual />
    </Chapter>
  );
}

/* ================================================================
   05 · Our edge — the research universe on a globe, narrowed by
   the four-point playbook to a handful of ideas worth owning
================================================================ */

const GR = 200; // globe radius
const GC = 240; // globe centre
const N_DOTS = 216;
// How far each company gets through the playbook (0 = universe only, 4 = passes all four).
// Illustrative: about a dozen survive, in line with a portfolio of typically 11–14 holdings.
const level = (k: number) => (k < 12 ? 4 : k < 30 ? 3 : k < 70 ? 2 : k < 120 ? 1 : 0);

type GDot = { x: number; y: number; z: number; lv: number };

const GLOBE_DOTS: GDot[] = (() => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280), seed / 233280);
  const out: GDot[] = [];
  for (let k = 0; k < N_DOTS; k++) {
    // Uniform on the visible hemisphere, kept off the very rim so dots stay readable.
    const lon = (rnd() - 0.5) * Math.PI * 0.86;
    const lat = Math.asin((rnd() * 2 - 1) * 0.86);
    const z = Math.cos(lat) * Math.cos(lon);
    out.push({
      x: Math.round(GC + GR * Math.cos(lat) * Math.sin(lon)),
      y: Math.round(GC - GR * Math.sin(lat)),
      z,
      lv: level(k),
    });
  }
  return out;
})();

const PARALLELS = [-60, -30, 0, 30, 60].map((d) => (d * Math.PI) / 180);
const MERIDIANS = [-60, -30, 0, 30, 60].map((d) => (d * Math.PI) / 180);

function Globe({ stage, onAdvance, auto }: { stage: number; onAdvance: () => void; auto: boolean }) {
  const seen = useSeen();
  useTicker(seen && auto, 2400, onAdvance);
  const final = stage === PLAYBOOK.length;
  const cur = stage > 0 ? PLAYBOOK[stage - 1] : null;
  const col = cur ? cur.color : C.bl;

  return (
    <div className="dm-panel p-5 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="dm-tag">{GLOBE_LABEL}</p>
        <Pill color={col}>{stage === 0 ? "Universe" : `${stage} / ${PLAYBOOK.length}`}</Pill>
      </div>
      <svg
        viewBox="20 20 440 440"
        className="mx-auto mt-3 w-full max-w-[460px]"
        role="img"
        aria-label={stage === 0 ? GLOBE_LABEL : `${GLOBE_LABEL}, narrowed by: ${PLAYBOOK.slice(0, stage).map((p) => p.t).join(", ")}`}
      >
        <defs>
          <radialGradient id="dm-globe-fill" cx="42%" cy="38%" r="70%">
            <stop offset="0%" stopColor={C.bl} stopOpacity="0.10" />
            <stop offset="100%" stopColor={C.bl} stopOpacity="0.01" />
          </radialGradient>
        </defs>
        <circle cx={GC} cy={GC} r={GR} fill="url(#dm-globe-fill)" stroke="var(--line)" strokeWidth="1.2" />
        <g fill="none" stroke="var(--line-soft)" strokeWidth="1">
          {PARALLELS.map((p) => {
            const y = GC - GR * Math.sin(p);
            const half = GR * Math.cos(p);
            return <line key={`p${p}`} x1={GC - half} x2={GC + half} y1={y} y2={y} />;
          })}
          {MERIDIANS.map((m) => (
            <ellipse key={`m${m}`} cx={GC} cy={GC} rx={Math.abs(GR * Math.sin(m)) || 0.5} ry={GR} />
          ))}
        </g>
        {GLOBE_DOTS.map((p, i) => {
          const on = p.lv >= stage;
          const depth = 0.45 + 0.55 * p.z;
          const delay = `${(i % 24) * 18}ms`;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3.2 + 0.8 * p.z}
              style={{
                fill: on ? (final ? "var(--gold-accent)" : col) : "var(--text-secondary)",
                opacity: on ? (final ? 1 : 0.85 * depth) : 0.08,
                transformBox: "fill-box",
                transformOrigin: "center",
                transform: `scale(${on ? (final ? 1.9 : 1) : 0.65})`,
                transition: `fill 700ms var(--ease) ${delay}, opacity 700ms var(--ease) ${delay}, transform 700ms var(--ease) ${delay}`,
              }}
            />
          );
        })}
        {final &&
          GLOBE_DOTS.filter((p) => p.lv >= stage).map((p, i) => (
            <circle key={`r${i}`} cx={p.x} cy={p.y} r="6" fill="none" stroke="var(--gold-accent)" className="dm-ping" style={{ animationDelay: `${i * 160}ms` }} />
          ))}
      </svg>
      <div key={stage} className="dm-fade-up mt-2 border-t border-[var(--hairline)] pt-4">
        {cur ? (
          <>
            <p className="text-[15px] font-semibold" style={{ color: final ? C.gold : col }}>
              {cur.t}
            </p>
            <p className="mt-1 text-[15px] text-[var(--text-secondary)]">{cur.b}</p>
          </>
        ) : (
          <p className="text-[15px] text-[var(--text-secondary)]">Each point of the playbook narrows the field.</p>
        )}
      </div>
    </div>
  );
}

export function Edge() {
  const [stage, setStage] = useState(0); // 0 = the whole research universe, 1–4 = playbook points applied
  const [auto, setAuto] = useState(true);
  // useTicker always calls the latest closure, so reading `stage` here is current.
  const advance = () => {
    if (stage >= PLAYBOOK.length) setAuto(false);
    else setStage(stage + 1);
  };

  const list = (
    <ol className="grid gap-2" aria-label="The playbook">
      {PLAYBOOK.map((p, i) => {
        const on = i === stage - 1;
        const passed = i < stage - 1;
        return (
          <li key={p.t}>
            <button
              onClick={() => {
                setAuto(false);
                setStage(i + 1);
              }}
              aria-pressed={on}
              className="flex w-full items-start gap-4 rounded-[10px] border px-4 py-3 text-left"
              style={{
                borderColor: on ? p.color : "transparent",
                background: on ? `color-mix(in srgb, ${p.color} 9%, transparent)` : "transparent",
                transition: "all 450ms var(--ease)",
                cursor: "pointer",
              }}
            >
              <span className="serif w-6 shrink-0 text-[18px]" style={{ color: on || passed ? p.color : "var(--text-secondary)" }}>
                {i + 1}
              </span>
              <span>
                <span className="block text-[15px] font-semibold" style={{ color: on ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  {p.t}
                </span>
                <span className="mt-1 block text-[14px] text-[var(--text-secondary)]">{p.b}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  return (
    <Chapter id="edge" aside={list}>
      <Globe stage={stage} auto={auto} onAdvance={advance} />
    </Chapter>
  );
}
