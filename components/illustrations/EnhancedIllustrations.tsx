"use client";

import { useState, type AnimationEvent, type ReactNode } from "react";
import { BG, C, Eyebrow, FUNNEL_DOTS, GOLD, Label, SUB, TXT, dia, f, polar, v } from "./primitives";
import { hex, rand, useSpawner, useStep, useTween } from "./useLive";

/**
 * Enhanced "masterwork" duplicates — live simulations of the process illustrations.
 *
 * Each variant runs a small deterministic simulation (orders arriving, portfolios resizing,
 * clocks ticking, blocks being sealed) while `live` is true, and falls back to a meaningful
 * final state when motion is off, the figure is off-screen or the user prefers reduced motion.
 *
 * Depth layers (`<Depth d>`) parallax against the pointer; IllustrationItem tilts the whole
 * SVG in 3D on hover, so layers with a larger `d` read as floating closer to the viewer.
 * All tickers, companies and amounts are illustrative.
 */

export const ENHANCED_IDS = new Set([
  "london-portico-enhanced",
  "ratio-drift-enhanced",
  "four-gates-enhanced",
  "eleven-checks-enhanced",
  "opportunity-funnel-enhanced",
  "purification-flow-enhanced",
  "grace-clock-enhanced",
  "hash-chain-enhanced",
  "drawdown-bands-enhanced",
  "sector-cap-enhanced",
  "three-markets-enhanced",
  "high-water-mark-enhanced",
]);

interface Props {
  id: string;
  uid: string;
  live: boolean;
  isMotion: boolean;
  activeDetail: number;
  onSelectDetail?: (idx: number) => void;
}

interface P {
  uid: string;
  live: boolean;
  isMotion: boolean;
  pick: (i: number) => () => void;
}

const fmt = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const CARD_SHADOW = "drop-shadow(0 4px 12px rgba(0,0,0,0.85))";
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Parallax layer: translates with the pointer by `d` units of depth. */
function Depth({ d, lift, children }: { d: number; lift?: boolean; children: ReactNode }) {
  return (
    <g className="ill-depth" data-lift={lift ? "" : undefined} style={v({ "--d": d })}>
      {children}
    </g>
  );
}

/** One-line live event feed. Re-keys on `animKey` so each new event fades in. */
function Ticker({ y, text, live, animKey, size = 9 }: { y: number; text: string; live: boolean; animKey?: string | number; size?: number }) {
  return (
    <text
      key={animKey ?? text}
      x={C}
      y={y}
      textAnchor="middle"
      fontSize={size}
      letterSpacing="0.05em"
      fill={TXT}
      className={`font-mono ${live ? "ill-tick-in" : ""}`}
    >
      {live && (
        <tspan fill={GOLD} className="ill-live-dot">
          ●{" "}
        </tspan>
      )}
      {live && <tspan fill={GOLD}>LIVE · </tspan>}
      {text}
    </text>
  );
}

export default function EnhancedIllustration({ id, uid, live, isMotion, onSelectDetail }: Props) {
  const p: P = { uid, live, isMotion, pick: (i: number) => () => onSelectDetail?.(i) };
  switch (id) {
    case "london-portico-enhanced":
      return <LondonPortico {...p} />;
    case "ratio-drift-enhanced":
      return <RatioDrift {...p} />;
    case "four-gates-enhanced":
      return <FourGates {...p} />;
    case "eleven-checks-enhanced":
      return <ElevenChecks {...p} />;
    case "opportunity-funnel-enhanced":
      return <OpportunityFunnel {...p} />;
    case "purification-flow-enhanced":
      return <Purification {...p} />;
    case "grace-clock-enhanced":
      return <GraceClock {...p} />;
    case "hash-chain-enhanced":
      return <HashChain {...p} />;
    case "drawdown-bands-enhanced":
      return <Drawdown {...p} />;
    case "sector-cap-enhanced":
      return <SectorCap {...p} />;
    case "three-markets-enhanced":
      return <ThreeMarkets {...p} />;
    case "high-water-mark-enhanced":
      return <HighWaterMark {...p} />;
    default:
      return null;
  }
}

// =========================================================================================
// 1. LONDON COLONNADE — an order walks through the four disciplines, column by column
// =========================================================================================
const PORTICO_COLS = [
  { colX: 115, title: "SIGNAL", full: "01 · Quantitative Screening", sub: "Algorithmic ratio surveillance", detailIdx: 0, act: "RATIO SCREEN PASSED" },
  { colX: 195, title: "RESEARCH", full: "02 · Fundamental Moat", sub: "Written bear case & fair value", detailIdx: 1, act: "BEAR CASE SIGNED OFF" },
  { colX: 305, title: "CONTROL", full: "03 · Pre-Trade Controls", sub: "11 invariant gate checks", detailIdx: 2, act: "11 OF 11 CHECKS CLEARED" },
  { colX: 385, title: "EXECUTION", full: "04 · Institutional Custody", sub: "Interactive Brokers & segregated cash", detailIdx: 2, act: "FILLED · CUSTODIAN RECONCILED" },
];

function LondonPortico({ uid, live, isMotion, pick }: P) {
  const n = useStep(live, 1900);
  const active = live ? n % 4 : -1;
  const order = 4821 + Math.floor(n / 4);
  const [hover, setHover] = useState<number | null>(null);
  const card = hover !== null ? PORTICO_COLS[hover] : null;

  return (
    <g>
      <Depth d={-1}>
        <circle cx={C} cy={C} r="226" fill="none" stroke={GOLD} strokeOpacity="0.22" strokeWidth="1" />
        <circle cx={C} cy={C} r="218" fill="none" stroke={GOLD} strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 6" />
        {isMotion && (
          <g className="ill-sweep-arm">
            <path d="M 250 75 L 80 430 L 420 430 Z" fill={`url(#${uid}-glow)`} opacity="0.35" />
            <line x1="250" y1="75" x2="250" y2="440" stroke={GOLD} strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="4 6" />
          </g>
        )}
      </Depth>

      <Depth d={0.5}>
        <rect x="56" y="432" width="388" height="14" fill={BG} stroke={GOLD} strokeWidth="1.4" />
        <rect x="72" y="420" width="356" height="12" fill={BG} stroke={GOLD} strokeWidth="1.2" />
        <rect x="88" y="408" width="324" height="12" fill={BG} stroke={GOLD} strokeWidth="1" />
        <text x={C} y="442" textAnchor="middle" fill={GOLD} fontSize="8.5" letterSpacing="0.26em" className="font-mono" opacity="0.85">
          51.5074° N · 0.1278° W · MAYFAIR HERITAGE · ELEVATION 24M
        </text>
      </Depth>

      <Depth d={1.4} lift>
        {PORTICO_COLS.map(({ colX, title, detailIdx }, i) => {
          const on = i === active;
          return (
            <g
              key={title}
              className="ill-lift cursor-pointer"
              onClick={pick(detailIdx)}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover((h) => (h === i ? null : h))}
            >
              <g style={{ transform: `translateY(${on ? -5 : 0}px)`, transition: `transform 0.6s ${EASE}` }}>
                <rect
                  x={colX - 14}
                  y="180"
                  width="28"
                  height="228"
                  fill="var(--bg-raised)"
                  stroke={GOLD}
                  strokeWidth={hover === i || on ? 1.8 : 1.2}
                />
                <rect
                  x={colX - 14}
                  y="180"
                  width="28"
                  height="228"
                  fill={GOLD}
                  fillOpacity={on ? 0.16 : hover === i ? 0.1 : 0}
                  style={{ transition: "fill-opacity 0.5s" }}
                />
                <line x1={colX - 7} y1="184" x2={colX - 7} y2="404" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" />
                <line x1={colX} y1="184" x2={colX} y2="404" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.2" />
                <line x1={colX + 7} y1="184" x2={colX + 7} y2="404" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" />
                {on && (
                  <line key={n} x1={colX} y1="404" x2={colX} y2="184" stroke={GOLD} strokeWidth="2.4" pathLength={100} className="ill-energy" />
                )}
                <rect x={colX - 18} y="172" width="36" height="8" fill={GOLD} className={on ? "ill-beacon" : undefined} />
                <circle cx={colX - 14} cy="176" r="3.5" fill={BG} stroke={GOLD} strokeWidth="1" />
                <circle cx={colX + 14} cy="176" r="3.5" fill={BG} stroke={GOLD} strokeWidth="1" />
                <rect x={colX - 17} y="404" width="34" height="4" fill={GOLD} />
                <text x={colX} y="384" textAnchor="middle" fill={on ? TXT : GOLD} fontSize="7.5" fontWeight="700" letterSpacing="0.14em" className="font-mono">
                  {title}
                </text>
              </g>
            </g>
          );
        })}

        {/* Entablature, frieze & pediment */}
        <rect x="70" y="160" width="360" height="20" fill={BG} stroke={GOLD} strokeWidth="1.3" />
        <line x1="70" y1="168" x2="430" y2="168" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" />
        <text x={C} y="174" textAnchor="middle" fill={GOLD} fontSize="8" letterSpacing="0.32em" className="font-mono">
          FIDUCIARY RIGOUR · SHARIAH GOVERNANCE · SYSTEMATIC CONVICTION
        </text>
        <polygon points="250,56 60,160 440,160" fill="var(--bg-raised)" stroke={GOLD} strokeWidth="1.6" />
        <polygon points="250,68 76,154 424,154" fill="none" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />

        {/* Live order readout inside the tympanum */}
        <g key={live ? n : "static"} className={live ? "ill-tick-in" : undefined}>
          <Label x={C} y={124} size={8.5} color={GOLD} mono spacing="0.16em">
            {live ? `ORDER #${order} · STAGE 0${active + 1} / 04` : "ONE ORDER · FOUR DISCIPLINES"}
          </Label>
          <Label x={C} y={140} size={9.5} color={TXT} serif>
            {live ? PORTICO_COLS[active].act : "Signal → Research → Control → Execution"}
          </Label>
        </g>

        <circle cx="250" cy="54" r="5" fill={GOLD} className={isMotion ? "ill-beacon" : ""} />
        <circle cx="58" cy="160" r="4" fill={GOLD} />
        <circle cx="442" cy="160" r="4" fill={GOLD} />

        <path d="M 195 330 L 195 220 A 55 55 0 0 1 305 220 L 305 330" fill="none" stroke={GOLD} strokeWidth="1.6" />
        <path d="M 205 330 L 205 224 A 45 45 0 0 1 295 224 L 295 330" fill="none" stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx={C} cy="226" r="44" fill={BG} stroke={GOLD} strokeWidth="1.5" />
      </Depth>

      <Depth d={2.2}>
        {/* Carriage lanterns */}
        <g className={isMotion ? "ill-beacon" : ""}>
          <circle cx="74" cy="404" r="16" fill={`url(#${uid}-glow)`} />
          <rect x="68" y="396" width="12" height="16" rx="2" fill="var(--bg-raised)" stroke={GOLD} strokeWidth="1.2" />
          <circle cx="74" cy="404" r="3.5" fill={GOLD} />
          <circle cx="426" cy="404" r="16" fill={`url(#${uid}-glow)`} />
          <rect x="420" y="396" width="12" height="16" rx="2" fill="var(--bg-raised)" stroke={GOLD} strokeWidth="1.2" />
          <circle cx="426" cy="404" r="3.5" fill={GOLD} />
        </g>

        {/* Order token travelling along the stylobate */}
        {live && (
          <g style={{ transform: `translateX(${PORTICO_COLS[active].colX}px)`, transition: `transform 0.9s ${EASE}` }}>
            <circle cx="0" cy="426" r="9" fill="none" stroke={GOLD} strokeWidth="1" className="ill-ping" />
            <path d={dia(0, 426, 5)} fill={GOLD} />
          </g>
        )}
      </Depth>

      {/* Hover card, drawn last so the pediment never covers it */}
      {card && (
        <Depth d={3}>
          <g key={card.title} className="ill-tick-in pointer-events-none">
            <rect x={card.colX - 70} y="112" width="140" height="50" rx="6" fill={BG} stroke={GOLD} strokeWidth="1.2" filter={CARD_SHADOW} />
            <Label x={card.colX} y={131} size={9.5} color={GOLD} weight={700} serif>
              {card.full}
            </Label>
            <Label x={card.colX} y={148} size={8.5} color={SUB}>
              {card.sub}
            </Label>
          </g>
        </Depth>
      )}
    </g>
  );
}

// =========================================================================================
// 2. RATIO DRIFT — filings arrive quarter by quarter; 3D bars rise, breach, then exit
// =========================================================================================
const DRIFT_BARS = [
  { q: "Q1", p: 24, s: "Compliant", sub: "Buffer +9.33%", debt: "$240M", assets: "$1,000M", status: "PASSED · REBALANCE: HOLD" },
  { q: "Q2", p: 29, s: "Caution Zone", sub: "Buffer +4.33%", debt: "$304M", assets: "$1,050M", status: "ALERT · 30% CAUTION REACHED" },
  { q: "Q3", p: 35.2, s: "Hard Breach", sub: "Flagged 14:02 UTC", debt: "$387M", assets: "$1,100M", status: "BREACH · 90-DAY SALE TRIGGERED" },
  { q: "Q4", p: 0, s: "Fully Exited", sub: "Mandate Rule 4.2", debt: "$0M", assets: "Cash Ballast", status: "RESOLVED · GAIN PURIFIED" },
];
const DRIFT_FEED = [
  "10-Q INGESTED · Q1 · D/A 24.0% · PASS",
  "10-Q INGESTED · Q2 · D/A 29.0% · CAUTION ZONE",
  "10-K INGESTED · Q3 · D/A 35.2% · HARD BREACH",
  "POSITION SOLD · GAIN PURIFIED · ON WATCHLIST",
  "RE-SCREENING CONTINUOUSLY · NEXT FILING QUEUED",
  "RE-SCREENING CONTINUOUSLY · NEXT FILING QUEUED",
];

function RatioDrift({ live, pick }: P) {
  const base = 380;
  const h = (p: number) => p * 7;
  const limitY = base - h(33.33);
  const cautionY = base - h(30);
  const n = useStep(live, 2300);
  const step = live ? n % 6 : 5;
  const shown = Math.min(step + 1, 4);
  const heights = useTween(DRIFT_BARS.map((b, i) => (i < shown ? b.p : 0)), live, 1100);
  const [cur] = useTween([DRIFT_BARS[shown - 1].p], live, 1100);
  const frac = [0, 0.34, 0.67, 1, 1, 1][step];
  const curve = `M 115 ${base - h(24)} C 155 ${base - h(26)} 165 ${base - h(28)} 200 ${base - h(29)} C 240 ${base - h(30)} 250 ${base - h(34)} 285 ${base - h(35.2)} C 325 ${base - h(36)} 345 ${base - 20} 370 ${base}`;
  const breachNow = live && step === 2;

  return (
    <g>
      <Eyebrow y={44}>SHARIAH RATIO AUDIT ENGINE · CONTINUOUS SURVEILLANCE</Eyebrow>
      <Ticker y={64} text={DRIFT_FEED[step]} live={live} animKey={step} />

      <Depth d={-0.6}>
        {/* Back floor of the 3D chart */}
        <line x1="60" y1={base - 8} x2="460" y2={base - 8} stroke={GOLD} strokeOpacity="0.2" strokeWidth="1" />
        <line x1="50" y1={base} x2="60" y2={base - 8} stroke={GOLD} strokeOpacity="0.3" />
        <line x1="50" y1={base} x2="450" y2={base} stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.2" />
        <line x1="50" y1={limitY} x2="450" y2={limitY} stroke={GOLD} strokeWidth="1.4" strokeDasharray="5 4" />
        {breachNow && <line x1="50" y1={limitY} x2="450" y2={limitY} stroke={GOLD} strokeWidth="4" strokeOpacity="0.5" className="ill-blink" />}
        <Label x={50} y={limitY - 8} anchor="start" size={10} color={GOLD} mono>
          HARD LIMIT 33.33% (AAOIFI)
        </Label>
        <line x1="50" y1={cautionY} x2="450" y2={cautionY} stroke={GOLD} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 3" />
        <Label x={50} y={cautionY - 8} anchor="start" size={9.5} color={SUB} mono>
          INTERNAL CAUTION 30.0%
        </Label>
      </Depth>

      {/* Live ratio readout */}
      <Depth d={2}>
        <Label x={450} y={100} anchor="end" size={22} color={breachNow ? TXT : GOLD} serif>
          {`${cur.toFixed(1)}%`}
        </Label>
        <Label x={450} y={112} anchor="end" size={8} color={SUB} mono spacing="0.12em">
          LIVE D/A · NOVA PLC
        </Label>
      </Depth>

      <Depth d={1}>
        {DRIFT_BARS.map((b, i) => {
          const x = 90 + i * 85;
          const hh = h(heights[i]);
          const top = base - hh;
          const breach = b.p > 33.33;
          const caution = b.p >= 28 && !breach;
          const visible = i < shown;
          const cardX = Math.max(50, Math.min(x - 45, 310));
          const cardY = top > 220 ? top - 80 : top + 15;
          return (
            <g key={b.q} className="ill-hover-group ill-lift cursor-pointer" onClick={pick(Math.min(i, 2))}>
              <g opacity={visible ? 1 : 0.2} style={{ transition: "opacity 0.6s" }}>
                {breach && visible && live && (
                  <circle cx={x + 25} cy={top - 4} r="16" fill="none" stroke={GOLD} strokeWidth="1.4" className="ill-ping" />
                )}
                {b.p > 0 ? (
                  <>
                    {/* Side & top faces give each bar a 3D prism */}
                    <polygon
                      points={`${x + 50},${f(top)} ${x + 60},${f(top - 8)} ${x + 60},${base - 8} ${x + 50},${base}`}
                      fill={GOLD}
                      fillOpacity={breach ? 0.3 : 0.12}
                      stroke={GOLD}
                      strokeOpacity="0.45"
                      strokeWidth="1"
                    />
                    <polygon
                      points={`${x},${f(top)} ${x + 10},${f(top - 8)} ${x + 60},${f(top - 8)} ${x + 50},${f(top)}`}
                      fill={GOLD}
                      fillOpacity={breach ? 0.6 : caution ? 0.35 : 0.22}
                      stroke={GOLD}
                      strokeOpacity="0.6"
                      strokeWidth="1"
                    />
                    <rect
                      x={x}
                      y={f(top)}
                      width="50"
                      height={f(hh)}
                      fill={GOLD}
                      fillOpacity={breach ? 0.35 : caution ? 0.18 : 0.08}
                      stroke={GOLD}
                      strokeOpacity={breach ? 1 : 0.6}
                      strokeWidth={breach ? 1.8 : 1.1}
                      className="ill-target"
                    />
                  </>
                ) : (
                  <>
                    <rect x={x} y={base - 65} width="50" height="65" fill="none" stroke={GOLD} strokeOpacity="0.4" strokeDasharray="3 4" className="ill-target" />
                    {visible && (
                      <g key={`exit-${n}`} className={live ? "ill-stamp" : undefined}>
                        <text x={x + 25} y={base - 28} textAnchor="middle" fontSize="11" fontWeight="700" fill={GOLD} letterSpacing="0.12em" transform={`rotate(-14 ${x + 25} ${base - 32})`} className="font-mono">
                          EXITED
                        </text>
                      </g>
                    )}
                  </>
                )}
                <Label x={x + 25} y={b.p > 0 ? top - 14 : base - 76} size={16} color={GOLD} serif>
                  {b.p > 0 ? `${heights[i].toFixed(1)}%` : "0%"}
                </Label>
              </g>
              <Label x={x + 25} y={base + 20} size={12} weight={700}>
                {b.q}
              </Label>
              <Label x={x + 25} y={base + 35} size={9.5} color={breach || caution ? GOLD : SUB}>
                {b.s}
              </Label>
              <Label x={x + 25} y={base + 48} size={8.5} color={SUB} mono>
                {b.sub}
              </Label>

              <g className="ill-card">
                <rect x={cardX} y={cardY} width="140" height="58" rx="6" fill={BG} stroke={GOLD} strokeWidth="1.2" filter={CARD_SHADOW} />
                <Label x={cardX + 70} y={cardY + 16} size={9} color={GOLD} mono>
                  {b.status}
                </Label>
                <Label x={cardX + 70} y={cardY + 32} size={10} weight={600}>
                  Debt: {b.debt} / Assets: {b.assets}
                </Label>
                <Label x={cardX + 70} y={cardY + 48} size={8.5} color={SUB}>
                  Surveillance Latency: 14ms
                </Label>
              </g>
            </g>
          );
        })}
      </Depth>

      {/* Trajectory spline, revealed filing by filing */}
      <Depth d={1.6}>
        <path
          d={curve}
          fill="none"
          stroke={GOLD}
          strokeWidth="1.8"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 * (1 - frac)}
          style={{ transition: `stroke-dashoffset 1.1s ${EASE}` }}
          className="pointer-events-none"
        />
      </Depth>

      <rect x="60" y="440" width="380" height="26" rx="4" fill="none" stroke={GOLD} strokeOpacity="0.25" />
      <Label x={C} y={457} size={9.5} color={GOLD} mono spacing="0.1em">
        SEC EDGAR INGESTION · IMMEDIATE RE-SCREENING · STRICT LIQUIDATION SLA
      </Label>
    </g>
  );
}

// =========================================================================================
// 3. FOUR GATES — a live stream of companies; rejects are knocked out at their gate
// =========================================================================================
const GATE_CANDIDATES = [
  { t: "NOVA", fail: -1, why: "" },
  { t: "BREW", fail: 0, why: "ALCOHOL REVENUE" },
  { t: "KITE", fail: -1, why: "" },
  { t: "LEVR", fail: 1, why: "DEBT 41% > 33.33%" },
  { t: "ALTA", fail: -1, why: "" },
  { t: "CASA", fail: 2, why: "IMPURE INCOME 7.2%" },
  { t: "ORBI", fail: -1, why: "" },
  { t: "FLUX", fail: 3, why: "LATE FILING · QUARANTINED" },
];
const GATES = [
  { x: 105, t: "Business Activity", s: "0% Non-Permissible", sub: "Alcohol, Tobacco, Riba", code: "GATE 01", up: false },
  { x: 195, t: "Financial Ratios", s: "Debt & Cash < 33.33%", sub: "Total Assets denominator", code: "GATE 02", up: true },
  { x: 285, t: "Income Purity", s: "Impure Revenue < 5%", sub: "Direct Tax-Lot Purified", code: "GATE 03", up: false },
  { x: 375, t: "Continuous Review", s: "Automated SEC Scraper", sub: "10-K, 10-Q & RNS Feeds", code: "GATE 04", up: true },
];

function FourGates({ live, isMotion, pick }: P) {
  const m = (cls: string) => (isMotion ? cls : "");
  const tokens = useSpawner(live, 1500, (n) => GATE_CANDIDATES[(n - 1) % GATE_CANDIDATES.length], 6);
  const [tally, setTally] = useState({ ok: 610, no: 1790, last: "", hit: -1, k: 0 });

  const done = (c: (typeof GATE_CANDIDATES)[number]) => (e: AnimationEvent<SVGGElement>) => {
    if (e.target !== e.currentTarget) return;
    setTally((t) =>
      c.fail < 0
        ? { ok: t.ok + 1, no: t.no, last: `${c.t} CLEARED ALL FOUR GATES → ELIGIBLE`, hit: -1, k: t.k + 1 }
        : { ok: t.ok, no: t.no + 1, last: `${c.t} STOPPED AT GATE 0${c.fail + 1} · ${c.why}`, hit: c.fail, k: t.k + 1 },
    );
  };

  return (
    <g>
      <Eyebrow y={72}>THE FOUR SHARIAH FILTRATION GATES · CONTINUOUS PIPELINE</Eyebrow>

      <Depth d={-0.5}>
        <line x1="40" y1={C} x2="460" y2={C} stroke={GOLD} strokeOpacity="0.3" strokeWidth="2" />
        <line x1="40" y1={C} x2="460" y2={C} stroke={GOLD} strokeOpacity="0.8" strokeWidth="1" className={m("ill-laser")} />
      </Depth>

      <Depth d={1}>
        {GATES.map((g, i) => (
          <g key={g.t} className="ill-hover-group cursor-pointer" onClick={pick(Math.min(i, 2))}>
            <line x1={g.x} y1="185" x2={g.x} y2="315" stroke={GOLD} strokeOpacity={0.9} strokeWidth="1.8" className="ill-target" />
            {tally.hit === i && live && (
              <line key={tally.k} x1={g.x} y1="185" x2={g.x} y2="315" stroke={TXT} strokeWidth="3" className="ill-flash" />
            )}
            <circle cx={g.x} cy={C} r="18" fill={BG} stroke={GOLD} strokeWidth="1.2" />
            <circle cx={g.x} cy={C} r="12" fill="none" stroke={GOLD} strokeDasharray="2 3" className={m(i % 2 === 0 ? "ill-spin-local" : "ill-spin-local-rev")} />
            <path d={dia(g.x, 185, 5)} fill={GOLD} />
            <path d={dia(g.x, 315, 5)} fill={GOLD} />
            <Label x={g.x} y={g.up ? 146 : 344} size={11.5} weight={700}>
              {g.t}
            </Label>
            <Label x={g.x} y={g.up ? 160 : 358} size={9.5} color={GOLD}>
              {g.s}
            </Label>
            <Label x={g.x} y={g.up ? 172 : 370} size={8.5} color={SUB}>
              {g.sub}
            </Label>
            <Label x={g.x} y={g.up ? 130 : 386} size={9} color={GOLD} mono spacing="0.14em">
              {g.code}
            </Label>
            <g className="ill-card">
              <rect x={g.x - 70} y={g.up ? 80 : 396} width="140" height="42" rx="5" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
              <Label x={g.x} y={g.up ? 96 : 412} size={9} color={GOLD} mono>
                AAOIFI STANDARD 21
              </Label>
              <Label x={g.x} y={g.up ? 110 : 426} size={9} weight={600}>
                Systematic Pre-Approval Rule
              </Label>
            </g>
          </g>
        ))}

        {/* Quarantine & exclusion bins */}
        <path d="M 195 268 Q 205 340 220 392" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeDasharray="3 4" />
        <path d={dia(220, 398, 6)} fill={BG} stroke={GOLD} strokeWidth="1.3" />
        <Label x={220} y={418} size={10} weight={700} color={GOLD}>
          Uncertain Filings
        </Label>
        <Label x={220} y={430} size={8.5} color={SUB}>
          Quarantined until resolved
        </Label>
        <path d="M 105 232 Q 95 170 80 120" fill="none" stroke={GOLD} strokeOpacity="0.45" strokeDasharray="3 3" />
        <path d={dia(80, 114, 5)} fill="none" stroke={GOLD} />
        <Label x={80} y={100} size={9.5} color={SUB} mono>
          {`Non-Permissible (-${fmt(tally.no)})`}
        </Label>
      </Depth>

      {/* Destination */}
      <Depth d={1.8}>
        <path d={dia(440, C, 11)} fill={GOLD} className={m("ill-beacon")} />
        <Label x={440} y={C - 20} size={11} color={GOLD} weight={700}>
          Eligible
        </Label>
        <Label key={tally.ok} x={440} y={C + 26} size={9.5} color={TXT} mono className={live ? "ill-tick-in" : undefined}>
          {`${fmt(tally.ok)} Assets`}
        </Label>
      </Depth>

      {/* Live candidate stream */}
      <Depth d={2.4}>
        {tokens.map(({ id, item: c }) => {
          const pass = c.fail < 0;
          const gx = pass ? 400 : GATES[c.fail].x - 40;
          const dur = pass ? 6.4 : Math.max(2.6, gx / 62 / 0.68);
          const gy = c.fail % 2 === 0 ? -64 : 64;
          return (
            <g key={id}>
              <g
                className={pass ? "ill-gate-pass" : "ill-gate-reject"}
                style={v({ "--gx": `${gx}px`, "--gy": `${gy}px`, "--dur": `${dur}s` })}
                onAnimationEnd={done(c)}
              >
                <path d={dia(40, C, 6.5)} fill={pass ? GOLD : BG} stroke={GOLD} strokeWidth="1.4" />
                <Label x={40} y={C - 12} size={7.5} mono weight={700}>
                  {c.t}
                </Label>
              </g>
              {!pass && (
                <circle cx={GATES[c.fail].x} cy={C} r="22" fill="none" stroke={TXT} strokeWidth="1.6" className="ill-burst" style={{ animationDelay: `${dur * 0.68}s` }} />
              )}
            </g>
          );
        })}
      </Depth>

      <Ticker y={466} text={tally.last || "SCREENING 2,400 COMPANIES · AAOIFI STANDARD 21"} live={live} animKey={tally.k} />
    </g>
  );
}

// =========================================================================================
// 4. ELEVEN CHECKS — each order is scanned check by check; some are blocked mid-sequence
// =========================================================================================
const CHECKS = [
  { t: "Reconciliation", lat: "1ms", sec: "DATA" },
  { t: "Data Freshness", lat: "4ms", sec: "DATA" },
  { t: "SEC Filing Hash", lat: "2ms", sec: "DATA" },
  { t: "Cash Headroom", lat: "3ms", sec: "LIMIT" },
  { t: "Liquidity & ADV", lat: "7ms", sec: "LIMIT" },
  { t: "Position Cap 10%", lat: "2ms", sec: "LIMIT" },
  { t: "Sector Cap 30%", lat: "2ms", sec: "LIMIT" },
  { t: "Duplicate Shield", lat: "1ms", sec: "RISK" },
  { t: "Risk Policy", lat: "5ms", sec: "RISK" },
  { t: "Tamper Hash Record", lat: "2ms", sec: "RISK" },
  { t: "Market Price Sanity", lat: "6ms", sec: "DATA" },
];
const ORDERS = [
  { o: "BUY 1,200 NOVA @ £84.20", fail: -1, why: "" },
  { o: "BUY 4,000 KITE @ $31.75", fail: 6, why: "Sector cap 30% would be breached" },
  { o: "SELL 800 ALTA @ ¥2,840", fail: -1, why: "" },
  { o: "BUY 9,500 FLUX @ $4.10", fail: 4, why: "Order exceeds 10% of daily volume" },
];
const CHECK_CYCLE = 17;

function ElevenChecks({ uid, live, isMotion }: P) {
  const m = (cls: string) => (isMotion ? cls : "");
  const n = useStep(live, 240);
  const round = Math.floor(n / CHECK_CYCLE);
  const s = live ? n % CHECK_CYCLE : 11;
  const order = ORDERS[live ? round % ORDERS.length : 0];
  const stop = order.fail >= 0 ? order.fail : 11;
  const p = Math.min(s, stop);
  const done = s >= stop;
  const passed = done && order.fail < 0;
  const blocked = done && order.fail >= 0;
  const beamDeg = round * 360 + (p * 360) / 11;

  return (
    <g>
      <Ticker y={22} text={order.o + (passed ? " · ROUTED" : blocked ? " · BLOCKED" : " · CHECKING")} live={live} animKey={`${round}-${done}`} />

      <Depth d={-0.8}>
        <circle cx={C} cy={C} r="175" fill="none" stroke={GOLD} strokeOpacity="0.25" />
        <circle cx={C} cy={C} r="160" fill="none" stroke={GOLD} strokeOpacity="0.12" strokeDasharray="2 6" />
        <circle cx={C} cy={C} r="120" fill={`url(#${uid}-glow)`} className={m("hm-glow")} />
        <g className={m("ill-spin-slow")}>
          <circle cx={C} cy={C} r="145" fill="none" stroke={GOLD} strokeOpacity="0.15" strokeDasharray="30 40" strokeWidth="1" />
        </g>
        <g className={m("ill-spin-rev-slow")}>
          <circle cx={C} cy={C} r="135" fill="none" stroke={GOLD} strokeOpacity="0.12" strokeDasharray="15 35" strokeWidth="1" />
        </g>
      </Depth>

      {/* Laser handshake beam pointing at the check being evaluated */}
      {live && (
        <Depth d={0.6}>
          <g style={{ transform: `rotate(${beamDeg}deg)`, transformOrigin: "250px 250px", transformBox: "view-box", transition: "transform 0.22s ease-out" }}>
            <line x1={C} y1={C - 48} x2={C} y2={C - 152} stroke={blocked ? TXT : GOLD} strokeWidth="1.6" strokeOpacity="0.85" />
            <polygon points={`${C},${C - 48} ${C - 14},${C - 150} ${C + 14},${C - 150}`} fill={GOLD} opacity="0.12" />
          </g>
        </Depth>
      )}

      <Depth d={1.2}>
        {CHECKS.map((c, i) => {
          const a = -90 + (i * 360) / 11;
          const [x, y] = polar(160, a);
          const [lx, ly] = polar(192, a);
          const cos = Math.cos((a * Math.PI) / 180);
          const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
          const ok = i < p;
          const failed = blocked && i === order.fail;
          const scanning = live && !done && i === p;
          const cardX = Math.max(40, Math.min(lx - 50, 340));
          const cardY = ly > 250 ? ly - 45 : ly + 18;
          return (
            <g key={c.t} className="ill-hover-group cursor-pointer">
              <line x1={x} y1={y} x2={C} y2={C} stroke={GOLD} strokeOpacity={ok ? 0.28 : 0.08} strokeWidth="1" style={{ transition: "stroke-opacity 0.3s" }} />
              {scanning && <circle cx={x} cy={y} r="11" fill="none" stroke={GOLD} strokeWidth="1.2" className="ill-ping" />}
              <path
                d={dia(x, y, failed ? 9 : 7)}
                fill={failed ? BG : GOLD}
                fillOpacity={ok || failed ? 1 : scanning ? 0.7 : 0.2}
                stroke={failed ? TXT : GOLD}
                strokeWidth={failed ? 2 : 1}
                className={`ill-target ${failed ? "ill-blink" : ""}`}
                style={{ transition: "fill-opacity 0.25s" }}
              />
              {failed && (
                <Label x={x} y={y + 3.5} size={9} weight={700}>
                  ✕
                </Label>
              )}
              <Label x={lx} y={ly + 4} anchor={anchor} size={10.5} weight={600} color={failed ? GOLD : TXT}>
                {c.t}
              </Label>
              <Label x={lx} y={ly + 16} anchor={anchor} size={8.5} color={ok ? GOLD : SUB} mono>
                {failed ? "FAIL" : ok ? `✓ ${c.lat}` : c.lat}
              </Label>
              <g className="ill-card">
                <rect x={cardX} y={cardY} width="115" height="34" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" />
                <Label x={cardX + 57} y={cardY + 14} size={8.5} color={GOLD} mono>
                  {`SECTOR ${c.sec} · ${failed ? "1 FAIL" : "0 FAIL"}`}
                </Label>
                <Label x={cardX + 57} y={cardY + 26} size={9} weight={600}>
                  Latency: {c.lat}
                </Label>
              </g>
            </g>
          );
        })}
      </Depth>

      <Depth d={2.2} lift>
        <circle cx={C} cy={C} r="48" fill={BG} stroke={blocked ? TXT : GOLD} strokeWidth="1.6" style={{ transition: "stroke 0.3s" }} />
        {done && live && <circle key={round} cx={C} cy={C} r="48" fill="none" stroke={GOLD} strokeWidth="2" className="ill-burst" />}
        <Label x={C} y={244} size={19} color={GOLD} serif>
          {`${p} of 11`}
        </Label>
        <Label x={C} y={260} size={8.5} color={blocked ? TXT : GOLD} mono spacing="0.14em">
          {passed ? "PRE-TRADE PASS" : blocked ? "ORDER BLOCKED" : "CHECKING…"}
        </Label>
        <Label x={C} y={328} size={10} weight={600}>
          {passed ? "CIO ED25519 HARDWARE TOKEN ARMED" : blocked ? `✕ ${order.why}` : `Evaluating ${CHECKS[Math.min(p, 10)].t}`}
        </Label>
        <Label x={C} y={342} size={9} color={SUB}>
          {passed ? "Routed to broker · 28ms end-to-end" : blocked ? "Order never reaches the broker · CIO notified" : "Zero tolerance · all eleven must pass"}
        </Label>
      </Depth>
    </g>
  );
}

// =========================================================================================
// 5. OPPORTUNITY FUNNEL — companies fall inward and drop out ring by ring
// =========================================================================================
const SIEVE_RINGS = [
  { r: 215, n: "2,400", t: "Companies in View", sub: "UK, US and Japan listed", filter: "Global Universe" },
  { r: 170, n: "610", t: "Pass Shariah Screen", sub: "AAOIFI Standard 21 certified", filter: "Permissible Universe" },
  { r: 130, n: "142", t: "Moat & Quality", sub: "ROIC > 15%, Net Debt/EBITDA < 1.5x", filter: "Capital Allocators" },
  { r: 85, n: "48", t: "Margin of Safety", sub: "Discount to Fair Value range", filter: "Valuation Filter" },
];
const SIEVE_NAMES = ["KITE", "ORBI", "LUMA", "VITA", "ALTA", "TERRA", "HAVN", "CORE", "NOVA", "MEDI"];

function OpportunityFunnel({ uid, live, isMotion, pick }: P) {
  const m = (cls: string) => (isMotion ? cls : "");
  const parts = useSpawner(
    live,
    700,
    (n) => {
      const r = rand(n, 1);
      const stopR = r < 0.45 ? 182 : r < 0.72 ? 142 : r < 0.9 ? 98 : 0;
      const a0 = rand(n, 2) * 360;
      return { a0, stopR, name: SIEVE_NAMES[n % SIEVE_NAMES.length] };
    },
    9,
  );
  const [state, setState] = useState({ screened: 1284, list: 6, last: "", k: 0 });

  const arrive = (core: boolean, name: string) => (e: AnimationEvent<SVGGElement>) => {
    if (e.target !== e.currentTarget) return;
    setState((s) => {
      if (!core) return { ...s, screened: s.screened + 1 };
      const list = s.list + 1 > 8 ? 6 : s.list + 1;
      const last = list === 6 ? "SHORTLIST TRIMMED TO 6 · COMMITTEE REVIEW" : `${name} REACHED THE SHORTLIST`;
      return { screened: s.screened + 1, list, last, k: s.k + 1 };
    });
  };

  return (
    <g>
      <Eyebrow y={20}>RESEARCH SIEVE · FROM 2,400 ASSETS TO HIGH CONVICTION</Eyebrow>

      {SIEVE_RINGS.map((g, i) => (
        <Depth key={g.n} d={0.4 + i * 0.6}>
          <g className="ill-hover-group cursor-pointer" onClick={pick(Math.min(i, 2))}>
            <circle cx={C} cy={C} r={g.r} fill={GOLD} fillOpacity={0.012 + i * 0.01} stroke={GOLD} strokeOpacity={0.25 + i * 0.18} strokeWidth={1 + i * 0.25} className="ill-target" />
            <Label x={C} y={C - g.r + 20} size={18} color={GOLD} serif>
              {g.n}
            </Label>
            <Label x={C} y={C - g.r + 34} size={9.5} weight={600}>
              {g.t}
            </Label>
            <g className="ill-card">
              <rect x={C - 95} y={C - g.r + 40} width="190" height="24" rx="5" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
              <Label x={C} y={C - g.r + 56} size={8.5} color={GOLD} mono>
                {`${g.filter}: ${g.sub}`}
              </Label>
            </g>
          </g>
        </Depth>
      ))}

      {isMotion && (
        <Depth d={1}>
          <g className="ill-sweep-arm">
            <line x1={C} y1={C} x2={C} y2="35" stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.2" strokeDasharray="3 4" />
            <polygon points="250,250 210,35 290,35" fill={`url(#${uid}-glow)`} opacity="0.3" />
          </g>
        </Depth>
      )}

      <Depth d={0.3}>
        {FUNNEL_DOTS.map(([x, y], i) => (
          <circle
            key={i}
            cx={f(x)}
            cy={f(y)}
            r={i % 3 === 0 ? "2.5" : "1.8"}
            fill={GOLD}
            opacity="0.5"
            className={m(i % 3 === 0 ? "ill-twinkle-a" : i % 3 === 1 ? "ill-twinkle-b" : "ill-twinkle-c")}
          />
        ))}
      </Depth>

      {/* Companies being pulled through the sieve */}
      <Depth d={2.4}>
        {parts.map(({ id, item }) => {
          const [sx, sy] = polar(226, item.a0);
          const [ex, ey] = item.stopR ? polar(item.stopR, item.a0 + 28) : [C, C];
          const core = item.stopR === 0;
          return (
            <g
              key={id}
              className="ill-orbit-in"
              style={v({ "--sx": `${f(sx)}px`, "--sy": `${f(sy)}px`, "--ex": `${f(ex)}px`, "--ey": `${f(ey)}px`, "--dur": core ? "3.6s" : "2.8s" })}
              onAnimationEnd={arrive(core, item.name)}
            >
              <circle cx="0" cy="0" r={core ? 4 : 3} fill={core ? TXT : GOLD} />
              {core && <circle cx="0" cy="0" r="8" fill="none" stroke={GOLD} strokeWidth="1" />}
            </g>
          );
        })}
      </Depth>

      <Depth d={3} lift>
        <circle cx={C} cy={C} r="46" fill={BG} stroke={GOLD} strokeWidth="1.8" />
        {live && state.k > 0 && <circle key={state.k} cx={C} cy={C} r="46" fill="none" stroke={GOLD} strokeWidth="2" className="ill-burst" />}
        <Label key={state.list} x={C} y={C + 6} size={24} color={GOLD} serif className={live ? "ill-tick-in" : undefined}>
          {state.list}
        </Label>
        <Label x={C} y={C + 20} size={8.5} color={GOLD} mono spacing="0.12em">
          SHORTLIST
        </Label>
      </Depth>

      <Label x={C} y={458} size={10} weight={600}>
        Concentrated Conviction Portfolio: 11 to 14 Final Holdings
      </Label>
      <Ticker y={476} text={`SCREENED ${fmt(state.screened)} · ${state.last || "UK 30% · US 50% · JAPAN 20%"}`} live={live} animKey={state.k} size={8.5} />
    </g>
  );
}

// =========================================================================================
// 6. PURIFICATION — dividends land, split per tax lot, and fill the charity reservoir
// =========================================================================================
const DIVIDENDS = [
  { t: "NOVA", dps: 0.84, sh: 150, imp: 3.2, ex: "14 AUG" },
  { t: "KITE", dps: 1.12, sh: 80, imp: 1.9, ex: "02 SEP" },
  { t: "ORBI", dps: 0.46, sh: 300, imp: 4.1, ex: "19 SEP" },
  { t: "ALTA", dps: 2.05, sh: 40, imp: 2.6, ex: "07 OCT" },
];
const CLEAN_PATH = "M 164 250 C 250 250 280 160 395 160";
const CHARITY_PATH = "M 164 250 C 250 250 280 340 395 340";
const RESERVOIR = 10;

function Purification({ live, isMotion, pick }: P) {
  const m = (cls: string) => (isMotion ? cls : "");
  const n = useStep(live, 3000);
  const k = live ? n : 0;
  const ev = DIVIDENDS[k % DIVIDENDS.length];
  const gross = ev.dps * ev.sh;
  const impure = (gross * ev.imp) / 100;

  let clean = 0;
  let charity = 0;
  for (let i = 0; i <= k; i++) {
    const d = DIVIDENDS[i % DIVIDENDS.length];
    const g = d.dps * d.sh;
    charity += (g * d.imp) / 100;
    clean += g - (g * d.imp) / 100;
  }
  const [tClean, tCharity] = useTween([clean, charity], live, 1200, 900);
  const frac = (tCharity % RESERVOIR) / RESERVOIR;
  const certs = Math.floor(tCharity / RESERVOIR);
  const share = (tClean / (tClean + tCharity)) * 100;

  return (
    <g>
      <Eyebrow y={54}>PURIFICATION BY TAX LOT · ACCURATE TO THE PENNY</Eyebrow>
      <Ticker y={74} text={`DIVIDEND RECEIVED · ${ev.t} · $${gross.toFixed(2)} → $${impure.toFixed(2)} TO CHARITY`} live={live} animKey={k} />

      <Depth d={2}>
        {live && <circle key={k} cx="70" cy={C} r="22" fill="none" stroke={GOLD} strokeWidth="1.6" className="ill-burst" />}
        <path d={dia(70, C, 14)} fill={GOLD} />
        <Label x={70} y={C - 40} size={9} color={GOLD} mono spacing="0.12em">
          {ev.t}
        </Label>
        <Label x={70} y={C - 26} size={12} weight={700}>
          Gross Dividend
        </Label>
        <Label x={70} y={C + 30} size={10} color={GOLD} mono>
          {`$${ev.dps.toFixed(2)} / share`}
        </Label>
      </Depth>

      <Depth d={0.6}>
        <line x1="84" y1={C} x2="160" y2={C} stroke={GOLD} strokeWidth="2.2" />
        <line x1="162" y1="170" x2="162" y2="330" stroke={GOLD} strokeWidth="1.6" strokeDasharray="4 4" />
        <Label x={162} y={156} size={10.5} color={GOLD} mono spacing="0.14em">
          {`EX-DATE ${ev.ex}`}
        </Label>
        <Label x={162} y={346} size={9} color={SUB}>
          Only eligible tax-lots count
        </Label>
        <path d={CLEAN_PATH} fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="6" />
        <path d={CHARITY_PATH} fill="none" stroke={GOLD} strokeWidth="2" className={m("ill-flow")} strokeDasharray={isMotion ? undefined : "6 10"} />
      </Depth>

      {/* Droplets riding the conduits */}
      {live && (
        <Depth d={1.2}>
          {[0, 0.4].map((b) => (
            <circle key={`feed-${b}`} r="3" fill={GOLD}>
              <animateMotion dur="0.8s" begin={`-${b}s`} repeatCount="indefinite" path="M 84 250 L 162 250" />
            </circle>
          ))}
          {[0, 0.8, 1.6].map((b) => (
            <circle key={`clean-${b}`} r="3.6" fill={GOLD} opacity="0.9">
              <animateMotion dur="2.4s" begin={`-${b}s`} repeatCount="indefinite" path={CLEAN_PATH} />
            </circle>
          ))}
          {[0, 1.5].map((b) => (
            <circle key={`char-${b}`} r="2.2" fill={TXT}>
              <animateMotion dur="3s" begin={`-${b}s`} repeatCount="indefinite" path={CHARITY_PATH} />
            </circle>
          ))}
        </Depth>
      )}

      <Depth d={1.8} lift>
        <g className="ill-hover-group cursor-pointer" onClick={pick(0)}>
          <rect x="395" y="132" width="60" height="48" rx="6" fill={BG} stroke={GOLD} strokeWidth="1.4" className="ill-target" />
          <Label x={425} y={150} size={11.5} weight={700}>
            Investor
          </Label>
          <Label x={425} y={163} size={9} color={GOLD} mono>
            {`$${tClean.toFixed(2)}`}
          </Label>
          <Label x={425} y={174} size={7.5} color={SUB} mono>
            {`${share.toFixed(1)}%`}
          </Label>
          <g className="ill-card">
            <rect x="270" y="96" width="185" height="36" rx="5" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
            <Label x={362} y={112} size={8.5} color={GOLD} mono>
              TAX LOT: LOT #01 (100) + #02 (50)
            </Label>
            <Label x={362} y={124} size={9} weight={600}>
              Retained Clean Fiduciary Capital
            </Label>
          </g>
        </g>

        <g className="ill-hover-group cursor-pointer" onClick={pick(2)}>
          <rect x="395" y="318" width="60" height="48" rx="6" fill={BG} stroke={GOLD} strokeWidth="1.4" className="ill-target" />
          {/* Reservoir level */}
          <rect x="398" y={f(363 - 42 * frac)} width="54" height={f(42 * frac)} rx="3" fill={GOLD} fillOpacity="0.22" />
          <line x1="398" x2="452" y1={f(363 - 42 * frac)} y2={f(363 - 42 * frac)} stroke={GOLD} strokeOpacity="0.7" />
          <circle cx="425" cy="342" r="16" fill="none" stroke={GOLD} strokeWidth="1" className={m("ill-ping")} />
          <Label x={425} y={338} size={11.5} weight={700}>
            Charity
          </Label>
          <Label x={425} y={352} size={10} color={GOLD} mono>
            {`$${tCharity.toFixed(2)}`}
          </Label>
          <g className="ill-card">
            <rect x="270" y="372" width="185" height="36" rx="5" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
            <Label x={362} y={388} size={8.5} color={GOLD} mono>
              VERIFIED CHARITABLE DISBURSEMENTS
            </Label>
            <Label x={362} y={400} size={9} weight={600}>
              Never counted as return · Non-deductible
            </Label>
          </g>
        </g>
        <Label x={455} y={381} anchor="end" size={7.5} color={SUB} mono>
          {`RESERVOIR ${Math.round(frac * 100)}% · ${certs} DISBURSED`}
        </Label>
      </Depth>

      <Depth d={0.8}>
        <rect x="60" y="394" width="380" height="48" rx="8" fill={BG} stroke={GOLD} strokeOpacity="0.4" />
        <g key={k} className={live ? "ill-tick-in" : undefined}>
          <Label x={C} y={414} size={12} color={GOLD} mono>
            {`${ev.sh} shares × $${ev.dps.toFixed(2)} × ${ev.imp}% impure = $${impure.toFixed(2)}`}
          </Label>
          <Label x={C} y={432} size={9} color={SUB}>
            {`${ev.t} · lots bought after ${ev.ex} are exempt ($0.00)`}
          </Label>
        </g>
      </Depth>

      <Label x={C} y={466} size={9.5} color={GOLD} mono spacing="0.1em">
        ANNUAL PURIFICATION CERTIFICATE ISSUED TO INVESTORS
      </Label>
    </g>
  );
}

// =========================================================================================
// 7. GRACE CLOCK — the 90-day breach clock actually counts, liquidating the position
// =========================================================================================
const GRACE_MARKS = [
  { d: 0, t: "Day 0", s: "Breach Flagged", alert: "Buy orders locked, price locked" },
  { d: 30, t: "Day 30", s: "Notice 01", alert: "PM liquidity & execution plan" },
  { d: 45, t: "Day 45", s: "Midpoint", alert: "CIO staged exit approval" },
  { d: 60, t: "Day 60", s: "Notice 02", alert: "Formal Shariah compliance notice" },
  { d: 80, t: "Day 80", s: "Final Window", alert: "10-day mandatory liquidation" },
  { d: 90, t: "Day 90", s: "Fully Sold", alert: "Position exited, post-breach gain purified" },
];
const GRACE_CYCLE = 108;

function GraceClock({ uid, live, isMotion, pick }: P) {
  const m = (cls: string) => (isMotion ? cls : "");
  const R = 150;
  const ang = (d: number) => -90 + d * (330 / 90);
  const [sx, sy] = polar(R, ang(0));
  const [ex, ey] = polar(R, ang(90));
  const arc = `M ${f(sx)} ${f(sy)} A ${R} ${R} 0 1 1 ${f(ex)} ${f(ey)}`;

  const n = useStep(live, 120);
  const loop = Math.floor(n / GRACE_CYCLE);
  const day = live ? Math.min(n % GRACE_CYCLE, 90) : 90;
  const latest = [...GRACE_MARKS].reverse().find((k) => day >= k.d) ?? GRACE_MARKS[0];
  const remaining = day <= 30 ? 100 : Math.max(0, 100 - ((day - 30) / 60) * 100);
  const status = day >= 90 ? "Fully sold · gain purified" : day >= 30 ? "Staged exit in progress" : "Buys locked · plan in preparation";

  return (
    <g>
      <Ticker y={26} text={`DAY ${latest.d} · ${latest.alert.toUpperCase()}`} live={live} animKey={`${loop}-${latest.d}`} />
      <Eyebrow y={46}>90-DAY BREACH CHRONOMETER · AUTOMATED LIQUIDATION</Eyebrow>

      <Depth d={-0.6}>
        <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={m("hm-glow")} />
        {[...Array(91)].map((_, d) => {
          const [x1, y1] = polar(R - 12, ang(d));
          const [x2, y2] = polar(R - (d % 15 === 0 ? 24 : 17), ang(d));
          return (
            <line
              key={d}
              x1={f(x1)}
              y1={f(y1)}
              x2={f(x2)}
              y2={f(y2)}
              stroke={GOLD}
              strokeOpacity={d <= day ? (d % 15 === 0 ? 0.95 : 0.55) : d % 15 === 0 ? 0.5 : 0.15}
              strokeWidth={d % 15 === 0 ? 1.5 : 1}
            />
          );
        })}
      </Depth>

      <Depth d={0.8}>
        <path d={arc} fill="none" stroke={GOLD} strokeOpacity="0.2" strokeWidth="6" />
        <path
          d={arc}
          fill="none"
          stroke={GOLD}
          strokeWidth="3.2"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - (day / 90) * 100}
          style={{ transition: live ? "stroke-dashoffset 0.12s linear" : undefined }}
        />
      </Depth>

      {/* Needle pointing at the current day */}
      <Depth d={1.6}>
        <g style={{ transform: `rotate(${day * (330 / 90)}deg)`, transformOrigin: "250px 250px", transformBox: "view-box", transition: live ? "transform 0.12s linear" : undefined }}>
          <line x1={C} y1={C - 46} x2={C} y2={C - R + 6} stroke={GOLD} strokeWidth="1.6" />
          <circle cx={C} cy={C - R} r="5" fill={TXT} />
          <circle cx={C} cy={C - R} r="10" fill="none" stroke={GOLD} strokeWidth="1" className={m("ill-ping")} />
        </g>
      </Depth>

      <Depth d={1.4}>
        {GRACE_MARKS.map((k, i) => {
          const [x, y] = polar(R, ang(k.d));
          const [lx, ly] = polar(R + 28, ang(k.d));
          const cos = Math.cos((ang(k.d) * Math.PI) / 180);
          const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
          const reached = day >= k.d;
          const cardX = Math.max(40, Math.min(lx - 65, 330));
          const cardY = ly > 250 ? ly - 45 : ly + 18;
          return (
            <g key={k.d} className="ill-hover-group cursor-pointer" onClick={pick(Math.min(Math.floor(i / 2), 2))}>
              {live && reached && day - k.d < 6 && <circle key={`${loop}-${k.d}`} cx={x} cy={y} r="14" fill="none" stroke={GOLD} strokeWidth="1.6" className="ill-burst" />}
              <path d={dia(x, y, 7)} fill={reached ? GOLD : BG} stroke={GOLD} strokeWidth="1.5" style={{ transition: "fill 0.3s" }} className="ill-target" />
              <Label x={lx} y={ly + 2} anchor={anchor} size={10.5} weight={700} color={reached ? TXT : SUB}>
                {k.t}
              </Label>
              <Label x={lx} y={ly + 14} anchor={anchor} size={8.5} color={GOLD}>
                {k.s}
              </Label>
              <g className="ill-card">
                <rect x={cardX} y={cardY} width="135" height="32" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
                <Label x={cardX + 67} y={cardY + 14} size={8.5} color={GOLD} mono>
                  SLA ACTION
                </Label>
                <Label x={cardX + 67} y={cardY + 25} size={8.5} weight={600}>
                  {k.alert}
                </Label>
              </g>
            </g>
          );
        })}
      </Depth>

      <Depth d={2.4} lift>
        <circle cx={C} cy={C} r="46" fill={BG} stroke={GOLD} strokeWidth="1.5" />
        <Label x={C} y={248} size={22} color={GOLD} serif>
          {`Day ${day}`}
        </Label>
        <Label x={C} y={264} size={8} color={GOLD} mono spacing="0.14em">
          OF 90 · MANDATORY EXIT
        </Label>
        <rect x="178" y="303" width="144" height="46" rx="6" fill={BG} fillOpacity="0.88" />
        <Label x={C} y={316} size={8.5} color={GOLD} mono spacing="0.08em">
          {`POSITION REMAINING ${Math.round(remaining)}%`}
        </Label>
        <rect x="190" y="322" width="120" height="5" rx="2" fill={GOLD} fillOpacity="0.15" />
        <rect x="190" y="322" width={f(1.2 * remaining)} height="5" rx="2" fill={GOLD} />
        <Label x={C} y={342} size={9} color={SUB}>
          {status}
        </Label>
      </Depth>
    </g>
  );
}

// =========================================================================================
// 8. HASH CHAIN — new blocks are sealed and appended; a periodic tamper test breaks links
// =========================================================================================
const BLOCK_TYPES = [
  { t: "Trigger", payload: "SEC Ingestion 09:14:02 UTC" },
  { t: "Checks", payload: "11/11 Pre-Trade Invariant" },
  { t: "CIO Decides", payload: "Ed25519 Passkey Signature" },
  { t: "Execution", payload: "FIX 4.4 Broker Fill LSE" },
  { t: "Result", payload: "Custodian Reconciled IBKR" },
];

function HashChain({ live, isMotion, pick }: P) {
  const m = (cls: string) => (isMotion ? cls : "");
  const n = useStep(live, 2600);
  const base = live ? n : 0;
  const tampered = live && n % 4 === 3;
  const tamperSeq = base + 2;
  const seqs = Array.from({ length: 7 }, (_, i) => base - 1 + i);
  const digest = (s: number) => `${hex(s, 4)}…${hex(s + 977, 4)}`;

  return (
    <g>
      <Eyebrow y={104}>CRYPTOGRAPHIC TAMPER-EVIDENT RECORD · MERKLE AUDIT TRAIL</Eyebrow>
      <Ticker
        y={124}
        text={tampered ? `TAMPER TEST · BLOCK #${10480 + tamperSeq} EDITED · CHAIN REJECTS IT` : `BLOCK #${10480 + base + 4} SEALED · ED25519 SIGNED · 2ms`}
        live={live}
        animKey={n}
      />
      <Label x={C} y={142} size={8} color={SUB} mono spacing="0.1em">
        {`MERKLE ROOT ${hex(base * 7 + 1, 6)}…${hex(base * 7 + 2, 4)}`}
      </Label>

      {/* Links between slots */}
      <Depth d={0.6}>
        {[0, 1, 2, 3].map((i) => {
          const x1 = 70 + i * 90 + 26;
          const broken = tampered && i >= 2;
          return (
            <g key={i}>
              <line x1={x1} y1={C} x2={x1 + 38} y2={C} stroke={GOLD} strokeOpacity={broken ? 0.25 : 0.4} strokeWidth="1.4" strokeDasharray={broken ? "2 4" : undefined} />
              {!broken && <line x1={x1} y1={C} x2={x1 + 38} y2={C} stroke={GOLD} strokeWidth="1.4" className={m("ill-laser")} />}
              {broken ? (
                <Label x={x1 + 19} y={C + 4} size={11} weight={700} className="ill-blink">
                  ✕
                </Label>
              ) : (
                <path d={`M ${x1 + 32} ${C - 4} L ${x1 + 38} ${C} L ${x1 + 32} ${C + 4}`} fill="none" stroke={GOLD} strokeOpacity="0.9" />
              )}
            </g>
          );
        })}
      </Depth>

      {/* Blocks slide left as new ones are sealed */}
      <Depth d={1.6} lift>
        {seqs.map((seq) => {
          const slot = seq - base;
          const visible = slot >= 0 && slot <= 4;
          const type = BLOCK_TYPES[((seq % 5) + 5) % 5];
          const isTampered = tampered && seq === tamperSeq;
          const isNew = live && slot === 4;
          const blockX = 70 + slot * 90;
          const cardX = Math.max(20, Math.min(blockX - 65, 350)) - blockX;
          return (
            <g
              key={seq}
              style={{
                transform: `translateX(${blockX}px)`,
                opacity: visible ? 1 : 0,
                transition: `transform 0.9s ${EASE}, opacity 0.6s`,
              }}
            >
              <g className="ill-hover-group cursor-pointer" onClick={pick(Math.min(Math.max(slot, 0), 2))}>
                {isNew && <path key={`new-${seq}`} d={dia(0, C, 34)} fill="none" stroke={GOLD} strokeWidth="1.4" className="ill-burst" />}
                <path d={dia(0, C, 28)} fill={BG} stroke={isTampered ? TXT : GOLD} strokeWidth={isTampered ? 2 : 1.4} className={`ill-target ${isTampered ? "ill-blink" : ""}`} />
                <path d={dia(0, C, 10)} fill={GOLD} fillOpacity={isTampered ? 0.15 : 1} className={isTampered ? undefined : m("ill-seq")} style={v({ "--dur": "5s", animationDelay: `${(slot + 5) * 0.6}s` })} />
                <Label x={0} y={C - 58} size={8.5} color={GOLD} mono spacing="0.1em">
                  {`#${10480 + seq}`}
                </Label>
                <Label x={0} y={C - 42} size={11} weight={700}>
                  {type.t}
                </Label>
                <Label x={0} y={C + 46} size={8.5} color={isTampered ? TXT : GOLD} mono>
                  {isTampered ? `${hex(seq + 500, 4)}…????` : digest(seq)}
                </Label>
                <Label x={0} y={C + 58} size={7} color={SUB} mono>
                  {`prev ${hex(seq - 1, 4)}`}
                </Label>
                <g className="ill-card">
                  <rect x={cardX} y={C + 66} width="130" height="40" rx="5" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
                  <Label x={cardX + 65} y={C + 82} size={8.5} color={GOLD} mono>
                    SHA-256 DIGEST
                  </Label>
                  <Label x={cardX + 65} y={C + 96} size={8.5} weight={600}>
                    {type.payload}
                  </Label>
                </g>
              </g>
            </g>
          );
        })}
      </Depth>

      <Depth d={0.4}>
        <rect x="70" y="375" width="360" height="42" rx="6" fill={BG} stroke={tampered ? TXT : GOLD} strokeOpacity={tampered ? 0.8 : 0.3} style={{ transition: "stroke-opacity 0.3s" }} />
        <Label x={C} y={394} size={11} weight={600}>
          Each record carries the cryptographic hash of the record before.
        </Label>
        <Label x={C} y={408} size={9} color={GOLD} mono>
          {tampered ? "INTEGRITY CHECK FAILED → EDIT DETECTED, RECORD RESTORED" : "CHANGE ANY HISTORICAL RECORD → CHAIN INTEGRITY BREAKS INSTANTLY"}
        </Label>
      </Depth>
    </g>
  );
}

// =========================================================================================
// 9. DRAWDOWN BANDS — a live drawdown ring expands through the escalation bands
// =========================================================================================
const DD_BANDS = [
  { r: 200, t: "Severe", draw: "15%+", a: "Full Mandate & Committee Review", prot: "Full Review · Ballast Deployed" },
  { r: 160, t: "Material", draw: "10% to 15%", a: "PM · CIO · Investment Committee", prot: "Committee Emergency Session" },
  { r: 122, t: "Elevated", draw: "5% to 10%", a: "PM & CIO Alerted", prot: "Rebalancing & Sizing Review" },
  { r: 84, t: "Normal", draw: "0% to 5%", a: "Standard Oversight", prot: "Normal Operating Protocol" },
];
const DD_PATH = [1.2, 2.6, 3.9, 5.6, 7.1, 8.4, 6.9, 9.8, 11.6, 13.4, 15.8, 12.2, 9.1, 6.4, 4.2, 2.3];
const DD_BLIPS: [number, number][] = [
  [64, -20], [100, 35], [150, 80], [110, 140], [70, 200], [140, 235], [180, 290], [95, 320], [130, 170], [58, 110],
];
const ddRadius = (dd: number) => {
  const seg = [44, 84, 122, 160, 200];
  const i = Math.min(3, Math.floor(dd / 5));
  return seg[i] + ((Math.min(dd, 20) - i * 5) / 5) * (seg[i + 1] - seg[i]);
};

function Drawdown({ uid, live, isMotion, pick }: P) {
  const n = useStep(live, 1500);
  const target = live ? DD_PATH[n % DD_PATH.length] : 7.1;
  const [dd] = useTween([target], live, 1300);
  const bandIdx = target >= 15 ? 0 : target >= 10 ? 1 : target >= 5 ? 2 : 3;
  const band = DD_BANDS[bandIdx];
  const r = ddRadius(dd);
  const [mx, my] = polar(r, -38);

  return (
    <g>
      <Eyebrow y={20}>DYNAMIC RADAR DEFENSE GRID · DRAWDOWN ESCALATION</Eyebrow>
      <Ticker y={38} text={`${band.t.toUpperCase()} BAND · ${band.prot.toUpperCase()}`} live={live} animKey={bandIdx} />

      {DD_BANDS.map((b, i) => (
        <Depth key={b.t} d={0.3 + i * 0.5}>
          <g className="ill-hover-group cursor-pointer" onClick={pick(Math.min(i, 2))}>
            <circle
              cx={C}
              cy={C}
              r={b.r}
              fill={GOLD}
              fillOpacity={0.025 + i * 0.015 + (i === bandIdx ? 0.09 : 0)}
              stroke={GOLD}
              strokeOpacity={i === bandIdx ? 1 : 0.25 + i * 0.15}
              strokeWidth={i === bandIdx ? 1.8 : 1.2}
              style={{ transition: "fill-opacity 0.6s, stroke-opacity 0.6s" }}
              className="ill-target"
            />
            <Label x={C} y={C - b.r + 18} size={10} color={i === bandIdx ? TXT : GOLD} mono spacing="0.16em">
              {`${b.t.toUpperCase()} (${b.draw})`}
            </Label>
            <Label x={C} y={C + b.r - 12} size={8.5} color={SUB}>
              {b.a}
            </Label>
            <g className="ill-card">
              <rect x={C - 85} y={C - b.r + 24} width="170" height="24" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
              <Label x={C} y={C - b.r + 40} size={8.5} color={GOLD} mono>
                {b.prot}
              </Label>
            </g>
          </g>
        </Depth>
      ))}

      {isMotion && (
        <Depth d={1.4}>
          <g className="ill-radar-sweep">
            <line x1={C} y1={C} x2={C} y2="50" stroke={GOLD} strokeWidth="1.5" />
            <polygon points="250,250 205,50 295,50" fill={`url(#${uid}-glow)`} opacity="0.35" />
          </g>
          {/* Holdings that light up as the sweep passes */}
          {DD_BLIPS.map(([rr, deg], i) => {
            const [x, y] = polar(rr, deg);
            return (
              <circle key={i} cx={f(x)} cy={f(y)} r="2.6" fill={GOLD} className="ill-blip" style={{ animationDelay: `${((((deg + 90) % 360) + 360) % 360 / 360) * 8}s` }} />
            );
          })}
        </Depth>
      )}

      {/* Live drawdown front */}
      <Depth d={2.2}>
        {live && <circle key={bandIdx} cx={C} cy={C} r={DD_BANDS[bandIdx].r} fill="none" stroke={TXT} strokeWidth="1.6" className="ill-burst" />}
        <g className={isMotion ? "ill-spin-slow" : undefined}>
          <circle cx={C} cy={C} r={f(r)} fill="none" stroke={TXT} strokeOpacity="0.9" strokeWidth="1.6" strokeDasharray="5 5" />
        </g>
        <path d={dia(mx, my, 5)} fill={TXT} />
        <Label x={mx + 9} y={my - 6} anchor="start" size={9.5} color={TXT} mono weight={700}>
          {`−${dd.toFixed(1)}%`}
        </Label>
      </Depth>

      <Depth d={3} lift>
        <circle cx={C} cy={C} r="38" fill={BG} stroke={GOLD} strokeWidth="1.5" />
        <Label x={C} y={C + 4} size={17} color={GOLD} serif>
          {`−${dd.toFixed(1)}%`}
        </Label>
        <Label x={C} y={C + 18} size={7.5} color={GOLD} mono spacing="0.14em">
          {band.t.toUpperCase()}
        </Label>
      </Depth>

      <rect x="60" y="446" width="380" height="34" rx="6" fill={BG} stroke={GOLD} strokeOpacity="0.4" />
      <Label x={C} y={462} size={9.5} color={GOLD} mono spacing="0.12em">
        CASH &amp; PHYSICAL GOLD BALLAST BUFFER · -38% DRAWDOWN ABSORPTION
      </Label>
      <Label x={C} y={474} size={8.5} color={SUB}>
        No automatic selling at market troughs · Limits never loosen in volatility
      </Label>
    </g>
  );
}

// =========================================================================================
// 10. SECTOR CAP — live orders arrive; the cap blocks one, others fill and the book resizes
// =========================================================================================
const HOLDINGS = [
  { t: "ALTA", s: "IND" },
  { t: "KITE", s: "IND" },
  { t: "FORGE", s: "IND" },
  { t: "RAIL", s: "IND" },
  { t: "NOVA", s: "TECH" },
  { t: "CORE", s: "TECH" },
  { t: "LUMA", s: "TECH" },
  { t: "VITA", s: "HLTH" },
  { t: "MEDI", s: "HLTH" },
  { t: "ORBI", s: "CONS" },
  { t: "HAVN", s: "CONS" },
  { t: "TERRA", s: "MAT" },
  { t: "CASH", s: "CASH" },
];
const W0 = [10, 8, 7, 5, 9, 7, 6, 8, 6, 7, 6, 7, 14];
const W1 = [10, 8, 7, 5, 13, 7, 6, 8, 6, 7, 6, 7, 10];
const W2 = [7, 8, 7, 5, 13, 7, 6, 8, 6, 7, 6, 7, 13];
const W3 = [7, 8, 9.5, 5, 13, 7, 6, 8, 6, 7, 6, 7, 10.5];
const SECTOR_PHASES = [
  { kind: "blocked", tile: 2, amt: 3, w: W0, msg: "NEW BUY · FORGE +3.0% · INDUSTRIALS → 33.0%", res: "✕ BLOCKED PRE-TRADE · 33.0% > 30.0% SECTOR CAP" },
  { kind: "fill", tile: 4, amt: 4, w: W1, msg: "NEW BUY · NOVA +4.0% · TECHNOLOGY", res: "✓ FILLED · FUNDED FROM CASH BALLAST" },
  { kind: "trim", tile: 0, amt: 3, w: W2, msg: "REBALANCE · TRIM ALTA −3.0% · FREE HEADROOM", res: "✓ INDUSTRIALS 27.0% · HEADROOM 3.0%" },
  { kind: "fill", tile: 2, amt: 2.5, w: W3, msg: "NEW BUY · FORGE +2.5% · INDUSTRIALS → 29.5%", res: "✓ FILLED · INSIDE THE 30% CAP" },
  { kind: "reset", tile: -1, amt: 0, w: W0, msg: "QUARTERLY REBALANCE · RESIZING TO TARGET WEIGHTS", res: "✓ PORTFOLIO RESIZED · ALL LIMITS GREEN" },
] as const;
const SECTORS = ["IND", "TECH", "HLTH", "CONS", "MAT", "CASH"];

function SectorCap({ live, pick }: P) {
  const X = (p: number) => 50 + p * 4;
  const n = useStep(live, 3600);
  const phase = live ? n % SECTOR_PHASES.length : 0;
  const ph = SECTOR_PHASES[phase];
  const w = useTween([...ph.w], live, 900, 1700);

  const xs: number[] = [];
  let cum = 0;
  w.forEach((wt) => {
    xs.push(cum);
    cum += wt;
  });
  const sector = (s: string) => HOLDINGS.reduce((a, h, i) => (h.s === s ? a + w[i] : a), 0);
  const ind = sector("IND");
  const cash = w[12];
  const top5 = [...w.slice(0, 12)].sort((a, b) => b - a).slice(0, 5).reduce((a, b) => a + b, 0);

  // Incoming order geometry (lane above the strip, drops into place)
  const blockW = Math.max(10, ph.amt * 4);
  const targetX = ph.kind === "blocked" ? X(30) - blockW - 2 : ph.tile >= 0 ? X(xs[ph.tile]) : 0;
  const gauges = [
    { t: "Largest sector (Industrials)", val: ind, cap: 30, scale: 40, floor: false, status: ind >= 29.95 ? "AT HARD CAP (30.0%)" : `HEADROOM +${(30 - ind).toFixed(1)}%` },
    { t: "Largest five holdings", val: top5, cap: 50, scale: 60, floor: false, status: `COMPLIANT · HEADROOM +${(50 - top5).toFixed(1)}%` },
    { t: "Cash ballast (floor 5%)", val: cash, cap: 5, scale: 20, floor: true, status: `ABOVE FLOOR · +${(cash - 5).toFixed(1)}%` },
  ];
  const GW = 180;

  return (
    <g>
      <Eyebrow y={56}>PORTFOLIO RISK CONSOLE · HARD SECTOR BARRIER</Eyebrow>
      <Ticker y={76} text={live ? ph.msg : "INDUSTRIALS AT 30.0% · NEXT ORDER WILL BE CHECKED"} live={live} animKey={n} />

      {/* Incoming order */}
      <Depth d={2.6}>
        {live && ph.kind !== "reset" && ph.kind !== "trim" && (
          <g
            key={n}
            className={ph.kind === "blocked" ? "ill-order-blocked" : "ill-order-fill"}
            style={v({ "--x0": "462px", "--x1": `${f(targetX)}px` })}
          >
            <rect x="0" y="102" width={blockW} height="16" fill={GOLD} fillOpacity="0.55" stroke={TXT} strokeWidth="1.2" strokeDasharray={ph.kind === "blocked" ? "2 2" : undefined} />
            <Label x={blockW / 2} y={97} size={7.5} mono weight={700}>
              {`+${ph.amt}% ${HOLDINGS[ph.tile].t}`}
            </Label>
          </g>
        )}
        {live && ph.kind === "trim" && (
          <g key={n} className="ill-order-trim" style={v({ "--x1": `${f(X(xs[0]) + 4)}px` })}>
            <rect x="0" y="166" width="12" height="56" fill={GOLD} fillOpacity="0.5" stroke={TXT} strokeDasharray="2 2" />
            <Label x={6} y={160} size={7.5} mono weight={700}>
              −3% ALTA
            </Label>
          </g>
        )}
        {!live && (
          <g>
            <rect x={X(30) - 14} y="128" width="12" height="16" fill={GOLD} fillOpacity="0.55" stroke={TXT} strokeDasharray="2 2" className="ill-blink" />
            <Label x={X(30) - 8} y={122} size={7.5} mono weight={700}>
              +3% FORGE
            </Label>
          </g>
        )}
      </Depth>

      <Depth d={1}>
        {/* Sector cap envelope over Industrials */}
        <path d={`M ${X(0)} 158 L ${X(0)} 150 L ${f(X(ind))} 150`} fill="none" stroke={GOLD} strokeWidth="1.8" />
        <path d={`M ${f(X(ind))} 150 L ${X(30)} 150`} fill="none" stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="2 3" />
        <line x1={X(30)} x2={X(30)} y1="140" y2="164" stroke={TXT} strokeWidth="2.2" />
        {live && ph.kind === "blocked" && (
          <g key={n}>
            <line x1={X(0)} x2={X(30)} y1="150" y2="150" stroke={TXT} strokeWidth="3.5" className="ill-flash-late" />
            <circle cx={X(30)} cy="150" r="12" fill="none" stroke={TXT} strokeWidth="1.6" className="ill-burst" style={{ animationDelay: "1.4s" }} />
          </g>
        )}
        <Label x={X(30) + 5} y={146} anchor="start" size={8.5} color={GOLD} mono weight={700}>
          CAP 30%
        </Label>
        <Label x={X(0)} y={140} anchor="start" size={10.5} weight={700}>
          {`Industrials ${ind.toFixed(1)}%`}
        </Label>
        <Label x={450} y={140} anchor="end" size={8.5} color={SUB} mono>
          {`CASH BALLAST ${cash.toFixed(1)}%`}
        </Label>

        {/* Holding tiles — widths resize live */}
        {HOLDINGS.map((hd, i) => {
          const x = X(xs[i]);
          const wd = Math.max(0, w[i] * 4 - 2);
          const isCash = hd.s === "CASH";
          const isInd = hd.s === "IND";
          const touched = live && i === ph.tile && ph.kind !== "blocked";
          return (
            <g key={hd.t} className="ill-hover-group cursor-pointer">
              <rect
                x={f(x)}
                y="166"
                width={f(wd)}
                height="56"
                fill={GOLD}
                fillOpacity={isCash ? 0.03 : isInd ? (i % 2 === 0 ? 0.42 : 0.3) : i % 2 === 0 ? 0.12 : 0.07}
                stroke={touched ? TXT : GOLD}
                strokeOpacity={touched ? 1 : isInd ? 0.85 : 0.4}
                strokeWidth={touched ? 1.8 : 1}
                strokeDasharray={isCash ? "3 3" : undefined}
                className="ill-target"
              />
              {wd >= 16 && (
                <Label x={x + wd / 2} y={194} size={6.5} mono weight={700} color={isInd ? TXT : GOLD}>
                  {hd.t}
                </Label>
              )}
              {wd >= 18 && (
                <Label x={x + wd / 2} y={206} size={6.5} mono color={SUB}>
                  {w[i].toFixed(1)}
                </Label>
              )}
              <g className="ill-card">
                <rect x={Math.max(50, Math.min(x - 40, 340))} y="226" width="110" height="22" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
                <Label x={Math.max(50, Math.min(x - 40, 340)) + 55} y={241} size={8} color={GOLD} mono>
                  {`${hd.t} · ${hd.s} · ${w[i].toFixed(1)}%`}
                </Label>
              </g>
            </g>
          );
        })}
      </Depth>

      <Depth d={0.6}>
        <Label x={C} y={240} size={8} color={SUB} mono spacing="0.04em">
          {SECTORS.map((s) => `${s} ${sector(s).toFixed(1)}`).join(" · ")}
        </Label>
        <g key={n} className={live ? "ill-fade-late" : undefined}>
          <Label x={C} y={258} size={9.5} color={GOLD} mono weight={700}>
            {live ? ph.res : "✕ +3.0% PROPOSED ORDER BLOCKED · 33.0% > 30.0%"}
          </Label>
        </g>

        {gauges.map((g, i) => {
          const y = 298 + i * 38;
          const at = g.floor ? g.val <= g.cap : g.val >= g.cap - 0.05;
          return (
            <g key={g.t} className="ill-hover-group cursor-pointer" onClick={pick(i)}>
              <Label x={50} y={y + 4} anchor="start" size={10.5} weight={600}>
                {g.t}
              </Label>
              <rect x="220" y={y - 4} width={GW} height="7" fill={GOLD} fillOpacity="0.12" rx="2" />
              <rect x="220" y={y - 4} width={f((Math.min(g.val, g.scale) / g.scale) * GW)} height="7" fill={GOLD} fillOpacity={at ? 1 : 0.6} rx="2" className="ill-target" />
              <line x1={f(220 + (g.cap / g.scale) * GW)} x2={f(220 + (g.cap / g.scale) * GW)} y1={y - 9} y2={y + 9} stroke={TXT} strokeWidth="1.4" />
              <Label x={450} y={y + 4} anchor="end" size={11} color={at ? TXT : GOLD} mono>
                {`${g.val.toFixed(1)}%`}
              </Label>
              <g className="ill-card">
                <rect x="220" y={y - 32} width="180" height="22" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" />
                <Label x={310} y={y - 17} size={8.5} color={GOLD} mono>
                  {g.status}
                </Label>
              </g>
            </g>
          );
        })}
      </Depth>

      <Label x={C} y={436} size={9.5} color={SUB} mono>
        RISK LIMITS ENFORCED PRE-EXECUTION · CANNOT BE OVERRIDDEN
      </Label>
    </g>
  );
}

// =========================================================================================
// 11. THREE MARKETS — a live UTC clock; sessions open and close, data streams to the hub
// =========================================================================================
const SESSIONS = [
  { t: "UK · London", code: "LDN", hours: "08:00–16:30 UTC", h1: 8, h2: 16.5, r: 155, lr: 178, d: 1.6, detail: "FTSE 100/250 & Mid-Cap Shariah" },
  { t: "US · New York", code: "NY", hours: "14:30–21:00 UTC", h1: 14.5, h2: 21, r: 130, lr: 152, lh: 19.6, d: 2.4, detail: "Deep Global Liquidity & Mega-Cap Tech" },
  { t: "Japan · Tokyo", code: "TYO", hours: "00:00–06:00 UTC", h1: 0, h2: 6, r: 105, lr: 126, d: 3.2, detail: "Undiscovered Cash-Rich Leaders" },
];
const MARKET_EVENTS = [
  { h: 0, e: "TOKYO OPEN · TDNET FILINGS STREAMING" },
  { h: 6, e: "TOKYO CLOSE · JAPAN BOOK RECONCILED" },
  { h: 8, e: "LONDON OPEN · RNS FEED LIVE" },
  { h: 14.5, e: "NEW YORK OPEN · PEAK OVERLAP BEGINS" },
  { h: 16.5, e: "LONDON CLOSE · OVERLAP WINDOW ENDS" },
  { h: 21, e: "NEW YORK CLOSE · OVERNIGHT RE-SCREEN" },
];

function ThreeMarkets({ live, isMotion, pick }: P) {
  const m = (cls: string) => (isMotion ? cls : "");
  const ang = (h: number) => h * 15 - 90;
  const arcPath = (h1: number, h2: number, r: number) => {
    const [x1, y1] = polar(r, ang(h1));
    const [x2, y2] = polar(r, ang(h2));
    return `M ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${h2 - h1 > 12 ? 1 : 0} 1 ${f(x2)} ${f(y2)}`;
  };

  const n = useStep(live, 120);
  const abs = live ? 7 + n * 0.1 : 15.5;
  const h = abs % 24;
  const isOpen = (s: (typeof SESSIONS)[number]) => h >= s.h1 && h < s.h2;
  const overlap = h >= 14.5 && h < 16.5;
  const hh = String(Math.floor(h)).padStart(2, "0");
  const mm = String(Math.floor((h % 1) * 60)).padStart(2, "0");
  const event = [...MARKET_EVENTS].reverse().find((e) => h >= e.h) ?? MARKET_EVENTS[MARKET_EVENTS.length - 1];

  return (
    <g>
      <Eyebrow y={16}>THREE MARKETS, ONE CLOCK · 24-HOUR GLOBAL TELEMETRY</Eyebrow>

      <Depth d={0.4}>
        <circle cx={C} cy={C} r="195" fill="none" stroke={GOLD} strokeOpacity="0.35" />
        <circle cx={C} cy={C} r="200" fill={GOLD} fillOpacity="0.02" stroke="none" />
        {[...Array(24)].map((_, hr) => {
          const [x1, y1] = polar(195, ang(hr));
          const [x2, y2] = polar(hr % 6 === 0 ? 180 : 187, ang(hr));
          return <line key={hr} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} stroke={GOLD} strokeOpacity={hr % 6 === 0 ? 0.85 : 0.35} strokeWidth={hr % 6 === 0 ? 1.4 : 1} />;
        })}
        {[0, 6, 12, 18].map((hr) => {
          const [x, y] = polar(212, ang(hr));
          return (
            <Label key={hr} x={x} y={y + 4} anchor={hr === 6 ? "start" : hr === 18 ? "end" : "middle"} size={10} color={GOLD} mono>
              {`${String(hr).padStart(2, "0")}:00`}
            </Label>
          );
        })}
      </Depth>

      {/* London / New York overlap halo — blazes only while both are open */}
      <Depth d={2}>
        <path
          d={arcPath(14.5, 16.5, 142)}
          fill="none"
          stroke={GOLD}
          strokeOpacity={overlap ? 0.75 : 0.14}
          strokeWidth="18"
          strokeLinecap="round"
          className={overlap ? m("ill-shimmer-alpha") : undefined}
          style={{ transition: "stroke-opacity 0.6s" }}
        />
        {overlap && live && <path d={arcPath(14.5, 16.5, 142)} fill="none" stroke={TXT} strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 4" className="ill-laser" />}
      </Depth>

      {SESSIONS.map((s, i) => {
        const open = isOpen(s);
        const mid = "lh" in s ? (s.lh as number) : (s.h1 + s.h2) / 2;
        const [lx, ly] = polar(s.lr + 8, ang(mid));
        const [px, py] = polar(s.r, ang((s.h1 + s.h2) / 2));
        const cos = Math.cos((ang(mid) * Math.PI) / 180);
        const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
        const cardX = Math.max(40, Math.min(lx - 75, 330));
        const cardY = ly > 250 ? ly - 45 : ly + 20;
        return (
          <Depth key={s.t} d={s.d} lift>
            <g className="ill-hover-group cursor-pointer" onClick={pick(i)}>
              <path d={arcPath(s.h1, s.h2, s.r)} fill="none" stroke={GOLD} strokeOpacity={open ? 0.4 : 0.15} strokeWidth="10" strokeLinecap="round" style={{ transition: "stroke-opacity 0.5s" }} />
              <path
                d={arcPath(s.h1, s.h2, s.r)}
                fill="none"
                stroke={open ? TXT : GOLD}
                strokeOpacity={open ? 1 : 0.55}
                strokeWidth={open ? 2.6 : 1.6}
                strokeLinecap="round"
                className="ill-target"
                style={{ transition: "stroke-opacity 0.5s, stroke-width 0.5s" }}
              />
              {/* Data packets flowing to the hub while the market is open */}
              {open &&
                live &&
                [0, 0.55, 1.1].map((dl) => (
                  <circle key={dl} cx={f(px)} cy={f(py)} r="2.6" fill={GOLD} className="ill-ingest" style={v({ "--tx": `${f(C - px)}px`, "--ty": `${f(C - py)}px`, animationDelay: `${dl}s` })} />
                ))}
              <Label x={lx} y={ly + 2} anchor={anchor} size={11} weight={700} color={open ? TXT : SUB}>
                {s.t}
              </Label>
              <Label x={lx} y={ly + 14} anchor={anchor} size={8.5} color={GOLD} mono>
                {open ? `● OPEN · ${s.hours}` : s.hours}
              </Label>
              <g className="ill-card">
                <rect x={cardX} y={cardY} width="150" height="32" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
                <Label x={cardX + 75} y={cardY + 14} size={8.5} color={GOLD} mono>
                  MARKET FOCUS
                </Label>
                <Label x={cardX + 75} y={cardY + 25} size={8.5} weight={600}>
                  {s.detail}
                </Label>
              </g>
            </g>
          </Depth>
        );
      })}

      {/* Live UTC hand with sun beacon */}
      <Depth d={3.6}>
        <g style={{ transform: `rotate(${abs * 15}deg)`, transformOrigin: "250px 250px", transformBox: "view-box", transition: live ? "transform 0.12s linear" : undefined }}>
          <line x1={C} y1={C - 46} x2={C} y2="68" stroke={GOLD} strokeOpacity="0.9" strokeWidth="1.4" />
          <circle cx={C} cy="68" r="5.5" fill={GOLD} />
          <circle cx={C} cy="68" r="11" fill="none" stroke={GOLD} strokeWidth="1" className={m("ill-ping")} />
        </g>
      </Depth>

      <Depth d={4.2} lift>
        <circle cx={C} cy={C} r="46" fill={BG} stroke={GOLD} strokeOpacity="0.8" />
        <Label x={C} y={244} size={17} color={GOLD} serif>
          {`${hh}:${mm}`}
        </Label>
        <Label x={C} y={256} size={7.5} color={SUB} mono spacing="0.14em">
          UTC
        </Label>
        <text x={C} y={270} textAnchor="middle" fontSize="7.5" className="font-mono" letterSpacing="0.06em">
          {SESSIONS.map((s) => (
            <tspan key={s.code} fill={isOpen(s) ? GOLD : SUB} fillOpacity={isOpen(s) ? 1 : 0.6}>
              {`${s.code}${isOpen(s) ? "●" : "○"} `}
            </tspan>
          ))}
        </text>
      </Depth>

      <Ticker y={490} text={overlap ? "PEAK DUAL LIQUIDITY · LONDON + NEW YORK OVERLAP" : event.e} live={live} animKey={overlap ? "overlap" : event.e} size={8.5} />
    </g>
  );
}

// =========================================================================================
// 12. HIGH-WATER MARK — NAV is replayed year by year; fees accrue only above the hurdle
// =========================================================================================
const HWM_XS = [70, 140, 210, 280, 350, 420];
const HWM_YS = [345, 246, 311, 264, 170, 148];
const HWM_YEARS = [
  { y: "Start", nav: 100, fee: 0, status: "Inception", newHigh: false },
  { y: "Year 1", nav: 125, fee: 8.0, status: "Alpha Surplus (+25%)", newHigh: true },
  { y: "Year 2", nav: 106, fee: 0, status: "Drawdown (-15%)", newHigh: false },
  { y: "Year 3", nav: 117, fee: 0, status: "Recovery (Below HWM)", newHigh: false },
  { y: "Year 4", nav: 138, fee: 2.7, status: "Breakout (+30%)", newHigh: true },
  { y: "Year 5", nav: 152, fee: 2.84, status: "Compounded Alpha", newHigh: true },
];

function HighWaterMark({ live }: P) {
  const n = useStep(live, 1700);
  const k = live ? Math.min(n % 8, 5) : 5;
  const loop = Math.floor(n / 8);
  const [px, py, nav] = useTween([HWM_XS[k], HWM_YS[k], HWM_YEARS[k].nav], live, 1400);
  const mgr = HWM_YEARS.slice(0, k + 1).reduce((a, y) => a + y.fee, 0);
  const inv = HWM_YEARS[k].nav - 100 - mgr;
  const yr = HWM_YEARS[k];
  const line = HWM_XS.map((x, i) => `${x},${HWM_YS[i]}`).join(" ");
  const seg = (on: boolean) => ({ opacity: on ? 1 : 0.12, transition: "opacity 0.8s" });
  const totalBar = 150;
  const invW = Math.max(0, (inv / 52) * totalBar);
  const mgrW = Math.max(0, (mgr / 52) * totalBar);

  return (
    <g>
      <Eyebrow y={54}>MUDARABAH ALIGNMENT · HIGH-WATER MARK &amp; 5% HURDLE</Eyebrow>
      <Ticker y={74} text={`${yr.y.toUpperCase()} · NAV ${yr.nav.toFixed(1)} · ${yr.status.toUpperCase()} · ${yr.fee > 0 ? `FEE ${yr.fee.toFixed(2)}` : "NO FEE"}`} live={live} animKey={`${loop}-${k}`} size={8.5} />

      {/* Live alignment ledger */}
      <Depth d={2}>
        <Label x={70} y={102} anchor="start" size={8.5} color={GOLD} mono>
          {`INVESTOR NET GAIN +${inv.toFixed(1)}`}
        </Label>
        <Label x={70} y={114} anchor="start" size={8.5} color={SUB} mono>
          {`MANAGER SHARE ${mgr.toFixed(2)} PTS`}
        </Label>
        <rect x="70" y="120" width={totalBar} height="5" rx="2" fill={GOLD} fillOpacity="0.12" />
        <rect x="70" y="120" width={f(invW)} height="5" rx="2" fill={GOLD} style={{ transition: "width 1.2s" }} />
        <rect x={f(70 + invW)} y="120" width={f(mgrW)} height="5" rx="2" fill={TXT} fillOpacity="0.7" />
      </Depth>

      <Depth d={-0.4}>
        <line x1="60" y1="360" x2="440" y2="360" stroke={GOLD} strokeOpacity="0.4" />
      </Depth>

      <Depth d={0.8}>
        <g style={seg(true)}>
          <path d="M 70 345 L 140 345" stroke={TXT} strokeOpacity="0.65" strokeDasharray="5 4" strokeWidth="1.2" fill="none" />
          <path d="M 70 290 L 140 290" stroke={GOLD} strokeOpacity="0.85" strokeDasharray="2 4" strokeWidth="1.6" fill="none" />
        </g>
        <g style={seg(k >= 1)}>
          <path d="M 140 246 L 350 246" stroke={TXT} strokeOpacity="0.65" strokeDasharray="5 4" strokeWidth="1.2" fill="none" />
          <path d="M 140 214 L 350 214" stroke={GOLD} strokeOpacity="0.85" strokeDasharray="2 4" strokeWidth="1.6" fill="none" />
          <polygon points="109,290 140,246 140,290" fill={GOLD} fillOpacity="0.45" className={live ? "ill-shimmer-alpha" : undefined} />
          <Label x={146} y={239} anchor="start" size={9.5} opacity={0.85}>
            High-Water Mark (Peak NAV)
          </Label>
          <Label x={170} y={207} anchor="start" size={9.5} color={GOLD} weight={600}>
            Best + 5% Preferred Hurdle
          </Label>
        </g>
        <g style={seg(k >= 4)}>
          <path d="M 350 170 L 430 170" stroke={TXT} strokeOpacity="0.65" strokeDasharray="5 4" strokeWidth="1.2" fill="none" />
          <path d="M 350 133 L 430 133" stroke={GOLD} strokeOpacity="0.85" strokeDasharray="2 4" strokeWidth="1.6" fill="none" />
          <polygon points="317,214 350,170 350,214" fill={GOLD} fillOpacity="0.45" className={live ? "ill-shimmer-alpha" : undefined} />
        </g>
      </Depth>

      <Depth d={1.4}>
        <polyline
          points={line}
          fill="none"
          stroke={GOLD}
          strokeWidth="2.4"
          strokeLinejoin="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 * (1 - k / 5)}
          style={{ transition: `stroke-dashoffset 1.4s ${EASE}` }}
        />
        {HWM_XS.map((x, i) => {
          const y = HWM_YEARS[i];
          const reached = i <= k;
          const cardX = Math.max(30, Math.min(x - 65, 340));
          const cardY = HWM_YS[i] > 240 ? HWM_YS[i] - 50 : HWM_YS[i] + 16;
          return (
            <g key={x} className="ill-hover-group cursor-pointer">
              {live && i === k && y.newHigh && <circle key={`${loop}-${i}`} cx={x} cy={HWM_YS[i]} r="14" fill="none" stroke={TXT} strokeWidth="1.6" className="ill-burst" style={{ animationDelay: "1.2s" }} />}
              <circle cx={x} cy={HWM_YS[i]} r="4.5" fill={reached ? GOLD : BG} stroke={GOLD} strokeWidth="1.6" strokeOpacity={reached ? 1 : 0.35} style={{ transition: "fill 0.4s" }} className="ill-target" />
              <Label x={x} y={378} size={10} weight={600} color={reached ? TXT : SUB}>
                {y.y}
              </Label>
              <Label x={x} y={392} size={8.5} color={GOLD} mono opacity={reached ? 1 : 0.4}>
                {y.nav.toFixed(1)}
              </Label>
              <g className="ill-card">
                <rect x={cardX} y={cardY} width="135" height="36" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
                <Label x={cardX + 67} y={cardY + 14} size={8.5} color={GOLD} mono>
                  {`NAV: ${y.nav.toFixed(1)} · ${y.status}`}
                </Label>
                <Label x={cardX + 67} y={cardY + 26} size={9} weight={600}>
                  {`Fee: ${y.fee > 0 ? `${y.fee.toFixed(2)} pts (40% over hurdle)` : "£0 Performance Fee"}`}
                </Label>
              </g>
            </g>
          );
        })}
      </Depth>

      {/* NAV cursor */}
      <Depth d={2.6}>
        <line x1={f(px)} y1={f(py) + 8} x2={f(px)} y2="360" stroke={GOLD} strokeOpacity="0.4" strokeDasharray="2 3" />
        <circle cx={f(px)} cy={f(py)} r="9" fill="none" stroke={GOLD} strokeWidth="1" className={live ? "ill-ping" : undefined} />
        <circle cx={f(px)} cy={f(py)} r="4" fill={TXT} />
        <rect x={f(px) - 30} y={f(py) - 30} width="60" height="16" rx="3" fill={BG} stroke={GOLD} strokeWidth="1" />
        <Label x={px} y={py - 19} size={8.5} color={GOLD} mono weight={700}>
          {`NAV ${nav.toFixed(1)}`}
        </Label>
      </Depth>

      <rect x="70" y="416" width="360" height="42" rx="6" fill={BG} stroke={GOLD} strokeOpacity="0.35" />
      <Label x={C} y={434} size={10.5} color={GOLD} mono>
        PROFIT SHARE = 40% × MAX(0, NAV - [HWM × 1.05])
      </Label>
      <Label x={C} y={448} size={9} color={SUB}>
        Loss years: £0 · Recovery years: £0 · Below hurdle: every pound is yours
      </Label>
    </g>
  );
}
