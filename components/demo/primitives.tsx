"use client";

import { createContext, useContext, useEffect, useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/components/useInView";
import { chapter } from "./content";

/* ------------------------------ hooks ------------------------------ */

const SeenContext = createContext(false);

/** True once the enclosing chapter has scrolled into view. Chapters animate once. */
export const useSeen = () => useContext(SeenContext);

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(motionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** prefers-reduced-motion. Server snapshot assumes motion is allowed. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
}

/**
 * Runs `fn` every `ms` while `active`. The callback can change between renders without restarting the timer.
 * Under reduced motion nothing auto-advances (brief, 4: no auto-advancing content when motion is off).
 */
export function useTicker(active: boolean, ms: number, fn: () => void) {
  const reduced = useReducedMotion();
  const saved = useRef(fn);
  useEffect(() => {
    saved.current = fn;
  });
  useEffect(() => {
    if (!active || reduced) return;
    const id = window.setInterval(() => saved.current(), ms);
    return () => window.clearInterval(id);
  }, [active, ms, reduced]);
}

export const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/* ------------------------------ text ------------------------------ */

/** Word-by-word reveal. Returns the delay after the last word, so the answer can follow the question. */
export function Words({ text, start = 0, step = 38 }: { text: string; start?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i} className="dm-w" style={d(start + i * step)}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/* ------------------------------ chapter frame ------------------------------ */

/**
 * One chapter of the walkthrough: eyebrow, the rhetorical question (shown first), then the answer
 * (headline, body) and the interactive visual. Brief, B: "one rhetorical question (shown first, then answered)".
 */
export function Chapter({
  id,
  children,
  aside,
  wide = false,
}: {
  id: string;
  children?: ReactNode;
  aside?: ReactNode;
  wide?: boolean;
}) {
  const meta = chapter(id);
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, 0.16);
  const qWords = meta.question ? meta.question.split(" ").length : 0;
  const answerAt = meta.question ? 260 + qWords * 38 + 420 : 200;

  return (
    <section
      ref={ref}
      id={meta.id}
      data-chapter={meta.id}
      aria-labelledby={`${meta.id}-h`}
      className={`dm-chapter ${seen ? "dm-seen" : ""}`}
      style={{ ["--acc" as string]: meta.accent }}
    >
      <SeenContext.Provider value={seen}>
        <div className="wrap">
          <div className={wide ? "" : "grid gap-12 lg:grid-cols-12 lg:gap-16"}>
            <header className={wide ? "max-w-[820px]" : "lg:col-span-5"}>
              <p className="dm-kicker dm-x">
                <span className="num">{meta.n}</span>
                <span className="bar" aria-hidden />
                <span>{meta.eyebrow}</span>
              </p>

              {meta.question && (
                <p className="dm-question mt-7">
                  <Words text={meta.question} start={260} />
                </p>
              )}

              <div className={meta.question ? "mt-9" : "mt-7"}>
                {meta.question && (
                  <p className="dm-answer dm-x" style={d(answerAt)}>
                    Our answer
                  </p>
                )}
                <h2 id={`${meta.id}-h`} className="h2 dm-x mt-4" style={d(answerAt + 120)}>
                  {meta.headline}
                </h2>
                {meta.body && (
                  <p className="body dm-x mt-5" style={d(answerAt + 240)}>
                    {meta.body}
                  </p>
                )}
                {aside && (
                  <div className="dm-x mt-8" style={d(answerAt + 360)}>
                    {aside}
                  </div>
                )}
              </div>
            </header>

            {children && (
              <div className={`dm-x ${wide ? "mt-14" : "lg:col-span-7 lg:pt-2"}`} style={d(answerAt + 300)}>
                {children}
              </div>
            )}
          </div>
        </div>
      </SeenContext.Provider>
    </section>
  );
}

/* ------------------------------ small parts ------------------------------ */

export function Pill({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span className="dm-pill" style={{ ["--c" as string]: color }}>
      {children}
    </span>
  );
}

/** The flat Simat mark (same path as components/site/Logo.tsx), drawn into an existing <svg>. */
export function MarkPath({ stroke = "var(--gold-accent)", width = 9 }: { stroke?: string; width?: number }) {
  return (
    <g transform="rotate(45 50 50)" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="square" strokeLinejoin="miter">
      <path d="M80 40 H100 V100 H0 V0 H62 V64 H24 V24 H43 V44" />
    </g>
  );
}

export function Diamond({ size = 10, color, filled = true }: { size?: number; color: string; filled?: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        transform: "rotate(45deg)",
        background: filled ? color : "transparent",
        border: `1.5px solid ${color}`,
        transition: "background-color 400ms var(--ease), border-color 400ms var(--ease)",
      }}
    />
  );
}
