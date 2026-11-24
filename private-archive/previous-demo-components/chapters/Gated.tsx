"use client";

import {
  C,
  COMPARISON,
  COMPARISON_CAVEAT,
  FACTSHEET,
  PENDING,
  RISK_WARNING,
  TRACK_LABELS,
  TRACK_PERIODS,
  TRACK_RISK,
  TRACK_SERIES,
} from "../content";
import { Chapter, Pill, d } from "../primitives";

/* ================================================================
   Hidden until legal sign-off (brief, B: Screens 4, 5 and 18).
   Rendered only when LEGAL_SCREENS is on. No figures are filled in:
   each shows "Pending sign-off" until the verified numbers arrive.
================================================================ */

function Pending() {
  return <span className="text-[13px] text-[var(--text-secondary)]">{PENDING}</span>;
}

function Labels() {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {TRACK_LABELS.map((l) => (
        <Pill key={l} color="var(--text-secondary)">
          {l}
        </Pill>
      ))}
    </div>
  );
}

/* ---------- Screen 4 · Track record ---------- */

export function TrackRecord() {
  return (
    <Chapter id="track-record">
      <div className="dm-panel p-5 sm:p-7">
        <p className="dm-tag">Returns · Flagship against its benchmarks</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[14px]">
            <thead>
              <tr className="text-[var(--text-secondary)]">
                <th className="py-2 pr-4 font-medium" scope="col">
                  Period
                </th>
                {TRACK_SERIES.map((s) => (
                  <th key={s} className="py-2 pr-4 font-medium" scope="col" style={{ color: s === "Flagship" ? C.gold : undefined }}>
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRACK_PERIODS.map((p) => (
                <tr key={p} className="border-t border-[var(--hairline)]">
                  <th className="py-3 pr-4 font-medium" scope="row">
                    {p}
                  </th>
                  {TRACK_SERIES.map((s) => (
                    <td key={s} className="py-3 pr-4">
                      <Pending />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="dm-tag mt-7">Risk</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRACK_RISK.map((r, i) => (
            <div key={r} className="dm-x rounded-[10px] border border-[var(--panel-line)] p-4" style={d(200 + i * 80)}>
              <p className="text-[13px] text-[var(--text-secondary)]">{r}</p>
              <p className="mt-2">
                <Pending />
              </p>
            </div>
          ))}
        </div>
        <Labels />
      </div>
    </Chapter>
  );
}

/* ---------- Screen 5 · The competition (qualitative only) ---------- */

export function Competition() {
  return (
    <Chapter id="competition">
      <div className="dm-panel p-5 sm:p-7">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-[14px]">
            <thead>
              <tr>
                <th className="py-2 pr-4 font-medium text-[var(--text-secondary)]" scope="col">
                  Topic
                </th>
                <th className="py-2 pr-4 font-medium" scope="col" style={{ color: C.bl }}>
                  Passive Shariah ETF
                </th>
                <th className="py-2 font-medium" scope="col" style={{ color: C.gold }}>
                  Simat Capital
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.topic} className="dm-x border-t border-[var(--hairline)] align-top" style={d(200 + i * 90)}>
                  <th className="py-3 pr-4 font-semibold" scope="row">
                    {row.topic}
                  </th>
                  <td className="py-3 pr-4 text-[var(--text-secondary)]">{row.etf}</td>
                  <td className="py-3 text-[var(--text-primary)]">{row.simat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[12px] text-[var(--text-secondary)]">{COMPARISON_CAVEAT}</p>
      </div>
    </Chapter>
  );
}

/* ---------- Screen 18 · Factsheet (no terms or fees line) ---------- */

export function Factsheet() {
  return (
    <Chapter id="factsheet">
      <div className="dm-panel p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="dm-tag" style={{ color: C.gold }}>
            Flagship strategy
          </p>
          <Pill color="var(--text-secondary)">One page</Pill>
        </div>
        <dl className="mt-4">
          {FACTSHEET.map((f) => (
            <div key={f.t} className="grid gap-1 border-t border-[var(--hairline)] py-3 text-[14px] sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="text-[var(--text-secondary)]">{f.t}</dt>
              <dd className="text-[var(--text-primary)]">{f.b}</dd>
            </div>
          ))}
          {["Risk figures", "Performance"].map((t) => (
            <div key={t} className="grid gap-1 border-t border-[var(--hairline)] py-3 text-[14px] sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="text-[var(--text-secondary)]">{t}</dt>
              <dd>
                <Pending />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 rounded-[12px] border-l-2 bg-[rgba(255,138,115,0.05)] p-5" style={{ borderColor: C.co }}>
          <p className="dm-tag" style={{ color: C.co }}>
            Risk warning
          </p>
          <p className="mt-2 text-[14px] text-[var(--text-primary)]">{RISK_WARNING}</p>
        </div>
        <Labels />
      </div>
    </Chapter>
  );
}
