"use client";

import { useEffect, useState } from "react";
import { Card, Kicker, Label, Note, Pill, Title } from "./ui";

/* ───────────────────────── 1 · Our beliefs ───────────────────────── */

const BELIEFS = [
  { t: "Quality businesses", b: "Durable advantages and high returns on capital.", how: "We look for companies that could still be leading their markets in ten years." },
  { t: "Strong balance sheets", b: "Low debt: a Shariah requirement and a risk control.", how: "A company that depends on borrowing fails both our screen and our judgement." },
  { t: "Valuation discipline", b: "A great company at the wrong price is a poor investment.", how: "Every idea is valued before it is sized, and price can veto a purchase." },
  { t: "Patience", b: "A concentrated portfolio of 11 to 14 companies, held for the long term.", how: "Our horizon for each holding is three to five years." },
];

export function Beliefs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="d-stack">
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
              onClick={() => setOpen(on ? null : i)}
              className={`d-card d-card-btn d-rise flex min-h-[250px] flex-col gap-3 text-left ${on ? "d-card-accent" : ""}`}
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
            </button>
          );
        })}
      </div>
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
  const p = PROBLEMS[sel];
  return (
    <div className="d-stack">
      <Kicker>The problem</Kicker>
      <Title>Shariah investors face problems that screening alone doesn&apos;t solve.</Title>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div role="tablist" aria-label="Problems" className="flex flex-col gap-2">
          {PROBLEMS.map((q, i) => (
            <button
              key={q.title}
              role="tab"
              aria-selected={sel === i}
              type="button"
              onClick={() => setSel(i)}
              className={`d-row-btn ${sel === i ? "is-on" : ""}`}
            >
              <span className="serif w-6 text-[20px]" style={{ color: sel === i ? "var(--gold-accent)" : "var(--text-secondary)" }}>
                {i + 1}
              </span>
              <span>{q.title}</span>
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
    <div className="d-stack">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="d-stack-sm">
          <Kicker>Why Shariah is hard</Kicker>
          <Title>One company. Four rulebooks. Two answers.</Title>
        </div>
        <button type="button" onClick={() => setFell((f) => !f)} className={`btn ${fell ? "btn-gold" : "btn-outline"} self-start md:self-auto`} aria-pressed={fell}>
          {fell ? "Undo the fall" : "Share price −10%"}
        </button>
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
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 3400);
    return () => clearInterval(t);
  }, [playing]);

  const cur = STEPS[step];
  const last = STEPS.length - 1;

  return (
    <div className="d-stack">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="d-stack-sm">
          <Kicker>Our process</Kicker>
          <p className="text-[15px]" style={{ color: "var(--text-primary)" }}>
            From a wide Shariah-screened universe across the UK, US and Japan to 11 to 14 holdings.
          </p>
          <Title>Six checks. One decision. Every idea.</Title>
        </div>
        <button type="button" onClick={() => setPlaying((p) => !p)} className="btn btn-outline self-start !min-h-[40px] md:self-auto">
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <ol className="d-steps" aria-label="Process steps">
        {STEPS.map((s, i) => {
          const state = i === step ? "is-on" : i < step ? "is-done" : "";
          return (
            <li key={s.name} className="contents">
              <button
                type="button"
                aria-current={i === step ? "step" : undefined}
                onClick={() => {
                  setStep(i);
                  setPlaying(false);
                }}
                className={`d-step ${state} ${i === last ? "d-step-cio" : ""}`}
              >
                <span className="d-step-n">{i === last ? "CIO" : `0${i + 1}`}</span>
                <span className="d-step-name">{s.name}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="relative h-[2px] w-full" style={{ background: "var(--hairline)" }} aria-hidden>
        <div className="absolute inset-y-0 left-0 transition-[width] duration-700" style={{ width: `${((step + 1) / STEPS.length) * 100}%`, background: "var(--gold-accent)" }} />
      </div>
      <p className="d-label text-center">Learning loop · every outcome is reviewed against its thesis and fed back in</p>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card key={step} accent className="d-fade">
          <div className="flex items-baseline gap-3">
            <Label className="!text-[var(--gold-accent)]">{step === last ? "Final step · a person decides" : `Step ${step + 1} of 6 · ${cur.kind}`}</Label>
          </div>
          <p className="serif mt-2 text-[28px] leading-tight" style={{ color: "var(--text-primary)" }}>
            {cur.name}
          </p>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            <Detail k="What it does" v={cur.does} />
            <Detail k="What it checks" v={cur.checks} />
            <Detail k="Its safeguard" v={cur.guard} />
          </div>
        </Card>
        <Card className="flex flex-col gap-2.5">
          <Label>Activity log · Illustrative</Label>
          {[0, 1, 2, 3].map((k) => {
            const idx = step - k;
            if (idx < 0) return null;
            const mins = 9 * 60 + 12 + idx * 4;
            return (
              <div key={idx} className="flex items-center gap-3 text-[13px]" style={{ opacity: 1 - k * 0.22 }}>
                <span className="dia !h-[6px] !w-[6px]" aria-hidden />
                <span className="tabular-nums secondary">
                  {String(Math.floor(mins / 60)).padStart(2, "0")}:{String(mins % 60).padStart(2, "0")}
                </span>
                <span className="truncate" style={{ color: "var(--text-primary)" }}>
                  {LOG[idx]}
                </span>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function Detail({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{k}</Label>
      <span className="text-[14.5px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
        {v}
      </span>
    </div>
  );
}

/* ───────────────────────── 5 · Shariah in action ───────────────────────── */

const EVENTS = [
  ["Spin-off completes", "Honeywell completes the separation of its aerospace business in June 2026."],
  ["Re-screened", "Debt rises to about 52% of market value, above the Shariah threshold."],
  ["Flagged, not sold", "New purchases pause. A review opens with the evidence and compliant alternatives."],
  ["The CIO decides", "Exit, unless the next quarterly filing brings debt back within limits."],
  ["Recorded", "The decision and its reasons are kept in the decision log."],
];

export function ShariahInAction() {
  const [stage, setStage] = useState(0);
  const flagged = stage >= 1;
  const decided = stage >= 3;
  const done = stage >= EVENTS.length - 1;
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
      <div className="d-stack">
        <Kicker>Shariah in action · A real case from 2026</Kicker>
        <Title>A spin-off pushed Honeywell over the line. Our process flagged it the same day.</Title>
        <ol className="flex flex-col gap-3">
          {EVENTS.map(([t, d], i) => (
            <li key={t} className="flex items-start gap-4 transition-opacity duration-500" style={{ opacity: i <= stage ? 1 : 0.3 }}>
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
        <button type="button" onClick={() => setStage((s) => (done ? 0 : s + 1))} className="btn btn-gold self-start">
          {done ? "Replay" : "Next event"}
        </button>
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
