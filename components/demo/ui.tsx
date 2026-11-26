import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

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

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  accent?: boolean;
  style?: CSSProperties;
}

export function Card({
  children,
  className = "",
  accent = false,
  style,
  ...rest
}: CardProps) {
  return (
    <div className={`d-card ${accent ? "d-card-accent" : ""} ${className}`} style={style} {...rest}>
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

/**
 * Sleek bottom loading bar showing when the next auto-play step/transition will fire.
 * Resets smoothly whenever `activeKey` changes, and hides when `paused` is true.
 */
export function AutoProgressBar({
  durationMs,
  activeKey,
  paused = false,
  tone = "gold",
  className = "",
}: {
  durationMs: number;
  activeKey: string | number | boolean;
  paused?: boolean;
  tone?: "gold" | "dark";
  className?: string;
}) {
  if (paused) return null;
  return (
    <span
      key={String(activeKey)}
      aria-hidden="true"
      className={`d-progress-bar pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] ${className}`}
      style={{
        animationDuration: `${durationMs}ms`,
        background:
          tone === "dark"
            ? "linear-gradient(90deg, rgba(14,13,10,0.45), rgba(14,13,10,0.85))"
            : "linear-gradient(90deg, rgba(214,180,106,0.45), var(--gold-accent))",
      }}
    />
  );
}
