import Image from "next/image";
import Reveal from "./Reveal";

export default function Founder({ long = false }: { long?: boolean }) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-[340px_1fr] md:gap-20">
      <Reveal>
        {/* Placeholder until the client supplies a photo (open item 5). */}
        <div
          className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[22px] border"
          style={{ borderColor: "var(--line)", background: "radial-gradient(circle at 50% 35%, var(--panel-2), var(--bg-2))" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/simat-mark.png" alt="" width={140} height={140} className="opacity-80" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6" style={{ background: "linear-gradient(transparent, rgba(10,19,29,0.95))" }}>
            <p className="serif text-[26px]" style={{ color: "var(--cream)" }}>Eesaa Simat</p>
            <p className="text-[13px] gold">Founder and Chief Investment Officer</p>
          </div>
        </div>
      </Reveal>
      <div>
        <Reveal>
          <span className="eyebrow">The founder</span>
        </Reveal>
        <Reveal delay={100}>
          <blockquote className="serif mt-6 text-[28px] leading-[1.25] md:text-[38px]" style={{ color: "var(--cream)" }}>
            &ldquo;How can investors be sure their money is both <span className="italic-gold">Shariah-compliant</span> and
            genuinely well researched?&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={200}>
          <p className="lede mt-7">
            Eesaa Simat founded Simat Capital in 2021 around that question, and two more: how to pursue alpha without
            unnecessary risk, and how to build something that lasts but stays manageable day to day.
          </p>
        </Reveal>
        {long && (
          <Reveal delay={260}>
            <p className="lede mt-5">
              The firm&apos;s own operating system came from those questions: research, risk control and Shariah screening in
              one disciplined, auditable process. He sets the mandate and the risk appetite, and steps in for approvals,
              exceptions, disputed Shariah rulings, material risk decisions and any decision to activate live capital.
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
