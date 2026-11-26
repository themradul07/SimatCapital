"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DEFAULT_HERO_RATIO,
  DEFAULT_SECTIONS_RATIO,
  HERO_RATIO_KEY,
  SECTIONS_RATIO_KEY,
  readStoredHeroRatio,
  readStoredSectionsRatio,
} from "@/components/home/HeroRatioGrid";
import HeroMark from "@/components/illustrations/HeroMark";
import ControlGate from "@/components/illustrations/ControlGate";
import ShariahFilter from "@/components/illustrations/ShariahFilter";
import {
  AnimatedBearCaseChallenge,
  AnimatedDailyReconciliation,
  AnimatedEngineMap,
  AnimatedMarginOfSafety,
  AnimatedOpportunityCircles,
  AnimatedProfitLossNAV,
  AnimatedPurificationLedger,
  AnimatedStatusGlance,
  AnimatedThreeBranch,
  AnimatedTwoStrategies,
} from "@/components/modify/AnimatedSiteDiagrams";

type FilterTab = "all" | "landing" | "institutions" | "new";

const PRESETS = [
  { label: "60 : 40", textPct: 60 },
  { label: "51 : 49 (Default)", textPct: DEFAULT_HERO_RATIO },
  { label: "45 : 55", textPct: 45 },
  { label: "40 : 60", textPct: 40 },
  { label: "35 : 65", textPct: 35 },
];

const SECTIONS_PRESETS = [
  { label: "50 : 50", textPct: 50 },
  { label: "42 : 58 (Default)", textPct: DEFAULT_SECTIONS_RATIO },
  { label: "38 : 62", textPct: 38 },
  { label: "35 : 65", textPct: 35 },
  { label: "60 : 40", textPct: 60 },
];

export default function ModifyPage() {
  const [ratio, setRatio] = useState<number>(DEFAULT_HERO_RATIO);
  const [sectionsRatio, setSectionsRatio] = useState<number>(DEFAULT_SECTIONS_RATIO);
  const [previewSection, setPreviewSection] = useState<"gap" | "edge">("gap");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [isMotion, setIsMotion] = useState(true);

  useEffect(() => {
    setRatio(readStoredHeroRatio());
    setSectionsRatio(readStoredSectionsRatio());
    const syncHero = () => setRatio(readStoredHeroRatio());
    const syncSec = () => setSectionsRatio(readStoredSectionsRatio());
    window.addEventListener("storage", syncHero);
    window.addEventListener("storage", syncSec);
    window.addEventListener("simat-ratio-change", syncHero);
    window.addEventListener("simat-sections-ratio-change", syncSec);
    return () => {
      window.removeEventListener("storage", syncHero);
      window.removeEventListener("storage", syncSec);
      window.removeEventListener("simat-ratio-change", syncHero);
      window.removeEventListener("simat-sections-ratio-change", syncSec);
    };
  }, []);

  const updateRatio = (next: number) => {
    const clamped = Math.max(30, Math.min(70, Math.round(next)));
    setRatio(clamped);
    try {
      if (clamped === DEFAULT_HERO_RATIO) {
        localStorage.removeItem(HERO_RATIO_KEY);
      } else {
        localStorage.setItem(HERO_RATIO_KEY, String(clamped));
      }
      window.dispatchEvent(new CustomEvent("simat-ratio-change", { detail: clamped }));
    } catch {}
  };

  const updateSectionsRatio = (next: number) => {
    const clamped = Math.max(30, Math.min(70, Math.round(next)));
    setSectionsRatio(clamped);
    try {
      if (clamped === DEFAULT_SECTIONS_RATIO) {
        localStorage.removeItem(SECTIONS_RATIO_KEY);
      } else {
        localStorage.setItem(SECTIONS_RATIO_KEY, String(clamped));
      }
      window.dispatchEvent(new CustomEvent("simat-sections-ratio-change", { detail: clamped }));
    } catch {}
  };

  const animPct = 100 - ratio;
  const sectionsAnimPct = 100 - sectionsRatio;

  const showLanding = filter === "all" || filter === "landing";
  const showInstitutions = filter === "all" || filter === "institutions";
  const showNew = filter === "all" || filter === "new";

  return (
    <div className="min-h-screen pt-[110px] pb-24 text-[var(--text-primary)]">
      <div className="wrap">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: "var(--hairline)" }}>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="text-[13px] font-mono text-[var(--gold-accent)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← Landing Page
            </Link>
            <span className="text-[var(--hairline)]">|</span>
            <Link href="/institutions" className="text-[13px] font-mono secondary hover:text-[var(--text-primary)] transition-colors">
              /institutions
            </Link>
            <Link href="/private-investors" className="text-[13px] font-mono secondary hover:text-[var(--text-primary)] transition-colors">
              /private-investors
            </Link>
            <Link href="/illustrations" className="text-[13px] font-mono secondary hover:text-[var(--text-primary)] transition-colors">
              /illustrations
            </Link>
          </div>
          <span className="rounded-full border border-[var(--line-soft)] bg-[rgba(214,180,106,0.08)] px-3 py-1 text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider">
            /modify studio
          </span>
        </div>

        {/* Header */}
        <div className="mt-10 max-w-[68ch]">
          <p className="eyebrow">Layout &amp; Motion Studio</p>
          <h1 className="h1 mt-3">
            Hero Ratio &amp; <span className="em-gold">Site Animations</span>
          </h1>
          <p className="lead mt-4 !text-[var(--text-secondary)]">
            Adjust the landing page split between text and animation below, and preview live animated versions of the diagrams from{" "}
            <code className="text-[var(--gold-accent)]">/</code>, <code className="text-[var(--gold-accent)]">/institutions</code>, and{" "}
            <code className="text-[var(--gold-accent)]">/private-investors</code>.
          </p>
        </div>

        {/* SECTION 1: Hero Ratio Bar */}
        <section className="mt-10 rounded-xl border p-6 md:p-8" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.015)" }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="h3">Landing Page Hero Ratio</h2>
              <p className="text-[14px] secondary mt-1">
                Changes save automatically and apply directly to the landing page (<Link href="/" className="text-[var(--gold-accent)] underline underline-offset-4">view /</Link>).
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-[13px]">
              <span className="rounded border px-3 py-1.5" style={{ borderColor: "var(--hairline)" }}>
                Text <strong className="text-[var(--text-primary)]">{ratio}%</strong>
              </span>
              <span className="text-[var(--gold-accent)]">:</span>
              <span className="rounded border px-3 py-1.5" style={{ borderColor: "var(--gold-accent)", color: "var(--gold-accent)" }}>
                Animation <strong>{animPct}%</strong>
              </span>
            </div>
          </div>

          {/* Visual Ratio Bar + Range Slider */}
          <div className="mt-6 space-y-3">
            <div className="flex h-3 w-full overflow-hidden rounded-full border" style={{ borderColor: "var(--hairline)" }}>
              <div
                className="h-full transition-all duration-150"
                style={{ width: `${ratio}%`, background: "rgba(242, 238, 229, 0.28)" }}
              />
              <div
                className="h-full transition-all duration-150"
                style={{ width: `${animPct}%`, background: "var(--gold-accent)" }}
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[12px] font-mono secondary w-20">Text {ratio}%</span>
              <input
                type="range"
                min={30}
                max={70}
                step={1}
                value={ratio}
                onChange={(e) => updateRatio(Number(e.target.value))}
                aria-label="Landing page text to animation ratio"
                className="w-full accent-[var(--gold-accent)] cursor-pointer"
              />
              <span className="text-[12px] font-mono text-[var(--gold-accent)] w-28 text-right">Anim {animPct}%</span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {PRESETS.map((p) => {
                const active = ratio === p.textPct;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => updateRatio(p.textPct)}
                    className="rounded-md border px-3 py-1.5 text-[12px] font-mono transition-colors cursor-pointer"
                    style={{
                      borderColor: active ? "var(--gold-accent)" : "var(--hairline)",
                      background: active ? "rgba(214,180,106,0.14)" : "transparent",
                      color: active ? "var(--gold-accent)" : "var(--text-secondary)",
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => updateRatio(DEFAULT_HERO_RATIO)}
                className="ml-auto rounded-md border px-3 py-1.5 text-[12px] font-mono secondary hover:text-[var(--text-primary)] cursor-pointer"
                style={{ borderColor: "var(--hairline)" }}
              >
                Reset default
              </button>
            </div>
          </div>

          {/* Live Hero Preview */}
          <div className="mt-8 rounded-lg border p-6 md:p-8" style={{ borderColor: "var(--hairline)", background: "var(--bg)" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider secondary">Live Hero Preview ({ratio}% / {animPct}%)</span>
              <Link href="/" className="text-[12px] font-mono text-[var(--gold-accent)] hover:underline">
                Open live homepage →
              </Link>
            </div>
            <div
              className="grid items-center gap-8 lg:grid-cols-[var(--preview-cols)]"
              style={{ ["--preview-cols" as string]: `${ratio}fr ${animPct}fr` }}
            >
              <div>
                <h3 className="serif text-[clamp(26px,3.2vw,42px)] leading-[1.12] text-[var(--text-primary)]">
                  Shariah-compliant global equity. <span className="em-gold">Institutional discipline.</span>
                </h3>
                <p className="mt-4 text-[15px] secondary max-w-[46ch]">
                  Proprietary research, systematic controls and human judgement applied to Shariah global equity.
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <span className="btn btn-gold pointer-events-none text-[13px] px-4 py-2">Join the waitlist</span>
                  <span className="text-link pointer-events-none text-[13px]">Request a demo</span>
                </div>
              </div>
              <div
                className="mx-auto w-full"
                style={{ maxWidth: `${Math.round(320 + animPct * 3.6)}px` }}
              >
                <HeroMark />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1B: Below-Hero Sections Ratio Bar & Preview */}
        <section className="mt-8 rounded-xl border p-6 md:p-8" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.015)" }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="h3">Below-Hero Sections Ratio</h2>
              <p className="text-[14px] secondary mt-1">
                Controls the text-to-animation ratio for all sections below the hero (The Gap, The Edge, Method, Shariah, Discipline) on{" "}
                <Link href="/#gap" className="text-[var(--gold-accent)] underline underline-offset-4">/</Link> and{" "}
                <Link href="/private-investors" className="text-[var(--gold-accent)] underline underline-offset-4">/private-investors</Link>.
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-[13px]">
              <span className="rounded border px-3 py-1.5" style={{ borderColor: "var(--hairline)" }}>
                Text <strong className="text-[var(--text-primary)]">{sectionsRatio}%</strong>
              </span>
              <span className="text-[var(--gold-accent)]">:</span>
              <span className="rounded border px-3 py-1.5" style={{ borderColor: "var(--gold-accent)", color: "var(--gold-accent)" }}>
                Animation <strong>{sectionsAnimPct}%</strong>
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex h-3 w-full overflow-hidden rounded-full border" style={{ borderColor: "var(--hairline)" }}>
              <div
                className="h-full transition-all duration-150"
                style={{ width: `${sectionsRatio}%`, background: "rgba(242, 238, 229, 0.28)" }}
              />
              <div
                className="h-full transition-all duration-150"
                style={{ width: `${sectionsAnimPct}%`, background: "var(--gold-accent)" }}
              />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[12px] font-mono secondary w-20">Text {sectionsRatio}%</span>
              <input
                type="range"
                min={30}
                max={70}
                step={1}
                value={sectionsRatio}
                onChange={(e) => updateSectionsRatio(Number(e.target.value))}
                aria-label="Below-hero sections text to animation ratio"
                className="w-full accent-[var(--gold-accent)] cursor-pointer"
              />
              <span className="text-[12px] font-mono text-[var(--gold-accent)] w-28 text-right">Anim {sectionsAnimPct}%</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {SECTIONS_PRESETS.map((p) => {
                const active = sectionsRatio === p.textPct;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => updateSectionsRatio(p.textPct)}
                    className="rounded-md border px-3 py-1.5 text-[12px] font-mono transition-colors cursor-pointer"
                    style={{
                      borderColor: active ? "var(--gold-accent)" : "var(--hairline)",
                      background: active ? "rgba(214,180,106,0.14)" : "transparent",
                      color: active ? "var(--gold-accent)" : "var(--text-secondary)",
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => updateSectionsRatio(DEFAULT_SECTIONS_RATIO)}
                className="ml-auto rounded-md border px-3 py-1.5 text-[12px] font-mono secondary hover:text-[var(--text-primary)] cursor-pointer"
                style={{ borderColor: "var(--hairline)" }}
              >
                Reset default
              </button>
            </div>
          </div>

          {/* Live Below-Hero Section Preview */}
          <div className="mt-8 rounded-lg border p-6 md:p-8" style={{ borderColor: "var(--hairline)", background: "var(--bg)" }}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <span className="text-[11px] font-mono uppercase tracking-wider secondary">
                Live Below-Hero Section Preview ({sectionsRatio}% / {sectionsAnimPct}%)
              </span>
              <div className="flex items-center gap-2">
                {(
                  [
                    ["gap", "The Gap"],
                    ["edge", "The Edge"],
                  ] as const
                ).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPreviewSection(key)}
                    className="rounded border px-2.5 py-1 text-[11px] font-mono cursor-pointer"
                    style={{
                      borderColor: previewSection === key ? "var(--gold-accent)" : "var(--hairline)",
                      color: previewSection === key ? "var(--gold-accent)" : "var(--text-secondary)",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="grid items-center gap-8 lg:grid-cols-[var(--sec-preview-cols)]"
              style={{ ["--sec-preview-cols" as string]: `${sectionsRatio}fr ${sectionsAnimPct}fr` }}
            >
              <div>
                <p className="eyebrow">{previewSection === "gap" ? "The gap" : "The edge"}</p>
                <h3 className="h2 mt-2">
                  {previewSection === "gap"
                    ? "Compliant is the start, not the finish."
                    : "Where we look for opportunity."}
                </h3>
                <p className="body mt-4">
                  {previewSection === "gap"
                    ? "Shariah screens tell us what we may own. Our research decides what is worth owning: compliant, deeply understood and priced below its value."
                    : "We focus on companies the market under-studies, where original research and strict Shariah discipline matter most."}
                </p>
              </div>
              <div className="w-full">
                {previewSection === "gap" ? (
                  <AnimatedThreeBranch isMotion={isMotion} />
                ) : (
                  <AnimatedOpportunityCircles isMotion={isMotion} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Animated Diagrams from / , /institutions , /private-investors */}
        <section className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b" style={{ borderColor: "var(--hairline)" }}>
            <div>
              <p className="eyebrow">Animated Page Diagrams</p>
              <h2 className="h2 mt-2">Living Animations for Site Sections</h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  ["all", "All"],
                  ["new", "New Concepts"],
                  ["landing", "Landing & Private Investors"],
                  ["institutions", "Institutions"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className="rounded-md border px-3 py-1.5 text-[12px] font-mono cursor-pointer transition-colors"
                  style={{
                    borderColor: filter === key ? "var(--gold-accent)" : "var(--hairline)",
                    background: filter === key ? "rgba(214,180,106,0.14)" : "transparent",
                    color: filter === key ? "var(--gold-accent)" : "var(--text-secondary)",
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setIsMotion((m) => !m)}
                className="rounded-md border px-3 py-1.5 text-[12px] font-mono cursor-pointer"
                style={{
                  borderColor: isMotion ? "var(--gold-accent)" : "var(--hairline)",
                  color: isMotion ? "var(--gold-accent)" : "var(--text-secondary)",
                }}
              >
                Motion: {isMotion ? "ON" : "PAUSED"}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {showLanding && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      / &amp; /private-investors · The Gap
                    </span>
                    <h3 className="h3 mt-1">Compliant is the start, not the finish.</h3>
                  </div>
                  <Link href="/private-investors" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View page →
                  </Link>
                </div>
                <AnimatedThreeBranch isMotion={isMotion} />
              </div>
            )}

            {showLanding && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      / · The Edge
                    </span>
                    <h3 className="h3 mt-1">Where we look for opportunity.</h3>
                  </div>
                  <Link href="/#edge" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View section →
                  </Link>
                </div>
                <AnimatedOpportunityCircles isMotion={isMotion} />
              </div>
            )}

            {showInstitutions && (
              <div className="rounded-xl border p-6 lg:col-span-2" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      /institutions · How ideas are researched
                    </span>
                    <h3 className="h3 mt-1">Research Engine Map (11 Modules)</h3>
                  </div>
                  <Link href="/institutions#engine" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View on /institutions →
                  </Link>
                </div>
                <AnimatedEngineMap isMotion={isMotion} />
              </div>
            )}

            {(showLanding || showInstitutions) && (
              <div className="rounded-xl border p-6 lg:col-span-2" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      / &amp; /institutions · Two Strategies
                    </span>
                    <h3 className="h3 mt-1">Flagship Fund &amp; Simat Catalyst — Never Merged</h3>
                  </div>
                  <Link href="/institutions#measurement" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View on /institutions →
                  </Link>
                </div>
                <AnimatedTwoStrategies isMotion={isMotion} />
              </div>
            )}

            {showInstitutions && (
              <div className="rounded-xl border p-6 lg:col-span-2" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      /institutions · Where we stand today
                    </span>
                    <h3 className="h3 mt-1">Status at a Glance</h3>
                  </div>
                  <Link href="/institutions#status" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View on /institutions →
                  </Link>
                </div>
                <AnimatedStatusGlance isMotion={isMotion} />
              </div>
            )}

            {showInstitutions && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      /institutions · Controls &amp; Oversight
                    </span>
                    <h3 className="h3 mt-1">Eleven Pre-Trade Control Gate</h3>
                  </div>
                  <Link href="/institutions#governance" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View →
                  </Link>
                </div>
                <ControlGate />
              </div>
            )}

            {(showLanding || showInstitutions) && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--hairline)" }}>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      / &amp; /institutions · Shariah Discipline
                    </span>
                    <h3 className="h3 mt-1">Four-Screen Shariah Filter</h3>
                  </div>
                  <Link href="/institutions#shariah" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View →
                  </Link>
                </div>
                <ShariahFilter />
              </div>
            )}

            {showNew && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--line)" }}>
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                    New Concept · Shariah Purification
                  </span>
                  <h3 className="h3 mt-1">Purification Ledger Flow</h3>
                </div>
                <AnimatedPurificationLedger isMotion={isMotion} />
              </div>
            )}

            {showNew && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--line)" }}>
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                    New Concept · Challenge Stage
                  </span>
                  <h3 className="h3 mt-1">Bear-Case Stress Test</h3>
                </div>
                <AnimatedBearCaseChallenge isMotion={isMotion} />
              </div>
            )}

            {showNew && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--line)" }}>
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                    New Concept · Valuation Discipline
                  </span>
                  <h3 className="h3 mt-1">Margin of Safety Band</h3>
                </div>
                <AnimatedMarginOfSafety isMotion={isMotion} />
              </div>
            )}

            {showNew && (
              <div className="rounded-xl border p-6" style={{ borderColor: "var(--line)" }}>
                <div className="mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                    New Concept · Custody &amp; Audit
                  </span>
                  <h3 className="h3 mt-1">Daily IBKR Reconciliation</h3>
                </div>
                <AnimatedDailyReconciliation isMotion={isMotion} />
              </div>
            )}

            {showNew && (
              <div className="rounded-xl border p-6 lg:col-span-2" style={{ borderColor: "var(--line)" }}>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gold-accent)]">
                      New Concept · Profit &amp; Loss (Green / Red)
                    </span>
                    <h3 className="h3 mt-1">High-Water Mark &amp; P&amp;L Trajectory</h3>
                  </div>
                  <Link href="/illustrations/high-water-mark-enhanced" className="text-[12px] font-mono secondary hover:text-[var(--gold-accent)]">
                    View High-Water Mark →
                  </Link>
                </div>
                <AnimatedProfitLossNAV isMotion={isMotion} />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
