"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * One-shot in-view flag. Turns on the first time `threshold` of the element is visible and stays on,
 * so each illustration animates once. Under prefers-reduced-motion, globals.css removes all transitions,
 * so the final state appears instantly.
 */
export function useInView(ref: RefObject<Element | null>, threshold = 0.25): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const vh = e.rootBounds?.height ?? window.innerHeight;
        if (e.isIntersecting && (e.intersectionRatio >= threshold || e.intersectionRect.height >= vh * threshold)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: [0, threshold] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return inView;
}
