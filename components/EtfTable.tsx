import Reveal from "./Reveal";

const rows = [
  ["Selection", "Owns every compliant company at any price", "Buys only at a sensible price"],
  ["Concentration", "Weights follow the index, often heavy in a few big names", "Hard position and sector limits, conviction over index weight"],
  ["Compliance timing", "Re-screened at index review dates", "Re-screened when a company publishes results"],
  ["Purification", "Often left to the investor", "Calculated and recorded for every holding"],
  ["Downturns", "Falls with the index", "Risk set before every trade, cash held when ideas are scarce"],
];

export default function EtfTable({ full = false }: { full?: boolean }) {
  return (
    <Reveal className="card overflow-x-auto p-0">
      <table className="table min-w-[640px]">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Passive Shariah ETF</th>
            <th style={{ color: "var(--gold)" }}>Simat Capital</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([t, etf, us]) => (
            <tr key={t}>
              <td>{t}</td>
              <td className="muted">{etf}</td>
              <td style={{ color: "var(--cream)" }}>{us}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {full && (
        <p className="border-t px-[18px] py-4 text-[13px]" style={{ borderColor: "var(--line)", color: "var(--faint)" }}>
          ETFs are not bad; they make different trade-offs. No fund names, returns or figures are shown here. A fuller
          comparison will only be published once every figure is verified, dated and sourced.
        </p>
      )}
    </Reveal>
  );
}
