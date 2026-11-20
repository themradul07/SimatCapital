import Link from "next/link";
import { Lockup } from "./Logo";

const LINKS: [string, string][] = [
  ["Approach", "/#method"],
  ["Institutions", "/institutions"],
  ["Private investors", "/private-investors"],
  ["Contact", "/contact"],
  ["Important information", "/important-information"],
  ["Privacy", "/privacy"],
  ["Cookies", "/cookies"],
  ["Terms", "/terms"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-10" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link href="/" aria-label="Simat Capital, home">
              <Lockup />
            </Link>
            <p className="secondary">Shariah-compliant global equity.</p>
          </div>
          <nav className="md:col-span-7" aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-[15px] sm:grid-cols-3">
              {LINKS.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="secondary transition-colors duration-300 hover:text-[var(--gold-accent)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 space-y-3 border-t pt-8 text-[14px] leading-relaxed secondary" style={{ borderColor: "var(--hairline)" }}>
          {/* [Confirm with solicitor] */}
          <p>Simat Capital is a trading name used by Eesaa Simat and is not yet incorporated.</p>
          <p>
            Simat Capital is not authorised by the FCA and does not accept external capital. Nothing on this website is an offer or
            investment advice. Capital is at risk.{" "}
            <Link href="/important-information" className="text-link">
              Important information
            </Link>
            .
          </p>
          <p>© 2026 Simat Capital. All rights reserved.</p>
        </div>

        <div aria-hidden className="pointer-events-none mt-12 select-none overflow-hidden text-center">
          <span className="serif block whitespace-nowrap text-[16vw] font-semibold leading-[0.8] md:text-[12vw]" style={{ color: "rgba(214,180,106,0.05)" }}>
            Simat Capital
          </span>
        </div>
      </div>
    </footer>
  );
}
