import type { CSSProperties, ReactNode } from "react";

/** Shared drawing primitives for the 500×500 process illustrations. */

export const C = 250;
export const GOLD = "var(--gold-accent)";
export const TXT = "var(--text-primary)";
export const SUB = "var(--text-secondary)";
export const BG = "var(--bg-base)";

export type Vars = CSSProperties & Record<`--${string}`, string | number>;
export const v = (o: Record<string, string | number>) => o as Vars;

export const dia = (x: number, y: number, r: number) =>
  `M ${x} ${y - r} L ${x + r} ${y} L ${x} ${y + r} L ${x - r} ${y} Z`;

/**
 * Point on a circle. Rounded to 3 decimals because Math.sin/cos can differ in the last bits
 * between Node (SSR) and the browser, which would otherwise cause hydration mismatches.
 */
export const polar = (r: number, deg: number, cx = C, cy = C): [number, number] => {
  const a = (deg * Math.PI) / 180;
  const q = (n: number) => Math.round(n * 1000) / 1000;
  return [q(cx + r * Math.cos(a)), q(cy + r * Math.sin(a))];
};

export const f = (n: number) => Math.round(n * 10) / 10;

/** Deterministic scatter of "companies in view" for the funnel's outer band. */
export const FUNNEL_DOTS: [number, number][] = (() => {
  const out: [number, number][] = [];
  let seed = 7;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let k = 0; k < 46; k++) {
    const a = (rnd() * 360 * Math.PI) / 180;
    const r = 172 + rnd() * 36;
    const x = C + r * Math.cos(a);
    const y = C + r * Math.sin(a);
    if (y > 95) out.push([x, y]);
  }
  return out;
})();

export function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 12,
  color = TXT,
  mono = false,
  serif = false,
  weight,
  spacing,
  opacity,
  className,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  color?: string;
  mono?: boolean;
  serif?: boolean;
  weight?: number;
  spacing?: string;
  opacity?: number;
  className?: string;
}) {
  const font = mono ? "font-mono" : serif ? "serif" : "";
  return (
    <text
      x={f(x)}
      y={f(y)}
      textAnchor={anchor}
      fill={color}
      fontSize={size}
      fontWeight={weight}
      letterSpacing={spacing}
      opacity={opacity}
      className={[font, className].filter(Boolean).join(" ") || undefined}
    >
      {children}
    </text>
  );
}

export const CARD_SHADOW = "drop-shadow(0 4px 12px rgba(0,0,0,0.85))";
export const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Props shared by every live (enhanced / agentic) illustration. */
export interface LiveProps {
  uid: string;
  live: boolean;
  isMotion: boolean;
  pick: (i: number) => () => void;
}

/** Parallax layer: translates with the pointer by `d` units of depth. */
export function Depth({ d, lift, children }: { d: number; lift?: boolean; children: ReactNode }) {
  return (
    <g className="ill-depth" data-lift={lift ? "" : undefined} style={v({ "--d": d })}>
      {children}
    </g>
  );
}

/** One-line live event feed. Re-keys on `animKey` so each new event fades in. */
export function Ticker({ y, text, live, animKey, size = 9 }: { y: number; text: string; live: boolean; animKey?: string | number; size?: number }) {
  return (
    <text
      key={animKey ?? text}
      x={C}
      y={y}
      textAnchor="middle"
      fontSize={size}
      letterSpacing="0.05em"
      fill={TXT}
      className={`font-mono ${live ? "ill-tick-in" : ""}`}
    >
      {live && (
        <tspan fill={GOLD} className="ill-live-dot">
          ●{" "}
        </tspan>
      )}
      {live && <tspan fill={GOLD}>LIVE · </tspan>}
      {text}
    </text>
  );
}

export const Eyebrow =({ y, children }: { y: number; children: ReactNode }) => (
  <Label x={C} y={y} size={10} color={GOLD} mono spacing="0.2em" opacity={0.85}>
    {children}
  </Label>
);
