import KHead from "./KHead";
import Reveal from "../Reveal";

const SOURCES = [
  { t: "Research beyond the numbers", d: "Management, positioning and threats, not just financial statements." },
  { t: "Value discipline", d: "Pay a sensible price. Hold cash when good ideas are scarce." },
  { t: "Overlooked opportunities", d: "Compliant small and mid-sized companies that others under-research." },
  { t: "Speed on compliance", d: "Re-screen when new results come out, not at the next index review." },
];

export default function ValueSources() {
  return (
    <section className="k-section">
      <div className="wrap space-y-14">
        <KHead
          chip="Where we aim to add value"
          title={
            <>
              Four sources, <span className="italic-gold">one objective.</span>
            </>
          }
        />
        <Reveal className="card-kelder-gold flex flex-col gap-4 p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <p className="serif max-w-2xl text-[24px] leading-snug md:text-[30px]" style={{ color: "var(--cream)" }}>
            We aim to outperform our benchmark on a risk-adjusted basis over a full market cycle.
          </p>
          <span className="chip-gold no-mark shrink-0">An objective, not a promise</span>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SOURCES.map((s, i) => (
            <Reveal key={s.t} delay={i * 110} className="card-kelder flex flex-col p-7">
              <span className="serif text-[44px] leading-none" style={{ color: "var(--gold)" }}>
                0{i + 1}
              </span>
              <h3 className="h3 mt-8 text-[23px]">{s.t}</h3>
              <p className="mt-3 text-[14.5px] muted">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
