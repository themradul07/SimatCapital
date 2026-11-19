"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "plain" | "technical";

const steps = [
  {
    title: "Agents research and propose",
    plain: "AI studies companies and suggests ideas. It cannot buy or sell anything.",
    technical:
      "Single-purpose agents write sourced theses, fair-value ranges and a recorded bear case. No agent holds a broker key, places an order, changes a limit or approves anything.",
  },
  {
    title: "Code checks every rule",
    plain: "Software checks every Shariah and risk rule. If anything fails or is missing, the idea stops.",
    technical:
      "Eleven pre-trade checks run in code. A failed or unknown result blocks the trade. Stale prices, stale Shariah screens, broker disconnects and unresolved breaks all block new orders.",
  },
  {
    title: "The CIO approves",
    plain: "A person, our founder, reads the proposal and decides yes or no. Nothing happens without that.",
    technical:
      "Passkey approval bound to one exact, versioned order inside an approval window. A material change cancels the approval. An old approval is refused.",
    decide: true,
  },
  {
    title: "One locked-down service places the order",
    plain: "Only one secure service can send an order, and only after approval.",
    technical:
      "A single execution service is the only holder of the order key. A timeout never produces a duplicate order. An order counts as filled only when the broker's own records show it.",
  },
  {
    title: "Reconciled and recorded",
    plain: "Our records are matched to the broker's, to the penny, and everything is saved for good.",
    technical:
      "Holdings and cash reconciled to the broker every night and before orders; any difference stops new orders until explained. Every decision lands in a tamper-evident audit trail.",
  },
];

export default function DecisionFlow({ initialMode = "plain", showToggle = true }: { initialMode?: Mode; showToggle?: boolean }) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the diagram's top reaches 85% of the viewport, 1 when its bottom passes 55%.
      const start = vh * 0.85;
      const end = vh * 0.55 - r.height;
      const p = (start - r.top) / (start - end);
      setProgress(reduced ? 1 : Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const activeUpTo = progress * (steps.length - 1) + 0.001;

  return (
    <div>
      {showToggle && (
        <div className="mb-12 flex flex-wrap items-center gap-4">
          <div
            role="tablist"
            aria-label="Level of detail"
            className="relative inline-flex rounded-full border p-1"
            style={{ borderColor: "var(--line)", background: "var(--bg-2)" }}
          >
            <span
              className="absolute top-1 bottom-1 rounded-full transition-all duration-700"
              style={{
                left: mode === "plain" ? 4 : "50%",
                width: "calc(50% - 4px)",
                background: "var(--gold)",
                transitionTimingFunction: "var(--ease)",
              }}
            />
            {(["plain", "technical"] as Mode[]).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className="relative z-10 w-[132px] rounded-full py-2.5 text-[14px] font-semibold transition-colors duration-500"
                style={{ color: mode === m ? "var(--bg)" : "var(--muted)" }}
              >
                {m === "plain" ? "In plain words" : "In detail"}
              </button>
            ))}
          </div>
          <span className="text-[13px] muted">Same picture, two depths.</span>
        </div>
      )}

      <div ref={ref} className="relative">
        {/* desktop rail */}
        <div className="absolute left-[10%] right-[10%] top-[27px] hidden h-px lg:block" style={{ background: "var(--line)" }}>
          <div
            className="h-full origin-left"
            style={{
              transform: `scaleX(${progress})`,
              background: "linear-gradient(90deg, var(--gold-deep), var(--gold-bright))",
              boxShadow: "0 0 12px rgba(214,180,106,0.6)",
            }}
          />
        </div>
        {/* mobile rail */}
        <div className="absolute left-[27px] top-4 bottom-4 w-px lg:hidden" style={{ background: "var(--line)" }}>
          <div
            className="w-full origin-top"
            style={{ height: "100%", transform: `scaleY(${progress})`, background: "var(--gold)" }}
          />
        </div>

        <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {steps.map((s, i) => {
            const on = i <= activeUpTo;
            return (
              <li key={s.title} className="relative flex gap-6 lg:block lg:text-center">
                <div className="relative shrink-0 lg:mx-auto lg:w-fit">
                  <div
                    className="relative z-10 flex h-[54px] w-[54px] items-center justify-center rotate-45 rounded-[10px] border transition-all duration-700"
                    style={{
                      borderColor: on ? "var(--gold)" : "var(--line)",
                      background: on ? (s.decide ? "var(--gold)" : "var(--panel-2)") : "var(--bg)",
                      boxShadow: on && s.decide ? "0 0 40px rgba(214,180,106,0.45)" : "none",
                    }}
                  >
                    <span
                      className="-rotate-45 serif text-[22px] font-semibold"
                      style={{ color: on ? (s.decide ? "var(--bg)" : "var(--gold)") : "var(--faint)" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  {s.decide && (
                    <span
                      className="absolute left-1/2 top-[-38px] hidden -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.2em] transition-opacity duration-700 lg:block"
                      style={{ background: "var(--gold-wash)", border: "1px solid var(--gold)", color: "var(--gold-bright)", opacity: on ? 1 : 0.35 }}
                    >
                      A person decides
                    </span>
                  )}
                </div>
                <div className="lg:mt-7">
                  {s.decide && (
                    <span
                      className="mb-2 inline-block rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.2em] lg:hidden"
                      style={{ background: "var(--gold-wash)", border: "1px solid var(--gold)", color: "var(--gold-bright)" }}
                    >
                      A person decides
                    </span>
                  )}
                  <h3
                    className="serif text-[22px] font-semibold leading-tight transition-colors duration-700"
                    style={{ color: on ? "var(--cream)" : "var(--faint)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    key={mode}
                    className="mt-3 text-[14.5px] leading-relaxed transition-colors duration-700"
                    style={{ color: on ? "var(--muted)" : "var(--faint)", animation: "fadeIn 700ms var(--ease)" }}
                  >
                    {mode === "plain" ? s.plain : s.technical}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
