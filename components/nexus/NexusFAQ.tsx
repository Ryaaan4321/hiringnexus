"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What is HiringNexus, exactly?",
    answer:
      "HiringNexus records what your team and their agents actually do, across agent sessions, Slack, GitHub, tickets, calls, and docs, and synthesizes all of it into one store. From there it does five things. It feeds the prior work that bears on a task into every prompt automatically, so equivalent work comes back significantly faster and on fewer tokens. It answers questions about the whole company, asked from Slack, from any MCP client, or in the web app. For code, the PR reviewer and code search query a clone of the agent that made the change, so you get why a line is there rather than what it says. It distills your team's methods into skills and surfaces the right one when someone hits a task it covers, with nothing to install and nothing to go looking for. And it keeps every session in one library you can search, share, or take over mid-task, with transcripts, skills, and artifacts that come with you no matter which harness or provider you use.",
  },
  {
    question: "How is this different from a vector database or building my own RAG?",
    answer:
      "A vector database is a box you have to fill, tune, and query yourself. HiringNexus decides what to store and what's relevant, with no index to manage or retrieval code to write. It also does things retrieval can't: it distills your team's methods into skills that surface on their own, and it answers questions about code by querying a clone of the agent that wrote the line rather than searching text.",
  },
  {
    question: "Who in my org can see what HiringNexus learns?",
    answer:
      "Access control runs per observation, at recall. An agent surfaces only what its user is already cleared to see, so sensitive material never turns up in a session that shouldn't have it. Organizations are also isolated from each other at the database level with row-level security, and private mode keeps a session out of the store entirely.",
  },
  {
    question: "What does HiringNexus read?",
    answer:
      "Agent sessions from whichever clients your team runs, plus Slack, GitHub, tickets, calls, and docs. The integrations sync once and only one person needs to set them up. HiringNexus reads public material only, such as public Slack channels and shared team transcripts.",
  },
  {
    question: "Which agents and clients does it work with?",
    answer:
      "Any MCP client: Claude Code, Cursor, Codex, and any agent you built yourself. There is also a command line tool, and both routes give full access to everything HiringNexus does. The web app, the PR reviewer, and the Slack bot come with your account and need no setup at all.",
  },
  {
    question: "Can I take my context with me?",
    answer:
      "Yes. Transcripts, skills, and artifacts belong to you rather than to whichever client you started in. That holds whether your team is split across several clients today or all on one and moving providers tomorrow.",
  },
  {
    question: "How do I get started?",
    answer:
      "Click Get access and leave your work email. We onboard teams in waves and set each one up ourselves.",
  },
];

interface NexusFAQProps {
  onOpenWaitlist?: () => void;
}

export function NexusFAQ({ onOpenWaitlist }: NexusFAQProps) {
  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setOpenStates((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div id="faq" className="scroll-mt-24">
      <section>
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <h2 className="text-center text-base md:text-lg">
            What teams usually ask before connecting HiringNexus. Still have a question?{" "}
            <button
              type="button"
              onClick={onOpenWaitlist}
              className="cursor-pointer text-[#397554] underline-offset-2 hover:underline"
            >
              Get in touch
            </button>{" "}
            and ask us anything.
          </h2>

          <div className="mx-auto mt-8 flex max-w-[51rem] flex-col gap-2">
            {FAQS.map((item, idx) => {
              const isOpen = !!openStates[idx];
              return (
                <div key={item.question} className="home-card rounded-xl">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left md:p-8"
                    >
                      <span className="text-lg leading-[1.2] md:text-xl font-medium">
                        {item.question}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="#818181"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                        className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </button>
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-6 pb-6 text-sm leading-[1.5] text-[#636363] transition-opacity duration-300 motion-reduce:transition-none md:px-8 md:pb-8 md:text-[15px] ${
                          isOpen ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
