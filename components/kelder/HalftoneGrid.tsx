"use client";

import { useEffect, useRef } from "react";

/**
 * Halftone Dot Grid with Cursor Hover Interaction:
 * Dots within ~120px of the cursor scale up and shift to gold #D8B765,
 * with a soft falloff, easing back over ~600ms.
 * Masked out softly in the center around text and denser toward the bottom.
 */
export default function HalftoneGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    let mouseX = -9999;
    let mouseY = -9999;

    const spacing = 28; // dot spacing
    const rows = Math.ceil(height / spacing) + 1;
    const cols = Math.ceil(width / spacing) + 1;

    // Dot grid state for smooth easing
    const dots: {
      x: number;
      y: number;
      baseRadius: number;
      currentRadius: number;
      colorIntensity: number; // 0 (white-gold) to 1 (full gold)
    }[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing;
        const y = r * spacing;

        // Denser / larger toward bottom
        const verticalFactor = y / height;
        const baseRadius = 1.0 + verticalFactor * 1.6;

        dots.push({
          x,
          y,
          baseRadius,
          currentRadius: baseRadius,
          colorIntensity: 0,
        });
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", onResize);

    let rafId = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const radiusInfluence = 125;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = mouseX - d.x;
        const dy = mouseY - d.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetRadius = d.baseRadius;
        let targetIntensity = 0;

        if (dist < radiusInfluence) {
          const factor = 1 - dist / radiusInfluence;
          targetRadius = d.baseRadius + factor * 2.2; // gentle scale up
          targetIntensity = factor; // shift to gold #D8B765
        }

        // Smooth ease back (~600ms feel)
        d.currentRadius += (targetRadius - d.currentRadius) * 0.07;
        d.colorIntensity += (targetIntensity - d.colorIntensity) * 0.07;

        // Mask out around center area where hero text lives
        const centerDistX = Math.abs(d.x - width / 2);
        const centerDistY = Math.abs(d.y - 380);
        let centerMask = 1.0;
        if (centerDistX < 460 && centerDistY < 300) {
          centerMask = Math.max(0.12, Math.max(centerDistX / 460, centerDistY / 300) ** 2);
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(0.5, d.currentRadius * centerMask), 0, Math.PI * 2);

        // Interpolate between white-gold tint (15–40% opacity) and solid champagne gold #D8B765
        if (d.colorIntensity > 0.05) {
          ctx.fillStyle = `rgba(214, 180, 106, ${0.35 + d.colorIntensity * 0.65})`;
        } else {
          const baseAlpha = (0.08 + (d.y / height) * 0.2) * centerMask;
          ctx.fillStyle = `rgba(243, 236, 220, ${baseAlpha})`;
        }
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
