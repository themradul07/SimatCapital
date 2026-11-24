"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ILLUSTRATIONS,
  type IllustrationDefinition,
} from "./illustrationData";
import IllustrationItem from "./IllustrationItem";

interface IllustrationEnlargedViewerProps {
  illustration: IllustrationDefinition;
}

export default function IllustrationEnlargedViewer({
  illustration: ill,
}: IllustrationEnlargedViewerProps) {
  const [zoom, setZoom] = useState<number>(1.25); // Default enlarged to 125%
  const [isMotion, setIsMotion] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeHeroId, setActiveHeroId] = useState<string>("diamond-seal");
  const [appliedToast, setAppliedToast] = useState<boolean>(false);

  const stageContainerRef = useRef<HTMLDivElement>(null);

  // Sync active hero from storage/cookie
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

  // Track browser fullscreen changes
  useEffect(() => {
    const onFs = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const handleToggleFullscreen = () => {
    if (!stageContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      stageContainerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleApplyHero = useCallback(() => {
    try {
      localStorage.setItem("simat_hero_illustration", ill.id);
      document.cookie = `simat_hero_illustration=${ill.id}; path=/; max-age=31536000; SameSite=Lax`;
      window.dispatchEvent(new CustomEvent("simat-hero-change", { detail: ill.id }));
      setActiveHeroId(ill.id);
      setAppliedToast(true);
      setTimeout(() => setAppliedToast(false), 3500);
    } catch {}
  }, [ill.id]);

  // Find neighbor items for prev/next
  const currentIndex = ILLUSTRATIONS.findIndex((item) => item.id === ill.id);
  const prevItem = currentIndex > 0 ? ILLUSTRATIONS[currentIndex - 1] : ILLUSTRATIONS[ILLUSTRATIONS.length - 1];
  const nextItem = currentIndex < ILLUSTRATIONS.length - 1 ? ILLUSTRATIONS[currentIndex + 1] : ILLUSTRATIONS[0];

  const isCurrentHero =
    activeHeroId === ill.id ||
    (ill.id === "diamond-seal" && (activeHeroId === "diamond-seal" || activeHeroId === "default"));

  return (
    <div className="min-h-screen pt-28 pb-24 text-[var(--text-primary)]">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="wrap mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line-soft)]/60 pb-5">
          <div className="flex items-center gap-3 text-[13px] font-mono">
            <Link
              href="/illustrations"
              className="text-[var(--gold-accent)] hover:text-white transition-colors flex items-center gap-1.5 font-medium"
            >
              <span>←</span> Return to All Illustrations
            </Link>
            <span className="text-[var(--text-secondary)]">/</span>
            <span className="text-[var(--text-secondary)] uppercase">{ill.categoryLabel}</span>
          </div>

          {/* Quick Prev / Next Switcher */}
          <div className="flex items-center gap-3">
            <Link
              href={`/illustrations/${prevItem.id}`}
              className="rounded-lg border border-[var(--line-soft)] bg-[var(--bg-raised)]/70 px-3 py-1.5 text-[12px] font-mono text-[var(--text-secondary)] hover:text-white hover:border-[var(--gold-accent)] transition-colors flex items-center gap-1.5"
              title={`Previous: ${prevItem.name}`}
            >
              <span>←</span> Prev
            </Link>
            <span className="text-[12px] font-mono text-[var(--text-secondary)]">
              {currentIndex + 1} / {ILLUSTRATIONS.length}
            </span>
            <Link
              href={`/illustrations/${nextItem.id}`}
              className="rounded-lg border border-[var(--line-soft)] bg-[var(--bg-raised)]/70 px-3 py-1.5 text-[12px] font-mono text-[var(--text-secondary)] hover:text-white hover:border-[var(--gold-accent)] transition-colors flex items-center gap-1.5"
              title={`Next: ${nextItem.name}`}
            >
              Next <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Showcase Header */}
      <section className="wrap mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full border border-[var(--gold-accent)]/40 bg-[rgba(214,180,106,0.1)] px-3 py-0.5 text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider">
                {ill.badge}
              </span>
              <span className="rounded-full border border-[var(--line-soft)] bg-[var(--bg-raised)] px-2.5 py-0.5 text-[11px] font-mono text-[var(--text-secondary)]">
                {ill.animationType}
              </span>
              {ill.isEnhanced ? (
                <span className="rounded-full border border-[var(--gold-accent)] bg-[var(--gold-accent)] text-[#0B0A08] px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider">
                  ★ Masterwork Edition
                </span>
              ) : (
                <span className="rounded-full border border-[var(--line-soft)] bg-neutral-800 text-neutral-300 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider">
                  Baseline Schematic
                </span>
              )}
            </div>
            <h1 className="h1 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight">
              {ill.name}
            </h1>
            <p className="text-[15px] font-mono text-[var(--gold-accent)] mt-1.5">
              {ill.subtitle}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {isCurrentHero ? (
              <span className="rounded-xl border border-[var(--gold-accent)] bg-[rgba(214,180,106,0.15)] px-4 py-2.5 text-[13px] font-mono text-[var(--gold-accent)] font-semibold flex items-center gap-2 shadow-[0_0_16px_rgba(214,180,106,0.25)]">
                <span className="h-2 w-2 rounded-full bg-[var(--gold-accent)] animate-pulse" />
                Active Homepage Hero
              </span>
            ) : (
              <button
                type="button"
                onClick={handleApplyHero}
                className="btn btn-gold text-[13px] px-5 py-2.5 shadow-[0_0_20px_rgba(214,180,106,0.3)] cursor-pointer"
              >
                Apply as Homepage Hero
              </button>
            )}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline text-[13px] px-4 py-2.5"
            >
              View Homepage ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Enlarged Inspection Canvas & Live Controls Bar */}
      <section className="wrap mb-16">
        <div className="rounded-3xl border border-[var(--line)] bg-[#0B0A08] p-4 sm:p-6 shadow-[0_24px_64px_-16px_rgba(0,0,0,0.9),0_0_40px_-10px_rgba(214,180,106,0.15)]">
          {/* Controls Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line-soft)]/50 pb-4 mb-4 text-[12px] font-mono">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[var(--text-secondary)] uppercase tracking-wider text-[11px] mr-1">
                Enlarged Scale:
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))))}
                className="h-8 w-8 rounded-lg border border-[var(--line-soft)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:border-[var(--gold-accent)] hover:text-[var(--gold-accent)] flex items-center justify-center font-bold text-[14px] transition-colors"
                title="Zoom Out"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => setZoom(1.0)}
                className={`px-3 h-8 rounded-lg border font-mono transition-colors ${
                  zoom === 1.0
                    ? "border-[var(--gold-accent)] bg-[rgba(214,180,106,0.12)] text-[var(--gold-accent)] font-semibold"
                    : "border-[var(--line-soft)] bg-[var(--bg-raised)] text-[var(--text-secondary)] hover:text-white"
                }`}
                title="Reset to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.5, Number((z + 0.25).toFixed(2))))}
                className="h-8 w-8 rounded-lg border border-[var(--line-soft)] bg-[var(--bg-raised)] text-[var(--text-primary)] hover:border-[var(--gold-accent)] hover:text-[var(--gold-accent)] flex items-center justify-center font-bold text-[14px] transition-colors"
                title="Zoom In"
              >
                +
              </button>

              {/* Quick Preset Buttons */}
              <div className="hidden sm:flex items-center gap-1.5 ml-2 border-l border-[var(--line-soft)]/60 pl-3">
                {[1.0, 1.25, 1.5, 2.0].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setZoom(preset)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors ${
                      zoom === preset
                        ? "bg-[var(--gold-accent)] text-[#0B0A08] font-bold"
                        : "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-raised)]"
                    }`}
                  >
                    {Math.round(preset * 100)}%
                  </button>
                ))}
              </div>
            </div>

            {/* Motion & Stage Mode Options */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Motion toggle */}
              <button
                type="button"
                onClick={() => setIsMotion(!isMotion)}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--line-soft)] bg-[var(--bg-raised)] px-3 py-1.5 text-[11px] font-mono text-[var(--text-secondary)] hover:border-[var(--gold-accent)] hover:text-white transition-colors"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    isMotion ? "bg-[var(--gold-accent)] shadow-[0_0_8px_var(--gold-accent)]" : "bg-neutral-600"
                  }`}
                />
                {isMotion ? "Live Motion" : "Freeze Frame"}
              </button>

              {/* Grid toggle */}
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`rounded-lg border px-3 py-1.5 text-[11px] font-mono transition-colors ${
                  showGrid
                    ? "border-[var(--gold-accent)]/50 bg-[rgba(214,180,106,0.08)] text-[var(--gold-accent)]"
                    : "border-[var(--line-soft)] bg-[var(--bg-raised)] text-[var(--text-secondary)] hover:text-white"
                }`}
                title="Toggle architectural coordinate grid backdrop"
              >
                Grid {showGrid ? "On" : "Off"}
              </button>

              {/* Fullscreen button */}
              <button
                type="button"
                onClick={handleToggleFullscreen}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--gold-accent)]/60 bg-[rgba(214,180,106,0.1)] px-3 py-1.5 text-[11px] font-mono text-[var(--gold-accent)] hover:bg-[rgba(214,180,106,0.2)] transition-colors"
                title="Expand stage to browser fullscreen"
              >
                <span>{isFullscreen ? "Exit Fullscreen" : "⛶ Fullscreen Canvas"}</span>
              </button>
            </div>
          </div>

          {/* Dedicated High-Resolution Stage Viewport */}
          <div
            ref={stageContainerRef}
            className={`relative w-full min-h-[550px] sm:min-h-[700px] lg:min-h-[760px] rounded-2xl border border-[var(--line-soft)]/60 bg-[#080706] flex items-center justify-center overflow-hidden transition-all duration-300 ${
              isFullscreen ? "p-8 fixed inset-0 z-[1000] rounded-none !min-h-screen" : "p-6 sm:p-12"
            }`}
            style={{
              backgroundImage: showGrid
                ? `radial-gradient(rgba(214,180,106,0.12) 1px, transparent 1px), linear-gradient(to right, rgba(214,180,106,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(214,180,106,0.03) 1px, transparent 1px)`
                : undefined,
              backgroundSize: showGrid ? "32px 32px, 96px 96px, 96px 96px" : undefined,
            }}
          >
            {/* Ambient Radial Golden Aura */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40"
              aria-hidden
            >
              <div className="h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(214,180,106,0.25)_0%,transparent_70%)] blur-2xl" />
            </div>

            {/* Exit fullscreen float button */}
            {isFullscreen && (
              <button
                type="button"
                onClick={handleToggleFullscreen}
                className="absolute top-6 right-6 z-50 rounded-full border border-[var(--gold-accent)] bg-black/80 px-4 py-2 text-[12px] font-mono text-[var(--gold-accent)] backdrop-blur-md hover:bg-black transition-colors"
              >
                ✕ Exit Fullscreen
              </button>
            )}

            {/* Scalable Container */}
            <div
              className="relative w-full max-w-[580px] sm:max-w-[700px] lg:max-w-[780px] aspect-square flex items-center justify-center transition-transform duration-300"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
              }}
            >
              <IllustrationItem id={ill.id} isMotion={isMotion} />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)] px-2">
            <span>Inspection Resolution: High-Fidelity Scalable Vector (SVG)</span>
            <span>Current Scale: {Math.round(zoom * 100)}%</span>
          </div>
        </div>
      </section>

      {/* Comprehensive Architectural Specifications & Breakdown */}
      <section className="wrap">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Card 1: Narrative & Description */}
          <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--bg-raised)]/70 p-6 backdrop-blur-sm">
            <span className="text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider block mb-2">
              Methodology & Context
            </span>
            <h3 className="serif text-2xl font-medium text-[var(--text-primary)]">
              Institutional Narrative
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] mt-4 leading-relaxed">
              {ill.description}
            </p>
            <div className="mt-6 border-t border-[var(--line-soft)]/60 pt-4">
              <span className="text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider block mb-1">
                Engine Choreography
              </span>
              <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {ill.animationDescription}
              </p>
            </div>
          </div>

          {/* Card 2: Core Symbolism & Moat */}
          <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--bg-raised)]/70 p-6 backdrop-blur-sm">
            <span className="text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider block mb-2">
              Discipline & Governance
            </span>
            <h3 className="serif text-2xl font-medium text-[var(--text-primary)]">
              Institutional Symbolism
            </h3>
            <ul className="mt-4 space-y-3 text-[13px] text-[var(--text-secondary)]">
              {ill.symbolism.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="text-[var(--gold-accent)] mt-0.5 font-bold">◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Invariant Details & Technical Spec */}
          <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--bg-raised)]/70 p-6 backdrop-blur-sm">
            <span className="text-[11px] font-mono text-[var(--gold-accent)] uppercase tracking-wider block mb-2">
              Engineering Architecture
            </span>
            <h3 className="serif text-2xl font-medium text-[var(--text-primary)]">
              Systematic Invariants
            </h3>
            <div className="mt-4 space-y-4">
              {ill.details.map((d, i) => (
                <div key={i} className="text-[13px] border-b border-[var(--line-soft)]/40 pb-3 last:border-b-0">
                  <span className="font-semibold text-[var(--text-primary)] block">
                    {d.title}
                  </span>
                  <span className="text-[var(--text-secondary)] text-[12.5px] mt-0.5 block leading-relaxed">
                    {d.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner Actions */}
        <div className="mt-12 rounded-2xl border border-[var(--gold-accent)]/40 bg-[rgba(214,180,106,0.06)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div>
            <h4 className="serif text-2xl font-medium text-[var(--text-primary)]">
              Deploy this illustration as the active homepage hero
            </h4>
            <p className="text-[13.5px] text-[var(--text-secondary)] mt-1">
              Test how &quot;{ill.name}&quot; anchors Simat Capital&apos;s primary institutional value proposition.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleApplyHero}
              className="btn btn-gold flex-1 sm:flex-initial text-center text-[13px] whitespace-nowrap shadow-xl"
            >
              {isCurrentHero ? "✓ Active on Homepage" : "Apply as Homepage Hero"}
            </button>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline flex-1 sm:flex-initial text-center text-[13px] whitespace-nowrap"
            >
              Open Homepage ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Instant Toast Notification */}
      {appliedToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full border border-[var(--gold-accent)] bg-[#12110E]/95 px-6 py-3.5 text-[13px] text-[var(--text-primary)] backdrop-blur-md shadow-2xl animate-bounce">
          <span className="text-[var(--gold-accent)] font-bold">✓ Applied to Hero:</span>
          <span>{ill.name}</span>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-full bg-[var(--gold-accent)] px-3.5 py-1 text-[12px] font-semibold text-[#0B0A08] hover:bg-[#F3E7C4] transition-colors"
          >
            Open Homepage ↗
          </Link>
        </div>
      )}
    </div>
  );
}
