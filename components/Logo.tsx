import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 34, withWord = true }: { size?: number; withWord?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 group" aria-label="Simat Capital home">
      <Image
        src="/simat-mark.png"
        alt=""
        width={size}
        height={size}
        priority
        className="transition-transform duration-700 group-hover:rotate-[8deg]"
      />
      {withWord && (
        <span className="serif text-[22px] leading-none tracking-wide" style={{ color: "var(--cream)" }}>
          Simat <span className="gold">Capital</span>
        </span>
      )}
    </Link>
  );
}
