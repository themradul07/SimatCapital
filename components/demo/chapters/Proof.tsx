"use client";

import { useState, type ReactNode } from "react";
import { C, CASE_SOURCE, CASE_STEPS, DECISION_LOG, RECEIVE, SAMPLE_HOLDINGS } from "../content";
import { Chapter, Pill, useReducedMotion, useSeen, useTicker } from "../primitives";

/* ================================================================
   08 · Shariah in action — the Honeywell case, played step by step
================================================================ */

function CaseRow({ label, value, on, color }: { label: string; value: string; on: boolean; color?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-[var(--hairline)] py-3 text-[14px]">
      <span className="text-[var(--text-secondary)]">{label}</span>
      <span key={value} className={`text-right font-medium ${on ? "dm-fade-up" : ""}`} style={{ color: on ? color ?? "var(--text-primary)" : "var(--text-secondary)" }}>
        {value}
      </span>
    </div>
  );
}

function CaseVisual() {
  const seen = useSeen();
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  useTicker(seen && playing && step < CASE_STEPS.length - 1, 2600, () => setStep((s) => s + 1));
  const s = reduced && playing ? CASE_STEPS.length - 1 : step;
  const cur = CASE_STEPS[s];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* steps */}
      <div className="dm-panel p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <p className="dm-tag">The steps</p>
          <button
            className="text-link text-[14px]"
            onClick={() => {
              setStep(0);
              setPlaying(true);
            }}
          >
            ↻ Replay
          </button>
        </div>
        <ol className="relative mt-5">
          {CASE_STEPS.map((x, i) => {
            const on = i === s;
            const past = i < s;
            return (
              <li key={x.t} className="relative">
                {i < CASE_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-[-14px] left-[14.5px] top-[44px] w-[2px]"
                    style={{ background: past ? "var(--gold-accent)" : "var(--line-soft)", transition: "background-color 600ms var(--ease)" }}
                  />
                )}
                <button
                  onClick={() => {
                    setPlaying(false);
                    setStep(i);
                  }}
                  aria-current={on ? "step" : undefined}
                  className="relative flex w-full items-start gap-4 rounded-[10px] py-3 pr-3 text-left"
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="relative z-10 mt-[2px] grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border text-[13px] font-semibold"
                    style={{
                      background: on || past ? "var(--gold-accent)" : "var(--bg-base)",
                      color: on || past ? "#0a0907" : "var(--gold-accent)",
                      borderColor: "var(--gold-accent)",
                      boxShadow: on ? "0 0 0 6px var(--gold-glow-soft)" : "none",
                      transition: "all 500ms var(--ease)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold" style={{ color: on || past ? "var(--text-primary)" : "var(--text-secondary)", transition: "color 400ms" }}>
                      {x.t}
                    </span>
                    {on && <span className="dm-fade-up mt-1 block text-[14px] text-[var(--text-secondary)]">{x.d}</span>}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* case file */}
      <div className="dm-panel relative overflow-hidden p-5 sm:p-7" style={{ borderColor: `color-mix(in srgb, ${cur.color} 40%, transparent)`, transition: "border-color 500ms" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="dm-tag">Case file</p>
            <p className="serif mt-1 text-[32px] leading-none">Honeywell</p>
            <p className="mt-1 text-[13px] text-[var(--text-secondary)]">NASDAQ: HON · Flagship holding</p>
          </div>
          <Pill color={cur.color}>{cur.status}</Pill>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-[var(--text-secondary)]">Debt to market value</span>
            <span className="font-semibold" style={{ color: s >= 1 ? C.co : "var(--text-secondary)" }}>
              {s >= 1 ? "About 52%" : "Within threshold"}
            </span>
          </div>
          <div className="relative mt-2 h-3 rounded-full bg-white/[0.06]">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: s >= 1 ? "86%" : "46%", background: s >= 1 ? C.co : C.em, transition: "width 1200ms var(--ease), background-color 600ms" }}
            />
            <span className="absolute -top-1.5 -bottom-1.5 w-[2px]" style={{ left: "55%", background: "var(--text-primary)" }} />
          </div>
          <p className="mt-1.5 text-[11px] text-[var(--text-secondary)]" style={{ paddingLeft: "calc(55% - 22px)" }}>
            Threshold
          </p>
        </div>

        <div className="mt-4">
          <CaseRow label="New purchases" value={s >= 2 ? "Blocked" : "Permitted"} on={s >= 2} color={C.co} />
          <CaseRow label="Review" value={s >= 2 ? "Open, with evidence and compliant alternatives" : "None"} on={s >= 2} />
          <CaseRow label="CIO decision" value={s >= 3 ? "Exit, unless the next filing restores limits" : "Pending"} on={s >= 3} color={C.gold} />
          <CaseRow label="Record" value={s >= 4 ? "Decision, reasons and purification stored" : "Pending"} on={s >= 4} color={C.em} />
        </div>

        <p className="mt-5 text-[12px] text-[var(--text-secondary)]">
          {CASE_SOURCE} Nothing is sold automatically: a person decides.
        </p>
      </div>
    </div>
  );
}

export function ShariahInAction() {
  return (
    <Chapter id="shariah-in-action" wide>
      <CaseVisual />
    </Chapter>
  );
}

/* ================================================================
   09 · Transparency — sample documents an investor would receive
================================================================ */

function Doc({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div className="dm-fade-up relative overflow-hidden rounded-[12px] border border-[var(--panel-line)] bg-[#12100c] p-6 sm:p-8">
      <span aria-hidden className="serif pointer-events-none absolute -right-6 top-10 rotate-[-18deg] select-none text-[110px] font-semibold tracking-[0.1em] text-white/[0.03]">
        SAMPLE
      </span>
      <div className="relative flex items-start justify-between gap-4 border-b border-[var(--hairline)] pb-4">
        <div>
          <p className="dm-tag" style={{ color: C.gold }}>
            Simat Capital
          </p>
          <p className="serif mt-1 text-[26px] leading-tight">{title}</p>
          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">{meta}</p>
        </div>
        <Pill color="var(--text-secondary)">Sample</Pill>
      </div>
      <div className="relative mt-5">{children}</div>
    </div>
  );
}

function Skeleton({ w }: { w: string }) {
  return <span className="block h-2 rounded-full bg-white/[0.07]" style={{ width: w }} />;
}

function Quarterly() {
  return (
    <Doc title="Quarterly report" meta="Flagship strategy · Q3 · illustrative">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="dm-tag">Holdings</p>
          <div className="overflow-x-auto">
            <table className="mt-2 w-full min-w-[340px] text-[14px]">
              <tbody>
                {SAMPLE_HOLDINGS.map((h, i) => (
                  <tr key={h.name} className="dm-fade-up border-t border-[var(--hairline)]" style={{ ["--fd" as string]: `${i * 70}ms` }}>
                    <td className="py-2 font-medium">{h.name}</td>
                    <td className="py-2 text-[var(--text-secondary)]">{h.region}</td>
                    <td className="py-2">
                      <Pill color={C.em}>Shariah pass</Pill>
                    </td>
                    <td className="hidden py-2 text-right sm:table-cell" style={{ color: h.thesis === "On track" ? "var(--text-secondary)" : C.gold }}>
                      {h.thesis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <p className="dm-tag">Performance</p>
          <p className="mt-2 text-[13px] text-[var(--text-secondary)]">Net of all costs, against the stated benchmark. Not shown in this demo.</p>
          <div className="mt-3 grid gap-2">
            <Skeleton w="90%" />
            <Skeleton w="70%" />
          </div>
        </div>
        <div>
          <p className="dm-tag">Risk and attribution</p>
          <div className="mt-3 grid gap-3">
            {["Exposure", "Drawdown", "Liquidity"].map((r, i) => (
              <div key={r}>
                <div className="flex justify-between text-[12px] text-[var(--text-secondary)]">
                  <span>{r}</span>
                  <span>within limit</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full" style={{ width: `${[48, 36, 28][i]}%`, background: C.bl }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Doc>
  );
}

function Alert() {
  const rows = [
    ["Holding", "Honeywell"],
    ["Trigger", "New filing: aerospace business separated"],
    ["Test", "Debt to market value above the threshold"],
    ["Action", "New purchases blocked; CIO review opened"],
    ["Decision", "Exit, unless the next quarterly filing restores limits"],
  ];
  return (
    <Doc title="Shariah alert" meta="Status change · June 2026 · illustrative">
      <div className="rounded-[10px] border p-4" style={{ borderColor: "rgba(255,138,115,0.45)", background: "rgba(255,138,115,0.06)" }}>
        <div className="flex items-center gap-3">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
            <circle cx="5" cy="5" r="4" fill={C.co} />
            <circle cx="5" cy="5" r="4" fill={C.co} className="dm-ping" />
          </svg>
          <p className="text-[15px] font-semibold" style={{ color: C.co }}>
            A holding&apos;s status has changed
          </p>
        </div>
      </div>
      <dl className="mt-4">
        {rows.map(([k, v], i) => (
          <div key={k} className="dm-fade-up flex justify-between gap-6 border-t border-[var(--hairline)] py-3 text-[14px]" style={{ ["--fd" as string]: `${i * 80}ms` }}>
            <dt className="text-[var(--text-secondary)]">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </Doc>
  );
}

function Purification() {
  return (
    <Doc title="Purification statement" meta="Per holding · recorded in the ledger · illustrative">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-[14px]">
          <thead>
            <tr className="text-left text-[12px] text-[var(--text-secondary)]">
              <th className="pb-2 font-medium">Holding</th>
              <th className="pb-2 text-right font-medium">Impure income</th>
              <th className="pb-2 text-right font-medium">Purification</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_HOLDINGS.map((h, i) => (
              <tr key={h.name} className="dm-fade-up border-t border-[var(--hairline)]" style={{ ["--fd" as string]: `${i * 70}ms` }}>
                <td className="py-2.5 font-medium">{h.name}</td>
                <td className="serif py-2.5 text-right text-[17px] text-[var(--text-secondary)]">{h.impure}</td>
                <td className="serif py-2.5 text-right text-[17px]" style={{ color: C.gold }}>
                  {h.amount}
                </td>
              </tr>
            ))}
            <tr className="border-t border-[var(--line)]">
              <td className="pt-3 font-semibold">Total recorded</td>
              <td />
              <td className="serif pt-3 text-right text-[20px]" style={{ color: C.gold }}>
                £25.05
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Doc>
  );
}

function DecisionLog() {
  const [filter, setFilter] = useState<"All" | "Approved" | "Rejected">("All");
  const rows = DECISION_LOG.filter((r) => filter === "All" || r.outcome === filter);
  const approved = DECISION_LOG.filter((r) => r.outcome === "Approved").length;
  return (
    <Doc title="Decision log" meta={`${DECISION_LOG.length} proposals · ${approved} approved · ${DECISION_LOG.length - approved} rejected · illustrative`}>
      <div className="flex gap-2" role="radiogroup" aria-label="Filter decisions">
        {(["All", "Approved", "Rejected"] as const).map((f) => (
          <button key={f} role="radio" aria-checked={f === filter} className="dm-chip !min-h-[34px] !text-[13px]" style={{ ["--chip" as string]: f === "Rejected" ? C.co : f === "Approved" ? C.em : C.gold }} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <ul className="mt-4">
        {rows.map((r, i) => (
          <li key={`${filter}-${r.idea}`} className="dm-fade-up grid grid-cols-[52px_1fr_auto] items-start gap-3 border-t border-[var(--hairline)] py-3 text-[14px]" style={{ ["--fd" as string]: `${i * 60}ms` }}>
            <span className="serif text-[15px] text-[var(--text-secondary)]">{r.date}</span>
            <span>
              <span className="block font-medium">{r.idea}</span>
              <span className="block text-[13px] text-[var(--text-secondary)]">{r.why}</span>
            </span>
            <Pill color={r.outcome === "Approved" ? C.em : C.co}>{r.outcome}</Pill>
          </li>
        ))}
      </ul>
    </Doc>
  );
}

function ReceiveVisual() {
  const [tab, setTab] = useState<(typeof RECEIVE)[number]["id"]>("log");
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div role="tablist" aria-label="What you receive" aria-orientation="vertical" className="grid content-start gap-2">
        {RECEIVE.map((r, i) => {
          const on = r.id === tab;
          return (
            <button
              key={r.id}
              role="tab"
              aria-selected={on}
              aria-controls="receive-panel"
              onClick={() => setTab(r.id)}
              className="flex items-start gap-4 rounded-[12px] border px-5 py-4 text-left"
              style={{
                borderColor: on ? "var(--gold-accent)" : "var(--panel-line)",
                background: on ? "rgba(214,180,106,0.07)" : "transparent",
                transition: "all 400ms var(--ease)",
                cursor: "pointer",
              }}
            >
              <span className="serif text-[20px]" style={{ color: on ? C.gold : "var(--text-secondary)" }}>
                {`0${i + 1}`}
              </span>
              <span>
                <span className="block text-[16px] font-semibold">{r.t}</span>
                <span className="mt-0.5 block text-[14px] text-[var(--text-secondary)]">{r.b}</span>
              </span>
            </button>
          );
        })}
        <p className="mt-2 px-1 text-[12px] text-[var(--text-secondary)]">Samples. Illustrative only.</p>
      </div>
      <div id="receive-panel" role="tabpanel" key={tab}>
        {tab === "quarterly" && <Quarterly />}
        {tab === "alert" && <Alert />}
        {tab === "purification" && <Purification />}
        {tab === "log" && <DecisionLog />}
      </div>
    </div>
  );
}

export function Transparency() {
  return (
    <Chapter id="transparency" wide>
      <ReceiveVisual />
    </Chapter>
  );
}
