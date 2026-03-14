import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import {
  JetBrains_Mono,
  Playfair_Display,
  Sora,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const brandSans = Space_Grotesk({
  variable: "--font-brand-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const brandDisplay = Sora({
  variable: "--font-brand-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

const brandMono = JetBrains_Mono({
  variable: "--font-brand-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const brandSerif = Playfair_Display({
  variable: "--font-brand-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bhupesh.dev"),
  title: {
    default: "Bhupesh | Full-Stack Developer",
    template: "%s | Bhupesh",
  },
  description:
    "Portfolio of Bhupesh featuring frontend engineering, open-source projects, and technical writing.",
  keywords: [
    "Bhupesh",
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: "Bhupesh | Full-Stack Developer",
    description: "Explore projects, activity, and writing from Bhupesh.",
    url: "https://bhupesh.dev",
    siteName: "Bhupesh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhupesh | Full-Stack Developer",
    description: "Explore projects, activity, and writing from Bhupesh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${brandSans.variable} ${brandDisplay.variable} ${brandMono.variable} ${brandSerif.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
