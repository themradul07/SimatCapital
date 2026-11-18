"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Hero visual: nested diamonds draw themselves in, the mark floats at the
 * centre, and the whole piece leans gently toward the pointer. No chart,
 * no numbers, nothing that could read as performance.
 */
export default function HeroDiamond() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const tick = () => {
      cx += (tx - cx) * 0.04;
      cy += (ty - cy) * 0.04;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const rings = [200, 160, 120, 80];
  const labels = [
    { t: "Researched", x: 50, y: 2 },
    { t: "Screened", x: 98, y: 50 },
    { t: "Approved", x: 50, y: 98 },
    { t: "Recorded", x: 2, y: 50 },
  ];

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden>
      {/* glow */}
      <div
        className="absolute inset-[12%] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(214,180,106,0.22), transparent 65%)",
          transform: "translate(calc(var(--px,0) * 18px), calc(var(--py,0) * 18px))",
        }}
      />

      {/* nested diamonds */}
      <svg
        viewBox="0 0 440 440"
        className="absolute inset-0 h-full w-full"
        style={{ transform: "translate(calc(var(--px,0) * -10px), calc(var(--py,0) * -10px))" }}
      >
        {rings.map((r, i) => {
          const c = 220;
          const d = `M ${c} ${c - r} L ${c + r} ${c} L ${c} ${c + r} L ${c - r} ${c} Z`;
          const len = Math.ceil(r * 4 * Math.SQRT2) + 2;
          return (
            <path
              key={r}
              d={d}
              fill="none"
              stroke="var(--gold)"
              strokeOpacity={0.55 - i * 0.1}
              strokeWidth={i === 0 ? 1 : 0.8}
              className="draw"
              style={{ ["--len" as string]: len, ["--d" as string]: `${300 + i * 260}ms` }}
            />
          );
        })}
        {/* axis hairlines */}
        <line x1="220" y1="0" x2="220" y2="440" stroke="var(--gold)" strokeOpacity="0.12" className="draw" style={{ ["--len" as string]: 440, ["--d" as string]: "1400ms" }} />
        <line x1="0" y1="220" x2="440" y2="220" stroke="var(--gold)" strokeOpacity="0.12" className="draw" style={{ ["--len" as string]: 440, ["--d" as string]: "1600ms" }} />
        {/* orbiting point on the outer diamond */}
        <circle r="3.5" fill="var(--gold-bright)">
          <animateMotion dur="18s" repeatCount="indefinite" path="M 220 20 L 420 220 L 220 420 L 20 220 Z" />
        </circle>
        <circle r="2.5" fill="var(--gold)" opacity="0.7">
          <animateMotion dur="14s" repeatCount="indefinite" path="M 220 380 L 60 220 L 220 60 L 380 220 Z" />
        </circle>
      </svg>

      {/* the four verbs at the diamond's corners */}
      {labels.map((l, i) => (
        <span
          key={l.t}
          className="fade-in absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            borderColor: "rgba(214,180,106,0.35)",
            background: "rgba(10,19,29,0.85)",
            color: "var(--gold-bright)",
            ["--d" as string]: `${1800 + i * 200}ms`,
          }}
        >
          {l.t}
        </span>
      ))}

      {/* mark */}
      <div
        className="absolute inset-[30%] fade-in"
        style={{
          ["--d" as string]: "900ms",
          transform: "translate(calc(var(--px,0) * 12px), calc(var(--py,0) * 12px))",
        }}
      >
        <div style={{ animation: "floaty 7s ease-in-out infinite" }} className="h-full w-full">
          <Image
            src="/simat-mark.png"
            alt=""
            fill
            sizes="220px"
            priority
            className="object-contain drop-shadow-[0_20px_50px_rgba(214,180,106,0.35)]"
          />
        </div>
      </div>
    </div>
  );
}
