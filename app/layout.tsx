import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import Firefly from "@/components/Firefly";
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
  description: "Cyber-Gothic Portfolio of Tuğçe Özoğlu",
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
        <Firefly />
        {children}
      </body>
    </html>
  );
}
