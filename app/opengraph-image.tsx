import { ImageResponse } from "next/og";

/** Brief, Section 13: Open Graph image 1200×630, mark and wordmark on the dark background. */
export const alt = "Simat Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0907",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        <svg width="170" height="170" viewBox="-22 -22 144 144">
          <g transform="rotate(45 50 50)" fill="none" stroke="#d6b46a" strokeWidth="9" strokeLinecap="square">
            <path d="M80 40 H100 V100 H0 V0 H62 V64 H24 V24 H43 V44" />
          </g>
        </svg>
        <div style={{ display: "flex", color: "#f3ecdc", fontSize: 64, letterSpacing: 18, fontFamily: "serif" }}>SIMAT CAPITAL</div>
      </div>
    ),
    size,
  );
}
