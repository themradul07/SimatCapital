/**
 * "Important information" for the investor demo (from the former slide 37,
 * without the return and benchmark lines). Draft wording pending solicitor review.
 */
const SOURCES: [string, string][] = [
  ["Third-party data", "HSBC Islamic Global Equity Index Fund factsheet to 30 September 2026, in USD, after fees. Scholar board-seat figure: Bloomberg."],
  ["Shariah", "MSCI Islamic methodology is the house standard. Shariah governance is being formalised, and screening results are provisional until it is in place."],
  ["Illustrative", "Company X, the activity log and the process walkthrough use illustrative or fictional companies and do not describe real holdings."],
  ["Status", "Nothing in this overview has been audited or independently verified."],
];

export default function ImportantInfo() {
  return (
    <div className="space-y-5 text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
      <p style={{ color: "var(--text-primary)" }}>
        Capital at risk. The value of investments can fall as well as rise, and you may get back less than you invest. Past performance
        is not a reliable indicator of future results.
      </p>
      <p>
        This overview is for information only and is not an offer, a recommendation or advice. Simat Capital is not authorised by the
        Financial Conduct Authority and does not manage outside capital. Both strategies currently run on the founder&apos;s own capital.
      </p>
      <p>
        Investment aims and objectives described here are aims, not guarantees. Shariah screening is applied using a recognised
        methodology; it is not a fatwa or a certification of compliance.
      </p>
      <dl className="mt-6 grid gap-4 border-t pt-6" style={{ borderColor: "var(--hairline)" }}>
        {SOURCES.map(([k, v]) => (
          <div key={k} className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-6">
            <dt className="d-label">{k}</dt>
            <dd className="text-[14px]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
