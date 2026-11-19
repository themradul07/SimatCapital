"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Short, calm intro: the diamond mark and the tagline. Shown once per session. */
export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("simat_intro_seen") === "1";
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t0 = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(t0);
    }
    const t1 = setTimeout(() => {
      setFading(true);
      try {
        sessionStorage.setItem("simat_intro_seen", "1");
      } catch {}
    }, 1500);
    const t2 = setTimeout(() => setVisible(false), 2300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Simat Capital"
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-[800ms]"
      style={{ background: "var(--bg-deep)", opacity: fading ? 0 : 1, pointerEvents: fading ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center px-4 text-center">
        <div className="fade-in relative h-20 w-20 overflow-hidden">
          <Image src="/simat-mark.png" alt="" fill priority sizes="80px" className="object-contain" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(105deg, transparent 20%, rgba(232,204,140,0.55) 50%, transparent 80%)",
              animation: "goldSweep 1.6s var(--ease) forwards",
            }}
          />
        </div>
        <p className="serif fade-in mt-7 text-[26px] md:text-[30px]" style={{ color: "var(--cream)", ["--d" as string]: "300ms" }}>
          Investing with <span className="italic-gold">Purpose.</span> Delivering with <span className="italic-gold">Precision.</span>
        </p>
        <p className="eyebrow-kelder fade-in mt-4" style={{ ["--d" as string]: "550ms" }}>
          Simat Capital
        </p>
      </div>
    </div>
  );
}
