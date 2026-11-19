import Reveal from "../Reveal";

const GATES = [
  { n: "01", t: "Business activity", d: "Companies in excluded sectors are removed before anything else is considered." },
  { n: "02", t: "Financial ratios", d: "Debt, cash and interest-bearing securities, and receivables are tested against the method." },
  { n: "03", t: "Prohibited income", d: "Income from impermissible sources must stay within the method's limit." },
  { n: "04", t: "Reaches the CIO", d: "Only a stock that passes, with a recent screen, can be proposed for a decision." },
];

const POINTS = [
  "Screening is done by code, not by opinion, and refreshed when companies publish new results.",
  "Holdings are watched after purchase, not only at entry.",
  "Impure income is calculated and recorded for every holding, so it can be purified.",
  "If a stock is unclear, the system stops and waits for a ruling. It does not guess.",
  "No leverage, no margin, no short selling, no interest-bearing cash.",
];

/** Brief 5.6. Never claim certification: say "Shariah-screened" and "Shariah-compliant by method". */
export default function ShariahSteps({ plain = false }: { plain?: boolean }) {
  return (
    <section className="k-section">
      <div className="wrap">
        <div
          className="relative overflow-hidden rounded-[28px] border p-6 sm:p-12"
          style={{ borderColor: "var(--gold-hairline)", background: "linear-gradient(150deg, var(--gold-tint) 0%, var(--bg-2) 70%)" }}
        >
          <svg aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 opacity-[0.18]" viewBox="0 0 200 200" fill="none">
            <path d="M100 10 L190 100 L100 190 L10 100 Z" stroke="var(--gold)" strokeWidth="1" />
            <path d="M100 40 L160 100 L100 160 L40 100 Z" stroke="var(--gold)" strokeWidth="0.7" strokeDasharray="3 4" />
          </svg>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Reveal>
                <span className="chip-gold">Shariah, built into every step</span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="k-title mt-6">
                  {plain ? (
                    <>
                      Every company passes <span className="italic-gold">three checks</span> before a person sees it.
                    </>
                  ) : (
                    <>
                      Screened by code. <span className="italic-gold">Watched after purchase.</span>
                    </>
                  )}
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="lede mt-6">
                  Every stock is screened using the MSCI Islamic method before it can be proposed. We do not claim
                  certification: a Shariah adviser will rule on disputed cases.
                </p>
              </Reveal>
              <ul className="mt-10 space-y-4">
                {POINTS.map((p, i) => (
                  <Reveal as="li" key={p} delay={i * 80} className="flex gap-4 text-[15px]">
                    <span className="mt-[9px] h-[7px] w-[7px] shrink-0 rotate-45" style={{ background: "var(--gold)" }} />
                    <span style={{ color: "var(--text)" }}>{p}</span>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* The gate: a stock passing each layer, then reaching the CIO */}
            <div className="relative">
              <span
                aria-hidden
                className="absolute bottom-6 left-[19px] top-6 w-px"
                style={{ background: "linear-gradient(180deg, var(--gold), var(--gold-hairline), transparent)" }}
              />
              <ol className="space-y-5">
                {GATES.map((g, i) => {
                  const last = i === GATES.length - 1;
                  return (
                    <Reveal as="li" key={g.n} delay={i * 140} className="relative flex gap-5">
                      <span
                        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold"
                        style={{
                          background: last ? "var(--gold)" : "var(--bg)",
                          color: last ? "var(--bg)" : "var(--gold)",
                          borderColor: "var(--gold)",
                          boxShadow: last ? "0 0 24px rgba(214,180,106,0.4)" : "none",
                        }}
                      >
                        {g.n}
                      </span>
                      <div
                        className="flex-1 rounded-2xl border p-5"
                        style={{ borderColor: last ? "var(--gold-hairline)" : "var(--line)", background: "rgba(6,5,4,0.45)" }}
                      >
                        <p className="text-[16px] font-semibold" style={{ color: "var(--cream)" }}>
                          {g.t}
                        </p>
                        <p className="mt-1.5 text-[14px] muted">{g.d}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
