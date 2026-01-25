import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { Provider as JotaiProvider } from "jotai";
import { Toaster } from "@/components/ui/sonner";
import { FloatingDock } from "@/components/ui/floating-dock";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import React from "react";
import { Home as HomeIcon, Briefcase, FileText, Mail } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import FloatingDonateButton from "@/components/FloatingDonateButton";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = { themeColor: "#00E676" };

export const metadata: Metadata = {
  metadataBase: new URL("https://arpanx.vercel.app"),
  title: "Intro | Arpan",
  description: "yet another swe portfolio on the internet",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"],
  },
  openGraph: {
    type: "website",
    url: "https://arpanx.vercel.app",
    title: "Intro | Arpan",
    description: "yet another swe portfolio on the internet",
  },
  twitter: {
    card: "summary",
    title: "Intro | Arpan",
    description: "yet another swe portfolio on the internet",
    creator: "@Arpan",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dockItems = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Work",
      icon: (
        <Briefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/work",
    },
    {
      title: "Resume",
      icon: (
        <FileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/resume",
    },
    {
      title: "Contact",
      icon: (
        <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "mailto:arpanx.vercel.app",
    },
  ];

  return (
    <html lang="en" className="overscroll-none dark">
      <body
        className={cn(
          "font-sans antialiased overscroll-none dark",
          fontSans.variable
        )}
      >
        <JotaiProvider>
          <Toaster position="bottom-center" closeButton richColors />
          {children}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
            <FloatingDock items={dockItems} />
          </div>
          <SpeedInsights />
          <Analytics />
          <FloatingDonateButton />
        </JotaiProvider>
      </body>
    </html>
  );
}
