/**
 * Flat SVG version of the current Simat Capital mark (brief, Section 13): the S meander inside a diamond.
 * Interim until Eesaa confirms the final mark (Engraved, Eight-point star or Crest); swap the path here only.
 */
export function Mark({ size = 32, className = "", solid = false }: { size?: number; className?: string; solid?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="-22 -22 144 144" className={className} aria-hidden focusable="false">
      <g transform="rotate(45 50 50)" fill="none" stroke="var(--gold-accent)" strokeWidth={solid ? 14 : 10} strokeLinejoin="miter" strokeLinecap="square">
        <path d="M80 40 H100 V100 H0 V0 H62 V64 H24 V24 H43 V44" />
      </g>
    </svg>
  );
}

export function Lockup({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Mark size={size} solid={size < 32} />
      <span className="serif text-[21px] font-semibold leading-none tracking-tight" style={{ color: "var(--text-primary)" }}>
        Simat Capital
      </span>
    </span>
  );
}
