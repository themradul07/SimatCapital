const items = [
  "A person approves every decision",
  "No leverage",
  "No margin",
  "No short selling",
  "No interest-bearing cash",
  "Shariah-screened by the MSCI Islamic method",
  "Paper trading first",
  "Every number traced to stored data",
  "Failed checks stop the trade",
  "Two strategies, never mixed",
];

/** A slow ticker tape of principles. Deliberately no prices and no returns. */
export default function Marquee() {
  const row = (
    <div className="marquee-track" aria-hidden>
      {items.map((t) => (
        <span key={t} className="flex items-center gap-6 whitespace-nowrap px-6 text-[14px] tracking-wide muted">
          <span className="inline-block h-[6px] w-[6px] rotate-45" style={{ background: "var(--gold)" }} />
          {t}
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y py-5" style={{ borderColor: "var(--line)", background: "var(--bg-2)" }}>
      <p className="sr-only">{items.join(". ")}.</p>
      <div className="marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
