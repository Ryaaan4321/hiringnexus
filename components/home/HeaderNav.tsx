"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-neutral-900 dark:text-white font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded py-1 px-1"
            aria-label="HiringNexus home"
          >
            {/* Architectural minimalist glyph logo */}
            <span
              aria-hidden="true"
              className="w-7 h-7 rounded-md bg-neutral-950 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 font-mono text-xs font-semibold tracking-tighter"
            >
              HX
            </span>
            <span className="font-sans text-base sm:text-lg font-semibold tracking-tight">
              HiringNexus
            </span>
          </Link>
          <span className="hidden lg:inline-block text-xs font-mono text-neutral-400 dark:text-neutral-500 border-l border-neutral-200 dark:border-neutral-800 pl-3">
            Engineering Telemetry & Proof
          </span>
        </div>

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center space-x-1 lg:space-x-2"
        >
          <Link
            href="#preview"
            className="px-3 py-1.5 text-[14px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <span className="hb-bracket">Platform</span>
          </Link>
          <Link
            href="#pillars"
            className="px-3 py-1.5 text-[14px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <span className="hb-bracket">Methodology</span>
          </Link>
          <Link
            href="/user/dashboard"
            className="px-3 py-1.5 text-[14px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <span className="hb-bracket">Live Jobs</span>
          </Link>
          <Link
            href="#proof"
            className="px-3 py-1.5 text-[14px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <span className="hb-bracket">Signals</span>
          </Link>
          <Link
            href="/auth/admin/signin"
            className="px-3 py-1.5 text-[14px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <span className="hb-bracket flex items-center gap-1">
              For Employers
              <ArrowUpRight className="w-3 h-3 text-neutral-400" aria-hidden="true" />
            </span>
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/user/login"
            className="px-3 py-1.5 text-[14px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            Sign in
          </Link>
          <MagneticButton href="/user/signup" size="sm" variant="primary">
            Join Nexus
          </MagneticButton>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-md"
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pt-2 pb-6 flex flex-col space-y-3"
          role="region"
          aria-label="Mobile Navigation"
        >
          <Link
            href="#preview"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[15px] font-medium text-neutral-800 dark:text-neutral-200"
          >
            Platform Overview
          </Link>
          <Link
            href="#pillars"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[15px] font-medium text-neutral-800 dark:text-neutral-200"
          >
            Methodology & Pillars
          </Link>
          <Link
            href="/user/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[15px] font-medium text-neutral-800 dark:text-neutral-200"
          >
            Browse Live Roles
          </Link>
          <Link
            href="#proof"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[15px] font-medium text-neutral-800 dark:text-neutral-200"
          >
            Signal Proof Points
          </Link>
          <Link
            href="/auth/admin/signin"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-[15px] font-medium text-neutral-800 dark:text-neutral-200"
          >
            Employer Portal
          </Link>
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2.5">
            <Link
              href="/user/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-md text-neutral-900 dark:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/user/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
