import { FLAGS } from "@/lib/flags";

/**
 * I8 — Status at a glance. Solid gold diamond = in place; outlined diamond = in progress;
 * grey dash = not yet available.
 */
const COLUMNS = [
  {
    key: "in-place",
    title: "In place",
    items: [
      "Proprietary research engine, end to end",
      "Systematic pre-trade controls with verified CIO approval",
      "Shariah screening on a recognised methodology, stored with every decision",
      "Both strategies running on the founder's own capital, reconciled and recorded",
    ],
  },
  {
    key: "in-progress",
    title: "In progress",
    items: [
      // [Confirm] hidden until Eesaa confirms
      ...(FLAGS.showCompanyIncorporation ? ["Company incorporation"] : []),
      "Independent security review",
      "Legal and regulatory structure for external capital",
    ],
  },
  {
    key: "not-yet",
    title: "Not yet available",
    items: ["External capital", "A verified track record for the firm"],
  },
] as const;

function Marker({ kind }: { kind: string }) {
  if (kind === "in-place") return <span className="dia mt-[7px]" aria-hidden />;
  if (kind === "in-progress") return <span className="dia dia-outline mt-[7px]" aria-hidden />;
  return <span className="mt-[11px] inline-block h-px w-2.5 shrink-0" style={{ background: "var(--text-secondary)" }} aria-hidden />;
}

export default function StatusGlance() {
  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-8">
      {COLUMNS.map((c) => (
        <div key={c.key} className="border-t pt-5" style={{ borderColor: c.key === "not-yet" ? "var(--hairline)" : "var(--line)" }}>
          <h3 className="flex items-center gap-3 text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
            <Marker kind={c.key} />
            <span className="-mt-px">{c.title}</span>
          </h3>
          <ul className="mt-5 space-y-3.5">
            {c.items.map((it) => (
              <li key={it} className="flex gap-3 text-[15px] secondary">
                <Marker kind={c.key} />
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
