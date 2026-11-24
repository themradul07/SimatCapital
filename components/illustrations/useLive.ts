"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small hooks that drive the "live" enhanced illustrations.
 * Every hook is inert when `live` is false (motion off, off-screen or reduced motion),
 * so the static render is always a meaningful final state.
 */

/** Monotonic step counter that advances every `ms` while live. */
export function useStep(live: boolean, ms: number): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setN((k) => k + 1), ms);
    return () => clearInterval(t);
  }, [live, ms]);
  return n;
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Tweens an array of numbers toward `target` with requestAnimationFrame.
 * When not live it returns `target` directly (no animation).
 */
export function useTween(target: number[], live: boolean, ms = 900, delay = 0): number[] {
  const [vals, setVals] = useState(target);
  const cur = useRef(target);
  const key = target.join("|");

  useEffect(() => {
    if (!live) {
      cur.current = target;
      return;
    }
    const from = cur.current.length === target.length ? cur.current : target;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / ms);
      const e = ease(p);
      const next = target.map((t, i) => from[i] + (t - from[i]) * e);
      cur.current = next;
      setVals(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, live, ms, delay]);

  return live ? vals : target;
}

export interface Spawned<T> {
  id: number;
  item: T;
}

/** Spawns a new item every `ms` while live, keeping the most recent `keep`. */
export function useSpawner<T>(live: boolean, ms: number, make: (n: number) => T, keep = 6): Spawned<T>[] {
  const [items, setItems] = useState<Spawned<T>[]>([]);
  const makeRef = useRef(make);
  useEffect(() => {
    makeRef.current = make;
  });
  useEffect(() => {
    if (!live) return;
    let n = 0;
    const spawn = () => {
      n += 1;
      const id = n;
      setItems((prev) => [...prev, { id, item: makeRef.current(id) }].slice(-keep));
    };
    spawn();
    const t = setInterval(spawn, ms);
    return () => clearInterval(t);
  }, [live, ms, keep]);
  return live ? items : [];
}

/** Deterministic pseudo-random in [0, 1) from integers (integer hash, identical on server and client). */
export const rand = (n: number, k = 0) => {
  let h = Math.imul((n | 0) ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul((k | 0) + 0x632be5ab, 0xc2b2ae35);
  h = Math.imul(h ^ (h >>> 16), 0x7feb352d);
  h = Math.imul(h ^ (h >>> 15), 0x846ca68b);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

/** Deterministic short hex digest for a sequence number. */
export const hex = (n: number, len = 4) => {
  let out = "";
  for (let i = 0; i < len; i++) out += Math.floor(rand(n, i + 3) * 16).toString(16);
  return out;
};
