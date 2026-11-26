"use client";

import { useEffect, useState, type ReactNode } from "react";

export const DEFAULT_HERO_RATIO = 51; // 51% text : 49% animation (~1.05fr : 1fr)
export const HERO_RATIO_KEY = "simat_hero_ratio";

export const DEFAULT_SECTIONS_RATIO = 42; // 42% text : 58% animation (5/12 : 7/12)
export const SECTIONS_RATIO_KEY = "simat_sections_ratio";

function readRatio(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const n = Number(raw);
    if (Number.isFinite(n) && n >= 30 && n <= 70) return Math.round(n);
  } catch {}
  return fallback;
}

export function readStoredHeroRatio(): number {
  return readRatio(HERO_RATIO_KEY, DEFAULT_HERO_RATIO);
}

export function readStoredSectionsRatio(): number {
  return readRatio(SECTIONS_RATIO_KEY, DEFAULT_SECTIONS_RATIO);
}

export default function HeroRatioGrid({
  text,
  art,
}: {
  text: ReactNode;
  art: ReactNode;
}) {
  const [ratio, setRatio] = useState<number>(DEFAULT_HERO_RATIO);

  useEffect(() => {
    const sync = () => setRatio(readStoredHeroRatio());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("simat-ratio-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("simat-ratio-change", sync);
    };
  }, []);

  const animPct = 100 - ratio;
  const cols = `${ratio}fr ${animPct}fr`;

  return (
    <div
      className="wrap grid items-center gap-10 lg:grid-cols-[var(--hero-cols)] lg:gap-8"
      style={{ ["--hero-cols" as string]: cols }}
    >
      <div>{text}</div>
      <div
        className="px-2 sm:px-8 lg:px-2 mx-auto w-full"
        style={{ maxWidth: `${Math.round(380 + animPct * 4.2)}px` }}
      >
        {art}
      </div>
    </div>
  );
}

export function TwoColRatioGrid({
  text,
  art,
  reverse = false,
}: {
  text: ReactNode;
  art: ReactNode;
  reverse?: boolean;
}) {
  const [ratio, setRatio] = useState<number>(DEFAULT_SECTIONS_RATIO);

  useEffect(() => {
    const sync = () => setRatio(readStoredSectionsRatio());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("simat-sections-ratio-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("simat-sections-ratio-change", sync);
    };
  }, []);

  const animPct = 100 - ratio;
  const cols = reverse ? `${animPct}fr ${ratio}fr` : `${ratio}fr ${animPct}fr`;

  return (
    <div
      className="mt-6 grid items-center gap-12 lg:grid-cols-[var(--sec-cols)] lg:gap-10"
      style={{ ["--sec-cols" as string]: cols }}
    >
      <div className={reverse ? "lg:order-2" : ""}>{text}</div>
      <div className={reverse ? "lg:order-1" : "lg:pl-6"}>{art}</div>
    </div>
  );
}
