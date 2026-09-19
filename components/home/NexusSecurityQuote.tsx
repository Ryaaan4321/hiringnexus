"use client";

import React from "react";

interface NexusSecurityQuoteProps {
  onOpenWaitlist: () => void;
}

export function NexusSecurityQuote({ onOpenWaitlist }: NexusSecurityQuoteProps) {
  return (
    <>
      <div className="h-12 md:h-20" aria-hidden="true" />
      <div id="security" className="scroll-mt-24">
        <section>
          <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
            <div className="home-card rounded-xl px-6 py-10 md:px-16 md:py-14">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#397554] font-semibold">
                  Security & Integrity
                </p>
                <h2 className="home-serif mt-4 text-[2rem] leading-[1.05] md:text-[3rem] text-[#0a0e19]">
                  Your code is in good hands.
                </h2>
                <p className="mt-4 max-w-[36rem] text-[15px] text-[#636363] md:text-base">
                  We index public repositories and user-consented telemetry only. Zero private key
                  exposure, SOC 2 aligned data controls, and row-level database isolation for
                  every organization.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={onOpenWaitlist}
                    className="home-btn home-btn-moss cursor-pointer"
                  >
                    Get Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="h-16 md:h-40" aria-hidden="true" />
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <div className="rounded-xl bg-[#1e3c2c] px-6 py-16 text-center md:px-12 md:py-20 lg:px-[17%] lg:py-[7.5rem]">
            <blockquote className="home-serif mx-auto max-w-[70.5rem] text-[1.75rem] leading-[1.1] text-[#f9f9f9] md:text-[2.5rem] lg:text-[3.25rem]">
              “HiringNexus completely eliminated our leetcode screening round. Seeing a candidate’s
              actual PR telemetry gave us 10x more signal than five whiteboard interviews.”
            </blockquote>
            <p className="mt-6 text-sm text-[#dbefdb]/80 md:text-base">
              Marcus Thorne, VP of Engineering · Distributed Systems Lab
            </p>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-40" aria-hidden="true" />
    </>
  );
}
