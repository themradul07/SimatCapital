"use client";

import { useEffect, useState } from "react";

export type IndexItem = { id: string; label: string };

/** Sticky contents list that tracks the section currently in view. */
export default function SideIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] muted">On this page</p>
      <ol className="relative space-y-1 border-l" style={{ borderColor: "var(--line)" }}>
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className="relative -ml-px flex gap-3 border-l py-1.5 pl-4 text-[13.5px] transition-all duration-500"
                style={{ borderColor: on ? "var(--gold)" : "transparent", color: on ? "var(--cream)" : "var(--muted)" }}
              >
                <span className="w-5 shrink-0" style={{ color: on ? "var(--gold)" : "var(--faint)", fontVariantNumeric: "tabular-nums" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
