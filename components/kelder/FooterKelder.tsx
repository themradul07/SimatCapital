import Image from "next/image";
import Link from "next/link";

export default function FooterKelder() {
  return (
    <footer
      className="relative z-10 overflow-hidden pt-20 pb-8"
      style={{ background: "linear-gradient(180deg, var(--bg-2) 0%, var(--bg-deep) 100%)", borderTop: "1px solid var(--line)" }}
    >
      <div className="wrap">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="space-y-5 md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative h-9 w-9">
                <Image src="/simat-mark.png" alt="" fill sizes="36px" className="object-contain" />
              </span>
              <span className="serif text-[24px] font-semibold" style={{ color: "var(--cream)" }}>
                Simat Capital
              </span>
            </Link>
            <p className="serif text-[24px] leading-snug" style={{ color: "var(--cream)" }}>
              Investing with Purpose.
              <br />
              <span className="italic-gold">Delivering with Precision.</span>
            </p>
            <p className="max-w-sm text-[13.5px] muted">
              An actively managed, Shariah-compliant global equity firm. Founded in 2021.
            </p>
          </div>

          <div className="space-y-4 md:col-span-3">
            <span className="eyebrow-kelder block">Explore</span>
            <ul className="space-y-3 text-[14px] muted">
              {[
                ["Home", "/"],
                ["For Individuals", "/individuals"],
                ["For Family Offices and Institutions", "/institutions"],
                ["Demo", "/demo"],
                ["Sign up", "/sign-up"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors duration-300 hover:text-[var(--gold)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:col-span-4">
            <span className="eyebrow-kelder block">Contact</span>
            {/* Contact address to be supplied by the client (open item 9). */}
            <p className="text-[14px] muted">
              Family offices and institutions:{" "}
              <Link href="/institutions#briefing" className="link-gold">request the investor briefing</Link>.
            </p>
            <p className="text-[14px] muted">
              Everyone else: <Link href="/sign-up" className="link-gold">sign up for updates</Link>.
            </p>
          </div>
        </div>

        {/* Disclaimer slot. Legal wording to be supplied by the client and his advisers (open item 2). */}
        <div className="mt-16 rounded-2xl border p-6 text-[12.5px] leading-relaxed md:p-7" style={{ borderColor: "var(--line)", color: "var(--faint)" }}>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            Important information
          </p>
          <p>
            Simat Capital is in a paper trading phase and does not manage outside capital. Nothing on this website is an offer,
            an invitation to invest or investment advice. Any figures shown are illustrative. Past performance is not a guide to
            future returns. Capital is at risk: the value of investments can go down as well as up. Shariah screening follows the
            MSCI Islamic method and is not a certification. <em>Draft wording, pending approval.</em>
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-[12.5px] md:flex-row md:justify-between" style={{ color: "var(--faint)" }}>
          <p>© 2026 Simat Capital. All rights reserved.</p>
          <p>Shariah-screened global equity · Founded 2021</p>
        </div>

        <div aria-hidden className="pointer-events-none mt-10 select-none overflow-hidden text-center">
          <span
            className="serif block whitespace-nowrap text-[17vw] font-semibold leading-[0.8] tracking-tight md:text-[13vw]"
            style={{
              background: "linear-gradient(180deg, rgba(214,180,106,0.2) 0%, rgba(214,180,106,0.02) 80%, transparent 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Simat Capital
          </span>
        </div>
      </div>
    </footer>
  );
}
