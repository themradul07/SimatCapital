import Reveal from "./Reveal";

const books = [
  {
    name: "Flagship Fund",
    line: "The core long-term portfolio, run like a managed fund.",
    rows: [
      ["Style", "Patient, focused, conviction-led"],
      ["Holding", "Long term"],
    ],
  },
  {
    name: "Simat Catalyst",
    sub: "Global Tactical Equity Strategies",
    line: "Shorter-term, evidence-backed opportunities.",
    rows: [
      ["Style", "Catalyst-driven: earnings, momentum and high-conviction revaluation"],
      ["Holding", "Short to medium term"],
    ],
  },
];

export default function TwoBooks({ detail = "short" }: { detail?: "short" | "full" }) {
  return (
    <div>
      <div className="relative grid gap-5 md:grid-cols-2 md:gap-16">
        {/* the never-merged divider */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 md:flex flex-col items-center">
          <div className="w-px flex-1" style={{ background: "linear-gradient(transparent, var(--gold), transparent)" }} />
          <span
            className="my-3 rotate-180 whitespace-nowrap text-[10.5px] font-bold uppercase tracking-[0.3em] gold"
            style={{ writingMode: "vertical-rl" }}
          >
            Never merged
          </span>
          <div className="w-px flex-1" style={{ background: "linear-gradient(transparent, var(--gold), transparent)" }} />
        </div>

        {books.map((b, i) => (
          <Reveal key={b.name} delay={i * 150} className="card md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] muted">Strategy {i + 1}</p>
            <h3 className="serif mt-3 text-[36px] leading-tight" style={{ color: "var(--cream)" }}>
              {b.name}
            </h3>
            {b.sub && <p className="text-[14px] gold">{b.sub}</p>}
            <p className="mt-4 muted">{b.line}</p>
            {detail === "full" && (
              <dl className="mt-8 space-y-4 border-t pt-6" style={{ borderColor: "var(--line)" }}>
                {b.rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[90px_1fr] gap-4 text-[14.5px]">
                    <dt className="muted">{k}</dt>
                    <dd style={{ color: "var(--cream)" }}>{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={200} className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border p-6" style={{ borderColor: "var(--line)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] gold">Shared</p>
          <p className="mt-2" style={{ color: "var(--cream)" }}>Same research, same Shariah framework, same controls.</p>
        </div>
        <div className="rounded-2xl border p-6" style={{ borderColor: "var(--line)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] gold">Kept apart</p>
          <p className="mt-2" style={{ color: "var(--cream)" }}>
            Own capital, own limits, own records, own approvals. One can never borrow the other&apos;s cash or limits.
          </p>
        </div>
      </Reveal>

      {detail === "full" && (
        <Reveal delay={250} className="mt-5 rounded-2xl border p-6 md:p-8" style={{ borderColor: "var(--line)", background: "var(--bg-2)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] gold">Simat Catalyst risk rules, in principle</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-3 text-[14.5px] muted">
            <li>Risk is set before every trade.</li>
            <li>A trade needs a reason to exist.</li>
            <li>A falling account pauses new risk and sends the decision to the CIO.</li>
          </ul>
          <p className="mt-4 text-[13px]" style={{ color: "var(--faint)" }}>The combined view of both books is for reading only.</p>
        </Reveal>
      )}
    </div>
  );
}
