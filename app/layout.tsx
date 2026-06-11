import type { Metadata, Viewport } from "next";
import {
  JetBrains_Mono,
  Playfair_Display,
  Sora,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { WhatsAppFloat } from "@/components/site/shared/Footer";
import { MouseCursor } from "@/components/site/shared/MouseCursor";
import CustomScrollbar from "@/components/site/shared/CustomScrollbar";
import { SITE } from "@/config/site.config";
import { pageMetadata } from "@/lib/seo";
import Analytics from "@/components/seo/Analytics";

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
  ...pageMetadata("/"),
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080f",
  colorScheme: "dark",
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
        <MouseCursor />
        <ClientLayout>{children}</ClientLayout>
        <CustomScrollbar />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  );
}
