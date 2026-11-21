"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

const ThreadContext = createContext<number>(0);

/**
 * One chapter of the Home story. Renders its eyebrow and, on wide screens,
 * the checkpoint diamond on the story thread line that only glows when the
 * travelling glowing dot has reached or passed it.
 */
export default function Chapter({
  id,
  eyebrow,
  children,
  className = "",
  thread = true,
}: {
  id?: string;
  eyebrow: string;
  children: ReactNode;
  className?: string;
  thread?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const indicatorY = useContext(ThreadContext);
  const [checkpointY, setCheckpointY] = useState<number | null>(null);

  useEffect(() => {
    const updateCheckpoint = () => {
      if (ref.current) {
        // The checkpoint sits at top-[88px] within this section
        setCheckpointY(ref.current.offsetTop + 88);
      }
    };
    updateCheckpoint();
    window.addEventListener("resize", updateCheckpoint, { passive: true });
    return () => window.removeEventListener("resize", updateCheckpoint);
  }, []);

  // Only glow when the travelling glowing dot has reached or passed this checkpoint
  const isPassed = checkpointY !== null && indicatorY >= checkpointY;

  return (
    <section ref={ref} id={id} className={`section ${className}`} aria-labelledby={id ? `${id}-eyebrow` : undefined}>
      {thread && (
        <span
          aria-hidden
          className="thread-x absolute top-[88px] hidden h-[9px] w-[9px] -translate-x-1/2 rotate-45 border xl:block"
          style={{
            borderColor: isPassed ? "var(--gold-accent)" : "var(--line-soft)",
            background: isPassed ? "var(--gold-accent)" : "var(--bg-base)",
            boxShadow: isPassed ? "0 0 10px var(--gold-accent), 0 0 18px var(--gold-glow)" : "none",
            transition: "background-color 250ms var(--ease), border-color 250ms var(--ease), box-shadow 250ms var(--ease)",
          }}
        />
      )}
      <div className="wrap">
        <p id={id ? `${id}-eyebrow` : undefined} className="eyebrow">
          {eyebrow}
        </p>
        {children}
      </div>
    </section>
  );
}

/**
 * The fine gold vertical line that runs down the left margin from Chapter I to Chapter VII,
 * with a single glowing golden diamond dot that travels down and up in real time with the scroll.
 */
export function StoryThread({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorY, setIndicatorY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      // Viewport reading focus line: ~38% down the screen
      const targetScreenY = window.innerHeight * 0.38;
      const currentRelativeY = targetScreenY - rect.top;

      const minY = 88; // first chapter checkpoint
      const maxY = containerHeight - 120; // last chapter checkpoint

      if (rect.bottom > targetScreenY && rect.top < window.innerHeight) {
        setVisible(true);
        const clampedY = Math.max(minY, Math.min(maxY, currentRelativeY));
        setIndicatorY(clampedY);
      } else if (rect.top >= window.innerHeight) {
        setVisible(false);
        setIndicatorY(0);
      } else {
        setVisible(false);
        setIndicatorY(maxY);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ThreadContext.Provider value={indicatorY}>
      <div ref={containerRef} className="relative">
        {/* Continuous thread line */}
        <span
          aria-hidden
          className="thread-x absolute bottom-[120px] top-[88px] hidden w-px xl:block"
          style={{ background: "var(--line)" }}
        />

        {/* The glowing golden diamond that travels down and up the line with scroll */}
        <span
          aria-hidden
          className="thread-x pointer-events-none absolute top-0 hidden xl:block z-20"
          style={{
            width: "13px",
            height: "13px",
            borderColor: "var(--gold-accent)",
            background: "var(--gold-accent)",
            borderWidth: "1px",
            borderStyle: "solid",
            transform: `translate3d(-50%, ${indicatorY - 6.5}px, 0) rotate(45deg)`,
            boxShadow: "0 0 14px var(--gold-accent), 0 0 28px var(--gold-glow), 0 0 45px var(--gold-glow-soft)",
            opacity: visible ? 1 : 0,
            transition: "opacity 300ms var(--ease), transform 50ms linear",
          }}
        />

        {children}
      </div>
    </ThreadContext.Provider>
  );
}
