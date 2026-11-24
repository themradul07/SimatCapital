"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Process & Proof illustrations — fifteen diagrams of how Simat Capital actually works.
 *
 * Unlike the metaphor set (sextant, portico, tree…), every drawing here carries real labels,
 * thresholds and sequences taken from the developer brief and the investor demo:
 * the four Shariah screens, the eleven pre-trade checks, the 90-day grace period, purification
 * per tax lot, the tamper-evident record and so on. Figures marked illustrative in the demos are
 * labelled illustrative here too.
 *
 * Rendered inside IllustrationItem's 500×500 SVG. Gold line work only, no stock icons.
 */

const C = 250;
const GOLD = "var(--gold-accent)";
const TXT = "var(--text-primary)";
const SUB = "var(--text-secondary)";
const BG = "var(--bg-base)";

/**
 * Where the Simat mark sits for each process illustration.
 * `null` hides it (the diagram has no natural centre); otherwise an [dx, dy] offset from centre.
 */
export const PROCESS_MARK: Record<string, [number, number] | null> = {
  "ratio-drift": null,
  "four-gates": null,
  "eleven-checks": [0, 0],
  "opportunity-funnel": [0, 0],
  "four-rulebooks": [0, 0],
  "purification-flow": null,
  "grace-clock": [0, 0],
  "one-order-seal": [110, 80],
  "hash-chain": null,
  "fair-value-range": [0, -120],
  "committee-five": [0, 110],
  "drawdown-bands": [0, 0],
  "sector-cap": null,
  "three-markets": [0, 0],
  "high-water-mark": null,
};

export const PROCESS_IDS = Object.keys(PROCESS_MARK);

/** Deterministic scatter of "companies in view" for the funnel's outer band. */
const FUNNEL_DOTS: [number, number][] = (() => {
  const out: [number, number][] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let k = 0; k < 46; k++) {
    const a = (rnd() * 360 * Math.PI) / 180;
    const r = 172 + rnd() * 36;
    const x = C + r * Math.cos(a);
    const y = C + r * Math.sin(a);
    if (y > 95) out.push([x, y]);
  }
  return out;
})();

type Vars = CSSProperties & Record<`--${string}`, string>;
const v = (o: Record<string, string>) => o as Vars;

const dia = (x: number, y: number, r: number) => `M ${x} ${y - r} L ${x + r} ${y} L ${x} ${y + r} L ${x - r} ${y} Z`;
const polar = (r: number, deg: number, cx = C, cy = C): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
const f = (n: number) => Math.round(n * 10) / 10;

function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 12,
  color = TXT,
  mono = false,
  serif = false,
  weight,
  spacing,
  opacity,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  color?: string;
  mono?: boolean;
  serif?: boolean;
  weight?: number;
  spacing?: string;
  opacity?: number;
}) {
  return (
    <text
      x={f(x)}
      y={f(y)}
      textAnchor={anchor}
      fill={color}
      fontSize={size}
      fontWeight={weight}
      letterSpacing={spacing}
      opacity={opacity}
      className={mono ? "font-mono" : serif ? "serif" : undefined}
    >
      {children}
    </text>
  );
}

const Eyebrow = ({ y, children }: { y: number; children: ReactNode }) => (
  <Label x={C} y={y} size={10} color={GOLD} mono spacing="0.2em" opacity={0.85}>
    {children}
  </Label>
);

interface Props {
  id: string;
  uid: string;
  isMotion: boolean;
  activeDetail: number;
  onSelectDetail?: (idx: number) => void;
}

export default function ProcessIllustration({ id, uid, isMotion, activeDetail, onSelectDetail }: Props) {
  const m = (cls: string) => (isMotion ? cls : "");
  const pick = (i: number) => () => onSelectDetail?.(i);
  const strong = (i: number) => (activeDetail === i ? 1 : 0.55);

  switch (id) {
    // ---------------------------------------------------------------------------------------
    // 1. RATIO DRIFT — one company across four quarters (brief, demo screen 3)
    // ---------------------------------------------------------------------------------------
    case "ratio-drift": {
      const base = 380;
      const h = (p: number) => p * 7;
      const limitY = base - h(33.33);
      const bars = [
        { q: "Q1", p: 24, s: "Compliant" },
        { q: "Q2", p: 29, s: "Compliant" },
        { q: "Q3", p: 35, s: "Breach" },
        { q: "Q4", p: 0, s: "Exited" },
      ];
      return (
        <g>
          <Eyebrow y={62}>DEBT ÷ TOTAL ASSETS · ILLUSTRATIVE</Eyebrow>
          <line x1="60" y1={base} x2="440" y2={base} stroke={GOLD} strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="60" y1={limitY} x2="440" y2={limitY} stroke={GOLD} strokeWidth="1.2" strokeDasharray="5 5" />
          <Label x={440} y={limitY - 10} anchor="end" size={11} color={GOLD} mono>
            LIMIT 33.33%
          </Label>
          {bars.map((b, i) => {
            const x = 90 + i * 85;
            const top = base - h(b.p);
            const breach = b.p > 33.33;
            return (
              <g key={b.q} className="cursor-pointer" onClick={pick(Math.min(i, 2))}>
                {b.p > 0 ? (
                  <rect
                    x={x}
                    y={top}
                    width="50"
                    height={h(b.p)}
                    fill={GOLD}
                    fillOpacity={breach ? 0.28 : 0.06}
                    stroke={GOLD}
                    strokeOpacity={breach ? 1 : 0.6}
                    strokeWidth={breach ? 1.6 : 1.1}
                    className={m("ill-grow-y")}
                    style={v({ animationDelay: `${i * 0.35}s` })}
                  />
                ) : (
                  <rect x={x} y={base - 60} width="50" height="60" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeDasharray="3 4" />
                )}
                <Label x={x + 25} y={b.p > 0 ? top - 10 : base - 72} size={17} color={GOLD} serif>
                  {b.p > 0 ? `${b.p}%` : "—"}
                </Label>
                <Label x={x + 25} y={base + 22} size={12} weight={600}>
                  {b.q}
                </Label>
                <Label x={x + 25} y={base + 38} size={10.5} color={breach ? GOLD : SUB}>
                  {b.s}
                </Label>
              </g>
            );
          })}
          <Label x={C} y={452} size={11} color={SUB}>
            Re-screened on every filing · exited under the method&apos;s rules
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 2. THE FOUR GATES — the Shariah filter (brief I4)
    // ---------------------------------------------------------------------------------------
    case "four-gates": {
      const gates = [
        { x: 120, t: "Business activity", s: "Excluded sectors out", up: false },
        { x: 200, t: "Financial ratios", s: "3 ratios < 33.33%", up: true },
        { x: 280, t: "Income purity", s: "Impure income < 5%", up: false },
        { x: 360, t: "Continuous review", s: "Every new filing", up: true },
      ];
      return (
        <g>
          <Eyebrow y={92}>FOUR SCREENS BEFORE ANY PROPOSAL</Eyebrow>
          <line x1="50" y1={C} x2="450" y2={C} stroke={GOLD} strokeOpacity="0.45" strokeWidth="1" />
          {gates.map((g, i) => (
            <g key={g.t} className="cursor-pointer" onClick={pick(Math.min(i, 2))}>
              <line x1={g.x} y1="200" x2={g.x} y2="300" stroke={GOLD} strokeOpacity={0.9} strokeWidth="1.5" />
              <path d={dia(g.x, 200, 5)} fill={GOLD} />
              <path d={dia(g.x, 300, 5)} fill={GOLD} />
              <Label x={g.x} y={g.up ? 166 : 328} size={11.5} weight={600}>
                {g.t}
              </Label>
              <Label x={g.x} y={g.up ? 180 : 342} size={10} color={SUB}>
                {g.s}
              </Label>
              <Label x={g.x} y={g.up ? 148 : 360} size={10} color={GOLD} mono>
                {`0${i + 1}`}
              </Label>
            </g>
          ))}
          {/* Uncertain branch off gate 2 */}
          <path d="M 200 258 Q 206 340 226 392" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeDasharray="3 4" />
          <path d={dia(226, 398, 5)} fill="none" stroke={GOLD} />
          <Label x={226} y={424} size={11} weight={600}>
            Uncertain?
          </Label>
          <Label x={226} y={438} size={10} color={SUB}>
            Excluded until resolved
          </Label>
          {/* Eligible */}
          <path d={dia(430, C, 9)} fill={GOLD} />
          <Label x={430} y={C - 18} size={10.5} color={GOLD}>
            Eligible
          </Label>
          <g className={m("ill-travel")} style={v({ "--dx": "360px", "--dy": "0px" })}>
            <path d={dia(60, C, 8)} fill={BG} stroke={GOLD} strokeWidth="1.5" />
          </g>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 3. ELEVEN CHECKS — pre-trade controls (demo, Approve step)
    // ---------------------------------------------------------------------------------------
    case "eleven-checks": {
      const checks = [
        "Reconciliation",
        "Data freshness",
        "Shariah",
        "Cash",
        "Liquidity",
        "Position limit",
        "Concentration",
        "Duplicate",
        "Risk policy",
        "Trade record",
        "Market & price",
      ];
      return (
        <g>
          <circle cx={C} cy={C} r="165" fill="none" stroke={GOLD} strokeOpacity="0.3" />
          <circle cx={C} cy={C} r="150" fill="none" stroke={GOLD} strokeOpacity="0.15" strokeDasharray="1 6" />
          <circle cx={C} cy={C} r="110" fill={`url(#${uid}-glow)`} className={m("hm-glow")} />
          {checks.map((t, i) => {
            const a = -90 + (i * 360) / 11;
            const [x, y] = polar(165, a);
            const [lx, ly] = polar(190, a);
            const c = Math.cos((a * Math.PI) / 180);
            const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
            return (
              <g key={t}>
                <path
                  d={dia(x, y, 7)}
                  fill={GOLD}
                  className={m("ill-seq")}
                  style={v({ "--dur": "6.6s", animationDelay: `${i * 0.5}s` })}
                  opacity={isMotion ? undefined : 0.9}
                />
                <Label x={lx} y={ly + 4} anchor={anchor} size={11}>
                  {t}
                </Label>
              </g>
            );
          })}
          <Label x={C} y={318} size={22} color={GOLD} serif>
            11 of 11
          </Label>
          <Label x={C} y={336} size={10.5} color={SUB}>
            Any failed check stops the order
          </Label>
          <Label x={C} y={196} size={10} color={GOLD} mono spacing="0.16em">
            PRE-TRADE
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 4. OPPORTUNITY FUNNEL — 2,400 → 610 → 48 → 6 (investor demo, "How we find alpha")
    // ---------------------------------------------------------------------------------------
    case "opportunity-funnel": {
      const rings = [
        { r: 215, n: "2,400", t: "Companies in view" },
        { r: 165, n: "610", t: "Pass the Shariah screen" },
        { r: 115, n: "48", t: "Quality at a fair price" },
      ];
      const dots = FUNNEL_DOTS;
      return (
        <g>
          {rings.map((g, i) => (
            <g key={g.n} className="cursor-pointer" onClick={pick(i)}>
              <circle cx={C} cy={C} r={g.r} fill="none" stroke={GOLD} strokeOpacity={0.25 + i * 0.2} strokeWidth={1 + i * 0.2} />
              <Label x={C} y={C - g.r + 24} size={19} color={GOLD} serif>
                {g.n}
              </Label>
              <Label x={C} y={C - g.r + 39} size={10.5} color={SUB}>
                {g.t}
              </Label>
            </g>
          ))}
          <circle cx={C} cy={C} r="62" fill="none" stroke={GOLD} strokeWidth="1.6" />
          {dots.map(([x, y], i) => (
            <circle
              key={i}
              cx={f(x)}
              cy={f(y)}
              r="2"
              fill={GOLD}
              opacity="0.45"
              className={m(i % 2 ? "ill-twinkle-a" : "ill-twinkle-b")}
            />
          ))}
          <Label x={C} y={334} size={19} color={GOLD} serif>
            6
          </Label>
          <Label x={C} y={349} size={10.5} color={SUB}>
            On the shortlist
          </Label>
          <Label x={C} y={492} size={10} color={SUB} opacity={0.8}>
            Illustrative counts · UK, US and Japan
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 5. FOUR RULEBOOKS — one company, two answers (investor demo, "Why Shariah is hard")
    // ---------------------------------------------------------------------------------------
    case "four-rulebooks": {
      const cards = [
        { x: 40, y: 60, n: "AAOIFI", r: "Debt ÷ market value", val: 33.7, lim: 30 },
        { x: 290, y: 60, n: "S&P Shariah", r: "Debt ÷ avg market value", val: 33.7, lim: 33 },
        { x: 40, y: 310, n: "MSCI Islamic", r: "Debt ÷ total assets", val: 32.0, lim: 33.33 },
        { x: 290, y: 310, n: "FTSE Shariah", r: "Debt ÷ total assets", val: 32.0, lim: 33.33 },
      ];
      const W = 142;
      return (
        <g>
          {cards.map((c, i) => {
            const pass = c.val <= c.lim;
            return (
              <g key={c.n} className="cursor-pointer" onClick={pick(Math.min(i, 2))}>
                <rect x={c.x} y={c.y} width="170" height="130" rx="10" fill={BG} stroke={GOLD} strokeOpacity={pass ? 0.35 : 0.9} />
                <Label x={c.x + 14} y={c.y + 26} anchor="start" size={14} weight={600}>
                  {c.n}
                </Label>
                <Label x={c.x + 14} y={c.y + 44} anchor="start" size={10} color={SUB}>
                  {c.r}
                </Label>
                <rect x={c.x + 14} y={c.y + 62} width={W} height="6" fill={GOLD} fillOpacity="0.12" />
                <rect
                  x={c.x + 14}
                  y={c.y + 62}
                  width={f((c.val / 45) * W)}
                  height="6"
                  fill={GOLD}
                  fillOpacity={pass ? 0.45 : 1}
                />
                <line
                  x1={f(c.x + 14 + (c.lim / 45) * W)}
                  x2={f(c.x + 14 + (c.lim / 45) * W)}
                  y1={c.y + 56}
                  y2={c.y + 74}
                  stroke={TXT}
                  strokeWidth="1.5"
                />
                <Label x={c.x + 14} y={c.y + 94} anchor="start" size={10.5} color={SUB} mono>
                  {`${c.val.toFixed(1)}% vs ${c.lim}%`}
                </Label>
                <Label x={c.x + 14} y={c.y + 116} anchor="start" size={13} color={GOLD} weight={700} spacing="0.12em">
                  {pass ? "PASS" : "FAIL"}
                </Label>
              </g>
            );
          })}
          <Label x={C} y={C - 50} size={10} color={GOLD} mono spacing="0.16em">
            COMPANY X
          </Label>
          <Label x={C} y={C + 60} size={10} color={SUB}>
            Illustrative
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 6. PURIFICATION FLOW — per tax lot
    // ---------------------------------------------------------------------------------------
    case "purification-flow":
      return (
        <g>
          <Eyebrow y={70}>PURIFICATION · PER TAX LOT</Eyebrow>
          <path d={dia(80, C, 12)} fill={GOLD} />
          <Label x={80} y={C - 26} size={12} weight={600}>
            Dividend
          </Label>
          <Label x={80} y={C + 32} size={10.5} color={SUB}>
            $0.84 / share
          </Label>
          <line x1="92" y1={C} x2="168" y2={C} stroke={GOLD} strokeWidth="2" />
          {/* ex-date gate */}
          <line x1="170" y1="200" x2="170" y2="300" stroke={GOLD} strokeWidth="1.5" strokeDasharray="5 4" />
          <Label x={170} y={184} size={11} weight={600}>
            Ex-date 14 Aug
          </Label>
          <Label x={170} y={322} size={10.5} color={SUB}>
            150 of 180 shares held
          </Label>
          {/* streams */}
          <path d="M 172 250 C 260 250 300 170 405 170" fill="none" stroke={GOLD} strokeOpacity="0.55" strokeWidth="5" />
          <path
            d="M 172 250 C 260 250 300 330 405 330"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.6"
            className={m("ill-flow")}
            strokeDasharray={isMotion ? undefined : "6 10"}
          />
          <g className="cursor-pointer" onClick={pick(0)}>
            <path d={dia(420, 170, 10)} fill="none" stroke={GOLD} strokeWidth="1.4" />
            <Label x={420} y={146} size={12} weight={600}>
              Investor
            </Label>
            <Label x={420} y={198} size={10.5} color={SUB}>
              96.8% kept
            </Label>
          </g>
          <g className="cursor-pointer" onClick={pick(2)}>
            <path d={dia(420, 330, 10)} fill={GOLD} />
            <Label x={420} y={306} size={12} weight={600}>
              Charity
            </Label>
            <Label x={420} y={358} size={10.5} color={SUB}>
              3.2% impure income
            </Label>
          </g>
          <rect x="70" y="392" width="360" height="40" rx="8" fill="none" stroke={GOLD} strokeOpacity="0.3" />
          <Label x={C} y={417} size={12} color={GOLD} mono>
            150 × $0.84 × 3.2% = $4.03
          </Label>
          <Label x={C} y={456} size={10.5} color={SUB}>
            Given away, recorded, never counted as return
          </Label>
        </g>
      );

    // ---------------------------------------------------------------------------------------
    // 7. GRACE CLOCK — 90-day breach manager
    // ---------------------------------------------------------------------------------------
    case "grace-clock": {
      const R = 150;
      const ang = (d: number) => -90 + d * (330 / 90);
      const [sx, sy] = polar(R, ang(0));
      const [ex, ey] = polar(R, ang(90));
      const arc = `M ${f(sx)} ${f(sy)} A ${R} ${R} 0 1 1 ${f(ex)} ${f(ey)}`;
      const marks = [
        { d: 0, t: "Day 0 · breach" },
        { d: 30, t: "Day 30" },
        { d: 45, t: "Day 45" },
        { d: 60, t: "Day 60" },
        { d: 80, t: "Day 80" },
        { d: 90, t: "Day 90 · sold" },
      ];
      return (
        <g>
          <circle cx={C} cy={C} r="110" fill={`url(#${uid}-glow)`} className={m("hm-glow")} />
          {[...Array(91)].map((_, d) => {
            const [x1, y1] = polar(R - 12, ang(d));
            const [x2, y2] = polar(R - (d % 15 === 0 ? 22 : 17), ang(d));
            return <line key={d} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} stroke={GOLD} strokeOpacity={d % 15 === 0 ? 0.7 : 0.25} />;
          })}
          <path d={arc} fill="none" stroke={GOLD} strokeOpacity="0.18" strokeWidth="6" />
          <path
            d={arc}
            fill="none"
            stroke={GOLD}
            strokeWidth="3"
            strokeLinecap="round"
            className={m("ill-draw")}
            style={v({ "--len": "866", "--dur": "9s" })}
          />
          {marks.map((k, i) => {
            const [x, y] = polar(R, ang(k.d));
            const [lx, ly] = polar(R + 26, ang(k.d));
            const c = Math.cos((ang(k.d) * Math.PI) / 180);
            return (
              <g key={k.d} className="cursor-pointer" onClick={pick(Math.min(Math.floor(i / 2), 2))}>
                <path d={dia(x, y, 6)} fill={k.d === 0 || k.d === 90 ? GOLD : BG} stroke={GOLD} strokeWidth="1.3" />
                <Label x={lx} y={ly + 4} anchor={c > 0.3 ? "start" : c < -0.3 ? "end" : "middle"} size={11}>
                  {k.t}
                </Label>
              </g>
            );
          })}
          <Label x={C} y={196} size={10} color={GOLD} mono spacing="0.14em">
            NEW BUYS BLOCKED
          </Label>
          <Label x={C} y={318} size={22} color={GOLD} serif>
            90 days
          </Label>
          <Label x={C} y={336} size={10.5} color={SUB}>
            Gains after breach are purified
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 8. ONE ORDER SEAL — approval bound to one exact order (brief I3 node 5, demo Approve)
    // ---------------------------------------------------------------------------------------
    case "one-order-seal": {
      const sx = 360;
      const sy = 330;
      const r = 58;
      const len = f(2 * Math.PI * r);
      return (
        <g>
          <rect x="80" y="96" width="300" height="250" rx="10" fill={BG} stroke={GOLD} strokeOpacity="0.7" strokeWidth="1.3" />
          <line x1="80" y1="124" x2="380" y2="124" stroke={GOLD} strokeOpacity="0.25" />
          <Label x={100} y={115} anchor="start" size={10.5} color={GOLD} mono spacing="0.14em">
            ORDER 0147 · ILLUSTRATIVE
          </Label>
          <Label x={100} y={160} anchor="start" size={22} serif>
            Buy 1,418 shares
          </Label>
          <Label x={100} y={180} anchor="start" size={11.5} color={SUB}>
            Calderwick Instruments
          </Label>
          <Label x={100} y={202} anchor="start" size={11.5} color={SUB}>
            Limit £42.30 · one exact order
          </Label>
          <line x1="100" y1="220" x2="360" y2="220" stroke={GOLD} strokeOpacity="0.25" />
          {["11 of 11 checks passed", "Committee view attached", "CIO approval · passkey"].map((t, i) => (
            <g key={t} className="cursor-pointer" onClick={pick(i)}>
              <path d={dia(106, 242 + i * 24, 4)} fill={GOLD} opacity={strong(i) + 0.3} />
              <Label x={118} y={246 + i * 24} anchor="start" size={11.5}>
                {t}
              </Label>
            </g>
          ))}
          <circle cx={sx} cy={sy} r={r - 8} fill={BG} stroke={GOLD} strokeWidth="1.4" />
          <circle
            cx={sx}
            cy={sy}
            r={r}
            fill="none"
            stroke={GOLD}
            strokeWidth="2"
            transform={`rotate(-90 ${sx} ${sy})`}
            strokeDasharray={isMotion ? undefined : `${len}`}
            className={m("ill-unwind")}
            style={v({ "--len": `${len}` })}
          />
          <Label x={sx} y={sy + r + 22} size={11} weight={600}>
            Expires if unused
          </Label>
          <Label x={C - 20} y={446} size={10.5} color={SUB}>
            Any change to the order cancels the approval
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 9. HASH CHAIN — tamper-evident record (demo, Report step)
    // ---------------------------------------------------------------------------------------
    case "hash-chain": {
      const steps = [
        { t: "Trigger", h: "a41f…9c2e" },
        { t: "Checks", h: "7b03…e118" },
        { t: "CIO decision", h: "02d9…55af" },
        { t: "Execution", h: "c1d0…4f8e" },
        { t: "Result", h: "5b2e…7a19" },
      ];
      return (
        <g>
          <Eyebrow y={128}>TAMPER-EVIDENT RECORD</Eyebrow>
          {steps.slice(1).map((_, i) => {
            const x1 = 70 + i * 90 + 26;
            return (
              <g key={i}>
                <line x1={x1} y1={C} x2={x1 + 38} y2={C} stroke={GOLD} strokeOpacity="0.55" strokeWidth="1.3" />
                <path d={`M ${x1 + 32} ${C - 4} L ${x1 + 38} ${C} L ${x1 + 32} ${C + 4}`} fill="none" stroke={GOLD} strokeOpacity="0.7" />
              </g>
            );
          })}
          {steps.map((s, i) => {
            const x = 70 + i * 90;
            return (
              <g key={s.t} className="cursor-pointer" onClick={pick(Math.min(i, 2))}>
                <path d={dia(x, C, 26)} fill={BG} stroke={GOLD} strokeWidth="1.3" />
                <path
                  d={dia(x, C, 9)}
                  fill={GOLD}
                  className={m("ill-seq")}
                  style={v({ "--dur": "5s", animationDelay: `${i * 0.6}s` })}
                />
                <Label x={x} y={C - 40} size={11.5} weight={600}>
                  {s.t}
                </Label>
                <Label x={x} y={C + 46} size={9.5} color={SUB} mono>
                  {s.h}
                </Label>
              </g>
            );
          })}
          <Label x={C} y={356} size={12} color={TXT}>
            Each record carries the fingerprint of the one before.
          </Label>
          <Label x={C} y={376} size={10.5} color={SUB}>
            Change any past record and every later fingerprint breaks.
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 10. FAIR-VALUE RANGE — bear / base / bull with margin of safety
    // ---------------------------------------------------------------------------------------
    case "fair-value-range": {
      const X = (p: number) => 60 + (p - 25) * 7.6;
      const pts = [
        { p: 36, t: "Bear" },
        { p: 55, t: "Base" },
        { p: 68, t: "Bull" },
      ];
      const price = 42;
      return (
        <g>
          <Eyebrow y={200}>FAIR-VALUE RANGE · WRITTEN BEFORE ANY ORDER</Eyebrow>
          <line x1="50" y1="262" x2="450" y2="262" stroke={GOLD} strokeOpacity="0.3" />
          <rect x={f(X(36))} y="250" width={f(X(68) - X(36))} height="24" fill={GOLD} fillOpacity="0.1" stroke={GOLD} strokeOpacity="0.6" />
          {pts.map((p, i) => (
            <g key={p.t} className="cursor-pointer" onClick={pick(i)}>
              <line x1={f(X(p.p))} x2={f(X(p.p))} y1="246" y2="278" stroke={GOLD} strokeWidth={p.t === "Base" ? 2 : 1.2} />
              <Label x={X(p.p)} y={300} size={12} weight={600}>
                {p.t}
              </Label>
              <Label x={X(p.p)} y={318} size={15} color={GOLD} serif>
                {`£${p.p}`}
              </Label>
            </g>
          ))}
          {/* Price marker (points down to the range) */}
          <g className={m("ill-bob")}>
            <path d={`M ${f(X(price) - 7)} 232 L ${f(X(price) + 7)} 232 L ${f(X(price))} 244 Z`} fill={GOLD} />
            <Label x={X(price)} y={225} size={11} weight={600}>
              Price £42
            </Label>
          </g>
          {/* Margin of safety bracket */}
          <path
            d={`M ${f(X(price))} 342 L ${f(X(price))} 350 L ${f(X(55))} 350 L ${f(X(55))} 342`}
            fill="none"
            stroke={GOLD}
            strokeWidth="1.3"
          />
          <Label x={(X(price) + X(55)) / 2} y={370} size={11.5} weight={600}>
            Margin of safety
          </Label>
          <Label x={C} y={428} size={10.5} color={SUB}>
            A great company at the wrong price waits on the watchlist
          </Label>
          <Label x={C} y={446} size={10} color={SUB} opacity={0.8}>
            Illustrative figures
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 11. COMMITTEE OF FIVE — fixed order, dissent recorded, CIO decides
    // ---------------------------------------------------------------------------------------
    case "committee-five": {
      const cx = C;
      const cy = 300;
      const voices = [
        { t: "Research", s: "Supports" },
        { t: "Valuation", s: "Supports" },
        { t: "Risk", s: "Dissent, on record" },
        { t: "Shariah", s: "Pass · code only" },
        { t: "Portfolio", s: "Recommends 6%" },
      ];
      return (
        <g>
          <Eyebrow y={58}>CHALLENGE STAGE · DISSENT RECORDED</Eyebrow>
          <circle cx={cx} cy={360} r="44" fill={BG} stroke={GOLD} strokeWidth="1.5" />
          {voices.map((vc, i) => {
            const th = 180 - i * 45;
            const x = cx + 160 * Math.cos((th * Math.PI) / 180);
            const y = cy - 160 * Math.sin((th * Math.PI) / 180);
            const side = i === 0 || i === 4;
            const lx = side ? x : cx + 200 * Math.cos((th * Math.PI) / 180);
            const ly = side ? y + 34 : cy - 200 * Math.sin((th * Math.PI) / 180);
            const anchor = side || i === 2 ? "middle" : i < 2 ? "end" : "start";
            const dissent = i === 2;
            return (
              <g key={vc.t} className="cursor-pointer" onClick={pick(Math.min(i, 2))}>
                <line x1={f(x)} y1={f(y)} x2={cx} y2={316} stroke={GOLD} strokeOpacity="0.3" strokeDasharray={dissent ? "3 4" : undefined} />
                <path d={dia(x, y, 16)} fill={BG} stroke={GOLD} strokeWidth="1.4" strokeDasharray={dissent ? "3 3" : undefined} />
                <path
                  d={dia(x, y, 6)}
                  fill={GOLD}
                  className={m("ill-seq")}
                  style={v({ "--dur": "6s", animationDelay: `${i * 0.8}s` })}
                />
                <Label x={lx} y={ly} anchor={anchor} size={12} weight={600}>
                  {vc.t}
                </Label>
                <Label x={lx} y={ly + 14} anchor={anchor} size={10} color={dissent ? GOLD : SUB}>
                  {vc.s}
                </Label>
              </g>
            );
          })}
          <Label x={cx} y={424} size={12.5} weight={600}>
            CIO decides
          </Label>
          <Label x={cx} y={440} size={10.5} color={SUB}>
            The committee recommends. It cannot approve.
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 12. DRAWDOWN BANDS — levels and who is alerted (demo, Monitor step)
    // ---------------------------------------------------------------------------------------
    case "drawdown-bands": {
      const bands = [
        { r: 215, t: "Severe", a: "Full review" },
        { r: 170, t: "Material", a: "PM · CIO · Committee" },
        { r: 125, t: "Elevated", a: "PM · CIO alerted" },
        { r: 82, t: "Normal", a: "" },
      ];
      return (
        <g>
          {bands.map((b, i) => (
            <g key={b.t} className="cursor-pointer" onClick={pick(Math.min(i, 2))}>
              <circle cx={C} cy={C} r={b.r} fill={GOLD} fillOpacity="0.02" stroke={GOLD} strokeOpacity={0.2 + i * 0.15} strokeWidth="1.1" />
              <Label x={C} y={C - b.r + 18} size={11} color={GOLD} mono spacing="0.16em">
                {b.t.toUpperCase()}
              </Label>
              {b.a && (
                <Label x={C} y={C + b.r - 14} size={10.5} color={SUB}>
                  {b.a}
                </Label>
              )}
            </g>
          ))}
          <circle cx={C} cy={C} r="215" fill="none" stroke={GOLD} strokeWidth="1.2" className={m("ill-ripple")} opacity={isMotion ? undefined : 0} />
          <Label x={C} y={492} size={10.5} color={SUB}>
            Risk limits never loosen · nothing is sold automatically
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 13. SECTOR CAP — portfolio strip with the Industrials cap (demo, Construct step)
    // ---------------------------------------------------------------------------------------
    case "sector-cap": {
      const sizes = [6, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
      const X = (p: number) => 50 + p * 4;
      let cum = 0;
      const gauges = [
        { t: "Largest sector", val: 30, cap: 30 },
        { t: "Largest five holdings", val: 40, cap: 45 },
        { t: "Loss in a sharp fall", val: 17.9, cap: 20 },
      ];
      return (
        <g>
          <Eyebrow y={98}>FICTIONAL £1M FLAGSHIP PORTFOLIO</Eyebrow>
          <path d={`M ${X(0)} 186 L ${X(0)} 176 L ${X(30)} 176 L ${X(30)} 186`} fill="none" stroke={GOLD} strokeWidth="1.3" />
          <Label x={X(15)} y={166} size={11.5} weight={600}>
            Industrials 30.0%
          </Label>
          <Label x={X(62)} y={176} size={10.5} color={SUB}>
            8 other holdings · cash 6%
          </Label>
          {sizes.map((s, i) => {
            const x = X(cum);
            cum += s;
            return (
              <rect
                key={i}
                x={x}
                y="196"
                width={s * 4 - 2}
                height="54"
                fill={GOLD}
                fillOpacity={i === 0 ? 0.55 : i < 4 ? 0.16 : 0.05}
                stroke={GOLD}
                strokeOpacity={i < 4 ? 0.7 : 0.3}
              />
            );
          })}
          <rect x={X(94)} y="196" width={6 * 4} height="54" fill="none" stroke={GOLD} strokeOpacity="0.25" strokeDasharray="2 3" />
          <rect
            x={X(30)}
            y="196"
            width="10"
            height="54"
            fill={GOLD}
            fillOpacity="0.5"
            stroke={GOLD}
            strokeDasharray="2 2"
            className={m("ill-blink")}
            opacity={isMotion ? undefined : 0.35}
          />
          <line x1={X(30)} x2={X(30)} y1="186" y2="262" stroke={TXT} strokeWidth="2" />
          <Label x={X(30) + 6} y={278} anchor="start" size={10.5} color={GOLD}>
            Sector cap: one more point is blocked
          </Label>
          <Label x={X(0)} y={278} anchor="start" size={10.5} color={SUB}>
            New: 6%
          </Label>
          {gauges.map((g, i) => {
            const y = 340 + i * 34;
            const w = 220;
            const at = g.val >= g.cap;
            return (
              <g key={g.t} className="cursor-pointer" onClick={pick(i)}>
                <Label x={50} y={y + 4} anchor="start" size={11}>
                  {g.t}
                </Label>
                <rect x="210" y={y - 4} width={w} height="6" fill={GOLD} fillOpacity="0.12" />
                <rect x="210" y={y - 4} width={f((g.val / g.cap) * 0.8 * w)} height="6" fill={GOLD} fillOpacity={at ? 1 : 0.5} />
                <line x1={210 + 0.8 * w} x2={210 + 0.8 * w} y1={y - 9} y2={y + 7} stroke={TXT} strokeWidth="1.3" />
                <Label x={450} y={y + 4} anchor="end" size={11} color={GOLD} mono>
                  {`${g.val}%`}
                </Label>
              </g>
            );
          })}
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 14. THREE MARKETS — UK, US and Japan sessions on a 24-hour dial
    // ---------------------------------------------------------------------------------------
    case "three-markets": {
      const ang = (h: number) => h * 15 - 90;
      const arcPath = (h1: number, h2: number, r: number) => {
        const [x1, y1] = polar(r, ang(h1));
        const [x2, y2] = polar(r, ang(h2));
        return `M ${f(x1)} ${f(y1)} A ${r} ${r} 0 ${h2 - h1 > 12 ? 1 : 0} 1 ${f(x2)} ${f(y2)}`;
      };
      const sessions = [
        { t: "UK · London", h1: 8, h2: 16.5, r: 150, lr: 172 },
        { t: "US · New York", h1: 14.5, h2: 21, r: 125, lr: 147, lh: 19.6 },
        { t: "Japan · Tokyo", h1: 0, h2: 6, r: 100, lr: 122 },
      ];
      return (
        <g>
          <circle cx={C} cy={C} r="190" fill="none" stroke={GOLD} strokeOpacity="0.35" />
          {[...Array(24)].map((_, h) => {
            const [x1, y1] = polar(190, ang(h));
            const [x2, y2] = polar(h % 6 === 0 ? 176 : 182, ang(h));
            return <line key={h} x1={f(x1)} y1={f(y1)} x2={f(x2)} y2={f(y2)} stroke={GOLD} strokeOpacity={h % 6 === 0 ? 0.8 : 0.35} />;
          })}
          {[0, 6, 12, 18].map((h) => {
            const [x, y] = polar(206, ang(h));
            return (
              <Label key={h} x={x} y={y + 4} anchor={h === 6 ? "start" : h === 18 ? "end" : "middle"} size={10.5} color={GOLD} mono>
                {`${String(h).padStart(2, "0")}:00`}
              </Label>
            );
          })}
          {sessions.map((s, i) => {
            const mid = "lh" in s ? (s.lh as number) : (s.h1 + s.h2) / 2;
            const [lx, ly] = polar(s.lr + 8, ang(mid));
            const c = Math.cos((ang(mid) * Math.PI) / 180);
            return (
              <g key={s.t} className="cursor-pointer" onClick={pick(i)}>
                <path d={arcPath(s.h1, s.h2, s.r)} fill="none" stroke={GOLD} strokeOpacity="0.2" strokeWidth="9" strokeLinecap="round" />
                <path d={arcPath(s.h1, s.h2, s.r)} fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity={strong(i) + 0.3} />
                <Label x={lx} y={ly + 4} anchor={c > 0.3 ? "start" : c < -0.3 ? "end" : "middle"} size={11.5} weight={600}>
                  {s.t}
                </Label>
              </g>
            );
          })}
          <g className={m("ill-spin-day")}>
            <line x1={C} y1={C} x2={C} y2={72} stroke={GOLD} strokeOpacity="0.8" strokeWidth="1.2" />
            <path d={dia(C, 72, 5)} fill={GOLD} />
          </g>
          <circle cx={C} cy={C} r="44" fill={BG} stroke={GOLD} strokeOpacity="0.6" />
          <Label x={C} y={492} size={10.5} color={SUB}>
            Filings, results, prices and events · hours in UTC
          </Label>
        </g>
      );
    }

    // ---------------------------------------------------------------------------------------
    // 15. HIGH-WATER MARK — profit share only above your best plus 5% (proposed terms)
    // ---------------------------------------------------------------------------------------
    case "high-water-mark": {
      const xs = [70, 140, 210, 280, 350, 420];
      const ys = [345, 246, 311, 264, 170, 148];
      const line = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
      return (
        <g>
          <Eyebrow y={72}>PROFIT SHARE · PROPOSED TERMS · ILLUSTRATIVE</Eyebrow>
          <line x1="60" y1="360" x2="440" y2="360" stroke={GOLD} strokeOpacity="0.4" />
          {/* high-water mark (dashed) and hurdle (dotted) as steps */}
          <path d="M 70 345 L 140 345 M 140 246 L 350 246 M 350 170 L 430 170" stroke={TXT} strokeOpacity="0.6" strokeDasharray="5 4" fill="none" />
          <path d="M 70 290 L 140 290 M 140 214 L 350 214 M 350 133 L 430 133" stroke={GOLD} strokeOpacity="0.8" strokeDasharray="1 4" strokeWidth="1.6" fill="none" />
          {/* shared zones: value above hurdle */}
          <polygon points="109,290 140,246 140,290" fill={GOLD} fillOpacity="0.4" />
          <polygon points="317,214 350,170 350,214" fill={GOLD} fillOpacity="0.4" />
          <polyline
            points={line}
            fill="none"
            stroke={GOLD}
            strokeWidth="2.2"
            strokeLinejoin="round"
            className={m("ill-draw")}
            style={v({ "--len": "500", "--dur": "8s" })}
          />
          {xs.map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={ys[i]} r="3.5" fill={BG} stroke={GOLD} strokeWidth="1.4" />
              <Label x={x} y={378} size={10.5} color={SUB}>
                {i === 0 ? "Start" : `Y${i}`}
              </Label>
            </g>
          ))}
          <g className="cursor-pointer" onClick={pick(0)}>
            <Label x={146} y={239} anchor="start" size={10.5} color={TXT} opacity={0.85}>
              Your best (high-water mark)
            </Label>
          </g>
          <g className="cursor-pointer" onClick={pick(1)}>
            <Label x={170} y={207} anchor="start" size={10.5} color={GOLD}>
              Best + 5% hurdle
            </Label>
          </g>
          <Label x={210} y={330} size={10.5} color={SUB}>
            Loss year: no fee
          </Label>
          <g className="cursor-pointer" onClick={pick(2)}>
            <rect x="70" y="408" width="360" height="48" rx="8" fill="none" stroke={GOLD} strokeOpacity="0.3" />
            <path d={dia(92, 424, 5)} fill={GOLD} fillOpacity="0.6" />
            <Label x={104} y={428} anchor="start" size={11}>
              Above the hurdle: 60% you · 40% Simat
            </Label>
            <path d={dia(92, 443, 5)} fill="none" stroke={GOLD} />
            <Label x={104} y={447} anchor="start" size={11} color={SUB}>
              Below it: every pound is yours
            </Label>
          </g>
        </g>
      );
    }

    default:
      return null;
  }
}
