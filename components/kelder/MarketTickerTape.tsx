"use client";

import { useEffect, useRef, useState } from "react";

interface MarketQuote {
  symbol: string;
  name: string;
  market: string;
  price: string;
  change: string;
  isPositive: boolean;
  type: "equity" | "sovereign" | "fx";
  sparkline: number[];
}

const INITIAL_QUOTES: MarketQuote[] = [
  {
    symbol: "2222.SR",
    name: "Saudi Aramco",
    market: "Tadawul",
    price: "SAR 28.45",
    change: "+0.71%",
    isPositive: true,
    type: "equity",
    sparkline: [27.9, 28.05, 28.2, 28.15, 28.35, 28.45],
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    market: "NASDAQ",
    price: "$448.90",
    change: "+1.35%",
    isPositive: true,
    type: "equity",
    sparkline: [442, 444, 443, 446, 447, 448.9],
  },
  {
    symbol: "UK 2Y GILT",
    name: "HM Treasury",
    market: "UK DMO",
    price: "4.18%",
    change: "-2 bps",
    isPositive: true,
    type: "sovereign",
    sparkline: [4.24, 4.22, 4.21, 4.20, 4.19, 4.18],
  },
  {
    symbol: "1120.SR",
    name: "Al Rajhi Bank",
    market: "Tadawul",
    price: "SAR 88.20",
    change: "+1.15%",
    isPositive: true,
    type: "equity",
    sparkline: [86.8, 87.2, 87.5, 87.3, 87.9, 88.2],
  },
  {
    symbol: "ASML",
    name: "ASML Holding",
    market: "Euronext",
    price: "€712.40",
    change: "+2.30%",
    isPositive: true,
    type: "equity",
    sparkline: [698, 702, 705, 708, 710, 712.4],
  },
  {
    symbol: "US 3M T-BILL",
    name: "US Treasury",
    market: "Federal Reserve",
    price: "4.42%",
    change: "-1 bp",
    isPositive: true,
    type: "sovereign",
    sparkline: [4.45, 4.44, 4.43, 4.43, 4.42, 4.42],
  },
  {
    symbol: "TSM",
    name: "Taiwan Semi",
    market: "NYSE",
    price: "$189.50",
    change: "+3.10%",
    isPositive: true,
    type: "equity",
    sparkline: [183, 185, 186, 187, 188, 189.5],
  },
  {
    symbol: "ROG.SW",
    name: "Roche Holding",
    market: "SIX Swiss",
    price: "CHF 264.50",
    change: "+0.45%",
    isPositive: true,
    type: "equity",
    sparkline: [262, 263, 262.5, 263.8, 264, 264.5],
  },
  {
    symbol: "SAP",
    name: "SAP SE",
    market: "XETRA",
    price: "€192.10",
    change: "+1.20%",
    isPositive: true,
    type: "equity",
    sparkline: [188, 189, 190, 190.5, 191.2, 192.1],
  },
  {
    symbol: "RELX",
    name: "RELX PLC",
    market: "LSE",
    price: "£36.40",
    change: "+0.88%",
    isPositive: true,
    type: "equity",
    sparkline: [35.8, 36.0, 36.1, 36.25, 36.3, 36.4],
  },
  {
    symbol: "XAU/USD",
    name: "Spot Gold (oz)",
    market: "LBMA",
    price: "$2,648.20",
    change: "+0.62%",
    isPositive: true,
    type: "equity",
    sparkline: [2632, 2636, 2639, 2642, 2644, 2648.2],
  },
  {
    symbol: "KSA 10Y SUKUK",
    name: "Saudi Ministry Fin",
    market: "Tadawul",
    price: "4.62%",
    change: "-1 bp",
    isPositive: true,
    type: "sovereign",
    sparkline: [4.66, 4.65, 4.64, 4.63, 4.62, 4.62],
  },
];

function Sparkline({ data, up, id }: { data: number[]; up: boolean; id: string }) {
  const W = 44;
  const H = 18;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * W, H - 3 - ((v - min) / range) * (H - 6)] as const);
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `0,${H} ${line} ${W},${H}`;
  const [lx, ly] = pts[pts.length - 1];
  const c = up ? "#60D7B1" : "#ED6757";
  return (
    <svg className="h-[18px] w-11 flex-shrink-0 overflow-visible" viewBox={`0 0 ${W} ${H}`} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.28" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${id})`} />
      <polyline fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" points={line} />
      <circle cx={lx} cy={ly} r="1.9" fill={c} />
    </svg>
  );
}

export default function MarketTickerTape() {
  const [quotes, setQuotes] = useState<MarketQuote[]>(INITIAL_QUOTES);
  const [tick, setTick] = useState<{ symbol: string; up: boolean; n: number } | null>(null);
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  // Pause the marquee and the tick timer while the ribbon is off-screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Gentle simulated tick on one equity at a time.
  useEffect(() => {
    if (!visible) return;
    const candidates = INITIAL_QUOTES.map((q, i) => (q.type === "sovereign" ? -1 : i)).filter((i) => i >= 0);
    const interval = setInterval(() => {
      const idx = candidates[Math.floor(Math.random() * candidates.length)];
      const delta = Math.random() * 0.35 - 0.12;
      const up = delta >= 0;

      setQuotes((prev) => {
        const q = prev[idx];
        const numPrice = parseFloat(q.price.replace(/[^0-9.]/g, ""));
        const newPrice = Math.max(1, numPrice + delta);
        const prefix = q.price.match(/^[^0-9]*/)?.[0] ?? "";
        const next = [...prev];
        next[idx] = {
          ...q,
          price: `${prefix}${newPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: `${up ? "+" : ""}${((delta / numPrice) * 100).toFixed(2)}%`,
          isPositive: up,
          sparkline: [...q.sparkline.slice(1), newPrice],
        };
        return next;
      });
      setTick((t) => ({ symbol: INITIAL_QUOTES[idx].symbol, up, n: (t?.n ?? 0) + 1 }));
    }, 2400);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div
      ref={rootRef}
      className="ticker-ribbon relative w-full select-none"
      aria-label="Global market prices and treasury yields"
      data-paused={!visible || undefined}
    >
      {/* Radiant horizon ambient glow bridging globe to preview across full width */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-full -translate-x-1/2 -translate-y-1/2 opacity-70 blur-3xl"
        style={{
          background: "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(216,183,101,0.22) 0%, rgba(96,215,177,0.06) 50%, transparent 80%)",
        }}
      />

      {/* Full-bleed edge-to-edge glassmorphic ticker ribbon */}
      <div
        className="relative flex w-full items-stretch overflow-hidden border-y backdrop-blur-xl transition-colors duration-300"
        style={{
          borderTop: "1px solid rgba(216, 183, 101, 0.28)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "linear-gradient(180deg, rgba(16, 26, 36, 0.80) 0%, rgba(10, 16, 22, 0.90) 100%)",
          boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.85), 0 1px 0 rgba(255, 255, 255, 0.06) inset",
        }}
      >
        {/* Subtle top gold specular highlight beam */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(216,183,101,0.6) 25%, rgba(216,183,101,0.6) 75%, transparent 100%)",
          }}
        />

        {/* Fixed institutional lead badge anchored to the left */}
        <div
          className="relative z-10 flex flex-shrink-0 items-center gap-3 border-r px-4 sm:px-6 md:px-8"
          style={{
            borderColor: "rgba(255, 255, 255, 0.08)",
            background: "linear-gradient(90deg, rgba(10, 16, 22, 0.97) 0%, rgba(13, 21, 29, 0.92) 100%)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#60D7B1] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#60D7B1]" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#D8B765]">
              Active Markets
            </span>
            <span className="hidden whitespace-nowrap text-[9px] text-[#7E8E9C] sm:inline">
              Global equity · Sukuk
            </span>
          </span>
        </div>

        {/* Continuous scrolling track, softly feathered at screen margins */}
        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 48px), transparent 100%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 32px, #000 calc(100% - 48px), transparent 100%)",
          }}
        >
          <div className="ticker-track py-3 sm:py-3.5">
            {[...quotes, ...quotes].map((q, i) => {
              const isTicking = tick?.symbol === q.symbol;
              const falling = q.change.trim().startsWith("-");
              const tone = q.isPositive ? "text-[#60D7B1]" : "text-[#ED6757]";
              return (
                <div
                  key={`${q.symbol}-${i}`}
                  aria-hidden={i >= quotes.length || undefined}
                  className="relative inline-flex items-center gap-3.5 px-5 transition-colors duration-500 hover:bg-white/[0.03] sm:px-6"
                >
                  <div className="flex min-w-0 flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-[var(--cream)]">{q.symbol}</span>
                      <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.12em] text-[#7E8E9C]">{q.market}</span>
                    </div>
                    <span className="max-w-[120px] truncate text-[11px] text-[#9AA8B5]">{q.name}</span>
                  </div>

                  <Sparkline data={q.sparkline} up={q.isPositive} id={`spark-${i}`} />

                  <div className="flex flex-col items-end">
                    <span
                      key={isTicking ? `t${tick?.n}` : "s"}
                      className={`rounded px-1 text-[12.5px] font-semibold tabular-nums text-white ${
                        isTicking ? (tick?.up ? "tick-flash-up" : "tick-flash-down") : ""
                      }`}
                    >
                      {q.price}
                    </span>
                    <span className={`mt-0.5 inline-flex items-center gap-0.5 text-[10px] font-medium tabular-nums ${tone}`}>
                      <span className="text-[7px]">{falling ? "▼" : "▲"}</span>
                      {q.change.replace(/^[+-]/, "")}
                    </span>
                  </div>

                  <span className="hidden whitespace-nowrap rounded-full border border-[#D8B765]/20 bg-[#D8B765]/[0.07] px-2 py-0.5 text-[9px] font-medium text-[#D8B765] xl:inline-flex">
                    {q.type === "sovereign" ? "Sovereign" : "MSCI Islamic"}
                  </span>

                  {/* Divider */}
                  <span aria-hidden className="absolute right-0 top-1/2 h-7 w-px -translate-y-1/2 bg-white/[0.06]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
