import Link from "next/link";
import IntroLoader from "@/components/kelder/IntroLoader";
import HeroKelder from "@/components/kelder/HeroKelder";
import PlatformPreview from "@/components/kelder/PlatformPreview";
import StayInformed from "@/components/kelder/StayInformed";
import Reveal from "@/components/Reveal";

/**
 * Minimalist Institutional Landing Page:
 * Focused on the hero statement, 3D interactive globe, live market ticker,
 * and illustrative platform preview. In-depth technical details, ETF comparison
 * tables, founder biography, and complete FAQs are hosted on their dedicated
 * audience pages (/individuals and /institutions).
 */
export default function Home() {
  return (
    <>
      <IntroLoader />

      {/* 1. Hero with 3D Globe, Full-Bleed Market Ribbon & Audience Doors */}
      <HeroKelder />

      {/* 2. Illustrative Intelligence Desk Terminal Preview */}
      <PlatformPreview />

      {/* 3. Minimalist Core Pillars */}
      <section className="k-section">
        <div className="wrap">
          <div className="max-w-3xl">
            <Reveal>
              <span className="chip-gold">Core Principles</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="k-title mt-6">
                Investing with purpose. <span className="italic-gold">Governed with precision.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="lede mt-6">
                We combine systematic fundamental research and automated Shariah screening, but no algorithm is ever permitted
                to deploy capital independently. Every investment decision is approved by a person.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                tag: "Purpose",
                title: "Compliant is not the same as a good investment.",
                desc: "A company can pass Shariah screens and still be a poor investment. We evaluate valuation, cash generation, and balance sheet resilience before committing.",
              },
              {
                num: "02",
                tag: "Precision",
                title: "Digital team proposes. A person decides.",
                desc: "Autonomous agents index filings, test fair-value scenarios, and check limits in code. No trade executes without physical biometric passkey authorization from the CIO.",
              },
              {
                num: "03",
                tag: "Protection",
                title: "Zero leverage. Direct sovereign custody.",
                desc: "We forbid borrowing, margin, and synthetic derivatives. Holdings are 100% cash-funded and reconciled to the broker every night with an instant kill switch.",
              },
            ].map((p, i) => (
              <Reveal key={p.num} delay={i * 120} className="card-kelder flex flex-col justify-between p-7 md:p-8">
                <div>
                  <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--line)" }}>
                    <span className="font-mono text-[12px] font-semibold text-[#D8B765]">{p.num}</span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7E8E9C]">{p.tag}</span>
                  </div>
                  <h3 className="serif mt-5 text-[22px] leading-snug text-[var(--cream)]">
                    {p.title}
                  </h3>
                  <p className="mt-3.5 text-[14px] leading-relaxed text-[#A9B6C2]">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Audience Gateways (Directing to Deep-Dive Pages) */}
      <section className="k-section">
        <div className="wrap">
          <div className="text-center">
            <Reveal>
              <span className="chip-gold">Choose Your Perspective</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="k-title mt-6">
                Explore Simat Capital <span className="italic-gold">in detail.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal delay={150}>
              <Link
                href="/individuals"
                className="card-kelder group relative flex h-full flex-col justify-between overflow-hidden p-8 transition-all duration-300 hover:border-[#D8B765]/40 hover:bg-[#192937]/80"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="chip-gold">For Individuals</span>
                    <span className="text-[12px] text-[#7E8E9C]">~2 minute read</span>
                  </div>
                  <h3 className="serif mt-6 text-[28px] text-[var(--cream)] transition-colors group-hover:text-white">
                    Plain words, clear principles.
                  </h3>
                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-[#A9B6C2]">
                    Learn why compliant isn&apos;t the finish line, how our five investment questions work, and explore our founder&apos;s background and common questions.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[13.5px] font-semibold text-[#D8B765] transition-transform duration-300 group-hover:translate-x-1">
                  Read the individual overview <span>→</span>
                </div>
              </Link>
            </Reveal>

            <Reveal delay={250}>
              <Link
                href="/institutions"
                className="card-kelder-gold group relative flex h-full flex-col justify-between overflow-hidden p-8 transition-all duration-300 hover:border-[#D8B765]/60 hover:bg-[#231F17]/90"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="chip-gold">For Family Offices & Institutions</span>
                    <span className="text-[12px] text-[#D8B765]/70">Technical Briefing</span>
                  </div>
                  <h3 className="serif mt-6 text-[28px] text-[var(--cream)] transition-colors group-hover:text-white">
                    Process, controls and governance in full.
                  </h3>
                  <p className="mt-3.5 text-[14.5px] leading-relaxed text-[#A9B6C2]">
                    Review the complete operating system: the 11 pre-trade checks in code, fail-closed architecture, Shariah purification ledgers, and comparison to Shariah ETFs.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[13.5px] font-semibold text-[#D8B765] transition-transform duration-300 group-hover:translate-x-1">
                  Inspect the institutional briefing <span>→</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Clean Institutional CTA */}
      <StayInformed />
    </>
  );
}
