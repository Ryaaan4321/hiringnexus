"use client";

import React, { useState } from "react";

interface NexusFAQSectionProps {
  onOpenWaitlist: () => void;
}

const FAQS = [
  {
    question: "I am a college student or fresher. Can I really get hired here?",
    answer:
      "Yes! HiringNexus was created specifically to solve the 'need experience to get experience' dilemma. If you have built projects, contributed to open-source, or written clean code on GitHub, our telemetry engine highlights your real technical depth to hiring managers, bypassing traditional corporate resume filters.",
  },
  {
    question: "Does college tier, pedigree, or GPA matter on HiringNexus?",
    answer:
      "Not on HiringNexus. Whether you attend an Ivy League university, a state college, or are completely self-taught, you are evaluated strictly on the craftsmanship of your code: commit consistency, PR reviews, concurrency design, and test suites.",
  },
  {
    question: "How is this different from LinkedIn or standard job boards?",
    answer:
      "On traditional job boards, your PDF resume is screened out by algorithmic keyword bots before an engineer ever reads it. On HiringNexus, your real GitHub pull requests and repositories are directly showcased to engineering leaders, founders, and team leads who hire based on code.",
  },
  {
    question: "Is it completely free for candidates and students?",
    answer:
      "Yes, 100% free forever for developers and students. There are zero fees to index your profile, take benchmark measurements, browse roles, or accept offers.",
  },
  {
    question: "What repositories does HiringNexus inspect?",
    answer:
      "HiringNexus reads public repositories, open-source contributions, and candidate-authorized GitHub activity. We never access private code without explicit authorization, and you retain complete control over which repositories appear on your verified profile.",
  },
  {
    question: "How do hiring teams connect with candidates?",
    answer:
      "Founders and engineering managers browse verified candidate telemetry cards, review code artifacts, and message candidates directly with interview fast-tracks and competitive compensation parameters.",
  },
];

export function NexusFAQSection({ onOpenWaitlist }: NexusFAQSectionProps) {
  const [faqOpenStates, setFaqOpenStates] = useState<Record<number, boolean>>({});

  const toggleFaq = (idx: number) => {
    setFaqOpenStates((prev) => ({ ...prev, [idx]: !prev[idx] }));
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
              const isOpen = !!faqOpenStates[idx];
              return (
                <div key={item.question} className="home-card rounded-xl">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
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
