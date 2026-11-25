"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Kicker, Label, Note, Pill, Title } from "./ui";

/* ───────────────────────── 6 · When markets fall ───────────────────────── */

const PLAN = [
  ["No forced selling", "Positions are sized from the start so that no single mistake or market dislocation forces an exit."],
  ["Gold and cash as ballast", "Gold and cash are held within the mandate. They are designed to absorb part of a fall, not to remove it."],
  ["Buy quality at lower prices", "Cash allows us to add to companies we have already researched when prices fall below our estimate of value."],
];

export function MarketsFall() {
  const [activePlan, setActivePlan] = useState<number | null>(0);
  const [interrupted, setInterrupted] = useState(false);

  // Auto-play: cycle through the 3 plan points every 3.0s until interrupted
  useEffect(() => {
    if (interrupted) return;
    const interval = setInterval(() => {
      setActivePlan((p) => ((p ?? 0) + 1) % PLAN.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [interrupted]);

  const handleInterrupt = () => {
    setInterrupted(true);
  };

  return (
    <div className="d-stack" onPointerDown={handleInterrupt}>
      <div className="flex items-center justify-between">
        <Kicker>When markets fall</Kicker>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]/50">
          {interrupted ? "Paused" : "Auto-playing in sequence"}
        </span>
      </div>
      <Title>Every fund falls sometimes. Our response is decided in advance.</Title>
      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <Card accent className="flex flex-col gap-6" onMouseEnter={handleInterrupt}>
          <div className="flex items-center justify-between gap-4">
            <Label className="!text-[var(--gold-accent)]">Our plan, decided in advance</Label>
            <Pill tone="gold">In the mandate</Pill>
          </div>
          {PLAN.map(([t, d], i) => {
            const on = activePlan === i;
            return (
              <div
                key={t}
                onClick={() => {
                  handleInterrupt();
                  setActivePlan(i);
                }}
                className={`d-rise flex gap-5 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  on
                    ? "border-[var(--gold-accent)] bg-[rgba(214,180,106,0.08)] shadow-[0_0_16px_rgba(214,180,106,0.15)]"
                    : "border-transparent hover:border-[var(--line-soft)]"
                }`}
                style={{ ["--i" as string]: i }}
              >
                <span className="serif text-[34px] leading-none" style={{ color: "var(--gold-accent)" }}>
                  {i + 1}
                </span>
                <div>
                  <p className="text-[17px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {t}
                  </p>
                  <p className="mt-1 text-[14.5px] leading-relaxed secondary">{d}</p>
                </div>
              </div>
            );
          })}
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="d-card-dashed flex flex-col gap-3">
            <Label className="!text-[var(--gold-accent)]">The honest part</Label>
            <p className="text-[15.5px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
              Shariah funds cannot hedge with derivatives. When markets fall, our holdings will fall too. What we control is what we own,
              the price we paid, and holding enough ballast to avoid becoming a forced seller.
            </p>
          </Card>
          <Card className="flex flex-col gap-2">
            <Label>Limits</Label>
            <p className="text-[14.5px] leading-relaxed secondary">
              Position, sector and liquidity limits are set in the mandate and checked before every order. They are not loosened in
              volatile markets.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 7 · What investors would receive ───────────────────────── */

export function Receive() {
  const [activeItem, setActiveItem] = useState<number | null>(0);
  const [interrupted, setInterrupted] = useState(false);

  // Auto-play: cycle through the 4 deliverables every 3.0s until interrupted
  useEffect(() => {
    if (interrupted) return;
    const interval = setInterval(() => {
      setActiveItem((a) => ((a ?? 0) + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, [interrupted]);

  const handleInterrupt = () => {
    setInterrupted(true);
  };

  return (
    <div className="d-stack" onPointerDown={handleInterrupt}>
      <div className="flex items-center justify-between">
        <Kicker>What investors would receive</Kicker>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]/50">
          {interrupted ? "Paused" : "Auto-playing in sequence"}
        </span>
      </div>
      <Title>Full visibility of every decision that affects your capital.</Title>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" onMouseEnter={handleInterrupt}>
        {/* Item 0: Quarterly report */}
        <div
          onClick={() => {
            handleInterrupt();
            setActiveItem(0);
          }}
          className={`d-paper d-rise flex flex-col gap-3 rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
            activeItem === 0 ? "ring-2 ring-[var(--gold-accent)] shadow-[0_0_24px_rgba(214,180,106,0.3)]" : ""
          }`}
          style={{ ["--i" as string]: 0 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-bold uppercase tracking-[0.14em]" style={{ color: "#7a5c17" }}>
              Quarterly report
            </span>
            <span className="text-[12px]" style={{ color: "#5e574b" }}>
              Each quarter
            </span>
          </div>
          <span className="serif text-[26px] leading-tight">Your portfolio this quarter</span>
          {[
            ["Holdings and weights", "In full"],
            ["Shariah status", "Each holding"],
            ["Purification", "Per holding"],
            ["Changes", "With written reasons"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b pb-2 text-[14px]" style={{ borderColor: "#e2d9c6" }}>
              <span style={{ color: "#5e574b" }}>{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
          <span className="mt-auto text-[12.5px]" style={{ color: "#5e574b" }}>
            With the reasoning behind every change.
          </span>
        </div>

        {/* Item 1 & 2: Shariah alert & Purification */}
        <div className="flex flex-col gap-4">
          <Card
            onClick={() => {
              handleInterrupt();
              setActiveItem(1);
            }}
            className={`d-rise flex flex-col gap-2 transition-all duration-300 cursor-pointer ${
              activeItem === 1 ? "border-[var(--status-breach)] shadow-[0_0_20px_rgba(255,90,90,0.2)]" : ""
            }`}
            style={{ ["--i" as string]: 1 }}
          >
            <div className="flex justify-between">
              <Label className="!text-[var(--status-breach)]">Shariah alert</Label>
              <Label>As it happens</Label>
            </div>
            <span className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>
              Notice when a holding is flagged
            </span>
            <span className="text-[14px] leading-relaxed secondary">
              If a filing or corporate action puts a holding under review, you are told, and new purchases pause while it is reviewed.
            </span>
          </Card>
          <Card
            onClick={() => {
              handleInterrupt();
              setActiveItem(2);
            }}
            className={`d-rise flex flex-col gap-2 transition-all duration-300 cursor-pointer ${
              activeItem === 2 ? "border-[var(--status-pass)] shadow-[0_0_20px_rgba(60,203,143,0.2)]" : ""
            }`}
            style={{ ["--i" as string]: 2 }}
          >
            <div className="flex justify-between">
              <Label className="!text-[var(--status-pass)]">Purification statement</Label>
              <Label>Per holding</Label>
            </div>
            <span className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>
              What to give, and why
            </span>
            <span className="text-[14px] leading-relaxed secondary">The amount to give to charity for each holding, with the income ratios used to calculate it.</span>
          </Card>
        </div>

        {/* Item 3: Decision log */}
        <Card
          onClick={() => {
            handleInterrupt();
            setActiveItem(3);
          }}
          className={`d-rise flex flex-col gap-4 md:col-span-2 lg:col-span-1 transition-all duration-300 cursor-pointer ${
            activeItem === 3 ? "border-[var(--status-info)] shadow-[0_0_20px_rgba(90,160,255,0.2)]" : ""
          }`}
          style={{ ["--i" as string]: 3 }}
        >
          <div className="flex justify-between">
            <Label className="!text-[var(--status-info)]">Decision log</Label>
            <Label>Every trade</Label>
          </div>
          <LogEntry kind="Executed trade" t="Trim position" d="Reason: holding above its limit. Approved by the CIO. Evidence attached." on />
          <LogEntry kind="Rejected idea" t="Idea declined: valuation" d="Sound business, but the price leaves no margin of safety. Dissent recorded." />
          <span className="mt-auto text-[12.5px] secondary">Rejected ideas and dissenting views are kept on record.</span>
        </Card>
      </div>
    </div>
  );
}

function LogEntry({ kind, t, d, on = false }: { kind: string; t: string; d: string; on?: boolean }) {
  return (
    <div className="flex flex-col gap-1 border-l-2 pl-3" style={{ borderColor: on ? "var(--status-info)" : "var(--hairline)" }}>
      <span className="text-[12px] secondary">{kind}</span>
      <span className="text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
        {t}
      </span>
      <span className="text-[13.5px] leading-relaxed secondary">{d}</span>
    </div>
  );
}

/* ───────────────────────── 8 · The founder ───────────────────────── */

export const FOUNDER_BIO =
  "I have managed my own capital since 2021, through rising rates, the 2022 sell-off and the AI boom. I invest like an owner, not a trader: protect capital first, then let a small number of exceptional, genuinely Shariah-compliant companies compound. Every position is valued before it is bought, sized so no single mistake defines the outcome, and comes with a plan written before markets turn. Built for families who measure wealth in generations, not quarters.";

export function Founder() {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
      <Card className="flex flex-col gap-6 !p-7 md:!p-9">
        <div className="flex items-center gap-5">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border" style={{ borderColor: "var(--line)" }}>
            <Image src="/essaSimat.png" alt="Eesaa Simat" fill sizes="96px" className="object-cover" style={{ filter: "saturate(0.85)" }} />
          </div>
          <div>
            <Kicker>The founder</Kicker>
            <p className="serif mt-1 text-[36px] leading-none" style={{ color: "var(--text-primary)" }}>
              Eesaa Simat
            </p>
            <p className="mt-2 text-[14px]" style={{ color: "var(--gold-accent)" }}>
              Founder and Chief Investment Officer
            </p>
          </div>
        </div>
        <p className="text-[16px] leading-[1.7] secondary">{FOUNDER_BIO}</p>
        <div className="flex items-center gap-3 border-l-2 py-1 pl-4" style={{ borderColor: "var(--gold-accent)" }}>
          <p className="serif text-[22px] leading-snug" style={{ color: "var(--text-primary)" }}>
            I invest my own capital through the same process.
          </p>
        </div>
      </Card>
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-2">
          <Label className="!text-[var(--gold-accent)]">Alignment</Label>
          <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>
            One process, one set of rules
          </p>
          <p className="text-[14.5px] leading-relaxed secondary">
            Every limit, screen and bear case described here applies to the founder&apos;s own capital today.
          </p>
        </Card>
        <Card className="flex flex-col gap-2">
          <Label className="!text-[var(--gold-accent)]">Long horizon</Label>
          <p className="text-[16px] font-semibold" style={{ color: "var(--text-primary)" }}>
            11 to 14 holdings
          </p>
          <p className="text-[14.5px] leading-relaxed secondary">Each held with a three to five year view, judged on the business rather than the quarter.</p>
        </Card>
      </div>
    </div>
  );
}

/* ───────────────────────── 9 · Governance and risks ───────────────────────── */

const PROVIDERS: [string, string, string, "pass" | "info" | "neutral"][] = [
  ["Shariah governance", "Being formalised", "In progress", "info"],
  ["Broker and custody", "Interactive Brokers", "Confirmed", "pass"],
  ["Fund administration", "Independent administrator", "Before outside capital", "neutral"],
  ["Auditor", "Independent auditor", "Before outside capital", "neutral"],
  ["Legal counsel", "Specialist financial services firm", "To appoint", "neutral"],
];

const RISKS = [
  ["Track record length", "Founder capital since 2021.", "Every quarter reported plainly, weak ones included."],
  ["Transaction costs", "Costs reduce compounding.", "Trading costs are checked before every order."],
  ["Key-person risk", "One decision-maker.", "Process documented and every decision logged, so it can be reviewed."],
  ["Concentration", "11 to 14 holdings.", "Position and sector limits, and regular stress tests."],
  ["Shariah changes", "A new filing can change a holding's status.", "Re-screened as soon as new filings are published."],
  ["Operational", "Data and system errors.", "Daily reconciliation with the broker. No order without CIO approval."],
];

export function Governance() {
  const [activeRisk, setActiveRisk] = useState<number | null>(0);
  const [interrupted, setInterrupted] = useState(false);

  // Auto-play: cycle through the 6 risk controls every 2.8s until interrupted
  useEffect(() => {
    if (interrupted) return;
    const interval = setInterval(() => {
      setActiveRisk((r) => ((r ?? 0) + 1) % RISKS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [interrupted]);

  const handleInterrupt = () => {
    setInterrupted(true);
  };

  return (
    <div className="d-stack" onPointerDown={handleInterrupt}>
      <div className="flex items-center justify-between">
        <Kicker>Governance and risks</Kicker>
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--text-secondary)]/50">
          {interrupted ? "Paused" : "Auto-playing in sequence"}
        </span>
      </div>
      <Title>Governance and risks, stated plainly.</Title>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Card className="flex flex-col gap-4">
          <Label className="!text-[var(--gold-accent)]">Governance and custody</Label>
          <div className="flex flex-col">
            {PROVIDERS.map(([role, who, status, tone]) => (
              <div key={role} className="flex items-center justify-between gap-4 border-b py-2" style={{ borderColor: "var(--hairline)" }}>
                <div>
                  <p className="text-[14.5px] font-semibold" style={{ color: "var(--text-primary)" }}>
                    {role}
                  </p>
                  <p className="text-[13px] secondary">{who}</p>
                </div>
                <Pill tone={tone}>{status}</Pill>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Three rules</Label>
            {["The CIO approves every trade.", "Nothing is sold automatically.", "Limits never loosen after a good quarter."].map((r, i) => (
              <p key={r} className="flex gap-3 text-[14.5px]" style={{ color: "var(--text-primary)" }}>
                <span className="serif w-4" style={{ color: "var(--gold-accent)" }}>
                  {i + 1}
                </span>
                {r}
              </p>
            ))}
          </div>
        </Card>
        <div className="grid gap-3 sm:grid-cols-2" onMouseEnter={handleInterrupt}>
          {RISKS.map(([t, r, m], i) => {
            const on = activeRisk === i;
            return (
              <Card
                key={t}
                onClick={() => {
                  handleInterrupt();
                  setActiveRisk(i);
                }}
                className={`d-rise flex flex-col gap-1.5 !p-4 transition-all duration-300 cursor-pointer ${
                  on
                    ? "border-[var(--gold-accent)] bg-[rgba(214,180,106,0.08)] shadow-[0_0_16px_rgba(214,180,106,0.15)]"
                    : "hover:border-[var(--line-soft)]"
                }`}
                style={{ ["--i" as string]: i }}
              >
                <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--status-breach)" }} aria-hidden />
                  {t}
                </p>
                <p className="text-[13px] secondary">{r}</p>
                <hr className="d-hr my-1" />
                <p className="text-[13.5px] leading-snug" style={{ color: "var(--text-primary)" }}>
                  <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: "var(--gold-accent)" }}>
                    Control
                  </span>
                  {m}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── 10 · Closing ───────────────────────── */

export function Closing({ onProcess, onInfo }: { onProcess: () => void; onInfo: () => void }) {
  return (
    <div className="mx-auto flex max-w-[760px] flex-col items-center gap-7 text-center">
      <Image src="/goooood.svg" alt="" width={64} height={64} className="d-rise" />
      <Title className="!text-center">
        Shariah-compliant global equity. <span className="em-gold">Institutional discipline.</span>
      </Title>
      <Card accent className="flex w-full flex-col gap-4 text-left md:!p-8">
        <Label className="!text-[var(--gold-accent)]">Next steps</Label>
        <p className="serif text-[30px] leading-tight" style={{ color: "var(--text-primary)" }}>
          Speak with the CIO
        </p>
        <p className="text-[15.5px] leading-relaxed secondary">A direct, confidential conversation with Eesaa Simat for family offices and allocators.</p>
        <div className="mt-1 flex flex-wrap gap-3">
          <Link href="/contact#enquiry" className="btn btn-gold">
            Speak with the CIO
          </Link>
          <Link href="/contact#waitlist" className="btn btn-outline">
            Register your interest
          </Link>
        </div>
        <button type="button" onClick={onProcess} className="text-link mt-2 self-start text-[14.5px]">
          See the process in action
        </button>
      </Card>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[14px]" style={{ color: "var(--text-primary)" }}>
          Further information is available on request, under NDA.
        </p>
        <Note className="!text-center">
          Capital at risk. Simat Capital does not manage outside capital. This is not an offer or advice.{" "}
          <button type="button" onClick={onInfo} className="text-link !text-[12.5px]">
            Important information
          </button>
        </Note>
      </div>
    </div>
  );
}
