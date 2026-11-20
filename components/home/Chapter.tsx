"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "../useInView";

/**
 * One chapter of the Home story. Renders its eyebrow ("II · THE GAP") and, on wide screens,
 * the diamond on the story thread that fills gold as the chapter scrolls into view.
 */
export default function Chapter({
  id,
  eyebrow,
  children,
  className = "",
  thread = true,
}: {
  id?: string;
  eyebrow: string;
  children: ReactNode;
  className?: string;
  thread?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const on = useInView(ref, 0.3);

  return (
    <section ref={ref} id={id} className={`section ${className}`} aria-labelledby={id ? `${id}-eyebrow` : undefined}>
      {thread && (
        <span
          aria-hidden
          className="thread-x absolute top-[86px] hidden h-[11px] w-[11px] -translate-x-1/2 rotate-45 border xl:block"
          style={{
            borderColor: "var(--gold-accent)",
            background: on ? "var(--gold-accent)" : "var(--bg-base)",
            transition: "background-color 500ms var(--ease)",
          }}
        />
      )}
      <div className="wrap">
        <p id={id ? `${id}-eyebrow` : undefined} className="eyebrow">
          {eyebrow}
        </p>
        {children}
      </div>
    </section>
  );
}

/** The fine gold vertical line that runs down the left margin from Chapter I to Chapter VII. */
export function StoryThread({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <span aria-hidden className="thread-x absolute bottom-[120px] top-[92px] hidden w-px xl:block" style={{ background: "var(--line)" }} />
      {children}
    </div>
  );
}
