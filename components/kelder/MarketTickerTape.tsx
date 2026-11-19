"use client";

import { useEffect, useState } from "react";

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

export default function MarketTickerTape() {
  const [quotes, setQuotes] = useState<MarketQuote[]>(INITIAL_QUOTES);
  const [activeTick, setActiveTick] = useState<string | null>(null);

  // Periodic subtle live tick update to give true market momentum
  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const q = prev[idx];
        if (q.type === "sovereign") return prev;

        const numPrice = parseFloat(q.price.replace(/[^0-9.]/g, ""));
        const delta = (Math.random() * 0.35 - 0.12);
        const newPrice = Math.max(1, numPrice + delta);

        const prefix = q.price.includes("SAR")
          ? "SAR "
          : q.price.includes("€")
          ? "€"
          : q.price.includes("CHF")
          ? "CHF "
          : q.price.includes("£")
          ? "£"
          : "$";

        setActiveTick(q.symbol);
        setTimeout(() => setActiveTick(null), 900);

        const next = [...prev];
        next[idx] = {
          ...q,
          price: `${prefix}${newPrice.toFixed(2)}`,
          change: `${delta >= 0 ? "+" : ""}${((delta / numPrice) * 100).toFixed(2)}%`,
          isPositive: delta >= 0,
          sparkline: [...q.sparkline.slice(1), newPrice],
        };
        return next;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative z-20 w-full overflow-hidden select-none -mt-12 sm:-mt-20 md:-mt-28 mb-8 md:mb-14 px-4"
      aria-label="Live Global Market Prices & Treasury Yields"
    >
      {/* Warm horizon ambient glow bridging globe to preview */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-44 w-[92%] max-w-5xl rounded-full blur-3xl opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(216, 183, 101, 0.22) 0%, rgba(96, 215, 177, 0.08) 45%, transparent 75%)",
        }}
      />

      {/* Main glassmorphic ticker ribbon */}
      <div
        className="relative mx-auto max-w-[1240px] rounded-2xl border px-3 py-2.5 backdrop-blur-xl shadow-2xl transition-all duration-300"
        style={{
          borderColor: "rgba(216, 183, 101, 0.26)",
          background: "linear-gradient(90deg, rgba(14, 23, 33, 0.90) 0%, rgba(20, 33, 44, 0.95) 50%, rgba(14, 23, 33, 0.90) 100%)",
          boxShadow: "0 18px 45px -10px rgba(0, 0, 0, 0.75), 0 0 30px -8px rgba(216, 183, 101, 0.15)",
          maskImage: "linear-gradient(90deg, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
      >
        <div className="flex items-center">
          {/* Static Lead Badge */}
          <div className="hidden lg:flex items-center gap-2 pr-4 mr-3 border-r border-white/10 flex-shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#60D7B1] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#60D7B1]" />
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#D8B765] whitespace-nowrap">
              Active Markets
            </span>
          </div>

          {/* Continuous Moving Ticker Track */}
          <div className="flex w-max ticker-track hover:[animation-play-state:paused] py-0.5">
            {[...quotes, ...quotes].map((q, i) => {
              const isTicking = activeTick === q.symbol;

              // Sparkline points calculation
              const min = Math.min(...q.sparkline);
              const max = Math.max(...q.sparkline);
              const range = max - min || 1;
              const points = q.sparkline
                .map((val, idx) => {
                  const x = (idx / (q.sparkline.length - 1)) * 36;
                  const y = 14 - ((val - min) / range) * 10;
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(" ");

              return (
                <div
                  key={`${q.symbol}-${i}`}
                  className={`inline-flex items-center gap-3 px-5 border-r border-white/5 transition-colors duration-300 ${
                    isTicking ? "bg-[#D8B765]/10" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[13px] text-white tracking-tight">
                        {q.symbol}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#7E8E9C]">
                        {q.market}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A9B6C2] truncate max-w-[110px]">
                      {q.name}
                    </span>
                  </div>

                  {/* Mini Sparkline Chart */}
                  <svg className="w-9 h-3.5 overflow-visible" viewBox="0 0 36 14">
                    <polyline
                      fill="none"
                      stroke={q.isPositive ? "#60D7B1" : "#ED6757"}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </svg>

                  {/* Price & Change */}
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-xs font-semibold tabular-nums transition-colors duration-200 ${
                        isTicking ? (q.isPositive ? "text-[#60D7B1]" : "text-[#ED6757]") : "text-white"
                      }`}
                    >
                      {q.price}
                    </span>
                    <span
                      className={`text-[10px] font-medium tabular-nums ${
                        q.isPositive ? "text-[#60D7B1]" : "text-[#ED6757]"
                      }`}
                    >
                      {q.change}
                    </span>
                  </div>

                  {/* Shariah / Settlement Pill */}
                  <span className="hidden xl:inline-flex items-center rounded-full bg-[#D8B765]/10 px-2 py-0.5 text-[9px] font-medium text-[#D8B765] border border-[#D8B765]/20 whitespace-nowrap">
                    {q.type === "sovereign" ? "✓ Sovereign Direct" : "✓ MSCI Islamic"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
