import React from "react";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { HeaderNav } from "@/components/home/HeaderNav";
import { HeroSection } from "@/components/home/HeroSection";
import { ProductPreviewTabs } from "@/components/home/ProductPreviewTabs";
import { SocialProofLogos } from "@/components/home/SocialProofLogos";
import { PillarsSection } from "@/components/home/PillarsSection";
import { MetricBanner } from "@/components/home/MetricBanner";
import { BottomCTA } from "@/components/home/BottomCTA";
import { Footer } from "@/components/home/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900">
      {/* Top Announcement Bar with bracket ticker */}
      <AnnouncementBar />

      {/* Semantic Sticky Navigation Header */}
      <HeaderNav />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Interactive Product Preview Frame with Tabs */}
        <ProductPreviewTabs />

        {/* Social Proof & Verified Teams */}
        <SocialProofLogos />

        {/* Architectural Pillars & Methodology */}
        <PillarsSection />

        {/* Telemetric Proof Points & Numbers */}
        <MetricBanner />

        {/* Closing High-Conversion CTA */}
        <BottomCTA />
      </main>

      {/* Semantic Footer with Brand Statement, Navigation & Legal Links */}
      <Footer />
    </div>
  );
}
