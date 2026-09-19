"use client";

import React from "react";
import { HowToUseRadialSVG } from "@/components/nexus/NexusSVGAnimations";

export function NexusHowItWorks() {
  return (
    <div id="how" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 className="mb-8 text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:mb-10 md:text-[2.5rem] md:leading-[0.98]">
            <span className="text-[#0a0e19]">How to use HiringNexus.</span>
            <br />
            <span className="text-[#818181]">
              Connect once and evaluate proof directly across your entire engineering team.
            </span>
          </h2>

          <div className="flex flex-col gap-6 md:gap-8">
            <article className="home-card grid overflow-hidden rounded-[20px] md:grid-cols-2">
              <div className="order-2 hidden min-w-0 p-6 pt-0 min-[375px]:block md:p-10 md:order-none">
                <div className="flex items-center justify-center overflow-hidden rounded-xl border-[0.5px] border-[#e1e1e1] bg-[#f2f2f2] p-6 md:aspect-[782/521]">
                  <HowToUseRadialSVG />
                </div>
              </div>

              <div className="order-1 flex min-w-0 flex-col justify-center p-6 md:order-none md:p-10 lg:p-12">
                <h3 className="max-w-[20ch] text-[1.375rem] leading-[1.1] md:text-[1.875rem] font-medium text-[#0a0e19]">
                  Set up in 5 minutes
                </h3>
                <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.5] text-[#636363] md:text-base">
                  Connect your GitHub organization or claim your developer profile with one
                  click. HiringNexus indexes public repos, verified contributions, and
                  peer-reviewed artifacts. Available immediately to your entire hiring team
                  without complex integrations or months of configuration.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
