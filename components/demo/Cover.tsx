"use client";

import { useEffect, useState } from "react";
import { AutoProgressBar } from "./ui";

/**
 * Slide 01 / Cover for /demo:
 * Features the static PNG emblem (/simat-mark.png) which breaks apart into four pieces,
 * with "Simat Capital" prominently displayed. Automatically previews each quadrant
 * in sequence on load, and stops immediately if interrupted by user hover or click.
 */
const CLIP = [
  "polygon(0 0, 50% 0, 50% 50%, 0 50%)",
  "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
  "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
  "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)",
];

const DIR = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];

const QUADRANTS = [
  { roman: "I", label: "Research", text: "Value-focused, deep work" },
  { roman: "II", label: "Screening", text: "Four Shariah gates" },
  { roman: "III", label: "Controls", text: "11 pre-trade invariants" },
  { roman: "IV", label: "Governance", text: "Human CIO approval" },
];

export default function Cover({
  onStart,
}: {
  onStart?: () => void;
  onJump?: (n: number) => void;
  chapters?: string[];
}) {
  const [split, setSplit] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [interrupted, setInterrupted] = useState(false);

  useEffect(() => {
    // Smoothly break apart into four pieces on load after 350ms
    const timer = setTimeout(() => {
      setSplit(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Sequence auto-play: cycle through quadrants I -> II -> III -> IV
  // Stops automatically if interrupted by user hover, click, or focus
  useEffect(() => {
    if (interrupted || !split) return;
    let current = 0;
    setActive(0);
    const interval = setInterval(() => {
      current = (current + 1) % 4;
      setActive(current);
    }, 4500);
    return () => clearInterval(interval);
  }, [interrupted, split]);

  const handleInterrupt = () => {
    setInterrupted(true);
  };

  const toggleSplit = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleInterrupt();
    setSplit((s) => !s);
  };

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center py-6 sm:py-10 min-h-[75vh] select-none text-center"
      onPointerDown={handleInterrupt}
    >
      {/* Brand Header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--gold-accent)]/80 mb-2.5">
          Investor Overview · Confidential
        </p>
        <h1 className="serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[var(--text-primary)]">
          Simat <span className="em-gold">Capital</span>
        </h1>
        <p className="mt-2.5 text-[14px] text-[var(--text-secondary)] font-light max-w-md mx-auto">
          Shariah-compliant global equity. Institutional discipline.
        </p>
      </div>

      {/* Break-Apart Mark Stage */}
      <div
        className="relative my-4 flex items-center justify-center"
        onMouseEnter={handleInterrupt}
      >
        {/* Ambient Glow */}
        <div
          className="absolute w-[320px] h-[320px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(214, 180, 106, 0.22), rgba(214, 180, 106, 0.05) 50%, transparent 70%)",
            filter: "blur(20px)",
          }}
          aria-hidden
        />

        {/* The 4-Piece Mark Container */}
        <button
          type="button"
          onClick={toggleSplit}
          className="relative w-[260px] sm:w-[300px] aspect-square cursor-pointer focus:outline-none group"
          title={split ? "Click mark to rejoin" : "Click mark to break into four pieces"}
          aria-label="Simat Capital mark: breaks into four pieces"
        >
          {CLIP.map((clip, i) => {
            const dx = DIR[i][0];
            const dy = DIR[i][1];
            const transform = split
              ? `translate(${dx * 20}px, ${dy * 20}px) scale(${active === i ? 1.05 : 1})`
              : "translate(0, 0) scale(1)";

            return (
              <span
                key={i}
                className="absolute inset-0 transition-all duration-700 ease-out will-change-transform"
                style={{
                  clipPath: clip,
                  backgroundImage: "url('/goooood.svg')",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  transform,
                  filter: active === i ? "brightness(1.25) drop-shadow(0 0 12px rgba(214,180,106,0.5))" : undefined,
                  opacity: active !== null && active !== i ? 0.6 : 1,
                }}
                onPointerEnter={() => {
                  handleInterrupt();
                  setActive(i);
                }}
                onPointerLeave={() => {
                  if (interrupted) setActive(null);
                }}
                aria-hidden
              />
            );
          })}
        </button>
      </div>

      {/* Four Quadrant Meaning Chips */}
      <div
        className={`mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto px-4 transition-all duration-500 ${
          split ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        onMouseEnter={handleInterrupt}
      >
        {QUADRANTS.map((q, i) => (
          <div
            key={i}
            onPointerEnter={() => {
              handleInterrupt();
              setActive(i);
            }}
            onClick={() => {
              handleInterrupt();
              setActive(i);
            }}
            className={`relative overflow-hidden rounded-xl border p-2.5 transition-all text-center cursor-pointer ${
              active === i
                ? "border-[var(--gold-accent)] bg-[rgba(214,180,106,0.12)] shadow-[0_0_12px_rgba(214,180,106,0.15)]"
                : "border-[var(--line-soft)] bg-[var(--bg-raised)]/60 hover:border-[var(--gold-accent)]/50"
            }`}
          >
            <span className="serif text-[15px] text-[var(--gold-accent)] font-semibold block">
              {q.roman}. {q.label}
            </span>
            <span className="text-[11px] text-[var(--text-secondary)] block mt-0.5 font-mono">
              {q.text}
            </span>
            {active === i && <AutoProgressBar durationMs={4500} activeKey={active} paused={interrupted} />}
          </div>
        ))}
      </div>

      {/* Action CTA & Navigation Prompt */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onStart}
          className="btn btn-gold text-[13px] px-6 py-2.5 shadow-[0_0_24px_rgba(214,180,106,0.25)] hover:shadow-[0_0_32px_rgba(214,180,106,0.4)] transition-all cursor-pointer"
        >
          Begin Overview →
        </button>
        <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-secondary)]/50">
          {interrupted ? "Paused" : "Auto-playing in sequence"} · Press Space or → to advance
        </p>
      </div>
    </div>
  );
}
