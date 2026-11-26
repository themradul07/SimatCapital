"use client";

import { useEffect, useState } from "react";
import { AutoProgressBar, Card, Kicker, Label, Note, Pill, Title } from "./ui";

/* ───────────────────────── 1 · Our beliefs ───────────────────────── */

const BELIEFS = [
  { t: "Quality businesses", b: "Durable advantages and high returns on capital.", how: "We look for companies that could still be leading their markets in ten years." },
  { t: "Strong balance sheets", b: "Low debt: a Shariah requirement and a risk control.", how: "A company that depends on borrowing fails both our screen and our judgement." },
  { t: "Valuation discipline", b: "A great company at the wrong price is a poor investment.", how: "Every idea is valued before it is sized, and price can veto a purchase." },
  { t: "Patience", b: "A concentrated portfolio of 11 to 14 companies, held for the long term.", how: "Our horizon for each holding is three to five years." },
];

export function Beliefs() {
  const [open, setOpen] = useState<number | null>(0);
  const [interrupted, setInterrupted] = useState(false);

  // Auto-play: sequentially expand each principle every 5.5s until interrupted
  useEffect(() => {
    if (interrupted) return;
    const interval = setInterval(() => {
      setOpen((prev) => ((prev ?? 0) + 1) % BELIEFS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [interrupted]);

  const handleCardClick = (i: number) => {
    setInterrupted(true);
    setOpen((prev) => (prev === i ? null : i));
  };

  return (
    <div className="d-stack" onPointerDown={() => setInterrupted(true)}>
      <div className="flex flex-col gap-2 border-b pb-5 sm:flex-row sm:items-baseline sm:justify-between" style={{ borderColor: "var(--hairline)" }}>
        <p className="d-label !text-[var(--gold-accent)]">Simat Capital – Investor overview. Confidential.</p>
        <p className="text-[14px] italic secondary">Both strategies currently run on the founder&apos;s own capital.</p>
      </div>
      <Title>Four principles behind every decision.</Title>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BELIEFS.map((x, i) => {
          const on = open === i;
          return (
            <button
              key={x.t}
              type="button"
              aria-expanded={on}
              onClick={() => handleCardClick(i)}
              onMouseEnter={() => {
                setInterrupted(true);
                setOpen(i);
              }}
              className={`d-card d-card-btn d-rise relative overflow-hidden flex min-h-[250px] flex-col gap-3 text-left transition-all duration-300 ${
                on ? "d-card-accent shadow-[0_0_20px_rgba(214,180,106,0.18)]" : ""
              }`}
              style={{ ["--i" as string]: i }}
            >
              <span className="serif text-[34px] leading-none" style={{ color: "var(--gold-accent)" }}>
                {["I", "II", "III", "IV"][i]}
              </span>
              <span className="serif mt-2 text-[26px] leading-tight" style={{ color: "var(--text-primary)" }}>
                {x.t}
              </span>
              <span className="text-[14.5px] leading-relaxed secondary">{x.b}</span>
              {on ? (
                <span className="d-fade mt-auto border-t pt-3 text-[14px] leading-relaxed" style={{ borderColor: "var(--line-soft)", color: "var(--text-primary)" }}>
                  {x.how}
                </span>
              ) : (
                <span className="d-label mt-auto">In practice +</span>
              )}
              {on && <AutoProgressBar durationMs={5500} activeKey={open ?? 0} paused={interrupted} />}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-secondary)]/50 text-right">
        {interrupted ? "Paused on selection" : "Auto-playing principles in sequence · hover or click to pause"}
      </p>
    </div>
  );
}

/* ───────────────────────── 2 · The problem ───────────────────────── */

const PROBLEMS = [
  {
    title: "Concentration in a few names",
    stat: "24%",
    statLabel: "of the HSBC Islamic Global Equity Index Fund sits in three companies: Apple 8.2%, Microsoft 8.1%, Alphabet 8.0%.",
    problem: "Screening alone leaves capital concentrated in a handful of US technology companies.",
    head: "We aim to own only the companies that earn their place.",
    answer: "A concentrated portfolio of 11 to 14 companies across the UK, US and Japan, chosen from the bottom up and sized by conviction rather than index weight.",
  },
  {
    title: "Always fully invested in a fall",
    stat: "−25.3%",
    statLabel: "HSBC Islamic Global Equity Index Fund, calendar year 2022.",
    problem: "An index fund stays fully invested as markets fall. It cannot hold cash or defensive assets.",
    head: "Aim to limit drawdowns.",
    answer: "Gold and cash are held as ballast within the mandate. They are designed to soften falls and to fund purchases of quality companies at lower prices.",
  },
  {
    title: "Buying at any price",
    stat: "No price test",
    statLabel: "An index fund buys every company that passes the screen, whatever its valuation.",
    problem: "New money is invested regardless of valuation, interest rates or the direction of debt.",
    head: "Valuation before sizing.",
    answer: "Every idea is valued in bear, base and bull cases before it is sized. Price can veto a purchase.",
  },
  {
    title: "Sector drift",
    stat: "Tech-heavy",
    statLabel: "Screening tends to leave technology as the largest sector.",
    problem: "Without sector and theme limits, portfolios drift into the same crowded positions.",
    head: "Limits that apply to us too.",
    answer: "Our own limits flagged a semiconductor overweight, and we are reducing it within our rebalancing rules.",
  },
  {
    title: "Status that moves with the share price",
    stat: "Price-driven",
    statLabel: "Debt measured against market value can breach a limit when the share price falls.",
    problem: "A falling share price can turn a compliant holding non-compliant, prompting sales at weak prices.",
    head: "Reduce the risk of being a forced seller.",
    answer: "Debt is measured against total assets as well as market value. A breach opens a review and an orderly exit window, not an automatic sale.",
  },
  {
    title: "Compliance taken on trust",
    stat: "621",
    statLabel: "Shariah board seats held by 20 scholars.",
    problem: "Investors rarely see the evidence, ratios or reasoning behind a Shariah approval.",
    head: "Evidence you can check.",
    answer: "Each verdict is stored with the filing, the ratios, the standard applied, the date and who signed it off.",
  },
];

export function Problem() {
  const [sel, setSel] = useState(0);
  const [interrupted, setInterrupted] = useState(false);

  // Auto-play: cycle through problems every 6.5s until interrupted
  useEffect(() => {
    if (interrupted) return;
    const interval = setInterval(() => {
      setSel((s) => (s + 1) % PROBLEMS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [interrupted]);

  const handleSelect = (i: number) => {
    setInterrupted(true);
    setSel(i);
  };

  const p = PROBLEMS[sel];
  return (
    <div className="d-stack" onPointerDown={() => setInterrupted(true)}>
      <div className="flex items-center justify-between">
        <Kicker>The problem</Kicker>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]/50">
          {interrupted ? "Paused on selection" : "Auto-playing in sequence · click tab to pause"}
        </span>
      </div>
      <Title>Shariah investors face problems that screening alone doesn&apos;t solve.</Title>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div
          role="tablist"
          aria-label="Problems"
          className="flex flex-col gap-2"
          onMouseEnter={() => setInterrupted(true)}
        >
          {PROBLEMS.map((q, i) => (
            <button
              key={q.title}
              role="tab"
              aria-selected={sel === i}
              type="button"
              onClick={() => handleSelect(i)}
              className={`d-row-btn relative overflow-hidden transition-all duration-300 ${sel === i ? "is-on" : ""}`}
            >
              <span className="serif w-6 text-[20px]" style={{ color: sel === i ? "var(--gold-accent)" : "var(--text-secondary)" }}>
                {i + 1}
              </span>
              <span>{q.title}</span>
              {sel === i && <AutoProgressBar durationMs={6500} activeKey={sel} paused={interrupted} />}
            </button>
          ))}
        </div>
        <div key={sel} role="tabpanel" className="d-fade grid gap-4 md:grid-cols-2">
          <Card className="flex flex-col gap-4">
            <Label>The problem</Label>
            <span className="serif text-[48px] leading-none" style={{ color: "var(--status-breach)" }}>
              {p.stat}
            </span>
            <span className="text-[13.5px] leading-relaxed secondary">{p.statLabel}</span>
            <hr className="d-hr" />
            <span className="text-[15.5px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
              {p.problem}
            </span>
          </Card>
          <Card accent className="flex flex-col gap-4">
            <Label className="!text-[var(--gold-accent)]">Our approach</Label>
            <span className="serif text-[28px] leading-tight" style={{ color: "var(--text-primary)" }}>
              {p.head}
            </span>
            <span className="text-[15.5px] leading-relaxed secondary">{p.answer}</span>
          </Card>
        </div>
      </div>
      <Note>
        Sources: HSBC Islamic Global Equity Index Fund factsheet (30 Sep 2026); Bloomberg on scholar board seats; Hong Kong IFEC guide to
        Islamic funds. Simat Capital aims are objectives, not guarantees.
      </Note>
    </div>
  );
}

/* ───────────────────────── 3 · Why Shariah is hard ───────────────────────── */

export function WhyHard() {
  const [fell, setFell] = useState(false);
  const [interrupted, setInterrupted] = useState(false);

  // Auto-play: cycle between baseline and −10% share price fall every 6s until interrupted
  useEffect(() => {
    if (interrupted) return;
    const interval = setInterval(() => {
      setFell((f) => !f);
    }, 6000);
    return () => clearInterval(interval);
  }, [interrupted]);

  const handleToggleFell = () => {
    setInterrupted(true);
    setFell((f) => !f);
  };

  const debt = 3.2;
  const mv = fell ? 9.9 : 11.0;
  const mvRatio = (debt / mv) * 100;
  const STD = [
    { name: "AAOIFI", rule: "Debt ÷ market value", v: mvRatio, lim: 30 },
    { name: "S&P Shariah", rule: "Debt ÷ 36-month average market value", v: 29.6, lim: 33 },
    { name: "MSCI Islamic", rule: "Debt ÷ total assets", v: 32.0, lim: 33.33 },
    { name: "FTSE Shariah", rule: "Debt ÷ total assets", v: 32.0, lim: 33.33 },
  ];
  const scale = 45;

  return (
    <div className="d-stack" onPointerDown={() => setInterrupted(true)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="d-stack-sm">
          <Kicker>Why Shariah is hard</Kicker>
          <Title>One company. Four rulebooks. Two answers.</Title>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            type="button"
            onClick={handleToggleFell}
            className={`btn relative overflow-hidden ${fell ? "btn-gold" : "btn-outline"} transition-all`}
            aria-pressed={fell}
          >
            {fell ? "Undo the fall" : "Share price −10%"}
            <AutoProgressBar
              durationMs={6000}
              activeKey={String(fell)}
              paused={interrupted}
              tone={fell ? "dark" : "gold"}
            />
          </button>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
        <Card className="flex flex-col gap-3 text-[15px]">
          <Label>Company X · Illustrative</Label>
          <Row k="Debt" v="$3.2bn" />
          <Row k="Total assets" v="$10.0bn" />
          <Row k="Market value" v={`$${mv.toFixed(1)}bn`} hot={fell} />
          <hr className="d-hr" />
          <Row k="Debt ÷ assets" v="32.0%" />
          <Row k="Debt ÷ market value" v={`${mvRatio.toFixed(1)}%`} hot={fell} />
        </Card>
        <div className="grid gap-3 sm:grid-cols-2">
          {STD.map((s) => {
            const pass = s.v <= s.lim;
            return (
              <Card key={s.name} className={`flex flex-col gap-2 transition-colors duration-500 ${pass ? "" : "d-card-breach"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[17px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {s.name}
                  </span>
                  <Pill tone={pass ? "pass" : "breach"}>{pass ? "Pass" : "Fail"}</Pill>
                </div>
                <span className="text-[13px] secondary">{s.rule}</span>
                <div className="relative mt-1 h-[6px] rounded-full" style={{ background: "var(--hairline)" }}>
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700"
                    style={{ width: `${(s.v / scale) * 100}%`, background: pass ? "var(--status-pass)" : "var(--status-breach)" }}
                  />
                  <div className="absolute -top-[5px] h-4 w-[2px]" style={{ left: `${(s.lim / scale) * 100}%`, background: "var(--text-primary)" }} />
                </div>
                <span className="text-[12.5px] secondary tabular-nums">
                  {s.v.toFixed(1)}% against a limit of {s.lim}%
                </span>
              </Card>
            );
          })}
        </div>
      </div>
      <p key={String(fell)} className="d-fade text-[15.5px]" style={{ color: "var(--text-primary)" }}>
        {fell
          ? "After a 10% fall, AAOIFI fails while the other three still pass. Same company, same filing, two answers."
          : "Today all four standards pass. Press “Share price −10%” to see what a market move alone can do."}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Label className="mr-2 !text-[var(--gold-accent)]">Every verdict we store</Label>
        {["The filing", "The ratios", "The standard", "The date", "Who signed off"].map((t) => (
          <span key={t} className="d-chip">
            {t}
          </span>
        ))}
        <Note className="sm:ml-auto">Illustrative example.</Note>
      </div>
    </div>
  );
}

function Row({ k, v, hot = false }: { k: string; v: string; hot?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="secondary">{k}</span>
      <span className="tabular-nums transition-colors duration-500" style={{ color: hot ? "var(--status-breach)" : "var(--text-primary)" }}>
        {v}
      </span>
    </div>
  );
}

/* ───────────────────────── 4 · Our process ───────────────────────── */

const STEPS = [
  { name: "Research", kind: "Reads", does: "Reads filings, results and news across the UK, US and Japan, and surfaces ideas.", checks: "Each claim against its source document.", guard: "Can propose an idea. Cannot decide." },
  { name: "Valuation", kind: "Prices", does: "Values each idea in bear, base and bull cases.", checks: "Whether the price leaves a margin of safety.", guard: "Price can veto an otherwise good idea." },
  { name: "Shariah", kind: "Screens", does: "Screens each idea and holding under the house standard, as filings are published.", checks: "Business activity, debt, cash and income ratios. Purification per holding.", guard: "Missing or conflicting evidence stops a purchase." },
  { name: "Challenge", kind: "Questions", does: "A full bear case is written and tested for every idea.", checks: "Weak assumptions, and what would prove the thesis wrong.", guard: "Dissent is recorded." },
  { name: "Risk", kind: "Limits", does: "Tests each proposed trade against the mandate's limits and stress scenarios.", checks: "Position, sector and theme limits. Liquidity. Trading cost.", guard: "A limit breach stops the trade." },
  { name: "Portfolio", kind: "Builds", does: "Sizes and combines the ideas that pass into one proposal.", checks: "How each position fits the whole portfolio.", guard: "Sends a complete case to the CIO, never an order to the broker." },
  { name: "CIO decides", kind: "Decides", does: "Reviews the complete case and approves or rejects it.", checks: "Thesis, valuation, Shariah status, risk and fit, side by side.", guard: "Only the CIO can approve a trade. Every decision is logged." },
];

const LOG = [
  "Filing read: Calderwick half-year results",
  "Valued three ways: base case unchanged",
  "Shariah re-screen: Calderwick passes",
  "Challenge: two assumptions flagged",
  "Risk check: proposed trim within limits",
  "Proposal built: trim position",
  "CIO approved. Decision logged",
];

export function Process() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 5800);
    return () => clearInterval(t);
  }, [playing]);

  const handleStepSelect = (idx: number) => {
    setPlaying(false);
    setStep(idx);
  };

  const cur = STEPS[step];
  const last = STEPS.length - 1;

  return (
    <div className="d-stack" onPointerDown={() => setPlaying(false)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="d-stack-sm">
          <Kicker>Our process</Kicker>
          <p className="text-[15px]" style={{ color: "var(--text-primary)" }}>
            From a wide Shariah-screened universe across the UK, US and Japan to 11 to 14 holdings.
          </p>
          <Title>Six checks. One decision. Every idea.</Title>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="btn btn-outline self-start text-[13px] !py-1.5 !px-3 md:self-auto"
          >
            {playing ? "⏸ Pause auto-play" : "▶ Resume auto-play"}
          </button>
        </div>
      </div>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7" aria-label="Process steps">
        {STEPS.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              onClick={() => handleStepSelect(i)}
              aria-current={step === i ? "step" : undefined}
              className={`d-step relative overflow-hidden w-full ${step === i ? "is-on" : step > i ? "is-done" : ""}`}
            >
              <span className="d-step-n">0{i + 1}</span>
              <span className="d-step-name">{s.name}</span>
              {step === i && <AutoProgressBar durationMs={5800} activeKey={step} paused={!playing} />}
            </button>
          </li>
        ))}
      </ol>
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card accent className="d-fade flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Label className="!text-[var(--gold-accent)]">
              Step {step + 1} of {STEPS.length} · {cur.kind}
            </Label>
            {step === last ? <Pill tone="pass">Final authority</Pill> : <Pill tone="info">System check</Pill>}
          </div>
          <span className="serif text-[32px] leading-tight" style={{ color: "var(--text-primary)" }}>
            {cur.name}
          </span>
          <p className="text-[16px] leading-relaxed secondary">{cur.does}</p>
          <hr className="d-hr" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>What is checked</Label>
              <p className="mt-1 text-[14.5px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
                {cur.checks}
              </p>
            </div>
            <div>
              <Label>Guardrail</Label>
              <p className="mt-1 text-[14.5px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
                {cur.guard}
              </p>
            </div>
          </div>
        </Card>
        <Card className="flex flex-col gap-3 font-mono text-[12.5px]">
          <Label>Decision audit trail · Live log</Label>
          <div className="flex flex-col gap-2">
            {LOG.map((l, i) => (
              <div
                key={l}
                className="flex items-center gap-2 transition-opacity duration-300"
                style={{ opacity: i <= step ? 1 : 0.35, color: i === step ? "var(--gold-accent)" : "var(--text-secondary)" }}
              >
                <span>{i <= step ? "✓" : "○"}</span>
                <span className="truncate">{l}</span>
              </div>
            ))}
          </div>
          <span className="mt-auto text-[11px] secondary">Immutable record sealed upon CIO sign-off.</span>
        </Card>
      </div>
    </div>
  );
}

/* ───────────────────────── 5 · Shariah in action ───────────────────────── */

const EVENTS = [
  ["Spun off its advanced materials division", "Honeywell completed the spin-off, altering its asset and debt mix."],
  ["Debt ratio crossed 52% of market value", "Exceeded the 33% threshold under AAOIFI and the house rules."],
  ["Flagged the same day", "System alerts the CIO; new purchases paused across all portfolios."],
  ["Orderly exit window opened", "Holding scheduled for staged liquidation within 90 days."],
];

export function ShariahInAction() {
  const [stage, setStage] = useState(0);
  const [interrupted, setInterrupted] = useState(false);

  // Auto-play: advance through Honeywell events every 5.5s (and loop cleanly) until interrupted
  useEffect(() => {
    if (interrupted) return;
    const interval = setInterval(() => {
      setStage((s) => (s + 1) % EVENTS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [interrupted]);

  const handleAction = () => {
    setInterrupted(true);
    setStage((s) => (s >= EVENTS.length - 1 ? 0 : s + 1));
  };

  const flagged = stage >= 1;
  const decided = stage >= 3;
  const done = stage >= EVENTS.length - 1;

  return (
    <div
      className="grid items-center gap-8 lg:grid-cols-[1fr_400px] lg:gap-12"
      onPointerDown={() => setInterrupted(true)}
    >
      <div className="d-stack">
        <div className="flex items-center justify-between">
          <Kicker>Shariah in action · A real case from 2026</Kicker>
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]/50">
            {interrupted ? "Paused" : "Auto-playing case in sequence"}
          </span>
        </div>
        <Title>A spin-off pushed Honeywell over the line. Our process flagged it the same day.</Title>
        <ol className="flex flex-col gap-3" onMouseEnter={() => setInterrupted(true)}>
          {EVENTS.map(([t, d], i) => (
            <li
              key={t}
              onClick={() => {
                setInterrupted(true);
                setStage(i);
              }}
              className="flex items-start gap-4 transition-opacity duration-500 cursor-pointer"
              style={{ opacity: i <= stage ? 1 : 0.3 }}
            >
              <span
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[13px] font-semibold transition-colors duration-500"
                style={{
                  borderColor: "var(--gold-accent)",
                  background: i <= stage ? "var(--gold-accent)" : "transparent",
                  color: i <= stage ? "var(--bg-base)" : "var(--gold-accent)",
                }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {t}
                </p>
                <p className="text-[14px] secondary">{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleAction} className="btn btn-gold relative overflow-hidden self-start">
            {done ? "Replay case study" : "Next event"}
            <AutoProgressBar durationMs={5500} activeKey={stage} paused={interrupted} tone="dark" />
          </button>
        </div>
      </div>
      <Card className={`flex flex-col gap-3 transition-colors duration-500 ${flagged ? "d-card-breach" : ""}`}>
        <div className="flex justify-between">
          <Label>Holding</Label>
          <Label>Nasdaq: HON</Label>
        </div>
        <span className="serif text-[38px] leading-none" style={{ color: "var(--text-primary)" }}>
          Honeywell
        </span>
        <span className="self-start">
          <Pill tone={done ? "info" : flagged ? "breach" : "pass"}>{done ? "Decision recorded" : flagged ? "Flagged for review" : "Compliant"}</Pill>
        </span>
        <hr className="d-hr" />
        <Row k="Debt to market value" v={flagged ? "About 52%" : "Within limit"} hot={flagged} />
        <Row k="New purchases" v={flagged ? "Paused" : "Allowed"} hot={flagged} />
        <Row k="Automatic selling" v="None" />
        <Row k="Decision" v={decided ? "Exit unless next filing cures it" : "Pending"} />
      </Card>
    </div>
  );
}
