"use client";

import React, { useState } from "react";

interface Item {
  label: string;
  icon: React.ReactNode;
  detail: {
    title: string;
    body: string;
  };
}

const ITEMS: Item[] = [
  {
    label: "The why behind the code",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3.5" width="16" height="13" rx="2" />
        <path d="m5.5 8 2.5 2-2.5 2M10.5 12.5h4" />
      </svg>
    ),
    detail: {
      title: "Ask why any line exists",
      body: "Highlight anything in a diff and ask why it is there. HiringNexus queries a clone of the agent that wrote it, so a question about a thirty-second retry backoff comes back with the incident that set it, the Slack thread where it was argued, and the ticket it came from.",
    },
  },
  {
    label: "Faster, on fewer tokens",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13.5c4.5-2.5 6.5-6.5 6.5-11-4.5 0-8.5 2-11 6.5l4.5 4.5Z" />
        <path d="M5.5 9 3 10.5 5 12M11 14.5 9.5 17 8 15M13 7a1 1 0 1 0 0-.01" />
        <path d="M4.5 15.5c-.8.8-1.2 2.3-1.3 3.3 1-.1 2.5-.5 3.3-1.3" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "The same work, for less",
      body: "HiringNexus finds the prior work that bears on the task and steers your model with it, so nobody re-establishes background that already exists. You write a two-line prompt instead of pasting the same architecture summary for the fourth time, and equivalent work comes back significantly faster and on fewer tokens.",
    },
  },
  {
    label: "One answer, not five",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <ellipse cx="10" cy="4.5" rx="6.5" ry="2.5" />
        <path d="M3.5 4.5v11c0 1.38 2.9 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-11M3.5 10c0 1.38 2.9 2.5 6.5 2.5s6.5-1.12 6.5-2.5" />
      </svg>
    ),
    detail: {
      title: "Every agent gives the same answer",
      body: "An agent with tool access picks whichever app it thinks holds the answer, queries that one, and stops there. The real answer is usually spread across a Slack thread, a ticket, a call, and an old agent session. HiringNexus assembles all of it first, so everyone gets the same complete answer.",
    },
  },
  {
    label: "Skills that spread themselves",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2.5 17.5 6.5 10 10.5 2.5 6.5 10 2.5Z" />
        <path d="M2.5 10.5 10 14.5l7.5-4M2.5 14 10 18l7.5-4" />
      </svg>
    ),
    detail: {
      title: "Skills find whoever needs them",
      body: "Everyone uploads the skills they already have, and HiringNexus distills new ones out of the work as it happens. They live in the cloud, not on anyone's machine, so nobody sends a skill around or wonders where one went. When someone hits a task a skill covers, HiringNexus surfaces it inside whatever they are running, Claude Code or Codex, without them knowing it existed.",
    },
  },
  {
    label: "Anyone can work like anyone",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 4.5h14v9H8l-3.5 3v-3H3v-9Z" />
        <path d="M6.5 9h7" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Your best people's judgment, everywhere",
      body: "HiringNexus is not only for coding. The way your strongest people work stops being locked in their heads. A new rep runs call review the way your head of sales does, and someone outside the design team builds a deck that looks like your head of design made it, because the agents learned from their actual work.",
    },
  },
  {
    label: "A shared transcript library",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 2.5h7l3 3v12H5v-15Z" />
        <path d="M12 2.5v3h3M7.5 9.5h5M7.5 12.5h5" strokeLinecap="round" />
      </svg>
    ),
    detail: {
      title: "Every session your team ran, in one place",
      body: "Every session anyone on the team ran stays in one library you can search, share, or take over mid-task. A teammate can hand you a half-finished debugging session with everything they already ruled out, and when someone leaves their sessions are still there to query.",
    },
  },
  {
    label: "A permanent, auditable record",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2.5 17 6.25v7.5L10 17.5 3 13.75v-7.5L10 2.5Z" />
        <path d="M3 6.25 10 10l7-3.75M10 10v7.5" />
      </svg>
    ),
    detail: {
      title: "Every decision, on the record for good",
      body: "HiringNexus keeps when decisions were made, who made them, and what led to them: one queryable timeline of the whole organization. Tracing a Q2 outage, you follow the thread back to a January design call, the trade-off noted in March, and who signed off, in minutes instead of weeks.",
    },
  },
  {
    label: "Take your context with you",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <circle cx="10" cy="10" r="7.5" />
        <ellipse cx="10" cy="10" rx="3.2" ry="7.5" />
        <path d="M2.5 10h15" />
      </svg>
    ),
    detail: {
      title: "No provider can lock you in",
      body: "Transcripts, skills, and artifacts live with HiringNexus, not inside whichever client each person happens to use. That holds whether your team is split across three clients today or all on one and migrating providers tomorrow. Otherwise the context your company built belongs to whichever vendor you are currently paying.",
    },
  },
];

export function NexusWhyAccordion() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);
  const [activeItem, setActiveItem] = useState<number>(0);

  const currentDetail = ITEMS[activeItem].detail;

  return (
    <div id="why-nexus" className="mt-28 scroll-mt-24 md:mt-44">
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
                {ITEMS.map((item, index) => {
                  const isSelected = selectedIdx === index;
                  return (
                    <React.Fragment key={item.label}>
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedIdx === index) {
                            setSelectedIdx(null);
                          } else {
                            setActiveItem(index);
                            setSelectedIdx(index);
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
                id="why-nexus-detail"
                className={`home-detail hidden shrink-0 min-[1200px]:block ${
                  selectedIdx !== null ? "home-detail-open" : ""
                }`}
                aria-hidden={selectedIdx === null}
              >
                <div className="home-detail-inner">
                  <div className="relative h-full rounded-xl bg-white/95 p-6 backdrop-blur-[10px] md:p-7 flex flex-col justify-start">
                    <button
                      type="button"
                      onClick={() => setSelectedIdx(null)}
                      aria-label="Close detail window"
                      className="absolute right-5 top-5 text-xl leading-none text-[#818181] transition-colors hover:text-[#0a0e19] cursor-pointer"
                      tabIndex={selectedIdx === null ? -1 : 0}
                    >
                      ×
                    </button>
                    <h4 className="pr-8 text-lg leading-[1.2] md:text-xl font-medium">
                      {currentDetail.title}
                    </h4>
                    <p className="mt-4 text-[15px] leading-[1.55] text-[#636363]">
                      {currentDetail.body}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <a href="/login" className="home-arrow-link cursor-pointer">
            Design Partner Sign In <span className="home-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
