import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

/** Brief, Section 13: Open Graph image 1200×630, mark and wordmark on the dark background. */
export const alt = "Simat Capital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const THEME = {
  bg: "#0a0907",
  gold: "#d6b46a",
  primary: "#f3ecdc",
} as const;

export default async function Image() {
  const markBuffer = fs.readFileSync(path.join(process.cwd(), "public", "simat-mark.png"));
  const markBase64 = `data:image/png;base64,${markBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: THEME.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markBase64} width={180} height={180} alt="Simat Capital" />
        <div style={{ display: "flex", color: THEME.primary, fontSize: 64, letterSpacing: 18, fontFamily: "serif" }}>
          SIMAT CAPITAL
        </div>
      </div>
    ),
    size,
  );
}
