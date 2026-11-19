"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";

/** Counts from 0 to `to` each time it is scrolled into view (down or up). */
export default function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const { inView } = useInView(ref, 0.4);

  useEffect(() => {
    if (!inView) {
      // Reset while off-screen so the next visit counts up again
      const r = requestAnimationFrame(() => setN(0));
      return () => cancelAnimationFrame(r);
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = reduced ? 1 : Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {n}
    </span>
  );
}
