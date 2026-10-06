import type { Metadata } from "next";
import { Fraunces, Huninn } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

// 粉圓體：圓潤可愛的繁中字體（中文字檔較大，不預載）
const huninn = Huninn({
  variable: "--font-huninn",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "糖糖甜點屋 Sweetie Bakery",
  description: "把今天過得甜一點 — 台北街角的手作甜點店",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${fraunces.variable} ${huninn.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-paper font-sans text-ink">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
