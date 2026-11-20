import Link from "next/link";
import Chapter from "./Chapter";
import Reveal from "../Reveal";
import HeroMark from "../illustrations/HeroMark";
import ThreeBranch from "../illustrations/ThreeBranch";
import OpportunityCircles from "../illustrations/OpportunityCircles";
import DecisionEngine from "../illustrations/DecisionEngine";
import ShariahFilter from "../illustrations/ShariahFilter";
import TwoStrategies from "../illustrations/TwoStrategies";
import Founder from "./Founder";

/* All copy below is final (brief, Section C). Do not paraphrase or extend. */

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center pt-[104px] pb-12 md:pb-16">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          <p className="eyebrow fade-in">Shariah-compliant global equity</p>
          <h1 className="h1 fade-in mt-6" style={{ ["--d" as string]: "100ms" }}>
            The pursuit of Shariah-compliant alpha. <span className="em-gold">With institutional discipline.</span>
          </h1>
          <p className="lead fade-in mt-6 !text-[var(--text-secondary)]" style={{ ["--d" as string]: "200ms" }}>
            A proprietary research engine, systematic controls and human judgement, applied to under-researched companies that meet strict
            Shariah standards.
          </p>
          <div className="fade-in mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={{ ["--d" as string]: "300ms" }}>
            <Link href="/contact#waitlist" className="btn btn-gold">
              Join the waitlist
            </Link>
            <Link href="/contact#demo" className="text-link">
              Request a demo →
            </Link>
          </div>
          <p className="fade-in mt-6 max-w-[56ch] text-[14px] secondary" style={{ ["--d" as string]: "400ms" }}>
            Simat Capital does not manage external capital. Both strategies currently run on the founder&apos;s own capital.
          </p>
        </div>
        <div className="px-10 sm:px-24 lg:px-16">
          <HeroMark />
        </div>
      </div>
    </section>
  );
}

export function ChapterQuestion() {
  return (
    <Chapter id="question" eyebrow="I · The question" className="text-center [&_.wrap]:flex [&_.wrap]:flex-col [&_.wrap]:items-center">
      <Reveal>
        <blockquote className="h2 mx-auto mt-8 max-w-[22ch]">
          &ldquo;How can investors be sure their money is both <span className="em-gold">Shariah-compliant</span> and genuinely well
          researched?&rdquo;
        </blockquote>
        <p className="mt-8 text-[14px] tracking-wide secondary">Eesaa Simat, Founder, 2021</p>
        <p className="mt-6 secondary">Simat Capital was built to answer it.</p>
      </Reveal>
    </Chapter>
  );
}

function TwoCol({ text, art, reverse = false }: { text: React.ReactNode; art: React.ReactNode; reverse?: boolean }) {
  return (
    <div className={`mt-6 grid items-center gap-12 lg:grid-cols-12 lg:gap-10`}>
      <Reveal className={`lg:col-span-5 ${reverse ? "lg:order-2 lg:col-start-8" : ""}`}>{text}</Reveal>
      <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : "lg:col-start-6 lg:pl-6"}`}>{art}</div>
    </div>
  );
}

export function ChapterGap({ thread = true }: { thread?: boolean }) {
  return (
    <Chapter id="gap" thread={thread} eyebrow="II · The gap">
      <TwoCol
        text={
          <>
            <h2 className="h2">Compliant is the start, not the finish.</h2>
            <p className="body mt-6">
              Shariah screens tell us what we may own. Our research decides what is worth owning: compliant, deeply understood and priced
              below its value.
            </p>
          </>
        }
        art={<ThreeBranch />}
      />
    </Chapter>
  );
}

export function ChapterEdge() {
  return (
    <Chapter id="edge" eyebrow="III · The edge">
      <TwoCol
        reverse
        text={
          <>
            <h2 className="h2">Alpha where others are not looking.</h2>
            <p className="body mt-6">
              We focus on companies the market under-studies, where original research and strict Shariah discipline matter most.
            </p>
          </>
        }
        art={<OpportunityCircles />}
      />
    </Chapter>
  );
}

export function ChapterMethod({ thread = true }: { thread?: boolean }) {
  return (
    <Chapter id="method" thread={thread} eyebrow="IV · The method">
      <Reveal className="mt-6 max-w-[720px]">
        <h2 className="h2">
          Machine-scale research. <span className="em-gold">Human judgement.</span>
        </h2>
        <p className="body mt-6">
          Specialised research models build and test every case. Systematic controls must pass. The Chief Investment Officer makes every
          decision.
        </p>
      </Reveal>
      <div className="mt-16">
        <DecisionEngine />
      </div>
      <p className="mt-12">
        <Link href="/institutions" className="text-link">
          Read the full approach →
        </Link>
      </p>
    </Chapter>
  );
}

export function ChapterDiscipline({ thread = true }: { thread?: boolean }) {
  return (
    <Chapter id="discipline" thread={thread} eyebrow="V · The discipline">
      <div className="mt-6 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="h2">Screened systematically. Monitored continuously.</h2>
          <p className="body mt-6">
            Every company passes four screens before it can be proposed, and is re-screened on every new filing while held.
          </p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
          <ul className="space-y-4">
            {[
              "Purification calculated and recorded for every holding.",
              "No leverage, no short selling, no interest-bearing cash.",
              "Uncertain cases are excluded until resolved.",
            ].map((f) => (
              <li key={f} className="flex gap-4 text-[15px]" style={{ color: "var(--text-primary)" }}>
                <span className="dia mt-[8px]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="mt-16">
        <ShariahFilter />
      </div>
      <p className="mt-10 text-[13px] secondary">Thresholds follow the firm&apos;s adopted Shariah methodology and may change when it is updated.</p>
    </Chapter>
  );
}

export function ChapterStrategies() {
  return (
    <Chapter id="strategies" eyebrow="VI · The strategies">
      <Reveal className="mt-6 max-w-[760px]">
        <h2 className="h2">One for the long term. One for timely opportunities.</h2>
      </Reveal>
      <div className="mt-14">
        <TwoStrategies />
      </div>
      <Reveal className="mt-12">
        <p style={{ color: "var(--text-primary)" }}>Shared research and Shariah method. Separate limits and records.</p>
        <p className="mt-3 text-[14px] secondary">Both strategies currently run on the founder&apos;s own capital and are not open to investors.</p>
      </Reveal>
    </Chapter>
  );
}

export function ChapterFounder() {
  return (
    <Chapter id="founder" eyebrow="VII · The founder">
      <Reveal className="mt-10">
        <Founder />
      </Reveal>
    </Chapter>
  );
}

export function Closing() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="mx-auto max-w-[720px] border-t pt-20 text-center" style={{ borderColor: "var(--line-soft)" }}>
          <h2 className="h2">Register your interest.</h2>
          <p className="body mx-auto mt-5">Join the waitlist, make an enquiry or request a demo. Eesaa replies personally.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <Link href="/contact#waitlist" className="btn btn-gold">
              Join the waitlist
            </Link>
            <Link href="/contact#enquiry" className="text-link">
              Make an enquiry
            </Link>
            <Link href="/contact#demo" className="text-link">
              Request a demo
            </Link>
          </div>
          <p className="mt-7 text-[14px] secondary">Registering interest is not an offer or a commitment to invest.</p>
        </Reveal>
      </div>
    </section>
  );
}
