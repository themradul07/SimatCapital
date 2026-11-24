"use client";

import { useState } from "react";
import { Card, Kicker, Label, Note, Title } from "./ui";

/**
 * "See the process in action": the six-step investment loop, followed through
 * one illustrative idea. Opened from the closing slide, not part of the main flow.
 */
const LOOP = [
  {
    name: "Research",
    line: "Research engine shortlist",
    body: "Calderwick, a UK industrial, appears on the research engine shortlist. Its thesis is traced to its filings, and the idea states what would prove it wrong.",
    record: "Thesis, sources and the conditions that would change our mind.",
  },
  {
    name: "Construct",
    line: "Value it. Size it. Challenge it.",
    body: "The idea is valued in bear, base and bull cases and sized within position and sector limits. A full bear case is written and tested, and any dissent is recorded.",
    record: "Valuation range, proposed size and the bear case.",
  },
  {
    name: "Approve",
    line: "Checks first. Then one person decides.",
    body: "Pre-trade checks cover Shariah status, limits, liquidity and trading cost. Passing them approves nothing: the CIO approves or rejects the order.",
    record: "Each check result and the CIO's decision with reasons.",
  },
  {
    name: "Monitor",
    line: "Results and rules, watched together.",
    body: "Holdings, limits and Shariah status are reviewed continuously. Each holding is re-screened as soon as new filings are published.",
    record: "Screening history and limit usage over time.",
  },
  {
    name: "Respond",
    line: "A change triggers a review, not a sale.",
    body: "If a filing changes a holding's Shariah status, new purchases pause and a review opens with the evidence. Nothing is sold automatically.",
    record: "The trigger, the evidence and the decision taken.",
  },
  {
    name: "Report",
    line: "A clear quarterly record.",
    body: "The quarterly report is built from these records: holdings, Shariah status, purification and the reasoning behind each decision.",
    record: "The report, and every record behind it.",
  },
];

export default function ProcessWalkthrough({ onClose }: { onClose: () => void }) {
  const [i, setI] = useState(0);
  const cur = LOOP[i];
  const last = i === LOOP.length - 1;

  return (
    <div className="d-stack">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="d-stack-sm">
          <Kicker>The process in action · Illustrative</Kicker>
          <Title>One idea, followed through the full cycle.</Title>
        </div>
        <button type="button" onClick={onClose} className="btn btn-outline self-start !min-h-[40px] md:self-auto">
          Back to the overview
        </button>
      </div>

      <ol className="grid grid-cols-3 gap-2 md:grid-cols-6" aria-label="Cycle steps">
        {LOOP.map((s, k) => (
          <li key={s.name}>
            <button
              type="button"
              onClick={() => setI(k)}
              aria-current={k === i ? "step" : undefined}
              className={`d-step w-full ${k === i ? "is-on" : k < i ? "is-done" : ""}`}
            >
              <span className="d-step-n">0{k + 1}</span>
              <span className="d-step-name">{s.name}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="d-label text-center">Repeats every quarter ↺</p>

      <Card key={i} accent className="d-fade grid gap-6 md:grid-cols-[1.4fr_1fr] md:!p-8">
        <div className="flex flex-col gap-3">
          <Label className="!text-[var(--gold-accent)]">
            Step {i + 1} of 6 · {cur.line}
          </Label>
          <p className="serif text-[34px] leading-tight" style={{ color: "var(--text-primary)" }}>
            {cur.name}
          </p>
          <p className="text-[16px] leading-relaxed secondary">{cur.body}</p>
        </div>
        <div className="flex flex-col gap-2 border-t pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0" style={{ borderColor: "var(--hairline)" }}>
          <Label>What is recorded</Label>
          <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
            {cur.record}
          </p>
        </div>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <button type="button" className="btn btn-outline !min-h-[40px]" onClick={() => setI((k) => Math.max(0, k - 1))} disabled={i === 0}>
          Previous step
        </button>
        <button type="button" className="btn btn-gold !min-h-[40px]" onClick={() => (last ? onClose() : setI((k) => k + 1))}>
          {last ? "Back to the overview" : "Next step"}
        </button>
      </div>
      <Note>Calderwick is a fictional company used for illustration.</Note>
    </div>
  );
}
