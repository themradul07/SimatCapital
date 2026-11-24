"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Mark } from "@/components/site/Logo";
import { Beliefs, Problem, WhyHard, Process, ShariahInAction } from "./slidesA";
import { MarketsFall, Receive, Founder, Governance, Closing } from "./slidesB";
import Cover from "./Cover";
import ProcessWalkthrough from "./ProcessWalkthrough";
import ImportantInfo from "./ImportantInfo";
import "./demo.css";

/**
 * Simat Capital investor overview: a cover plus ten slides, full screen, no website chrome.
 * Navigation: arrow keys, swipe, the footer controls, or #1–#11 in the URL.
 */
const TITLES = [
  "Welcome",
  "Our beliefs",
  "The problem",
  "Why Shariah is hard",
  "Our process",
  "Shariah in action",
  "When markets fall",
  "What investors receive",
  "The founder",
  "Governance and risks",
  "Next steps",
];

const COUNT = TITLES.length;

function readHash(): { slide: number; process: boolean } {
  if (typeof window === "undefined") return { slide: 0, process: false };
  const h = window.location.hash.replace("#", "");
  if (h === "process") return { slide: COUNT - 1, process: true };
  const n = parseInt(h, 10);
  return { slide: n >= 1 && n <= COUNT ? n - 1 : 0, process: false };
}

export default function InvestorDemo() {
  const [slide, setSlide] = useState(0);
  const [process, setProcess] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [headerRevealed, setHeaderRevealed] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  // Initial position from the URL, and back/forward support.
  useEffect(() => {
    const sync = () => {
      const s = readHash();
      setSlide(s.slide);
      setProcess(s.process);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const enterFullscreenIfAllowed = useCallback(() => {
    if (typeof document !== "undefined" && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  const go = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(COUNT - 1, n));
      setProcess(false);
      setSlide(next);
      setHeaderRevealed(false);
      history.replaceState(null, "", `#${next + 1}`);
      // Automatically enter full screen when moving from the cover into the presentation slides
      if (next >= 1) {
        enterFullscreenIfAllowed();
      }
    },
    [enterFullscreenIfAllowed]
  );

  // If user opens the demo directly at slide 1 or beyond via URL hash (#2, etc.),
  // automatically trigger full screen on their first user interaction.
  useEffect(() => {
    const onFirstAction = () => {
      if (slide >= 1 && !document.fullscreenElement) {
        enterFullscreenIfAllowed();
      }
    };
    window.addEventListener("click", onFirstAction, { once: true });
    window.addEventListener("keydown", onFirstAction, { once: true });
    window.addEventListener("touchstart", onFirstAction, { once: true });
    return () => {
      window.removeEventListener("click", onFirstAction);
      window.removeEventListener("keydown", onFirstAction);
      window.removeEventListener("touchstart", onFirstAction);
    };
  }, [slide, enterFullscreenIfAllowed]);

  const openProcess = useCallback(() => {
    setProcess(true);
    history.replaceState(null, "", "#process");
  }, []);

  const closeProcess = useCallback(() => {
    setProcess(false);
    history.replaceState(null, "", `#${COUNT}`);
  }, []);

  const openInfo = useCallback(() => dialog.current?.showModal(), []);

  // Each slide starts at the top.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [slide, process]);

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (dialog.current?.open || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (process) {
        if (e.key === "Escape") closeProcess();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && tag !== "BUTTON" && tag !== "A")) {
        e.preventDefault();
        go(slide + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(slide - 1);
      } else if (e.key === "Home") {
        go(0);
      } else if (e.key === "End") {
        go(COUNT - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slide, process, go, closeProcess]);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen().catch(() => {});
  };

  const slides: ReactNode[] = [
    <Cover key="0" onStart={() => go(1)} onJump={go} chapters={TITLES.slice(1)} />,
    <Beliefs key="1" />,
    <Problem key="2" />,
    <WhyHard key="3" />,
    <Process key="4" />,
    <ShariahInAction key="5" />,
    <MarketsFall key="6" />,
    <Receive key="7" />,
    <Founder key="8" />,
    <Governance key="9" />,
    <Closing key="10" onProcess={openProcess} onInfo={openInfo} />,
  ];

  const isLast = slide === COUNT - 1;

  return (
    <div className="d-shell">
      <div className="d-glow" aria-hidden />

      {/* Top bar (Hidden by default; reveals when hovering upper area) */}
      <div className={`d-top-wrapper ${headerRevealed ? "is-revealed" : ""}`}>
        <div
          className="d-top-trigger"
          aria-label="Reveal header"
          onClick={() => setHeaderRevealed((r) => !r)}
        />
        <header className="d-top">
          <div className="flex min-w-0 items-center gap-3">
            <Mark size={28} />
            <span className="serif truncate text-[20px] font-semibold leading-none" style={{ color: "var(--text-primary)" }}>
              Simat Capital
            </span>
            <span className="d-badge hidden sm:inline-flex">Investor overview · Confidential</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-[13px] md:inline secondary">{process ? "The process in action" : TITLES[slide]}</span>
            <span className="serif text-[18px] tabular-nums" style={{ color: "var(--gold-accent)" }} aria-live="polite">
              {String(slide + 1).padStart(2, "0")}
              <span className="secondary"> / {COUNT}</span>
            </span>
            <button type="button" onClick={toggleFullscreen} className="d-icon-btn hidden sm:inline-flex" aria-label={fullscreen ? "Exit full screen" : "Full screen"}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                {fullscreen ? <path d="M9 3v4a2 2 0 0 1-2 2H3m18 0h-4a2 2 0 0 1-2-2V3m0 18v-4a2 2 0 0 1 2-2h4M3 15h4a2 2 0 0 1 2 2v4" /> : <path d="M3 8V3h5M21 8V3h-5M3 16v5h5M21 16v5h-5" />}
              </svg>
            </button>
          </div>
        </header>
      </div>

      {/* Slide */}
      <main
        ref={scroller}
        className="d-main"
        onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
        onTouchEnd={(e) => {
          const t = touch.current;
          touch.current = null;
          if (!t || process) return;
          const dx = e.changedTouches[0].clientX - t.x;
          const dy = e.changedTouches[0].clientY - t.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) go(slide + (dx < 0 ? 1 : -1));
        }}
      >
        <section key={process ? "process" : slide} className="d-slide" aria-label={process ? "The process in action" : `${slide + 1} of ${COUNT}: ${TITLES[slide]}`}>
          {process ? <ProcessWalkthrough onClose={closeProcess} /> : slides[slide]}
        </section>
      </main>

      {/* Bottom controls */}
      <footer className="d-bottom">
        <div className="d-progress" aria-hidden>
          <div style={{ width: `${((slide + 1) / COUNT) * 100}%` }} />
        </div>
        <div className="d-bottom-row">
          <button type="button" className="btn btn-outline !min-h-[40px] !px-4" onClick={() => (process ? closeProcess() : go(slide - 1))} disabled={!process && slide === 0} aria-label="Previous slide">
            ‹ <span className="hidden sm:inline">Back</span>
          </button>
          <nav className="d-dots" aria-label="Slides">
            {TITLES.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => go(i)}
                className={`d-dot ${i === slide ? "is-on" : i < slide ? "is-done" : ""}`}
                aria-label={`Slide ${i + 1}: ${t}`}
                aria-current={i === slide && !process ? "step" : undefined}
                title={`${i + 1}. ${t}`}
              />
            ))}
          </nav>
          <button type="button" className="btn btn-gold !min-h-[40px] !px-5" onClick={() => (process ? closeProcess() : go(isLast ? 0 : slide + 1))} aria-label={isLast ? "Back to the first slide" : "Next slide"}>
            {process ? "Overview" : isLast ? "Start again" : "Next"} <span aria-hidden>›</span>
          </button>
        </div>
        <p className="d-disclaimer">
          Confidential. Capital at risk. Not an offer or advice.{" "}
          <button type="button" onClick={openInfo} className="underline decoration-[var(--line-link)] underline-offset-2 hover:text-[var(--gold-accent)]">
            Important information
          </button>
        </p>
      </footer>

      <dialog ref={dialog} className="d-dialog" aria-labelledby="ii-title" onClick={(e) => e.target === dialog.current && dialog.current?.close()}>
        <div className="d-dialog-inner">
          <div className="mb-6 flex items-start justify-between gap-6">
            <h2 id="ii-title" className="h3">
              Important information
            </h2>
            <button type="button" className="d-icon-btn" onClick={() => dialog.current?.close()} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ImportantInfo />
        </div>
      </dialog>
    </div>
  );
}
