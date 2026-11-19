"use client";

import { useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { useInView } from "./useInView";

type Props = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Calm fade-in when the element enters the viewport. Replays every time it is scrolled back to:
 * rises from below when scrolling down, settles from above when scrolling up.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", style, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { inView, exitedFrom } = useInView(ref, 0.08);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${inView ? "in" : ""} ${exitedFrom === "top" ? "reveal-from-top" : ""} ${className}`}
      style={{ ...style, ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
