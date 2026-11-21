"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";

/**
 * I1 — Hero mark. The mark at the centre of three concentric diamonds, with four steps on
 * the outer diamond's points. Diamonds draw in on load, then a point of light travels the
 * outer diamond — Researched → Screened → Approved → Recorded — lighting each step in turn.
 * Hovering or focusing a step pauses the cycle on it and shows what that step means.
 * Reduced motion: static, final state; hover still works.
 */
const STEPS = [
  { label: "Researched", text: "Thesis, fair-value range and bear case, written before any order." },
  { label: "Screened", text: "Shariah screen and eleven pre-trade checks, stored with the decision." },
  { label: "Approved", text: "The CIO approves one exact order. Any change cancels it." },
  { label: "Recorded", text: "Every decision and its outcome, tracked against the thesis." },
];

const C = 250;
const RADII = [165, 118, 74];
const OUTER = RADII[0];
const PERIMETER = OUTER * Math.SQRT2 * 4;
const SEG = 90; // comet tail length
const PERIOD = 11000; // ms per full loop
const DEPTH = [3, 6, 9]; // parallax px per ring
const pct = (v: number) => `${(v / 500) * 100}%`;

const POINTS = [
  [C, C - OUTER],
  [C + OUTER, C],
  [C, C + OUTER],
  [C - OUTER, C],
] as const;

const LABEL_POS: CSSProperties[] = [
  { left: "50%", top: pct(C - OUTER), transform: "translate(-50%, calc(-100% - 14px))" },
  { left: pct(C + OUTER), top: "50%", transform: "translate(14px, -50%)" },
  { left: "50%", top: pct(C + OUTER), transform: "translate(-50%, 14px)" },
  { left: pct(C - OUTER), top: "50%", transform: "translate(calc(-100% - 14px), -50%)" },
];

const diamond = (r: number) => `M ${C} ${C - r} L ${C + r} ${C} L ${C} ${C + r} L ${C - r} ${C} Z`;
const parallax = (d: number): CSSProperties => ({
  transform: `translate(calc(var(--mx, 0) * ${d}px), calc(var(--my, 0) * ${d}px))`,
});

export default function HeroMark() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const figRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cometRefs = useRef<(SVGPathElement | null)[]>([]);
  const headRef = useRef<SVGGElement>(null);
  const progress = useRef(0);
  const hoverRef = useRef<number | null>(null);
  const activeRef = useRef<number | null>(null);

  const [on, setOn] = useState(false);
  const [live, setLive] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  const [visited, setVisited] = useState(0); // bumps on each arrival, retriggers the ripple

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const id = requestAnimationFrame(() => setOn(true));
    const t = window.setTimeout(() => setLive(true), 1100);
    return () => {
      mq.removeEventListener("change", sync);
      cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const el = figRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reduced motion: hold on the first step, no travelling light.
  useEffect(() => {
    if (reduced && activeRef.current === null) {
      activeRef.current = 0;
      setActive(0);
    }
  }, [reduced]);

  useEffect(() => {
    if (!live || reduced || !inView) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const h = hoverRef.current;
      let p = progress.current;

      if (h === null) {
        p = (p + (PERIMETER * dt) / PERIOD) % PERIMETER;
      } else {
        // glide (shortest way round) to the hovered vertex
        const target = (h * PERIMETER) / 4;
        let diff = (((target - p) % PERIMETER) + PERIMETER) % PERIMETER;
        if (diff > PERIMETER / 2) diff -= PERIMETER;
        p = (p + diff * Math.min(1, dt / 140) + PERIMETER) % PERIMETER;
      }
      progress.current = p;

      const offset = String(SEG - p);
      cometRefs.current.forEach((el) => el?.setAttribute("stroke-dashoffset", offset));
      const pt = pathRef.current?.getPointAtLength(p);
      if (pt && headRef.current) headRef.current.setAttribute("transform", `translate(${pt.x} ${pt.y})`);

      const a = h ?? Math.floor((p / PERIMETER) * 4) % 4;
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
        setVisited((v) => v + 1);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, reduced, inView]);

  const focusStep = (i: number | null) => {
    hoverRef.current = i;
    if (i !== null && (reduced || !live)) {
      activeRef.current = i;
      setActive(i);
    }
  };

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduced || e.pointerType === "touch") return;
    const el = figRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onLeave = () => {
    figRef.current?.style.setProperty("--mx", "0");
    figRef.current?.style.setProperty("--my", "0");
    focusStep(null);
  };

  const shown = active ?? 0;
  const spokeLen = OUTER - 70;

  return (
    <figure
      ref={figRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`hm relative mx-auto w-full max-w-[480px] ${on ? "on" : ""} ${live ? "is-live" : ""}`}
      aria-label="The Simat Capital mark at the centre of three diamonds: researched, screened, approved, recorded."
    >
      <div className="relative">
      <svg viewBox="0 0 500 500" className="w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.38" />
            <stop offset="55%" stopColor="var(--gold-accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0" />
          </radialGradient>
          <filter id={`${uid}-blur`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          {/* keeps the rotating tick ring clear of the four labels */}
          <mask id={`${uid}-mask`}>
            <rect width="500" height="500" fill="#fff" />
            {[0, 1, 2, 3].map((i) => {
              const a = (i * Math.PI) / 2 - Math.PI / 2;
              return <circle key={i} cx={C + Math.cos(a) * 205} cy={C + Math.sin(a) * 205} r="48" fill="#000" />;
            })}
          </mask>
        </defs>

        {/* instrument ring */}
        <g mask={`url(#${uid}-mask)`} style={{ opacity: on ? 1 : 0, transition: "opacity 1200ms var(--ease) 600ms" }}>
          <g className="hm-spin">
            <circle cx={C} cy={C} r="205" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="1 7" />
          </g>
          <g className="hm-spin-rev">
            <circle cx={C} cy={C} r="222" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.16" strokeWidth="1" strokeDasharray="60 140 6 120" />
          </g>
        </g>

        {/* breathing glow behind the mark */}
        <g style={parallax(12)} className="hm-par">
          <circle cx={C} cy={C} r="110" fill={`url(#${uid}-glow)`} className="hm-glow" />
        </g>

        {/* inner rings */}
        {RADII.slice(1).map((r, j) => {
          const i = j + 1;
          return (
            <g key={r} style={parallax(DEPTH[i])} className="hm-par">
              <path
                d={diamond(r)}
                fill="none"
                stroke="var(--gold-accent)"
                strokeOpacity={0.6 - i * 0.12}
                strokeWidth="1.2"
                className="draw"
                style={{ ["--len" as string]: Math.ceil(r * Math.SQRT2 * 4) + 2, ["--dur" as string]: "800ms", ["--d" as string]: `${i * 100}ms` }}
              />
              {i === 1 && (
                <path d={diamond(r)} fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="2 14" className="hm-march" />
              )}
            </g>
          );
        })}

        {/* outer ring, spokes, comet and step nodes move together */}
        <g style={parallax(DEPTH[0])} className="hm-par">
          {POINTS.map(([x, y], i) => {
            const dx = Math.sign(x - C);
            const dy = Math.sign(y - C);
            const d = `M ${C + dx * 64} ${C + dy * 64} L ${C + dx * (OUTER - 6)} ${C + dy * (OUTER - 6)}`;
            return (
              <g key={i}>
                <path d={d} stroke="var(--gold-accent)" strokeOpacity="0.07" strokeWidth="1" />
                <path
                  d={d}
                  stroke="var(--gold-accent)"
                  strokeWidth="1.2"
                  className={`hm-spoke ${active === i ? "is-active" : ""}`}
                  style={{ ["--len" as string]: spokeLen }}
                />
              </g>
            );
          })}

          <path
            ref={pathRef}
            d={diamond(OUTER)}
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity={0.6}
            strokeWidth="1.2"
            className="draw"
            style={{ ["--len" as string]: Math.ceil(PERIMETER) + 2, ["--dur" as string]: "800ms", ["--d" as string]: "0ms" }}
          />

          {!reduced && (
            <g className="hm-comet">
              <path
                ref={(el) => {
                  cometRefs.current[0] = el;
                }}
                d={diamond(OUTER)}
                fill="none"
                stroke="var(--gold-accent)"
                strokeWidth="7"
                strokeOpacity="0.55"
                strokeLinecap="round"
                strokeDasharray={`${SEG} ${PERIMETER - SEG}`}
                strokeDashoffset={SEG}
                filter={`url(#${uid}-blur)`}
              />
              <path
                ref={(el) => {
                  cometRefs.current[1] = el;
                }}
                d={diamond(OUTER)}
                fill="none"
                stroke="#f6e3b0"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray={`${SEG} ${PERIMETER - SEG}`}
                strokeDashoffset={SEG}
              />
              <g ref={headRef} transform={`translate(${C} ${C - OUTER})`}>
                <circle r="9" fill="var(--gold-accent)" opacity="0.35" filter={`url(#${uid}-blur)`} />
                <circle r="2.6" fill="#fff6dc" />
              </g>
            </g>
          )}

          {POINTS.map(([x, y], i) => (
            <g
              key={i}
              transform={`rotate(45 ${x} ${y})`}
              className="hm-node-hit"
              onPointerEnter={() => focusStep(i)}
              style={{ opacity: on ? 1 : 0, transition: `opacity 500ms var(--ease) ${700 + i * 80}ms` }}
            >
              <rect x={x - 14} y={y - 14} width="28" height="28" fill="transparent" />
              {active === i && live && !reduced && (
                <rect key={visited} x={x - 4.5} y={y - 4.5} width="9" height="9" fill="none" stroke="var(--gold-accent)" strokeWidth="1" className="hm-ripple" />
              )}
              <rect
                x={x - 4.5}
                y={y - 4.5}
                width="9"
                height="9"
                stroke="var(--gold-accent)"
                strokeWidth="1.2"
                className={`hm-node ${active === i ? "is-active" : ""}`}
              />
            </g>
          ))}
        </g>

        {/* the mark */}
        <g style={{ ...parallax(12), opacity: on ? 1 : 0, transition: "opacity 600ms var(--ease) 300ms, transform 600ms var(--ease)" }}>
          <g className="mark-pulse">
            <g className="hm-mark">
              <image href="/simat-mark.png" x={C - 50} y={C - 50} width={100} height={100} preserveAspectRatio="xMidYMid meet" />
            </g>
          </g>
        </g>
      </svg>

      {STEPS.map((s, i) => (
        <button
          key={s.label}
          type="button"
          tabIndex={-1}
          aria-hidden
          onPointerEnter={() => focusStep(i)}
          onFocus={() => focusStep(i)}
          onBlur={() => focusStep(null)}
          className={`ill-label hm-label absolute hidden whitespace-nowrap sm:block ${active === i ? "is-active" : ""}`}
          style={{ ...LABEL_POS[i], opacity: on ? undefined : 0, transitionDelay: on ? undefined : `${820 + i * 80}ms` }}
        >
          {s.label}
        </button>
      ))}
      </div>

      {/* Step detail */}
      <figcaption aria-hidden className="hm-caption mx-auto mt-4 hidden max-w-[34ch] text-center sm:block">
        <span key={shown} className="hm-caption-in block">
          <span className="ill-num mr-2 text-[12px]">0{shown + 1} / 04</span>
          <span className="text-[14px] secondary">{STEPS[shown].text}</span>
        </span>
      </figcaption>

      {/* Mobile: labels as a row beneath, so nothing clips at 360px */}
      <div aria-hidden className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:hidden">
        {STEPS.map((s, i) => (
          <span key={s.label} className={`ill-label hm-label inline-flex items-center gap-3 ${active === i ? "is-active" : ""}`}>
            {s.label}
            {i < STEPS.length - 1 && <span className="dia dia-outline !h-[5px] !w-[5px]" />}
          </span>
        ))}
      </div>
      <ul className="sr-only">
        {STEPS.map((s) => (
          <li key={s.label}>
            {s.label}: {s.text}
          </li>
        ))}
      </ul>
    </figure>
  );
}
