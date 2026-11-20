"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lockup } from "./Logo";

const LINKS = [
  { label: "Approach", href: "/#method" },
  { label: "Institutions", href: "/institutions" },
  { label: "Private investors", href: "/private-investors" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-colors duration-500"
      style={{
        background: scrolled || open ? "rgba(10, 9, 7, 0.9)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
        backdropFilter: scrolled ? "blur(10px)" : undefined,
      }}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Simat Capital, home" onClick={() => setOpen(false)}>
          <Lockup />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className="text-[15px] transition-colors duration-300 hover:text-[var(--text-primary)]"
                style={{ color: active ? "var(--text-primary)" : "var(--text-secondary)" }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-outline !min-h-[40px] !px-5 !text-[14px]">
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          style={{ color: "var(--text-primary)" }}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="fade-in fixed inset-x-0 bottom-0 top-[72px] md:hidden" style={{ background: "var(--bg-base)" }}>
          <nav className="wrap flex flex-col pt-6" aria-label="Main">
            {[...LINKS, { label: "Contact", href: "/contact" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="serif border-b py-5 text-[28px]"
                style={{ borderColor: "var(--hairline)", color: pathname === l.href ? "var(--gold-accent)" : "var(--text-primary)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
