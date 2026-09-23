"use client";

import React from "react";
import Link from "next/link";
import { MagneticButton } from "./MagneticButton";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 font-mono text-[11px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>[ 000 Nexus / Proven Engineering Talent ]</span>
          </div>

          
          <h1
            id="hero-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] text-neutral-950 dark:text-neutral-50 leading-[1.08] text-balance"
          >
            Resumes are where engineering truth goes to die.
          </h1>

          
          <p className="mt-6 text-base sm:text-xl text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl text-balance">
            An intelligent hiring platform evaluating verified GitHub telemetry, systems code quality, and transparent compensation — connecting software craftspeople directly to engineering leaders.
          </p>

          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <MagneticButton
              href="/signup"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[200px]"
              ariaLabel="Create your verified developer profile"
            >
              Get Verified Profile
            </MagneticButton>

            <MagneticButton
              href="/user"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[180px]"
              ariaLabel="Browse curated open engineering positions"
            >
              Explore Open Roles
            </MagneticButton>
          </div>

          
          <div className="mt-10 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-mono">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" aria-hidden="true" />
              <span>Production GitHub Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" aria-hidden="true" />
              <span>Transparent LPA Compensation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" aria-hidden="true" />
              <span>Zero Recruiter InMail Spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
