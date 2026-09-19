"use client";

import React, { useState } from "react";
import Link from "next/link";

interface WhyItem {
  label: string;
  icon: React.ReactNode;
  detail: {
    title: string;
    body: string;
  };
}

const WHY_ITEMS: WhyItem[] = [
  {
    label: "Pure proof over pedigree",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3.5" width="16" height="13" rx="2" />
        <path d="m5.5 8 2.5 2-2.5 2M10.5 12.5h4" />
      </svg>
    ),
    detail: {
      title: "Built for students, grads, and self-taught developers",
      body: "Never get filtered out by an automated ATS screening keyword tool. Your real GitHub commits, merged PRs, and architectural trade-offs speak louder than any college brand name or corporate past title.",
    },
  },
  {
    label: "Skip whiteboard trivia",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13.5c4.5-2.5 6.5-6.5 6.5-11-4.5 0-8.5 2-11 6.5l4.5 4.5Z" />
        <path d="M5.5 9 3 10.5 5 12M11 14.5 9.5 17 8 15M13 7a1 1 0 1 0 0-.01" />
        <path d="M4.5 15.5c-.8.8-1.2 2.3-1.3 3.3 1-.1 2.5-.5 3.3-1.3" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Evaluate shipped code, not memorized puzzles",
      body: "Whiteboard trick questions don't measure real engineering. HiringNexus proves what developers have actually built and debugged in production environments, cutting hiring friction by 80%.",
    },
  },
  {
    label: "Direct line to technical leaders",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" />
        <ellipse cx="10" cy="10" rx="3.2" ry="7.5" />
        <path d="M2.5 10h15" />
      </svg>
    ),
    detail: {
      title: "Connect directly with CTOs and Staff Engineers",
      body: "No third-party recruiting agencies, no salary markups, and zero cold InMail spam. Engineering managers review your actual code diffs and reach out with immediate technical conviction.",
    },
  },
  {
    label: "Verified GitHub telemetry",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2.5 17.5 6.5 10 10.5 2.5 6.5 10 2.5Z" />
        <path d="M2.5 10.5 10 14.5l7.5-4M2.5 14 10 18l7.5-4" />
      </svg>
    ),
    detail: {
      title: "Authentic commit forensics and contribution proof",
      body: "Our verification engine audits commit patterns, PR review depth, and genuine repository ownership. AI-generated commit spam and superficial forks are filtered out, surfacing authentic builders.",
    },
  },
  {
    label: "Objective skill percentiles",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 4.5h14v9H8l-3.5 3v-3H3v-9Z" />
        <path d="M6.5 9h7" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Ranked by concurrency, complexity, and test coverage",
      body: "Receive verified benchmarks in Rust, Go, TypeScript, Distributed Systems, and Database optimization. Prove that your skills compete at the top 5th percentile regardless of graduation year.",
    },
  },
  {
    label: "Transparent compensation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 2.5h7l3 3v12H5v-15Z" />
        <path d="M12 2.5v3h3M7.5 9.5h5M7.5 12.5h5" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Clear LPA ranges on every engineering listing",
      body: "Every position features transparent compensation upfront. No 'salary negotiable based on previous pay' tricks. Developers get paid for the value they create.",
    },
  },
  {
    label: "Auditable candidate record",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2.5 17 6.25v7.5L10 17.5 3 13.75v-7.5L10 2.5Z" />
        <path d="M3 6.25 10 10l7-3.75M10 10v7.5" />
      </svg>
    ),
    detail: {
      title: "Every hiring decision backed by verifiable artifacts",
      body: "Trace any hiring decision back to verified code artifacts: the exact PRs reviewed, benchmark percentiles, and technical competencies evaluated. Build an objective, bias-free engineering culture.",
    },
  },
];

export function NexusWhySection() {
  const [whyIdx, setWhyIdx] = useState<number | null>(0);
  const [activeWhy, setActiveWhy] = useState(0);

  const currentWhyDetail = WHY_ITEMS[activeWhy].detail;

  return (
    <div id="signals" className="mt-28 scroll-mt-24 md:mt-44">
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div className="relative flex overflow-hidden rounded-[24px] md:min-h-[760px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 18% 22%, #2c4636 0%, transparent 55%), radial-gradient(110% 80% at 85% 75%, #20303f 0%, transparent 60%), radial-gradient(70% 60% at 60% 35%, #3a3128 0%, transparent 65%), #11161c",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-black/30" />

          <div className="relative z-[1] flex w-full flex-col justify-between gap-10 p-7 md:flex-row md:p-[46px]">
            <h3 className="home-serif text-[1.75rem] leading-[1.05] text-white md:text-[2.75rem]">
              Why HiringNexus?
            </h3>

            <div className="flex w-full flex-col md:w-auto md:flex-row md:self-stretch">
              <div className="flex w-full flex-col rounded-xl bg-white/95 p-2 backdrop-blur-[10px] md:w-[452px] md:max-w-none">
                {WHY_ITEMS.map((item, index) => {
                  const isSelected = whyIdx === index;
                  return (
                    <React.Fragment key={item.label}>
                      <button
                        type="button"
                        onClick={() => {
                          if (whyIdx === index) {
                            setWhyIdx(null);
                          } else {
                            setActiveWhy(index);
                            setWhyIdx(index);
                          }
                        }}
                        aria-expanded={isSelected}
                        className={`home-template-row group flex flex-1 items-center gap-3 border-t-[0.5px] border-[#e1e1e1] px-4 py-4 text-left first:border-t-0 cursor-pointer ${
                          isSelected ? "rounded-lg bg-[#f3f3f1]" : ""
                        }`}
                      >
                        <span className="shrink-0 text-[#0a0e19]">{item.icon}</span>
                        <span className="flex-1 text-[15px]">{item.label}</span>
                        <span className="home-row-arrow text-[#397554]">→</span>
                      </button>
                      <div
                        className={`home-detail min-[1200px]:hidden ${
                          isSelected ? "home-detail-open" : ""
                        }`}
                        aria-hidden={!isSelected}
                      >
                        <div className="home-detail-inner">
                          <div className="rounded-lg bg-[#f3f3f1] px-4 py-5">
                            <h4 className="pr-8 text-lg leading-[1.2] md:text-xl font-medium">
                              {item.detail.title}
                            </h4>
                            <p className="mt-4 text-[15px] leading-[1.55] text-[#636363]">
                              {item.detail.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              <aside
                className={`home-detail hidden shrink-0 min-[1200px]:block ${
                  whyIdx !== null ? "home-detail-open" : ""
                }`}
                aria-hidden={whyIdx === null}
              >
                <div className="home-detail-inner">
                  <div className="relative h-full rounded-xl bg-white/95 p-6 backdrop-blur-[10px] md:p-7 flex flex-col justify-start">
                    <button
                      type="button"
                      onClick={() => setWhyIdx(null)}
                      aria-label="Close detail window"
                      className="absolute right-5 top-5 text-xl leading-none text-[#818181] transition-colors hover:text-[#0a0e19] cursor-pointer"
                      tabIndex={whyIdx === null ? -1 : 0}
                    >
                      ×
                    </button>
                    <h4 className="pr-8 text-lg leading-[1.2] md:text-xl font-medium">
                      {currentWhyDetail.title}
                    </h4>
                    <p className="mt-4 text-[15px] leading-[1.55] text-[#636363]">
                      {currentWhyDetail.body}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Link href="/login" className="home-arrow-link cursor-pointer">
            Sign In to Platform <span className="home-arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
