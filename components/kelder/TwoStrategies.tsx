import KHead from "./KHead";
import Reveal from "../Reveal";

const BOOKS = [
  {
    name: "Flagship Fund",
    line: "The core long-term portfolio, run like a managed fund.",
    style: "Patient, focused, conviction-led",
    holding: "Long term",
  },
  {
    name: "Simat Catalyst",
    sub: "Global Tactical Equity Strategies",
    line: "Shorter-term, evidence-backed opportunities.",
    style: "Catalyst-driven: earnings, momentum and high-conviction revaluation",
    holding: "Short to medium term",
  },
];

export default function TwoStrategies({ detail = false }: { detail?: boolean }) {
  return (
    <section className="k-section">
      <div className="wrap space-y-14">
        <KHead
          chip="Two strategies, one platform"
          title={
            <>
              Two books. <span className="italic-gold">Never mixed.</span>
            </>
          }
          lede="Same research, same Shariah framework, same controls. Separate capital, limits, records and approvals."
        />

        <Reveal className="card-kelder relative grid overflow-hidden md:grid-cols-[1fr_auto_1fr]">
          {BOOKS.map((b, i) => (
            <div key={b.name} className={`p-7 md:p-10 ${i === 1 ? "md:order-3" : ""}`}>
              <p className="eyebrow-kelder">{i === 0 ? "Book one" : "Book two"}</p>
              <h3 className="serif mt-4 text-[34px] leading-none md:text-[42px]" style={{ color: "var(--cream)" }}>
                {b.name}
              </h3>
              {b.sub && <p className="mt-2 text-[13px] gold">{b.sub}</p>}
              <p className="mt-5 muted">{b.line}</p>
              <dl className="mt-7 space-y-3 text-[14px]">
                {[
                  ["Style", b.style],
                  ["Holding", b.holding],
                  ["Kept apart", "Own capital, own limits, own records, own approvals"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[96px_1fr] gap-3 border-t pt-3" style={{ borderColor: "var(--line-soft)" }}>
                    <dt className="muted">{k}</dt>
                    <dd style={{ color: "var(--text)" }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          {/* The gold line between them */}
          <div className="relative flex items-center justify-center py-2 md:order-2 md:w-16 md:py-0">
            <span className="absolute inset-x-6 top-1/2 h-px md:inset-x-auto md:inset-y-8 md:left-1/2 md:top-auto md:h-auto md:w-px" style={{ background: "var(--gold)" }} />
            <span
              className="relative whitespace-nowrap px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] md:-rotate-90"
              style={{ background: "var(--panel)", color: "var(--gold)" }}
            >
              Never merged
            </span>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            "One book cannot borrow from the other's cash or limits.",
            "The combined view is for reading only.",
            detail
              ? "Simat Catalyst: risk is set before every trade, a trade needs a reason to exist, and a falling account pauses new risk and sends the decision to the CIO."
              : "Shared: the same research, the same Shariah framework, the same controls.",
          ].map((t, i) => (
            <Reveal key={t} delay={i * 100} className="border-t pt-5" style={{ borderColor: "var(--gold-deep)" }}>
              <p style={{ color: "var(--text)" }}>{t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
