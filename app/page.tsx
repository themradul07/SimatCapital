import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import WhyExist from "@/components/WhyExist";
import FiveQuestions from "@/components/FiveQuestions";
import TwoBooks from "@/components/TwoBooks";
import ShariahGate from "@/components/ShariahGate";
import DecisionFlow from "@/components/DecisionFlow";
import EtfTable from "@/components/EtfTable";
import Founder from "@/components/Founder";
import Faq, { faqCore } from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import CountUp from "@/components/CountUp";
import Arrow from "@/components/Arrow";

const valueSources = [
  { t: "Research beyond the numbers", d: "Management, positioning and threats, not just financial statements." },
  { t: "Value discipline", d: "Pay a sensible price. Hold cash when good ideas are scarce." },
  { t: "Overlooked opportunities", d: "Compliant small and mid-sized companies that others under-research." },
  { t: "Speed on compliance", d: "Re-screen when new results come out, not at the next index review." },
];

const shariahPoints = [
  "Every stock is screened before it can be proposed, using the MSCI Islamic method.",
  "Screening is done by code, not opinion, and refreshed when companies publish results.",
  "Holdings are watched after purchase, not only at entry.",
  "Impure income is calculated and recorded for every holding, so it can be purified.",
  "If a stock is unclear, the system stops and waits for a ruling. It does not guess.",
  "No leverage, no margin, no short selling, no interest-bearing cash.",
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Simat Capital · Shariah-compliant global equity"
        lines={["Investing with *Purpose.*", "Delivering with *Precision.*"]}
        lede={
          <>
            An actively managed, Shariah-compliant global equity firm. We combine value-focused research, a systematic process
            and Shariah screening, and <span style={{ color: "var(--cream)" }}>every investment decision is made by a person.</span>
          </>
        }
        actions={
          <>
            <Link href="/individuals" className="btn btn-gold">
              For Individuals <Arrow />
            </Link>
            <Link href="/institutions" className="btn btn-ghost">
              For Family Offices and Institutions
            </Link>
            <div className="flex w-full gap-6 pt-1 text-[14px]">
              <a href="#how-it-works" className="link-gold">See how it works</a>
              <Link href="/demo" className="link-gold">Watch the demo</Link>
            </div>
          </>
        }
      />

      <Marquee />

      {/* Two ways in */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Choose your depth"
            title={<>The same story, <span className="italic-gold">told two ways.</span></>}
            lede="Start here for the overview. Then go deeper in the way that suits you."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                href: "/individuals",
                k: "For Individuals",
                t: "Plain words, short reading.",
                d: "Is it Shariah-compliant? Is my money safe? Who is behind it? Answered simply, in about two minutes.",
                tags: ["Shariah in plain words", "Who decides", "The founder"],
              },
              {
                href: "/institutions",
                k: "For Family Offices and Institutions",
                t: "Process, controls and governance in full.",
                d: "The investment cycle, the digital team, eleven pre-trade checks, the Shariah method and how we prove it works.",
                tags: ["Controls", "Governance", "Shariah method", "Security"],
              },
            ].map((c, i) => (
              <Reveal key={c.href} delay={i * 150}>
                <Link href={c.href} className="card group flex h-full flex-col md:p-10">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] gold">{c.k}</p>
                  <p className="serif mt-5 text-[34px] leading-tight md:text-[40px]" style={{ color: "var(--cream)" }}>
                    {c.t}
                  </p>
                  <p className="mt-4 muted">{c.d}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border px-3 py-1 text-[12.5px] muted" style={{ borderColor: "var(--line)" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 pt-10 text-[15px] font-semibold gold">
                    Continue
                    <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why we exist */}
      <section className="section">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <SectionHead
            eyebrow="Why we exist"
            title={<>Compliant is not the same as <span className="italic-gold">a good investment.</span></>}
            lede="Checking that a share is Shariah-compliant, well understood and fairly priced takes far longer than buying it. Simat Capital exists to close that gap."
          />
          <WhyExist />
        </div>
      </section>

      {/* How we think */}
      <section className="section">
        <div className="wrap">
          <FiveQuestions />
        </div>
      </section>

      {/* Where we aim to add value */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Where we aim to add value"
            title={<>Four sources, <span className="italic-gold">one objective.</span></>}
            lede="We aim to outperform our benchmark on a risk-adjusted basis over a full market cycle. An objective, not a promise."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueSources.map((v, i) => (
              <Reveal key={v.t} delay={i * 110} className="card">
                <span className="serif text-[46px] leading-none" style={{ color: "var(--gold)" }}>0{i + 1}</span>
                <h3 className="h3 mt-8">{v.t}</h3>
                <p className="mt-3 text-[15px] muted">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Two strategies */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Two strategies, one platform"
            title={<>Two books. <span className="italic-gold">Never mixed.</span></>}
            lede="Same research, same Shariah framework, same controls. Separate capital, limits, records and approvals."
          />
          <div className="mt-14">
            <TwoBooks />
          </div>
        </div>
      </section>

      {/* Shariah */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Shariah, built into every step"
            title={<>Screened by code. <span className="italic-gold">Watched after purchase.</span></>}
            lede="Shariah-screened using the MSCI Islamic method. Not a certification: a Shariah adviser will rule on disputed cases."
          />
          <div className="mt-14">
            <ShariahGate />
          </div>
          <ul className="mt-10 grid gap-x-10 gap-y-5 md:grid-cols-2">
            {shariahPoints.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 70} className="flex gap-4">
                <span className="mt-[9px] h-[7px] w-[7px] shrink-0 rotate-45" style={{ background: "var(--gold)" }} />
                <span style={{ color: "var(--text)" }}>{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* A person decides */}
      <section className="section" id="how-it-works">
        <div className="wrap">
          <SectionHead
            eyebrow="A person decides"
            title={<>AI proposes. Code checks. <span className="italic-gold">A person decides.</span></>}
            lede="No agent can place an order, change a limit or approve anything. If a check fails or data is missing, the trade stops. It is never assumed to pass."
          />
          <div className="mt-14">
            <DecisionFlow />
          </div>
          <Reveal className="mt-16 flex flex-col items-start gap-5 rounded-2xl border p-6 md:flex-row md:items-center md:justify-between md:p-8" style={{ borderColor: "rgba(63,207,142,0.35)", background: "var(--ok-wash)" }}>
            <div className="flex items-center gap-4">
              <span className="chip" style={{ padding: 0, border: 0, background: "none" }}><span className="dot" /></span>
              <p style={{ color: "var(--cream)" }}>
                <strong>A kill switch</strong> stops new orders immediately. It never sells a holding by itself.
              </p>
            </div>
            <p className="text-[14px] muted">Approval is by passkey, tied to one exact order.</p>
          </Reveal>
        </div>
      </section>

      {/* Transparency */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Transparency and record-keeping"
            title={<>A number that cannot be traced <span className="italic-gold">is struck out.</span></>}
            lede="A permanent audit trail of every decision, including rejected ideas and the reasons. The aim is repeatable, risk-adjusted compounding, not the highest annual return."
          />
          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4" style={{ borderColor: "var(--line)", background: "var(--line)" }}>
            {[
              { n: 5, l: "questions every investment must answer" },
              { n: 11, l: "pre-trade checks run in code" },
              { n: 12, l: "AI roles, each with one job" },
              { n: 0, l: "orders an AI agent can place", zero: true },
            ].map((s) => (
              <div key={s.l} className="p-6 md:p-9" style={{ background: "var(--bg)" }}>
                <p className="serif text-[56px] leading-none md:text-[72px]" style={{ color: "var(--gold)" }}>
                  {s.zero ? "0" : <CountUp to={s.n} />}
                </p>
                <p className="mt-3 text-[14px] muted">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Reports every day, quarter and year, with every number traced to stored data.",
              "Performance measured net of costs, against a stated benchmark, with sample size and drawdown shown.",
              "Strong results never raise the risk taken.",
            ].map((t, i) => (
              <Reveal key={t} delay={i * 100} className="border-t pt-5" style={{ borderColor: "var(--gold-deep)" }}>
                <p style={{ color: "var(--text)" }}>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ETF */}
      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="A fair question"
            title={<>Why not simply buy a <span className="italic-gold">Shariah ETF?</span></>}
            lede="ETFs are not bad. They make different trade-offs."
          />
          <div className="mt-14">
            <EtfTable />
          </div>
        </div>
      </section>

      {/* Founder + values */}
      <section className="section">
        <div className="wrap">
          <Founder />
          <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3" style={{ borderColor: "var(--line)", background: "var(--line)" }}>
            {[
              ["Stewardship", "over short-term returns"],
              ["Integrity", "in every report"],
              ["Transparency", "in how we think"],
            ].map(([a, b], i) => (
              <Reveal key={a} delay={i * 120} className="p-8 text-center" style={{ background: "var(--bg)" }}>
                <p className="serif text-[30px]" style={{ color: "var(--cream)" }}>{a}</p>
                <p className="muted">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Institutions teaser */}
      <section className="section">
        <div className="wrap">
          <Reveal className="card overflow-hidden md:p-14">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <span className="eyebrow">For family offices and institutions</span>
                <h2 className="h2 mt-5">The process, the controls and the governance <span className="italic-gold">in full.</span></h2>
                <Link href="/institutions" className="btn btn-gold mt-10">
                  Read the full picture <Arrow />
                </Link>
              </div>
              <dl className="divide-y" style={{ borderColor: "var(--line)" }}>
                {[
                  ["Process", "A nine-step cycle from new filing to recorded, monitored outcome."],
                  ["Controls", "Eleven pre-trade checks, passkey approval, nightly reconciliation, a kill switch."],
                  ["Shariah method", "MSCI Islamic, stored as data, with recorded rulings and a purification ledger."],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-2 py-5 md:grid-cols-[150px_1fr]" style={{ borderColor: "var(--line)" }}>
                    <dt className="serif text-[22px] gold">{k}</dt>
                    <dd className="muted">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Questions" title={<>Asked <span className="italic-gold">often.</span></>} />
          <Faq
            items={[
              ...faqCore,
              { q: "Who is behind Simat Capital?", a: "Eesaa Simat, Founder and Chief Investment Officer, who founded the firm in 2021 and approves every investment decision." },
            ]}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
