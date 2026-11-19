import Link from "next/link";
import IntroLoader from "@/components/kelder/IntroLoader";
import HeroKelder from "@/components/kelder/HeroKelder";
import MarketTickerTape from "@/components/kelder/MarketTickerTape";
import PlatformPreview from "@/components/kelder/PlatformPreview";
import KHead from "@/components/kelder/KHead";
import ValueSources from "@/components/kelder/ValueSources";
import TwoStrategies from "@/components/kelder/TwoStrategies";
import ShariahSteps from "@/components/kelder/ShariahSteps";
import PersonDecides from "@/components/kelder/PersonDecides";
import Transparency from "@/components/kelder/Transparency";
import StayInformed from "@/components/kelder/StayInformed";
import Reveal from "@/components/Reveal";
import WhyExist from "@/components/WhyExist";
import FiveQuestions from "@/components/FiveQuestions";
import EtfTable from "@/components/EtfTable";
import Founder from "@/components/Founder";
import Faq, { faqCore } from "@/components/Faq";

export default function Home() {
  return (
    <>
      <IntroLoader />

      {/* 1. Hero */}
      <HeroKelder />
      <MarketTickerTape />
      <PlatformPreview />

      {/* 2. Why we exist */}
      <section className="k-section">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="chip-gold">Why we exist</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="k-title mt-6">
                Compliant is not the same as <span className="italic-gold">a good investment.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="lede mt-6">
                Checking that a share is Shariah-compliant, well understood and fairly priced takes far longer than buying it.
                Simat Capital exists to close that gap.
              </p>
            </Reveal>
          </div>
          <WhyExist />
        </div>
      </section>

      {/* 3. How we think */}
      <section className="k-section">
        <div className="wrap">
          <FiveQuestions />
        </div>
      </section>

      {/* 4. Where we aim to add value */}
      <ValueSources />

      {/* 5. Two strategies, one platform */}
      <TwoStrategies />

      {/* 6. Shariah, built into every step */}
      <ShariahSteps />

      {/* 7. A person decides */}
      <PersonDecides />

      {/* 8. Transparency */}
      <Transparency />

      {/* 9. Why not simply buy a Shariah ETF? */}
      <section className="k-section">
        <div className="wrap space-y-14">
          <KHead
            chip="A fair question"
            title={
              <>
                Why not simply buy a <span className="italic-gold">Shariah ETF?</span>
              </>
            }
            lede="ETFs are not bad. They make different trade-offs."
          />
          <EtfTable />
        </div>
      </section>

      {/* 10. Founder, with the values strip */}
      <section className="k-section">
        <div className="wrap">
          <Founder />
          <div className="mt-24 grid gap-px overflow-hidden rounded-[20px] border md:grid-cols-3" style={{ borderColor: "var(--line)", background: "var(--line)" }}>
            {[
              ["Stewardship", "over short-term returns"],
              ["Integrity", "in every report"],
              ["Transparency", "in how we think"],
            ].map(([a, b], i) => (
              <Reveal key={a} delay={i * 120} className="p-8 text-center" style={{ background: "var(--bg-2)" }}>
                <p className="serif text-[30px]" style={{ color: "var(--cream)" }}>{a}</p>
                <p className="muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Teaser for family offices and institutions */}
      <section className="k-section">
        <div className="wrap">
          <Reveal className="card-kelder-gold overflow-hidden p-7 md:p-14">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <span className="chip-gold">For family offices and institutions</span>
                <h2 className="k-title mt-6">
                  The process, the controls and the governance <span className="italic-gold">in full.</span>
                </h2>
                <Link href="/institutions" className="btn btn-gold group mt-10">
                  Read the full picture
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <dl>
                {[
                  ["Process", "One cycle from a new filing to a recorded, monitored outcome, compared later with what happened."],
                  ["Controls", "Pre-trade checks in code, passkey approval, nightly reconciliation to the broker, a kill switch."],
                  ["Shariah method", "MSCI Islamic, stored as data, with recorded rulings and a purification ledger."],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-2 border-t py-5 md:grid-cols-[160px_1fr]" style={{ borderColor: "var(--line)" }}>
                    <dt className="serif text-[22px] gold">{k}</dt>
                    <dd className="muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="k-section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <span className="chip-gold">Questions</span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="k-title mt-6">
                Asked <span className="italic-gold">often.</span>
              </h2>
            </Reveal>
          </div>
          <Faq
            items={[
              ...faqCore,
              {
                q: "Who is behind Simat Capital?",
                a: "Eesaa Simat, Founder and Chief Investment Officer, who founded the firm in 2021 and approves every investment decision.",
              },
            ]}
          />
        </div>
      </section>

      {/* 13. Call to action (footer follows in the layout) */}
      <StayInformed />
    </>
  );
}
