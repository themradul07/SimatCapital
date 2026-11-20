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

/** Slow fade (560ms ease-out) the first time the element enters the viewport. */
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", style, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <Tag ref={ref} id={id} className={`reveal ${inView ? "in" : ""} ${className}`} style={{ ...style, ["--d" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}
