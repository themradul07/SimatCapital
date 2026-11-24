"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ILLUSTRATIONS,
  type IllustrationCategory,
  type IllustrationDefinition,
} from "@/components/illustrations/illustrationData";
import IllustrationItem from "@/components/illustrations/IllustrationItem";

export default function IllustrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<IllustrationCategory | "all">("all");
  const [isMotion, setIsMotion] = useState(true);
  const [activeHeroId, setActiveHeroId] = useState<string>("diamond-seal");
  const [inspectItem, setInspectItem] = useState<IllustrationDefinition | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync with localStorage on load & across tabs/events
  useEffect(() => {
    const syncState = () => {
      try {
        const saved = localStorage.getItem("simat_hero_illustration");
        if (saved && saved !== "canonical-diamond" && saved !== "default") {
          setActiveHeroId(saved);
        } else {
          setActiveHeroId("diamond-seal");
        }
      } catch {
        setActiveHeroId("diamond-seal");
      }
    };

    syncState();
    window.addEventListener("storage", syncState);
    window.addEventListener("simat-hero-change", syncState);

    return () => {
      window.removeEventListener("storage", syncState);
      window.removeEventListener("simat-hero-change", syncState);
    };
  }, []);

  const handleSetHero = (id: string, redirectNow = false) => {
    try {
      if (id === "diamond-seal" || id === "canonical-diamond" || id === "default") {
        localStorage.removeItem("simat_hero_illustration");
        document.cookie = "simat_hero_illustration=; path=/; max-age=0; SameSite=Lax";
        window.dispatchEvent(new CustomEvent("simat-hero-change", { detail: null }));
        setActiveHeroId("diamond-seal");
      } else {
        localStorage.setItem("simat_hero_illustration", id);
        document.cookie = `simat_hero_illustration=${id}; path=/; max-age=31536000; SameSite=Lax`;
        window.dispatchEvent(new CustomEvent("simat-hero-change", { detail: id }));
        setActiveHeroId(id);
      }
    } catch {}
    setCopiedId(id);
    if (redirectNow) {
      window.location.href = id === "diamond-seal" || id === "canonical-diamond" || id === "default" ? "/" : `/?hero=${id}`;
      return;
    }
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleResetDefault = () => {
    handleSetHero("diamond-seal");
  };

  const filteredIllustrations =
    selectedCategory === "all"
      ? ILLUSTRATIONS
      : ILLUSTRATIONS.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-[110px] pb-24 text-[var(--text-primary)]">
      {/* Top Breadcrumb & Return Link */}
      <div className="wrap mb-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[13px] font-mono text-[var(--gold-accent)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
          >
            <span>←</span> Return to Homepage
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-[var(--text-secondary)] font-mono">
            <span>ACTIVE ON HERO:</span>
            <span className="text-[var(--gold-accent)] font-semibold">
              {activeHeroId === "diamond-seal" || activeHeroId === "default"
                ? "Original Concentric Diamonds (Default)"
                : ILLUSTRATIONS.find((i) => i.id === activeHeroId)?.name ?? "Original Concentric Diamonds (Default)"}
            </span>
            {activeHeroId !== "diamond-seal" && activeHeroId !== "default" && (
              <button
                type="button"
                onClick={handleResetDefault}
                className="ml-1 text-[11px] text-[var(--gold-accent)] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                (Reset to Default)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Editorial Header */}
      <section className="wrap mb-14 text-center max-w-4xl mx-auto">
        <p className="eyebrow mb-3">Simat Capital · Design System</p>
        <h1 className="h1 text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight">
          {ILLUSTRATIONS.length} Animated <span className="em-gold">Illustrations</span>
        </h1>
        <p className="lead mt-6 text-[var(--text-secondary)] max-w-2xl mx-auto">
          Fifteen symbolic marks, plus fifteen Process &amp; Proof diagrams that show how Simat Capital actually works: the four Shariah screens, the eleven pre-trade checks, the 90-day grace period, purification per tax lot and the tamper-evident record. Real labels, real thresholds, real sequence.
        </p>

        {/* Global Controls & Filters Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {/* Category Tabs */}
          <div className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-[var(--line-soft)] bg-[var(--bg-raised)]/90 p-1.5 backdrop-blur-md">
            {[
              { id: "all", label: `All (${ILLUSTRATIONS.length})` },
              { id: "process", label: "Process & Proof" },
              { id: "geometric", label: "Geometric Shapes" },
              { id: "instruments", label: "Precision Instruments" },
              { id: "nature-architecture", label: "Cosmos & Heritage" },
            ].map((t) =>
              t.id === "all"
                ? t
                : { ...t, label: `${t.label} (${ILLUSTRATIONS.filter((i) => i.category === t.id).length})` },
            ).map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id as IllustrationCategory | "all")}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-[var(--gold-accent)] text-[var(--bg-base)] shadow-[0_0_16px_rgba(214,180,106,0.3)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(214,180,106,0.06)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Global Subtle Motion / Static Toggle */}
          <button
            type="button"
            onClick={() => setIsMotion(!isMotion)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--bg-raised)] px-4 py-2 text-[12px] font-mono uppercase tracking-wider text-[var(--text-secondary)] hover:border-[var(--line)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span
              className={`h-2 w-2 rounded-full transition-colors ${
                isMotion ? "bg-[var(--gold-accent)] shadow-[0_0_8px_var(--gold-accent)]" : "bg-neutral-600"
              }`}
            />
            {isMotion ? "Subtle Motion Enabled" : "100% Static Mode"}
          </button>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="wrap">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredIllustrations.map((ill) => {
            const isCurrentHero =
              activeHeroId === ill.id ||
              (ill.id === "diamond-seal" && (activeHeroId === "diamond-seal" || activeHeroId === "default"));
            return (
              <div
                key={ill.id}
                className={`group relative flex flex-col justify-between rounded-2xl border bg-[var(--bg-raised)]/70 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--gold-accent)] hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8),0_0_24px_-8px_rgba(214,180,106,0.2)] ${
                  isCurrentHero
                    ? "border-[var(--gold-accent)] shadow-[0_0_24px_-6px_rgba(214,180,106,0.25)]"
                    : "border-[var(--line-soft)]"
                }`}
              >
                {/* Card Top: Badges */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-[var(--line-soft)] bg-[rgba(214,180,106,0.06)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider">
                      {ill.badge}
                    </span>
                    <span className="hidden sm:inline-block rounded-full border border-[var(--line-soft)]/60 bg-[var(--bg-base)] px-2 py-0.5 text-[10px] font-mono text-[var(--text-secondary)]">
                      {ill.animationType}
                    </span>
                  </div>
                  {isCurrentHero && (
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--gold-accent)] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold-accent)] animate-pulse" />
                      Active Hero
                    </span>
                  )}
                </div>

                {/* Illustration SVG Stage */}
                <div
                  className="relative mx-auto my-3 w-full max-w-[280px] aspect-square flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-[1.03]"
                  onClick={() => setInspectItem(ill)}
                  title="Click to view full architectural details"
                >
                  <IllustrationItem id={ill.id} isMotion={isMotion} />
                </div>

                {/* Card Content & Meaning */}
                <div className="mt-4">
                  <h3 className="serif text-[22px] font-medium text-[var(--text-primary)] group-hover:text-[var(--gold-accent)] transition-colors">
                    {ill.name}
                  </h3>
                  <p className="text-[12px] font-mono text-[var(--gold-accent)] opacity-85 mt-0.5">
                    {ill.subtitle}
                  </p>
                  <p className="text-[13.5px] text-[var(--text-secondary)] mt-2.5 line-clamp-2 leading-relaxed">
                    {ill.description}
                  </p>

                  {/* Bullet points summary */}
                  <ul className="mt-3.5 space-y-1 border-t border-[var(--line-soft)]/60 pt-3 text-[12px] text-[var(--text-secondary)]">
                    {ill.symbolism.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--gold-accent)] mt-0.5">◆</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-4 border-t border-[var(--line-soft)] flex items-center gap-2">
                  {isCurrentHero ? (
                    <Link
                      href={ill.id === "diamond-seal" ? "/" : `/?hero=${ill.id}`}
                      className="flex-1 rounded-xl py-2 px-3 text-[12.5px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 bg-[rgba(214,180,106,0.2)] text-[var(--gold-accent)] border border-[var(--gold-accent)] hover:bg-[rgba(214,180,106,0.3)] shadow-[0_0_14px_rgba(214,180,106,0.2)]"
                      title="View active on homepage hero"
                    >
                      <span>Active on Hero · View →</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetHero(ill.id)}
                      className="flex-1 rounded-xl py-2 px-3 text-[12.5px] font-medium transition-all duration-200 flex items-center justify-center gap-1.5 border border-[var(--line-soft)] text-[var(--text-primary)] hover:border-[var(--gold-accent)] hover:bg-[rgba(214,180,106,0.1)] cursor-pointer"
                    >
                      {copiedId === ill.id ? (
                        <span className="text-[var(--gold-accent)] font-semibold">✓ Applied to Hero!</span>
                      ) : (
                        <span>Apply to Hero</span>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setInspectItem(ill)}
                    className="rounded-xl border border-[var(--line-soft)] px-3 py-2 text-[12.5px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--line)] transition-colors"
                    title="View large architectural blueprint"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Instant Feedback Floating Toast when Applied */}
      {copiedId && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-[var(--gold-accent)] bg-[#12110E]/95 px-5 py-3 text-[13px] text-[var(--text-primary)] backdrop-blur-md shadow-2xl animate-bounce">
          <span className="text-[var(--gold-accent)] font-bold">✓ Applied to Hero:</span>
          <span>{ILLUSTRATIONS.find((i) => i.id === copiedId)?.name}</span>
          <Link
            href={copiedId === "diamond-seal" ? "/" : `/?hero=${copiedId}`}
            className="ml-2 rounded-full bg-[var(--gold-accent)] px-3.5 py-1 text-[12px] font-semibold text-[#0B0A08] hover:bg-[#F3E7C4] transition-colors"
          >
            View on Homepage Now →
          </Link>
        </div>
      )}

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3">
        <Link
          href={activeHeroId === "diamond-seal" || activeHeroId === "default" ? "/" : `/?hero=${activeHeroId}`}
          className="btn btn-gold shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_24px_rgba(214,180,106,0.35)] flex items-center gap-2 text-[14px]"
        >
          <span>View Active Hero on Homepage</span>
          <span>→</span>
        </Link>
        {activeHeroId !== "diamond-seal" && activeHeroId !== "default" && (
          <button
            type="button"
            onClick={handleResetDefault}
            className="rounded-full border border-[var(--gold-accent)] bg-[var(--bg-base)]/95 px-4 py-2.5 text-[12px] font-mono text-[var(--gold-accent)] backdrop-blur-md shadow-xl hover:bg-[rgba(214,180,106,0.12)] transition-colors cursor-pointer"
          >
            ↺ Reset to Default Hero
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DETAILED INSPECTION MODAL                                                 */}
      {/* ========================================================================= */}
      {inspectItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity"
          onClick={() => setInspectItem(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl border border-[var(--line)] bg-[var(--bg-base)] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setInspectItem(null)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[var(--line-soft)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--gold-accent)] transition-colors"
            >
              ✕
            </button>

            <div className="grid gap-8 md:grid-cols-2 items-center">
              {/* Left Column: Big Stage SVG */}
              <div className="relative mx-auto w-full max-w-[340px] aspect-square flex items-center justify-center p-4 rounded-2xl border border-[var(--line-soft)] bg-[var(--bg-raised)]">
                <IllustrationItem id={inspectItem.id} isMotion={isMotion} />
              </div>

              {/* Right Column: Narrative & Technical Breakdown */}
              <div>
                <span className="rounded-full border border-[var(--line-soft)] bg-[rgba(214,180,106,0.06)] px-3 py-1 text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider">
                  {inspectItem.categoryLabel} · {inspectItem.badge}
                </span>

                <h2 className="serif text-3xl font-medium mt-3 text-[var(--text-primary)]">
                  {inspectItem.name}
                </h2>
                <p className="text-[13px] font-mono text-[var(--gold-accent)] mt-1">
                  {inspectItem.subtitle}
                </p>

                <p className="text-[14px] text-[var(--text-secondary)] mt-4 leading-relaxed">
                  {inspectItem.description}
                </p>

                {/* Detailed Node Breakdowns */}
                <div className="mt-6 space-y-3 border-t border-[var(--line-soft)] pt-4">
                  <h4 className="text-[11px] uppercase tracking-wider text-[var(--gold-accent)] font-mono">
                    Institutional Architecture:
                  </h4>
                  {inspectItem.details.map((d, i) => (
                    <div key={i} className="text-[13px]">
                      <span className="font-semibold text-[var(--text-primary)] block">
                        {d.title}
                      </span>
                      <span className="text-[var(--text-secondary)] text-[12.5px] mt-0.5 block">
                        {d.sub}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Modal Action */}
                <div className="mt-8 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      handleSetHero(inspectItem.id);
                    }}
                    className="btn btn-gold flex-1 text-center"
                  >
                    {activeHeroId === inspectItem.id ? "✓ Currently Active on Hero" : "Apply as Homepage Hero"}
                  </button>
                  <Link href="/" className="btn btn-outline">
                    Go to Homepage →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
