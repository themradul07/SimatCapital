import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import NavKelder from "@/components/kelder/NavKelder";
import FooterKelder from "@/components/kelder/FooterKelder";
import SmoothScroll from "@/components/kelder/SmoothScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Simat Capital | Investing with Purpose. Delivering with Precision.",
    template: "%s | Simat Capital",
  },
  description:
    "Simat Capital is an actively managed, Shariah-compliant global equity firm. Value-focused research, a systematic process and Shariah screening, with every investment decision made by a person.",
  icons: { icon: "/simat-mark.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <SmoothScroll>
          <NavKelder />
          <main className="flex-1">{children}</main>
          <FooterKelder />
        </SmoothScroll>
      </body>
    </html>
  );
}
