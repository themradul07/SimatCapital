"use client";

import { useEffect, useState } from "react";
import { Kicker } from "./ui";

/**
 * Cover slide. The Simat mark assembles, then breaks into four pieces — one for each part of
 * how the firm works. Hover or focus a piece to read it; click the mark to put it back together.
 * Reduced motion: the pieces sit apart from the start, with no travel.
 */
const PIECES = [
  { label: "Value-focused research", text: "A thesis, fair-value range and bear case are written before any order." },
  { label: "Systematic process", text: "Eleven pre-trade checks and hard position and sector limits." },
  { label: "Shariah screening", text: "MSCI Islamic method, re-screened as soon as new results come out." },
  { label: "A person decides", text: "The CIO approves every trade. Nothing is sold automatically." },
];

// top-left, top-right, bottom-right, bottom-left
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

const FACTS = [
  { v: "11–14", l: "companies in a concentrated portfolio" },
  { v: "3", l: "markets: the UK, the US and Japan" },
  { v: "2", l: "strategies: Flagship and Catalyst" },
  { v: "100%", l: "of trades approved by a person" },
];

type Phase = "scattered" | "whole" | "split";

export default function Cover({ onStart, onJump, chapters }: { onStart: () => void; onJump: (n: number) => void; chapters: string[] }) {
  const [phase, setPhase] = useState<Phase>("scattered");
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const a = window.setTimeout(() => setPhase(reduced ? "split" : "whole"), reduced ? 0 : 120);
    const b = window.setTimeout(() => setPhase("split"), reduced ? 0 : 1900);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, []);

  const split = phase === "split";
  const toggle = () => {
    setActive(null);
    setPhase(split ? "whole" : "split");
  };

  return (
    <div className="flex flex-col gap-10 md:gap-12">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        {/* Words */}
        <div className="flex flex-col gap-6">
          <Kicker>Simat Capital · Investor overview</Kicker>
          <h1 className="d-title !text-[clamp(40px,5.2vw,68px)] !font-semibold !leading-[1.04]">
            Investing with Purpose.
            <br />
            <span className="em-gold">Delivering with Precision.</span>
          </h1>
          <p className="d-rise max-w-[620px] text-[17px] leading-relaxed md:text-[19px]" style={{ color: "var(--text-primary)", ["--i" as string]: 1 }}>
            Simat Capital is an actively managed, Shariah-compliant global equity firm. We combine value-focused research, a systematic process and
            Shariah screening, and every investment decision is made by a person.
          </p>
          <p className="d-rise text-[14px] tracking-[0.04em]" style={{ color: "var(--gold-accent)", ["--i" as string]: 2 }}>
            Stewardship over short-term returns · Integrity in every report · Transparency in how we think
          </p>
          <div className="d-rise flex flex-wrap items-center gap-4" style={{ ["--i" as string]: 3 }}>
            <button type="button" onClick={onStart} className="btn btn-gold">
              Begin the overview <span aria-hidden>›</span>
            </button>
            <span className="text-[13px] secondary">About ten minutes · arrow keys or swipe to move</span>
          </div>
        </div>

        {/* The mark, in four pieces */}
        <figure className={`cv-fig cv-${phase}`} aria-label="The Simat Capital mark, broken into four pieces: research, process, Shariah screening and a person's decision.">
          <div className="cv-glow" aria-hidden />
          <button
            type="button"
            className="cv-mark"
            onClick={toggle}
            aria-label={split ? "Put the mark back together" : "Break the mark into its four parts"}
          >
            {CLIP.map((clip, i) => (
              <span
                key={i}
                className={`cv-piece ${active === i ? "is-on" : ""} ${active !== null && active !== i ? "is-dim" : ""}`}
                style={{
                  clipPath: clip,
                  ["--dx" as string]: DIR[i][0],
                  ["--dy" as string]: DIR[i][1],
                  ["--i" as string]: i,
                }}
                onPointerEnter={() => split && setActive(i)}
                onPointerLeave={() => setActive(null)}
                aria-hidden
              />
            ))}
          </button>

          {PIECES.map((p, i) => (
            <button
              key={p.label}
              type="button"
              className={`cv-label cv-label-${i} ${active === i ? "is-on" : ""}`}
              style={{ ["--i" as string]: i }}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              tabIndex={split ? 0 : -1}
            >
              <span className="cv-num">{["I", "II", "III", "IV"][i]}</span>
              <span className="cv-name">{p.label}</span>
              <span className="cv-text">{p.text}</span>
            </button>
          ))}

          <figcaption className="cv-hint">{split ? "Hover a piece · click the mark to rejoin it" : "Click the mark to break it apart"}</figcaption>
        </figure>
      </div>

      {/* Key facts */}
      <dl className="cv-facts d-rise" style={{ ["--i" as string]: 4 }}>
        {FACTS.map((f) => (
          <div key={f.l} className="cv-fact">
            <dt className="serif text-[34px] leading-none md:text-[40px]" style={{ color: "var(--gold-accent)" }}>
              {f.v}
            </dt>
            <dd className="text-[13.5px] leading-snug secondary">{f.l}</dd>
          </div>
        ))}
      </dl>

      {/* What's inside */}
      <nav className="d-rise flex flex-col gap-3" style={{ ["--i" as string]: 5 }} aria-label="In this overview">
        <p className="d-label">In this overview</p>
        <ol className="cv-agenda">
          {chapters.map((t, i) => (
            <li key={t}>
              <button type="button" onClick={() => onJump(i + 1)}>
                <span className="cv-agenda-n">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <p className="text-[12.5px] leading-relaxed secondary">
        Both strategies currently run on the founder&apos;s own capital. Simat Capital does not manage outside capital. Capital at risk.
      </p>
    </div>
  );
}
