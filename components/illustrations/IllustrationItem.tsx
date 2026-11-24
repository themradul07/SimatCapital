"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import ProcessIllustration, { PROCESS_MARK } from "./ProcessIllustrations";
import EnhancedIllustration, { ENHANCED_IDS } from "./EnhancedIllustrations";

const C = 250;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedServer = () => false;

interface IllustrationItemProps {
  id: string;
  isMotion?: boolean;
  activeDetail?: number;
  onSelectDetail?: (idx: number) => void;
  className?: string;
  showCenterMark?: boolean;
}

export default function IllustrationItem({
  id,
  isMotion = true,
  activeDetail = 0,
  onSelectDetail,
  className = "",
  showCenterMark = true,
}: IllustrationItemProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const isProcess = id in PROCESS_MARK;
  const processMark = isProcess ? PROCESS_MARK[id] : undefined;
  const isEnhanced = ENHANCED_IDS.has(id);

  // Live simulations only run while visible, with motion on and no reduced-motion preference.
  const svgRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);
  useEffect(() => {
    const el = svgRef.current;
    if (!isEnhanced || !el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, [isEnhanced]);
  const live = isEnhanced && isMotion && inView && !reduced;

  // Pointer-driven 3D tilt: CSS vars feed the SVG rotation and every <Depth> parallax layer.
  const onPointerMove = (e: PointerEvent<SVGSVGElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    e.currentTarget.style.setProperty("--px", px.toFixed(3));
    e.currentTarget.style.setProperty("--py", py.toFixed(3));
  };
  const onPointerLeave = (e: PointerEvent<SVGSVGElement>) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  };
  const tilt = isEnhanced ? ` ill-3d${id === "three-markets-enhanced" ? " ill-3d-strong" : ""}` : "";

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 500"
      className={`w-full h-auto overflow-visible select-none${tilt} ${className}`}
      aria-hidden="true"
      onPointerMove={isEnhanced ? onPointerMove : undefined}
      onPointerLeave={isEnhanced ? onPointerLeave : undefined}
    >
      <defs>
        {/* Soft radial golden warmth */}
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity={isMotion ? "0.34" : "0.20"} />
          <stop offset="55%" stopColor="var(--gold-accent)" stopOpacity="0.07" />
          <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0" />
        </radialGradient>

        {/* Scanline gradient for Topography */}
        <linearGradient id={`${uid}-scan-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--gold-accent)" stopOpacity="0.65" />
          <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0" />
        </linearGradient>

        {/* Facet gradients for 3D isometric look */}
        <linearGradient id={`${uid}-facet-left`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.09" />
          <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`${uid}-facet-right`} x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id={`${uid}-facet-bottom`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--gold-accent)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--gold-accent)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* ========================================================================= */}
      {/* 1. SCALES OF EQUITY (Al-Mizan) - Animated Oscillating Balance             */}
      {/* ========================================================================= */}
      {id === "scales-mizan" && (
        <g>
          <circle cx={C} cy={C} r="218" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.12" strokeWidth="1" />
          <circle cx={C} cy={C} r="204" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 7" />
          <circle cx={C} cy="190" r="105" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Plinth */}
          <rect x="170" y="432" width="160" height="12" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.2" />
          <rect x="190" y="422" width="120" height="10" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1" />
          <text x={C} y="441" textAnchor="middle" fill="var(--gold-accent)" fontSize="8" letterSpacing="0.24em" opacity="0.75" className="font-mono">
            51.5074° N · 0.1278° W
          </text>

          {/* Pillar */}
          <line x1="246" y1="414" x2="246" y2="230" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.2" />
          <line x1="254" y1="414" x2="254" y2="230" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.2" />

          {/* Balance Beam (Oscillates when isMotion=true) */}
          <g className={isMotion ? "ill-oscillate" : ""}>
            <path d="M 85 168 Q 250 162 415 168" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.8" strokeWidth="1.5" />
            <path d="M 90 171 Q 250 178 410 171" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" />
            <line x1={C} y1="172" x2={C} y2="132" stroke="var(--gold-accent)" strokeOpacity="0.9" strokeWidth="1.5" />
            <polygon points="250,128 248,134 252,134" fill="var(--gold-accent)" />
          </g>

          {/* Left Pan: Shariah (Floats counter to right pan) */}
          <g className={`cursor-pointer ${isMotion ? "ill-dish-l" : ""}`} onClick={() => onSelectDetail?.(0)}>
            <line x1="85" y1="173" x2="48" y2="280" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeWidth="1" />
            <line x1="85" y1="173" x2="85" y2="286" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1" />
            <line x1="85" y1="173" x2="122" y2="280" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeWidth="1" />
            <path d="M 42 280 Q 85 304 128 280 Z" fill="var(--bg-raised)" stroke="var(--gold-accent)" strokeWidth="1.2" />
            <rect x="81" y="266" width="8" height="8" transform="rotate(45 85 270)" fill="var(--gold-accent)" />
            <text x="85" y="322" textAnchor="middle" fill="var(--gold-accent)" fontSize="9" letterSpacing="0.14em" className="serif font-semibold">
              Shariah Purity
            </text>
          </g>

          {/* Right Pan: Alpha */}
          <g className={`cursor-pointer ${isMotion ? "ill-dish-r" : ""}`} onClick={() => onSelectDetail?.(2)}>
            <line x1="415" y1="173" x2="378" y2="280" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeWidth="1" />
            <line x1="415" y1="173" x2="415" y2="286" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1" />
            <line x1="415" y1="173" x2="452" y2="280" stroke="var(--gold-accent)" strokeOpacity="0.45" strokeWidth="1" />
            <path d="M 372 280 Q 415 304 458 280 Z" fill="var(--bg-raised)" stroke="var(--gold-accent)" strokeWidth="1.2" />
            <rect x="411" y="266" width="8" height="8" transform="rotate(45 415 270)" fill="var(--gold-accent)" />
            <text x="415" y="322" textAnchor="middle" fill="var(--gold-accent)" fontSize="9" letterSpacing="0.14em" className="serif font-semibold">
              Intrinsic Alpha
            </text>
          </g>

          {/* Central Housing */}
          <circle cx={C} cy="175" r="42" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeOpacity="0.7" strokeWidth="1.4" />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 2. NAUTICAL SEXTANT - Animated Horizon Arc Sweep                          */}
      {/* ========================================================================= */}
      {id === "marine-sextant" && (
        <g>
          <circle cx={C} cy={C} r="218" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx={C} cy={C} r="204" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="1 6" />
          <circle cx={C} cy="180" r="105" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Arc Limb */}
          <path d="M 80 390 A 240 240 0 0 0 420 390" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.85" strokeWidth="2.2" />
          <path d="M 86 400 A 250 250 0 0 0 414 400" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" />

          {/* Degree graduations */}
          {[...Array(21)].map((_, i) => {
            const a = (55 + i * 3.5 * Math.PI) / 180;
            return (
              <line
                key={`stk-${i}`}
                x1={C + Math.cos(a) * 238}
                y1={160 + Math.sin(a) * 238}
                x2={C + Math.cos(a) * 250}
                y2={160 + Math.sin(a) * 250}
                stroke="var(--gold-accent)"
                strokeOpacity={i % 5 === 0 ? "0.9" : "0.35"}
                strokeWidth={i % 5 === 0 ? "1.4" : "1"}
              />
            );
          })}

          {/* Frame Struts */}
          <line x1={C} y1="140" x2="105" y2="390" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.4" />
          <line x1={C} y1="140" x2="395" y2="390" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.4" />

          {/* Sweeping Index Arm (Sweeps across arc when isMotion=true) */}
          <g className={isMotion ? "ill-sweep-arm" : ""}>
            <line x1={C} y1="140" x2={C} y2="404" stroke="var(--gold-accent)" strokeOpacity="0.9" strokeWidth="2" />
            <rect x="242" y="394" width="16" height="12" fill="var(--gold-accent)" />
            <circle cx={C} cy="400" r="2.5" fill="var(--bg-base)" />
          </g>

          <circle cx={C} cy="140" r="42" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.4" />
          <text x={C} y="445" textAnchor="middle" fill="var(--gold-accent)" fontSize="8.5" letterSpacing="0.22em" opacity="0.75" className="font-mono">
            VERNIER ARC · ACCURACY ±0.1&prime; · 51.5074° N
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 3. PRECISION HORIZON VERNIER - Animated Gliding Slider Jaw               */}
      {/* ========================================================================= */}
      {id === "vernier-caliper" && (
        <g>
          <circle cx={C} cy={C} r="218" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Horizontal Caliper Bar */}
          <rect x="40" y="240" width="420" height="24" fill="var(--bg-raised)" stroke="var(--gold-accent)" strokeOpacity="0.75" strokeWidth="1.4" />
          <line x1="40" y1="252" x2="460" y2="252" stroke="var(--gold-accent)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 6" />

          {/* Scale Ticks */}
          {[...Array(41)].map((_, i) => (
            <line
              key={`cal-tick-${i}`}
              x1={50 + i * 10}
              y1="240"
              x2={50 + i * 10}
              y2={i % 5 === 0 ? "254" : "247"}
              stroke="var(--gold-accent)"
              strokeOpacity={i % 5 === 0 ? "0.85" : "0.3"}
              strokeWidth="1"
            />
          ))}

          {/* Stationary Fixed Jaw (Left) */}
          <path d="M 80 240 L 80 340 L 96 340 L 96 264" fill="none" stroke="var(--gold-accent)" strokeWidth="1.4" />

          {/* Gliding Slider Jaw (Right - slides smoothly when isMotion=true) */}
          <g className={isMotion ? "ill-caliper-slide" : ""}>
            <path d="M 370 236 L 370 340 L 354 340 L 354 260" fill="none" stroke="var(--gold-accent)" strokeWidth="1.6" />
            <circle cx="362" cy="248" r="4" fill="var(--gold-accent)" />
          </g>

          <circle cx={C} cy="170" r="46" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.4" />
          <text x={C} y="390" textAnchor="middle" fill="var(--gold-accent)" fontSize="8.5" letterSpacing="0.22em" opacity="0.75" className="font-mono">
            MICROMETRIC TOLERANCE · ZERO SLIPPAGE
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 4. PLANISPHERIC ASTROLABE - Rotating Rete & Pointer Plate                 */}
      {/* ========================================================================= */}
      {id === "astrolabe-dial" && (
        <g>
          {/* Suspension Throne */}
          <path d="M 230 46 Q 250 20 270 46" fill="none" stroke="var(--gold-accent)" strokeWidth="1.5" />
          <circle cx={C} cy="32" r="10" fill="none" stroke="var(--gold-accent)" strokeWidth="1.4" />

          <circle cx={C} cy={C} r="216" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.8" strokeWidth="1.8" />
          <circle cx={C} cy={C} r="202" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="1 6" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Almucantar Elevation Arcs */}
          {[160, 180, 200, 220].map((cy, i) => (
            <ellipse
              key={`alm-${i}`}
              cx={C}
              cy={cy}
              rx={160 - i * 15}
              ry={110 - i * 12}
              fill="none"
              stroke="var(--gold-accent)"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
          ))}

          {/* Rotating Rete Star Pointers (Rotates in 75s cycle when isMotion=true) */}
          <g className={isMotion ? "ill-spin-slow" : ""}>
            {[
              [170, 190],
              [320, 180],
              [210, 310],
              [300, 320],
            ].map(([rx, ry], i) => (
              <g key={`rete-${i}`}>
                <line x1={rx} y1={ry} x2={rx + 12} y2={ry - 12} stroke="var(--gold-accent)" strokeWidth="1.2" />
                <polygon points={`${rx + 12},${ry - 12} ${rx + 16},${ry - 8} ${rx + 8},${ry - 16}`} fill="var(--gold-accent)" />
              </g>
            ))}
          </g>

          <circle cx={C} cy={C} r="46" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.4" />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 5. ISOMETRIC HEXAGONAL PRISM - Facet Sequence Pulse                       */}
      {/* ========================================================================= */}
      {id === "hex-prism" && (
        <g>
          <circle cx={C} cy={C} r="216" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.12" strokeWidth="1" />
          <circle cx={C} cy={C} r="202" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 8" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Regular Hexagon */}
          <polygon
            points="250,75 401.5,162.5 401.5,337.5 250,425 98.5,337.5 98.5,162.5"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.75"
            strokeWidth="1.4"
          />
          <polygon
            points="250,132 352.2,191 352.2,309 250,368 147.8,309 147.8,191"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.4"
            strokeWidth="1.2"
          />

          {/* 3 Facets with pulse */}
          <polygon
            points="250,250 250,75 98.5,162.5 98.5,337.5"
            fill={`url(#${uid}-facet-left)`}
            stroke="var(--gold-accent)"
            strokeOpacity={activeDetail === 0 ? "0.9" : "0.35"}
            strokeWidth={activeDetail === 0 ? "1.6" : "1"}
            className="cursor-pointer"
            onClick={() => onSelectDetail?.(0)}
          />
          <polygon
            points="250,250 250,75 401.5,162.5 401.5,337.5"
            fill={`url(#${uid}-facet-right)`}
            stroke="var(--gold-accent)"
            strokeOpacity={activeDetail === 1 ? "0.9" : "0.35"}
            strokeWidth={activeDetail === 1 ? "1.6" : "1"}
            className="cursor-pointer"
            onClick={() => onSelectDetail?.(1)}
          />
          <polygon
            points="250,250 401.5,337.5 250,425 98.5,337.5"
            fill={`url(#${uid}-facet-bottom)`}
            stroke="var(--gold-accent)"
            strokeOpacity={activeDetail === 2 ? "0.9" : "0.35"}
            strokeWidth={activeDetail === 2 ? "1.6" : "1"}
            className="cursor-pointer"
            onClick={() => onSelectDetail?.(2)}
          />

          <line x1={C} y1={C} x2={250} y2={75} stroke="var(--gold-accent)" strokeOpacity="0.7" strokeWidth="1.5" />
          <line x1={C} y1={C} x2={401.5} y2={337.5} stroke="var(--gold-accent)" strokeOpacity="0.7" strokeWidth="1.5" />
          <line x1={C} y1={C} x2={98.5} y2={337.5} stroke="var(--gold-accent)" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 6. CELESTIAL GYROSCOPE - Multi-Axis Elliptical Drift                      */}
      {/* ========================================================================= */}
      {id === "armillary" && (
        <g>
          <circle cx={C} cy={C} r="216" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.2" strokeWidth="1.2" />
          <circle cx={C} cy={C} r="110" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.2" strokeWidth="1" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          <line x1={C} y1="34" x2={C} y2="466" stroke="var(--gold-accent)" strokeOpacity="0.25" strokeWidth="1.2" />

          {/* Rotating Planetary Ring Cage */}
          <g className={isMotion ? "ill-spin-slow" : ""}>
            <ellipse cx={C} cy={C} rx="194" ry="64" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" />
            <ellipse cx={C} cy={C} rx="194" ry="64" transform="rotate(60 250 250)" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" />
            <ellipse cx={C} cy={C} rx="194" ry="64" transform="rotate(120 250 250)" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" />
          </g>

          <text x={C} y="26" textAnchor="middle" fill="var(--gold-accent)" fontSize="8.5" letterSpacing="0.2em" opacity="0.75" className="font-mono">
            N 90° · LAT
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 7. ISLAMIC SACRED OCTAGRAM - Counter-Rotating Wheels                      */}
      {/* ========================================================================= */}
      {id === "octagram" && (
        <g>
          {/* Counter-rotating outer rim */}
          <g className={isMotion ? "ill-spin-rev-slow" : ""}>
            <circle cx={C} cy={C} r="226" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.1" strokeWidth="1" />
            <circle cx={C} cy={C} r="212" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 9" />
          </g>

          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Rotating Octagram */}
          <g className={isMotion ? "ill-spin-slow" : ""}>
            <path d="M 250 108 L 392 250 L 250 392 L 108 250 Z" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.3" />
            <rect x="150" y="150" width="200" height="200" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.3" />
          </g>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 8. CURVILINEAR TRIQUETRA SHIELD                                           */}
      {/* ========================================================================= */}
      {id === "triquetra" && (
        <g transform="translate(0, -10)">
          <circle cx={C} cy="265" r="215" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.15" strokeWidth="1" />
          <circle cx={C} cy="265" r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          <circle
            cx={C}
            cy="170"
            r="142"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            className="cursor-pointer"
            onClick={() => onSelectDetail?.(0)}
          />
          <circle
            cx="332.3"
            cy="312.5"
            r="142"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            className="cursor-pointer"
            onClick={() => onSelectDetail?.(1)}
          />
          <circle
            cx="167.7"
            cy="312.5"
            r="142"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.55"
            strokeWidth="1.3"
            className="cursor-pointer"
            onClick={() => onSelectDetail?.(2)}
          />
          <circle cx={C} cy="265" r="58" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1" />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 9. LOGARITHMIC COMPOUNDING SPIRAL - Continuous Path Trace                 */}
      {/* ========================================================================= */}
      {id === "golden-spiral" && (
        <g>
          <circle cx={C} cy={C} r="216" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.15" strokeWidth="1" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Fibonacci Grid */}
          <rect x="70" y="90" width="360" height="222" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.2" strokeWidth="1" />
          <rect x="208" y="90" width="222" height="222" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.15" strokeWidth="1" />

          {/* Continuous flowing golden trace */}
          <path
            d="M 250 250 
               A 14 14 0 0 1 236 236 
               A 22 22 0 0 1 258 214 
               A 36 36 0 0 1 294 250 
               A 58 58 0 0 1 236 308 
               A 94 94 0 0 1 142 214 
               A 152 152 0 0 1 294 62
               A 246 246 0 0 1 450 250"
            fill="none"
            stroke="var(--gold-accent)"
            strokeOpacity="0.85"
            strokeWidth="1.8"
            className={isMotion ? "ill-trace-flow" : ""}
          />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 10. CONCENTRIC DIAMOND SEAL (Canonical I1)                                */}
      {/* ========================================================================= */}
      {id === "diamond-seal" && (
        <g>
          <circle cx={C} cy={C} r="216" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.12" strokeWidth="1" />
          <circle cx={C} cy={C} r="120" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          <path d="M 250 85 L 415 250 L 250 415 L 85 250 Z" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.75" strokeWidth="1.3" />
          <path d="M 250 132 L 368 250 L 250 368 L 132 250 Z" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.35" strokeWidth="1" />
          <path d="M 250 176 L 324 250 L 250 324 L 176 250 Z" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.55" strokeWidth="1.2" />

          <text x={C} y="476" textAnchor="middle" fill="var(--gold-accent)" fontSize="8.5" letterSpacing="0.28em" opacity="0.6" className="font-mono">
            51.5074° N · 0.1278° W
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 11. CELESTIAL STAR CHART & POLARIS - Twinkling Stars                      */}
      {/* ========================================================================= */}
      {id === "star-chart" && (
        <g>
          <circle cx={C} cy={C} r="222" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.25" strokeWidth="1.2" />
          <circle cx={C} cy={C} r="198" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="1 6" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          <line x1={C} y1="28" x2={C} y2="472" stroke="var(--gold-accent)" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="28" y1={C} x2="472" y2={C} stroke="var(--gold-accent)" strokeOpacity="0.2" strokeWidth="1" />

          {/* Ursa Major with Twinkle */}
          <g className={isMotion ? "ill-twinkle-a" : ""}>
            <path d="M 105 130 L 140 120 L 175 140 L 205 180 L 170 215 L 125 200 L 105 130" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 4" />
            <circle cx="205" cy="180" r="3.2" fill="#FFF8E7" />
          </g>

          {/* Cassiopeia with Twinkle */}
          <g className={isMotion ? "ill-twinkle-b" : ""}>
            <path d="M 330 100 L 360 130 L 385 105 L 420 135 L 440 115" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 4" />
            <circle cx="385" cy="105" r="3.2" fill="#FFF8E7" />
          </g>

          <circle cx={C} cy={C} r="46" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeOpacity="0.8" strokeWidth="1.4" />
          <text x={C} y="480" textAnchor="middle" fill="var(--gold-accent)" fontSize="8" letterSpacing="0.22em" opacity="0.6" className="font-mono">
            &ldquo;AND BY THE STARS THEY GUIDE THEMSELVES&rdquo;
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 12. TOPOGRAPHIC CONTOUR TERRAIN - Elevation Laser Scanline                */}
      {/* ========================================================================= */}
      {id === "topography" && (
        <g>
          <rect x="40" y="40" width="420" height="420" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.2" strokeWidth="1.2" />
          <circle cx={C} cy="205" r="110" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Contours */}
          <path d="M 48 410 Q 140 430 250 400 T 452 420" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.2" strokeWidth="1" />
          <path d="M 48 360 Q 150 330 250 360 T 452 340" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.3" strokeWidth="1" />
          <path d="M 55 310 Q 160 270 250 295 T 445 280" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.4" strokeWidth="1" />
          <path d="M 70 260 Q 150 230 250 255 T 430 240" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d="M 90 220 Q 180 190 250 215 T 410 205" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.65" strokeWidth="1.2" />
          <path d="M 120 180 Q 190 155 250 175 T 380 170" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.75" strokeWidth="1.3" />
          <path d="M 160 145 Q 210 125 250 140 T 340 135" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.9" strokeWidth="1.5" />

          {/* Sweeping Golden Laser Scanline (Active when isMotion=true) */}
          {isMotion && (
            <g className="ill-scan-bar pointer-events-none">
              <rect x="48" y="240" width="404" height="14" fill={`url(#${uid}-scan-grad)`} />
              <line x1="48" y1="247" x2="452" y2="247" stroke="var(--gold-accent)" strokeWidth="1.5" strokeOpacity="0.8" />
            </g>
          )}

          <circle cx={C} cy="205" r="44" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.4" />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 13. ALPHA SIGNAL HARMONIC WAVE - Oscilloscope Flow                        */}
      {/* ========================================================================= */}
      {id === "harmonic-waves" && (
        <g>
          <circle cx={C} cy={C} r="218" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.15" strokeWidth="1" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Horizontal Center Axis */}
          <line x1="40" y1={C} x2="460" y2={C} stroke="var(--gold-accent)" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 7" />

          {/* Moving Sine Wave Ribbons */}
          <g className={isMotion ? "ill-wave-flow" : ""}>
            {/* Wave 1: Fundamental Base Wave */}
            <path
              d="M 0 250 Q 50 180 100 250 T 200 250 T 300 250 T 400 250 T 500 250 T 600 250 T 700 250"
              fill="none"
              stroke="var(--gold-accent)"
              strokeOpacity="0.8"
              strokeWidth="1.8"
            />
            {/* Wave 2: Harmonic Shifted Wave */}
            <path
              d="M 0 250 Q 40 310 80 250 T 160 250 T 240 250 T 320 250 T 400 250 T 480 250 T 560 250 T 640 250"
              fill="none"
              stroke="var(--gold-accent)"
              strokeOpacity="0.45"
              strokeWidth="1.2"
            />
            {/* Wave 3: Fine High-Frequency Ribbon */}
            <path
              d="M 0 250 Q 25 210 50 250 T 100 250 T 150 250 T 200 250 T 250 250 T 300 250 T 350 250 T 400 250 T 450 250 T 500 250 T 550 250 T 600 250"
              fill="none"
              stroke="var(--gold-accent)"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          </g>

          <circle cx={C} cy={C} r="46" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.4" />
          <text x={C} y="445" textAnchor="middle" fill="var(--gold-accent)" fontSize="8.5" letterSpacing="0.22em" opacity="0.75" className="font-mono">
            HARMONIC SIGNAL SYNTHESIS · 51.5074° N
          </text>
        </g>
      )}

      {/* ========================================================================= */}
      {/* 14. BOTANICAL TREE OF DEEP ROOTS & CANOPY                                 */}
      {/* ========================================================================= */}
      {id === "tree-of-roots" && (
        <g>
          <circle cx={C} cy={C} r="218" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.15" strokeWidth="1" />
          <circle cx={C} cy={C} r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          <line x1="70" y1="260" x2="430" y2="260" stroke="var(--gold-accent)" strokeOpacity="0.5" strokeWidth="1.2" />

          {/* Subterranean Roots */}
          <path d="M 245 260 Q 230 330 160 410" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.6" />
          <path d="M 255 260 Q 270 330 340 410" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.6" />
          <path d="M 250 260 L 250 430" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.7" strokeWidth="1.8" />

          {/* Ascending Canopy */}
          <path d="M 245 210 Q 200 150 130 95" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.6" />
          <path d="M 255 210 Q 300 150 370 95" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.6" strokeWidth="1.6" />
          <path d="M 250 210 L 250 75" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.7" strokeWidth="1.8" />

          {/* Canopy Fruit Nodes */}
          {[
            [130, 95],
            [370, 95],
            [250, 75],
            [100, 120],
            [400, 120],
          ].map(([lx, ly], i) => (
            <circle key={`leaf-${i}`} cx={lx} cy={ly} r="3.5" fill="var(--gold-accent)" className={isMotion ? "ill-twinkle-b" : ""} />
          ))}

          <circle cx={C} cy="235" r="44" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.4" />
        </g>
      )}

      {/* ========================================================================= */}
      {/* 15. LONDON FINANCIAL HERITAGE COLONNADE - Beacon Horizon Sweep            */}
      {/* ========================================================================= */}
      {id === "london-portico" && (
        <g>
          <circle cx={C} cy={C} r="218" fill="none" stroke="var(--gold-accent)" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx={C} cy="190" r="115" fill={`url(#${uid}-glow)`} className={isMotion ? "hm-glow" : ""} />

          {/* Stepped Stylobate */}
          <rect x="70" y="420" width="360" height="12" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.2" />
          <rect x="85" y="410" width="330" height="10" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1" />

          {/* 4 Classical Fluted Columns */}
          {[110, 190, 310, 390].map((colX, i) => (
            <g key={`col-${i}`}>
              <rect x={colX - 12} y="190" width="24" height="220" fill="var(--bg-raised)" stroke="var(--gold-accent)" strokeWidth="1.2" />
              <line x1={colX - 4} y1="190" x2={colX - 4} y2="410" stroke="var(--gold-accent)" strokeOpacity="0.4" strokeWidth="1" />
              <line x1={colX + 4} y1="190" x2={colX + 4} y2="410" stroke="var(--gold-accent)" strokeOpacity="0.4" strokeWidth="1" />
              <rect x={colX - 16} y="182" width="32" height="8" fill="var(--gold-accent)" />
            </g>
          ))}

          {/* Entablature & Pediment */}
          <rect x="80" y="168" width="340" height="14" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.2" />
          <polygon points="250,75 70,168 430,168" fill="var(--bg-raised)" stroke="var(--gold-accent)" strokeWidth="1.5" />

          {/* Central Arch */}
          <path d="M 205 320 L 205 230 A 45 45 0 0 1 295 230 L 295 320" fill="none" stroke="var(--gold-accent)" strokeWidth="1.4" />
          <circle cx={C} cy="230" r="42" fill="var(--bg-base)" stroke="var(--gold-accent)" strokeWidth="1.4" />
        </g>
      )}
      {/* ========================================================================= */}
      {/* ENHANCED DUPLICATES — live simulations (see EnhancedIllustrations.tsx)    */}
      {/* ========================================================================= */}
      {isEnhanced && (
        <EnhancedIllustration
          id={id}
          uid={uid}
          live={live}
          isMotion={isMotion}
          activeDetail={activeDetail}
          onSelectDetail={onSelectDetail}
        />
      )}

      {/* ========================================================================= */}
      {/* 16–30. PROCESS & PROOF SET (see ProcessIllustrations.tsx)                 */}
      {/* ========================================================================= */}
      {isProcess && !isEnhanced && (
        <ProcessIllustration
          id={id}
          uid={uid}
          isMotion={isMotion}
          activeDetail={activeDetail}
          onSelectDetail={onSelectDetail}
        />
      )}

      {/* ========================================================================= */}
      {/* SIMAT EMBLEM (Common Center Core)                                         */}
      {/* ========================================================================= */}
      {showCenterMark && processMark !== null && (
        <g transform={processMark ? `translate(${processMark[0]} ${processMark[1]})` : undefined}>
        <g
          className={isMotion ? "mark-pulse" : ""}
          style={{
            transform:
              id === "scales-mizan"
                ? "translate(0px, -75px)"
                : id === "marine-sextant"
                ? "translate(0px, -110px)"
                : id === "vernier-caliper"
                ? "translate(0px, -80px)"
                : id === "tree-of-roots"
                ? "translate(0px, -15px)"
                : id === "topography"
                ? "translate(0px, -45px)"
                : id === "london-portico"
                ? "translate(0px, -20px)"
                : id === "london-portico-enhanced"
                ? "translate(0px, -24px)"
                : undefined,
          }}
        >
          <g className={isEnhanced ? "hm-mark ill-depth" : "hm-mark"} style={isEnhanced ? { ["--d" as string]: 1.8 } : undefined}>
            <image
              href="/simat-mark.png"
              x={C - 34}
              y={C - 34}
              width={68}
              height={68}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </g>
        </g>
      )}
    </svg>
  );
}
