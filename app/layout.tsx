import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Spotlight from "@/components/Spotlight";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <Spotlight />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
