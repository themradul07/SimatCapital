"use client";

import { BG, CARD_SHADOW, Depth, EASE, Eyebrow, GOLD, Label, SUB, TXT, Ticker, dia, f, polar, v, type LiveProps } from "./primitives";
import { useStep, useTween } from "./useLive";

/**
 * Agentic AI set — three live illustrations of AI agents working inside Simat's process:
 * an orchestrator delegating to specialist agents, a single agent running a
 * think → act → observe → reflect loop, and a bull/bear/judge multi-agent debate.
 *
 * Every one ends with a human (the CIO) signing off: agents research and recommend,
 * they never trade on their own. Tickers, figures and tool names are illustrative.
 */

// -----------------------------------------------------------------------------------------
// Shared pieces: a typed line and a live reasoning-trace terminal
// -----------------------------------------------------------------------------------------

/** A monospace line that "types" itself in: a cover + caret slides right in character steps. */
function TypeLine({
  x,
  y,
  text,
  size = 8.5,
  color = TXT,
  typing,
  cover = BG,
  opacity,
}: {
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: string;
  typing: boolean;
  cover?: string;
  opacity?: number;
}) {
  const w = f(text.length * size * 0.6);
  return (
    <g opacity={opacity}>
      <Label x={x} y={y} anchor="start" size={size} color={color} mono>
        {text}
      </Label>
      {typing && (
        <g
          className="ill-type"
          style={v({ "--w": `${w}px`, "--dur": `${Math.min(1.3, 0.3 + text.length * 0.02).toFixed(2)}s`, animationTimingFunction: `steps(${text.length})` })}
        >
          <rect x={x} y={y - size - 1} width={w + 12} height={size + 6} fill={cover} />
          <rect x={x} y={y - size + 1} width={f(size * 0.55)} height={size} fill={GOLD} className="ill-caret" />
        </g>
      )}
    </g>
  );
}

interface TraceLine {
  key: string;
  text: string;
  color?: string;
}

/** Terminal panel showing the agent's latest reasoning steps; the newest line types in. */
function TracePanel({
  uid,
  x,
  y,
  w,
  h,
  title,
  right,
  lines,
  live,
  max,
  lineH = 20,
  size = 8.5,
}: {
  uid: string;
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  right: string;
  lines: TraceLine[];
  live: boolean;
  max: number;
  lineH?: number;
  size?: number;
}) {
  const shown = lines.slice(-max);
  const clip = `${uid}-trace`;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={BG} stroke={GOLD} strokeOpacity="0.35" />
      <line x1={x} y1={y + 22} x2={x + w} y2={y + 22} stroke={GOLD} strokeOpacity="0.18" />
      <circle cx={x + 12} cy={y + 11} r="2.6" fill={GOLD} className={live ? "ill-live-dot" : undefined} />
      <Label x={x + 21} y={y + 14.5} anchor="start" size={8} color={GOLD} mono spacing="0.14em">
        {title}
      </Label>
      <Label x={x + w - 12} y={y + 14.5} anchor="end" size={8} color={SUB} mono>
        {right}
      </Label>
      <clipPath id={clip}>
        <rect x={x + 4} y={y + 24} width={w - 8} height={h - 28} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        {shown.map((l, i) => (
          <g key={l.key} style={{ transform: `translateY(${i * lineH}px)`, transition: "transform 0.45s ease" }}>
            <TypeLine
              x={x + 12}
              y={y + 40}
              text={l.text}
              size={size}
              color={l.color ?? TXT}
              typing={live && i === shown.length - 1}
              opacity={i === shown.length - 1 ? 1 : 0.72}
            />
          </g>
        ))}
      </g>
    </g>
  );
}

const hexPts = (x: number, y: number, r: number) =>
  Array.from({ length: 6 }, (_, k) => polar(r, -90 + k * 60, x, y).map(f).join(",")).join(" ");

// =========================================================================================
// A. AGENT SWARM — an orchestrator plans, delegates to specialist agents, reflects, escalates
// =========================================================================================
const SWARM_AGENTS = [
  { k: "FR", name: "Filing Reader", x: 96, y: 120, tool: "edgar.fetch_10q()", out: 1, back: 2 },
  { k: "SS", name: "Shariah Screener", x: 404, y: 120, tool: "screen.ratios()", out: 2, back: 3 },
  { k: "VA", name: "Valuation Analyst", x: 404, y: 276, tool: "dcf.bear_case()", out: 3, back: 4 },
  { k: "RS", name: "Risk Sentinel", x: 96, y: 276, tool: "risk.impact()", out: 4, back: 5 },
];
const SWARM_TASKS = [
  { t: "NOVA", a: "21.4", c: "9.8", imp: "1.2", fv: "£92–£108", px: "£81", rs: "sector 27.5% → 30.5% · resize to 2.5%", refl: "size 2.5% · confidence 0.86", conf: 0.86 },
  { t: "KITE", a: "18.9", c: "12.1", imp: "0.7", fv: "$38–$46", px: "$31.75", rs: "all caps clear at 3.0%", refl: "size 3.0% · confidence 0.81", conf: 0.81 },
  { t: "ORBI", a: "31.6", c: "7.4", imp: "3.9", fv: "¥2,600–¥3,100", px: "¥2,840", rs: "debt close to the 33.33% limit", refl: "no buy · watchlist · re-check", conf: 0.42 },
];
const SWARM_CYCLE = 10;
const ORCH = { x: 250, y: 196 };

export function AgentSwarm({ uid, live, isMotion }: LiveProps) {
  const m = (cls: string) => (isMotion ? cls : "");
  const n = useStep(live, 1400);
  const round = Math.floor(n / SWARM_CYCLE);
  const ti = live ? round % SWARM_TASKS.length : 0;
  const s = live ? n % SWARM_CYCLE : SWARM_CYCLE - 1;
  const task = SWARM_TASKS[ti];
  const traceAll = [
    `▸ plan: assess ${task.t} for shortlist → 4 sub-tasks`,
    `→ filing_reader.fetch_10q("${task.t}")`,
    `← FR: debt/assets ${task.a}% · cash ${task.c}%`,
    `← SS: gates checked · impure income ${task.imp}%`,
    `← VA: fair value ${task.fv} · price ${task.px}`,
    `← RS: ${task.rs}`,
    `◆ reflect: ${task.refl}`,
    `✓ memo drafted → awaiting CIO sign-off`,
  ];
  const lines: TraceLine[] = traceAll.slice(0, Math.min(s, 7) + 1).map((text, i) => ({
    key: `${round}-${i}`,
    text,
    color: text.startsWith("←") ? GOLD : text.startsWith("✓") || text.startsWith("◆") ? TXT : SUB,
  }));
  const [conf] = useTween([[0, 0.15, 0.3, 0.45, 0.6, 0.75, 1, 1, 1, 1][s] * task.conf], live, 900);
  const phase = s === 0 ? "PLANNING" : s <= 5 ? "DELEGATING" : s === 6 ? "REFLECTING" : "MEMO READY";
  const calls = SWARM_AGENTS.filter((a) => s >= a.out).length;
  const signOff = s >= 7 || !live;

  return (
    <g>
      <Eyebrow y={22}>AGENTIC RESEARCH SWARM · ORCHESTRATOR + 4 SPECIALISTS</Eyebrow>
      <Ticker y={40} text={`TASK · EVALUATE ${task.t} · ${phase}`} live={live} animKey={`${round}-${phase}`} size={8.5} />

      {/* Delegation edges */}
      <Depth d={0.4}>
        {SWARM_AGENTS.map((a) => {
          const working = s >= a.out && s < a.back;
          const done = s >= a.back;
          return (
            <g key={a.k}>
              <line
                x1={ORCH.x}
                y1={ORCH.y}
                x2={a.x}
                y2={a.y}
                stroke={working ? TXT : GOLD}
                strokeOpacity={working ? 0.9 : done ? 0.55 : 0.18}
                strokeWidth={working ? 1.4 : 1}
                style={{ transition: "stroke-opacity 0.4s" }}
              />
              {working && live && <line x1={ORCH.x} y1={ORCH.y} x2={a.x} y2={a.y} stroke={GOLD} strokeWidth="1.4" className="ill-laser" />}
            </g>
          );
        })}
      </Depth>

      {/* Specialist agents */}
      <Depth d={1.6} lift>
        {SWARM_AGENTS.map((a) => {
          const working = s >= a.out && s < a.back;
          const done = s >= a.back;
          return (
            <g key={a.k} className="ill-hover-group cursor-pointer">
              {working && live && (
                <g className="ill-spin-local">
                  <circle cx={a.x} cy={a.y} r="40" fill="none" stroke="none" />
                  <circle cx={a.x} cy={a.y} r="36" fill="none" stroke={GOLD} strokeOpacity="0.5" strokeDasharray="3 7" />
                  <path d={dia(a.x, a.y - 36, 4)} fill={GOLD} />
                </g>
              )}
              <polygon
                points={hexPts(a.x, a.y, 26)}
                fill={BG}
                stroke={working ? TXT : GOLD}
                strokeWidth={working ? 2 : 1.3}
                strokeOpacity={done || working ? 1 : 0.5}
                className="ill-target"
                style={{ transition: "stroke-opacity 0.4s" }}
              />
              <polygon points={hexPts(a.x, a.y, 26)} fill={GOLD} fillOpacity={done ? 0.18 : working ? 0.1 : 0} style={{ transition: "fill-opacity 0.4s" }} />
              <Label x={a.x} y={a.y + 4} size={11} color={working ? TXT : GOLD} mono weight={700}>
                {a.k}
              </Label>
              <Label x={a.x} y={a.y - 36} size={10} weight={700}>
                {a.name}
              </Label>
              <Label x={a.x} y={a.y + 42} size={8} color={working ? TXT : done ? GOLD : SUB} mono>
                {working ? `⚙ ${a.tool}` : done ? "✓ result returned" : "○ idle"}
              </Label>
              <g className="ill-card">
                <rect x={a.x - 70} y={a.y + 50} width="140" height="22" rx="4" fill={BG} stroke={GOLD} strokeWidth="1" filter={CARD_SHADOW} />
                <Label x={a.x} y={a.y + 65} size={8} color={GOLD} mono>
                  {`TOOL ACCESS: ${a.tool}`}
                </Label>
              </g>
            </g>
          );
        })}
      </Depth>

      {/* Task packets out, result packets back */}
      <Depth d={2.2}>
        {live &&
          SWARM_AGENTS.map((a) =>
            s === a.out ? (
              <circle key={`o-${n}-${a.k}`} cx={ORCH.x} cy={ORCH.y} r="4.5" fill={TXT} className="ill-send" style={v({ "--tx": `${a.x - ORCH.x}px`, "--ty": `${a.y - ORCH.y}px` })} />
            ) : s === a.back ? (
              <path key={`b-${n}-${a.k}`} d={dia(a.x, a.y, 6)} fill={GOLD} className="ill-send" style={v({ "--tx": `${ORCH.x - a.x}px`, "--ty": `${ORCH.y - a.y}px` })} />
            ) : null,
          )}
      </Depth>

      {/* Orchestrator — the Simat mark sits in its core */}
      <Depth d={1.8} lift>
        <g className={m("ill-spin-local")}>
          <circle cx={ORCH.x} cy={ORCH.y} r="58" fill="none" stroke={GOLD} strokeOpacity="0.35" strokeDasharray="14 10" />
        </g>
        <g className={m("ill-spin-local-rev")}>
          <circle cx={ORCH.x} cy={ORCH.y} r="52" fill="none" stroke={GOLD} strokeOpacity="0.2" strokeDasharray="2 6" />
        </g>
        {live && (s === 0 || s === 6) && <circle key={`think-${n}`} cx={ORCH.x} cy={ORCH.y} r="46" fill="none" stroke={TXT} strokeWidth="1.6" className="ill-burst" />}
        <circle cx={ORCH.x} cy={ORCH.y} r="44" fill={BG} stroke={GOLD} strokeWidth="1.6" />
        <Label x={ORCH.x} y={266} size={8} color={GOLD} mono spacing="0.14em">
          {`ORCHESTRATOR · ${phase}`}
        </Label>
        <rect x="190" y="272" width="120" height="4" rx="2" fill={GOLD} fillOpacity="0.15" />
        <rect x="190" y="272" width={f(120 * conf)} height="4" rx="2" fill={GOLD} />
        <Label x={ORCH.x} y={288} size={7.5} color={SUB} mono>
          {`CONFIDENCE ${conf.toFixed(2)}`}
        </Label>
        <g className={live && s >= 7 ? "ill-blink" : undefined}>
          <rect x="196" y="296" width="108" height="20" rx="10" fill={BG} stroke={signOff ? TXT : GOLD} strokeOpacity={signOff ? 1 : 0.3} />
          <Label x={ORCH.x} y={309.5} size={7.5} color={signOff ? TXT : SUB} mono weight={700}>
            ✍ CIO SIGN-OFF
          </Label>
        </g>
      </Depth>

      <TracePanel uid={uid} x={40} y={332} w={420} h={140} title="REASONING TRACE" right={`TOOL CALLS ${calls}/4`} lines={lines} live={live} max={5} />
    </g>
  );
}

// =========================================================================================
// B. AUTONOMOUS COMPLIANCE AGENT — think → act → observe → reflect, plan item by plan item
// =========================================================================================
const REACT_PHASES = ["THINK", "ACT", "OBSERVE", "REFLECT"];
const REACT_PLAN = [
  { t: "Detect new ORBI filing", steps: ["think: new 10-Q event for ORBI — re-check?", "act: edgar.fetch('ORBI', form='10-Q')", "obs: 84 pages received · hash verified", "reflect: filing is fresh → extract ratios"] },
  { t: "Extract balance sheet", steps: ["think: need debt, cash and receivables", "act: parser.extract(balance_sheet)", "obs: debt $412M · total assets $1.21B", "reflect: debt / assets = 34.0%"] },
  { t: "Re-screen 4 gates", steps: ["think: 34.0% is above the 33.33% limit", "act: shariah.screen('ORBI')", "obs: gate 02 FAIL · gates 1, 3, 4 pass", "reflect: breach confirmed → lock buys"] },
  { t: "Measure exit impact", steps: ["think: what does the exit cost the fund?", "act: risk.impact('ORBI', weight=4.0%)", "obs: 6.2× daily volume · 3 sessions", "reflect: low market impact"] },
  { t: "Draft staged exit plan", steps: ["think: exit inside the 90-day window", "act: planner.draft_exit(tranches=3)", "obs: T+1 / T+2 / T+3 · purify any gain", "reflect: plan within mandate rules"] },
  { t: "Escalate to the CIO", steps: ["think: trades need a human signature", "act: notify.cio(plan, evidence=7)", "obs: approval request delivered", "reflect: waiting · no autonomous trade"] },
];
const REACT_STEPS = REACT_PLAN.length * 4;
const REACT_CYCLE = REACT_STEPS + 4;
const LOOP = { x: 140, y: 196, r: 70 };

export function AgentReactLoop({ uid, live, isMotion }: LiveProps) {
  const m = (cls: string) => (isMotion ? cls : "");
  const n = useStep(live, 950);
  const loopN = Math.floor(n / REACT_CYCLE);
  const s = live ? n % REACT_CYCLE : REACT_CYCLE - 1;
  const running = s < REACT_STEPS;
  const cs = Math.min(s, REACT_STEPS - 1);
  const item = Math.floor(cs / 4);
  const phase = cs % 4;
  const calls = Math.min(REACT_PLAN.length, Math.floor((cs + 3) / 4));
  const rot = (loopN * REACT_STEPS + cs) * 90;
  const lines: TraceLine[] = [];
  for (let k = 0; k <= cs; k++) {
    const text = REACT_PLAN[Math.floor(k / 4)].steps[k % 4];
    lines.push({ key: `${loopN}-${k}`, text, color: k % 4 === 1 ? TXT : k % 4 === 2 ? GOLD : SUB });
  }
  const nodes = REACT_PHASES.map((p, i) => ({ p, pos: polar(LOOP.r, -90 + i * 90, LOOP.x, LOOP.y) }));

  return (
    <g>
      <Eyebrow y={24}>AUTONOMOUS COMPLIANCE AGENT · THINK → ACT → OBSERVE</Eyebrow>
      <Ticker
        y={44}
        text={running ? `STEP ${item + 1}/6 · ${REACT_PLAN[item].t.toUpperCase()}` : "PLAN COMPLETE · ESCALATED · AWAITING HUMAN"}
        live={live}
        animKey={running ? `${loopN}-${item}` : `${loopN}-done`}
        size={8.5}
      />

      {/* The reasoning loop */}
      <Depth d={0.6}>
        <circle cx={LOOP.x} cy={LOOP.y} r={LOOP.r + 14} fill={GOLD} fillOpacity="0.03" />
        <g className={m("ill-spin-local")}>
          <circle cx={LOOP.x} cy={LOOP.y} r={LOOP.r} fill="none" stroke={GOLD} strokeOpacity="0.45" strokeDasharray="4 6" />
        </g>
      </Depth>

      <Depth d={1.6}>
        <g
          style={{
            transform: `rotate(${rot}deg)`,
            transformOrigin: `${LOOP.x}px ${LOOP.y}px`,
            transformBox: "view-box",
            transition: live ? `transform 0.7s ${EASE}` : undefined,
          }}
        >
          <circle cx={LOOP.x} cy={LOOP.y - LOOP.r} r="6" fill={TXT} />
          <circle cx={LOOP.x} cy={LOOP.y - LOOP.r} r="12" fill="none" stroke={GOLD} strokeWidth="1" className={m("ill-ping")} />
        </g>
        {nodes.map(({ p, pos: [x, y] }, i) => {
          const on = running && i === phase;
          return (
            <g key={p}>
              <rect x={f(x - 30)} y={f(y - 10)} width="60" height="20" rx="10" fill={BG} stroke={on ? TXT : GOLD} strokeWidth={on ? 1.8 : 1} strokeOpacity={on ? 1 : 0.55} style={{ transition: "stroke-opacity 0.3s" }} />
              <rect x={f(x - 30)} y={f(y - 10)} width="60" height="20" rx="10" fill={GOLD} fillOpacity={on ? 0.22 : 0} style={{ transition: "fill-opacity 0.3s" }} />
              <Label x={x} y={y + 3} size={7.5} color={on ? TXT : GOLD} mono weight={700} spacing="0.1em">
                {p}
              </Label>
            </g>
          );
        })}
      </Depth>

      <Depth d={2.4} lift>
        <circle cx={LOOP.x} cy={LOOP.y} r="34" fill={BG} stroke={GOLD} strokeWidth="1.4" />
        <Label x={LOOP.x} y={LOOP.y + 1} size={17} color={GOLD} serif>
          {running ? `${item + 1}/6` : "6/6"}
        </Label>
        <Label x={LOOP.x} y={LOOP.y + 14} size={7} color={SUB} mono spacing="0.12em">
          {running ? "PLAN STEP" : "COMPLETE"}
        </Label>
      </Depth>

      {/* The plan the agent wrote for itself */}
      <Depth d={1.2}>
        <Label x={262} y={104} anchor="start" size={8} color={GOLD} mono spacing="0.14em">
          AGENT-WRITTEN PLAN
        </Label>
        {REACT_PLAN.map((pl, i) => {
          const done = i < item || !running;
          const active = running && i === item;
          const y = 126 + i * 22;
          return (
            <g key={pl.t}>
              <rect x="262" y={y - 9} width="11" height="11" rx="2" fill={done ? GOLD : BG} stroke={GOLD} strokeOpacity={done || active ? 1 : 0.4} />
              {done && <path d={`M 264.5 ${y - 3.5} L 267 ${y - 1} L 271 ${y - 6}`} fill="none" stroke={BG} strokeWidth="1.6" />}
              {active && live && (
                <g className="ill-spin-local">
                  <circle cx="267.5" cy={y - 3.5} r="9.5" fill="none" stroke={GOLD} strokeDasharray="3 4" />
                </g>
              )}
              <Label x={282} y={y} anchor="start" size={9.5} color={active ? TXT : done ? GOLD : SUB} weight={active ? 700 : 500}>
                {pl.t}
              </Label>
            </g>
          );
        })}
        <Label x={262} y={268} anchor="start" size={8} color={SUB} mono>
          {`TOOL CALLS ${calls} · ELAPSED ${((cs + 1) * 0.31).toFixed(1)}s`}
        </Label>
        <Label x={262} y={282} anchor="start" size={8} color={GOLD} mono weight={700}>
          GUARDRAIL: NO TRADE WITHOUT CIO
        </Label>
      </Depth>

      <TracePanel uid={uid} x={40} y={300} w={420} h={170} title="AGENT TRACE" right={running ? REACT_PHASES[phase] : "IDLE"} lines={lines} live={live && running} max={6} lineH={21} />
    </g>
  );
}

// =========================================================================================
// C. AGENT DEBATE — bull and bear agents argue; a judge agent scores; a human signs
// =========================================================================================
const DEBATE = [
  { who: "bull", t: "▲ BULL  Moat: 41% gross margin, ROIC > 18% for 8y", d: 0.3 },
  { who: "bear", t: "▼ BEAR  Cyclical: orders fell 12% last downturn", d: -0.25 },
  { who: "bull", t: "▲ BULL  Net cash £220M funds 3 years of capex", d: 0.3 },
  { who: "bear", t: "▼ BEAR  Valuation 22× earnings vs 16× peers", d: -0.2 },
  { who: "bull", t: "▲ BULL  Base-case fair value £104 · +28% upside", d: 0.35 },
  { who: "bear", t: "▼ BEAR  Bear case £71 · −12% · thesis risk: orders", d: -0.15 },
  { who: "judge", t: "◆ JUDGE  Verdict BUY · half weight 2.5% · score +0.35", d: 0 },
  { who: "human", t: "✍ CIO  Signature required before any order", d: 0 },
] as const;
const DEBATE_CYCLE = DEBATE.length + 2;
const SPEAKERS = {
  bull: { x: 80, y: 112, glyph: "▲", name: "Bull Agent", sub: "argues for" },
  bear: { x: 420, y: 112, glyph: "▼", name: "Bear Agent", sub: "argues against" },
  judge: { x: 250, y: 104, glyph: "◆", name: "Judge Agent", sub: "scores evidence" },
};
type Speaker = keyof typeof SPEAKERS;

export function AgentDebate({ uid, live, isMotion }: LiveProps) {
  const m = (cls: string) => (isMotion ? cls : "");
  const n = useStep(live, 2000);
  const loopN = Math.floor(n / DEBATE_CYCLE);
  const s = live ? n % DEBATE_CYCLE : DEBATE_CYCLE - 1;
  const cur = Math.min(s, DEBATE.length - 1);
  const msg = DEBATE[cur];
  const target = DEBATE.slice(0, cur + 1).reduce((a, x) => a + x.d, 0);
  const [score] = useTween([target], live, 1100, 500);
  const round = Math.min(3, Math.floor(cur / 2) + 1);
  const SLOTS = 5;
  const first = Math.max(0, cur - (SLOTS - 1));
  const speaking = msg.who === "bull" || msg.who === "bear" ? msg.who : null;

  return (
    <g>
      <Eyebrow y={24}>MULTI-AGENT INVESTMENT DEBATE · KITE PLC</Eyebrow>
      <Ticker
        y={42}
        text={cur < 6 ? `ROUND ${round}/3 · ${msg.who.toUpperCase()} AGENT SPEAKING` : cur === 6 ? "JUDGE AGENT · VERDICT ISSUED" : "HUMAN IN THE LOOP · AWAITING CIO"}
        live={live}
        animKey={`${loopN}-${cur}`}
        size={8.5}
      />

      {/* Agents */}
      {(Object.keys(SPEAKERS) as Speaker[]).map((k) => {
        const sp = SPEAKERS[k];
        const on = msg.who === k;
        return (
          <Depth key={k} d={k === "judge" ? 2.4 : 1.6} lift>
            {on && live && <circle cx={sp.x} cy={sp.y} r="30" fill="none" stroke={GOLD} strokeWidth="1.2" className="ill-ping" />}
            {k === "judge" && (
              <g className={m("ill-spin-local")}>
                <circle cx={sp.x} cy={sp.y} r="34" fill="none" stroke={GOLD} strokeOpacity="0.3" strokeDasharray="10 8" />
              </g>
            )}
            <circle cx={sp.x} cy={sp.y} r="24" fill={BG} stroke={on ? TXT : GOLD} strokeWidth={on ? 2 : 1.3} style={{ transition: "stroke 0.3s" }} />
            <circle cx={sp.x} cy={sp.y} r="24" fill={GOLD} fillOpacity={on ? 0.2 : 0.04} style={{ transition: "fill-opacity 0.3s" }} />
            <Label x={sp.x} y={sp.y + 5} size={14} color={on ? TXT : GOLD}>
              {sp.glyph}
            </Label>
            <Label x={sp.x} y={sp.y + 40} size={10} weight={700} color={on ? TXT : SUB}>
              {sp.name}
            </Label>
            <Label x={sp.x} y={sp.y + 52} size={7.5} color={GOLD} mono>
              {sp.sub}
            </Label>
          </Depth>
        );
      })}

      {/* Each argument flies to the judge */}
      <Depth d={2}>
        {live && speaking && (
          <path
            key={`pk-${n}`}
            d={dia(SPEAKERS[speaking].x, SPEAKERS[speaking].y, 6)}
            fill={GOLD}
            className="ill-send"
            style={v({ "--tx": `${SPEAKERS.judge.x - SPEAKERS[speaking].x}px`, "--ty": `${SPEAKERS.judge.y - SPEAKERS[speaking].y}px` })}
          />
        )}
      </Depth>

      {/* Conviction meter */}
      <Depth d={1}>
        <line x1="100" y1="186" x2="400" y2="186" stroke={GOLD} strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
        {[-1, -0.5, 0, 0.5, 1].map((t) => (
          <line key={t} x1={250 + t * 150} x2={250 + t * 150} y1={t === 0 ? 176 : 180} y2={t === 0 ? 196 : 192} stroke={GOLD} strokeOpacity={t === 0 ? 0.8 : 0.4} />
        ))}
        <line x1="250" y1="186" x2={f(250 + score * 150)} y2="186" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
        <path d={dia(f(250 + score * 150), 186, 7)} fill={TXT} />
        <Label x={92} y={189} anchor="end" size={8} color={SUB} mono>
          BEAR
        </Label>
        <Label x={408} y={189} anchor="start" size={8} color={SUB} mono>
          BULL
        </Label>
        <Label x={250} y={212} size={9} color={GOLD} mono weight={700}>
          {`CONVICTION ${score >= 0 ? "+" : ""}${score.toFixed(2)}`}
        </Label>
      </Depth>

      {/* Transcript */}
      <Depth d={0.6}>
        <Label x={30} y={234} anchor="start" size={8} color={GOLD} mono spacing="0.14em">
          {`DEBATE TRANSCRIPT · ROUND ${round}/3`}
        </Label>
        <Label x={470} y={234} anchor="end" size={8} color={SUB} mono>
          {cur >= 6 ? "SCORED" : "JUDGE SCORING…"}
        </Label>
        {DEBATE.slice(0, cur + 1).map((d, i) => {
          const slot = i - first;
          if (slot < 0) return null;
          const agent = d.who === "bull" || d.who === "bear";
          const side = d.who === "bull" ? 30 : d.who === "bear" ? 200 : 90;
          const bw = agent ? 270 : 320;
          const newest = i === cur;
          const clip = `${uid}-bub`;
          return (
            <g key={`${loopN}-${i}`} style={{ transform: `translateY(${244 + slot * 42}px)`, transition: "transform 0.5s ease" }}>
              <rect x={side} y="0" width={bw} height="30" rx="8" fill={BG} stroke={agent ? GOLD : TXT} strokeOpacity={newest ? 1 : 0.4} />
              {newest && (
                <clipPath id={clip}>
                  <rect x={side + 2} y="2" width={bw - 4} height="26" rx="6" />
                </clipPath>
              )}
              <g clipPath={newest ? `url(#${clip})` : undefined}>
                <TypeLine x={side + 10} y={19} text={d.t} size={8.5} color={d.who === "bear" || d.who === "human" ? TXT : GOLD} typing={live && newest} opacity={newest ? 1 : 0.7} />
              </g>
              {d.who === "human" && <rect x={side} y="0" width={bw} height="30" rx="8" fill="none" stroke={TXT} strokeWidth="1.6" className={live ? "ill-blink" : undefined} />}
            </g>
          );
        })}
      </Depth>
    </g>
  );
}
