import type { CSSProperties, ReactNode } from "react";

/** Small shared building blocks for the investor demo slides. */

export function Kicker({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "muted" }) {
  return <p className={`d-kicker ${tone === "muted" ? "d-kicker-muted" : ""}`}>{children}</p>;
}

export function Title({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h1 className={`d-title ${className}`}>{children}</h1>;
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`d-label ${className}`}>{children}</span>;
}

export function Card({
  children,
  className = "",
  accent = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className={`d-card ${accent ? "d-card-accent" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`d-note ${className}`}>{children}</p>;
}

export function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: "pass" | "breach" | "info" | "neutral" | "gold" }) {
  return <span className={`d-pill d-pill-${tone}`}>{children}</span>;
}
