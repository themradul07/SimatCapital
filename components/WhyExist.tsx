"use client";

import { useEffect, useRef, useState } from "react";

const asks = ["Compliant?", "Understood?", "Fairly priced?"];

/** Three questions converge into one gold diamond when the section comes into view. */
export default function WhyExist() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 560 330" className="w-full" aria-hidden>
        {[90, 280, 470].map((x, i) => (
          <path
            key={x}
            d={`M ${x} 70 C ${x} 170, 280 150, 280 238`}
            fill="none"
            stroke="var(--gold)"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            style={{
              strokeDasharray: 260,
              strokeDashoffset: on ? 0 : 260,
              transition: `stroke-dashoffset 1800ms var(--ease) ${400 + i * 200}ms`,
            }}
          />
        ))}
        <g
          style={{
            transformOrigin: "280px 270px",
            transform: on ? "scale(1) rotate(0deg)" : "scale(0.2) rotate(-90deg)",
            opacity: on ? 1 : 0,
            transition: "transform 1400ms var(--ease) 1500ms, opacity 1000ms var(--ease) 1500ms",
          }}
        >
          <rect x="256" y="246" width="48" height="48" transform="rotate(45 280 270)" fill="var(--gold)" />
          <rect x="246" y="236" width="68" height="68" transform="rotate(45 280 270)" fill="none" stroke="var(--gold)" strokeOpacity="0.35" />
        </g>
      </svg>
      <div className="absolute inset-x-0 top-0 grid grid-cols-3 text-center">
        {asks.map((a, i) => (
          <span
            key={a}
            className="serif text-[22px] italic md:text-[28px]"
            style={{
              color: "var(--cream)",
              opacity: on ? 1 : 0,
              transform: on ? "none" : "translateY(12px)",
              transition: `all 1000ms var(--ease) ${i * 180}ms`,
            }}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}
