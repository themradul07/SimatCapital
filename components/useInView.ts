"use client";

import { useEffect, useState, type RefObject } from "react";

export type InViewState = { inView: boolean; /** where the element last left the screen */ exitedFrom: "top" | "bottom" };

/**
 * Replayable in-view flag. Turns on when `threshold` of the element is visible and turns off only
 * once the element is fully off-screen, so animations replay every time it is scrolled back to,
 * whether scrolling down or up, without flickering at the edge of the viewport.
 */
export function useInView(ref: RefObject<Element | null>, threshold = 0.2): InViewState {
  const [state, setState] = useState<InViewState>({ inView: false, exitedFrom: "bottom" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const vh = e.rootBounds?.height ?? window.innerHeight;
        // Tall elements can never reach a high ratio, so also accept "fills enough of the screen".
        const enough = e.intersectionRatio >= threshold || e.intersectionRect.height >= vh * threshold;
        if (e.isIntersecting && enough) {
          setState((s) => (s.inView ? s : { ...s, inView: true }));
        } else if (!e.isIntersecting) {
          const exitedFrom = e.boundingClientRect.top < 0 ? "top" : "bottom";
          setState((s) => (!s.inView && s.exitedFrom === exitedFrom ? s : { inView: false, exitedFrom }));
        }
      },
      { threshold: [0, threshold, Math.min(1, threshold + 0.1)] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);

  return state;
}
