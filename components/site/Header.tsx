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

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // If on the interactive demo page, suppress the site header to give the demo 100% viewport
  if (pathname === "/demo") return null;

  return (
    <>
    <header
      className="fixed inset-x-0 top-0 z-40 transition-colors duration-500"
      style={{
        background: scrolled || open ? "rgba(10, 9, 7, 0.9)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`,
        backdropFilter: scrolled && !open ? "blur(10px)" : undefined,
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
    </header>

    {/* Rendered outside <header>: its backdrop-filter would otherwise become the
        containing block for this fixed overlay and collapse it to the header's height. */}
    {open && (
      <div
        id="mobile-menu"
        className="mobile-menu fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col overflow-y-auto md:hidden"
        style={{ background: "var(--bg-base)", borderTop: "1px solid var(--hairline)" }}
      >
        {/* soft gold glow, top right */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, var(--gold-glow-soft), transparent 70%)", opacity: 0.35 }}
        />

        <nav className="wrap relative flex flex-col pt-4" aria-label="Main">
          {[...LINKS, { label: "Contact", href: "/contact" }].map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className="menu-item group flex items-center gap-5 border-b py-5"
                style={{ borderColor: "var(--hairline)", ["--d" as string]: `${80 + i * 60}ms` }}
              >
                <span
                  className="w-6 text-[12px] font-medium tabular-nums"
                  style={{ color: active ? "var(--gold-accent)" : "var(--text-secondary)" }}
                >
                  0{i + 1}
                </span>
                <span
                  className="serif flex-1 text-[32px] leading-none transition-colors duration-300 group-active:text-[var(--gold-accent)]"
                  style={{ color: active ? "var(--gold-accent)" : "var(--text-primary)" }}
                >
                  {l.label}
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden
                  className="transition-transform duration-300 group-active:translate-x-1"
                  style={{ color: active ? "var(--gold-accent)" : "var(--text-secondary)" }}
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            );
          })}
        </nav>

        <div
          className="wrap menu-item relative mt-auto flex flex-col gap-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-10"
          style={{ ["--d" as string]: "360ms" }}
        >
          <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-gold w-full">
            Make an enquiry
          </Link>
          <div className="flex flex-col gap-2 text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            <p className="serif text-[18px]" style={{ color: "var(--text-primary)" }}>
              Shariah-compliant global equity.
            </p>
            <p>Not authorised by the FCA. Not yet accepting external capital.</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
