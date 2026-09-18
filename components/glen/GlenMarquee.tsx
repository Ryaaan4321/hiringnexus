"use client";

import React from "react";

const ROW_1 = [
  "Write the launch email in our voice",
  "Prep me for the Northwind renewal call",
  "What did we decide about usage-based pricing?",
  "Reply to this ticket the way our support lead does",
  "Summarize what we know about churned accounts",
];

const ROW_2 = [
  "Draft onboarding docs the way Priya structures them",
  "Which objections come up in enterprise calls?",
  "Triage this bug against the on-call runbook",
  "Apply our brand rules to this deck",
  "What's our stance on SOC 2 questionnaires?",
];

const ROW_3 = [
  "Write SQL against the warehouse like the data team",
  "Use the platform team's deploy checklist",
  "Pull every commitment we made to this customer",
  "Review this PR with our API conventions in mind",
  "Plan the sprint from what shipped last quarter",
];

export function GlenMarquee() {
  return (
    <section className="pt-16 md:pt-32">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <p className="text-center text-[13px] text-[#818181] md:text-sm">
          Prompts that Glen unlocks for everyone
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        {/* Row 1 */}
        <div className="home-marquee">
          <div className="home-marquee-track">
            {[...ROW_1, ...ROW_1].map((prompt, idx) => (
              <span
                key={idx}
                className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
              >
                “{prompt}”
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 - Reverse */}
        <div className="home-marquee home-marquee-reverse">
          <div className="home-marquee-track">
            {[...ROW_2, ...ROW_2].map((prompt, idx) => (
              <span
                key={idx}
                className="home-card flex shrink-0 items-center rounded-lg px-4 py-2.5 text-[15px] leading-none text-[#1f1f1f]"
              >
                “{prompt}”
              </span>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="home-marquee">
          <div className="home-marquee-track">
            {[...ROW_3, ...ROW_3].map((prompt, idx) => (
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
  );
}
