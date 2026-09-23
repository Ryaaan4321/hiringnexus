"use client";

import React from "react";
import Link from "next/link";
import { NexusParticleGlobe } from "@/components/nexus/NexusParticleGlobe";

export function NexusHero() {
  return (
    <>
      <section className="pt-10 md:pt-[3.75rem]">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dbefdb] text-[#1e3c2c] text-xs font-mono border border-[#b8dfb8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#397554] animate-pulse" />
              The Proof-of-Work Platform for Students & Builders
            </span>
          </div>

          <h1 className="home-serif text-center text-[2.2rem] leading-[1.05] tracking-[-0.02em] md:text-[3rem] lg:text-[3.8rem] xl:text-[4.3rem] text-[#0a0e19]">
            Where your code proves
            <br className="hidden sm:block" /> what your resume can&apos;t.
          </h1>
          <p className="mx-auto mt-5 max-w-[48rem] text-center text-base sm:text-lg text-[#636363] leading-relaxed">
            Skip the ATS black hole, unread PDF resumes, and recruiter spam. HiringNexus indexes your real
            GitHub pull requests, system design repositories, and benchmarked code telemetry so students and developers
            land high-growth roles directly from technical founders and engineering leads.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="home-btn home-btn-fill cursor-pointer text-sm"
            >
              Create Student & Developer Profile
            </Link>
            <Link
              href="/user"
              className="home-btn home-btn-outline cursor-pointer text-sm"
            >
              Browse Live Roles
            </Link>
          </div>
        </div>
      </section>

      <NexusParticleGlobe />

      <section className="relative z-10 mx-auto w-full max-w-[85rem] px-5 pt-16 md:px-10 md:pt-[8.125rem]">
        <p className="mb-4 text-center text-[13px] md:mb-6 md:text-[17px] text-[#0a0e19]">
          Connecting verified builders with technical teams at
        </p>
        <div className="grid grid-cols-3 gap-2 md:gap-4 lg:grid-cols-6">
          <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
            <span className="font-semibold tracking-wider text-xs md:text-sm text-[#0a0e19] uppercase">
              STRIPE
            </span>
          </figure>
          <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
            <span className="font-semibold tracking-wide text-xs md:text-sm text-[#0a0e19]">
              ▲ Vercel
            </span>
          </figure>
          <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
            <span className="font-bold tracking-tight text-xs md:text-sm text-[#0a0e19]">
              supabase
            </span>
          </figure>
          <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
            <span className="font-semibold tracking-wide text-xs md:text-sm text-[#0a0e19]">
              Linear
            </span>
          </figure>
          <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
            <span className="font-medium tracking-tight text-xs md:text-sm text-[#0a0e19]">
              Resend
            </span>
          </figure>
          <figure className="home-logo-box relative flex min-h-[44px] items-center justify-center rounded-lg p-2 md:min-h-[72px] md:rounded-xl md:p-6 transition-colors">
            <span className="font-semibold tracking-wider text-xs md:text-sm text-[#0a0e19] uppercase">
              MODAL
            </span>
          </figure>
        </div>
      </section>

      <div className="h-16 md:h-32" aria-hidden="true" />
    </>
  );
}
