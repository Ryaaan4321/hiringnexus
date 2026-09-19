"use client";

import React from "react";
import { MagneticButton } from "./MagneticButton";
import Link from "next/link";

export function BottomCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-16 sm:py-24 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-900 text-white p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-sm relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #FFF 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
              [ Connect to the Nexus ]
            </span>

            <h2
              id="cta-heading"
              className="mt-3 text-3xl sm:text-5xl font-semibold tracking-tight text-balance leading-tight text-white"
            >
              Start hiring or getting hired on proof today.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-xl text-balance leading-relaxed">
              Create your developer profile in under 60 seconds with GitHub, or onboard your company to start interviewing verified systems talent.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <MagneticButton
                href="/signup"
                variant="primary"
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100 border-white"
                ariaLabel="Sign up as an engineer on HiringNexus"
              >
                Create Developer Profile
              </MagneticButton>

              <MagneticButton
                href="/login"
                variant="outline"
                size="lg"
                className="text-white border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800"
                ariaLabel="Employer and Recruiter Sign In"
              >
                Post Open Roles
              </MagneticButton>
            </div>

            <p className="mt-6 text-xs text-neutral-400 font-mono">
              Free for candidates. Direct transparent contracts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
