import Image from "next/image";

/**
 * Simat Capital official mark (goooood.svg).
 */
export function Mark({ size = 32, className = "" }: { size?: number; className?: string; solid?: boolean }) {
  return (
    <Image
      src="/goooood.svg"
      alt="Simat Capital logo"
      width={size}
      height={size}
      className={`inline-block shrink-0 object-contain ${className}`}
      priority={size >= 28}
    />
  );
}

export function Lockup({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-3">
      <Mark size={size} />
      <span className="serif text-[21px] font-semibold leading-none tracking-tight" style={{ color: "var(--text-primary)" }}>
        Simat Capital
      </span>
    </span>
  );
}
