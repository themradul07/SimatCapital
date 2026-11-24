"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function DemoExperience() {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    // Lock scrolling on document body while demo is mounted
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen flex-col bg-[#0A0A0A] overflow-hidden select-none">
      {/* Return to website subtle floating bar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-[#2E2814] bg-[#070707] px-4">
        <Link
          href="/"
          className="group flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414]/90 hover:bg-[#1C1A16] border border-[#4A3F22]/70 hover:border-[#C9A84C] text-[#CFC6B5] hover:text-[#F7F3E8] text-[12px] font-medium backdrop-blur-md transition-all shadow-lg"
          title="Return to Simat Capital main website"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Return to Site</span>
        </Link>

        <button
          onClick={toggleFullscreen}
          type="button"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414]/85 hover:bg-[#1C1A16] border border-[#4A3F22]/50 hover:border-[#C9A84C]/80 text-[#8F8676] hover:text-[#E8C97A] text-[11.5px] font-medium backdrop-blur-md transition-all shadow"
          title={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          aria-label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {fullscreen ? (
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            ) : (
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            )}
          </svg>
          <span>{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
        </button>

        <span className="ml-auto hidden md:block text-[11px] tracking-[0.14em] uppercase text-[#6B5A2A]">Confidential demo</span>

        <a
          href="/interactive-demo/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141414]/85 hover:bg-[#1C1A16] border border-[#4A3F22]/50 hover:border-[#C9A84C]/80 text-[#8F8676] hover:text-[#E8C97A] text-[11.5px] font-medium backdrop-blur-md transition-all shadow"
          title="Open standalone demo in new tab"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          <span>Open Standalone</span>
        </a>
      </div>

      {/* Main Interactive Demo Frame */}
      <iframe
        src="/interactive-demo/index.html"
        className="block w-full min-h-0 flex-1 border-0 bg-[#0A0A0A]"
        title="Simat Capital — Confidential Investor Overview"
        allow="fullscreen; autoplay"
      />
    </div>
  );
}
