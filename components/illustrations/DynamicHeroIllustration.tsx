"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroMark from "./HeroMark";
import IllustrationItem from "./IllustrationItem";
import { ILLUSTRATIONS } from "./illustrationData";

/**
 * DynamicHeroIllustration
 *
 * Renders the landing page hero visual:
 * - Default: The original canonical Concentric Diamonds with orbiting comet light & cardinal steps (HeroMark).
 * - Dynamic: If an illustration is selected from /illustrations (or via ?hero= query, localStorage, or cookie),
 *   it smoothly renders that chosen animated illustration with full fiduciary branding, caption, and reset controls.
 */
export default function DynamicHeroIllustration() {
  const [heroId, setHeroId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const getParamHero = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const p = params.get("hero");
        if (p && p !== "default" && p !== "diamond-seal" && p !== "canonical-diamond") {
          return p;
        }
      } catch {}
      return null;
    };

    const getCookieHero = () => {
      try {
        const match = document.cookie.match(/(?:^|;\s*)simat_hero_illustration=([^;]+)/);
        if (match && match[1]) {
          const val = decodeURIComponent(match[1]);
          if (val && val !== "default" && val !== "diamond-seal" && val !== "canonical-diamond") {
            return val;
          }
        }
      } catch {}
      return null;
    };

    const syncHero = () => {
      try {
        // Priority: 1. URL parameter ?hero=, 2. localStorage, 3. Cookie
        const urlHero = getParamHero();
        if (urlHero && ILLUSTRATIONS.some((i) => i.id === urlHero)) {
          localStorage.setItem("simat_hero_illustration", urlHero);
          document.cookie = `simat_hero_illustration=${urlHero}; path=/; max-age=31536000; SameSite=Lax`;
          setHeroId(urlHero);
          return;
        }

        const saved = localStorage.getItem("simat_hero_illustration") || getCookieHero();
        if (
          saved &&
          saved !== "canonical-diamond" &&
          saved !== "default" &&
          saved !== "diamond-seal" &&
          ILLUSTRATIONS.some((i) => i.id === saved)
        ) {
          setHeroId(saved);
        } else {
          setHeroId(null);
        }
      } catch {
        setHeroId(null);
      }
    };

    syncHero();
    window.addEventListener("storage", syncHero);
    window.addEventListener("simat-hero-change", syncHero);

    return () => {
      window.removeEventListener("storage", syncHero);
      window.removeEventListener("simat-hero-change", syncHero);
    };
  }, []);

  const handleReset = () => {
    try {
      localStorage.removeItem("simat_hero_illustration");
      document.cookie = "simat_hero_illustration=; path=/; max-age=0; SameSite=Lax";
      // Clean query parameter from URL without page reload if present
      const url = new URL(window.location.href);
      if (url.searchParams.has("hero")) {
        url.searchParams.delete("hero");
        window.history.replaceState({}, "", url.pathname + (url.search || ""));
      }
    } catch {}
    window.dispatchEvent(new CustomEvent("simat-hero-change", { detail: null }));
    setHeroId(null);
  };

  // SSR and default state: always render the authentic HeroMark original diamond animation
  if (!mounted || !heroId) {
    return <HeroMark />;
  }

  const activeDef = ILLUSTRATIONS.find((i) => i.id === heroId);
  if (!activeDef) {
    return <HeroMark />;
  }

  return (
    <figure
      className="relative mx-auto aspect-square w-full max-w-[500px] select-none on"
      aria-label={`Simat Capital - ${activeDef.name}`}
    >
      <div className="relative aspect-square w-full flex items-center justify-center p-2">
        <IllustrationItem id={heroId} isMotion={true} showCenterMark={true} />
      </div>

      {/* Dynamic Hero Caption with Metadata & Quick Reset */}
      <figcaption className="hm-caption mx-auto mt-4 text-center max-w-[44ch] block">
        <div className="hm-caption-in block">
          <div className="flex items-center justify-center gap-2">
            <span className="rounded-full border border-[var(--line-soft)] bg-[rgba(214,180,106,0.08)] px-2.5 py-0.5 text-[10px] font-mono text-[var(--gold-accent)] uppercase tracking-wider">
              {activeDef.badge}
            </span>
            <span className="text-[11px] font-mono text-[var(--text-secondary)]">
              {activeDef.animationType}
            </span>
          </div>

          <p className="mt-2 text-[15px] font-medium serif text-[var(--text-primary)]">
            {activeDef.name}
          </p>
          <p className="mt-1 text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
            {activeDef.description}
          </p>

          <div className="mt-3.5 flex items-center justify-center gap-3 text-[11px] font-mono">
            <button
              type="button"
              onClick={handleReset}
              className="text-[var(--gold-accent)] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              ↺ Reset to Default Hero
            </button>
            <span className="text-[var(--line-soft)]">·</span>
            <Link
              href="/illustrations"
              className="text-[var(--text-secondary)] hover:text-[var(--gold-accent)] transition-colors"
            >
              Change Illustration ({ILLUSTRATIONS.length} Available) →
            </Link>
          </div>
        </div>
      </figcaption>
    </figure>
  );
}
