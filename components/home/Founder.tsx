import Image from "next/image";
import { FLAGS } from "@/lib/flags";

/**
 * Founder block (Home 7.7, condensed on Institutions Ch.7).
 * Headshot is [Confirm]; until supplied a neutral frame is shown. Never use the logo here.
 */
export default function Founder({ condensed = false }: { condensed?: boolean }) {
  return (
    <div className={`grid items-center gap-10 ${condensed ? "md:grid-cols-[200px_1fr]" : "md:grid-cols-[minmax(0,340px)_1fr] md:gap-16"}`}>
      <div
        className="relative aspect-[4/5] w-full max-w-[340px] overflow-hidden border"
        style={{ borderColor: "var(--line-soft)", background: "var(--bg-raised)" }}
      >
        {FLAGS.founderPhoto ? (
          <Image
            src={FLAGS.founderPhoto}
            alt="Eesaa Simat, Founder and Chief Investment Officer of Simat Capital"
            fill
            sizes="(min-width: 768px) 340px, 100vw"
            className="object-cover"
            style={{ filter: "saturate(0.85)" }}
            priority={!condensed}
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-5" aria-hidden>
            <span className="ill-sub">Portrait to follow</span>
          </div>
        )}
      </div>
      <div>
        <h3 className={`serif ${condensed ? "text-[32px]" : "text-[40px] md:text-[46px]"} leading-tight`} style={{ color: "var(--text-primary)" }}>
          Eesaa Simat
        </h3>
        <p className="mt-1 text-[16px]" style={{ color: "var(--gold-accent)" }}>
          Founder and Chief Investment Officer
        </p>

        <p className="body mt-5 text-[15.5px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          I have managed my own capital since 2021, through rising rates, the 2022 sell-off and the AI boom. I invest like an owner, not a trader: protect capital first, then let a small number of exceptional, genuinely Shariah-compliant companies compound. Every position is valued before it is bought, sized so no single mistake defines the outcome, and comes with a plan written before markets turn. Built for families who measure wealth in generations, not quarters.
        </p>

        <p
          className="serif mt-7 border-l-2 py-1 pl-5 text-[21px] leading-snug md:text-[23px]"
          style={{ borderColor: "var(--gold-accent)", color: "var(--text-primary)" }}
        >
          Both strategies run on the founder&apos;s own capital, through the same process described here.
        </p>

        {FLAGS.founderLinkedIn && (
          <a
            href={FLAGS.founderLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-10 w-10 items-center justify-center border transition-colors duration-300 hover:border-[var(--gold-accent)]"
            style={{ borderColor: "var(--line)", color: "var(--gold-accent)" }}
            aria-label="Eesaa Simat on LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21H9z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
