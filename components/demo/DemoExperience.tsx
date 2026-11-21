"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import "./demo.css";
import { CHAPTERS, DISCLAIMER, LEGAL_SCREENS, MARK_LABELS, NOTICE } from "./content";
import { Competition, Factsheet, TrackRecord } from "./chapters/Gated";
import { MarkPath, Words, useReducedMotion } from "./primitives";
import { Beliefs, Problems, WhyHard } from "./chapters/Story";
import { Edge, Engine } from "./chapters/Engine";
import { Downside, Portfolio } from "./chapters/Portfolio";
import { ShariahInAction, Transparency } from "./chapters/Proof";
import { Governance, Measure, NextStep, Risks } from "./chapters/Trust";

/**
 * Investor demo (brief, B): the landing page "opening up". Private, shared only after a demo request.
 * A scrolling walkthrough of twelve chapters plus the next step (fifteen once LEGAL_SCREENS is on). Each chapter asks its question first,
 * then answers it with something the visitor can try. Guided tour = the brief's auto-play.
 */

const IDS = CHAPTERS.map((c) => c.id);

/* ------------------------------ opening notice (session) ------------------------------ */

const NOTICE_KEY = "simat-demo-notice";
let noticeAccepted = false;
const noticeListeners = new Set<() => void>();

function readNotice() {
  if (noticeAccepted) return true;
  try {
    return window.sessionStorage.getItem(NOTICE_KEY) === "1";
  } catch {
    return false;
  }
}

function acceptNotice() {
  noticeAccepted = true;
  try {
    window.sessionStorage.setItem(NOTICE_KEY, "1");
  } catch {
    /* storage blocked: the in-memory flag is enough for this visit */
  }
  noticeListeners.forEach((l) => l());
}

function useNoticeAccepted() {
  return useSyncExternalStore(
    (cb) => {
      noticeListeners.add(cb);
      return () => noticeListeners.delete(cb);
    },
    readNotice,
    () => false,
  );
}

function Notice({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[rgba(6,5,4,0.86)] p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="notice-h">
      <div className="dm-fade-up w-full max-w-[560px] rounded-[16px] border border-[var(--line)] bg-[var(--bg-raised)] p-7 sm:p-10">
        <svg width="44" height="44" viewBox="-22 -22 144 144" aria-hidden>
          <MarkPath width={10} />
        </svg>
        <p className="dm-tag mt-6" style={{ color: "var(--gold-accent)" }}>
          Confidential · Investor demo
        </p>
        <h2 id="notice-h" className="h3 mt-3 !text-[28px]">
          Before you begin
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-primary)]">{NOTICE}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <button className="btn btn-gold" onClick={onAccept} autoFocus>
            I understand
          </button>
          <Link href="/" className="text-link text-[15px]">
            Leave the demo
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ intro: the mark splits ------------------------------ */

const CLIPS = [
  "polygon(0% 0%, 100% 0%, 50% 50%)",
  "polygon(100% 0%, 100% 100%, 50% 50%)",
  "polygon(0% 100%, 100% 100%, 50% 50%)",
  "polygon(0% 0%, 0% 100%, 50% 50%)",
];
const AWAY = [
  "translate3d(0, calc(-1 * var(--away, 20px)), 0)",
  "translate3d(var(--away, 20px), 0, 0)",
  "translate3d(0, var(--away, 20px), 0)",
  "translate3d(calc(-1 * var(--away, 20px)), 0, 0)",
];
const LABEL_AT = [
  "left-1/2 bottom-full -translate-x-1/2 pb-1.5 sm:pb-2.5",
  "left-full top-1/2 -translate-y-1/2 pl-1.5 sm:pl-2.5",
  "left-1/2 top-full -translate-x-1/2 pt-1.5 sm:pt-2.5",
  "right-full top-1/2 -translate-y-1/2 pr-1.5 sm:pr-2.5",
];

function Intro({ onBegin, ready = true }: { onBegin: () => void; ready?: boolean }) {
  const [split, setSplit] = useState(false);

  // Automatically break the mark: min(scroll to begin, 2 sec)
  useEffect(() => {
    if (!ready || split) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setSplit(true);
    };

    const timer = window.setTimeout(trigger, 2000);

    const onScrollOrAction = () => {
      trigger();
    };

    window.addEventListener("scroll", onScrollOrAction, { passive: true });
    window.addEventListener("wheel", onScrollOrAction, { passive: true });
    window.addEventListener("touchmove", onScrollOrAction, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScrollOrAction);
      window.removeEventListener("wheel", onScrollOrAction);
      window.removeEventListener("touchmove", onScrollOrAction);
    };
  }, [ready, split]);

  const begin = () => {
    setSplit(true);
    onBegin();
  };

  return (
    <section className="dm-on relative flex min-h-[100svh] items-center overflow-hidden pt-[72px]" aria-labelledby="intro-h">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 55% at 30% 50%, rgba(214,180,106,0.09), transparent 70%)" }}
      />
      <div className="wrap relative grid items-center gap-14 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col items-center">
          <button
            onClick={() => setSplit((s) => !s)}
            aria-label={split ? "Bring the mark back together" : "Split the mark into its four parts"}
            aria-pressed={split}
            className="dm-split-container relative mx-auto h-[180px] w-[180px] xs:h-[220px] xs:w-[220px] sm:h-[320px] sm:w-[320px]"
            style={{ cursor: "pointer" }}
          >
            <span className="dm-breathe absolute inset-0 block">
              {CLIPS.map((clip, i) => (
                <span key={i} className="dm-piece absolute inset-0 block" style={{ transform: split ? AWAY[i] : "none" }}>
                  <svg viewBox="-22 -22 144 144" className="absolute inset-0 h-full w-full" style={{ clipPath: clip }} aria-hidden>
                    <MarkPath width={8} />
                  </svg>
                  <span
                    className={`dm-split-label absolute whitespace-nowrap text-[11px] font-medium tracking-[0.06em] text-[var(--text-primary)] xs:text-[12px] sm:text-[14px] ${LABEL_AT[i]}`}
                    style={{ opacity: split ? 1 : 0, transitionDelay: split ? `${500 + i * 90}ms` : "0ms" }}
                  >
                    {MARK_LABELS[i]}
                  </span>
                </span>
              ))}
            </span>
          </button>
          <span className="mt-16 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            {split ? "Tap to bring it together" : "Scroll to begin"}
          </span>
        </div>

        <div className="text-center lg:text-left">
          <p className="dm-kicker dm-x" style={{ ["--acc" as string]: "var(--gold-accent)", ["--d" as string]: "100ms" }}>
            <span>Investor demo · Confidential</span>
          </p>
          <h1 id="intro-h" className="h1 mt-6">
            <Words text="Simat Capital" start={200} step={90} />
          </h1>
          <p className="serif mt-4 text-[26px] italic text-[var(--gold-accent)] md:text-[34px]">
            <Words text="The pursuit of Shariah-compliant alpha." start={420} step={60} />
          </p>
          <div className="dm-x mt-10 flex flex-wrap justify-center gap-4 lg:justify-start" style={{ ["--d" as string]: "900ms" }}>
            <button className="btn btn-gold" onClick={begin}>
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M2 1 L11 6 L2 11 Z" fill="currentColor" />
              </svg>
              Explore the walkthrough
            </button>
          </div>
          <p className="small dm-x mt-6" style={{ ["--d" as string]: "1050ms" }}>
            Twelve chapters. Every one has something to try.
          </p>
        </div>
      </div>
      <span aria-hidden className="dm-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-secondary)]">
        <svg width="18" height="26" viewBox="0 0 18 26">
          <rect x="1" y="1" width="16" height="24" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.6" />
          <circle cx="9" cy="8" r="2" fill="var(--gold-accent)" />
        </svg>
      </span>
    </section>
  );
}

/* ------------------------------ chapter index ------------------------------ */

function ChapterIndex({ goTo }: { goTo: (i: number) => void }) {
  return (
    <section className="dm-on border-t border-[var(--hairline)] py-16 md:py-20" aria-labelledby="index-h">
      <div className="wrap">
        <h2 id="index-h" className="dm-tag">
          Inside this walkthrough
        </h2>
        <ol className="mt-6 grid gap-px overflow-hidden rounded-[14px] border border-[var(--hairline)] bg-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {CHAPTERS.filter((c) => c.id !== "next-step").map((c, i) => (
            <li key={c.id} className="bg-[var(--bg-base)]">
              <button onClick={() => goTo(i)} className="group flex h-full w-full items-start gap-4 p-5 text-left transition-colors duration-300 hover:bg-[var(--bg-raised)]">
                <span className="serif text-[22px] leading-none transition-colors duration-300" style={{ color: c.accent }}>
                  {c.n}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold">{c.short}</span>
                  {c.question && <span className="mt-1 block text-[13px] leading-snug text-[var(--text-secondary)] line-clamp-2">{c.question}</span>}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------ rail, progress, dock, disclaimer ------------------------------ */

function Rail({ active, goTo }: { active: number; goTo: (i: number) => void }) {
  return (
    <nav
      aria-label="Chapters"
      className="dm-rail fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
      style={{ opacity: active < 0 ? 0 : 1, pointerEvents: active < 0 ? "none" : "auto", transition: "opacity 500ms var(--ease)" }}
    >
      <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-[var(--line-soft)]" />
      <ol className="relative grid gap-1">
        {CHAPTERS.map((c, i) => {
          const on = i === active;
          return (
            <li key={c.id}>
              <button onClick={() => goTo(i)} aria-current={on ? "true" : undefined} className="dm-rail-item flex items-center gap-3 py-[5px]" aria-label={`${c.n} ${c.short}`}>
                <span className="grid h-[23px] w-[23px] place-items-center">
                  <span
                    className="block rotate-45"
                    style={{
                      width: on ? 11 : 7,
                      height: on ? 11 : 7,
                      background: i <= active ? c.accent : "var(--bg-base)",
                      border: `1.2px solid ${i <= active ? c.accent : "var(--line)"}`,
                      transition: "all 400ms var(--ease)",
                    }}
                  />
                </span>
                <span className="dm-rail-label whitespace-nowrap rounded-full bg-[rgba(10,9,7,0.85)] px-2 py-0.5 text-[12px]" style={{ color: on ? "var(--text-primary)" : "var(--text-secondary)" }}>
                  <span className="serif mr-1.5 text-[var(--gold-accent)]">{c.n}</span>
                  {c.short}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function ProgressBar() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-[72px] z-40 h-[2px]">
      <div ref={bar} className="h-full origin-left bg-[var(--gold-accent)]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

function Disclaimer({ hidden }: { hidden: boolean }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--hairline)] bg-[rgba(10,9,7,0.94)] px-4 py-2 text-center text-[11px] leading-snug text-[var(--text-secondary)] backdrop-blur sm:py-2.5 sm:text-[12px]"
      style={{ transform: hidden ? "translateY(100%)" : "none", transition: "transform 400ms var(--ease)" }}
    >
      {DISCLAIMER}
    </div>
  );
}

/* ------------------------------ experience ------------------------------ */

export function DemoExperience() {
  const accepted = useNoticeAccepted();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);
  const [footerInView, setFooterInView] = useState(false);

  // Lock page scroll behind the notice.
  useEffect(() => {
    if (accepted) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [accepted]);

  // Which chapter is crossing the middle of the viewport.
  useEffect(() => {
    const sections = IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(IDS.indexOf(e.target.id));
        });
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const first = sections[0];
    const onScroll = () => {
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(-1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The site footer carries the risk line, so the fixed bar steps aside for it.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setFooterInView(e.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const el = document.getElementById(IDS[Math.max(0, Math.min(IDS.length - 1, i))]);
      el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    },
    [reduced],
  );

  // Arrow keys move between chapters (not while a slider or field has focus).
  useEffect(() => {
    if (!accepted) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.altKey || e.ctrlKey || e.metaKey || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [accepted, active, goTo]);

  const begin = () => {
    window.setTimeout(() => {
      goTo(0);
    }, reduced ? 0 : 900);
  };

  return (
    <div className="dm">
      {!accepted && <Notice onAccept={acceptNotice} />}
      <ProgressBar />
      <Rail active={active} goTo={goTo} />

      <Intro onBegin={begin} ready={accepted} />
      <ChapterIndex goTo={goTo} />

      <Beliefs />
      <Problems />
      <WhyHard />
      {LEGAL_SCREENS && <TrackRecord />}
      {LEGAL_SCREENS && <Competition />}
      <Engine />
      <Edge />
      <Portfolio />
      <Downside />
      <ShariahInAction />
      <Transparency />
      <Governance />
      <Risks />
      {LEGAL_SCREENS && <Factsheet />}
      <Measure />
      <NextStep />

      <Disclaimer hidden={footerInView} />
    </div>
  );
}
