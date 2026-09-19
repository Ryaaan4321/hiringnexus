"use client";

import React from "react";

export function SocialProofLogos() {
  const logos = [
    { name: "Respan Systems", symbol: "RESPAN" },
    { name: "Agnost Cloud", symbol: "AGNOST" },
    { name: "Codebuff Inc", symbol: "CODEBUFF" },
    { name: "Strix Systems", symbol: "STRIX" },
    { name: "Zoca Infrastructure", symbol: "ZOCA" },
    { name: "Vercel Labs", symbol: "VERCEL" },
  ];

  return (
    <section
      aria-label="Trusted companies and engineering teams"
      className="py-12 sm:py-16 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            [ Verified Engineering Teams Worldwide ]
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 gap-y-6 opacity-75 dark:opacity-60 hover:opacity-100 transition-opacity">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex items-center gap-2 select-none group cursor-default"
              title={logo.name}
            >
              <div
                aria-hidden="true"
                className="w-2 h-2 bg-neutral-900 dark:bg-neutral-100 rounded-xs group-hover:scale-125 transition-transform"
              />
              <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-neutral-800 dark:text-neutral-200">
                {logo.symbol}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
