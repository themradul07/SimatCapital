"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "@/components/useInView";
import { C, MEASURE, PROVIDERS, RISK_WARNING, RISKS, chapter } from "../content";
import { Chapter, Diamond, MarkPath, Pill, d } from "../primitives";

/* ================================================================
   10 · Governance — founder card and service providers (I8 markers)
   No Shariah adviser row (brief, B: Screen 14).
================================================================ */

const MARKER = {
  in: { label: "In place", node: <Diamond color={C.gold} /> },
  planned: { label: "Planned", node: <Diamond color={C.gold} filled={false} /> },
  later: { label: "Not yet in place", node: <span className="block h-[1.5px] w-[10px] bg-[var(--text-secondary)]" /> },
} as const;

function GovernanceVisual() {
  return (
    <div className="grid gap-5">
      <div className="dm-panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8" style={{ borderColor: "var(--line)" }}>
        <div className="relative h-[104px] w-[104px] shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-black/30">
          <Image
            src="/essaSimat.png"
            alt="Eesaa Simat, Founder and Chief Investment Officer"
            fill
            sizes="104px"
            className="object-cover"
            style={{ filter: "saturate(0.85)" }}
          />
        </div>
        <div>
          <p className="dm-tag" style={{ color: C.gold }}>
            Accountable for every decision
          </p>
          <p className="serif mt-1 text-[30px] leading-tight">Eesaa Simat</p>
          <p className="text-[14px] text-[var(--text-secondary)]">Founder and Chief Investment Officer</p>
          <p className="serif mt-3 text-[20px] italic leading-snug text-[var(--text-primary)]">
            &ldquo;I founded Simat Capital in 2021. Both strategies run on my own capital today.&rdquo;
          </p>
        </div>
      </div>

      <div className="dm-panel p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="dm-tag">Service providers</p>
          <div className="flex flex-wrap gap-4 text-[12px] text-[var(--text-secondary)]">
            {Object.values(MARKER).map((m) => (
              <span key={m.label} className="inline-flex items-center gap-2">
                {m.node}
                {m.label}
              </span>
            ))}
          </div>
        </div>
        <ul className="mt-4">
          {PROVIDERS.map((p, i) => (
            <li
              key={p.role}
              className="dm-x grid grid-cols-[18px_1fr] items-center gap-x-4 gap-y-1 border-t border-[var(--hairline)] py-4 transition-colors duration-300 hover:bg-white/[0.02] sm:grid-cols-[18px_1fr_auto]"
              style={d(500 + i * 110)}
            >
              <span className="grid place-items-center">{MARKER[p.kind].node}</span>
              <span>
                <span className="block text-[15px] font-semibold">{p.role}</span>
                {p.who && <span className="block text-[13px] text-[var(--text-secondary)]">{p.who}</span>}
              </span>
              <span className="col-start-2 sm:col-start-3">
                <Pill color={p.kind === "in" ? C.em : p.kind === "planned" ? C.bl : "var(--text-secondary)"}>{p.status}</Pill>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Governance() {
  return (
    <Chapter id="governance">
      <GovernanceVisual />
    </Chapter>
  );
}

/* ================================================================
   11 · Risks — each risk turns over to show how it is managed
================================================================ */

function RisksVisual() {
  const [open, setOpen] = useState<boolean[]>(RISKS.map(() => false));
  const all = open.every(Boolean);
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="small">Tap a risk to see how it is managed.</p>
        <button className="dm-chip" aria-pressed={all} style={{ ["--chip" as string]: C.em }} onClick={() => setOpen(RISKS.map(() => !all))}>
          {all ? "Show the risks" : "Show how each is managed"}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RISKS.map((r, i) => (
          <button
            key={r.risk}
            className="dm-flip dm-x min-h-[180px]"
            style={d(200 + i * 90)}
            aria-pressed={open[i]}
            onClick={() => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))}
          >
            <span className="sr-only">{open[i] ? `${r.risk} Managed: ${r.how}` : r.risk}</span>
            <span className="dm-flip-inner" aria-hidden>
              <span className="dm-face" style={{ background: "rgba(255,138,115,0.045)", border: "1px solid rgba(255,138,115,0.28)" }}>
                <span className="flex items-center justify-between">
                  <span className="dm-tag" style={{ color: C.co }}>
                    Risk {`0${i + 1}`}
                  </span>
                  <span className="text-[18px]" style={{ color: C.co }}>
                    ↻
                  </span>
                </span>
                <span className="serif mt-auto block text-[26px] leading-tight">{r.risk}</span>
              </span>
              <span className="dm-face dm-face-back" style={{ background: "rgba(60,203,143,0.07)", border: "1px solid rgba(60,203,143,0.38)" }}>
                <span className="dm-tag" style={{ color: C.em }}>
                  How it is managed
                </span>
                <span className="mt-auto block text-[17px] leading-snug text-[var(--text-primary)]">{r.how}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Risks() {
  return (
    <Chapter id="risks" wide>
      <RisksVisual />
    </Chapter>
  );
}

/* ================================================================
   12 · How we measure — six cards and the full risk warning
================================================================ */

export function Measure() {
  return (
    <Chapter id="measure" wide>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEASURE.map((m, i) => (
          <div
            key={m.t}
            className="dm-panel dm-x group p-6 transition-colors duration-500 hover:border-[var(--line)]"
            style={d(200 + i * 90)}
          >
            <div className="flex items-center gap-3">
              <span className="serif text-[22px] text-[var(--gold-accent)]">{`0${i + 1}`}</span>
              <span className="h-px flex-1 bg-[var(--hairline)] transition-colors duration-500 group-hover:bg-[var(--line)]" />
            </div>
            <p className="mt-4 text-[17px] font-semibold">{m.t}</p>
            <p className="mt-1 text-[15px] text-[var(--text-secondary)]">{m.b}</p>
          </div>
        ))}
      </div>
      <div className="dm-x mt-6 rounded-[14px] border-l-2 bg-[rgba(255,138,115,0.05)] p-6" style={{ borderColor: C.co, ...d(800) }}>
        <p className="dm-tag" style={{ color: C.co }}>
          Risk warning
        </p>
        <p className="mt-2 text-[15px] text-[var(--text-primary)]">{RISK_WARNING}</p>
      </div>
    </Chapter>
  );
}

/* ================================================================
   13 · Next step — two actions only (brief, B: Screen 20)
================================================================ */

export function NextStep() {
  const meta = chapter("next-step");
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, 0.25);
  return (
    <section
      ref={ref}
      id={meta.id}
      data-chapter={meta.id}
      aria-labelledby="next-step-h"
      className={`dm-chapter pb-28 sm:pb-36 ${seen ? "dm-seen" : ""}`}
      style={{ ["--acc" as string]: meta.accent }}
    >
      <div className="wrap flex flex-col items-center text-center">
        <svg width="96" height="96" viewBox="-22 -22 144 144" aria-hidden className="dm-x dm-breathe">
          <MarkPath width={8} />
        </svg>
        <p className="dm-kicker dm-x mt-8" style={d(150)}>
          <span className="num">{meta.n}</span>
          <span className="bar" aria-hidden />
          <span>{meta.eyebrow}</span>
        </p>
        <h2 id="next-step-h" className="h1 dm-x mt-6" style={d(280)}>
          {meta.headline}
        </h2>
        <p className="lead dm-x mt-6 !text-[var(--text-secondary)]" style={d(420)}>
          {meta.body}
        </p>
        <div className="dm-x mt-10 flex flex-wrap justify-center gap-4" style={d(560)}>
          <Link href="/contact#waitlist" className="btn btn-gold">
            Join the waitlist
          </Link>
          <Link href="/contact#enquiry" className="btn btn-outline">
            Make an enquiry
          </Link>
        </div>
        <p className="small dm-x mt-6" style={d(700)}>
          Registering interest is not an offer or a commitment to invest.
        </p>
      </div>
    </section>
  );
}
