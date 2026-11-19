import KHead from "./KHead";
import Reveal from "../Reveal";

const FLOW = [
  { t: "Agents research and propose", s: "AI" },
  { t: "Code checks every rule", s: "Code" },
  { t: "The CIO approves", s: "You decide", decide: true },
  { t: "One locked-down service places the order", s: "Execution" },
  { t: "Reconciled to the broker and recorded", s: "Record" },
];

export default function PersonDecides() {
  return (
    <section id="how-it-works" className="k-section">
      <div className="wrap space-y-14">
        <KHead
          chip="A person decides"
          title={
            <>
              AI proposes. Code checks. <span className="italic-gold">A person decides.</span>
            </>
          }
          lede="AI researches and proposes. Code decides what is allowed. The founder decides what is done."
        />

        {/* The core flow */}
        <Reveal className="card-kelder relative overflow-hidden p-6 md:p-10">
          <ol className="relative grid gap-6 md:grid-cols-5 md:gap-4">
            <span
              aria-hidden
              className="absolute left-[11px] top-3 bottom-3 w-px md:left-[10%] md:right-[10%] md:top-[11px] md:bottom-auto md:h-px md:w-auto"
              style={{ background: "linear-gradient(90deg, var(--gold-hairline), var(--gold), var(--gold-hairline))" }}
            />
            {FLOW.map((f, i) => (
              <li key={f.t} className="relative flex items-start gap-4 md:flex-col md:items-center md:text-center">
                <span
                  className="relative z-10 flex h-6 w-6 shrink-0 rotate-45 items-center justify-center border"
                  style={{
                    background: f.decide ? "var(--gold)" : "var(--bg)",
                    borderColor: "var(--gold)",
                    boxShadow: f.decide ? "0 0 28px rgba(214,180,106,0.45)" : "none",
                  }}
                >
                  <span className="-rotate-45 text-[10px] font-bold" style={{ color: f.decide ? "var(--bg)" : "var(--gold)" }}>
                    {i + 1}
                  </span>
                </span>
                <span className="md:mt-4">
                  <span
                    className="block text-[11px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: f.decide ? "var(--gold)" : "var(--muted)" }}
                  >
                    {f.s}
                  </span>
                  <span className="mt-1 block text-[15px]" style={{ color: "var(--cream)" }}>
                    {f.t}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Plain-language promises */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          <Reveal className="card-kelder p-7 md:col-span-7">
            <span className="eyebrow-kelder">01 · No agent can act</span>
            <h3 className="h3 mt-3">Agents can propose. They cannot act.</h3>
            <p className="mt-3 text-[15px] muted">
              No agent can place an order, change a limit or approve anything. Agents hold no broker keys. One locked-down
              service is the only thing that can send an order.
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3 text-center text-[12.5px]">
              {["Place an order", "Change a limit", "Approve anything"].map((t) => (
                <div key={t} className="rounded-xl border px-3 py-4" style={{ borderColor: "var(--line)" }}>
                  <span className="block text-[18px]" style={{ color: "var(--stop)" }}>×</span>
                  <span className="muted">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="card-kelder p-7 md:col-span-5">
            <span className="eyebrow-kelder">02 · Fail closed</span>
            <h3 className="h3 mt-3">If a check fails, the trade stops.</h3>
            <p className="mt-3 text-[15px] muted">
              If a check fails or data is missing, the trade stops. It is never assumed to pass.
            </p>
          </Reveal>

          <Reveal delay={150} className="card-kelder-gold p-7 md:col-span-5">
            <span className="eyebrow-kelder">03 · Passkey approval</span>
            <h3 className="h3 mt-3">One approval, one exact order.</h3>
            <p className="mt-3 text-[15px] muted">
              Approval is by passkey, tied to one exact order. If the order changes, the approval is cancelled.
            </p>
          </Reveal>

          <Reveal delay={200} className="card-kelder p-7 md:col-span-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="eyebrow-kelder">04 · Kill switch</span>
                <h3 className="h3 mt-3">Stops new orders immediately.</h3>
                <p className="mt-3 max-w-md text-[15px] muted">
                  A kill switch stops new orders at once. It never sells a holding by itself.
                </p>
              </div>
              <span
                aria-hidden
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: "var(--gold-hairline)", background: "var(--bg)" }}
              >
                <span className="h-9 w-9 rounded-full border-2" style={{ borderColor: "var(--gold)" }} />
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
