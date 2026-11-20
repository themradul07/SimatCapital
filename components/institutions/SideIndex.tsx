"use client";

import { useEffect, useState } from "react";

export type IndexItem = { id: string; label: string };

/** Sticky contents list that tracks the chapter in view. Also forwards the retired #briefing anchor. */
export default function SideIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // Brief, Section 6: /institutions#briefing → /contact#enquiry (fragments never reach the server).
    if (window.location.hash === "#briefing") window.location.replace("/contact#enquiry");

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
