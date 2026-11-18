"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/individuals", label: "For Individuals" },
  { href: "/institutions", label: "For Family Offices and Institutions" },
  { href: "/demo", label: "Demo" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the page it was opened on, so it closes itself after navigating.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggle = () => setOpenOn(open ? null : pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-700"
      style={{
        background: scrolled || open ? "rgba(10,19,29,0.82)" : "transparent",
        backdropFilter: scrolled || open ? "blur(14px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "transparent"}`,
      }}
    >
      <nav className="wrap flex h-[76px] items-center justify-between gap-6">
        <Logo />

        <div className="hidden lg:flex items-center gap-9 text-[14.5px]">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative py-2 transition-colors duration-300"
                style={{ color: active ? "var(--gold)" : "var(--text)" }}
              >
                {l.label}
                <span
                  className="absolute left-0 -bottom-0.5 h-px transition-all duration-500"
                  style={{ width: active ? "100%" : "0%", background: "var(--gold)" }}
                />
              </Link>
            );
          })}
          <Link href="/sign-up" className="btn btn-gold" style={{ height: 42, padding: "0 22px" }}>
            Sign up
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-3">
          <Link href="/sign-up" className="btn btn-gold" style={{ height: 38, padding: "0 16px", fontSize: 14 }}>
            Sign up
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={toggle}
            className="relative h-10 w-10 rounded-full border"
            style={{ borderColor: "var(--line)" }}
          >
            <span
              className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 transition-transform duration-500"
              style={{ background: "var(--cream)", transform: `translate(-50%, ${open ? "0" : "-4px"}) rotate(${open ? 45 : 0}deg)` }}
            />
            <span
              className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 transition-transform duration-500"
              style={{ background: "var(--cream)", transform: `translate(-50%, ${open ? "0" : "4px"}) rotate(${open ? -45 : 0}deg)` }}
            />
          </button>
        </div>
      </nav>

      <div
        className="lg:hidden overflow-hidden transition-[max-height] duration-700"
        style={{ maxHeight: open ? 360 : 0 }}
      >
        <div className="wrap flex flex-col pb-6">
          {[{ href: "/", label: "Home" }, ...links].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="serif border-b py-4 text-[24px]"
              style={{ borderColor: "var(--line)", color: pathname === l.href ? "var(--gold)" : "var(--cream)" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
