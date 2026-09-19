"use client";

import React, { useEffect, useRef, useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "It just works and works well. Love using it",
    name: "Frank",
    role: "Co-Founder & CTO",
    company: "Amorphic Labs",
  },
  {
    quote: "The absolute best dev ex tool I've used since the invention of the text editor.",
    name: "Jon",
    role: "Co-Founder & CTO",
    company: "Zaplar",
  },
  {
    quote: "Yesterday I got Posthog access and was trying to understand some stuff, HiringNexus surfaced Sarah's context and was very very very helpful, would recommend",
    name: "KJ",
    role: "MTS",
    company: "Composio",
  },
];

export function NexusTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, activeIndex]);

  return (
    <section>
      <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
        <div
          className="rounded-xl bg-[#1e3c2c] px-6 py-16 text-center md:px-12 md:py-20 lg:px-[17%] lg:py-[7.5rem]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid" aria-live="polite">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.quote}
                aria-hidden={idx !== activeIndex}
                className={`col-start-1 row-start-1 flex flex-col justify-center transition-opacity duration-500 ease-out ${
                  idx === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <blockquote className="home-serif mx-auto max-w-[70.5rem] text-[1.75rem] leading-[1.1] text-[#f9f9f9] md:text-[2.5rem] lg:text-[3.25rem]">
                  “{t.quote}”
                </blockquote>
                <p className="mt-6 text-sm text-[#dbefdb]/80 md:text-base">
                  {t.name}, {t.role} · {t.company}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.quote}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show testimonial ${idx + 1} of ${TESTIMONIALS.length}`}
                aria-current={idx === activeIndex}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "w-6 bg-[#dbefdb]"
                    : "w-1.5 bg-[#dbefdb]/35 hover:bg-[#dbefdb]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
