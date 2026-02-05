import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import DragonCursor from "@/components/DragonCursor";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import FloatingMenu from "@/components/FloatingMenu";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import ScrollIndicator from "@/components/ScrollIndicator";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tuğçe Özoğlu | Portfolio",
  description: "Portfolio of Tuğçe Özoğlu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased bg-black text-white`}
      >
        <SmoothScroll>
          <Preloader />
          <NoiseOverlay />
          <ScrollIndicator />
          <DragonCursor />
          <FloatingMenu />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
