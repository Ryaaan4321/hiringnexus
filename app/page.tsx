"use client";

import React, { useState } from "react";
import { NexusHeader } from "@/components/home/NexusHeader";
import { NexusHero } from "@/components/home/NexusHero";
import { NexusAudienceSection } from "@/components/home/NexusAudienceSection";
import { NexusMarqueeSection } from "@/components/home/NexusMarqueeSection";
import { NexusHowItWorks } from "@/components/home/NexusHowItWorks";
import { NexusWhySection } from "@/components/home/NexusWhySection";
import { NexusSecurityQuote } from "@/components/home/NexusSecurityQuote";
import { NexusFAQSection } from "@/components/home/NexusFAQSection";
import { NexusFinalCTA } from "@/components/home/NexusFinalCTA";
import { NexusFooter } from "@/components/home/NexusFooter";
import { NexusWaitlistModal } from "@/components/nexus/NexusWaitlistModal";

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-[#f9f9f9] text-[#0a0e19] selection:bg-[#dbefdb] selection:text-[#1e3c2c]">
      <NexusHeader />
      <main id="top">
        <NexusHero />
        <NexusAudienceSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <NexusMarqueeSection />
        <NexusHowItWorks />
        <NexusWhySection />
        <NexusSecurityQuote onOpenWaitlist={() => setWaitlistOpen(true)} />
        <NexusFAQSection onOpenWaitlist={() => setWaitlistOpen(true)} />
        <NexusFinalCTA />
      </main>
      <NexusFooter />
      <NexusWaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </div>
  );
}
