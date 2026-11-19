"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/** Brief 3.1: five items only. Home (logo), two audience pages, Demo, Sign up (gold, right). */
const NAV_LINKS = [
  { label: "For Individuals", href: "/individuals" },
  { label: "For Family Offices and Institutions", href: "/institutions" },
  { label: "Demo", href: "/demo" },
];

export default function NavKelder() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-500"
      style={{
        background: scrolled || mobileOpen ? "rgba(10, 9, 7, 0.86)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
      }}
    >
      <div className="wrap flex h-[68px] items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Simat Capital home">
          <span className="relative h-8 w-8 shrink-0 transition-transform duration-500 group-hover:scale-105">
            <Image src="/simat-mark.png" alt="" fill sizes="32px" className="object-contain" priority />
          </span>
          <span className="serif text-[21px] font-semibold leading-none tracking-tight" style={{ color: "var(--cream)" }}>
            Simat Capital
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="relative py-1 text-[13.5px] font-medium transition-colors duration-300"
                style={{ color: active ? "var(--cream)" : "var(--muted)" }}
              >
                {link.label}
                <span
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-500"
                  style={{ background: "var(--gold)", transform: active ? "scaleX(1)" : "scaleX(0)" }}
                />
              </Link>
            );
          })}
          <Link href="/sign-up" className="btn btn-gold !h-10 !px-5 !text-[13.5px]">
            Sign up
          </Link>
        </nav>

        {/* Mobile: Demo and Sign up stay reachable outside the menu */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/demo" className="hidden px-2 text-[13px] font-medium sm:inline" style={{ color: "var(--muted)" }}>
            Demo
          </Link>
          <Link href="/sign-up" className="btn btn-gold !h-9 !px-4 !text-[13px]">
            Sign up
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="ml-1 p-2"
            style={{ color: "var(--cream)" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fade-in border-t lg:hidden" style={{ borderColor: "var(--line)" }}>
          <div className="wrap flex flex-col py-4">
            {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b py-4 serif text-[22px]"
                style={{ borderColor: "var(--line-soft)", color: pathname === link.href ? "var(--gold)" : "var(--cream)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
