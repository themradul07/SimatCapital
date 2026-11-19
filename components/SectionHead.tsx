import type { ReactNode } from "react";
import Reveal from "./Reveal";

export default function SectionHead({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Reveal>
        <span className="chip-gold">{eyebrow}</span>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="k-title mt-6">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={200}>
          <p className={`lede mt-6 ${center ? "mx-auto" : ""}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
