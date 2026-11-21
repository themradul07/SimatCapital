"use client";

import { useEffect, useState } from "react";

export type IndexItem = { id: string; label: string };

/** Sticky contents list that tracks the chapter in view. Also forwards the retired #briefing anchor. */
export default function SideIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // Brief, Section 6: /institutions#briefing → /contact#enquiry (fragments never reach the server).
    if (window.location.hash === "#briefing") window.location.replace("/contact#enquiry");

    // Active = the last chapter whose top has passed 35% of the viewport. Recomputed on every
    // scroll frame so fast jumps (anchor links, keyboard) never leave a stale highlight.
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
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
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-28 hidden lg:block">
      <ol className="border-l" style={{ borderColor: "var(--hairline)" }}>
        {items.map((it, i) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className="-ml-px flex gap-3 border-l py-2 pl-4 text-[14px] transition-colors duration-300"
                style={{ borderColor: on ? "var(--gold-accent)" : "transparent", color: on ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                <span className="ill-num w-4 shrink-0 text-[15px]">{i + 1}</span>
                {it.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
