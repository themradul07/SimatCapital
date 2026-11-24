"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "../useInView";

/**
 * I7 — The investment loop. Nine steps on a circle; the arrow from 9 returns to 1.
 * Desktop (lg+): scroll-driven. The figure pins while the reader scrolls, and each stretch
 * of scroll advances one step, 1 → 9; a gold arc and point follow the scroll continuously.
 * Clicking a step scrolls to it. Smaller screens: one pass when in view, then tap to select.
 */
const STEPS = [
  "Signal detected: filing, result or event",
  "Thesis updated",
  "Fair-value range revised",
  "Risk and Shariah tested",
  "Bear case written",
  "Challenge stage: full bear case written; dissent recorded",
  "Sized, costed proposal",
  "CIO approves or rejects",
  "Outcome tracked against the thesis",
];
const WORDS = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const N = STEPS.length;
const STEP_VH = 32; // scroll distance per step, in viewport heights
const NAV_PX = 96;

const R = 150;
const C = 190;
const CIRC = 2 * Math.PI * R;
const pt = (i: number) => {
  const a = (i / N) * Math.PI * 2 - Math.PI / 2;
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
};

export default function InvestmentLoop() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const on = useInView(ref, 0.35);

  const [scrollMode, setScrollMode] = useState(false);
  const [stickyH, setStickyH] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 through the loop (scroll mode)
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  // Scroll mode only where the pinned figure fits the viewport side by side.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 600px)");
    const sync = () => setScrollMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setStickyH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stickyTop = () => Math.max(NAV_PX, (window.innerHeight - (stickyRef.current?.offsetHeight ?? 0)) / 2);

  useEffect(() => {
    if (!scrollMode) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const sticky = stickyRef.current;
      if (!track || !sticky) return;
      const range = track.offsetHeight - sticky.offsetHeight;
      if (range <= 0) return;
      const p = Math.min(1, Math.max(0, (stickyTop() - track.getBoundingClientRect().top) / range));
      setProgress(p);
      setActive(Math.min(N - 1, Math.floor(p * N)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scrollMode, stickyH]);

  // Small screens: one pass through the loop, then rest on step 1.
  useEffect(() => {
    if (scrollMode || !on || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i > N) {
        clearInterval(id);
        return;
      }
      setActive(i % N);
    }, 650);
    return () => clearInterval(id);
  }, [scrollMode, on, touched]);

  const select = (i: number) => {
    if (scrollMode) return;
    setTouched(true);
    setActive(i);
  };

  // Scroll mode: clicking a step scrolls to the middle of its stretch.
  const goTo = (i: number) => {
    if (!scrollMode) return select(i);
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;
    const range = track.offsetHeight - sticky.offsetHeight;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: trackTop - stickyTop() + ((i + 0.5) / N) * range, behavior: reduce ? "auto" : "smooth" });
  };

  // Continuous position for the arc and travelling point.
  const pos = scrollMode ? Math.min(progress * N, N - 0.0001) : active + 0.5;
  const head = (() => {
    const a = (pos / N) * Math.PI * 2 - Math.PI / 2;
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  })();
  const arcLen = (pos / N) * CIRC;
  const done = scrollMode && active === N - 1;

  return (
    <figure ref={ref} aria-label="The investment loop: nine steps from signal to outcome. The last step feeds the first.">
      <div
        ref={trackRef}
        className="relative"
        style={scrollMode && stickyH ? { height: `calc(${stickyH}px + ${N * STEP_VH}vh)` } : undefined}
      >
        <div
          ref={stickyRef}
          className={scrollMode ? "sticky" : ""}
          style={scrollMode ? { top: `max(${NAV_PX}px, calc(50vh - ${stickyH / 2}px))` } : undefined}
        >
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,400px)_1fr]">
            <svg viewBox="0 0 380 380" className="mx-auto w-full max-w-[380px] overflow-visible" aria-hidden>
              <defs>
                <marker id="loop-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10" fill="none" stroke="var(--gold-accent)" strokeWidth="1.4" />
                </marker>
                <filter id="loop-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              <circle cx={C} cy={C} r={R} fill="none" stroke="var(--line-soft)" strokeWidth="1" />

              {/* progress arc, starting at step 1 */}
              <circle
                cx={C}
                cy={C}
                r={R}
                fill="none"
                stroke="var(--gold-accent)"
                strokeWidth="1.6"
                strokeOpacity="0.85"
                strokeDasharray={`${arcLen} ${CIRC}`}
                transform={`rotate(-90 ${C} ${C})`}
                style={{ transition: scrollMode ? "none" : "stroke-dasharray 600ms var(--ease)" }}
              />

              {/* return arc from 9 to 1, slightly outside the circle */}
              <path
                d={`M ${C + (R + 16) * Math.cos(-Math.PI / 2 - 0.62)} ${C + (R + 16) * Math.sin(-Math.PI / 2 - 0.62)} A ${R + 16} ${R + 16} 0 0 1 ${C + (R + 16) * Math.cos(-Math.PI / 2 - 0.12)} ${C + (R + 16) * Math.sin(-Math.PI / 2 - 0.12)}`}
                fill="none"
                stroke="var(--gold-accent)"
                strokeWidth={done ? 1.8 : 1.2}
                strokeOpacity={done || !scrollMode ? 1 : 0.45}
                markerEnd="url(#loop-arrow)"
                style={{ transition: "stroke-opacity 500ms var(--ease), stroke-width 500ms var(--ease)" }}
              />

              {/* travelling point */}
              <g transform={`translate(${head.x} ${head.y})`} style={{ transition: scrollMode ? "none" : "transform 600ms var(--ease)" }}>
                <circle r="10" fill="var(--gold-accent)" opacity="0.4" filter="url(#loop-blur)" />
                <circle r="3" fill="#fff6dc" />
              </g>

              {STEPS.map((_, i) => {
                const { x, y } = pt(i);
                const isOn = i === active;
                const passed = scrollMode && i < active;
                return (
                  <g
                    key={i}
                    transform={`translate(${x} ${y})`}
                    onClick={() => goTo(i)}
                    style={{ cursor: "pointer" }}
                  >
                    {isOn && (
                      <g transform="rotate(45)">
                        <rect key={`rip-${active}`} x={-12} y={-12} width={24} height={24} fill="none" stroke="var(--gold-accent)" className="loop-ripple" />
                      </g>
                    )}
                    <g className="loop-node" style={{ transform: isOn ? "scale(1.15)" : "none" }}>
                      <rect
                        x={-12}
                        y={-12}
                        width={24}
                        height={24}
                        transform="rotate(45)"
                        fill={isOn ? "var(--gold-accent)" : passed ? "#2a2316" : "var(--bg-base)"}
                        stroke="var(--gold-accent)"
                        strokeOpacity={isOn || passed ? 1 : 0.55}
                        strokeWidth="1.2"
                        style={{ transition: "fill 400ms var(--ease), stroke-opacity 400ms var(--ease)" }}
                      />
                      <text
                        textAnchor="middle"
                        dy="5"
                        fontSize="14"
                        fill={isOn ? "var(--bg-base)" : "var(--text-primary)"}
                        style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, transition: "fill 400ms var(--ease)" }}
                      >
                        {i + 1}
                      </text>
                    </g>
                  </g>
                );
              })}
              <text
                key={active}
                x={C}
                y={C + 8}
                textAnchor="middle"
                fontSize="64"
                fill="var(--gold-accent)"
                className="loop-num"
                style={{ fontFamily: "var(--font-cormorant)", fontVariantNumeric: "tabular-nums" }}
              >
                {active + 1}
              </text>
              <text x={C} y={C + 36} textAnchor="middle" fontSize="14" fill="var(--text-secondary)" style={{ fontFamily: "var(--font-inter)" }}>
                of nine
              </text>
            </svg>

            <div>
              <ol className="space-y-0.5">
                {STEPS.map((s, i) => {
                  const isOn = i === active;
                  const passed = scrollMode && i < active;
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        onMouseEnter={() => select(i)}
                        onFocus={() => select(i)}
                        onClick={() => goTo(i)}
                        aria-current={isOn ? "step" : undefined}
                        className="loop-row relative flex w-full gap-4 px-3 py-2.5 text-left transition-colors duration-300"
                        style={{ background: isOn ? "rgba(214,180,106,0.07)" : "transparent" }}
                      >
                        <span
                          aria-hidden
                          className="absolute top-0 bottom-0 left-0 w-[2px] origin-top transition-transform duration-500"
                          style={{ background: "var(--gold-accent)", transform: isOn ? "scaleY(1)" : "scaleY(0)" }}
                        />
                        <span className="ill-num w-5 shrink-0 text-[17px]">{i + 1}</span>
                        <span
                          className="text-[15px] transition-colors duration-300"
                          style={{ color: isOn ? "var(--text-primary)" : passed ? "rgba(243,236,220,0.72)" : "var(--text-secondary)" }}
                        >
                          {s}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              <p
                className="mt-5 flex items-center gap-3 pl-3 text-[14px] transition-opacity duration-500"
                style={{ color: "var(--gold-accent)", opacity: !scrollMode || done ? 1 : 0.55 }}
              >
                <span aria-hidden>↺</span> 9 returns to 1. The last step feeds the first.
              </p>
              {scrollMode && (
                <div className="mt-6 ml-3 h-px max-w-[320px]" style={{ background: "var(--line-soft)" }} aria-hidden>
                  <div className="h-px origin-left" style={{ background: "var(--gold-accent)", transform: `scaleX(${progress})` }} />
                </div>
              )}
              <p className="sr-only">Step {WORDS[active]} of nine selected.</p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
