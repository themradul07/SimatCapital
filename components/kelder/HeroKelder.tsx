"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import HalftoneGrid from "./HalftoneGrid";
import MarketTickerTape from "./MarketTickerTape";

// three.js and the map data load only in the browser, after the hero text.
const GlobeKelder = dynamic(() => import("./GlobeKelder"), { ssr: false });

const LINE_1 = ["Investing", "with", "*Purpose.*"];
const LINE_2 = ["Delivering", "with", "*Precision.*"];

export default function HeroKelder() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const word = (w: string, i: number) => {
    const gold = w.startsWith("*");
    return (
      <span
        key={`${w}-${i}`}
        className={`mr-[0.22em] inline-block ${gold ? "italic-gold" : ""}`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(18px)",
          filter: mounted ? "blur(0)" : "blur(6px)",
          transition: "opacity 1200ms var(--ease), transform 1200ms var(--ease), filter 1200ms var(--ease)",
          transitionDelay: `${i * 110}ms`,
        }}
      >
        {gold ? w.slice(1, -1) : w}
      </span>
    );
  };

  return (
    // overflow-clip (not hidden) so the sticky globe below keeps working.
    <section className="relative overflow-clip pt-[130px] pb-10 md:pt-[170px] md:pb-16">
      {/* Warms toward the globe, then settles back to the page colour so the next section joins without a seam */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg) 38%, var(--gold-tint) 72%, var(--gold-tint) 82%, var(--bg) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[16%] h-[460px] w-[680px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(214,180,106,0.12) 0%, transparent 70%)" }}
      />
      {/* Dot grid fades out before the globe so the two never compete */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000_0%,#000_45%,transparent_70%)]">
        <HalftoneGrid />
      </div>

      {/* Sticky boundary: the globe can rise as high as the top of this block, no higher */}
      <div className="relative flex flex-col">
      <div className="wrap relative z-10 flex flex-col items-center text-center">
        <div className="fade-in mb-7 flex flex-wrap items-center justify-center gap-3">
          {/* Status chip: confirm still true at launch (open item 11). */}
          {/* <span className="chip">
            <span className="dot" />
            Paper trading phase. No outside capital managed yet.
          </span> */}
        </div>

        <p className="eyebrow-kelder fade-in mb-6" style={{ ["--d" as string]: "120ms" }}>
          Simat Capital · Shariah-compliant global equity
        </p>

        {/* Tagline: confirm approved for the web (open item 3). */}
        <h1 className="display max-w-5xl">
          <span className="block">{LINE_1.map((w, i) => word(w, i))}</span>
          <span className="block">{LINE_2.map((w, i) => word(w, i + LINE_1.length))}</span>
        </h1>

        <p className="lede fade-in mx-auto mt-8 max-w-2xl" style={{ ["--d" as string]: "800ms" }}>
          Simat Capital is an actively managed, Shariah-compliant global equity firm. We combine value-focused research, a
          systematic process and Shariah screening, and{" "}
          <span style={{ color: "var(--cream)" }}>every investment decision is made by a person.</span>
        </p>

        <div className="fade-in mt-10 flex flex-wrap items-center justify-center gap-4" style={{ ["--d" as string]: "1000ms" }}>
          <Link href="/institutions#briefing" className="btn btn-gold group">
            Request the investor briefing
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <a href="#how-it-works" className="btn btn-ghost">
            See how it works
          </a>
        </div>
        <Link href="/demo" className="link-gold fade-in mt-6 text-[14px]" style={{ ["--d" as string]: "1150ms" }}>
          Watch the demo
        </Link>

        {/* Two audience doors */}
        <div className="fade-in mt-14 grid w-full max-w-3xl gap-3.5 sm:grid-cols-2" style={{ ["--d" as string]: "1300ms" }}>
          {[
            { href: "/individuals", k: "For Individuals", d: "Plain words, about two minutes." },
            { href: "/institutions", k: "For Family Offices and Institutions", d: "Process, controls and governance in full." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(216,183,101,0.5)] hover:bg-[#192937]/90 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7),0_0_24px_-4px_rgba(216,183,101,0.16)] active:translate-y-0.5 active:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{
                borderColor: "var(--line)",
                background: "rgba(18, 28, 38, 0.65)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {/* Subtle top hairline that brightens to gold on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-300 group-hover:via-[#D8B765]/50"
              />

              {/* Subtle gold ambient glow on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(216, 183, 101, 0.08) 0%, transparent 75%)",
                }}
              />

              <span className="relative z-10">
                <span className="block text-[14.5px] font-semibold text-[var(--cream)] transition-colors duration-200 group-hover:text-white">
                  {c.k}
                </span>
                <span className="block text-[13px] text-[#A9B6C2] transition-colors duration-200 group-hover:text-[#CBD5E1]">
                  {c.d}
                </span>
              </span>

              <span className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-sm text-[var(--gold)] transition-all duration-300 group-hover:border-[#D8B765]/50 group-hover:bg-[#D8B765]/10 group-hover:text-[#ECD193] group-hover:translate-x-1 group-hover:shadow-[0_0_12px_rgba(216,183,101,0.3)]">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>


      {/*
        Globe horizon. Sticky to the viewport bottom with a negative offset, so on first load only the
        top cap shows at the bottom of the screen. As the page scrolls the globe stays parked there
        (drifting down the page) until it reaches its own slot, where it docks behind the market ticker.
        --below = the part of the canvas under the dome's top edge (~65% of its height).
      */}
      <div
        className="sticky z-0 mx-auto -mt-4 h-[340px] w-full max-w-[1200px] [--below:221px] sm:h-[440px] sm:[--below:286px] md:-mt-10 md:h-[540px] md:[--below:351px]"
        style={{ bottom: "calc(min(20svh, 190px) - var(--below))" }}
      >
        <div
          className="fade-in h-full w-full"
          style={{
            ["--d" as string]: "900ms",
            maskImage: "linear-gradient(180deg, transparent 0%, #000 14%, #000 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 14%, #000 80%, transparent 100%)",
          }}
        >
          <GlobeKelder />
        </div>
      </div>
      </div>

      {/* Market ribbon docks across the lower globe */}
      <div className="relative z-20 -mt-[96px] sm:-mt-[120px] md:-mt-[150px]">
        <MarketTickerTape />
      </div>
    </section>
  );
}
