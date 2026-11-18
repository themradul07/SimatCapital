import Link from "next/link";
import Arrow from "./Arrow";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal
          className="relative overflow-hidden rounded-[28px] border px-6 py-16 text-center md:px-16 md:py-24"
          style={{ borderColor: "rgba(214,180,106,0.35)", background: "radial-gradient(ellipse at 50% 0%, rgba(214,180,106,0.14), var(--bg-2) 65%)" }}
        >
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <span className="eyebrow">Our record is being built transparently</span>
            <h2 className="h2 mx-auto mt-6 max-w-3xl">
              See the platform working, <span className="italic-gold">then decide</span> if you want to follow along.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/demo" className="btn btn-gold">
                Watch the demo <Arrow />
              </Link>
              <Link href="/sign-up" className="btn btn-ghost">
                Sign up
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[14px]">
              <Link href="/individuals" className="link-gold">For Individuals</Link>
              <Link href="/institutions" className="link-gold">For Family Offices and Institutions</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
