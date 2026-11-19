import type { ReactNode } from "react";
import Reveal from "../Reveal";

/** Modern section header: gold chip on the left, serif title on the right, optional lede below. */
export default function KHead({ chip, title, lede }: { chip: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:items-end">
      <Reveal>
        <span className="chip-gold">{chip}</span>
      </Reveal>
      <div>
        <Reveal delay={100}>
          <h2 className="k-title md:text-right">{title}</h2>
        </Reveal>
        {lede && (
          <Reveal delay={200}>
            <p className="lede mt-5 md:ml-auto md:text-right">{lede}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
