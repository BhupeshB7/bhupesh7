import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
