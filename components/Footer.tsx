import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)", background: "var(--bg-2)" }}>
      <div className="wrap py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size={40} />
            <p className="serif mt-6 text-[24px] leading-snug" style={{ color: "var(--cream)" }}>
              Investing with Purpose.
              <br />
              <span className="italic-gold">Delivering with Precision.</span>
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-[15px] muted">
              <li><Link className="hover:text-[var(--gold)] transition-colors" href="/">Home</Link></li>
              <li><Link className="hover:text-[var(--gold)] transition-colors" href="/individuals">For Individuals</Link></li>
              <li><Link className="hover:text-[var(--gold)] transition-colors" href="/institutions">For Family Offices and Institutions</Link></li>
              <li><Link className="hover:text-[var(--gold)] transition-colors" href="/demo">Demo</Link></li>
              <li><Link className="hover:text-[var(--gold)] transition-colors" href="/sign-up">Sign up</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <p className="mt-5 text-[15px] muted">
              {/* Placeholder: contact address to be supplied by the client (open item 9). */}
              Enquiries through the{" "}
              <Link href="/institutions#briefing" className="link-gold">investor briefing form</Link>.
            </p>
          </div>
        </div>

        {/* Disclaimer slot. Legal wording to be supplied by the client and his advisers. */}
        <div
          className="mt-14 rounded-2xl border p-6 text-[13px] leading-relaxed"
          style={{ borderColor: "var(--line)", color: "var(--faint)" }}
        >
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            Important information
          </p>
          <p>
            Simat Capital is in a paper trading phase and does not manage outside capital. Nothing on this website is an
            offer, an invitation to invest or investment advice. Any figures shown are illustrative. Past performance is not
            a guide to future returns. The value of investments can go down as well as up and you may get back less than you
            invest. Shariah screening follows the MSCI Islamic method and is not a certification.{" "}
            <em>Draft wording, pending approval.</em>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-[13px] md:flex-row md:justify-between" style={{ color: "var(--faint)" }}>
          <p>© {"2026"} Simat Capital. All rights reserved.</p>
          <p>Founded 2021 · Shariah-screened global equity</p>
        </div>
      </div>
    </footer>
  );
}
