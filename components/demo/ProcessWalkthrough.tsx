"use client";

import { useEffect, useState } from "react";
import { AutoProgressBar, Card, Kicker, Label, Note, Title } from "./ui";

const LOOP = [
  {
    name: "Candidate",
    line: "Under-researched, Shariah compliant.",
    body: "The research engine highlights Calderwick: mid cap, high returns on capital, low debt, light analyst coverage.",
    record: "The original filing, ratios, and the reason it was surfaced.",
  },
  {
    name: "Moat & Valuation",
    line: "Quality at a fair price.",
    body: "We write a thesis on the moat, build bear, base and bull cases, and set an entry price. Price can veto the idea.",
    record: "The thesis, valuation range and the bear-case price.",
  },
  {
    name: "Shariah Screen",
    line: "Checked against the standard.",
    body: "Business activities, debt, cash and receivables checked against the mandate's rules, and re-screened on every filing.",
    record: "The screen verdict, the standard applied and who signed off.",
  },
  {
    name: "Pre-Trade Checks",
    line: "Eleven systematic controls.",
    body: "Eleven controls run before an order is placed: data freshness, limits, liquidity and cost. A failure stops the trade.",
    record: "Every check result, stored with the order.",
  },
  {
    name: "CIO Approval",
    line: "A person approves the order.",
    body: "The CIO reviews the full case and approves one exact order. Any change to the order cancels it. Nothing is sold automatically.",
    record: "Approval, sizing and execution details.",
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
  const [playing, setPlaying] = useState(true);

  // Auto-play: advance through the 6-step cycle every 5.5s until interrupted
  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setI((curr) => (curr + 1) % LOOP.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [playing]);

  const handleSelect = (k: number) => {
    setPlaying(false);
    setI(k);
  };

  const cur = LOOP[i];
  const last = i === LOOP.length - 1;

  return (
    <div className="d-stack" onPointerDown={() => setPlaying(false)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="d-stack-sm">
          <Kicker>The process in action · Illustrative</Kicker>
          <Title>One idea, followed through the full cycle.</Title>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="btn btn-outline self-start !min-h-[40px] text-[13px] md:self-auto"
          >
            {playing ? "⏸ Pause auto-play" : "▶ Resume auto-play"}
          </button>
          <button type="button" onClick={onClose} className="btn btn-outline self-start !min-h-[40px] md:self-auto">
            Back to the overview
          </button>
        </div>
      </div>

      <ol
        className="grid grid-cols-3 gap-2 md:grid-cols-6"
        aria-label="Cycle steps"
        onMouseEnter={() => setPlaying(false)}
      >
        {LOOP.map((s, k) => (
          <li key={s.name}>
            <button
              type="button"
              onClick={() => handleSelect(k)}
              aria-current={k === i ? "step" : undefined}
              className={`d-step relative overflow-hidden w-full transition-all duration-300 ${k === i ? "is-on" : k < i ? "is-done" : ""}`}
            >
              <span className="d-step-n">0{k + 1}</span>
              <span className="d-step-name">{s.name}</span>
              {k === i && <AutoProgressBar durationMs={5500} activeKey={i} paused={!playing} />}
            </button>
          </li>
        ))}
      </ol>
      <p className="d-label text-center">
        {playing ? "Auto-advancing steps in sequence ↺ (hover or click to pause)" : "Repeats every quarter ↺ (paused)"}
      </p>

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
        <button
          type="button"
          className="btn btn-outline !min-h-[40px]"
          onClick={() => {
            setPlaying(false);
            setI((k) => Math.max(0, k - 1));
          }}
          disabled={i === 0}
        >
          Previous step
        </button>
        <button
          type="button"
          className="btn btn-gold !min-h-[40px]"
          onClick={() => {
            setPlaying(false);
            if (last) onClose();
            else setI((k) => k + 1);
          }}
        >
          {last ? "Back to the overview" : "Next step"}
        </button>
      </div>
      <Note>Calderwick is a fictional company used for illustration.</Note>
    </div>
  );
}
