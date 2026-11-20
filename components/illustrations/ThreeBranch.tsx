"use client";

import { useRef } from "react";
import { useInView } from "../useInView";

const ASKS = ["Compliant?", "Understood?", "Fairly priced?"];

/** Home Chapter II — three questions converging into one gold diamond. */
export default function ThreeBranch() {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.4);

  return (
    <figure
      ref={ref}
      className={`relative mx-auto w-full max-w-[540px] ${on ? "on" : ""}`}
      aria-label="Three questions, compliant, understood and fairly priced, converge into one investment decision."
    >
      <div className="grid grid-cols-3 text-center">
        {ASKS.map((a, i) => (
          <span
            key={a}
            className="serif text-[20px] italic sm:text-[26px]"
            style={{ color: "var(--text-primary)", opacity: on ? 1 : 0, transition: `opacity 560ms var(--ease) ${i * 140}ms` }}
          >
            {a}
          </span>
        ))}
      </div>
      <svg viewBox="0 0 540 250" className="mt-3 w-full" aria-hidden>
        {[90, 270, 450].map((x, i) => (
          <path
            key={x}
            d={`M ${x} 4 C ${x} 110, 270 90, 270 182`}
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.5"
            strokeWidth="1.2"
            className="draw"
            style={{ ["--len" as string]: 300, ["--d" as string]: `${300 + i * 150}ms` }}
          />
        ))}
        <g style={{ opacity: on ? 1 : 0, transition: "opacity 600ms var(--ease) 1300ms" }}>
          <rect x="256" y="196" width="28" height="28" transform="rotate(45 270 210)" fill="var(--gold-accent)" />
          <rect x="248" y="188" width="44" height="44" transform="rotate(45 270 210)" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.35" />
        </g>
      </svg>
      <ul className="sr-only">
        {ASKS.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </figure>
  );
}
