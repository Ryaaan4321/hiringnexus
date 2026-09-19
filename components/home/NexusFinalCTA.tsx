"use client";

import React from "react";
import Link from "next/link";

export function NexusFinalCTA() {
  return (
    <>
      <div className="h-16 md:h-40" aria-hidden="true" />
      <section className="pb-16 md:pb-32">
        <div className="mx-auto w-full max-w-[85rem] px-5 md:px-10 text-center">
          <h2 className="text-[1.625rem] leading-[1.05] tracking-[-0.029em] md:text-[2.5rem] md:leading-[0.98] text-[#0a0e19]">
            Welcome to the future of engineering hiring.
          </h2>
          <p className="mt-4 text-[#636363]">
            Leave your work email and we&apos;ll set your team up, or sign in to explore verified
            talent.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/user/dashboard"
              className="home-btn home-btn-fill cursor-pointer"
            >
              Explore Verified Talent
            </Link>
            <Link href="/login" className="home-btn home-btn-outline">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
