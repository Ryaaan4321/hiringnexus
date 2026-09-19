"use client";

import React from "react";

const MARQUEE_ROW_1 = [
  "CS Sophomore with 0 referrals landed ₹28 LPA backend role on proof of work",
  "Skipped 4 whiteboard rounds because my GitHub PRs proved system architecture",
  "Self-taught engineer hired directly by CTO after automated benchmark verification",
  "Showcase real Docker & Kafka configs instead of empty resume bullet points",
  "Student open-source contributor fast-tracked directly to final team interview",
];

const MARQUEE_ROW_2 = [
  "Find hungry student builders who actually ship production-grade code",
  "Surface candidates with verified open-source contributions in Rust & Go",
  "Direct DM sent to candidate with guaranteed 48-hour response time",
  "Zero pedigree bias: evaluated purely on PR review depth and test coverage",
  "Hire junior engineers with top 5% concurrency and algorithmic percentiles",
];

const MARQUEE_ROW_3 = [
  "99.2th percentile benchmark in Distributed Storage and Concurrency",
  "Verified 0% AI-generated fluff in candidate commit history",
  "Direct line to hiring engineering managers. Zero recruiter spam.",
  "Undergrad with 64 verified PRs receives competitive ₹32 LPA offer",
  "Verified proof of work replaces traditional 5-round recruiting maze",
];

export function NexusMarqueeSection() {
  return (
    <>
      <section className="pt-16 md:pt-32">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <p className="text-center text-[13px] text-[#818181] md:text-sm">
            Signals that HiringNexus unlocks for engineering teams
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <div className="home-marquee">
            <div className="home-marquee-track">
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((prompt, idx) => (
                <span
                  key={idx}
                  className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
                >
                  “{prompt}”
                </span>
              ))}
            </div>
          </div>

          <div className="home-marquee home-marquee-reverse">
            <div className="home-marquee-track">
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((prompt, idx) => (
                <span
                  key={idx}
                  className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
                >
                  “{prompt}”
                </span>
              ))}
            </div>
          </div>
          <div className="home-marquee">
            <div className="home-marquee-track">
              {[...MARQUEE_ROW_3, ...MARQUEE_ROW_3].map((prompt, idx) => (
                <span
                  key={idx}
                  className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
                >
                  “{prompt}”
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-40" aria-hidden="true" />
    </>
  );
}
