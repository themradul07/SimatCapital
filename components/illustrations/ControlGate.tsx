"use client";

import { useEffect, useRef, useState } from "react";

/**
 * I-Inst — Control gate. One proposed order at the centre, ringed by the eleven pre-trade
 * checks. Checks light in sequence, the CIO approval ring closes, the order leaves by the
 * single route and is written to the audit trail. Every third cycle a check is uncertain
 * and the order halts: nothing proceeds. Hover a check or a stage to pause on it.
 * Reduced motion: static, completed state.
 */
const STAGES = [
  { label: "Pre-trade checks", text: "Eleven checks run before any order reaches approval." },
  { label: "Bound approval", text: "Each approval covers one exact order; any change cancels it." },
  { label: "Single order route", text: "One authorised service sends orders; research models cannot." },
  { label: "Audit trail", text: "Every proposal, rejection and approval stored with its reasoning." },
];
const HALT_TEXT = "When anything is uncertain, nothing proceeds. The decision is recorded.";

const N = 11;
const CX = 240;
const CY = 220;
const R_CHECK = 104;
const R_APPROVE = 150;
const APPROVE_LEN = Math.ceil(2 * Math.PI * R_APPROVE) + 2;
const STEP_DEG = 360 / N;
const HALT = -1;
const FAIL_AT = 7; // index of the check that turns uncertain on halt cycles

const CHECKS = Array.from({ length: N }, (_, i) => {
  const a = ((-90 + i * STEP_DEG) * Math.PI) / 180;
  return [CX + Math.cos(a) * R_CHECK, CY + Math.sin(a) * R_CHECK] as const;
});

const duration = (s: number) => {
  if (s === 0) return 700;
  if (s >= 1 && s < N) return 190;
  if (s === N) return 450;
  if (s === N + 1 || s === N + 2) return 1100;
  if (s === N + 3) return 2600;
  return 2800; // halt
};

const stageOf = (s: number) => (s >= 1 && s <= N ? 0 : s > N ? s - N : s === HALT ? 0 : null);

export default function ControlGate() {
  const figRef = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [stageHover, setStageHover] = useState<number | null>(null);
  const [checkHover, setCheckHover] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const id = requestAnimationFrame(() => setOn(true));
    return () => {
      mq.removeEventListener("change", sync);
      cancelAnimationFrame(id);
    };
  }, []);

  useEffect(() => {
    const el = figRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = stageHover !== null || checkHover !== null;

  useEffect(() => {
    if (reduced || !on || !inView || paused) return;
    const t = window.setTimeout(() => {
      if (step === HALT || step === N + 3) {
        setCycle((c) => c + 1);
        setStep(0);
      } else if (step === FAIL_AT && cycle % 3 === 2) {
        setStep(HALT);
      } else {
        setStep(step + 1);
      }
    }, step === 0 && cycle === 0 ? 1200 : duration(step));
    return () => window.clearTimeout(t);
  }, [step, cycle, reduced, on, inView, paused]);

  // What is drawn: a hovered stage previews its completed state; reduced motion shows the end.
  const view = stageHover !== null ? N + stageHover : reduced ? N + 3 : step;
  const halted = view === HALT;
  const lit = halted ? FAIL_AT : view >= 1 ? Math.min(view, N) : 0;
  const approved = view >= N + 1;
  const routed = view >= N + 2;
  const recorded = view >= N + 3;
  const scanning = view >= 1 && view <= N;
  const activeStage = stageHover ?? stageOf(view);

  // Arm rotation keeps increasing across cycles so the reset sweeps forward, never back.
  const armIndex = halted ? FAIL_AT : Math.max(0, Math.min(view, N) - 1);
  const armDeg = cycle * 360 + armIndex * STEP_DEG;

  let big: string;
  let sub: string;
  if (checkHover !== null) {
    big = `${String(checkHover + 1).padStart(2, "0")}/${N}`;
    sub = checkHover < lit ? "Check passed" : halted && checkHover === FAIL_AT ? "Uncertain" : "Pending";
  } else if (halted) {
    big = "Halted";
    sub = `Check ${String(FAIL_AT + 1).padStart(2, "0")} uncertain`;
  } else if (recorded) {
    big = "Stored";
    sub = "With its reasoning";
  } else if (routed) {
    big = "Sent";
    sub = "One authorised route";
  } else if (approved) {
    big = "Approved";
    sub = "This exact order";
  } else if (lit > 0) {
    big = `${String(lit).padStart(2, "0")}/${N}`;
    sub = "Pre-trade checks";
  } else {
    big = "Order";
    sub = "Sized and costed";
  }

  const caption = halted && stageHover === null ? HALT_TEXT : STAGES[activeStage ?? 0].text;

  return (
    <figure
      ref={figRef}
      className={`cg relative mx-auto w-full max-w-[560px] ${on ? "on" : ""} ${halted ? "is-halted" : ""}`}
      aria-label="A proposed order passes eleven pre-trade checks, a bound CIO approval and a single order route, and is written to the audit trail. If any check is uncertain, nothing proceeds."
      onPointerLeave={() => {
        setStageHover(null);
        setCheckHover(null);
      }}
    >
      <svg viewBox="0 0 600 440" className="w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id="cg-core-glow">
            <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0" />
          </radialGradient>
          <filter id="cg-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* faint guide rings */}
        <circle cx={CX} cy={CY} r={R_CHECK} fill="none" stroke="var(--gold-accent)" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="1 5" />
        <circle
          cx={CX}
          cy={CY}
          r={R_APPROVE}
          fill="none"
          stroke="var(--gold-accent)"
          strokeOpacity="0.16"
          strokeWidth="1"
          className="draw"
          style={{ ["--len" as string]: APPROVE_LEN, ["--dur" as string]: "1000ms" }}
        />

        {/* CIO approval ring — closes once every check has passed */}
        <circle
          cx={CX}
          cy={CY}
          r={R_APPROVE}
          fill="none"
          stroke="var(--gold-accent)"
          strokeWidth="1.6"
          transform={`rotate(-90 ${CX} ${CY})`}
          className={`cg-approve ${approved ? "is-on" : ""}`}
          style={{ ["--len" as string]: APPROVE_LEN }}
        />
        <g transform={`rotate(45 ${CX} ${CY - R_APPROVE})`}>
          <rect
            x={CX - 7}
            y={CY - R_APPROVE - 7}
            width="14"
            height="14"
            className={`cg-seal ${approved ? "is-on" : ""}`}
            stroke="var(--gold-accent)"
            strokeWidth="1.2"
          />
        </g>

        {/* core glow + order diamond */}
        <circle cx={CX} cy={CY} r="90" fill="url(#cg-core-glow)" className="cg-glow" />
        <path
          d={`M ${CX} ${CY - 72} L ${CX + 72} ${CY} L ${CX} ${CY + 72} L ${CX - 72} ${CY} Z`}
          fill="var(--bg-raised)"
          stroke="var(--gold-accent)"
          strokeWidth="1.2"
          className="cg-core"
        />
        <text x={CX} y={CY + 3} textAnchor="middle" className="cg-big">
          {big}
        </text>
        <text x={CX} y={CY + 21} textAnchor="middle" className="cg-sub">
          {sub}
        </text>

        {/* sweep arm */}
        <g className={`cg-arm ${scanning || halted ? "is-on" : ""}`} style={{ transform: `rotate(${armDeg}deg)` }}>
          <line x1={CX} y1={CY - 78} x2={CX} y2={CY - R_CHECK + 12} strokeWidth="1.4" className="cg-arm-line" />
        </g>

        {/* eleven checks */}
        {CHECKS.map(([x, y], i) => {
          const state = halted && i === FAIL_AT ? "is-fail" : i < lit ? "is-pass" : "";
          return (
            <g
              key={i}
              transform={`rotate(45 ${x} ${y})`}
              className="cg-check-hit"
              onPointerEnter={() => setCheckHover(i)}
              onPointerLeave={() => setCheckHover(null)}
              style={{ opacity: on ? 1 : 0, transition: `opacity 400ms var(--ease) ${400 + i * 50}ms` }}
            >
              <rect x={x - 13} y={y - 13} width="26" height="26" fill="transparent" />
              {state && !reduced && (
                <rect key={`${state}-${cycle}`} x={x - 4} y={y - 4} width="8" height="8" fill="none" strokeWidth="1" className={`cg-ripple ${state}`} />
              )}
              <rect x={x - 4} y={y - 4} width="8" height="8" strokeWidth="1.2" className={`cg-check ${state} ${checkHover === i ? "is-hover" : ""}`} />
            </g>
          );
        })}

        {/* single order route */}
        <line x1={CX + R_APPROVE} y1={CY} x2="536" y2={CY} stroke="var(--gold-accent)" strokeOpacity="0.14" strokeWidth="1" />
        <line
          x1={CX + R_APPROVE}
          y1={CY}
          x2="536"
          y2={CY}
          stroke="var(--gold-accent)"
          strokeWidth="1.4"
          className={`cg-route ${routed ? "is-on" : ""}`}
          style={{ ["--len" as string]: 536 - CX - R_APPROVE }}
        />
        {view === N + 2 && !reduced && (
          <g key={`pulse-${cycle}-${stageHover}`} className="cg-pulse">
            <circle cy={CY} r="8" fill="var(--gold-accent)" opacity="0.4" filter="url(#cg-blur)" />
            <circle cy={CY} r="2.6" fill="#fff6dc" />
          </g>
        )}
        <g transform={`rotate(45 548 ${CY})`}>
          <rect x="541" y={CY - 7} width="14" height="14" stroke="var(--gold-accent)" strokeWidth="1.2" className={`cg-exit ${routed ? "is-on" : ""}`} />
        </g>
        {halted && (
          <g className="cg-block" stroke="var(--status-breach)" strokeWidth="1.4">
            <line x1={CX + R_APPROVE + 20} y1={CY - 7} x2={CX + R_APPROVE + 34} y2={CY + 7} />
            <line x1={CX + R_APPROVE + 34} y1={CY - 7} x2={CX + R_APPROVE + 20} y2={CY + 7} />
          </g>
        )}

        {/* audit trail ledger */}
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1="526"
            x2={i === 2 ? 556 : 570}
            y1={CY + 34 + i * 11}
            y2={CY + 34 + i * 11}
            stroke="var(--gold-accent)"
            strokeWidth="1.2"
            className={`cg-ledger ${recorded || (halted && i === 0) ? "is-on" : ""}`}
            style={{ ["--len" as string]: 46, ["--d" as string]: `${i * 160}ms` }}
          />
        ))}
      </svg>

      {/* Stage stepper */}
      <div aria-hidden className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STAGES.map((s, i) => (
          <button
            key={s.label}
            type="button"
            tabIndex={-1}
            onPointerEnter={() => setStageHover(i)}
            onPointerLeave={() => setStageHover(null)}
            className={`cg-chip ${activeStage === i ? "is-active" : ""} ${halted && i > 0 ? "is-blocked" : ""}`}
          >
            <span className="ill-num text-[13px]">0{i + 1}</span>
            <span className="text-[13px] font-medium">{s.label}</span>
          </button>
        ))}
      </div>
      <figcaption aria-hidden className="mt-4 min-h-[3em] text-[14px] secondary">
        <span key={caption} className="cg-caption-in block">
          {caption}
        </span>
      </figcaption>

      <ul className="sr-only">
        {STAGES.map((s) => (
          <li key={s.label}>
            {s.label}: {s.text}
          </li>
        ))}
        <li>{HALT_TEXT}</li>
      </ul>
    </figure>
  );
}
