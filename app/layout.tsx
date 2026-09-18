import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader, Spline_Sans_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const splineSansMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "HiringNexus — Verified Engineering Talent & Real-time Hiring Signals",
  description:
    "A human-centered hiring platform evaluating real engineering artifacts, GitHub telemetry, and direct employer connections without recruiter noise.",
  keywords: ["engineering hiring", "developer jobs", "github verification", "technical recruitment"],
  openGraph: {
    title: "HiringNexus — Verified Engineering Talent",
    description: "Evaluated by proof, not keyword-stuffed resumes.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${splineSansMono.variable} antialiased`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
