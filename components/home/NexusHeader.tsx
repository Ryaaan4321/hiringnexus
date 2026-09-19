"use client";

import React, { useState } from "react";
import Link from "next/link";

export function NexusHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-transparent transition-colors">
      <div className="mx-auto grid w-full max-w-[85rem] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10 min-[1200px]:py-6">
        <div className="justify-self-start">
          <Link href="/" className="flex items-center" aria-label="HiringNexus home">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 26L2 12C2 12 6 12 9 16C12 20 14 26 14 26H2Z" fill="#0a0e19" opacity="0.9" />
              <path d="M30 26L30 8C30 8 26 8 22 14C18 20 18 26 18 26H30Z" fill="#397554" />
            </svg>
          </Link>
        </div>

        <nav
          className="home-nav-pill hidden items-center gap-1 justify-self-center rounded-lg text-[1rem] min-[1200px]:flex"
          style={{
            background:
              "linear-gradient(rgba(206,206,206,0.3),rgba(206,206,206,0.3)), rgba(255,255,255,0.85)",
            border: "0.5px solid rgba(206,206,206,0.22)",
          }}
        >
          <a href="#platform" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
            Platform
          </a>
          <a href="#signals" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
            Signals
          </a>
          <a href="#how" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
            How it works
          </a>
          <a href="#faq" className="px-3 py-2 text-[#0a0e19] hover:text-[#0a0e19]">
            FAQ
          </a>
        </nav>

        <div className="col-start-3 flex items-center gap-2.5 justify-self-end">
          <Link
            href="/signup"
            className="hidden sm:inline-flex home-btn home-btn-fill cursor-pointer whitespace-nowrap text-[14px]"
          >
            Claim Profile
          </Link>
          <div className="min-[1200px]:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
              className="home-btn home-btn-glass"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 4.5h12M2 8h12M2 11.5h12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="min-[1200px]:hidden px-5 py-4 bg-white/95 border-b border-[#e1e1e1] shadow-lg flex flex-col gap-3">
          <a href="#platform" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
            Platform
          </a>
          <a href="#signals" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
            Signals
          </a>
          <a href="#how" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
            How it works
          </a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#0a0e19]">
            FAQ
          </a>
          <Link
            href="/signup"
            onClick={() => setMobileMenuOpen(false)}
            className="home-btn home-btn-fill w-full mt-2 text-center"
          >
            Claim Profile
          </Link>
        </div>
      )}
    </header>
  );
}
