import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import WhyExist from "@/components/WhyExist";
import FiveQuestions from "@/components/FiveQuestions";
import ShariahGate from "@/components/ShariahGate";
import DecisionFlow from "@/components/DecisionFlow";
import TwoBooks from "@/components/TwoBooks";
import Founder from "@/components/Founder";
import Faq, { faqCore } from "@/components/Faq";
import LeadForm from "@/components/LeadForm";
import Arrow from "@/components/Arrow";

export const metadata: Metadata = {
  title: "For Individuals",
  description: "Shariah-compliant investing, decided by people and checked by code. Simat Capital in plain words.",
};

const plain = [
  { t: "Checked before, and after", d: "Every company is checked against Shariah rules before we consider it, and again whenever it publishes new results." },
  { t: "No guessing", d: "If something is unclear, everything stops and waits for a proper ruling." },
  { t: "Purification, done for you", d: "The small share of income that is not permissible is worked out for every holding and recorded, so it can be given to charity." },
  { t: "No debt, ever", d: "No borrowing, no margin, no short selling and no interest on cash." },
];

export default function Individuals() {
  return (
    <>
      <Hero
        eyebrow="For individuals"
        lines={["Shariah-compliant investing,", "*decided* by people,", "checked by code."]}
        lede="Simat Capital researches companies carefully, checks every one against Shariah rules, and lets a person make every final decision. Here is how it works, in plain words."
        actions={
          <>
            <a href="#stay-informed" className="btn btn-gold">
              Stay informed <Arrow />
            </a>
            <Link href="/demo" className="btn btn-ghost">Watch the demo</Link>
          </>
        }
      />

      <section className="section">
        <div className="wrap grid items-center gap-16 lg:grid-cols-2">
          <SectionHead
            eyebrow="Why we exist"
            title={<>Compliant is the start,<span className="italic-gold">not the finish.</span></>}
            lede="A share can pass Shariah rules and still be a poor investment. We check three things, not one: is it compliant, do we understand it, and is the price fair?"
          />
          <WhyExist />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <FiveQuestions />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Shariah, in plain words"
            title={<>Every company passes <span className="italic-gold">three checks</span> before a person sees it.</>}
            lede="We follow the MSCI Islamic screening method. We do not claim certification; a Shariah adviser will rule on any case that is unclear."
          />
          <div className="mt-14">
            <ShariahGate />
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {plain.map((p, i) => (
              <Reveal key={p.t} delay={i * 100} className="card">
                <div className="h-3 w-3 rotate-45" style={{ background: "var(--gold)" }} />
                <h3 className="h3 mt-6">{p.t}</h3>
                <p className="mt-3 text-[15px] muted">{p.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Is AI running the money?"
            title={<>No. <span className="italic-gold">A person decides.</span></>}
            lede="AI does the reading and suggests ideas. Software checks the rules. Our founder approves every decision, and nothing moves without that approval."
          />
          <div className="mt-20">
            <DecisionFlow showToggle={false} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Two strategies"
            title={<>One for the long term. <span className="italic-gold">One for timely ideas.</span></>}
            lede="They share the same research and the same Shariah rules, but their money is always kept apart."
          />
          <div className="mt-14">
            <TwoBooks />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Founder />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Questions" title={<>In plain <span className="italic-gold">words.</span></>} />
          <Faq
            items={[
              faqCore[2],
              faqCore[0],
              faqCore[1],
              { q: "Is my money safe?", a: "We do not hold anyone's money today: Simat Capital is in a paper trading phase. When that changes, the same controls apply: no borrowing, risk set before every trade, records matched to the broker every night, and a kill switch." },
              faqCore[3],
              faqCore[5],
            ]}
          />
        </div>
      </section>

      <section className="section" id="stay-informed">
        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHead
            eyebrow="Stay informed"
            title={<>Follow along as our record is <span className="italic-gold">built transparently.</span></>}
            lede="Occasional updates by email. This is not an investment account and no money is taken."
          />
          <Reveal delay={150}>
            <LeadForm variant="stay-informed" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
