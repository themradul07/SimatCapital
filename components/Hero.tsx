import type { ReactNode } from "react";
import HeroDiamond from "./HeroDiamond";

type Props = {
  eyebrow: string;
  /** Lines of the headline. Wrap a word in *asterisks* to set it in gold italic. */
  lines: string[];
  lede: ReactNode;
  actions: ReactNode;
  visual?: ReactNode;
};

function Words({ line, offset }: { line: string; offset: number }) {
  return (
    <>
      {line.split(" ").map((w, i) => {
        const gold = w.startsWith("*") && w.endsWith("*");
        const text = gold ? w.slice(1, -1) : w;
        return (
          <span key={i} className="word">
            <span className={gold ? "italic-gold" : ""} style={{ ["--d" as string]: `${(offset + i) * 70}ms` }}>
              {text}
            </span>
            {" "}
          </span>
        );
      })}
    </>
  );
}

export default function Hero({ eyebrow, lines, lede, actions, visual }: Props) {
  const offsets = lines.map((_, i) => lines.slice(0, i).reduce((n, l) => n + l.split(" ").length, 0));
  return (
    <section className="relative overflow-hidden pt-[140px] pb-20 md:pt-[170px] md:pb-28">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(214,180,106,0.10), transparent)" }}
      />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <div className="fade-in flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "0ms" }}>
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h1 className="display mt-7">
            {lines.map((line, li) => (
              <span key={li} className="block">
                <Words line={line} offset={offsets[li]} />
              </span>
            ))}
          </h1>
          <div className="fade-in mt-8" style={{ ["--d" as string]: "700ms" }}>
            <div className="lede">{lede}</div>
          </div>
          <div className="fade-in mt-8" style={{ ["--d" as string]: "900ms" }}>
            <span className="chip">
              <span className="dot" />
              Paper trading phase. No outside capital managed yet.
            </span>
          </div>
          <div className="fade-in mt-10 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "1100ms" }}>
            {actions}
          </div>
        </div>
        <div className="px-10 sm:px-6 lg:px-0">{visual ?? <HeroDiamond />}</div>
      </div>
    </section>
  );
}
