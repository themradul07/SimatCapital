"use client";

import { useEffect, useRef, useState } from "react";

const questions = [
  { q: "Why this company?", a: "What it does, who runs it, and why it deserves a place." },
  { q: "Why this price?", a: "A sensible price, or no purchase. Cash is a valid answer." },
  { q: "What might the market be missing?", a: "The part others have not looked at closely enough." },
  { q: "What could go wrong?", a: "A bear case is written down before anything is decided." },
  { q: "What would change our mind?", a: "Agreed in advance, so we notice when it happens." },
];

/** Sticky intro on the left; each question brightens as it crosses the middle of the screen. */
export default function FiveQuestions() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <span className="chip-gold">How we think</span>
        <h2 className="k-title mt-6">
          Every investment must answer <span className="italic-gold">five questions.</span>
        </h2>
        <p className="lede mt-6">
          When something changes, we ask: why now, what changed, and has this happened before? Behind every decision sits one
          more question: how does this benefit our investors?
        </p>
        <div className="mt-10 hidden items-center gap-3 lg:flex" aria-hidden>
          {questions.map((_, i) => (
            <span
              key={i}
              className="h-2.5 w-2.5 rotate-45 transition-all duration-700"
              style={{ background: i <= active ? "var(--gold)" : "var(--line)", transform: `rotate(45deg) scale(${i === active ? 1.4 : 1})` }}
            />
          ))}
        </div>
      </div>

      <ol className="space-y-4">
        {questions.map((item, i) => {
          const on = i === active;
          return (
            <li
              key={item.q}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="card flex gap-6 transition-all duration-700 md:p-9"
              style={{
                opacity: on ? 1 : 0.42,
                borderColor: on ? "rgba(214,180,106,0.45)" : undefined,
                transform: on ? "translateX(0)" : "translateX(8px)",
              }}
            >
              <span className="serif text-[40px] leading-none" style={{ color: on ? "var(--gold)" : "var(--faint)" }}>
                0{i + 1}
              </span>
              <div>
                <p className="serif text-[28px] leading-tight md:text-[34px]" style={{ color: "var(--cream)" }}>
                  {item.q}
                </p>
                <p className="mt-2 muted">{item.a}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
