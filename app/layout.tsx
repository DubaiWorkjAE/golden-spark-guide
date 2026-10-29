import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Which detector is right for you? | Golden Spark Detectors Dubai",
  description:
    "A simple guide to metal detectors, gold detectors, 3D ground scanners, GPR, security and testing equipment. Find the right technology, then ask us on WhatsApp.",
  openGraph: {
    title: "Which detector is right for you?",
    description: "Find the right detector technology, then ask Golden Spark Detectors on WhatsApp.",
    images: ["/brand/logo.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#262948",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
